// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'خطأ في التحقق من البيانات',
      errors
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `${field === 'email' ? 'البريد الإلكتروني' : field} موجود مسبقاً`
    });
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'معرف غير صحيح'
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'التوكن غير صالح'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'التوكن منتهي الصلاحية'
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'خطأ في السيرفر',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// 404 Handler
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'الصفحة غير موجودة'
  });
};

module.exports = { errorHandler, notFound };
