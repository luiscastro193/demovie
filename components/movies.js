"use strict";
const fileSize = 3577438;

function importMovies() {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.onprogress = event => movies.progress.value = event.loaded / (event.total || fileSize);
		request.open("GET", 'assets/movies.json');
		request.responseType = "json";
		request.onload = () => {
			if (request.status < 400) resolve(request.response);
			else reject(request.statusText);
		};
		request.onerror = () => reject(request.statusText);
		request.send();
	});
}

window.updateMovies = function() {
	movies.value = 'loading';
	movies.progress.value = null;
	
	importMovies().then(movieData => movies.value = movieData)
	.catch(() => movies.value = 'failed');
}

window.movies = newObservable();
movies.progress = newObservable();
updateMovies();

function updateIndexes() {
	if (movies.value != 'loading' && movies.value != 'failed') {
		for (let [index, movie] of movies.value.entries())
			movies.indexes.set(movie.id, index);
	}
}

movies.indexes = new Map();
updateIndexes();
movies.subscribe(document, updateIndexes);
