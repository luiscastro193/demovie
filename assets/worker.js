"use strict";const t=14971,e=.67,n=[.45,.55,.67,.75];function r(t){return new Promise((e,n)=>{let r=new XMLHttpRequest;r.open("GET",t),r.responseType="json",r.onload=()=>{r.status<400?e(r.response):n(r.statusText)},r.onerror=()=>n(r.statusText),r.send()})}let s=r("./ratings.json");function o(t){for(let e of t)e[0]=parseInt(e[0]);return new Map([...t])}function a(t){if(!t[1])return.1464;let e=t[0]/4.5+.5,n=t[1]+1,r=n-e;return e/n-Math.sqrt(e*r/(n*n*(n+1)))}function f(t,e){return e[1]-t[1]}async function i(t,e){let n=await s,r=Array.from({length:n.length},()=>[0,0]);for(let[s,a]of n.entries())for(let e of a){let n;if(n=t.get(e[0])){let t=r[s];t[0]+=4.5-Math.abs(e[1]-n),t[1]+=1}}r=r.map(a);let o=Array.from({length:14971},()=>[0,0]);for(let[s,a]of r.entries())if(a>e)for(let t of n[s]){let e=o[t[0]];e[0]+=a*(t[1]-.5),e[1]+=a}for(let s of t.keys())o[s][1]=0;return[...o.map(a).entries()].filter(t=>t[1]>.67).sort(f).slice(0,10).map(t=>t[0])}async function l(t,e){null==e&&(t=o(t),e=Math.min(t.size-1,n.length-1));let r=await i(t,n[e]);return e<=0||r.length>0?r:l(t,e-1)}onmessage=async function(t){try{postMessage({msgId:t.data.msgId,recommendations:await l(t.data.ratings)})}catch(e){postMessage({msgId:t.data.msgId,error:e})}};