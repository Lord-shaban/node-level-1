# مجموعة Requests للاختبار

يمكنك استخدام هذه الـ requests في Postman, Thunder Client, أو أي HTTP client.

## 🔐 Authentication Requests

### 1. تسجيل مستخدم جديد
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "username": "ahmed",
  "email": "ahmed@example.com",
  "password": "123456"
}
```

### 2. تسجيل الدخول
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "123456"
}
```

احفظ الـ `token` من الاستجابة!

### 3. معلومات المستخدم الحالي
```
GET http://localhost:3000/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📝 Notes Requests

**ملاحظة:** جميع هذه الطلبات تحتاج إلى التوكن في الهيدر:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

### 1. إنشاء ملاحظة
```
POST http://localhost:3000/api/notes
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "قائمة المهام اليومية",
  "content": "1. الاستيقاظ مبكراً\n2. ممارسة الرياضة\n3. العمل على المشروع",
  "category": "شخصي",
  "color": "#ff6b6b",
  "tags": ["مهم", "يومي"],
  "isPinned": true
}
```

### 2. جلب جميع الملاحظات
```
GET http://localhost:3000/api/notes
Authorization: Bearer YOUR_TOKEN_HERE
```

### 3. البحث والفلترة
```
GET http://localhost:3000/api/notes?search=مهام&category=شخصي&isPinned=true
Authorization: Bearer YOUR_TOKEN_HERE
```

### 4. جلب ملاحظة واحدة
```
GET http://localhost:3000/api/notes/NOTE_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

### 5. تحديث ملاحظة
```
PUT http://localhost:3000/api/notes/NOTE_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "قائمة مهام محدثة",
  "content": "محتوى جديد",
  "category": "عمل"
}
```

### 6. تثبيت ملاحظة
```
PATCH http://localhost:3000/api/notes/NOTE_ID_HERE/pin
Authorization: Bearer YOUR_TOKEN_HERE
```

### 7. أرشفة ملاحظة
```
PATCH http://localhost:3000/api/notes/NOTE_ID_HERE/archive
Authorization: Bearer YOUR_TOKEN_HERE
```

### 8. حذف ملاحظة
```
DELETE http://localhost:3000/api/notes/NOTE_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

### 9. الإحصائيات
```
GET http://localhost:3000/api/notes/stats
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🧪 سيناريو اختبار كامل

1. **التسجيل:** سجل حساب جديد
2. **الدخول:** سجل دخول واحصل على التوكن
3. **إنشاء ملاحظات:** أنشئ 3-5 ملاحظات مختلفة
4. **البحث:** جرب البحث عن كلمة معينة
5. **التثبيت:** ثبّت ملاحظة واحدة
6. **التحديث:** عدّل ملاحظة
7. **الإحصائيات:** اعرض الإحصائيات
8. **الحذف:** احذف ملاحظة

---

## 📱 استخدام مع cURL

```bash
# التسجيل
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"123456"}'

# تسجيل الدخول
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# إنشاء ملاحظة (استبدل YOUR_TOKEN)
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test","content":"Content","category":"شخصي"}'
```
