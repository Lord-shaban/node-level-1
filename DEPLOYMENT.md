# خطوات رفع المشروع على Vercel

## الإعدادات المطلوبة ✅
- ✅ تم إنشاء ملف `vercel.json`
- ✅ تم تحديث `package.json`
- ✅ تم تعديل `app.js` ليكون متوافق مع Vercel
- ✅ تم إنشاء `.gitignore`

## خطوات الرفع:

### 1️⃣ رفع الكود على GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2️⃣ الرفع من موقع Vercel (الأسهل)
1. اذهب إلى https://vercel.com
2. سجل دخول بحساب GitHub
3. اضغط "Add New" ثم "Project"
4. اختر مشروعك `node-level-1`
5. اضغط "Deploy" (لا تحتاج تغيير أي إعدادات)
6. انتظر حتى ينتهي الـ Deployment

### 3️⃣ اختبار المشروع
بعد الرفع، سيعطيك Vercel رابط مثل:
```
https://node-level-1-xxxxxxxxx.vercel.app
```

جرب الروابط التالية:
- `GET /posts` - جلب المنشورات
- `GET /home` - الصفحة الرئيسية
- `GET /test` - صفحة الاختبار

## ملاحظات مهمة ⚠️

1. **قاعدة البيانات MongoDB**:
   - تستخدم MongoDB Atlas (سحابية)
   - لا تحتاج أي تعديلات إضافية

2. **متغيرات البيئة** (اختياري):
   - يمكنك إضافة `MONGODB_URI` في إعدادات Vercel
   - من Settings → Environment Variables

3. **الـ Domain**:
   - Vercel يعطيك domain مجاني
   - يمكنك ربط domain خاص من الإعدادات

## استكشاف الأخطاء 🔍

إذا حدث خطأ:
1. تحقق من Logs في Vercel Dashboard
2. تأكد من أن `vercel.json` موجود
3. تأكد من أن `module.exports = app` موجود في آخر `app.js`

## متابعة التطوير 🚀

عند إضافة تعديلات جديدة:
```bash
git add .
git commit -m "Update features"
git push
```

Vercel سيقوم تلقائياً بإعادة النشر!
