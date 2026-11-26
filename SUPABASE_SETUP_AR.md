# توصيل Journalism Academy بـ Supabase خطوة بخطوة

## 1) أنشئ مشروعًا
افتح https://supabase.com/dashboard واضغط New project. اختر اسمًا مثل `journalism-academy`، وحدد كلمة مرور قاعدة بيانات قوية واحتفظ بها في مكان آمن.

## 2) أنشئ الجداول والصلاحيات
من القائمة اليسرى افتح SQL Editor ثم New query. افتح الملف `supabase-schema.sql` الموجود داخل مجلد الموقع، وانسخ كل محتواه إلى المحرر، ثم اضغط Run. انتظر ظهور نجاح التنفيذ. هذا ينشئ الجداول والسياسات وسلة `lecture-pdfs` ويضيف 16 مقررًا كبداية.

## 3) انسخ بيانات الاتصال العامة
من Project Settings > API:
- انسخ Project URL.
- انسخ Publishable key. في المشاريع الأقدم قد يظهر باسم anon/public key.

افتح `supabase-config.js` واكتب القيم مثل هذا المثال (استبدل القيم بمعلومات مشروعك):

```js
window.JA_SUPABASE_CONFIG = {
  url: "https://YOUR-PROJECT-REF.supabase.co",
  anonKey: "sb_publishable_YOUR_PUBLIC_KEY"
};
```

لا تستخدم مفتاح `service_role` أو أي Secret key هنا.

## 4) اضبط رابط GitHub Pages في Supabase
من Authentication > URL Configuration:
- ضع رابط GitHub Pages في Site URL، مثل `https://USERNAME.github.io/REPOSITORY/`.
- أضف نفس الرابط إلى Redirect URLs.
- راجع إعدادات Email provider وتأكيد البريد.

## 5) ارفع الملفات المعدلة
ارفع كل ملفات مجلد `journalism_academy` إلى جذر مستودع GitHub، بما فيها `supabase-config.js` و`supabase-schema.sql`، واستبدل الملفات القديمة ثم اضغط Commit changes. افتح رابط GitHub Pages بعد اكتمال النشر.

## 6) فعّل حساب الدكتور
ينشئ نموذج الموقع الحسابات الجديدة بدور طالب تلقائيًا. بعد أن ينشئ الدكتور حسابه ويؤكد بريده، افتح SQL Editor ونفذ:

```sql
update public.profiles
set role = 'doctor'
where id = (select id from auth.users where email = 'lecturer@example.com');
```

استبدل البريد ببريد الدكتور الصحيح. بعدها يسجل خروجًا ثم دخولًا من جديد.

## 7) اختبر النظام
1. أنشئ حساب طالب في الفرقة الأولى.
2. اعتمد حسابًا آخر كدكتور باستخدام SQL أعلاه.
3. من حساب الدكتور أضف مقررًا للفرقة الأولى، ثم ارفع ملف PDF، وأنشئ كويزًا للفرقة الأولى.
4. افتح الموقع من متصفح آخر وسجل دخول الطالب، واختر المقرر ثم افتح PDF وحل الكويز.
5. ارجع إلى حساب الدكتور وافتح متابعة النتائج؛ ستظهر محاولة الطالب ودرجته.

## معالجة المشاكل الشائعة
- `Invalid API key`: راجع أنك نسخت Publishable/anon key بالكامل.
- `row-level security policy`: تأكد من تنفيذ `supabase-schema.sql` بالكامل، وأن حساب الدكتور تم اعتماده فعلًا.
- `Email not confirmed`: افتح رسالة Supabase وأكد البريد أو عدّل إعدادات تأكيد البريد.
- المقررات لا تظهر: تأكد أن الجداول تم إنشاؤها وأن المستخدم سجّل الدخول.
- ملفات PDF لا تفتح: تأكد من أن ملف SQL أنشأ bucket باسم `lecture-pdfs` وأن الدكتور يرفع للمقرر الذي أنشأه.
