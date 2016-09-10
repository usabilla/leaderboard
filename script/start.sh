#!/usr/bin/env bash

export ENV=development

concurrently --kill-others "webpack-dev-server --inline --progress --port 8080" "electron ."
