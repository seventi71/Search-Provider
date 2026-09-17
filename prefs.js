import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';

import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class SwitchFocusTypePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {

      // Create a preferences page
        const page = new Adw.PreferencesPage({
            title: 'Preferences',
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

      // Set intial window size
        window.set_default_size(600, 720);

        const group = new Adw.PreferencesGroup({
            title: 'Search Preferences',
            description: ' Choose the providers you want to see in the search.',
        });
        page.add(group);

        // Create a Prefferences rows
        const rowGemini = new Adw.SwitchRow({
            title: 'Show Gemini',
            subtitle: 'Show Ask Gemini, e.g. How to make a curry?',
        });
        group.add(rowGemini);

        const rowSearch = new Adw.SwitchRow({
            title: 'Show Search',
            subtitle: 'Show Google Search, e.g. Reddit Best Linux Repo',
        });
        group.add(rowSearch);

        const rowYouTube = new Adw.SwitchRow({
            title: 'Show YouTube',
            subtitle: 'Show Search YouTube, e.g. Focus Music',
        });
        group.add(rowYouTube);

        const rowMaps = new Adw.SwitchRow({
            title: 'Show Maps',
            subtitle: 'Show Search Maps, eg. Directions to "location"',
        });
        group.add(rowMaps);

        const rowNews = new Adw.SwitchRow({
            title: 'Show News',
            subtitle: 'Show Search News, e.g. Local or "topic"',
        });
        group.add(rowNews);

        const rowTranslate = new Adw.SwitchRow({
            title: 'Show Translate',
            subtitle: 'Show Translate, e.g. Hello, there stranger',
        });
        group.add(rowTranslate);

        const rowWeather = new Adw.SwitchRow({
            title: 'Show Weather',
            subtitle: 'Show Weather, e.g. Local or "town"',
        });
      group.add(rowWeather);

        const rowLink = new Adw.SwitchRow({
            title: 'Show Link',
            subtitle: 'Show Open Link, e.g Localhost:8000',
        });
        group.add(rowLink);

        const infoBoxPref = new Adw.PreferencesGroup({
            title: 'Usage notes:',
            description: ' Enable/Disable the providers you want to see in the search.' +
                       '\n Only the first 6 providers chosen will be visible. ' +
                       '\n Check settings to change position and activation.'
        });
        page.add(infoBoxPref);

      // Create a Settings Page
        const settingsPage = new Adw.PreferencesPage({
            title: 'Settings',
            icon_name: 'emblem-system-symbolic',
        });

        window.add(settingsPage);
        const settingsGroup = new Adw.PreferencesGroup({
            title: 'Settings',
            description: ' Choose how you want the provider to behave.',
        });
        settingsPage.add(settingsGroup);

      // Create a Settings rows
      const spinRow = new Adw.SpinRow({
          title: 'Activation Characters',
          subtitle: 'Minimum characters before results appear.',
          adjustment: new Gtk.Adjustment({ value: 3, lower: 1, upper: 20, step_increment: 1 }),
      });
      settingsGroup.add(spinRow);

      const rowAppSearch = new Adw.SwitchRow({
          title: 'Top Location',
          subtitle: 'Make the provider appear at the top of the results.',
        });
        settingsGroup.add(rowAppSearch);

        const infoBoxSettings = new Adw.PreferencesGroup({
            title: 'Usage notes:',
            description: ' Choose the number of characters required to activate.' +
                       '\n Places the provider first or last on the results page.' +
                       '\n Changing the provider order, requires re-login.',
        });
        settingsPage.add(infoBoxSettings);

        // Pass the settings to the window
        window._settings = this.getSettings();
        window._settings.bind('activation-chars', spinRow, 'value', Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-app-search', rowAppSearch, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-link', rowLink, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-gemini', rowGemini, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-search', rowSearch, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-maps', rowMaps, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-news', rowNews, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-translate', rowTranslate, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-youtube', rowYouTube, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-weather', rowWeather, 'active',
            Gio.SettingsBindFlags.DEFAULT);
    }
}
