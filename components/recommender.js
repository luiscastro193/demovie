"use strict";
function getRecommendations(ratings) {
	return new Promise((resolve, reject) => {
		if (!ratings.size)
			return resolve([]);
		
		let queryString = '?';
		
		for (let [key, value] of ratings)
			queryString += `${key}=${(value - 0.5) / 4.5}&`;
		
		let request = new XMLHttpRequest();
		request.open("GET", 'https://demovie.herokuapp.com/query' + queryString);
		request.responseType = "json";
		request.onload = () => {
			if (request.status < 400) {
				resolve(request.response.map(item => {
					item._id = String(item._id);
					return item;
				}));
			}
			else reject(request.statusText);
		};
		request.onerror = () => reject(request.statusText);
		request.send();
	});
}

var lastPromise;

window.updateRecommended = function() {
	recommended.value = 'loading';
	
	let promise = getRecommendations(ratings.value).then(recommendations => {
		if (promise == lastPromise)
			recommended.value = recommendations;
	}).catch(() => {
		if (promise == lastPromise)
			recommended.value = 'failed';
	});
	
	lastPromise = promise;
}

window.recommended = newObservable(JSON.parse(localStorage.recommended || '[]'));
recommended.subscribe(document, () => localStorage.recommended = JSON.stringify(recommended.value));

if (recommended.value == 'loading' || recommended.value == 'failed')
	updateRecommended();

ratings.subscribe(document, updateRecommended);

function updateCachedRecommended() {
	if (recommended.value == 'failed' || movies.value == 'failed' || !recommended.value.length)
		cachedRecommended.value = 'invalid';
	else if (recommended.value != 'loading' && movies.value != 'loading')
		cachedRecommended.value = recommended.value.map(item => movies.value[movies.indexes.get(item._id)]);
}

window.cachedRecommended = newObservable(JSON.parse(localStorage.cachedRecommended || '"invalid"'));
cachedRecommended.subscribe(document, () => localStorage.cachedRecommended = JSON.stringify(cachedRecommended.value));

updateCachedRecommended();
recommended.subscribe(document, updateCachedRecommended);
movies.subscribe(document, updateCachedRecommended);

function updateCachedRecommendedProgress() {
	if (recommended.value == 'loading')
		cachedRecommended.progress.value = 'loading';
	else if (cachedRecommended.progress.value == 'loading' && (movies.value != 'loading' || recommended.value == 'failed' || !recommended.value.length))
		cachedRecommended.progress.value = 'done';
}

cachedRecommended.progress = newObservable(JSON.parse(localStorage.cachedRecommendedProgress || '"done"'));
cachedRecommended.progress.subscribe(document, () => localStorage.cachedRecommendedProgress = JSON.stringify(cachedRecommended.progress.value));

updateCachedRecommendedProgress();
recommended.subscribe(document, updateCachedRecommendedProgress);
movies.subscribe(document, updateCachedRecommendedProgress);
