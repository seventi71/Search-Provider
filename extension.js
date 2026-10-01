import St from 'gi://St';
import Gio from 'gi://Gio';

import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

/**
 * This extension was created using Zed and Inkling and is open source.
 * Some of the code was reused the extension 'Browser Search Provider'
 * Some of the preferences code was reused from 'Toggle touchpad on or off'
 * This code lives on github at 'https://github.com/seventi71/Search-Provider'
 */

let my_settings;
let ShortcutActive = false;

function cleanTerms(terms) {
  let q = terms.join(" ");
  // Strip leading slash and optional letter from shortcuts (e.g. /g for gemini)
  if (q.startsWith('/')) q = q.replace(/^\/?[a-z]? ?/, '');
  return q;
}

class ChromeSearchProvider {
    constructor(extension) {
        this._extension = extension;
        this.providers = {
            'link': {
                name: 'Open Link',
                description: 'Open a hyperlink. (/l)',
                icon: 'chrome',
                getQuery: function (terms) {
                  let q = cleanTerms(terms);
                  return /^https?:\/\//.test(q) ? q : `http://${q}`;
                }
            },
            'gemini': {
                name: 'Ask Gemini',
                description: 'Ask Gemini a question online. (/g)',
                icon: 'gemini',
                getQuery: function (terms) {
                  let q = cleanTerms(terms);
                  return `https://www.google.com/search?udm=50&aep=12&q=${q}`;
                }
            },
            'search': {
                name: 'Search Google',
                description: 'Search online with Google. (/s)',
                icon: 'search',
                getQuery: function (terms) {
                  let q = cleanTerms(terms);
                  return `https://www.google.com/search?q=${q}`;
                }
            },
            'news': {
                name: 'Search News',
                description: 'Search Google News. (/n)',
                icon: 'news',
                getQuery: function (terms) {
                  let q = cleanTerms(terms);
                  return `https://news.google.com/search?q=${q}`;
                }
            },
            'youtube': {
                name: 'Search YouTube',
                description: 'Search YouTube Videos. (/y)',
                icon: 'youtube',
                getQuery: function (terms) {
                  let q = cleanTerms(terms);
                  return `https://www.youtube.com/results?search_query=${q}`;
                }
            },
            'translate': {
                name: 'Translate',
                description: 'Translate with Google. (/t)',
                icon: 'translate',
                getQuery: function (terms) {
                  let q = cleanTerms(terms);
                  return `https://translate.google.com/?text=${q}`;
                }
            },
            'weather': {
                name: 'Search Weather',
                description: 'Search weather with Google. (/w)',
                icon: 'weather',
                getQuery: function (terms) {
                  let q = cleanTerms(terms);
                  return `https://www.google.com/search?q=${q}+weather`;
                }
            },
            'maps': {
                name: 'Search Maps',
                description: 'Search online with Maps. (/m)',
                icon: 'maps',
                getQuery: function (terms) {
                  let q = cleanTerms(terms);
                  return `https://maps.google.com/?q=${q}`;
                }
            },
            'flights': {
                name: 'Search Flights',
                description: 'Search Google Flights. (/f)',
                icon: 'flights',
                getQuery: function (terms) {
                  let q = cleanTerms(terms);
                  return `https://www.google.com/travel/flights/search?q=${q}`;
                }
            },
            'shopping': {
                name: 'Search Shopping',
                description: 'Search Google Shopping. (/h)',
                icon: 'shopping',
                getQuery: function (terms) {
                  let q = cleanTerms(terms);
                  return `https://www.google.com/search?q=${q}&udm=28`;
                }
            },
            'books': {
                name: 'Search Books',
                description: 'Search Google Books. (/b)',
                icon: 'books',
                getQuery: function (terms) {
                  let q = cleanTerms(terms);
                  return `https://www.google.com/search?udm=36&q=${q}`;
                }
            },
        };
    }

    /**
     * The application of the provider.
     * Applications will return a `Gio.AppInfo` representing themselves.
     * Extensions will usually return `null`.
     *
     * @type {Gio.AppInfo}
     */
      get appInfo() {
        return null;
    }

