"use strict";
const minOffset = 2000;
var button = document.getElementById('backToTop');
let invisible = true;
let lastOffset = 0;

window.addEventListener('scroll', () => {
	if (invisible && pageYOffset > minOffset && pageYOffset < lastOffset) {
		button.classList.remove("is-invisible");
		invisible = false;
	}
	else if (!invisible && (pageYOffset < minOffset  || pageYOffset > lastOffset)) {
		button.classList.add("is-invisible");
		invisible = true;
	}
		
	lastOffset = pageYOffset;
});
