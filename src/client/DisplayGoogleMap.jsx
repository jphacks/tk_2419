import { useState } from "react";
import configs from "./assets/config.json";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useGeolocated } from "react-geolocated";

// get google api key
const googleApiKey = configs.google_api_key;

export const DisplayGoogleMap = (props) => {
	const [pinList, setPinList] = useState([
		{
			name: "TOHOシネマズ 市原TOHO CINEMAS ICHIHARA",
			location: {
				lat: 35.5079342,
				lng: 140.1007624
			}
		},
		{
			name: "TOHOシネマズ 上野TOHO CINEMAS TACHIKAWA UENO",
			location: {
				lat: 35.7068072,
				lng: 139.7731154
			}
		}
	]);
	const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
		positionOptions: {
			enableHighAccuracy: false,
		},
		userDecisionTimeout: 5000,
	});
	// 検索キーワードがある場合のみ表示
	if (props.keyword) {
		const containerStyle = {
			width: "80%",
			height: "600px",
		};

		const center = {
			lat: coords.latitude,
			lng: coords.longitude,
		};
		return !isGeolocationAvailable ? (
			<div>Your browser does not support Geolocation</div>
		) : !isGeolocationEnabled ? (
			<div>Geolocation is not enabled</div>
		) : coords ? (
			<>
				{/* <p>Search Key Word: {props.keyword}</p> */}
				{/* <p class="latitude">{coords.latitude}</p> */}
				{/* <p class="longitude">{coords.longitude}</p> */}
				<div id="info">
					<LoadScript googleMapsApiKey={googleApiKey}>
						<GoogleMap
							mapContainerStyle={containerStyle}
							center={center}
							zoom={17}>
							{
								pinList.map(item => {
									return (
										<MarkerF key={item.name} position={item.location} />
									)
								})
							}
						</GoogleMap>
					</LoadScript>
				</div>
			</>
		) : (
			<div>Getting the location data&hellip; </div>
		);
	}
	else {
		return (
			<>
			</>
		)
	}
}

export default DisplayGoogleMap;