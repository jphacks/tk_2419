const playwright = require('playwright');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database/movies.db');
const fs = require('fs');
const NodeGeocoder = require('node-geocoder');

const googleApiKey = JSON.parse(fs.readFileSync('./src/client/assets/config.json', 'utf8')).google_api_key;

const options = {
  provider: 'google',
  apiKey: googleApiKey, // for Mapquest, OpenCage, APlace, Google Premier
  formatter: null // 'gpx', 'string', ...
};

db.serialize(() => {
	db.run('CREATE TABLE IF NOT EXISTS theater (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, latitude REAL, longitude REAL, url TEXT)');
	db.run('CREATE TABLE IF NOT EXISTS movie_list (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)');
	db.run('CREATE TABLE IF NOT EXISTS showtimes (id INTEGER PRIMARY KEY AUTOINCREMENT, movie_id INTEGER, theater_id INTEGER, FOREIGN KEY(movie_id) REFERENCES movie_list(id), FOREIGN KEY(theater_id) REFERENCES theater(id))')
})

async function getTheaterPosition(theaterName) {
	const geocoder = NodeGeocoder(options);
	const res = await geocoder.geocode(theaterName);
	return res;
}

async function getMovieTitles(url) {
	const browser = await playwright.chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();

	await page.goto(url);
	const arrayOfLocator = page.locator('h5[class="schedule-body-title"]');
	const count = await arrayOfLocator.count();
	let movieTitles = [];

	for (let index = 0; index < count; index++) {
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

	for (let index = 0; index < count; index++) {
		const element = await arrayOfLocator.nth(index);
		const movieTitle = await element.innerText();
		cinemas.push(movieTitle);
	}
	await browser.close();
	return cinemas;
}

const cinemasUrl = 'https://www.tohotheater.jp/theater/find.html';
getCinemasName(cinemasUrl).then((cinemasName) => {
	console.log(`searched. adding to database...`)
	// 一個飛ばしでリストに入れ、日本語の映画館名だけを取得し、後半の英語の映画館名は削除
	let cinemas = [];
	for (let index = 0; index < cinemasName.length; index += 2) {
		cinemas.push(cinemasName[index]);
		const db = new sqlite3.Database('./database/movies.db');
		// 元々のデータベースに映画館名が存在しない場合、新規追加
		db.serialize(() => {
			const cinemaName = cinemasName[index];
			// console.log(db.run(`SELECT * FROM theater WHERE name = '${cinemaName}';`))
			db.all(`SELECT * FROM theater WHERE name = '${cinemaName}';`, function(err, rows) {
				if (err) return err;
				if (rows.length == 0) {
					getTheaterPosition(cinemaName).then((res) => {
						db.run(`INSERT INTO theater (name, latitude, longitude) VALUES ('${cinemaName}', ${res[0].latitude}, ${res[0].longitude});`);
						console.log(`not found ${cinemaName} in database. inserted!`);
					});
				}
			});
		})
	}
	console.log("ended.")
	// console.log(cinemas);


	const movieUrl = 'https://hlo.tohotheater.jp/net/schedule/084/TNPI2000J01.do';
	getMovieTitles(movieUrl).then((movieTitles) => {
		// console.log(movieTitles);
	});
});

db.close();