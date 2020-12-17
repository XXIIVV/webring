# Webring

This [webring](https://wiki.xxiivv.com/webring) is an attempt to inspire artists & developers to create and maintain their own website and share traffic among each other. The webring's aim is to share rich hand-crafted websites such as **diaries, wikis & portfolios**.

## Join the webring

```
<a href='https://webring.xxiivv.com/#random' target='_blank'><img src='https://webring.xxiivv.com/icon.black.svg'/></a>
```

1) Add the webring icon to your website html.
2) Add your website information to the [index.html](https://github.com/XXIIVV/webring/edit/master/index.html) file. Keep your link name short, and don't leave a trailing `/` in the `href` attribute. Use a sensible alphanumeric value for the id.
3) Submit a Pull Request with **the location of the webring icon** on your site. Pull requests with blank descriptions will be rejected.

Alternatively, if you your website has a dark background, use `icon.white.svg`. If your website is complaining about *https*, go ahead and host the icon yourself.

### Webring criteria

**Single page websites, websites acting only as portals to other social platforms, or websites with violent, racist, sexist or speciesist content will be rejected**.

The aim of the webring is to display **hand-crafted personal** websites showcasing the creator's audio, visual or written works. Your business site is probably not the best fit for the webring, and will be rejected. 

If your website requires Javascript to display the majority of its content or to navigate, it will be rejected. Your website must count at least 10 pages and include an about page. You must have your own domain name, we do not accept `github.io` subdomains. 

If it's seen that your website is in violation to any of these rules your site will be removed from the webring. If you fix the issues, feel free to submit another PR to join back in.

#### Adding your RSS/TWTXT

To add an extra feed to your entry, add them within your `<li>` tag as follow:

```
<li data-lang="en" id="xxiivv">
  <a href="https://wiki.xxiivv.com">xxiivv</a>
  <a href="https://wiki.xxiivv.com/links/tw.txt" class="twtxt">twtxt</a>
  <a href="https://wiki.xxiivv.com/links/rss.xml" class="rss">rss</a>
</li>
```

[twtxt](https://twtxt.readthedocs.io/en/stable/) is a decentralized, minimalist microblogging service for hackers. You're welcome to add your twtxt feed alongside your RSS feed. If you're looking a minimal C99 client for twtxt, try [this](https://github.com/neauoire/twtxtc).

### Circular Linking

Instead of linking to the directory, you can also link to the next link in the ring by adding parts of your site or domain in the hash of the request url:

```
<a href='https://webring.xxiivv.com/#xxiivv' target='_blank' rel="noopener noreferrer"><img src='https://webring.xxiivv.com/icon.black.svg'/></a>
```

## Help

The ring is managed by [@neauoire](https://merveilles.town/@neauoire), but any member of the network is also welcome to join this repository as a collaborator to help manage new links and Pull Requests. Read more about the webring [here](https://wiki.xxiivv.com/webring).
