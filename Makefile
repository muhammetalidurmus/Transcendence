include .env

all:
	@docker-compose -f docker-compose.yml up --build

down:
	@docker-compose -f srcs/docker-compose.yml down

re: clean all

clean:
	@echo "Stopping all running containers..."
	@docker stop $$(docker ps -aq)
	@echo "Removing all containers..."
	@docker rm $$(docker ps -aq)
	@echo "Cleaning up unused Docker volumes and networks..."
	@docker volume prune -f
	@docker network prune -f
	@echo "All containers, volumes, and networks have been removed."
	
clear:
	@docker system prune -a -f

.PHONY: all down re clean clear