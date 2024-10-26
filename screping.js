const playwright = require('playwright');

async function getMovieTitles(url) {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url);
    const arrayOfLocator = page.locator('h5[class="schedule-body-title"]');
    const count = await arrayOfLocator.count();
    let movieTitles = [];

    for (var index = 0; index < count; index++) {
        const element = await arrayOfLocator.nth(index);
        const movieTitle = await element.innerText();
        movieTitles.push(movieTitle);
    }
    await browser.close();
    return movieTitles;
}

const url = 'https://hlo.tohotheater.jp/net/schedule/084/TNPI2000J01.do';
getMovieTitles(url).then((movieTitles) => {
    console.log(movieTitles);
});