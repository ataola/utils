/*!
 * ataola-utils.js v0.1.8
 * (c) 2021-2021 ataola(Jiangtao Zheng)
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global['ataola-utils'] = {})));
})(this, function (exports) {
  'use strict';

  var version$1 = '0.1.8';

  var commonjsGlobal =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
      ? self
      : {};

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$n =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () {
      return this;
    })() ||
    Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$f = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$e = fails$f;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$e(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return (
      Object.defineProperty({}, 1, {
        get: function () {
          return 7;
        },
      })[1] != 7
    );
  });

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG =
    getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG
    ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor$2(this, V);
        return !!descriptor && descriptor.enumerable;
      }
    : $propertyIsEnumerable;

  var createPropertyDescriptor$3 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value,
    };
  };

  var toString$1 = {}.toString;

  var classofRaw$1 = function (it) {
    return toString$1.call(it).slice(8, -1);
  };

  var fails$d = fails$f;
  var classof$7 = classofRaw$1;

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$d(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  })
    ? function (it) {
        return classof$7(it) == 'String' ? split.call(it, '') : Object(it);
      }
    : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$6 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$1 = indexedObject;
  var requireObjectCoercible$5 = requireObjectCoercible$6;

  var toIndexedObject$4 = function (it) {
    return IndexedObject$1(requireObjectCoercible$5(it));
  };

  var isObject$f = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var isObject$e = isObject$f;

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive$2 = function (input, PREFERRED_STRING) {
    if (!isObject$e(input)) return input;
    var fn, val;
    if (
      PREFERRED_STRING &&
      typeof (fn = input.toString) == 'function' &&
      !isObject$e((val = fn.call(input)))
    )
      return val;
    if (
      typeof (fn = input.valueOf) == 'function' &&
      !isObject$e((val = fn.call(input)))
    )
      return val;
    if (
      !PREFERRED_STRING &&
      typeof (fn = input.toString) == 'function' &&
      !isObject$e((val = fn.call(input)))
    )
      return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var requireObjectCoercible$4 = requireObjectCoercible$6;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$4 = function (argument) {
    return Object(requireObjectCoercible$4(argument));
  };

  var toObject$3 = toObject$4;

  var hasOwnProperty = {}.hasOwnProperty;

  var has$b = function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$3(it), key);
  };

  var global$m = global$n;
  var isObject$d = isObject$f;

  var document$3 = global$m.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$d(document$3) && isObject$d(document$3.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS ? document$3.createElement(it) : {};
  };

  var DESCRIPTORS$7 = descriptors;
  var fails$c = fails$f;
  var createElement$1 = documentCreateElement$1;

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine =
    !DESCRIPTORS$7 &&
    !fails$c(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
      return (
        Object.defineProperty(createElement$1('div'), 'a', {
          get: function () {
            return 7;
          },
        }).a != 7
      );
    });

  var DESCRIPTORS$6 = descriptors;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$2 = createPropertyDescriptor$3;
  var toIndexedObject$3 = toIndexedObject$4;
  var toPrimitive$1 = toPrimitive$2;
  var has$a = has$b;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6
    ? $getOwnPropertyDescriptor
    : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject$3(O);
        P = toPrimitive$1(P, true);
        if (IE8_DOM_DEFINE$1)
          try {
            return $getOwnPropertyDescriptor(O, P);
          } catch (error) {
            /* empty */
          }
        if (has$a(O, P))
          return createPropertyDescriptor$2(
            !propertyIsEnumerableModule.f.call(O, P),
            O[P]
          );
      };

  var objectDefineProperty = {};

  var isObject$c = isObject$f;

  var anObject$I = function (it) {
    if (!isObject$c(it)) {
      throw TypeError(String(it) + ' is not an object');
    }
    return it;
  };

  var DESCRIPTORS$5 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var anObject$H = anObject$I;
  var toPrimitive = toPrimitive$2;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$5
    ? $defineProperty
    : function defineProperty(O, P, Attributes) {
        anObject$H(O);
        P = toPrimitive(P, true);
        anObject$H(Attributes);
        if (IE8_DOM_DEFINE)
          try {
            return $defineProperty(O, P, Attributes);
          } catch (error) {
            /* empty */
          }
        if ('get' in Attributes || 'set' in Attributes)
          throw TypeError('Accessors not supported');
        if ('value' in Attributes) O[P] = Attributes.value;
        return O;
      };

  var DESCRIPTORS$4 = descriptors;
  var definePropertyModule$4 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$3;

  var createNonEnumerableProperty$9 = DESCRIPTORS$4
    ? function (object, key, value) {
        return definePropertyModule$4.f(
          object,
          key,
          createPropertyDescriptor$1(1, value)
        );
      }
    : function (object, key, value) {
        object[key] = value;
        return object;
      };

  var redefine$9 = { exports: {} };

  var global$l = global$n;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$9;

  var setGlobal$3 = function (key, value) {
    try {
      createNonEnumerableProperty$8(global$l, key, value);
    } catch (error) {
      global$l[key] = value;
    }
    return value;
  };

  var global$k = global$n;
  var setGlobal$2 = setGlobal$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$k[SHARED] || setGlobal$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  var functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof store$2.inspectSource != 'function') {
    store$2.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$3 = store$2.inspectSource;

  var global$j = global$n;
  var inspectSource$2 = inspectSource$3;

  var WeakMap$2 = global$j.WeakMap;

  var nativeWeakMap =
    typeof WeakMap$2 === 'function' &&
    /native code/.test(inspectSource$2(WeakMap$2));

  var shared$4 = { exports: {} };

  var isPure = false;

  var store$1 = sharedStore;

  (shared$4.exports = function (key, value) {
    return store$1[key] || (store$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.11.0',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)',
  });

  var id$2 = 0;
  var postfix = Math.random();

  var uid$3 = function (key) {
    return (
      'Symbol(' +
      String(key === undefined ? '' : key) +
      ')_' +
      (++id$2 + postfix).toString(36)
    );
  };

  var shared$3 = shared$4.exports;
  var uid$2 = uid$3;

  var keys$2 = shared$3('keys');

  var sharedKey$3 = function (key) {
    return keys$2[key] || (keys$2[key] = uid$2(key));
  };

  var hiddenKeys$5 = {};

  var NATIVE_WEAK_MAP$1 = nativeWeakMap;
  var global$i = global$n;
  var isObject$b = isObject$f;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$9;
  var objectHas = has$b;
  var shared$2 = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$4 = hiddenKeys$5;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap$1 = global$i.WeakMap;
  var set$2, get$1, has$9;

  var enforce = function (it) {
    return has$9(it) ? get$1(it) : set$2(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$b(it) || (state = get$1(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      }
      return state;
    };
  };

  if (NATIVE_WEAK_MAP$1) {
    var store = shared$2.state || (shared$2.state = new WeakMap$1());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set$2 = function (it, metadata) {
      if (wmhas.call(store, it))
        throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return wmget.call(store, it) || {};
    };
    has$9 = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$4[STATE] = true;
    set$2 = function (it, metadata) {
      if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$7(it, STATE, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return objectHas(it, STATE) ? it[STATE] : {};
    };
    has$9 = function (it) {
      return objectHas(it, STATE);
    };
  }

  var internalState = {
    set: set$2,
    get: get$1,
    has: has$9,
    enforce: enforce,
    getterFor: getterFor,
  };

  var global$h = global$n;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$9;
  var has$8 = has$b;
  var setGlobal$1 = setGlobal$3;
  var inspectSource$1 = inspectSource$3;
  var InternalStateModule$4 = internalState;

  var getInternalState$2 = InternalStateModule$4.get;
  var enforceInternalState$1 = InternalStateModule$4.enforce;
  var TEMPLATE = String(String).split('String');

  (redefine$9.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$8(value, 'name')) {
        createNonEnumerableProperty$6(value, 'name', key);
      }
      state = enforceInternalState$1(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }
    if (O === global$h) {
      if (simple) O[key] = value;
      else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$6(O, key, value);
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return (
      (typeof this == 'function' && getInternalState$2(this).source) ||
      inspectSource$1(this)
    );
  });

  var global$g = global$n;

  var path$1 = global$g;

  var path = path$1;
  var global$f = global$n;

  var aFunction$n = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$f = function (namespace, method) {
    return arguments.length < 2
      ? aFunction$n(path[namespace]) || aFunction$n(global$f[namespace])
      : (path[namespace] && path[namespace][method]) ||
          (global$f[namespace] && global$f[namespace][method]);
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$1 = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger
  var toInteger$4 = function (argument) {
    return isNaN((argument = +argument))
      ? 0
      : (argument > 0 ? floor$1 : ceil)(argument);
  };

  var toInteger$3 = toInteger$4;

  var min$3 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$6 = function (argument) {
    return argument > 0 ? min$3(toInteger$3(argument), 0x1fffffffffffff) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toInteger$2 = toInteger$4;

  var max$1 = Math.max;
  var min$2 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$1 = function (index, length) {
    var integer = toInteger$2(index);
    return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
  };

  var toIndexedObject$2 = toIndexedObject$4;
  var toLength$5 = toLength$6;
  var toAbsoluteIndex = toAbsoluteIndex$1;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$2 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$2($this);
      var length = toLength$5(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare -- NaN check
          if (value != value) return true;
          // Array#indexOf ignores holes, Array#includes - not
        }
      else
        for (; length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el)
            return IS_INCLUDES || index || 0;
        }
      return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$2(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$2(false),
  };

  var has$7 = has$b;
  var toIndexedObject$1 = toIndexedObject$4;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$3 = hiddenKeys$5;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$1(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O)
      !has$7(hiddenKeys$3, key) && has$7(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i)
      if (has$7(O, (key = names[i++]))) {
        ~indexOf(result, key) || result.push(key);
      }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf',
  ];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;

  var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f =
    Object.getOwnPropertyNames ||
    function getOwnPropertyNames(O) {
      return internalObjectKeys$1(O, hiddenKeys$2);
    };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$e = getBuiltIn$f;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$G = anObject$I;

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 =
    getBuiltIn$e('Reflect', 'ownKeys') ||
    function ownKeys(it) {
      var keys = getOwnPropertyNamesModule.f(anObject$G(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols
        ? keys.concat(getOwnPropertySymbols(it))
        : keys;
    };

  var has$6 = has$b;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$3 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$3.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has$6(target, key))
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$b = fails$f;

  var replacement = /#|\.prototype\./;

  var isForced$4 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL
      ? true
      : value == NATIVE
      ? false
      : typeof detection == 'function'
      ? fails$b(detection)
      : !!detection;
  };

  var normalize = (isForced$4.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  });

  var data = (isForced$4.data = {});
  var NATIVE = (isForced$4.NATIVE = 'N');
  var POLYFILL = (isForced$4.POLYFILL = 'P');

  var isForced_1 = isForced$4;

  var global$e = global$n;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$9;
  var redefine$8 = redefine$9.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced$3 = isForced_1;

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$e;
    } else if (STATIC) {
      target = global$e[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$e[TARGET] || {}).prototype;
    }
    if (target)
      for (key in source) {
        sourceProperty = source[key];
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced$3(
          GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key,
          options.forced
        );
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty === typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          createNonEnumerableProperty$5(sourceProperty, 'sham', true);
        }
        // extend global
        redefine$8(target, key, sourceProperty, options);
      }
  };

  var anObject$F = anObject$I;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$F(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var regexpStickyHelpers = {};

  var fails$a = fails$f;

  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
  // so we use an intermediate function.
  function RE(s, f) {
    return RegExp(s, f);
  }

  regexpStickyHelpers.UNSUPPORTED_Y = fails$a(function () {
    // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
    var re = RE('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });

  regexpStickyHelpers.BROKEN_CARET = fails$a(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = RE('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var regexpFlags = regexpFlags$1;
  var stickyHelpers$2 = regexpStickyHelpers;
  var shared$1 = shared$4.exports;

  var nativeExec = RegExp.prototype.exec;
  var nativeReplace = shared$1(
    'native-string-replace',
    String.prototype.replace
  );

  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  })();

  var UNSUPPORTED_Y$2 =
    stickyHelpers$2.UNSUPPORTED_Y || stickyHelpers$2.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2;

  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;
      var sticky = UNSUPPORTED_Y$2 && re.sticky;
      var flags = regexpFlags.call(re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = flags.replace('y', '');
        if (flags.indexOf('g') === -1) {
          flags += 'g';
        }

        strCopy = String(str).slice(re.lastIndex);
        // Support anchored sticky behavior.
        if (
          re.lastIndex > 0 &&
          (!re.multiline || (re.multiline && str[re.lastIndex - 1] !== '\n'))
        ) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      return match;
    };
  }

  var regexpExec$2 = patchedExec;

  var $$z = _export;
  var exec = regexpExec$2;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$z(
    { target: 'RegExp', proto: true, forced: /./.exec !== exec },
    {
      exec: exec,
    }
  );

  var classof$6 = classofRaw$1;
  var global$d = global$n;

  var engineIsNode = classof$6(global$d.process) == 'process';

  var getBuiltIn$d = getBuiltIn$f;

  var engineUserAgent = getBuiltIn$d('navigator', 'userAgent') || '';

  var global$c = global$n;
  var userAgent$2 = engineUserAgent;

  var process$3 = global$c.process;
  var versions = process$3 && process$3.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] + match[1];
  } else if (userAgent$2) {
    match = userAgent$2.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent$2.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  var IS_NODE$3 = engineIsNode;
  var V8_VERSION$1 = engineV8Version;
  var fails$9 = fails$f;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol =
    !!Object.getOwnPropertySymbols &&
    !fails$9(function () {
      // eslint-disable-next-line es/no-symbol -- required for testing
      return (
        !Symbol.sham &&
        // Chrome 38 Symbol has incorrect toString conversion
        // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        (IS_NODE$3
          ? V8_VERSION$1 === 38
          : V8_VERSION$1 > 37 && V8_VERSION$1 < 41)
      );
    });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = nativeSymbol;

  var useSymbolAsUid =
    NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

  var global$b = global$n;
  var shared = shared$4.exports;
  var has$5 = has$b;
  var uid$1 = uid$3;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global$b.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID
    ? Symbol$1
    : (Symbol$1 && Symbol$1.withoutSetter) || uid$1;

  var wellKnownSymbol$h = function (name) {
    if (
      !has$5(WellKnownSymbolsStore, name) ||
      !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')
    ) {
      if (NATIVE_SYMBOL && has$5(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
      }
    }
    return WellKnownSymbolsStore[name];
  };

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var redefine$7 = redefine$9.exports;
  var fails$8 = fails$f;
  var wellKnownSymbol$g = wellKnownSymbol$h;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$9;

  var SPECIES$4 = wellKnownSymbol$g('species');

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$8(function () {
    // #replace needs built-in support for named groups.
    // #match works fine because it just return the exec results, even if it has
    // a "grops" property.
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    return ''.replace(re, '$<a>') !== '7';
  });

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  var REPLACE = wellKnownSymbol$g('replace');
  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$8(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () {
      return originalExec.apply(this, arguments);
    };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
    var SYMBOL = wellKnownSymbol$g(KEY);

    var DELEGATES_TO_SYMBOL = !fails$8(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () {
        return 7;
      };
      return ''[KEY](O) != 7;
    });

    var DELEGATES_TO_EXEC =
      DELEGATES_TO_SYMBOL &&
      !fails$8(function () {
        // Symbol-named RegExp methods call .exec
        var execCalled = false;
        var re = /a/;

        if (KEY === 'split') {
          // We can't use real regex here since it causes deoptimization
          // and serious performance degradation in V8
          // https://github.com/zloirock/core-js/issues/306
          re = {};
          // RegExp[@@split] doesn't call the regex's exec method, but first creates
          // a new one. We need to return the patched regex when creating the new one.
          re.constructor = {};
          re.constructor[SPECIES$4] = function () {
            return re;
          };
          re.flags = '';
          re[SYMBOL] = /./[SYMBOL];
        }

        re.exec = function () {
          execCalled = true;
          return null;
        };

        re[SYMBOL]('');
        return !execCalled;
      });

    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === 'replace' &&
        !(
          REPLACE_SUPPORTS_NAMED_GROUPS &&
          REPLACE_KEEPS_$0 &&
          !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
        )) ||
      (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(
        SYMBOL,
        ''[KEY],
        function (nativeMethod, regexp, str, arg2, forceStringMethod) {
          if (regexp.exec === RegExp.prototype.exec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return {
                done: true,
                value: nativeRegExpMethod.call(regexp, str, arg2),
              };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        },
        {
          REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
          REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
        }
      );
      var stringMethod = methods[0];
      var regexMethod = methods[1];

      redefine$7(String.prototype, KEY, stringMethod);
      redefine$7(
        RegExp.prototype,
        SYMBOL,
        length == 2
          ? // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
            // 21.2.5.11 RegExp.prototype[@@split](string, limit)
            function (string, arg) {
              return regexMethod.call(string, this, arg);
            }
          : // 21.2.5.6 RegExp.prototype[@@match](string)
            // 21.2.5.9 RegExp.prototype[@@search](string)
            function (string) {
              return regexMethod.call(string, this);
            }
      );
    }

    if (sham)
      createNonEnumerableProperty$4(RegExp.prototype[SYMBOL], 'sham', true);
  };

  var toInteger$1 = toInteger$4;
  var requireObjectCoercible$3 = requireObjectCoercible$6;

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod$1 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible$3($this));
      var position = toInteger$1(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size)
        return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xd800 ||
        first > 0xdbff ||
        position + 1 === size ||
        (second = S.charCodeAt(position + 1)) < 0xdc00 ||
        second > 0xdfff
        ? CONVERT_TO_STRING
          ? S.charAt(position)
          : first
        : CONVERT_TO_STRING
        ? S.slice(position, position + 2)
        : ((first - 0xd800) << 10) + (second - 0xdc00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true),
  };

  var charAt = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$3 = function (S, index, unicode) {
    return index + (unicode ? charAt(S, index).length : 1);
  };

  var toObject$2 = toObject$4;

  var floor = Math.floor;
  var replace = ''.replace;
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution$1 = function (
    matched,
    str,
    position,
    captures,
    namedCaptures,
    replacement
  ) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject$2(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$':
          return '$';
        case '&':
          return matched;
        case '`':
          return str.slice(0, position);
        case "'":
          return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m)
              return captures[f - 1] === undefined
                ? ch.charAt(1)
                : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var classof$5 = classofRaw$1;
  var regexpExec$1 = regexpExec$2;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (typeof exec === 'function') {
      var result = exec.call(R, S);
      if (typeof result !== 'object') {
        throw TypeError(
          'RegExp exec method returned something other than an Object or null'
        );
      }
      return result;
    }

    if (classof$5(R) !== 'RegExp') {
      throw TypeError('RegExp#exec called on incompatible receiver');
    }

    return regexpExec$1.call(R, S);
  };

  var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
  var anObject$E = anObject$I;
  var toLength$4 = toLength$6;
  var toInteger = toInteger$4;
  var requireObjectCoercible$2 = requireObjectCoercible$6;
  var advanceStringIndex$2 = advanceStringIndex$3;
  var getSubstitution = getSubstitution$1;
  var regExpExec$1 = regexpExecAbstract;

  var max = Math.max;
  var min$1 = Math.min;

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // @@replace logic
  fixRegExpWellKnownSymbolLogic$2(
    'replace',
    2,
    function (REPLACE, nativeReplace, maybeCallNative, reason) {
      var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE =
        reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
      var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
      var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
        ? '$'
        : '$0';

      return [
        // `String.prototype.replace` method
        // https://tc39.es/ecma262/#sec-string.prototype.replace
        function replace(searchValue, replaceValue) {
          var O = requireObjectCoercible$2(this);
          var replacer =
            searchValue == undefined ? undefined : searchValue[REPLACE];
          return replacer !== undefined
            ? replacer.call(searchValue, O, replaceValue)
            : nativeReplace.call(String(O), searchValue, replaceValue);
        },
        // `RegExp.prototype[@@replace]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
        function (regexp, replaceValue) {
          if (
            (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE &&
              REPLACE_KEEPS_$0) ||
            (typeof replaceValue === 'string' &&
              replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
          ) {
            var res = maybeCallNative(
              nativeReplace,
              regexp,
              this,
              replaceValue
            );
            if (res.done) return res.value;
          }

          var rx = anObject$E(regexp);
          var S = String(this);

          var functionalReplace = typeof replaceValue === 'function';
          if (!functionalReplace) replaceValue = String(replaceValue);

          var global = rx.global;
          if (global) {
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
          }
          var results = [];
          while (true) {
            var result = regExpExec$1(rx, S);
            if (result === null) break;

            results.push(result);
            if (!global) break;

            var matchStr = String(result[0]);
            if (matchStr === '')
              rx.lastIndex = advanceStringIndex$2(
                S,
                toLength$4(rx.lastIndex),
                fullUnicode
              );
          }

          var accumulatedResult = '';
          var nextSourcePosition = 0;
          for (var i = 0; i < results.length; i++) {
            result = results[i];

            var matched = String(result[0]);
            var position = max(min$1(toInteger(result.index), S.length), 0);
            var captures = [];
            // NOTE: This is equivalent to
            //   captures = result.slice(1).map(maybeToString)
            // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
            // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
            // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
            for (var j = 1; j < result.length; j++)
              captures.push(maybeToString(result[j]));
            var namedCaptures = result.groups;
            if (functionalReplace) {
              var replacerArgs = [matched].concat(captures, position, S);
              if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
              var replacement = String(
                replaceValue.apply(undefined, replacerArgs)
              );
            } else {
              replacement = getSubstitution(
                matched,
                S,
                position,
                captures,
                namedCaptures,
                replaceValue
              );
            }
            if (position >= nextSourcePosition) {
              accumulatedResult +=
                S.slice(nextSourcePosition, position) + replacement;
              nextSourcePosition = position + matched.length;
            }
          }
          return accumulatedResult + S.slice(nextSourcePosition);
        },
      ];
    }
  );

  var isObject$a = isObject$f;

  var aPossiblePrototype$1 = function (it) {
    if (!isObject$a(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    }
    return it;
  };

  /* eslint-disable no-proto -- safe */

  var anObject$D = anObject$I;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf =
    Object.setPrototypeOf ||
    ('__proto__' in {}
      ? (function () {
          var CORRECT_SETTER = false;
          var test = {};
          var setter;
          try {
            // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
            setter = Object.getOwnPropertyDescriptor(
              Object.prototype,
              '__proto__'
            ).set;
            setter.call(test, []);
            CORRECT_SETTER = test instanceof Array;
          } catch (error) {
            /* empty */
          }
          return function setPrototypeOf(O, proto) {
            anObject$D(O);
            aPossiblePrototype(proto);
            if (CORRECT_SETTER) setter.call(O, proto);
            else O.__proto__ = proto;
            return O;
          };
        })()
      : undefined);

  var isObject$9 = isObject$f;
  var setPrototypeOf$1 = objectSetPrototypeOf;

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
      // it can work only with native `setPrototypeOf`
      setPrototypeOf$1 &&
      // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
      typeof (NewTarget = dummy.constructor) == 'function' &&
      NewTarget !== Wrapper &&
      isObject$9((NewTargetPrototype = NewTarget.prototype)) &&
      NewTargetPrototype !== Wrapper.prototype
    )
      setPrototypeOf$1($this, NewTargetPrototype);
    return $this;
  };

  var isObject$8 = isObject$f;
  var classof$4 = classofRaw$1;
  var wellKnownSymbol$f = wellKnownSymbol$h;

  var MATCH$1 = wellKnownSymbol$f('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return (
      isObject$8(it) &&
      ((isRegExp = it[MATCH$1]) !== undefined
        ? !!isRegExp
        : classof$4(it) == 'RegExp')
    );
  };

  var getBuiltIn$c = getBuiltIn$f;
  var definePropertyModule$2 = objectDefineProperty;
  var wellKnownSymbol$e = wellKnownSymbol$h;
  var DESCRIPTORS$3 = descriptors;

  var SPECIES$3 = wellKnownSymbol$e('species');

  var setSpecies$3 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$c(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule$2.f;

    if (DESCRIPTORS$3 && Constructor && !Constructor[SPECIES$3]) {
      defineProperty(Constructor, SPECIES$3, {
        configurable: true,
        get: function () {
          return this;
        },
      });
    }
  };

  var DESCRIPTORS$2 = descriptors;
  var global$a = global$n;
  var isForced$2 = isForced_1;
  var inheritIfRequired$1 = inheritIfRequired$2;
  var defineProperty$3 = objectDefineProperty.f;
  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var isRegExp$1 = isRegexp;
  var getFlags = regexpFlags$1;
  var stickyHelpers$1 = regexpStickyHelpers;
  var redefine$6 = redefine$9.exports;
  var fails$7 = fails$f;
  var enforceInternalState = internalState.enforce;
  var setSpecies$2 = setSpecies$3;
  var wellKnownSymbol$d = wellKnownSymbol$h;

  var MATCH = wellKnownSymbol$d('match');
  var NativeRegExp = global$a.RegExp;
  var RegExpPrototype$1 = NativeRegExp.prototype;
  var re1 = /a/g;
  var re2 = /a/g;

  // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;

  var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;

  var FORCED$1 =
    DESCRIPTORS$2 &&
    isForced$2(
      'RegExp',
      !CORRECT_NEW ||
        UNSUPPORTED_Y$1 ||
        fails$7(function () {
          re2[MATCH] = false;
          // RegExp constructor can alter flags and IsRegExp works correct with @@match
          return (
            NativeRegExp(re1) != re1 ||
            NativeRegExp(re2) == re2 ||
            NativeRegExp(re1, 'i') != '/a/i'
          );
        })
    );

  // `RegExp` constructor
  // https://tc39.es/ecma262/#sec-regexp-constructor
  if (FORCED$1) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = this instanceof RegExpWrapper;
      var patternIsRegExp = isRegExp$1(pattern);
      var flagsAreUndefined = flags === undefined;
      var sticky;

      if (
        !thisIsRegExp &&
        patternIsRegExp &&
        pattern.constructor === RegExpWrapper &&
        flagsAreUndefined
      ) {
        return pattern;
      }

      if (CORRECT_NEW) {
        if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
      } else if (pattern instanceof RegExpWrapper) {
        if (flagsAreUndefined) flags = getFlags.call(pattern);
        pattern = pattern.source;
      }

      if (UNSUPPORTED_Y$1) {
        sticky = !!flags && flags.indexOf('y') > -1;
        if (sticky) flags = flags.replace(/y/g, '');
      }

      var result = inheritIfRequired$1(
        CORRECT_NEW
          ? new NativeRegExp(pattern, flags)
          : NativeRegExp(pattern, flags),
        thisIsRegExp ? this : RegExpPrototype$1,
        RegExpWrapper
      );

      if (UNSUPPORTED_Y$1 && sticky) {
        var state = enforceInternalState(result);
        state.sticky = true;
      }

      return result;
    };
    var proxy = function (key) {
      key in RegExpWrapper ||
        defineProperty$3(RegExpWrapper, key, {
          configurable: true,
          get: function () {
            return NativeRegExp[key];
          },
          set: function (it) {
            NativeRegExp[key] = it;
          },
        });
    };
    var keys$1 = getOwnPropertyNames(NativeRegExp);
    var index = 0;
    while (keys$1.length > index) proxy(keys$1[index++]);
    RegExpPrototype$1.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype$1;
    redefine$6(global$a, 'RegExp', RegExpWrapper);
  }

  // https://tc39.es/ecma262/#sec-get-regexp-@@species
  setSpecies$2('RegExp');

  var redefine$5 = redefine$9.exports;
  var anObject$C = anObject$I;
  var fails$6 = fails$f;
  var flags = regexpFlags$1;

  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING];

  var NOT_GENERIC = fails$6(function () {
    return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b';
  });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine$5(
      RegExp.prototype,
      TO_STRING,
      function toString() {
        var R = anObject$C(this);
        var p = String(R.source);
        var rf = R.flags;
        var f = String(
          rf === undefined &&
            R instanceof RegExp &&
            !('flags' in RegExpPrototype)
            ? flags.call(R)
            : rf
        );
        return '/' + p + '/' + f;
      },
      { unsafe: true }
    );
  }

  var aFunction$m = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    }
    return it;
  };

  var anObject$B = anObject$I;
  var aFunction$l = aFunction$m;
  var wellKnownSymbol$c = wellKnownSymbol$h;

  var SPECIES$2 = wellKnownSymbol$c('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$b = function (O, defaultConstructor) {
    var C = anObject$B(O).constructor;
    var S;
    return C === undefined || (S = anObject$B(C)[SPECIES$2]) == undefined
      ? defaultConstructor
      : aFunction$l(S);
  };

  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var isRegExp = isRegexp;
  var anObject$A = anObject$I;
  var requireObjectCoercible$1 = requireObjectCoercible$6;
  var speciesConstructor$a = speciesConstructor$b;
  var advanceStringIndex$1 = advanceStringIndex$3;
  var toLength$3 = toLength$6;
  var callRegExpExec = regexpExecAbstract;
  var regexpExec = regexpExec$2;
  var stickyHelpers = regexpStickyHelpers;

  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
  var arrayPush = [].push;
  var min = Math.min;
  var MAX_UINT32 = 0xffffffff;

  // @@split logic
  fixRegExpWellKnownSymbolLogic$1(
    'split',
    2,
    function (SPLIT, nativeSplit, maybeCallNative) {
      var internalSplit;
      if (
        'abbc'.split(/(b)*/)[1] == 'c' ||
        // eslint-disable-next-line regexp/no-empty-group -- required for testing
        'test'.split(/(?:)/, -1).length != 4 ||
        'ab'.split(/(?:ab)*/).length != 2 ||
        '.'.split(/(.?)(.?)/).length != 4 ||
        // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
        '.'.split(/()()/).length > 1 ||
        ''.split(/.?/).length
      ) {
        // based on es5-shim implementation, need to rework it
        internalSplit = function (separator, limit) {
          var string = String(requireObjectCoercible$1(this));
          var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
          if (lim === 0) return [];
          if (separator === undefined) return [string];
          // If `separator` is not a regex, use native split
          if (!isRegExp(separator)) {
            return nativeSplit.call(string, separator, lim);
          }
          var output = [];
          var flags =
            (separator.ignoreCase ? 'i' : '') +
            (separator.multiline ? 'm' : '') +
            (separator.unicode ? 'u' : '') +
            (separator.sticky ? 'y' : '');
          var lastLastIndex = 0;
          // Make `global` and avoid `lastIndex` issues by working with a copy
          var separatorCopy = new RegExp(separator.source, flags + 'g');
          var match, lastIndex, lastLength;
          while ((match = regexpExec.call(separatorCopy, string))) {
            lastIndex = separatorCopy.lastIndex;
            if (lastIndex > lastLastIndex) {
              output.push(string.slice(lastLastIndex, match.index));
              if (match.length > 1 && match.index < string.length)
                arrayPush.apply(output, match.slice(1));
              lastLength = match[0].length;
              lastLastIndex = lastIndex;
              if (output.length >= lim) break;
            }
            if (separatorCopy.lastIndex === match.index)
              separatorCopy.lastIndex++; // Avoid an infinite loop
          }
          if (lastLastIndex === string.length) {
            if (lastLength || !separatorCopy.test('')) output.push('');
          } else output.push(string.slice(lastLastIndex));
          return output.length > lim ? output.slice(0, lim) : output;
        };
        // Chakra, V8
      } else if ('0'.split(undefined, 0).length) {
        internalSplit = function (separator, limit) {
          return separator === undefined && limit === 0
            ? []
            : nativeSplit.call(this, separator, limit);
        };
      } else internalSplit = nativeSplit;

      return [
        // `String.prototype.split` method
        // https://tc39.es/ecma262/#sec-string.prototype.split
        function split(separator, limit) {
          var O = requireObjectCoercible$1(this);
          var splitter = separator == undefined ? undefined : separator[SPLIT];
          return splitter !== undefined
            ? splitter.call(separator, O, limit)
            : internalSplit.call(String(O), separator, limit);
        },
        // `RegExp.prototype[@@split]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
        //
        // NOTE: This cannot be properly polyfilled in engines that don't support
        // the 'y' flag.
        function (regexp, limit) {
          var res = maybeCallNative(
            internalSplit,
            regexp,
            this,
            limit,
            internalSplit !== nativeSplit
          );
          if (res.done) return res.value;

          var rx = anObject$A(regexp);
          var S = String(this);
          var C = speciesConstructor$a(rx, RegExp);

          var unicodeMatching = rx.unicode;
          var flags =
            (rx.ignoreCase ? 'i' : '') +
            (rx.multiline ? 'm' : '') +
            (rx.unicode ? 'u' : '') +
            (UNSUPPORTED_Y ? 'g' : 'y');

          // ^(? + rx + ) is needed, in combination with some S slicing, to
          // simulate the 'y' flag.
          var splitter = new C(
            UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx,
            flags
          );
          var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
          if (lim === 0) return [];
          if (S.length === 0)
            return callRegExpExec(splitter, S) === null ? [S] : [];
          var p = 0;
          var q = 0;
          var A = [];
          while (q < S.length) {
            splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
            var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
            var e;
            if (
              z === null ||
              (e = min(
                toLength$3(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)),
                S.length
              )) === p
            ) {
              q = advanceStringIndex$1(S, q, unicodeMatching);
            } else {
              A.push(S.slice(p, q));
              if (A.length === lim) return A;
              for (var i = 1; i <= z.length - 1; i++) {
                A.push(z[i]);
                if (A.length === lim) return A;
              }
              q = p = e;
            }
          }
          A.push(S.slice(p));
          return A;
        },
      ];
    },
    UNSUPPORTED_Y
  );

  function get(key) {
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
              encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') +
              '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      ) || null
    );
  }
  /**
   *
   * @param {string} key
   * @param {any} value
   * @param {string|number|date} end
   * @param {string} path
   * @param {string} domain
   * @param {string} secure
   * @returns {boolean}
   */

  function set$1(key, value, end, path, domain, secure) {
    if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
      return false;
    }

    var expires = '';

    if (end) {
      switch (end.constructor) {
        case Number:
          expires =
            end === Infinity
              ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
              : '; max-age=' + end;
          break;

        case String:
          expires = '; expires=' + end;
          break;

        case Date:
          expires = '; expires=' + end.toUTCString();
          break;
      }
    }

    document.cookie =
      encodeURIComponent(key) +
      '=' +
      encodeURIComponent(value) +
      expires +
      (domain ? '; domain=' + domain : '') +
      (path ? '; path=' + path : '') +
      (secure ? '; secure' : '');
    return true;
  }
  /**
   *
   * @param {string} key
   * @returns {booelan}
   */

  function has$4(key) {
    return new RegExp(
      '(?:^|;\\s*)' +
        encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') +
        '\\s*\\='
    ).test(document.cookie);
  }
  /**
   *
   * @param {string} key
   * @param {string} path
   * @param {string} domain
   * @returns {boolean}
   */

  function remove(key, path, domain) {
    if (!key || !has$4(key)) {
      return false;
    }

    document.cookie =
      encodeURIComponent(key) +
      '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
      (domain ? '; domain=' + domain : '') +
      (path ? '; path=' + path : '');
    return true;
  }
  /**
   *
   * @returns {array}
   */

  function keys() {
    var keys = document.cookie
      .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
      .split(/\s*(?:\=[^;]*)?;\s*/);

    for (var i = 0; i < keys.length; i++) {
      keys[i] = decodeURIComponent(keys[i]);
    }

    return keys;
  }

  var cookies = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    keys: keys,
    get: get,
    set: set$1,
    has: has$4,
    remove: remove,
  });

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$1 =
    Object.keys ||
    function keys(O) {
      return internalObjectKeys(O, enumBugKeys$1);
    };

  var DESCRIPTORS$1 = descriptors;
  var definePropertyModule$1 = objectDefineProperty;
  var anObject$z = anObject$I;
  var objectKeys = objectKeys$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  var objectDefineProperties = DESCRIPTORS$1
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        anObject$z(O);
        var keys = objectKeys(Properties);
        var length = keys.length;
        var index = 0;
        var key;
        while (length > index)
          definePropertyModule$1.f(O, (key = keys[index++]), Properties[key]);
        return O;
      };

  var getBuiltIn$b = getBuiltIn$f;

  var html$2 = getBuiltIn$b('document', 'documentElement');

  var anObject$y = anObject$I;
  var defineProperties = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys$1 = hiddenKeys$5;
  var html$1 = html$2;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey$1 = sharedKey$3;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$1('IE_PROTO');

  var EmptyConstructor = function () {
    /* empty */
  };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html$1.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      /* global ActiveXObject -- old IE */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }
    NullProtoObject = activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument)
      : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys$1[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate =
    Object.create ||
    function create(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject$y(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$1] = O;
      } else result = NullProtoObject();
      return Properties === undefined
        ? result
        : defineProperties(result, Properties);
    };

  var wellKnownSymbol$b = wellKnownSymbol$h;
  var create$2 = objectCreate;
  var definePropertyModule = objectDefineProperty;

  var UNSCOPABLES = wellKnownSymbol$b('unscopables');
  var ArrayPrototype$1 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    definePropertyModule.f(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: create$2(null),
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$1 = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var fails$5 = fails$f;

  var correctPrototypeGetter = !fails$5(function () {
    function F() {
      /* empty */
    }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var has$3 = has$b;
  var toObject$1 = toObject$4;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER
    ? Object.getPrototypeOf
    : function (O) {
        O = toObject$1(O);
        if (has$3(O, IE_PROTO)) return O[IE_PROTO];
        if (typeof O.constructor == 'function' && O instanceof O.constructor) {
          return O.constructor.prototype;
        }
        return O instanceof Object ? ObjectPrototype : null;
      };

  var fails$4 = fails$f;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$9;
  var has$2 = has$b;
  var wellKnownSymbol$a = wellKnownSymbol$h;

  var ITERATOR$5 = wellKnownSymbol$a('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  var returnThis$2 = function () {
    return this;
  };

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(
        getPrototypeOf$1(arrayIterator)
      );
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
        IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE =
    IteratorPrototype$2 == undefined ||
    fails$4(function () {
      var test = {};
      // FF44- legacy iterators case
      return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
    });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if (!has$2(IteratorPrototype$2, ITERATOR$5)) {
    createNonEnumerableProperty$3(
      IteratorPrototype$2,
      ITERATOR$5,
      returnThis$2
    );
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1,
  };

  var defineProperty$2 = objectDefineProperty.f;
  var has$1 = has$b;
  var wellKnownSymbol$9 = wellKnownSymbol$h;

  var TO_STRING_TAG$3 = wellKnownSymbol$9('toStringTag');

  var setToStringTag$4 = function (it, TAG, STATIC) {
    if (it && !has$1((it = STATIC ? it : it.prototype), TO_STRING_TAG$3)) {
      defineProperty$2(it, TO_STRING_TAG$3, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$1 = objectCreate;
  var createPropertyDescriptor = createPropertyDescriptor$3;
  var setToStringTag$3 = setToStringTag$4;
  var Iterators$4 = iterators;

  var returnThis$1 = function () {
    return this;
  };

  var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$1(IteratorPrototype$1, {
      next: createPropertyDescriptor(1, next),
    });
    setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$4[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var $$y = _export;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag$2 = setToStringTag$4;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$9;
  var redefine$4 = redefine$9.exports;
  var wellKnownSymbol$8 = wellKnownSymbol$h;
  var Iterators$3 = iterators;
  var IteratorsCore = iteratorsCore;

  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$4 = wellKnownSymbol$8('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () {
    return this;
  };

  var defineIterator$2 = function (
    Iterable,
    NAME,
    IteratorConstructor,
    next,
    DEFAULT,
    IS_SET,
    FORCED
  ) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
        return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS:
          return function keys() {
            return new IteratorConstructor(this, KIND);
          };
        case VALUES:
          return function values() {
            return new IteratorConstructor(this, KIND);
          };
        case ENTRIES:
          return function entries() {
            return new IteratorConstructor(this, KIND);
          };
      }
      return function () {
        return new IteratorConstructor(this);
      };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator =
      IterablePrototype[ITERATOR$4] ||
      IterablePrototype['@@iterator'] ||
      (DEFAULT && IterablePrototype[DEFAULT]);
    var defaultIterator =
      (!BUGGY_SAFARI_ITERATORS && nativeIterator) ||
      getIterationMethod(DEFAULT);
    var anyNativeIterator =
      NAME == 'Array'
        ? IterablePrototype.entries || nativeIterator
        : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(
        anyNativeIterator.call(new Iterable())
      );
      if (
        IteratorPrototype !== Object.prototype &&
        CurrentIteratorPrototype.next
      ) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf) {
            setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
          } else if (
            typeof CurrentIteratorPrototype[ITERATOR$4] != 'function'
          ) {
            createNonEnumerableProperty$2(
              CurrentIteratorPrototype,
              ITERATOR$4,
              returnThis
            );
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() {
        return nativeIterator.call(this);
      };
    }

    // define iterator
    if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
      createNonEnumerableProperty$2(
        IterablePrototype,
        ITERATOR$4,
        defaultIterator
      );
    }
    Iterators$3[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES),
      };
      if (FORCED)
        for (KEY in methods) {
          if (
            BUGGY_SAFARI_ITERATORS ||
            INCORRECT_VALUES_NAME ||
            !(KEY in IterablePrototype)
          ) {
            redefine$4(IterablePrototype, KEY, methods[KEY]);
          }
        }
      else
        $$y(
          {
            target: NAME,
            proto: true,
            forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME,
          },
          methods
        );
    }

    return methods;
  };

  var toIndexedObject = toIndexedObject$4;
  var addToUnscopables = addToUnscopables$1;
  var Iterators$2 = iterators;
  var InternalStateModule$3 = internalState;
  var defineIterator$1 = defineIterator$2;

  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$3 = InternalStateModule$3.set;
  var getInternalState$1 = InternalStateModule$3.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator$1(
    Array,
    'Array',
    function (iterated, kind) {
      setInternalState$3(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0, // next index
        kind: kind, // kind
      });
      // `%ArrayIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    },
    function () {
      var state = getInternalState$1(this);
      var target = state.target;
      var kind = state.kind;
      var index = state.index++;
      if (!target || index >= target.length) {
        state.target = undefined;
        return { value: undefined, done: true };
      }
      if (kind == 'keys') return { value: index, done: false };
      if (kind == 'values') return { value: target[index], done: false };
      return { value: [index, target[index]], done: false };
    },
    'values'
  );

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  Iterators$2.Arguments = Iterators$2.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');

  var internalMetadata = { exports: {} };

  var fails$3 = fails$f;

  var freezing = !fails$3(function () {
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var hiddenKeys = hiddenKeys$5;
  var isObject$7 = isObject$f;
  var has = has$b;
  var defineProperty$1 = objectDefineProperty.f;
  var uid = uid$3;
  var FREEZING = freezing;

  var METADATA = uid('meta');
  var id$1 = 0;

  // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible$1 =
    Object.isExtensible ||
    function () {
      return true;
    };

  var setMetadata = function (it) {
    defineProperty$1(it, METADATA, {
      value: {
        objectID: 'O' + ++id$1, // object ID
        weakData: {}, // weak collections IDs
      },
    });
  };

  var fastKey$1 = function (it, create) {
    // return a primitive with prefix
    if (!isObject$7(it))
      return typeof it == 'symbol'
        ? it
        : (typeof it == 'string' ? 'S' : 'P') + it;
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible$1(it)) return 'F';
      // not necessary to add metadata
      if (!create) return 'E';
      // add missing metadata
      setMetadata(it);
      // return object ID
    }
    return it[METADATA].objectID;
  };

  var getWeakData$1 = function (it, create) {
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible$1(it)) return true;
      // not necessary to add metadata
      if (!create) return false;
      // add missing metadata
      setMetadata(it);
      // return the store of weak collections IDs
    }
    return it[METADATA].weakData;
  };

  // add metadata on freeze-family methods calling
  var onFreeze = function (it) {
    if (FREEZING && meta.REQUIRED && isExtensible$1(it) && !has(it, METADATA))
      setMetadata(it);
    return it;
  };

  var meta = (internalMetadata.exports = {
    REQUIRED: false,
    fastKey: fastKey$1,
    getWeakData: getWeakData$1,
    onFreeze: onFreeze,
  });

  hiddenKeys[METADATA] = true;

  var wellKnownSymbol$7 = wellKnownSymbol$h;
  var Iterators$1 = iterators;

  var ITERATOR$3 = wellKnownSymbol$7('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$1 = function (it) {
    return (
      it !== undefined &&
      (Iterators$1.Array === it || ArrayPrototype[ITERATOR$3] === it)
    );
  };

  var aFunction$k = aFunction$m;

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$k(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0:
        return function () {
          return fn.call(that);
        };
      case 1:
        return function (a) {
          return fn.call(that, a);
        };
      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var wellKnownSymbol$6 = wellKnownSymbol$h;

  var TO_STRING_TAG$2 = wellKnownSymbol$6('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$5 = wellKnownSymbol$h;

  var TO_STRING_TAG$1 = wellKnownSymbol$5('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS =
    classofRaw(
      (function () {
        return arguments;
      })()
    ) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$3 = TO_STRING_TAG_SUPPORT$2
    ? classofRaw
    : function (it) {
        var O, tag, result;
        return it === undefined
          ? 'Undefined'
          : it === null
          ? 'Null'
          : // @@toStringTag case
          typeof (tag = tryGet((O = Object(it)), TO_STRING_TAG$1)) == 'string'
          ? tag
          : // builtinTag case
          CORRECT_ARGUMENTS
          ? classofRaw(O)
          : // ES3 arguments fallback
          (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function'
          ? 'Arguments'
          : result;
      };

  var classof$2 = classof$3;
  var Iterators = iterators;
  var wellKnownSymbol$4 = wellKnownSymbol$h;

  var ITERATOR$2 = wellKnownSymbol$4('iterator');

  var getIteratorMethod$2 = function (it) {
    if (it != undefined)
      return it[ITERATOR$2] || it['@@iterator'] || Iterators[classof$2(it)];
  };

  var anObject$x = anObject$I;

  var iteratorClose$1 = function (iterator) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) {
      return anObject$x(returnMethod.call(iterator)).value;
    }
  };

  var anObject$w = anObject$I;
  var isArrayIteratorMethod = isArrayIteratorMethod$1;
  var toLength$2 = toLength$6;
  var bind$g = functionBindContext;
  var getIteratorMethod$1 = getIteratorMethod$2;
  var iteratorClose = iteratorClose$1;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate$t = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$g(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$w(value);
        return INTERRUPTED
          ? fn(value[0], value[1], stop)
          : fn(value[0], value[1]);
      }
      return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod$1(iterable);
      if (typeof iterFn != 'function')
        throw TypeError('Target is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (
          index = 0, length = toLength$2(iterable.length);
          length > index;
          index++
        ) {
          result = callFn(iterable[index]);
          if (result && result instanceof Result) return result;
        }
        return new Result(false);
      }
      iterator = iterFn.call(iterable);
    }

    next = iterator.next;
    while (!(step = next.call(iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator);
        throw error;
      }
      if (typeof result == 'object' && result && result instanceof Result)
        return result;
    }
    return new Result(false);
  };

  var anInstance$4 = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    }
    return it;
  };

  var wellKnownSymbol$3 = wellKnownSymbol$h;

  var ITERATOR$1 = wellKnownSymbol$3('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      return: function () {
        SAFE_CLOSING = true;
      },
    };
    iteratorWithReturn[ITERATOR$1] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {
    /* empty */
  }

  var checkCorrectnessOfIteration$2 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$1] = function () {
        return {
          next: function () {
            return { done: (ITERATION_SUPPORT = true) };
          },
        };
      };
      exec(object);
    } catch (error) {
      /* empty */
    }
    return ITERATION_SUPPORT;
  };

  var $$x = _export;
  var global$9 = global$n;
  var isForced$1 = isForced_1;
  var redefine$3 = redefine$9.exports;
  var InternalMetadataModule$1 = internalMetadata.exports;
  var iterate$s = iterate$t;
  var anInstance$3 = anInstance$4;
  var isObject$6 = isObject$f;
  var fails$2 = fails$f;
  var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;
  var setToStringTag$1 = setToStringTag$4;
  var inheritIfRequired = inheritIfRequired$2;

  var collection$4 = function (CONSTRUCTOR_NAME, wrapper, common) {
    var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
    var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
    var ADDER = IS_MAP ? 'set' : 'add';
    var NativeConstructor = global$9[CONSTRUCTOR_NAME];
    var NativePrototype = NativeConstructor && NativeConstructor.prototype;
    var Constructor = NativeConstructor;
    var exported = {};

    var fixMethod = function (KEY) {
      var nativeMethod = NativePrototype[KEY];
      redefine$3(
        NativePrototype,
        KEY,
        KEY == 'add'
          ? function add(value) {
              nativeMethod.call(this, value === 0 ? 0 : value);
              return this;
            }
          : KEY == 'delete'
          ? function (key) {
              return IS_WEAK && !isObject$6(key)
                ? false
                : nativeMethod.call(this, key === 0 ? 0 : key);
            }
          : KEY == 'get'
          ? function get(key) {
              return IS_WEAK && !isObject$6(key)
                ? undefined
                : nativeMethod.call(this, key === 0 ? 0 : key);
            }
          : KEY == 'has'
          ? function has(key) {
              return IS_WEAK && !isObject$6(key)
                ? false
                : nativeMethod.call(this, key === 0 ? 0 : key);
            }
          : function set(key, value) {
              nativeMethod.call(this, key === 0 ? 0 : key, value);
              return this;
            }
      );
    };

    var REPLACE = isForced$1(
      CONSTRUCTOR_NAME,
      typeof NativeConstructor != 'function' ||
        !(
          IS_WEAK ||
          (NativePrototype.forEach &&
            !fails$2(function () {
              new NativeConstructor().entries().next();
            }))
        )
    );

    if (REPLACE) {
      // create collection constructor
      Constructor = common.getConstructor(
        wrapper,
        CONSTRUCTOR_NAME,
        IS_MAP,
        ADDER
      );
      InternalMetadataModule$1.REQUIRED = true;
    } else if (isForced$1(CONSTRUCTOR_NAME, true)) {
      var instance = new Constructor();
      // early implementations not supports chaining
      var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
      // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
      var THROWS_ON_PRIMITIVES = fails$2(function () {
        instance.has(1);
      });
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      // eslint-disable-next-line no-new -- required for testing
      var ACCEPT_ITERABLES = checkCorrectnessOfIteration$1(function (iterable) {
        new NativeConstructor(iterable);
      });
      // for early implementations -0 and +0 not the same
      var BUGGY_ZERO =
        !IS_WEAK &&
        fails$2(function () {
          // V8 ~ Chromium 42- fails only with 5+ elements
          var $instance = new NativeConstructor();
          var index = 5;
          while (index--) $instance[ADDER](index, index);
          return !$instance.has(-0);
        });

      if (!ACCEPT_ITERABLES) {
        Constructor = wrapper(function (dummy, iterable) {
          anInstance$3(dummy, Constructor, CONSTRUCTOR_NAME);
          var that = inheritIfRequired(
            new NativeConstructor(),
            dummy,
            Constructor
          );
          if (iterable != undefined)
            iterate$s(iterable, that[ADDER], {
              that: that,
              AS_ENTRIES: IS_MAP,
            });
          return that;
        });
        Constructor.prototype = NativePrototype;
        NativePrototype.constructor = Constructor;
      }

      if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
        fixMethod('delete');
        fixMethod('has');
        IS_MAP && fixMethod('get');
      }

      if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

      // weak collections should not contains .clear method
      if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
    }

    exported[CONSTRUCTOR_NAME] = Constructor;
    $$x({ global: true, forced: Constructor != NativeConstructor }, exported);

    setToStringTag$1(Constructor, CONSTRUCTOR_NAME);

    if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

    return Constructor;
  };

  var redefine$2 = redefine$9.exports;

  var redefineAll$4 = function (target, src, options) {
    for (var key in src) redefine$2(target, key, src[key], options);
    return target;
  };

  var defineProperty = objectDefineProperty.f;
  var create = objectCreate;
  var redefineAll$3 = redefineAll$4;
  var bind$f = functionBindContext;
  var anInstance$2 = anInstance$4;
  var iterate$r = iterate$t;
  var defineIterator = defineIterator$2;
  var setSpecies$1 = setSpecies$3;
  var DESCRIPTORS = descriptors;
  var fastKey = internalMetadata.exports.fastKey;
  var InternalStateModule$2 = internalState;

  var setInternalState$2 = InternalStateModule$2.set;
  var internalStateGetterFor$1 = InternalStateModule$2.getterFor;

  var collectionStrong$2 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance$2(that, C, CONSTRUCTOR_NAME);
        setInternalState$2(that, {
          type: CONSTRUCTOR_NAME,
          index: create(null),
          first: undefined,
          last: undefined,
          size: 0,
        });
        if (!DESCRIPTORS) that.size = 0;
        if (iterable != undefined)
          iterate$r(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        var previous, index;
        // change existing entry
        if (entry) {
          entry.value = value;
          // create new entry
        } else {
          state.last = entry = {
            index: (index = fastKey(key, true)),
            key: key,
            value: value,
            previous: (previous = state.last),
            next: undefined,
            removed: false,
          };
          if (!state.first) state.first = entry;
          if (previous) previous.next = entry;
          if (DESCRIPTORS) state.size++;
          else that.size++;
          // add to index
          if (index !== 'F') state.index[index] = entry;
        }
        return that;
      };

      var getEntry = function (that, key) {
        var state = getInternalState(that);
        // fast case
        var index = fastKey(key);
        var entry;
        if (index !== 'F') return state.index[index];
        // frozen object case
        for (entry = state.first; entry; entry = entry.next) {
          if (entry.key == key) return entry;
        }
      };

      redefineAll$3(C.prototype, {
        // 23.1.3.1 Map.prototype.clear()
        // 23.2.3.2 Set.prototype.clear()
        clear: function clear() {
          var that = this;
          var state = getInternalState(that);
          var data = state.index;
          var entry = state.first;
          while (entry) {
            entry.removed = true;
            if (entry.previous)
              entry.previous = entry.previous.next = undefined;
            delete data[entry.index];
            entry = entry.next;
          }
          state.first = state.last = undefined;
          if (DESCRIPTORS) state.size = 0;
          else that.size = 0;
        },
        // 23.1.3.3 Map.prototype.delete(key)
        // 23.2.3.4 Set.prototype.delete(value)
        delete: function (key) {
          var that = this;
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          if (entry) {
            var next = entry.next;
            var prev = entry.previous;
            delete state.index[entry.index];
            entry.removed = true;
            if (prev) prev.next = next;
            if (next) next.previous = prev;
            if (state.first == entry) state.first = next;
            if (state.last == entry) state.last = prev;
            if (DESCRIPTORS) state.size--;
            else that.size--;
          }
          return !!entry;
        },
        // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
        // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
        forEach: function forEach(callbackfn /* , that = undefined */) {
          var state = getInternalState(this);
          var boundFunction = bind$f(
            callbackfn,
            arguments.length > 1 ? arguments[1] : undefined,
            3
          );
          var entry;
          while ((entry = entry ? entry.next : state.first)) {
            boundFunction(entry.value, entry.key, this);
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
          }
        },
        // 23.1.3.7 Map.prototype.has(key)
        // 23.2.3.7 Set.prototype.has(value)
        has: function has(key) {
          return !!getEntry(this, key);
        },
      });

      redefineAll$3(
        C.prototype,
        IS_MAP
          ? {
              // 23.1.3.6 Map.prototype.get(key)
              get: function get(key) {
                var entry = getEntry(this, key);
                return entry && entry.value;
              },
              // 23.1.3.9 Map.prototype.set(key, value)
              set: function set(key, value) {
                return define(this, key === 0 ? 0 : key, value);
              },
            }
          : {
              // 23.2.3.1 Set.prototype.add(value)
              add: function add(value) {
                return define(this, (value = value === 0 ? 0 : value), value);
              },
            }
      );
      if (DESCRIPTORS)
        defineProperty(C.prototype, 'size', {
          get: function () {
            return getInternalState(this).size;
          },
        });
      return C;
    },
    setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
      var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
      var getInternalCollectionState = internalStateGetterFor$1(
        CONSTRUCTOR_NAME
      );
      var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME);
      // add .keys, .values, .entries, [@@iterator]
      // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
      defineIterator(
        C,
        CONSTRUCTOR_NAME,
        function (iterated, kind) {
          setInternalState$2(this, {
            type: ITERATOR_NAME,
            target: iterated,
            state: getInternalCollectionState(iterated),
            kind: kind,
            last: undefined,
          });
        },
        function () {
          var state = getInternalIteratorState(this);
          var kind = state.kind;
          var entry = state.last;
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
          // get next entry
          if (
            !state.target ||
            !(state.last = entry = entry ? entry.next : state.state.first)
          ) {
            // or finish the iteration
            state.target = undefined;
            return { value: undefined, done: true };
          }
          // return step by kind
          if (kind == 'keys') return { value: entry.key, done: false };
          if (kind == 'values') return { value: entry.value, done: false };
          return { value: [entry.key, entry.value], done: false };
        },
        IS_MAP ? 'entries' : 'values',
        !IS_MAP,
        true
      );

      // add [@@species], 23.1.2.2, 23.2.2.2
      setSpecies$1(CONSTRUCTOR_NAME);
    },
  };

  var collection$3 = collection$4;
  var collectionStrong$1 = collectionStrong$2;

  // `Map` constructor
  // https://tc39.es/ecma262/#sec-map-objects
  collection$3(
    'Map',
    function (init) {
      return function Map() {
        return init(this, arguments.length ? arguments[0] : undefined);
      };
    },
    collectionStrong$1
  );

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$1 = classof$3;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1
    ? {}.toString
    : function toString() {
        return '[object ' + classof$1(this) + ']';
      };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$1 = redefine$9.exports;
  var toString = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    redefine$1(Object.prototype, 'toString', toString, { unsafe: true });
  }

  var anObject$v = anObject$I;
  var aFunction$j = aFunction$m;

  // https://github.com/tc39/collection-methods
  var collectionDeleteAll$4 = function (/* ...elements */) {
    var collection = anObject$v(this);
    var remover = aFunction$j(collection['delete']);
    var allDeleted = true;
    var wasDeleted;
    for (var k = 0, len = arguments.length; k < len; k++) {
      wasDeleted = remover.call(collection, arguments[k]);
      allDeleted = allDeleted && wasDeleted;
    }
    return !!allDeleted;
  };

  var $$w = _export;
  var IS_PURE$v = isPure;
  var collectionDeleteAll$3 = collectionDeleteAll$4;

  // `Map.prototype.deleteAll` method
  // https://github.com/tc39/proposal-collection-methods
  $$w(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$v },
    {
      deleteAll: function deleteAll(/* ...elements */) {
        return collectionDeleteAll$3.apply(this, arguments);
      },
    }
  );

  var anObject$u = anObject$I;
  var getIteratorMethod = getIteratorMethod$2;

  var getIterator$1 = function (it) {
    var iteratorMethod = getIteratorMethod(it);
    if (typeof iteratorMethod != 'function') {
      throw TypeError(String(it) + ' is not iterable');
    }
    return anObject$u(iteratorMethod.call(it));
  };

  var getMapIterator$a = function (it) {
    // eslint-disable-next-line es/no-map -- safe
    return Map.prototype.entries.call(it);
  };

  var $$v = _export;
  var IS_PURE$u = isPure;
  var anObject$t = anObject$I;
  var bind$e = functionBindContext;
  var getMapIterator$9 = getMapIterator$a;
  var iterate$q = iterate$t;

  // `Map.prototype.every` method
  // https://github.com/tc39/proposal-collection-methods
  $$v(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$u },
    {
      every: function every(callbackfn /* , thisArg */) {
        var map = anObject$t(this);
        var iterator = getMapIterator$9(map);
        var boundFunction = bind$e(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        return !iterate$q(
          iterator,
          function (key, value, stop) {
            if (!boundFunction(value, key, map)) return stop();
          },
          { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }
        ).stopped;
      },
    }
  );

  var $$u = _export;
  var IS_PURE$t = isPure;
  var getBuiltIn$a = getBuiltIn$f;
  var anObject$s = anObject$I;
  var aFunction$i = aFunction$m;
  var bind$d = functionBindContext;
  var speciesConstructor$9 = speciesConstructor$b;
  var getMapIterator$8 = getMapIterator$a;
  var iterate$p = iterate$t;

  // `Map.prototype.filter` method
  // https://github.com/tc39/proposal-collection-methods
  $$u(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$t },
    {
      filter: function filter(callbackfn /* , thisArg */) {
        var map = anObject$s(this);
        var iterator = getMapIterator$8(map);
        var boundFunction = bind$d(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        var newMap = new (speciesConstructor$9(map, getBuiltIn$a('Map')))();
        var setter = aFunction$i(newMap.set);
        iterate$p(
          iterator,
          function (key, value) {
            if (boundFunction(value, key, map)) setter.call(newMap, key, value);
          },
          { AS_ENTRIES: true, IS_ITERATOR: true }
        );
        return newMap;
      },
    }
  );

  var $$t = _export;
  var IS_PURE$s = isPure;
  var anObject$r = anObject$I;
  var bind$c = functionBindContext;
  var getMapIterator$7 = getMapIterator$a;
  var iterate$o = iterate$t;

  // `Map.prototype.find` method
  // https://github.com/tc39/proposal-collection-methods
  $$t(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$s },
    {
      find: function find(callbackfn /* , thisArg */) {
        var map = anObject$r(this);
        var iterator = getMapIterator$7(map);
        var boundFunction = bind$c(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        return iterate$o(
          iterator,
          function (key, value, stop) {
            if (boundFunction(value, key, map)) return stop(value);
          },
          { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }
        ).result;
      },
    }
  );

  var $$s = _export;
  var IS_PURE$r = isPure;
  var anObject$q = anObject$I;
  var bind$b = functionBindContext;
  var getMapIterator$6 = getMapIterator$a;
  var iterate$n = iterate$t;

  // `Map.prototype.findKey` method
  // https://github.com/tc39/proposal-collection-methods
  $$s(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$r },
    {
      findKey: function findKey(callbackfn /* , thisArg */) {
        var map = anObject$q(this);
        var iterator = getMapIterator$6(map);
        var boundFunction = bind$b(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        return iterate$n(
          iterator,
          function (key, value, stop) {
            if (boundFunction(value, key, map)) return stop(key);
          },
          { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }
        ).result;
      },
    }
  );

  // `SameValueZero` abstract operation
  // https://tc39.es/ecma262/#sec-samevaluezero
  var sameValueZero$1 = function (x, y) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return x === y || (x != x && y != y);
  };

  var $$r = _export;
  var IS_PURE$q = isPure;
  var anObject$p = anObject$I;
  var getMapIterator$5 = getMapIterator$a;
  var sameValueZero = sameValueZero$1;
  var iterate$m = iterate$t;

  // `Map.prototype.includes` method
  // https://github.com/tc39/proposal-collection-methods
  $$r(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$q },
    {
      includes: function includes(searchElement) {
        return iterate$m(
          getMapIterator$5(anObject$p(this)),
          function (key, value, stop) {
            if (sameValueZero(value, searchElement)) return stop();
          },
          { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }
        ).stopped;
      },
    }
  );

  var $$q = _export;
  var IS_PURE$p = isPure;
  var anObject$o = anObject$I;
  var getMapIterator$4 = getMapIterator$a;
  var iterate$l = iterate$t;

  // `Map.prototype.includes` method
  // https://github.com/tc39/proposal-collection-methods
  $$q(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$p },
    {
      keyOf: function keyOf(searchElement) {
        return iterate$l(
          getMapIterator$4(anObject$o(this)),
          function (key, value, stop) {
            if (value === searchElement) return stop(key);
          },
          { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }
        ).result;
      },
    }
  );

  var $$p = _export;
  var IS_PURE$o = isPure;
  var getBuiltIn$9 = getBuiltIn$f;
  var anObject$n = anObject$I;
  var aFunction$h = aFunction$m;
  var bind$a = functionBindContext;
  var speciesConstructor$8 = speciesConstructor$b;
  var getMapIterator$3 = getMapIterator$a;
  var iterate$k = iterate$t;

  // `Map.prototype.mapKeys` method
  // https://github.com/tc39/proposal-collection-methods
  $$p(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$o },
    {
      mapKeys: function mapKeys(callbackfn /* , thisArg */) {
        var map = anObject$n(this);
        var iterator = getMapIterator$3(map);
        var boundFunction = bind$a(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        var newMap = new (speciesConstructor$8(map, getBuiltIn$9('Map')))();
        var setter = aFunction$h(newMap.set);
        iterate$k(
          iterator,
          function (key, value) {
            setter.call(newMap, boundFunction(value, key, map), value);
          },
          { AS_ENTRIES: true, IS_ITERATOR: true }
        );
        return newMap;
      },
    }
  );

  var $$o = _export;
  var IS_PURE$n = isPure;
  var getBuiltIn$8 = getBuiltIn$f;
  var anObject$m = anObject$I;
  var aFunction$g = aFunction$m;
  var bind$9 = functionBindContext;
  var speciesConstructor$7 = speciesConstructor$b;
  var getMapIterator$2 = getMapIterator$a;
  var iterate$j = iterate$t;

  // `Map.prototype.mapValues` method
  // https://github.com/tc39/proposal-collection-methods
  $$o(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$n },
    {
      mapValues: function mapValues(callbackfn /* , thisArg */) {
        var map = anObject$m(this);
        var iterator = getMapIterator$2(map);
        var boundFunction = bind$9(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        var newMap = new (speciesConstructor$7(map, getBuiltIn$8('Map')))();
        var setter = aFunction$g(newMap.set);
        iterate$j(
          iterator,
          function (key, value) {
            setter.call(newMap, key, boundFunction(value, key, map));
          },
          { AS_ENTRIES: true, IS_ITERATOR: true }
        );
        return newMap;
      },
    }
  );

  var $$n = _export;
  var IS_PURE$m = isPure;
  var anObject$l = anObject$I;
  var aFunction$f = aFunction$m;
  var iterate$i = iterate$t;

  // `Map.prototype.merge` method
  // https://github.com/tc39/proposal-collection-methods
  $$n(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$m },
    {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      merge: function merge(iterable /* ...iterbles */) {
        var map = anObject$l(this);
        var setter = aFunction$f(map.set);
        var i = 0;
        while (i < arguments.length) {
          iterate$i(arguments[i++], setter, { that: map, AS_ENTRIES: true });
        }
        return map;
      },
    }
  );

  var $$m = _export;
  var IS_PURE$l = isPure;
  var anObject$k = anObject$I;
  var aFunction$e = aFunction$m;
  var getMapIterator$1 = getMapIterator$a;
  var iterate$h = iterate$t;

  // `Map.prototype.reduce` method
  // https://github.com/tc39/proposal-collection-methods
  $$m(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$l },
    {
      reduce: function reduce(callbackfn /* , initialValue */) {
        var map = anObject$k(this);
        var iterator = getMapIterator$1(map);
        var noInitial = arguments.length < 2;
        var accumulator = noInitial ? undefined : arguments[1];
        aFunction$e(callbackfn);
        iterate$h(
          iterator,
          function (key, value) {
            if (noInitial) {
              noInitial = false;
              accumulator = value;
            } else {
              accumulator = callbackfn(accumulator, value, key, map);
            }
          },
          { AS_ENTRIES: true, IS_ITERATOR: true }
        );
        if (noInitial)
          throw TypeError('Reduce of empty map with no initial value');
        return accumulator;
      },
    }
  );

  var $$l = _export;
  var IS_PURE$k = isPure;
  var anObject$j = anObject$I;
  var bind$8 = functionBindContext;
  var getMapIterator = getMapIterator$a;
  var iterate$g = iterate$t;

  // `Set.prototype.some` method
  // https://github.com/tc39/proposal-collection-methods
  $$l(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$k },
    {
      some: function some(callbackfn /* , thisArg */) {
        var map = anObject$j(this);
        var iterator = getMapIterator(map);
        var boundFunction = bind$8(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        return iterate$g(
          iterator,
          function (key, value, stop) {
            if (boundFunction(value, key, map)) return stop();
          },
          { AS_ENTRIES: true, IS_ITERATOR: true, INTERRUPTED: true }
        ).stopped;
      },
    }
  );

  var $$k = _export;
  var IS_PURE$j = isPure;
  var anObject$i = anObject$I;
  var aFunction$d = aFunction$m;

  // `Set.prototype.update` method
  // https://github.com/tc39/proposal-collection-methods
  $$k(
    { target: 'Map', proto: true, real: true, forced: IS_PURE$j },
    {
      update: function update(key, callback /* , thunk */) {
        var map = anObject$i(this);
        var length = arguments.length;
        aFunction$d(callback);
        var isPresentInMap = map.has(key);
        if (!isPresentInMap && length < 3) {
          throw TypeError('Updating absent value');
        }
        var value = isPresentInMap
          ? map.get(key)
          : aFunction$d(length > 2 ? arguments[2] : undefined)(key, map);
        map.set(key, callback(value, key, map));
        return map;
      },
    }
  );

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0,
  };

  var global$8 = global$n;
  var DOMIterables$1 = domIterables;
  var ArrayIteratorMethods = es_array_iterator;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$9;
  var wellKnownSymbol$2 = wellKnownSymbol$h;

  var ITERATOR = wellKnownSymbol$2('iterator');
  var TO_STRING_TAG = wellKnownSymbol$2('toStringTag');
  var ArrayValues = ArrayIteratorMethods.values;

  for (var COLLECTION_NAME$1 in DOMIterables$1) {
    var Collection$1 = global$8[COLLECTION_NAME$1];
    var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
    if (CollectionPrototype$1) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1[ITERATOR] !== ArrayValues)
        try {
          createNonEnumerableProperty$1(
            CollectionPrototype$1,
            ITERATOR,
            ArrayValues
          );
        } catch (error) {
          CollectionPrototype$1[ITERATOR] = ArrayValues;
        }
      if (!CollectionPrototype$1[TO_STRING_TAG]) {
        createNonEnumerableProperty$1(
          CollectionPrototype$1,
          TO_STRING_TAG,
          COLLECTION_NAME$1
        );
      }
      if (DOMIterables$1[COLLECTION_NAME$1])
        for (var METHOD_NAME in ArrayIteratorMethods) {
          // some Chrome versions have non-configurable methods on DOMTokenList
          if (
            CollectionPrototype$1[METHOD_NAME] !==
            ArrayIteratorMethods[METHOD_NAME]
          )
            try {
              createNonEnumerableProperty$1(
                CollectionPrototype$1,
                METHOD_NAME,
                ArrayIteratorMethods[METHOD_NAME]
              );
            } catch (error) {
              CollectionPrototype$1[METHOD_NAME] =
                ArrayIteratorMethods[METHOD_NAME];
            }
        }
    }
  }

  var classof = classofRaw$1;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$2 =
    Array.isArray ||
    function isArray(arg) {
      return classof(arg) == 'Array';
    };

  var isObject$5 = isObject$f;
  var isArray$1 = isArray$2;
  var wellKnownSymbol$1 = wellKnownSymbol$h;

  var SPECIES$1 = wellKnownSymbol$1('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$1 = function (originalArray, length) {
    var C;
    if (isArray$1(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray$1(C.prototype)))
        C = undefined;
      else if (isObject$5(C)) {
        C = C[SPECIES$1];
        if (C === null) C = undefined;
      }
    }
    return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var bind$7 = functionBindContext;
  var IndexedObject = indexedObject;
  var toObject = toObject$4;
  var toLength$1 = toLength$6;
  var arraySpeciesCreate = arraySpeciesCreate$1;

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
  var createMethod = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = IndexedObject(O);
      var boundFunction = bind$7(callbackfn, that, 3);
      var length = toLength$1(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP
        ? create($this, length)
        : IS_FILTER || IS_FILTER_OUT
        ? create($this, 0)
        : undefined;
      var value, result;
      for (; length > index; index++)
        if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);
          if (TYPE) {
            if (IS_MAP) target[index] = result;
            // map
            else if (result)
              switch (TYPE) {
                case 3:
                  return true; // some
                case 5:
                  return value; // find
                case 6:
                  return index; // findIndex
                case 2:
                  push.call(target, value); // filter
              }
            else
              switch (TYPE) {
                case 4:
                  return false; // every
                case 7:
                  push.call(target, value); // filterOut
              }
          }
        }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod(6),
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod(7),
  };

  var redefineAll$2 = redefineAll$4;
  var getWeakData = internalMetadata.exports.getWeakData;
  var anObject$h = anObject$I;
  var isObject$4 = isObject$f;
  var anInstance$1 = anInstance$4;
  var iterate$f = iterate$t;
  var ArrayIterationModule = arrayIteration;
  var $has = has$b;
  var InternalStateModule$1 = internalState;

  var setInternalState$1 = InternalStateModule$1.set;
  var internalStateGetterFor = InternalStateModule$1.getterFor;
  var find = ArrayIterationModule.find;
  var findIndex = ArrayIterationModule.findIndex;
  var id = 0;

  // fallback for uncaught frozen keys
  var uncaughtFrozenStore = function (store) {
    return store.frozen || (store.frozen = new UncaughtFrozenStore());
  };

  var UncaughtFrozenStore = function () {
    this.entries = [];
  };

  var findUncaughtFrozen = function (store, key) {
    return find(store.entries, function (it) {
      return it[0] === key;
    });
  };

  UncaughtFrozenStore.prototype = {
    get: function (key) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) return entry[1];
    },
    has: function (key) {
      return !!findUncaughtFrozen(this, key);
    },
    set: function (key, value) {
      var entry = findUncaughtFrozen(this, key);
      if (entry) entry[1] = value;
      else this.entries.push([key, value]);
    },
    delete: function (key) {
      var index = findIndex(this.entries, function (it) {
        return it[0] === key;
      });
      if (~index) this.entries.splice(index, 1);
      return !!~index;
    },
  };

  var collectionWeak$2 = {
    getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
      var C = wrapper(function (that, iterable) {
        anInstance$1(that, C, CONSTRUCTOR_NAME);
        setInternalState$1(that, {
          type: CONSTRUCTOR_NAME,
          id: id++,
          frozen: undefined,
        });
        if (iterable != undefined)
          iterate$f(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
      });

      var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

      var define = function (that, key, value) {
        var state = getInternalState(that);
        var data = getWeakData(anObject$h(key), true);
        if (data === true) uncaughtFrozenStore(state).set(key, value);
        else data[state.id] = value;
        return that;
      };

      redefineAll$2(C.prototype, {
        // 23.3.3.2 WeakMap.prototype.delete(key)
        // 23.4.3.3 WeakSet.prototype.delete(value)
        delete: function (key) {
          var state = getInternalState(this);
          if (!isObject$4(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state)['delete'](key);
          return data && $has(data, state.id) && delete data[state.id];
        },
        // 23.3.3.4 WeakMap.prototype.has(key)
        // 23.4.3.4 WeakSet.prototype.has(value)
        has: function has(key) {
          var state = getInternalState(this);
          if (!isObject$4(key)) return false;
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).has(key);
          return data && $has(data, state.id);
        },
      });

      redefineAll$2(
        C.prototype,
        IS_MAP
          ? {
              // 23.3.3.3 WeakMap.prototype.get(key)
              get: function get(key) {
                var state = getInternalState(this);
                if (isObject$4(key)) {
                  var data = getWeakData(key);
                  if (data === true) return uncaughtFrozenStore(state).get(key);
                  return data ? data[state.id] : undefined;
                }
              },
              // 23.3.3.5 WeakMap.prototype.set(key, value)
              set: function set(key, value) {
                return define(this, key, value);
              },
            }
          : {
              // 23.4.3.1 WeakSet.prototype.add(value)
              add: function add(value) {
                return define(this, value, true);
              },
            }
      );

      return C;
    },
  };

  var global$7 = global$n;
  var redefineAll$1 = redefineAll$4;
  var InternalMetadataModule = internalMetadata.exports;
  var collection$2 = collection$4;
  var collectionWeak$1 = collectionWeak$2;
  var isObject$3 = isObject$f;
  var enforceIternalState = internalState.enforce;
  var NATIVE_WEAK_MAP = nativeWeakMap;

  var IS_IE11 = !global$7.ActiveXObject && 'ActiveXObject' in global$7;
  // eslint-disable-next-line es/no-object-isextensible -- safe
  var isExtensible = Object.isExtensible;
  var InternalWeakMap;

  var wrapper = function (init) {
    return function WeakMap() {
      return init(this, arguments.length ? arguments[0] : undefined);
    };
  };

  // `WeakMap` constructor
  // https://tc39.es/ecma262/#sec-weakmap-constructor
  var $WeakMap = collection$2('WeakMap', wrapper, collectionWeak$1);

  // IE11 WeakMap frozen keys fix
  // We can't use feature detection because it crash some old IE builds
  // https://github.com/zloirock/core-js/issues/485
  if (NATIVE_WEAK_MAP && IS_IE11) {
    InternalWeakMap = collectionWeak$1.getConstructor(wrapper, 'WeakMap', true);
    InternalMetadataModule.REQUIRED = true;
    var WeakMapPrototype = $WeakMap.prototype;
    var nativeDelete = WeakMapPrototype['delete'];
    var nativeHas = WeakMapPrototype.has;
    var nativeGet = WeakMapPrototype.get;
    var nativeSet = WeakMapPrototype.set;
    redefineAll$1(WeakMapPrototype, {
      delete: function (key) {
        if (isObject$3(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeDelete.call(this, key) || state.frozen['delete'](key);
        }
        return nativeDelete.call(this, key);
      },
      has: function has(key) {
        if (isObject$3(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key) || state.frozen.has(key);
        }
        return nativeHas.call(this, key);
      },
      get: function get(key) {
        if (isObject$3(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          return nativeHas.call(this, key)
            ? nativeGet.call(this, key)
            : state.frozen.get(key);
        }
        return nativeGet.call(this, key);
      },
      set: function set(key, value) {
        if (isObject$3(key) && !isExtensible(key)) {
          var state = enforceIternalState(this);
          if (!state.frozen) state.frozen = new InternalWeakMap();
          nativeHas.call(this, key)
            ? nativeSet.call(this, key, value)
            : state.frozen.set(key, value);
        } else nativeSet.call(this, key, value);
        return this;
      },
    });
  }

  var $$j = _export;
  var IS_PURE$i = isPure;
  var collectionDeleteAll$2 = collectionDeleteAll$4;

  // `WeakMap.prototype.deleteAll` method
  // https://github.com/tc39/proposal-collection-methods
  $$j(
    { target: 'WeakMap', proto: true, real: true, forced: IS_PURE$i },
    {
      deleteAll: function deleteAll(/* ...elements */) {
        return collectionDeleteAll$2.apply(this, arguments);
      },
    }
  );

  var collection$1 = collection$4;
  var collectionStrong = collectionStrong$2;

  // `Set` constructor
  // https://tc39.es/ecma262/#sec-set-objects
  collection$1(
    'Set',
    function (init) {
      return function Set() {
        return init(this, arguments.length ? arguments[0] : undefined);
      };
    },
    collectionStrong
  );

  var anObject$g = anObject$I;
  var aFunction$c = aFunction$m;

  // https://github.com/tc39/collection-methods
  var collectionAddAll$2 = function (/* ...elements */) {
    var set = anObject$g(this);
    var adder = aFunction$c(set.add);
    for (var k = 0, len = arguments.length; k < len; k++) {
      adder.call(set, arguments[k]);
    }
    return set;
  };

  var $$i = _export;
  var IS_PURE$h = isPure;
  var collectionAddAll$1 = collectionAddAll$2;

  // `Set.prototype.addAll` method
  // https://github.com/tc39/proposal-collection-methods
  $$i(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$h },
    {
      addAll: function addAll(/* ...elements */) {
        return collectionAddAll$1.apply(this, arguments);
      },
    }
  );

  var $$h = _export;
  var IS_PURE$g = isPure;
  var collectionDeleteAll$1 = collectionDeleteAll$4;

  // `Set.prototype.deleteAll` method
  // https://github.com/tc39/proposal-collection-methods
  $$h(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$g },
    {
      deleteAll: function deleteAll(/* ...elements */) {
        return collectionDeleteAll$1.apply(this, arguments);
      },
    }
  );

  var $$g = _export;
  var IS_PURE$f = isPure;
  var getBuiltIn$7 = getBuiltIn$f;
  var anObject$f = anObject$I;
  var aFunction$b = aFunction$m;
  var speciesConstructor$6 = speciesConstructor$b;
  var iterate$e = iterate$t;

  // `Set.prototype.difference` method
  // https://github.com/tc39/proposal-set-methods
  $$g(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$f },
    {
      difference: function difference(iterable) {
        var set = anObject$f(this);
        var newSet = new (speciesConstructor$6(set, getBuiltIn$7('Set')))(set);
        var remover = aFunction$b(newSet['delete']);
        iterate$e(iterable, function (value) {
          remover.call(newSet, value);
        });
        return newSet;
      },
    }
  );

  var getSetIterator$7 = function (it) {
    // eslint-disable-next-line es/no-set -- safe
    return Set.prototype.values.call(it);
  };

  var $$f = _export;
  var IS_PURE$e = isPure;
  var anObject$e = anObject$I;
  var bind$6 = functionBindContext;
  var getSetIterator$6 = getSetIterator$7;
  var iterate$d = iterate$t;

  // `Set.prototype.every` method
  // https://github.com/tc39/proposal-collection-methods
  $$f(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$e },
    {
      every: function every(callbackfn /* , thisArg */) {
        var set = anObject$e(this);
        var iterator = getSetIterator$6(set);
        var boundFunction = bind$6(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        return !iterate$d(
          iterator,
          function (value, stop) {
            if (!boundFunction(value, value, set)) return stop();
          },
          { IS_ITERATOR: true, INTERRUPTED: true }
        ).stopped;
      },
    }
  );

  var $$e = _export;
  var IS_PURE$d = isPure;
  var getBuiltIn$6 = getBuiltIn$f;
  var anObject$d = anObject$I;
  var aFunction$a = aFunction$m;
  var bind$5 = functionBindContext;
  var speciesConstructor$5 = speciesConstructor$b;
  var getSetIterator$5 = getSetIterator$7;
  var iterate$c = iterate$t;

  // `Set.prototype.filter` method
  // https://github.com/tc39/proposal-collection-methods
  $$e(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$d },
    {
      filter: function filter(callbackfn /* , thisArg */) {
        var set = anObject$d(this);
        var iterator = getSetIterator$5(set);
        var boundFunction = bind$5(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        var newSet = new (speciesConstructor$5(set, getBuiltIn$6('Set')))();
        var adder = aFunction$a(newSet.add);
        iterate$c(
          iterator,
          function (value) {
            if (boundFunction(value, value, set)) adder.call(newSet, value);
          },
          { IS_ITERATOR: true }
        );
        return newSet;
      },
    }
  );

  var $$d = _export;
  var IS_PURE$c = isPure;
  var anObject$c = anObject$I;
  var bind$4 = functionBindContext;
  var getSetIterator$4 = getSetIterator$7;
  var iterate$b = iterate$t;

  // `Set.prototype.find` method
  // https://github.com/tc39/proposal-collection-methods
  $$d(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$c },
    {
      find: function find(callbackfn /* , thisArg */) {
        var set = anObject$c(this);
        var iterator = getSetIterator$4(set);
        var boundFunction = bind$4(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        return iterate$b(
          iterator,
          function (value, stop) {
            if (boundFunction(value, value, set)) return stop(value);
          },
          { IS_ITERATOR: true, INTERRUPTED: true }
        ).result;
      },
    }
  );

  var $$c = _export;
  var IS_PURE$b = isPure;
  var getBuiltIn$5 = getBuiltIn$f;
  var anObject$b = anObject$I;
  var aFunction$9 = aFunction$m;
  var speciesConstructor$4 = speciesConstructor$b;
  var iterate$a = iterate$t;

  // `Set.prototype.intersection` method
  // https://github.com/tc39/proposal-set-methods
  $$c(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$b },
    {
      intersection: function intersection(iterable) {
        var set = anObject$b(this);
        var newSet = new (speciesConstructor$4(set, getBuiltIn$5('Set')))();
        var hasCheck = aFunction$9(set.has);
        var adder = aFunction$9(newSet.add);
        iterate$a(iterable, function (value) {
          if (hasCheck.call(set, value)) adder.call(newSet, value);
        });
        return newSet;
      },
    }
  );

  var $$b = _export;
  var IS_PURE$a = isPure;
  var anObject$a = anObject$I;
  var aFunction$8 = aFunction$m;
  var iterate$9 = iterate$t;

  // `Set.prototype.isDisjointFrom` method
  // https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
  $$b(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$a },
    {
      isDisjointFrom: function isDisjointFrom(iterable) {
        var set = anObject$a(this);
        var hasCheck = aFunction$8(set.has);
        return !iterate$9(
          iterable,
          function (value, stop) {
            if (hasCheck.call(set, value) === true) return stop();
          },
          { INTERRUPTED: true }
        ).stopped;
      },
    }
  );

  var $$a = _export;
  var IS_PURE$9 = isPure;
  var getBuiltIn$4 = getBuiltIn$f;
  var anObject$9 = anObject$I;
  var aFunction$7 = aFunction$m;
  var getIterator = getIterator$1;
  var iterate$8 = iterate$t;

  // `Set.prototype.isSubsetOf` method
  // https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
  $$a(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$9 },
    {
      isSubsetOf: function isSubsetOf(iterable) {
        var iterator = getIterator(this);
        var otherSet = anObject$9(iterable);
        var hasCheck = otherSet.has;
        if (typeof hasCheck != 'function') {
          otherSet = new (getBuiltIn$4('Set'))(iterable);
          hasCheck = aFunction$7(otherSet.has);
        }
        return !iterate$8(
          iterator,
          function (value, stop) {
            if (hasCheck.call(otherSet, value) === false) return stop();
          },
          { IS_ITERATOR: true, INTERRUPTED: true }
        ).stopped;
      },
    }
  );

  var $$9 = _export;
  var IS_PURE$8 = isPure;
  var anObject$8 = anObject$I;
  var aFunction$6 = aFunction$m;
  var iterate$7 = iterate$t;

  // `Set.prototype.isSupersetOf` method
  // https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
  $$9(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$8 },
    {
      isSupersetOf: function isSupersetOf(iterable) {
        var set = anObject$8(this);
        var hasCheck = aFunction$6(set.has);
        return !iterate$7(
          iterable,
          function (value, stop) {
            if (hasCheck.call(set, value) === false) return stop();
          },
          { INTERRUPTED: true }
        ).stopped;
      },
    }
  );

  var $$8 = _export;
  var IS_PURE$7 = isPure;
  var anObject$7 = anObject$I;
  var getSetIterator$3 = getSetIterator$7;
  var iterate$6 = iterate$t;

  // `Set.prototype.join` method
  // https://github.com/tc39/proposal-collection-methods
  $$8(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$7 },
    {
      join: function join(separator) {
        var set = anObject$7(this);
        var iterator = getSetIterator$3(set);
        var sep = separator === undefined ? ',' : String(separator);
        var result = [];
        iterate$6(iterator, result.push, { that: result, IS_ITERATOR: true });
        return result.join(sep);
      },
    }
  );

  var $$7 = _export;
  var IS_PURE$6 = isPure;
  var getBuiltIn$3 = getBuiltIn$f;
  var anObject$6 = anObject$I;
  var aFunction$5 = aFunction$m;
  var bind$3 = functionBindContext;
  var speciesConstructor$3 = speciesConstructor$b;
  var getSetIterator$2 = getSetIterator$7;
  var iterate$5 = iterate$t;

  // `Set.prototype.map` method
  // https://github.com/tc39/proposal-collection-methods
  $$7(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$6 },
    {
      map: function map(callbackfn /* , thisArg */) {
        var set = anObject$6(this);
        var iterator = getSetIterator$2(set);
        var boundFunction = bind$3(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        var newSet = new (speciesConstructor$3(set, getBuiltIn$3('Set')))();
        var adder = aFunction$5(newSet.add);
        iterate$5(
          iterator,
          function (value) {
            adder.call(newSet, boundFunction(value, value, set));
          },
          { IS_ITERATOR: true }
        );
        return newSet;
      },
    }
  );

  var $$6 = _export;
  var IS_PURE$5 = isPure;
  var anObject$5 = anObject$I;
  var aFunction$4 = aFunction$m;
  var getSetIterator$1 = getSetIterator$7;
  var iterate$4 = iterate$t;

  // `Set.prototype.reduce` method
  // https://github.com/tc39/proposal-collection-methods
  $$6(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$5 },
    {
      reduce: function reduce(callbackfn /* , initialValue */) {
        var set = anObject$5(this);
        var iterator = getSetIterator$1(set);
        var noInitial = arguments.length < 2;
        var accumulator = noInitial ? undefined : arguments[1];
        aFunction$4(callbackfn);
        iterate$4(
          iterator,
          function (value) {
            if (noInitial) {
              noInitial = false;
              accumulator = value;
            } else {
              accumulator = callbackfn(accumulator, value, value, set);
            }
          },
          { IS_ITERATOR: true }
        );
        if (noInitial)
          throw TypeError('Reduce of empty set with no initial value');
        return accumulator;
      },
    }
  );

  var $$5 = _export;
  var IS_PURE$4 = isPure;
  var anObject$4 = anObject$I;
  var bind$2 = functionBindContext;
  var getSetIterator = getSetIterator$7;
  var iterate$3 = iterate$t;

  // `Set.prototype.some` method
  // https://github.com/tc39/proposal-collection-methods
  $$5(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$4 },
    {
      some: function some(callbackfn /* , thisArg */) {
        var set = anObject$4(this);
        var iterator = getSetIterator(set);
        var boundFunction = bind$2(
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined,
          3
        );
        return iterate$3(
          iterator,
          function (value, stop) {
            if (boundFunction(value, value, set)) return stop();
          },
          { IS_ITERATOR: true, INTERRUPTED: true }
        ).stopped;
      },
    }
  );

  var $$4 = _export;
  var IS_PURE$3 = isPure;
  var getBuiltIn$2 = getBuiltIn$f;
  var anObject$3 = anObject$I;
  var aFunction$3 = aFunction$m;
  var speciesConstructor$2 = speciesConstructor$b;
  var iterate$2 = iterate$t;

  // `Set.prototype.symmetricDifference` method
  // https://github.com/tc39/proposal-set-methods
  $$4(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$3 },
    {
      symmetricDifference: function symmetricDifference(iterable) {
        var set = anObject$3(this);
        var newSet = new (speciesConstructor$2(set, getBuiltIn$2('Set')))(set);
        var remover = aFunction$3(newSet['delete']);
        var adder = aFunction$3(newSet.add);
        iterate$2(iterable, function (value) {
          remover.call(newSet, value) || adder.call(newSet, value);
        });
        return newSet;
      },
    }
  );

  var $$3 = _export;
  var IS_PURE$2 = isPure;
  var getBuiltIn$1 = getBuiltIn$f;
  var anObject$2 = anObject$I;
  var aFunction$2 = aFunction$m;
  var speciesConstructor$1 = speciesConstructor$b;
  var iterate$1 = iterate$t;

  // `Set.prototype.union` method
  // https://github.com/tc39/proposal-set-methods
  $$3(
    { target: 'Set', proto: true, real: true, forced: IS_PURE$2 },
    {
      union: function union(iterable) {
        var set = anObject$2(this);
        var newSet = new (speciesConstructor$1(set, getBuiltIn$1('Set')))(set);
        iterate$1(iterable, aFunction$2(newSet.add), { that: newSet });
        return newSet;
      },
    }
  );

  var collection = collection$4;
  var collectionWeak = collectionWeak$2;

  // `WeakSet` constructor
  // https://tc39.es/ecma262/#sec-weakset-constructor
  collection(
    'WeakSet',
    function (init) {
      return function WeakSet() {
        return init(this, arguments.length ? arguments[0] : undefined);
      };
    },
    collectionWeak
  );

  var $$2 = _export;
  var IS_PURE$1 = isPure;
  var collectionAddAll = collectionAddAll$2;

  // `WeakSet.prototype.addAll` method
  // https://github.com/tc39/proposal-collection-methods
  $$2(
    { target: 'WeakSet', proto: true, real: true, forced: IS_PURE$1 },
    {
      addAll: function addAll(/* ...elements */) {
        return collectionAddAll.apply(this, arguments);
      },
    }
  );

  var $$1 = _export;
  var IS_PURE = isPure;
  var collectionDeleteAll = collectionDeleteAll$4;

  // `WeakSet.prototype.deleteAll` method
  // https://github.com/tc39/proposal-collection-methods
  $$1(
    { target: 'WeakSet', proto: true, real: true, forced: IS_PURE },
    {
      deleteAll: function deleteAll(/* ...elements */) {
        return collectionDeleteAll.apply(this, arguments);
      },
    }
  );

  /**
   * @description: https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
   * @param {element} element https://developer.mozilla.org/zh-CN/docs/Web/API/Element
   * @returns {DOMRect} {left, top, right, bottom, x, y, width, height}, 返回的 DOMRect对象中的属性不是自己的属性。
   * 当使用in 和 for...in 运算符时能成功查找到返回的属性，但使用其他API（例如Object.keys（））查找时将失败。 而且，ES2015和更高版本的功能（如Object.assign（）和对象rest/spread）将无法复制返回的属性。
   */

  function getDOMRect(element) {
    return (
      (element.getBoundingClientRect && element.getBoundingClientRect()) || null
    );
  }
  /**
   * @description 元素相对于网页左上角顶点（0，0）的top和left
   * @param {element} element
   * @returns {object} {x, y}
   */

  function getPosition(element) {
    var _getDOMRect = getDOMRect(element),
      left = _getDOMRect.left,
      top = _getDOMRect.top;

    var dom = document.documentElement || document.body.parentNode;
    var x =
      window.pageXOffset ||
      window.scrollX ||
      (typeof dom.scrollLeft == 'number' ? dom : document.body).scrollLeft;
    var y =
      window.pageYOffset ||
      window.scrollY ||
      (typeof dom.scrollTop == 'number' ? dom : document.body).scrollTop;
    return {
      x: x + left,
      y: y + top,
    };
  }

  var element = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getDOMRect: getDOMRect,
    getPosition: getPosition,
  });

  /**
   * @external https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures
   * 数据类型(EMCA latest): 9种
   * 原始类型：undefined, Boolean, String, Number, Bigint, Symbol
   * null, 注意 typeof null === 'object'
   * Object: Object, Array, Function, Map, Set, WeekMap, WeekSet, Date,
   * Function: RegExp
   */

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isNull(value) {
    return value === null;
  }
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isString(value) {
    return typeof value === 'string';
  }
  /**
   *
   * @param {*} value
   * @returns {number}
   */

  function isNumber(value) {
    return typeof value === 'number';
  }
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isSymbol(value) {
    return typeof value === 'symbol';
  }
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isUndefined(value) {
    return value === undefined;
  }
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isBoolean(value) {
    return value === true || value === false;
  }
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isBigInt(value) {
    return typeof value === 'bigint';
  }
  /**
   * @description
   * @param {*} value
   * @return {boolean}
   */

  function isFunction(value) {
    return typeof value === 'function';
  }
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isObject$2(value) {
    var type = typeof value;
    return value !== null && (type === 'object' || type === 'function');
  }
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isPrototype(value) {
    var objectProto = Object.prototype;
    var constructor = value && value.constructor;
    var proto =
      (isFunction(constructor) && constructor.prototype) || objectProto;
    return value === proto;
  }
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isArray(value) {
    return value instanceof Array;
  } // 另一种思路是调用toString 去看它是不是 [Object Map]

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isMap(value) {
    return value instanceof Map;
  }
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isWeakMap(value) {
    return value instanceof WeakMap;
  }
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isSet(value) {
    return value instanceof Set;
  }
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isWeakSet(value) {
    return value instanceof WeakSet;
  }
  /**
   * @example `Error`, `EvalError`, `RangeError`, `ReferenceError`,`SyntaxError`, `TypeError`, `URIError`
   * @param {*} value
   * @returns {boolean}
   */

  function isError(value) {
    return [
      Error,
      URIError,
      EvalError,
      TypeError,
      RangeError,
      SyntaxError,
      ReferenceError,
    ].some((item) => {
      return value instanceof item;
    });
  } // https://getbootstrap.com/docs/4.1/layout/overview/
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries

  /**
   * Extra small devices (portrait phones, less than 576px)
   * @media (max-width: 575.98px) { ... }
   * @returns {boolean}
   */

  function isScreenXS() {
    var _getDOMRect = getDOMRect(document.body),
      width = _getDOMRect.width;

    return width <= 575.98;
  }
  /**
   * Small devices (landscape phones, 576px and up)
   * @media (min-width: 576px) and (max-width: 767.98px) { ... }
   * @returns {boolean}
   */

  function isScreenSM() {
    var _getDOMRect2 = getDOMRect(document.body),
      width = _getDOMRect2.width;

    return width >= 576 && width <= 767.98;
  }
  /**
   * Medium devices (tablets, 768px and up)
   * @media (min-width: 768px) and (max-width: 991.98px) { ... }
   * @returns {boolean}
   */

  function isScreenMD() {
    var _getDOMRect3 = getDOMRect(document.body),
      width = _getDOMRect3.width;

    return width >= 768 && width <= 991.98;
  }
  /**
   * Large devices (desktops, 992px and up)
   * @media (min-width: 992px) and (max-width: 1199.98px) { ... }
   * @returns {boolean}
   */

  function isScreenLG() {
    var _getDOMRect4 = getDOMRect(document.body),
      width = _getDOMRect4.width;

    return width >= 992 && width <= 1199.98;
  }
  /**
   * Extra large devices (large desktops, 1200px and up)
   * @media (min-width: 1200px) { ... }
   * @returns {boolean}
   */

  function isScreenXL() {
    var _getDOMRect5 = getDOMRect(document.body),
      width = _getDOMRect5.width;

    return width >= 1200;
  }
  /**
   *
   * @param {*} value
   * @returns
   */

  function isEmpty(value) {
    // null 0 '' false undefined
    if (!value) {
      return true;
    }

    if (isArray(value)) {
      return !value.length;
    } else if (isObject$2(value)) {
      return !Object.keys(value).length;
    } else if (
      isMap(value) ||
      isWeakMap(value) ||
      isSet(value) ||
      isWeakSet(value)
    ) {
      return !value.size;
    }

    return false;
  }
  /**
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isDate(value) {
    return value instanceof Date;
  }

  var judge = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    isNull: isNull,
    isString: isString,
    isNumber: isNumber,
    isSymbol: isSymbol,
    isUndefined: isUndefined,
    isBoolean: isBoolean,
    isBigInt: isBigInt,
    isFunction: isFunction,
    isArray: isArray,
    isObject: isObject$2,
    isPrototype: isPrototype,
    isMap: isMap,
    isWeakMap: isWeakMap,
    isSet: isSet,
    isWeakSet: isWeakSet,
    isError: isError,
    isScreenXS: isScreenXS,
    isScreenSM: isScreenSM,
    isScreenMD: isScreenMD,
    isScreenLG: isScreenLG,
    isScreenXL: isScreenXL,
    isEmpty: isEmpty,
    isDate: isDate,
  });

  function randomSimple() {
    return Math.random().toString(32).substr(2);
  }

  var generator = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    randomSimple: randomSimple,
  });

  var runtime = { exports: {} };

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (module) {
    var runtime = (function (exports) {
      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.
      var $Symbol = typeof Symbol === 'function' ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || '@@iterator';
      var asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator';
      var toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';

      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
        return obj[key];
      }
      try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, '');
      } catch (err) {
        define = function (obj, key, value) {
          return (obj[key] = value);
        };
      }

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator =
          outerFn && outerFn.prototype instanceof Generator
            ? outerFn
            : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);

        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);

        return generator;
      }
      exports.wrap = wrap;

      // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.
      function tryCatch(fn, obj, arg) {
        try {
          return { type: 'normal', arg: fn.call(obj, arg) };
        } catch (err) {
          return { type: 'throw', arg: err };
        }
      }

      var GenStateSuspendedStart = 'suspendedStart';
      var GenStateSuspendedYield = 'suspendedYield';
      var GenStateExecuting = 'executing';
      var GenStateCompleted = 'completed';

      // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.
      var ContinueSentinel = {};

      // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.
      function Generator() {}
      function GeneratorFunction() {}
      function GeneratorFunctionPrototype() {}

      // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.
      var IteratorPrototype = {};
      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      if (
        NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
      ) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(
        IteratorPrototype
      ));
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, 'GeneratorFunction');

      // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.
      function defineIteratorMethods(prototype) {
        ['next', 'throw', 'return'].forEach(function (method) {
          define(prototype, method, function (arg) {
            return this._invoke(method, arg);
          });
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === 'function' && genFun.constructor;
        return ctor
          ? ctor === GeneratorFunction ||
              // For the native GeneratorFunction constructor, the best we can
              // do is to check its .name property.
              (ctor.displayName || ctor.name) === 'GeneratorFunction'
          : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define(genFun, toStringTagSymbol, 'GeneratorFunction');
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };

      // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.
      exports.awrap = function (arg) {
        return { __await: arg };
      };

      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === 'throw') {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;
            if (
              value &&
              typeof value === 'object' &&
              hasOwn.call(value, '__await')
            ) {
              return PromiseImpl.resolve(value.__await).then(
                function (value) {
                  invoke('next', value, resolve, reject);
                },
                function (err) {
                  invoke('throw', err, resolve, reject);
                }
              );
            }

            return PromiseImpl.resolve(value).then(
              function (unwrapped) {
                // When a yielded Promise is resolved, its final value becomes
                // the .value of the Promise<{value,done}> result for the
                // current iteration.
                result.value = unwrapped;
                resolve(result);
              },
              function (error) {
                // If a rejected Promise was yielded, throw the rejection back
                // into the async generator function so it can be handled there.
                return invoke('throw', error, resolve, reject);
              }
            );
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return (previousPromise =
            // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise
              ? previousPromise.then(
                  callInvokeWithMethodAndArg,
                  // Avoid propagating failures to Promises returned by later
                  // invocations of the iterator.
                  callInvokeWithMethodAndArg
                )
              : callInvokeWithMethodAndArg());
        }

        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);
      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this;
      };
      exports.AsyncIterator = AsyncIterator;

      // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.
      exports.async = function (
        innerFn,
        outerFn,
        self,
        tryLocsList,
        PromiseImpl
      ) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;

        var iter = new AsyncIterator(
          wrap(innerFn, outerFn, self, tryLocsList),
          PromiseImpl
        );

        return exports.isGeneratorFunction(outerFn)
          ? iter // If outerFn is a generator, return the full iterator.
          : iter.next().then(function (result) {
              return result.done ? result.value : iter.next();
            });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;

        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error('Generator is already running');
          }

          if (state === GenStateCompleted) {
            if (method === 'throw') {
              throw arg;
            }

            // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === 'next') {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === 'throw') {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === 'return') {
              context.abrupt('return', context.arg);
            }

            state = GenStateExecuting;

            var record = tryCatch(innerFn, self, context);
            if (record.type === 'normal') {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done,
              };
            } else if (record.type === 'throw') {
              state = GenStateCompleted;
              // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.
              context.method = 'throw';
              context.arg = record.arg;
            }
          }
        };
      }

      // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.
      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === 'throw') {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator['return']) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = 'return';
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === 'throw') {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = 'throw';
            context.arg = new TypeError(
              "The iterator does not provide a 'throw' method"
            );
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === 'throw') {
          context.method = 'throw';
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = 'throw';
          context.arg = new TypeError('iterator result is not an object');
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value;

          // Resume execution at the desired location (see delegateYield).
          context.next = delegate.nextLoc;

          // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.
          if (context.method !== 'return') {
            context.method = 'next';
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        }

        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
      }

      // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.
      defineIteratorMethods(Gp);

      define(Gp, toStringTagSymbol, 'Generator');

      // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.
      Gp[iteratorSymbol] = function () {
        return this;
      };

      Gp.toString = function () {
        return '[object Generator]';
      };

      function pushTryEntry(locs) {
        var entry = { tryLoc: locs[0] };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = 'normal';
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{ tryLoc: 'root' }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        var keys = [];
        for (var key in object) {
          keys.push(key);
        }
        keys.reverse();

        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
          while (keys.length) {
            var key = keys.pop();
            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          }

          // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.
          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === 'function') {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
              next = function next() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next.value = iterable[i];
                    next.done = false;
                    return next;
                  }
                }

                next.value = undefined$1;
                next.done = true;

                return next;
              };

            return (next.next = next);
          }
        }

        // Return an iterator with no values.
        return { next: doneResult };
      }
      exports.values = values;

      function doneResult() {
        return { value: undefined$1, done: true };
      }

      Context.prototype = {
        constructor: Context,

        reset: function (skipTempReset) {
          this.prev = 0;
          this.next = 0;
          // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.
          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;

          this.method = 'next';
          this.arg = undefined$1;

          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (
                name.charAt(0) === 't' &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))
              ) {
                this[name] = undefined$1;
              }
            }
          }
        },

        stop: function () {
          this.done = true;

          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;
          if (rootRecord.type === 'throw') {
            throw rootRecord.arg;
          }

          return this.rval;
        },

        dispatchException: function (exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;
          function handle(loc, caught) {
            record.type = 'throw';
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = 'next';
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === 'root') {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle('end');
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, 'catchLoc');
              var hasFinally = hasOwn.call(entry, 'finallyLoc');

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error('try statement without catch or finally');
              }
            }
          }
        },

        abrupt: function (type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (
              entry.tryLoc <= this.prev &&
              hasOwn.call(entry, 'finallyLoc') &&
              this.prev < entry.finallyLoc
            ) {
              var finallyEntry = entry;
              break;
            }
          }

          if (
            finallyEntry &&
            (type === 'break' || type === 'continue') &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc
          ) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = 'next';
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },

        complete: function (record, afterLoc) {
          if (record.type === 'throw') {
            throw record.arg;
          }

          if (record.type === 'break' || record.type === 'continue') {
            this.next = record.arg;
          } else if (record.type === 'return') {
            this.rval = this.arg = record.arg;
            this.method = 'return';
            this.next = 'end';
          } else if (record.type === 'normal' && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },

        finish: function (finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },

        catch: function (tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if (record.type === 'throw') {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }

          // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.
          throw new Error('illegal catch attempt');
        },

        delegateYield: function (iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc,
          };

          if (this.method === 'next') {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        },
      };

      // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.
      return exports;
    })(
      // If this script is executing as a CommonJS module, use module.exports
      // as the regeneratorRuntime namespace. Otherwise create a new empty
      // object. Either way, the resulting object will be used to initialize
      // the regeneratorRuntime variable at the top of this file.
      module.exports
    );

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      Function('r', 'regeneratorRuntime = r')(runtime);
    }
  })(runtime);

  var regenerator = runtime.exports;

  var global$6 = global$n;

  var nativePromiseConstructor = global$6.Promise;

  var userAgent$1 = engineUserAgent;

  var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent$1);

  var global$5 = global$n;
  var fails$1 = fails$f;
  var bind$1 = functionBindContext;
  var html = html$2;
  var createElement = documentCreateElement$1;
  var IS_IOS$1 = engineIsIos;
  var IS_NODE$2 = engineIsNode;

  var location = global$5.location;
  var set = global$5.setImmediate;
  var clear = global$5.clearImmediate;
  var process$2 = global$5.process;
  var MessageChannel = global$5.MessageChannel;
  var Dispatch = global$5.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var defer, channel, port;

  var run = function (id) {
    // eslint-disable-next-line no-prototype-builtins -- safe
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global$5.postMessage(id + '', location.protocol + '//' + location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set || !clear) {
    set = function setImmediate(fn) {
      var args = [];
      var i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func -- spec requirement
        (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (IS_NODE$2) {
      defer = function (id) {
        process$2.nextTick(runner(id));
      };
      // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
      // Browsers with MessageChannel, includes WebWorkers
      // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !IS_IOS$1) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = bind$1(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global$5.addEventListener &&
      typeof postMessage == 'function' &&
      !global$5.importScripts &&
      location &&
      location.protocol !== 'file:' &&
      !fails$1(post)
    ) {
      defer = post;
      global$5.addEventListener('message', listener, false);
      // IE8-
    } else if (ONREADYSTATECHANGE in createElement('script')) {
      defer = function (id) {
        html.appendChild(createElement('script'))[
          ONREADYSTATECHANGE
        ] = function () {
          html.removeChild(this);
          run(id);
        };
      };
      // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task$1 = {
    set: set,
    clear: clear,
  };

  var userAgent = engineUserAgent;

  var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

  var global$4 = global$n;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var macrotask = task$1.set;
  var IS_IOS = engineIsIos;
  var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
  var IS_NODE$1 = engineIsNode;

  var MutationObserver =
    global$4.MutationObserver || global$4.WebKitMutationObserver;
  var document$2 = global$4.document;
  var process$1 = global$4.process;
  var Promise$1 = global$4.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor(
    global$4,
    'queueMicrotask'
  );
  var queueMicrotask =
    queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify$1, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (IS_NODE$1 && (parent = process$1.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (error) {
          if (head) notify$1();
          else last = undefined;
          throw error;
        }
      }
      last = undefined;
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (
      !IS_IOS &&
      !IS_NODE$1 &&
      !IS_WEBOS_WEBKIT &&
      MutationObserver &&
      document$2
    ) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify$1 = function () {
        node.data = toggle = !toggle;
      };
      // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      then = promise.then;
      notify$1 = function () {
        then.call(promise, flush);
      };
      // Node.js without promises
    } else if (IS_NODE$1) {
      notify$1 = function () {
        process$1.nextTick(flush);
      };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
    } else {
      notify$1 = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(global$4, flush);
      };
    }
  }

  var microtask$1 =
    queueMicrotask ||
    function (fn) {
      var task = { fn: fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify$1();
      }
      last = task;
    };

  var newPromiseCapability$2 = {};

  var aFunction$1 = aFunction$m;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined)
        throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aFunction$1(resolve);
    this.reject = aFunction$1(reject);
  };

  // 25.4.1.5 NewPromiseCapability(C)
  newPromiseCapability$2.f = function (C) {
    return new PromiseCapability(C);
  };

  var anObject$1 = anObject$I;
  var isObject$1 = isObject$f;
  var newPromiseCapability$1 = newPromiseCapability$2;

  var promiseResolve$1 = function (C, x) {
    anObject$1(C);
    if (isObject$1(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability$1.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var global$3 = global$n;

  var hostReportErrors$1 = function (a, b) {
    var console = global$3.console;
    if (console && console.error) {
      arguments.length === 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform$1 = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var $ = _export;
  var global$2 = global$n;
  var getBuiltIn = getBuiltIn$f;
  var NativePromise = nativePromiseConstructor;
  var redefine = redefine$9.exports;
  var redefineAll = redefineAll$4;
  var setToStringTag = setToStringTag$4;
  var setSpecies = setSpecies$3;
  var isObject = isObject$f;
  var aFunction = aFunction$m;
  var anInstance = anInstance$4;
  var inspectSource = inspectSource$3;
  var iterate = iterate$t;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$2;
  var speciesConstructor = speciesConstructor$b;
  var task = task$1.set;
  var microtask = microtask$1;
  var promiseResolve = promiseResolve$1;
  var hostReportErrors = hostReportErrors$1;
  var newPromiseCapabilityModule = newPromiseCapability$2;
  var perform = perform$1;
  var InternalStateModule = internalState;
  var isForced = isForced_1;
  var wellKnownSymbol = wellKnownSymbol$h;
  var IS_NODE = engineIsNode;
  var V8_VERSION = engineV8Version;

  var SPECIES = wellKnownSymbol('species');
  var PROMISE = 'Promise';
  var getInternalState = InternalStateModule.get;
  var setInternalState = InternalStateModule.set;
  var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
  var PromiseConstructor = NativePromise;
  var TypeError$1 = global$2.TypeError;
  var document$1 = global$2.document;
  var process = global$2.process;
  var $fetch = getBuiltIn('fetch');
  var newPromiseCapability = newPromiseCapabilityModule.f;
  var newGenericPromiseCapability = newPromiseCapability;
  var DISPATCH_EVENT = !!(
    document$1 &&
    document$1.createEvent &&
    global$2.dispatchEvent
  );
  var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;
  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  var FORCED = isForced(PROMISE, function () {
    var GLOBAL_CORE_JS_PROMISE =
      inspectSource(PromiseConstructor) !== String(PromiseConstructor);
    if (!GLOBAL_CORE_JS_PROMISE) {
      // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // We can't detect it synchronously, so just check versions
      if (V8_VERSION === 66) return true;
      // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      if (!IS_NODE && !NATIVE_REJECTION_EVENT) return true;
    }
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor))
      return false;
    // Detect correctness of subclassing with @@species support
    var promise = PromiseConstructor.resolve(1);
    var FakePromise = function (exec) {
      exec(
        function () {
          /* empty */
        },
        function () {
          /* empty */
        }
      );
    };
    var constructor = (promise.constructor = {});
    constructor[SPECIES] = FakePromise;
    return !(
      promise.then(function () {
        /* empty */
      }) instanceof FakePromise
    );
  });

  var INCORRECT_ITERATION =
    FORCED ||
    !checkCorrectnessOfIteration(function (iterable) {
      PromiseConstructor.all(iterable)['catch'](function () {
        /* empty */
      });
    });

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
  };

  var notify = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    var chain = state.reactions;
    microtask(function () {
      var value = state.value;
      var ok = state.state == FULFILLED;
      var index = 0;
      // variable length - can't use forEach
      while (chain.length > index) {
        var reaction = chain[index++];
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (state.rejection === UNHANDLED) onHandleUnhandled(state);
              state.rejection = HANDLED;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // can throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if ((then = isThenable(result))) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (error) {
          if (domain && !exited) domain.exit();
          reject(error);
        }
      }
      state.reactions = [];
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$1.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global$2.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_REJECTION_EVENT && (handler = global$2['on' + name]))
      handler(event);
    else if (name === UNHANDLED_REJECTION)
      hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    task.call(global$2, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (IS_NODE) {
            process.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    task.call(global$2, function () {
      var promise = state.facade;
      if (IS_NODE) {
        process.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value)
        throw TypeError$1("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            then.call(
              value,
              bind(internalResolve, wrapper, state),
              bind(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromiseConstructor, PROMISE);
      aFunction(executor);
      Internal.call(this);
      var state = getInternalState(this);
      try {
        executor(bind(internalResolve, state), bind(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: [],
        rejection: false,
        state: PENDING,
        value: undefined,
      });
    };
    Internal.prototype = redefineAll(PromiseConstructor.prototype, {
      // `Promise.prototype.then` method
      // https://tc39.es/ecma262/#sec-promise.prototype.then
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability(
          speciesConstructor(this, PromiseConstructor)
        );
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = IS_NODE ? process.domain : undefined;
        state.parent = true;
        state.reactions.push(reaction);
        if (state.state != PENDING) notify(state, false);
        return reaction.promise;
      },
      // `Promise.prototype.catch` method
      // https://tc39.es/ecma262/#sec-promise.prototype.catch
      catch: function (onRejected) {
        return this.then(undefined, onRejected);
      },
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalState(promise);
      this.promise = promise;
      this.resolve = bind(internalResolve, state);
      this.reject = bind(internalReject, state);
    };
    newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    if (typeof NativePromise == 'function') {
      nativeThen = NativePromise.prototype.then;

      // wrap native Promise#then for native async functions
      redefine(
        NativePromise.prototype,
        'then',
        function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            nativeThen.call(that, resolve, reject);
          }).then(onFulfilled, onRejected);
          // https://github.com/zloirock/core-js/issues/640
        },
        { unsafe: true }
      );

      // wrap fetch result
      if (typeof $fetch == 'function')
        $(
          { global: true, enumerable: true, forced: true },
          {
            // eslint-disable-next-line no-unused-vars -- required for `.length`
            fetch: function fetch(input /* , init */) {
              return promiseResolve(
                PromiseConstructor,
                $fetch.apply(global$2, arguments)
              );
            },
          }
        );
    }
  }

  $(
    { global: true, wrap: true, forced: FORCED },
    {
      Promise: PromiseConstructor,
    }
  );

  setToStringTag(PromiseConstructor, PROMISE, false);
  setSpecies(PROMISE);

  PromiseWrapper = getBuiltIn(PROMISE);

  // statics
  $(
    { target: PROMISE, stat: true, forced: FORCED },
    {
      // `Promise.reject` method
      // https://tc39.es/ecma262/#sec-promise.reject
      reject: function reject(r) {
        var capability = newPromiseCapability(this);
        capability.reject.call(undefined, r);
        return capability.promise;
      },
    }
  );

  $(
    { target: PROMISE, stat: true, forced: FORCED },
    {
      // `Promise.resolve` method
      // https://tc39.es/ecma262/#sec-promise.resolve
      resolve: function resolve(x) {
        return promiseResolve(this, x);
      },
    }
  );

  $(
    { target: PROMISE, stat: true, forced: INCORRECT_ITERATION },
    {
      // `Promise.all` method
      // https://tc39.es/ecma262/#sec-promise.all
      all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aFunction(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate(iterable, function (promise) {
            var index = counter++;
            var alreadyCalled = false;
            values.push(undefined);
            remaining++;
            $promiseResolve.call(C, promise).then(function (value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (result.error) reject(result.value);
        return capability.promise;
      },
      // `Promise.race` method
      // https://tc39.es/ecma262/#sec-promise.race
      race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapability(C);
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aFunction(C.resolve);
          iterate(iterable, function (promise) {
            $promiseResolve.call(C, promise).then(capability.resolve, reject);
          });
        });
        if (result.error) reject(result.value);
        return capability.promise;
      },
    }
  );

  function timing() {
    var name,
      cb,
      _args = arguments;
    return regenerator.async(
      function timing$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              name =
                _args.length > 0 && _args[0] !== undefined ? _args[0] : 'test';
              cb = _args.length > 1 ? _args[1] : undefined;
              console.time(name);
              _context.t0 = typeof cb === 'function';

              if (!_context.t0) {
                _context.next = 7;
                break;
              }

              _context.next = 7;
              return regenerator.awrap(cb());

            case 7:
              console.timeEnd(name);

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      },
      null,
      null,
      null,
      Promise
    );
  }

  function timeConsuming(cb) {
    var start, end, res;
    return regenerator.async(
      function timeConsuming$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              start = window.performance.now();
              _context2.t0 = typeof cb === 'function';

              if (!_context2.t0) {
                _context2.next = 5;
                break;
              }

              _context2.next = 5;
              return regenerator.awrap(cb());

            case 5:
              end = window.performance.now();
              res = (end - start).toFixed(2);
              console.log('time-consuming: '.concat(res, ' ms'));

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      },
      null,
      null,
      null,
      Promise
    );
  }

  var logger = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    timing: timing,
    timeConsuming: timeConsuming,
  });

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr)))
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return'] != null) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === 'Object' && o.constructor) n = o.constructor.name;
    if (n === 'Map' || n === 'Set') return Array.from(o);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError(
      'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }

  function _slicedToArray(arr, i) {
    return (
      _arrayWithHoles(arr) ||
      _iterableToArrayLimit(arr, i) ||
      _unsupportedIterableToArray(arr, i) ||
      _nonIterableRest()
    );
  }

  var fails = fails$f;

  var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return (
      !!method &&
      fails(function () {
        // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
        method.call(
          null,
          argument ||
            function () {
              throw 1;
            },
          1
        );
      })
    );
  };

  var $forEach = arrayIteration.forEach;
  var arrayMethodIsStrict = arrayMethodIsStrict$1;

  var STRICT_METHOD = arrayMethodIsStrict('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD
    ? function forEach(callbackfn /* , thisArg */) {
        return $forEach(
          this,
          callbackfn,
          arguments.length > 1 ? arguments[1] : undefined
        );
        // eslint-disable-next-line es/no-array-prototype-foreach -- safe
      }
    : [].forEach;

  var global$1 = global$n;
  var DOMIterables = domIterables;
  var forEach = arrayForEach;
  var createNonEnumerableProperty = createNonEnumerableProperty$9;

  for (var COLLECTION_NAME in DOMIterables) {
    var Collection = global$1[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype;
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach)
      try {
        createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
      } catch (error) {
        CollectionPrototype.forEach = forEach;
      }
  }

  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var anObject = anObject$I;
  var toLength = toLength$6;
  var requireObjectCoercible = requireObjectCoercible$6;
  var advanceStringIndex = advanceStringIndex$3;
  var regExpExec = regexpExecAbstract;

  // @@match logic
  fixRegExpWellKnownSymbolLogic(
    'match',
    1,
    function (MATCH, nativeMatch, maybeCallNative) {
      return [
        // `String.prototype.match` method
        // https://tc39.es/ecma262/#sec-string.prototype.match
        function match(regexp) {
          var O = requireObjectCoercible(this);
          var matcher = regexp == undefined ? undefined : regexp[MATCH];
          return matcher !== undefined
            ? matcher.call(regexp, O)
            : new RegExp(regexp)[MATCH](String(O));
        },
        // `RegExp.prototype[@@match]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
        function (regexp) {
          var res = maybeCallNative(nativeMatch, regexp, this);
          if (res.done) return res.value;

          var rx = anObject(regexp);
          var S = String(this);

          if (!rx.global) return regExpExec(rx, S);

          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
          var A = [];
          var n = 0;
          var result;
          while ((result = regExpExec(rx, S)) !== null) {
            var matchStr = String(result[0]);
            A[n] = matchStr;
            if (matchStr === '')
              rx.lastIndex = advanceStringIndex(
                S,
                toLength(rx.lastIndex),
                fullUnicode
              );
            n++;
          }
          return n === 0 ? null : A;
        },
      ];
    }
  );

  function getQueryParameters(url) {
    var paramStr = decodeURIComponent(url).split('?')[1];

    if (!paramStr) {
      return {};
    }

    var paramArr = paramStr.split('&');
    var res = {};
    paramArr.forEach((param) => {
      var _param$split = param.split('='),
        _param$split2 = _slicedToArray(_param$split, 2),
        key = _param$split2[0],
        value = _param$split2[1];

      res[key] = value;
    });
    return res;
  }
  /**
   *
   * @param {string} url
   * @returns {object}
   */

  function getQueryParametersByRegExp(url) {
    var parameters = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      parameters[key] = value;
    });
    return parameters;
  }
  /**
   * @external  https://www.regex-tutorial.com/urlParameter.html
   * @param {string} url
   * @param {string} name
   * @returns {string}
   */

  function getQueryParameterByRegExp(url, name) {
    var reg = new RegExp('[?&]' + name + '=([^&]+).*$');
    var res = url.match(reg);
    return res === null ? '' : decodeURIComponent(res[1].replace(/\+/g, ' '));
  }

  var url = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getQueryParameterByRegExp: getQueryParameterByRegExp,
    getQueryParametersByRegExp: getQueryParametersByRegExp,
    getQueryParameters: getQueryParameters,
  });

  /**
   *
   * @returns {string}
   */

  function getVersion() {
    return version$1;
  }

  exports.cookies = cookies;
  exports.element = element;
  exports.generator = generator;
  exports.getVersion = getVersion;
  exports.judge = judge;
  exports.logger = logger;
  exports.url = url;

  Object.defineProperty(exports, '__esModule', { value: true });
});
//# sourceMappingURL=ataola-utils.umd.js.map
