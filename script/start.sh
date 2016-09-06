#!/usr/bin/env bash

concurrently "gulp" "electron . --debug"
