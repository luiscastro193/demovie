"use strict";
function normalize(string) {
	return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function setSearchStrings(movies) {
	for (let movie of movies)
		movie.searchString = `${normalize(movie.titleES)} ${movie.title && normalize(movie.title) || ''}`;
}

function updateSearchStrings() {
	if (movies.value != 'loading' && movies.value != 'failed')
		setSearchStrings(movies.value);
}

function searchMovies(query, movies) {
	if (!query || movies == 'loading' || movies == 'failed')
		return movies;
	
	let words = normalize(query).split(' ');
	
	return movies.filter(movie => words.every(word => movie.searchString.includes(word)));
}

function updateSearchResult() {
	searchResult.value = searchMovies(searchQuery.value, movies.value);
}

updateSearchStrings();
movies.subscribe(document, updateSearchStrings);

window.searchQuery = newObservable();
window.searchResult = newObservable();

updateSearchResult();
searchQuery.subscribe(document, updateSearchResult);
movies.subscribe(document, updateSearchResult);
