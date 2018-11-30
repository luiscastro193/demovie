"use strict";
export default function(movie, removable = false) {
	var element = htmlToElement(`
		<div class="column is-narrow">
			<article class="card" style="width: 250px">
				<header class="card-header">
					<p class="card-header-title"><a href="https://www.imdb.com/title/tt${movie.imdbId}/" target="_blank" rel="noopener" title="Ver en IMDb">${movie.titleES}</a></p>
				</header>
				<div class="card-image">
					<figure class="image">
						<img src="https://m.media-amazon.com/images/M/${movie.poster},0,182,268_AL_.jpg" alt="${movie.titleES}">
					</figure>
				</div>
				<footer class="card-footer">
					<div name="rater"></div>
				</footer>
			</article>
		</div>
	`);
	
	let rater = raterJs({element: element.querySelector("[name=rater]"), step: 0.5, starSize: 50, ratingText: "Pulsa en la valoración para confirmar", rateCallback: function(newRating, done) {
		if (newRating == 0) newRating = 0.5;
		rater.setRating(newRating);
		ratings.set(movie.id, newRating);
		done();
	}});
	
	let rating = ratings.get(movie.id);
	if (rating) rater.setRating(rating);
	
	if (removable) {
		let button = htmlToElement(`
			<a onclick="ratings.delete('${movie.id}')" class="button is-danger is-rounded is-small" style="position: absolute; top: -12px; right: -12px">
				<span class="icon"><i class="fas fa-lg fa-times"></i></span>
			</a>
		`);
		
		button.addEventListener('click', () => element.parentNode.removeChild(element));
		
		let article = element.querySelector('article');
		article.insertBefore(button, article.firstChild);
	}
	
	return element;
}
