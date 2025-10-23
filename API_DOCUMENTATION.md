# Notes App API Documentation

## 📚 نظرة عامة

API احترافي كامل لتطبيق الملاحظات (Notes) مع نظام مصادقة (Authentication) كامل.

---

## 🔐 المصادقة (Authentication)

جميع الطلبات المحمية تحتاج إلى إرسال التوكن في الهيدر:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📍 Endpoints

### 🔑 Authentication Routes

#### 1. تسجيل مستخدم جديد
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "ahmad",
  "email": "ahmad@example.com",
  "password": "123456",
  "avatar": "https://example.com/avatar.jpg" // اختياري
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم التسجيل بنجاح",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "ahmad",
      "email": "ahmad@example.com",
      "avatar": "https://example.com/avatar.jpg",
      "createdAt": "2024-10-24T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### 2. تسجيل الدخول
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ahmad@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم تسجيل الدخول بنجاح",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### 3. الحصول على معلومات المستخدم الحالي
```http
GET /api/auth/me
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "ahmad",
      "email": "ahmad@example.com",
      "avatar": "https://example.com/avatar.jpg",
      "createdAt": "2024-10-24T10:30:00.000Z"
    }
  }
}
```

---

#### 4. تحديث الملف الشخصي
```http
PUT /api/auth/update
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "username": "ahmad_new",
  "email": "ahmad_new@example.com",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

---

#### 5. تغيير كلمة المرور
```http
PUT /api/auth/change-password
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "currentPassword": "123456",
  "newPassword": "new123456"
}
```

---

### 📝 Notes Routes (جميعها محمية)

#### 1. إنشاء ملاحظة جديدة
```http
POST /api/notes
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "ملاحظتي الأولى",
  "content": "هذا محتوى الملاحظة",
  "category": "شخصي", // شخصي | عمل | دراسة | مهم | أخرى
  "color": "#ff6b6b", // اختياري
  "tags": ["مهم", "عمل"], // اختياري
  "isPinned": false // اختياري
}
```

**Response:**
```json
{
  "success": true,
  "message": "تم إنشاء الملاحظة بنجاح",
  "data": {
    "note": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "ملاحظتي الأولى",
      "content": "هذا محتوى الملاحظة",
      "category": "شخصي",
      "color": "#ff6b6b",
      "isPinned": false,
      "isArchived": false,
      "tags": ["مهم", "عمل"],
      "user": "507f1f77bcf86cd799439012",
      "createdAt": "2024-10-24T10:30:00.000Z",
      "updatedAt": "2024-10-24T10:30:00.000Z"
    }
  }
}
```

---

#### 2. جلب جميع الملاحظات (مع فلترة وبحث)
```http
GET /api/notes?category=شخصي&search=مهم&isPinned=true&page=1&limit=20&sortBy=-createdAt
Authorization: Bearer YOUR_TOKEN
```

**Query Parameters:**
- `category` - فلترة حسب التصنيف (شخصي، عمل، دراسة، مهم، أخرى)
- `search` - البحث في العنوان والمحتوى والتاغات
- `isPinned` - true/false - عرض المثبتة فقط
- `isArchived` - true/false - عرض المؤرشفة (افتراضياً false)
- `page` - رقم الصفحة (افتراضياً 1)
- `limit` - عدد النتائج في الصفحة (افتراضياً 20)
- `sortBy` - الترتيب (-createdAt, createdAt, -updatedAt, title)

**Response:**
```json
{
  "success": true,
  "data": {
    "notes": [ ... ],
    "pagination": {
      "total": 50,
      "page": 1,
      "pages": 3,
      "limit": 20
    }
  }
}
```

---

#### 3. جلب ملاحظة واحدة
```http
GET /api/notes/:id
Authorization: Bearer YOUR_TOKEN
```

---

#### 4. تحديث ملاحظة
```http
PUT /api/notes/:id
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "عنوان محدث",
  "content": "محتوى محدث",
  "category": "عمل",
  "color": "#4ecdc4",
  "tags": ["محدث"],
  "isPinned": true
}
```

---

#### 5. حذف ملاحظة
```http
DELETE /api/notes/:id
Authorization: Bearer YOUR_TOKEN
```

---

#### 6. تثبيت/إلغاء تثبيت ملاحظة
```http
PATCH /api/notes/:id/pin
Authorization: Bearer YOUR_TOKEN
```

---

#### 7. أرشفة/إلغاء أرشفة ملاحظة
```http
PATCH /api/notes/:id/archive
Authorization: Bearer YOUR_TOKEN
```

---

#### 8. الحصول على إحصائيات الملاحظات
```http
GET /api/notes/stats
Authorization: Bearer YOUR_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total": 50,
      "pinned": 5,
      "archived": 10
    },
    "byCategory": [
      { "_id": "شخصي", "count": 20 },
      { "_id": "عمل", "count": 15 },
      { "_id": "دراسة", "count": 10 },
      { "_id": "مهم", "count": 5 }
    ]
  }
}
```

---

## 📌 أمثلة استخدام

### مثال كامل بـ JavaScript (Fetch API)

```javascript
// التسجيل
const register = async () => {
  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'ahmad',
      email: 'ahmad@example.com',
      password: '123456'
    })
  });
  
  const data = await response.json();
  const token = data.data.token;
  
  // حفظ التوكن
  localStorage.setItem('token', token);
};

