import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { escape as escape$1 } from 'html-escaper';
/* empty css                               */import axios, { AxiosError } from 'axios';
import jwt from 'jsonwebtoken';
import 'swiper';
/* empty css                                 */import { DataTypes, Model, Sequelize } from 'sequelize';
/* empty css                                */import { hash, verify } from 'argon2';
import 'mime';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import 'path-browserify';
import { compile } from 'path-to-regexp';

function createSignal(value, options) {
  return [() => value, v => {
    return value = typeof v === "function" ? v(value) : v;
  }];
}
const sharedConfig = {};
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return sharedConfig.context ? { ...sharedConfig.context,
    id: `${sharedConfig.context.id}${sharedConfig.context.count++}-`,
    count: 0
  } : undefined;
}
function createComponent$1(Comp, props) {
  if (sharedConfig.context && !sharedConfig.context.noHydrate) {
    const c = sharedConfig.context;
    setHydrateContext(nextHydrateContext());
    const r = Comp(props || {});
    setHydrateContext(c);
    return r;
  }
  return Comp(props || {});
}
function Show(props) {
  let c;
  return props.when ? typeof (c = props.children) === "function" ? c(props.when) : c : props.fallback || "";
}

const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
/*#__PURE__*/new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);

const {
  hasOwnProperty
} = Object.prototype;
const REF_START_CHARS = "hjkmoquxzABCDEFGHIJKLNPQRTUVWXYZ$_";
const REF_START_CHARS_LEN = REF_START_CHARS.length;
const REF_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_";
const REF_CHARS_LEN = REF_CHARS.length;
const STACK = [];
const BUFFER = [""];
let ASSIGNMENTS = new Map();
let INDEX_OR_REF = new WeakMap();
let REF_COUNT = 0;
BUFFER.pop();
function stringify(root) {
  if (writeProp(root, "")) {
    let result = BUFFER[0];
    for (let i = 1, len = BUFFER.length; i < len; i++) {
      result += BUFFER[i];
    }
    if (REF_COUNT) {
      if (ASSIGNMENTS.size) {
        let ref = INDEX_OR_REF.get(root);
        if (typeof ref === "number") {
          ref = toRefParam(REF_COUNT++);
          result = ref + "=" + result;
        }
        for (const [assignmentRef, assignments] of ASSIGNMENTS) {
          result += ";" + assignments + assignmentRef;
        }
        result += ";return " + ref;
        ASSIGNMENTS = new Map();
      } else {
        result = "return " + result;
      }
      result = "(function(" + refParamsString() + "){" + result + "}())";
    } else if (root && root.constructor === Object) {
      result = "(" + result + ")";
    }
    BUFFER.length = 0;
    INDEX_OR_REF = new WeakMap();
    return result;
  }
  return "void 0";
}
function writeProp(cur, accessor) {
  switch (typeof cur) {
    case "string":
      BUFFER.push(quote(cur, 0));
      break;
    case "number":
      BUFFER.push(cur + "");
      break;
    case "boolean":
      BUFFER.push(cur ? "!0" : "!1");
      break;
    case "object":
      if (cur === null) {
        BUFFER.push("null");
      } else {
        const ref = getRef(cur, accessor);
        switch (ref) {
          case true:
            return false;
          case false:
            switch (cur.constructor) {
              case Object:
                writeObject(cur);
                break;
              case Array:
                writeArray(cur);
                break;
              case Date:
                BUFFER.push('new Date("' + cur.toISOString() + '")');
                break;
              case RegExp:
                BUFFER.push(cur + "");
                break;
              case Map:
                BUFFER.push("new Map(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case Set:
                BUFFER.push("new Set(");
                writeArray(Array.from(cur));
                BUFFER.push(")");
                break;
              case undefined:
                BUFFER.push("Object.assign(Object.create(null),");
                writeObject(cur);
                BUFFER.push("))");
                break;
              default:
                return false;
            }
            break;
          default:
            BUFFER.push(ref);
            break;
        }
      }
      break;
    default:
      return false;
  }
  return true;
}
function writeObject(obj) {
  let sep = "{";
  STACK.push(obj);
  for (const key in obj) {
    if (hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      const escapedKey = toObjectKey(key);
      BUFFER.push(sep + escapedKey + ":");
      if (writeProp(val, escapedKey)) {
        sep = ",";
      } else {
        BUFFER.pop();
      }
    }
  }
  if (sep === "{") {
    BUFFER.push("{}");
  } else {
    BUFFER.push("}");
  }
  STACK.pop();
}
function writeArray(arr) {
  BUFFER.push("[");
  STACK.push(arr);
  writeProp(arr[0], 0);
  for (let i = 1, len = arr.length; i < len; i++) {
    BUFFER.push(",");
    writeProp(arr[i], i);
  }
  STACK.pop();
  BUFFER.push("]");
}
function getRef(cur, accessor) {
  let ref = INDEX_OR_REF.get(cur);
  if (ref === undefined) {
    INDEX_OR_REF.set(cur, BUFFER.length);
    return false;
  }
  if (typeof ref === "number") {
    ref = insertAndGetRef(cur, ref);
  }
  if (STACK.includes(cur)) {
    const parent = STACK[STACK.length - 1];
    let parentRef = INDEX_OR_REF.get(parent);
    if (typeof parentRef === "number") {
      parentRef = insertAndGetRef(parent, parentRef);
    }
    ASSIGNMENTS.set(ref, (ASSIGNMENTS.get(ref) || "") + toAssignment(parentRef, accessor) + "=");
    return true;
  }
  return ref;
}
function toObjectKey(name) {
  const invalidIdentifierPos = getInvalidIdentifierPos(name);
  return invalidIdentifierPos === -1 ? name : quote(name, invalidIdentifierPos);
}
function toAssignment(parent, key) {
  return parent + (typeof key === "number" || key[0] === '"' ? "[" + key + "]" : "." + key);
}
function getInvalidIdentifierPos(name) {
  let char = name[0];
  if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char === "$" || char === "_")) {
    return 0;
  }
  for (let i = 1, len = name.length; i < len; i++) {
    char = name[i];
    if (!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char >= "0" && char <= "9" || char === "$" || char === "_")) {
      return i;
    }
  }
  return -1;
}
function quote(str, startPos) {
  let result = "";
  let lastPos = 0;
  for (let i = startPos, len = str.length; i < len; i++) {
    let replacement;
    switch (str[i]) {
      case '"':
        replacement = '\\"';
        break;
      case "\\":
        replacement = "\\\\";
        break;
      case "<":
        replacement = "\\x3C";
        break;
      case "\n":
        replacement = "\\n";
        break;
      case "\r":
        replacement = "\\r";
        break;
      case "\u2028":
        replacement = "\\u2028";
        break;
      case "\u2029":
        replacement = "\\u2029";
        break;
      default:
        continue;
    }
    result += str.slice(lastPos, i) + replacement;
    lastPos = i + 1;
  }
  if (lastPos === startPos) {
    result = str;
  } else {
    result += str.slice(lastPos);
  }
  return '"' + result + '"';
}
function insertAndGetRef(obj, pos) {
  const ref = toRefParam(REF_COUNT++);
  INDEX_OR_REF.set(obj, ref);
  if (pos) {
    BUFFER[pos - 1] += ref + "=";
  } else {
    BUFFER[pos] = ref + "=" + BUFFER[pos];
  }
  return ref;
}
function refParamsString() {
  let result = REF_START_CHARS[0];
  for (let i = 1; i < REF_COUNT; i++) {
    result += "," + toRefParam(i);
  }
  REF_COUNT = 0;
  return result;
}
function toRefParam(index) {
  let mod = index % REF_START_CHARS_LEN;
  let ref = REF_START_CHARS[mod];
  index = (index - mod) / REF_START_CHARS_LEN;
  while (index > 0) {
    mod = index % REF_CHARS_LEN;
    ref += REF_CHARS[mod];
    index = (index - mod) / REF_CHARS_LEN;
  }
  return ref;
}
function renderToString$1(code, options = {}) {
  let scripts = "";
  sharedConfig.context = {
    id: options.renderId || "",
    count: 0,
    suspense: {},
    assets: [],
    nonce: options.nonce,
    writeResource(id, p, error) {
      if (error) return scripts += `_$HY.set("${id}", ${serializeError(p)});`;
      scripts += `_$HY.set("${id}", ${stringify(p)});`;
    }
  };
  let html = resolveSSRNode(escape(code()));
  sharedConfig.context.noHydrate = true;
  html = injectAssets(sharedConfig.context.assets, html);
  if (scripts.length) html = injectScripts(html, scripts, options.nonce);
  return html;
}
function ssr(t, ...nodes) {
  if (nodes.length) {
    let result = "";
    for (let i = 0; i < nodes.length; i++) {
      result += t[i];
      const node = nodes[i];
      if (node !== undefined) result += resolveSSRNode(node);
    }
    t = result + t[nodes.length];
  }
  return {
    t
  };
}
function ssrAttribute(key, value, isBoolean) {
  return isBoolean ? value ? " " + key : "" : value != null ? ` ${key}="${value}"` : "";
}
function ssrHydrationKey() {
  const hk = getHydrationKey();
  return hk ? ` data-hk="${hk}"` : "";
}
function escape(s, attr) {
  const t = typeof s;
  if (t !== "string") {
    if (!attr && t === "function") return escape(s(), attr);
    if (attr && t === "boolean") return String(s);
    return s;
  }
  const delim = attr ? '"' : "<";
  const escDelim = attr ? "&quot;" : "&lt;";
  let iDelim = s.indexOf(delim);
  let iAmp = s.indexOf("&");
  if (iDelim < 0 && iAmp < 0) return s;
  let left = 0,
      out = "";
  while (iDelim >= 0 && iAmp >= 0) {
    if (iDelim < iAmp) {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } else {
      if (left < iAmp) out += s.substring(left, iAmp);
      out += "&amp;";
      left = iAmp + 1;
      iAmp = s.indexOf("&", left);
    }
  }
  if (iDelim >= 0) {
    do {
      if (left < iDelim) out += s.substring(left, iDelim);
      out += escDelim;
      left = iDelim + 1;
      iDelim = s.indexOf(delim, left);
    } while (iDelim >= 0);
  } else while (iAmp >= 0) {
    if (left < iAmp) out += s.substring(left, iAmp);
    out += "&amp;";
    left = iAmp + 1;
    iAmp = s.indexOf("&", left);
  }
  return left < s.length ? out + s.substring(left) : out;
}
function resolveSSRNode(node) {
  const t = typeof node;
  if (t === "string") return node;
  if (node == null || t === "boolean") return "";
  if (Array.isArray(node)) {
    let mapped = "";
    for (let i = 0, len = node.length; i < len; i++) mapped += resolveSSRNode(node[i]);
    return mapped;
  }
  if (t === "object") return node.t;
  if (t === "function") return resolveSSRNode(node());
  return String(node);
}
function getHydrationKey() {
  const hydrate = sharedConfig.context;
  return hydrate && !hydrate.noHydrate && `${hydrate.id}${hydrate.count++}`;
}
function injectAssets(assets, html) {
  if (!assets || !assets.length) return html;
  let out = "";
  for (let i = 0, len = assets.length; i < len; i++) out += assets[i]();
  return html.replace(`</head>`, out + `</head>`);
}
function injectScripts(html, scripts, nonce) {
  const tag = `<script${nonce ? ` nonce="${nonce}"` : ""}>${scripts}</script>`;
  const index = html.indexOf("<!--xs-->");
  if (index > -1) {
    return html.slice(0, index) + tag + html.slice(index);
  }
  return html + tag;
}
function serializeError(error) {
  if (error.message) {
    const fields = {};
    const keys = Object.getOwnPropertyNames(error);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = error[key];
      if (!value || key !== "message" && typeof value !== "function") {
        fields[key] = value;
      }
    }
    return `Object.assign(new Error(${stringify(error.message)}), ${stringify(fields)})`;
  }
  return stringify(error);
}

