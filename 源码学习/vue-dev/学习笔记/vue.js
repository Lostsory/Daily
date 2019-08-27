/**
 * vue.js抄写
 * 2019-7-25 Lostsory
 */
var emptyObject = Object.freeze({});

const isUndef = v => v === undefined || v === null

const isDef = v => v !== undefined && v !== null

const isTrue = v => v === true

const isFalse = v => v === false

// 检查是否是基本类型，非对象
const isPrimitive = (v) => {
  return (
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'symbol' ||
    typeof v === "boolean"
  )
}

const isObject = (o) => o !== null && typeof o === 'object'

const _toString = Object.prototype.toString;

const toRawType = (v) => _toString.call(v).slice(8, -1)

const isPlainObject = (o) => _toString.call(o) === '[object Object]'

const isRegExp = (v) => _toString.call(v) === '[object RegExp]'

// 检查val是否是一个有效的数组索引，其实就是验证是否是一个非无穷大的正整数
const isValidArrayIndex = (v) => {
  var n = parseFloat(String(v))
  return n >=0 && Math.floor(n) === n && isFinite(v) 
}

const isPromise = (v) => {
  return (
    isdef(v) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
const toString = (v) => {
  if (v == null) {
    return ''
  } else {
    if (Array.isArray(v) || (isPlainObject(val) && v.toString === _toString)) {
      return JSON.stringify(v, null, 2)
    } else {
      String(v)
    }
  }
}

const toNumber = (v) => {
  var n = parseFloat(v);
  return isNaN(n) ? v : n
}

/**
* Make a map and return a function for checking if a key
* is in that map.
*/
const makeMap = (str, expectsLowerCase) => {
  var map = Object.create(null)
  var list = str.split(',')
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? (val) => map[val.tolowerCase()]
    : (val) => map[val]
}

/**
* Check if a tag is a built-in(内建的) tag.
*/
var isBuiltInTag = makeMap('slot,component', true);

/**
* Check if an attribute is a reserved(预留的) attribute.
*/
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')

/**
* Remove an item from an array.
*/
const remove = (arr, item) => {
  if (arr,length) {
    var index = arr.index(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
* Check whether an object has the property.
*/
var hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (o, key) => hasOwnProperty.call(o, key)

/**
* Create a cached version of a pure function.
* 将纯函数fn的运行结果缓存在一个对象中，避免下次重新重新运行fn
*/
const cached = (fn) => {
  var cache = Object.create(null)
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
* Camelize a hyphen-delimited string.（一个连字符分隔的字符串）
*/
var cameLizeRe = /-(\w)/g  // w: [0-9][a-z][A-Z]
const camelize = cached(function (str) {
  return str.replace(cameLizeRe, function (_, c) {
    return c ? c.toUpperCase() : ''
  })
})

/**
* Capitalize a string.
*/
const capitalize = cached(function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
* Hyphenate a camelCase string.
*/
var hyphenateRE = /\b[A-Z]/g;
const hyphenate = cached(function(str) {
  return str.replace(hyphenateRE, '-$1').tolowerCase
})

/**
 * Simple bind polyfill
 */
const polyfillBind = (fn, ctx) => {
  const bnounfFn = (a) => {
    var l = arguments.length
    if (l) {
      if (l > 1) {
        return fn.apply(ctx, arguments)
      } else {
        return fn.call(ctx, a)
      }
    } else {
      return fn.call(ctx)
    }
  }
  bnounfFn._length = fn.length;
  return bnounfFn
}

const nativeBind = (fn, ctx) => fn.bind(ctx)

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind

/**
* Convert an Array-like object to a real Array.
*/
const toArray = (list, start = 0) => {
  var i = list.length - start
  var ret = new Array(i)
  while(i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
* Mix properties into target object.(目标对象身上混入一些属性)
*/
const extend = (to, _from) => {
  for (var key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
* Merge an Array of Objects into a single Object.
*/
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
* Always return false.
*/
var no = function (a, b, c) { return false; };

/**
* Return the same value.
*/
const indentity = (_) => _

/**
* Generate a string containing static keys from compiler modules.
*/
const genStaticKeys = (modules) => {
  return modules.reduce((keys, m) => {
    return keys.concat(m,staticKeys || [])
  }, []).join(',')
}

/**
* Check if two values are loosely equal - that is,
* if they are plain objects, do they have the same shape?
*/
const looseEqual = (a, b) => {
  if (a === b) return true
  var isObjA = isObject(a)
  var isObjB = isObject(b)
  if (isObjA && isObjB) {
    try {
      var isArrA = Array.isArray(a)
      var isArrB = Array.isArray(b)
      if (isArrA && isArrB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        })
      } else if(a instanceof Date && a instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrA && !isArrB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every((e, ) => {
          return looseEqual[a[e], b[e]]
        })
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else {}
}

/**
* Return the first index at which a loosely equal value can be
* found in the array (if value is a plain object, the array must
* contain an object of the same shape), or -1 if it is not present.
*/
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
* Ensure a function is called only once.
*/
const once = (fn) => {
  var called = false
  return () => {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}

/* ssr-attr */
var SSR_ATTR = 'data-server-rendered';

/* asset-types */
var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

/* lifecycle-hooks */
var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

var config = ({
  /**
  * Option merge strategies (used in core/util/options)
  */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
  * Whether to suppress warnings.
  */
  silent: false,

  /**
  * Show production mode tip message on boot?
  */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
  * Whether to enable devtools
  */
  devtools: process.env.NODE_ENV !== 'production',

  /**
  * Whether to record perf
  */
  performance: false,

  /**
  * Error handler for watcher errors
  */
  errorHandler: null,

  /**
  * Warn handler for watcher warns
  */
  warnHandler: null,

  /**
  * Ignore certain custom elements
  */
  ignoredElements: [],

  /**
  * Custom user key aliases for v-on
  */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
  * Check if a tag is reserved so that it cannot be registered as a
  * component. This is platform-dependent and may be overwritten.
  */
  isReservedTag: no,

  /**
  * Check if an attribute is reserved so that it cannot be used as a component
  * prop. This is platform-dependent and may be overwritten.
  */
  isReservedAttr: no,

  /**
  * Check if a tag is an unknown element.
  * Platform-dependent.
  */
  isUnknownElement: no,

  /**
  * Get the namespace of an element
  */
  getTagNamespace: noop,

  /**
  * Parse the real tag name for the specific platform.
  */
  parsePlatformTagName: identity,

  /**
  * Check if an attribute must be bound using property, e.g. value
  * Platform-dependent.
  */
  mustUseProp: no,

  /**
  * Perform updates asynchronously. Intended to be used by Vue Test Utils
  * This will significantly reduce performance if set to false.
  */
  async: true,

  /**
  * Exposed for legacy reasons
  */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/* ----------------------- */

/**
* unicode letters used for parsing html tags, component names and property paths.
* using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
* skipping \u10000-\uEFFFF due to it freezing up PhantomJS
*/
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
* Check if a string starts with $ or _
*/
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
* Define a property.
*/
const def = (obj, key, val, enumerable) => {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writeable: true,
    configurable: true
  })
}

/**
* Parse simple path.
*/
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

// can we use __proto__?
const hasProto = '__proto__' in {}

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {}
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        supportsPassive = true
      }
    }))
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

const isNative = (Ctor) => {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol = 
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys)

  var _Set
  if (typeof Set !== 'undefined' && isNative(Set)) {
    _Set = set
  } else {
    _Set = (function (){
      function Set () {
        this.set = Object.create(null)
      }
      Set.prototype.has = function has(key) {
        return this.set[key] === true
      }
      Set.prototype.add = function add(key) {
        this.set[key] = true
      }
      Set.prototype.clear = function clear() {
        this.set = Object.create(null)
      }
      return Set
    }())
  }

/* -------------- */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function(vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  }
}

/* -------------- */

var uid = 0;

var Dep = function Dep() {
  this.id = uid++
  this.subs = []
}

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub)
}

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub)
}

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this)
  }
}

Dep.prototype.notify = function notify() {
  var subs = this.subs.slice()
  if (process.env.NODE_ENV !== 'production' && !config.async) {
    subs.sort((a,b) => a.id - b.id)
  }
  for (var i = 0; i < subs.length; i++) {
    subs[i].update()
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetstack = []

function pushtarget(t) {
  targetstack.push(t)
  Dep.target = t
}

function popTarget() {
  targetstack.pop()
  Dep.target = targetstack[targetstack.length - 1]
}

/* -------------- */

const VNode = function Vnode( tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag
  this.data = data
  this.children = children
  this.elm = elm
  this.ns = undefined
  this.context = context
  this.fnContext = undefined
  this.fnScopeId = undefined
  this.key = data && data.key
  this.componentOptions = componentOptions
  this.componentInstance = undefined
  this.parent = undefined
  this.raw = false
  this.isStatic = false
  this.isRootInsert = true
  this.isComment = false
  this.isOnce = false
  this.asyncFactory = asyncFactory
  this.asyncMeta = undefined
  this.isAsyncPlaceholder = false
}

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat(兼容).
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties(Vnode.prototype, prototypeAccessors)

const createEmptyVNode = (text) => {
  if (text === void 0) text = ''
  var node = new VNode()
  node.text = text;
  node.isComment = true
  return node
}

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across(交叉) multiple renders, 
// cloning them avoids errors when DOM manipulations rely on their elm reference.
function cloneVNode(VNode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),  // 用数组的slice进行深拷贝数组
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/**
 * 数组方法的重写
 */
var arrayProto = Array.prototype
var arrayMethods = Object.create(arrayProto)

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
* Intercept mutating methods and emit events
*/
methodsToPatch.forEach((method) => {
  // cache original method
  var original = arrayProto[method]
  def(arrayMethods, method, function mutator() {
    var args = [], len = arguments.length
    while(len--) {
      args[len] = arguments[len]
    }
    var result = original.apply(this, args);
    var ob = this.__ob__
    var inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 如果是数组的增加操作则给新赠的元素增加observe
    if (inserted) {
      ob.observeArray(inserted)
    }
    // 通知发生改变
    ob.dep.notify()
    return result
  })
})


/* -------------- */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/**
* In some cases we may want to disable observation inside a component's
* update computation.
*/
var shouldObserve = true
const toggleObserving = (val) => {
  shouldObserve = val
}

/**
* Observer class that is attached to each observed
* object. Once attached, the observer converts(转化) the target
* object's property keys into getter/setters that
* collect dependencies and dispatch updates.
*/

var Observer = function(value) {
  this.value = value
  this.dep = new Dep()
  this.vmCount = 0
  def(value, '__ob__', this)
  if (Array.isArray(value))  {
    if (hasProto) {
      protoAugment(value, arrayMethods)
    } else {
      copyAugment(value, arrayMethods, arrayKeys)
    }
  } else {
    this.walk(value)
  }
}

/**
* Walk through all properties and convert them into
* getter/setters. This method should only be called when
* value type is Object. (仅仅当val类型为object的时候会被调用)
*/
Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj)
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
}

/**
* Observe a list of Array items.
*/
Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0; i < item.length; i++) {
    observe(item[i])
  }
}

