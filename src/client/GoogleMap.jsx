import { useState } from "react";

export const GoogleMap = (props) => {
	if (props.keyword) {
		return (
			<>
				<p>{props.keyword}</p>
				<p>Google Map</p>
			</>
		);
	}
	else {
		return (
			<>
			</>
		)
	}
}

export default GoogleMap;