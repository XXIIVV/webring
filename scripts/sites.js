'use strict'

const sites = [
  {
    contact: "placeholder",
    langs: [''],
    type: "other",
    title: "Audacity",
    url: "https://www.audacityteam.org"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "bookmark",
    title: "Wallabag",
    url: "https://www.wallabag.org/en"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "bookmark",
    title: "Polar",
    url: "https://getpolarized.io/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "bookmark",
    title: "Memex",
    url: "https://getmemex.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "browser",
    title: "Firefox",
    url: "https://www.mozilla.org/en-US/firefox/new/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "browser",
    title: "Brave",
    url: "https://brave.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "browser",
    title: "Vivaldi",
    url: "https://vivaldi.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "browser",
    title: "Chromium (ungoogled)",
    url: "https://ungoogled-software.github.io/ungoogled-chromium-binaries/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "browser",
    title: "Ferdi",
    url: "https://getferdi.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "other",
    title: "Thunderbird",
    url: "https://www.thunderbird.net/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "other",
    title: "NextCloud",
    url: "https://nextcloud.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "other",
    title: "Keys.pub",
    url: "https://keys.pub"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "email",
    title: "Thunderbird",
    url: "https://www.thunderbird.net/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "email",
    title: "Kanmail",
    url: "https://kanmail.io/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "email",
    title: "MailDrop",
    url: "https://maildrop.cc/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "email",
    title: "ProtonMail",
    url: "https://protonmail.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "email",
    title: "Tutanota",
    url: "https://www.tutanota.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "email",
    title: "FastMail",
    url: "https://www.fastmail.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "other",
    title: "Firefox Send",
    url: "https://send.firefox.com"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "other",
    title: "Open Street Map",
    url: "https://www.openstreetmap.org"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "other",
    title: "VLC",
    url: "https://www.videolan.org/vlc/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "instant messaging",
    title: "Riot",
    url: "https://about.riot.im/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "instant messaging",
    title: "Signal",
    url: "https://www.signal.org/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "note taking",
    title: "Standard Notes",
    url: "https://standardnotes.org/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "note taking",
    title: "Simplenote",
    url: "https://simplenote.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "note taking",
    title: "Joplin",
    url: "https://joplinapp.org/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "note taking",
    title: "Mak mini",
    url: "https://mak.ink/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "password manager",
    title: "Keepass",
    url: "https://keepass.info/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "password manager",
    title: "Bitwarden",
    url: "https://bitwarden.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "password manager",
    title: "Firefox Lockwise",
    url: "https://www.mozilla.org/en-US/firefox/lockwise/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "password manager",
    title: "Bitwarden",
    url: "https://bitwarden.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "password manager",
    title: "Leepass",
    url: "https://lesspass.com/#/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "password manager",
    title: "Butter cup",
    url: "https://buttercup.pw/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "password manager",
    title: "Keeweb",
    url: "https://keeweb.info/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "password manager",
    title: "KeepassX",
    url: "https://www.keepassx.org/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "password manager",
    title: "Psono",
    url: "https://psono.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "other",
    title: "Kap",
    url: "https://getkap.co"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "search engine",
    title: "DuckDuckGo",
    url: "https://duckduckgo.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "search engine",
    title: "StartPage",
    url: "https://www.startpage.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "search engine",
    title: "Searx",
    url: "https://searx.me/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "social network",
    title: "Diaspora",
    url: "https://diasporafoundation.org/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "social network",
    title: "Aether",
    url: "https://getaether.net/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "social network",
    title: "Tildes",
    url: "https://tildes.net/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "social network",
    title: "Mastodon",
    url: "https://joinmastodon.org/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "social network",
    title: "Plemora",
    url: "https://pleroma.social/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "social network",
    title: "Pixelfed",
    url: "https://pixelfed.org/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "spreadsheet",
    title: "LibreOffice Calc",
    url: "https://www.libreoffice.org/discover/calc/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "text editor",
    title: "MacDown",
    url: "https://macdown.uranusjr.com/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "text editor",
    title: "Vim",
    url: "https://www.vim.org/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "text editor",
    title: "LibreOffice Writer",
    url: "https://www.libreoffice.org/discover/writer/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "other",
    title: "Jitsi",
    url: "https://jitsi.org/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "other",
    title: "PeerTube",
    url: "https://joinpeertube.org/"
  },

  {
    contact: "placeholder",
    langs: [''],
    type: "other",
    title: "Indico",
    url: "https://getindico.io/"
  }
]

/*
Make sure you've read the README!
Don't forget the comma on the previous entry!
No trailing slashes or commas!
Alphabetize your keys!
protocol://url.domain.ext
*/

if (module && module.exports) {
  module.exports = sites
}
