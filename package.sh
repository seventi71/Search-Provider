#!/bin/bash

if [ -d "SearchProvider@github.com" ]; then
    echo "Removing old package ..."
    rm -rf "SearchProvider@github.com"
fi

echo "Creating directory ..."
mkdir "SearchProvider@github.com"
cp -r . "SearchProvider@github.com/"

echo "Cleaning unnecessary files ..."
rm "SearchProvider@github.com/README.md" "SearchProvider@github.com/package.sh" "SearchProvider@github.com/install.sh" "SearchProvider@github.com/LICENSE"
rm "SearchProvider@github.com/schemas/gschemas.compiled"
rm -rf "SearchProvider@github.com/SearchProvider@github.com"

echo "Creating archive package ..."
zip -r "SearchProvider@github.com.zip" "SearchProvider@github.com/"
rm -rf "SearchProvider@github.com"
