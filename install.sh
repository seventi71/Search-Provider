#!/bin/bash

# Compile schemas
echo "Compiling schemas ..."
glib-compile-schemas $(pwd)/schemas/

# Remove existing extension
if [ -d ~/.local/share/gnome-shell/extensions/SearchProvider@github.com ]; then
    echo "Removing existing extension ..."
    rm -rf ~/.local/share/gnome-shell/extensions/SearchProvider@github.com
else
    echo "No existing extension found."
fi

# Copy development version
echo "Copying development version ..."
cp -r . ~/.local/share/gnome-shell/extensions/SearchProvider@github.com

# Confirm installation
echo "Installed SearchProvider@github.com"
