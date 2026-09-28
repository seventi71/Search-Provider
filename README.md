# Search Provider - Gnome Search
![Chrome Search Providers](/assets/providers.png)

# Extension Store:
<a href="https://extensions.gnome.org/extension/10889/search-provider/">
<img src="https://github.com/seventi71/Search-Provider/blob/main/assets/get-it-on.svg" width="240"> </a>

> [!NOTE]
> This extenstion works with Gnome Extensions, which must be installed for this to work.
> Optionally, if you have Gnome Extension Manager installed, just search for 'Search Provider' and install it from there.

# Development Version:
[Download - Latest](https://github.com/seventi71/Search-Provider/releases/download/v3/SearchProvider@github.com.zip)
- Unzip and run  ''bash install.sh''
- Logout of Gnome and Login, then go to extension and enable.

> [!CAUTION]
> The compile of Glib schemas may fail if you have an older version of Gnome installed.

> [!TIP]
>  This extension works best with the Chrome browser:<br/>
>  - Google Chrome official ( [Debian](https://www.google.com/chrome/);  [Arch](https://aur.archlinux.org/packages/google-chrome);  [Flathub](https://flathub.org/en/apps/com.google.Chrome)  ) <br/>
>  - Chromium original ( [Debian](https://packages.debian.org/search?keywords=chromium);  [Arch](https://archlinux.org/packages/extra/x86_64/chromium/);  [Flathub](https://flathub.org/en/apps/org.chromium.Chromium)  )

# Usage:
When doing a shell search you get the following providers:
- Ask Gemini for an AI answer        e.g ``How to make a curry?``
- Google Search of a website         e.g ``Reddit Best Linux Repo``
- Search YouTube for a video         e.g ``Focus Music``
- Search Maps for directions         e.g ``Directions to London``
- Search Translate for a language    e.g ``Hello, there stranger``
- Search News for latest news        e.g ``Local`` or ``"topic"``
- Search Weather for forecast        e.g ``Local`` or ``"town"``
- Search Flights for travel          e.g ``London to NYC``
- Search Shopping for products        e.g ``Linux laptop``
- Search Books for reading            e.g ``linux for beginners``
- Open Link to open any link         e.g ``Localhost:8000``

> [!CAUTION]
> The provider will only populate the first 6 options that are enabled.

> [!TIP]
>  It will only activate on the 5th character by default. Check settings.<br/>
>  Test by typing 'Local' in Gnome search and see if it activates.

# Credits:
This extension was created using Zed and Inkling and is open source. <br/>
Some of the code was reused from the extension 'Browser Search Provider' <br/>
Some of the preferences code was reused from 'Toggle touchpad on or off'<br/>
<br/>
This code lives on github at https://github.com/seventi71/Search-Provider
