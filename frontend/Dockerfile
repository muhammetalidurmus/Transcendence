# Docker taban alınacak imaj
FROM node:14-alpine

# Çalışma dizini oluştur
WORKDIR /usr/src/app

# http-server yükleyin
RUN npm install -g http-server

# Portu dışa aç
EXPOSE 423

# Sunucuyu başlat
CMD ["http-server", "--port", "423"]