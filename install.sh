#!/bin/bash

# Compile schemas
glib-compile-schemas ~/Agent/projects/SearchProvider@github.com/schemas/

# Remove existing extension
rm -rf ~/.local/share/gnome-shell/extensions/SearchProvider@github.com

# Copy development version
cp -r ~/Agent/projects/SearchProvider@github.com ~/.local/share/gnome-shell/extensions/

# Confirm installation
echo "Installed SearchProvider@github.com"
