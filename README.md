# MAS — GitHub Pages Export

هذه نسخة ثابتة مستقلة من موقع ماس، مجهزة للنشر عبر **GitHub Pages**. كل صور المنتجات والأصول الضرورية موجودة محلياً داخل `client/public/assets`، لذلك لا تعتمد النسخة على تخزين Manus.

## التشغيل محلياً

```bash
npm install
npm run dev
```

## البناء

```bash
npm run build
```

## النشر إلى GitHub Pages

الملف `.github/workflows/deploy-pages.yml` يعمل **يدوياً فقط** عبر `workflow_dispatch` حتى لا يتم النشر تلقائياً. بعد اختيار **GitHub Actions** كمصدر Pages من إعدادات المستودع، افتح تبويب **Actions** وشغّل سير العمل `Deploy MAS to GitHub Pages`.

> GitHub Pages يستضيف واجهة ثابتة فقط. خريطة الموزعين في هذه النسخة تفتح المسارات عبر Google Maps، ولا تعتمد على خادم أو مفاتيح سرية.
