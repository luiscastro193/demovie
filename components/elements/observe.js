"use strict";
var observerCallback;

var observer = new IntersectionObserver(entries => {
	if (entries[0].isIntersecting) {
		observer.disconnect();
		observerCallback();
	}
});

export default function(target, callback) {
	observer.disconnect();
	observerCallback = callback;
	
	if (document.contains(target))
		observer.observe(target);
	else {
		let mutation = new MutationObserver(() => {
			if (document.contains(target)) {
				mutation.disconnect();
				observer.observe(target);
			}
		});
		
		mutation.observe(document.body, {childList: true, subtree: true});
	}
}
