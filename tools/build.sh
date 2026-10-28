#!/usr/bin/env bash
# AI Pusulası derleme betiği
# - Site dosyalarını Chrome eklentisine kopyalar (panel.html = index.html)
# - Eklentiyi ve Claude skill'ini zip olarak paketler (dist/)
# Kullanım: bash tools/build.sh
set -euo pipefail
cd "$(dirname "$0")/.."

# 1) Site -> eklenti
rm -rf extension/data
mkdir -p extension/data
cp index.html extension/panel.html
cp style.css app.js extension/
cp data/*.js extension/data/

# 2) Simgeler yoksa çiz
[ -f extension/icons/icon128.png ] || python3 tools/make_icons.py

# 3) Paketler
mkdir -p dist
rm -f dist/ai-pusulasi-extension.zip dist/ai-pusulasi-skill.zip
(cd extension && zip -qr ../dist/ai-pusulasi-extension.zip . -x '.*')
(cd skill && zip -qr ../dist/ai-pusulasi-skill.zip ai-pusulasi -x '.*')

echo "Hazır: dist/ai-pusulasi-extension.zip, dist/ai-pusulasi-skill.zip"
