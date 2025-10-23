const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

// @desc    تسجيل مستخدم جديد
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { username, email, password, avatar } = req.body;

    // التحقق من البيانات المطلوبة
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'جميع الحقول مطلوبة'
      });
    }

    // التحقق من وجود المستخدم
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'المستخدم موجود مسبقاً'
      });
    }

    // إنشاء المستخدم
    const user = await User.create({
      username,
      email,
      password,
      avatar
    });

    // إنشاء التوكن
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'تم التسجيل بنجاح',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    تسجيل دخول المستخدم
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // التحقق من البيانات
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني وكلمة المرور مطلوبان'
      });
    }

    // البحث عن المستخدم وإرجاع كلمة المرور
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      });
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      });
    }

    // إنشاء التوكن
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    الحصول على معلومات المستخدم الحالي
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    تحديث معلومات المستخدم
// @route   PUT /api/auth/update
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { username, email, avatar } = req.body;

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (avatar) updateData.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'تم تحديث الملف الشخصي بنجاح',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    تغيير كلمة المرور
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'كلمة المرور الحالية والجديدة مطلوبة'
      });
    }

    const user = await User.findById(req.user._id).select('+password');

    // التحقق من كلمة المرور الحالية
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'كلمة المرور الحالية غير صحيحة'
      });
    }

    // تحديث كلمة المرور
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'تم تغيير كلمة المرور بنجاح'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
};
