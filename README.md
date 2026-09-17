# Search Provider - Gnome Search
This extension adds a Chrome search provider to Gnome Search.
![Chrome Search Providers](/assets/providers.png)

# Extension Store:
<a href="https://extensions.gnome.org/extension/10889/search-provider/">
<img src="https://github.com/seventi71/Search-Provider/blob/main/assets/get-it-on.svg" width="300" height="200"> </a>

# Manual Steps:
[Download](https://github.com/seventi71/Search-Provider/releases/download/v3/SearchProvider@github.com.zip)
Copy the unzipped folder to:
  ``~/.local/share/gnome-shell/extensions``
- Logout of Gnome and Login, then go to extension and enable.

> [!CAUTION]
> Make sure that the parent folder is directly above extensions.js and not nested after unzip.

> [!NOTE]
> The extension has been submitted to the extensions store, waiting for approval.

# Usage:
When doing a shell search you get the following providers:
- Ask Gemini for an AI answer        e.g ``How to make a curry?``
- Google Search of a website         e.g ``Reddit Best Linux Repo``
- Search YouTube for a video         e.g ``Focus Music``
- Search Maps for directions         e.g ``Directions to high street``
- Search Translate for a language    e.g ``Hello friend``
- Search News for latest news        e.g ``Local``
- Search Weather for forecast        e.g ``Local``
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
This code lives on github at 'https://github.com/seventi71/Search-Provider'
