// node_modules/vue-router/dist/vue-router.esm.js
function assert(condition, message) {
  if (!condition) {
    throw new Error("[vue-router] " + message);
  }
}
function warn(condition, message) {
  if (!condition) {
    typeof console !== "undefined" && console.warn("[vue-router] " + message);
  }
}
function extend(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function(c) {
  return "%" + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;
var encode = function(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ",");
};
function decode(str) {
  try {
    return decodeURIComponent(str);
  } catch (err) {
    if (true) {
      warn(false, 'Error decoding "' + str + '". Leaving it intact.');
    }
  }
  return str;
}
function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) extraQuery = {};
  var parse2 = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse2(query || "");
  } catch (e) {
    warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var value = extraQuery[key];
    parsedQuery[key] = Array.isArray(value) ? value.map(castQueryParamValue) : castQueryParamValue(value);
  }
  return parsedQuery;
}
var castQueryParamValue = function(value) {
  return value == null || typeof value === "object" ? value : String(value);
};
function parseQuery(query) {
  var res = {};
  query = query.trim().replace(/^(\?|#|&)/, "");
  if (!query) {
    return res;
  }
  query.split("&").forEach(function(param) {
    var parts = param.replace(/\+/g, " ").split("=");
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join("=")) : null;
    if (res[key] === void 0) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });
  return res;
}
function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function(key) {
    var val = obj[key];
    if (val === void 0) {
      return "";
    }
    if (val === null) {
      return encode(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function(val2) {
        if (val2 === void 0) {
          return;
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + "=" + encode(val2));
        }
      });
      return result.join("&");
    }
    return encode(key) + "=" + encode(val);
  }).filter(function(x) {
    return x.length > 0;
  }).join("&") : null;
  return res ? "?" + res : "";
}
var trailingSlashRE = /\/?$/;
function createRoute(record, location, redirectedFrom, router) {
  var stringifyQuery2 = router && router.options.stringifyQuery;
  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {
  }
  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || "/",
    hash: location.hash || "",
    query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery2),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery2);
  }
  return Object.freeze(route);
}
function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && typeof value === "object") {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res;
  } else {
    return value;
  }
}
var START = createRoute(null, {
  path: "/"
});
function formatMatch(record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res;
}
function getFullPath(ref, _stringifyQuery) {
  var path = ref.path;
  var query = ref.query;
  if (query === void 0) query = {};
  var hash = ref.hash;
  if (hash === void 0) hash = "";
  var stringify = _stringifyQuery || stringifyQuery;
  return (path || "/") + stringify(query) + hash;
}
function isSameRoute(a, b, onlyPath) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, "") === b.path.replace(trailingSlashRE, "") && (onlyPath || a.hash === b.hash && isObjectEqual(a.query, b.query));
  } else if (a.name && b.name) {
    return a.name === b.name && (onlyPath || a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params));
  } else {
    return false;
  }
}
function isObjectEqual(a, b) {
  if (a === void 0) a = {};
  if (b === void 0) b = {};
  if (!a || !b) {
    return a === b;
  }
  var aKeys = Object.keys(a).sort();
  var bKeys = Object.keys(b).sort();
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every(function(key, i) {
    var aVal = a[key];
    var bKey = bKeys[i];
    if (bKey !== key) {
      return false;
    }
    var bVal = b[key];
    if (aVal == null || bVal == null) {
      return aVal === bVal;
    }
    if (typeof aVal === "object" && typeof bVal === "object") {
      return isObjectEqual(aVal, bVal);
    }
    return String(aVal) === String(bVal);
  });
}
function isIncludedRoute(current, target) {
  return current.path.replace(trailingSlashRE, "/").indexOf(
    target.path.replace(trailingSlashRE, "/")
  ) === 0 && (!target.hash || current.hash === target.hash) && queryIncludes(current.query, target.query);
}
function queryIncludes(current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false;
    }
  }
  return true;
}
function handleRouteEntered(route) {
  for (var i = 0; i < route.matched.length; i++) {
    var record = route.matched[i];
    for (var name in record.instances) {
      var instance = record.instances[name];
      var cbs = record.enteredCbs[name];
      if (!instance || !cbs) {
        continue;
      }
      delete record.enteredCbs[name];
      for (var i$1 = 0; i$1 < cbs.length; i$1++) {
        if (!instance._isBeingDestroyed) {
          cbs[i$1](instance);
        }
      }
    }
  }
}
var View = {
  name: "RouterView",
  functional: true,
  props: {
    name: {
      type: String,
      default: "default"
    }
  },
  render: function render(_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;
    data.routerView = true;
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode ? parent.$vnode.data : {};
      if (vnodeData.routerView) {
        depth++;
      }
      if (vnodeData.keepAlive && parent._directInactive && parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;
    if (inactive) {
      var cachedData = cache[name];
      var cachedComponent = cachedData && cachedData.component;
      if (cachedComponent) {
        if (cachedData.configProps) {
          fillPropsinData(cachedComponent, data, cachedData.route, cachedData.configProps);
        }
        return h(cachedComponent, data, children);
      } else {
        return h();
      }
    }
    var matched = route.matched[depth];
    var component = matched && matched.components[name];
    if (!matched || !component) {
      cache[name] = null;
      return h();
    }
    cache[name] = { component };
    data.registerRouteInstance = function(vm, val) {
      var current = matched.instances[name];
      if (val && current !== vm || !val && current === vm) {
        matched.instances[name] = val;
      }
    };
    (data.hook || (data.hook = {})).prepatch = function(_2, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };
    data.hook.init = function(vnode) {
      if (vnode.data.keepAlive && vnode.componentInstance && vnode.componentInstance !== matched.instances[name]) {
        matched.instances[name] = vnode.componentInstance;
      }
      handleRouteEntered(route);
    };
    var configProps = matched.props && matched.props[name];
    if (configProps) {
      extend(cache[name], {
        route,
        configProps
      });
      fillPropsinData(component, data, route, configProps);
    }
    return h(component, data, children);
  }
};
function fillPropsinData(component, data, route, configProps) {
  var propsToPass = data.props = resolveProps(route, configProps);
  if (propsToPass) {
    propsToPass = data.props = extend({}, propsToPass);
    var attrs = data.attrs = data.attrs || {};
    for (var key in propsToPass) {
      if (!component.props || !(key in component.props)) {
        attrs[key] = propsToPass[key];
        delete propsToPass[key];
      }
    }
  }
}
function resolveProps(route, config) {
  switch (typeof config) {
    case "undefined":
      return;
    case "object":
      return config;
    case "function":
      return config(route);
    case "boolean":
      return config ? route.params : void 0;
    default:
      if (true) {
        warn(
          false,
          'props in "' + route.path + '" is a ' + typeof config + ", expecting an object, function or boolean."
        );
      }
  }
}
function resolvePath(relative, base, append) {
  var firstChar = relative.charAt(0);
  if (firstChar === "/") {
    return relative;
  }
  if (firstChar === "?" || firstChar === "#") {
    return base + relative;
  }
  var stack = base.split("/");
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }
  var segments = relative.replace(/^\//, "").split("/");
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === "..") {
      stack.pop();
    } else if (segment !== ".") {
      stack.push(segment);
    }
  }
  if (stack[0] !== "") {
    stack.unshift("");
  }
  return stack.join("/");
}
function parsePath(path) {
  var hash = "";
  var query = "";
  var hashIndex = path.indexOf("#");
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }
  var queryIndex = path.indexOf("?");
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }
  return {
    path,
    query,
    hash
  };
}
function cleanPath(path) {
  return path.replace(/\/(?:\s*\/)+/g, "/");
}
var isarray = Array.isArray || function(arr) {
  return Object.prototype.toString.call(arr) == "[object Array]";
};
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  "(\\\\.)",
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"
].join("|"), "g");
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = "";
  var defaultDelimiter = options && options.delimiter || "/";
  var res;
  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;
    if (escaped) {
      path += escaped[1];
      continue;
    }
    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];
    if (path) {
      tokens.push(path);
      path = "";
    }
    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === "+" || modifier === "*";
    var optional = modifier === "?" || modifier === "*";
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || "",
      delimiter,
      optional,
      repeat,
      partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? ".*" : "[^" + escapeString(delimiter) + "]+?"
    });
  }
  if (index < str.length) {
    path += str.substr(index);
  }
  if (path) {
    tokens.push(path);
  }
  return tokens;
}
function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
function tokensToFunction(tokens, options) {
  var matches = new Array(tokens.length);
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === "object") {
      matches[i] = new RegExp("^(?:" + tokens[i].pattern + ")$", flags(options));
    }
  }
  return function(obj, opts) {
    var path = "";
    var data = obj || {};
    var options2 = opts || {};
    var encode2 = options2.pretty ? encodeURIComponentPretty : encodeURIComponent;
    for (var i2 = 0; i2 < tokens.length; i2++) {
      var token = tokens[i2];
      if (typeof token === "string") {
        path += token;
        continue;
      }
      var value = data[token.name];
      var segment;
      if (value == null) {
        if (token.optional) {
          if (token.partial) {
            path += token.prefix;
          }
          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }
      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + "`");
        }
        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }
        for (var j = 0; j < value.length; j++) {
          segment = encode2(value[j]);
          if (!matches[i2].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + "`");
          }
          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }
        continue;
      }
      segment = token.asterisk ? encodeAsterisk(value) : encode2(value);
      if (!matches[i2].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }
      path += token.prefix + segment;
    }
    return path;
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
}
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, "\\$1");
}
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  var groups = path.source.match(/\((?!\?)/g);
  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }
  return attachKeys(path, keys);
}
function arrayToRegexp(path, keys, options) {
  var parts = [];
  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }
  var regexp = new RegExp("(?:" + parts.join("|") + ")", flags(options));
  return attachKeys(regexp, keys);
}
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}
function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */
    keys || options;
    keys = [];
  }
  options = options || {};
  var strict = options.strict;
  var end = options.end !== false;
  var route = "";
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (typeof token === "string") {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = "(?:" + token.pattern + ")";
      keys.push(token);
      if (token.repeat) {
        capture += "(?:" + prefix + capture + ")*";
      }
      if (token.optional) {
        if (!token.partial) {
          capture = "(?:" + prefix + "(" + capture + "))?";
        } else {
          capture = prefix + "(" + capture + ")?";
        }
      } else {
        capture = prefix + "(" + capture + ")";
      }
      route += capture;
    }
  }
  var delimiter = escapeString(options.delimiter || "/");
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + "(?:" + delimiter + "(?=$))?";
  }
  if (end) {
    route += "$";
  } else {
    route += strict && endsWithDelimiter ? "" : "(?=" + delimiter + "|$)";
  }
  return attachKeys(new RegExp("^" + route, flags(options)), keys);
}
function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */
    keys || options;
    keys = [];
  }
  options = options || {};
  if (path instanceof RegExp) {
    return regexpToRegexp(
      path,
      /** @type {!Array} */
      keys
    );
  }
  if (isarray(path)) {
    return arrayToRegexp(
      /** @type {!Array} */
      path,
      /** @type {!Array} */
      keys,
      options
    );
  }
  return stringToRegexp(
    /** @type {string} */
    path,
    /** @type {!Array} */
    keys,
    options
  );
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;
var regexpCompileCache = /* @__PURE__ */ Object.create(null);
function fillParams(path, params, routeMsg) {
  params = params || {};
  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    if (typeof params.pathMatch === "string") {
      params[0] = params.pathMatch;
    }
    return filler(params, { pretty: true });
  } catch (e) {
    if (true) {
      warn(typeof params.pathMatch === "string", "missing param for " + routeMsg + ": " + e.message);
    }
    return "";
  } finally {
    delete params[0];
  }
}
function normalizeLocation(raw, current, append, router) {
  var next = typeof raw === "string" ? { path: raw } : raw;
  if (next._normalized) {
    return next;
  } else if (next.name) {
    next = extend({}, raw);
    var params = next.params;
    if (params && typeof params === "object") {
      next.params = extend({}, params);
    }
    return next;
  }
  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params$1 = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params$1;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params$1, "path " + current.path);
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next;
  }
  var parsedPath = parsePath(next.path || "");
  var basePath = current && current.path || "/";
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append || next.append) : basePath;
  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );
  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== "#") {
    hash = "#" + hash;
  }
  return {
    _normalized: true,
    path,
    query,
    hash
  };
}
var toTypes = [String, Object];
var eventTypes = [String, Array];
var noop = function() {
};
var warnedCustomSlot;
var warnedTagProp;
var warnedEventProp;
var Link = {
  name: "RouterLink",
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: "a"
    },
    custom: Boolean,
    exact: Boolean,
    exactPath: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    event: {
      type: eventTypes,
      default: "click"
    }
  },
  render: function render2(h) {
    var this$1$1 = this;
    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(
      this.to,
      current,
      this.append
    );
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;
    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    var activeClassFallback = globalActiveClass == null ? "router-link-active" : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? "router-link-exact-active" : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = route.redirectedFrom ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router) : route;
    classes[exactActiveClass] = isSameRoute(current, compareTarget, this.exactPath);
    classes[activeClass] = this.exact || this.exactPath ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);
    var ariaCurrentValue = classes[exactActiveClass] ? this.ariaCurrentValue : null;
    var handler = function(e) {
      if (guardEvent(e)) {
        if (this$1$1.replace) {
          router.replace(location, noop);
        } else {
          router.push(location, noop);
        }
      }
    };
    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function(e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }
    var data = { class: classes };
    var scopedSlot = !this.$scopedSlots.$hasNormal && this.$scopedSlots.default && this.$scopedSlots.default({
      href,
      route,
      navigate: handler,
      isActive: classes[activeClass],
      isExactActive: classes[exactActiveClass]
    });
    if (scopedSlot) {
      if (!this.custom) {
        !warnedCustomSlot && warn(false, 'In Vue Router 4, the v-slot API will by default wrap its content with an <a> element. Use the custom prop to remove this warning:\n<router-link v-slot="{ navigate, href }" custom></router-link>\n');
        warnedCustomSlot = true;
      }
      if (scopedSlot.length === 1) {
        return scopedSlot[0];
      } else if (scopedSlot.length > 1 || !scopedSlot.length) {
        if (true) {
          warn(
            false,
            '<router-link> with to="' + this.to + `" is trying to use a scoped slot but it didn't provide exactly one child. Wrapping the content with a span element.`
          );
        }
        return scopedSlot.length === 0 ? h() : h("span", {}, scopedSlot);
      }
    }
    if (true) {
      if ("tag" in this.$options.propsData && !warnedTagProp) {
        warn(
          false,
          "<router-link>'s tag prop is deprecated and has been removed in Vue Router 4. Use the v-slot API to remove this warning: https://next.router.vuejs.org/guide/migration/#removal-of-event-and-tag-props-in-router-link."
        );
        warnedTagProp = true;
      }
      if ("event" in this.$options.propsData && !warnedEventProp) {
        warn(
          false,
          "<router-link>'s event prop is deprecated and has been removed in Vue Router 4. Use the v-slot API to remove this warning: https://next.router.vuejs.org/guide/migration/#removal-of-event-and-tag-props-in-router-link."
        );
        warnedEventProp = true;
      }
    }
    if (this.tag === "a") {
      data.on = on;
      data.attrs = { href, "aria-current": ariaCurrentValue };
    } else {
      var a = findAnchor(this.$slots.default);
      if (a) {
        a.isStatic = false;
        var aData = a.data = extend({}, a.data);
        aData.on = aData.on || {};
        for (var event in aData.on) {
          var handler$1 = aData.on[event];
          if (event in on) {
            aData.on[event] = Array.isArray(handler$1) ? handler$1 : [handler$1];
          }
        }
        for (var event$1 in on) {
          if (event$1 in aData.on) {
            aData.on[event$1].push(on[event$1]);
          } else {
            aData.on[event$1] = handler;
          }
        }
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
        aAttrs["aria-current"] = ariaCurrentValue;
      } else {
        data.on = on;
      }
    }
    return h(this.tag, data, this.$slots.default);
  }
};
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  }
  if (e.defaultPrevented) {
    return;
  }
  if (e.button !== void 0 && e.button !== 0) {
    return;
  }
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target)) {
      return;
    }
  }
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true;
}
function findAnchor(children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === "a") {
        return child;
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}
var _Vue;
function install(Vue) {
  if (install.installed && _Vue === Vue) {
    return;
  }
  install.installed = true;
  _Vue = Vue;
  var isDef = function(v) {
    return v !== void 0;
  };
  var registerInstance = function(vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };
  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });
  Object.defineProperty(Vue.prototype, "$router", {
    get: function get() {
      return this._routerRoot._router;
    }
  });
  Object.defineProperty(Vue.prototype, "$route", {
    get: function get() {
      return this._routerRoot._route;
    }
  });
  Vue.component("RouterView", View);
  Vue.component("RouterLink", Link);
  var strats = Vue.config.optionMergeStrategies;
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}
var inBrowser = typeof window !== "undefined";
function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap, parentRoute) {
  var pathList = oldPathList || [];
  var pathMap = oldPathMap || /* @__PURE__ */ Object.create(null);
  var nameMap = oldNameMap || /* @__PURE__ */ Object.create(null);
  routes.forEach(function(route) {
    addRouteRecord(pathList, pathMap, nameMap, route, parentRoute);
  });
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === "*") {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }
  if (true) {
    var found = pathList.filter(function(path) {
      return path && path.charAt(0) !== "*" && path.charAt(0) !== "/";
    });
    if (found.length > 0) {
      var pathNames = found.map(function(path) {
        return "- " + path;
      }).join("\n");
      warn(false, "Non-nested routes must include a leading slash character. Fix the following routes: \n" + pathNames);
    }
  }
  return {
    pathList,
    pathMap,
    nameMap
  };
}
function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, '"path" is required in a route configuration.');
    assert(
      typeof route.component !== "string",
      'route config "component" for path: ' + String(
        path || name
      ) + " cannot be a string id. Use an actual component instead."
    );
    warn(
      // eslint-disable-next-line no-control-regex
      !/[^\u0000-\u007F]+/.test(path),
      'Route with path "' + path + '" contains unencoded characters, make sure your path is correctly encoded before passing it to the router. Use encodeURI to encode static segments of your path.'
    );
  }
  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);
  if (typeof route.caseSensitive === "boolean") {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }
  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    alias: route.alias ? typeof route.alias === "string" ? [route.alias] : route.alias : [],
    instances: {},
    enteredCbs: {},
    name,
    parent,
    matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : { default: route.props }
  };
  if (route.children) {
    if (true) {
      if (route.name && !route.redirect && route.children.some(function(child) {
        return /^\/?$/.test(child.path);
      })) {
        warn(
          false,
          "Named Route '" + route.name + `' has a default child route. When navigating to this named route (:to="{name: '` + route.name + `'}"), the default child route will not be rendered. Remove the name from this route and use the name of the default child route for named links instead.`
        );
      }
    }
    route.children.forEach(function(child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : void 0;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }
  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }
  if (route.alias !== void 0) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    for (var i = 0; i < aliases.length; ++i) {
      var alias = aliases[i];
      if (alias === path) {
        warn(
          false,
          'Found an alias with the same value as the path: "' + path + '". You have to remove that alias. It will be ignored in development.'
        );
        continue;
      }
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || "/"
        // matchAs
      );
    }
  }
  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (!matchAs) {
      warn(
        false,
        'Duplicate named routes definition: { name: "' + name + '", path: "' + record.path + '" }'
      );
    }
  }
}
function compileRouteRegex(path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = /* @__PURE__ */ Object.create(null);
    regex.keys.forEach(function(key) {
      warn(
        !keys[key.name],
        'Duplicate param keys in route with path: "' + path + '"'
      );
      keys[key.name] = true;
    });
  }
  return regex;
}
function normalizePath(path, parent, strict) {
  if (!strict) {
    path = path.replace(/\/$/, "");
  }
  if (path[0] === "/") {
    return path;
  }
  if (parent == null) {
    return path;
  }
  return cleanPath(parent.path + "/" + path);
}
function createMatcher(routes, router) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;
  function addRoutes2(routes2) {
    createRouteMap(routes2, pathList, pathMap, nameMap);
  }
  function addRoute2(parentOrRoute, route) {
    var parent = typeof parentOrRoute !== "object" ? nameMap[parentOrRoute] : void 0;
    createRouteMap([route || parentOrRoute], pathList, pathMap, nameMap, parent);
    if (parent && parent.alias.length) {
      createRouteMap(
        // $flow-disable-line route is defined if parent is
        parent.alias.map(function(alias2) {
          return { path: alias2, children: [route] };
        }),
        pathList,
        pathMap,
        nameMap,
        parent
      );
    }
  }
  function getRoutes2() {
    return pathList.map(function(path) {
      return pathMap[path];
    });
  }
  function match2(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;
    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, "Route with name '" + name + "' does not exist");
      }
      if (!record) {
        return _createRoute(null, location);
      }
      var paramNames = record.regex.keys.filter(function(key2) {
        return !key2.optional;
      }).map(function(key2) {
        return key2.name;
      });
      if (typeof location.params !== "object") {
        location.params = {};
      }
      if (currentRoute && typeof currentRoute.params === "object") {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }
      location.path = fillParams(record.path, location.params, 'named route "' + name + '"');
      return _createRoute(record, location, redirectedFrom);
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    }
    return _createRoute(null, location);
  }
  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect2 = typeof originalRedirect === "function" ? originalRedirect(createRoute(record, location, null, router)) : originalRedirect;
    if (typeof redirect2 === "string") {
      redirect2 = { path: redirect2 };
    }
    if (!redirect2 || typeof redirect2 !== "object") {
      if (true) {
        warn(
          false,
          "invalid redirect option: " + JSON.stringify(redirect2)
        );
      }
      return _createRoute(null, location);
    }
    var re = redirect2;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty("query") ? re.query : query;
    hash = re.hasOwnProperty("hash") ? re.hash : hash;
    params = re.hasOwnProperty("params") ? re.params : params;
    if (name) {
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, 'redirect failed: named route "' + name + '" not found.');
      }
      return match2({
        _normalized: true,
        name,
        query,
        hash,
        params
      }, void 0, location);
    } else if (path) {
      var rawPath = resolveRecordPath(path, record);
      var resolvedPath = fillParams(rawPath, params, 'redirect route with path "' + rawPath + '"');
      return match2({
        _normalized: true,
        path: resolvedPath,
        query,
        hash
      }, void 0, location);
    } else {
      if (true) {
        warn(false, "invalid redirect option: " + JSON.stringify(redirect2));
      }
      return _createRoute(null, location);
    }
  }
  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params, 'aliased route with path "' + matchAs + '"');
    var aliasedMatch = match2({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }
    return _createRoute(null, location);
  }
  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }
    return createRoute(record, location, redirectedFrom, router);
  }
  return {
    match: match2,
    addRoute: addRoute2,
    getRoutes: getRoutes2,
    addRoutes: addRoutes2
  };
}
function matchRoute(regex, path, params) {
  var m = path.match(regex);
  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }
  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    if (key) {
      params[key.name || "pathMatch"] = typeof m[i] === "string" ? decode(m[i]) : m[i];
    }
  }
  return true;
}
function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : "/", true);
}
var Time = inBrowser && window.performance && window.performance.now ? window.performance : Date;
function genStateKey() {
  return Time.now().toFixed(3);
}
var _key = genStateKey();
function getStateKey() {
  return _key;
}
function setStateKey(key) {
  return _key = key;
}
var positionStore = /* @__PURE__ */ Object.create(null);
function setupScroll() {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  var protocolAndPath = window.location.protocol + "//" + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, "");
  var stateCopy = extend({}, window.history.state);
  stateCopy.key = getStateKey();
  window.history.replaceState(stateCopy, "", absolutePath);
  window.addEventListener("popstate", handlePopState);
  return function() {
    window.removeEventListener("popstate", handlePopState);
  };
}
function handleScroll(router, to, from, isPop) {
  if (!router.app) {
    return;
  }
  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return;
  }
  if (true) {
    assert(typeof behavior === "function", "scrollBehavior must be a function");
  }
  router.app.$nextTick(function() {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(
      router,
      to,
      from,
      isPop ? position : null
    );
    if (!shouldScroll) {
      return;
    }
    if (typeof shouldScroll.then === "function") {
      shouldScroll.then(function(shouldScroll2) {
        scrollToPosition(shouldScroll2, position);
      }).catch(function(err) {
        if (true) {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}
function saveScrollPosition() {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}
function handlePopState(e) {
  saveScrollPosition();
  if (e.state && e.state.key) {
    setStateKey(e.state.key);
  }
}
function getScrollPosition() {
  var key = getStateKey();
  if (key) {
    return positionStore[key];
  }
}
function getElementPosition(el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}
function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}
function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}
function normalizeOffset(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  };
}
function isNumber(v) {
  return typeof v === "number";
}
var hashStartsWithNumberRE = /^#\d/;
function scrollToPosition(shouldScroll, position) {
  var isObject = typeof shouldScroll === "object";
  if (isObject && typeof shouldScroll.selector === "string") {
    var el = hashStartsWithNumberRE.test(shouldScroll.selector) ? document.getElementById(shouldScroll.selector.slice(1)) : document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === "object" ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }
  if (position) {
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        left: position.x,
        top: position.y,
        // $flow-disable-line
        behavior: shouldScroll.behavior
      });
    } else {
      window.scrollTo(position.x, position.y);
    }
  }
}
var supportsPushState = inBrowser && function() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf("Android 2.") !== -1 || ua.indexOf("Android 4.0") !== -1) && ua.indexOf("Mobile Safari") !== -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("Windows Phone") === -1) {
    return false;
  }
  return window.history && typeof window.history.pushState === "function";
}();
function pushState(url, replace2) {
  saveScrollPosition();
  var history = window.history;
  try {
    if (replace2) {
      var stateCopy = extend({}, history.state);
      stateCopy.key = getStateKey();
      history.replaceState(stateCopy, "", url);
    } else {
      history.pushState({ key: setStateKey(genStateKey()) }, "", url);
    }
  } catch (e) {
    window.location[replace2 ? "replace" : "assign"](url);
  }
}
function replaceState(url) {
  pushState(url, true);
}
var NavigationFailureType = {
  redirected: 2,
  aborted: 4,
  cancelled: 8,
  duplicated: 16
};
function createNavigationRedirectedError(from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.redirected,
    'Redirected when going from "' + from.fullPath + '" to "' + stringifyRoute(
      to
    ) + '" via a navigation guard.'
  );
}
function createNavigationDuplicatedError(from, to) {
  var error = createRouterError(
    from,
    to,
    NavigationFailureType.duplicated,
    'Avoided redundant navigation to current location: "' + from.fullPath + '".'
  );
  error.name = "NavigationDuplicated";
  return error;
}
function createNavigationCancelledError(from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.cancelled,
    'Navigation cancelled from "' + from.fullPath + '" to "' + to.fullPath + '" with a new navigation.'
  );
}
function createNavigationAbortedError(from, to) {
  return createRouterError(
    from,
    to,
    NavigationFailureType.aborted,
    'Navigation aborted from "' + from.fullPath + '" to "' + to.fullPath + '" via a navigation guard.'
  );
}
function createRouterError(from, to, type, message) {
  var error = new Error(message);
  error._isRouter = true;
  error.from = from;
  error.to = to;
  error.type = type;
  return error;
}
var propertiesToLog = ["params", "query", "hash"];
function stringifyRoute(to) {
  if (typeof to === "string") {
    return to;
  }
  if ("path" in to) {
    return to.path;
  }
  var location = {};
  propertiesToLog.forEach(function(key) {
    if (key in to) {
      location[key] = to[key];
    }
  });
  return JSON.stringify(location, null, 2);
}
function isError(err) {
  return Object.prototype.toString.call(err).indexOf("Error") > -1;
}
function isNavigationFailure(err, errorType) {
  return isError(err) && err._isRouter && (errorType == null || err.type === errorType);
}
function runQueue(queue, fn, cb) {
  var step = function(index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function() {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}
function resolveAsyncComponents(matched) {
  return function(to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;
    flatMapComponents(matched, function(def, _, match2, key) {
      if (typeof def === "function" && def.cid === void 0) {
        hasAsync = true;
        pending++;
        var resolve2 = once(function(resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          def.resolved = typeof resolvedDef === "function" ? resolvedDef : _Vue.extend(resolvedDef);
          match2.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });
        var reject = once(function(reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          warn(false, msg);
          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });
        var res;
        try {
          res = def(resolve2, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === "function") {
            res.then(resolve2, reject);
          } else {
            var comp = res.component;
            if (comp && typeof comp.then === "function") {
              comp.then(resolve2, reject);
            }
          }
        }
      }
    });
    if (!hasAsync) {
      next();
    }
  };
}
function flatMapComponents(matched, fn) {
  return flatten(matched.map(function(m) {
    return Object.keys(m.components).map(function(key) {
      return fn(
        m.components[key],
        m.instances[key],
        m,
        key
      );
    });
  }));
}
function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}
var hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === "Module";
}
function once(fn) {
  var called = false;
  return function() {
    var args = [], len = arguments.length;
    while (len--) args[len] = arguments[len];
    if (called) {
      return;
    }
    called = true;
    return fn.apply(this, args);
  };
}
var History = function History2(router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
  this.listeners = [];
};
History.prototype.listen = function listen(cb) {
  this.cb = cb;
};
History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};
History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};
History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1$1 = this;
  var route;
  try {
    route = this.router.match(location, this.current);
  } catch (e) {
    this.errorCbs.forEach(function(cb) {
      cb(e);
    });
    throw e;
  }
  var prev = this.current;
  this.confirmTransition(
    route,
    function() {
      this$1$1.updateRoute(route);
      onComplete && onComplete(route);
      this$1$1.ensureURL();
      this$1$1.router.afterHooks.forEach(function(hook) {
        hook && hook(route, prev);
      });
      if (!this$1$1.ready) {
        this$1$1.ready = true;
        this$1$1.readyCbs.forEach(function(cb) {
          cb(route);
        });
      }
    },
    function(err) {
      if (onAbort) {
        onAbort(err);
      }
      if (err && !this$1$1.ready) {
        if (!isNavigationFailure(err, NavigationFailureType.redirected) || prev !== START) {
          this$1$1.ready = true;
          this$1$1.readyErrorCbs.forEach(function(cb) {
            cb(err);
          });
        }
      }
    }
  );
};
History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1$1 = this;
  var current = this.current;
  this.pending = route;
  var abort = function(err) {
    if (!isNavigationFailure(err) && isError(err)) {
      if (this$1$1.errorCbs.length) {
        this$1$1.errorCbs.forEach(function(cb) {
          cb(err);
        });
      } else {
        if (true) {
          warn(false, "uncaught error during route navigation:");
        }
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  var lastRouteIndex = route.matched.length - 1;
  var lastCurrentIndex = current.matched.length - 1;
  if (isSameRoute(route, current) && // in the case the route map has been dynamically appended to
  lastRouteIndex === lastCurrentIndex && route.matched[lastRouteIndex] === current.matched[lastCurrentIndex]) {
    this.ensureURL();
    if (route.hash) {
      handleScroll(this.router, current, route, false);
    }
    return abort(createNavigationDuplicatedError(current, route));
  }
  var ref = resolveQueue(
    this.current.matched,
    route.matched
  );
  var updated = ref.updated;
  var deactivated = ref.deactivated;
  var activated = ref.activated;
  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function(m) {
      return m.beforeEnter;
    }),
    // async components
    resolveAsyncComponents(activated)
  );
  var iterator = function(hook, next) {
    if (this$1$1.pending !== route) {
      return abort(createNavigationCancelledError(current, route));
    }
    try {
      hook(route, current, function(to) {
        if (to === false) {
          this$1$1.ensureURL(true);
          abort(createNavigationAbortedError(current, route));
        } else if (isError(to)) {
          this$1$1.ensureURL(true);
          abort(to);
        } else if (typeof to === "string" || typeof to === "object" && (typeof to.path === "string" || typeof to.name === "string")) {
          abort(createNavigationRedirectedError(current, route));
          if (typeof to === "object" && to.replace) {
            this$1$1.replace(to);
          } else {
            this$1$1.push(to);
          }
        } else {
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };
  runQueue(queue, iterator, function() {
    var enterGuards = extractEnterGuards(activated);
    var queue2 = enterGuards.concat(this$1$1.router.resolveHooks);
    runQueue(queue2, iterator, function() {
      if (this$1$1.pending !== route) {
        return abort(createNavigationCancelledError(current, route));
      }
      this$1$1.pending = null;
      onComplete(route);
      if (this$1$1.router.app) {
        this$1$1.router.app.$nextTick(function() {
          handleRouteEntered(route);
        });
      }
    });
  });
};
History.prototype.updateRoute = function updateRoute(route) {
  this.current = route;
  this.cb && this.cb(route);
};
History.prototype.setupListeners = function setupListeners() {
};
History.prototype.teardown = function teardown() {
  this.listeners.forEach(function(cleanupListener) {
    cleanupListener();
  });
  this.listeners = [];
  this.current = START;
  this.pending = null;
};
function normalizeBase(base) {
  if (!base) {
    if (inBrowser) {
      var baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^https?:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base.charAt(0) !== "/") {
    base = "/" + base;
  }
  return base.replace(/\/$/, "");
}
function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}
function extractGuards(records, name, bind, reverse) {
  var guards = flatMapComponents(records, function(def, instance, match2, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard) ? guard.map(function(guard2) {
        return bind(guard2, instance, match2, key);
      }) : bind(guard, instance, match2, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}
function extractGuard(def, key) {
  if (typeof def !== "function") {
    def = _Vue.extend(def);
  }
  return def.options[key];
}
function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, "beforeRouteLeave", bindGuard, true);
}
function extractUpdateHooks(updated) {
  return extractGuards(updated, "beforeRouteUpdate", bindGuard);
}
function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}
function extractEnterGuards(activated) {
  return extractGuards(
    activated,
    "beforeRouteEnter",
    function(guard, _, match2, key) {
      return bindEnterGuard(guard, match2, key);
    }
  );
}
function bindEnterGuard(guard, match2, key) {
  return function routeEnterGuard(to, from, next) {
    return guard(to, from, function(cb) {
      if (typeof cb === "function") {
        if (!match2.enteredCbs[key]) {
          match2.enteredCbs[key] = [];
        }
        match2.enteredCbs[key].push(cb);
      }
      next(cb);
    });
  };
}
var HTML5History = function(History3) {
  function HTML5History2(router, base) {
    History3.call(this, router, base);
    this._startLocation = getLocation(this.base);
  }
  if (History3) HTML5History2.__proto__ = History3;
  HTML5History2.prototype = Object.create(History3 && History3.prototype);
  HTML5History2.prototype.constructor = HTML5History2;
  HTML5History2.prototype.setupListeners = function setupListeners2() {
    var this$1$1 = this;
    if (this.listeners.length > 0) {
      return;
    }
    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;
    if (supportsScroll) {
      this.listeners.push(setupScroll());
    }
    var handleRoutingEvent = function() {
      var current = this$1$1.current;
      var location = getLocation(this$1$1.base);
      if (this$1$1.current === START && location === this$1$1._startLocation) {
        return;
      }
      this$1$1.transitionTo(location, function(route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    };
    window.addEventListener("popstate", handleRoutingEvent);
    this.listeners.push(function() {
      window.removeEventListener("popstate", handleRoutingEvent);
    });
  };
  HTML5History2.prototype.go = function go2(n) {
    window.history.go(n);
  };
  HTML5History2.prototype.push = function push2(location, onComplete, onAbort) {
    var this$1$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function(route) {
      pushState(cleanPath(this$1$1.base + route.fullPath));
      handleScroll(this$1$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };
  HTML5History2.prototype.replace = function replace2(location, onComplete, onAbort) {
    var this$1$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function(route) {
      replaceState(cleanPath(this$1$1.base + route.fullPath));
      handleScroll(this$1$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };
  HTML5History2.prototype.ensureURL = function ensureURL(push2) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push2 ? pushState(current) : replaceState(current);
    }
  };
  HTML5History2.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };
  return HTML5History2;
}(History);
function getLocation(base) {
  var path = window.location.pathname;
  var pathLowerCase = path.toLowerCase();
  var baseLowerCase = base.toLowerCase();
  if (base && (pathLowerCase === baseLowerCase || pathLowerCase.indexOf(cleanPath(baseLowerCase + "/")) === 0)) {
    path = path.slice(base.length);
  }
  return (path || "/") + window.location.search + window.location.hash;
}
var HashHistory = function(History3) {
  function HashHistory2(router, base, fallback) {
    History3.call(this, router, base);
    if (fallback && checkFallback(this.base)) {
      return;
    }
    ensureSlash();
  }
  if (History3) HashHistory2.__proto__ = History3;
  HashHistory2.prototype = Object.create(History3 && History3.prototype);
  HashHistory2.prototype.constructor = HashHistory2;
  HashHistory2.prototype.setupListeners = function setupListeners2() {
    var this$1$1 = this;
    if (this.listeners.length > 0) {
      return;
    }
    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;
    if (supportsScroll) {
      this.listeners.push(setupScroll());
    }
    var handleRoutingEvent = function() {
      var current = this$1$1.current;
      if (!ensureSlash()) {
        return;
      }
      this$1$1.transitionTo(getHash(), function(route) {
        if (supportsScroll) {
          handleScroll(this$1$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    };
    var eventType = supportsPushState ? "popstate" : "hashchange";
    window.addEventListener(
      eventType,
      handleRoutingEvent
    );
    this.listeners.push(function() {
      window.removeEventListener(eventType, handleRoutingEvent);
    });
  };
  HashHistory2.prototype.push = function push2(location, onComplete, onAbort) {
    var this$1$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function(route) {
        pushHash(route.fullPath);
        handleScroll(this$1$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };
  HashHistory2.prototype.replace = function replace2(location, onComplete, onAbort) {
    var this$1$1 = this;
    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function(route) {
        replaceHash(route.fullPath);
        handleScroll(this$1$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };
  HashHistory2.prototype.go = function go2(n) {
    window.history.go(n);
  };
  HashHistory2.prototype.ensureURL = function ensureURL(push2) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push2 ? pushHash(current) : replaceHash(current);
    }
  };
  HashHistory2.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };
  return HashHistory2;
}(History);
function checkFallback(base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + "/#" + location));
    return true;
  }
}
function ensureSlash() {
  var path = getHash();
  if (path.charAt(0) === "/") {
    return true;
  }
  replaceHash("/" + path);
  return false;
}
function getHash() {
  var href = window.location.href;
  var index = href.indexOf("#");
  if (index < 0) {
    return "";
  }
  href = href.slice(index + 1);
  return href;
}
function getUrl(path) {
  var href = window.location.href;
  var i = href.indexOf("#");
  var base = i >= 0 ? href.slice(0, i) : href;
  return base + "#" + path;
}
function pushHash(path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}
function replaceHash(path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}
var AbstractHistory = function(History3) {
  function AbstractHistory2(router, base) {
    History3.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }
  if (History3) AbstractHistory2.__proto__ = History3;
  AbstractHistory2.prototype = Object.create(History3 && History3.prototype);
  AbstractHistory2.prototype.constructor = AbstractHistory2;
  AbstractHistory2.prototype.push = function push2(location, onComplete, onAbort) {
    var this$1$1 = this;
    this.transitionTo(
      location,
      function(route) {
        this$1$1.stack = this$1$1.stack.slice(0, this$1$1.index + 1).concat(route);
        this$1$1.index++;
        onComplete && onComplete(route);
      },
      onAbort
    );
  };
  AbstractHistory2.prototype.replace = function replace2(location, onComplete, onAbort) {
    var this$1$1 = this;
    this.transitionTo(
      location,
      function(route) {
        this$1$1.stack = this$1$1.stack.slice(0, this$1$1.index).concat(route);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };
  AbstractHistory2.prototype.go = function go2(n) {
    var this$1$1 = this;
    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(
      route,
      function() {
        var prev = this$1$1.current;
        this$1$1.index = targetIndex;
        this$1$1.updateRoute(route);
        this$1$1.router.afterHooks.forEach(function(hook) {
          hook && hook(route, prev);
        });
      },
      function(err) {
        if (isNavigationFailure(err, NavigationFailureType.duplicated)) {
          this$1$1.index = targetIndex;
        }
      }
    );
  };
  AbstractHistory2.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : "/";
  };
  AbstractHistory2.prototype.ensureURL = function ensureURL() {
  };
  return AbstractHistory2;
}(History);
var VueRouter = function VueRouter2(options) {
  if (options === void 0) options = {};
  if (true) {
    warn(this instanceof VueRouter2, "Router must be called with the new operator.");
  }
  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);
  var mode = options.mode || "hash";
  this.fallback = mode === "history" && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = "hash";
  }
  if (!inBrowser) {
    mode = "abstract";
  }
  this.mode = mode;
  switch (mode) {
    case "history":
      this.history = new HTML5History(this, options.base);
      break;
    case "hash":
      this.history = new HashHistory(this, options.base, this.fallback);
      break;
    case "abstract":
      this.history = new AbstractHistory(this, options.base);
      break;
    default:
      if (true) {
        assert(false, "invalid mode: " + mode);
      }
  }
};
var prototypeAccessors = { currentRoute: { configurable: true } };
VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};
prototypeAccessors.currentRoute.get = function() {
  return this.history && this.history.current;
};
VueRouter.prototype.init = function init(app) {
  var this$1$1 = this;
  assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` before creating root instance."
  );
  this.apps.push(app);
  app.$once("hook:destroyed", function() {
    var index = this$1$1.apps.indexOf(app);
    if (index > -1) {
      this$1$1.apps.splice(index, 1);
    }
    if (this$1$1.app === app) {
      this$1$1.app = this$1$1.apps[0] || null;
    }
    if (!this$1$1.app) {
      this$1$1.history.teardown();
    }
  });
  if (this.app) {
    return;
  }
  this.app = app;
  var history = this.history;
  if (history instanceof HTML5History || history instanceof HashHistory) {
    var handleInitialScroll = function(routeOrError) {
      var from = history.current;
      var expectScroll = this$1$1.options.scrollBehavior;
      var supportsScroll = supportsPushState && expectScroll;
      if (supportsScroll && "fullPath" in routeOrError) {
        handleScroll(this$1$1, routeOrError, from, false);
      }
    };
    var setupListeners2 = function(routeOrError) {
      history.setupListeners();
      handleInitialScroll(routeOrError);
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupListeners2,
      setupListeners2
    );
  }
  history.listen(function(route) {
    this$1$1.apps.forEach(function(app2) {
      app2._route = route;
    });
  });
};
VueRouter.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};
VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};
VueRouter.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};
VueRouter.prototype.onReady = function onReady2(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};
VueRouter.prototype.onError = function onError2(errorCb) {
  this.history.onError(errorCb);
};
VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  var this$1$1 = this;
  if (!onComplete && !onAbort && typeof Promise !== "undefined") {
    return new Promise(function(resolve2, reject) {
      this$1$1.history.push(location, resolve2, reject);
    });
  } else {
    this.history.push(location, onComplete, onAbort);
  }
};
VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  var this$1$1 = this;
  if (!onComplete && !onAbort && typeof Promise !== "undefined") {
    return new Promise(function(resolve2, reject) {
      this$1$1.history.replace(location, resolve2, reject);
    });
  } else {
    this.history.replace(location, onComplete, onAbort);
  }
};
VueRouter.prototype.go = function go(n) {
  this.history.go(n);
};
VueRouter.prototype.back = function back() {
  this.go(-1);
};
VueRouter.prototype.forward = function forward() {
  this.go(1);
};
VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to) {
  var route = to ? to.matched ? to : this.resolve(to).route : this.currentRoute;
  if (!route) {
    return [];
  }
  return [].concat.apply(
    [],
    route.matched.map(function(m) {
      return Object.keys(m.components).map(function(key) {
        return m.components[key];
      });
    })
  );
};
VueRouter.prototype.resolve = function resolve(to, current, append) {
  current = current || this.history.current;
  var location = normalizeLocation(to, current, append, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location,
    route,
    href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};
VueRouter.prototype.getRoutes = function getRoutes() {
  return this.matcher.getRoutes();
};
VueRouter.prototype.addRoute = function addRoute(parentOrRoute, route) {
  this.matcher.addRoute(parentOrRoute, route);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};
VueRouter.prototype.addRoutes = function addRoutes(routes) {
  if (true) {
    warn(false, "router.addRoutes() is deprecated and has been removed in Vue Router 4. Use router.addRoute() instead.");
  }
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};
Object.defineProperties(VueRouter.prototype, prototypeAccessors);
var VueRouter$1 = VueRouter;
function registerHook(list, fn) {
  list.push(fn);
  return function() {
    var i = list.indexOf(fn);
    if (i > -1) {
      list.splice(i, 1);
    }
  };
}
function createHref(base, fullPath, mode) {
  var path = mode === "hash" ? "#" + fullPath : fullPath;
  return base ? cleanPath(base + "/" + path) : path;
}
VueRouter.install = install;
VueRouter.version = "3.6.5";
VueRouter.isNavigationFailure = isNavigationFailure;
VueRouter.NavigationFailureType = NavigationFailureType;
VueRouter.START_LOCATION = START;
if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}
var version = "3.6.5";
export {
  NavigationFailureType,
  Link as RouterLink,
  View as RouterView,
  START as START_LOCATION,
  VueRouter$1 as default,
  isNavigationFailure,
  version
};
/*! Bundled license information:

vue-router/dist/vue-router.esm.js:
  (*!
    * vue-router v3.6.5
    * (c) 2022 Evan You
    * @license MIT
    *)
*/
//# sourceMappingURL=vue-router.js.map
