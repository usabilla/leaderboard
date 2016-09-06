#!/usr/bin/env bash

gulp build --prod && electron-packager . \
    Leaderboard \
    --asar \
    --platform=darwin \
    --arch=x64 \
    --version=1.3.5 \
    --overwrite \
    --ignore="node_modules|.idea|.sass-cache|src|.gitignore|gulpfile.js|README.md"