const contexts = /* @__PURE__ */ new WeakMap();
function getContext(result) {
  if (contexts.has(result)) {
    return contexts.get(result);
  }
  let ctx = {
    c: 0,
    get id() {
      return "s" + this.c.toString();
    }
  };
  contexts.set(result, ctx);
  return ctx;
}
function incrementId(ctx) {
  let id = ctx.id;
  ctx.c++;
  return id;
}

const slotName$1 = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
function check$1(Component, props, children) {
  if (typeof Component !== "function")
    return false;
  const { html } = renderToStaticMarkup$1.call(this, Component, props, children);
  return typeof html === "string";
}
function renderToStaticMarkup$1(Component, props, { default: children, ...slotted }, metadata) {
  const renderId = (metadata == null ? void 0 : metadata.hydrate) ? incrementId(getContext(this.result)) : "";
  const html = renderToString$1(
    () => {
      const slots = {};
      for (const [key, value] of Object.entries(slotted)) {
        const name = slotName$1(key);
        slots[name] = ssr(`<astro-slot name="${name}">${value}</astro-slot>`);
      }
      const newProps = {
        ...props,
        ...slots,
        children: children != null ? ssr(`<astro-slot>${children}</astro-slot>`) : children
      };
      return createComponent$1(Component, newProps);
    },
    {
      renderId
    }
  );
  return {
    attrs: {
      "data-solid-render-id": renderId
    },
    html
  };
}
var server_default$1 = {
  check: check$1,
  renderToStaticMarkup: renderToStaticMarkup$1
};

const ASTRO_VERSION = "1.5.1";

function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

const escapeHTML = escape$1;
class HTMLString extends String {
  get [Symbol.toStringTag]() {
    return "HTMLString";
  }
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};
function isHTMLString(value) {
  return Object.prototype.toString.call(value) === "[object HTMLString]";
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;

var astro_island_prebuilt_default = `var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      return chunk.toString();
    }
  }
}
class HTMLParts {
  constructor() {
    this.parts = "";
  }
  append(part, result) {
    if (ArrayBuffer.isView(part)) {
      this.parts += decoder.decode(part);
    } else {
      this.parts += stringifyChunk(result, part);
    }
  }
  toString() {
    return this.parts;
  }
  toArrayBuffer() {
    return encoder.encode(this.parts);
  }
}

const ClientOnlyPlaceholder = "astro-client-only";
const skipAstroJSXCheck = /* @__PURE__ */ new WeakSet();
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result._metadata.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement$1(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skipAstroJSXCheck.add(vnode.type);
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function" && !skipAstroJSXCheck.has(vnode.type)) {
        useConsoleFilter();
        try {
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2 && output2[AstroJSX]) {
            return await renderJSX(result, output2);
          } else if (!output2) {
            return await renderJSX(result, output2);
          }
        } catch (e) {
          skipAstroJSXCheck.add(vnode.type);
        } finally {
          finishUsingConsoleFilter();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponent(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponent(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let parts = new HTMLParts();
        for await (const chunk of output) {
          parts.append(chunk, result);
        }
        return markHTMLString(parts.toString());
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement$1(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
  originalConsoleError(msg, ...rest);
}

function removeLeadingForwardSlashWindows(path) {
  return path.startsWith("/") && path[2] === ":" ? path.substring(1) : path;
}

class Metadata {
  constructor(filePathname, opts) {
    this.modules = opts.modules;
    this.hoisted = opts.hoisted;
    this.hydratedComponents = opts.hydratedComponents;
    this.clientOnlyComponents = opts.clientOnlyComponents;
    this.hydrationDirectives = opts.hydrationDirectives;
    this.filePath = removeLeadingForwardSlashWindows(filePathname);
    this.mockURL = new URL(filePathname, "http://example.com");
    this.metadataCache = /* @__PURE__ */ new Map();
  }
  resolvePath(specifier) {
    if (specifier.startsWith(".")) {
      const url = new URL(specifier, this.mockURL);
      return removeLeadingForwardSlashWindows(decodeURI(url.pathname));
    } else {
      return specifier;
    }
  }
  getPath(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentUrl) || null;
  }
  getExport(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentExport) || null;
  }
  getComponentMetadata(Component) {
    if (this.metadataCache.has(Component)) {
      return this.metadataCache.get(Component);
    }
    const metadata = this.findComponentMetadata(Component);
    this.metadataCache.set(Component, metadata);
    return metadata;
  }
  findComponentMetadata(Component) {
    const isCustomElement = typeof Component === "string";
    for (const { module, specifier } of this.modules) {
      const id = this.resolvePath(specifier);
      for (const [key, value] of Object.entries(module)) {
        if (isCustomElement) {
          if (key === "tagName" && Component === value) {
            return {
              componentExport: key,
              componentUrl: id
            };
          }
        } else if (Component === value) {
          return {
            componentExport: key,
            componentUrl: id
          };
        }
      }
    }
    return null;
  }
}
function createMetadata(filePathname, options) {
  return new Metadata(filePathname, options);
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
  Uint8Array: 8,
  Uint16Array: 9,
  Uint32Array: 10
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [
        PROP_TYPE.Map,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object Set]": {
      return [
        PROP_TYPE.Set,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value, metadata, parents))];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, JSON.stringify(Array.from(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new Error(
              'Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"'
            );
          }
          break;
        }
      }
    } else if (key === "class:list") {
      if (value) {
        extracted.props[key.slice(0, -5)] = serializeListValue(value);
      }
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = escapeHTML(value);
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

class SlotString extends HTMLString {
  constructor(content, instructions) {
    super(content);
    this.instructions = instructions;
  }
}
async function renderSlot(_result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    let instructions = null;
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(new SlotString(content, instructions));
  }
  return fallback;
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof SlotString) {
    if (child.instructions) {
      yield* child.instructions;
    }
    yield child;
  } else if (isHTMLString(child)) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (child instanceof AstroComponent || Object.prototype.toString.call(child) === "[object AstroComponent]") {
    yield* renderAstroComponent(child);
  } else if (ArrayBuffer.isView(child)) {
    yield child;
  } else if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    yield* child;
  } else {
    yield child;
  }
}

function validateComponentProps(props, displayName) {
  var _a;
  if (((_a = (Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true},{_:process.env._,}))) == null ? void 0 : _a.DEV) && props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
class AstroComponent {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }
  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isAstroComponent(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object AstroComponent]";
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : !!obj.isAstroComponentFactory;
}
async function* renderAstroComponent(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
async function renderToString(result, componentFactory, props, children) {
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    const response = Component;
    throw response;
  }
  let parts = new HTMLParts();
  for await (const chunk of renderAstroComponent(Component)) {
    parts.append(chunk, result);
  }
  return parts.toString();
}
async function renderToIterable(result, componentFactory, displayName, props, children) {
  validateComponentProps(props, displayName);
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    console.warn(
      `Returning a Response is only supported inside of page components. Consider refactoring this logic into something like a function that can be used in the page.`
    );
    const response = Component;
    throw response;
  }
  return renderAstroComponent(Component);
}
async function renderTemplate(htmlParts, ...expressions) {
  return new AstroComponent(htmlParts, expressions);
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `const ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value), shouldEscape);
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toAttributeString(toStyleString(value), shouldEscape)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue (jsx)"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue", "@astrojs/svelte"];
  }
}
function getComponentType(Component) {
  if (Component === Fragment) {
    return "fragment";
  }
  if (Component && typeof Component === "object" && Component["astro:html"]) {
    return "html";
  }
  if (isAstroComponentFactory(Component)) {
    return "astro-factory";
  }
  return "unknown";
}
async function renderComponent(result, displayName, Component, _props, slots = {}) {
  var _a;
  Component = await Component;
  switch (getComponentType(Component)) {
    case "fragment": {
      const children2 = await renderSlot(result, slots == null ? void 0 : slots.default);
      if (children2 == null) {
        return children2;
      }
      return markHTMLString(children2);
    }
    case "html": {
      const { slotInstructions: slotInstructions2, children: children2 } = await renderSlots(result, slots);
      const html2 = Component.render({ slots: children2 });
      const hydrationHtml = slotInstructions2 ? slotInstructions2.map((instr) => stringifyChunk(result, instr)).join("") : "";
      return markHTMLString(hydrationHtml + html2);
    }
    case "astro-factory": {
      async function* renderAstroComponentInline() {
        let iterable = await renderToIterable(result, Component, displayName, _props, slots);
        yield* iterable;
      }
      return renderAstroComponentInline();
    }
  }
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(_props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  if (Array.isArray(renderers) && renderers.length === 0 && typeof Component !== "string" && !componentIsHTMLElement(Component)) {
    const message = `Unable to render ${metadata.displayName}!

There are no \`integrations\` set in your \`astro.config.mjs\` file.
Did you mean to add ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`;
    throw new Error(message);
  }
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    if (Component && Component[Renderer]) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && renderers.length === 1) {
      renderer = renderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${metadata.displayName} client:only="${probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")}" />
