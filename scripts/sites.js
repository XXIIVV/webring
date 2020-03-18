'use strict'

const sites = [
  {
    author: 'neauoire',
    contact: 'aliceffekt@gmail.com',
    feed: 'https://wiki.xxiivv.com/twtxt.txt',
    langs: ['en'],
    rss: 'https://wiki.xxiivv.com/links/rss.xml',
    title: 'xxiivv',
    type: 'wiki',
    url: 'https://wiki.xxiivv.com',
    wiki: 'https://wiki.xxiivv.com/scripts/database/glossary.ndtl'
  },

  {
    langs: ['en'],
    url: 'http://estevancarlos.com'
  },

  {
    author: 'rho',
    feed: 'https://electro.pizza/twtxt.txt',
    langs: ['en'],
    title: 'electro pizza',
    type: 'blog',
    rss: 'https://electro.pizza/feed.xml',
    url: 'https://electro.pizza'
  },

  {
    author: 'joshavanier',
    contact: 'joshavanier@protonmail.com',
    feed: 'https://avanier.now.sh/tw.txt',
    langs: ['en'],
    title: 'Arachne',
    type: 'wiki',
    url: 'https://avanier.now.sh'
  },

  {
    author: 'kaemura',
    contact: 'chimera1190@gmail.com',
    feed: 'https://kaemura.com/twttxt.txt',
    langs: ['en'],
    title: 'kaemura.com',
    type: 'blog',
    url: 'http://kaemura.com'
  },

  {
    author: 'slisne',
    contact: '@slisne@merveilles.town',
    feed: 'https://liamcooke.com/merveilles/tw.txt',
    langs: ['en'],
    title: 'liamcooke.com',
    rss: 'https://liamcooke.com/feed.xml',
    url: 'https://liamcooke.com',
    wiki: 'https://liamcooke.com/merveilles/wiki.ndtl'
  },

  {
    langs: ['en'],
    url: 'https://hraew.autophagy.io'
  },

  {
    langs: ['en'],
    url: 'http://evenunto.net'
  },

  {
    langs: ['en'],
    url: 'https://anxl.faith'
  },

  {
    author: 'xvw',
    contact: 'xaviervdw@gmail.com',
    langs: ['fr'],
    feed: 'https://xvw.github.io/twtxt/hallway.txt',
    rss: 'https://xvw.github.io/atom.xml',
    title: 'planet',
    type: 'hybrid',
    url: 'https://xvw.github.io'
  },

  {
    langs: ['en', 'el'],
    url: 'https://heracl.es'
  },

  {
    langs: ['en'],
    url: 'https://turelio.github.io'
  },

  {
    author: 'lectronice',
    contact: 'i.love.spam@lectronice.com',
    feed: 'https://lectronice.com/hallway/twtxt.txt',
    langs: ['en'],
    title: 'shards',
    type: 'blog',
    url: 'https://shards.lectronice.com'
  },

  {
    langs: ['en'],
    url: 'https://craze.co.uk'
  },

  {
    langs: ['en'],
    url: 'https://shaneckel.com'
  },

  {
    author: 'cblgh',
    contact: 'cabal://cblgh.org',
    feed: 'https://cblgh.org/twtxt.txt',
    langs: ['en'],
    title: 'cblgh.org',
    url: 'https://cblgh.org'
  },

  {
    author: 'afk',
    contact: 'afk@ellugar.co',
    langs: ['en'],
    rss: 'http://feeds.ellugar.co/ellugar-logs',
    title: 'ellugar',
    type: 'wiki',
    url: 'https://ellugar.co'
  },

  {
    author: 'Cameron Higby-Naquin',
    contact: 'me@chigby.org',
    langs: ['en'],
    title: 'chigby.org',
    type: 'portfolio',
    url: 'http://chigby.org'
  },

  {
    langs: ['en'],
    url: 'https://longest.voyage'
  },

  {
    author: 'Paloma Kop',
    contact: 'doubleobelisk@gmail.com',
    langs: ['en'],
    title: 'palomakop.tv',
    type: 'portfolio',
    url: 'https://palomakop.tv'
  },

  {
    langs: ['en'],
    url: 'https://v-os.ca'
  },

  {
    langs: ['en'],
    url: 'https://jmandel.xyz'
  },

  {
    langs: ['en'],
    url: 'https://systems.ws'
  },

  {
    author: 'jda0',
    contact: 'hi@2d4.dev',
    feed: 'https://2d4.dev/tw.txt',
    langs: ['en'],
    title: '2d4.dev',
    url: 'https://2d4.dev',
    wiki: 'https://2d4.dev/wiki.ndtl'
  },

  {
    langs: ['en'],
    url: 'https://nathanwentworth.co'
  },

  {
    langs: ['en'],
    url: 'https://uonai.space'
  },

  {
    langs: ['en'],
    url: 'http://controls.ee'
  },

  {
    langs: ['en'],
    url: 'https://wasin.io'
  },

  {
    langs: ['en'],
    url: 'https://inns.studio'
  },

  {
    langs: ['en'],
    url: 'http://kokorobot.ca'
  },

  {
    author: 'jrc03c',
    contact: 'josh@ameyama.com',
    langs: ['en'],
    title: 'ameyama',
    type: 'blog',
    rss: 'https://ameyama.com/blog/rss.xml',
    url: 'https://ameyama.com',
    wiki: 'https://ameyama.com/data/wiki.ndtl'
  },

  {
    author: 'wakest',
    contact: '@liaizon@wake.st',
    feed: 'https://wake.st/twtxt.txt',
    langs: ['en'],
    title: 'wake.st',
    url: 'https://wake.st'
  },

  {
    langs: ['en'],
    url: 'https://xarene.la'
  },

  {
    langs: ['en'],
    url: 'https://alex.zyzhang.me'
  },

  {
    langs: ['en'],
    url: 'http://bildwissenschaft.vortok.info'
  },

  {
    langs: ['en'],
    url: 'https://jakofranko.github.com'
  },

  {
    langs: ['en'],
    url: 'https://aeriform.io'
  },

  {
    langs: ['en', 'de'],
    url: 'http://blog.lucasdidthis.com'
  },

  {
    author: 'npisanti',
    contact: 'nicola@npisanti.com',
    langs: ['en'],
    rss: 'http://npisanti.com/journal/rss.xml',
    title: 'npisanti.com',
    url: 'http://npisanti.com'
  },

  {
    langs: ['en'],
    url: 'https://underscorediscovery.ca'
  },

  {
    author: 'drisc',
    contact: 'cory@drisc.io',
    feed: 'https://drisc.io/hallway/twtxt.txt',
    langs: ['en'],
    title: 'drisc.io',
    type: 'wiki',
    url: 'https://drisc.io'
  },

  {
    langs: ['en'],
    url: 'https://ricky.codes'
  },

  {
    author: 'Marshall Bowers',
    contact: 'elliott.codes@gmail.com',
    langs: ['en'],
    title: 'maxdeviant.com',
    type: 'hybrid',
    url: 'https://maxdeviant.com'
  },

  {
    langs: ['en'],
    url: 'https://tynandebold.com'
  },

  {
    langs: ['en'],
    url: 'http://gytis.co'
  },

  {
    langs: ['en'],
    url: 'https://nomand.co'
  },

  {
    langs: ['en'],
    url: 'http://memoriata.com'
  },

  {
    langs: ['en'],
    url: 'https://mmm.s-ol.nu'
  },

  {
    contact: 'ubuwaits@gmail.com',
    langs: ['en'],
    rss: 'https://chad.is/rss.xml',
    url: 'https://chad.is'
  },

  {
    langs: ['en'],
    url: 'https://smidgeo.com/bots'
  },

  {
    langs: ['en', 'ru'],
    url: 'https://iko.soy'
  },

  {
    langs: ['en'],
    url: 'http://atelieroilandsugar.com'
  },

  {
    langs: ['en'],
    url: 'https://magoz.is'
  },

  {
    author: 'Szymon Kaliski',
    langs: ['en'],
    rss: 'https://szymonkaliski.com/feed.xml',
    type: 'hybrid',
    url: 'https://szymonkaliski.com'
  },

  {
    author: 'setphen',
    feed: 'https://phse.net/twtxt/merv.txt',
    langs: ['en'],
    rss: 'https://phse.net/post/index.xml',
    title: 'phse.net',
    type: 'blog',
    url: 'https://phse.net'
  },

  {
    author: 'rosano',
    langs: ['en'],
    url: 'https://rosano.ca',
    wiki: 'https://rosano.ca/wiki.ndtl'
  },

  {
    langs: ['en'],
    url: 'https://soyboysky.github.io'
  },

  {
    langs: ['en'],
    url: 'https://gndclouds.cc'
  },

  {
    langs: ['en', 'fr'],
    url: 'https://xuv.be'
  },

  {
    langs: ['en', 'zh'],
    url: 'https://dsdshcym.github.io'
  },

  {
    author: 'ckipp',
    contact: 'ckipp@pm.me',
    langs: ['en'],
    title: 'chronica',
    type: 'hybrid',
    url: 'https://chronica.xyz'
  },

  {
    langs: ['en'],
    url: 'https://boffosocko.com'
  },

  {
    author: 'kodedninja',
    contact: 'karamanhunor@pm.me',
    feed: 'https://t.seed.hex22.org/twtxt.txt',
    langs: ['en'],
    title: 'hex22',
    url: 'https://hex22.org'
  },

  {
    langs: ['en'],
    url: 'https://patrikarvidsson.com'
  },

  {
    langs: ['en'],
    url: 'https://sophieleetmaa.com'
  },

  {
    langs: ['en'],
    url: 'https://xinniw.github.io'
  },

  {
    author: 'm',
    contact: 'mboxxed@gmail.com',
    feed: 'https://mboxed.github.io/sodatsu/tw.txt',
    langs: ['en'],
    title: 'sodatsu',
    type: 'wiki',
    url: 'https://mboxed.github.io/sodatsu'
  },

  {
    langs: ['en'],
    url: 'https://letters.vexingworkshop.com'
  },

  {
    author: 'tomupom',
    contact: 'tom@tomhackshaw.com',
    langs: ['en'],
    title: 'Tom Hackshaw',
    type: 'portfolio',
    url: 'https://tom.org.nz',
    feed: 'https://a.tom.org.nz/twtxt.txt',
    wiki: 'https://a.tom.org.nz/glossary.ndtl'
  },

  {
    title: 'Teknari',
    langs: ['en'],
    url: 'https://teknari.com',
    author: 'teknari',
    contact: 'teknari@teknari.com',
    rss: 'https://teknari.com/feed.xml'
  },

  {
    author: 'clic',
    contact: 'https://t.me/clic_laplata',
    langs: ['es'],
    title: 'Colectivo de Livecoders',
    type: 'blog',
    url: 'https://colectivo-de-livecoders.gitlab.io'
  },

  {
    langs: ['es'],
    title: 'madewithtea.com',
    type: 'blog',
    url: 'https://www.madewithtea.com'
  },

  {
    author: 'amorris',
    feed: 'https://feed.amorris.ca/hallway.txt',
    langs: ['en'],
    title: 'amorris',
    type: 'blog',
    url: 'https://amorris.ca',
    wiki: 'https://wiki.amorris.ca/glossary.ndtl'
  },

  {
    langs: ['en'],
    title: 'miha-co',
    type: 'portfolio',
    url: 'http://www.miha-co.ca'
  },

  {
    author: 'buzzert',
    langs: ['en'],
    title: 'buzzert.net',
    type: 'blog',
    url: 'https://buzzert.net'
  },

  {
    author: 'stuartpb',
    contact: 's@stuartpb.com',
    feed: 'https://twtxt.stuartpb.com/xxiivv.txt',
    langs: ['en'],
    title: 'notes.stuartpb.com',
    type: 'wiki',
    url: 'https://notes.stuartpb.com/'
  },

  {
    author: 'serocell',
    contact: 'psignal@s900.net',
    feed: 'https://xxiii.co/twtxt.txt',
    langs: ['en'],
    rss: 'https://serocell.com/feeds/serocell.xml',
    title: 'xxiii',
    type: 'portfolio',
    url: 'https://xxiii.co'
  },

  {
    author: 'kormyen',
    contact: 'h@kor.nz',
    feed: 'https://kor.nz/twtxt.txt',
    langs: ['en'],
    title: 'kor',
    type: 'wiki',
    url: 'https://kor.nz',
    wiki: 'https://kor.nz/db/glossary.ndtl'
  },

  {
    author: 'quite',
    contact: 'quite@hack.org',
    feed: 'https://lublin.se/twtxt.txt',
    langs: ['en'],
    url: 'https://lublin.se'
  },

  {
    author: 'zanneth',
    contact: 'root@zanneth.com',
    langs: ['en'],
    title: 'zanneth.com',
    type: 'blog',
    url: 'https://zanneth.com'
  },

  {
    author: 'eli_oat',
    contact: 'hi@eli.li',
    feed: 'https://txt.eli.li/twtxt/twtxt.txt',
    langs: ['en'],
    rss: 'https://eli.li/feed.rss',
    title: 'eli.li',
    type: 'blog',
    url: 'https://eli.li'
  },

  {
    author: 'gueorgui',
    contact: 'hello@gueorgui.net',
    langs: ['en'],
    title: 'Gueorgui Tcherednitchenko',
    type: 'portfolio',
    url: 'https://gueorgui.net'
  },

  {
    author: 'Tate Carson',
    contact: 'tatecarson@gmail.com',
    langs: ['en'],
    title: 'Tate Carson',
    type: 'portfolio',
    url: 'https://www.tatecarson.com'
  },

  {
    author: 'azlen',
    contact: 'webring@azlen.me',
    feed: 'https://azlen.me/twtxt.txt',
    langs: ['en'],
    title: 'azlen.me',
    type: 'wiki',
    url: 'https://azlen.me',
    wiki: 'https://azlen.me/glossary.ndtl'
  },

  {
    author: 'vega',
    contact: 'vegac@protonmail.com',
    feed: 'https://opinionatedguide.github.io/twtxt.txt',
    langs: ['en'],
    title: 'OpGuides',
    url: 'https://opinionatedguide.github.io/'
  },

  {
    author: 'cmaughan',
    contact: 'mornymorny@gmail.com',
    feed: 'https://chrismaughan.com/twtxt.txt',
    langs: ['en'],
    title: 'CMaughan',
    url: 'https://chrismaughan.com/'
  },

  {
    author: 'RaelZero',
    contact: 'gaz.gong@gmail.com',
    title: 'oddworlds soliloquy',
    langs: ['en', 'es'],
    type: 'blog',
    url: 'https://oddworlds.org/'
  },

  {
    author: 'Fundor 333',
    contact: 'blog@fundor333.com',
    feed: 'https://fundor333.com/twtxt.txt',
    langs: ['en'],
    title: 'Fundor333',
    type: 'blog',
    url: 'https://fundor333.com/'
  },

  {
    contact: 'm@cass.si',
    langs: ['en'],
    url: 'https://cass.si'
  },

  {
    author: 'dcb',
    contact: 'dotcomboom@somnolescent.net',
    feed: 'https://dotcomboom.somnolescent.net/twtxt.txt',
    langs: ['en'],
    title: 'somnolescent.net',
    url: 'https://dotcomboom.somnolescent.net/'
  },

  {
    author: 'Nihiltarier',
    contact: 'arachi@airmail.cc',
    langs: ['en'],
    title: 'cadmican',
    url: 'https://cadmican.neocities.org/'
  },

  {
    author: 'Jonathan Skjøtt',
    contact: 'jonathan@jskjott.com',
    langs: ['en'],
    title: 'jskjott',
    url: 'https://jskjott.com'
  },

  {
    author: 'sixeyes',
    contact: 'elmusho@gmail.com',
    langs: ['en'],
    title: 'sixey.es',
    type: 'portfolio',
    url: 'https://sixey.es/'
  },

  {
    author: '0xdstn',
    contact: '0xdstn@protonmail.com',
    langs: ['en'],
    title: '0xdstn',
    type: 'wiki',
    url: 'https://tilde.town/~dustin/'
  },

  {
    author: 'James',
    contact: 'henderson.j@protonmail.com',
    langs: ['en'],
    rss: 'https://jameschip.io/index.xml',
    title: 'James Chip',
    url: 'https://jameschip.io/'
  },

  {
    author: 'Patrick Monaghan',
    contact: '0x5f.manpat@gmail.com',
    langs: ['en'],
    type: 'portfolio',
    url: 'https://patrick-is.cool'
  },

  {
    author: 'icyphox',
    contact: 'x@icyphox.sh',
    langs: ['en'],
    rss: 'https://icyphox.sh/blog/feed.xml',
    type: 'hybrid',
    url: 'https://icyphox.sh'
  },

  {
    author: 'roy niang',
    contact: 'roy@royniang.com',
    feed: 'https://telecom.royniang.com/updates.txt',
    langs: ['en'],
    title: 'roy niang',
    type: 'portfolio',
    url: 'https://royniang.com',
    wiki: 'https://telecom.royniang.com/usefulnotes.ndtl'
  },

  {
    author: 'raul altosaar',
    contact: 'raul.altosaar@gmail.com',
    langs: ['en'],
    title: 'raul altosaar',
    type: 'portfolio',
    url: 'https://www.raul.earth/'
  },

  {
    author: 'Cristi Constantin',
    langs: ['en'],
    rss: 'https://crlf.site/feed.xml',
    title: 'Cr;Lf;',
    type: 'hybrid',
    url: 'https://crlf.site'
  },

  {
    contact: 'johannesg@johannesg.com',
    langs: ['en'],
    title: 'Jóhannes Gunnar Þorsteinsson',
    type: 'hybrid',
    url: 'https://www.johannesg.com'
  },

  {
    author: 'Michael Rupert',
    contact: 'michaelrupert@fastmail.com',
    langs: ['en'],
    title: 'Provoke Analog',
    type: 'hybrid',
    url: 'https://provokeanalog.com'
  },

  {
    author: 'eti',
    contact: 'eti@eti.tf',
    langs: ['en'],
    url: 'https://eti.tf'
  },

  {
    author: 'rezmason',
    contact: 'jeremysachs@rezmason.net',
    langs: ['en'],
    title: 'rezmason.net',
    type: 'hybrid',
    url: 'https://rezmason.net'
  },

  {
    contact: 'email@estfyr.net',
    langs: ['en', 'cz'],
    title: 'estfyr.net',
    type: 'hybrid',
    url: 'https://estfyr.net'
  },

  {
    author: 'Payson Wallach',
    contact: 'payson@paysonwallach.com',
    langs: ['en'],
    url: 'https://paysonwallach.com'
  },

  {
    author: 'icco',
    contact: 'nat@natwelch.com',
    langs: ['en'],
    type: 'portfolio',
    url: 'https://natwelch.com'
  },

  {
    author: 'whtrbt',
    contact: 'pi@benjamin.gray.land',
    langs: ['en'],
    title: 'Park Imminent',
    type: 'hybrid',
    url: 'https://parkimminent.com'
  },

  {
    author: 'aklsh',
    contact: 'akileshkannan@gmail.com',
    langs: ['en'],
    url: 'https://aklsh.github.io',
    type: 'hybrid'
  },

  {
    author: 'hxii',
    contact: 'paul@glushak.net',
    langs: ['en'],
    type: 'hybrid',
    url: 'https://paulglushak.com'
  },

  {
    author: 'syx',
    contact: 'hello@simone.computer',
    langs: ['en', 'ita'],
    title: 'Simone\'s Computer',
    type: 'portfolio',
    url: 'https://simone.computer'
  },

  {
    author: 'xj9',
    contact: 'xj9@sunshinegardens.org',
    feed: 'https://xj9.io/.well-known/webring/tw.txt',
    langs: ['en'],
    title: 'dreamspace',
    type: 'blog',
    rss: 'https://xj9.io/rss.xml',
    url: 'https://xj9.io',
    wiki: 'https://xj9.io/.well-known/webring/wiki.ndtl'
  },

  {
    contact: 'joe.jenett@jenett.org',
    langs: ['en'],
    rss: 'https://simply.personal.jenett.org/feed',
    title: 'jenett. simply. personal.',
    type: 'blog',
    url: 'https://simply.personal.jenett.org'
  },

  {
    author: 'Wally',
    contact: 'qpfiffer+xxiivvwebring@gmail.com',
    langs: ['en'],
    rss: 'http://q.pfiffer.org/feed.xml',
    type: 'blog',
    url: 'http://q.pfiffer.org/'
  },

  {
    author: 'ashpex',
    contact: 'ashpex@dismail.de',
    langs: ['en'],
    title: 'ashpex',
    type: 'blog',
    url: 'https://ashpex.neocities.org'
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
