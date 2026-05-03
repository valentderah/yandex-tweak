.PHONY: dev build zip

NPM ?= npm

VERSION := $(shell node -p "require('./package.json').version")
ZIP_NAME ?= yandex-tweak-$(VERSION).zip

dev:
	$(NPM) run dev

build:
	$(NPM) run build

ifeq ($(OS),Windows_NT)
zip: build
	powershell.exe -NoProfile -Command "Compress-Archive -Path '.\dist\*' -DestinationPath '.\$(ZIP_NAME)' -Force"
else
zip: build
	cd dist && zip -r ../$(ZIP_NAME) . -q
endif
