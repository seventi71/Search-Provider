import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';

import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class SwitchFocusTypePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {

      // Create a Settings Page
        const settingsPage = new Adw.PreferencesPage({
            title: 'Settings',
            icon_name: 'emblem-system-symbolic',
        });
        window.add(settingsPage);

      // Create a preferences page
        const page = new Adw.PreferencesPage({
            title: 'Providers',
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

      // Set intial window size
        window.set_default_size(600,880);

        const group = new Adw.PreferencesGroup({
            title: 'Search Providers`',
            description: ' Choose the providers you want to see in the search.',
        });
        page.add(group);

        // Create a Prefferences rows
        const rowGemini = new Adw.SwitchRow({
            title: 'Show Gemini (/g)',
            subtitle: 'Show Ask Gemini, e.g. How to make a curry?',
        });
        group.add(rowGemini);

        const rowSearch = new Adw.SwitchRow({
            title: 'Show Search (/s)',
            subtitle: 'Show Google Search, e.g. Reddit Best Linux Repo',
        });
        group.add(rowSearch);

        const rowYouTube = new Adw.SwitchRow({
            title: 'Show YouTube (/y)',
            subtitle: 'Show Search YouTube, e.g. Focus Music',
        });
        group.add(rowYouTube);

        const rowMaps = new Adw.SwitchRow({
            title: 'Show Maps (/m)',
            subtitle: 'Show Search Maps, eg. Directions to London',
        });
        group.add(rowMaps);

        const rowNews = new Adw.SwitchRow({
            title: 'Show News (/n)',
            subtitle: 'Show Search News, e.g. Local or "topic"',
        });
        group.add(rowNews);

        const rowTranslate = new Adw.SwitchRow({
            title: 'Show Translate (/t)',
            subtitle: 'Show Translate, e.g. Hello, there stranger',
        });
        group.add(rowTranslate);

        const rowWeather = new Adw.SwitchRow({
            title: 'Show Weather (/w)',
            subtitle: 'Show Weather, e.g. Local or "town"',
        });
        group.add(rowWeather);

        const rowFlights = new Adw.SwitchRow({
            title: 'Show Flights (/f)',
            subtitle: 'Show Google Flights, e.g. London to NYC',
        });
        group.add(rowFlights);

        const rowShopping = new Adw.SwitchRow({
            title: 'Show Shopping (/h)',
            subtitle: 'Show Google Shopping, e.g. Linux laptop',
        });
        group.add(rowShopping);

        const rowBooks = new Adw.SwitchRow({
            title: 'Show Books (/b)',
            subtitle: 'Show Google Books, e.g. linux for beginners',
        });
        group.add(rowBooks);

        // Show link always last in list.
        const rowLink = new Adw.SwitchRow({
            title: 'Show Link (/l)',
            subtitle: 'Show Open Link, e.g Localhost:8000',
        });
        group.add(rowLink);

        const infoBoxPref = new Adw.PreferencesGroup({
            title: 'Usage notes:',
            description: 'These will show on activation characters as large icons.' +
                       '\n When using shortcuts, it ignores these settings.' +
                       '\n Use shortcuts to quick select any provider.'
        });
        page.add(infoBoxPref);



        const settingsGroup = new Adw.PreferencesGroup({
            title: 'Settings',
            description: ' Choose how you want the provider to behave.',
        });
        settingsPage.add(settingsGroup);

      const rowShortcuts = new Adw.SwitchRow({
        title: 'Shortcuts',
        subtitle: 'Activates shortcut characters to quick select a provider.',
      });
      settingsGroup.add(rowShortcuts);

      const rowOnlyShortcuts = new Adw.SwitchRow({
        title: 'Only Shortcuts',
        subtitle: 'Will only activate on a shortcut character and provider letter.',
      });
      settingsGroup.add(rowOnlyShortcuts);

      // Create a Settings rows
      const spinRow = new Adw.SpinRow({
        title: 'Activation',
        subtitle: 'Minimum characters before results appear.',
        adjustment: new Gtk.Adjustment({ value: 3, lower: 1, upper: 20, step_increment: 1 }),
      });
      settingsGroup.add(spinRow);

      const rowAppSearch = new Adw.SwitchRow({
        title: 'Location',
        subtitle: 'Make the provider appear at the top of the results.',
      });
      settingsGroup.add(rowAppSearch);

      const infoBoxSettings = new Adw.PreferencesGroup({
        title: 'Usage notes:',
        description: ' Choose the number of characters required to activate.' +
                       '\n Shortcuts activate with "/" character and provider letter.' +
                       '\n Changing the provider location, requires re-login.',
        });
        settingsPage.add(infoBoxSettings);

        // Dependancies of switches
        rowShortcuts.connect('notify::active', () => {
          rowOnlyShortcuts.sensitive = rowShortcuts.active;
          if (!rowShortcuts.active) {
            rowOnlyShortcuts.active = false;
            spinRow.sensitive = true;
          }
        });

        rowOnlyShortcuts.connect('notify::active', () => {
          spinRow.sensitive = !rowOnlyShortcuts.active;
        });

        window._settings = this.getSettings();
        // Pass the settings
        window._settings.bind('show-shortcuts', rowShortcuts, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('only-shortcuts', rowOnlyShortcuts, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('activation-chars', spinRow, 'value',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-app-search', rowAppSearch, 'active',
            Gio.SettingsBindFlags.DEFAULT);

        // Providers activations
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
        window._settings.bind('show-flights', rowFlights, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-shopping', rowShopping, 'active',
            Gio.SettingsBindFlags.DEFAULT);
        window._settings.bind('show-books', rowBooks, 'active',
            Gio.SettingsBindFlags.DEFAULT);
    }
}
