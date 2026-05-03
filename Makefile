.PHONY: dev build prod zip crx

NPM ?= npm

PKG_VERSION := $(shell node -p "require('./package.json').version")

BUILDS_DIR      ?= builds
ZIP_NAME        ?= $(BUILDS_DIR)/yandex-tweak-$(PKG_VERSION).zip
CRX_NAME        ?= $(BUILDS_DIR)/yandex-tweak-$(PKG_VERSION).crx
CRX_PRIVATE_KEY ?= yandex-tweak.pem

ifeq ($(OS),Windows_NT)
  RUN_ZIP = powershell.exe -NoProfile -Command "Compress-Archive -Path '.\dist\*' -DestinationPath '.\$(ZIP_NAME)' -Force"
else
  RUN_ZIP = cd dist && zip -r ../$(ZIP_NAME) . -q
endif

PACK_CRX = $(NPM) exec crx -- pack dist -p $(CRX_PRIVATE_KEY) -o $(CRX_NAME)

$(BUILDS_DIR):
	@node -e "require('fs').mkdirSync('$(BUILDS_DIR)', { recursive: true })"

dev:
	$(NPM) run dev

build:
	$(NPM) run build

zip: build | $(BUILDS_DIR)
	$(RUN_ZIP)

crx: build | $(BUILDS_DIR)
	$(PACK_CRX)

# One webpack run, then ZIP and CRX without nested make invocations.
prod: build | $(BUILDS_DIR)
	$(RUN_ZIP)
	$(PACK_CRX)
