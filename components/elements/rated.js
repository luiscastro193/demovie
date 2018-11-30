"use strict";
import card from './card.js';
import * as messages from './messages.js';
import observe from './observe.js';

const cardStep = 20;

function appendCards(element, lastIndex, ids) {
	let nextIndex = lastIndex + cardStep;

	for (let i = lastIndex; i < nextIndex && i < ids.length; i++)
		element.appendChild(card(movies.value[movies.indexes.get(ids[i])], true));
	
	if (nextIndex < ids.length)
		observe(element.lastChild, () => appendCards(element, nextIndex, ids));
}

function ratedCards() {
	var element = htmlToElement(`
		<div class="columns is-multiline is-mobile is-centered"></div>
	`);
	
	let ids = [];
	
	for (let id of ratings.value.keys())
		ids.push(id);
	
	appendCards(element, 0, ids);
	
	return element;
}

function ratedMoviesElement() {
	var element = htmlToElement(`
		<main class="section" style="padding-top: 0">
			<div class="level">
				<a class="button is-danger">
					<span>Borrar todas</span>
					<span class="icon"><i class="fas fa-trash-alt"></i></span>
				</a>
			</div>
			<div class="modal">
				<div class="modal-background"></div>
				<div class="modal-content">
					<div class="box">
						<div class="content">
							<p><strong>¿Quieres borrar todas las valoraciones guardadas?</strong></p>
							<div class="field is-grouped">
								<div class="control"><button onclick="ratings.clear()" class="button is-danger">Confirmar</button></div>
								<div class="control"><button name="cancelButton" class="button">Cancelar</button></div>
							</div>
						</div>
					</div>
				</div>
				<button class="modal-close is-large"></button>
			</div>
		</main>
	`);
	
	let modal = element.querySelector('.modal');
	element.querySelector('a').onclick = () => modal.classList.add("is-active");
	element.querySelector('.modal-background').onclick = () => modal.classList.remove("is-active");
	element.querySelector('.modal-close').onclick = () => modal.classList.remove("is-active");
	element.querySelector("[name=cancelButton]").onclick = () => modal.classList.remove("is-active");
	
	element.appendChild(ratedCards());
	
	return element;
}

function ratedElement() {
	var element;
	
	if (!ratings.value.size)
		element = messages.missingRated();
	else if (movies.value == 'loading')
		element = messages.loadingMovies();
	else if (movies.value == 'failed')
		element = messages.failedMovies();
	else
		element = ratedMoviesElement();
	
	movies.subscribe(element, () => replaceElement(element, ratedElement()));
	
	return element;
}

function appendRated() {
	if (appMode.value == 'rated')
		replaceElement(document.querySelector('main'), ratedElement());
}

appendRated();
appMode.subscribe(document, appendRated);
