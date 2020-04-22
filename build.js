!function(){"use strict";window.htmlToElement=function(e){let t=document.createElement("template");return t.innerHTML=e.trim(),t.content.firstChild},window.replaceElement=function(e,t){e.parentNode.replaceChild(t,e)},window.newEvent=function(){let e=document.createElement("e"),t=new Event("e");return e.addListener=function(t,n){e.addEventListener("e",(function a(){document.contains(t)?n():e.removeEventListener("e",a)}))},e.dispatch=function(){e.dispatchEvent(t)},e},window.newObservable=function(e){return{variable:e,event:newEvent(),get value(){return this.variable},set value(e){this.variable=e,this.event.dispatch()},subscribe:function(e,t){this.event.addListener(e,t)}}};1!=localStorage.version&&(localStorage.clear(),localStorage.version=1);function e(){if("loading"!=movies.value&&"failed"!=movies.value)for(let[e,t]of movies.value.entries())t.id=String(e)}var t;window.updateMovies=function(){movies.value="loading",movies.progress.value=null,new Promise((e,t)=>{let n=new XMLHttpRequest;n.onprogress=e=>movies.progress.value=e.loaded/(e.total||2573335),n.open("GET","assets/movies.json"),n.responseType="json",n.onload=()=>{n.status<400?e(n.response):t(n.statusText)},n.onerror=()=>t(n.statusText),n.send()}).then(e=>movies.value=e).catch(()=>movies.value="failed")},window.movies=newObservable(),movies.progress=newObservable(),updateMovies(),e(),movies.subscribe(document,e),window.ratings=newObservable((t=localStorage.ratings,new Map(JSON.parse(t||"[]")))),ratings.set=function(e,t){ratings.value.set(e,t),ratings.event.dispatch()},ratings.get=function(e){return ratings.value.get(e)},ratings.delete=function(e){ratings.value.delete(e),ratings.event.dispatch()},ratings.clear=function(){ratings.value.clear(),ratings.event.dispatch()},ratings.toJson=function(){return JSON.stringify([...ratings.value.entries()])},ratings.subscribe(document,()=>localStorage.ratings=ratings.toJson());let n=new Worker("assets/worker.js"),a={},s={},o=0;var i;function r(){"failed"!=recommended.value&&"failed"!=movies.value&&recommended.value.length?"loading"!=recommended.value&&"loading"!=movies.value&&(cachedRecommended.value=recommended.value.map(e=>movies.value[e])):cachedRecommended.value="invalid"}function l(){"loading"==recommended.value?cachedRecommended.progress.value="loading":"loading"!=cachedRecommended.progress.value||"loading"==movies.value&&"failed"!=recommended.value&&recommended.value.length||(cachedRecommended.progress.value="done")}function c(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function d(){"loading"!=movies.value&&"failed"!=movies.value&&function(e){for(let t of e)t.searchString=`${c(t.titleES)} ${t.title&&c(t.title)||""}`}(movies.value)}function u(){searchResult.value=function(e,t){if(!e||"loading"==t||"failed"==t)return t;let n=c(e).split(" ");return t.filter(e=>n.every(t=>e.searchString.includes(t)))}(searchQuery.value,movies.value)}function m(e,t){appMode.value==t?e.classList.add("is-active"):e.classList.remove("is-active")}function v(e){"loading"==cachedRecommended.progress.value?e.innerHTML='<i class="fas fa-spinner fa-spin"></i>':e.innerHTML='<i class="fas fa-star"></i>'}n.onmessage=function(e){let t=e.data.msgId;e.data.recommendations?a[t](e.data.recommendations):e.data.error?s[t](e.data.error):s[t](),delete a[t],delete s[t]},window.updateRecommended=function(){recommended.value="loading";let e=function(e){return new Promise((t,i)=>{if(!e.size)return t([]);let r=o++;a[r]=t,s[r]=i,n.postMessage({msgId:r,ratings:[...e.entries()]})})}(ratings.value).then(t=>{e==i&&(recommended.value=t)}).catch(()=>{e==i&&(recommended.value="failed")});i=e},window.recommended=newObservable(JSON.parse(localStorage.recommended||"[]")),recommended.subscribe(document,()=>localStorage.recommended=JSON.stringify(recommended.value)),"loading"!=recommended.value&&"failed"!=recommended.value||updateRecommended(),ratings.subscribe(document,updateRecommended),window.cachedRecommended=newObservable(JSON.parse(localStorage.cachedRecommended||'"invalid"')),cachedRecommended.subscribe(document,()=>localStorage.cachedRecommended=JSON.stringify(cachedRecommended.value)),r(),recommended.subscribe(document,r),movies.subscribe(document,r),cachedRecommended.progress=newObservable(JSON.parse(localStorage.cachedRecommendedProgress||'"done"')),cachedRecommended.progress.subscribe(document,()=>localStorage.cachedRecommendedProgress=JSON.stringify(cachedRecommended.progress.value)),l(),recommended.subscribe(document,l),movies.subscribe(document,l),d(),movies.subscribe(document,d),window.searchQuery=newObservable(),window.searchResult=newObservable(),u(),searchQuery.subscribe(document,u),movies.subscribe(document,u),window.appMode=newObservable("recommended"),cachedRecommended.progress.subscribe(document,()=>{"loading"!=cachedRecommended.progress.value&&(document.querySelector(".tabs").scrollIntoView(),appMode.value="recommended")});var p=document.querySelector("[name=searchTab]");appMode.subscribe(p,()=>m(p,"search"));var g,b=document.querySelector("[name=recommendedTab]");appMode.subscribe(b,()=>m(b,"recommended")),v(g=b.querySelector(".icon")),cachedRecommended.progress.subscribe(g,()=>v(g));var f,h=document.querySelector("[name=ratedTab]");function y(e,t=!1){var n=htmlToElement(`\n\t\t<div class="column is-narrow">\n\t\t\t<article class="card" style="width: 250px">\n\t\t\t\t<header class="card-header">\n\t\t\t\t\t<p class="card-header-title"><a href="https://www.imdb.com/title/tt${e.imdbId}/" target="_blank" rel="noopener" title="Ver en IMDb">${e.titleES}</a></p>\n\t\t\t\t</header>\n\t\t\t\t<div class="card-image">\n\t\t\t\t\t<figure class="image">\n\t\t\t\t\t\t<img src="https://m.media-amazon.com/images/M/${e.poster},0,182,268_AL_.jpg" alt="${e.titleES}">\n\t\t\t\t\t</figure>\n\t\t\t\t</div>\n\t\t\t\t<footer class="card-footer">\n\t\t\t\t\t<div name="rater"></div>\n\t\t\t\t</footer>\n\t\t\t</article>\n\t\t</div>\n\t`);let a=raterJs({element:n.querySelector("[name=rater]"),step:.5,starSize:50,ratingText:"Pulsa en la valoración para confirmar",rateCallback:function(t,n){0==t&&(t=.5),a.setRating(t),ratings.set(e.id,t),n()}}),s=ratings.get(e.id);if(s&&a.setRating(s),t){let t=htmlToElement(`\n\t\t\t<a onclick="ratings.delete('${e.id}')" class="button is-danger is-rounded is-small" style="position: absolute; top: -12px; right: -12px">\n\t\t\t\t<span class="icon"><i class="fas fa-lg fa-times"></i></span>\n\t\t\t</a>\n\t\t`);t.addEventListener("click",()=>n.parentNode.removeChild(n));let a=n.querySelector("article");a.insertBefore(t,a.firstChild)}return n}function w(){return htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<progress class="progress is-primary is-large">Cargando...</progress>\n\t\t</main>\n\t')}function S(){return htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<article class="message is-info">\n\t\t\t\t<div class="message-header">\n\t\t\t\t\t<p>Faltan valoraciones</p>\n\t\t\t\t</div>\n\t\t\t\t<div class="message-body">\n\t\t\t\t\tValora películas para obtener recomendaciones personalizadas. <a onclick="appMode.value = \'search\'">Ir a búsqueda</a>\n\t\t\t\t</div>\n\t\t\t</article>\n\t\t</main>\n\t')}function E(){var e=w();let t=e.querySelector("progress");return movies.progress.subscribe(e,()=>{movies.progress.value&&(t.value=movies.progress.value)}),e}function R(){return htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<article class="message is-warning">\n\t\t\t\t<div class="message-header">\n\t\t\t\t\t<p>Error</p>\n\t\t\t\t</div>\n\t\t\t\t<div class="message-body">\n\t\t\t\t\tHa habido un error al cargar las películas. <a onclick="location.reload()">Reintentar</a>\n\t\t\t\t</div>\n\t\t\t</article>\n\t\t</main>\n\t')}function T(){var e;return e="loading"==recommended.value&&"invalid"==cachedRecommended.value?w():"failed"==recommended.value?htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<article class="message is-warning">\n\t\t\t\t<div class="message-header">\n\t\t\t\t\t<p>Error</p>\n\t\t\t\t</div>\n\t\t\t\t<div class="message-body">\n\t\t\t\t\tNavegador no compatible. Por favor, use un navegador decente.\n\t\t\t\t</div>\n\t\t\t</article>\n\t\t</main>\n\t'):recommended.value.length?"loading"==movies.value&&"invalid"==cachedRecommended.value?E():"failed"==movies.value?R():function(){var e=e=htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<div class="columns is-multiline is-mobile is-centered"></div>\n\t\t</main>\n\t');let t=e.querySelector("div");for(let e of cachedRecommended.value)t.appendChild(y(e));return e}():S(),recommended.subscribe(e,()=>replaceElement(e,T())),movies.subscribe(e,()=>replaceElement(e,T())),e}function q(){"recommended"==appMode.value&&replaceElement(document.querySelector("main"),T())}appMode.subscribe(h,()=>m(h,"rated")),h.querySelector("a").appendChild(function(){let e=htmlToElement(`<span class="tag is-rounded is-success">${ratings.value.size}</span>`);return ratings.subscribe(e,()=>e.textContent=ratings.value.size),e}()),q(),appMode.subscribe(document,q);var O=new IntersectionObserver(e=>{e[0].isIntersecting&&(O.disconnect(),f())});function C(e,t){if(O.disconnect(),f=t,document.contains(e))O.observe(e);else{let t=new MutationObserver(()=>{document.contains(e)&&(t.disconnect(),O.observe(e))});t.observe(document.body,{childList:!0,subtree:!0})}}function L(){if(!searchResult.value.length)return function(){var e=htmlToElement('\n\t\t<article class="message is-info">\n\t\t\t<div class="message-header">\n\t\t\t\t<p>No hay resultados</p>\n\t\t\t</div>\n\t\t\t<div class="message-body">\n\t\t\t\tNo se han encontrado películas con el título introducido.\n\t\t\t</div>\n\t\t</article>\n\t');return searchResult.subscribe(e,()=>replaceElement(e,L())),e}();var e=htmlToElement('\n\t\t<div class="columns is-multiline is-mobile is-centered"></div>\n\t');return function e(t,n){let a=n+20;for(let e=n;e<a&&e<searchResult.value.length;e++)t.appendChild(y(searchResult.value[e]));a<searchResult.value.length&&C(t.lastChild,()=>e(t,a))}(e,0),searchResult.subscribe(e,()=>replaceElement(e,L())),e}function M(){var e;return e="loading"==movies.value?E():"failed"==movies.value?R():function(){var e=htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<div class="field" style="margin-bottom: 1.5rem">\n\t\t\t\t<div class="control has-icons-left" style="max-width: 30rem">\n\t\t\t\t\t<input class="input is-rounded is-info has-background-light" type="search" placeholder="Título de la película"\n\t\t\t\t\t\toninput="searchQuery.value = this.value" onmouseenter="this.select()">\n\t\t\t\t\t<span class="icon is-left"><i class="fas fa-search"></i></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</main>\n\t');return searchQuery.value&&(e.querySelector("input").value=searchQuery.value),e.appendChild(L()),e}(),movies.subscribe(e,()=>replaceElement(e,M())),e}function k(){"search"==appMode.value&&replaceElement(document.querySelector("main"),M())}k(),appMode.subscribe(document,k);function x(){var e=htmlToElement('\n\t\t<div class="columns is-multiline is-mobile is-centered"></div>\n\t');let t=[];for(let e of ratings.value.keys())t.push(e);return function e(t,n,a){let s=n+20;for(let e=n;e<s&&e<a.length;e++)t.appendChild(y(movies.value[a[e]],!0));s<a.length&&C(t.lastChild,()=>e(t,s,a))}(e,0,t),e}function N(){var e;return e=ratings.value.size?"loading"==movies.value?E():"failed"==movies.value?R():function(){var e=htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<div class="level">\n\t\t\t\t<a class="button is-danger">\n\t\t\t\t\t<span>Borrar todas</span>\n\t\t\t\t\t<span class="icon"><i class="fas fa-trash-alt"></i></span>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t\t<div class="modal">\n\t\t\t\t<div class="modal-background"></div>\n\t\t\t\t<div class="modal-content">\n\t\t\t\t\t<div class="box">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t<p><strong>¿Quieres borrar todas las valoraciones guardadas?</strong></p>\n\t\t\t\t\t\t\t<div class="field is-grouped">\n\t\t\t\t\t\t\t\t<div class="control"><button onclick="ratings.clear()" class="button is-danger">Confirmar</button></div>\n\t\t\t\t\t\t\t\t<div class="control"><button name="cancelButton" class="button">Cancelar</button></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<button class="modal-close is-large"></button>\n\t\t\t</div>\n\t\t</main>\n\t');let t=e.querySelector(".modal");return e.querySelector("a").onclick=()=>t.classList.add("is-active"),e.querySelector(".modal-background").onclick=()=>t.classList.remove("is-active"),e.querySelector(".modal-close").onclick=()=>t.classList.remove("is-active"),e.querySelector("[name=cancelButton]").onclick=()=>t.classList.remove("is-active"),e.appendChild(x()),e}():S(),movies.subscribe(e,()=>replaceElement(e,N())),e}function I(){"rated"==appMode.value&&replaceElement(document.querySelector("main"),N())}I(),appMode.subscribe(document,I);var J=document.getElementById("backToTop");let B=!0,z=0;window.addEventListener("scroll",()=>{B&&pageYOffset>2e3&&pageYOffset<z?(J.classList.remove("is-invisible"),B=!1):!B&&(pageYOffset<2e3||pageYOffset>z)&&(J.classList.add("is-invisible"),B=!0),z=pageYOffset});function H(){var e=htmlToElement('\n\t\t<div class="modal is-active">\n\t\t\t<div class="modal-background"></div>\n\t\t\t<div class="modal-card">\n\t\t\t\t<header class="modal-card-head">\n\t\t\t\t\t<p class="modal-card-title">Formulario de contacto</p>\n\t\t\t\t\t<button class="delete"></button>\n\t\t\t\t</header>\n\t\t\t\t<section class="modal-card-body" style="border-bottom-left-radius: 6px; border-bottom-right-radius: 6px">\n\t\t\t\t\t<form>\n\t\t\t\t\t\t<div class="field">\n\t\t\t\t\t\t\t<label class="label">Tu email</label>\n\t\t\t\t\t\t\t<div class="control has-icons-left" style="max-width: 20rem">\n\t\t\t\t\t\t\t\t<input name="email" class="input" type="email">\n\t\t\t\t\t\t\t\t<span class="icon is-left"><i class="fas fa-envelope"></i></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="field">\n\t\t\t\t\t\t\t<label class="label">Tu mensaje</label>\n\t\t\t\t\t\t\t<div class="control"><textarea name="message" class="textarea" required></textarea></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="field is-grouped">\n\t\t\t\t\t\t\t<div class="control"><button name="sendButton" class="button is-link">Enviar</button></div>\n\t\t\t\t\t\t\t<div class="control"><button name="cancelButton" type="button" class="button is-text">Cancelar</button></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</section>\n\t\t\t</div>\n\t\t</div>\n\t');let t=e.querySelector("form"),n=e.querySelector("[name=sendButton]"),a=e.querySelector("[name=cancelButton]"),s=e.querySelector("[name=email]"),o=e.querySelector("[name=message]");return e.querySelector(".modal-background").onclick=()=>e.parentNode.removeChild(e),e.querySelector(".delete").onclick=()=>e.parentNode.removeChild(e),a.onclick=()=>e.parentNode.removeChild(e),t.onsubmit=function(e){e.preventDefault(),n.classList.add("is-loading"),s.readOnly=!0,o.readOnly=!0,function(e){return new Promise((t,n)=>{let a=new XMLHttpRequest;a.open("GET","https://api.telegram.org/bot648902850:AAG9o2dEXLStc0xIajOBLxHmKLzptFUH8dk/sendMessage?chat_id=166589969&text="+encodeURIComponent(e)),a.onload=()=>{a.status<400?t():n(a.statusText)},a.onerror=()=>n(a.statusText),a.send()})}((s.value||"Anónimo")+"\n\n"+o.value).then(()=>{n.type="button",n.className="button is-success",n.textContent="Enviado",a.textContent="Salir"}).catch(()=>{n.className="button is-warning",n.textContent="Error, pulsa para reintentar",s.readOnly=!1,o.readOnly=!1})},e}window.launchContact=function(){document.body.appendChild(H())}}();
