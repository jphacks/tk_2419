const puppeter = require('puppeteer');

(async () => {
    const url = 'https://hlo.tohotheater.jp/net/movie/TNPI3090J01.do';
    const browser = await puppeter.launch({headless: "new"});
    const page = await browser.newPage();
    await page.goto(url);

    let content = await page.content();
    console.log(content);

    await browser.close();
})();