    /**
     * Whether the provider offers detailed results.
     * Applications will return `true` if they have a way to display more
     * detailed or complete results. Extensions will usually return `false`.
     *
     * @type {boolean}
     */
      get canLaunchSearch() {
        return false;
    }

    /**
     * The unique ID of the provider.
     * Applications will return their application ID. Extensions will usually
     * return their UUID.
     *
     * @type {string}
     */
      get id() {
        return this._extension.uuid;
    }

    /**
     * Launch the search result.
     * This method is called when a search provider result is activated.
     *
     * @param {string} result - The result identifier
     * @param {string[]} terms - The search terms
     */
      activateResult(result, terms) {
        const query = this.providers[result].getQuery(terms);
        Gio.AppInfo.launch_default_for_uri(query, null);
    }

    /**
     * Create a result object.
     * This method is called to create an actor to represent a search result.
     * Implementations may return any `Clutter.Actor` to serve as the display
     * result, or `null` for the default implementation.
     *
     * @param {ResultMeta} meta - A result metadata object
     * @returns {Clutter.Actor|null} An actor for the result
     */
      createResultObject(meta) {
        return null;
    }

    /**
     * Get result metadata.
     * This method is called to get a `ResultMeta` for each identifier.
     * If @cancellable is triggered, this method should throw an error.
     *
     * @async
     * @param {string[]} results - The result identifiers
     * @param {Gio.Cancellable} cancellable - A cancellable for the operation
     * @returns {Promise<ResultMeta[]>} A list of result metadata objects
     */
      getResultMetas(results, cancellable) {

        return new Promise((resolve, reject) => {
          const cancelledId = cancellable.connect(
            () => reject(Error('Operation Cancelled')));

          const resultMetas = [];
          // default icon size
          let iconSize = 96;

          for (const identifier of results) {
            const provider = this.providers[identifier];
            let providerName = provider.name;
            if (ShortcutActive) {
              // small icon size means use short key.
              iconSize = 24;
              providerName = provider.description.match(/\(\/[^)]+\)/)[0].slice(1, -1);
            }
            const meta = {
              id: identifier,
              name: providerName,
              description: provider.description,
              // clipboardText: 'Content for the clipboard',
              createIcon: size => {
                return new St.Icon({
                  gicon: Gio.icon_new_for_string(this._extension.path + '/assets/' + provider.icon + '.png'),
                  width: iconSize,
                  height: iconSize,
                });
              },
            };

                resultMetas.push(meta);
            }

            cancellable.disconnect(cancelledId);
            if (!cancellable.is_cancelled())
                resolve(resultMetas);
        });
    }

    /**
     * Initiate a new search.
     * This method is called to start a new search and should return a list of
     * unique identifiers for the results.
     * If @cancellable is triggered, this method should throw an error.
     *
     * @async
     * @param {string[]} terms - The search terms
     * @param {Gio.Cancellable} cancellable - A cancellable for the operation
     * @returns {Promise<string[]>} A list of result identifiers
     */

    getInitialResultSet(terms, cancellable) {
        ShortcutActive = false;
        const raw = terms.join(" ");
        const identifiers = [];

        // Show hardcoded results when magic keys selected (only if followed by space).
        if (raw.startsWith('/') && (my_settings.get_boolean('show-shortcuts'))) {
            ShortcutActive = true;
            const secondChar = raw.charAt(1);
            switch (secondChar) {
                case 's':
                    identifiers.push('search');
                    return Promise.resolve(identifiers);
                case 'y':
                    identifiers.push('youtube');
                    return Promise.resolve(identifiers);
                case 'w':
                    identifiers.push('weather');
                    return Promise.resolve(identifiers);
                case 'g':
                    identifiers.push('gemini');
                    return Promise.resolve(identifiers);
                case 'n':
                    identifiers.push('news');
                    return Promise.resolve(identifiers);
                case 't':
                    identifiers.push('translate');
                    return Promise.resolve(identifiers);
                case 'm':
                    identifiers.push('maps');
                    return Promise.resolve(identifiers);
                case 'f':
                    identifiers.push('flights');
                    return Promise.resolve(identifiers);
                case 'h':
                    identifiers.push('shopping');
                    return Promise.resolve(identifiers);
                case 'b':
                    identifiers.push('books');
                    return Promise.resolve(identifiers);
                case 'l':
                    identifiers.push('link');
                    return Promise.resolve(identifiers);
                default:
                // Default is to show all provider for "/"
                  identifiers.push('gemini');
                  identifiers.push('search');
                  identifiers.push('translate');
                  identifiers.push('youtube');
                  identifiers.push('maps');
                  identifiers.push('news');
                  identifiers.push('weather');
                  identifiers.push('flights');
                  identifiers.push('shopping');
                  identifiers.push('books');
                  identifiers.push('link');
                return Promise.resolve(identifiers);
            }
        }

        // Check if we should only show results for shortcuts keys, then exit
        if (my_settings.get_boolean('only-shortcuts')) return Promise.resolve([]);
        // Check if the text input is below activation threshold, then ex
        if (raw.length < my_settings.get_int('activation-chars')) return Promise.resolve([]);

        // Raw input is valid, add search results if enabled.
        if (my_settings.get_boolean('show-gemini')) {
          identifiers.push('gemini');
        }
        if (my_settings.get_boolean('show-search')) {
          identifiers.push('search');
        }
        if (my_settings.get_boolean('show-translate')) {
          identifiers.push('translate');
        }
        if (my_settings.get_boolean('show-youtube')) {
          identifiers.push('youtube');
        }
        if (my_settings.get_boolean('show-maps')) {
          identifiers.push('maps');
        }
        if (my_settings.get_boolean('show-news')) {
          identifiers.push('news');
        }
        if (my_settings.get_boolean('show-weather')) {
          identifiers.push('weather');
        }
        if (my_settings.get_boolean('show-flights')) {
          identifiers.push('flights');
        }
        if (my_settings.get_boolean('show-shopping')) {
          identifiers.push('shopping');
        }
        if (my_settings.get_boolean('show-books')) {
          identifiers.push('books');
        }
        // Show link always last in list.
        if (my_settings.get_boolean('show-link')) {
          identifiers.push('link');
        }

        return new Promise((resolve, reject) => {
          const cancelledId = cancellable.connect(
            () => reject(Error('Search Cancelled')));

          cancellable.disconnect(cancelledId);
          if (!cancellable.is_cancelled()) {
            resolve(identifiers);
          }
        });
    }

    /**
     * Refine the current search.
     * Implementations may use this method to refine the search results more
     * efficiently than running a new search, or simply pass the terms to the
     * implementation of `getInitialResultSet()`.
     *
     * If @cancellable is triggered, this method should throw an error.
     *
     * @async
     * @param {string[]} results - The original result set
     * @param {string[]} terms - The search terms
     * @param {Gio.Cancellable} cancellable - A cancellable for the operation
     * @returns {Promise<string[]>}
     */
    getSubsearchResultSet(results, terms, cancellable) {
        if (cancellable.is_cancelled())
            throw Error('Search Cancelled');

        return this.getInitialResultSet(terms, cancellable);
    }

    /**
     * Filter the current search.
     * This method is called to truncate the number of search results.
     * Implementations may use their own criteria for discarding results, or
     * simply return the first n-items.
     *
     * @param {string[]} results - The original result set
     * @param {number} maxResults - The maximum amount of results
     * @returns {string[]} The filtered results
     */
    filterResults(results, maxResults) {
        if (results.length <= maxResults)
            return results;

        return results.slice(0, maxResults);
    }
}

export default class ChromeSearchProviderExtension extends Extension {
    enable() {
        my_settings= this.getSettings();
        this._provider = new ChromeSearchProvider(this);
        Main.overview.searchController.addProvider(this._provider);


        // this allows the Chrome Search provider to be loaded first and appear at the top of results.
        const appSearchSetting = new Gio.Settings({ schema: 'org.gnome.desktop.search-providers' });
        if (my_settings.get_boolean('show-app-search')) {
          appSearchSetting.set_boolean('disable-external', true);
        // reloads the the Gnome 'App Search' provider to push Chrome before it.
          appSearchSetting.set_boolean('disable-external', false);
        }
    }

    disable() {
        my_settings = null;
        Main.overview.searchController.removeProvider(this._provider);
        this._provider = null;
    }
}
