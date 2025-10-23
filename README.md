# Node Level 1 - Express & MongoDB API

مشروع API بسيط باستخدام Node.js و Express و MongoDB

## المميزات
- ✅ Express.js Server
- ✅ MongoDB Database (Mongoose)
- ✅ RESTful API للمنشورات (Posts)
- ✅ جاهز للرفع على Vercel

## التثبيت المحلي

```bash
# تثبيت المكتبات
npm install

# تشغيل السيرفر للتطوير
npm run dev

# تشغيل السيرفر العادي
npm start
```

## الرفع على Vercel

### الطريقة الأولى: من خلال موقع Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول باستخدام GitHub
3. اضغط على "Add New Project"
4. اختر المشروع من GitHub
5. اضغط على "Deploy"

### الطريقة الثانية: من خلال Vercel CLI
```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# رفع المشروع
vercel
```

## الـ API Endpoints

### Posts (المنشورات)
- `GET /posts` - جلب جميع المنشورات
- `GET /posts/:id` - جلب منشور معين
- `POST /posts` - إنشاء منشور جديد
- `DELETE /posts/:id` - حذف منشور

### Routes أخرى
- `GET /home` - الصفحة الرئيسية
- `GET /test` - صفحة اختبار
- `POST /add` - إضافة بيانات
- `GET /sum/:num1/:num2` - جمع رقمين

## ملاحظات مهمة
- تأكد من رفع الكود على GitHub أولاً
- ملف `vercel.json` يحتوي على إعدادات Vercel
- قاعدة البيانات MongoDB Atlas تعمل في الـ Production

## License
ISC