`);
    } else if (typeof Component !== "string") {
      const matchingRenderers = renderers.filter((r) => probableRendererNames.includes(r.name));
      const plural = renderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers.length} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${metadata.displayName}.

Did you mean to enable ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`);
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new Error(
      `${metadata.displayName} component has a \`client:${metadata.hydrate}\` directive, but no client entrypoint was provided by ${renderer.name}!`
    );
  }
  if (!html && typeof Component === "string") {
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroComponent(
      await renderTemplate`<${Component}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Component) ? `/>` : `>${childSlots}</${Component}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    return async function* () {
      if (slotInstructions) {
        yield* slotInstructions;
      }
      if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
        yield html;
      } else {
        yield markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
      }
    }();
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    if (slotInstructions) {
      yield* slotInstructions;
    }
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement("astro-island", island, false));
  }
  return renderAll();
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
function renderHead(result) {
  result._metadata.hasRenderedHead = true;
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement("link", link, false));
  return markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
}
async function* maybeRenderHead(result) {
  if (result._metadata.hasRenderedHead) {
    return;
  }
  yield renderHead(result);
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
function __astro_tag_component__(Component, rendererName) {
  if (!Component)
    return;
  if (typeof Component !== "function")
    return;
  Object.defineProperty(Component, Renderer, {
    value: rendererName,
    enumerable: false,
    writable: false
  });
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (slotAttr) => slotAttr;
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [Renderer]: "astro:jsx",
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const $$module1$5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$b = createMetadata("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/components/DrinkCard.astro", { modules: [{ module: $$module1$5, specifier: "@data/types/product", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$b = createAstro("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/components/DrinkCard.astro", "", "file:///home/kollin/school/software-engineering/dans-frappuccino-paradise/");
const $$DrinkCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$DrinkCard;
  const { drink, tag } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<div class="card w-96 bg-[#cdcdcd] hover:bg-white transition-colors duration-500 shadow-xl">
  <figure class="px-10 pt-10">
    <img${addAttribute(drink.imageUrl, "src")} alt="Drink" class="rounded-xl">
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">
      ${drink.name}
      ${tag ? renderTemplate`<div class="badge badge-secondary">${tag}</div>` : null}
    </h2>
    <div class="card-actions">
      <a${addAttribute(`/products/${drink.id}`, "href")} class="btn btn-primary">Add to Cart</a>
    </div>
  </div>
</div>`;
});

const $$file$b = "/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/components/DrinkCard.astro";
const $$url$b = undefined;

const $$module1$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$b,
  default: $$DrinkCard,
  file: $$file$b,
  url: $$url$b
}, Symbol.toStringTag, { value: 'Module' }));

const authSignal = createSignal(null);

const runApiCall = async (definition, data) => {
  const [auth] = authSignal;
  try {
    const response = await axios({
      method: definition.method,
      url: `http://localhost:3000/api${definition.path.startsWith("/") ? "" : "/"}${definition.path}`,
      data: definition.method === "GET" ? void 0 : data,
      params: definition.method === "GET" ? data : void 0,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth()}`
      }
    });
    if (response.status !== 200)
      throw new Error(response.data?.error || "Something unexpected happened.");
    return response.data;
  } catch (err) {
    if (!(err instanceof AxiosError))
      throw err;
    console.error(err);
    throw new Error(err.response?.data?.error || "Something unexpected happened.");
  }
};

const getProducts$1 = async () => runApiCall(
  {
    method: "GET",
    path: "/products"
  }
);
const getProduct$1 = async (id) => {
  try {
    return await runApiCall(
      {
        method: "GET",
        path: `/products/${id}`
      }
    );
  } catch (err) {
    return null;
  }
};

const $$module3$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: getProducts$1,
  getProduct: getProduct$1
}, Symbol.toStringTag, { value: 'Module' }));

const JWT_SECRET = "fraps-api-as;jrkqoq;jfkdkfkwpqoejfkljjf";
const authenticate = (cookies) => {
  try {
    const token = cookies.get("token").value;
    if (!token)
      return null;
    const account = jwt.verify(token, JWT_SECRET);
    return account;
  } catch (err) {
    console.error(err);
    return null;
  }
};
const verifyToken = (token) => {
  if (!token)
    return null;
  try {
    const account = jwt.verify(token, JWT_SECRET);
    return account;
  } catch (err) {
    return null;
  }
};
const createToken = (data) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn: "1yr"
  });
};

const $$module4$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  authenticate,
  verifyToken,
  createToken
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$a = createMetadata("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/components/MenuIcon.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$a = createAstro("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/components/MenuIcon.astro", "", "file:///home/kollin/school/software-engineering/dans-frappuccino-paradise/");
const $$MenuIcon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$MenuIcon;
  return renderTemplate`${maybeRenderHead($$result)}<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 752 752" xml:space="preserve">
  <defs>
    <clipPath id="c">
      <path d="m139.21 236h473.58v35h-473.58z"></path>
    </clipPath>
    <clipPath id="b">
      <path d="m139.21 358h473.58v36h-473.58z"></path>
    </clipPath>
    <clipPath id="a">
      <path d="m139.21 481h473.58v35h-473.58z"></path>
    </clipPath>
  </defs>
  <g>
    <g clip-path="url(#c)">
      <path fill="black" stroke="black" d="m595.62 270.41h-439.25c-9.4727 0-17.168-7.6953-17.168-17.164 0-9.4727 7.6953-17.168 17.168-17.168h439.25c9.4727 0 17.168 7.6953 17.168 17.168 0 9.4688-7.6953 17.164-17.168 17.164z"></path>
    </g>
    <g clip-path="url(#b)">
      <path fill="black" stroke="black" d="m595.62 393.17h-439.25c-9.4727 0-17.168-7.6953-17.168-17.168s7.6953-17.168 17.168-17.168h439.25c9.4727 0 17.168 7.6953 17.168 17.168s-7.6953 17.168-17.168 17.168z"></path>
    </g>
    <g clip-path="url(#a)">
      <path fill="black" stroke="black" d="m595.62 515.93h-439.25c-9.4727 0-17.168-7.6953-17.168-17.168 0-9.4727 7.6953-17.168 17.168-17.168h439.25c9.4727 0 17.168 7.6953 17.168 17.168 0 9.4727-7.6953 17.168-17.168 17.168z"></path>
    </g>
  </g>
</svg>`;
});

const $$file$a = "/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/components/MenuIcon.astro";
const $$url$a = undefined;

const $$module1$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$a,
  default: $$MenuIcon,
  file: $$file$a,
  url: $$url$a
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$7 = ["<div", " class=\"btn btn-secondary btn-xs\">Sign Out</div>"];
const SignOutButton = () => {
  return ssr(_tmpl$$7, ssrHydrationKey());
};

__astro_tag_component__(SignOutButton, "@astrojs/solid-js");

const $$module2$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: SignOutButton
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$9 = createMetadata("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/layouts/Layout.astro", { modules: [{ module: $$module1$3, specifier: "@components/MenuIcon.astro", assert: {} }, { module: $$module2$2, specifier: "@components/SignOutButton", assert: {} }, { module: $$module4$3, specifier: "@utils/auth", assert: {} }], hydratedComponents: [SignOutButton, SignOutButton], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["idle"]), hoisted: [] });
const $$Astro$9 = createAstro("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/layouts/Layout.astro", "", "file:///home/kollin/school/software-engineering/dans-frappuccino-paradise/");
const BUTTON_CLASSES = "btn btn-accent btn-xs btn-ghost";
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  const account = authenticate(Astro2.cookies);
  const cookie = Astro2.cookies.get("token").value;
  const pages = [
    { url: "/", label: "Home" },
    { url: "/menu", label: "Menu", roles: "*" },
    { url: "/account", label: "Account", roles: "*" },
    { url: "/employee", label: "Employee", roles: ["manager", "employee"] },
    { url: "/admin", label: "Manager", roles: ["manager"] }
  ];
  const availablePages = pages.filter((p) => {
    if (!p.roles)
      return true;
    if (!account)
      return false;
    return p.roles === "*" || p.roles.includes(account.role);
  });
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`<html lang="en" class="astro-3VDHFDXW">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <title>${title || "Dan's Frappuccino Paradise"}</title>
  ${renderHead($$result)}</head>
  <body class="text-black bg-neutral astro-3VDHFDXW">
    <div class="drawer drawer-end astro-3VDHFDXW">
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle astro-3VDHFDXW">
      <div class="drawer-content min-h-screen flex flex-col astro-3VDHFDXW">
        <nav class="w-full min-h-[92px] bg-primary flex flex-row items-end justify-between p-2 drop-shadow-[0_0px_10px_rgba(0,0,0,0.75)] astro-3VDHFDXW">
          <a href="/" class="astro-3VDHFDXW">
            <h1 class="text-xl md:text-2xl lg:text-3xl text-accent astro-3VDHFDXW">
              Dan's Frappuccino Paradise
            </h1>
          </a>
          <div class="hidden lg:flex flex-row gap-2 items-center astro-3VDHFDXW">
            ${availablePages.map((p) => renderTemplate`<a${addAttribute(p.url, "href")}${addAttribute(BUTTON_CLASSES + " astro-3VDHFDXW", "class")}>
                  ${p.label}
                </a>`)}
            ${account ? renderTemplate`${renderComponent($$result, "SignOutButton", SignOutButton, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@components/SignOutButton", "client:component-export": "default", "class": "astro-3VDHFDXW" })}` : renderTemplate`<a href="/signin"${addAttribute(BUTTON_CLASSES + " astro-3VDHFDXW", "class")}>
                  Sign In
                </a>`}
          </div>
          <div class="flex lg:hidden astro-3VDHFDXW">
            <label for="my-drawer-4" class="drawer-button btn-ghost btn-sm btn-circle cursor-pointer astro-3VDHFDXW">
              ${renderComponent($$result, "MenuIcon", $$MenuIcon, { "class": "astro-3VDHFDXW" })}
            </label>
          </div>
        </nav>
        <div class="flex flex-col items-center flex-1 astro-3VDHFDXW">
          ${renderSlot($$result, $$slots["default"])}
        </div>
        <footer class="w-full bg-accent text-white mt-8 grid grid-cols-1 md:grid-cols-2 astro-3VDHFDXW">
          <div class="flex items-center justify-center h-full p-2 text-sm astro-3VDHFDXW">
            &copy; ${new Date().getFullYear()} Awesome Eight
          </div>
          <div class="flex items-center justify-center text-center p-2 text-2xs astro-3VDHFDXW">
            Created by John Belnap, Caden Harris, Kollin Murphy, and Trenton
            Peters.
          </div>
        </footer>
      </div>
      <div class="drawer-side astro-3VDHFDXW">
        <label for="my-drawer-4" class="drawer-overlay astro-3VDHFDXW"></label>
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content gap-2 astro-3VDHFDXW">
          ${availablePages.map((p) => renderTemplate`<li class="astro-3VDHFDXW">
                <a${addAttribute(p.url, "href")} class="astro-3VDHFDXW">${p.label}</a>
              </li>`)}
          <div class="ml-4 astro-3VDHFDXW">
            ${renderComponent($$result, "SignOutButton", SignOutButton, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@components/SignOutButton", "client:component-export": "default", "class": "astro-3VDHFDXW" })}
          </div>
        </ul>
      </div>
    </div>

    

    
    <div class="hidden astro-3VDHFDXW" id="authorization">${cookie}</div>
  </body>
</html>`;
});

const $$file$9 = "/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/layouts/Layout.astro";
const $$url$9 = undefined;

const $$module1$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$9,
  BUTTON_CLASSES,
  default: $$Layout,
  file: $$file$9,
  url: $$url$9
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$6 = ["<div", " class=\"swiper my-8 w-[calc(100vw-96px)] h-[calc(100vh-168px)]\"><div class=\"swiper-wrapper\">", "</div><div class=\"swiper-pagination\"></div><div class=\"swiper-button-prev text-primary\"></div><div class=\"swiper-button-next text-primary\"></div><div class=\"swiper-scrollbar\"></div></div>"],
  _tmpl$2$2 = ["<div", " class=\"swiper-slide flex items-start justify-center\"><img", " alt=\"image\" class=\"rounded-lg w-full h-full object-cover\"></div>"];
const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 800;
const images = [`https://picsum.photos/id/431/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`, `https://picsum.photos/id/1060/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`, `https://picsum.photos/id/425/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`, `https://picsum.photos/id/225/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`, `https://picsum.photos/id/42/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`, `https://picsum.photos/id/2/${IMAGE_WIDTH}/${IMAGE_HEIGHT}`];
function Carousel() {
  return ssr(_tmpl$$6, ssrHydrationKey(), escape(images.map(i => ssr(_tmpl$2$2, ssrHydrationKey(), ssrAttribute("src", escape(i, true), false)))));
}

__astro_tag_component__(Carousel, "@astrojs/solid-js");

const $$module5$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: Carousel
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$8 = createMetadata("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/index.astro", { modules: [{ module: $$module1$4, specifier: "@components/DrinkCard.astro", assert: {} }, { module: $$module3$1, specifier: "@data/api/products/get", assert: {} }, { module: $$module4$3, specifier: "@utils/auth", assert: {} }, { module: $$module1$2, specifier: "../layouts/Layout.astro", assert: {} }, { module: $$module5$1, specifier: "@components/Carousel", assert: {} }], hydratedComponents: [Carousel], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["idle"]), hoisted: [] });
const $$Astro$8 = createAstro("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/index.astro", "", "file:///home/kollin/school/software-engineering/dans-frappuccino-paradise/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Index;
  authenticate(Astro2.cookies);
  const drinks = (await getProducts$1()).slice(0, 2);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "", "class": "astro-Y32IVQO5" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<main class="flex flex-col items-center astro-Y32IVQO5">

    ${renderComponent($$result, "Carousel", Carousel, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@components/Carousel", "client:component-export": "default", "class": "astro-Y32IVQO5" })}


    <h3 class="text-6xl mb-4 astro-Y32IVQO5">Featured Drinks</h3>
    <div class="flex flex-wrap items-center justify-center w-full gap-8 astro-Y32IVQO5">
      ${drinks.map((drink) => renderTemplate`${renderComponent($$result, "DrinkCard", $$DrinkCard, { "drink": drink, "tag": "Featured", "class": "astro-Y32IVQO5" })}`)}
    </div>
    
  </main>` })}

`;
});

const $$file$8 = "/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/index.astro";
const $$url$8 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$8,
  default: $$Index,
  file: $$file$8,
  url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$7 = createMetadata("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/employee.astro", { modules: [{ module: $$module1$2, specifier: "@layouts/Layout.astro", assert: {} }, { module: $$module4$3, specifier: "@utils/auth", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$7 = createAstro("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/employee.astro", "", "file:///home/kollin/school/software-engineering/dans-frappuccino-paradise/");
const $$Employee = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Employee;
  const account = authenticate(Astro2.cookies);
  if (!account || account.role === "user")
    return Astro2.redirect("/404");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h2 class="text-4xl">Welcome to the secret employee page.</h2>` })}`;
});

const $$file$7 = "/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/employee.astro";
const $$url$7 = "/employee";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$7,
  default: $$Employee,
  file: $$file$7,
  url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const getIngredients$1 = async ({
  hidden
}) => runApiCall(
  {
    method: "GET",
    path: `/ingredients${hidden ? "/all" : ""}`
  }
);
const placeIngredientOrder = async (ingredients) => runApiCall(
  {
    method: "POST",
    path: "/ingredients"
  },
  { ingredients }
);

const $$module1$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: getIngredients$1,
  placeIngredientOrder
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$5 = ["<div", "><div class=\"overflow-x-auto\"><table class=\"table table-zebra w-full\"><thead><tr><th>Ingredient</th><th>Amount</th></tr></thead><tbody><!--#-->", "<!--/--><tr><th><select class=\"text-black select select-bordered\">", "</select></th><th><button class=\"btn btn-primary\">Add</button></th></tr></tbody></table></div><button class=\"btn btn-secondary\">Place order</button></div>"],
  _tmpl$2$1 = ["<tr", "><th>", "</th><th><select class=\"select w-full max-w-xs\"><option selected>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></th></tr>"],
  _tmpl$3 = ["<option", ">", "</option>"];
function DrinkCustomization(props) {
  const [ingredients, setIngredients] = createSignal(props.product.ProductIngredients.map(pi => pi.Ingredient));
  return ssr(_tmpl$$5, ssrHydrationKey(), escape(ingredients().map(i => ssr(_tmpl$2$1, ssrHydrationKey(), escape(i.name)))), escape(props.allIngredients.map(i => ssr(_tmpl$3, ssrHydrationKey() + ssrAttribute("value", escape(i.id, true), false), escape(i.name)))));
}

__astro_tag_component__(DrinkCustomization, "@astrojs/solid-js");

const $$module4$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: DrinkCustomization
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$6 = createMetadata("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/products/[id].astro", { modules: [{ module: $$module1$1, specifier: "@data/api/ingredients", assert: {} }, { module: $$module3$1, specifier: "@data/api/products/get", assert: {} }, { module: $$module1$2, specifier: "@layouts/Layout.astro", assert: {} }, { module: $$module4$2, specifier: "@components/DrinkCustomization", assert: {} }], hydratedComponents: [DrinkCustomization], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$6 = createAstro("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/products/[id].astro", "", "file:///home/kollin/school/software-engineering/dans-frappuccino-paradise/");
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const product = await getProduct$1(id);
  if (!product)
    return Astro2.redirect("/404");
  const allIngredients = await getIngredients$1();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>${product.name}</h1><div class="flex flex-col md:flex-row">
    <div class="scale-100">
      <img${addAttribute(product.imageUrl, "src")} alt="Drink" class="rounded-md scale-100">
    </div>
    ${renderComponent($$result, "DrinkCustomization", DrinkCustomization, { "client:load": true, "allIngredients": allIngredients, "product": product, "client:component-hydration": "load", "client:component-path": "@components/DrinkCustomization", "client:component-export": "default" })}
  </div>` })}`;
});

const $$file$6 = "/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/products/[id].astro";
const $$url$6 = "/products/[id]";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$6,
  default: $$id,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$4 = ["<div", " class=\"flex flex-col gap-2\"><div>You currently have <span class=\"font-bold\">$<!--#-->", "<!--/--></span> in your account.</div><div class=\"flex flex-row gap-2 items-center\"><span>Money to add</span><div class=\"flex flex-row items-center gap-1\"><span>$</span><input type=\"number\" class=\"input input-bordered\"", " min=\"0\"></div></div><div class=\"self-end\"><button class=\"btn btn-primary\">Add Money</button></div></div>"];
function AddMoneyForm(props) {
  const [money, setMoney] = createSignal(0);
  return ssr(_tmpl$$4, ssrHydrationKey(), escape(props.balance) || 0, ssrAttribute("value", escape(money(), true), false));
}

__astro_tag_component__(AddMoneyForm, "@astrojs/solid-js");

const $$module3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: AddMoneyForm
}, Symbol.toStringTag, { value: 'Module' }));

const development = {
	username: "username",
	password: "password",
	database: "database_development",
	dialect: "sqlite",
	logging: false,
	storage: "db.sqlite"
};
const test = {
	username: "username",
	password: "password",
	database: "database_development",
	dialect: "sqlite",
	logging: false,
	storage: "db.sqlite"
};
const production = {
	username: "username",
	password: "password",
	database: "database_development",
	dialect: "sqlite",
	logging: false,
	storage: "db.sqlite"
};
const configFile = {
	development: development,
	test: test,
	production: production
};

const Account$1 = (sequelize) => {
  class Account2 extends Model {
  }
  Account2.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("manager", "employee", "user"),
      allowNull: false
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Account"
  });
  return Account2;
};

const AccountFavorite$1 = (sequelize) => {
  class AccountFavorite2 extends Model {
  }
  AccountFavorite2.init(
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      orderProductId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Account"
    }
  );
  return AccountFavorite2;
};

const Hours$1 = (sequelize) => {
  class Hours2 extends Model {
  }
  Hours2.init({
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    minutesWorked: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Hours"
  });
  return Hours2;
};

const Order$1 = (sequelize) => {
  class Order2 extends Model {
  }
  Order2.init({
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("created", "cancelled", "fulfilled"),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "Order"
  });
  return Order2;
};

const OrderProduct$1 = (sequelize) => {
  class OrderProduct2 extends Model {
  }
  OrderProduct2.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    size: {
      type: DataTypes.ENUM("small", "medium", "large"),
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "OrderProduct"
  });
  return OrderProduct2;
};

const OrderProductIngredient$1 = (sequelize) => {
  class OrderProductIngredient2 extends Model {
  }
  OrderProductIngredient2.init({
    orderProductId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: "OrderProductIngredient"
  });
  return OrderProductIngredient2;
};

const Product$1 = (sequelize) => {
  class Product2 extends Model {
  }
  Product2.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Product"
    }
  );
  return Product2;
};

