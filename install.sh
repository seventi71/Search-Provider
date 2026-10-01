#!/bin/bash
# Build development version
set -euo pipefail

BUILD_DIR="$(pwd)/build"
EXT_NAME="SearchProvider@github.com"

if [ -d "$BUILD_DIR" ]; then
    echo "Removing existing build ..."
    rm -rf "$BUILD_DIR"
fi

echo "Building development version ..."
mkdir -p "$BUILD_DIR"
cp -r ./* "$BUILD_DIR/" 2>/dev/null || true
rm -rf "$BUILD_DIR/build"

echo "Cleaning build ..."
rm -rf "$BUILD_DIR/.git"
rm -f "$BUILD_DIR/install.sh"

echo "Creating zip package ..."
rm -rf "$BUILD_DIR/build"
zip -r "$BUILD_DIR/$EXT_NAME.zip" . -x '*.git*' '*.sh' 'build/*'

mv "$BUILD_DIR/$EXT_NAME.zip" ../

echo "Compiling schemas ..."
glib-compile-schemas "$BUILD_DIR/schemas/"

TARGET_DIR="$HOME/.local/share/gnome-shell/extensions/$EXT_NAME"
if [ -d "$TARGET_DIR" ]; then
    echo "Removing existing extension ..."
    rm -rf "$TARGET_DIR"
else
    echo "No existing extension found."
fi

echo "Copying development version ..."
mkdir -p "$TARGET_DIR"
cp -r "$BUILD_DIR"/* "$TARGET_DIR/"

if [ -d "$TARGET_DIR" ]; then
    echo "Installed $EXT_NAME"
else
    echo "Failed to install $EXT_NAME"
fi

echo "Removing build directory ..."
rm -rf "$BUILD_DIR"
