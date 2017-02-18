#!/usr/bin/env bash

rimraf dist && \

webpack --config config/webpack.prod.js --profile --bail && \

cp package.json main.js menu.js dist && \

electron-packager dist \
    Leaderboard \
    --asar \
    --asar-unpack=protocol-link.html \
    --platform=darwin \
    --arch=x64 \
    --electron-version=1.4.15 \
    --overwrite \
    --icon=assets/app-icons/mac/app.icns \
    --prune=true \
    --out=out \
    --ignore="node_modules|.idea|.sass-cache|src|.gitignore|README.md"