const ProductIngredient$1 = (sequelize) => {
  class ProductIngredient2 extends Model {
  }
  ProductIngredient2.init(
    {
      ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "ProductIngredient"
    }
  );
  return ProductIngredient2;
};

const StoreConfig$1 = (sequelize) => {
  class StoreConfig2 extends Model {
  }
  StoreConfig2.init(
    {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      value: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "StoreConfig",
      freezeTableName: true,
      timestamps: false
    }
  );
  return StoreConfig2;
};

const Ingredient$1 = (sequelize) => {
  class Ingredient2 extends Model {
  }
  Ingredient2.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      quantityOnHand: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Ingredient"
    }
  );
  return Ingredient2;
};

const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const Account = Account$1(sequelize);
const Hours = Hours$1(sequelize);
const Order = Order$1(sequelize);
const OrderProduct = OrderProduct$1(sequelize);
const Product = Product$1(sequelize);
const StoreConfig = StoreConfig$1(sequelize);
const OrderProductIngredient = OrderProductIngredient$1(sequelize);
const AccountFavorite = AccountFavorite$1(sequelize);
const ProductIngredient = ProductIngredient$1(sequelize);
const Ingredient = Ingredient$1(sequelize);
const db = {
  Account,
  AccountFavorite,
  Hours,
  Order,
  OrderProduct,
  OrderProductIngredient,
  Product,
  ProductIngredient,
  StoreConfig,
  Ingredient,
  sequelize
};
Account.hasMany(Hours);
Account.hasMany(AccountFavorite);
Account.hasMany(Order);
AccountFavorite.belongsTo(Account);
AccountFavorite.belongsTo(OrderProduct);
Hours.belongsTo(Account);
Hours.belongsTo(Account);
Order.belongsTo(Account);
Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);
OrderProduct.hasMany(OrderProductIngredient);
OrderProductIngredient.belongsTo(OrderProduct);
OrderProductIngredient.belongsTo(Ingredient);
Product.hasMany(ProductIngredient);
ProductIngredient.belongsTo(Product);
ProductIngredient.belongsTo(Ingredient);
Ingredient.hasMany(ProductIngredient);

