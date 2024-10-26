const playwright = require('playwright');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('movies.db');

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

async function getCinemasName(url) {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url);
    const arrayOfLocator = page.locator('div[class="theater-list"]').locator('ul').locator('span');
    const count = await arrayOfLocator.count();
    let cinemas = [];

    for (var index = 0; index < count; index++) {
        const element = await arrayOfLocator.nth(index);
        const movieTitle = await element.innerText();
        cinemas.push(movieTitle);
    }
    await browser.close();
    return cinemas;
}

const cinemasUrl = 'https://www.tohotheater.jp/theater/find.html';
getCinemasName(cinemasUrl).then((cinemasName) => {
    // 一個飛ばしでリストに入れ、日本語の映画館名だけを取得し、後半の英語の映画館名は削除
    let cinemas = [];
    for (var index = 0; index < cinemasName.length; index += 2) {
        cinemas.push(cinemasName[index]);
    }
    console.log(cinemas);


const movieUrl = 'https://hlo.tohotheater.jp/net/schedule/084/TNPI2000J01.do';
getMovieTitles(movieUrl).then((movieTitles) => {
    console.log(movieTitles);
    });
});