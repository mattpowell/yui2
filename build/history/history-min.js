YAHOO.util.History=(function(){var c=null;var k=null;var f=false;var d=[];var b=[];function i(){var m,l;l=top.location.href;m=l.indexOf("#");return m>=0?l.substr(m+1):null;}function a(){var m,n,o=[],l=[];for(m in d){if(YAHOO.lang.hasOwnProperty(d,m)){n=d[m];o.push(m+"="+n.initialState);l.push(m+"="+n.currentState);}}k.value=o.join("&")+"|"+l.join("&");}function h(l){var q,r,m,o,p,t,s,n;if(!l){for(m in d){if(YAHOO.lang.hasOwnProperty(d,m)){o=d[m];o.currentState=o.initialState;o.onStateChange(unescape(o.currentState));}}return;}p=[];t=l.split("&");for(q=0,r=t.length;q<r;q++){s=t[q].split("=");if(s.length===2){m=s[0];n=s[1];p[m]=n;}}for(m in d){if(YAHOO.lang.hasOwnProperty(d,m)){o=d[m];n=p[m];if(!n||o.currentState!==n){o.currentState=n||o.initialState;o.onStateChange(unescape(o.currentState));}}}}function j(o){var l,n;l='<html><body><div id="state">'+o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")+"</div></body></html>";try{n=c.contentWindow.document;n.open();n.write(l);n.close();return true;}catch(m){return false;}}function g(){var o,l,n,m;if(!c.contentWindow||!c.contentWindow.document){setTimeout(g,10);return;}o=c.contentWindow.document;l=o.getElementById("state");n=l?l.innerText:null;m=i();setInterval(function(){var u,q,r,s,t,p;o=c.contentWindow.document;l=o.getElementById("state");u=l?l.innerText:null;t=i();if(u!==n){n=u;h(n);if(!n){q=[];for(r in d){if(YAHOO.lang.hasOwnProperty(d,r)){s=d[r];q.push(r+"="+s.initialState);}}t=q.join("&");}else{t=n;}top.location.hash=t;m=t;a();}else{if(t!==m){m=t;j(t);}}},50);f=true;YAHOO.util.History.onLoadEvent.fire();}function e(){var s,u,q,w,m,o,v,p,t,n,l,r;q=k.value.split("|");if(q.length>1){v=q[0].split("&");for(s=0,u=v.length;s<u;s++){w=v[s].split("=");if(w.length===2){m=w[0];p=w[1];o=d[m];if(o){o.initialState=p;}}}t=q[1].split("&");for(s=0,u=t.length;s<u;s++){w=t[s].split("=");if(w.length>=2){m=w[0];n=w[1];o=d[m];if(o){o.currentState=n;}}}}if(q.length>2){b=q[2].split(",");}if(YAHOO.env.ua.ie){if(typeof document.documentMode==="undefined"||document.documentMode<8){g();}else{YAHOO.util.Event.on(top,"hashchange",function(){var x=i();h(x);a();});f=true;YAHOO.util.History.onLoadEvent.fire();}}else{r=i();setInterval(function(){var z,x,y;x=i();if(x!==r){r=x;h(r);a();}},50);f=true;YAHOO.util.History.onLoadEvent.fire();}}return{onLoadEvent:new YAHOO.util.CustomEvent("onLoad"),onReady:function(l,m,n){if(f){setTimeout(function(){var o=window;if(n){if(n===true){o=m;}else{o=n;}}l.call(o,"onLoad",[],m);},0);}else{YAHOO.util.History.onLoadEvent.subscribe(l,m,n);}},register:function(n,l,p,q,r){var o,m;if(typeof n!=="string"||YAHOO.lang.trim(n)===""||typeof l!=="string"||typeof p!=="function"){throw new Error("Missing or invalid argument");}if(d[n]){return;}if(f){throw new Error("All modules must be registered before calling YAHOO.util.History.initialize");}n=escape(n);l=escape(l);o=null;if(r===true){o=q;}else{o=r;}m=function(s){return p.call(o,s,q);};d[n]={name:n,initialState:l,currentState:l,onStateChange:m};},initialize:function(l,m){if(f){return;}if(YAHOO.env.ua.opera&&typeof history.navigationMode!=="undefined"){history.navigationMode="compatible";}if(typeof l==="string"){l=document.getElementById(l);}if(!l||l.tagName.toUpperCase()!=="TEXTAREA"&&(l.tagName.toUpperCase()!=="INPUT"||l.type!=="hidden"&&l.type!=="text")){throw new Error("Missing or invalid argument");}k=l;if(YAHOO.env.ua.ie&&(typeof document.documentMode==="undefined"||document.documentMode<8)){if(typeof m==="string"){m=document.getElementById(m);}if(!m||m.tagName.toUpperCase()!=="IFRAME"){throw new Error("Missing or invalid argument");}c=m;}YAHOO.util.Event.onDOMReady(e);},navigate:function(m,n){var l;if(typeof m!=="string"||typeof n!=="string"){throw new Error("Missing or invalid argument");}l={};l[m]=n;return YAHOO.util.History.multiNavigate(l);},multiNavigate:function(m){var l,n,p,o,q;if(typeof m!=="object"){throw new Error("Missing or invalid argument");}if(!f){throw new Error("The Browser History Manager is not initialized");}for(n in m){if(!d[escape(n)]){throw new Error("The following module has not been registered: "+n);}}l=[];for(n in d){if(YAHOO.lang.hasOwnProperty(d,n)){p=d[n];if(YAHOO.lang.hasOwnProperty(m,n)){o=m[unescape(n)];}else{o=unescape(p.currentState);}n=escape(n);o=escape(o);l.push(n+"="+o);}}q=l.join("&");if(YAHOO.env.ua.ie&&(typeof document.documentMode==="undefined"||document.documentMode<8)){return j(q);}else{top.location.hash=q;return true;}},getCurrentState:function(l){var m;if(typeof l!=="string"){throw new Error("Missing or invalid argument");}if(!f){throw new Error("The Browser History Manager is not initialized");}m=d[l];if(!m){throw new Error("No such registered module: "+l);}return unescape(m.currentState);},getBookmarkedState:function(q){var p,m,l,s,n,r,o;if(typeof q!=="string"){throw new Error("Missing or invalid argument");}l=top.location.href.indexOf("#");if(l>=0){s=top.location.href.substr(l+1);n=s.split("&");for(p=0,m=n.length;p<m;p++){r=n[p].split("=");if(r.length===2){o=r[0];if(o===q){return unescape(r[1]);}}}}return null;},getQueryStringParameter:function(q,n){var o,m,l,s,r,p;n=n||top.location.href;l=n.indexOf("?");s=l>=0?n.substr(l+1):n;l=s.lastIndexOf("#");s=l>=0?s.substr(0,l):s;r=s.split("&");for(o=0,m=r.length;o<m;o++){p=r[o].split("=");if(p.length>=2){if(p[0]===q){return unescape(p[1]);}}}return null;}};})();YAHOO.register("history",YAHOO.util.History,{version:"@VERSION@",build:"@BUILD@"});