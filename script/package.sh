#!/usr/bin/env bash

rimraf dist && \

webpack --config config/webpack.prod.js --progress --profile --bail && \

cp package.json main.js menu.js dist && \

electron-packager dist \
    Leaderboard \
    --asar \
    --asar-unpack=protocol-link.html \
    --platform=darwin \
    --arch=x64 \
    --version=1.3.5 \
    --overwrite \
    --icon=assets/app-icons/mac/app.icns \
    --prune=true \
    --out=out \
    --ignore="node_modules|.idea|.sass-cache|src|.gitignore|gulpfile.js|README.md"
