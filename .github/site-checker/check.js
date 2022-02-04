const fs = require("fs/promises");
const path = require("path");
const jsdom = require("jsdom");
const axios = require("axios").default;

const { JSDOM } = jsdom;

const readWebringHTMLFromFileSystem = () =>
  fs.readFile("../../index.html", "utf8");

const extractLinkFromWebringHTML = (html) => {
  const { document } = new JSDOM(html).window;
  const anchorElements = Array.from(
    document.querySelectorAll("body > ol > li a")
  );
  return anchorElements
    .map((link) => link.getAttribute("href"))
    .filter((link) => link);
};

const validHTTPStatusCode = (code) => code >= 200 && code < 400;

const validateLink = async (link) => {
  const timeout = 30000; // 30 sec for the site to respond
  const TIMEOUT_KEY = "TIMEOUT";
  const timeoutFn = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(TIMEOUT_KEY);
    }, timeout);
  });
  try {
    const res = await Promise.race([timeoutFn, axios.get(link)]);
    if (res === TIMEOUT_KEY) {
      return {
        link,
        valid: false,
        reason: `took longer then ${timeout / 1000} sec to respond`,
      };
    }
    const valid = validHTTPStatusCode(res.status);
    if (valid) {
      return { valid, link };
    }
    return {
      link,
      valid,
      reason: res.status,
    };
  } catch (e) {
    return {
      link,
      valid: false,
      reason: e,
    };
  }
};

const validateLinks = (links) => Promise.all(links.map(validateLink));

const getBadge = async (alive, total) => {
  const diff = total - alive;
  let color = "green";
  if (diff > 0) {
    color = "yellow";
  }
  if (diff > 5) {
    color = "red";
  }
  const res = await axios(
    `https://img.shields.io/badge/reachable%20sites-${alive}%2F${total}-${color}`
  );
  return res.data;
};

const getErrorText = (linkStatus) => {
  const unreachableStatus = linkStatus.filter((status) => !status.valid);
  return unreachableStatus.reduce(
    (carry, status) => carry + `${status.link}: ${status.reason}\r\n`,
    ""
  );
};

const badgePath = "../../_badges/reachable-site.svg";
const errorFilePath = "../../_badges/reachable-site-errors.txt";

(async function () {
  const webringHTML = await readWebringHTMLFromFileSystem();
  const links = extractLinkFromWebringHTML(webringHTML);
  console.log(`found ${links.length} webring links`);
  const linkStatus = await validateLinks(links);
  const totalLinks = links.length;
  const reachableLinks = linkStatus.filter((x) => x.valid).length;
  console.log(`${reachableLinks} reachable sites out of ${totalLinks}`);
  const badgeSvg = await getBadge(reachableLinks, totalLinks);

  await fs.mkdir(path.dirname(badgePath), { recursive: true });
  await fs.writeFile(badgePath, badgeSvg);
  await fs.writeFile(errorFilePath, getErrorText(linkStatus));
  process.exit(0);
})().catch((e) => {
  console.log(`Error: ${e.message}`);
  process.exit(1);
});