const $$module4$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Account,
  Hours,
  Order,
  OrderProduct,
  Product,
  StoreConfig,
  OrderProductIngredient,
  AccountFavorite,
  ProductIngredient,
  Ingredient,
  default: db
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$5 = createMetadata("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/account.astro", { modules: [{ module: $$module1$2, specifier: "@layouts/Layout.astro", assert: {} }, { module: $$module4$3, specifier: "@utils/auth", assert: {} }, { module: $$module3, specifier: "@components/AddMoneyForm", assert: {} }, { module: $$module4$1, specifier: "@database", assert: {} }], hydratedComponents: [AddMoneyForm], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["idle"]), hoisted: [] });
const $$Astro$5 = createAstro("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/account.astro", "", "file:///home/kollin/school/software-engineering/dans-frappuccino-paradise/");
const $$Account = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Account;
  const account = authenticate(Astro2.cookies);
  if (!account)
    return Astro2.redirect("/signin");
  const newAccount = await db.Account.findByPk(account.id);
  if (!newAccount)
    return Astro2.redirect("/404");
  const balance = Math.round(newAccount.balance * 100) / 100;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Account" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>Welcome, ${account.username}!</h1>${renderComponent($$result, "AddMoneyForm", AddMoneyForm, { "balance": balance, "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@components/AddMoneyForm", "client:component-export": "default" })}` })}`;
});

