/*!
 * Modernizr v2.5.3
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */
window.Modernizr=function(a,b,c){function D(a){j.cssText=a}function E(a,b){return D(n.join(a+";")+(b||""))}function F(a,b){return typeof a===b}function G(a,b){return!!~(""+a).indexOf(b)}function H(a,b){for(var d in a){if(j[a[d]]!==c){return b=="pfx"?a[d]:true}}return false}function I(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c){if(d===false)return a[e];if(F(f,"function")){return f.bind(d||b)}return f}}return false}function J(a,b,c){var d=a.charAt(0).toUpperCase()+a.substr(1),e=(a+" "+p.join(d+" ")+d).split(" ");if(F(b,"string")||F(b,"undefined")){return H(e,b)}else{e=(a+" "+q.join(d+" ")+d).split(" ");return I(e,b,c)}}function L(){e["input"]=function(c){for(var d=0,e=c.length;d<e;d++){u[c[d]]=!!(c[d]in k)}if(u.list){u.list=!!(b.createElement("datalist")&&a.HTMLDataListElement)}return u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));e["inputtypes"]=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++){k.setAttribute("type",f=a[d]);e=k.type!=="text";if(e){k.value=l;k.style.cssText="position:absolute;visibility:hidden;";if(/^range$/.test(f)&&k.style.WebkitAppearance!==c){g.appendChild(k);h=b.defaultView;e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0;g.removeChild(k)}else if(/^(search|tel)$/.test(f)){}else if(/^(url|email)$/.test(f)){e=k.checkValidity&&k.checkValidity()===false}else if(/^color$/.test(f)){g.appendChild(k);g.offsetWidth;e=k.value!=l;g.removeChild(k)}else{e=k.value!=l}}t[a[d]]=!!e}return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.5.3",e={},f=true,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k=b.createElement("div"),l=b.body,m=l?l:b.createElement("body");if(parseInt(d,10)){while(d--){j=b.createElement("div");j.id=e?e[d]:h+(d+1);k.appendChild(j)}}f=["&#173;","<style>",a,"</style>"].join("");k.id=h;m.innerHTML+=f;m.appendChild(k);if(!l){m.style.background="";g.appendChild(m)}i=c(k,a);!l?m.parentNode.removeChild(m):k.parentNode.removeChild(k);return!!i},z=function(b){var c=a.matchMedia||a.msMatchMedia;if(c){return c(b).matches}var d;y("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"});return d},A=function(){function d(d,e){e=e||b.createElement(a[d]||"div");d="on"+d;var f=d in e;if(!f){if(!e.setAttribute){e=b.createElement("div")}if(e.setAttribute&&e.removeAttribute){e.setAttribute(d,"");f=F(e[d],"function");if(!F(e[d],"undefined")){e[d]=c}e.removeAttribute(d)}}e=null;return f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}();var B={}.hasOwnProperty,C;if(!F(B,"undefined")&&!F(B.call,"undefined")){C=function(a,b){return B.call(a,b)}}else{C=function(a,b){return b in a&&F(a.constructor.prototype[b],"undefined")}}if(!Function.prototype.bind){Function.prototype.bind=function(b){var c=this;if(typeof c!="function"){throw new TypeError}var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a;var g=c.apply(f,d.concat(w.call(arguments)));if(Object(g)===g){return g}return f}else{return c.apply(b,d.concat(w.call(arguments)))}};return e}}var K=function(c,d){var f=c.join(""),g=d.length;y(f,function(c,d){var f=b.styleSheets[b.styleSheets.length-1],h=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"",i=c.childNodes,j={};while(g--){j[i[g].id]=i[g]}e["touch"]="ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch||(j["touch"]&&j["touch"].offsetTop)===9;e["csstransforms3d"]=(j["csstransforms3d"]&&j["csstransforms3d"].offsetLeft)===9&&j["csstransforms3d"].offsetHeight===3;e["generatedcontent"]=(j["generatedcontent"]&&j["generatedcontent"].offsetHeight)>=1;e["fontface"]=/src/i.test(h)&&h.indexOf(d.split(" ")[0])===0},g,d)}(['@font-face {font-family:"font";src:url("https://")}',["@media (",n.join("touch-enabled),("),h,")","{#touch{top:9px;position:absolute}}"].join(""),["@media (",n.join("transform-3d),("),h,")","{#csstransforms3d{left:9px;position:absolute;height:3px;}}"].join(""),['#generatedcontent:after{content:"',l,'";visibility:hidden}'].join("")],["fontface","touch","csstransforms3d","generatedcontent"]);s["flexbox"]=function(){return J("flexOrder")};s["flexbox-legacy"]=function(){return J("boxDirection")};s["canvas"]=function(){var a=b.createElement("canvas");return!!(a.getContext&&a.getContext("2d"))};s["canvastext"]=function(){return!!(e["canvas"]&&F(b.createElement("canvas").getContext("2d").fillText,"function"))};s["webgl"]=function(){try{var d=b.createElement("canvas"),e;e=!!(a.WebGLRenderingContext&&(d.getContext("experimental-webgl")||d.getContext("webgl")));d=c}catch(f){e=false}return e};s["touch"]=function(){return e["touch"]};s["geolocation"]=function(){return!!navigator.geolocation};s["postmessage"]=function(){return!!a.postMessage};s["websqldatabase"]=function(){return!!a.openDatabase};s["indexedDB"]=function(){return!!J("indexedDB",a)};s["hashchange"]=function(){return A("hashchange",a)&&(b.documentMode===c||b.documentMode>7)};s["history"]=function(){return!!(a.history&&history.pushState)};s["draganddrop"]=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a};s["websockets"]=function(){for(var b=-1,c=p.length;++b<c;){if(a[p[b]+"WebSocket"]){return true}}return"WebSocket"in a};s["rgba"]=function(){D("background-color:rgba(150,255,150,.5)");return G(j.backgroundColor,"rgba")};s["hsla"]=function(){D("background-color:hsla(120,40%,100%,.5)");return G(j.backgroundColor,"rgba")||G(j.backgroundColor,"hsla")};s["multiplebgs"]=function(){D("background:url(https://),url(https://),red url(https://)");return/(url\s*\(.*?){3}/.test(j.background)};s["backgroundsize"]=function(){return J("backgroundSize")};s["borderimage"]=function(){return J("borderImage")};s["borderradius"]=function(){return J("borderRadius")};s["boxshadow"]=function(){return J("boxShadow")};s["textshadow"]=function(){return b.createElement("div").style.textShadow===""};s["opacity"]=function(){E("opacity:.55");return/^0.55$/.test(j.opacity)};s["cssanimations"]=function(){return J("animationName")};s["csscolumns"]=function(){return J("columnCount")};s["cssgradients"]=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";D((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length));return G(j.backgroundImage,"gradient")};s["cssreflections"]=function(){return J("boxReflect")};s["csstransforms"]=function(){return!!J("transform")};s["csstransforms3d"]=function(){var a=!!J("perspective");if(a&&"webkitPerspective"in g.style){a=e["csstransforms3d"]}return a};s["csstransitions"]=function(){return J("transition")};s["fontface"]=function(){return e["fontface"]};s["generatedcontent"]=function(){return e["generatedcontent"]};s["video"]=function(){var a=b.createElement("video"),c=false;try{if(c=!!a.canPlayType){c=new Boolean(c);c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,"");c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,"");c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}}catch(d){}return c};s["audio"]=function(){var a=b.createElement("audio"),c=false;try{if(c=!!a.canPlayType){c=new Boolean(c);c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,"");c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,"");c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,"");c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}}catch(d){}return c};s["localstorage"]=function(){try{localStorage.setItem(h,h);localStorage.removeItem(h);return true}catch(a){return false}};s["sessionstorage"]=function(){try{sessionStorage.setItem(h,h);sessionStorage.removeItem(h);return true}catch(a){return false}};s["webworkers"]=function(){return!!a.Worker};s["applicationcache"]=function(){return!!a.applicationCache};s["svg"]=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect};s["inlinesvg"]=function(){var a=b.createElement("div");a.innerHTML="<svg/>";return(a.firstChild&&a.firstChild.namespaceURI)==r.svg};s["smil"]=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))};s["svgclippaths"]=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var M in s){if(C(s,M)){x=M.toLowerCase();e[x]=s[M]();v.push((e[x]?"":"no-")+x)}}e.input||L();e.addTest=function(a,b){if(typeof a=="object"){for(var d in a){if(C(a,d)){e.addTest(d,a[d])}}}else{a=a.toLowerCase();if(e[a]!==c){return e}b=typeof b=="function"?b():b;g.className+=" "+(b?"":"no-")+a;e[a]=b}return e};D("");i=k=null;(function(a,b){function g(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;c.innerHTML="x<style>"+b+"</style>";return d.insertBefore(c.lastChild,d.firstChild)}function h(){var a=k.elements;return typeof a=="string"?a.split(" "):a}function i(a){var b={},c=a.createElement,e=a.createDocumentFragment,f=e();a.createElement=function(a){var e=(b[a]||(b[a]=c(a))).cloneNode();return k.shivMethods&&e.canHaveChildren&&!d.test(a)?f.appendChild(e):e};a.createDocumentFragment=Function("h,f","return function(){"+"var n=f.cloneNode(),c=n.createElement;"+"h.shivMethods&&("+h().join().replace(/\w+/g,function(a){b[a]=c(a);f.createElement(a);return'c("'+a+'")'})+");return n}")(k,f)}function j(a){var b;if(a.documentShived){return a}if(k.shivCSS&&!e){b=!!g(a,"article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}"+"audio{display:none}"+"canvas,video{display:inline-block;*display:inline;*zoom:1}"+"[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}"+"mark{background:#FF0;color:#000}")}if(!f){b=!i(a)}if(b){a.documentShived=b}return a}var c=a.html5||{};var d=/^<|^(?:button|form|map|select|textarea)$/i;var e;var f;(function(){var a=b.createElement("a");a.innerHTML="<xyz></xyz>";e="hidden"in a;f=a.childNodes.length==1||function(){try{b.createElement("a")}catch(a){return true}var c=b.createDocumentFragment();return typeof c.cloneNode=="undefined"||typeof c.createDocumentFragment=="undefined"||typeof c.createElement=="undefined"}()})();var k={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:!(c.shivCSS===false),shivMethods:!(c.shivMethods===false),type:"default",shivDocument:j};a.html5=k;j(b)})(this,b);e._version=d;e._prefixes=n;e._domPrefixes=q;e._cssomPrefixes=p;e.mq=z;e.hasEvent=A;e.testProp=function(a){return H([a])};e.testAllProps=J;e.testStyles=y;e.prefixed=function(a,b,c){if(!b){return J(a,"pfx")}else{return J(a,b,c)}};g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):"");return e}(this,this.document)