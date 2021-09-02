import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

outlines = []

class Status:
    SUCCESS = "\033[92m✓\033[0;0m"
    ERROR = "\033[91m✘\033[0;0m"

class Outline:
    title = ""
    description = ""
    htmlUrl = ""
    xmlUrl = ""

def createOPML():
    soup = BeautifulSoup(features="xml")
    opml = soup.new_tag("opml", version="1.1")

    head = soup.new_tag("head")
    title = soup.new_tag("title")
    title.string = "webring.opml"
    head.append(title)
    opml.append(head)

    body = soup.new_tag("body")
    outline = soup.new_tag("outline", text="webring", title="webring")

    for entry in outlines:
        item = soup.new_tag("outline", type="rss", version="RSS")
        item.attrs["text"] = entry.title
        item.attrs["title"] = entry.title
        item.attrs["description"] = entry.description
        item.attrs["htmlUrl"] = entry.htmlUrl
        item.attrs["xmlUrl"] = entry.xmlUrl
        outline.append(item)

    body.append(outline)
    opml.append(body)

    soup.append(opml)
    f = open("webring.opml", "w")
    f.write(soup.prettify())
    f.close()

def fetchRSS(url):
    print("fetching: %s " %(url), end="")
    try:
        resp = requests.get(url, allow_redirects=True)
        parsed = BeautifulSoup(resp.text, "lxml")
    except Exception as e:
        print("\n  %s Could not parse RSS feed" %(Status.ERROR))
        return

    if resp.status_code != 200:
        print("\n  %s Could not fetch page: [%s]" %(Status.ERROR, resp.status_code))
        return

    out = Outline()
    out.title = "" if parsed.title is None else parsed.title.text

    if parsed.subtitle is not None:
        out.description = parsed.subtitle.text
    elif parsed.description is not None:
        out.description = parsed.description.text
    out.description = out.description.strip()

    out.htmlUrl = "" if parsed.link is None else parsed.link.text
    if not out.htmlUrl:
        parsed_uri = urlparse(url)
        out.htmlUrl = "{uri.scheme}://{uri.netloc}/".format(uri=parsed_uri)

    out.xmlUrl= url

    outlines.append(out)
    print(Status.SUCCESS)

with open("index.html") as fp:
    soup = BeautifulSoup(fp, "html.parser")

    rss = soup.body.find_all("a", {"class": "rss", "href": True})
    for feed in rss:
        fetchRSS(feed["href"])

    createOPML()
