require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const config = require("./config");
const { basicAuth } = require("./middleware/auth");

// Initialize Express app
const app = express();

// Connect to MongoDB with improved error handling for deployment
mongoose.connect(config.database.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => {
  console.error("MongoDB connection error:", err);
  // In production, we might want to exit the process if DB connection fails
  if (config.server.environment === 'production') {
    console.error("Database connection critical in production, check your Vercel environment variables");
  }
});

// Define User model
const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  department: String,
  position: String,
  created: { type: Date, default: Date.now }
});

// Define Appointment model
const Appointment = mongoose.model("Appointment", {
  name: String,
  email: String,
  department: String,
  position: String,
  date: String,
  time: String,
  status: { type: String, default: 'Scheduled' },
  created: { type: Date, default: Date.now }
});

// Security middleware
// Apply Helmet for securing HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"]
    }
  }
}));

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  message: "Too many requests from this IP, please try again after 15 minutes"
});

// Apply rate limiting to API routes
app.use("/api/", apiLimiter);

// Basic middleware
app.use(bodyParser.json());

// Add CSRF protection with custom token validation
app.use((req, res, next) => {
  // Skip for GET, HEAD, OPTIONS requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }
  
  // Check for CSRF token in headers for POST, PUT, DELETE
  const csrfToken = req.headers['x-csrf-token'];
  
  // Simple check for API endpoints that change data
  if (req.path.startsWith('/api/') && (!csrfToken || csrfToken !== config.auth.csrfToken)) {
    return res.status(403).json({ message: 'CSRF token validation failed' });
  }
  
  next();
});

// Add additional security headers
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
  next();
});

// Custom middleware to protect admin assets
app.use('/admin.html', basicAuth);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API endpoints
// Check time slot availability
app.get("/api/check-availability", async (req, res) => {
  try {
    const { date, time } = req.query;
    
    // Check if slot is already booked
    const slotBooked = await Appointment.findOne({ date, time });
    
    res.status(200).json({
      available: !slotBooked
    });
  } catch (error) {
    console.error("Error checking slot availability:", error);
    res.status(500).json({ message: "Server error checking availability" });
  }
});

// Create new appointment
app.post("/api/appointments", async (req, res) => {
  try {
    const { name, email, department, position, date, time } = req.body;
    
    // Validate required fields
    if (!name || !email || !department || !position || !date || !time) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }
    
    // Check if slot is already booked
    const slotBooked = await Appointment.findOne({ date, time });
    if (slotBooked) {
      return res.status(400).json({ 
        success: false,
        message: "This time slot is already booked" 
      });
    }
    
    // Check if user already has an appointment
    const existingAppointment = await Appointment.findOne({ email });
    if (existingAppointment) {
      // Remove existing appointment
      await Appointment.deleteOne({ _id: existingAppointment._id });
    }
    
    // Create new appointment
    const newAppointment = new Appointment({
      name,
      email,
      department,
      position,
      date,
      time
    });
    
    await newAppointment.save();
    
    res.status(201).json({
      success: true,
      message: "Appointment scheduled successfully",
      appointment: newAppointment
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error creating appointment" 
    });
  }
});

// Look up appointment by email
app.get("/api/appointments/lookup", async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    // Find appointment by email
    const appointment = await Appointment.findOne({ email });
    
    if (!appointment) {
      return res.status(200).json({ found: false });
    }
    
    res.status(200).json({
      found: true,
      appointment: {
        id: appointment._id,
        name: appointment.name,
        email: appointment.email,
        department: appointment.department,
        position: appointment.position,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status
      }
    });
  } catch (error) {
    console.error("Error looking up appointment:", error);
    res.status(500).json({ message: "Server error looking up appointment" });
  }
});

// Cancel/delete appointment
app.delete("/api/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and remove appointment
    const result = await Appointment.deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No appointment found with this ID" 
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully"
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error cancelling appointment" 
    });
  }
});

