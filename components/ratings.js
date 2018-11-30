"use strict";
function jsonToMap(json) {
	return new Map(JSON.parse(json || '[]'));
}

window.ratings = newObservable(jsonToMap(localStorage.ratings));

ratings.set = function(id, rating) {
	ratings.value.set(id, rating);
	ratings.event.dispatch();
}

ratings.get = function(id) {
	return ratings.value.get(id);
}

ratings.delete = function(id) {
	ratings.value.delete(id);
	ratings.event.dispatch();
}

ratings.clear = function() {
	ratings.value.clear();
	ratings.event.dispatch();
}

ratings.toJson = function() {
	let pairs = [];
	
	for (let [key, value] of ratings.value) {
		pairs.push([key, value]);
	}
	
	return JSON.stringify(pairs);
}

ratings.subscribe(document, () => localStorage.ratings = ratings.toJson());
