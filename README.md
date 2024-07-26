
# Oyun Projesi

Bu proje, kullanıcıların login olarak 1 vs 1, 2 vs 2 ve Turnuva modlarında oyun oynayabildiği bir SPA (Tek Sayfa Uygulaması) web sitesidir. 

## Özellikler

- **Kullanıcı Kaydı ve Giriş:**
  - Kullanıcılar, mevcut Ecole42 login bilgileriyle üye olabilir.
  - Ecole42 bünyesinde bulunmayan bir e-posta ve kullanıcı adıyla yeni bir hesap oluşturabilirler.
  - Profil sekmesinden iki faktörlü doğrulama (2FA) ayarları yapılabilir.

- **Dil Desteği:**
  - Türkçe, İngilizce ve Rusça olmak üzere 3 dil desteği mevcuttur.
  - Sayfa girişinde kullanıcılar diledikleri dili seçebilirler.

- **Profil Yönetimi:**
  - Profil resmini değiştirme özelliği sunulmaktadır.

- **Güvenlik:**
  - Kullanıcı kimlik doğrulaması ve güvenliği için JWT (JSON Web Token) kullanılmaktadır.
  - HTTPS uzantısı tercih edilmiştir.

- **Oyuncu Özelleştirmesi:**
  - Oyuncular için renk seçim seçeneği sağlanmıştır.

## Kullanılan Teknolojiler ve Paketler

- **Veritabanı:** PostgreSQL
- **Web Sunucusu:** Nginx
- **Backend:** Django
- HTML
- CSS
- JavaScript
- Bootstrap
- Docker
- Python

## Kurulum ve Çalıştırma

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/kullaniciadiniz/proje-adi.git
   ```

2. Proje dizinine gidin:
   ```bash
   cd proje-adi
   ```

3. .env dosyası oluşturun ve doğru parametreleri girin:
   ```bash
   
    Eclient_secret=
    Eclient_id=
    
    SECRETKEY=
    JWTKEY=
    
    EMAIL_HOST=
    EMAIL_PORT=
    EMAIL_USE_TLS=
    EMAIL_HOST_USER=
    EMAIL_HOST_PASSWORD=
    
    PGPASSWORD=
    PGUSER=
    PGDATABASE=
    PGPORT=
    PGHOST=

   ```
5. Kod üstündeki request isteklerinde bulunan ip adresinizi local ip adresiyle değiştirin:

6. Make File ile projeyi çalıştırın:
   ```bash
   make
   ```

7. Web uygulamasına tarayıcı üzerinden erişin:
   ```
   https://İPADRES
   ```
