var e,t,n,s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i=e={};function r(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function a(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(e){t=r}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(e){n=o}}();var c,u=[],h=!1,l=-1;function d(){h&&c&&(h=!1,c.length?u=c.concat(u):l=-1,u.length&&f())}function f(){if(!h){var e=a(d);h=!0;for(var t=u.length;t;){for(c=u,u=[];++l<t;)c&&c[l].run();l=-1,t=u.length}c=null,h=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function g(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new p(e,t)),1!==u.length||h||a(f)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=g,i.addListener=g,i.once=g,i.off=g,i.removeListener=g,i.removeAllListeners=g,i.emit=g,i.prependListener=g,i.prependOnceListener=g,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const m=function(e){const t=[];let n=0;for(let s=0;s<e.length;s++){let i=e.charCodeAt(s);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&s+1<e.length&&56320==(64512&e.charCodeAt(s+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++s)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},y={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let t=0;t<e.length;t+=3){const i=e[t],r=t+1<e.length,o=r?e[t+1]:0,a=t+2<e.length,c=a?e[t+2]:0,u=i>>2,h=(3&i)<<4|o>>4;let l=(15&o)<<2|c>>6,d=63&c;a||(d=64,r||(l=64)),s.push(n[u],n[h],n[l],n[d])}return s.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(m(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let n=0,s=0;for(;n<e.length;){const i=e[n++];if(i<128)t[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=e[n++];t[s++]=String.fromCharCode((31&i)<<6|63&r)}else if(i>239&&i<365){const r=((7&i)<<18|(63&e[n++])<<12|(63&e[n++])<<6|63&e[n++])-65536;t[s++]=String.fromCharCode(55296+(r>>10)),t[s++]=String.fromCharCode(56320+(1023&r))}else{const r=e[n++],o=e[n++];t[s++]=String.fromCharCode((15&i)<<12|(63&r)<<6|63&o)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let t=0;t<e.length;){const i=n[e.charAt(t++)],r=t<e.length?n[e.charAt(t)]:0;++t;const o=t<e.length?n[e.charAt(t)]:64;++t;const a=t<e.length?n[e.charAt(t)]:64;if(++t,null==i||null==r||null==o||null==a)throw Error();const c=i<<2|r>>4;if(s.push(c),64!==o){const e=r<<4&240|o>>2;if(s.push(e),64!==a){const e=o<<6&192|a;s.push(e)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},v=function(e){return function(e){const t=m(e);return y.encodeByteArray(t,!0)}(e).replace(/\./g,"")},w=function(e){try{return y.decodeString(e,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function T(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function b(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function E(){const e=T();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function I(){try{return"object"==typeof indexedDB}catch(e){return!1}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _=()=>function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==s)return s;throw new Error("Unable to locate global object.")}().__FIREBASE_DEFAULTS__,S=()=>{try{return _()||(()=>{if(void 0===e||void 0===e.env)return})()||(()=>{if("undefined"==typeof document)return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(e){return}const t=e&&w(e[1]);return t&&JSON.parse(t)})()}catch(e){return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`)}},k=e=>{var t,n;return null===(n=null===(t=S())||void 0===t?void 0:t.emulatorHosts)||void 0===n?void 0:n[e]},C=e=>{const t=k(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const s=parseInt(t.substring(n+1),10);return"["===t[0]?[t.substring(1,n-1),s]:[t.substring(0,n),s]},A=e=>{var t;return null===(t=S())||void 0===t?void 0:t[`_${e}`]};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class N{wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n=t||"demo-project",s=e.iat||0,i=e.sub||e.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const r=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},e);return[v(JSON.stringify({alg:"none",type:"JWT"})),v(JSON.stringify(r)),""].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,R.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,O.prototype.create)}}class O{create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],r=i?function(e,t){return e.replace(L,((e,n)=>{const s=t[n];return null!=s?String(s):`<${n}?>`}))}(i,n):"Error",o=`${this.serviceName}: ${r} (${s}).`;return new R(s,o,n)}constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}}const L=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function M(e,t){if(e===t)return!0;const n=Object.keys(e),s=Object.keys(t);for(const i of n){if(!s.includes(i))return!1;const n=e[i],r=t[i];if(x(n)&&x(r)){if(!M(n,r))return!1}else if(n!==r)return!1}for(const e of s)if(!n.includes(e))return!1;return!0}function x(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function U(e){const t=[];for(const[n,s]of Object.entries(e))Array.isArray(s)?s.forEach((e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})):t.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return t.length?"&"+t.join("&"):""}function F(e){const t={};return e.replace(/^\?/,"").split("&").forEach((e=>{if(e){const[n,s]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(s)}})),t}function V(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(e,t){const n=new B(e,t);return n.subscribe.bind(n)}class B{next(e){this.forEachObserver((t=>{t.next(e)}))}error(e){this.forEachObserver((t=>{t.error(e)})),this.close(e)}complete(){this.forEachObserver((e=>{e.complete()})),this.close()}subscribe(e,t,n){let s;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");s=function(e,t){if("object"!=typeof e||null===e)return!1;for(const n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===s.next&&(s.next=q),void 0===s.error&&(s.error=q),void 0===s.complete&&(s.complete=q);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch(e){}})),this.observers.push(s),i}unsubscribeOne(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then((()=>{if(void 0!==this.observers&&void 0!==this.observers[e])try{t(this.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}}))}close(e){this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then((()=>{this.observers=void 0,this.onNoObservers=void 0})))}constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then((()=>{e(this)})).catch((e=>{this.error(e)}))}}function q(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function K(e){return e&&e._delegate?e._delegate:e}class H{setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class z{get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new N;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&e.resolve(n)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),s=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(s)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(s)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:"[DEFAULT]"})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}}clearInstance(e="[DEFAULT]"){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e="[DEFAULT]"){return this.instances.has(e)}getOptions(e="[DEFAULT]"){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){n===this.normalizeInstanceIdentifier(e)&&t.resolve(s)}return s}onInit(e,t){var n;const s=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(s))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:(s=e,"[DEFAULT]"===s?void 0:s),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}var s;return n||null}normalizeInstanceIdentifier(e="[DEFAULT]"){return this.component?this.component.multipleInstances?e:"[DEFAULT]":e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}}class ${addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new z(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}constructor(e){this.name=e,this.providers=new Map}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const G=[];var W,Q;(Q=W||(W={}))[Q.DEBUG=0]="DEBUG",Q[Q.VERBOSE=1]="VERBOSE",Q[Q.INFO=2]="INFO",Q[Q.WARN=3]="WARN",Q[Q.ERROR=4]="ERROR",Q[Q.SILENT=5]="SILENT";const X={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},J=W.INFO,Y={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},Z=(e,t,...n)=>{if(t<e.logLevel)return;const s=(new Date).toISOString(),i=Y[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${s}]  ${e.name}:`,...n)};class ee{get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?X[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}constructor(e){this.name=e,this._logLevel=J,this._logHandler=Z,this._userLogHandler=null,G.push(this)}}let te,ne;const se=new WeakMap,ie=new WeakMap,re=new WeakMap,oe=new WeakMap,ae=new WeakMap;let ce={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return ie.get(e);if("objectStoreNames"===t)return e.objectStoreNames||re.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return le(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function ue(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(ne||(ne=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(de(this),t),le(se.get(this))}:function(...t){return le(e.apply(de(this),t))}:function(t,...n){const s=e.call(de(this),t,...n);return re.set(s,t.sort?t.sort():[t]),le(s)}}function he(e){return"function"==typeof e?ue(e):(e instanceof IDBTransaction&&function(e){if(ie.has(e))return;const t=new Promise(((t,n)=>{const s=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",r),e.removeEventListener("abort",r)},i=()=>{t(),s()},r=()=>{n(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",i),e.addEventListener("error",r),e.addEventListener("abort",r)}));ie.set(e,t)}(e),t=e,(te||(te=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,ce):e);var t}function le(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const s=()=>{e.removeEventListener("success",i),e.removeEventListener("error",r)},i=()=>{t(le(e.result)),s()},r=()=>{n(e.error),s()};e.addEventListener("success",i),e.addEventListener("error",r)}));return t.then((t=>{t instanceof IDBCursor&&se.set(t,e)})).catch((()=>{})),ae.set(t,e),t}(e);if(oe.has(e))return oe.get(e);const t=he(e);return t!==e&&(oe.set(e,t),ae.set(t,e)),t}const de=e=>ae.get(e);function fe(e,t,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(e,t),a=le(o);return s&&o.addEventListener("upgradeneeded",(e=>{s(le(o.result),e.oldVersion,e.newVersion,le(o.transaction))})),n&&o.addEventListener("blocked",(()=>n())),a.then((e=>{r&&e.addEventListener("close",(()=>r())),i&&e.addEventListener("versionchange",(()=>i()))})).catch((()=>{})),a}const pe=["get","getKey","getAll","getAllKeys","count"],ge=["put","add","delete","clear"],me=new Map;function ye(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(me.get(t))return me.get(t);const n=t.replace(/FromIndex$/,""),s=t!==n,i=ge.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!i&&!pe.includes(n))return;const r=async function(e,...t){const r=this.transaction(e,i?"readwrite":"readonly");let o=r.store;return s&&(o=o.index(t.shift())),(await Promise.all([o[n](...t),i&&r.done]))[0]};return me.set(t,r),r}ce=(e=>({...e,get:(t,n,s)=>ye(t,n)||e.get(t,n,s),has:(t,n)=>!!ye(t,n)||e.has(t,n)}))(ce);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ve{getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}constructor(e){this.container=e}}const we=new ee("@firebase/app"),Te={"@firebase/app":"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},be=new Map,Ee=new Map;function Ie(e,t){try{e.container.addComponent(t)}catch(n){we.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function _e(e){const t=e.name;if(Ee.has(t))return we.debug(`There were multiple attempts to register component ${t}.`),!1;Ee.set(t,e);for(const t of be.values())Ie(t,e);return!0}function Se(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ke=new O("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ce{get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ke.create("app-deleted",{appName:this._name})}constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new H("app",(()=>this),"PUBLIC"))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(e,t={}){let n=e;if("object"!=typeof t){t={name:t}}const s=Object.assign({name:"[DEFAULT]",automaticDataCollectionEnabled:!1},t),i=s.name;if("string"!=typeof i||!i)throw ke.create("bad-app-name",{appName:String(i)});var r;if(n||(n=null===(r=S())||void 0===r?void 0:r.config),!n)throw ke.create("no-options");const o=be.get(i);if(o){if(M(n,o.options)&&M(s,o.config))return o;throw ke.create("duplicate-app",{appName:i})}const a=new $(i);for(const e of Ee.values())a.addComponent(e);const c=new Ce(n,s,a);return be.set(i,c),c}function Ne(e="[DEFAULT]"){const t=be.get(e);if(!t&&"[DEFAULT]"===e)return Ae();if(!t)throw ke.create("no-app",{appName:e});return t}function De(e,t,n){var s;let i=null!==(s=Te[e])&&void 0!==s?s:e;n&&(i+=`-${n}`);const r=i.match(/\s|\//),o=t.match(/\s|\//);if(r||o){const e=[`Unable to register library "${i}" with version "${t}":`];return r&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&e.push("and"),o&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void we.warn(e.join(" "))}_e(new H(`${i}-version`,(()=>({library:i,version:t})),"VERSION"))}let Re=null;function Oe(){return Re||(Re=fe("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore("firebase-heartbeat-store")}}).catch((e=>{throw ke.create("idb-open",{originalErrorMessage:e.message})}))),Re}async function Le(e,t){try{const n=(await Oe()).transaction("firebase-heartbeat-store","readwrite"),s=n.objectStore("firebase-heartbeat-store");return await s.put(t,Pe(e)),n.done}catch(e){if(e instanceof R)we.warn(e.message);else{const t=ke.create("idb-set",{originalErrorMessage:null==e?void 0:e.message});we.warn(t.message)}}}function Pe(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{async triggerHeartbeat(){const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=xe();if(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate!==t&&!this._heartbeatsCache.heartbeats.some((e=>e.date===t)))return this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6})),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";const e=xe(),{heartbeatsToSend:t,unsentEntries:n}=function(e,t=1024){const n=[];let s=e.slice();for(const i of e){const e=n.find((e=>e.agent===i.agent));if(e){if(e.dates.push(i.date),Fe(n)>t){e.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Fe(n)>t){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}(this._heartbeatsCache.heartbeats),s=v(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ue(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}}function xe(){return(new Date).toISOString().substring(0,10)}class Ue{async runIndexedDBEnvironmentCheck(){return!!I()&&new Promise(((e,t)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})).then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){return await async function(e){try{return(await Oe()).transaction("firebase-heartbeat-store").objectStore("firebase-heartbeat-store").get(Pe(e))}catch(e){if(e instanceof R)we.warn(e.message);else{const t=ke.create("idb-get",{originalErrorMessage:null==e?void 0:e.message});we.warn(t.message)}}}(this.app)||{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return Le(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const n=await this.read();return Le(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}}function Fe(e){return v(JSON.stringify({version:2,heartbeats:e})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ve;Ve="",_e(new H("platform-logger",(e=>new ve(e)),"PRIVATE")),_e(new H("heartbeat",(e=>new Me(e)),"PRIVATE")),De("@firebase/app","0.9.0",Ve),De("@firebase/app","0.9.0","esm2017"),De("fire-js","");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
De("firebase","9.15.0","app");function je(e,t){var n={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(s=Object.getOwnPropertySymbols(e);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(n[s[i]]=e[s[i]])}return n}Object.create;Object.create;function Be(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const qe=Be,Ke=new O("auth","Firebase",{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}),He=new ee("@firebase/auth");function ze(e,...t){He.logLevel<=W.ERROR&&He.error(`Auth (9.15.0): ${e}`,...t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(e,...t){throw Qe(e,...t)}function Ge(e,...t){return Qe(e,...t)}function We(e,t,n){const s=Object.assign(Object.assign({},qe()),{[t]:n});return new O("auth","Firebase",s).create(t,{appName:e.name})}function Qe(e,...t){if("string"!=typeof e){const n=t[0],s=[...t.slice(1)];return s[0]&&(s[0].appName=e.name),e._errorFactory.create(n,...s)}return Ke.create(e,...t)}function Xe(e,t,...n){if(!e)throw Qe(t,...n)}function Je(e){const t="INTERNAL ASSERTION FAILED: "+e;throw ze(t),new Error(t)}function Ye(e,t){e||Je(t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ze=new Map;function et(e){Ye(e instanceof Function,"Expected a class definition");let t=Ze.get(e);return t?(Ye(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Ze.set(e,t),t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function tt(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function nt(){return"http:"===st()||"https:"===st()}function st(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&(nt()||b()||"connection"in navigator))||navigator.onLine}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class rt{get(){return it()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}constructor(e,t){this.shortDelay=e,this.longDelay=t,Ye(t>e,"Short delay should be less than long delay!"),this.isMobile="undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(T())||"object"==typeof navigator&&"ReactNative"===navigator.product}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(e,t){Ye(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:void Je("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:void Je("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:void Je("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"},ut=new rt(3e4,6e4);
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function lt(e,t,n,s,i={}){return dt(e,i,(async()=>{let i={},r={};s&&("GET"===t?r=s:i={body:JSON.stringify(s)});const o=U(Object.assign({key:e.config.apiKey},r)).slice(1),a=await e._getAdditionalHeaders();return a["Content-Type"]="application/json",e.languageCode&&(a["X-Firebase-Locale"]=e.languageCode),at.fetch()(pt(e,e.config.apiHost,n,o),Object.assign({method:t,headers:a,referrerPolicy:"no-referrer"},i))}))}async function dt(e,t,n){e._canInitEmulator=!1;const s=Object.assign(Object.assign({},ct),t);try{const t=new gt(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const r=await i.json();if("needConfirmation"in r)throw mt(e,"account-exists-with-different-credential",r);if(i.ok&&!("errorMessage"in r))return r;{const t=i.ok?r.errorMessage:r.error.message,[n,o]=t.split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===n)throw mt(e,"credential-already-in-use",r);if("EMAIL_EXISTS"===n)throw mt(e,"email-already-in-use",r);if("USER_DISABLED"===n)throw mt(e,"user-disabled",r);const a=s[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o)throw We(e,a,o);$e(e,a)}}catch(t){if(t instanceof R)throw t;$e(e,"network-request-failed")}}async function ft(e,t,n,s,i={}){const r=await lt(e,t,n,s,i);return"mfaPendingCredential"in r&&$e(e,"multi-factor-auth-required",{_serverResponse:r}),r}function pt(e,t,n,s){const i=`${t}${n}?${s}`;return e.config.emulator?ot(e.config,i):`${e.config.apiScheme}://${i}`}class gt{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise(((e,t)=>{this.timer=setTimeout((()=>t(Ge(this.auth,"network-request-failed"))),ut.get())}))}}function mt(e,t,n){const s={appName:e.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const i=Ge(e,t,s);return i.customData._tokenResponse=n,i}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function yt(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(e){return 1e3*Number(e)}function wt(e){const[t,n,s]=e.split(".");if(void 0===t||void 0===n||void 0===s)return ze("JWT malformed, contained fewer than 3 sections"),null;try{const e=w(n);return e?JSON.parse(e):(ze("Failed to decode base64 JWT payload"),null)}catch(e){return ze("Caught error parsing JWT payload as JSON",null==e?void 0:e.toString()),null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Tt(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof R&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}class bt{_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}{this.errorBackoff=3e4;const e=(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout((async()=>{await this.iteration()}),t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){return void("auth/network-request-failed"===(null==e?void 0:e.code)&&this.schedule(!0))}this.schedule()}constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{_initializeTime(){this.lastSignInTime=yt(this.lastLoginAt),this.creationTime=yt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function It(e){var t;const n=e.auth,s=await e.getIdToken(),i=await Tt(e,async function(e,t){return lt(e,"POST","/v1/accounts:lookup",t)}(n,{idToken:s}));Xe(null==i?void 0:i.users.length,n,"internal-error");const r=i.users[0];e._notifyReloadListener(r);const o=(null===(t=r.providerUserInfo)||void 0===t?void 0:t.length)?r.providerUserInfo.map((e=>{var{providerId:t}=e,n=je(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})):[];const a=(c=e.providerData,u=o,[...c.filter((e=>!u.some((t=>t.providerId===e.providerId)))),...u]);var c,u;const h=e.isAnonymous,l=!(e.email&&r.passwordHash||(null==a?void 0:a.length)),d=!!h&&l,f={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new Et(r.createdAt,r.lastLoginAt),isAnonymous:d};Object.assign(e,f)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _t{get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Xe(e.idToken,"internal-error"),Xe(void 0!==e.idToken,"internal-error"),Xe(void 0!==e.refreshToken,"internal-error");const t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):function(e){const t=wt(e);return Xe(t,"internal-error"),Xe(void 0!==t.exp,"internal-error"),Xe(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=!1){return Xe(!this.accessToken||this.refreshToken,e,"user-token-expired"),t||!this.accessToken||this.isExpired?this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function(e,t){const n=await dt(e,{},(async()=>{const n=U({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:i}=e.config,r=pt(e,s,"/v1/token",`key=${i}`),o=await e._getAdditionalHeaders();return o["Content-Type"]="application/x-www-form-urlencoded",at.fetch()(r,{method:"POST",headers:o,body:n})}));return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*n}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,r=new _t;return n&&(Xe("string"==typeof n,"internal-error",{appName:e}),r.refreshToken=n),s&&(Xe("string"==typeof s,"internal-error",{appName:e}),r.accessToken=s),i&&(Xe("number"==typeof i,"internal-error",{appName:e}),r.expirationTime=i),r}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new _t,this.toJSON())}_performRefresh(){return Je("not implemented")}constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(e,t){Xe("string"==typeof e||void 0===e,"internal-error",{appName:t})}class kt{async getIdToken(e){const t=await Tt(this,this.stsTokenManager.getToken(this.auth,e));return Xe(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return async function(e,t=!1){const n=K(e),s=await n.getIdToken(t),i=wt(s);Xe(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const r="object"==typeof i.firebase?i.firebase:void 0,o=null==r?void 0:r.sign_in_provider;return{claims:i,token:s,authTime:yt(vt(i.auth_time)),issuedAtTime:yt(vt(i.iat)),expirationTime:yt(vt(i.exp)),signInProvider:o||null,signInSecondFactor:(null==r?void 0:r.sign_in_second_factor)||null}}(this,e)}reload(){return async function(e){const t=K(e);await It(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}(this)}_assign(e){this!==e&&(Xe(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map((e=>Object.assign({},e))),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new kt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){Xe(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await It(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Tt(this,async function(e,t){return lt(e,"POST","/v1/accounts:delete",t)}(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map((e=>Object.assign({},e))),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,s,i,r,o,a,c,u;const h=null!==(n=t.displayName)&&void 0!==n?n:void 0,l=null!==(s=t.email)&&void 0!==s?s:void 0,d=null!==(i=t.phoneNumber)&&void 0!==i?i:void 0,f=null!==(r=t.photoURL)&&void 0!==r?r:void 0,p=null!==(o=t.tenantId)&&void 0!==o?o:void 0,g=null!==(a=t._redirectEventId)&&void 0!==a?a:void 0,m=null!==(c=t.createdAt)&&void 0!==c?c:void 0,y=null!==(u=t.lastLoginAt)&&void 0!==u?u:void 0,{uid:v,emailVerified:w,isAnonymous:T,providerData:b,stsTokenManager:E}=t;Xe(v&&E,e,"internal-error");const I=_t.fromJSON(this.name,E);Xe("string"==typeof v,e,"internal-error"),St(h,e.name),St(l,e.name),Xe("boolean"==typeof w,e,"internal-error"),Xe("boolean"==typeof T,e,"internal-error"),St(d,e.name),St(f,e.name),St(p,e.name),St(g,e.name),St(m,e.name),St(y,e.name);const _=new kt({uid:v,auth:e,email:l,emailVerified:w,displayName:h,isAnonymous:T,photoURL:f,phoneNumber:d,tenantId:p,stsTokenManager:I,createdAt:m,lastLoginAt:y});return b&&Array.isArray(b)&&(_.providerData=b.map((e=>Object.assign({},e)))),g&&(_._redirectEventId=g),_}static async _fromIdTokenResponse(e,t,n=!1){const s=new _t;s.updateFromServerResponse(t);const i=new kt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await It(i),i}constructor(e){var{uid:t,auth:n,stsTokenManager:s}=e,i=je(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new bt(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Et(i.createdAt||void 0,i.lastLoginAt||void 0)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}constructor(){this.type="NONE",this.storage={}}}Ct.type="NONE";const At=Ct;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(e,t,n){return`firebase:${e}:${t}:${n}`}class Dt{setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?kt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();return await this.removeCurrentUser(),this.persistence=e,t?this.setCurrentUser(t):void 0}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Dt(et(At),e,n);const s=(await Promise.all(t.map((async e=>{if(await e._isAvailable())return e})))).filter((e=>e));let i=s[0]||et(At);const r=Nt(n,e.config.apiKey,e.name);let o=null;for(const n of t)try{const t=await n._get(r);if(t){const s=kt._fromJSON(e,t);n!==i&&(o=s),i=n;break}}catch(e){}const a=s.filter((e=>e._shouldAllowMigration));return i._shouldAllowMigration&&a.length?(i=a[0],o&&await i._set(r,o.toJSON()),await Promise.all(t.map((async e=>{if(e!==i)try{await e._remove(r)}catch(e){}}))),new Dt(i,e,n)):new Dt(i,e,n)}constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=Nt(this.userKey,s.apiKey,i),this.fullPersistenceKey=Nt("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Mt(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Ot(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Ut(t))return"Blackberry";if(Ft(t))return"Webos";if(Lt(t))return"Safari";if((t.includes("chrome/")||Pt(t))&&!t.includes("edge/"))return"Chrome";if(xt(t))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=e.match(t);if(2===(null==n?void 0:n.length))return n[1]}return"Other"}function Ot(e=T()){return/firefox\//i.test(e)}function Lt(e=T()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Pt(e=T()){return/crios\//i.test(e)}function Mt(e=T()){return/iemobile/i.test(e)}function xt(e=T()){return/android/i.test(e)}function Ut(e=T()){return/blackberry/i.test(e)}function Ft(e=T()){return/webos/i.test(e)}function Vt(e=T()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function jt(){return E()&&10===document.documentMode}function Bt(e=T()){return Vt(e)||xt(e)||Ft(e)||Ut(e)||/windows phone/i.test(e)||Mt(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function qt(e,t=[]){let n;switch(e){case"Browser":n=Rt(T());break;case"Worker":n=`${Rt(T())}-${e}`;break;default:n=e}return`${n}/JsCore/9.15.0/${t.length?t.join(","):"FirebaseCore-web"}`}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{pushCallback(e,t){const n=t=>new Promise(((n,s)=>{try{n(e(t))}catch(e){s(e)}}));n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){t.reverse();for(const e of t)try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==e?void 0:e.message})}}constructor(e){this.auth=e,this.queue=[]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=et(t)),this._initializationPromise=this.queue((async()=>{var n,s;if(!this._deleted&&(this.persistenceManager=await Dt.create(this,e),!this._deleted)){if(null===(n=this._popupRedirectResolver)||void 0===n?void 0:n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(s=this.currentUser)||void 0===s?void 0:s.uid)||null,this._deleted||(this._isInitialized=!0)}})),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();return this.currentUser||e?this.currentUser&&e&&this.currentUser.uid===e.uid?(this._currentUser._assign(e),void await this.currentUser.getIdToken()):void await this._updateCurrentUser(e,!0):void 0}async initializeCurrentUser(e){var t;const n=await this.assertedPersistence.getCurrentUser();let s=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,r=null==s?void 0:s._redirectEventId,o=await this.tryRedirectSignIn(e);n&&n!==r||!(null==o?void 0:o.user)||(s=o.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(e){s=n,this._popupRedirectResolver._overrideRedirectResult(this,(()=>Promise.reject(e)))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return Xe(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await It(e)}catch(e){if("auth/network-request-failed"!==(null==e?void 0:e.code))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const t=e?K(e):null;return t&&Xe(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Xe(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue((async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()}))}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue((async()=>{await this.assertedPersistence.setPersistence(et(e))}))}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new O("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return null===e?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&et(e)||this._popupRedirectResolver;Xe(t,this,"argument-error"),this.redirectPersistenceManager=await Dt.create(this,[et(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue((async()=>{})),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e?this._currentUser:(null===(n=this.redirectUser)||void 0===n?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue((async()=>this.directlySetCurrentUser(e)))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i="function"==typeof t?t:t.next.bind(t),r=this._isInitialized?Promise.resolve():this._initializationPromise;return Xe(r,this,"internal-error"),r.then((()=>i(this.currentUser))),"function"==typeof t?e.addObserver(t,n,s):e.addObserver(t)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Xe(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){e&&!this.frameworks.includes(e)&&(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=qt(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await(null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());return n&&(t["X-Firebase-Client"]=n),t}constructor(e,t,n){this.app=e,this.heartbeatServiceProvider=t,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new $t(this),this.idTokenSubscription=new $t(this),this.beforeStateQueue=new Kt(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ke,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion}}function zt(e){return K(e)}class $t{get next(){return Xe(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}constructor(e){this.auth=e,this.observer=null,this.addObserver=j((e=>this.observer=e))}}function Gt(e,t,n){const s=zt(e);Xe(s._canInitEmulator,s,"emulator-config-failed"),Xe(/^https?:\/\//.test(t),s,"invalid-emulator-scheme");const i=!!(null==n?void 0:n.disableWarnings),r=Wt(t),{host:o,port:a}=function(e){const t=Wt(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(s);if(i){const e=i[1];return{host:e,port:Qt(s.substr(e.length+1))}}{const[e,t]=s.split(":");return{host:e,port:Qt(t)}}}(t),c=null===a?"":`:${a}`;s.config.emulator={url:`${r}//${o}${c}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})}),i||function(){function e(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */()}function Wt(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function Qt(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}class Xt{toJSON(){return Je("not implemented")}_getIdTokenResponse(e){return Je("not implemented")}_linkToIdToken(e,t){return Je("not implemented")}_getReauthenticationResolver(e){return Je("not implemented")}constructor(e,t){this.providerId=e,this.signInMethod=t}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jt(e,t){return lt(e,"POST","/v1/accounts:update",t)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Yt extends Xt{static _fromEmailAndPassword(e,t){return new Yt(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Yt(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(e,t){return ft(e,"POST","/v1/accounts:signInWithPassword",ht(e,t))}(e,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
return async function(e,t){return ft(e,"POST","/v1/accounts:signInWithEmailLink",ht(e,t))}(e,{email:this._email,oobCode:this._password});default:$e(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return Jt(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return async function(e,t){return ft(e,"POST","/v1/accounts:signInWithEmailLink",ht(e,t))}(e,{idToken:t,email:this._email,oobCode:this._password});default:$e(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}constructor(e,t,n,s=null){super("password",n),this._email=e,this._password=t,this._tenantId=s}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zt(e,t){return ft(e,"POST","/v1/accounts:signInWithIdp",ht(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en extends Xt{static _fromParams(e){const t=new en(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):$e("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t="string"==typeof e?JSON.parse(e):e,{providerId:n,signInMethod:s}=t,i=je(t,["providerId","signInMethod"]);if(!n||!s)return null;const r=new en(n,s);return r.idToken=i.idToken||void 0,r.accessToken=i.accessToken||void 0,r.secret=i.secret,r.nonce=i.nonce,r.pendingToken=i.pendingToken||null,r}_getIdTokenResponse(e){return Zt(e,this.buildRequest())}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Zt(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Zt(e,t)}buildRequest(){const e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=U(t)}return e}constructor(){super(...arguments),this.pendingToken=null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn={USER_NOT_FOUND:"user-not-found"};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class nn extends Xt{static _fromVerification(e,t){return new nn({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new nn({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return async function(e,t){return ft(e,"POST","/v1/accounts:signInWithPhoneNumber",ht(e,t))}(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return async function(e,t){const n=await ft(e,"POST","/v1/accounts:signInWithPhoneNumber",ht(e,t));if(n.temporaryProof)throw mt(e,"account-exists-with-different-credential",n);return n}(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return async function(e,t){return ft(e,"POST","/v1/accounts:signInWithPhoneNumber",ht(e,Object.assign(Object.assign({},t),{operation:"REAUTH"})),tn)}(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));const{verificationId:t,verificationCode:n,phoneNumber:s,temporaryProof:i}=e;return n||t||s||i?new nn({verificationId:t,verificationCode:n,phoneNumber:s,temporaryProof:i}):null}constructor(e){super("phone","phone"),this.params=e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{static parseLink(e){const t=function(e){const t=F(V(e)).link,n=t?F(V(t)).deep_link_id:null,s=F(V(e)).deep_link_id;return(s?F(V(s)).link:null)||s||n||t||e}(e);try{return new sn(t)}catch(e){return null}}constructor(e){var t,n,s,i,r,o;const a=F(V(e)),c=null!==(t=a.apiKey)&&void 0!==t?t:null,u=null!==(n=a.oobCode)&&void 0!==n?n:null,h=function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(s=a.mode)&&void 0!==s?s:null);Xe(c&&u&&h,"argument-error"),this.apiKey=c,this.operation=h,this.code=u,this.continueUrl=null!==(i=a.continueUrl)&&void 0!==i?i:null,this.languageCode=null!==(r=a.languageCode)&&void 0!==r?r:null,this.tenantId=null!==(o=a.tenantId)&&void 0!==o?o:null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class rn{static credential(e,t){return Yt._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=sn.parseLink(t);return Xe(n,"argument-error"),Yt._fromEmailAndCode(e,n.code,n.tenantId)}constructor(){this.providerId=rn.PROVIDER_ID}}rn.PROVIDER_ID="password",rn.EMAIL_PASSWORD_SIGN_IN_METHOD="password",rn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class on{setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an extends on{addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}constructor(){super(...arguments),this.scopes=[]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class cn extends an{static credential(e){return en._fromParams({providerId:cn.PROVIDER_ID,signInMethod:cn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return cn.credentialFromTaggedObject(e)}static credentialFromError(e){return cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return cn.credential(e.oauthAccessToken)}catch(e){return null}}constructor(){super("facebook.com")}}cn.FACEBOOK_SIGN_IN_METHOD="facebook.com",cn.PROVIDER_ID="facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class un extends an{static credential(e,t){return en._fromParams({providerId:un.PROVIDER_ID,signInMethod:un.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return un.credentialFromTaggedObject(e)}static credentialFromError(e){return un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return un.credential(t,n)}catch(e){return null}}constructor(){super("google.com"),this.addScope("profile")}}un.GOOGLE_SIGN_IN_METHOD="google.com",un.PROVIDER_ID="google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class hn extends an{static credential(e){return en._fromParams({providerId:hn.PROVIDER_ID,signInMethod:hn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return hn.credentialFromTaggedObject(e)}static credentialFromError(e){return hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e))return null;if(!e.oauthAccessToken)return null;try{return hn.credential(e.oauthAccessToken)}catch(e){return null}}constructor(){super("github.com")}}hn.GITHUB_SIGN_IN_METHOD="github.com",hn.PROVIDER_ID="github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ln extends an{static credential(e,t){return en._fromParams({providerId:ln.PROVIDER_ID,signInMethod:ln.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ln.credentialFromTaggedObject(e)}static credentialFromError(e){return ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return ln.credential(t,n)}catch(e){return null}}constructor(){super("twitter.com")}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function dn(e,t){return ft(e,"POST","/v1/accounts:signUp",ht(e,t))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ln.TWITTER_SIGN_IN_METHOD="twitter.com",ln.PROVIDER_ID="twitter.com";class fn{static async _fromIdTokenResponse(e,t,n,s=!1){const i=await kt._fromIdTokenResponse(e,n,s),r=pn(n);return new fn({user:i,providerId:r,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=pn(n);return new fn({user:e,providerId:s,_tokenResponse:n,operationType:t})}constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}}function pn(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class gn extends R{static _fromErrorAndOperation(e,t,n,s){return new gn(e,t,n,s)}constructor(e,t,n,s){var i;super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,gn.prototype),this.customData={appName:e.name,tenantId:null!==(i=e.tenantId)&&void 0!==i?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}}function mn(e,t,n,s){return("reauthenticate"===t?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch((n=>{if("auth/multi-factor-auth-required"===n.code)throw gn._fromErrorAndOperation(e,n,t,s);throw n}))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yn(e,t,n=!1){const s=await Tt(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return fn._forOperation(e,"link",s)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function vn(e,t,n=!1){const{auth:s}=e,i="reauthenticate";try{const r=await Tt(e,mn(s,i,t,e),n);Xe(r.idToken,s,"internal-error");const o=wt(r.idToken);Xe(o,s,"internal-error");const{sub:a}=o;return Xe(e.uid===a,s,"user-mismatch"),fn._forOperation(e,i,r)}catch(e){throw"auth/user-not-found"===(null==e?void 0:e.code)&&$e(s,"user-mismatch"),e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wn(e,t,n=!1){const s="signIn",i=await mn(e,s,t),r=await fn._fromIdTokenResponse(e,s,i);return n||await e._updateCurrentUser(r.user),r}async function Tn(e,t){return wn(zt(e),t)}async function bn(e,t,n){const s=zt(e),i=await dn(s,{returnSecureToken:!0,email:t,password:n}),r=await fn._fromIdTokenResponse(s,"signIn",i);return await s._updateCurrentUser(r.user),r}new WeakMap;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class En{_isAvailable(){try{return this.storage?(this.storage.setItem("__sak","1"),this.storage.removeItem("__sak"),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}constructor(e,t){this.storageRetriever=e,this.type=t}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In extends En{forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key)return void this.forAllChangedKeys(((e,t,n)=>{this.notifyListeners(e,n)}));const n=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const s=this.storage.getItem(n);if(e.newValue!==s)null!==e.newValue?this.storage.setItem(n,e.newValue):this.storage.removeItem(n);else if(this.localCache[n]===e.newValue&&!t)return}const s=()=>{const e=this.storage.getItem(n);(t||this.localCache[n]!==e)&&this.notifyListeners(n,e)},i=this.storage.getItem(n);jt()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,10):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((()=>{this.forAllChangedKeys(((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)}))}),1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}constructor(){super((()=>window.localStorage),"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=function(){const e=T();return Lt(e)||Vt(e)}()&&function(){try{return!(!window||window===window.top)}catch(e){return!1}}(),this.fallbackToPolling=Bt(),this._shouldAllowMigration=!0}}In.type="LOCAL";const _n=In;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn extends En{_addListener(e,t){}_removeListener(e,t){}constructor(){super((()=>window.sessionStorage),"SESSION")}}Sn.type="SESSION";const kn=Sn;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Cn{static _getInstance(e){const t=this.receivers.find((t=>t.isListeningto(e)));if(t)return t;const n=new Cn(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,r=this.handlersMap[s];if(!(null==r?void 0:r.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const o=Array.from(r).map((async e=>e(t.origin,i))),a=await function(e){return Promise.all(e.map((async e=>{try{return{fulfilled:!0,value:await e}}catch(e){return{fulfilled:!1,reason:e}}})))}(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function An(e="",t=10){let n="";for(let e=0;e<t;e++)n+=Math.floor(10*Math.random());return e+n}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Cn.receivers=[];class Nn{removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,r;return new Promise(((o,a)=>{const c=An("",20);s.port1.start();const u=setTimeout((()=>{a(new Error("unsupported_event"))}),n);r={messageChannel:s,onMessage(e){const t=e;if(t.data.eventId===c)switch(t.data.status){case"ack":clearTimeout(u),i=setTimeout((()=>{a(new Error("timeout"))}),3e3);break;case"done":clearTimeout(i),o(t.data.response);break;default:clearTimeout(u),clearTimeout(i),a(new Error("invalid_response"))}}},this.handlers.add(r),s.port1.addEventListener("message",r.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])})).finally((()=>{r&&this.removeMessageHandler(r)}))}constructor(e){this.target=e,this.handlers=new Set}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dn(){return window}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Rn(){return void 0!==Dn().WorkerGlobalScope&&"function"==typeof Dn().importScripts}class On{toPromise(){return new Promise(((e,t)=>{this.request.addEventListener("success",(()=>{e(this.request.result)})),this.request.addEventListener("error",(()=>{t(this.request.error)}))}))}constructor(e){this.request=e}}function Ln(e,t){return e.transaction(["firebaseLocalStorage"],t?"readwrite":"readonly").objectStore("firebaseLocalStorage")}function Pn(){const e=indexedDB.open("firebaseLocalStorageDb",1);return new Promise(((t,n)=>{e.addEventListener("error",(()=>{n(e.error)})),e.addEventListener("upgradeneeded",(()=>{const t=e.result;try{t.createObjectStore("firebaseLocalStorage",{keyPath:"fbase_key"})}catch(e){n(e)}})),e.addEventListener("success",(async()=>{const n=e.result;n.objectStoreNames.contains("firebaseLocalStorage")?t(n):(n.close(),await function(){const e=indexedDB.deleteDatabase("firebaseLocalStorageDb");return new On(e).toPromise()}(),t(await Pn()))}))}))}async function Mn(e,t,n){const s=Ln(e,!0).put({fbase_key:t,value:n});return new On(s).toPromise()}function xn(e,t){const n=Ln(e,!0).delete(t);return new On(n).toPromise()}class Un{async _openDb(){return this.db||(this.db=await Pn()),this.db}async _withRetries(e){let t=0;for(;;)try{const t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Rn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Cn._getInstance(Rn()?self:null),this.receiver._subscribe("keyChanged",(async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)}))),this.receiver._subscribe("ping",(async(e,t)=>["keyChanged"]))}async initializeSender(){var e,t;if(this.activeServiceWorker=await async function(){if(!(null===navigator||void 0===navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}(),!this.activeServiceWorker)return;this.sender=new Nn(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&(null===(e=n[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=n[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null===navigator||void 0===navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Pn();return await Mn(e,"__sak","1"),await xn(e,"__sak"),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite((async()=>(await this._withRetries((n=>Mn(n,e,t))),this.localCache[e]=t,this.notifyServiceWorker(e))))}async _get(e){const t=await this._withRetries((t=>async function(e,t){const n=Ln(e,!1).get(t),s=await new On(n).toPromise();return void 0===s?null:s.value}(t,e)));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite((async()=>(await this._withRetries((t=>xn(t,e))),delete this.localCache[e],this.notifyServiceWorker(e))))}async _poll(){const e=await this._withRetries((e=>{const t=Ln(e,!1).getAll();return new On(t).toPromise()}));if(!e)return[];if(0!==this.pendingWrites)return[];const t=[],n=new Set;for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval((async()=>this._poll()),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then((()=>{}),(()=>{}))}}Un.type="LOCAL";const Fn=Un;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vn(e){return new Promise(((t,n)=>{const s=document.createElement("script");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var i,r;s.setAttribute("src",e),s.onload=t,s.onerror=e=>{const t=Ge("internal-error");t.customData=e,n(t)},s.type="text/javascript",s.charset="UTF-8",(null!==(r=null===(i=document.getElementsByTagName("head"))||void 0===i?void 0:i[0])&&void 0!==r?r:document).appendChild(s)}))}function jn(e){return`__${e}${Math.floor(1e6*Math.random())}`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
jn("rcb"),new rt(3e4,6e4);async function Bn(e,t,n){var s;const i=await n.verify();try{let r;if(Xe("string"==typeof i,e,"argument-error"),Xe("recaptcha"===n.type,e,"argument-error"),r="string"==typeof t?{phoneNumber:t}:t,"session"in r){const t=r.session;if("phoneNumber"in r){Xe("enroll"===t.type,e,"internal-error");const n=await
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){return lt(e,"POST","/v2/accounts/mfaEnrollment:start",ht(e,t))}(e,{idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,recaptchaToken:i}});return n.phoneSessionInfo.sessionInfo}{Xe("signin"===t.type,e,"internal-error");const n=(null===(s=r.multiFactorHint)||void 0===s?void 0:s.uid)||r.multiFactorUid;Xe(n,e,"missing-multi-factor-info");const o=await function(e,t){return lt(e,"POST","/v2/accounts/mfaSignIn:start",ht(e,t))}(e,{mfaPendingCredential:t.credential,mfaEnrollmentId:n,phoneSignInInfo:{recaptchaToken:i}});return o.phoneResponseInfo.sessionInfo}}{const{sessionInfo:t}=await async function(e,t){return lt(e,"POST","/v1/accounts:sendVerificationCode",ht(e,t))}(e,{phoneNumber:r.phoneNumber,recaptchaToken:i});return t}}finally{n._reset()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class qn{verifyPhoneNumber(e,t){return Bn(this.auth,e,K(t))}static credential(e,t){return nn._fromVerification(e,t)}static credentialFromResult(e){const t=e;return qn.credentialFromTaggedObject(t)}static credentialFromError(e){return qn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{phoneNumber:t,temporaryProof:n}=e;return t&&n?nn._fromTokenResponse(t,n):null}constructor(e){this.providerId=qn.PROVIDER_ID,this.auth=zt(e)}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Kn(e,t){return t?et(t):(Xe(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qn.PROVIDER_ID="phone",qn.PHONE_SIGN_IN_METHOD="phone";class Hn extends Xt{_getIdTokenResponse(e){return Zt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Zt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Zt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}constructor(e){super("custom","custom"),this.params=e}}function zn(e){return wn(e.auth,new Hn(e),e.bypassAuthState)}function $n(e){const{auth:t,user:n}=e;return Xe(n,t,"internal-error"),vn(n,new Hn(e),e.bypassAuthState)}async function Gn(e){const{auth:t,user:n}=e;return Xe(n,t,"internal-error"),yn(n,new Hn(e),e.bypassAuthState)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{execute(){return new Promise((async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}}))}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:r,type:o}=e;if(r)return void this.reject(r);const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return zn;case"linkViaPopup":case"linkViaRedirect":return Gn;case"reauthViaPopup":case"reauthViaRedirect":return $n;default:$e(this.auth,"internal-error")}}resolve(e){Ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qn=new rt(2e3,1e4);class Xn extends Wn{async executeNotNull(){const e=await this.execute();return Xe(e,this.auth,"internal-error"),e}async onExecution(){Ye(1===this.filter.length,"Popup operations only handle one event");const e=An();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch((e=>{this.reject(e)})),this.resolver._isIframeWebStorageSupported(this.auth,(e=>{e||this.reject(Ge(this.auth,"web-storage-unsupported"))})),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(Ge(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Xn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;(null===(n=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===n?void 0:n.closed)?this.pollId=window.setTimeout((()=>{this.pollId=null,this.reject(Ge(this.auth,"popup-closed-by-user"))}),2e3):this.pollId=window.setTimeout(e,Qn.get())};e()}constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,Xn.currentPopupAction&&Xn.currentPopupAction.cancel(),Xn.currentPopupAction=this}}Xn.currentPopupAction=null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Jn=new Map;class Yn extends Wn{async execute(){let e=Jn.get(this.auth._key());if(!e){try{const t=await async function(e,t){const n=ts(t),s=es(e);if(!await s._isAvailable())return!1;const i="true"===await s._get(n);return await s._remove(n),i}(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}Jn.set(this.auth._key(),e)}return this.bypassAuthState||Jn.set(this.auth._key(),(()=>Promise.resolve(null))),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"!==e.type){if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}else this.resolve(null)}async onExecution(){}cleanUp(){}constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}}function Zn(e,t){Jn.set(e._key(),t)}function es(e){return et(e._redirectPersistence)}function ts(e){return Nt("pendingRedirect",e.config.apiKey,e.name)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ns(e,t,n=!1){const s=zt(e),i=Kn(s,t),r=new Yn(s,i,n),o=await r.execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,t)),o}class ss{registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach((n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))})),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return rs(e);default:return!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!rs(e)){const s=(null===(n=e.error.code)||void 0===n?void 0:n.split("auth/")[1])||"internal-error";t.onError(Ge(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(is(e))}saveEventToCache(e){this.cachedEventUids.add(is(e)),this.lastProcessedEventTime=Date.now()}constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}}function is(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter((e=>e)).join("-")}function rs({type:e,error:t}){return"unknown"===e&&"auth/no-auth-event"===(null==t?void 0:t.code)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const os=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,as=/^https?/;async function cs(e){if(e.config.emulator)return;const{authorizedDomains:t}=await async function(e,t={}){return lt(e,"GET","/v1/projects",t)}(e);for(const e of t)try{if(us(e))return}catch(e){}$e(e,"unauthorized-domain")}function us(e){const t=tt(),{protocol:n,hostname:s}=new URL(t);if(e.startsWith("chrome-extension://")){const i=new URL(e);return""===i.hostname&&""===s?"chrome-extension:"===n&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===n&&i.hostname===s}if(!as.test(n))return!1;if(os.test(e))return s===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(s)}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hs=new rt(3e4,6e4);function ls(){const e=Dn().___jsl;if(null==e?void 0:e.H)for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}let ds=null;function fs(e){return ds=ds||function(e){return new Promise(((t,n)=>{var s,i,r;function o(){ls(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{ls(),n(Ge(e,"network-request-failed"))},timeout:hs.get()})}if(null===(i=null===(s=Dn().gapi)||void 0===s?void 0:s.iframes)||void 0===i?void 0:i.Iframe)t(gapi.iframes.getContext());else{if(!(null===(r=Dn().gapi)||void 0===r?void 0:r.load)){const t=jn("iframefcb");return Dn()[t]=()=>{gapi.load?o():n(Ge(e,"network-request-failed"))},Vn(`https://apis.google.com/js/api.js?onload=${t}`).catch((e=>n(e)))}o()}})).catch((e=>{throw ds=null,e}))}(e),ds}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ps=new rt(5e3,15e3),gs={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},ms=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ys(e){const t=e.config;Xe(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?ot(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,s={apiKey:t.apiKey,appName:e.name,v:"9.15.0"},i=ms.get(e.config.apiHost);i&&(s.eid=i);const r=e._getFrameworks();return r.length&&(s.fw=r.join(",")),`${n}?${U(s).slice(1)}`}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const vs={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class ws{close(){if(this.window)try{this.window.close()}catch(e){}}constructor(e){this.window=e,this.associatedEvent=null}}function Ts(e,t,n,s=500,i=600){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c=Object.assign(Object.assign({},vs),{width:s.toString(),height:i.toString(),top:r,left:o}),u=T().toLowerCase();n&&(a=Pt(u)?"_blank":n),Ot(u)&&(t=t||"http://localhost",c.scrollbars="yes");const h=Object.entries(c).reduce(((e,[t,n])=>`${e}${t}=${n},`),"");if(function(e=T()){var t;return Vt(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(u)&&"_self"!==a)return function(e,t){const n=document.createElement("a");n.href=e,n.target=t;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t||"",a),new ws(null);const l=window.open(t||"",a,h);Xe(l,e,"popup-blocked");try{l.focus()}catch(e){}return new ws(l)}function bs(e,t,n,s,i,r){Xe(e.config.authDomain,e,"auth-domain-config-required"),Xe(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:s,v:"9.15.0",eventId:i};if(t instanceof on){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",P(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[e,t]of Object.entries(r||{}))o[e]=t}if(t instanceof an){const e=t.getScopes().filter((e=>""!==e));e.length>0&&(o.scopes=e.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const e of Object.keys(a))void 0===a[e]&&delete a[e];return`${function({config:e}){return e.emulator?ot(e,"emulator/auth/handler"):`https://${e.authDomain}/__/auth/handler`}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e)}?${U(a).slice(1)}`}const Es=class{async _openPopup(e,t,n,s){var i;Ye(null===(i=this.eventManagers[e._key()])||void 0===i?void 0:i.manager,"_initialize() not called before _openPopup()");return Ts(e,bs(e,t,n,tt(),s),An())}async _openRedirect(e,t,n,s){var i;return await this._originValidation(e),i=bs(e,t,n,tt(),s),Dn().location.href=i,new Promise((()=>{}))}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(Ye(n,"If manager is not set, promise should be"),n)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch((()=>{delete this.eventManagers[t]})),n}async initAndGetManager(e){const t=await async function(e){const t=await fs(e),n=Dn().gapi;return Xe(n,e,"internal-error"),t.open({where:document.body,url:ys(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:gs,dontclear:!0},(t=>new Promise((async(n,s)=>{await t.restyle({setHideOnLeave:!1});const i=Ge(e,"network-request-failed"),r=Dn().setTimeout((()=>{s(i)}),ps.get());function o(){Dn().clearTimeout(r),n(t)}t.ping(o).then(o,(()=>{s(i)}))}))))}(e),n=new ss(e);return t.register("authEvent",(t=>{Xe(null==t?void 0:t.authEvent,e,"invalid-auth-event");return{status:n.onEvent(t.authEvent)?"ACK":"ERROR"}}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send("webStorageSupport",{type:"webStorageSupport"},(n=>{var s;const i=null===(s=null==n?void 0:n[0])||void 0===s?void 0:s.webStorageSupport;void 0!==i&&t(!!i),$e(e,"internal-error")}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=cs(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Bt()||Lt()||Vt()}constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=kn,this._completeRedirectFn=ns,this._overrideRedirectResult=Zn}};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Is{getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){if(this.assertAuthConfigured(),await this.auth._initializationPromise,!this.auth.currentUser)return null;return{accessToken:await this.auth.currentUser.getIdToken(e)}}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged((t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)}));this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Xe(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}constructor(e){this.auth=e,this.internalListeners=new Map}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _s=A("authIdTokenMaxAge")||300;let Ss=null;var ks;ks="Browser",_e(new H("auth",((e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),{apiKey:i,authDomain:r}=n.options;return((e,n)=>{Xe(i&&!i.includes(":"),"invalid-api-key",{appName:e.name}),Xe(!(null==r?void 0:r.includes(":")),"argument-error",{appName:e.name});const s={apiKey:i,authDomain:r,clientPlatform:ks,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:qt(ks)},o=new Ht(e,n,s);return function(e,t){const n=(null==t?void 0:t.persistence)||[],s=(Array.isArray(n)?n:[n]).map(et);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(s,null==t?void 0:t.popupRedirectResolver)}(o,t),o})(n,s)}),"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback(((e,t,n)=>{e.getProvider("auth-internal").initialize()}))),_e(new H("auth-internal",(e=>{const t=zt(e.getProvider("auth").getImmediate());return new Is(t)}),"PRIVATE").setInstantiationMode("EXPLICIT")),De("@firebase/auth","0.21.0",function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}(ks)),De("@firebase/auth","0.21.0","esm2017");var Cs,As="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==s?s:"undefined"!=typeof self?self:{},Ns={},Ds=Ds||{},Rs=As||self;function Os(){}function Ls(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function Ps(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}var Ms="closure_uid_"+(1e9*Math.random()>>>0),xs=0;function Us(e,t,n){return e.call.apply(e.bind,arguments)}function Fs(e,t,n){if(!e)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,s),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function Vs(e,t,n){return(Vs=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Us:Fs).apply(null,arguments)}function js(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function Bs(e,t){function n(){}n.prototype=t.prototype,e.X=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Wb=function(e,n,s){for(var i=Array(arguments.length-2),r=2;r<arguments.length;r++)i[r-2]=arguments[r];return t.prototype[n].apply(e,i)}}function qs(){this.s=this.s,this.o=this.o}qs.prototype.s=!1,qs.prototype.na=function(){var e;!this.s&&(this.s=!0,this.M(),0)&&(e=this,Object.prototype.hasOwnProperty.call(e,Ms)&&e[Ms]||(e[Ms]=++xs))},qs.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Ks=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if("string"==typeof e)return"string"!=typeof t||1!=t.length?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return-1};function Hs(e){const t=e.length;if(0<t){const n=Array(t);for(let s=0;s<t;s++)n[s]=e[s];return n}return[]}function zs(e,t){for(let t=1;t<arguments.length;t++){const n=arguments[t];if(Ls(n)){const t=e.length||0,s=n.length||0;e.length=t+s;for(let i=0;i<s;i++)e[t+i]=n[i]}else e.push(n)}}function $s(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}$s.prototype.h=function(){this.defaultPrevented=!0};var Gs=function(){if(!Rs.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{Rs.addEventListener("test",Os,t),Rs.removeEventListener("test",Os,t)}catch(e){}return e}();function Ws(e){return/^[\s\xa0]*$/.test(e)}var Qs=String.prototype.trim?function(e){return e.trim()}:function(e){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1]};function Xs(e,t){return e<t?-1:e>t?1:0}function Js(){var e=Rs.navigator;return e&&(e=e.userAgent)?e:""}function Ys(e){return-1!=Js().indexOf(e)}function Zs(e){return Zs[" "](e),e}Zs[" "]=Os;var ei,ti,ni=Ys("Opera"),si=Ys("Trident")||Ys("MSIE"),ii=Ys("Edge"),ri=ii||si,oi=Ys("Gecko")&&!(-1!=Js().toLowerCase().indexOf("webkit")&&!Ys("Edge"))&&!(Ys("Trident")||Ys("MSIE"))&&!Ys("Edge"),ai=-1!=Js().toLowerCase().indexOf("webkit")&&!Ys("Edge");function ci(){var e=Rs.document;return e?e.documentMode:void 0}e:{var ui="",hi=(ti=Js(),oi?/rv:([^\);]+)(\)|;)/.exec(ti):ii?/Edge\/([\d\.]+)/.exec(ti):si?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(ti):ai?/WebKit\/(\S+)/.exec(ti):ni?/(?:Version)[ \/]?(\S+)/.exec(ti):void 0);if(hi&&(ui=hi?hi[1]:""),si){var li=ci();if(null!=li&&li>parseFloat(ui)){ei=String(li);break e}}ei=ui}var di,fi={};function pi(){return function(e){var t=fi;return Object.prototype.hasOwnProperty.call(t,9)?t[9]:t[9]=e(9)}((function(){let e=0;const t=Qs(String(ei)).split("."),n=Qs("9").split("."),s=Math.max(t.length,n.length);for(let o=0;0==e&&o<s;o++){var i=t[o]||"",r=n[o]||"";do{if(i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],r=/(\d*)(\D*)(.*)/.exec(r)||["","","",""],0==i[0].length&&0==r[0].length)break;e=Xs(0==i[1].length?0:parseInt(i[1],10),0==r[1].length?0:parseInt(r[1],10))||Xs(0==i[2].length,0==r[2].length)||Xs(i[2],r[2]),i=i[3],r=r[3]}while(0==e)}return 0<=e}))}if(Rs.document&&si){var gi=ci();di=gi||(parseInt(ei,10)||void 0)}else di=void 0;var mi=di;function yi(e,t){if($s.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,s=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(oi){e:{try{Zs(t.nodeName);var i=!0;break e}catch(e){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,s?(this.clientX=void 0!==s.clientX?s.clientX:s.pageX,this.clientY=void 0!==s.clientY?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:vi[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&yi.X.h.call(this)}}Bs(yi,$s);var vi={2:"touch",3:"pen",4:"mouse"};yi.prototype.h=function(){yi.X.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var wi="closure_listenable_"+(1e6*Math.random()|0),Ti=0;function bi(e,t,n,s,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!s,this.ha=i,this.key=++Ti,this.ba=this.ea=!1}function Ei(e){e.ba=!0,e.listener=null,e.proxy=null,e.src=null,e.ha=null}function Ii(e,t,n){for(const s in e)t.call(n,e[s],s,e)}function _i(e){const t={};for(const n in e)t[n]=e[n];return t}const Si="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ki(e,t){let n,s;for(let t=1;t<arguments.length;t++){for(n in s=arguments[t],s)e[n]=s[n];for(let t=0;t<Si.length;t++)n=Si[t],Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n])}}function Ci(e){this.src=e,this.g={},this.h=0}function Ai(e,t){var n=t.type;if(n in e.g){var s,i=e.g[n],r=Ks(i,t);(s=0<=r)&&Array.prototype.splice.call(i,r,1),s&&(Ei(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function Ni(e,t,n,s){for(var i=0;i<e.length;++i){var r=e[i];if(!r.ba&&r.listener==t&&r.capture==!!n&&r.ha==s)return i}return-1}Ci.prototype.add=function(e,t,n,s,i){var r=e.toString();(e=this.g[r])||(e=this.g[r]=[],this.h++);var o=Ni(e,t,s,i);return-1<o?(t=e[o],n||(t.ea=!1)):((t=new bi(t,this.src,r,!!s,i)).ea=n,e.push(t)),t};var Di="closure_lm_"+(1e6*Math.random()|0),Ri={};function Oi(e,t,n,s,i){if(s&&s.once)return Pi(e,t,n,s,i);if(Array.isArray(t)){for(var r=0;r<t.length;r++)Oi(e,t[r],n,s,i);return null}return n=Bi(n),e&&e[wi]?e.N(t,n,Ps(s)?!!s.capture:!!s,i):Li(e,t,n,!1,s,i)}function Li(e,t,n,s,i,r){if(!t)throw Error("Invalid event type");var o=Ps(i)?!!i.capture:!!i,a=Vi(e);if(a||(e[Di]=a=new Ci(e)),(n=a.add(t,n,s,o,r)).proxy)return n;if(s=function(){function e(n){return t.call(e.src,e.listener,n)}const t=Fi;return e}(),n.proxy=s,s.src=e,s.listener=n,e.addEventListener)Gs||(i=o),void 0===i&&(i=!1),e.addEventListener(t.toString(),s,i);else if(e.attachEvent)e.attachEvent(Ui(t.toString()),s);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(s)}return n}function Pi(e,t,n,s,i){if(Array.isArray(t)){for(var r=0;r<t.length;r++)Pi(e,t[r],n,s,i);return null}return n=Bi(n),e&&e[wi]?e.O(t,n,Ps(s)?!!s.capture:!!s,i):Li(e,t,n,!0,s,i)}function Mi(e,t,n,s,i){if(Array.isArray(t))for(var r=0;r<t.length;r++)Mi(e,t[r],n,s,i);else s=Ps(s)?!!s.capture:!!s,n=Bi(n),e&&e[wi]?(e=e.i,(t=String(t).toString())in e.g&&(-1<(n=Ni(r=e.g[t],n,s,i))&&(Ei(r[n]),Array.prototype.splice.call(r,n,1),0==r.length&&(delete e.g[t],e.h--)))):e&&(e=Vi(e))&&(t=e.g[t.toString()],e=-1,t&&(e=Ni(t,n,s,i)),(n=-1<e?t[e]:null)&&xi(n))}function xi(e){if("number"!=typeof e&&e&&!e.ba){var t=e.src;if(t&&t[wi])Ai(t.i,e);else{var n=e.type,s=e.proxy;t.removeEventListener?t.removeEventListener(n,s,e.capture):t.detachEvent?t.detachEvent(Ui(n),s):t.addListener&&t.removeListener&&t.removeListener(s),(n=Vi(t))?(Ai(n,e),0==n.h&&(n.src=null,t[Di]=null)):Ei(e)}}}function Ui(e){return e in Ri?Ri[e]:Ri[e]="on"+e}function Fi(e,t){if(e.ba)e=!0;else{t=new yi(t,this);var n=e.listener,s=e.ha||e.src;e.ea&&xi(e),e=n.call(s,t)}return e}function Vi(e){return(e=e[Di])instanceof Ci?e:null}var ji="__closure_events_fn_"+(1e9*Math.random()>>>0);function Bi(e){return"function"==typeof e?e:(e[ji]||(e[ji]=function(t){return e.handleEvent(t)}),e[ji])}function qi(){qs.call(this),this.i=new Ci(this),this.P=this,this.I=null}function Ki(e,t){var n,s=e.I;if(s)for(n=[];s;s=s.I)n.push(s);if(e=e.P,s=t.type||t,"string"==typeof t)t=new $s(t,e);else if(t instanceof $s)t.target=t.target||e;else{var i=t;ki(t=new $s(s,e),i)}if(i=!0,n)for(var r=n.length-1;0<=r;r--){var o=t.g=n[r];i=Hi(o,s,!0,t)&&i}if(i=Hi(o=t.g=e,s,!0,t)&&i,i=Hi(o,s,!1,t)&&i,n)for(r=0;r<n.length;r++)i=Hi(o=t.g=n[r],s,!1,t)&&i}function Hi(e,t,n,s){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var i=!0,r=0;r<t.length;++r){var o=t[r];if(o&&!o.ba&&o.capture==n){var a=o.listener,c=o.ha||o.src;o.ea&&Ai(e.i,o),i=!1!==a.call(c,s)&&i}}return i&&!s.defaultPrevented}Bs(qi,qs),qi.prototype[wi]=!0,qi.prototype.removeEventListener=function(e,t,n,s){Mi(this,e,t,n,s)},qi.prototype.M=function(){if(qi.X.M.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],s=0;s<n.length;s++)Ei(n[s]);delete t.g[e],t.h--}}this.I=null},qi.prototype.N=function(e,t,n,s){return this.i.add(String(e),t,!1,n,s)},qi.prototype.O=function(e,t,n,s){return this.i.add(String(e),t,!0,n,s)};var zi=Rs.JSON.stringify;function $i(){var e=Zi;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var Gi,Wi=new class{get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}}((()=>new Qi),(e=>e.reset()));class Qi{set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}constructor(){this.next=this.g=this.h=null}}function Xi(e){Rs.setTimeout((()=>{throw e}),0)}function Ji(e,t){Gi||function(){var e=Rs.Promise.resolve(void 0);Gi=function(){e.then(er)}}(),Yi||(Gi(),Yi=!0),Zi.add(e,t)}var Yi=!1,Zi=new class{add(e,t){const n=Wi.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}constructor(){this.h=this.g=null}};function er(){for(var e;e=$i();){try{e.h.call(e.g)}catch(e){Xi(e)}var t=Wi;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}Yi=!1}function tr(e,t){qi.call(this),this.h=e||1,this.g=t||Rs,this.j=Vs(this.lb,this),this.l=Date.now()}function nr(e){e.ca=!1,e.R&&(e.g.clearTimeout(e.R),e.R=null)}function sr(e,t,n){if("function"==typeof e)n&&(e=Vs(e,n));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=Vs(e.handleEvent,e)}return 2147483647<Number(t)?-1:Rs.setTimeout(e,t||0)}function ir(e){e.g=sr((()=>{e.g=null,e.i&&(e.i=!1,ir(e))}),e.j);const t=e.h;e.h=null,e.m.apply(null,t)}Bs(tr,qi),(Cs=tr.prototype).ca=!1,Cs.R=null,Cs.lb=function(){if(this.ca){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.R=this.g.setTimeout(this.j,this.h-e):(this.R&&(this.g.clearTimeout(this.R),this.R=null),Ki(this,"tick"),this.ca&&(nr(this),this.start()))}},Cs.start=function(){this.ca=!0,this.R||(this.R=this.g.setTimeout(this.j,this.h),this.l=Date.now())},Cs.M=function(){tr.X.M.call(this),nr(this),delete this.g};class rr extends qs{l(e){this.h=arguments,this.g?this.i=!0:ir(this)}M(){super.M(),this.g&&(Rs.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}}function or(e){qs.call(this),this.h=e,this.g={}}Bs(or,qs);var ar=[];function cr(e,t,n,s){Array.isArray(n)||(n&&(ar[0]=n.toString()),n=ar);for(var i=0;i<n.length;i++){var r=Oi(t,n[i],s||e.handleEvent,!1,e.h||e);if(!r)break;e.g[r.key]=r}}function ur(e){Ii(e.g,(function(e,t){this.g.hasOwnProperty(t)&&xi(e)}),e),e.g={}}function hr(){this.g=!0}function lr(e,t,n,s){e.info((function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n)for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var s=n[e];if(!(2>s.length)){var i=s[1];if(Array.isArray(i)&&!(1>i.length)){var r=i[0];if("noop"!=r&&"stop"!=r&&"close"!=r)for(var o=1;o<i.length;o++)i[o]=""}}}return zi(n)}catch(e){return t}}(e,n)+(s?" "+s:"")}))}or.prototype.M=function(){or.X.M.call(this),ur(this)},or.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},hr.prototype.Aa=function(){this.g=!1},hr.prototype.info=function(){};var dr={},fr=null;function pr(){return fr=fr||new qi}function gr(e){$s.call(this,dr.Pa,e)}function mr(e){const t=pr();Ki(t,new gr(t))}function yr(e,t){$s.call(this,dr.STAT_EVENT,e),this.stat=t}function vr(e){const t=pr();Ki(t,new yr(t,e))}function wr(e,t){$s.call(this,dr.Qa,e),this.size=t}function Tr(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return Rs.setTimeout((function(){e()}),t)}dr.Pa="serverreachability",Bs(gr,$s),dr.STAT_EVENT="statevent",Bs(yr,$s),dr.Qa="timingevent",Bs(wr,$s);var br={NO_ERROR:0,mb:1,zb:2,yb:3,tb:4,xb:5,Ab:6,Ma:7,TIMEOUT:8,Db:9},Er={rb:"complete",Nb:"success",Na:"error",Ma:"abort",Fb:"ready",Gb:"readystatechange",TIMEOUT:"timeout",Bb:"incrementaldata",Eb:"progress",ub:"downloadprogress",Vb:"uploadprogress"};function Ir(){}function _r(e){return e.h||(e.h=e.i())}function Sr(){}Ir.prototype.h=null;var kr,Cr={OPEN:"a",qb:"b",Na:"c",Cb:"d"};function Ar(){$s.call(this,"d")}function Nr(){$s.call(this,"c")}function Dr(){}function Rr(e,t,n,s){this.l=e,this.j=t,this.m=n,this.U=s||1,this.S=new or(this),this.O=Lr,e=ri?125:void 0,this.T=new tr(e),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.V=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.Y=-1,this.I=!1,this.N=0,this.L=null,this.$=this.J=this.Z=this.P=!1,this.h=new Or}function Or(){this.i=null,this.g="",this.h=!1}Bs(Ar,$s),Bs(Nr,$s),Bs(Dr,Ir),Dr.prototype.g=function(){return new XMLHttpRequest},Dr.prototype.i=function(){return{}},kr=new Dr;var Lr=45e3,Pr={},Mr={};function xr(e,t,n){e.K=1,e.v=to(Xr(t)),e.s=n,e.P=!0,Ur(e,null)}function Ur(e,t){e.F=Date.now(),Br(e),e.A=Xr(e.v);var n=e.A,s=e.U;Array.isArray(s)||(s=[String(s)]),go(n.i,"t",s),e.C=0,n=e.l.H,e.h=new Or,e.g=pa(e.l,n?t:null,!e.s),0<e.N&&(e.L=new rr(Vs(e.La,e,e.g),e.N)),cr(e.S,e.g,"readystatechange",e.ib),t=e.H?_i(e.H):{},e.s?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.da(e.A,e.u,e.s,t)):(e.u="GET",e.g.da(e.A,e.u,null,t)),mr(),function(e,t,n,s,i,r){e.info((function(){if(e.g)if(r)for(var o="",a=r.split("&"),c=0;c<a.length;c++){var u=a[c].split("=");if(1<u.length){var h=u[0];u=u[1];var l=h.split("_");o=2<=l.length&&"type"==l[1]?o+(h+"=")+u+"&":o+(h+"=redacted&")}}else o=null;else o=r;return"XMLHTTP REQ ("+s+") [attempt "+i+"]: "+t+"\n"+n+"\n"+o}))}(e.j,e.u,e.A,e.m,e.U,e.s)}function Fr(e){return!!e.g&&("GET"==e.u&&2!=e.K&&e.l.Da)}function Vr(e,t,n){let s,i=!0;for(;!e.I&&e.C<n.length;){if(s=jr(e,n),s==Mr){4==t&&(e.o=4,vr(14),i=!1),lr(e.j,e.m,null,"[Incomplete Response]");break}if(s==Pr){e.o=4,vr(15),lr(e.j,e.m,n,"[Invalid Chunk]"),i=!1;break}lr(e.j,e.m,s,null),$r(e,s)}Fr(e)&&s!=Mr&&s!=Pr&&(e.h.g="",e.C=0),4!=t||0!=n.length||e.h.h||(e.o=1,vr(16),i=!1),e.i=e.i&&i,i?0<n.length&&!e.$&&(e.$=!0,(t=e.l).g==e&&t.$&&!t.K&&(t.j.info("Great, no buffering proxy detected. Bytes received: "+n.length),oa(t),t.K=!0,vr(11))):(lr(e.j,e.m,n,"[Invalid Chunked Response]"),zr(e),Hr(e))}function jr(e,t){var n=e.C,s=t.indexOf("\n",n);return-1==s?Mr:(n=Number(t.substring(n,s)),isNaN(n)?Pr:(s+=1)+n>t.length?Mr:(t=t.substr(s,n),e.C=s+n,t))}function Br(e){e.V=Date.now()+e.O,qr(e,e.O)}function qr(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=Tr(Vs(e.gb,e),t)}function Kr(e){e.B&&(Rs.clearTimeout(e.B),e.B=null)}function Hr(e){0==e.l.G||e.I||ua(e.l,e)}function zr(e){Kr(e);var t=e.L;t&&"function"==typeof t.na&&t.na(),e.L=null,nr(e.T),ur(e.S),e.g&&(t=e.g,e.g=null,t.abort(),t.na())}function $r(e,t){try{var n=e.l;if(0!=n.G&&(n.g==e||bo(n.h,e)))if(!e.J&&bo(n.h,e)&&3==n.G){try{var s=n.Fa.g.parse(t)}catch(e){s=null}if(Array.isArray(s)&&3==s.length){var i=s;if(0==i[0]){e:if(!n.u){if(n.g){if(!(n.g.F+3e3<e.F))break e;ca(n),Yo(n)}ra(n),vr(18)}}else n.Ba=i[1],0<n.Ba-n.T&&37500>i[2]&&n.L&&0==n.A&&!n.v&&(n.v=Tr(Vs(n.cb,n),6e3));if(1>=To(n.h)&&n.ja){try{n.ja()}catch(e){}n.ja=void 0}}else la(n,11)}else if((e.J||n.g==e)&&ca(n),!Ws(t))for(i=n.Fa.g.parse(t),t=0;t<i.length;t++){let u=i[t];if(n.T=u[0],u=u[1],2==n.G)if("c"==u[0]){n.I=u[1],n.ka=u[2];const t=u[3];null!=t&&(n.ma=t,n.j.info("VER="+n.ma));const i=u[4];null!=i&&(n.Ca=i,n.j.info("SVER="+n.Ca));const h=u[5];null!=h&&"number"==typeof h&&0<h&&(s=1.5*h,n.J=s,n.j.info("backChannelRequestTimeoutMs_="+s)),s=n;const l=e.g;if(l){const e=l.g?l.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var r=s.h;r.g||-1==e.indexOf("spdy")&&-1==e.indexOf("quic")&&-1==e.indexOf("h2")||(r.j=r.l,r.g=new Set,r.h&&(Eo(r,r.h),r.h=null))}if(s.D){const e=l.g?l.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(s.za=e,eo(s.F,s.D,e))}}n.G=3,n.l&&n.l.xa(),n.$&&(n.P=Date.now()-e.F,n.j.info("Handshake RTT: "+n.P+"ms"));var o=e;if((s=n).sa=fa(s,s.H?s.ka:null,s.V),o.J){Io(s.h,o);var a=o,c=s.J;c&&a.setTimeout(c),a.B&&(Kr(a),Br(a)),s.g=o}else ia(s);0<n.i.length&&ea(n)}else"stop"!=u[0]&&"close"!=u[0]||la(n,7);else 3==n.G&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?la(n,7):Jo(n):"noop"!=u[0]&&n.l&&n.l.wa(u),n.A=0)}mr()}catch(e){}}function Gr(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(Ls(e)||"string"==typeof e)Array.prototype.forEach.call(e,t,void 0);else for(var n=function(e){if(e.oa&&"function"==typeof e.oa)return e.oa();if(!e.W||"function"!=typeof e.W){if("undefined"!=typeof Map&&e instanceof Map)return Array.from(e.keys());if(!("undefined"!=typeof Set&&e instanceof Set)){if(Ls(e)||"string"==typeof e){var t=[];e=e.length;for(var n=0;n<e;n++)t.push(n);return t}t=[],n=0;for(const s in e)t[n++]=s;return t}}}(e),s=function(e){if(e.W&&"function"==typeof e.W)return e.W();if("undefined"!=typeof Map&&e instanceof Map||"undefined"!=typeof Set&&e instanceof Set)return Array.from(e.values());if("string"==typeof e)return e.split("");if(Ls(e)){for(var t=[],n=e.length,s=0;s<n;s++)t.push(e[s]);return t}for(s in t=[],n=0,e)t[n++]=e[s];return t}(e),i=s.length,r=0;r<i;r++)t.call(void 0,s[r],n&&n[r],e)}(Cs=Rr.prototype).setTimeout=function(e){this.O=e},Cs.ib=function(e){e=e.target;const t=this.L;t&&3==zo(e)?t.l():this.La(e)},Cs.La=function(e){try{if(e==this.g)e:{const h=zo(this.g);var t=this.g.Ea();this.g.aa();if(!(3>h)&&(3!=h||ri||this.g&&(this.h.h||this.g.fa()||$o(this.g)))){this.I||4!=h||7==t||mr(),Kr(this);var n=this.g.aa();this.Y=n;t:if(Fr(this)){var s=$o(this.g);e="";var i=s.length,r=4==zo(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){zr(this),Hr(this);var o="";break t}this.h.i=new Rs.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(s[t],{stream:r&&t==i-1});s.splice(0,i),this.h.g+=e,this.C=0,o=this.h.g}else o=this.g.fa();if(this.i=200==n,function(e,t,n,s,i,r,o){e.info((function(){return"XMLHTTP RESP ("+s+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+r+" "+o}))}(this.j,this.u,this.A,this.m,this.U,h,n),this.i){if(this.Z&&!this.J){t:{if(this.g){var a,c=this.g;if((a=c.g?c.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Ws(a)){var u=a;break t}}u=null}if(!(n=u)){this.i=!1,this.o=3,vr(12),zr(this),Hr(this);break e}lr(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,$r(this,n)}this.P?(Vr(this,h,o),ri&&this.i&&3==h&&(cr(this.S,this.T,"tick",this.hb),this.T.start())):(lr(this.j,this.m,o,null),$r(this,o)),4==h&&zr(this),this.i&&!this.I&&(4==h?ua(this.l,this):(this.i=!1,Br(this)))}else 400==n&&0<o.indexOf("Unknown SID")?(this.o=3,vr(12)):(this.o=0,vr(13)),zr(this),Hr(this)}}}catch(e){}},Cs.hb=function(){if(this.g){var e=zo(this.g),t=this.g.fa();this.C<t.length&&(Kr(this),Vr(this,e,t),this.i&&4!=e&&Br(this))}},Cs.cancel=function(){this.I=!0,zr(this)},Cs.gb=function(){this.B=null;const e=Date.now();0<=e-this.V?(function(e,t){e.info((function(){return"TIMEOUT: "+t}))}(this.j,this.A),2!=this.K&&(mr(),vr(17)),zr(this),this.o=2,Hr(this)):qr(this,this.V-e)};var Wr=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Qr(e,t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,e instanceof Qr){this.h=void 0!==t?t:e.h,Jr(this,e.j),this.s=e.s,this.g=e.g,Yr(this,e.m),this.l=e.l,t=e.i;var n=new ho;n.i=t.i,t.g&&(n.g=new Map(t.g),n.h=t.h),Zr(this,n),this.o=e.o}else e&&(n=String(e).match(Wr))?(this.h=!!t,Jr(this,n[1]||"",!0),this.s=no(n[2]||""),this.g=no(n[3]||"",!0),Yr(this,n[4]),this.l=no(n[5]||"",!0),Zr(this,n[6]||"",!0),this.o=no(n[7]||"")):(this.h=!!t,this.i=new ho(null,this.h))}function Xr(e){return new Qr(e)}function Jr(e,t,n){e.j=n?no(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function Yr(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function Zr(e,t,n){t instanceof ho?(e.i=t,function(e,t){t&&!e.j&&(lo(e),e.i=null,e.g.forEach((function(e,t){var n=t.toLowerCase();t!=n&&(fo(this,t),go(this,n,e))}),e)),e.j=t}(e.i,e.h)):(n||(t=so(t,co)),e.i=new ho(t,e.h))}function eo(e,t,n){e.i.set(t,n)}function to(e){return eo(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function no(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function so(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,io),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function io(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}Qr.prototype.toString=function(){var e=[],t=this.j;t&&e.push(so(t,ro,!0),":");var n=this.g;return(n||"file"==t)&&(e.push("//"),(t=this.s)&&e.push(so(t,ro,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.m)&&e.push(":",String(n))),(n=this.l)&&(this.g&&"/"!=n.charAt(0)&&e.push("/"),e.push(so(n,"/"==n.charAt(0)?ao:oo,!0))),(n=this.i.toString())&&e.push("?",n),(n=this.o)&&e.push("#",so(n,uo)),e.join("")};var ro=/[#\/\?@]/g,oo=/[#\?:]/g,ao=/[#\?]/g,co=/[#\?@]/g,uo=/#/g;function ho(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function lo(e){e.g||(e.g=new Map,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var s=e[n].indexOf("="),i=null;if(0<=s){var r=e[n].substring(0,s);i=e[n].substring(s+1)}else r=e[n];t(r,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,(function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)})))}function fo(e,t){lo(e),t=mo(e,t),e.g.has(t)&&(e.i=null,e.h-=e.g.get(t).length,e.g.delete(t))}function po(e,t){return lo(e),t=mo(e,t),e.g.has(t)}function go(e,t,n){fo(e,t),0<n.length&&(e.i=null,e.g.set(mo(e,t),Hs(n)),e.h+=n.length)}function mo(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}(Cs=ho.prototype).add=function(e,t){lo(this),this.i=null,e=mo(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},Cs.forEach=function(e,t){lo(this),this.g.forEach((function(n,s){n.forEach((function(n){e.call(t,n,s,this)}),this)}),this)},Cs.oa=function(){lo(this);const e=Array.from(this.g.values()),t=Array.from(this.g.keys()),n=[];for(let s=0;s<t.length;s++){const i=e[s];for(let e=0;e<i.length;e++)n.push(t[s])}return n},Cs.W=function(e){lo(this);let t=[];if("string"==typeof e)po(this,e)&&(t=t.concat(this.g.get(mo(this,e))));else{e=Array.from(this.g.values());for(let n=0;n<e.length;n++)t=t.concat(e[n])}return t},Cs.set=function(e,t){return lo(this),this.i=null,po(this,e=mo(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},Cs.get=function(e,t){return e&&0<(e=this.W(e)).length?String(e[0]):t},Cs.toString=function(){if(this.i)return this.i;if(!this.g)return"";const e=[],t=Array.from(this.g.keys());for(var n=0;n<t.length;n++){var s=t[n];const r=encodeURIComponent(String(s)),o=this.W(s);for(s=0;s<o.length;s++){var i=r;""!==o[s]&&(i+="="+encodeURIComponent(String(o[s]))),e.push(i)}}return this.i=e.join("&")};function yo(e){this.l=e||vo,Rs.PerformanceNavigationTiming?e=0<(e=Rs.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(Rs.g&&Rs.g.Ga&&Rs.g.Ga()&&Rs.g.Ga().$b),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var vo=10;function wo(e){return!!e.h||!!e.g&&e.g.size>=e.j}function To(e){return e.h?1:e.g?e.g.size:0}function bo(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function Eo(e,t){e.g?e.g.add(t):e.h=t}function Io(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function _o(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return Hs(e.i)}function So(){}function ko(){this.g=new So}function Co(e,t,n){const s=n||"";try{Gr(e,(function(e,n){let i=e;Ps(e)&&(i=zi(e)),t.push(s+n+"="+encodeURIComponent(i))}))}catch(e){throw t.push(s+"type="+encodeURIComponent("_badmap")),e}}function Ao(e,t,n,s,i){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,i(s)}catch(e){}}function No(e){this.l=e.ac||null,this.j=e.jb||!1}function Do(e,t){qi.call(this),this.D=e,this.u=t,this.m=void 0,this.readyState=Ro,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}yo.prototype.cancel=function(){if(this.i=_o(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}},So.prototype.stringify=function(e){return Rs.JSON.stringify(e,void 0)},So.prototype.parse=function(e){return Rs.JSON.parse(e,void 0)},Bs(No,Ir),No.prototype.g=function(){return new Do(this.l,this.j)},No.prototype.i=function(e){return function(){return e}}({}),Bs(Do,qi);var Ro=0;function Oo(e){e.j.read().then(e.Ta.bind(e)).catch(e.ga.bind(e))}function Lo(e){e.readyState=4,e.l=null,e.j=null,e.A=null,Po(e)}function Po(e){e.onreadystatechange&&e.onreadystatechange.call(e)}(Cs=Do.prototype).open=function(e,t){if(this.readyState!=Ro)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,Po(this)},Cs.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||Rs).fetch(new Request(this.B,t)).then(this.Wa.bind(this),this.ga.bind(this))},Cs.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch((()=>{})),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Lo(this)),this.readyState=Ro},Cs.Wa=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,Po(this)),this.g&&(this.readyState=3,Po(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Ua.bind(this),this.ga.bind(this));else if(void 0!==Rs.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Oo(this)}else e.text().then(this.Va.bind(this),this.ga.bind(this))},Cs.Ta=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Lo(this):Po(this),3==this.readyState&&Oo(this)}},Cs.Va=function(e){this.g&&(this.response=this.responseText=e,Lo(this))},Cs.Ua=function(e){this.g&&(this.response=e,Lo(this))},Cs.ga=function(){this.g&&Lo(this)},Cs.setRequestHeader=function(e,t){this.v.append(e,t)},Cs.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},Cs.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(Do.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}});var Mo=Rs.JSON.parse;function xo(e){qi.call(this),this.headers=new Map,this.u=e||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=Uo,this.K=this.L=!1}Bs(xo,qi);var Uo="",Fo=/^https?$/i,Vo=["POST","PUT"];function jo(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,Bo(e),Ko(e)}function Bo(e){e.D||(e.D=!0,Ki(e,"complete"),Ki(e,"error"))}function qo(e){if(e.h&&void 0!==Ds&&(!e.C[1]||4!=zo(e)||2!=e.aa()))if(e.v&&4==zo(e))sr(e.Ha,0,e);else if(Ki(e,"readystatechange"),4==zo(e)){e.h=!1;try{const a=e.aa();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var s;if(s=0===a){var i=String(e.H).match(Wr)[1]||null;if(!i&&Rs.self&&Rs.self.location){var r=Rs.self.location.protocol;i=r.substr(0,r.length-1)}s=!Fo.test(i?i.toLowerCase():"")}n=s}if(n)Ki(e,"complete"),Ki(e,"success");else{e.m=6;try{var o=2<zo(e)?e.g.statusText:""}catch(e){o=""}e.j=o+" ["+e.aa()+"]",Bo(e)}}finally{Ko(e)}}}function Ko(e,t){if(e.g){Ho(e);const n=e.g,s=e.C[0]?Os:null;e.g=null,e.C=null,t||Ki(e,"ready");try{n.onreadystatechange=s}catch(e){}}}function Ho(e){e.g&&e.K&&(e.g.ontimeout=null),e.A&&(Rs.clearTimeout(e.A),e.A=null)}function zo(e){return e.g?e.g.readyState:0}function $o(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.J){case Uo:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function Go(e){let t="";return Ii(e,(function(e,n){t+=n,t+=":",t+=e,t+="\r\n"})),t}function Wo(e,t,n){e:{for(s in n){var s=!1;break e}s=!0}s||(n=Go(n),"string"==typeof e?null!=n&&encodeURIComponent(String(n)):eo(e,t,n))}function Qo(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function Xo(e){this.Ca=0,this.i=[],this.j=new hr,this.ka=this.sa=this.F=this.V=this.g=this.za=this.D=this.ia=this.o=this.S=this.s=null,this.ab=this.U=0,this.Za=Qo("failFast",!1,e),this.L=this.v=this.u=this.m=this.l=null,this.Y=!0,this.pa=this.Ba=this.T=-1,this.Z=this.A=this.C=0,this.Xa=Qo("baseRetryDelayMs",5e3,e),this.bb=Qo("retryDelaySeedMs",1e4,e),this.$a=Qo("forwardChannelMaxRetries",2,e),this.ta=Qo("forwardChannelRequestTimeoutMs",2e4,e),this.ra=e&&e.xmlHttpFactory||void 0,this.Da=e&&e.Zb||!1,this.J=void 0,this.H=e&&e.supportsCrossDomainXhr||!1,this.I="",this.h=new yo(e&&e.concurrentRequestLimit),this.Fa=new ko,this.O=e&&e.fastHandshake||!1,this.N=e&&e.encodeInitMessageHeaders||!1,this.O&&this.N&&(this.N=!1),this.Ya=e&&e.Xb||!1,e&&e.Aa&&this.j.Aa(),e&&e.forceLongPolling&&(this.Y=!1),this.$=!this.O&&this.Y&&e&&e.detectBufferingProxy||!1,this.ja=void 0,this.P=0,this.K=!1,this.la=this.B=null}function Jo(e){if(Zo(e),3==e.G){var t=e.U++,n=Xr(e.F);eo(n,"SID",e.I),eo(n,"RID",t),eo(n,"TYPE","terminate"),na(e,n),(t=new Rr(e,e.j,t,void 0)).K=2,t.v=to(Xr(n)),n=!1,Rs.navigator&&Rs.navigator.sendBeacon&&(n=Rs.navigator.sendBeacon(t.v.toString(),"")),!n&&Rs.Image&&((new Image).src=t.v,n=!0),n||(t.g=pa(t.l,null),t.g.da(t.v)),t.F=Date.now(),Br(t)}da(e)}function Yo(e){e.g&&(oa(e),e.g.cancel(),e.g=null)}function Zo(e){Yo(e),e.u&&(Rs.clearTimeout(e.u),e.u=null),ca(e),e.h.cancel(),e.m&&("number"==typeof e.m&&Rs.clearTimeout(e.m),e.m=null)}function ea(e){wo(e.h)||e.m||(e.m=!0,Ji(e.Ja,e),e.C=0)}function ta(e,t){var n;n=t?t.m:e.U++;const s=Xr(e.F);eo(s,"SID",e.I),eo(s,"RID",n),eo(s,"AID",e.T),na(e,s),e.o&&e.s&&Wo(s,e.o,e.s),n=new Rr(e,e.j,n,e.C+1),null===e.o&&(n.H=e.s),t&&(e.i=t.D.concat(e.i)),t=sa(e,n,1e3),n.setTimeout(Math.round(.5*e.ta)+Math.round(.5*e.ta*Math.random())),Eo(e.h,n),xr(n,s,t)}function na(e,t){e.ia&&Ii(e.ia,(function(e,n){eo(t,n,e)})),e.l&&Gr({},(function(e,n){eo(t,n,e)}))}function sa(e,t,n){n=Math.min(e.i.length,n);var s=e.l?Vs(e.l.Ra,e.l,e):null;e:{var i=e.i;let t=-1;for(;;){const e=["count="+n];-1==t?0<n?(t=i[0].h,e.push("ofs="+t)):t=0:e.push("ofs="+t);let r=!0;for(let o=0;o<n;o++){let n=i[o].h;const a=i[o].g;if(n-=t,0>n)t=Math.max(0,i[o].h-100),r=!1;else try{Co(a,e,"req"+n+"_")}catch(e){s&&s(a)}}if(r){s=e.join("&");break e}}}return e=e.i.splice(0,n),t.D=e,s}function ia(e){e.g||e.u||(e.Z=1,Ji(e.Ia,e),e.A=0)}function ra(e){return!(e.g||e.u||3<=e.A)&&(e.Z++,e.u=Tr(Vs(e.Ia,e),ha(e,e.A)),e.A++,!0)}function oa(e){null!=e.B&&(Rs.clearTimeout(e.B),e.B=null)}function aa(e){e.g=new Rr(e,e.j,"rpc",e.Z),null===e.o&&(e.g.H=e.s),e.g.N=0;var t=Xr(e.sa);eo(t,"RID","rpc"),eo(t,"SID",e.I),eo(t,"CI",e.L?"0":"1"),eo(t,"AID",e.T),eo(t,"TYPE","xmlhttp"),na(e,t),e.o&&e.s&&Wo(t,e.o,e.s),e.J&&e.g.setTimeout(e.J);var n=e.g;e=e.ka,n.K=1,n.v=to(Xr(t)),n.s=null,n.P=!0,Ur(n,e)}function ca(e){null!=e.v&&(Rs.clearTimeout(e.v),e.v=null)}function ua(e,t){var n=null;if(e.g==t){ca(e),oa(e),e.g=null;var s=2}else{if(!bo(e.h,t))return;n=t.D,Io(e.h,t),s=1}if(0!=e.G)if(e.pa=t.Y,t.i)if(1==s){n=t.s?t.s.length:0,t=Date.now()-t.F;var i=e.C;Ki(s=pr(),new wr(s,n)),ea(e)}else ia(e);else if(3==(i=t.o)||0==i&&0<e.pa||!(1==s&&function(e,t){return!(To(e.h)>=e.h.j-(e.m?1:0)||(e.m?(e.i=t.D.concat(e.i),0):1==e.G||2==e.G||e.C>=(e.Za?0:e.$a)||(e.m=Tr(Vs(e.Ja,e,t),ha(e,e.C)),e.C++,0)))}(e,t)||2==s&&ra(e)))switch(n&&0<n.length&&(t=e.h,t.i=t.i.concat(n)),i){case 1:la(e,5);break;case 4:la(e,10);break;case 3:la(e,6);break;default:la(e,2)}}function ha(e,t){let n=e.Xa+Math.floor(Math.random()*e.bb);return e.l||(n*=2),n*t}function la(e,t){if(e.j.info("Error code "+t),2==t){var n=null;e.l&&(n=null);var s=Vs(e.kb,e);n||(n=new Qr("//www.google.com/images/cleardot.gif"),Rs.location&&"http"==Rs.location.protocol||Jr(n,"https"),to(n)),function(e,t){const n=new hr;if(Rs.Image){const s=new Image;s.onload=js(Ao,n,s,"TestLoadImage: loaded",!0,t),s.onerror=js(Ao,n,s,"TestLoadImage: error",!1,t),s.onabort=js(Ao,n,s,"TestLoadImage: abort",!1,t),s.ontimeout=js(Ao,n,s,"TestLoadImage: timeout",!1,t),Rs.setTimeout((function(){s.ontimeout&&s.ontimeout()}),1e4),s.src=e}else t(!1)}(n.toString(),s)}else vr(2);e.G=0,e.l&&e.l.va(t),da(e),Zo(e)}function da(e){if(e.G=0,e.la=[],e.l){const t=_o(e.h);0==t.length&&0==e.i.length||(zs(e.la,t),zs(e.la,e.i),e.h.i.length=0,Hs(e.i),e.i.length=0),e.l.ua()}}function fa(e,t,n){var s=n instanceof Qr?Xr(n):new Qr(n,void 0);if(""!=s.g)t&&(s.g=t+"."+s.g),Yr(s,s.m);else{var i=Rs.location;s=i.protocol,t=t?t+"."+i.hostname:i.hostname,i=+i.port;var r=new Qr(null,void 0);s&&Jr(r,s),t&&(r.g=t),i&&Yr(r,i),n&&(r.l=n),s=r}return n=e.D,t=e.za,n&&t&&eo(s,n,t),eo(s,"VER",e.ma),na(e,s),s}function pa(e,t,n){if(t&&!e.H)throw Error("Can't create secondary domain capable XhrIo object.");return(t=n&&e.Da&&!e.ra?new xo(new No({jb:!0})):new xo(e.ra)).Ka(e.H),t}function ga(){}function ma(){if(si&&!(10<=Number(mi)))throw Error("Environmental error: no available transport.")}function ya(e,t){qi.call(this),this.g=new Xo(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.ya&&(e?e["X-WebChannel-Client-Profile"]=t.ya:e={"X-WebChannel-Client-Profile":t.ya}),this.g.S=e,(e=t&&t.Yb)&&!Ws(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!Ws(t)&&(this.g.D=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new Ta(this)}function va(e){Ar.call(this);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function wa(){Nr.call(this),this.status=1}function Ta(e){this.g=e}(Cs=xo.prototype).Ka=function(e){this.L=e},Cs.da=function(e,t,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+e);t=t?t.toUpperCase():"GET",this.H=e,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():kr.g(),this.C=this.u?_r(this.u):_r(kr),this.g.onreadystatechange=Vs(this.Ha,this);try{this.F=!0,this.g.open(t,String(e),!0),this.F=!1}catch(e){return void jo(this,e)}if(e=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var i in s)n.set(i,s[i]);else{if("function"!=typeof s.keys||"function"!=typeof s.get)throw Error("Unknown input type for opt_headers: "+String(s));for(const e of s.keys())n.set(e,s.get(e))}s=Array.from(n.keys()).find((e=>"content-type"==e.toLowerCase())),i=Rs.FormData&&e instanceof Rs.FormData,!(0<=Ks(Vo,t))||s||i||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[e,t]of n)this.g.setRequestHeader(e,t);this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{Ho(this),0<this.B&&((this.K=function(e){return si&&pi()&&"number"==typeof e.timeout&&void 0!==e.ontimeout}(this.g))?(this.g.timeout=this.B,this.g.ontimeout=Vs(this.qa,this)):this.A=sr(this.qa,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(e){jo(this,e)}},Cs.qa=function(){void 0!==Ds&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,Ki(this,"timeout"),this.abort(8))},Cs.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,Ki(this,"complete"),Ki(this,"abort"),Ko(this))},Cs.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Ko(this,!0)),xo.X.M.call(this)},Cs.Ha=function(){this.s||(this.F||this.v||this.l?qo(this):this.fb())},Cs.fb=function(){qo(this)},Cs.aa=function(){try{return 2<zo(this)?this.g.status:-1}catch(e){return-1}},Cs.fa=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},Cs.Sa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),Mo(t)}},Cs.Ea=function(){return this.m},Cs.Oa=function(){return"string"==typeof this.j?this.j:String(this.j)},(Cs=Xo.prototype).ma=8,Cs.G=1,Cs.Ja=function(e){if(this.m)if(this.m=null,1==this.G){if(!e){this.U=Math.floor(1e5*Math.random()),e=this.U++;const i=new Rr(this,this.j,e,void 0);let r=this.s;if(this.S&&(r?(r=_i(r),ki(r,this.S)):r=this.S),null!==this.o||this.N||(i.H=r,r=null),this.O)e:{for(var t=0,n=0;n<this.i.length;n++){var s=this.i[n];if(void 0===(s="__data__"in s.g&&"string"==typeof(s=s.g.__data__)?s.length:void 0))break;if(4096<(t+=s)){t=n;break e}if(4096===t||n===this.i.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=sa(this,i,t),eo(n=Xr(this.F),"RID",e),eo(n,"CVER",22),this.D&&eo(n,"X-HTTP-Session-Id",this.D),na(this,n),r&&(this.N?t="headers="+encodeURIComponent(String(Go(r)))+"&"+t:this.o&&Wo(n,this.o,r)),Eo(this.h,i),this.Ya&&eo(n,"TYPE","init"),this.O?(eo(n,"$req",t),eo(n,"SID","null"),i.Z=!0,xr(i,n,null)):xr(i,n,t),this.G=2}}else 3==this.G&&(e?ta(this,e):0==this.i.length||wo(this.h)||ta(this))},Cs.Ia=function(){if(this.u=null,aa(this),this.$&&!(this.K||null==this.g||0>=this.P)){var e=2*this.P;this.j.info("BP detection timer enabled: "+e),this.B=Tr(Vs(this.eb,this),e)}},Cs.eb=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.L=!1,this.K=!0,vr(10),Yo(this),aa(this))},Cs.cb=function(){null!=this.v&&(this.v=null,Yo(this),ra(this),vr(19))},Cs.kb=function(e){e?(this.j.info("Successfully pinged google.com"),vr(2)):(this.j.info("Failed to ping google.com"),vr(1))},(Cs=ga.prototype).xa=function(){},Cs.wa=function(){},Cs.va=function(){},Cs.ua=function(){},Cs.Ra=function(){},ma.prototype.g=function(e,t){return new ya(e,t)},Bs(ya,qi),ya.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.H=!0);var e=this.g,t=this.l,n=this.h||void 0;vr(0),e.V=t,e.ia=n||{},e.L=e.Y,e.F=fa(e,null,e.V),ea(e)},ya.prototype.close=function(){Jo(this.g)},ya.prototype.u=function(e){var t=this.g;if("string"==typeof e){var n={};n.__data__=e,e=n}else this.v&&((n={}).__data__=zi(e),e=n);t.i.push(new class{constructor(e,t){this.h=e,this.g=t}}(t.ab++,e)),3==t.G&&ea(t)},ya.prototype.M=function(){this.g.l=null,delete this.j,Jo(this.g),delete this.g,ya.X.M.call(this)},Bs(va,Ar),Bs(wa,Nr),Bs(Ta,ga),Ta.prototype.xa=function(){Ki(this.g,"a")},Ta.prototype.wa=function(e){Ki(this.g,new va(e))},Ta.prototype.va=function(e){Ki(this.g,new wa)},Ta.prototype.ua=function(){Ki(this.g,"b")},ma.prototype.createWebChannel=ma.prototype.g,ya.prototype.send=ya.prototype.u,ya.prototype.open=ya.prototype.m,ya.prototype.close=ya.prototype.close,br.NO_ERROR=0,br.TIMEOUT=8,br.HTTP_ERROR=6,Er.COMPLETE="complete",Sr.EventType=Cr,Cr.OPEN="a",Cr.CLOSE="b",Cr.ERROR="c",Cr.MESSAGE="d",qi.prototype.listen=qi.prototype.N,xo.prototype.listenOnce=xo.prototype.O,xo.prototype.getLastError=xo.prototype.Oa,xo.prototype.getLastErrorCode=xo.prototype.Ea,xo.prototype.getStatus=xo.prototype.aa,xo.prototype.getResponseJson=xo.prototype.Sa,xo.prototype.getResponseText=xo.prototype.fa,xo.prototype.send=xo.prototype.da,xo.prototype.setWithCredentials=xo.prototype.Ka;var ba=Ns.createWebChannelTransport=function(){return new ma},Ea=Ns.getStatEventTarget=function(){return pr()},Ia=Ns.ErrorCode=br,_a=Ns.EventType=Er,Sa=Ns.Event=dr,ka=Ns.Stat={sb:0,vb:1,wb:2,Pb:3,Ub:4,Rb:5,Sb:6,Qb:7,Ob:8,Tb:9,PROXY:10,NOPROXY:11,Mb:12,Ib:13,Jb:14,Hb:15,Kb:16,Lb:17,ob:18,nb:19,pb:20},Ca=Ns.FetchXmlHttpFactory=No,Aa=Ns.WebChannel=Sr,Na=Ns.XhrIo=xo;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Da{isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}constructor(e){this.uid=e}}Da.UNAUTHENTICATED=new Da(null),Da.GOOGLE_CREDENTIALS=new Da("google-credentials-uid"),Da.FIRST_PARTY=new Da("first-party-uid"),Da.MOCK_USER=new Da("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let Ra="9.15.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oa=new ee("@firebase/firestore");function La(){return Oa.logLevel}function Pa(e,...t){if(Oa.logLevel<=W.DEBUG){const n=t.map(Ua);Oa.debug(`Firestore (${Ra}): ${e}`,...n)}}function Ma(e,...t){if(Oa.logLevel<=W.ERROR){const n=t.map(Ua);Oa.error(`Firestore (${Ra}): ${e}`,...n)}}function xa(e,...t){if(Oa.logLevel<=W.WARN){const n=t.map(Ua);Oa.warn(`Firestore (${Ra}): ${e}`,...n)}}function Ua(e){if("string"==typeof e)return e;try{return t=e,JSON.stringify(t)}catch(t){return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fa(e="Unexpected state"){const t=`FIRESTORE (${Ra}) INTERNAL ASSERTION FAILED: `+e;throw Ma(t),new Error(t)}function Va(e,t){e||Fa()}function ja(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ba={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class qa extends R{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class za{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Da.UNAUTHENTICATED)))}shutdown(){}}class $a{getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}constructor(e){this.token=e,this.changeListener=null}}class Ga{start(e,t){let n=this.i;const s=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new Ka;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Ka,e.enqueueRetryable((()=>s(this.currentUser)))};const r=()=>{const t=i;e.enqueueRetryable((async()=>{await t.promise,await s(this.currentUser)}))},o=e=>{Pa("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),r()};this.t.onInit((e=>o(e))),setTimeout((()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?o(e):(Pa("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Ka)}}),0),r()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((t=>this.i!==e?(Pa("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(Va("string"==typeof t.accessToken),new Ha(t.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return Va(null===e||"string"==typeof e),new Da(e)}constructor(e){this.t=e,this.currentUser=Da.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}}class Wa{I(){return this.g?this.g():(Va(!("object"!=typeof this.h||null===this.h||!this.h.auth||!this.h.auth.getAuthHeaderValueForFirstParty)),this.h.auth.getAuthHeaderValueForFirstParty([]))}get headers(){this.p.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.p.set("Authorization",e),this.m&&this.p.set("X-Goog-Iam-Authorization-Token",this.m),this.p}constructor(e,t,n,s){this.h=e,this.l=t,this.m=n,this.g=s,this.type="FirstParty",this.user=Da.FIRST_PARTY,this.p=new Map}}class Qa{getToken(){return Promise.resolve(new Wa(this.h,this.l,this.m,this.g))}start(e,t){e.enqueueRetryable((()=>t(Da.FIRST_PARTY)))}shutdown(){}invalidateToken(){}constructor(e,t,n,s){this.h=e,this.l=t,this.m=n,this.g=s}}class Xa{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ja{start(e,t){const n=e=>{null!=e.error&&Pa("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);const n=e.token!==this.A;return this.A=e.token,Pa("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable((()=>n(t)))};const s=e=>{Pa("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.T.onInit((e=>s(e))),setTimeout((()=>{if(!this.appCheck){const e=this.T.getImmediate({optional:!0});e?s(e):Pa("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((e=>e?(Va("string"==typeof e.token),this.A=e.token,new Xa(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}constructor(e){this.T=e,this.forceRefresh=!1,this.appCheck=null,this.A=null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ya(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{static R(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const s=Ya(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%e.length))}return n}}function ec(e,t){return e<t?-1:e>t?1:0}function tc(e,t,n){return e.length===t.length&&e.every(((e,s)=>n(e,t[s])))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class nc{static now(){return nc.fromMillis(Date.now())}static fromDate(e){return nc.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new nc(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ec(this.nanoseconds,e.nanoseconds):ec(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new qa(Ba.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new qa(Ba.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new qa(Ba.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new qa(Ba.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{static fromTimestamp(e){return new sc(e)}static min(){return new sc(new nc(0,0))}static max(){return new sc(new nc(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}constructor(e){this.timestamp=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{get length(){return this.len}isEqual(e){return 0===ic.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ic?e.forEach((e=>{t.push(e)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const n=e.get(s),i=t.get(s);if(n<i)return-1;if(n>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}constructor(e,t,n){void 0===t?t=0:t>e.length&&Fa(),void 0===n?n=e.length-t:n>e.length-t&&Fa(),this.segments=e,this.offset=t,this.len=n}}class rc extends ic{construct(e,t,n){return new rc(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new qa(Ba.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((e=>e.length>0)))}return new rc(t)}static emptyPath(){return new rc([])}}const oc=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ac extends ic{construct(e,t,n){return new ac(e,t,n)}static isValidIdentifier(e){return oc.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ac.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new ac(["__name__"])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(0===n.length)throw new qa(Ba.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let r=!1;for(;s<e.length;){const t=e[s];if("\\"===t){if(s+1===e.length)throw new qa(Ba.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[s+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new qa(Ba.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,s+=2}else"`"===t?(r=!r,s++):"."!==t||r?(n+=t,s++):(i(),s++)}if(i(),r)throw new qa(Ba.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ac(t)}static emptyPath(){return new ac([])}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{static fromPath(e){return new cc(rc.fromString(e))}static fromName(e){return new cc(rc.fromString(e).popFirst(5))}static empty(){return new cc(rc.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===rc.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return rc.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new cc(new rc(e.slice()))}constructor(e){this.path=e}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}uc.UNKNOWN_ID=-1;function hc(e,t){const n=e.toTimestamp().seconds,s=e.toTimestamp().nanoseconds+1,i=sc.fromTimestamp(1e9===s?new nc(n+1,0):new nc(n,s));return new dc(i,cc.empty(),t)}function lc(e){return new dc(e.readTime,e.key,-1)}class dc{static min(){return new dc(sc.min(),cc.empty(),-1)}static max(){return new dc(sc.max(),cc.empty(),-1)}constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}}function fc(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:(n=cc.comparator(e.documentKey,t.documentKey),0!==n?n:ec(e.largestBatchId,t.largestBatchId))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pc="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class gc{addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}constructor(){this.onCommittedListeners=[]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mc(e){if(e.code!==Ba.FAILED_PRECONDITION||e.message!==pc)throw e;Pa("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Fa(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new yc(((n,s)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,s)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof yc?t:yc.resolve(t)}catch(e){return yc.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):yc.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):yc.reject(t)}static resolve(e){return new yc(((t,n)=>{t(e)}))}static reject(e){return new yc(((t,n)=>{n(e)}))}static waitFor(e){return new yc(((t,n)=>{let s=0,i=0,r=!1;e.forEach((e=>{++s,e.next((()=>{++i,r&&i===s&&t()}),(e=>n(e)))})),r=!0,i===s&&t()}))}static or(e){let t=yc.resolve(!1);for(const n of e)t=t.next((e=>e?yc.resolve(e):n()));return t}static forEach(e,t){const n=[];return e.forEach(((e,s)=>{n.push(t.call(this,e,s))})),this.waitFor(n)}static mapArray(e,t){return new yc(((n,s)=>{const i=e.length,r=new Array(i);let o=0;for(let a=0;a<i;a++){const c=a;t(e[c]).next((e=>{r[c]=e,++o,o===i&&n(r)}),(e=>s(e)))}}))}static doWhile(e,t){return new yc(((n,s)=>{const i=()=>{!0===e()?t().next((()=>{i()}),s):n()};i()}))}constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vc(e){return"IndexedDbTransactionError"===e.name}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wc{ut(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ct&&this.ct(e),e}constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ut(e),this.ct=e=>t.writeSequenceNumber(e))}}wc.at=-1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tc{constructor(e,t,n,s,i,r,o,a){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=r,this.autoDetectLongPolling=o,this.useFetchStreams=a}}class bc{static empty(){return new bc("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof bc&&e.projectId===this.projectId&&e.database===this.database}constructor(e,t){this.projectId=e,this.database=t||"(default)"}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ec(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function Ic(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function _c(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sc(e){return null==e}function kc(e){return 0===e&&1/e==-1/0}function Cc(e){return"number"==typeof e&&Number.isInteger(e)&&!kc(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ac=Symbol.iterator;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{static fromBase64String(e){const t=atob(e);return new Nc(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new Nc(t)}[Ac](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){var e;return e=this.binaryString,btoa(e)}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ec(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}constructor(e){this.binaryString=e}}Nc.EMPTY_BYTE_STRING=new Nc("");const Dc=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Rc(e){if(Va(!!e),"string"==typeof e){let t=0;const n=Dc.exec(e);if(Va(!!n),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const s=new Date(e);return{seconds:Math.floor(s.getTime()/1e3),nanos:t}}return{seconds:Oc(e.seconds),nanos:Oc(e.nanos)}}function Oc(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Lc(e){return"string"==typeof e?Nc.fromBase64String(e):Nc.fromUint8Array(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pc(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function Mc(e){const t=e.mapValue.fields.__previous_value__;return Pc(t)?Mc(t):t}function xc(e){const t=Rc(e.mapValue.fields.__local_write_time__.timestampValue);return new nc(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Fc(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?Pc(e)?4:Jc(e)?9007199254740991:10:Fa()}function Vc(e,t){if(e===t)return!0;const n=Fc(e);if(n!==Fc(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return xc(e).isEqual(xc(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=Rc(e.timestampValue),s=Rc(t.timestampValue);return n.seconds===s.seconds&&n.nanos===s.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return s=t,Lc(e.bytesValue).isEqual(Lc(s.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return Oc(e.geoPointValue.latitude)===Oc(t.geoPointValue.latitude)&&Oc(e.geoPointValue.longitude)===Oc(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return Oc(e.integerValue)===Oc(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=Oc(e.doubleValue),s=Oc(t.doubleValue);return n===s?kc(n)===kc(s):isNaN(n)&&isNaN(s)}return!1}(e,t);case 9:return tc(e.arrayValue.values||[],t.arrayValue.values||[],Vc);case 10:return function(e,t){const n=e.mapValue.fields||{},s=t.mapValue.fields||{};if(Ec(n)!==Ec(s))return!1;for(const e in n)if(n.hasOwnProperty(e)&&(void 0===s[e]||!Vc(n[e],s[e])))return!1;return!0}(e,t);default:return Fa()}var s}function jc(e,t){return void 0!==(e.values||[]).find((e=>Vc(e,t)))}function Bc(e,t){if(e===t)return 0;const n=Fc(e),s=Fc(t);if(n!==s)return ec(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return ec(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=Oc(e.integerValue||e.doubleValue),s=Oc(t.integerValue||t.doubleValue);return n<s?-1:n>s?1:n===s?0:isNaN(n)?isNaN(s)?0:-1:1}(e,t);case 3:return qc(e.timestampValue,t.timestampValue);case 4:return qc(xc(e),xc(t));case 5:return ec(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Lc(e),s=Lc(t);return n.compareTo(s)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),s=t.split("/");for(let e=0;e<n.length&&e<s.length;e++){const t=ec(n[e],s[e]);if(0!==t)return t}return ec(n.length,s.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=ec(Oc(e.latitude),Oc(t.latitude));return 0!==n?n:ec(Oc(e.longitude),Oc(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){const n=e.values||[],s=t.values||[];for(let e=0;e<n.length&&e<s.length;++e){const t=Bc(n[e],s[e]);if(t)return t}return ec(n.length,s.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===Uc.mapValue&&t===Uc.mapValue)return 0;if(e===Uc.mapValue)return 1;if(t===Uc.mapValue)return-1;const n=e.fields||{},s=Object.keys(n),i=t.fields||{},r=Object.keys(i);s.sort(),r.sort();for(let e=0;e<s.length&&e<r.length;++e){const t=ec(s[e],r[e]);if(0!==t)return t;const o=Bc(n[s[e]],i[r[e]]);if(0!==o)return o}return ec(s.length,r.length)}(e.mapValue,t.mapValue);default:throw Fa()}}function qc(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return ec(e,t);const n=Rc(e),s=Rc(t),i=ec(n.seconds,s.seconds);return 0!==i?i:ec(n.nanos,s.nanos)}function Kc(e){return Hc(e)}function Hc(e){var t,n;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=Rc(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?Lc(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,cc.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",n=!0;for(const s of e.values||[])n?n=!1:t+=",",t+=Hc(s);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",s=!0;for(const i of t)s?s=!1:n+=",",n+=`${i}:${Hc(e.fields[i])}`;return n+"}"}(e.mapValue):Fa()}function zc(e){return!!e&&"integerValue"in e}function $c(e){return!!e&&"arrayValue"in e}function Gc(e){return!!e&&"nullValue"in e}function Wc(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function Qc(e){return!!e&&"mapValue"in e}function Xc(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return Ic(e.mapValue.fields,((e,n)=>t.mapValue.fields[e]=Xc(n))),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=Xc(e.arrayValue.values[n]);return t}return Object.assign({},e)}function Jc(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Yc{constructor(e,t){this.position=e,this.inclusive=t}}function Zc(e,t,n){let s=0;for(let i=0;i<e.position.length;i++){const r=t[i],o=e.position[i];if(s=r.field.isKeyField()?cc.comparator(cc.fromName(o.referenceValue),n.key):Bc(o,n.data.field(r.field)),"desc"===r.dir&&(s*=-1),0!==s)break}return s}function eu(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Vc(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{}class nu extends tu{static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new hu(e,t,n):"array-contains"===t?new pu(e,n):"in"===t?new gu(e,n):"not-in"===t?new mu(e,n):"array-contains-any"===t?new yu(e,n):new nu(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new lu(e,n):new du(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(Bc(t,this.value)):null!==t&&Fc(this.value)===Fc(t)&&this.matchesComparison(Bc(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return Fa()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}}class su extends tu{static create(e,t){return new su(e,t)}matches(e){return iu(this)?void 0===this.filters.find((t=>!t.matches(e))):void 0!==this.filters.find((t=>t.matches(e)))}getFlattenedFilters(){return null!==this.ht||(this.ht=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ht}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.lt((e=>e.isInequality()));return null!==e?e.field:null}lt(e){for(const t of this.getFlattenedFilters())if(e(t))return t;return null}constructor(e,t){super(),this.filters=e,this.op=t,this.ht=null}}function iu(e){return"and"===e.op}function ru(e){return ou(e)&&iu(e)}function ou(e){for(const t of e.filters)if(t instanceof su)return!1;return!0}function au(e){if(e instanceof nu)return e.field.canonicalString()+e.op.toString()+Kc(e.value);{const t=e.filters.map((e=>au(e))).join(",");return`${e.op}(${t})`}}function cu(e,t){return e instanceof nu?(n=e,(s=t)instanceof nu&&n.op===s.op&&n.field.isEqual(s.field)&&Vc(n.value,s.value)):e instanceof su?function(e,t){return t instanceof su&&e.op===t.op&&e.filters.length===t.filters.length&&e.filters.reduce(((e,n,s)=>e&&cu(n,t.filters[s])),!0)}(e,t):void Fa();var n,s}function uu(e){return e instanceof nu?`${(t=e).field.canonicalString()} ${t.op} ${Kc(t.value)}`:e instanceof su?function(e){return e.op.toString()+" {"+e.getFilters().map(uu).join(" ,")+"}"}(e):"Filter";var t}class hu extends nu{matches(e){const t=cc.comparator(e.key,this.key);return this.matchesComparison(t)}constructor(e,t,n){super(e,t,n),this.key=cc.fromName(n.referenceValue)}}class lu extends nu{matches(e){return this.keys.some((t=>t.isEqual(e.key)))}constructor(e,t){super(e,"in",t),this.keys=fu("in",t)}}class du extends nu{matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}constructor(e,t){super(e,"not-in",t),this.keys=fu("not-in",t)}}function fu(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map((e=>cc.fromName(e.referenceValue)))}class pu extends nu{matches(e){const t=e.data.field(this.field);return $c(t)&&jc(t.arrayValue,this.value)}constructor(e,t){super(e,"array-contains",t)}}class gu extends nu{matches(e){const t=e.data.field(this.field);return null!==t&&jc(this.value.arrayValue,t)}constructor(e,t){super(e,"in",t)}}class mu extends nu{matches(e){if(jc(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&!jc(this.value.arrayValue,t)}constructor(e,t){super(e,"not-in",t)}}class yu extends nu{matches(e){const t=e.data.field(this.field);return!(!$c(t)||!t.arrayValue.values)&&t.arrayValue.values.some((e=>jc(this.value.arrayValue,e)))}constructor(e,t){super(e,"array-contains-any",t)}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(e,t="asc"){this.field=e,this.dir=t}}function wu(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tu{insert(e,t){return new Tu(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Eu.BLACK,null,null))}remove(e){return new Tu(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Eu.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(0===s)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new bu(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new bu(this.root,e,this.comparator,!1)}getReverseIterator(){return new bu(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new bu(this.root,e,this.comparator,!0)}constructor(e,t){this.comparator=e,this.root=t||Eu.EMPTY}}class bu{getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}}class Eu{copy(e,t,n,s,i){return new Eu(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=s?s:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):0===i?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Eu.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),0===t(e,s.key)){if(s.right.isEmpty())return Eu.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Eu.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Eu.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Fa();if(this.right.isRed())throw Fa();const e=this.left.check();if(e!==this.right.check())throw Fa();return e+(this.isRed()?0:1)}constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=null!=n?n:Eu.RED,this.left=null!=s?s:Eu.EMPTY,this.right=null!=i?i:Eu.EMPTY,this.size=this.left.size+1+this.right.size}}Eu.EMPTY=null,Eu.RED=!0,Eu.BLACK=!1,Eu.EMPTY=new class{get key(){throw Fa()}get value(){throw Fa()}get color(){throw Fa()}get left(){throw Fa()}get right(){throw Fa()}copy(e,t,n,s,i){return this}insert(e,t,n){return new Eu(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}constructor(){this.size=0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Iu{has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new _u(this.data.getIterator())}getIteratorFrom(e){return new _u(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((e=>{t=t.add(e)})),t}isEqual(e){if(!(e instanceof Iu))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,s=n.getNext().key;if(0!==this.comparator(e,s))return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Iu(this.comparator);return t.data=e,t}constructor(e){this.comparator=e,this.data=new Tu(this.comparator)}}class _u{getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}constructor(e){this.iter=e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Su{static empty(){return new Su([])}unionWith(e){let t=new Iu(ac.comparator);for(const e of this.fields)t=t.add(e);for(const n of e)t=t.add(n);return new Su(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return tc(this.fields,e.fields,((e,t)=>e.isEqual(t)))}constructor(e){this.fields=e,e.sort(ac.comparator)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{static empty(){return new ku({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Qc(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Xc(t)}setAll(e){let t=ac.emptyPath(),n={},s=[];e.forEach(((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,s),n={},s=[],t=i.popLast()}e?n[i.lastSegment()]=Xc(e):s.push(i.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());Qc(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Vc(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Qc(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){Ic(t,((t,n)=>e[t]=n));for(const t of n)delete e[t]}clone(){return new ku(Xc(this.value))}constructor(e){this.value=e}}function Cu(e){const t=[];return Ic(e.fields,((e,n)=>{const s=new ac([e]);if(Qc(n)){const e=Cu(n.mapValue).fields;if(0===e.length)t.push(s);else for(const n of e)t.push(s.child(n))}else t.push(s)})),new Su(t)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class Au{static newInvalidDocument(e){return new Au(e,0,sc.min(),sc.min(),sc.min(),ku.empty(),0)}static newFoundDocument(e,t,n,s){return new Au(e,1,t,sc.min(),n,s,0)}static newNoDocument(e,t){return new Au(e,2,t,sc.min(),sc.min(),ku.empty(),0)}static newUnknownDocument(e,t){return new Au(e,3,t,sc.min(),sc.min(),ku.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(sc.min())||2!==this.documentType&&0!==this.documentType||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ku.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ku.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=sc.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof Au&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Au(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}constructor(e,t,n,s,i,r,o){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=r,this.documentState=o}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{constructor(e,t=null,n=[],s=[],i=null,r=null,o=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=r,this.endAt=o,this.ft=null}}function Du(e,t=null,n=[],s=[],i=null,r=null,o=null){return new Nu(e,t,n,s,i,r,o)}function Ru(e){const t=ja(e);if(null===t.ft){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((e=>au(e))).join(","),e+="|ob:",e+=t.orderBy.map((e=>{return(t=e).field.canonicalString()+t.dir;var t})).join(","),Sc(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((e=>Kc(e))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((e=>Kc(e))).join(",")),t.ft=e}return t.ft}function Ou(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!wu(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!cu(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!eu(e.startAt,t.startAt)&&eu(e.endAt,t.endAt)}function Lu(e){return cc.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pu{constructor(e,t=null,n=[],s=[],i=null,r="F",o=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=r,this.startAt=o,this.endAt=a,this.dt=null,this._t=null,this.startAt,this.endAt}}function Mu(e,t,n,s,i,r,o,a){return new Pu(e,t,n,s,i,r,o,a)}function xu(e){return new Pu(e)}function Uu(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function Fu(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function Vu(e){for(const t of e.filters){const e=t.getFirstInequalityField();if(null!==e)return e}return null}function ju(e){return null!==e.collectionGroup}function Bu(e){const t=ja(e);if(null===t.dt){t.dt=[];const e=Vu(t),n=Fu(t);if(null!==e&&null===n)e.isKeyField()||t.dt.push(new vu(e)),t.dt.push(new vu(ac.keyField(),"asc"));else{let e=!1;for(const n of t.explicitOrderBy)t.dt.push(n),n.field.isKeyField()&&(e=!0);if(!e){const e=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";t.dt.push(new vu(ac.keyField(),e))}}}return t.dt}function qu(e){const t=ja(e);if(!t._t)if("F"===t.limitType)t._t=Du(t.path,t.collectionGroup,Bu(t),t.filters,t.limit,t.startAt,t.endAt);else{const e=[];for(const n of Bu(t)){const t="desc"===n.dir?"asc":"desc";e.push(new vu(n.field,t))}const n=t.endAt?new Yc(t.endAt.position,t.endAt.inclusive):null,s=t.startAt?new Yc(t.startAt.position,t.startAt.inclusive):null;t._t=Du(t.path,t.collectionGroup,e,t.filters,t.limit,n,s)}return t._t}function Ku(e,t,n){return new Pu(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function Hu(e,t){return Ou(qu(e),qu(t))&&e.limitType===t.limitType}function zu(e){return`${Ru(qu(e))}|lt:${e.limitType}`}function $u(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map((e=>uu(e))).join(", ")}]`),Sc(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map((e=>{return`${(t=e).field.canonicalString()} (${t.dir})`;var t})).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((e=>Kc(e))).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((e=>Kc(e))).join(",")),`Target(${t})`}(qu(e))}; limitType=${e.limitType})`}function Gu(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):cc.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of Bu(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(s=t,!((n=e).startAt&&!function(e,t,n){const s=Zc(e,t,n);return e.inclusive?s<=0:s<0}(n.startAt,Bu(n),s)||n.endAt&&!function(e,t,n){const s=Zc(e,t,n);return e.inclusive?s>=0:s>0}(n.endAt,Bu(n),s)));var n,s}function Wu(e){return e.collectionGroup||(e.path.length%2==1?e.path.lastSegment():e.path.get(e.path.length-2))}function Qu(e){return(t,n)=>{let s=!1;for(const i of Bu(e)){const e=Xu(i,t,n);if(0!==e)return e;s=s||i.field.isKeyField()}return 0}}function Xu(e,t,n){const s=e.field.isKeyField()?cc.comparator(t.key,n.key):function(e,t,n){const s=t.data.field(e),i=n.data.field(e);return null!==s&&null!==i?Bc(s,i):Fa()}(e.field,t,n);switch(e.dir){case"asc":return s;case"desc":return-1*s;default:return Fa()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ju(e,t){if(e.wt){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:kc(t)?"-0":t}}function Yu(e){return{integerValue:""+e}}function Zu(e,t){return Cc(t)?Yu(t):Ju(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(){this._=void 0}}function th(e,t,n){return e instanceof ih?rh(e,t):e instanceof oh?ah(e,t):n}function nh(e,t){var n,s;return e instanceof ch?zc(n=t)||(s=n)&&"doubleValue"in s?t:{integerValue:0}:null}class sh extends eh{}class ih extends eh{constructor(e){super(),this.elements=e}}function rh(e,t){const n=hh(t);for(const t of e.elements)n.some((e=>Vc(e,t)))||n.push(t);return{arrayValue:{values:n}}}class oh extends eh{constructor(e){super(),this.elements=e}}function ah(e,t){let n=hh(t);for(const t of e.elements)n=n.filter((e=>!Vc(e,t)));return{arrayValue:{values:n}}}class ch extends eh{constructor(e,t){super(),this.yt=e,this.gt=t}}function uh(e){return Oc(e.integerValue||e.doubleValue)}function hh(e){return $c(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(e,t){this.version=e,this.transformResults=t}}class dh{static none(){return new dh}static exists(e){return new dh(void 0,e)}static updateTime(e){return new dh(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}constructor(e,t){this.updateTime=e,this.exists=t}}function fh(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class ph{}function gh(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new Sh(e.key,dh.none()):new Th(e.key,e.data,dh.none());{const n=e.data,s=ku.empty();let i=new Iu(ac.comparator);for(let e of t.fields)if(!i.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?s.delete(e):s.set(e,t),i=i.add(e)}return new bh(e.key,s,new Su(i.toArray()),dh.none())}}function mh(e,t,n){var s;e instanceof Th?function(e,t,n){const s=e.value.clone(),i=Ih(e.fieldTransforms,t,n.transformResults);s.setAll(i),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(e,t,n):e instanceof bh?function(e,t,n){if(!fh(e.precondition,t))return void t.convertToUnknownDocument(n.version);const s=Ih(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(Eh(e)),i.setAll(s),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):(s=n,t.convertToNoDocument(s.version).setHasCommittedMutations())}function yh(e,t,n,s){return e instanceof Th?function(e,t,n,s){if(!fh(e.precondition,t))return n;const i=e.value.clone(),r=_h(e.fieldTransforms,s,t);return i.setAll(r),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null}(e,t,n,s):e instanceof bh?function(e,t,n,s){if(!fh(e.precondition,t))return n;const i=_h(e.fieldTransforms,s,t),r=t.data;return r.setAll(Eh(e)),r.setAll(i),t.convertToFoundDocument(t.version,r).setHasLocalMutations(),null===n?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map((e=>e.field)))}(e,t,n,s):(i=t,r=n,fh(e.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):r);var i,r}function vh(e,t){let n=null;for(const s of e.fieldTransforms){const e=t.data.field(s.field),i=nh(s.transform,e||null);null!=i&&(null===n&&(n=ku.empty()),n.set(s.field,i))}return n||null}function wh(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,s=t.fieldTransforms,!!(void 0===n&&void 0===s||n&&s&&tc(n,s,((e,t)=>function(e,t){return e.field.isEqual(t.field)&&(n=e.transform,s=t.transform,n instanceof ih&&s instanceof ih||n instanceof oh&&s instanceof oh?tc(n.elements,s.elements,Vc):n instanceof ch&&s instanceof ch?Vc(n.gt,s.gt):n instanceof sh&&s instanceof sh);var n,s}(e,t)))))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask));var n,s}class Th extends ph{getFieldMask(){return null}constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}}class bh extends ph{getFieldMask(){return this.fieldMask}constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}}function Eh(e){const t=new Map;return e.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const s=e.data.field(n);t.set(n,s)}})),t}function Ih(e,t,n){const s=new Map;Va(e.length===n.length);for(let i=0;i<n.length;i++){const r=e[i],o=r.transform,a=t.data.field(r.field);s.set(r.field,th(o,a,n[i]))}return s}function _h(e,t,n){const s=new Map;for(const a of e){const e=a.transform,c=n.data.field(a.field);s.set(a.field,(r=c,o=t,(i=e)instanceof sh?function(e,t){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&(n.fields.__previous_value__=t),{mapValue:n}}(o,r):i instanceof ih?rh(i,r):i instanceof oh?ah(i,r):function(e,t){const n=nh(e,t),s=uh(n)+uh(e.gt);return zc(n)&&zc(e.gt)?Yu(s):Ju(e.yt,s)}(i,r)))}var i,r,o;return s}class Sh extends ph{getFieldMask(){return null}constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}}class kh extends ph{getFieldMask(){return null}constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ch{constructor(e){this.count=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ah,Nh;function Dh(e){switch(e){default:return Fa();case Ba.CANCELLED:case Ba.UNKNOWN:case Ba.DEADLINE_EXCEEDED:case Ba.RESOURCE_EXHAUSTED:case Ba.INTERNAL:case Ba.UNAVAILABLE:case Ba.UNAUTHENTICATED:return!1;case Ba.INVALID_ARGUMENT:case Ba.NOT_FOUND:case Ba.ALREADY_EXISTS:case Ba.PERMISSION_DENIED:case Ba.FAILED_PRECONDITION:case Ba.ABORTED:case Ba.OUT_OF_RANGE:case Ba.UNIMPLEMENTED:case Ba.DATA_LOSS:return!0}}function Rh(e){if(void 0===e)return Ma("GRPC error has no .code"),Ba.UNKNOWN;switch(e){case Ah.OK:return Ba.OK;case Ah.CANCELLED:return Ba.CANCELLED;case Ah.UNKNOWN:return Ba.UNKNOWN;case Ah.DEADLINE_EXCEEDED:return Ba.DEADLINE_EXCEEDED;case Ah.RESOURCE_EXHAUSTED:return Ba.RESOURCE_EXHAUSTED;case Ah.INTERNAL:return Ba.INTERNAL;case Ah.UNAVAILABLE:return Ba.UNAVAILABLE;case Ah.UNAUTHENTICATED:return Ba.UNAUTHENTICATED;case Ah.INVALID_ARGUMENT:return Ba.INVALID_ARGUMENT;case Ah.NOT_FOUND:return Ba.NOT_FOUND;case Ah.ALREADY_EXISTS:return Ba.ALREADY_EXISTS;case Ah.PERMISSION_DENIED:return Ba.PERMISSION_DENIED;case Ah.FAILED_PRECONDITION:return Ba.FAILED_PRECONDITION;case Ah.ABORTED:return Ba.ABORTED;case Ah.OUT_OF_RANGE:return Ba.OUT_OF_RANGE;case Ah.UNIMPLEMENTED:return Ba.UNIMPLEMENTED;case Ah.DATA_LOSS:return Ba.DATA_LOSS;default:return Fa()}}(Nh=Ah||(Ah={}))[Nh.OK=0]="OK",Nh[Nh.CANCELLED=1]="CANCELLED",Nh[Nh.UNKNOWN=2]="UNKNOWN",Nh[Nh.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Nh[Nh.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Nh[Nh.NOT_FOUND=5]="NOT_FOUND",Nh[Nh.ALREADY_EXISTS=6]="ALREADY_EXISTS",Nh[Nh.PERMISSION_DENIED=7]="PERMISSION_DENIED",Nh[Nh.UNAUTHENTICATED=16]="UNAUTHENTICATED",Nh[Nh.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Nh[Nh.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Nh[Nh.ABORTED=10]="ABORTED",Nh[Nh.OUT_OF_RANGE=11]="OUT_OF_RANGE",Nh[Nh.UNIMPLEMENTED=12]="UNIMPLEMENTED",Nh[Nh.INTERNAL=13]="INTERNAL",Nh[Nh.UNAVAILABLE=14]="UNAVAILABLE",Nh[Nh.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Oh{get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[t,s]of n)if(this.equalsFn(t,e))return s}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(void 0===s)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<s.length;n++)if(this.equalsFn(s[n][0],e))return void(s[n]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return 1===n.length?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Ic(this.inner,((t,n)=>{for(const[t,s]of n)e(t,s)}))}isEmpty(){return _c(this.inner)}size(){return this.innerSize}constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lh=new Tu(cc.comparator);function Ph(){return Lh}const Mh=new Tu(cc.comparator);function xh(...e){let t=Mh;for(const n of e)t=t.insert(n.key,n);return t}function Uh(e){let t=Mh;return e.forEach(((e,n)=>t=t.insert(e,n.overlayedDocument))),t}function Fh(){return jh()}function Vh(){return jh()}function jh(){return new Oh((e=>e.toString()),((e,t)=>e.isEqual(t)))}const Bh=new Tu(cc.comparator),qh=new Iu(cc.comparator);function Kh(...e){let t=qh;for(const n of e)t=t.add(n);return t}const Hh=new Iu(ec);function zh(){return Hh}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h{static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Gh.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new $h(sc.min(),s,zh(),Ph(),Kh())}constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}}class Gh{static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Gh(n,t,Kh(),Kh(),Kh())}constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wh{constructor(e,t,n,s){this.It=e,this.removedTargetIds=t,this.key=n,this.Tt=s}}class Qh{constructor(e,t){this.targetId=e,this.Et=t}}class Xh{constructor(e,t,n=Nc.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class Jh{get current(){return this.Pt}get resumeToken(){return this.bt}get Vt(){return 0!==this.At}get St(){return this.vt}Dt(e){e.approximateByteSize()>0&&(this.vt=!0,this.bt=e)}Ct(){let e=Kh(),t=Kh(),n=Kh();return this.Rt.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:Fa()}})),new Gh(this.bt,this.Pt,e,t,n)}xt(){this.vt=!1,this.Rt=el()}Nt(e,t){this.vt=!0,this.Rt=this.Rt.insert(e,t)}kt(e){this.vt=!0,this.Rt=this.Rt.remove(e)}Ot(){this.At+=1}Mt(){this.At-=1}Ft(){this.vt=!0,this.Pt=!0}constructor(){this.At=0,this.Rt=el(),this.bt=Nc.EMPTY_BYTE_STRING,this.Pt=!1,this.vt=!0}}class Yh{Kt(e){for(const t of e.It)e.Tt&&e.Tt.isFoundDocument()?this.Gt(t,e.Tt):this.Qt(t,e.key,e.Tt);for(const t of e.removedTargetIds)this.Qt(t,e.key,e.Tt)}jt(e){this.forEachTarget(e,(t=>{const n=this.Wt(t);switch(e.state){case 0:this.zt(t)&&n.Dt(e.resumeToken);break;case 1:n.Mt(),n.Vt||n.xt(),n.Dt(e.resumeToken);break;case 2:n.Mt(),n.Vt||this.removeTarget(t);break;case 3:this.zt(t)&&(n.Ft(),n.Dt(e.resumeToken));break;case 4:this.zt(t)&&(this.Ht(t),n.Dt(e.resumeToken));break;default:Fa()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Bt.forEach(((e,n)=>{this.zt(n)&&t(n)}))}Jt(e){const t=e.targetId,n=e.Et.count,s=this.Yt(t);if(s){const e=s.target;if(Lu(e))if(0===n){const n=new cc(e.path);this.Qt(t,n,Au.newNoDocument(n,sc.min()))}else Va(1===n);else this.Xt(t)!==n&&(this.Ht(t),this.Ut=this.Ut.add(t))}}Zt(e){const t=new Map;this.Bt.forEach(((n,s)=>{const i=this.Yt(s);if(i){if(n.current&&Lu(i.target)){const t=new cc(i.target.path);null!==this.Lt.get(t)||this.te(s,t)||this.Qt(s,t,Au.newNoDocument(t,e))}n.St&&(t.set(s,n.Ct()),n.xt())}}));let n=Kh();this.qt.forEach(((e,t)=>{let s=!0;t.forEachWhile((e=>{const t=this.Yt(e);return!t||2===t.purpose||(s=!1,!1)})),s&&(n=n.add(e))})),this.Lt.forEach(((t,n)=>n.setReadTime(e)));const s=new $h(e,t,this.Ut,this.Lt,n);return this.Lt=Ph(),this.qt=Zh(),this.Ut=new Iu(ec),s}Gt(e,t){if(!this.zt(e))return;const n=this.te(e,t.key)?2:0;this.Wt(e).Nt(t.key,n),this.Lt=this.Lt.insert(t.key,t),this.qt=this.qt.insert(t.key,this.ee(t.key).add(e))}Qt(e,t,n){if(!this.zt(e))return;const s=this.Wt(e);this.te(e,t)?s.Nt(t,1):s.kt(t),this.qt=this.qt.insert(t,this.ee(t).delete(e)),n&&(this.Lt=this.Lt.insert(t,n))}removeTarget(e){this.Bt.delete(e)}Xt(e){const t=this.Wt(e).Ct();return this.$t.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ot(e){this.Wt(e).Ot()}Wt(e){let t=this.Bt.get(e);return t||(t=new Jh,this.Bt.set(e,t)),t}ee(e){let t=this.qt.get(e);return t||(t=new Iu(ec),this.qt=this.qt.insert(e,t)),t}zt(e){const t=null!==this.Yt(e);return t||Pa("WatchChangeAggregator","Detected inactive target",e),t}Yt(e){const t=this.Bt.get(e);return t&&t.Vt?null:this.$t.ne(e)}Ht(e){this.Bt.set(e,new Jh),this.$t.getRemoteKeysForTarget(e).forEach((t=>{this.Qt(e,t,null)}))}te(e,t){return this.$t.getRemoteKeysForTarget(e).has(t)}constructor(e){this.$t=e,this.Bt=new Map,this.Lt=Ph(),this.qt=Zh(),this.Ut=new Iu(ec)}}function Zh(){return new Tu(cc.comparator)}function el(){return new Tu(cc.comparator)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl={asc:"ASCENDING",desc:"DESCENDING"},nl={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},sl={and:"AND",or:"OR"};class il{constructor(e,t){this.databaseId=e,this.wt=t}}function rl(e,t){return e.wt?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function ol(e,t){return e.wt?t.toBase64():t.toUint8Array()}function al(e,t){return rl(e,t.toTimestamp())}function cl(e){return Va(!!e),sc.fromTimestamp(function(e){const t=Rc(e);return new nc(t.seconds,t.nanos)}(e))}function ul(e,t){return(n=e,new rc(["projects",n.projectId,"databases",n.database])).child("documents").child(t).canonicalString();var n}function hl(e){const t=rc.fromString(e);return Va(Nl(t)),t}function ll(e,t){return ul(e.databaseId,t.path)}function dl(e,t){const n=hl(t);if(n.get(1)!==e.databaseId.projectId)throw new qa(Ba.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new qa(Ba.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new cc(ml(n))}function fl(e,t){return ul(e.databaseId,t)}function pl(e){const t=hl(e);return 4===t.length?rc.emptyPath():ml(t)}function gl(e){return new rc(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function ml(e){return Va(e.length>4&&"documents"===e.get(4)),e.popFirst(5)}function yl(e,t,n){return{name:ll(e,t),fields:n.value.mapValue.fields}}function vl(e,t){let n;if(t instanceof Th)n={update:yl(e,t.key,t.value)};else if(t instanceof Sh)n={delete:ll(e,t.key)};else if(t instanceof bh)n={update:yl(e,t.key,t.data),updateMask:Al(t.fieldMask)};else{if(!(t instanceof kh))return Fa();n={verify:ll(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map((e=>function(e,t){const n=t.transform;if(n instanceof sh)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof ih)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof oh)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof ch)return{fieldPath:t.field.canonicalString(),increment:n.gt};throw Fa()}(0,e)))),t.precondition.isNone||(n.currentDocument=(s=e,void 0!==(i=t.precondition).updateTime?{updateTime:al(s,i.updateTime)}:void 0!==i.exists?{exists:i.exists}:Fa())),n;var s,i}function wl(e,t){return{documents:[fl(e,t.path)]}}function Tl(e,t){const n={structuredQuery:{}},s=t.path;null!==t.collectionGroup?(n.parent=fl(e,s),n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(n.parent=fl(e,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);const i=function(e){if(0!==e.length)return Cl(su.create(e,"and"))}(t.filters);i&&(n.structuredQuery.where=i);const r=function(e){if(0!==e.length)return e.map((e=>{return{field:Sl((t=e).field),direction:Il(t.dir)};var t}))}(t.orderBy);r&&(n.structuredQuery.orderBy=r);const o=(a=e,c=t.limit,a.wt||Sc(c)?c:{value:c});var a,c,u;return null!==o&&(n.structuredQuery.limit=o),t.startAt&&(n.structuredQuery.startAt={before:(u=t.startAt).inclusive,values:u.position}),t.endAt&&(n.structuredQuery.endAt=function(e){return{before:!e.inclusive,values:e.position}}(t.endAt)),n}function bl(e){let t=pl(e.parent);const n=e.structuredQuery,s=n.from?n.from.length:0;let i=null;if(s>0){Va(1===s);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let r=[];n.where&&(r=function(e){const t=El(e);return t instanceof su&&ru(t)?t.getFilters():[t]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map((e=>{return new vu(kl((t=e).field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(t.direction));var t})));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,Sc(t)?null:t}(n.limit));let c=null;n.startAt&&(c=function(e){const t=!!e.before,n=e.values||[];return new Yc(n,t)}(n.startAt));let u=null;return n.endAt&&(u=function(e){const t=!e.before,n=e.values||[];return new Yc(n,t)}(n.endAt)),Mu(t,i,o,r,a,"F",c,u)}function El(e){return void 0!==e.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":const t=kl(e.unaryFilter.field);return nu.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=kl(e.unaryFilter.field);return nu.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=kl(e.unaryFilter.field);return nu.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=kl(e.unaryFilter.field);return nu.create(i,"!=",{nullValue:"NULL_VALUE"});default:return Fa()}}(e):void 0!==e.fieldFilter?(n=e,nu.create(kl(n.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Fa()}}(n.fieldFilter.op),n.fieldFilter.value)):void 0!==e.compositeFilter?(t=e,su.create(t.compositeFilter.filters.map((e=>El(e))),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return Fa()}}(t.compositeFilter.op))):Fa();var t,n}function Il(e){return tl[e]}function _l(e){return nl[e]}function Sl(e){return{fieldPath:e.canonicalString()}}function kl(e){return ac.fromServerFormat(e.fieldPath)}function Cl(e){return e instanceof nu?function(e){if("=="===e.op){if(Wc(e.value))return{unaryFilter:{field:Sl(e.field),op:"IS_NAN"}};if(Gc(e.value))return{unaryFilter:{field:Sl(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(Wc(e.value))return{unaryFilter:{field:Sl(e.field),op:"IS_NOT_NAN"}};if(Gc(e.value))return{unaryFilter:{field:Sl(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Sl(e.field),op:_l(e.op),value:e.value}}}(e):e instanceof su?function(e){const t=e.getFilters().map((e=>Cl(e)));return 1===t.length?t[0]:{compositeFilter:{op:(n=e.op,sl[n]),filters:t}};var n}(e):Fa()}function Al(e){const t=[];return e.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Nl(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dl=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],Rl=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Ol=Rl;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ll{applyToRemoteDocument(e,t){const n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){const s=this.mutations[t];s.key.isEqual(e.key)&&mh(s,e,n[t])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=yh(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=yh(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Vh();return this.mutations.forEach((s=>{const i=e.get(s.key),r=i.overlayedDocument;let o=this.applyToLocalView(r,i.mutatedFields);o=t.has(s.key)?null:o;const a=gh(r,o);null!==a&&n.set(s.key,a),r.isValidDocument()||r.convertToNoDocument(sc.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Kh())}isEqual(e){return this.batchId===e.batchId&&tc(this.mutations,e.mutations,((e,t)=>wh(e,t)))&&tc(this.baseMutations,e.baseMutations,((e,t)=>wh(e,t)))}constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}}class Pl{static from(e,t,n){Va(e.mutations.length===n.length);let s=Bh;const i=e.mutations;for(let e=0;e<i.length;e++)s=s.insert(i[e].key,n[e].version);return new Pl(e,t,n,s)}constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{\n      largestBatchId: ${this.largestBatchId},\n      mutation: ${this.mutation.toString()}\n    }`}constructor(e,t){this.largestBatchId=e,this.mutation=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{withSequenceNumber(e){return new xl(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new xl(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new xl(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}constructor(e,t,n,s,i=sc.min(),r=sc.min(),o=Nc.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=r,this.resumeToken=o}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ul{constructor(e){this.ie=e}}function Fl(e){const t=bl({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Ku(t,t.limit,"L"):t}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{ue(e,t){this.ce(e,t),t.ae()}ce(e,t){if("nullValue"in e)this.he(t,5);else if("booleanValue"in e)this.he(t,10),t.le(e.booleanValue?1:0);else if("integerValue"in e)this.he(t,15),t.le(Oc(e.integerValue));else if("doubleValue"in e){const n=Oc(e.doubleValue);isNaN(n)?this.he(t,13):(this.he(t,15),kc(n)?t.le(0):t.le(n))}else if("timestampValue"in e){const n=e.timestampValue;this.he(t,20),"string"==typeof n?t.fe(n):(t.fe(`${n.seconds||""}`),t.le(n.nanos||0))}else if("stringValue"in e)this.de(e.stringValue,t),this._e(t);else if("bytesValue"in e)this.he(t,30),t.we(Lc(e.bytesValue)),this._e(t);else if("referenceValue"in e)this.me(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.he(t,45),t.le(n.latitude||0),t.le(n.longitude||0)}else"mapValue"in e?Jc(e)?this.he(t,Number.MAX_SAFE_INTEGER):(this.ge(e.mapValue,t),this._e(t)):"arrayValue"in e?(this.ye(e.arrayValue,t),this._e(t)):Fa()}de(e,t){this.he(t,25),this.pe(e,t)}pe(e,t){t.fe(e)}ge(e,t){const n=e.fields||{};this.he(t,55);for(const e of Object.keys(n))this.de(e,t),this.ce(n[e],t)}ye(e,t){const n=e.values||[];this.he(t,50);for(const e of n)this.ce(e,t)}me(e,t){this.he(t,37),cc.fromName(e).path.forEach((e=>{this.he(t,60),this.pe(e,t)}))}he(e,t){e.le(t)}_e(e){e.le(2)}constructor(){}}Vl.Ie=new Vl;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jl{addToCollectionParentIndex(e,t){return this.Je.add(t),yc.resolve()}getCollectionParents(e,t){return yc.resolve(this.Je.getEntries(t))}addFieldIndex(e,t){return yc.resolve()}deleteFieldIndex(e,t){return yc.resolve()}getDocumentsMatchingTarget(e,t){return yc.resolve(null)}getIndexType(e,t){return yc.resolve(0)}getFieldIndexes(e,t){return yc.resolve([])}getNextCollectionGroupToUpdate(e){return yc.resolve(null)}getMinOffset(e,t){return yc.resolve(dc.min())}getMinOffsetFromCollectionGroup(e,t){return yc.resolve(dc.min())}updateCollectionGroup(e,t,n){return yc.resolve()}updateIndexEntries(e,t){return yc.resolve()}constructor(){this.Je=new Bl}}class Bl{add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new Iu(rc.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new Iu(rc.comparator)).toArray()}constructor(){this.index={}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Uint8Array(0);class ql{static withCacheSize(e){return new ql(e,ql.DEFAULT_COLLECTION_PERCENTILE,ql.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ql.DEFAULT_COLLECTION_PERCENTILE=10,ql.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ql.DEFAULT=new ql(41943040,ql.DEFAULT_COLLECTION_PERCENTILE,ql.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ql.DISABLED=new ql(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Kl{next(){return this.bn+=2,this.bn}static Pn(){return new Kl(0)}static vn(){return new Kl(-1)}constructor(e){this.bn=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Hl{addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Au.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?yc.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}constructor(){this.changes=new Oh((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zl{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l{getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((e=>(null!==n&&yh(n.mutation,e,Su.empty(),nc.now()),e)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((t=>this.getLocalViewOfDocuments(e,t,Kh()).next((()=>t))))}getLocalViewOfDocuments(e,t,n=Kh()){const s=Fh();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((e=>{let t=xh();return e.forEach(((e,n)=>{t=t.insert(e,n.overlayedDocument)})),t}))))}getOverlayedDocuments(e,t){const n=Fh();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,Kh())))}populateOverlays(e,t,n){const s=[];return n.forEach((e=>{t.has(e)||s.push(e)})),this.documentOverlayCache.getOverlays(e,s).next((e=>{e.forEach(((e,n)=>{t.set(e,n)}))}))}computeViews(e,t,n,s){let i=Ph();const r=jh(),o=jh();return t.forEach(((e,t)=>{const o=n.get(t.key);s.has(t.key)&&(void 0===o||o.mutation instanceof bh)?i=i.insert(t.key,t):void 0!==o&&(r.set(t.key,o.mutation.getFieldMask()),yh(o.mutation,t,o.mutation.getFieldMask(),nc.now()))})),this.recalculateAndSaveOverlays(e,i).next((e=>(e.forEach(((e,t)=>r.set(e,t))),t.forEach(((e,t)=>{var n;return o.set(e,new zl(t,null!==(n=r.get(e))&&void 0!==n?n:null))})),o)))}recalculateAndSaveOverlays(e,t){const n=jh();let s=new Tu(((e,t)=>e-t)),i=Kh();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((e=>{for(const i of e)i.keys().forEach((e=>{const r=t.get(e);if(null===r)return;let o=n.get(e)||Su.empty();o=i.applyToLocalView(r,o),n.set(e,o);const a=(s.get(i.batchId)||Kh()).add(e);s=s.insert(i.batchId,a)}))})).next((()=>{const r=[],o=s.getReverseIterator();for(;o.hasNext();){const s=o.getNext(),a=s.key,c=s.value,u=Vh();c.forEach((e=>{if(!i.has(e)){const s=gh(t.get(e),n.get(e));null!==s&&u.set(e,s),i=i.add(e)}})),r.push(this.documentOverlayCache.saveOverlays(e,a,u))}return yc.waitFor(r)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((t=>this.recalculateAndSaveOverlays(e,t)))}getDocumentsMatchingQuery(e,t,n){return s=t,cc.isDocumentKey(s.path)&&null===s.collectionGroup&&0===s.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):ju(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n):this.getDocumentsMatchingCollectionQuery(e,t,n);var s}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{const r=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):yc.resolve(Fh());let o=-1,a=i;return r.next((t=>yc.forEach(t,((t,n)=>(o<n.largestBatchId&&(o=n.largestBatchId),i.get(t)?yc.resolve():this.remoteDocumentCache.getEntry(e,t).next((e=>{a=a.insert(t,e)}))))).next((()=>this.populateOverlays(e,t,i))).next((()=>this.computeViews(e,a,t,Kh()))).next((e=>({batchId:o,changes:Uh(e)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new cc(t)).next((e=>{let t=xh();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t}))}getDocumentsMatchingCollectionGroupQuery(e,t,n){const s=t.collectionGroup;let i=xh();return this.indexManager.getCollectionParents(e,s).next((r=>yc.forEach(r,(r=>{const o=(a=t,c=r.child(s),new Pu(c,null,a.explicitOrderBy.slice(),a.filters.slice(),a.limit,a.limitType,a.startAt,a.endAt));var a,c;return this.getDocumentsMatchingCollectionQuery(e,o,n).next((e=>{e.forEach(((e,t)=>{i=i.insert(e,t)}))}))})).next((()=>i))))}getDocumentsMatchingCollectionQuery(e,t,n){let s;return this.remoteDocumentCache.getAllFromCollection(e,t.path,n).next((i=>(s=i,this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId)))).next((e=>{e.forEach(((e,t)=>{const n=t.getKey();null===s.get(n)&&(s=s.insert(n,Au.newInvalidDocument(n)))}));let n=xh();return s.forEach(((s,i)=>{const r=e.get(s);void 0!==r&&yh(r.mutation,i,Su.empty(),nc.now()),Gu(t,i)&&(n=n.insert(s,i))})),n}))}constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{getBundleMetadata(e,t){return yc.resolve(this.Zn.get(t))}saveBundleMetadata(e,t){var n;return this.Zn.set(t.id,{id:(n=t).id,version:n.version,createTime:cl(n.createTime)}),yc.resolve()}getNamedQuery(e,t){return yc.resolve(this.ts.get(t))}saveNamedQuery(e,t){return this.ts.set(t.name,{name:(n=t).name,query:Fl(n.bundledQuery),readTime:cl(n.readTime)}),yc.resolve();var n}constructor(e){this.yt=e,this.Zn=new Map,this.ts=new Map}}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{getOverlay(e,t){return yc.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Fh();return yc.forEach(t,(t=>this.getOverlay(e,t).next((e=>{null!==e&&n.set(t,e)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((n,s)=>{this.oe(e,t,s)})),yc.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.es.get(n);return void 0!==s&&(s.forEach((e=>this.overlays=this.overlays.remove(e))),this.es.delete(n)),yc.resolve()}getOverlaysForCollection(e,t,n){const s=Fh(),i=t.length+1,r=new cc(t.child("")),o=this.overlays.getIteratorFrom(r);for(;o.hasNext();){const e=o.getNext().value,r=e.getKey();if(!t.isPrefixOf(r.path))break;r.path.length===i&&e.largestBatchId>n&&s.set(e.getKey(),e)}return yc.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new Tu(((e,t)=>e-t));const r=this.overlays.getIterator();for(;r.hasNext();){const e=r.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=i.get(e.largestBatchId);null===t&&(t=Fh(),i=i.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}const o=Fh(),a=i.getIterator();for(;a.hasNext()&&(a.getNext().value.forEach(((e,t)=>o.set(e,t))),!(o.size()>=s)););return yc.resolve(o)}oe(e,t,n){const s=this.overlays.get(n.key);if(null!==s){const e=this.es.get(s.largestBatchId).delete(n.key);this.es.set(s.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new Ml(t,n));let i=this.es.get(t);void 0===i&&(i=Kh(),this.es.set(t,i)),this.es.set(t,i.add(n.key))}constructor(){this.overlays=new Tu(cc.comparator),this.es=new Map}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql{isEmpty(){return this.ns.isEmpty()}addReference(e,t){const n=new Xl(e,t);this.ns=this.ns.add(n),this.rs=this.rs.add(n)}us(e,t){e.forEach((e=>this.addReference(e,t)))}removeReference(e,t){this.cs(new Xl(e,t))}hs(e,t){e.forEach((e=>this.removeReference(e,t)))}ls(e){const t=new cc(new rc([])),n=new Xl(t,e),s=new Xl(t,e+1),i=[];return this.rs.forEachInRange([n,s],(e=>{this.cs(e),i.push(e.key)})),i}fs(){this.ns.forEach((e=>this.cs(e)))}cs(e){this.ns=this.ns.delete(e),this.rs=this.rs.delete(e)}ds(e){const t=new cc(new rc([])),n=new Xl(t,e),s=new Xl(t,e+1);let i=Kh();return this.rs.forEachInRange([n,s],(e=>{i=i.add(e.key)})),i}containsKey(e){const t=new Xl(e,0),n=this.ns.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}constructor(){this.ns=new Iu(Xl.ss),this.rs=new Iu(Xl.os)}}class Xl{static ss(e,t){return cc.comparator(e.key,t.key)||ec(e._s,t._s)}static os(e,t){return ec(e._s,t._s)||cc.comparator(e.key,t.key)}constructor(e,t){this.key=e,this._s=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{checkEmpty(e){return yc.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,s){const i=this.ws;this.ws++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const r=new Ll(i,t,n,s);this.mutationQueue.push(r);for(const t of s)this.gs=this.gs.add(new Xl(t.key,i)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return yc.resolve(r)}lookupMutationBatch(e,t){return yc.resolve(this.ys(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.ps(n),i=s<0?0:s;return yc.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return yc.resolve(0===this.mutationQueue.length?-1:this.ws-1)}getAllMutationBatches(e){return yc.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Xl(t,0),s=new Xl(t,Number.POSITIVE_INFINITY),i=[];return this.gs.forEachInRange([n,s],(e=>{const t=this.ys(e._s);i.push(t)})),yc.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Iu(ec);return t.forEach((e=>{const t=new Xl(e,0),s=new Xl(e,Number.POSITIVE_INFINITY);this.gs.forEachInRange([t,s],(e=>{n=n.add(e._s)}))})),yc.resolve(this.Is(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;cc.isDocumentKey(i)||(i=i.child(""));const r=new Xl(new cc(i),0);let o=new Iu(ec);return this.gs.forEachWhile((e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===s&&(o=o.add(e._s)),!0)}),r),yc.resolve(this.Is(o))}Is(e){const t=[];return e.forEach((e=>{const n=this.ys(e);null!==n&&t.push(n)})),t}removeMutationBatch(e,t){Va(0===this.Ts(t.batchId,"removed")),this.mutationQueue.shift();let n=this.gs;return yc.forEach(t.mutations,(s=>{const i=new Xl(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.gs=n}))}An(e){}containsKey(e,t){const n=new Xl(t,0),s=this.gs.firstAfterOrEqual(n);return yc.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,yc.resolve()}Ts(e,t){return this.ps(e)}ps(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}ys(e){const t=this.ps(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.ws=1,this.gs=new Iu(Xl.ss)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,r=this.Es(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:r}),this.size+=r-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return yc.resolve(n?n.document.mutableCopy():Au.newInvalidDocument(t))}getEntries(e,t){let n=Ph();return t.forEach((e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():Au.newInvalidDocument(e))})),yc.resolve(n)}getAllFromCollection(e,t,n){let s=Ph();const i=new cc(t.child("")),r=this.docs.getIteratorFrom(i);for(;r.hasNext();){const{key:e,value:{document:i}}=r.getNext();if(!t.isPrefixOf(e.path))break;e.path.length>t.length+1||fc(lc(i),n)<=0||(s=s.insert(i.key,i.mutableCopy()))}return yc.resolve(s)}getAllFromCollectionGroup(e,t,n,s){Fa()}As(e,t){return yc.forEach(this.docs,(e=>t(e)))}newChangeBuffer(e){return new Zl(this)}getSize(e){return yc.resolve(this.size)}constructor(e){this.Es=e,this.docs=new Tu(cc.comparator),this.size=0}}class Zl extends Hl{applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.Yn.addEntry(e,s)):this.Yn.removeEntry(n)})),yc.waitFor(t)}getFromCache(e,t){return this.Yn.getEntry(e,t)}getAllFromCache(e,t){return this.Yn.getEntries(e,t)}constructor(e){super(),this.Yn=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed{forEachTarget(e,t){return this.Rs.forEach(((e,n)=>t(n))),yc.resolve()}getLastRemoteSnapshotVersion(e){return yc.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return yc.resolve(this.bs)}allocateTargetId(e){return this.highestTargetId=this.vs.next(),yc.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.bs&&(this.bs=t),yc.resolve()}Dn(e){this.Rs.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.vs=new Kl(t),this.highestTargetId=t),e.sequenceNumber>this.bs&&(this.bs=e.sequenceNumber)}addTargetData(e,t){return this.Dn(t),this.targetCount+=1,yc.resolve()}updateTargetData(e,t){return this.Dn(t),yc.resolve()}removeTargetData(e,t){return this.Rs.delete(t.target),this.Ps.ls(t.targetId),this.targetCount-=1,yc.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.Rs.forEach(((r,o)=>{o.sequenceNumber<=t&&null===n.get(o.targetId)&&(this.Rs.delete(r),i.push(this.removeMatchingKeysForTargetId(e,o.targetId)),s++)})),yc.waitFor(i).next((()=>s))}getTargetCount(e){return yc.resolve(this.targetCount)}getTargetData(e,t){const n=this.Rs.get(t)||null;return yc.resolve(n)}addMatchingKeys(e,t,n){return this.Ps.us(t,n),yc.resolve()}removeMatchingKeys(e,t,n){this.Ps.hs(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((t=>{i.push(s.markPotentiallyOrphaned(e,t))})),yc.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Ps.ls(t),yc.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Ps.ds(t);return yc.resolve(n)}containsKey(e,t){return yc.resolve(this.Ps.containsKey(t))}constructor(e){this.persistence=e,this.Rs=new Oh((e=>Ru(e)),Ou),this.lastRemoteSnapshotVersion=sc.min(),this.highestTargetId=0,this.bs=0,this.Ps=new Ql,this.targetCount=0,this.vs=Kl.Pn()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td{start(){return Promise.resolve()}shutdown(){return this.Ds=!1,Promise.resolve()}get started(){return this.Ds}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Wl,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.Vs[e.toKey()];return n||(n=new Jl(t,this.referenceDelegate),this.Vs[e.toKey()]=n),n}getTargetCache(){return this.Cs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ns}runTransaction(e,t,n){Pa("MemoryPersistence","Starting transaction:",e);const s=new nd(this.Ss.next());return this.referenceDelegate.ks(),n(s).next((e=>this.referenceDelegate.Os(s).next((()=>e)))).toPromise().then((e=>(s.raiseOnCommittedEvent(),e)))}Ms(e,t){return yc.or(Object.values(this.Vs).map((n=>()=>n.containsKey(e,t))))}constructor(e,t){this.Vs={},this.overlays={},this.Ss=new wc(0),this.Ds=!1,this.Ds=!0,this.referenceDelegate=e(this),this.Cs=new ed(this),this.indexManager=new jl,this.remoteDocumentCache=new Yl((e=>this.referenceDelegate.xs(e))),this.yt=new Ul(t),this.Ns=new Gl(this.yt)}}class nd extends gc{constructor(e){super(),this.currentSequenceNumber=e}}class sd{static Bs(e){return new sd(e)}get Ls(){if(this.$s)return this.$s;throw Fa()}addReference(e,t,n){return this.Fs.addReference(n,t),this.Ls.delete(n.toString()),yc.resolve()}removeReference(e,t,n){return this.Fs.removeReference(n,t),this.Ls.add(n.toString()),yc.resolve()}markPotentiallyOrphaned(e,t){return this.Ls.add(t.toString()),yc.resolve()}removeTarget(e,t){this.Fs.ls(t.targetId).forEach((e=>this.Ls.add(e.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((e=>{e.forEach((e=>this.Ls.add(e.toString())))})).next((()=>n.removeTargetData(e,t)))}ks(){this.$s=new Set}Os(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return yc.forEach(this.Ls,(n=>{const s=cc.fromPath(n);return this.qs(e,s).next((e=>{e||t.removeEntry(s,sc.min())}))})).next((()=>(this.$s=null,t.apply(e))))}updateLimboDocument(e,t){return this.qs(e,t).next((e=>{e?this.Ls.delete(t.toString()):this.Ls.add(t.toString())}))}xs(e){return 0}qs(e,t){return yc.or([()=>yc.resolve(this.Fs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ms(e,t)])}constructor(e){this.persistence=e,this.Fs=new Ql,this.$s=null}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class id{static Ci(e,t){let n=Kh(),s=Kh();for(const e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:s=s.add(e.doc.key)}return new id(e,t.fromCache,n,s)}constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Si=n,this.Di=s}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rd{initialize(e,t){this.Ni=e,this.indexManager=t,this.xi=!0}getDocumentsMatchingQuery(e,t,n,s){return this.ki(e,t).next((i=>i||this.Oi(e,t,s,n))).next((n=>n||this.Mi(e,t)))}ki(e,t){if(Uu(t))return yc.resolve(null);let n=qu(t);return this.indexManager.getIndexType(e,n).next((s=>0===s?null:(null!==t.limit&&1===s&&(t=Ku(t,null,"F"),n=qu(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((s=>{const i=Kh(...s);return this.Ni.getDocuments(e,i).next((s=>this.indexManager.getMinOffset(e,n).next((n=>{const r=this.Fi(t,s);return this.$i(t,r,i,n.readTime)?this.ki(e,Ku(t,null,"F")):this.Bi(e,r,t,n)}))))})))))}Oi(e,t,n,s){return Uu(t)||s.isEqual(sc.min())?this.Mi(e,t):this.Ni.getDocuments(e,n).next((i=>{const r=this.Fi(t,i);return this.$i(t,r,n,s)?this.Mi(e,t):(La()<=W.DEBUG&&Pa("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),$u(t)),this.Bi(e,r,t,hc(s,-1)))}))}Fi(e,t){let n=new Iu(Qu(e));return t.forEach(((t,s)=>{Gu(e,s)&&(n=n.add(s))})),n}$i(e,t,n,s){if(null===e.limit)return!1;if(n.size!==t.size)return!0;const i="F"===e.limitType?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Mi(e,t){return La()<=W.DEBUG&&Pa("QueryEngine","Using full collection scan to execute query:",$u(t)),this.Ni.getDocumentsMatchingQuery(e,t,dc.min())}Bi(e,t,n,s){return this.Ni.getDocumentsMatchingQuery(e,n,s).next((e=>(t.forEach((t=>{e=e.insert(t.key,t)})),e)))}constructor(){this.xi=!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{Qi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new $l(this.Gi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Gi.setIndexManager(this.indexManager),this.Li.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.qi)))}constructor(e,t,n,s){this.persistence=e,this.Li=t,this.yt=s,this.qi=new Tu(ec),this.Ui=new Oh((e=>Ru(e)),Ou),this.Ki=new Map,this.Gi=e.getRemoteDocumentCache(),this.Cs=e.getTargetCache(),this.Ns=e.getBundleCache(),this.Qi(n)}}function ad(e,t,n,s){return new od(e,t,n,s)}async function cd(e,t){const n=ja(e);return await n.persistence.runTransaction("Handle user change","readonly",(e=>{let s;return n.mutationQueue.getAllMutationBatches(e).next((i=>(s=i,n.Qi(t),n.mutationQueue.getAllMutationBatches(e)))).next((t=>{const i=[],r=[];let o=Kh();for(const e of s){i.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}for(const e of t){r.push(e.batchId);for(const t of e.mutations)o=o.add(t.key)}return n.localDocuments.getDocuments(e,o).next((e=>({ji:e,removedBatchIds:i,addedBatchIds:r})))}))}))}function ud(e){const t=ja(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.Cs.getLastRemoteSnapshotVersion(e)))}function hd(e,t,n){let s=Kh(),i=Kh();return n.forEach((e=>s=s.add(e))),t.getEntries(e,s).next((e=>{let s=Ph();return n.forEach(((n,r)=>{const o=e.get(n);r.isFoundDocument()!==o.isFoundDocument()&&(i=i.add(n)),r.isNoDocument()&&r.version.isEqual(sc.min())?(t.removeEntry(n,r.readTime),s=s.insert(n,r)):!o.isValidDocument()||r.version.compareTo(o.version)>0||0===r.version.compareTo(o.version)&&o.hasPendingWrites?(t.addEntry(r),s=s.insert(n,r)):Pa("LocalStore","Ignoring outdated watch update for ",n,". Current version:",o.version," Watch version:",r.version)})),{Wi:s,zi:i}}))}function ld(e,t){const n=ja(e);return n.persistence.runTransaction("Get next mutation batch","readonly",(e=>(void 0===t&&(t=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(e,t))))}function dd(e,t){const n=ja(e);return n.persistence.runTransaction("Allocate target","readwrite",(e=>{let s;return n.Cs.getTargetData(e,t).next((i=>i?(s=i,yc.resolve(s)):n.Cs.allocateTargetId(e).next((i=>(s=new xl(t,i,0,e.currentSequenceNumber),n.Cs.addTargetData(e,s).next((()=>s)))))))})).then((e=>{const s=n.qi.get(e.targetId);return(null===s||e.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.qi=n.qi.insert(e.targetId,e),n.Ui.set(t,e.targetId)),e}))}async function fd(e,t,n){const s=ja(e),i=s.qi.get(t),r=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",r,(e=>s.persistence.referenceDelegate.removeTarget(e,i)))}catch(e){if(!vc(e))throw e;Pa("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}s.qi=s.qi.remove(t),s.Ui.delete(i.target)}function pd(e,t,n){const s=ja(e);let i=sc.min(),r=Kh();return s.persistence.runTransaction("Execute query","readonly",(e=>function(e,t,n){const s=ja(e),i=s.Ui.get(n);return void 0!==i?yc.resolve(s.qi.get(i)):s.Cs.getTargetData(t,n)}(s,e,qu(t)).next((t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,s.Cs.getMatchingKeysForTargetId(e,t.targetId).next((e=>{r=e}))})).next((()=>s.Li.getDocumentsMatchingQuery(e,t,n?i:sc.min(),n?r:Kh()))).next((e=>(gd(s,Wu(t),e),{documents:e,Hi:r})))))}function gd(e,t,n){let s=e.Ki.get(t)||sc.min();n.forEach(((e,t)=>{t.readTime.compareTo(s)>0&&(s=t.readTime)})),e.Ki.set(t,s)}class md{er(e){this.activeTargetIds=this.activeTargetIds.add(e)}nr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}constructor(){this.activeTargetIds=zh()}}class yd{addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e){return this.Lr.er(e),this.qr[e]||"not-current"}updateQueryState(e,t,n){this.qr[e]=t}removeLocalQueryTarget(e){this.Lr.nr(e)}isLocalQueryTarget(e){return this.Lr.activeTargetIds.has(e)}clearQueryState(e){delete this.qr[e]}getAllActiveQueryTargets(){return this.Lr.activeTargetIds}isActiveQueryTarget(e){return this.Lr.activeTargetIds.has(e)}start(){return this.Lr=new md,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}constructor(){this.Lr=new md,this.qr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{Ur(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd{Ur(e){this.Wr.push(e)}shutdown(){window.removeEventListener("online",this.Kr),window.removeEventListener("offline",this.Qr)}zr(){window.addEventListener("online",this.Kr),window.addEventListener("offline",this.Qr)}Gr(){Pa("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.Wr)e(0)}jr(){Pa("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.Wr)e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}constructor(){this.Kr=()=>this.Gr(),this.Qr=()=>this.jr(),this.Wr=[],this.zr()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Td={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{Yr(e){this.Xr=e}Zr(e){this.eo=e}onMessage(e){this.no=e}close(){this.Jr()}send(e){this.Hr(e)}so(){this.Xr()}io(e){this.eo(e)}ro(e){this.no(e)}constructor(e){this.Hr=e.Hr,this.Jr=e.Jr}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed extends class{get co(){return!1}ao(e,t,n,s,i){const r=this.ho(e,t);Pa("RestConnection","Sending: ",r,n);const o={};return this.lo(o,s,i),this.fo(e,r,o,n).then((e=>(Pa("RestConnection","Received: ",e),e)),(t=>{throw xa("RestConnection",`${e} failed with error: `,t,"url: ",r,"request:",n),t}))}_o(e,t,n,s,i,r){return this.ao(e,t,n,s,i)}lo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+Ra,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((t,n)=>e[n]=t)),n&&n.headers.forEach(((t,n)=>e[n]=t))}ho(e,t){const n=Td[e];return`${this.oo}/v1/${t}:${n}`}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http";this.oo=t+"://"+e.host,this.uo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}}{fo(e,t,n,s){return new Promise(((i,r)=>{const o=new Na;o.setWithCredentials(!0),o.listenOnce(_a.COMPLETE,(()=>{try{switch(o.getLastErrorCode()){case Ia.NO_ERROR:const t=o.getResponseJson();Pa("Connection","XHR received:",JSON.stringify(t)),i(t);break;case Ia.TIMEOUT:Pa("Connection",'RPC "'+e+'" timed out'),r(new qa(Ba.DEADLINE_EXCEEDED,"Request time out"));break;case Ia.HTTP_ERROR:const n=o.getStatus();if(Pa("Connection",'RPC "'+e+'" failed with status:',n,"response text:",o.getResponseText()),n>0){let e=o.getResponseJson();Array.isArray(e)&&(e=e[0]);const t=null==e?void 0:e.error;if(t&&t.status&&t.message){const e=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(Ba).indexOf(t)>=0?t:Ba.UNKNOWN}(t.status);r(new qa(e,t.message))}else r(new qa(Ba.UNKNOWN,"Server responded with status "+o.getStatus()))}else r(new qa(Ba.UNAVAILABLE,"Connection failed."));break;default:Fa()}}finally{Pa("Connection",'RPC "'+e+'" completed.')}}));const a=JSON.stringify(s);o.send(t,"POST",a,n,15)}))}wo(e,t,n){const s=[this.oo,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=ba(),r=Ea(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(o.xmlHttpFactory=new Ca({})),this.lo(o.initMessageHeaders,t,n),o.encodeInitMessageHeaders=!0;const a=s.join("");Pa("Connection","Creating WebChannel: "+a,o);const c=i.createWebChannel(a,o);let u=!1,h=!1;const l=new bd({Hr:e=>{h?Pa("Connection","Not sending because WebChannel is closed:",e):(u||(Pa("Connection","Opening WebChannel transport."),c.open(),u=!0),Pa("Connection","WebChannel sending:",e),c.send(e))},Jr:()=>c.close()}),d=(e,t,n)=>{e.listen(t,(e=>{try{n(e)}catch(e){setTimeout((()=>{throw e}),0)}}))};return d(c,Aa.EventType.OPEN,(()=>{h||Pa("Connection","WebChannel transport opened.")})),d(c,Aa.EventType.CLOSE,(()=>{h||(h=!0,Pa("Connection","WebChannel transport closed"),l.io())})),d(c,Aa.EventType.ERROR,(e=>{h||(h=!0,xa("Connection","WebChannel transport errored:",e),l.io(new qa(Ba.UNAVAILABLE,"The operation could not be completed")))})),d(c,Aa.EventType.MESSAGE,(e=>{var t;if(!h){const n=e.data[0];Va(!!n);const s=n,i=s.error||(null===(t=s[0])||void 0===t?void 0:t.error);if(i){Pa("Connection","WebChannel received error:",i);const e=i.status;let t=function(e){const t=Ah[e];if(void 0!==t)return Rh(t)}(e),n=i.message;void 0===t&&(t=Ba.INTERNAL,n="Unknown error status: "+e+" with message "+i.message),h=!0,l.io(new qa(t,n)),c.close()}else Pa("Connection","WebChannel received:",n),l.ro(n)}})),d(r,Sa.STAT_EVENT,(e=>{e.stat===ka.PROXY?Pa("Connection","Detected buffering proxy"):e.stat===ka.NOPROXY&&Pa("Connection","Detected no buffering proxy")})),setTimeout((()=>{l.so()}),0),l}constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Id(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _d(e){return new il(e,!0)}class Sd{reset(){this.Io=0}Ao(){this.Io=this.po}Ro(e){this.cancel();const t=Math.floor(this.Io+this.bo()),n=Math.max(0,Date.now()-this.Eo),s=Math.max(0,t-n);s>0&&Pa("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Io} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.To=this.Hs.enqueueAfterDelay(this.timerId,s,(()=>(this.Eo=Date.now(),e()))),this.Io*=this.yo,this.Io<this.mo&&(this.Io=this.mo),this.Io>this.po&&(this.Io=this.po)}Po(){null!==this.To&&(this.To.skipDelay(),this.To=null)}cancel(){null!==this.To&&(this.To.cancel(),this.To=null)}bo(){return(Math.random()-.5)*this.Io}constructor(e,t,n=1e3,s=1.5,i=6e4){this.Hs=e,this.timerId=t,this.mo=n,this.yo=s,this.po=i,this.Io=0,this.To=null,this.Eo=Date.now(),this.reset()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{No(){return 1===this.state||5===this.state||this.ko()}ko(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.Oo()}async stop(){this.No()&&await this.close(0)}Mo(){this.state=0,this.xo.reset()}Fo(){this.ko()&&null===this.Do&&(this.Do=this.Hs.enqueueAfterDelay(this.vo,6e4,(()=>this.$o())))}Bo(e){this.Lo(),this.stream.send(e)}async $o(){if(this.ko())return this.close(0)}Lo(){this.Do&&(this.Do.cancel(),this.Do=null)}qo(){this.Co&&(this.Co.cancel(),this.Co=null)}async close(e,t){this.Lo(),this.qo(),this.xo.cancel(),this.So++,4!==e?this.xo.reset():t&&t.code===Ba.RESOURCE_EXHAUSTED?(Ma(t.toString()),Ma("Using maximum backoff delay to prevent overloading the backend."),this.xo.Ao()):t&&t.code===Ba.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.Uo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zr(t)}Uo(){}auth(){this.state=1;const e=this.Ko(this.So),t=this.So;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([e,n])=>{this.So===t&&this.Go(e,n)}),(t=>{e((()=>{const e=new qa(Ba.UNKNOWN,"Fetching auth token failed: "+t.message);return this.Qo(e)}))}))}Go(e,t){const n=this.Ko(this.So);this.stream=this.jo(e,t),this.stream.Yr((()=>{n((()=>(this.state=2,this.Co=this.Hs.enqueueAfterDelay(this.Vo,1e4,(()=>(this.ko()&&(this.state=3),Promise.resolve()))),this.listener.Yr())))})),this.stream.Zr((e=>{n((()=>this.Qo(e)))})),this.stream.onMessage((e=>{n((()=>this.onMessage(e)))}))}Oo(){this.state=5,this.xo.Ro((async()=>{this.state=0,this.start()}))}Qo(e){return Pa("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Ko(e){return t=>{this.Hs.enqueueAndForget((()=>this.So===e?t():(Pa("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}constructor(e,t,n,s,i,r,o,a){this.Hs=e,this.vo=n,this.Vo=s,this.connection=i,this.authCredentialsProvider=r,this.appCheckCredentialsProvider=o,this.listener=a,this.state=0,this.So=0,this.Do=null,this.Co=null,this.stream=null,this.xo=new Sd(e,t)}}class Cd extends kd{jo(e,t){return this.connection.wo("Listen",e,t)}onMessage(e){this.xo.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const i="NO_CHANGE"===(s=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===s?1:"REMOVE"===s?2:"CURRENT"===s?3:"RESET"===s?4:Fa(),r=t.targetChange.targetIds||[],o=function(e,t){return e.wt?(Va(void 0===t||"string"==typeof t),Nc.fromBase64String(t||"")):(Va(void 0===t||t instanceof Uint8Array),Nc.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),a=t.targetChange.cause,c=a&&function(e){const t=void 0===e.code?Ba.UNKNOWN:Rh(e.code);return new qa(t,e.message||"")}(a);n=new Xh(i,r,o,c||null)}else if("documentChange"in t){t.documentChange;const s=t.documentChange;s.document,s.document.name,s.document.updateTime;const i=dl(e,s.document.name),r=cl(s.document.updateTime),o=s.document.createTime?cl(s.document.createTime):sc.min(),a=new ku({mapValue:{fields:s.document.fields}}),c=Au.newFoundDocument(i,r,o,a),u=s.targetIds||[],h=s.removedTargetIds||[];n=new Wh(u,h,c.key,c)}else if("documentDelete"in t){t.documentDelete;const s=t.documentDelete;s.document;const i=dl(e,s.document),r=s.readTime?cl(s.readTime):sc.min(),o=Au.newNoDocument(i,r),a=s.removedTargetIds||[];n=new Wh([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const s=t.documentRemove;s.document;const i=dl(e,s.document),r=s.removedTargetIds||[];n=new Wh([],r,i,null)}else{if(!("filter"in t))return Fa();{t.filter;const e=t.filter;e.targetId;const s=e.count||0,i=new Ch(s),r=e.targetId;n=new Qh(r,i)}}var s;return n}(this.yt,e),n=function(e){if(!("targetChange"in e))return sc.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?sc.min():t.readTime?cl(t.readTime):sc.min()}(e);return this.listener.Wo(t,n)}zo(e){const t={};t.database=gl(this.yt),t.addTarget=function(e,t){let n;const s=t.target;return n=Lu(s)?{documents:wl(e,s)}:{query:Tl(e,s)},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0?n.resumeToken=ol(e,t.resumeToken):t.snapshotVersion.compareTo(sc.min())>0&&(n.readTime=rl(e,t.snapshotVersion.toTimestamp())),n}(this.yt,e);const n=function(e,t){const n=function(e,t){switch(t){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return Fa()}}(0,t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.yt,e);n&&(t.labels=n),this.Bo(t)}Ho(e){const t={};t.database=gl(this.yt),t.removeTarget=e,this.Bo(t)}constructor(e,t,n,s,i,r){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,r),this.yt=i}}class Ad extends kd{get Yo(){return this.Jo}start(){this.Jo=!1,this.lastStreamToken=void 0,super.start()}Uo(){this.Jo&&this.Xo([])}jo(e,t){return this.connection.wo("Write",e,t)}onMessage(e){if(Va(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Jo){this.xo.reset();const s=(t=e.writeResults,n=e.commitTime,t&&t.length>0?(Va(void 0!==n),t.map((e=>function(e,t){let n=e.updateTime?cl(e.updateTime):cl(t);return n.isEqual(sc.min())&&(n=cl(t)),new lh(n,e.transformResults||[])}(e,n)))):[]),i=cl(e.commitTime);return this.listener.Zo(i,s)}var t,n;return Va(!e.writeResults||0===e.writeResults.length),this.Jo=!0,this.listener.tu()}eu(){const e={};e.database=gl(this.yt),this.Bo(e)}Xo(e){const t={streamToken:this.lastStreamToken,writes:e.map((e=>vl(this.yt,e)))};this.Bo(t)}constructor(e,t,n,s,i,r){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,r),this.yt=i,this.Jo=!1}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd extends class{}{su(){if(this.nu)throw new qa(Ba.FAILED_PRECONDITION,"The client has already been terminated.")}ao(e,t,n){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,i])=>this.connection.ao(e,t,n,s,i))).catch((e=>{throw"FirebaseError"===e.name?(e.code===Ba.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new qa(Ba.UNKNOWN,e.toString())}))}_o(e,t,n,s){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,r])=>this.connection._o(e,t,n,i,r,s))).catch((e=>{throw"FirebaseError"===e.name?(e.code===Ba.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new qa(Ba.UNKNOWN,e.toString())}))}terminate(){this.nu=!0}constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.yt=s,this.nu=!1}}class Dd{uu(){0===this.iu&&(this.cu("Unknown"),this.ru=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.ru=null,this.au("Backend didn't respond within 10 seconds."),this.cu("Offline"),Promise.resolve()))))}hu(e){"Online"===this.state?this.cu("Unknown"):(this.iu++,this.iu>=1&&(this.lu(),this.au(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.cu("Offline")))}set(e){this.lu(),this.iu=0,"Online"===e&&(this.ou=!1),this.cu(e)}cu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}au(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ou?(Ma(t),this.ou=!1):Pa("OnlineStateTracker",t)}lu(){null!==this.ru&&(this.ru.cancel(),this.ru=null)}constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.iu=0,this.ru=null,this.ou=!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rd{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.fu=[],this.du=new Map,this._u=new Set,this.wu=[],this.mu=i,this.mu.Ur((e=>{n.enqueueAndForget((async()=>{jd(this)&&(Pa("RemoteStore","Restarting streams for network reachability change."),await async function(e){const t=ja(e);t._u.add(4),await Ld(t),t.gu.set("Unknown"),t._u.delete(4),await Od(t)}(this))}))})),this.gu=new Dd(n,s)}}async function Od(e){if(jd(e))for(const t of e.wu)await t(!0)}async function Ld(e){for(const t of e.wu)await t(!1)}function Pd(e,t){const n=ja(e);n.du.has(t.targetId)||(n.du.set(t.targetId,t),Vd(n)?Fd(n):rf(n).ko()&&xd(n,t))}function Md(e,t){const n=ja(e),s=rf(n);n.du.delete(t),s.ko()&&Ud(n,t),0===n.du.size&&(s.ko()?s.Fo():jd(n)&&n.gu.set("Unknown"))}function xd(e,t){e.yu.Ot(t.targetId),rf(e).zo(t)}function Ud(e,t){e.yu.Ot(t),rf(e).Ho(t)}function Fd(e){e.yu=new Yh({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),ne:t=>e.du.get(t)||null}),rf(e).start(),e.gu.uu()}function Vd(e){return jd(e)&&!rf(e).No()&&e.du.size>0}function jd(e){return 0===ja(e)._u.size}function Bd(e){e.yu=void 0}async function qd(e){e.du.forEach(((t,n)=>{xd(e,t)}))}async function Kd(e,t){Bd(e),Vd(e)?(e.gu.hu(t),Fd(e)):e.gu.set("Unknown")}async function Hd(e,t,n){if(e.gu.set("Online"),t instanceof Xh&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const s of t.targetIds)e.du.has(s)&&(await e.remoteSyncer.rejectListen(s,n),e.du.delete(s),e.yu.removeTarget(s))}(e,t)}catch(n){Pa("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await zd(e,n)}else if(t instanceof Wh?e.yu.Kt(t):t instanceof Qh?e.yu.Jt(t):e.yu.jt(t),!n.isEqual(sc.min()))try{const t=await ud(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.yu.Zt(t);return n.targetChanges.forEach(((n,s)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.du.get(s);i&&e.du.set(s,i.withResumeToken(n.resumeToken,t))}})),n.targetMismatches.forEach((t=>{const n=e.du.get(t);if(!n)return;e.du.set(t,n.withResumeToken(Nc.EMPTY_BYTE_STRING,n.snapshotVersion)),Ud(e,t);const s=new xl(n.target,t,1,n.sequenceNumber);xd(e,s)})),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){Pa("RemoteStore","Failed to raise snapshot:",t),await zd(e,t)}}async function zd(e,t,n){if(!vc(t))throw t;e._u.add(1),await Ld(e),e.gu.set("Offline"),n||(n=()=>ud(e.localStore)),e.asyncQueue.enqueueRetryable((async()=>{Pa("RemoteStore","Retrying IndexedDB access"),await n(),e._u.delete(1),await Od(e)}))}function $d(e,t){return t().catch((n=>zd(e,n,t)))}async function Gd(e){const t=ja(e),n=of(t);let s=t.fu.length>0?t.fu[t.fu.length-1].batchId:-1;for(;Wd(t);)try{const e=await ld(t.localStore,s);if(null===e){0===t.fu.length&&n.Fo();break}s=e.batchId,Qd(t,e)}catch(e){await zd(t,e)}Xd(t)&&Jd(t)}function Wd(e){return jd(e)&&e.fu.length<10}function Qd(e,t){e.fu.push(t);const n=of(e);n.ko()&&n.Yo&&n.Xo(t.mutations)}function Xd(e){return jd(e)&&!of(e).No()&&e.fu.length>0}function Jd(e){of(e).start()}async function Yd(e){of(e).eu()}async function Zd(e){const t=of(e);for(const n of e.fu)t.Xo(n.mutations)}async function ef(e,t,n){const s=e.fu.shift(),i=Pl.from(s,t,n);await $d(e,(()=>e.remoteSyncer.applySuccessfulWrite(i))),await Gd(e)}async function tf(e,t){t&&of(e).Yo&&await async function(e,t){if(Dh(n=t.code)&&n!==Ba.ABORTED){const n=e.fu.shift();of(e).Mo(),await $d(e,(()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t))),await Gd(e)}var n}(e,t),Xd(e)&&Jd(e)}async function nf(e,t){const n=ja(e);n.asyncQueue.verifyOperationInProgress(),Pa("RemoteStore","RemoteStore received new credentials");const s=jd(n);n._u.add(3),await Ld(n),s&&n.gu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n._u.delete(3),await Od(n)}async function sf(e,t){const n=ja(e);t?(n._u.delete(2),await Od(n)):t||(n._u.add(2),await Ld(n),n.gu.set("Unknown"))}function rf(e){return e.pu||(e.pu=function(e,t,n){const s=ja(e);return s.su(),new Cd(t,s.connection,s.authCredentials,s.appCheckCredentials,s.yt,n)}(e.datastore,e.asyncQueue,{Yr:qd.bind(null,e),Zr:Kd.bind(null,e),Wo:Hd.bind(null,e)}),e.wu.push((async t=>{t?(e.pu.Mo(),Vd(e)?Fd(e):e.gu.set("Unknown")):(await e.pu.stop(),Bd(e))}))),e.pu}function of(e){return e.Iu||(e.Iu=function(e,t,n){const s=ja(e);return s.su(),new Ad(t,s.connection,s.authCredentials,s.appCheckCredentials,s.yt,n)}(e.datastore,e.asyncQueue,{Yr:Yd.bind(null,e),Zr:tf.bind(null,e),tu:Zd.bind(null,e),Zo:ef.bind(null,e)}),e.wu.push((async t=>{t?(e.Iu.Mo(),await Gd(e)):(await e.Iu.stop(),e.fu.length>0&&(Pa("RemoteStore",`Stopping write stream with ${e.fu.length} pending writes`),e.fu=[]))}))),e.Iu
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class af{static createAndSchedule(e,t,n,s,i){const r=Date.now()+n,o=new af(e,t,r,s,i);return o.start(n),o}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new qa(Ba.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Ka,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((e=>{}))}}function cf(e,t){if(Ma("AsyncQueue",`${t}: ${e}`),vc(e))return new qa(Ba.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{static emptySet(e){return new uf(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof uf))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,s=n.getNext().key;if(!e.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new uf;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}constructor(e){this.comparator=e?(t,n)=>e(t,n)||cc.comparator(t.key,n.key):(e,t)=>cc.comparator(e.key,t.key),this.keyedMap=xh(),this.sortedSet=new Tu(this.comparator)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{track(e){const t=e.doc.key,n=this.Tu.get(t);n?0!==e.type&&3===n.type?this.Tu=this.Tu.insert(t,e):3===e.type&&1!==n.type?this.Tu=this.Tu.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.Tu=this.Tu.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.Tu=this.Tu.remove(t):1===e.type&&2===n.type?this.Tu=this.Tu.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):Fa():this.Tu=this.Tu.insert(t,e)}Eu(){const e=[];return this.Tu.inorderTraversal(((t,n)=>{e.push(n)})),e}constructor(){this.Tu=new Tu(cc.comparator)}}class lf{static fromInitialDocuments(e,t,n,s,i){const r=[];return t.forEach((e=>{r.push({type:0,doc:e})})),new lf(e,t,uf.emptySet(t),r,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Hu(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}constructor(e,t,n,s,i,r,o,a,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=r,this.syncStateChanged=o,this.excludesMetadataChanges=a,this.hasCachedResults=c}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df{constructor(){this.Au=void 0,this.listeners=[]}}class ff{constructor(){this.queries=new Oh((e=>zu(e)),Hu),this.onlineState="Unknown",this.Ru=new Set}}async function pf(e,t){const n=ja(e),s=t.query;let i=!1,r=n.queries.get(s);if(r||(i=!0,r=new df),i)try{r.Au=await n.onListen(s)}catch(e){const n=cf(e,`Initialization of query '${$u(t.query)}' failed`);return void t.onError(n)}n.queries.set(s,r),r.listeners.push(t),t.bu(n.onlineState),r.Au&&t.Pu(r.Au)&&vf(n)}async function gf(e,t){const n=ja(e),s=t.query;let i=!1;const r=n.queries.get(s);if(r){const e=r.listeners.indexOf(t);e>=0&&(r.listeners.splice(e,1),i=0===r.listeners.length)}if(i)return n.queries.delete(s),n.onUnlisten(s)}function mf(e,t){const n=ja(e);let s=!1;for(const e of t){const t=e.query,i=n.queries.get(t);if(i){for(const t of i.listeners)t.Pu(e)&&(s=!0);i.Au=e}}s&&vf(n)}function yf(e,t,n){const s=ja(e),i=s.queries.get(t);if(i)for(const e of i.listeners)e.onError(n);s.queries.delete(t)}function vf(e){e.Ru.forEach((e=>{e.next()}))}class wf{Pu(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new lf(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.Du(e)&&(this.vu.next(e),t=!0):this.Cu(e,this.onlineState)&&(this.xu(e),t=!0),this.Su=e,t}onError(e){this.vu.error(e)}bu(e){this.onlineState=e;let t=!1;return this.Su&&!this.Vu&&this.Cu(this.Su,e)&&(this.xu(this.Su),t=!0),t}Cu(e,t){if(!e.fromCache)return!0;const n="Offline"!==t;return(!this.options.Nu||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Du(e){if(e.docChanges.length>0)return!0;const t=this.Su&&this.Su.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}xu(e){e=lf.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.vu.next(e)}constructor(e,t,n){this.query=e,this.vu=t,this.Vu=!1,this.Su=null,this.onlineState="Unknown",this.options=n||{}}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tf{constructor(e){this.key=e}}class bf{constructor(e){this.key=e}}class Ef{get ju(){return this.qu}Wu(e,t){const n=t?t.zu:new hf,s=t?t.Qu:this.Qu;let i=t?t.mutatedKeys:this.mutatedKeys,r=s,o=!1;const a="F"===this.query.limitType&&s.size===this.query.limit?s.last():null,c="L"===this.query.limitType&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((e,t)=>{const u=s.get(e),h=Gu(this.query,t)?t:null,l=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations);let f=!1;u&&h?u.data.isEqual(h.data)?l!==d&&(n.track({type:3,doc:h}),f=!0):this.Hu(u,h)||(n.track({type:2,doc:h}),f=!0,(a&&this.Gu(h,a)>0||c&&this.Gu(h,c)<0)&&(o=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(a||c)&&(o=!0)),f&&(h?(r=r.add(h),i=d?i.add(e):i.delete(e)):(r=r.delete(e),i=i.delete(e)))})),null!==this.query.limit)for(;r.size>this.query.limit;){const e="F"===this.query.limitType?r.last():r.first();r=r.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{Qu:r,zu:n,$i:o,mutatedKeys:i}}Hu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n){const s=this.Qu;this.Qu=e.Qu,this.mutatedKeys=e.mutatedKeys;const i=e.zu.Eu();i.sort(((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Fa()}};return n(e)-n(t)}(e.type,t.type)||this.Gu(e.doc,t.doc))),this.Ju(n);const r=t?this.Yu():[],o=0===this.Ku.size&&this.current?1:0,a=o!==this.Uu;return this.Uu=o,0!==i.length||a?{snapshot:new lf(this.query,e.Qu,s,i,e.mutatedKeys,0===o,a,!1,!!n&&n.resumeToken.approximateByteSize()>0),Xu:r}:{Xu:r}}bu(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Qu:this.Qu,zu:new hf,mutatedKeys:this.mutatedKeys,$i:!1},!1)):{Xu:[]}}Zu(e){return!this.qu.has(e)&&!!this.Qu.has(e)&&!this.Qu.get(e).hasLocalMutations}Ju(e){e&&(e.addedDocuments.forEach((e=>this.qu=this.qu.add(e))),e.modifiedDocuments.forEach((e=>{})),e.removedDocuments.forEach((e=>this.qu=this.qu.delete(e))),this.current=e.current)}Yu(){if(!this.current)return[];const e=this.Ku;this.Ku=Kh(),this.Qu.forEach((e=>{this.Zu(e.key)&&(this.Ku=this.Ku.add(e.key))}));const t=[];return e.forEach((e=>{this.Ku.has(e)||t.push(new bf(e))})),this.Ku.forEach((n=>{e.has(n)||t.push(new Tf(n))})),t}tc(e){this.qu=e.Hi,this.Ku=Kh();const t=this.Wu(e.documents);return this.applyChanges(t,!0)}ec(){return lf.fromInitialDocuments(this.query,this.Qu,this.mutatedKeys,0===this.Uu,this.hasCachedResults)}constructor(e,t){this.query=e,this.qu=t,this.Uu=null,this.hasCachedResults=!1,this.current=!1,this.Ku=Kh(),this.mutatedKeys=Kh(),this.Gu=Qu(e),this.Qu=new uf(this.Gu)}}class If{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class _f{constructor(e){this.key=e,this.nc=!1}}class Sf{get isPrimaryClient(){return!0===this.dc}constructor(e,t,n,s,i,r){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=r,this.sc={},this.ic=new Oh((e=>zu(e)),Hu),this.rc=new Map,this.oc=new Set,this.uc=new Tu(cc.comparator),this.cc=new Map,this.ac=new Ql,this.hc={},this.lc=new Map,this.fc=Kl.vn(),this.onlineState="Unknown",this.dc=void 0}}async function kf(e,t){const n=Hf(e);let s,i;const r=n.ic.get(t);if(r)s=r.targetId,n.sharedClientState.addLocalQueryTarget(s),i=r.view.ec();else{const e=await dd(n.localStore,qu(t));n.isPrimaryClient&&Pd(n.remoteStore,e);const r=n.sharedClientState.addLocalQueryTarget(e.targetId);s=e.targetId,i=await Cf(n,t,s,"current"===r,e.resumeToken)}return i}async function Cf(e,t,n,s,i){e._c=(t,n,s)=>async function(e,t,n,s){let i=t.view.Wu(n);i.$i&&(i=await pd(e.localStore,t.query,!1).then((({documents:e})=>t.view.Wu(e,i))));const r=s&&s.targetChanges.get(t.targetId),o=t.view.applyChanges(i,e.isPrimaryClient,r);return Ff(e,t.targetId,o.Xu),o.snapshot}(e,t,n,s);const r=await pd(e.localStore,t,!0),o=new Ef(t,r.Hi),a=o.Wu(r.documents),c=Gh.createSynthesizedTargetChangeForCurrentChange(n,s&&"Offline"!==e.onlineState,i),u=o.applyChanges(a,e.isPrimaryClient,c);Ff(e,n,u.Xu);const h=new If(t,n,o);return e.ic.set(t,h),e.rc.has(n)?e.rc.get(n).push(t):e.rc.set(n,[t]),u.snapshot}async function Af(e,t){const n=ja(e),s=n.ic.get(t),i=n.rc.get(s.targetId);if(i.length>1)return n.rc.set(s.targetId,i.filter((e=>!Hu(e,t)))),void n.ic.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await fd(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),Md(n.remoteStore,s.targetId),xf(n,s.targetId)})).catch(mc)):(xf(n,s.targetId),await fd(n.localStore,s.targetId,!0))}async function Nf(e,t){const n=ja(e);try{const e=await function(e,t){const n=ja(e),s=t.snapshotVersion;let i=n.qi;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(e=>{const r=n.Gi.newChangeBuffer({trackRemovals:!0});i=n.qi;const o=[];t.targetChanges.forEach(((r,a)=>{const c=i.get(a);if(!c)return;o.push(n.Cs.removeMatchingKeys(e,r.removedDocuments,a).next((()=>n.Cs.addMatchingKeys(e,r.addedDocuments,a))));let u=c.withSequenceNumber(e.currentSequenceNumber);var h,l,d;t.targetMismatches.has(a)?u=u.withResumeToken(Nc.EMPTY_BYTE_STRING,sc.min()).withLastLimboFreeSnapshotVersion(sc.min()):r.resumeToken.approximateByteSize()>0&&(u=u.withResumeToken(r.resumeToken,s)),i=i.insert(a,u),l=u,d=r,(0===(h=c).resumeToken.approximateByteSize()||l.snapshotVersion.toMicroseconds()-h.snapshotVersion.toMicroseconds()>=3e8||d.addedDocuments.size+d.modifiedDocuments.size+d.removedDocuments.size>0)&&o.push(n.Cs.updateTargetData(e,u))}));let a=Ph(),c=Kh();if(t.documentUpdates.forEach((s=>{t.resolvedLimboDocuments.has(s)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(e,s))})),o.push(hd(e,r,t.documentUpdates).next((e=>{a=e.Wi,c=e.zi}))),!s.isEqual(sc.min())){const t=n.Cs.getLastRemoteSnapshotVersion(e).next((t=>n.Cs.setTargetsMetadata(e,e.currentSequenceNumber,s)));o.push(t)}return yc.waitFor(o).next((()=>r.apply(e))).next((()=>n.localDocuments.getLocalViewOfDocuments(e,a,c))).next((()=>a))})).then((e=>(n.qi=i,e)))}(n.localStore,t);t.targetChanges.forEach(((e,t)=>{const s=n.cc.get(t);s&&(Va(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1),e.addedDocuments.size>0?s.nc=!0:e.modifiedDocuments.size>0?Va(s.nc):e.removedDocuments.size>0&&(Va(s.nc),s.nc=!1))})),await Bf(n,e,t)}catch(e){await mc(e)}}function Df(e,t,n){const s=ja(e);if(s.isPrimaryClient&&0===n||!s.isPrimaryClient&&1===n){const e=[];s.ic.forEach(((n,s)=>{const i=s.view.bu(t);i.snapshot&&e.push(i.snapshot)})),function(e,t){const n=ja(e);n.onlineState=t;let s=!1;n.queries.forEach(((e,n)=>{for(const e of n.listeners)e.bu(t)&&(s=!0)})),s&&vf(n)}(s.eventManager,t),e.length&&s.sc.Wo(e),s.onlineState=t,s.isPrimaryClient&&s.sharedClientState.setOnlineState(t)}}async function Rf(e,t,n){const s=ja(e);s.sharedClientState.updateQueryState(t,"rejected",n);const i=s.cc.get(t),r=i&&i.key;if(r){let e=new Tu(cc.comparator);e=e.insert(r,Au.newNoDocument(r,sc.min()));const n=Kh().add(r),i=new $h(sc.min(),new Map,new Iu(ec),e,n);await Nf(s,i),s.uc=s.uc.remove(r),s.cc.delete(t),jf(s)}else await fd(s.localStore,t,!1).then((()=>xf(s,t,n))).catch(mc)}async function Of(e,t){const n=ja(e),s=t.batch.batchId;try{const e=await function(e,t){const n=ja(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(e=>{const s=t.batch.keys(),i=n.Gi.newChangeBuffer({trackRemovals:!0});return function(e,t,n,s){const i=n.batch,r=i.keys();let o=yc.resolve();return r.forEach((e=>{o=o.next((()=>s.getEntry(t,e))).next((t=>{const r=n.docVersions.get(e);Va(null!==r),t.version.compareTo(r)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),s.addEntry(t)))}))})),o.next((()=>e.mutationQueue.removeMutationBatch(t,i)))}(n,e,t,i).next((()=>i.apply(e))).next((()=>n.mutationQueue.performConsistencyCheck(e))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(e,s,t.batch.batchId))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=Kh();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t)))).next((()=>n.localDocuments.getDocuments(e,s)))}))}(n.localStore,t);Mf(n,s,null),Pf(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Bf(n,e)}catch(e){await mc(e)}}async function Lf(e,t,n){const s=ja(e);try{const e=await function(e,t){const n=ja(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",(e=>{let s;return n.mutationQueue.lookupMutationBatch(e,t).next((t=>(Va(null!==t),s=t.keys(),n.mutationQueue.removeMutationBatch(e,t)))).next((()=>n.mutationQueue.performConsistencyCheck(e))).next((()=>n.documentOverlayCache.removeOverlaysForBatchId(e,s,t))).next((()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,s))).next((()=>n.localDocuments.getDocuments(e,s)))}))}(s.localStore,t);Mf(s,t,n),Pf(s,t),s.sharedClientState.updateMutationState(t,"rejected",n),await Bf(s,e)}catch(e){await mc(e)}}function Pf(e,t){(e.lc.get(t)||[]).forEach((e=>{e.resolve()})),e.lc.delete(t)}function Mf(e,t,n){const s=ja(e);let i=s.hc[s.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),s.hc[s.currentUser.toKey()]=i}}function xf(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const s of e.rc.get(t))e.ic.delete(s),n&&e.sc.wc(s,n);e.rc.delete(t),e.isPrimaryClient&&e.ac.ls(t).forEach((t=>{e.ac.containsKey(t)||Uf(e,t)}))}function Uf(e,t){e.oc.delete(t.path.canonicalString());const n=e.uc.get(t);null!==n&&(Md(e.remoteStore,n),e.uc=e.uc.remove(t),e.cc.delete(n),jf(e))}function Ff(e,t,n){for(const s of n)s instanceof Tf?(e.ac.addReference(s.key,t),Vf(e,s)):s instanceof bf?(Pa("SyncEngine","Document no longer in limbo: "+s.key),e.ac.removeReference(s.key,t),e.ac.containsKey(s.key)||Uf(e,s.key)):Fa()}function Vf(e,t){const n=t.key,s=n.path.canonicalString();e.uc.get(n)||e.oc.has(s)||(Pa("SyncEngine","New document in limbo: "+n),e.oc.add(s),jf(e))}function jf(e){for(;e.oc.size>0&&e.uc.size<e.maxConcurrentLimboResolutions;){const t=e.oc.values().next().value;e.oc.delete(t);const n=new cc(rc.fromString(t)),s=e.fc.next();e.cc.set(s,new _f(n)),e.uc=e.uc.insert(n,s),Pd(e.remoteStore,new xl(qu(xu(n.path)),s,2,wc.at))}}async function Bf(e,t,n){const s=ja(e),i=[],r=[],o=[];s.ic.isEmpty()||(s.ic.forEach(((e,a)=>{o.push(s._c(a,t,n).then((e=>{if((e||n)&&s.isPrimaryClient&&s.sharedClientState.updateQueryState(a.targetId,(null==e?void 0:e.fromCache)?"not-current":"current"),e){i.push(e);const t=id.Ci(a.targetId,e);r.push(t)}})))})),await Promise.all(o),s.sc.Wo(i),await async function(e,t){const n=ja(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(e=>yc.forEach(t,(t=>yc.forEach(t.Si,(s=>n.persistence.referenceDelegate.addReference(e,t.targetId,s))).next((()=>yc.forEach(t.Di,(s=>n.persistence.referenceDelegate.removeReference(e,t.targetId,s)))))))))}catch(e){if(!vc(e))throw e;Pa("LocalStore","Failed to update sequence numbers: "+e)}for(const e of t){const t=e.targetId;if(!e.fromCache){const e=n.qi.get(t),s=e.snapshotVersion,i=e.withLastLimboFreeSnapshotVersion(s);n.qi=n.qi.insert(t,i)}}}(s.localStore,r))}async function qf(e,t){const n=ja(e);if(!n.currentUser.isEqual(t)){Pa("SyncEngine","User change. New user:",t.toKey());const e=await cd(n.localStore,t);n.currentUser=t,(s=n).lc.forEach((e=>{e.forEach((e=>{e.reject(new qa(Ba.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),s.lc.clear(),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await Bf(n,e.ji)}var s}function Kf(e,t){const n=ja(e),s=n.cc.get(t);if(s&&s.nc)return Kh().add(s.key);{let e=Kh();const s=n.rc.get(t);if(!s)return e;for(const t of s){const s=n.ic.get(t);e=e.unionWith(s.view.ju)}return e}}function Hf(e){const t=ja(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=Nf.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Kf.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Rf.bind(null,t),t.sc.Wo=mf.bind(null,t.eventManager),t.sc.wc=yf.bind(null,t.eventManager),t}function zf(e){const t=ja(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Of.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Lf.bind(null,t),t}class $f{async initialize(e){this.yt=_d(e.databaseInfo.databaseId),this.sharedClientState=this.gc(e),this.persistence=this.yc(e),await this.persistence.start(),this.localStore=this.Ic(e),this.gcScheduler=this.Tc(e,this.localStore),this.indexBackfillerScheduler=this.Ec(e,this.localStore)}Tc(e,t){return null}Ec(e,t){return null}Ic(e){return ad(this.persistence,new rd,e.initialUser,this.yt)}yc(e){return new td(sd.Bs,this.yt)}gc(e){return new yd}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}constructor(){this.synchronizeTabs=!1}}class Gf{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>Df(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=qf.bind(null,this.syncEngine),await sf(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new ff}createDatastore(e){const t=_d(e.databaseInfo.databaseId),n=(s=e.databaseInfo,new Ed(s));var s,i,r;return i=e.authCredentials,r=e.appCheckCredentials,new Nd(i,r,n,t)}createRemoteStore(e){var t,n,s,i,r;return t=this.localStore,n=this.datastore,s=e.asyncQueue,i=e=>Df(this.syncEngine,e,0),r=wd.C()?new wd:new vd,new Rd(t,n,s,i,r)}createSyncEngine(e,t){return function(e,t,n,s,i,r,o){const a=new Sf(e,t,n,s,i,r);return o&&(a.dc=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){const t=ja(e);Pa("RemoteStore","RemoteStore shutting down."),t._u.add(5),await Ld(t),t.mu.shutdown(),t.gu.set("Unknown")}(this.remoteStore)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wf(e,t,n){if(!n)throw new qa(Ba.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function Qf(e){if(!cc.isDocumentKey(e))throw new qa(Ba.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function Xf(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}var t;return"function"==typeof e?"a function":Fa()}function Jf(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new qa(Ba.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Xf(e);throw new qa(Ba.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Yf=new Map;class Zf{isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}constructor(e){var t;if(void 0===e.host){if(void 0!==e.ssl)throw new qa(Ba.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new qa(Ba.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,function(e,t,n,s){if(!0===t&&!0===s)throw new qa(Ba.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{get app(){if(!this._app)throw new qa(Ba.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new qa(Ba.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Zf(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new za;switch(e.type){case"gapi":const t=e.client;return new Qa(t,e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new qa(Ba.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Yf.get(e);t&&(Pa("ComponentProvider","Removing Datastore"),Yf.delete(e),t.terminate())}(this),Promise.resolve()}constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Zf({}),this._settingsFrozen=!1}}function tp(e,t,n,s={}){var i;const r=(e=Jf(e,ep))._getSettings();if("firestore.googleapis.com"!==r.host&&r.host!==t&&xa("Host has been set in both settings() and useEmulator(), emulator host will be used"),e._setSettings(Object.assign(Object.assign({},r),{host:`${t}:${n}`,ssl:!1})),s.mockUserToken){let t,n;if("string"==typeof s.mockUserToken)t=s.mockUserToken,n=Da.MOCK_USER;else{t=D(s.mockUserToken,null===(i=e._app)||void 0===i?void 0:i.options.projectId);const r=s.mockUserToken.sub||s.mockUserToken.user_id;if(!r)throw new qa(Ba.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new Da(r)}e._authCredentials=new $a(new Ha(t,n))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ip(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new np(this.firestore,e,this._key)}constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}}class sp{withConverter(e){return new sp(this.firestore,e,this._query)}constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}}class ip extends sp{get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new np(this.firestore,null,new cc(e))}withConverter(e){return new ip(this.firestore,e,this._path)}constructor(e,t,n){super(e,t,xu(n)),this._path=n,this.type="collection"}}function rp(e,t,...n){if(e=K(e),1===arguments.length&&(t=Za.R()),Wf("doc","path",t),e instanceof ep){const s=rc.fromString(t,...n);return Qf(s),new np(e,null,new cc(s))}{if(!(e instanceof np||e instanceof ip))throw new qa(Ba.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=e._path.child(rc.fromString(t,...n));return Qf(s),new np(e.firestore,e instanceof ip?e.converter:null,new cc(s))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class op{next(e){this.observer.next&&this.Rc(this.observer.next,e)}error(e){this.observer.error?this.Rc(this.observer.error,e):Ma("Uncaught Error in snapshot listener:",e.toString())}bc(){this.muted=!0}Rc(e,t){this.muted||setTimeout((()=>{this.muted||e(t)}),0)}constructor(e){this.observer=e,this.muted=!1}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ap{async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new qa(Ba.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ka;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=cf(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}constructor(e,t,n,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=s,this.user=Da.UNAUTHENTICATED,this.clientId=Za.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,(async e=>{Pa("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e})),this.appCheckCredentials.start(n,(e=>(Pa("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user))))}}async function cp(e,t){e.asyncQueue.verifyOperationInProgress(),Pa("FirestoreClient","Initializing OfflineComponentProvider");const n=await e.getConfiguration();await t.initialize(n);let s=n.initialUser;e.setCredentialChangeListener((async e=>{s.isEqual(e)||(await cd(t.localStore,e),s=e)})),t.persistence.setDatabaseDeletedListener((()=>e.terminate())),e.offlineComponents=t}async function up(e,t){e.asyncQueue.verifyOperationInProgress();const n=await hp(e);Pa("FirestoreClient","Initializing OnlineComponentProvider");const s=await e.getConfiguration();await t.initialize(n,s),e.setCredentialChangeListener((e=>nf(t.remoteStore,e))),e.setAppCheckTokenChangeListener(((e,n)=>nf(t.remoteStore,n))),e.onlineComponents=t}async function hp(e){return e.offlineComponents||(Pa("FirestoreClient","Using default OfflineComponentProvider"),await cp(e,new $f)),e.offlineComponents}async function lp(e){return e.onlineComponents||(Pa("FirestoreClient","Using default OnlineComponentProvider"),await up(e,new Gf)),e.onlineComponents}function dp(e){return lp(e).then((e=>e.syncEngine))}async function fp(e){const t=await lp(e),n=t.eventManager;return n.onListen=kf.bind(null,t.syncEngine),n.onUnlisten=Af.bind(null,t.syncEngine),n}function pp(e,t,n={}){const s=new Ka;return e.asyncQueue.enqueueAndForget((async()=>function(e,t,n,s,i){const r=new op({next:r=>{t.enqueueAndForget((()=>gf(e,o)));const a=r.docs.has(n);!a&&r.fromCache?i.reject(new qa(Ba.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&r.fromCache&&s&&"server"===s.source?i.reject(new qa(Ba.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(r)},error:e=>i.reject(e)}),o=new wf(xu(n.path),r,{includeMetadataChanges:!0,Nu:!0});return pf(e,o)}(await fp(e),e.asyncQueue,t,n,s))),s.promise}class gp{get isShuttingDown(){return this.qc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.zc(),this.Hc(e)}enterRestrictedMode(e){if(!this.qc){this.qc=!0,this.Qc=e||!1;const t=Id();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Wc)}}enqueue(e){if(this.zc(),this.qc)return new Promise((()=>{}));const t=new Ka;return this.Hc((()=>this.qc&&this.Qc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Lc.push(e),this.Jc())))}async Jc(){if(0!==this.Lc.length){try{await this.Lc[0](),this.Lc.shift(),this.xo.reset()}catch(e){if(!vc(e))throw e;Pa("AsyncQueue","Operation failed with retryable error: "+e)}this.Lc.length>0&&this.xo.Ro((()=>this.Jc()))}}Hc(e){const t=this.Bc.then((()=>(this.Gc=!0,e().catch((e=>{this.Kc=e,this.Gc=!1;throw Ma("INTERNAL UNHANDLED ERROR: ",function(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}(e)),e})).then((e=>(this.Gc=!1,e))))));return this.Bc=t,t}enqueueAfterDelay(e,t,n){this.zc(),this.jc.indexOf(e)>-1&&(t=0);const s=af.createAndSchedule(this,e,t,n,(e=>this.Yc(e)));return this.Uc.push(s),s}zc(){this.Kc&&Fa()}verifyOperationInProgress(){}async Xc(){let e;do{e=this.Bc,await e}while(e!==this.Bc)}Zc(e){for(const t of this.Uc)if(t.timerId===e)return!0;return!1}ta(e){return this.Xc().then((()=>{this.Uc.sort(((e,t)=>e.targetTimeMs-t.targetTimeMs));for(const t of this.Uc)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Xc()}))}ea(e){this.jc.push(e)}Yc(e){const t=this.Uc.indexOf(e);this.Uc.splice(t,1)}constructor(){this.Bc=Promise.resolve(),this.Lc=[],this.qc=!1,this.Uc=[],this.Kc=null,this.Gc=!1,this.Qc=!1,this.jc=[],this.xo=new Sd(this,"async_queue_retry"),this.Wc=()=>{const e=Id();e&&Pa("AsyncQueue","Visibility state changed to "+e.visibilityState),this.xo.Po()};const e=Id();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Wc)}}class mp extends ep{_terminate(){return this._firestoreClient||vp(this),this._firestoreClient.terminate()}constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new gp,this._persistenceKey=(null==s?void 0:s.name)||"[DEFAULT]"}}function yp(e){return e._firestoreClient||vp(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function vp(e){var t;const n=e._freezeSettings(),s=(i=e._databaseId,r=(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",o=e._persistenceKey,new Tc(i,r,o,(a=n).host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams));var i,r,o,a;e._firestoreClient=new ap(e._authCredentials,e._appCheckCredentials,e._queue,s)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wp{static fromBase64String(e){try{return new wp(Nc.fromBase64String(e))}catch(e){throw new qa(Ba.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new wp(Nc.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}constructor(e){this._byteString=e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{isEqual(e){return this._internalPath.isEqual(e._internalPath)}constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new qa(Ba.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ac(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class bp{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ec(this._lat,e._lat)||ec(this._long,e._long)}constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new qa(Ba.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new qa(Ba.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ip=/^__.*__$/;class _p{toMutation(e,t){return null!==this.fieldMask?new bh(e,this.data,this.fieldMask,t,this.fieldTransforms):new Th(e,this.data,t,this.fieldTransforms)}constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}}function Sp(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Fa()}}class kp{get path(){return this.settings.path}get sa(){return this.settings.sa}ia(e){return new kp(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.yt,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ra(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),s=this.ia({path:n,oa:!1});return s.ua(e),s}ca(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),s=this.ia({path:n,oa:!1});return s.na(),s}aa(e){return this.ia({path:void 0,oa:!0})}ha(e){return Up(e,this.settings.methodName,this.settings.la||!1,this.path,this.settings.fa)}contains(e){return void 0!==this.fieldMask.find((t=>e.isPrefixOf(t)))||void 0!==this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))}na(){if(this.path)for(let e=0;e<this.path.length;e++)this.ua(this.path.get(e))}ua(e){if(0===e.length)throw this.ha("Document fields must not be empty");if(Sp(this.sa)&&Ip.test(e))throw this.ha('Document fields cannot begin and end with "__"')}constructor(e,t,n,s,i,r){this.settings=e,this.databaseId=t,this.yt=n,this.ignoreUndefinedProperties=s,void 0===i&&this.na(),this.fieldTransforms=i||[],this.fieldMask=r||[]}}class Cp{da(e,t,n,s=!1){return new kp({sa:e,methodName:t,fa:n,path:ac.emptyPath(),oa:!1,la:s},this.databaseId,this.yt,this.ignoreUndefinedProperties)}constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.yt=n||_d(e)}}function Ap(e){const t=e._freezeSettings(),n=_d(e._databaseId);return new Cp(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Np(e,t,n,s,i,r={}){const o=e.da(r.merge||r.mergeFields?2:0,t,n,i);Lp("Data must be an object, but it was:",o,s);const a=Rp(s,o);let c,u;if(r.merge)c=new Su(o.fieldMask),u=o.fieldTransforms;else if(r.mergeFields){const e=[];for(const s of r.mergeFields){const i=Pp(t,s,n);if(!o.contains(i))throw new qa(Ba.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);Fp(e,i)||e.push(i)}c=new Su(e),u=o.fieldTransforms.filter((e=>c.covers(e.field)))}else c=null,u=o.fieldTransforms;return new _p(new ku(a),c,u)}function Dp(e,t){if(Op(e=K(e)))return Lp("Unsupported field value:",t,e),Rp(e,t);if(e instanceof bp)return function(e,t){if(!Sp(t.sa))throw t.ha(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.ha(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.oa&&4!==t.sa)throw t.ha("Nested arrays are not supported");return function(e,t){const n=[];let s=0;for(const i of e){let e=Dp(i,t.aa(s));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),s++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=K(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return Zu(t.yt,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=nc.fromDate(e);return{timestampValue:rl(t.yt,n)}}if(e instanceof nc){const n=new nc(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:rl(t.yt,n)}}if(e instanceof Ep)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof wp)return{bytesValue:ol(t.yt,e._byteString)};if(e instanceof np){const n=t.databaseId,s=e.firestore._databaseId;if(!s.isEqual(n))throw t.ha(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:ul(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.ha(`Unsupported field value: ${Xf(e)}`)}(e,t)}function Rp(e,t){const n={};return _c(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Ic(e,((e,s)=>{const i=Dp(s,t.ra(e));null!=i&&(n[e]=i)})),{mapValue:{fields:n}}}function Op(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof nc||e instanceof Ep||e instanceof wp||e instanceof np||e instanceof bp)}function Lp(e,t,n){if(!Op(n)||("object"!=typeof(s=n)||null===s||Object.getPrototypeOf(s)!==Object.prototype&&null!==Object.getPrototypeOf(s))){const s=Xf(n);throw"an object"===s?t.ha(e+" a custom object"):t.ha(e+" "+s)}var s}function Pp(e,t,n){if((t=K(t))instanceof Tp)return t._internalPath;if("string"==typeof t)return xp(e,t);throw Up("Field path arguments must be of type string or ",e,!1,void 0,n)}const Mp=new RegExp("[~\\*/\\[\\]]");function xp(e,t,n){if(t.search(Mp)>=0)throw Up(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Tp(...t.split("."))._internalPath}catch(s){throw Up(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Up(e,t,n,s,i){const r=s&&!s.isEmpty(),o=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(r||o)&&(c+=" (found",r&&(c+=` in field ${s}`),o&&(c+=` in document ${i}`),c+=")"),new qa(Ba.INVALID_ARGUMENT,a+e+c)}function Fp(e,t){return e.some((e=>e.isEqual(t)))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{get id(){return this._key.path.lastSegment()}get ref(){return new np(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new jp(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Bp("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}}class jp extends Vp{data(){return super.data()}}function Bp(e,t){return"string"==typeof t?xp(e,t):t instanceof Tp?t._internalPath:t._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qp{convertValue(e,t="none"){switch(Fc(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Oc(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Lc(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw Fa()}}convertObject(e,t){const n={};return Ic(e.fields,((e,s)=>{n[e]=this.convertValue(s,t)})),n}convertGeoPoint(e){return new Ep(Oc(e.latitude),Oc(e.longitude))}convertArray(e,t){return(e.values||[]).map((e=>this.convertValue(e,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Mc(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(xc(e));default:return null}}convertTimestamp(e){const t=Rc(e);return new nc(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=rc.fromString(e);Va(Nl(n));const s=new bc(n.get(1),n.get(3)),i=new cc(n.popFirst(5));return s.isEqual(t)||Ma(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kp(e,t,n){let s;return s=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,s}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Hp{isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}}class zp extends Vp{exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new $p(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Bp("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}constructor(e,t,n,s,i,r){super(e,t,n,s,r),this._firestore=e,this._firestoreImpl=e,this.metadata=i}}class $p extends zp{data(e={}){return super.data(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Gp(e){e=Jf(e,np);const t=Jf(e.firestore,mp);return pp(yp(t),e._key).then((n=>Jp(t,e,n)))}class Wp extends qp{convertBytes(e){return new wp(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new np(this.firestore,null,t)}constructor(e){super(),this.firestore=e}}function Qp(e,t,n){e=Jf(e,np);const s=Jf(e.firestore,mp),i=Kp(e.converter,t,n);return Xp(s,[Np(Ap(s),"setDoc",e._key,i,null!==e.converter,n).toMutation(e._key,dh.none())])}function Xp(e,t){return function(e,t){const n=new Ka;return e.asyncQueue.enqueueAndForget((async()=>async function(e,t,n){const s=zf(e);try{const e=await function(e,t){const n=ja(e),s=nc.now(),i=t.reduce(((e,t)=>e.add(t.key)),Kh());let r,o;return n.persistence.runTransaction("Locally write mutations","readwrite",(e=>{let a=Ph(),c=Kh();return n.Gi.getEntries(e,i).next((e=>{a=e,a.forEach(((e,t)=>{t.isValidDocument()||(c=c.add(e))}))})).next((()=>n.localDocuments.getOverlayedDocuments(e,a))).next((i=>{r=i;const o=[];for(const e of t){const t=vh(e,r.get(e.key).overlayedDocument);null!=t&&o.push(new bh(e.key,t,Cu(t.value.mapValue),dh.exists(!0)))}return n.mutationQueue.addMutationBatch(e,s,o,t)})).next((t=>{o=t;const s=t.applyToLocalDocumentSet(r,c);return n.documentOverlayCache.saveOverlays(e,t.batchId,s)}))})).then((()=>({batchId:o.batchId,changes:Uh(r)})))}(s.localStore,t);s.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let s=e.hc[e.currentUser.toKey()];s||(s=new Tu(ec)),s=s.insert(t,n),e.hc[e.currentUser.toKey()]=s}(s,e.batchId,n),await Bf(s,e.changes),await Gd(s.remoteStore)}catch(e){const t=cf(e,"Failed to persist write");n.reject(t)}}(await dp(e),t,n))),n.promise}(yp(e),t)}function Jp(e,t,n){const s=n.docs.get(t._key),i=new Wp(e);return new zp(e,i,t._key,s,new Hp(n.hasPendingWrites,n.fromCache),t.converter)}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */!function(e,t=!0){Ra="9.15.0",_e(new H("firestore",((e,{instanceIdentifier:n,options:s})=>{const i=e.getProvider("app").getImmediate(),r=new mp(new Ga(e.getProvider("auth-internal")),new Ja(e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new qa(Ba.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new bc(e.options.projectId,t)}(i,n),i);return s=Object.assign({useFetchStreams:t},s),r._setSettings(s),r}),"PUBLIC").setMultipleInstances(!0)),De("@firebase/firestore","3.8.0",e),De("@firebase/firestore","3.8.0","esm2017")}();const Yp=document.querySelector("#signUp"),Zp=document.querySelector("#signIn"),eg=document.querySelector("#signOut"),tg=document.querySelector("#sendData"),ng=document.querySelector("#getData"),sg=document.querySelector("#email"),ig=document.querySelector("#password"),rg=document.querySelector("#id"),og=document.querySelector("#image"),ag=document.querySelector("#description"),cg=document.querySelector("#hello");let ug;const hg=Ae({apiKey:"AIzaSyAKOwxFhUwAkGKZT941B-P0ZdF1CR5peoo",authDomain:"test-1-8d3d9.firebaseapp.com",projectId:"test-1-8d3d9",storageBucket:"test-1-8d3d9.appspot.com",messagingSenderId:"424521545586",appId:"1:424521545586:web:baa719b1045134a9960feb"}),lg=function(e=Ne()){const t=Se(e,"auth");if(t.isInitialized())return t.getImmediate();const n=function(e,t){const n=Se(e,"auth");if(n.isInitialized()){const e=n.getImmediate();if(M(n.getOptions(),null!=t?t:{}))return e;$e(e,"already-initialized")}return n.initialize({options:t})}(e,{popupRedirectResolver:Es,persistence:[Fn,_n,kn]}),s=A("authTokenSyncURL");if(s){const e=(i=s,async e=>{const t=e&&await e.getIdTokenResult(),n=t&&((new Date).getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>_s)return;const s=null==t?void 0:t.token;Ss!==s&&(Ss=s,await fetch(i,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))});!function(e,t,n){K(e).beforeAuthStateChanged(t,n)}(n,e,(()=>e(n.currentUser))),function(e,t,n,s){K(e).onIdTokenChanged(t,n,s)}(n,(t=>e(t)))}var i;const r=k("auth");return r&&Gt(n,`http://${r}`),n}(hg);var dg,fg,pg;Yp.addEventListener("click",(function(){bn(lg,sg.value,ig.value).then((e=>{e.user})).catch((e=>{e.code,e.message}))})),Zp.addEventListener("click",(function(){(e=lg,t=sg.value,n=ig.value,Tn(K(e),rn.credential(t,n))).then((e=>{e.user})).catch((e=>{e.code,e.message}));var e,t,n;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */})),eg.addEventListener("click",(function(){(e=lg,K(e).signOut()).then((()=>{})).catch((e=>{}));var e})),dg=e=>{e?(e.uid,cg.textContent=`Hello, ${e.email}`,ug=e.email):(cg.textContent="NO ACTIVE USER",ug="")},K(lg).onAuthStateChanged(dg,fg,pg);const gg=function(e,t){const n="string"==typeof e?e:t||"(default)",s=Se("object"==typeof e?e:Ne(),"firestore").getImmediate({identifier:n});if(!s._initialized){const e=C("firestore");e&&tp(s,...e)}return s}(hg);tg.addEventListener("click",(async function(){await Qp(rp(gg,"Marakas",ug),{[rg.value]:{image:og.value,description:ag.value}},{merge:!0})})),ng.addEventListener("click",(async function(){const e=rp(gg,"Marakas",ug),t=await Gp(e);t.exists()?console.log("Document data:",t.data()):console.log("No such document!")}));
//# sourceMappingURL=index.64d75529.js.map
