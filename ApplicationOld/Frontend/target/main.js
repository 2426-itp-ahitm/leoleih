/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.trustedTypes,r=e?e.createPolicy("lit-html",{createHTML:t=>t}):void 0,n="$lit$",o=`lit$${Math.random().toFixed(9).slice(2)}$`,i="?"+o,s=`<${i}>`,c=document,a=()=>c.createComment(""),l=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,h="[ \t\n\f\r]",p=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,d=/-->/g,f=/>/g,v=RegExp(`>|${h}(?:([^\\s"'>=/]+)(${h}*=${h}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),y=/'/g,_=/"/g,b=/^(?:script|style|textarea|title)$/i,g=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),m=g(1),x=(g(2),g(3),Symbol.for("lit-noChange")),w=Symbol.for("lit-nothing"),$=new WeakMap,A=c.createTreeWalker(c,129);function S(t,e){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==r?r.createHTML(e):e}const T=(t,e)=>{const r=t.length-1,i=[];let c,a=2===e?"<svg>":3===e?"<math>":"",l=p;for(let e=0;e<r;e++){const r=t[e];let u,h,g=-1,m=0;for(;m<r.length&&(l.lastIndex=m,h=l.exec(r),null!==h);)m=l.lastIndex,l===p?"!--"===h[1]?l=d:void 0!==h[1]?l=f:void 0!==h[2]?(b.test(h[2])&&(c=RegExp("</"+h[2],"g")),l=v):void 0!==h[3]&&(l=v):l===v?">"===h[0]?(l=c??p,g=-1):void 0===h[1]?g=-2:(g=l.lastIndex-h[2].length,u=h[1],l=void 0===h[3]?v:'"'===h[3]?_:y):l===_||l===y?l=v:l===d||l===f?l=p:(l=v,c=void 0);const x=l===v&&t[e+1].startsWith("/>")?" ":"";a+=l===p?r+s:g>=0?(i.push(u),r.slice(0,g)+n+r.slice(g)+o+x):r+o+(-2===g?e:x)}return[S(t,a+(t[r]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class E{constructor({strings:t,_$litType$:r},s){let c;this.parts=[];let l=0,u=0;const h=t.length-1,p=this.parts,[d,f]=T(t,r);if(this.el=E.createElement(d,s),A.currentNode=this.el.content,2===r||3===r){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(c=A.nextNode())&&p.length<h;){if(1===c.nodeType){if(c.hasAttributes())for(const t of c.getAttributeNames())if(t.endsWith(n)){const e=f[u++],r=c.getAttribute(t).split(o),n=/([.?@])?(.*)/.exec(e);p.push({type:1,index:l,name:n[2],strings:r,ctor:"."===n[1]?k:"?"===n[1]?C:"@"===n[1]?j:P}),c.removeAttribute(t)}else t.startsWith(o)&&(p.push({type:6,index:l}),c.removeAttribute(t));if(b.test(c.tagName)){const t=c.textContent.split(o),r=t.length-1;if(r>0){c.textContent=e?e.emptyScript:"";for(let e=0;e<r;e++)c.append(t[e],a()),A.nextNode(),p.push({type:2,index:++l});c.append(t[r],a())}}}else if(8===c.nodeType)if(c.data===i)p.push({type:2,index:l});else{let t=-1;for(;-1!==(t=c.data.indexOf(o,t+1));)p.push({type:7,index:l}),t+=o.length-1}l++}}static createElement(t,e){const r=c.createElement("template");return r.innerHTML=t,r}}function O(t,e,r=t,n){if(e===x)return e;let o=void 0!==n?r._$Co?.[n]:r._$Cl;const i=l(e)?void 0:e._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),void 0===i?o=void 0:(o=new i(t),o._$AT(t,r,n)),void 0!==n?(r._$Co??=[])[n]=o:r._$Cl=o),void 0!==o&&(e=O(t,o._$AS(t,e.values),o,n)),e}class H{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,n=(t?.creationScope??c).importNode(e,!0);A.currentNode=n;let o=A.nextNode(),i=0,s=0,a=r[0];for(;void 0!==a;){if(i===a.index){let e;2===a.type?e=new M(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new z(o,this,t)),this._$AV.push(e),a=r[++s]}i!==a?.index&&(o=A.nextNode(),i++)}return A.currentNode=c,n}p(t){let e=0;for(const r of this._$AV)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,n){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),l(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==x&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>u(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==w&&l(this._$AH)?this._$AA.nextSibling.data=t:this.T(c.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:r}=t,n="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=E.createElement(S(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new H(n,this),r=t.u(this.options);t.p(e),this.T(r),this._$AH=t}}_$AC(t){let e=$.get(t.strings);return void 0===e&&$.set(t.strings,e=new E(t)),e}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,n=0;for(const o of t)n===e.length?e.push(r=new M(this.O(a()),this.O(a()),this,this.options)):r=e[n],r._$AI(o),n++;n<e.length&&(this._$AR(r&&r._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class P{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,n,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=w}_$AI(t,e=this,r,n){const o=this.strings;let i=!1;if(void 0===o)t=O(this,t,e,0),i=!l(t)||t!==this._$AH&&t!==x,i&&(this._$AH=t);else{const n=t;let s,c;for(t=o[0],s=0;s<o.length-1;s++)c=O(this,n[r+s],e,s),c===x&&(c=this._$AH[s]),i||=!l(c)||c!==this._$AH[s],c===w?t=w:t!==w&&(t+=(c??"")+o[s+1]),this._$AH[s]=c}i&&!n&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class k extends P{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}}class C extends P{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==w)}}class j extends P{constructor(t,e,r,n,o){super(t,e,r,n,o),this.type=5}_$AI(t,e=this){if((t=O(this,t,e,0)??w)===x)return;const r=this._$AH,n=t===w&&r!==w||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==w&&(r===w||n);n&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class z{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}}const N=t.litHtmlPolyfillSupport;N?.(E,M),(t.litHtmlVersions??=[]).push("3.2.1");const q=(t,e,r)=>{const n=r?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=r?.renderBefore??null;n._$litPart$=o=new M(e.insertBefore(a(),t),t,void 0,r??{})}return o._$AI(t),o},Z=m`
    <style>
        svg {
            user-select: none;
            width: 300px;
            margin-bottom: 2em;
        }

        div {
            display: grid;
            text-align: center;
            margin-top: 20vh;
            font-family: "Passion One", sans-serif;
            position: sticky;
        }

        a {
            margin-left: auto;
            margin-right: auto;
            width: 30vw;
            text-decoration: none;
            filter: drop-shadow(0 0 30px rgba(108, 182, 221, 0.68));
        }
    </style>
`,I=m`
    <style>
        input{
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 10px;
            padding-bottom: 10px;

            background-color: rgb(51, 77, 100);

            border-radius: 30px;
            border: 0px solid rgba(0, 0, 0, 0);

            width: 25%;
            transition: all 0.2s ease-out;
        }
        input:focus{
            width: 45%;
            border: 3px solid rgba(255, 255, 255, 0.545);
            box-shadow: 0px 10px 10px rgba(255, 255, 255, 0.053);
        }
    </style>
`;var L=function(t,e){return L=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},L(t,e)};function R(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}L(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function F(t){var e="function"==typeof Symbol&&Symbol.iterator,r=e&&t[e],n=0;if(r)return r.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function D(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,o,i=r.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)s.push(n.value)}catch(t){o={error:t}}finally{try{n&&!n.done&&(r=i.return)&&r.call(i)}finally{if(o)throw o.error}}return s}function U(t,e,r){if(r||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return t.concat(n||Array.prototype.slice.call(e))}function B(t){return"function"==typeof t}function V(t){var e=t((function(t){Error.call(t),t.stack=(new Error).stack}));return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}Object.create,Object.create,"function"==typeof SuppressedError&&SuppressedError;var W=V((function(t){return function(e){t(this),this.message=e?e.length+" errors occurred during unsubscription:\n"+e.map((function(t,e){return e+1+") "+t.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=e}}));function K(t,e){if(t){var r=t.indexOf(e);0<=r&&t.splice(r,1)}}var Y=function(){function t(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}var e;return t.prototype.unsubscribe=function(){var t,e,r,n,o;if(!this.closed){this.closed=!0;var i=this._parentage;if(i)if(this._parentage=null,Array.isArray(i))try{for(var s=F(i),c=s.next();!c.done;c=s.next())c.value.remove(this)}catch(e){t={error:e}}finally{try{c&&!c.done&&(e=s.return)&&e.call(s)}finally{if(t)throw t.error}}else i.remove(this);var a=this.initialTeardown;if(B(a))try{a()}catch(t){o=t instanceof W?t.errors:[t]}var l=this._finalizers;if(l){this._finalizers=null;try{for(var u=F(l),h=u.next();!h.done;h=u.next()){var p=h.value;try{J(p)}catch(t){o=null!=o?o:[],t instanceof W?o=U(U([],D(o)),D(t.errors)):o.push(t)}}}catch(t){r={error:t}}finally{try{h&&!h.done&&(n=u.return)&&n.call(u)}finally{if(r)throw r.error}}}if(o)throw new W(o)}},t.prototype.add=function(e){var r;if(e&&e!==this)if(this.closed)J(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=null!==(r=this._finalizers)&&void 0!==r?r:[]).push(e)}},t.prototype._hasParent=function(t){var e=this._parentage;return e===t||Array.isArray(e)&&e.includes(t)},t.prototype._addParent=function(t){var e=this._parentage;this._parentage=Array.isArray(e)?(e.push(t),e):e?[e,t]:t},t.prototype._removeParent=function(t){var e=this._parentage;e===t?this._parentage=null:Array.isArray(e)&&K(e,t)},t.prototype.remove=function(e){var r=this._finalizers;r&&K(r,e),e instanceof t&&e._removeParent(this)},t.EMPTY=((e=new t).closed=!0,e),t}(),X=Y.EMPTY;function G(t){return t instanceof Y||t&&"closed"in t&&B(t.remove)&&B(t.add)&&B(t.unsubscribe)}function J(t){B(t)?t():t.unsubscribe()}var Q=null,tt=null,et=void 0,rt=!1,nt=!1,ot={setTimeout:function(t,e){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];var o=ot.delegate;return(null==o?void 0:o.setTimeout)?o.setTimeout.apply(o,U([t,e],D(r))):setTimeout.apply(void 0,U([t,e],D(r)))},clearTimeout:function(t){var e=ot.delegate;return((null==e?void 0:e.clearTimeout)||clearTimeout)(t)},delegate:void 0};function it(){}var st=ct("C",void 0,void 0);function ct(t,e,r){return{kind:t,value:e,error:r}}var at=null;function lt(t){if(rt){var e=!at;if(e&&(at={errorThrown:!1,error:null}),t(),e){var r=at,n=r.errorThrown,o=r.error;if(at=null,n)throw o}}else t()}var ut=function(t){function e(e){var r=t.call(this)||this;return r.isStopped=!1,e?(r.destination=e,G(e)&&e.add(r)):r.destination=_t,r}return R(e,t),e.create=function(t,e,r){return new ft(t,e,r)},e.prototype.next=function(t){this.isStopped?yt(function(t){return ct("N",t,void 0)}(t),this):this._next(t)},e.prototype.error=function(t){this.isStopped?yt(ct("E",void 0,t),this):(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped?yt(st,this):(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){try{this.destination.error(t)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(Y),ht=Function.prototype.bind;function pt(t,e){return ht.call(t,e)}var dt=function(){function t(t){this.partialObserver=t}return t.prototype.next=function(t){var e=this.partialObserver;if(e.next)try{e.next(t)}catch(t){vt(t)}},t.prototype.error=function(t){var e=this.partialObserver;if(e.error)try{e.error(t)}catch(t){vt(t)}else vt(t)},t.prototype.complete=function(){var t=this.partialObserver;if(t.complete)try{t.complete()}catch(t){vt(t)}},t}(),ft=function(t){function e(e,r,n){var o,i,s=t.call(this)||this;return B(e)||!e?o={next:null!=e?e:void 0,error:null!=r?r:void 0,complete:null!=n?n:void 0}:s&&nt?((i=Object.create(e)).unsubscribe=function(){return s.unsubscribe()},o={next:e.next&&pt(e.next,i),error:e.error&&pt(e.error,i),complete:e.complete&&pt(e.complete,i)}):o=e,s.destination=new dt(o),s}return R(e,t),e}(ut);function vt(t){var e;rt?(e=t,rt&&at&&(at.errorThrown=!0,at.error=e)):function(t){ot.setTimeout((function(){if(!Q)throw t;Q(t)}))}(t)}function yt(t,e){var r=tt;r&&ot.setTimeout((function(){return r(t,e)}))}var _t={closed:!0,next:it,error:function(t){throw t},complete:it},bt="function"==typeof Symbol&&Symbol.observable||"@@observable";function gt(t){return t}var mt=function(){function t(t){t&&(this._subscribe=t)}return t.prototype.lift=function(e){var r=new t;return r.source=this,r.operator=e,r},t.prototype.subscribe=function(t,e,r){var n,o=this,i=(n=t)&&n instanceof ut||function(t){return t&&B(t.next)&&B(t.error)&&B(t.complete)}(n)&&G(n)?t:new ft(t,e,r);return lt((function(){var t=o,e=t.operator,r=t.source;i.add(e?e.call(i,r):r?o._subscribe(i):o._trySubscribe(i))})),i},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){t.error(e)}},t.prototype.forEach=function(t,e){var r=this;return new(e=xt(e))((function(e,n){var o=new ft({next:function(e){try{t(e)}catch(t){n(t),o.unsubscribe()}},error:n,complete:e});r.subscribe(o)}))},t.prototype._subscribe=function(t){var e;return null===(e=this.source)||void 0===e?void 0:e.subscribe(t)},t.prototype[bt]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return(0===(r=t).length?gt:1===r.length?r[0]:function(t){return r.reduce((function(t,e){return e(t)}),t)})(this);var r},t.prototype.toPromise=function(t){var e=this;return new(t=xt(t))((function(t,r){var n;e.subscribe((function(t){return n=t}),(function(t){return r(t)}),(function(){return t(n)}))}))},t.create=function(e){return new t(e)},t}();function xt(t){var e;return null!==(e=null!=t?t:et)&&void 0!==e?e:Promise}var wt=V((function(t){return function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}})),$t=function(t){function e(){var e=t.call(this)||this;return e.closed=!1,e.currentObservers=null,e.observers=[],e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return R(e,t),e.prototype.lift=function(t){var e=new At(this,this);return e.operator=t,e},e.prototype._throwIfClosed=function(){if(this.closed)throw new wt},e.prototype.next=function(t){var e=this;lt((function(){var r,n;if(e._throwIfClosed(),!e.isStopped){e.currentObservers||(e.currentObservers=Array.from(e.observers));try{for(var o=F(e.currentObservers),i=o.next();!i.done;i=o.next())i.value.next(t)}catch(t){r={error:t}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}}}))},e.prototype.error=function(t){var e=this;lt((function(){if(e._throwIfClosed(),!e.isStopped){e.hasError=e.isStopped=!0,e.thrownError=t;for(var r=e.observers;r.length;)r.shift().error(t)}}))},e.prototype.complete=function(){var t=this;lt((function(){if(t._throwIfClosed(),!t.isStopped){t.isStopped=!0;for(var e=t.observers;e.length;)e.shift().complete()}}))},e.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(e.prototype,"observed",{get:function(){var t;return(null===(t=this.observers)||void 0===t?void 0:t.length)>0},enumerable:!1,configurable:!0}),e.prototype._trySubscribe=function(e){return this._throwIfClosed(),t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)},e.prototype._innerSubscribe=function(t){var e=this,r=this,n=r.hasError,o=r.isStopped,i=r.observers;return n||o?X:(this.currentObservers=null,i.push(t),new Y((function(){e.currentObservers=null,K(i,t)})))},e.prototype._checkFinalizedStatuses=function(t){var e=this,r=e.hasError,n=e.thrownError,o=e.isStopped;r?t.error(n):o&&t.complete()},e.prototype.asObservable=function(){var t=new mt;return t.source=this,t},e.create=function(t,e){return new At(t,e)},e}(mt),At=function(t){function e(e,r){var n=t.call(this)||this;return n.destination=e,n.source=r,n}return R(e,t),e.prototype.next=function(t){var e,r;null===(r=null===(e=this.destination)||void 0===e?void 0:e.next)||void 0===r||r.call(e,t)},e.prototype.error=function(t){var e,r;null===(r=null===(e=this.destination)||void 0===e?void 0:e.error)||void 0===r||r.call(e,t)},e.prototype.complete=function(){var t,e;null===(e=null===(t=this.destination)||void 0===t?void 0:t.complete)||void 0===e||e.call(t)},e.prototype._subscribe=function(t){var e,r;return null!==(r=null===(e=this.source)||void 0===e?void 0:e.subscribe(t))&&void 0!==r?r:X},e}($t);const St=new(function(t){function e(e){var r=t.call(this)||this;return r._value=e,r}return R(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),e.prototype._subscribe=function(e){var r=t.prototype._subscribe.call(this,e);return!r.closed&&e.next(this._value),r},e.prototype.getValue=function(){var t=this,e=t.hasError,r=t.thrownError,n=t._value;if(e)throw r;return this._throwIfClosed(),n},e.prototype.next=function(e){t.prototype.next.call(this,this._value=e)},e}($t))({searchText:"",items:[],category:"all",categoryBig:!0});var Tt=Symbol.for("immer-nothing"),Et=Symbol.for("immer-draftable"),Ot=Symbol.for("immer-state");function Ht(t,...e){throw new Error(`[Immer] minified error nr: ${t}. Full error at: https://bit.ly/3cXEKWf`)}var Mt=Object.getPrototypeOf;function Pt(t){return!!t&&!!t[Ot]}function kt(t){return!!t&&(jt(t)||Array.isArray(t)||!!t[Et]||!!t.constructor?.[Et]||It(t)||Lt(t))}var Ct=Object.prototype.constructor.toString();function jt(t){if(!t||"object"!=typeof t)return!1;const e=Mt(t);if(null===e)return!0;const r=Object.hasOwnProperty.call(e,"constructor")&&e.constructor;return r===Object||"function"==typeof r&&Function.toString.call(r)===Ct}function zt(t,e){0===Nt(t)?Reflect.ownKeys(t).forEach((r=>{e(r,t[r],t)})):t.forEach(((r,n)=>e(n,r,t)))}function Nt(t){const e=t[Ot];return e?e.type_:Array.isArray(t)?1:It(t)?2:Lt(t)?3:0}function qt(t,e){return 2===Nt(t)?t.has(e):Object.prototype.hasOwnProperty.call(t,e)}function Zt(t,e,r){const n=Nt(t);2===n?t.set(e,r):3===n?t.add(r):t[e]=r}function It(t){return t instanceof Map}function Lt(t){return t instanceof Set}function Rt(t){return t.copy_||t.base_}function Ft(t,e){if(It(t))return new Map(t);if(Lt(t))return new Set(t);if(Array.isArray(t))return Array.prototype.slice.call(t);const r=jt(t);if(!0===e||"class_only"===e&&!r){const e=Object.getOwnPropertyDescriptors(t);delete e[Ot];let r=Reflect.ownKeys(e);for(let n=0;n<r.length;n++){const o=r[n],i=e[o];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(e[o]={configurable:!0,writable:!0,enumerable:i.enumerable,value:t[o]})}return Object.create(Mt(t),e)}{const e=Mt(t);if(null!==e&&r)return{...t};const n=Object.create(e);return Object.assign(n,t)}}function Dt(t,e=!1){return Bt(t)||Pt(t)||!kt(t)||(Nt(t)>1&&(t.set=t.add=t.clear=t.delete=Ut),Object.freeze(t),e&&Object.entries(t).forEach((([t,e])=>Dt(e,!0)))),t}function Ut(){Ht(2)}function Bt(t){return Object.isFrozen(t)}var Vt,Wt={};function Kt(t){const e=Wt[t];return e||Ht(0),e}function Yt(){return Vt}function Xt(t,e){e&&(Kt("Patches"),t.patches_=[],t.inversePatches_=[],t.patchListener_=e)}function Gt(t){Jt(t),t.drafts_.forEach(te),t.drafts_=null}function Jt(t){t===Vt&&(Vt=t.parent_)}function Qt(t){return Vt={drafts_:[],parent_:Vt,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function te(t){const e=t[Ot];0===e.type_||1===e.type_?e.revoke_():e.revoked_=!0}function ee(t,e){e.unfinalizedDrafts_=e.drafts_.length;const r=e.drafts_[0];return void 0!==t&&t!==r?(r[Ot].modified_&&(Gt(e),Ht(4)),kt(t)&&(t=re(e,t),e.parent_||oe(e,t)),e.patches_&&Kt("Patches").generateReplacementPatches_(r[Ot].base_,t,e.patches_,e.inversePatches_)):t=re(e,r,[]),Gt(e),e.patches_&&e.patchListener_(e.patches_,e.inversePatches_),t!==Tt?t:void 0}function re(t,e,r){if(Bt(e))return e;const n=e[Ot];if(!n)return zt(e,((o,i)=>ne(t,n,e,o,i,r))),e;if(n.scope_!==t)return e;if(!n.modified_)return oe(t,n.base_,!0),n.base_;if(!n.finalized_){n.finalized_=!0,n.scope_.unfinalizedDrafts_--;const e=n.copy_;let o=e,i=!1;3===n.type_&&(o=new Set(e),e.clear(),i=!0),zt(o,((o,s)=>ne(t,n,e,o,s,r,i))),oe(t,e,!1),r&&t.patches_&&Kt("Patches").generatePatches_(n,r,t.patches_,t.inversePatches_)}return n.copy_}function ne(t,e,r,n,o,i,s){if(Pt(o)){const s=re(t,o,i&&e&&3!==e.type_&&!qt(e.assigned_,n)?i.concat(n):void 0);if(Zt(r,n,s),!Pt(s))return;t.canAutoFreeze_=!1}else s&&r.add(o);if(kt(o)&&!Bt(o)){if(!t.immer_.autoFreeze_&&t.unfinalizedDrafts_<1)return;re(t,o),e&&e.scope_.parent_||"symbol"==typeof n||!Object.prototype.propertyIsEnumerable.call(r,n)||oe(t,o)}}function oe(t,e,r=!1){!t.parent_&&t.immer_.autoFreeze_&&t.canAutoFreeze_&&Dt(e,r)}var ie={get(t,e){if(e===Ot)return t;const r=Rt(t);if(!qt(r,e))return function(t,e,r){const n=ae(e,r);return n?"value"in n?n.value:n.get?.call(t.draft_):void 0}(t,r,e);const n=r[e];return t.finalized_||!kt(n)?n:n===ce(t.base_,e)?(ue(t),t.copy_[e]=he(n,t)):n},has:(t,e)=>e in Rt(t),ownKeys:t=>Reflect.ownKeys(Rt(t)),set(t,e,r){const n=ae(Rt(t),e);if(n?.set)return n.set.call(t.draft_,r),!0;if(!t.modified_){const n=ce(Rt(t),e),o=n?.[Ot];if(o&&o.base_===r)return t.copy_[e]=r,t.assigned_[e]=!1,!0;if(function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e}(r,n)&&(void 0!==r||qt(t.base_,e)))return!0;ue(t),le(t)}return t.copy_[e]===r&&(void 0!==r||e in t.copy_)||Number.isNaN(r)&&Number.isNaN(t.copy_[e])||(t.copy_[e]=r,t.assigned_[e]=!0),!0},deleteProperty:(t,e)=>(void 0!==ce(t.base_,e)||e in t.base_?(t.assigned_[e]=!1,ue(t),le(t)):delete t.assigned_[e],t.copy_&&delete t.copy_[e],!0),getOwnPropertyDescriptor(t,e){const r=Rt(t),n=Reflect.getOwnPropertyDescriptor(r,e);return n?{writable:!0,configurable:1!==t.type_||"length"!==e,enumerable:n.enumerable,value:r[e]}:n},defineProperty(){Ht(11)},getPrototypeOf:t=>Mt(t.base_),setPrototypeOf(){Ht(12)}},se={};function ce(t,e){const r=t[Ot];return(r?Rt(r):t)[e]}function ae(t,e){if(!(e in t))return;let r=Mt(t);for(;r;){const t=Object.getOwnPropertyDescriptor(r,e);if(t)return t;r=Mt(r)}}function le(t){t.modified_||(t.modified_=!0,t.parent_&&le(t.parent_))}function ue(t){t.copy_||(t.copy_=Ft(t.base_,t.scope_.immer_.useStrictShallowCopy_))}function he(t,e){const r=It(t)?Kt("MapSet").proxyMap_(t,e):Lt(t)?Kt("MapSet").proxySet_(t,e):function(t,e){const r=Array.isArray(t),n={type_:r?1:0,scope_:e?e.scope_:Yt(),modified_:!1,finalized_:!1,assigned_:{},parent_:e,base_:t,draft_:null,copy_:null,revoke_:null,isManual_:!1};let o=n,i=ie;r&&(o=[n],i=se);const{revoke:s,proxy:c}=Proxy.revocable(o,i);return n.draft_=c,n.revoke_=s,c}(t,e);return(e?e.scope_:Yt()).drafts_.push(r),r}function pe(t){if(!kt(t)||Bt(t))return t;const e=t[Ot];let r;if(e){if(!e.modified_)return e.base_;e.finalized_=!0,r=Ft(t,e.scope_.immer_.useStrictShallowCopy_)}else r=Ft(t,!0);return zt(r,((t,e)=>{Zt(r,t,pe(e))})),e&&(e.finalized_=!1),r}zt(ie,((t,e)=>{se[t]=function(){return arguments[0]=arguments[0][0],e.apply(this,arguments)}})),se.deleteProperty=function(t,e){return se.set.call(this,t,e,void 0)},se.set=function(t,e,r){return ie.set.call(this,t[0],e,r,t[0])};var de=new class{constructor(t){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(t,e,r)=>{if("function"==typeof t&&"function"!=typeof e){const r=e;e=t;const n=this;return function(t=r,...o){return n.produce(t,(t=>e.call(this,t,...o)))}}let n;if("function"!=typeof e&&Ht(6),void 0!==r&&"function"!=typeof r&&Ht(7),kt(t)){const o=Qt(this),i=he(t,void 0);let s=!0;try{n=e(i),s=!1}finally{s?Gt(o):Jt(o)}return Xt(o,r),ee(n,o)}if(!t||"object"!=typeof t){if(n=e(t),void 0===n&&(n=t),n===Tt&&(n=void 0),this.autoFreeze_&&Dt(n,!0),r){const e=[],o=[];Kt("Patches").generateReplacementPatches_(t,n,e,o),r(e,o)}return n}Ht(1)},this.produceWithPatches=(t,e)=>{if("function"==typeof t)return(e,...r)=>this.produceWithPatches(e,(e=>t(e,...r)));let r,n;const o=this.produce(t,e,((t,e)=>{r=t,n=e}));return[o,r,n]},"boolean"==typeof t?.autoFreeze&&this.setAutoFreeze(t.autoFreeze),"boolean"==typeof t?.useStrictShallowCopy&&this.setUseStrictShallowCopy(t.useStrictShallowCopy)}createDraft(t){var e;kt(t)||Ht(8),Pt(t)&&(Pt(e=t)||Ht(10),t=pe(e));const r=Qt(this),n=he(t,void 0);return n[Ot].isManual_=!0,Jt(r),n}finishDraft(t,e){const r=t&&t[Ot];r&&r.isManual_||Ht(9);const{scope_:n}=r;return Xt(n,e),ee(void 0,n)}setAutoFreeze(t){this.autoFreeze_=t}setUseStrictShallowCopy(t){this.useStrictShallowCopy_=t}applyPatches(t,e){let r;for(r=e.length-1;r>=0;r--){const n=e[r];if(0===n.path.length&&"replace"===n.op){t=n.value;break}}r>-1&&(e=e.slice(r+1));const n=Kt("Patches").applyPatches_;return Pt(t)?n(t,e):this.produce(t,(t=>n(t,e)))}},fe=de.produce;de.produceWithPatches.bind(de),de.setAutoFreeze.bind(de),de.setUseStrictShallowCopy.bind(de),de.applyPatches.bind(de),de.createDraft.bind(de),de.finishDraft.bind(de);class ve extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}content(){return m`
            ${I}
            <input @keyup=${()=>this.updateSearch()} type="text" id="input" placeholder="Search">
        `}async updateSearch(){const t=fe(St.getValue(),(t=>{t.category="all",t.searchText=this.shadowRoot.querySelector("input").value}));St.next(t)}connectedCallback(){q(this.content(),this.shadowRoot)}}customElements.define("search-bar",ve);const ye=m`
    <style>
        div {
            margin-top: 30px;
            justify-content: center;
            display: grid;
            grid-template-columns: repeat(4, 200px);
            gap: 30px;
            cursor: pointer;
            transition: all 0.3s ease-out;
        }
        @media screen and (max-width: 968px) {
            div{
                grid-template-columns: repeat(2, 200px);

            }
        }
        @media screen and (max-width: 568px) {
            div{
                grid-template-columns: repeat(1, 200px);
            }
        }
    </style>
`,_e=m`
    <style>
        div {
            margin-top: 30px;
            justify-content: center;
            display: grid;
            grid-template-columns: repeat(4, 80px);
            gap: 2px;
            cursor: pointer;
            transition: all 0.3s ease-out;
        }
        @media screen and (max-width: 968px) {
            div{
                grid-template-columns: repeat(2, 200px);

            }
        }
        @media screen and (max-width: 568px) {
            div{
                grid-template-columns: repeat(1, 200px);
            }
        }
    </style>
`,be=m`
    <style>
        div {
            width: 200px;
            height: 200px;
            background-color: rgb(26, 38, 49);
            border-radius: 10px;
            box-shadow: 0px 4px 40px 5px rgba(42, 57, 65, 0.405);
            display: grid;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease-out;
        }
        div:hover {
            box-shadow: 0px 20px 40px 7px rgba(42, 57, 65, 0.405);
            transform: scale(1.04);
        }
        svg{
            transition: all 0.3s ease-out;
            transform: scale(3);
        }
    </style>
`,ge=m`
    <style>
        div {
            width: 70px;
            height: 40px;
            background-color: rgb(26, 38, 49);
            border-radius: 10px;
            box-shadow: 0px 4px 40px 5px rgba(42, 57, 65, 0.405);
            display: grid;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease-out;
        }
        div:hover {
            box-shadow: 0px 20px 40px 7px rgba(42, 57, 65, 0.405);
            transform: scale(1.04);
        }
        svg{
            transition: all 0.3s ease-out;
            transform: scale(0.8);
        }
    </style>
`;function me(t){return function(e){if(function(t){return B(null==t?void 0:t.lift)}(e))return e.lift((function(e){try{return t(e,this)}catch(t){this.error(t)}}));throw new TypeError("Unable to lift unknown Observable type")}}function xe(t,e,r,n,o){return new $e(t,e,r,n,o)}var we,$e=function(t){function e(e,r,n,o,i,s){var c=t.call(this,e)||this;return c.onFinalize=i,c.shouldUnsubscribe=s,c._next=r?function(t){try{r(t)}catch(t){e.error(t)}}:t.prototype._next,c._error=o?function(t){try{o(t)}catch(t){e.error(t)}finally{this.unsubscribe()}}:t.prototype._error,c._complete=n?function(){try{n()}catch(t){e.error(t)}finally{this.unsubscribe()}}:t.prototype._complete,c}return R(e,t),e.prototype.unsubscribe=function(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var r=this.closed;t.prototype.unsubscribe.call(this),!r&&(null===(e=this.onFinalize)||void 0===e||e.call(this))}},e}(ut);function Ae(t,e){return me((function(r,n){var o=0;r.subscribe(xe(n,(function(r){n.next(t.call(e,r,o++))})))}))}function Se(t,e){return void 0===e&&(e=gt),t=null!=t?t:Te,me((function(r,n){var o,i=!0;r.subscribe(xe(n,(function(r){var s=e(r);!i&&t(o,s)||(i=!1,o=s,n.next(r))})))}))}function Te(t,e){return t===e}class Ee extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}get svg(){return this.getAttribute("svg")}get category(){return this.getAttribute("category")}getCurrentStyle(t){return t?be:ge}content(t){return m`
      ${this.getCurrentStyle(t)}
      <div @click=${()=>this.set_category()} >
        <svg
          class="categoryIcon"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="${this.svg}" />
        </svg>
      </div>
    `}set_category(){console.log("category type clicked and set to search:",this.category);const t=fe(St.getValue(),(t=>{t.category=this.category}));St.next(t)}connectedCallback(){St.pipe(Ae((t=>t.categoryBig)),Se()).subscribe((t=>{this.renderHTML(t)}))}renderHTML(t){q(this.content(t),this.shadowRoot)}}function Oe(t){switch(t){case"foto":return"M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z";case"video":return"M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h480q33 0 56.5 23.5T720-720v180l160-160v440L720-420v180q0 33-23.5 56.5T640-160H160Zm0-80h480v-480H160v480Zm0 0v-480 480Z";case"audio":return"M480-40v-80h280v-40H600v-320h160v-40q0-116-82-198t-198-82q-116 0-198 82t-82 198v40h160v320H200q-33 0-56.5-23.5T120-240v-280q0-74 28.5-139.5T226-774q49-49 114.5-77.5T480-880q74 0 139.5 28.5T734-774q49 49 77.5 114.5T840-520v400q0 33-23.5 56.5T760-40H480ZM200-240h80v-160h-80v160Zm480 0h80v-160h-80v160ZM200-400h80-80Zm480 0h80-80Z";case"room":return"M120-120v-80h80v-640h400v40h160v600h80v80H680v-600h-80v600H120Zm160-640v560-560Zm160 320q17 0 28.5-11.5T480-480q0-17-11.5-28.5T440-520q-17 0-28.5 11.5T400-480q0 17 11.5 28.5T440-440ZM280-200h240v-560H280v560Z"}}customElements.define("custom-category",Ee),function(t){t.foto="foto",t.video="video",t.audio="audio",t.room="room"}(we||(we={}));class He extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}getCurrentStyle(t){return""==t?ye:_e}content(t){return m`
        ${this.getCurrentStyle(t)}
            <div>
                <custom-category category="photo_camera" svg="${Oe(we.foto)}"></custom-category>
                <custom-category category="video_camera" svg="${Oe(we.video)}"></custom-category>
                <custom-category category="audio_device" svg="${Oe(we.audio)}"></custom-category>
                <custom-category category="room_reservation" svg="${Oe(we.room)}"></custom-category>
            </div>
        `}renderHTML(t){q(this.content(t),this.shadowRoot)}connectedCallback(){St.pipe(Ae((t=>t.searchText)),Se()).subscribe((t=>{this.renderHTML(t)}))}}customElements.define("category-container",He);const Me=m`

  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 167.34 99.21">
    <defs>
      <style>
        .cls-1 {
          fill: #6cb6dd;
          stroke: #6cb6dd;
          stroke-miterlimit: 10;
        }

        .cls-2 {
          fill: #fff;
        }
      </style>
    </defs>
    <rect class="cls-1" x=".5" y=".5" width="27.51" height="69.95" rx="13.76" ry="13.76"/>
    <rect class="cls-1" x="44.92" y="50.3" width="28.13" height="68.43" rx="13.96" ry="13.96" transform="translate(143.5 25.53) rotate(90)"/>
    <path class="cls-2" d="M53.06,54.91h-13.47c.02,1.55.33,2.92.95,4.1.61,1.18,1.43,2.07,2.45,2.67s2.14.9,3.37.9c.82,0,1.58-.1,2.26-.29.68-.19,1.34-.49,1.98-.9.64-.41,1.23-.84,1.76-1.31.54-.47,1.24-1.1,2.09-1.9.35-.3.86-.45,1.51-.45.71,0,1.28.19,1.71.58.44.38.66.92.66,1.62,0,.62-.24,1.34-.73,2.16-.49.82-1.22,1.62-2.21,2.37-.98.76-2.22,1.39-3.71,1.89s-3.2.75-5.13.75c-4.42,0-7.86-1.25-10.32-3.75-2.46-2.5-3.68-5.89-3.68-10.17,0-2.02.3-3.89.91-5.61.61-1.72,1.49-3.2,2.65-4.44,1.16-1.23,2.59-2.18,4.29-2.84,1.7-.66,3.58-.99,5.65-.99,2.69,0,5,.56,6.92,1.69,1.93,1.12,3.37,2.58,4.33,4.36.96,1.78,1.44,3.6,1.44,5.45,0,1.72-.5,2.83-1.49,3.34-.99.51-2.39.76-4.19.76ZM39.59,51.04h12.48c-.17-2.33-.8-4.08-1.9-5.23-1.1-1.16-2.55-1.74-4.35-1.74s-3.12.59-4.22,1.76c-1.1,1.17-1.77,2.91-2,5.21Z"/>
    <path class="cls-2" d="M90.31,53.24c0,2.03-.32,3.91-.96,5.62-.64,1.72-1.56,3.19-2.77,4.42-1.21,1.23-2.66,2.18-4.34,2.84s-3.57.99-5.67.99-3.96-.33-5.62-1-3.11-1.62-4.33-2.86c-1.22-1.24-2.14-2.71-2.78-4.4-.63-1.69-.95-3.56-.95-5.61s.32-3.96.96-5.67c.64-1.72,1.56-3.18,2.75-4.4,1.19-1.22,2.64-2.15,4.34-2.81,1.7-.66,3.57-.99,5.62-.99s3.98.33,5.67,1c1.7.67,3.15,1.62,4.36,2.85s2.13,2.7,2.76,4.4c.63,1.7.95,3.57.95,5.62ZM83.4,53.24c0-2.78-.62-4.95-1.85-6.5-1.24-1.55-2.9-2.32-4.98-2.32-1.35,0-2.53.35-3.56,1.04-1.03.69-1.82,1.71-2.37,3.06s-.83,2.92-.83,4.72.27,3.34.82,4.67c.55,1.33,1.33,2.35,2.35,3.06,1.02.71,2.22,1.06,3.59,1.06,2.08,0,3.75-.78,4.98-2.34,1.24-1.56,1.85-3.71,1.85-6.46Z"/>
    <path class="cls-2" d="M117.94,87.01h-13.34c.02,1.55.33,2.92.94,4.1.61,1.18,1.42,2.07,2.42,2.67s2.12.9,3.34.9c.82,0,1.56-.1,2.24-.29.67-.19,1.33-.49,1.96-.9.63-.41,1.22-.84,1.75-1.31.53-.47,1.22-1.1,2.07-1.9.35-.3.85-.45,1.5-.45.7,0,1.27.19,1.7.58.43.38.65.92.65,1.62,0,.62-.24,1.34-.72,2.16-.48.82-1.21,1.62-2.19,2.37-.97.76-2.2,1.39-3.67,1.89-1.47.5-3.17.75-5.08.75-4.38,0-7.79-1.25-10.22-3.75-2.43-2.5-3.65-5.89-3.65-10.17,0-2.02.3-3.89.9-5.61.6-1.72,1.47-3.2,2.62-4.44,1.15-1.23,2.57-2.18,4.25-2.84,1.68-.66,3.55-.99,5.6-.99,2.67,0,4.95.56,6.86,1.69,1.91,1.12,3.34,2.58,4.29,4.36.95,1.78,1.42,3.6,1.42,5.45,0,1.72-.49,2.83-1.47,3.34-.98.51-2.37.76-4.15.76ZM104.6,83.14h12.37c-.17-2.33-.8-4.08-1.89-5.23-1.09-1.16-2.53-1.74-4.31-1.74s-3.09.59-4.19,1.76c-1.09,1.17-1.75,2.91-1.99,5.21Z"/>
    <path class="cls-2" d="M132.76,68.3c-.95,0-1.76-.29-2.44-.87s-1.01-1.41-1.01-2.47c0-.97.34-1.76,1.04-2.39.69-.62,1.5-.94,2.41-.94s1.67.28,2.35.85c.68.57,1.02,1.39,1.02,2.47s-.33,1.87-1,2.46c-.67.59-1.46.89-2.37.89ZM136.13,75.34v19.71c0,1.37-.32,2.4-.97,3.1-.65.7-1.47,1.05-2.47,1.05s-1.81-.36-2.44-1.08c-.62-.72-.94-1.74-.94-3.07v-19.51c0-1.35.31-2.37.94-3.05s1.44-1.02,2.44-1.02,1.82.34,2.47,1.02c.65.68.97,1.63.97,2.85Z"/>
    <path class="cls-2" d="M149.85,65.47v10.12c.87-1,1.71-1.79,2.54-2.37.82-.58,1.74-1.02,2.74-1.31,1-.29,2.07-.44,3.22-.44,1.73,0,3.27.37,4.61,1.1,1.34.73,2.39,1.8,3.16,3.2.48.82.81,1.73.97,2.74.17,1.01.25,2.17.25,3.49v13.07c0,1.37-.31,2.4-.94,3.1-.62.7-1.45,1.05-2.49,1.05-2.25,0-3.37-1.38-3.37-4.15v-11.52c0-2.18-.32-3.86-.97-5.04-.65-1.17-1.88-1.76-3.7-1.76-1.22,0-2.31.35-3.29,1.04-.97.69-1.7,1.64-2.19,2.84-.37,1.02-.55,2.82-.55,5.42v9.02c0,1.35-.3,2.38-.91,3.09-.61.71-1.45,1.06-2.54,1.06-2.25,0-3.37-1.38-3.37-4.15v-29.58c0-1.38.3-2.42.89-3.11.59-.69,1.42-1.04,2.49-1.04s1.93.35,2.54,1.05c.61.7.91,1.73.91,3.1Z"/>
  </svg>

`;class Pe extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}content(){return m`
      ${Z}
      <div>
        <a href="#">${Me}</h1></a>

        <search-bar></search-bar>

        <category-container></category-container>
      </div>
    `}renderElement(){q(this.content(),this.shadowRoot)}connectedCallback(){this.renderElement()}}customElements.define("custom-header",Pe);const ke=m`
    <style>
        div{
            align-items: center;
            justify-content: center;
            display: grid;
            grid-template-columns: repeat(3, 200px);
            gap: 20px;
            margin-top: 3vw;
            transition: all 0.5s ease-out;
        }
    </style>
`;m`
    <style>
        dialog{
            position:fixed;
            width:80%;
            height:60%;
            top: 50%;
            bottom: 50%;
            border-radius: 30px;
            justify-content: center;
            align-items: center;

            border: 3px solid rgba(41, 47, 57, 0.70);
            background-color:rgba(41, 47, 57, 0.76);
            backdrop-filter: blur(8px);

            cursor: auto;
        }
    </style>
`;class Ce extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}async content(){return m``}closeDialog(){const t=this.shadowRoot.querySelector("dialog");console.log("dialog:",t),t.close(),setTimeout((()=>{this.setAttribute("open","false"),t.close()}),10)}async connectedCallback(){q(await this.content(),this.shadowRoot)}}customElements.define("custom-detailview",Ce);const je=m`
  <style>
    div {
      width: 200px;
      height: 150px;
      background-color: rgb(26, 38, 49);
      border-radius: 10px;
      border: 3px none rgba(42, 57, 65, 0.405);
      box-shadow: 0px 4px 40px 5px rgba(42, 57, 65, 0.405);
      display: grid;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease-out;
      cursor: pointer;
    }
    div:hover {
      box-shadow: 0 4px 40px 5px rgba(71, 96, 110, 0.6);
    }
    svg {
      margin-right: 10px;
    }
    #box {
      width: 10vw;
      height: 9vh;
      padding: 30px;
    }
  </style>
