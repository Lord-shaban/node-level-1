const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان الملاحظة مطلوب'],
    trim: true,
    maxlength: [100, 'العنوان لا يجب أن يتجاوز 100 حرف']
  },
  content: {
    type: String,
    required: [true, 'محتوى الملاحظة مطلوب'],
    trim: true,
    maxlength: [5000, 'المحتوى لا يجب أن يتجاوز 5000 حرف']
  },
  category: {
    type: String,
    enum: ['شخصي', 'عمل', 'دراسة', 'مهم', 'أخرى'],
    default: 'أخرى'
  },
  color: {
    type: String,
    default: '#ffffff',
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'اللون يجب أن يكون بصيغة hex']
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'المستخدم مطلوب']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index للبحث السريع
noteSchema.index({ title: 'text', content: 'text', tags: 'text' });
noteSchema.index({ user: 1, createdAt: -1 });
noteSchema.index({ user: 1, isPinned: -1, createdAt: -1 });

// حذف __v عند التحويل إلى JSON
noteSchema.methods.toJSON = function() {
  const note = this.toObject();
  delete note.__v;
  return note;
};

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
