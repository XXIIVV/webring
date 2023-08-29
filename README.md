# Webring

This [webring](https://wiki.xxiivv.com/webring) is an attempt to inspire artists & developers to create and maintain their own personal websites, and share traffic among each other. The webring's aim is to share rich hand-crafted websites such as **diaries, wikis & portfolios**.

## Join the webring

```html
<a href='https://webring.xxiivv.com/#random' target='_blank'><img src='https://webring.xxiivv.com/icon.black.svg'/></a>
```

1) Add the webring icon to your website html.
2) Add your website information to the [index.html](https://github.com/XXIIVV/webring/edit/master/index.html) file. Keep your link name short, and don't leave a trailing `/` in the `href` attribute. Use a sensible alphanumeric value for the id.
3) Submit a Pull Request with **the location of the webring icon** on your site. Pull requests with blank descriptions will be rejected.

Alternatively, if you your website has a dark background, use `icon.white.svg`. If your website is complaining about *https*, go ahead and host the icon yourself.

### Webring criteria

Your website must count at least 10 content pages and include an about page, blog posts are not counted as content pages. You must have your own domain name, we do not accept `github.io` subdomains. 

Single page websites, websites acting only as portals to other social platforms, or websites with violent, racist, sexist or speciesist content will be rejected.  If your website requires Javascript/CSS3 to display the majority of its content or to navigate, it will be rejected. Your business homepage is not a good candidate for the webring, and will be rejected. 

If it found that a website is in violation to any of these rules it will be removed from the webring. Websites without activity for over 2 years might also be periodically removed.

#### Adding your RSS/TWTXT

To add an extra feed to your entry, add them within your `<li>` tag as follow:

```html
<li data-lang="en" id="xxiivv">
  <a href="https://wiki.xxiivv.com">xxiivv</a>
  <a href="https://wiki.xxiivv.com/links/tw.txt" class="twtxt">twtxt</a>
  <a href="https://wiki.xxiivv.com/links/rss.xml" class="rss">rss</a>
  <img src='https://wiki.xxiivv.com/media/services/button.gif'/>
</li>
```

[twtxt](https://twtxt.readthedocs.io/en/stable/) is a decentralized, minimalist microblogging service for hackers. You're welcome to add your twtxt feed alongside your RSS feed. If you're looking a minimal C99 client for twtxt, try [this](https://github.com/neauoire/twtxtc). The `button.gif` is a 88x31 icon hosted on your server.

### Circular Linking

Instead of linking to the directory, you can also link to the next link in the ring by adding parts of your site or domain in the hash of the request url:

```html
<a href='https://webring.xxiivv.com/#xxiivv' target='_blank' rel="noopener noreferrer"><img src='https://webring.xxiivv.com/icon.black.svg'/></a>
```

## Help

The ring is managed by [@neauoire](https://merveilles.town/@neauoire), but any member of the network is also welcome to join this repository as a collaborator to help manage new links and Pull Requests. Read more about the webring [here](https://wiki.xxiivv.com/webring).
