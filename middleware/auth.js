const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware للتحقق من التوكن
const protect = async (req, res, next) => {
  try {
    let token;

    // التحقق من وجود التوكن في الهيدر
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح لك بالوصول. يرجى تسجيل الدخول'
      });
    }

    try {
      // التحقق من صحة التوكن
      const decoded = jwt.verify(token, JWT_SECRET);

      // إضافة المستخدم إلى الطلب
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'المستخدم غير موجود'
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'التوكن غير صالح أو منتهي الصلاحية'
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'خطأ في التحقق من الصلاحية',
      error: error.message
    });
  }
};

// إنشاء توكن JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '30d' // صلاحية التوكن 30 يوم
  });
};

module.exports = { protect, generateToken, JWT_SECRET };
