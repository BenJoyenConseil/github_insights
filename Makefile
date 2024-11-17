SHELL = /bin/bash
.ONESHELL:
.EXPORT_ALL_VARIABLES:

-include .env

dev:
	npm run dev

build:
	npm run build

download:
	src/data/insight_all_sources_releases.json.sh
	src/data/insight_all_sources_pullrequests.json.sh