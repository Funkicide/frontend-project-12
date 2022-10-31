install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-frontend & make start-backend

lint-frontend:
	make -C frontend lint