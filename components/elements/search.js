"use strict";
import card from './card.js';
import * as messages from './messages.js';
import observe from './observe.js';

const cardStep = 20;

function failedMessage() {
	var element = htmlToElement(`
		<article class="message is-info">
			<div class="message-header">
				<p>No hay resultados</p>
			</div>
			<div class="message-body">
				No se han encontrado películas con el título introducido.
			</div>
		</article>
	`);
	
	searchResult.subscribe(element, () => replaceElement(element, searchResultCards()));

	return element;
}

function appendCards(element, lastIndex) {
	let nextIndex = lastIndex + cardStep;

	for (let i = lastIndex; i < nextIndex && i < searchResult.value.length; i++)
		element.appendChild(card(searchResult.value[i]));
	
	if (nextIndex < searchResult.value.length)
		observe(element.lastChild, () => appendCards(element, nextIndex));
}

function searchResultCards() {
	if (!searchResult.value.length)
		return failedMessage();
	
	var element = htmlToElement(`
		<div class="columns is-multiline is-mobile is-centered"></div>
	`);
	
	appendCards(element, 0);
	
	searchResult.subscribe(element, () => replaceElement(element, searchResultCards()));
	
	return element;
}

function searchResultElement() {
	var element = htmlToElement(`
		<main class="section" style="padding-top: 0">
			<div class="field" style="margin-bottom: 1.5rem">
				<div class="control has-icons-left" style="max-width: 30rem">
					<input class="input is-rounded is-info has-background-light" type="search" placeholder="Título de la película"
						oninput="searchQuery.value = this.value" onmouseenter="this.select()">
					<span class="icon is-left"><i class="fas fa-search"></i></span>
				</div>
			</div>
		</main>
	`);
	
	if (searchQuery.value)
		element.querySelector('input').value = searchQuery.value;
	
	element.appendChild(searchResultCards());
	
	return element;
}

function searchElement() {
	var element;
	
	if (movies.value == 'loading')
		element = messages.loadingMovies();
	else if (movies.value == 'failed')
		element = messages.failedMovies();
	else
		element = searchResultElement();
	
	movies.subscribe(element, () => replaceElement(element, searchElement()));
	
	return element;
}

function appendSearch() {
	if (appMode.value == 'search')
		replaceElement(document.querySelector('main'), searchElement());
}

appendSearch();
appMode.subscribe(document, appendSearch);
