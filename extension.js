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

let my_prefs;

class ChromeSearchProvider {
    constructor(extension) {
        this._extension = extension;
        this.providers = {
            'link': {
                name: 'Open Link',
                description: 'Open link',
                icon: 'chrome',
                getQuery: function (terms) {
                  let q = terms.join(" ");
                  return /^https?:\/\//.test(q) ? q : `http://${q}`;
                }
            },
            'gemini': {
                name: 'Ask Gemini',
                description: 'Ask Gemini a question online',
                icon: 'gemini',
                getQuery: function (terms) {
                  return `https://www.google.com/search?udm=50&aep=12&q=${terms.join(" ")}`;
                }
            },
            'search': {
                name: 'Search Google',
                description: 'Search online with Google',
                icon: 'search',
                getQuery: function (terms) {
                  return `https://www.google.com/search?q=${terms.join(" ")}`;
                }
            },
            'news': {
                name: 'Search News',
                description: 'Search Google News',
                icon: 'news',
                getQuery: function (terms) {
                  return `https://news.google.com/search?q=${terms.join(" ")}`;
                }
            },
            'youtube': {
                name: 'Search YouTube',
                description: 'Search YouTube Videos',
                icon: 'youtube',
                getQuery: function (terms) {
                  return `https://www.youtube.com/results?search_query=${terms.join(" ")}`;
                }
            },
            'translate': {
                name: 'Search Translate',
                description: 'Translate with Google',
                icon: 'translate',
                getQuery: function (terms) {
                  return `https://translate.google.com/?text=${terms.join(" ")}`;
                }
            },
            'weather': {
                name: 'Search Weather',
                description: 'Search weather with Google',
                icon: 'weather',
                getQuery: function (terms) {
                  return `https://www.google.com/search?q=${terms.join(" ")}+weather`;
                }
            },
            'maps': {
                name: 'Search Maps',
                description: 'Search online with Maps',
                icon: 'maps',
                getQuery: function (terms) {
                  return `https://maps.google.com/?q=${terms.join(" ")}`;
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
        console.debug(`createResultObject(${meta.id})`);

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
        const { scaleFactor } = St.ThemeContext.get_for_stage(global.stage);

        return new Promise((resolve, reject) => {
            const cancelledId = cancellable.connect(
                () => reject(Error('Operation Cancelled')));

            const resultMetas = [];

            for (const identifier of results) {
                const provider = this.providers[identifier];
                const meta = {
                    id: identifier,
                    name: provider.name,
                    description: provider.description,
                    // clipboardText: 'Content for the clipboard',
                    createIcon: size => {
                        return new St.Icon({
                            gicon: Gio.icon_new_for_string(this._extension.path + '/assets/' + provider.icon + '.png'),
                            width: size * scaleFactor,
                            height: size * scaleFactor,
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
        const minChars = my_prefs.get_int('activation-chars');
        if (terms.join(" ").length < minChars) return Promise.resolve([]);
        const identifiers = [];

        let show_gemini=my_prefs.get_boolean('show-gemini');
        let show_search=my_prefs.get_boolean('show-search');
        let show_youtube=my_prefs.get_boolean('show-youtube');
        let show_maps=my_prefs.get_boolean('show-maps');
        let show_translate=my_prefs.get_boolean('show-translate');
        let show_news=my_prefs.get_boolean('show-news');
        let show_weather=my_prefs.get_boolean('show-weather');
        let show_link = my_prefs.get_boolean('show-link');

      if (show_gemini) {
      identifiers.push('gemini');
      }
       if (show_search) {
      identifiers.push('search');
      }
      if (show_translate) {
      identifiers.push('translate');
      }
      if (show_youtube) {
      identifiers.push('youtube');
      }
      if (show_maps) {
      identifiers.push('maps');
      }
      if (show_news) {
      identifiers.push('news');
      }
      if (show_weather) {
      identifiers.push('weather');
      }
      if (show_link) {
      identifiers.push('link');
      }

      return new Promise((resolve, reject) => {
        const cancelledId = cancellable.connect(
          () => reject(Error('Search Cancelled')));

        cancellable.disconnect(cancelledId);
        if (!cancellable.is_cancelled())
          resolve(identifiers);
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
        const minChars = my_prefs.get_int('activation-chars');
        if (terms.join(" ").length < minChars) return Promise.resolve([]);
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
        console.debug(`filterResults([${results}], ${maxResults})`);

        if (results.length <= maxResults)
            return results;

        return results.slice(0, maxResults);
    }
}

export default class ChromeSearchProviderExtension extends Extension {
    enable() {
        my_prefs= this.getSettings();
        this._provider = new ChromeSearchProvider(this);
        Main.overview.searchController.addProvider(this._provider);


        // this allows the Chrome Search provider to be loaded first and appear at the top of results.
        const appSearchSetting = new Gio.Settings({ schema: 'org.gnome.desktop.search-providers' });
        if (my_prefs.get_boolean('show-app-search')) {
          appSearchSetting.set_boolean('disable-external', true);
        // reloads the the Gnome 'App Search' provider to push Chrome before it.
          appSearchSetting.set_boolean('disable-external', false);
        }
    }

    disable() {
        my_prefs = null;
        Main.overview.searchController.removeProvider(this._provider);
        this._provider = null;
    }
}
