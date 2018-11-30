"use strict";
const botToken = "648902850:AAG9o2dEXLStc0xIajOBLxHmKLzptFUH8dk";
const chatId = "166589969";

export default function(message) {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open("GET", `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
		request.onload = () => {
			if (request.status < 400) resolve();
			else reject(request.statusText);
		};
		request.onerror = () => reject(request.statusText);
		request.send();
	});
}
