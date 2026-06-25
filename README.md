# Webring

This [webring](https://wiki.xxiivv.com/webring) is an attempt to inspire artists & developers to create and maintain their own personal websites, and share traffic among each other. The webring's aim is to share rich hand-crafted websites such as **diaries, wikis & portfolios**.

## Join the webring

```html
<a href="https://webring.xxiivv.com/#your-id-here" target="_blank" rel="noopener">
  <img src="https://webring.xxiivv.com/icon.black.svg" alt="XXIIVV webring"/>
</a>
```

1) Add the webring icon to your website HTML.
2) Add your website information to the [index.html](index.html) file. Keep your link name short, and don't leave a trailing `/` in the `href` attribute. Use a sensible alphanumeric value for the `id` attribute.
3) Submit a Pull Request with **the location of the webring icon** on your site. Pull requests with blank descriptions will be rejected.

Alternatively, if your website has a dark background, use `icon.white.svg`. If your website is complaining about *https*, go ahead and host the icon yourself.

### Webring criteria

Your website must count at least 10 content pages and include an about page, blog posts are not counted as content pages. You must have your own domain name, we do not accept `github.io` subdomains.

Single page websites, websites acting only as portals to other social platforms, or websites with violent, racist, sexist or speciesist content will be rejected.  If your website requires Javascript/CSS3 to display the majority of its content or to navigate, it will be rejected. Your business homepage is not a good candidate for the webring, and will be rejected.

If it's found that a website is in violation of any of these rules it will be removed from the webring. Websites without activity for over two years might also be periodically removed. The webring will never exceed 256 entries, new entries will take place of websites that go dark.

As of 2026, **every website will need to have a 88x31 banner**.

#### Adding your RSS/Banner

To add an extra metadata to your entry, add them within your `<li>` tag as follow:

```html
<li data-lang="en" id="WEBSITE_NAME">
	<a href="https://WEBSITE_URL">WEBSITE NAME</a>
	<a href="https://WEBSITE_URL/feed.xml" class="rss">rss</a>
	<img loading="lazy" src="https://WEBSITE_URL/button.gif" alt="WEBSITE NAME" width="88" height="31">
</li>
```

As of 2026, all websites in the webring will need to have a 88x31 banner image hosted on your server. Only gif/png please, no webp.

### Circular Linking

Instead of linking to the directory, you can also link to the next link in the ring by adding parts of your site or domain in the hash of the request url:

```html
<a href="https://webring.xxiivv.com/#xxiivv" target="_blank" rel="noopener noreferrer">
  <img src="https://webring.xxiivv.com/icon.black.svg" alt="XXIIVV webring" width="300" height="300">
</a>
```

## Help

The ring is managed by [@neauoire](https://merveilles.town/@neauoire), but any member of the network is also welcome to join this repository as a collaborator to help manage new links and Pull Requests. Read more on the [webring page on XXIIVV](https://wiki.xxiivv.com/site/webring).