const $$file$5 = "/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/account.astro";
const $$url$5 = "/account";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$5,
  default: $$Account,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$3 = ["<div", " class=\"alert alert-error shadow-lg mt-3\"><div><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"stroke-current flex-shrink-0 h-6 w-6\" fill=\"none\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z\"></path></svg><span>", "</span></div></div>"];
const ErrorAlert = props => {
  return createComponent$1(Show, {
    get when() {
      return !!props.error;
    },
    get children() {
      return ssr(_tmpl$$3, ssrHydrationKey(), escape(props.error));
    }
  });
};

__astro_tag_component__(ErrorAlert, "@astrojs/solid-js");

const _tmpl$$2 = ["<div", " class=\"flex flex-col gap-2\"><span>Username</span><input class=\"input input-bordered w-full\"><span>Password</span><input class=\"input input-bordered\" type=\"password\"><button class=\"btn btn-primary self-end\">Sign In</button><a href=\"/signup\" class=\"btn btn-secondary btn-outline self-end\">Create Account</a><!--#-->", "<!--/--></div>"];
const SignInForm = () => {
  const [error, setError] = createSignal(null);
  return ssr(_tmpl$$2, ssrHydrationKey(), escape(createComponent$1(ErrorAlert, {
    get error() {
      return error();
    }
  })));
};

__astro_tag_component__(SignInForm, "@astrojs/solid-js");

const $$module1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: SignInForm
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$4 = createMetadata("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/signin.astro", { modules: [{ module: $$module1, specifier: "@components/SignInForm", assert: {} }, { module: $$module1$2, specifier: "@layouts/Layout.astro", assert: {} }, { module: $$module4$3, specifier: "@utils/auth", assert: {} }], hydratedComponents: [SignInForm], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["idle"]), hoisted: [] });
const $$Astro$4 = createAstro("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/signin.astro", "", "file:///home/kollin/school/software-engineering/dans-frappuccino-paradise/");
const $$Signin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Signin;
  const account = authenticate(Astro2.cookies);
  if (account)
    return Astro2.redirect("/account");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sign In" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="w-full md:w-[50%]">
    <h1>Sign In</h1>
    ${renderComponent($$result, "SignInForm", SignInForm, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@components/SignInForm", "client:component-export": "default" })}
  </div>` })}`;
});

const $$file$4 = "/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/signin.astro";
const $$url$4 = "/signin";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$4,
  default: $$Signin,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$1 = ["<div", " class=\"flex flex-col gap-2\"><span>Username</span><input class=\"input input-bordered\"><span>Password</span><input class=\"input input-bordered\" type=\"password\"><button class=\"btn btn-primary self-end\">Create Account</button><a href=\"/signin\" class=\"btn btn-secondary btn-outline self-end\">Log In</a><!--#-->", "<!--/--></div>"];
const SignUpForm = () => {
  const [error, setError] = createSignal(null);
  return ssr(_tmpl$$1, ssrHydrationKey(), escape(createComponent$1(ErrorAlert, {
    get error() {
      return error();
    }
  })));
};

__astro_tag_component__(SignUpForm, "@astrojs/solid-js");

const $$module2$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: SignUpForm
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$3 = createMetadata("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/signup.astro", { modules: [{ module: $$module1$2, specifier: "@layouts/Layout.astro", assert: {} }, { module: $$module2$1, specifier: "@components/SignUpForm", assert: {} }, { module: $$module4$3, specifier: "@utils/auth", assert: {} }], hydratedComponents: [SignUpForm], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["idle"]), hoisted: [] });
const $$Astro$3 = createAstro("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/signup.astro", "", "file:///home/kollin/school/software-engineering/dans-frappuccino-paradise/");
const $$Signup = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Signup;
  const account = authenticate(Astro2.cookies);
  if (account)
    return Astro2.redirect("/account");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sign Up" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<div class="w-full md:w-[50%]">
    <h1>Sign Up</h1>
    ${renderComponent($$result, "SignUpForm", SignUpForm, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "@components/SignUpForm", "client:component-export": "default" })}
  </div>` })}`;
});

const $$file$3 = "/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/signup.astro";
const $$url$3 = "/signup";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$3,
  default: $$Signup,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const numToPrice = (num) => `$${(Math.round(num * 100) / 100).toLocaleString(void 0, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}`;

const $$module6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  numToPrice
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$ = ["<div", "><table class=\"table table-zebra table-compact w-full my-4\"><thead><tr><th class=\"text-center\">Ingredient</th><th class=\"text-center\">Quantity</th><th class=\"text-center\">Price Per Unit</th><th class=\"text-center\">Order Quantity</th><th class=\"text-center\">Cost</th></tr></thead><tbody><!--#-->", "<!--/--><tr><th>Total cost</th><td></td><td></td><td colspan=\"2\"><div class=\"flex flex-row gap-3 items-center justify-end\"><div>", "</div><button class=\"btn btn-primary\">Place Order</button></div></td></tr></tbody></table><!--#-->", "<!--/--></div>"],
  _tmpl$2 = ["<tr", "><td class=\"font-bold\">", "</td><td class=\"text-center\">", "</td><td class=\"text-center\">", "</td><td class=\"text-center\"><input type=\"number\" class=\"input input-bordered input-sm\"", " min=\"0\"></td><td class=\"text-center\">", "</td></tr>"];
function Inventory(props) {
  const [order, setOrder] = createSignal( /* @__PURE__ */new Map());
  const [error, setError] = createSignal(null);
  const totalCost = () => {
    return [...order().entries()].reduce((sum, [id, quanity]) => {
      const cost = props.ingredients.find(i => i.id === id)?.price;
      if (!cost) return sum;
      return sum + quanity * cost;
    }, 0);
  };
  return ssr(_tmpl$, ssrHydrationKey(), escape(props.ingredients.map(ingredient => ssr(_tmpl$2, ssrHydrationKey(), escape(ingredient.name), escape(ingredient.quantityOnHand), escape(numToPrice(ingredient.price)), ssrAttribute("value", escape(order().get(ingredient.id), true) || 0, false), escape(numToPrice((order().get(ingredient.id) || 0) * ingredient.price))))), escape(numToPrice(totalCost())), escape(createComponent$1(ErrorAlert, {
    get error() {
      return error();
    }
  })));
}

__astro_tag_component__(Inventory, "@astrojs/solid-js");

const $$module4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: Inventory
}, Symbol.toStringTag, { value: 'Module' }));

const getLatestOrder = async (accountId) => {
  const orders = await db.Order.findAll({
    where: {
      accountId,
      paid: false,
      status: "created"
    },
    include: [{
      model: db.OrderProduct,
      include: [{
        model: db.OrderProductIngredient,
        include: [db.Ingredient]
      }]
    }],
    order: [["createdAt", "DESC"]],
    limit: 1
  });
  const order = orders.length > 0 ? orders[0] : null;
  return order;
};
const getConfig = async (key, defaultValue) => {
  const config = await db.StoreConfig.findByPk(key);
  return config?.value || defaultValue;
};
const CONFIG_STORE_BALANCE = "balance";

