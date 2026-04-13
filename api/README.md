# WeonScreen - Vercel Serverless Bridge

Bu klasör, Express backend'in Vercel üzerinde "Serverless Function" olarak çalışmasını sağlayan köprü (bridge) katmanını içerir.

## 🌉 Nasıl Çalışır?

Vercel, `api/` klasörü altındaki dosyaları otomatik olarak global web servisleri olarak görür. 
- **`index.js`**: `backend/server.js` dosyasını içe aktarır ve Vercel'in Node.js runtime'ına uygun şekilde dışa aktarır.

Bu yapı sayesinde tek bir proje içinde hem modern bir frontend hem de güçlü bir backend aynı anda deploy edilmiş olur. 
