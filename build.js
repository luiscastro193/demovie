!function(){"use strict";function t(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],a=!0,r=!1,s=void 0;try{for(var i,o=t[Symbol.iterator]();!(a=(i=o.next()).done)&&(n.push(i.value),!e||n.length!==e);a=!0);}catch(t){r=!0,s=t}finally{try{a||null==o.return||o.return()}finally{if(r)throw s}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}window.htmlToElement=function(t){var e=document.createElement("template");return e.innerHTML=t.trim(),e.content.firstChild},window.replaceElement=function(t,e){t.parentNode.replaceChild(e,t)},window.newEvent=function(){var t=document.createElement("e"),e=new Event("e");return t.addListener=function(e,n){t.addEventListener("e",function a(){document.contains(e)?n():t.removeEventListener("e",a)})},t.dispatch=function(){t.dispatchEvent(e)},t},window.newObservable=function(t){return{variable:t,event:newEvent(),get value(){return this.variable},set value(t){this.variable=t,this.event.dispatch()},subscribe:function(t,e){this.event.addListener(t,e)}}};var e,n,a=9392638;function r(){if("loading"!=movies.value&&"failed"!=movies.value){var e=!0,n=!1,a=void 0;try{for(var r,s=movies.value.entries()[Symbol.iterator]();!(e=(r=s.next()).done);e=!0){var i=t(r.value,2),o=i[0],c=i[1];movies.indexes.set(c.id,o)}}catch(t){n=!0,a=t}finally{try{e||null==s.return||s.return()}finally{if(n)throw a}}}}function s(){"failed"!=recommended.value&&"failed"!=movies.value&&recommended.value.length?"loading"!=recommended.value&&"loading"!=movies.value&&(cachedRecommended.value=recommended.value.map(function(t){return movies.value[movies.indexes.get(t._id)]})):cachedRecommended.value="invalid"}function i(){"loading"==recommended.value?cachedRecommended.progress.value="loading":"loading"!=cachedRecommended.progress.value||"loading"==movies.value&&"failed"!=recommended.value&&recommended.value.length||(cachedRecommended.progress.value="done")}function o(t){return t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function c(){"loading"!=movies.value&&"failed"!=movies.value&&function(t){var e=!0,n=!1,a=void 0;try{for(var r,s=t[Symbol.iterator]();!(e=(r=s.next()).done);e=!0){var i=r.value;i.searchString="".concat(o(i.titleES)," ").concat(i.title&&o(i.title)||"")}}catch(t){n=!0,a=t}finally{try{e||null==s.return||s.return()}finally{if(n)throw a}}}(movies.value)}function l(){searchResult.value=function(t,e){if(!t||"loading"==e||"failed"==e)return e;var n=o(t).split(" ");return e.filter(function(t){return n.every(function(e){return t.searchString.includes(e)})})}(searchQuery.value,movies.value)}function d(t,e){appMode.value==e?t.classList.add("is-active"):t.classList.remove("is-active")}function u(t){"loading"==cachedRecommended.progress.value?t.innerHTML='<i class="fas fa-spinner fa-spin"></i>':t.innerHTML='<i class="fas fa-star"></i>'}window.updateMovies=function(){movies.value="loading",movies.progress.value=null,new Promise(function(t,e){var n=new XMLHttpRequest;n.onprogress=function(t){return movies.progress.value=t.loaded/(t.total||a)},n.open("GET","assets/movies.json"),n.responseType="json",n.onload=function(){n.status<400?t(n.response):e(n.statusText)},n.onerror=function(){return e(n.statusText)},n.send()}).then(function(t){return movies.value=t}).catch(function(){return movies.value="failed"})},window.movies=newObservable(),movies.progress=newObservable(),updateMovies(),movies.indexes=new Map,r(),movies.subscribe(document,r),window.ratings=newObservable((e=localStorage.ratings,new Map(JSON.parse(e||"[]")))),ratings.set=function(t,e){ratings.value.set(t,e),ratings.event.dispatch()},ratings.get=function(t){return ratings.value.get(t)},ratings.delete=function(t){ratings.value.delete(t),ratings.event.dispatch()},ratings.clear=function(){ratings.value.clear(),ratings.event.dispatch()},ratings.toJson=function(){var e=[],n=!0,a=!1,r=void 0;try{for(var s,i=ratings.value[Symbol.iterator]();!(n=(s=i.next()).done);n=!0){var o=t(s.value,2),c=o[0],l=o[1];e.push([c,l])}}catch(t){a=!0,r=t}finally{try{n||null==i.return||i.return()}finally{if(a)throw r}}return JSON.stringify(e)},ratings.subscribe(document,function(){return localStorage.ratings=ratings.toJson()}),window.updateRecommended=function(){recommended.value="loading";var e=function(e){return new Promise(function(n,a){if(!e.size)return n([]);var r="?",s=!0,i=!1,o=void 0;try{for(var c,l=e[Symbol.iterator]();!(s=(c=l.next()).done);s=!0){var d=t(c.value,2),u=d[0],m=d[1];r+="".concat(u,"=").concat((m-.5)/4.5,"&")}}catch(t){i=!0,o=t}finally{try{s||null==l.return||l.return()}finally{if(i)throw o}}var v=new XMLHttpRequest;v.open("GET","https://demovie.herokuapp.com/query"+r),v.responseType="json",v.onload=function(){v.status<400?n(v.response.map(function(t){return t._id=String(t._id),t})):a(v.statusText)},v.onerror=function(){return a(v.statusText)},v.send()})}(ratings.value).then(function(t){e==n&&(recommended.value=t)}).catch(function(){e==n&&(recommended.value="failed")});n=e},window.recommended=newObservable(JSON.parse(localStorage.recommended||"[]")),recommended.subscribe(document,function(){return localStorage.recommended=JSON.stringify(recommended.value)}),"loading"!=recommended.value&&"failed"!=recommended.value||updateRecommended(),ratings.subscribe(document,updateRecommended),window.cachedRecommended=newObservable(JSON.parse(localStorage.cachedRecommended||'"invalid"')),cachedRecommended.subscribe(document,function(){return localStorage.cachedRecommended=JSON.stringify(cachedRecommended.value)}),s(),recommended.subscribe(document,s),movies.subscribe(document,s),cachedRecommended.progress=newObservable(JSON.parse(localStorage.cachedRecommendedProgress||'"done"')),cachedRecommended.progress.subscribe(document,function(){return localStorage.cachedRecommendedProgress=JSON.stringify(cachedRecommended.progress.value)}),i(),recommended.subscribe(document,i),movies.subscribe(document,i),c(),movies.subscribe(document,c),window.searchQuery=newObservable(),window.searchResult=newObservable(),l(),searchQuery.subscribe(document,l),movies.subscribe(document,l),window.appMode=newObservable("recommended"),cachedRecommended.progress.subscribe(document,function(){"loading"!=cachedRecommended.progress.value&&(document.querySelector(".tabs").scrollIntoView(),appMode.value="recommended")});var m=document.querySelector("[name=searchTab]");appMode.subscribe(m,function(){return d(m,"search")});var v,f=document.querySelector("[name=recommendedTab]");appMode.subscribe(f,function(){return d(f,"recommended")}),u(v=f.querySelector(".icon")),cachedRecommended.progress.subscribe(v,function(){return u(v)});var p,g=document.querySelector("[name=ratedTab]");function b(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=htmlToElement('\n\t\t<div class="column is-narrow">\n\t\t\t<article class="card" style="width: 250px">\n\t\t\t\t<header class="card-header">\n\t\t\t\t\t<p class="card-header-title"><a href="https://www.imdb.com/title/tt'.concat(t.imdbId,'/" target="_blank" rel="noopener" title="Ver en IMDb">').concat(t.titleES,'</a></p>\n\t\t\t\t</header>\n\t\t\t\t<div class="card-image">\n\t\t\t\t\t<figure class="image">\n\t\t\t\t\t\t<img src="https://m.media-amazon.com/images/M/').concat(t.poster,',0,182,268_AL_.jpg" alt="').concat(t.titleES,'">\n\t\t\t\t\t</figure>\n\t\t\t\t</div>\n\t\t\t\t<footer class="card-footer">\n\t\t\t\t\t<div name="rater"></div>\n\t\t\t\t</footer>\n\t\t\t</article>\n\t\t</div>\n\t')),a=raterJs({element:n.querySelector("[name=rater]"),step:.5,starSize:50,ratingText:"Pulsa en la valoración para confirmar",rateCallback:function(e,n){0==e&&(e=.5),a.setRating(e),ratings.set(t.id,e),n()}}),r=ratings.get(t.id);if(r&&a.setRating(r),e){var s=htmlToElement("\n\t\t\t<a onclick=\"ratings.delete('".concat(t.id,'\')" class="button is-danger is-rounded is-small" style="position: absolute; top: -12px; right: -12px">\n\t\t\t\t<span class="icon"><i class="fas fa-lg fa-times"></i></span>\n\t\t\t</a>\n\t\t'));s.addEventListener("click",function(){return n.parentNode.removeChild(n)});var i=n.querySelector("article");i.insertBefore(s,i.firstChild)}return n}function h(){return htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<progress class="progress is-primary is-large">Cargando...</progress>\n\t\t</main>\n\t')}function y(){return htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<article class="message is-info">\n\t\t\t\t<div class="message-header">\n\t\t\t\t\t<p>Faltan valoraciones</p>\n\t\t\t\t</div>\n\t\t\t\t<div class="message-body">\n\t\t\t\t\tValora películas para obtener recomendaciones personalizadas. <a onclick="appMode.value = \'search\'">Ir a búsqueda</a>\n\t\t\t\t</div>\n\t\t\t</article>\n\t\t</main>\n\t')}function w(){var t=h(),e=t.querySelector("progress");return movies.progress.subscribe(t,function(){movies.progress.value&&(e.value=movies.progress.value)}),t}function S(){return htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<article class="message is-warning">\n\t\t\t\t<div class="message-header">\n\t\t\t\t\t<p>Error</p>\n\t\t\t\t</div>\n\t\t\t\t<div class="message-body">\n\t\t\t\t\tHa habido un error al cargar las películas. <a onclick="updateMovies()">Reintentar</a>\n\t\t\t\t</div>\n\t\t\t</article>\n\t\t</main>\n\t')}function E(){var t;return t="loading"==recommended.value&&"invalid"==cachedRecommended.value?h():"failed"==recommended.value?htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<article class="message is-warning">\n\t\t\t\t<div class="message-header">\n\t\t\t\t\t<p>Error</p>\n\t\t\t\t</div>\n\t\t\t\t<div class="message-body">\n\t\t\t\t\tHa habido un error al cargar las recomendaciones. <a onclick="updateRecommended()">Reintentar</a>\n\t\t\t\t</div>\n\t\t\t</article>\n\t\t</main>\n\t'):recommended.value.length?"loading"==movies.value&&"invalid"==cachedRecommended.value?w():"failed"==movies.value?S():function(){var t=t=htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<div class="columns is-multiline is-mobile is-centered"></div>\n\t\t</main>\n\t'),e=t.querySelector("div"),n=!0,a=!1,r=void 0;try{for(var s,i=cachedRecommended.value[Symbol.iterator]();!(n=(s=i.next()).done);n=!0){var o=s.value;e.appendChild(b(o))}}catch(t){a=!0,r=t}finally{try{n||null==i.return||i.return()}finally{if(a)throw r}}return t}():y(),recommended.subscribe(t,function(){return replaceElement(t,E())}),movies.subscribe(t,function(){return replaceElement(t,E())}),t}function R(){"recommended"==appMode.value&&replaceElement(document.querySelector("main"),E())}appMode.subscribe(g,function(){return d(g,"rated")}),g.querySelector("a").appendChild(function(){var t=htmlToElement('<span class="tag is-rounded is-success">'.concat(ratings.value.size,"</span>"));return ratings.subscribe(t,function(){return t.textContent=ratings.value.size}),t}()),R(),appMode.subscribe(document,R);var T=new IntersectionObserver(function(t){t[0].isIntersecting&&(T.disconnect(),p())});function x(t,e){if(T.disconnect(),p=e,document.contains(t))T.observe(t);else{var n=new MutationObserver(function(){document.contains(t)&&(n.disconnect(),T.observe(t))});n.observe(document.body,{childList:!0,subtree:!0})}}var q=20;function O(){if(!searchResult.value.length)return function(){var t=htmlToElement('\n\t\t<article class="message is-info">\n\t\t\t<div class="message-header">\n\t\t\t\t<p>No hay resultados</p>\n\t\t\t</div>\n\t\t\t<div class="message-body">\n\t\t\t\tNo se han encontrado películas con el título introducido.\n\t\t\t</div>\n\t\t</article>\n\t');return searchResult.subscribe(t,function(){return replaceElement(t,O())}),t}();var t=htmlToElement('\n\t\t<div class="columns is-multiline is-mobile is-centered"></div>\n\t');return function t(e,n){for(var a=n+q,r=n;r<a&&r<searchResult.value.length;r++)e.appendChild(b(searchResult.value[r]));a<searchResult.value.length&&x(e.lastChild,function(){return t(e,a)})}(t,0),searchResult.subscribe(t,function(){return replaceElement(t,O())}),t}function C(){var t;return t="loading"==movies.value?w():"failed"==movies.value?S():function(){var t=htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<div class="field" style="margin-bottom: 1.5rem">\n\t\t\t\t<div class="control has-icons-left" style="max-width: 30rem">\n\t\t\t\t\t<input class="input is-rounded is-info has-background-light" type="search" placeholder="Título de la película"\n\t\t\t\t\t\toninput="searchQuery.value = this.value" onmouseenter="this.select()">\n\t\t\t\t\t<span class="icon is-left"><i class="fas fa-search"></i></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</main>\n\t');return searchQuery.value&&(t.querySelector("input").value=searchQuery.value),t.appendChild(O()),t}(),movies.subscribe(t,function(){return replaceElement(t,C())}),t}function M(){"search"==appMode.value&&replaceElement(document.querySelector("main"),C())}M(),appMode.subscribe(document,M);var L=20;function k(){var t=htmlToElement('\n\t\t<div class="columns is-multiline is-mobile is-centered"></div>\n\t'),e=[],n=!0,a=!1,r=void 0;try{for(var s,i=ratings.value.keys()[Symbol.iterator]();!(n=(s=i.next()).done);n=!0){var o=s.value;e.push(o)}}catch(t){a=!0,r=t}finally{try{n||null==i.return||i.return()}finally{if(a)throw r}}return function t(e,n,a){for(var r=n+L,s=n;s<r&&s<a.length;s++)e.appendChild(b(movies.value[movies.indexes.get(a[s])],!0));r<a.length&&x(e.lastChild,function(){return t(e,r,a)})}(t,0,e),t}function N(){var t;return t=ratings.value.size?"loading"==movies.value?w():"failed"==movies.value?S():function(){var t=htmlToElement('\n\t\t<main class="section" style="padding-top: 0">\n\t\t\t<div class="level">\n\t\t\t\t<a class="button is-danger">\n\t\t\t\t\t<span>Borrar todas</span>\n\t\t\t\t\t<span class="icon"><i class="fas fa-trash-alt"></i></span>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t\t<div class="modal">\n\t\t\t\t<div class="modal-background"></div>\n\t\t\t\t<div class="modal-content">\n\t\t\t\t\t<div class="box">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t<p><strong>¿Quieres borrar todas las valoraciones guardadas?</strong></p>\n\t\t\t\t\t\t\t<div class="field is-grouped">\n\t\t\t\t\t\t\t\t<div class="control"><button onclick="ratings.clear()" class="button is-danger">Confirmar</button></div>\n\t\t\t\t\t\t\t\t<div class="control"><button name="cancelButton" class="button">Cancelar</button></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<button class="modal-close is-large"></button>\n\t\t\t</div>\n\t\t</main>\n\t'),e=t.querySelector(".modal");return t.querySelector("a").onclick=function(){return e.classList.add("is-active")},t.querySelector(".modal-background").onclick=function(){return e.classList.remove("is-active")},t.querySelector(".modal-close").onclick=function(){return e.classList.remove("is-active")},t.querySelector("[name=cancelButton]").onclick=function(){return e.classList.remove("is-active")},t.appendChild(k()),t}():y(),movies.subscribe(t,function(){return replaceElement(t,N())}),t}function J(){"rated"==appMode.value&&replaceElement(document.querySelector("main"),N())}J(),appMode.subscribe(document,J);var B=document.getElementById("backToTop"),H=!0,I=0;window.addEventListener("scroll",function(){H&&pageYOffset>2e3&&pageYOffset<I?(B.classList.remove("is-invisible"),H=!1):!H&&(pageYOffset<2e3||pageYOffset>I)&&(B.classList.add("is-invisible"),H=!0),I=pageYOffset});var z="648902850:AAG9o2dEXLStc0xIajOBLxHmKLzptFUH8dk",Q="166589969";function _(){var t=htmlToElement('\n\t\t<div class="modal is-active">\n\t\t\t<div class="modal-background"></div>\n\t\t\t<div class="modal-card">\n\t\t\t\t<header class="modal-card-head">\n\t\t\t\t\t<p class="modal-card-title">Formulario de contacto</p>\n\t\t\t\t\t<button class="delete"></button>\n\t\t\t\t</header>\n\t\t\t\t<section class="modal-card-body" style="border-bottom-left-radius: 6px; border-bottom-right-radius: 6px">\n\t\t\t\t\t<form>\n\t\t\t\t\t\t<div class="field">\n\t\t\t\t\t\t\t<label class="label">Tu email</label>\n\t\t\t\t\t\t\t<div class="control has-icons-left" style="max-width: 20rem">\n\t\t\t\t\t\t\t\t<input name="email" class="input" type="email">\n\t\t\t\t\t\t\t\t<span class="icon is-left"><i class="fas fa-envelope"></i></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="field">\n\t\t\t\t\t\t\t<label class="label">Tu mensaje</label>\n\t\t\t\t\t\t\t<div class="control"><textarea name="message" class="textarea" required></textarea></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="field is-grouped">\n\t\t\t\t\t\t\t<div class="control"><button name="sendButton" class="button is-link">Enviar</button></div>\n\t\t\t\t\t\t\t<div class="control"><button name="cancelButton" type="button" class="button is-text">Cancelar</button></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</section>\n\t\t\t</div>\n\t\t</div>\n\t'),e=t.querySelector("form"),n=t.querySelector("[name=sendButton]"),a=t.querySelector("[name=cancelButton]"),r=t.querySelector("[name=email]"),s=t.querySelector("[name=message]");return t.querySelector(".modal-background").onclick=function(){return t.parentNode.removeChild(t)},t.querySelector(".delete").onclick=function(){return t.parentNode.removeChild(t)},a.onclick=function(){return t.parentNode.removeChild(t)},e.onsubmit=function(t){t.preventDefault(),n.classList.add("is-loading"),r.readOnly=!0,s.readOnly=!0,function(t){return new Promise(function(e,n){var a=new XMLHttpRequest;a.open("GET","https://api.telegram.org/bot".concat(z,"/sendMessage?chat_id=").concat(Q,"&text=").concat(encodeURIComponent(t))),a.onload=function(){a.status<400?e():n(a.statusText)},a.onerror=function(){return n(a.statusText)},a.send()})}((r.value||"Anónimo")+"\n\n"+s.value).then(function(){n.type="button",n.className="button is-success",n.textContent="Enviado",a.textContent="Salir"}).catch(function(){n.className="button is-warning",n.textContent="Error, pulsa para reintentar",r.readOnly=!1,s.readOnly=!1})},t}window.launchContact=function(){document.body.appendChild(_())}}();