const $$module5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  getLatestOrder,
  getConfig,
  CONFIG_STORE_BALANCE
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$2 = createMetadata("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/admin.astro", { modules: [{ module: $$module1$1, specifier: "@data/api/ingredients", assert: {} }, { module: $$module1$2, specifier: "@layouts/Layout.astro", assert: {} }, { module: $$module4$3, specifier: "@utils/auth", assert: {} }, { module: $$module4, specifier: "@components/Manager/Inventory", assert: {} }, { module: $$module5, specifier: "@utils/db", assert: {} }, { module: $$module6, specifier: "@utils/strings", assert: {} }], hydratedComponents: [Inventory], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["idle"]), hoisted: [] });
const $$Astro$2 = createAstro("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/admin.astro", "", "file:///home/kollin/school/software-engineering/dans-frappuccino-paradise/");
const $$Admin = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Admin;
  const account = authenticate(Astro2.cookies);
  if (!account || account.role !== "manager")
    return Astro2.redirect("/404");
  const ingredients = await getIngredients$1({ hidden: true });
  const storeBalance = await getConfig(CONFIG_STORE_BALANCE, 0);
  const storeBalanceString = numToPrice(storeBalance);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h2 class="text-4xl mt-6 mb-2">Hey there, ${account.username}! Welcome to the manager page.</h2><div class="text-xl">
    Current store balance: <span class="font-bold">${storeBalanceString}</span>
  </div><div class="overflow-x-auto">
    ${renderComponent($$result, "Inventory", Inventory, { "client:idle": true, "ingredients": ingredients, "client:component-hydration": "idle", "client:component-path": "@components/Manager/Inventory", "client:component-export": "default" })}
  </div>` })}`;
});

const $$file$2 = "/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/admin.astro";
const $$url$2 = "/admin";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$2,
  default: $$Admin,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const getUser$1 = async () => runApiCall({
  method: "GET",
  path: "/accounts"
});

const $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: getUser$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$1 = createMetadata("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/menu.astro", { modules: [{ module: $$module1$4, specifier: "@components/DrinkCard.astro", assert: {} }, { module: $$module2, specifier: "@data/api/accounts/get", assert: {} }, { module: $$module3$1, specifier: "@data/api/products/get", assert: {} }, { module: $$module4$3, specifier: "@utils/auth", assert: {} }, { module: $$module5, specifier: "@utils/db", assert: {} }, { module: $$module1$2, specifier: "../layouts/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$1 = createAstro("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/menu.astro", "", "file:///home/kollin/school/software-engineering/dans-frappuccino-paradise/");
const $$Menu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Menu;
  const account = authenticate(Astro2.cookies);
  if (!account)
    return Astro2.redirect("/signin");
  const drinks = await getProducts$1();
  const order = await getLatestOrder(account.id);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "", "class": "astro-TMCDB42L" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<main class="flex flex-col items-center astro-TMCDB42L">
    ${order ? renderTemplate`<div class="astro-TMCDB42L">
          <h2 class="astro-TMCDB42L">Cart</h2>
          ${JSON.stringify(order)}
        </div>` : null}

    <h1 class="astro-TMCDB42L">Menu</h1>

    <div class="flex flex-wrap items-center justify-center w-full gap-8 astro-TMCDB42L">
      ${drinks.map((drink) => renderTemplate`${renderComponent($$result, "DrinkCard", $$DrinkCard, { "drink": drink, "class": "astro-TMCDB42L" })}`)}
    </div>
  </main>` })}

`;
});

const $$file$1 = "/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/menu.astro";
const $$url$1 = "/menu";

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$1,
  default: $$Menu,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata = createMetadata("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/404.astro", { modules: [{ module: $$module1$2, specifier: "@layouts/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/404.astro", "", "file:///home/kollin/school/software-engineering/dans-frappuccino-paradise/");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Not found" }, { "default": () => renderTemplate`
  Whatever you were looking for has unfortunately not been found.
` })}`;
});

const $$file = "/home/kollin/school/software-engineering/dans-frappuccino-paradise/src/pages/404.astro";
const $$url = "/404";

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
class InvalidRequestError extends HttpError {
  constructor(message) {
    super(400, message);
  }
}
class ForbiddenError extends HttpError {
  constructor(message) {
    super(403, message);
  }
}
class NotFoundError extends HttpError {
  constructor(message) {
    super(404, message);
  }
}
const wrapper = (handler) => async ({ request, params }) => {
  let body = {};
  try {
    body = await request.json();
  } catch (err) {
  }
  try {
    const result = await handler({
      params,
      body
    });
    if (!result)
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    if (err instanceof HttpError)
      return new Response(JSON.stringify({ error: err.message }), {
        status: err.statusCode
      });
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Something unexpected happened." }),
      { status: 500 }
    );
  }
};
const authorizedWrapper = (handler) => async ({ request, params }) => {
  let body = {};
  try {
    body = await request.json();
  } catch (err) {
  }
  const auth = request.headers.get("authorization")?.split(" ");
  try {
    const user = auth?.length || 0 > 1 ? verifyToken(auth[1]) : null;
    if (!user)
      throw new ForbiddenError("You must be signed in");
    const result = await handler({
      params,
      body,
      user
    });
    if (!result)
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    if (err instanceof HttpError)
      return new Response(JSON.stringify({ error: err.message }), {
        status: err.statusCode
      });
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Something unexpected happened." }),
      { status: 500 }
    );
  }
};
const adminWrapper = (handler) => async ({ request, params }) => {
  let body = {};
  try {
    body = await request.json();
  } catch (err) {
  }
  const auth = request.headers.get("authorization")?.split(" ");
  try {
    const user = auth?.length || 0 > 1 ? verifyToken(auth[1]) : null;
    if (!user)
      throw new ForbiddenError("You must be signed in");
    if (user.role !== "manager")
      throw new ForbiddenError(
        "You must be an admin to access this resource"
      );
    const result = await handler({
      params,
      body,
      user
    });
    if (!result)
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    if (err instanceof HttpError)
      return new Response(JSON.stringify({ error: err.message }), {
        status: err.statusCode
      });
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Something unexpected happened." }),
      { status: 500 }
    );
  }
};

const getIngredients = async () => {
  return db.Ingredient.findAll({
    where: {
      hidden: false
    }
  });
};
const get$6 = wrapper(getIngredients);
const placeInventoryOrder = async ({ body }) => {
  const ingredients = await db.Ingredient.findAll({
    where: { id: body.ingredients.map((i) => i.id) }
  });
  const ingredientIdToQuantity = body.ingredients.reduce((map, i) => {
    map.set(i.id, i.quantity);
    return map;
  }, /* @__PURE__ */ new Map());
  let totalCost = 0;
  for (const i of ingredients) {
    const quantity = ingredientIdToQuantity.get(i.id) || 0;
    totalCost += quantity * i.price;
  }
  const currentBalance = await getConfig(CONFIG_STORE_BALANCE, 0);
  if (currentBalance < totalCost)
    throw new InvalidRequestError("Insufficient funds");
  const [balanceConfig] = await db.StoreConfig.upsert({ key: CONFIG_STORE_BALANCE, value: currentBalance - totalCost });
  for (const i of ingredients) {
    const quantity = ingredientIdToQuantity.get(i.id) || 0;
    await i.update({ quantityOnHand: i.quantityOnHand + quantity });
  }
  return {
    currentBalance: balanceConfig.value,
    totalCost
  };
};
const post$4 = adminWrapper(placeInventoryOrder);

const _page9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  get: get$6,
  post: post$4
}, Symbol.toStringTag, { value: 'Module' }));

const getAllIngredients = async () => {
  return db.Ingredient.findAll();
};
const get$5 = wrapper(getAllIngredients);

const _page10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  get: get$5
}, Symbol.toStringTag, { value: 'Module' }));

const createUser = async ({ body }) => {
  const { username, password } = body;
  const exisiting = await db.Account.findOne({ where: { username } });
  if (exisiting)
    throw new InvalidRequestError("Username is already taken");
  const account = await db.Account.create({
    username,
    password: await hash(password),
    role: "user"
  });
  const { password: _, ...userData } = account.get({ plain: true });
  return {
    ...userData,
    token: createToken(userData)
  };
};
const post$3 = wrapper(createUser);
const getUser = async ({ user }) => {
  const account = await db.Account.findByPk(user.id);
  if (!account)
    throw new NotFoundError("Unable to find account");
  return account;
};
const get$4 = authorizedWrapper(getUser);

const _page11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  post: post$3,
  get: get$4
}, Symbol.toStringTag, { value: 'Module' }));

const login = async ({ body }) => {
  const { username, password } = body;
  const account = await db.Account.findOne({
    where: { username, isDeleted: false }
  });
  if (!account)
    throw new NotFoundError("Unable to find account");
  if (!await verify(account.password, password))
    throw new ForbiddenError("Invalid credentials");
  const { password: _, ...userData } = account.get({ plain: true });
  return {
    ...userData,
    token: createToken(userData)
  };
};
const post$2 = wrapper(login);

const _page12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  post: post$2
}, Symbol.toStringTag, { value: 'Module' }));

const addFunds = async ({ body, user }) => {
  const { amount } = body;
  const account = await db.Account.findByPk(user.id);
  if (!account)
    throw new NotFoundError("Unable to find account");
  await account.update({
    balance: (account.balance || 0) + amount
  });
  const { password: _, ...data } = account.get({ plain: true });
  return data;
};
const post$1 = authorizedWrapper(addFunds);

