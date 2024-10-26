import { useState } from "react";
import { motion } from 'framer-motion';

const handleSubmit = (ev) => {
	ev.preventDefault();
	const form = new FormData(ev.currentTarget);
	alert(form.get("query"));
}

export const SearchBox = () => {
	const [searchWord, setSearchWord ] = useState("");
	return (
		<main>
			<motion.div
			className="relative w-auto my-6 mx-auto max-w-lg"
  		initial={{ opacity: 0, transform: "translateY(0%)" }}
  		animate={{ opacity: 1, transform: "translateY(0)" }}
  		transition={{ duration: 1.0 }}>
				<h1 class="top">Instant Movie</h1>
			</motion.div>
			<motion.div
			className="relative w-auto my-6 mx-auto max-w-lg"
  		initial={{ opacity: 0, transform: "translateY(40%)" }}
  		animate={{ opacity: 1, transform: "translateY(0)" }}
  		transition={{ duration: 1.0 }}>
				<form class="search" method="get" onSubmit={handleSubmit}>
					<input class="sbox" name="query" placeholder="検索したいものを入力してください。"/>
					<input class="sbtn" type="submit" value="検索" />
				</form>
			</motion.div>
			<p>{searchWord}</p>
		</main>
	)
}

export default SearchBox;