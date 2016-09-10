#!/usr/bin/env bash

concurrently --kill-others "gulp" "electron . --debug"
