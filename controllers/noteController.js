const Note = require('../models/Note');

// @desc    إنشاء ملاحظة جديدة
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res, next) => {
  try {
    const { title, content, category, color, tags, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'العنوان والمحتوى مطلوبان'
      });
    }

    const note = await Note.create({
      title,
      content,
      category,
      color,
      tags,
      isPinned,
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'تم إنشاء الملاحظة بنجاح',
      data: { note }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    الحصول على جميع ملاحظات المستخدم
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res, next) => {
  try {
    const { 
      category, 
      search, 
      isPinned, 
      isArchived,
      sortBy = '-createdAt',
      page = 1,
      limit = 20
    } = req.query;

    // بناء الفلتر
    const filter = { user: req.user._id };

    if (category) filter.category = category;
    if (isPinned !== undefined) filter.isPinned = isPinned === 'true';
    if (isArchived !== undefined) filter.isArchived = isArchived === 'true';
    else filter.isArchived = false; // افتراضياً لا نعرض المؤرشفة

    // البحث في العنوان والمحتوى والتاغات
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // حساب الصفحات
    const skip = (page - 1) * limit;

    // جلب الملاحظات
    const notes = await Note.find(filter)
      .sort(sortBy)
      .limit(parseInt(limit))
      .skip(skip);

    // حساب العدد الكلي
    const total = await Note.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        notes,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    الحصول على ملاحظة واحدة
// @route   GET /api/notes/:id
// @access  Private
const getNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'الملاحظة غير موجودة'
      });
    }

    res.status(200).json({
      success: true,
      data: { note }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    تحديث ملاحظة
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res, next) => {
  try {
    const { title, content, category, color, tags, isPinned, isArchived } = req.body;

    let note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'الملاحظة غير موجودة'
      });
    }

    // تحديث الحقول
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (category !== undefined) note.category = category;
    if (color !== undefined) note.color = color;
    if (tags !== undefined) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;
    if (isArchived !== undefined) note.isArchived = isArchived;

    await note.save();

    res.status(200).json({
      success: true,
      message: 'تم تحديث الملاحظة بنجاح',
      data: { note }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    حذف ملاحظة
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'الملاحظة غير موجودة'
      });
    }

    res.status(200).json({
      success: true,
      message: 'تم حذف الملاحظة بنجاح'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    تثبيت/إلغاء تثبيت ملاحظة
// @route   PATCH /api/notes/:id/pin
// @access  Private
const togglePin = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'الملاحظة غير موجودة'
      });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    res.status(200).json({
      success: true,
      message: note.isPinned ? 'تم تثبيت الملاحظة' : 'تم إلغاء التثبيت',
      data: { note }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    أرشفة/إلغاء أرشفة ملاحظة
// @route   PATCH /api/notes/:id/archive
// @access  Private
const toggleArchive = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: 'الملاحظة غير موجودة'
      });
    }

    note.isArchived = !note.isArchived;
    await note.save();

    res.status(200).json({
      success: true,
      message: note.isArchived ? 'تم أرشفة الملاحظة' : 'تم إلغاء الأرشفة',
      data: { note }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    الحصول على إحصائيات الملاحظات
// @route   GET /api/notes/stats
// @access  Private
const getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const stats = await Note.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pinned: {
            $sum: { $cond: ['$isPinned', 1, 0] }
          },
          archived: {
            $sum: { $cond: ['$isArchived', 1, 0] }
          }
        }
      }
    ]);

    const categoryStats = await Note.aggregate([
      { $match: { user: userId, isArchived: false } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: stats[0] || { total: 0, pinned: 0, archived: 0 },
        byCategory: categoryStats
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  togglePin,
  toggleArchive,
  getStats
};
