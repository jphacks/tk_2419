console.log("Hello from client.js");

if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition((pos) => {
		console.log(pos.coords.latitude, pos.coords.longitude);
	});
} else {
	console.log("geolocation IS NOT available");
}