# Konteynerları image isimlerine göre durdurup kaldırmak için değişkenler
BACKEND_IMAGE=transcendence_backend
FRONTEND_IMAGE=transcendence_frontend
NGINX_IMAGE=transcendence_nginx
POSTGRES_IMAGE=postgres

# Tüm Docker işlemleri
all:
	@docker-compose -f docker-compose.yml up --build

re: clean all

down:
	@docker-compose -f docker-compose.yml down

# Belirli Docker imajlarına bağlı çalışan konteynerları bulup kaldırma
clean: down
	@echo "Stopping and removing containers based on image names..."
	@docker ps -aq --filter ancestor=$(BACKEND_IMAGE) | xargs -r docker stop | xargs -r docker rm
	@docker ps -aq --filter ancestor=$(FRONTEND_IMAGE) | xargs -r docker stop | xargs -r docker rm
	@docker ps -aq --filter ancestor=$(NGINX_IMAGE) | xargs -r docker stop | xargs -r docker rm
	@docker ps -aq --filter ancestor=$(POSTGRES_IMAGE) | xargs -r docker stop | xargs -r docker rm
	@echo "Removing images..."
	@docker rmi -f $(BACKEND_IMAGE) $(FRONTEND_IMAGE) $(NGINX_IMAGE) $(POSTGRES_IMAGE) || true
	@echo "Cleaning up unused Docker volumes..."
	@docker volume prune -f

clear:
	@docker system prune -a -f

.PHONY: all down clean clear re