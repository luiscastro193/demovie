"use strict";
import telegram from '../telegram.js';

function contactElement() {
	var element = htmlToElement(`
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Formulario de contacto</p>
					<button class="delete"></button>
				</header>
				<section class="modal-card-body" style="border-bottom-left-radius: 6px; border-bottom-right-radius: 6px">
					<form>
						<div class="field">
							<label class="label">Tu email</label>
							<div class="control has-icons-left" style="max-width: 20rem">
								<input name="email" class="input" type="email">
								<span class="icon is-left"><i class="fas fa-envelope"></i></span>
							</div>
						</div>
						<div class="field">
							<label class="label">Tu mensaje</label>
							<div class="control"><textarea name="message" class="textarea" required></textarea></div>
						</div>
						<div class="field is-grouped">
							<div class="control"><button name="sendButton" class="button is-link">Enviar</button></div>
							<div class="control"><button name="cancelButton" type="button" class="button is-text">Cancelar</button></div>
						</div>
					</form>
				</section>
			</div>
		</div>
	`);
	
	let form = element.querySelector('form');
	let button = element.querySelector("[name=sendButton]");
	let cancelButton = element.querySelector("[name=cancelButton]");
	let emailInput = element.querySelector("[name=email]");
	let messageInput = element.querySelector("[name=message]");
	
	element.querySelector('.modal-background').onclick = () => element.parentNode.removeChild(element);
	element.querySelector('.delete').onclick = () => element.parentNode.removeChild(element);
	cancelButton.onclick = () => element.parentNode.removeChild(element);
	
	form.onsubmit = function(event) {
		event.preventDefault();
		button.classList.add("is-loading");
		emailInput.readOnly = true;
		messageInput.readOnly = true;
		let message = (emailInput.value || 'Anónimo') + '\n\n' + messageInput.value;
		
		telegram(message).then(() => {
			button.type = "button";
			button.className = "button is-success";
			button.textContent = "Enviado";
			cancelButton.textContent = "Salir";
		}).catch(() => {
			button.className = "button is-warning";
			button.textContent = "Error, pulsa para reintentar";
			emailInput.readOnly = false;
			messageInput.readOnly = false;
		});
	}
	
	return element;
}

window.launchContact = function() {
	document.body.appendChild(contactElement());
}