`;class ze extends HTMLElement{get item(){const t=St.getValue().items.filter((t=>t.dev_id===Number(this.getAttribute("dev_id"))))[0];let e=we.foto;switch(parseInt(t.dev_category)){case 1:e=we.foto;break;case 2:e=we.video;break;case 3:e=we.audio;break;case 4:e=we.room}return{dev_id:t.dev_id,dev_type:t.dev_type,dev_category:e,dev_serial_nr:t.dev_serial_nr,dev_asset_nr:t.dev_asset_nr,lent_from:t.lent_from,return_date:t.return_date,notes:t.notes,dev_set:t.dev_set}}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.addEventListener("click",(t=>{fe(St.getValue,(t=>{t.selectedId=this.item.dev_id}))}))}async content(){const t=this.item;let e;switch(t.dev_category){case we.foto:e=we.foto;break;case we.video:e=we.video;break;case we.audio:e=we.audio;break;case we.room:e=we.room}return m`
      ${je}
      <div class="item${t.dev_id}">
        <div id="box">
          <svg
            class="categoryIcon"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e8eaed"
          >
            <path d="${Oe(e)}" />
          </svg>
          <h4>${t.dev_type}</h4>
        </div>
      </div>
    `}stringToEnum(t,e){return Object.values(e).includes(t)?t:void 0}async connectedCallback(){q(await this.content(),this.shadowRoot)}}customElements.define("custom-item",ze);class Ne extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}content(t){const e=[];for(let n=0;n<t.length;n++)e.push(null==(r=t[n])?m``:m`
        <custom-item dev_id="${r.dev_id}"}"></custom-item>
    `);var r;return m`
      ${ke}
      <div style="opacity: ${0===e.length?0:1}">${e}</div>
      <custom-detailview></custom-detailview>
    `}connectedCallback(){St.pipe(Ae((t=>t.items)),Se()).subscribe((t=>{this.renderHTML(t)}))}async renderHTML(t){q(this.content(t),this.shadowRoot)}}let qe;customElements.define("custom-main",Ne),St.pipe(Ae((t=>({searchText:t.searchText,category:t.category}))),Se()).subscribe((async t=>{if(t.searchText!=qe){qe=t.searchText;const e=await async function(t,e){if(t||console.log("Search text not found."),t){const t=await fetch("http://localhost:8080/devices"),r=await t.json();let n=[];switch(console.log(r),e){case"photo_camera":n=r.filter((t=>1==t.dev_category));break;case"video_camera":n=r.filter((t=>2==t.dev_category));break;case"audio_device":n=r.filter((t=>3==t.dev_category));break;case"room_reservation":n=r.filter((t=>4==t.dev_category));break;default:n=r}console.log("items: ",n);const o=fe(St.getValue(),(t=>{t.categoryBig=0==n.length}));return St.next(o),n}{const t=fe(St.getValue(),(t=>{t.categoryBig=!0}));return St.next(t),[]}}(t.searchText,t.category),r=fe(St.getValue(),(t=>{t.items=e}));St.next(r)}}))})();
//# sourceMappingURL=main.js.map