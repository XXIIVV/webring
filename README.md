# Webring

This [webring](https://wiki.xxiivv.com/webring) is an attempt to inspire artists & developers to create and maintain their own website and share traffic among each other. The webring's aim is to share hand-crafted websites such as **diaries, wikis & portfolios**, single pagers with nothing but outgoing links to social platforms will be rejected. To add yourself to the ring, submit an [edit](https://github.com/XXIIVV/webring/edit/master/scripts/sites.js) to this repository.

## Join the webring

```
<a href='https://webring.xxiivv.com/#random' target='_blank'><img src='https://webring.xxiivv.com/icon.black.svg'/></a>
```

- Add the webring icon to your website html.
- Add your website url to the [sites.js](https://github.com/XXIIVV/webring/edit/master/scripts/sites.js) file.
- Submit a Pull Request with the location of the webring icon on your site.

Alternatively, if you your website has a dark background, use `icon.white.svg`. If your website is complaning about *https*, go ahead and host the icon yourself.

### Circular Linking

Instead of linking to the directory, you can also link to the next link in the ring by adding parts of your site or domain in the hash of the request url:

```
<a href='https://webring.xxiivv.com/#wiki.xxiivv' target='_blank'><img src='https://webring.xxiivv.com/icon.black.svg'/></a>
```

## API

This repository does not contain mature API capabilities, but there is one way to request list of sites currently in the webring.

- Request [sites.js on xxiivv](https://webring.xxiivv.com/scripts/sites.js) or [sites.js on github](https://raw.githubusercontent.com/XXIIVV/webring/master/scripts/sites.js)
- Parse it as text from `[` to `]`, split by `,` and then trim all whitespace and `"` in resulting array.

## Need Help?

The ring is managed by [@neauoire](https://twitter.com/neauoire), but any member of the network is also welcome to join this repository as a collaborator to help manage new links and Pull Requests. Read more [here](https://wiki.xxiivv.com/webring).