/**
* Augment(增强，扩大) a target Object or Array by intercepting
* the prototype chain using __proto__
*/
function protoAugment(t, src) {
  target.__proto__ = src;
}

/**
* Augment a target Object or Array by defining
* hidden properties.
*/
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
* Attempt to create an observer instance for a value,
* returns the new observer if successfully observed, or the existing observer if the value already has one.
*/
function observe (value, asRootdata) {
  if (!isObject(value) || value instanceof Vnode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if(
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value)
  }
  if (asRootdata && ob) {
    ob.vmCount++
  }
  return ob
}

/**
* Define a reactive property on an Object.
*/
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep()
  var property = Object.getOwnPropertyDescriptors(obj, key)
  if (property && property.configurable === false) {
    return
  }

  var getter = property && property.get
  var setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  var childOb = !shallow && observe(val)
  Object.defineProperties(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend
          if(Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}

/**
* Set a property on an object. Adds the new property and
* triggers change notification if the property doesn't
* already exist.
*/

function set(target, key, val) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  var ob = (target).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive$$1(ob.value, key, val)
  ob.dep.notify()
  return val
}

/**
* Delete a property and trigger change if necessary.
*/
function del(targrt, key) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify()
}

/**
* Collect dependencies on array elements when the array is touched, since
* we cannot intercept array element access like property getters.
*/
function dependArray(value) {
  for(var e = (void 0), i = 0, l = value.length; i < l;i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}