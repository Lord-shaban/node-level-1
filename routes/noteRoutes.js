const express = require('express');
const router = express.Router();
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  togglePin,
  toggleArchive,
  getStats
} = require('../controllers/noteController');
const { protect } = require('../middleware/auth');

// جميع المسارات محمية (تحتاج authentication)
router.use(protect);

// Routes
router.route('/')
  .get(getNotes)
  .post(createNote);

router.get('/stats', getStats);

router.route('/:id')
  .get(getNote)
  .put(updateNote)
  .delete(deleteNote);

router.patch('/:id/pin', togglePin);
router.patch('/:id/archive', toggleArchive);

module.exports = router;
