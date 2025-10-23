const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

// Import middleware
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dearahmed65_db_user:SVE0jlafRQSNyhLR@cluster0.whuf9d6.mongodb.net/notes-app?retryWrites=true&w=majority&appName=Cluster0';

// ===================
// Middleware
// ===================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// تعطيل Cache في التطوير
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
  });
}

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ===================
// Database Connection
// ===================
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// ===================
// Routes
// ===================

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'مرحباً بك في Notes API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      notes: '/api/notes'
    },
    documentation: 'راجع ملف API_DOCUMENTATION.md'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'السيرفر يعمل بشكل جيد',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// ===================
// Error Handling
// ===================

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

// ===================
// Server
// ===================

// للتطوير المحلي فقط
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 السيرفر يعمل على المنفذ ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`🌍 البيئة: ${process.env.NODE_ENV || 'development'}`);
  });
}

// تصدير للـ Vercel
module.exports = app;