// User signup
app.post("/user/signup", async (req, res) => {
  try {
    const { name, email, password, department, position } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    
    // Create new user
    const newUser = new User({
      name,
      email,
      password, // In a real app, you'd hash this password
      department,
      position
    });
    
    await newUser.save();
    
    // Return user info (excluding password)
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      department: newUser.department,
      position: newUser.position
    };
    
    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
      token: "test-token-123" // In a real app, you'd generate a real JWT token
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// User login
app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user || user.password !== password) { // In a real app, you'd compare hashed passwords
      return res.status(400).json({ message: "Invalid email or password" });
    }
    
    // Return user info (excluding password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      position: user.position
    };
    
    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      token: "test-token-123" // In a real app, you'd generate a real JWT token
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Get available time slots
app.get("/appointments/slots", async (req, res) => {
  try {
    const { date } = req.query;
    
    // Get all booked slots for the date
    const bookedSlots = await Appointment.find({ date });
    
    res.status(200).json(bookedSlots);
  } catch (error) {
    console.error("Error getting slots:", error);
    res.status(500).json({ message: "Server error getting time slots" });
  }
});

// Book appointment
app.post("/appointments/book", async (req, res) => {
  try {
    const { userId, date, time } = req.body;
    
    // Check if slot is already booked
    const slotBooked = await Appointment.findOne({ date, time });
    if (slotBooked) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }
    
    // Check if user already has an appointment
    const existingAppointment = await Appointment.findOne({ userId });
    if (existingAppointment) {
      // Remove existing appointment
      await Appointment.deleteOne({ _id: existingAppointment._id });
    }
    
    // Create new appointment
    const newAppointment = new Appointment({
      userId,
      date,
      time
    });
    
    await newAppointment.save();
    
    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error booking appointment" });
  }
});

// Cancel appointment
app.post("/appointments/cancel", async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Find and remove user's appointment
    const result = await Appointment.deleteOne({ userId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No appointment found for this user" });
    }
    
    res.status(200).json({
      message: "Appointment cancelled successfully"
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: "Server error cancelling appointment" });
  }
});

// Get user's appointment
app.get("/appointments/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user's appointment
    const appointment = await Appointment.findOne({ userId });
    
    if (!appointment) {
      return res.status(404).json({ message: "No appointment found for this user" });
    }
    
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error getting user appointment:", error);
    res.status(500).json({ message: "Server error getting user appointment" });
  }
});

// Admin routes - protected by Basic Auth
app.get("/admin/users", basicAuth, async (req, res) => {
  try {
    // Get all users (excluding passwords)
    const users = await User.find({}, { password: 0 });
    
    // Transform MongoDB _id to id for consistency
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      department: user.department,
      position: user.position,
      created: user.created
    }));
    
    res.status(200).json(formattedUsers);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Server error getting users" });
  }
});

app.get("/admin/appointments", basicAuth, async (req, res) => {
  try {
    // Get all appointments
    const appointments = await Appointment.find({});
    
    // Transform MongoDB _id to id for consistency
    const formattedAppointments = appointments.map(appointment => ({
      id: appointment._id,
      name: appointment.name,
      email: appointment.email,
      department: appointment.department,
      position: appointment.position,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status || 'Scheduled',
      created: appointment.created
    }));
    
    res.status(200).json(formattedAppointments);
  } catch (error) {
    console.error("Error getting appointments:", error);
    res.status(500).json({ message: "Server error getting appointments" });
  }
});

// Token validation (simplified)
app.get("/user/validate", (req, res) => {
  res.status(200).json({ valid: true });
});

// Start server - configured for both local development and Vercel deployment
const PORT = process.env.PORT || config.server.port || 3000;

// Allow application to be accessed from any IP address
// Note: Vercel handles this differently in production and will override these settings
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n${config.app.name} Server Started`);
  console.log(`---------------------------------------`);
  console.log(`Environment: ${config.server.environment}`);
  console.log(`Base URL: ${config.server.baseUrl}`);
  console.log(`Local URL: http://localhost:${PORT}`);
  console.log(`Admin Dashboard: ${config.server.baseUrl}/admin.html`);
  console.log(`---------------------------------------`);
});