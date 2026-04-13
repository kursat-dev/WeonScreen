# WeonScreen

WeonScreen, modern ve dinamik bir bilgilendirme ekranı (digital signage) çözümüdür. Eğitim kurumları, ofisler veya ortak alanlarda yemek menüleri, duyurular ve önemli mesajların (alt yazı bandı) şık bir şekilde sergilenmesini sağlar.

## 🚀 Özellikler

- **Yemek Menüsü**: Haftalık yemek listesini düzenli bir şekilde gösterir.
- **Duyurular**: Önemli haberleri ve görsel içerikleri geniş bir ekranda sunar.
- **Alt Yazı Bandı (Ticker)**: Ekranın alt kısmında akıcı bir şekilde geçen önemli duyuru metinleri.
- **Gelişmiş Tasarım**: Premium görünümlü, animasyonlu ve modern bir kullanıcı arayüzü.
- **Admin Paneli**: Tüm içeriklerin kolayca güncellenebildiği ve yönetilebildiği gizli bir yönetim arayüzü.

## 🛠️ Teknoloji Yığını

- **Frontend**: Vite + Vanilla JS + CSS3
- **Backend**: Node.js + Express
- **Veritabanı**: MongoDB (Atlas) + Mongoose
- **Deployment**: Vercel ready (Serverless functions)

## 📁 Proje Yapısı

- `src/` & `main.js`: Uygulama arayüzü ve frontend mantığı.
- `backend/`: Express sunucusu, modeller ve kontrolcüler (Backend çekirdeği).
- `api/`: Vercel Serverless deployment için köprü fonksiyonu.
- `public/`: Statik varlıklar (arkaplan videoları, resimler).

## 💻 Kurulum ve Çalıştırma

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. `.env` dosyasını oluşturup `MONGODB_URI` ve `JWT_SECRET` bilgilerinizi girin.
3. Uygulamayı başlatın:
   ```bash
   npm run dev
   ```

## 🌐 Deployment (Vercel)

Bu proje Vercel üzerinde çalışmak üzere optimize edilmiştir. GitHub'a push yapıldığında Vercel otomatik olarak frontend'i build eder ve `api/` klasöründeki backend fonksiyonlarını yayına alır.
