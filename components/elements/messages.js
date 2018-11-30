"use strict";
export function loading() {
	return htmlToElement(`
		<main class="section" style="padding-top: 0">
			<progress class="progress is-primary is-large">Cargando...</progress>
		</main>
	`);
}

export function missingRated() {
	return htmlToElement(`
		<main class="section" style="padding-top: 0">
			<article class="message is-info">
				<div class="message-header">
					<p>Faltan valoraciones</p>
				</div>
				<div class="message-body">
					Valora películas para obtener recomendaciones personalizadas. <a onclick="appMode.value = 'search'">Ir a búsqueda</a>
				</div>
			</article>
		</main>
	`);
}

export function loadingMovies() {
	var element = loading();
	let progress = element.querySelector('progress');
	
	movies.progress.subscribe(element, () => {
		if (movies.progress.value)
			progress.value = movies.progress.value;
	})
	
	return element;
}

export function failedMovies() {
	return htmlToElement(`
		<main class="section" style="padding-top: 0">
			<article class="message is-warning">
				<div class="message-header">
					<p>Error</p>
				</div>
				<div class="message-body">
					Ha habido un error al cargar las películas. <a onclick="updateMovies()">Reintentar</a>
				</div>
			</article>
		</main>
	`);
}
