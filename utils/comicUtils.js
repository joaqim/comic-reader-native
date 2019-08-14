
export default function getComicDatabaseAsync() {
	try {
		let response = await fetch('https://comic-editor.s3.eu-north-1.amazonaws.com/comics_database.json');
		let responseJson = await response.json();
		return responseJson
	} catch (error) {
		console.error(error)
	}
}

export default function getComicDatabase() {
	return fetch('https://comic-editor.s3.eu-north-1.amazonaws.com/comics_database.json')
		.then(response => {
			return response.json()
		})
		.catch(error => {
			console.error(error)
		});
}
