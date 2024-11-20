SHELL = /bin/bash
.ONESHELL:
.EXPORT_ALL_VARIABLES:

-include .env

dev:
	npm run dev

build:
	npm run build

download:
	node src/data/releases.json.js > src/data/raw/releases.json
	node src/data/contributors.json.js > src/data/raw/contributions.json
	node src/data/pull_requests.json.js > src/data/raw/pull_requests.json