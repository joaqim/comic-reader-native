
export async function getComicDatabaseAsync() {
	try {
		let response = await fetch('https://comic-editor.s3.eu-north-1.amazonaws.com/comics_database.json');
		let responseJson = await response.json();
		return responseJson
	} catch (error) {
		console.error(error)
	}
}

export function getComicDatabase() {
	return fetch('https://comic-editor.s3.eu-north-1.amazonaws.com/comics_database.json')
		.then(response => {
			return response.json()
		})
		.catch(error => {
			console.error(error)
		});
}


export function getImagesArray(comic, hq=false) {
  let images = [];
  Object.keys(comic).forEach(function(page_nr) {
    Object.keys(comic[page_nr]).forEach(function(key) {
      if(hq && key == 'source_hq') {
        images[parseInt(page_nr)] = {
          key: parseInt(page_nr),
          index: parseInt(page_nr),
          source: comic[page_nr]['source_hq']
        }
      } else
      if(key == 'source') {
        images[parseInt(page_nr)] = {
          key: parseInt(page_nr),
          index: parseInt(page_nr),
          source: comic[page_nr]['source'],
          source_hq: comic[page_nr]['source_hq']
        }
      }
    });
  });
  return images;
}
