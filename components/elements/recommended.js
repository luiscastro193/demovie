"use strict";
import card from './card.js';
import * as messages from './messages.js';

function failedMessage() {
	return htmlToElement(`
		<main class="section" style="padding-top: 0">
			<article class="message is-warning">
				<div class="message-header">
					<p>Error</p>
				</div>
				<div class="message-body">
					Ha habido un error al cargar las recomendaciones. <a onclick="updateRecommended()">Reintentar</a>
				</div>
			</article>
		</main>
	`);
}

function recommendedCards() {
	var element = element = htmlToElement(`
		<main class="section" style="padding-top: 0">
			<div class="columns is-multiline is-mobile is-centered"></div>
		</main>
	`);
	
	let container = element.querySelector('div');
	
	for (let movie of cachedRecommended.value)
		container.appendChild(card(movie));
	
	return element;
}

function recommendedElement() {
	var element;
	
	if (recommended.value == 'loading' && cachedRecommended.value == 'invalid')
		element = messages.loading();
	else if (recommended.value == 'failed')
		element = failedMessage();
	else if (!recommended.value.length)
		element = messages.missingRated();
	else {
		if (movies.value == 'loading' && cachedRecommended.value == 'invalid')
			element = messages.loadingMovies();
		else if (movies.value == 'failed')
			element = messages.failedMovies();
		else
			element = recommendedCards();
	}
	
	recommended.subscribe(element, () => replaceElement(element, recommendedElement()));
	movies.subscribe(element, () => replaceElement(element, recommendedElement()));
	
	return element;
}

function appendRecommended() {
	if (appMode.value == 'recommended')
		replaceElement(document.querySelector('main'), recommendedElement());
}

appendRecommended();
appMode.subscribe(document, appendRecommended);
