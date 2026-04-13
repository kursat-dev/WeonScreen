# WeonScreen - Backend

Bu dizin, WeonScreen uygulamasının merkezi API ve veritabanı yönetim katmanını içerir.

## 📂 Klasör Yapısı

- **`/config`**: Veritabanı bağlantı konfigürasyonu (MongoDB connection).
- **`/controllers`**: İsteklerin işlendiği ve veritabanı işlemlerinin yapıldığı mantıksal katman.
- **`/routes`**: Express route tanımlamaları (Duyuru, Menü, Auth vb.).
- **`/models`**: MongoDB için Mongoose şemaları ve veri yapıları.
- **`/middleware`**: Kimlik doğrulama (JWT), veri doğrulama ve merkezi hata yönetimi katmanları.
- **`/db`**: İlk kurulum için veritabanı seeding (tohumlama) betikleri.

## 🔐 Güvenlik

Sistem, admin girişi gerektiren işlemler için **JWT (JSON Web Token)** kullanır. Kullanıcı şifreleri **bcryptjs** ile karmaşıklaştırılarak saklanır.

## ☁️ Serverless Uyumluluk

Backend, hem yerel sunucuda (`server.js`) hem de Vercel Serverless Function ortamında (`api/`) çalışabilecek şekilde yapılandırılmıştır. Veritabanı bağlantıları `middleware` seviyesinde garanti altına alınarak kopmalar önlenmiştir.