// إنشاء ملاحظة
const createNote = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3000/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: 'ملاحظتي',
      content: 'محتوى الملاحظة',
      category: 'شخصي',
      tags: ['مهم']
    })
  });
  
  const data = await response.json();
  console.log(data);
};

// جلب الملاحظات
const getNotes = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3000/api/notes?category=شخصي&search=مهم', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  console.log(data.data.notes);
};
```

---

## ❌ Error Responses

جميع الأخطاء تأتي بالصيغة التالية:

```json
{
  "success": false,
  "message": "رسالة الخطأ",
  "errors": ["تفاصيل إضافية إن وجدت"]
}
```

### أكواد الأخطاء الشائعة:
- `400` - Bad Request (بيانات غير صحيحة)
- `401` - Unauthorized (غير مصرح)
- `404` - Not Found (غير موجود)
- `500` - Internal Server Error (خطأ في السيرفر)

---

## 🔒 الأمان

- جميع كلمات المرور مشفرة باستخدام bcrypt
- التوكنات تستخدم JWT مع صلاحية 30 يوم
- CORS مفعّل للسماح بالطلبات من الفرونت اند
- جميع البيانات محمية حسب المستخدم

---

## 🚀 البدء

1. انسخ `.env.example` إلى `.env`
2. عدّل `JWT_SECRET` في ملف `.env`
3. شغّل السيرفر: `npm run dev`
4. جرب الـ API على: `http://localhost:3000`

---

## 📦 الهيكل

```
├── models/          # نماذج قاعدة البيانات
│   ├── User.js
│   └── Note.js
├── controllers/     # معالجات الطلبات
│   ├── authController.js
│   └── noteController.js
├── routes/          # المسارات
│   ├── authRoutes.js
│   └── noteRoutes.js
├── middleware/      # الوسيطات
│   ├── auth.js
│   └── errorHandler.js
└── app.js          # الملف الرئيسي
```

---

## 🎯 ميزات احترافية

✅ نظام مصادقة كامل (Register/Login/JWT)  
✅ تشفير كلمات المرور (bcrypt)  
✅ CRUD كامل للملاحظات  
✅ بحث وفلترة متقدمة  
✅ ترقيم الصفحات (Pagination)  
✅ تثبيت وأرشفة الملاحظات  
✅ التاغات والألوان  
✅ إحصائيات الملاحظات  
✅ Error Handling احترافي  
✅ Validation كامل  
✅ جاهز للنشر على Vercel  

---

Made with ❤️
