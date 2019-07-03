# Webring

This [webring](https://wiki.xxiivv.com/webring) is an attempt to inspire artists & developers to create and maintain their own website and share traffic among each other. The webring's aim is to share hand-crafted websites such as **diaries, wikis & portfolios**. To add yourself to the ring, submit an [edit](https://github.com/XXIIVV/webring/edit/master/scripts/sites.js) to this repository.

## Join the webring

```
<a href='https://webring.xxiivv.com/#random' target='_blank'><img src='https://webring.xxiivv.com/icon.black.svg'/></a>
```

- Add the webring icon to your website html.
- Add your website information to the [sites.js](https://github.com/XXIIVV/webring/edit/master/scripts/sites.js) file. The `url` key is required, but you can also include `title`, `type`, `author`, `contact`, `rss`, and `feed`.
- Submit a Pull Request with **the location of the webring icon** on your site.

Alternatively, if you your website has a dark background, use `icon.white.svg`. If your website is complaining about *https*, go ahead and host the icon yourself. **Single page websites, and websites acting only as portals to other social platforms, will be rejected**.

### Circular Linking

Instead of linking to the directory, you can also link to the next link in the ring by adding parts of your site or domain in the hash of the request url:

```
<a href='https://webring.xxiivv.com/#wiki.xxiivv' target='_blank' rel="noopener noreferrer"><img src='https://webring.xxiivv.com/icon.black.svg'/></a>
```

### Joining the hallway

[The Hallway](https://webring.xxiivv.com/hallway.html) is a decentralized forum using [twtxt](https://twtxt.readthedocs.io/en/stable/user/twtxtfile.html) feeds.

To join, create a `.txt` file on your site, and add its URL to [your webring entry](https://github.com/XXIIVV/Webring/blob/master/scripts/sites.js) as `feed:`. The content of the file should be a dateISO string, a tab(or 3 spaces) and a message:

```
2016-02-04T13:30:00+01:00   You can really go crazy here! ┐(ﾟ∀ﾟ)┌
2016-02-03T23:05:00+01:00   @<example http://example.org/twtxt.txt> welcome to twtxt!
2016-02-01T11:00:00+01:00   This is just another example.
2015-12-12T12:00:00+01:00   Fiat lux!
```

This file needs to be accessible via CORS, so if you're self-hosting, please make sure to allow the `webring.xxiivv.com` origin.   
Here's an example of how to do so with Nginx:

```
location / {
    index index.html;
    if ($request_method = 'GET') {
        add_header 'Access-Control-Allow-Origin' 'https://webring.xxiivv.com';
        add_header 'Access-Control-Allow-Methods' 'GET';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
     }
}
```

You don't need to allow all origins nor allow any other methods rather than GET, doing so can harm the security of your website, please read about [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) if you intend to do anything more complicated.

## API

This repository does not contain mature API capabilities, but there are a couple ways to request a list of sites and other information currently in the webring.

- Request [sites.js on xxiivv](https://webring.xxiivv.com/scripts/sites.js) or [sites.js on github](https://raw.githubusercontent.com/XXIIVV/webring/master/scripts/sites.js) and parse it. An example can be seen [here](https://gist.github.com/ckipp01/2ab7ac42e2837b4359efeb76eb49bb54).
- If you'd like a already parsed list, [webring-checker.now.sh/sites](https://webring-checker.now.sh/sites) will return an json array of the site objects in the webring. See [webring-checker.now.sh](https://webring-checker.now.sh) for more info on what else is available.

## Need Help?

The ring is managed by [@neauoire](https://twitter.com/neauoire), but any member of the network is also welcome to join this repository as a collaborator to help manage new links and Pull Requests. Read more [here](https://wiki.xxiivv.com/webring).