const _page13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  addFunds,
  post: post$1
}, Symbol.toStringTag, { value: 'Module' }));

const getProducts = async () => {
  return db.Product.findAll({
    where: {
      isDeleted: false
    }
  });
};
const get$3 = wrapper(getProducts);

const _page14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  get: get$3
}, Symbol.toStringTag, { value: 'Module' }));

const getProduct = async ({ params }) => {
  const productId = params.id;
  const product = await db.Product.findByPk(productId, {
    include: [{
      model: db.ProductIngredient,
      include: [{
        model: db.Ingredient,
        where: {
          hidden: false
        }
      }]
    }]
  });
  if (!product)
    throw new NotFoundError("Product not found");
  return product;
};
const get$2 = wrapper(getProduct);

const _page15 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  get: get$2
}, Symbol.toStringTag, { value: 'Module' }));

const createOrder = async ({ user }) => {
  const order = await db.Order.create({
    accountId: user.id,
    status: "created",
    paid: false
  });
  return order;
};
const post = authorizedWrapper(createOrder);

const _page16 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  post
}, Symbol.toStringTag, { value: 'Module' }));

const getOrder = async ({ params }) => {
  const orderId = params.orderId;
  const order = await db.Order.findByPk(orderId);
  if (!order)
    throw new NotFoundError("order not found");
  return order;
};
const get$1 = wrapper(getOrder);

const _page17 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  get: get$1
}, Symbol.toStringTag, { value: 'Module' }));

const addProductToOrder = async ({ body, params, user }) => {
  const { orderId, productId } = params;
  const order = await db.Order.findByPk(orderId);
  if (!order)
    throw new NotFoundError("order not found");
  if (order.accountId !== user.id)
    throw new ForbiddenError("Insufficient permissions");
  if (typeof orderId !== "number" || typeof productId !== "number")
    throw new InvalidRequestError("Ids must be numbers");
  const op = await db.OrderProduct.create(
    {
      productId,
      orderId,
      size: body.size
    },
    { include: [db.OrderProductIngredient] }
  );
  for (const i of body.ingredients)
    await db.OrderProductIngredient.create({
      orderProductId: op.id,
      ingredientId: i.ingredientId,
      quantity: i.quantity
    });
  return db.OrderProduct.findByPk(op.id, {
    include: [db.OrderProductIngredient]
  });
};
const get = authorizedWrapper(addProductToOrder);

const _page18 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  addProductToOrder,
  get
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([['src/pages/index.astro', _page0],['src/pages/employee.astro', _page1],['src/pages/products/[id].astro', _page2],['src/pages/account.astro', _page3],['src/pages/signin.astro', _page4],['src/pages/signup.astro', _page5],['src/pages/admin.astro', _page6],['src/pages/menu.astro', _page7],['src/pages/404.astro', _page8],['src/pages/api/ingredients/index.ts', _page9],['src/pages/api/ingredients/all.ts', _page10],['src/pages/api/accounts/index.ts', _page11],['src/pages/api/accounts/signIn.ts', _page12],['src/pages/api/accounts/funds.ts', _page13],['src/pages/api/products/index.ts', _page14],['src/pages/api/products/[id].ts', _page15],['src/pages/api/orders/index.ts', _page16],['src/pages/api/orders/[orderId]/index.ts', _page17],['src/pages/api/orders/[orderId]/products/[productId].ts', _page18],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),Object.assign({"name":"@astrojs/solid-js","clientEntrypoint":"@astrojs/solid-js/client.js","serverEntrypoint":"@astrojs/solid-js/server.js","jsxImportSource":"solid-js"}, { ssr: server_default$1 }),];

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose")) ; else if (process.argv.includes("--silent")) ; else ;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes
  };
}

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"","links":["assets/404.ed748d82.css","assets/index.5bbaf10d.css"],"scripts":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/404.ed748d82.css"],"scripts":[],"routeData":{"route":"/employee","type":"page","pattern":"^\\/employee\\/?$","segments":[[{"content":"employee","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/employee.astro","pathname":"/employee","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/404.ed748d82.css"],"scripts":[],"routeData":{"route":"/products/[id]","type":"page","pattern":"^\\/products\\/([^/]+?)\\/?$","segments":[[{"content":"products","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/products/[id].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/404.ed748d82.css"],"scripts":[],"routeData":{"route":"/account","type":"page","pattern":"^\\/account\\/?$","segments":[[{"content":"account","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/account.astro","pathname":"/account","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/404.ed748d82.css"],"scripts":[],"routeData":{"route":"/signin","type":"page","pattern":"^\\/signin\\/?$","segments":[[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signin.astro","pathname":"/signin","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/404.ed748d82.css"],"scripts":[],"routeData":{"route":"/signup","type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/404.ed748d82.css"],"scripts":[],"routeData":{"route":"/admin","type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/404.ed748d82.css","assets/menu.b5abf54e.css"],"scripts":[],"routeData":{"route":"/menu","type":"page","pattern":"^\\/menu\\/?$","segments":[[{"content":"menu","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/menu.astro","pathname":"/menu","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/404.ed748d82.css"],"scripts":[],"routeData":{"route":"/404","type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/api/ingredients","type":"endpoint","pattern":"^\\/api\\/ingredients$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"ingredients","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/ingredients/index.ts","pathname":"/api/ingredients","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/api/ingredients/all","type":"endpoint","pattern":"^\\/api\\/ingredients\\/all$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"ingredients","dynamic":false,"spread":false}],[{"content":"all","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/ingredients/all.ts","pathname":"/api/ingredients/all","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/api/accounts","type":"endpoint","pattern":"^\\/api\\/accounts$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"accounts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/accounts/index.ts","pathname":"/api/accounts","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/api/accounts/signin","type":"endpoint","pattern":"^\\/api\\/accounts\\/signIn$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"accounts","dynamic":false,"spread":false}],[{"content":"signIn","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/accounts/signIn.ts","pathname":"/api/accounts/signIn","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/api/accounts/funds","type":"endpoint","pattern":"^\\/api\\/accounts\\/funds$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"accounts","dynamic":false,"spread":false}],[{"content":"funds","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/accounts/funds.ts","pathname":"/api/accounts/funds","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/api/products","type":"endpoint","pattern":"^\\/api\\/products$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/products/index.ts","pathname":"/api/products","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/api/products/[id]","type":"endpoint","pattern":"^\\/api\\/products\\/([^/]+?)$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/products/[id].ts","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/api/orders","type":"endpoint","pattern":"^\\/api\\/orders$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"orders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/orders/index.ts","pathname":"/api/orders","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/api/orders/[orderid]","type":"endpoint","pattern":"^\\/api\\/orders\\/([^/]+?)$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"orders","dynamic":false,"spread":false}],[{"content":"orderId","dynamic":true,"spread":false}]],"params":["orderId"],"component":"src/pages/api/orders/[orderId]/index.ts","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/api/orders/[orderid]/products/[productid]","type":"endpoint","pattern":"^\\/api\\/orders\\/([^/]+?)\\/products\\/([^/]+?)$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"orders","dynamic":false,"spread":false}],[{"content":"orderId","dynamic":true,"spread":false}],[{"content":"products","dynamic":false,"spread":false}],[{"content":"productId","dynamic":true,"spread":false}]],"params":["orderId","productId"],"component":"src/pages/api/orders/[orderId]/products/[productId].ts","_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"extendDefaultPlugins":false,"isAstroFlavoredMd":false},"pageMap":null,"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","@components/Carousel":"index.ee4a7c46.js","@components/DrinkCustomization":"DrinkCustomization.7ae1b23b.js","@components/AddMoneyForm":"AddMoneyForm.990f03e8.js","@components/SignInForm":"SignInForm.2724fb9e.js","@components/SignUpForm":"SignUpForm.504087e3.js","@components/Manager/Inventory":"Inventory.eb945618.js","@components/SignOutButton":"SignOutButton.2a4f022c.js","@astrojs/solid-js/client.js":"client.e11d182f.js","astro:scripts/before-hydration.js":""},"assets":["/assets/404.ed748d82.css","/assets/index.5bbaf10d.css","/assets/menu.b5abf54e.css","/AddMoneyForm.990f03e8.js","/DrinkCustomization.7ae1b23b.js","/Inventory.eb945618.js","/SignInForm.2724fb9e.js","/SignOutButton.2a4f022c.js","/SignUpForm.504087e3.js","/client.e11d182f.js","/favicon.ico","/index.ee4a7c46.js","/assets/caramel.jpg","/assets/coffee.jpg","/assets/matcha.jpg","/assets/mocha.jpg","/assets/pumpkinspice.jpg","/assets/raspberry.jpg","/chunks/ErrorAlert.8ce41386.js","/chunks/index.6536db8b.js","/chunks/web.db3323f0.js"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler };
