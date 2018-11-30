"use strict";
function setActive(element, name) {
	if (appMode.value == name)
		element.classList.add("is-active");
	else
		element.classList.remove("is-active");
}

function counter() {
	let element = htmlToElement(`<span class="tag is-rounded is-success">${ratings.value.size}</span>`);
	ratings.subscribe(element, () => element.textContent = ratings.value.size);
	return element;
}

function updateIcon(element) {
	if (cachedRecommended.progress.value == 'loading')
		element.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;
	else
		element.innerHTML = `<i class="fas fa-star"></i>`;
}

function subscribeIcon(element) {
	updateIcon(element);
	cachedRecommended.progress.subscribe(element, () => updateIcon(element));
}

var searchTab = document.querySelector("[name=searchTab]");
appMode.subscribe(searchTab, () => setActive(searchTab, "search"));

var recommendedTab = document.querySelector("[name=recommendedTab]");
appMode.subscribe(recommendedTab, () => setActive(recommendedTab, "recommended"));
subscribeIcon(recommendedTab.querySelector('.icon'))

var ratedTab = document.querySelector("[name=ratedTab]");
appMode.subscribe(ratedTab, () => setActive(ratedTab, "rated"));
ratedTab.querySelector('a').appendChild(counter());
