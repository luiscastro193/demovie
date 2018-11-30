"use strict";
window.appMode = newObservable('recommended');

cachedRecommended.progress.subscribe(document, () => {
	if (cachedRecommended.progress.value != 'loading') {
		document.querySelector('.tabs').scrollIntoView();
		appMode.value = 'recommended';
	}
});
