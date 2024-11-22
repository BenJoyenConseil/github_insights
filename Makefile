SHELL = /bin/bash
.ONESHELL:
.EXPORT_ALL_VARIABLES:

-include .env

install:
	npm install
	python3 -m venv venv
	source venv/bin/activate
	pip install dbt-duckdb==1.9.0

dev:
	npm run dev

build:
	npm run build

transform:
	source venv/bin/activate
	dbt run

download:
	node src/data/releases.json.js > src/data/raw/releases.json
	node src/data/pull_requests.json.js > src/data/raw/pull_requests.json

clean-cache:
	rm -rf dist src/.observablehq logs target