require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2011-06-15
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

(function (view) {

"use strict";

var
      classListProp = "classList"
    , protoProp = "prototype"
    , elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
    , objCtr = Object
    , strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
    }
    , arrIndexOf = Array[protoProp].indexOf || function (item) {
        var
              i = 0
            , len = this.length
        ;
        for (; i < len; i++) {
            if (i in this && this[i] === item) {
                return i;
            }
        }
        return -1;
    }
    // Vendors: please allow content code to instantiate DOMExceptions
    , DOMEx = function (type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
    }
    , checkTokenAndGetIndex = function (classList, token) {
        if (token === "") {
            throw new DOMEx(
                  "SYNTAX_ERR"
                , "An invalid or illegal string was specified"
            );
        }
        if (/\s/.test(token)) {
            throw new DOMEx(
                  "INVALID_CHARACTER_ERR"
                , "String contains an invalid character"
            );
        }
        return arrIndexOf.call(classList, token);
    }
    , ClassList = function (elem) {
        var
              trimmedClasses = strTrim.call(elem.className)
            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
            , i = 0
            , len = classes.length
        ;
        for (; i < len; i++) {
            this.push(classes[i]);
        }
        this._updateClassName = function () {
            elem.className = this.toString();
        };
    }
    , classListProto = ClassList[protoProp] = []
    , classListGetter = function () {
        return new ClassList(this);
    }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
    return this[i] || null;
};
classListProto.contains = function (token) {
    token += "";
    return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function (token) {
    token += "";
    if (checkTokenAndGetIndex(this, token) === -1) {
        this.push(token);
        this._updateClassName();
    }
};
classListProto.remove = function (token) {
    token += "";
    var index = checkTokenAndGetIndex(this, token);
    if (index !== -1) {
        this.splice(index, 1);
        this._updateClassName();
    }
};
classListProto.toggle = function (token) {
    token += "";
    if (checkTokenAndGetIndex(this, token) === -1) {
        this.add(token);
    } else {
        this.remove(token);
    }
};
classListProto.toString = function () {
    return this.join(" ");
};

if (objCtr.defineProperty) {
    var classListPropDesc = {
          get: classListGetter
        , enumerable: true
        , configurable: true
    };
    try {
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    } catch (ex) { // IE 8 doesn't support enumerable:true
        if (ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        }
    }
} else if (objCtr[protoProp].__defineGetter__) {
    elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

}

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous-polyfills\\classList.js","/..\\node_modules\\famous-polyfills")
},{"VCmEsw":43,"buffer":40}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                ? this
                : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous-polyfills\\functionPrototypeBind.js","/..\\node_modules\\famous-polyfills")
},{"VCmEsw":43,"buffer":40}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
require('./classList.js');
require('./functionPrototypeBind.js');
require('./requestAnimationFrame.js');
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous-polyfills\\index.js","/..\\node_modules\\famous-polyfills")
},{"./classList.js":1,"./functionPrototypeBind.js":2,"./requestAnimationFrame.js":4,"VCmEsw":43,"buffer":40}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// adds requestAnimationFrame functionality
// Source: http://strd6.com/2011/05/better-window-requestanimationframe-shim/

window.requestAnimationFrame || (window.requestAnimationFrame =
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback, element) {
    return window.setTimeout(function() {
      callback(+new Date());
  }, 1000 / 60);
});

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous-polyfills\\requestAnimationFrame.js","/..\\node_modules\\famous-polyfills")
},{"VCmEsw":43,"buffer":40}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var RenderNode = require('./RenderNode');
var EventHandler = require('./EventHandler');
var ElementAllocator = require('./ElementAllocator');
var Transform = require('./Transform');
var Transitionable = require('../transitions/Transitionable');
var _zeroZero = [
    0,
    0
];
var usePrefix = !('perspective' in document.documentElement.style);
function _getElementSize() {
    var element = this.container;
    return [
        element.clientWidth,
        element.clientHeight
    ];
}
var _setPerspective = usePrefix ? function (element, perspective) {
    element.style.webkitPerspective = perspective ? perspective.toFixed() + 'px' : '';
} : function (element, perspective) {
    element.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
};
function Context(container) {
    this.container = container;
    this._allocator = new ElementAllocator(container);
    this._node = new RenderNode();
    this._eventOutput = new EventHandler();
    this._size = _getElementSize.call(this);
    this._perspectiveState = new Transitionable(0);
    this._perspective = undefined;
    this._nodeContext = {
        allocator: this._allocator,
        transform: Transform.identity,
        opacity: 1,
        origin: _zeroZero,
        align: _zeroZero,
        size: this._size
    };
    this._eventOutput.on('resize', function () {
        this.setSize(_getElementSize.call(this));
    }.bind(this));
}
Context.prototype.getAllocator = function getAllocator() {
    return this._allocator;
};
Context.prototype.add = function add(obj) {
    return this._node.add(obj);
};
Context.prototype.migrate = function migrate(container) {
    if (container === this.container)
        return;
    this.container = container;
    this._allocator.migrate(container);
};
Context.prototype.getSize = function getSize() {
    return this._size;
};
Context.prototype.setSize = function setSize(size) {
    if (!size)
        size = _getElementSize.call(this);
    this._size[0] = size[0];
    this._size[1] = size[1];
};
Context.prototype.update = function update(contextParameters) {
    if (contextParameters) {
        if (contextParameters.transform)
            this._nodeContext.transform = contextParameters.transform;
        if (contextParameters.opacity)
            this._nodeContext.opacity = contextParameters.opacity;
        if (contextParameters.origin)
            this._nodeContext.origin = contextParameters.origin;
        if (contextParameters.align)
            this._nodeContext.align = contextParameters.align;
        if (contextParameters.size)
            this._nodeContext.size = contextParameters.size;
    }
    var perspective = this._perspectiveState.get();
    if (perspective !== this._perspective) {
        _setPerspective(this.container, perspective);
        this._perspective = perspective;
    }
    this._node.commit(this._nodeContext);
};
Context.prototype.getPerspective = function getPerspective() {
    return this._perspectiveState.get();
};
Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {
    return this._perspectiveState.set(perspective, transition, callback);
};
Context.prototype.emit = function emit(type, event) {
    return this._eventOutput.emit(type, event);
};
Context.prototype.on = function on(type, handler) {
    return this._eventOutput.on(type, handler);
};
Context.prototype.removeListener = function removeListener(type, handler) {
    return this._eventOutput.removeListener(type, handler);
};
Context.prototype.pipe = function pipe(target) {
    return this._eventOutput.pipe(target);
};
Context.prototype.unpipe = function unpipe(target) {
    return this._eventOutput.unpipe(target);
};
module.exports = Context;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\Context.js","/..\\node_modules\\famous\\core")
},{"../transitions/Transitionable":35,"./ElementAllocator":6,"./EventHandler":11,"./RenderNode":15,"./Transform":18,"VCmEsw":43,"buffer":40}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
function ElementAllocator(container) {
    if (!container)
        container = document.createDocumentFragment();
    this.container = container;
    this.detachedNodes = {};
    this.nodeCount = 0;
}
ElementAllocator.prototype.migrate = function migrate(container) {
    var oldContainer = this.container;
    if (container === oldContainer)
        return;
    if (oldContainer instanceof DocumentFragment) {
        container.appendChild(oldContainer);
    } else {
        while (oldContainer.hasChildNodes()) {
            container.appendChild(oldContainer.firstChild);
        }
    }
    this.container = container;
};
ElementAllocator.prototype.allocate = function allocate(type) {
    type = type.toLowerCase();
    if (!(type in this.detachedNodes))
        this.detachedNodes[type] = [];
    var nodeStore = this.detachedNodes[type];
    var result;
    if (nodeStore.length > 0) {
        result = nodeStore.pop();
    } else {
        result = document.createElement(type);
        this.container.appendChild(result);
    }
    this.nodeCount++;
    return result;
};
ElementAllocator.prototype.deallocate = function deallocate(element) {
    var nodeType = element.nodeName.toLowerCase();
    var nodeStore = this.detachedNodes[nodeType];
    nodeStore.push(element);
    this.nodeCount--;
};
ElementAllocator.prototype.getNodeCount = function getNodeCount() {
    return this.nodeCount;
};
module.exports = ElementAllocator;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\ElementAllocator.js","/..\\node_modules\\famous\\core")
},{"VCmEsw":43,"buffer":40}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Entity = require('./Entity');
var EventHandler = require('./EventHandler');
var Transform = require('./Transform');
var usePrefix = !('transform' in document.documentElement.style);
var devicePixelRatio = window.devicePixelRatio || 1;
function ElementOutput(element) {
    this._matrix = null;
    this._opacity = 1;
    this._origin = null;
    this._size = null;
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    this.eventForwarder = function eventForwarder(event) {
        this._eventOutput.emit(event.type, event);
    }.bind(this);
    this.id = Entity.register(this);
    this._element = null;
    this._sizeDirty = false;
    this._originDirty = false;
    this._transformDirty = false;
    this._invisible = false;
    if (element)
        this.attach(element);
}
ElementOutput.prototype.on = function on(type, fn) {
    if (this._element)
        this._element.addEventListener(type, this.eventForwarder);
    this._eventOutput.on(type, fn);
};
ElementOutput.prototype.removeListener = function removeListener(type, fn) {
    this._eventOutput.removeListener(type, fn);
};
ElementOutput.prototype.emit = function emit(type, event) {
    if (event && !event.origin)
        event.origin = this;
    var handled = this._eventOutput.emit(type, event);
    if (handled && event && event.stopPropagation)
        event.stopPropagation();
    return handled;
};
ElementOutput.prototype.pipe = function pipe(target) {
    return this._eventOutput.pipe(target);
};
ElementOutput.prototype.unpipe = function unpipe(target) {
    return this._eventOutput.unpipe(target);
};
ElementOutput.prototype.render = function render() {
    return this.id;
};
function _addEventListeners(target) {
    for (var i in this._eventOutput.listeners) {
        target.addEventListener(i, this.eventForwarder);
    }
}
function _removeEventListeners(target) {
    for (var i in this._eventOutput.listeners) {
        target.removeEventListener(i, this.eventForwarder);
    }
}
function _formatCSSTransform(m) {
    m[12] = Math.round(m[12] * devicePixelRatio) / devicePixelRatio;
    m[13] = Math.round(m[13] * devicePixelRatio) / devicePixelRatio;
    var result = 'matrix3d(';
    for (var i = 0; i < 15; i++) {
        result += m[i] < 0.000001 && m[i] > -0.000001 ? '0,' : m[i] + ',';
    }
    result += m[15] + ')';
    return result;
}
var _setMatrix;
if (usePrefix) {
    _setMatrix = function (element, matrix) {
        element.style.webkitTransform = _formatCSSTransform(matrix);
    };
} else {
    _setMatrix = function (element, matrix) {
        element.style.transform = _formatCSSTransform(matrix);
    };
}
function _formatCSSOrigin(origin) {
    return 100 * origin[0] + '% ' + 100 * origin[1] + '%';
}
var _setOrigin = usePrefix ? function (element, origin) {
    element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
} : function (element, origin) {
    element.style.transformOrigin = _formatCSSOrigin(origin);
};
var _setInvisible = usePrefix ? function (element) {
    element.style.webkitTransform = 'scale3d(0.0001,0.0001,0.0001)';
    element.style.opacity = 0;
} : function (element) {
    element.style.transform = 'scale3d(0.0001,0.0001,0.0001)';
    element.style.opacity = 0;
};
function _xyNotEquals(a, b) {
    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
}
ElementOutput.prototype.commit = function commit(context) {
    var target = this._element;
    if (!target)
        return;
    var matrix = context.transform;
    var opacity = context.opacity;
    var origin = context.origin;
    var size = context.size;
    if (!matrix && this._matrix) {
        this._matrix = null;
        this._opacity = 0;
        _setInvisible(target);
        return;
    }
    if (_xyNotEquals(this._origin, origin))
        this._originDirty = true;
    if (Transform.notEquals(this._matrix, matrix))
        this._transformDirty = true;
    if (this._invisible) {
        this._invisible = false;
        this._element.style.display = '';
    }
    if (this._opacity !== opacity) {
        this._opacity = opacity;
        target.style.opacity = opacity >= 1 ? '0.999999' : opacity;
    }
    if (this._transformDirty || this._originDirty || this._sizeDirty) {
        if (this._sizeDirty)
            this._sizeDirty = false;
        if (this._originDirty) {
            if (origin) {
                if (!this._origin)
                    this._origin = [
                        0,
                        0
                    ];
                this._origin[0] = origin[0];
                this._origin[1] = origin[1];
            } else
                this._origin = null;
            _setOrigin(target, this._origin);
            this._originDirty = false;
        }
        if (!matrix)
            matrix = Transform.identity;
        this._matrix = matrix;
        var aaMatrix = this._size ? Transform.thenMove(matrix, [
            -this._size[0] * origin[0],
            -this._size[1] * origin[1],
            0
        ]) : matrix;
        _setMatrix(target, aaMatrix);
        this._transformDirty = false;
    }
};
ElementOutput.prototype.cleanup = function cleanup() {
    if (this._element) {
        this._invisible = true;
        this._element.style.display = 'none';
    }
};
ElementOutput.prototype.attach = function attach(target) {
    this._element = target;
    _addEventListeners.call(this, target);
};
ElementOutput.prototype.detach = function detach() {
    var target = this._element;
    if (target) {
        _removeEventListeners.call(this, target);
        if (this._invisible) {
            this._invisible = false;
            this._element.style.display = '';
        }
    }
    this._element = null;
    return target;
};
module.exports = ElementOutput;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\ElementOutput.js","/..\\node_modules\\famous\\core")
},{"./Entity":9,"./EventHandler":11,"./Transform":18,"VCmEsw":43,"buffer":40}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Context = require('./Context');
var EventHandler = require('./EventHandler');
var OptionsManager = require('./OptionsManager');
var Engine = {};
var contexts = [];
var nextTickQueue = [];
var currentFrame = 0;
var nextTickFrame = 0;
var deferQueue = [];
var lastTime = Date.now();
var frameTime;
var frameTimeLimit;
var loopEnabled = true;
var eventForwarders = {};
var eventHandler = new EventHandler();
var options = {
    containerType: 'div',
    containerClass: 'famous-container',
    fpsCap: undefined,
    runLoop: true,
    appMode: true
};
var optionsManager = new OptionsManager(options);
var MAX_DEFER_FRAME_TIME = 10;
Engine.step = function step() {
    currentFrame++;
    nextTickFrame = currentFrame;
    var currentTime = Date.now();
    if (frameTimeLimit && currentTime - lastTime < frameTimeLimit)
        return;
    var i = 0;
    frameTime = currentTime - lastTime;
    lastTime = currentTime;
    eventHandler.emit('prerender');
    var numFunctions = nextTickQueue.length;
    while (numFunctions--)
        nextTickQueue.shift()(currentFrame);
    while (deferQueue.length && Date.now() - currentTime < MAX_DEFER_FRAME_TIME) {
        deferQueue.shift().call(this);
    }
    for (i = 0; i < contexts.length; i++)
        contexts[i].update();
    eventHandler.emit('postrender');
};
function loop() {
    if (options.runLoop) {
        Engine.step();
        window.requestAnimationFrame(loop);
    } else
        loopEnabled = false;
}
window.requestAnimationFrame(loop);
function handleResize(event) {
    for (var i = 0; i < contexts.length; i++) {
        contexts[i].emit('resize');
    }
    eventHandler.emit('resize');
}
window.addEventListener('resize', handleResize, false);
handleResize();
function initialize() {
    window.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, true);
    addRootClasses();
}
var initialized = false;
function addRootClasses() {
    if (!document.body) {
        Engine.nextTick(addRootClasses);
        return;
    }
    document.body.classList.add('famous-root');
    document.documentElement.classList.add('famous-root');
}
Engine.pipe = function pipe(target) {
    if (target.subscribe instanceof Function)
        return target.subscribe(Engine);
    else
        return eventHandler.pipe(target);
};
Engine.unpipe = function unpipe(target) {
    if (target.unsubscribe instanceof Function)
        return target.unsubscribe(Engine);
    else
        return eventHandler.unpipe(target);
};
Engine.on = function on(type, handler) {
    if (!(type in eventForwarders)) {
        eventForwarders[type] = eventHandler.emit.bind(eventHandler, type);
        addEngineListener(type, eventForwarders[type]);
    }
    return eventHandler.on(type, handler);
};
function addEngineListener(type, forwarder) {
    if (!document.body) {
        Engine.nextTick(addEventListener.bind(this, type, forwarder));
        return;
    }
    document.body.addEventListener(type, forwarder);
}
Engine.emit = function emit(type, event) {
    return eventHandler.emit(type, event);
};
Engine.removeListener = function removeListener(type, handler) {
    return eventHandler.removeListener(type, handler);
};
Engine.getFPS = function getFPS() {
    return 1000 / frameTime;
};
Engine.setFPSCap = function setFPSCap(fps) {
    frameTimeLimit = Math.floor(1000 / fps);
};
Engine.getOptions = function getOptions(key) {
    return optionsManager.getOptions(key);
};
Engine.setOptions = function setOptions(options) {
    return optionsManager.setOptions.apply(optionsManager, arguments);
};
Engine.createContext = function createContext(el) {
    if (!initialized && options.appMode)
        Engine.nextTick(initialize);
    var needMountContainer = false;
    if (!el) {
        el = document.createElement(options.containerType);
        el.classList.add(options.containerClass);
        needMountContainer = true;
    }
    var context = new Context(el);
    Engine.registerContext(context);
    if (needMountContainer)
        mount(context, el);
    return context;
};
function mount(context, el) {
    if (!document.body) {
        Engine.nextTick(mount.bind(this, context, el));
        return;
    }
    document.body.appendChild(el);
    context.emit('resize');
}
Engine.registerContext = function registerContext(context) {
    contexts.push(context);
    return context;
};
Engine.getContexts = function getContexts() {
    return contexts;
};
Engine.deregisterContext = function deregisterContext(context) {
    var i = contexts.indexOf(context);
    if (i >= 0)
        contexts.splice(i, 1);
};
Engine.nextTick = function nextTick(fn) {
    nextTickQueue.push(fn);
};
Engine.defer = function defer(fn) {
    deferQueue.push(fn);
};
optionsManager.on('change', function (data) {
    if (data.id === 'fpsCap')
        Engine.setFPSCap(data.value);
    else if (data.id === 'runLoop') {
        if (!loopEnabled && data.value) {
            loopEnabled = true;
            window.requestAnimationFrame(loop);
        }
    }
});
module.exports = Engine;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\Engine.js","/..\\node_modules\\famous\\core")
},{"./Context":5,"./EventHandler":11,"./OptionsManager":14,"VCmEsw":43,"buffer":40}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var entities = [];
function get(id) {
    return entities[id];
}
function set(id, entity) {
    entities[id] = entity;
}
function register(entity) {
    var id = entities.length;
    set(id, entity);
    return id;
}
function unregister(id) {
    set(id, null);
}
module.exports = {
    register: register,
    unregister: unregister,
    get: get,
    set: set
};
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\Entity.js","/..\\node_modules\\famous\\core")
},{"VCmEsw":43,"buffer":40}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
function EventEmitter() {
    this.listeners = {};
    this._owner = this;
}
EventEmitter.prototype.emit = function emit(type, event) {
    var handlers = this.listeners[type];
    if (handlers) {
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].call(this._owner, event);
        }
    }
    return this;
};
EventEmitter.prototype.on = function on(type, handler) {
    if (!(type in this.listeners))
        this.listeners[type] = [];
    var index = this.listeners[type].indexOf(handler);
    if (index < 0)
        this.listeners[type].push(handler);
    return this;
};
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
EventEmitter.prototype.removeListener = function removeListener(type, handler) {
    var listener = this.listeners[type];
    if (listener !== undefined) {
        var index = listener.indexOf(handler);
        if (index >= 0)
            listener.splice(index, 1);
    }
    return this;
};
EventEmitter.prototype.bindThis = function bindThis(owner) {
    this._owner = owner;
};
module.exports = EventEmitter;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\EventEmitter.js","/..\\node_modules\\famous\\core")
},{"VCmEsw":43,"buffer":40}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var EventEmitter = require('./EventEmitter');
function EventHandler() {
    EventEmitter.apply(this, arguments);
    this.downstream = [];
    this.downstreamFn = [];
    this.upstream = [];
    this.upstreamListeners = {};
}
EventHandler.prototype = Object.create(EventEmitter.prototype);
EventHandler.prototype.constructor = EventHandler;
EventHandler.setInputHandler = function setInputHandler(object, handler) {
    object.trigger = handler.trigger.bind(handler);
    if (handler.subscribe && handler.unsubscribe) {
        object.subscribe = handler.subscribe.bind(handler);
        object.unsubscribe = handler.unsubscribe.bind(handler);
    }
};
EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
    if (handler instanceof EventHandler)
        handler.bindThis(object);
    object.pipe = handler.pipe.bind(handler);
    object.unpipe = handler.unpipe.bind(handler);
    object.on = handler.on.bind(handler);
    object.addListener = object.on;
    object.removeListener = handler.removeListener.bind(handler);
};
EventHandler.prototype.emit = function emit(type, event) {
    EventEmitter.prototype.emit.apply(this, arguments);
    var i = 0;
    for (i = 0; i < this.downstream.length; i++) {
        if (this.downstream[i].trigger)
            this.downstream[i].trigger(type, event);
    }
    for (i = 0; i < this.downstreamFn.length; i++) {
        this.downstreamFn[i](type, event);
    }
    return this;
};
EventHandler.prototype.trigger = EventHandler.prototype.emit;
EventHandler.prototype.pipe = function pipe(target) {
    if (target.subscribe instanceof Function)
        return target.subscribe(this);
    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
    var index = downstreamCtx.indexOf(target);
    if (index < 0)
        downstreamCtx.push(target);
    if (target instanceof Function)
        target('pipe', null);
    else if (target.trigger)
        target.trigger('pipe', null);
    return target;
};
EventHandler.prototype.unpipe = function unpipe(target) {
    if (target.unsubscribe instanceof Function)
        return target.unsubscribe(this);
    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
    var index = downstreamCtx.indexOf(target);
    if (index >= 0) {
        downstreamCtx.splice(index, 1);
        if (target instanceof Function)
            target('unpipe', null);
        else if (target.trigger)
            target.trigger('unpipe', null);
        return target;
    } else
        return false;
};
EventHandler.prototype.on = function on(type, handler) {
    EventEmitter.prototype.on.apply(this, arguments);
    if (!(type in this.upstreamListeners)) {
        var upstreamListener = this.trigger.bind(this, type);
        this.upstreamListeners[type] = upstreamListener;
        for (var i = 0; i < this.upstream.length; i++) {
            this.upstream[i].on(type, upstreamListener);
        }
    }
    return this;
};
EventHandler.prototype.addListener = EventHandler.prototype.on;
EventHandler.prototype.subscribe = function subscribe(source) {
    var index = this.upstream.indexOf(source);
    if (index < 0) {
        this.upstream.push(source);
        for (var type in this.upstreamListeners) {
            source.on(type, this.upstreamListeners[type]);
        }
    }
    return this;
};
EventHandler.prototype.unsubscribe = function unsubscribe(source) {
    var index = this.upstream.indexOf(source);
    if (index >= 0) {
        this.upstream.splice(index, 1);
        for (var type in this.upstreamListeners) {
            source.removeListener(type, this.upstreamListeners[type]);
        }
    }
    return this;
};
module.exports = EventHandler;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\EventHandler.js","/..\\node_modules\\famous\\core")
},{"./EventEmitter":10,"VCmEsw":43,"buffer":40}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Context = require('./Context');
var Transform = require('./Transform');
var Surface = require('./Surface');
function Group(options) {
    Surface.call(this, options);
    this._shouldRecalculateSize = false;
    this._container = document.createDocumentFragment();
    this.context = new Context(this._container);
    this.setContent(this._container);
    this._groupSize = [
        undefined,
        undefined
    ];
}
Group.SIZE_ZERO = [
    0,
    0
];
Group.prototype = Object.create(Surface.prototype);
Group.prototype.elementType = 'div';
Group.prototype.elementClass = 'famous-group';
Group.prototype.add = function add() {
    return this.context.add.apply(this.context, arguments);
};
Group.prototype.render = function render() {
    return Surface.prototype.render.call(this);
};
Group.prototype.deploy = function deploy(target) {
    this.context.migrate(target);
};
Group.prototype.recall = function recall(target) {
    this._container = document.createDocumentFragment();
    this.context.migrate(this._container);
};
Group.prototype.commit = function commit(context) {
    var transform = context.transform;
    var origin = context.origin;
    var opacity = context.opacity;
    var size = context.size;
    var result = Surface.prototype.commit.call(this, {
        allocator: context.allocator,
        transform: Transform.thenMove(transform, [
            -origin[0] * size[0],
            -origin[1] * size[1],
            0
        ]),
        opacity: opacity,
        origin: origin,
        size: Group.SIZE_ZERO
    });
    if (size[0] !== this._groupSize[0] || size[1] !== this._groupSize[1]) {
        this._groupSize[0] = size[0];
        this._groupSize[1] = size[1];
        this.context.setSize(size);
    }
    this.context.update({
        transform: Transform.translate(-origin[0] * size[0], -origin[1] * size[1], 0),
        origin: origin,
        size: size
    });
    return result;
};
module.exports = Group;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\Group.js","/..\\node_modules\\famous\\core")
},{"./Context":5,"./Surface":17,"./Transform":18,"VCmEsw":43,"buffer":40}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Transform = require('./Transform');
var Transitionable = require('../transitions/Transitionable');
var TransitionableTransform = require('../transitions/TransitionableTransform');
function Modifier(options) {
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;
    this._proportionGetter = null;
    this._legacyStates = {};
    this._output = {
        transform: Transform.identity,
        opacity: 1,
        origin: null,
        align: null,
        size: null,
        proportions: null,
        target: null
    };
    if (options) {
        if (options.transform)
            this.transformFrom(options.transform);
        if (options.opacity !== undefined)
            this.opacityFrom(options.opacity);
        if (options.origin)
            this.originFrom(options.origin);
        if (options.align)
            this.alignFrom(options.align);
        if (options.size)
            this.sizeFrom(options.size);
        if (options.proportions)
            this.proportionsFrom(options.proportions);
    }
}
Modifier.prototype.transformFrom = function transformFrom(transform) {
    if (transform instanceof Function)
        this._transformGetter = transform;
    else if (transform instanceof Object && transform.get)
        this._transformGetter = transform.get.bind(transform);
    else {
        this._transformGetter = null;
        this._output.transform = transform;
    }
    return this;
};
Modifier.prototype.opacityFrom = function opacityFrom(opacity) {
    if (opacity instanceof Function)
        this._opacityGetter = opacity;
    else if (opacity instanceof Object && opacity.get)
        this._opacityGetter = opacity.get.bind(opacity);
    else {
        this._opacityGetter = null;
        this._output.opacity = opacity;
    }
    return this;
};
Modifier.prototype.originFrom = function originFrom(origin) {
    if (origin instanceof Function)
        this._originGetter = origin;
    else if (origin instanceof Object && origin.get)
        this._originGetter = origin.get.bind(origin);
    else {
        this._originGetter = null;
        this._output.origin = origin;
    }
    return this;
};
Modifier.prototype.alignFrom = function alignFrom(align) {
    if (align instanceof Function)
        this._alignGetter = align;
    else if (align instanceof Object && align.get)
        this._alignGetter = align.get.bind(align);
    else {
        this._alignGetter = null;
        this._output.align = align;
    }
    return this;
};
Modifier.prototype.sizeFrom = function sizeFrom(size) {
    if (size instanceof Function)
        this._sizeGetter = size;
    else if (size instanceof Object && size.get)
        this._sizeGetter = size.get.bind(size);
    else {
        this._sizeGetter = null;
        this._output.size = size;
    }
    return this;
};
Modifier.prototype.proportionsFrom = function proportionsFrom(proportions) {
    if (proportions instanceof Function)
        this._proportionGetter = proportions;
    else if (proportions instanceof Object && proportions.get)
        this._proportionGetter = proportions.get.bind(proportions);
    else {
        this._proportionGetter = null;
        this._output.proportions = proportions;
    }
    return this;
};
Modifier.prototype.setTransform = function setTransform(transform, transition, callback) {
    if (transition || this._legacyStates.transform) {
        if (!this._legacyStates.transform) {
            this._legacyStates.transform = new TransitionableTransform(this._output.transform);
        }
        if (!this._transformGetter)
            this.transformFrom(this._legacyStates.transform);
        this._legacyStates.transform.set(transform, transition, callback);
        return this;
    } else
        return this.transformFrom(transform);
};
Modifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
    if (transition || this._legacyStates.opacity) {
        if (!this._legacyStates.opacity) {
            this._legacyStates.opacity = new Transitionable(this._output.opacity);
        }
        if (!this._opacityGetter)
            this.opacityFrom(this._legacyStates.opacity);
        return this._legacyStates.opacity.set(opacity, transition, callback);
    } else
        return this.opacityFrom(opacity);
};
Modifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
    if (transition || this._legacyStates.origin) {
        if (!this._legacyStates.origin) {
            this._legacyStates.origin = new Transitionable(this._output.origin || [
                0,
                0
            ]);
        }
        if (!this._originGetter)
            this.originFrom(this._legacyStates.origin);
        this._legacyStates.origin.set(origin, transition, callback);
        return this;
    } else
        return this.originFrom(origin);
};
Modifier.prototype.setAlign = function setAlign(align, transition, callback) {
    if (transition || this._legacyStates.align) {
        if (!this._legacyStates.align) {
            this._legacyStates.align = new Transitionable(this._output.align || [
                0,
                0
            ]);
        }
        if (!this._alignGetter)
            this.alignFrom(this._legacyStates.align);
        this._legacyStates.align.set(align, transition, callback);
        return this;
    } else
        return this.alignFrom(align);
};
Modifier.prototype.setSize = function setSize(size, transition, callback) {
    if (size && (transition || this._legacyStates.size)) {
        if (!this._legacyStates.size) {
            this._legacyStates.size = new Transitionable(this._output.size || [
                0,
                0
            ]);
        }
        if (!this._sizeGetter)
            this.sizeFrom(this._legacyStates.size);
        this._legacyStates.size.set(size, transition, callback);
        return this;
    } else
        return this.sizeFrom(size);
};
Modifier.prototype.setProportions = function setProportions(proportions, transition, callback) {
    if (proportions && (transition || this._legacyStates.proportions)) {
        if (!this._legacyStates.proportions) {
            this._legacyStates.proportions = new Transitionable(this._output.proportions || [
                0,
                0
            ]);
        }
        if (!this._proportionGetter)
            this.proportionsFrom(this._legacyStates.proportions);
        this._legacyStates.proportions.set(proportions, transition, callback);
        return this;
    } else
        return this.proportionsFrom(proportions);
};
Modifier.prototype.halt = function halt() {
    if (this._legacyStates.transform)
        this._legacyStates.transform.halt();
    if (this._legacyStates.opacity)
        this._legacyStates.opacity.halt();
    if (this._legacyStates.origin)
        this._legacyStates.origin.halt();
    if (this._legacyStates.align)
        this._legacyStates.align.halt();
    if (this._legacyStates.size)
        this._legacyStates.size.halt();
    if (this._legacyStates.proportions)
        this._legacyStates.proportions.halt();
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;
    this._proportionGetter = null;
};
Modifier.prototype.getTransform = function getTransform() {
    return this._transformGetter();
};
Modifier.prototype.getFinalTransform = function getFinalTransform() {
    return this._legacyStates.transform ? this._legacyStates.transform.getFinal() : this._output.transform;
};
Modifier.prototype.getOpacity = function getOpacity() {
    return this._opacityGetter();
};
Modifier.prototype.getOrigin = function getOrigin() {
    return this._originGetter();
};
Modifier.prototype.getAlign = function getAlign() {
    return this._alignGetter();
};
Modifier.prototype.getSize = function getSize() {
    return this._sizeGetter ? this._sizeGetter() : this._output.size;
};
Modifier.prototype.getProportions = function getProportions() {
    return this._proportionGetter ? this._proportionGetter() : this._output.proportions;
};
function _update() {
    if (this._transformGetter)
        this._output.transform = this._transformGetter();
    if (this._opacityGetter)
        this._output.opacity = this._opacityGetter();
    if (this._originGetter)
        this._output.origin = this._originGetter();
    if (this._alignGetter)
        this._output.align = this._alignGetter();
    if (this._sizeGetter)
        this._output.size = this._sizeGetter();
    if (this._proportionGetter)
        this._output.proportions = this._proportionGetter();
}
Modifier.prototype.modify = function modify(target) {
    _update.call(this);
    this._output.target = target;
    return this._output;
};
module.exports = Modifier;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\Modifier.js","/..\\node_modules\\famous\\core")
},{"../transitions/Transitionable":35,"../transitions/TransitionableTransform":36,"./Transform":18,"VCmEsw":43,"buffer":40}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var EventHandler = require('./EventHandler');
function OptionsManager(value) {
    this._value = value;
    this.eventOutput = null;
}
OptionsManager.patch = function patchObject(source, data) {
    var manager = new OptionsManager(source);
    for (var i = 1; i < arguments.length; i++)
        manager.patch(arguments[i]);
    return source;
};
function _createEventOutput() {
    this.eventOutput = new EventHandler();
    this.eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this.eventOutput);
}
OptionsManager.prototype.patch = function patch() {
    var myState = this._value;
    for (var i = 0; i < arguments.length; i++) {
        var data = arguments[i];
        for (var k in data) {
            if (k in myState && (data[k] && data[k].constructor === Object) && (myState[k] && myState[k].constructor === Object)) {
                if (!myState.hasOwnProperty(k))
                    myState[k] = Object.create(myState[k]);
                this.key(k).patch(data[k]);
                if (this.eventOutput)
                    this.eventOutput.emit('change', {
                        id: k,
                        value: this.key(k).value()
                    });
            } else
                this.set(k, data[k]);
        }
    }
    return this;
};
OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;
OptionsManager.prototype.key = function key(identifier) {
    var result = new OptionsManager(this._value[identifier]);
    if (!(result._value instanceof Object) || result._value instanceof Array)
        result._value = {};
    return result;
};
OptionsManager.prototype.get = function get(key) {
    return key ? this._value[key] : this._value;
};
OptionsManager.prototype.getOptions = OptionsManager.prototype.get;
OptionsManager.prototype.set = function set(key, value) {
    var originalValue = this.get(key);
    this._value[key] = value;
    if (this.eventOutput && value !== originalValue)
        this.eventOutput.emit('change', {
            id: key,
            value: value
        });
    return this;
};
OptionsManager.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
OptionsManager.prototype.removeListener = function removeListener() {
    _createEventOutput.call(this);
    return this.removeListener.apply(this, arguments);
};
OptionsManager.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
OptionsManager.prototype.unpipe = function unpipe() {
    _createEventOutput.call(this);
    return this.unpipe.apply(this, arguments);
};
module.exports = OptionsManager;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\OptionsManager.js","/..\\node_modules\\famous\\core")
},{"./EventHandler":11,"VCmEsw":43,"buffer":40}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Entity = require('./Entity');
var SpecParser = require('./SpecParser');
function RenderNode(object) {
    this._object = null;
    this._child = null;
    this._hasMultipleChildren = false;
    this._isRenderable = false;
    this._isModifier = false;
    this._resultCache = {};
    this._prevResults = {};
    this._childResult = null;
    if (object)
        this.set(object);
}
RenderNode.prototype.add = function add(child) {
    var childNode = child instanceof RenderNode ? child : new RenderNode(child);
    if (this._child instanceof Array)
        this._child.push(childNode);
    else if (this._child) {
        this._child = [
            this._child,
            childNode
        ];
        this._hasMultipleChildren = true;
        this._childResult = [];
    } else
        this._child = childNode;
    return childNode;
};
RenderNode.prototype.get = function get() {
    return this._object || (this._hasMultipleChildren ? null : this._child ? this._child.get() : null);
};
RenderNode.prototype.set = function set(child) {
    this._childResult = null;
    this._hasMultipleChildren = false;
    this._isRenderable = child.render ? true : false;
    this._isModifier = child.modify ? true : false;
    this._object = child;
    this._child = null;
    if (child instanceof RenderNode)
        return child;
    else
        return this;
};
RenderNode.prototype.getSize = function getSize() {
    var result = null;
    var target = this.get();
    if (target && target.getSize)
        result = target.getSize();
    if (!result && this._child && this._child.getSize)
        result = this._child.getSize();
    return result;
};
function _applyCommit(spec, context, cacheStorage) {
    var result = SpecParser.parse(spec, context);
    var keys = Object.keys(result);
    for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var childNode = Entity.get(id);
        var commitParams = result[id];
        commitParams.allocator = context.allocator;
        var commitResult = childNode.commit(commitParams);
        if (commitResult)
            _applyCommit(commitResult, context, cacheStorage);
        else
            cacheStorage[id] = commitParams;
    }
}
RenderNode.prototype.commit = function commit(context) {
    var prevKeys = Object.keys(this._prevResults);
    for (var i = 0; i < prevKeys.length; i++) {
        var id = prevKeys[i];
        if (this._resultCache[id] === undefined) {
            var object = Entity.get(id);
            if (object.cleanup)
                object.cleanup(context.allocator);
        }
    }
    this._prevResults = this._resultCache;
    this._resultCache = {};
    _applyCommit(this.render(), context, this._resultCache);
};
RenderNode.prototype.render = function render() {
    if (this._isRenderable)
        return this._object.render();
    var result = null;
    if (this._hasMultipleChildren) {
        result = this._childResult;
        var children = this._child;
        for (var i = 0; i < children.length; i++) {
            result[i] = children[i].render();
        }
    } else if (this._child)
        result = this._child.render();
    return this._isModifier ? this._object.modify(result) : result;
};
module.exports = RenderNode;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\RenderNode.js","/..\\node_modules\\famous\\core")
},{"./Entity":9,"./SpecParser":16,"VCmEsw":43,"buffer":40}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Transform = require('./Transform');
function SpecParser() {
    this.result = {};
}
SpecParser._instance = new SpecParser();
SpecParser.parse = function parse(spec, context) {
    return SpecParser._instance.parse(spec, context);
};
SpecParser.prototype.parse = function parse(spec, context) {
    this.reset();
    this._parseSpec(spec, context, Transform.identity);
    return this.result;
};
SpecParser.prototype.reset = function reset() {
    this.result = {};
};
function _vecInContext(v, m) {
    return [
        v[0] * m[0] + v[1] * m[4] + v[2] * m[8],
        v[0] * m[1] + v[1] * m[5] + v[2] * m[9],
        v[0] * m[2] + v[1] * m[6] + v[2] * m[10]
    ];
}
var _zeroZero = [
    0,
    0
];
SpecParser.prototype._parseSpec = function _parseSpec(spec, parentContext, sizeContext) {
    var id;
    var target;
    var transform;
    var opacity;
    var origin;
    var align;
    var size;
    if (typeof spec === 'number') {
        id = spec;
        transform = parentContext.transform;
        align = parentContext.align || _zeroZero;
        if (parentContext.size && align && (align[0] || align[1])) {
            var alignAdjust = [
                align[0] * parentContext.size[0],
                align[1] * parentContext.size[1],
                0
            ];
            transform = Transform.thenMove(transform, _vecInContext(alignAdjust, sizeContext));
        }
        this.result[id] = {
            transform: transform,
            opacity: parentContext.opacity,
            origin: parentContext.origin || _zeroZero,
            align: parentContext.align || _zeroZero,
            size: parentContext.size
        };
    } else if (!spec) {
        return;
    } else if (spec instanceof Array) {
        for (var i = 0; i < spec.length; i++) {
            this._parseSpec(spec[i], parentContext, sizeContext);
        }
    } else {
        target = spec.target;
        transform = parentContext.transform;
        opacity = parentContext.opacity;
        origin = parentContext.origin;
        align = parentContext.align;
        size = parentContext.size;
        var nextSizeContext = sizeContext;
        if (spec.opacity !== undefined)
            opacity = parentContext.opacity * spec.opacity;
        if (spec.transform)
            transform = Transform.multiply(parentContext.transform, spec.transform);
        if (spec.origin) {
            origin = spec.origin;
            nextSizeContext = parentContext.transform;
        }
        if (spec.align)
            align = spec.align;
        if (spec.size || spec.proportions) {
            var parentSize = size;
            size = [
                size[0],
                size[1]
            ];
            if (spec.size) {
                if (spec.size[0] !== undefined)
                    size[0] = spec.size[0];
                if (spec.size[1] !== undefined)
                    size[1] = spec.size[1];
            }
            if (spec.proportions) {
                if (spec.proportions[0] !== undefined)
                    size[0] = size[0] * spec.proportions[0];
                if (spec.proportions[1] !== undefined)
                    size[1] = size[1] * spec.proportions[1];
            }
            if (parentSize) {
                if (align && (align[0] || align[1]))
                    transform = Transform.thenMove(transform, _vecInContext([
                        align[0] * parentSize[0],
                        align[1] * parentSize[1],
                        0
                    ], sizeContext));
                if (origin && (origin[0] || origin[1]))
                    transform = Transform.moveThen([
                        -origin[0] * size[0],
                        -origin[1] * size[1],
                        0
                    ], transform);
            }
            nextSizeContext = parentContext.transform;
            origin = null;
            align = null;
        }
        this._parseSpec(target, {
            transform: transform,
            opacity: opacity,
            origin: origin,
            align: align,
            size: size
        }, nextSizeContext);
    }
};
module.exports = SpecParser;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\SpecParser.js","/..\\node_modules\\famous\\core")
},{"./Transform":18,"VCmEsw":43,"buffer":40}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var ElementOutput = require('./ElementOutput');
function Surface(options) {
    ElementOutput.call(this);
    this.options = {};
    this.properties = {};
    this.attributes = {};
    this.content = '';
    this.classList = [];
    this.size = null;
    this._classesDirty = true;
    this._stylesDirty = true;
    this._attributesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;
    this._trueSizeCheck = true;
    this._dirtyClasses = [];
    if (options)
        this.setOptions(options);
    this._currentTarget = null;
}
Surface.prototype = Object.create(ElementOutput.prototype);
Surface.prototype.constructor = Surface;
Surface.prototype.elementType = 'div';
Surface.prototype.elementClass = 'famous-surface';
Surface.prototype.setAttributes = function setAttributes(attributes) {
    for (var n in attributes) {
        if (n === 'style')
            throw new Error('Cannot set styles via "setAttributes" as it will break Famo.us.  Use "setProperties" instead.');
        this.attributes[n] = attributes[n];
    }
    this._attributesDirty = true;
};
Surface.prototype.getAttributes = function getAttributes() {
    return this.attributes;
};
Surface.prototype.setProperties = function setProperties(properties) {
    for (var n in properties) {
        this.properties[n] = properties[n];
    }
    this._stylesDirty = true;
    return this;
};
Surface.prototype.getProperties = function getProperties() {
    return this.properties;
};
Surface.prototype.addClass = function addClass(className) {
    if (this.classList.indexOf(className) < 0) {
        this.classList.push(className);
        this._classesDirty = true;
    }
    return this;
};
Surface.prototype.removeClass = function removeClass(className) {
    var i = this.classList.indexOf(className);
    if (i >= 0) {
        this._dirtyClasses.push(this.classList.splice(i, 1)[0]);
        this._classesDirty = true;
    }
    return this;
};
Surface.prototype.toggleClass = function toggleClass(className) {
    var i = this.classList.indexOf(className);
    if (i >= 0) {
        this.removeClass(className);
    } else {
        this.addClass(className);
    }
    return this;
};
Surface.prototype.setClasses = function setClasses(classList) {
    var i = 0;
    var removal = [];
    for (i = 0; i < this.classList.length; i++) {
        if (classList.indexOf(this.classList[i]) < 0)
            removal.push(this.classList[i]);
    }
    for (i = 0; i < removal.length; i++)
        this.removeClass(removal[i]);
    for (i = 0; i < classList.length; i++)
        this.addClass(classList[i]);
    return this;
};
Surface.prototype.getClassList = function getClassList() {
    return this.classList;
};
Surface.prototype.setContent = function setContent(content) {
    if (this.content !== content) {
        this.content = content;
        this._contentDirty = true;
    }
    return this;
};
Surface.prototype.getContent = function getContent() {
    return this.content;
};
Surface.prototype.setOptions = function setOptions(options) {
    if (options.size)
        this.setSize(options.size);
    if (options.classes)
        this.setClasses(options.classes);
    if (options.properties)
        this.setProperties(options.properties);
    if (options.attributes)
        this.setAttributes(options.attributes);
    if (options.content)
        this.setContent(options.content);
    return this;
};
function _cleanupClasses(target) {
    for (var i = 0; i < this._dirtyClasses.length; i++)
        target.classList.remove(this._dirtyClasses[i]);
    this._dirtyClasses = [];
}
function _applyStyles(target) {
    for (var n in this.properties) {
        target.style[n] = this.properties[n];
    }
}
function _cleanupStyles(target) {
    for (var n in this.properties) {
        target.style[n] = '';
    }
}
function _applyAttributes(target) {
    for (var n in this.attributes) {
        target.setAttribute(n, this.attributes[n]);
    }
}
function _cleanupAttributes(target) {
    for (var n in this.attributes) {
        target.removeAttribute(n);
    }
}
function _xyNotEquals(a, b) {
    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
}
Surface.prototype.setup = function setup(allocator) {
    var target = allocator.allocate(this.elementType);
    if (this.elementClass) {
        if (this.elementClass instanceof Array) {
            for (var i = 0; i < this.elementClass.length; i++) {
                target.classList.add(this.elementClass[i]);
            }
        } else {
            target.classList.add(this.elementClass);
        }
    }
    target.style.display = '';
    this.attach(target);
    this._opacity = null;
    this._currentTarget = target;
    this._stylesDirty = true;
    this._classesDirty = true;
    this._attributesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;
    this._originDirty = true;
    this._transformDirty = true;
};
Surface.prototype.commit = function commit(context) {
    if (!this._currentTarget)
        this.setup(context.allocator);
    var target = this._currentTarget;
    var size = context.size;
    if (this._classesDirty) {
        _cleanupClasses.call(this, target);
        var classList = this.getClassList();
        for (var i = 0; i < classList.length; i++)
            target.classList.add(classList[i]);
        this._classesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this._stylesDirty) {
        _applyStyles.call(this, target);
        this._stylesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this._attributesDirty) {
        _applyAttributes.call(this, target);
        this._attributesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this.size) {
        var origSize = context.size;
        size = [
            this.size[0],
            this.size[1]
        ];
        if (size[0] === undefined)
            size[0] = origSize[0];
        if (size[1] === undefined)
            size[1] = origSize[1];
        if (size[0] === true || size[1] === true) {
            if (size[0] === true) {
                if (this._trueSizeCheck || this._size[0] === 0) {
                    var width = target.offsetWidth;
                    if (this._size && this._size[0] !== width) {
                        this._size[0] = width;
                        this._sizeDirty = true;
                    }
                    size[0] = width;
                } else {
                    if (this._size)
                        size[0] = this._size[0];
                }
            }
            if (size[1] === true) {
                if (this._trueSizeCheck || this._size[1] === 0) {
                    var height = target.offsetHeight;
                    if (this._size && this._size[1] !== height) {
                        this._size[1] = height;
                        this._sizeDirty = true;
                    }
                    size[1] = height;
                } else {
                    if (this._size)
                        size[1] = this._size[1];
                }
            }
            this._trueSizeCheck = false;
        }
    }
    if (_xyNotEquals(this._size, size)) {
        if (!this._size)
            this._size = [
                0,
                0
            ];
        this._size[0] = size[0];
        this._size[1] = size[1];
        this._sizeDirty = true;
    }
    if (this._sizeDirty) {
        if (this._size) {
            target.style.width = this.size && this.size[0] === true ? '' : this._size[0] + 'px';
            target.style.height = this.size && this.size[1] === true ? '' : this._size[1] + 'px';
        }
        this._eventOutput.emit('resize');
    }
    if (this._contentDirty) {
        this.deploy(target);
        this._eventOutput.emit('deploy');
        this._contentDirty = false;
        this._trueSizeCheck = true;
    }
    ElementOutput.prototype.commit.call(this, context);
};
Surface.prototype.cleanup = function cleanup(allocator) {
    var i = 0;
    var target = this._currentTarget;
    this._eventOutput.emit('recall');
    this.recall(target);
    target.style.display = 'none';
    target.style.opacity = '';
    target.style.width = '';
    target.style.height = '';
    _cleanupStyles.call(this, target);
    _cleanupAttributes.call(this, target);
    var classList = this.getClassList();
    _cleanupClasses.call(this, target);
    for (i = 0; i < classList.length; i++)
        target.classList.remove(classList[i]);
    if (this.elementClass) {
        if (this.elementClass instanceof Array) {
            for (i = 0; i < this.elementClass.length; i++) {
                target.classList.remove(this.elementClass[i]);
            }
        } else {
            target.classList.remove(this.elementClass);
        }
    }
    this.detach(target);
    this._currentTarget = null;
    allocator.deallocate(target);
};
Surface.prototype.deploy = function deploy(target) {
    var content = this.getContent();
    if (content instanceof Node) {
        while (target.hasChildNodes())
            target.removeChild(target.firstChild);
        target.appendChild(content);
    } else
        target.innerHTML = content;
};
Surface.prototype.recall = function recall(target) {
    var df = document.createDocumentFragment();
    while (target.hasChildNodes())
        df.appendChild(target.firstChild);
    this.setContent(df);
};
Surface.prototype.getSize = function getSize() {
    return this._size ? this._size : this.size;
};
Surface.prototype.setSize = function setSize(size) {
    this.size = size ? [
        size[0],
        size[1]
    ] : null;
    this._sizeDirty = true;
    return this;
};
module.exports = Surface;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\Surface.js","/..\\node_modules\\famous\\core")
},{"./ElementOutput":7,"VCmEsw":43,"buffer":40}],18:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Transform = {};
Transform.precision = 0.000001;
Transform.identity = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
];
Transform.multiply4x4 = function multiply4x4(a, b) {
    return [
        a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
        a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
        a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
        a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
        a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
        a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
        a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
        a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
        a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
        a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
        a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
        a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
        a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
    ];
};
Transform.multiply = function multiply(a, b) {
    return [
        a[0] * b[0] + a[4] * b[1] + a[8] * b[2],
        a[1] * b[0] + a[5] * b[1] + a[9] * b[2],
        a[2] * b[0] + a[6] * b[1] + a[10] * b[2],
        0,
        a[0] * b[4] + a[4] * b[5] + a[8] * b[6],
        a[1] * b[4] + a[5] * b[5] + a[9] * b[6],
        a[2] * b[4] + a[6] * b[5] + a[10] * b[6],
        0,
        a[0] * b[8] + a[4] * b[9] + a[8] * b[10],
        a[1] * b[8] + a[5] * b[9] + a[9] * b[10],
        a[2] * b[8] + a[6] * b[9] + a[10] * b[10],
        0,
        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12],
        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13],
        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14],
        1
    ];
};
Transform.thenMove = function thenMove(m, t) {
    if (!t[2])
        t[2] = 0;
    return [
        m[0],
        m[1],
        m[2],
        0,
        m[4],
        m[5],
        m[6],
        0,
        m[8],
        m[9],
        m[10],
        0,
        m[12] + t[0],
        m[13] + t[1],
        m[14] + t[2],
        1
    ];
};
Transform.moveThen = function moveThen(v, m) {
    if (!v[2])
        v[2] = 0;
    var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
    var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
    var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
    return Transform.thenMove(m, [
        t0,
        t1,
        t2
    ]);
};
Transform.translate = function translate(x, y, z) {
    if (z === undefined)
        z = 0;
    return [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        x,
        y,
        z,
        1
    ];
};
Transform.thenScale = function thenScale(m, s) {
    return [
        s[0] * m[0],
        s[1] * m[1],
        s[2] * m[2],
        0,
        s[0] * m[4],
        s[1] * m[5],
        s[2] * m[6],
        0,
        s[0] * m[8],
        s[1] * m[9],
        s[2] * m[10],
        0,
        s[0] * m[12],
        s[1] * m[13],
        s[2] * m[14],
        1
    ];
};
Transform.scale = function scale(x, y, z) {
    if (z === undefined)
        z = 1;
    if (y === undefined)
        y = x;
    return [
        x,
        0,
        0,
        0,
        0,
        y,
        0,
        0,
        0,
        0,
        z,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateX = function rotateX(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        1,
        0,
        0,
        0,
        0,
        cosTheta,
        sinTheta,
        0,
        0,
        -sinTheta,
        cosTheta,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateY = function rotateY(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        cosTheta,
        0,
        -sinTheta,
        0,
        0,
        1,
        0,
        0,
        sinTheta,
        0,
        cosTheta,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateZ = function rotateZ(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        cosTheta,
        sinTheta,
        0,
        0,
        -sinTheta,
        cosTheta,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotate = function rotate(phi, theta, psi) {
    var cosPhi = Math.cos(phi);
    var sinPhi = Math.sin(phi);
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    var cosPsi = Math.cos(psi);
    var sinPsi = Math.sin(psi);
    var result = [
        cosTheta * cosPsi,
        cosPhi * sinPsi + sinPhi * sinTheta * cosPsi,
        sinPhi * sinPsi - cosPhi * sinTheta * cosPsi,
        0,
        -cosTheta * sinPsi,
        cosPhi * cosPsi - sinPhi * sinTheta * sinPsi,
        sinPhi * cosPsi + cosPhi * sinTheta * sinPsi,
        0,
        sinTheta,
        -sinPhi * cosTheta,
        cosPhi * cosTheta,
        0,
        0,
        0,
        0,
        1
    ];
    return result;
};
Transform.rotateAxis = function rotateAxis(v, theta) {
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    var verTheta = 1 - cosTheta;
    var xxV = v[0] * v[0] * verTheta;
    var xyV = v[0] * v[1] * verTheta;
    var xzV = v[0] * v[2] * verTheta;
    var yyV = v[1] * v[1] * verTheta;
    var yzV = v[1] * v[2] * verTheta;
    var zzV = v[2] * v[2] * verTheta;
    var xs = v[0] * sinTheta;
    var ys = v[1] * sinTheta;
    var zs = v[2] * sinTheta;
    var result = [
        xxV + cosTheta,
        xyV + zs,
        xzV - ys,
        0,
        xyV - zs,
        yyV + cosTheta,
        yzV + xs,
        0,
        xzV + ys,
        yzV - xs,
        zzV + cosTheta,
        0,
        0,
        0,
        0,
        1
    ];
    return result;
};
Transform.aboutOrigin = function aboutOrigin(v, m) {
    var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
    var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
    var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
    return Transform.thenMove(m, [
        t0,
        t1,
        t2
    ]);
};
Transform.skew = function skew(phi, theta, psi) {
    return [
        1,
        Math.tan(theta),
        0,
        0,
        Math.tan(psi),
        1,
        0,
        0,
        0,
        Math.tan(phi),
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.skewX = function skewX(angle) {
    return [
        1,
        0,
        0,
        0,
        Math.tan(angle),
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.skewY = function skewY(angle) {
    return [
        1,
        Math.tan(angle),
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.perspective = function perspective(focusZ) {
    return [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        -1 / focusZ,
        0,
        0,
        0,
        1
    ];
};
Transform.getTranslate = function getTranslate(m) {
    return [
        m[12],
        m[13],
        m[14]
    ];
};
Transform.inverse = function inverse(m) {
    var c0 = m[5] * m[10] - m[6] * m[9];
    var c1 = m[4] * m[10] - m[6] * m[8];
    var c2 = m[4] * m[9] - m[5] * m[8];
    var c4 = m[1] * m[10] - m[2] * m[9];
    var c5 = m[0] * m[10] - m[2] * m[8];
    var c6 = m[0] * m[9] - m[1] * m[8];
    var c8 = m[1] * m[6] - m[2] * m[5];
    var c9 = m[0] * m[6] - m[2] * m[4];
    var c10 = m[0] * m[5] - m[1] * m[4];
    var detM = m[0] * c0 - m[1] * c1 + m[2] * c2;
    var invD = 1 / detM;
    var result = [
        invD * c0,
        -invD * c4,
        invD * c8,
        0,
        -invD * c1,
        invD * c5,
        -invD * c9,
        0,
        invD * c2,
        -invD * c6,
        invD * c10,
        0,
        0,
        0,
        0,
        1
    ];
    result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
    result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
    result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
    return result;
};
Transform.transpose = function transpose(m) {
    return [
        m[0],
        m[4],
        m[8],
        m[12],
        m[1],
        m[5],
        m[9],
        m[13],
        m[2],
        m[6],
        m[10],
        m[14],
        m[3],
        m[7],
        m[11],
        m[15]
    ];
};
function _normSquared(v) {
    return v.length === 2 ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
}
function _norm(v) {
    return Math.sqrt(_normSquared(v));
}
function _sign(n) {
    return n < 0 ? -1 : 1;
}
Transform.interpret = function interpret(M) {
    var x = [
        M[0],
        M[1],
        M[2]
    ];
    var sgn = _sign(x[0]);
    var xNorm = _norm(x);
    var v = [
        x[0] + sgn * xNorm,
        x[1],
        x[2]
    ];
    var mult = 2 / _normSquared(v);
    if (mult >= Infinity) {
        return {
            translate: Transform.getTranslate(M),
            rotate: [
                0,
                0,
                0
            ],
            scale: [
                0,
                0,
                0
            ],
            skew: [
                0,
                0,
                0
            ]
        };
    }
    var Q1 = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1
    ];
    Q1[0] = 1 - mult * v[0] * v[0];
    Q1[5] = 1 - mult * v[1] * v[1];
    Q1[10] = 1 - mult * v[2] * v[2];
    Q1[1] = -mult * v[0] * v[1];
    Q1[2] = -mult * v[0] * v[2];
    Q1[6] = -mult * v[1] * v[2];
    Q1[4] = Q1[1];
    Q1[8] = Q1[2];
    Q1[9] = Q1[6];
    var MQ1 = Transform.multiply(Q1, M);
    var x2 = [
        MQ1[5],
        MQ1[6]
    ];
    var sgn2 = _sign(x2[0]);
    var x2Norm = _norm(x2);
    var v2 = [
        x2[0] + sgn2 * x2Norm,
        x2[1]
    ];
    var mult2 = 2 / _normSquared(v2);
    var Q2 = [
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1
    ];
    Q2[5] = 1 - mult2 * v2[0] * v2[0];
    Q2[10] = 1 - mult2 * v2[1] * v2[1];
    Q2[6] = -mult2 * v2[0] * v2[1];
    Q2[9] = Q2[6];
    var Q = Transform.multiply(Q2, Q1);
    var R = Transform.multiply(Q, M);
    var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
    R = Transform.multiply(R, remover);
    Q = Transform.multiply(remover, Q);
    var result = {};
    result.translate = Transform.getTranslate(M);
    result.rotate = [
        Math.atan2(-Q[6], Q[10]),
        Math.asin(Q[2]),
        Math.atan2(-Q[1], Q[0])
    ];
    if (!result.rotate[0]) {
        result.rotate[0] = 0;
        result.rotate[2] = Math.atan2(Q[4], Q[5]);
    }
    result.scale = [
        R[0],
        R[5],
        R[10]
    ];
    result.skew = [
        Math.atan2(R[9], result.scale[2]),
        Math.atan2(R[8], result.scale[2]),
        Math.atan2(R[4], result.scale[0])
    ];
    if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
        result.rotate[1] = Math.PI - result.rotate[1];
        if (result.rotate[1] > Math.PI)
            result.rotate[1] -= 2 * Math.PI;
        if (result.rotate[1] < -Math.PI)
            result.rotate[1] += 2 * Math.PI;
        if (result.rotate[0] < 0)
            result.rotate[0] += Math.PI;
        else
            result.rotate[0] -= Math.PI;
        if (result.rotate[2] < 0)
            result.rotate[2] += Math.PI;
        else
            result.rotate[2] -= Math.PI;
    }
    return result;
};
Transform.average = function average(M1, M2, t) {
    t = t === undefined ? 0.5 : t;
    var specM1 = Transform.interpret(M1);
    var specM2 = Transform.interpret(M2);
    var specAvg = {
        translate: [
            0,
            0,
            0
        ],
        rotate: [
            0,
            0,
            0
        ],
        scale: [
            0,
            0,
            0
        ],
        skew: [
            0,
            0,
            0
        ]
    };
    for (var i = 0; i < 3; i++) {
        specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
        specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
        specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
        specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
    }
    return Transform.build(specAvg);
};
Transform.build = function build(spec) {
    var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
    var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
    var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
    return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
};
Transform.equals = function equals(a, b) {
    return !Transform.notEquals(a, b);
};
Transform.notEquals = function notEquals(a, b) {
    if (a === b)
        return false;
    return !(a && b) || a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] || a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] || a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] || a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
};
Transform.normalizeRotation = function normalizeRotation(rotation) {
    var result = rotation.slice(0);
    if (result[0] === Math.PI * 0.5 || result[0] === -Math.PI * 0.5) {
        result[0] = -result[0];
        result[1] = Math.PI - result[1];
        result[2] -= Math.PI;
    }
    if (result[0] > Math.PI * 0.5) {
        result[0] = result[0] - Math.PI;
        result[1] = Math.PI - result[1];
        result[2] -= Math.PI;
    }
    if (result[0] < -Math.PI * 0.5) {
        result[0] = result[0] + Math.PI;
        result[1] = -Math.PI - result[1];
        result[2] -= Math.PI;
    }
    while (result[1] < -Math.PI)
        result[1] += 2 * Math.PI;
    while (result[1] >= Math.PI)
        result[1] -= 2 * Math.PI;
    while (result[2] < -Math.PI)
        result[2] += 2 * Math.PI;
    while (result[2] >= Math.PI)
        result[2] -= 2 * Math.PI;
    return result;
};
Transform.inFront = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0.001,
    1
];
Transform.behind = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    -0.001,
    1
];
module.exports = Transform;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\Transform.js","/..\\node_modules\\famous\\core")
},{"VCmEsw":43,"buffer":40}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var EventHandler = require('./EventHandler');
var OptionsManager = require('./OptionsManager');
var RenderNode = require('./RenderNode');
var Utility = require('../utilities/Utility');
function View(options) {
    this._node = new RenderNode();
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this.options = Utility.clone(this.constructor.DEFAULT_OPTIONS || View.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
}
View.DEFAULT_OPTIONS = {};
View.prototype.getOptions = function getOptions(key) {
    return this._optionsManager.getOptions(key);
};
View.prototype.setOptions = function setOptions(options) {
    this._optionsManager.patch(options);
};
View.prototype.add = function add() {
    return this._node.add.apply(this._node, arguments);
};
View.prototype._add = View.prototype.add;
View.prototype.render = function render() {
    return this._node.render();
};
View.prototype.getSize = function getSize() {
    if (this._node && this._node.getSize) {
        return this._node.getSize.apply(this._node, arguments) || this.options.size;
    } else
        return this.options.size;
};
module.exports = View;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\View.js","/..\\node_modules\\famous\\core")
},{"../utilities/Utility":38,"./EventHandler":11,"./OptionsManager":14,"./RenderNode":15,"VCmEsw":43,"buffer":40}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
function ViewSequence(options) {
    if (!options)
        options = [];
    if (options instanceof Array)
        options = { array: options };
    this._ = null;
    this.index = options.index || 0;
    if (options.array)
        this._ = new this.constructor.Backing(options.array);
    else if (options._)
        this._ = options._;
    if (this.index === this._.firstIndex)
        this._.firstNode = this;
    if (this.index === this._.firstIndex + this._.array.length - 1)
        this._.lastNode = this;
    if (options.loop !== undefined)
        this._.loop = options.loop;
    if (options.trackSize !== undefined)
        this._.trackSize = options.trackSize;
    this._previousNode = null;
    this._nextNode = null;
}
ViewSequence.Backing = function Backing(array) {
    this.array = array;
    this.firstIndex = 0;
    this.loop = false;
    this.firstNode = null;
    this.lastNode = null;
    this.cumulativeSizes = [[
            0,
            0
        ]];
    this.sizeDirty = true;
    this.trackSize = false;
};
ViewSequence.Backing.prototype.getValue = function getValue(i) {
    var _i = i - this.firstIndex;
    if (_i < 0 || _i >= this.array.length)
        return null;
    return this.array[_i];
};
ViewSequence.Backing.prototype.setValue = function setValue(i, value) {
    this.array[i - this.firstIndex] = value;
};
ViewSequence.Backing.prototype.getSize = function getSize(index) {
    return this.cumulativeSizes[index];
};
ViewSequence.Backing.prototype.calculateSize = function calculateSize(index) {
    index = index || this.array.length;
    var size = [
        0,
        0
    ];
    for (var i = 0; i < index; i++) {
        var nodeSize = this.array[i].getSize();
        if (!nodeSize)
            return undefined;
        if (size[0] !== undefined) {
            if (nodeSize[0] === undefined)
                size[0] = undefined;
            else
                size[0] += nodeSize[0];
        }
        if (size[1] !== undefined) {
            if (nodeSize[1] === undefined)
                size[1] = undefined;
            else
                size[1] += nodeSize[1];
        }
        this.cumulativeSizes[i + 1] = size.slice();
    }
    this.sizeDirty = false;
    return size;
};
ViewSequence.Backing.prototype.reindex = function reindex(start, removeCount, insertCount) {
    if (!this.array[0])
        return;
    var i = 0;
    var index = this.firstIndex;
    var indexShiftAmount = insertCount - removeCount;
    var node = this.firstNode;
    while (index < start - 1) {
        node = node.getNext();
        index++;
    }
    var spliceStartNode = node;
    for (i = 0; i < removeCount; i++) {
        node = node.getNext();
        if (node)
            node._previousNode = spliceStartNode;
    }
    var spliceResumeNode = node ? node.getNext() : null;
    spliceStartNode._nextNode = null;
    node = spliceStartNode;
    for (i = 0; i < insertCount; i++)
        node = node.getNext();
    index += insertCount;
    if (node !== spliceResumeNode) {
        node._nextNode = spliceResumeNode;
        if (spliceResumeNode)
            spliceResumeNode._previousNode = node;
    }
    if (spliceResumeNode) {
        node = spliceResumeNode;
        index++;
        while (node && index < this.array.length + this.firstIndex) {
            if (node._nextNode)
                node.index += indexShiftAmount;
            else
                node.index = index;
            node = node.getNext();
            index++;
        }
    }
    if (this.trackSize)
        this.sizeDirty = true;
};
ViewSequence.prototype.getPrevious = function getPrevious() {
    var len = this._.array.length;
    if (!len) {
        this._previousNode = null;
    } else if (this.index === this._.firstIndex) {
        if (this._.loop) {
            this._previousNode = this._.lastNode || new this.constructor({
                _: this._,
                index: this._.firstIndex + len - 1
            });
            this._previousNode._nextNode = this;
        } else {
            this._previousNode = null;
        }
    } else if (!this._previousNode) {
        this._previousNode = new this.constructor({
            _: this._,
            index: this.index - 1
        });
        this._previousNode._nextNode = this;
    }
    return this._previousNode;
};
ViewSequence.prototype.getNext = function getNext() {
    var len = this._.array.length;
    if (!len) {
        this._nextNode = null;
    } else if (this.index === this._.firstIndex + len - 1) {
        if (this._.loop) {
            this._nextNode = this._.firstNode || new this.constructor({
                _: this._,
                index: this._.firstIndex
            });
            this._nextNode._previousNode = this;
        } else {
            this._nextNode = null;
        }
    } else if (!this._nextNode) {
        this._nextNode = new this.constructor({
            _: this._,
            index: this.index + 1
        });
        this._nextNode._previousNode = this;
    }
    return this._nextNode;
};
ViewSequence.prototype.indexOf = function indexOf(item) {
    return this._.array.indexOf(item);
};
ViewSequence.prototype.getIndex = function getIndex() {
    return this.index;
};
ViewSequence.prototype.toString = function toString() {
    return '' + this.index;
};
ViewSequence.prototype.unshift = function unshift(value) {
    this._.array.unshift.apply(this._.array, arguments);
    this._.firstIndex -= arguments.length;
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.push = function push(value) {
    this._.array.push.apply(this._.array, arguments);
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.splice = function splice(index, howMany) {
    var values = Array.prototype.slice.call(arguments, 2);
    this._.array.splice.apply(this._.array, [
        index - this._.firstIndex,
        howMany
    ].concat(values));
    this._.reindex(index, howMany, values.length);
};
ViewSequence.prototype.swap = function swap(other) {
    var otherValue = other.get();
    var myValue = this.get();
    this._.setValue(this.index, otherValue);
    this._.setValue(other.index, myValue);
    var myPrevious = this._previousNode;
    var myNext = this._nextNode;
    var myIndex = this.index;
    var otherPrevious = other._previousNode;
    var otherNext = other._nextNode;
    var otherIndex = other.index;
    this.index = otherIndex;
    this._previousNode = otherPrevious === this ? other : otherPrevious;
    if (this._previousNode)
        this._previousNode._nextNode = this;
    this._nextNode = otherNext === this ? other : otherNext;
    if (this._nextNode)
        this._nextNode._previousNode = this;
    other.index = myIndex;
    other._previousNode = myPrevious === other ? this : myPrevious;
    if (other._previousNode)
        other._previousNode._nextNode = other;
    other._nextNode = myNext === other ? this : myNext;
    if (other._nextNode)
        other._nextNode._previousNode = other;
    if (this.index === this._.firstIndex)
        this._.firstNode = this;
    else if (this.index === this._.firstIndex + this._.array.length - 1)
        this._.lastNode = this;
    if (other.index === this._.firstIndex)
        this._.firstNode = other;
    else if (other.index === this._.firstIndex + this._.array.length - 1)
        this._.lastNode = other;
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.get = function get() {
    return this._.getValue(this.index);
};
ViewSequence.prototype.getSize = function getSize() {
    var target = this.get();
    return target ? target.getSize() : null;
};
ViewSequence.prototype.render = function render() {
    if (this._.trackSize && this._.sizeDirty)
        this._.calculateSize();
    var target = this.get();
    return target ? target.render.apply(target, arguments) : null;
};
module.exports = ViewSequence;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\core\\ViewSequence.js","/..\\node_modules\\famous\\core")
},{"VCmEsw":43,"buffer":40}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var EventHandler = require('../core/EventHandler');
var Engine = require('../core/Engine');
var OptionsManager = require('../core/OptionsManager');
function ScrollSync(options) {
    this.options = Object.create(ScrollSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._payload = {
        delta: null,
        position: null,
        velocity: null,
        slip: true
    };
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._position = this.options.direction === undefined ? [
        0,
        0
    ] : 0;
    this._prevTime = undefined;
    this._prevVel = undefined;
    this._eventInput.on('mousewheel', _handleMove.bind(this));
    this._eventInput.on('wheel', _handleMove.bind(this));
    this._inProgress = false;
    this._loopBound = false;
}
ScrollSync.DEFAULT_OPTIONS = {
    direction: undefined,
    minimumEndSpeed: Infinity,
    rails: false,
    scale: 1,
    stallTime: 50,
    lineHeight: 40,
    preventDefault: true
};
ScrollSync.DIRECTION_X = 0;
ScrollSync.DIRECTION_Y = 1;
var MINIMUM_TICK_TIME = 8;
var _now = Date.now;
function _newFrame() {
    if (this._inProgress && _now() - this._prevTime > this.options.stallTime) {
        this._inProgress = false;
        var finalVel = Math.abs(this._prevVel) >= this.options.minimumEndSpeed ? this._prevVel : 0;
        var payload = this._payload;
        payload.position = this._position;
        payload.velocity = finalVel;
        payload.slip = true;
        this._eventOutput.emit('end', payload);
    }
}
function _handleMove(event) {
    if (this.options.preventDefault)
        event.preventDefault();
    if (!this._inProgress) {
        this._inProgress = true;
        this._position = this.options.direction === undefined ? [
            0,
            0
        ] : 0;
        payload = this._payload;
        payload.slip = true;
        payload.position = this._position;
        payload.clientX = event.clientX;
        payload.clientY = event.clientY;
        payload.offsetX = event.offsetX;
        payload.offsetY = event.offsetY;
        this._eventOutput.emit('start', payload);
        if (!this._loopBound) {
            Engine.on('prerender', _newFrame.bind(this));
            this._loopBound = true;
        }
    }
    var currTime = _now();
    var prevTime = this._prevTime || currTime;
    var diffX = event.wheelDeltaX !== undefined ? event.wheelDeltaX : -event.deltaX;
    var diffY = event.wheelDeltaY !== undefined ? event.wheelDeltaY : -event.deltaY;
    if (event.deltaMode === 1) {
        diffX *= this.options.lineHeight;
        diffY *= this.options.lineHeight;
    }
    if (this.options.rails) {
        if (Math.abs(diffX) > Math.abs(diffY))
            diffY = 0;
        else
            diffX = 0;
    }
    var diffTime = Math.max(currTime - prevTime, MINIMUM_TICK_TIME);
    var velX = diffX / diffTime;
    var velY = diffY / diffTime;
    var scale = this.options.scale;
    var nextVel;
    var nextDelta;
    if (this.options.direction === ScrollSync.DIRECTION_X) {
        nextDelta = scale * diffX;
        nextVel = scale * velX;
        this._position += nextDelta;
    } else if (this.options.direction === ScrollSync.DIRECTION_Y) {
        nextDelta = scale * diffY;
        nextVel = scale * velY;
        this._position += nextDelta;
    } else {
        nextDelta = [
            scale * diffX,
            scale * diffY
        ];
        nextVel = [
            scale * velX,
            scale * velY
        ];
        this._position[0] += nextDelta[0];
        this._position[1] += nextDelta[1];
    }
    var payload = this._payload;
    payload.delta = nextDelta;
    payload.velocity = nextVel;
    payload.position = this._position;
    payload.slip = true;
    this._eventOutput.emit('update', payload);
    this._prevTime = currTime;
    this._prevVel = nextVel;
}
ScrollSync.prototype.getOptions = function getOptions() {
    return this.options;
};
ScrollSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
module.exports = ScrollSync;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\inputs\\ScrollSync.js","/..\\node_modules\\famous\\inputs")
},{"../core/Engine":8,"../core/EventHandler":11,"../core/OptionsManager":14,"VCmEsw":43,"buffer":40}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
function Vector(x, y, z) {
    if (arguments.length === 1 && x !== undefined)
        this.set(x);
    else {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    return this;
}
var _register = new Vector(0, 0, 0);
Vector.prototype.add = function add(v) {
    return _setXYZ.call(_register, this.x + v.x, this.y + v.y, this.z + v.z);
};
Vector.prototype.sub = function sub(v) {
    return _setXYZ.call(_register, this.x - v.x, this.y - v.y, this.z - v.z);
};
Vector.prototype.mult = function mult(r) {
    return _setXYZ.call(_register, r * this.x, r * this.y, r * this.z);
};
Vector.prototype.div = function div(r) {
    return this.mult(1 / r);
};
Vector.prototype.cross = function cross(v) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var vx = v.x;
    var vy = v.y;
    var vz = v.z;
    return _setXYZ.call(_register, z * vy - y * vz, x * vz - z * vx, y * vx - x * vy);
};
Vector.prototype.equals = function equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z;
};
Vector.prototype.rotateX = function rotateX(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return _setXYZ.call(_register, x, y * cosTheta - z * sinTheta, y * sinTheta + z * cosTheta);
};
Vector.prototype.rotateY = function rotateY(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return _setXYZ.call(_register, z * sinTheta + x * cosTheta, y, z * cosTheta - x * sinTheta);
};
Vector.prototype.rotateZ = function rotateZ(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return _setXYZ.call(_register, x * cosTheta - y * sinTheta, x * sinTheta + y * cosTheta, z);
};
Vector.prototype.dot = function dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
};
Vector.prototype.normSquared = function normSquared() {
    return this.dot(this);
};
Vector.prototype.norm = function norm() {
    return Math.sqrt(this.normSquared());
};
Vector.prototype.normalize = function normalize(length) {
    if (arguments.length === 0)
        length = 1;
    var norm = this.norm();
    if (norm > 1e-7)
        return _setFromVector.call(_register, this.mult(length / norm));
    else
        return _setXYZ.call(_register, length, 0, 0);
};
Vector.prototype.clone = function clone() {
    return new Vector(this);
};
Vector.prototype.isZero = function isZero() {
    return !(this.x || this.y || this.z);
};
function _setXYZ(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
}
function _setFromArray(v) {
    return _setXYZ.call(this, v[0], v[1], v[2] || 0);
}
function _setFromVector(v) {
    return _setXYZ.call(this, v.x, v.y, v.z);
}
function _setFromNumber(x) {
    return _setXYZ.call(this, x, 0, 0);
}
Vector.prototype.set = function set(v) {
    if (v instanceof Array)
        return _setFromArray.call(this, v);
    if (typeof v === 'number')
        return _setFromNumber.call(this, v);
    return _setFromVector.call(this, v);
};
Vector.prototype.setXYZ = function (x, y, z) {
    return _setXYZ.apply(this, arguments);
};
Vector.prototype.set1D = function (x) {
    return _setFromNumber.call(this, x);
};
Vector.prototype.put = function put(v) {
    if (this === _register)
        _setFromVector.call(v, _register);
    else
        _setFromVector.call(v, this);
};
Vector.prototype.clear = function clear() {
    return _setXYZ.call(this, 0, 0, 0);
};
Vector.prototype.cap = function cap(cap) {
    if (cap === Infinity)
        return _setFromVector.call(_register, this);
    var norm = this.norm();
    if (norm > cap)
        return _setFromVector.call(_register, this.mult(cap / norm));
    else
        return _setFromVector.call(_register, this);
};
Vector.prototype.project = function project(n) {
    return n.mult(this.dot(n));
};
Vector.prototype.reflectAcross = function reflectAcross(n) {
    n.normalize().put(n);
    return _setFromVector(_register, this.sub(this.project(n).mult(2)));
};
Vector.prototype.get = function get() {
    return [
        this.x,
        this.y,
        this.z
    ];
};
Vector.prototype.get1D = function () {
    return this.x;
};
module.exports = Vector;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\math\\Vector.js","/..\\node_modules\\famous\\math")
},{"VCmEsw":43,"buffer":40}],23:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Modifier = require('../core/Modifier');
var Transform = require('../core/Transform');
var Transitionable = require('../transitions/Transitionable');
var TransitionableTransform = require('../transitions/TransitionableTransform');
function StateModifier(options) {
    this._transformState = new TransitionableTransform(Transform.identity);
    this._opacityState = new Transitionable(1);
    this._originState = new Transitionable([
        0,
        0
    ]);
    this._alignState = new Transitionable([
        0,
        0
    ]);
    this._sizeState = new Transitionable([
        0,
        0
    ]);
    this._proportionsState = new Transitionable([
        0,
        0
    ]);
    this._modifier = new Modifier({
        transform: this._transformState,
        opacity: this._opacityState,
        origin: null,
        align: null,
        size: null,
        proportions: null
    });
    this._hasOrigin = false;
    this._hasAlign = false;
    this._hasSize = false;
    this._hasProportions = false;
    if (options) {
        if (options.transform)
            this.setTransform(options.transform);
        if (options.opacity !== undefined)
            this.setOpacity(options.opacity);
        if (options.origin)
            this.setOrigin(options.origin);
        if (options.align)
            this.setAlign(options.align);
        if (options.size)
            this.setSize(options.size);
        if (options.proportions)
            this.setProportions(options.proportions);
    }
}
StateModifier.prototype.setTransform = function setTransform(transform, transition, callback) {
    this._transformState.set(transform, transition, callback);
    return this;
};
StateModifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
    this._opacityState.set(opacity, transition, callback);
    return this;
};
StateModifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
    if (origin === null) {
        if (this._hasOrigin) {
            this._modifier.originFrom(null);
            this._hasOrigin = false;
        }
        return this;
    } else if (!this._hasOrigin) {
        this._hasOrigin = true;
        this._modifier.originFrom(this._originState);
    }
    this._originState.set(origin, transition, callback);
    return this;
};
StateModifier.prototype.setAlign = function setOrigin(align, transition, callback) {
    if (align === null) {
        if (this._hasAlign) {
            this._modifier.alignFrom(null);
            this._hasAlign = false;
        }
        return this;
    } else if (!this._hasAlign) {
        this._hasAlign = true;
        this._modifier.alignFrom(this._alignState);
    }
    this._alignState.set(align, transition, callback);
    return this;
};
StateModifier.prototype.setSize = function setSize(size, transition, callback) {
    if (size === null) {
        if (this._hasSize) {
            this._modifier.sizeFrom(null);
            this._hasSize = false;
        }
        return this;
    } else if (!this._hasSize) {
        this._hasSize = true;
        this._modifier.sizeFrom(this._sizeState);
    }
    this._sizeState.set(size, transition, callback);
    return this;
};
StateModifier.prototype.setProportions = function setSize(proportions, transition, callback) {
    if (proportions === null) {
        if (this._hasProportions) {
            this._modifier.proportionsFrom(null);
            this._hasProportions = false;
        }
        return this;
    } else if (!this._hasProportions) {
        this._hasProportions = true;
        this._modifier.proportionsFrom(this._proportionsState);
    }
    this._proportionsState.set(proportions, transition, callback);
    return this;
};
StateModifier.prototype.halt = function halt() {
    this._transformState.halt();
    this._opacityState.halt();
    this._originState.halt();
    this._alignState.halt();
    this._sizeState.halt();
    this._proportionsState.halt();
};
StateModifier.prototype.getTransform = function getTransform() {
    return this._transformState.get();
};
StateModifier.prototype.getFinalTransform = function getFinalTransform() {
    return this._transformState.getFinal();
};
StateModifier.prototype.getOpacity = function getOpacity() {
    return this._opacityState.get();
};
StateModifier.prototype.getOrigin = function getOrigin() {
    return this._hasOrigin ? this._originState.get() : null;
};
StateModifier.prototype.getAlign = function getAlign() {
    return this._hasAlign ? this._alignState.get() : null;
};
StateModifier.prototype.getSize = function getSize() {
    return this._hasSize ? this._sizeState.get() : null;
};
StateModifier.prototype.getProportions = function getProportions() {
    return this._hasProportions ? this._proportionsState.get() : null;
};
StateModifier.prototype.modify = function modify(target) {
    return this._modifier.modify(target);
};
module.exports = StateModifier;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\modifiers\\StateModifier.js","/..\\node_modules\\famous\\modifiers")
},{"../core/Modifier":13,"../core/Transform":18,"../transitions/Transitionable":35,"../transitions/TransitionableTransform":36,"VCmEsw":43,"buffer":40}],24:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var EventHandler = require('../core/EventHandler');
function PhysicsEngine(options) {
    this.options = Object.create(PhysicsEngine.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this._particles = [];
    this._bodies = [];
    this._agentData = {};
    this._forces = [];
    this._constraints = [];
    this._buffer = 0;
    this._prevTime = now();
    this._isSleeping = false;
    this._eventHandler = null;
    this._currAgentId = 0;
    this._hasBodies = false;
    this._eventHandler = null;
}
var TIMESTEP = 17;
var MIN_TIME_STEP = 1000 / 120;
var MAX_TIME_STEP = 17;
var now = Date.now;
var _events = {
    start: 'start',
    update: 'update',
    end: 'end'
};
PhysicsEngine.DEFAULT_OPTIONS = {
    constraintSteps: 1,
    sleepTolerance: 1e-7,
    velocityCap: undefined,
    angularVelocityCap: undefined
};
PhysicsEngine.prototype.setOptions = function setOptions(opts) {
    for (var key in opts)
        if (this.options[key])
            this.options[key] = opts[key];
};
PhysicsEngine.prototype.addBody = function addBody(body) {
    body._engine = this;
    if (body.isBody) {
        this._bodies.push(body);
        this._hasBodies = true;
    } else
        this._particles.push(body);
    body.on('start', this.wake.bind(this));
    return body;
};
PhysicsEngine.prototype.removeBody = function removeBody(body) {
    var array = body.isBody ? this._bodies : this._particles;
    var index = array.indexOf(body);
    if (index > -1) {
        for (var agentKey in this._agentData) {
            if (this._agentData.hasOwnProperty(agentKey)) {
                this.detachFrom(this._agentData[agentKey].id, body);
            }
        }
        array.splice(index, 1);
    }
    if (this.getBodies().length === 0)
        this._hasBodies = false;
};
function _mapAgentArray(agent) {
    if (agent.applyForce)
        return this._forces;
    if (agent.applyConstraint)
        return this._constraints;
}
function _attachOne(agent, targets, source) {
    if (targets === undefined)
        targets = this.getParticlesAndBodies();
    if (!(targets instanceof Array))
        targets = [targets];
    agent.on('change', this.wake.bind(this));
    this._agentData[this._currAgentId] = {
        agent: agent,
        id: this._currAgentId,
        targets: targets,
        source: source
    };
    _mapAgentArray.call(this, agent).push(this._currAgentId);
    return this._currAgentId++;
}
PhysicsEngine.prototype.attach = function attach(agents, targets, source) {
    this.wake();
    if (agents instanceof Array) {
        var agentIDs = [];
        for (var i = 0; i < agents.length; i++)
            agentIDs[i] = _attachOne.call(this, agents[i], targets, source);
        return agentIDs;
    } else
        return _attachOne.call(this, agents, targets, source);
};
PhysicsEngine.prototype.attachTo = function attachTo(agentID, target) {
    _getAgentData.call(this, agentID).targets.push(target);
};
PhysicsEngine.prototype.detach = function detach(id) {
    var agent = this.getAgent(id);
    var agentArray = _mapAgentArray.call(this, agent);
    var index = agentArray.indexOf(id);
    agentArray.splice(index, 1);
    delete this._agentData[id];
};
PhysicsEngine.prototype.detachFrom = function detachFrom(id, target) {
    var boundAgent = _getAgentData.call(this, id);
    if (boundAgent.source === target)
        this.detach(id);
    else {
        var targets = boundAgent.targets;
        var index = targets.indexOf(target);
        if (index > -1)
            targets.splice(index, 1);
    }
};
PhysicsEngine.prototype.detachAll = function detachAll() {
    this._agentData = {};
    this._forces = [];
    this._constraints = [];
    this._currAgentId = 0;
};
function _getAgentData(id) {
    return this._agentData[id];
}
PhysicsEngine.prototype.getAgent = function getAgent(id) {
    return _getAgentData.call(this, id).agent;
};
PhysicsEngine.prototype.getParticles = function getParticles() {
    return this._particles;
};
PhysicsEngine.prototype.getBodies = function getBodies() {
    return this._bodies;
};
PhysicsEngine.prototype.getParticlesAndBodies = function getParticlesAndBodies() {
    return this.getParticles().concat(this.getBodies());
};
PhysicsEngine.prototype.forEachParticle = function forEachParticle(fn, dt) {
    var particles = this.getParticles();
    for (var index = 0, len = particles.length; index < len; index++)
        fn.call(this, particles[index], dt);
};
PhysicsEngine.prototype.forEachBody = function forEachBody(fn, dt) {
    if (!this._hasBodies)
        return;
    var bodies = this.getBodies();
    for (var index = 0, len = bodies.length; index < len; index++)
        fn.call(this, bodies[index], dt);
};
PhysicsEngine.prototype.forEach = function forEach(fn, dt) {
    this.forEachParticle(fn, dt);
    this.forEachBody(fn, dt);
};
function _updateForce(index) {
    var boundAgent = _getAgentData.call(this, this._forces[index]);
    boundAgent.agent.applyForce(boundAgent.targets, boundAgent.source);
}
function _updateForces() {
    for (var index = this._forces.length - 1; index > -1; index--)
        _updateForce.call(this, index);
}
function _updateConstraint(index, dt) {
    var boundAgent = this._agentData[this._constraints[index]];
    return boundAgent.agent.applyConstraint(boundAgent.targets, boundAgent.source, dt);
}
function _updateConstraints(dt) {
    var iteration = 0;
    while (iteration < this.options.constraintSteps) {
        for (var index = this._constraints.length - 1; index > -1; index--)
            _updateConstraint.call(this, index, dt);
        iteration++;
    }
}
function _updateVelocities(body, dt) {
    body.integrateVelocity(dt);
    if (this.options.velocityCap)
        body.velocity.cap(this.options.velocityCap).put(body.velocity);
}
function _updateAngularVelocities(body, dt) {
    body.integrateAngularMomentum(dt);
    body.updateAngularVelocity();
    if (this.options.angularVelocityCap)
        body.angularVelocity.cap(this.options.angularVelocityCap).put(body.angularVelocity);
}
function _updateOrientations(body, dt) {
    body.integrateOrientation(dt);
}
function _updatePositions(body, dt) {
    body.integratePosition(dt);
    body.emit(_events.update, body);
}
function _integrate(dt) {
    _updateForces.call(this, dt);
    this.forEach(_updateVelocities, dt);
    this.forEachBody(_updateAngularVelocities, dt);
    _updateConstraints.call(this, dt);
    this.forEachBody(_updateOrientations, dt);
    this.forEach(_updatePositions, dt);
}
function _getParticlesEnergy() {
    var energy = 0;
    var particleEnergy = 0;
    this.forEach(function (particle) {
        particleEnergy = particle.getEnergy();
        energy += particleEnergy;
    });
    return energy;
}
function _getAgentsEnergy() {
    var energy = 0;
    for (var id in this._agentData)
        energy += this.getAgentEnergy(id);
    return energy;
}
PhysicsEngine.prototype.getAgentEnergy = function (agentId) {
    var agentData = _getAgentData.call(this, agentId);
    return agentData.agent.getEnergy(agentData.targets, agentData.source);
};
PhysicsEngine.prototype.getEnergy = function getEnergy() {
    return _getParticlesEnergy.call(this) + _getAgentsEnergy.call(this);
};
PhysicsEngine.prototype.step = function step() {
    if (this.isSleeping())
        return;
    var currTime = now();
    var dtFrame = currTime - this._prevTime;
    this._prevTime = currTime;
    if (dtFrame < MIN_TIME_STEP)
        return;
    if (dtFrame > MAX_TIME_STEP)
        dtFrame = MAX_TIME_STEP;
    _integrate.call(this, TIMESTEP);
    this.emit(_events.update, this);
    if (this.getEnergy() < this.options.sleepTolerance)
        this.sleep();
};
PhysicsEngine.prototype.isSleeping = function isSleeping() {
    return this._isSleeping;
};
PhysicsEngine.prototype.isActive = function isSleeping() {
    return !this._isSleeping;
};
PhysicsEngine.prototype.sleep = function sleep() {
    if (this._isSleeping)
        return;
    this.forEach(function (body) {
        body.sleep();
    });
    this.emit(_events.end, this);
    this._isSleeping = true;
};
PhysicsEngine.prototype.wake = function wake() {
    if (!this._isSleeping)
        return;
    this._prevTime = now();
    this.emit(_events.start, this);
    this._isSleeping = false;
};
PhysicsEngine.prototype.emit = function emit(type, data) {
    if (this._eventHandler === null)
        return;
    this._eventHandler.emit(type, data);
};
PhysicsEngine.prototype.on = function on(event, fn) {
    if (this._eventHandler === null)
        this._eventHandler = new EventHandler();
    this._eventHandler.on(event, fn);
};
module.exports = PhysicsEngine;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\physics\\PhysicsEngine.js","/..\\node_modules\\famous\\physics")
},{"../core/EventHandler":11,"VCmEsw":43,"buffer":40}],25:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Vector = require('../../math/Vector');
var Transform = require('../../core/Transform');
var EventHandler = require('../../core/EventHandler');
var Integrator = require('../integrators/SymplecticEuler');
function Particle(options) {
    options = options || {};
    var defaults = Particle.DEFAULT_OPTIONS;
    this.position = new Vector();
    this.velocity = new Vector();
    this.force = new Vector();
    this._engine = null;
    this._isSleeping = true;
    this._eventOutput = null;
    this.mass = options.mass !== undefined ? options.mass : defaults.mass;
    this.inverseMass = 1 / this.mass;
    this.setPosition(options.position || defaults.position);
    this.setVelocity(options.velocity || defaults.velocity);
    this.force.set(options.force || [
        0,
        0,
        0
    ]);
    this.transform = Transform.identity.slice();
    this._spec = {
        size: [
            true,
            true
        ],
        target: {
            transform: this.transform,
            origin: [
                0.5,
                0.5
            ],
            target: null
        }
    };
}
Particle.DEFAULT_OPTIONS = {
    position: [
        0,
        0,
        0
    ],
    velocity: [
        0,
        0,
        0
    ],
    mass: 1
};
var _events = {
    start: 'start',
    update: 'update',
    end: 'end'
};
var now = Date.now;
Particle.prototype.isBody = false;
Particle.prototype.isActive = function isActive() {
    return !this._isSleeping;
};
Particle.prototype.sleep = function sleep() {
    if (this._isSleeping)
        return;
    this.emit(_events.end, this);
    this._isSleeping = true;
};
Particle.prototype.wake = function wake() {
    if (!this._isSleeping)
        return;
    this.emit(_events.start, this);
    this._isSleeping = false;
    this._prevTime = now();
    if (this._engine)
        this._engine.wake();
};
Particle.prototype.setPosition = function setPosition(position) {
    this.position.set(position);
};
Particle.prototype.setPosition1D = function setPosition1D(x) {
    this.position.x = x;
};
Particle.prototype.getPosition = function getPosition() {
    this._engine.step();
    return this.position.get();
};
Particle.prototype.getPosition1D = function getPosition1D() {
    this._engine.step();
    return this.position.x;
};
Particle.prototype.setVelocity = function setVelocity(velocity) {
    this.velocity.set(velocity);
    if (!(velocity[0] === 0 && velocity[1] === 0 && velocity[2] === 0))
        this.wake();
};
Particle.prototype.setVelocity1D = function setVelocity1D(x) {
    this.velocity.x = x;
    if (x !== 0)
        this.wake();
};
Particle.prototype.getVelocity = function getVelocity() {
    return this.velocity.get();
};
Particle.prototype.setForce = function setForce(force) {
    this.force.set(force);
    this.wake();
};
Particle.prototype.getVelocity1D = function getVelocity1D() {
    return this.velocity.x;
};
Particle.prototype.setMass = function setMass(mass) {
    this.mass = mass;
    this.inverseMass = 1 / mass;
};
Particle.prototype.getMass = function getMass() {
    return this.mass;
};
Particle.prototype.reset = function reset(position, velocity) {
    this.setPosition(position || [
        0,
        0,
        0
    ]);
    this.setVelocity(velocity || [
        0,
        0,
        0
    ]);
};
Particle.prototype.applyForce = function applyForce(force) {
    if (force.isZero())
        return;
    this.force.add(force).put(this.force);
    this.wake();
};
Particle.prototype.applyImpulse = function applyImpulse(impulse) {
    if (impulse.isZero())
        return;
    var velocity = this.velocity;
    velocity.add(impulse.mult(this.inverseMass)).put(velocity);
};
Particle.prototype.integrateVelocity = function integrateVelocity(dt) {
    Integrator.integrateVelocity(this, dt);
};
Particle.prototype.integratePosition = function integratePosition(dt) {
    Integrator.integratePosition(this, dt);
};
Particle.prototype._integrate = function _integrate(dt) {
    this.integrateVelocity(dt);
    this.integratePosition(dt);
};
Particle.prototype.getEnergy = function getEnergy() {
    return 0.5 * this.mass * this.velocity.normSquared();
};
Particle.prototype.getTransform = function getTransform() {
    this._engine.step();
    var position = this.position;
    var transform = this.transform;
    transform[12] = position.x;
    transform[13] = position.y;
    transform[14] = position.z;
    return transform;
};
Particle.prototype.modify = function modify(target) {
    var _spec = this._spec.target;
    _spec.transform = this.getTransform();
    _spec.target = target;
    return this._spec;
};
function _createEventOutput() {
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Particle.prototype.emit = function emit(type, data) {
    if (!this._eventOutput)
        return;
    this._eventOutput.emit(type, data);
};
Particle.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
Particle.prototype.removeListener = function removeListener() {
    _createEventOutput.call(this);
    return this.removeListener.apply(this, arguments);
};
Particle.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
Particle.prototype.unpipe = function unpipe() {
    _createEventOutput.call(this);
    return this.unpipe.apply(this, arguments);
};
module.exports = Particle;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\physics\\bodies\\Particle.js","/..\\node_modules\\famous\\physics\\bodies")
},{"../../core/EventHandler":11,"../../core/Transform":18,"../../math/Vector":22,"../integrators/SymplecticEuler":29,"VCmEsw":43,"buffer":40}],26:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Force = require('./Force');
function Drag(options) {
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    Force.call(this);
}
Drag.prototype = Object.create(Force.prototype);
Drag.prototype.constructor = Drag;
Drag.FORCE_FUNCTIONS = {
    LINEAR: function (velocity) {
        return velocity;
    },
    QUADRATIC: function (velocity) {
        return velocity.mult(velocity.norm());
    }
};
Drag.DEFAULT_OPTIONS = {
    strength: 0.01,
    forceFunction: Drag.FORCE_FUNCTIONS.LINEAR
};
Drag.prototype.applyForce = function applyForce(targets) {
    var strength = this.options.strength;
    var forceFunction = this.options.forceFunction;
    var force = this.force;
    var index;
    var particle;
    for (index = 0; index < targets.length; index++) {
        particle = targets[index];
        forceFunction(particle.velocity).mult(-strength).put(force);
        particle.applyForce(force);
    }
};
Drag.prototype.setOptions = function setOptions(options) {
    for (var key in options)
        this.options[key] = options[key];
};
module.exports = Drag;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\physics\\forces\\Drag.js","/..\\node_modules\\famous\\physics\\forces")
},{"./Force":27,"VCmEsw":43,"buffer":40}],27:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Vector = require('../../math/Vector');
var EventHandler = require('../../core/EventHandler');
function Force(force) {
    this.force = new Vector(force);
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Force.prototype.setOptions = function setOptions(options) {
    this._eventOutput.emit('change', options);
};
Force.prototype.applyForce = function applyForce(targets) {
    var length = targets.length;
    while (length--) {
        targets[length].applyForce(this.force);
    }
};
Force.prototype.getEnergy = function getEnergy() {
    return 0;
};
module.exports = Force;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\physics\\forces\\Force.js","/..\\node_modules\\famous\\physics\\forces")
},{"../../core/EventHandler":11,"../../math/Vector":22,"VCmEsw":43,"buffer":40}],28:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Force = require('./Force');
var Vector = require('../../math/Vector');
function Spring(options) {
    Force.call(this);
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.disp = new Vector(0, 0, 0);
    _init.call(this);
}
Spring.prototype = Object.create(Force.prototype);
Spring.prototype.constructor = Spring;
var pi = Math.PI;
var MIN_PERIOD = 150;
Spring.FORCE_FUNCTIONS = {
    FENE: function (dist, rMax) {
        var rMaxSmall = rMax * 0.99;
        var r = Math.max(Math.min(dist, rMaxSmall), -rMaxSmall);
        return r / (1 - r * r / (rMax * rMax));
    },
    HOOK: function (dist) {
        return dist;
    }
};
Spring.DEFAULT_OPTIONS = {
    period: 300,
    dampingRatio: 0.1,
    length: 0,
    maxLength: Infinity,
    anchor: undefined,
    forceFunction: Spring.FORCE_FUNCTIONS.HOOK
};
function _calcStiffness() {
    var options = this.options;
    options.stiffness = Math.pow(2 * pi / options.period, 2);
}
function _calcDamping() {
    var options = this.options;
    options.damping = 4 * pi * options.dampingRatio / options.period;
}
function _init() {
    _calcStiffness.call(this);
    _calcDamping.call(this);
}
Spring.prototype.setOptions = function setOptions(options) {
    if (options.anchor !== undefined) {
        if (options.anchor.position instanceof Vector)
            this.options.anchor = options.anchor.position;
        if (options.anchor instanceof Vector)
            this.options.anchor = options.anchor;
        if (options.anchor instanceof Array)
            this.options.anchor = new Vector(options.anchor);
    }
    if (options.period !== undefined) {
        if (options.period < MIN_PERIOD) {
            options.period = MIN_PERIOD;
            console.warn('The period of a SpringTransition is capped at ' + MIN_PERIOD + ' ms. Use a SnapTransition for faster transitions');
        }
        this.options.period = options.period;
    }
    if (options.dampingRatio !== undefined)
        this.options.dampingRatio = options.dampingRatio;
    if (options.length !== undefined)
        this.options.length = options.length;
    if (options.forceFunction !== undefined)
        this.options.forceFunction = options.forceFunction;
    if (options.maxLength !== undefined)
        this.options.maxLength = options.maxLength;
    _init.call(this);
    Force.prototype.setOptions.call(this, options);
};
Spring.prototype.applyForce = function applyForce(targets, source) {
    var force = this.force;
    var disp = this.disp;
    var options = this.options;
    var stiffness = options.stiffness;
    var damping = options.damping;
    var restLength = options.length;
    var maxLength = options.maxLength;
    var anchor = options.anchor || source.position;
    var forceFunction = options.forceFunction;
    var i;
    var target;
    var p2;
    var v2;
    var dist;
    var m;
    for (i = 0; i < targets.length; i++) {
        target = targets[i];
        p2 = target.position;
        v2 = target.velocity;
        anchor.sub(p2).put(disp);
        dist = disp.norm() - restLength;
        if (dist === 0)
            return;
        m = target.mass;
        stiffness *= m;
        damping *= m;
        disp.normalize(stiffness * forceFunction(dist, maxLength)).put(force);
        if (damping)
            if (source)
                force.add(v2.sub(source.velocity).mult(-damping)).put(force);
            else
                force.add(v2.mult(-damping)).put(force);
        target.applyForce(force);
        if (source)
            source.applyForce(force.mult(-1));
    }
};
Spring.prototype.getEnergy = function getEnergy(targets, source) {
    var options = this.options;
    var restLength = options.length;
    var anchor = source ? source.position : options.anchor;
    var strength = options.stiffness;
    var energy = 0;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var dist = anchor.sub(target.position).norm() - restLength;
        energy += 0.5 * strength * dist * dist;
    }
    return energy;
};
module.exports = Spring;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\physics\\forces\\Spring.js","/..\\node_modules\\famous\\physics\\forces")
},{"../../math/Vector":22,"./Force":27,"VCmEsw":43,"buffer":40}],29:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var SymplecticEuler = {};
SymplecticEuler.integrateVelocity = function integrateVelocity(body, dt) {
    var v = body.velocity;
    var w = body.inverseMass;
    var f = body.force;
    if (f.isZero())
        return;
    v.add(f.mult(dt * w)).put(v);
    f.clear();
};
SymplecticEuler.integratePosition = function integratePosition(body, dt) {
    var p = body.position;
    var v = body.velocity;
    p.add(v.mult(dt)).put(p);
};
SymplecticEuler.integrateAngularMomentum = function integrateAngularMomentum(body, dt) {
    var L = body.angularMomentum;
    var t = body.torque;
    if (t.isZero())
        return;
    L.add(t.mult(dt)).put(L);
    t.clear();
};
SymplecticEuler.integrateOrientation = function integrateOrientation(body, dt) {
    var q = body.orientation;
    var w = body.angularVelocity;
    if (w.isZero())
        return;
    q.add(q.multiply(w).scalarMultiply(0.5 * dt)).put(q);
};
module.exports = SymplecticEuler;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\physics\\integrators\\SymplecticEuler.js","/..\\node_modules\\famous\\physics\\integrators")
},{"VCmEsw":43,"buffer":40}],30:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Surface = require('../core/Surface');
var Context = require('../core/Context');
function ContainerSurface(options) {
    Surface.call(this, options);
    this._container = document.createElement('div');
    this._container.classList.add('famous-group');
    this._container.classList.add('famous-container-group');
    this._shouldRecalculateSize = false;
    this.context = new Context(this._container);
    this.setContent(this._container);
}
ContainerSurface.prototype = Object.create(Surface.prototype);
ContainerSurface.prototype.constructor = ContainerSurface;
ContainerSurface.prototype.elementType = 'div';
ContainerSurface.prototype.elementClass = 'famous-surface';
ContainerSurface.prototype.add = function add() {
    return this.context.add.apply(this.context, arguments);
};
ContainerSurface.prototype.render = function render() {
    if (this._sizeDirty)
        this._shouldRecalculateSize = true;
    return Surface.prototype.render.apply(this, arguments);
};
ContainerSurface.prototype.deploy = function deploy() {
    this._shouldRecalculateSize = true;
    return Surface.prototype.deploy.apply(this, arguments);
};
ContainerSurface.prototype.commit = function commit(context, transform, opacity, origin, size) {
    var previousSize = this._size ? [
        this._size[0],
        this._size[1]
    ] : null;
    var result = Surface.prototype.commit.apply(this, arguments);
    if (this._shouldRecalculateSize || previousSize && (this._size[0] !== previousSize[0] || this._size[1] !== previousSize[1])) {
        this.context.setSize();
        this._shouldRecalculateSize = false;
    }
    this.context.update();
    return result;
};
module.exports = ContainerSurface;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\surfaces\\ContainerSurface.js","/..\\node_modules\\famous\\surfaces")
},{"../core/Context":5,"../core/Surface":17,"VCmEsw":43,"buffer":40}],31:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Surface = require('../core/Surface');
function ImageSurface(options) {
    this._imageUrl = undefined;
    Surface.apply(this, arguments);
}
var urlCache = [];
var countCache = [];
var nodeCache = [];
var cacheEnabled = true;
ImageSurface.enableCache = function enableCache() {
    cacheEnabled = true;
};
ImageSurface.disableCache = function disableCache() {
    cacheEnabled = false;
};
ImageSurface.clearCache = function clearCache() {
    urlCache = [];
    countCache = [];
    nodeCache = [];
};
ImageSurface.getCache = function getCache() {
    return {
        urlCache: urlCache,
        countCache: countCache,
        nodeCache: nodeCache
    };
};
ImageSurface.prototype = Object.create(Surface.prototype);
ImageSurface.prototype.constructor = ImageSurface;
ImageSurface.prototype.elementType = 'img';
ImageSurface.prototype.elementClass = 'famous-surface';
ImageSurface.prototype.setContent = function setContent(imageUrl) {
    var urlIndex = urlCache.indexOf(this._imageUrl);
    if (urlIndex !== -1) {
        if (countCache[urlIndex] === 1) {
            urlCache.splice(urlIndex, 1);
            countCache.splice(urlIndex, 1);
            nodeCache.splice(urlIndex, 1);
        } else {
            countCache[urlIndex]--;
        }
    }
    urlIndex = urlCache.indexOf(imageUrl);
    if (urlIndex === -1) {
        urlCache.push(imageUrl);
        countCache.push(1);
    } else {
        countCache[urlIndex]++;
    }
    this._imageUrl = imageUrl;
    this._contentDirty = true;
};
ImageSurface.prototype.deploy = function deploy(target) {
    var urlIndex = urlCache.indexOf(this._imageUrl);
    if (nodeCache[urlIndex] === undefined && cacheEnabled) {
        var img = new Image();
        img.src = this._imageUrl || '';
        nodeCache[urlIndex] = img;
    }
    target.src = this._imageUrl || '';
};
ImageSurface.prototype.recall = function recall(target) {
    target.src = '';
};
module.exports = ImageSurface;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\surfaces\\ImageSurface.js","/..\\node_modules\\famous\\surfaces")
},{"../core/Surface":17,"VCmEsw":43,"buffer":40}],32:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Easing = {
    inQuad: function (t) {
        return t * t;
    },
    outQuad: function (t) {
        return -(t -= 1) * t + 1;
    },
    inOutQuad: function (t) {
        if ((t /= 0.5) < 1)
            return 0.5 * t * t;
        return -0.5 * (--t * (t - 2) - 1);
    },
    inCubic: function (t) {
        return t * t * t;
    },
    outCubic: function (t) {
        return --t * t * t + 1;
    },
    inOutCubic: function (t) {
        if ((t /= 0.5) < 1)
            return 0.5 * t * t * t;
        return 0.5 * ((t -= 2) * t * t + 2);
    },
    inQuart: function (t) {
        return t * t * t * t;
    },
    outQuart: function (t) {
        return -(--t * t * t * t - 1);
    },
    inOutQuart: function (t) {
        if ((t /= 0.5) < 1)
            return 0.5 * t * t * t * t;
        return -0.5 * ((t -= 2) * t * t * t - 2);
    },
    inQuint: function (t) {
        return t * t * t * t * t;
    },
    outQuint: function (t) {
        return --t * t * t * t * t + 1;
    },
    inOutQuint: function (t) {
        if ((t /= 0.5) < 1)
            return 0.5 * t * t * t * t * t;
        return 0.5 * ((t -= 2) * t * t * t * t + 2);
    },
    inSine: function (t) {
        return -1 * Math.cos(t * (Math.PI / 2)) + 1;
    },
    outSine: function (t) {
        return Math.sin(t * (Math.PI / 2));
    },
    inOutSine: function (t) {
        return -0.5 * (Math.cos(Math.PI * t) - 1);
    },
    inExpo: function (t) {
        return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
    },
    outExpo: function (t) {
        return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
    },
    inOutExpo: function (t) {
        if (t === 0)
            return 0;
        if (t === 1)
            return 1;
        if ((t /= 0.5) < 1)
            return 0.5 * Math.pow(2, 10 * (t - 1));
        return 0.5 * (-Math.pow(2, -10 * --t) + 2);
    },
    inCirc: function (t) {
        return -(Math.sqrt(1 - t * t) - 1);
    },
    outCirc: function (t) {
        return Math.sqrt(1 - --t * t);
    },
    inOutCirc: function (t) {
        if ((t /= 0.5) < 1)
            return -0.5 * (Math.sqrt(1 - t * t) - 1);
        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    },
    inElastic: function (t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0)
            return 0;
        if (t === 1)
            return 1;
        if (!p)
            p = 0.3;
        s = p / (2 * Math.PI) * Math.asin(1 / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
    },
    outElastic: function (t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0)
            return 0;
        if (t === 1)
            return 1;
        if (!p)
            p = 0.3;
        s = p / (2 * Math.PI) * Math.asin(1 / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
    },
    inOutElastic: function (t) {
        var s = 1.70158;
        var p = 0;
        var a = 1;
        if (t === 0)
            return 0;
        if ((t /= 0.5) === 2)
            return 1;
        if (!p)
            p = 0.3 * 1.5;
        s = p / (2 * Math.PI) * Math.asin(1 / a);
        if (t < 1)
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
    },
    inBack: function (t, s) {
        if (s === undefined)
            s = 1.70158;
        return t * t * ((s + 1) * t - s);
    },
    outBack: function (t, s) {
        if (s === undefined)
            s = 1.70158;
        return --t * t * ((s + 1) * t + s) + 1;
    },
    inOutBack: function (t, s) {
        if (s === undefined)
            s = 1.70158;
        if ((t /= 0.5) < 1)
            return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
        return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
    },
    inBounce: function (t) {
        return 1 - Easing.outBounce(1 - t);
    },
    outBounce: function (t) {
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        } else {
            return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
    },
    inOutBounce: function (t) {
        if (t < 0.5)
            return Easing.inBounce(t * 2) * 0.5;
        return Easing.outBounce(t * 2 - 1) * 0.5 + 0.5;
    }
};
module.exports = Easing;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\transitions\\Easing.js","/..\\node_modules\\famous\\transitions")
},{"VCmEsw":43,"buffer":40}],33:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Utility = require('../utilities/Utility');
function MultipleTransition(method) {
    this.method = method;
    this._instances = [];
    this.state = [];
}
MultipleTransition.SUPPORTS_MULTIPLE = true;
MultipleTransition.prototype.get = function get() {
    for (var i = 0; i < this._instances.length; i++) {
        this.state[i] = this._instances[i].get();
    }
    return this.state;
};
MultipleTransition.prototype.set = function set(endState, transition, callback) {
    var _allCallback = Utility.after(endState.length, callback);
    for (var i = 0; i < endState.length; i++) {
        if (!this._instances[i])
            this._instances[i] = new this.method();
        this._instances[i].set(endState[i], transition, _allCallback);
    }
};
MultipleTransition.prototype.reset = function reset(startState) {
    for (var i = 0; i < startState.length; i++) {
        if (!this._instances[i])
            this._instances[i] = new this.method();
        this._instances[i].reset(startState[i]);
    }
};
module.exports = MultipleTransition;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\transitions\\MultipleTransition.js","/..\\node_modules\\famous\\transitions")
},{"../utilities/Utility":38,"VCmEsw":43,"buffer":40}],34:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var PE = require('../physics/PhysicsEngine');
var Particle = require('../physics/bodies/Particle');
var Spring = require('../physics/forces/Spring');
var Vector = require('../math/Vector');
function SpringTransition(state) {
    state = state || 0;
    this.endState = new Vector(state);
    this.initState = new Vector();
    this._dimensions = undefined;
    this._restTolerance = 1e-10;
    this._absRestTolerance = this._restTolerance;
    this._callback = undefined;
    this.PE = new PE();
    this.spring = new Spring({ anchor: this.endState });
    this.particle = new Particle();
    this.PE.addBody(this.particle);
    this.PE.attach(this.spring, this.particle);
}
SpringTransition.SUPPORTS_MULTIPLE = 3;
SpringTransition.DEFAULT_OPTIONS = {
    period: 300,
    dampingRatio: 0.5,
    velocity: 0
};
function _getEnergy() {
    return this.particle.getEnergy() + this.spring.getEnergy([this.particle]);
}
function _setParticlePosition(p) {
    this.particle.setPosition(p);
}
function _setParticleVelocity(v) {
    this.particle.setVelocity(v);
}
function _getParticlePosition() {
    return this._dimensions === 0 ? this.particle.getPosition1D() : this.particle.getPosition();
}
function _getParticleVelocity() {
    return this._dimensions === 0 ? this.particle.getVelocity1D() : this.particle.getVelocity();
}
function _setCallback(callback) {
    this._callback = callback;
}
function _wake() {
    this.PE.wake();
}
function _sleep() {
    this.PE.sleep();
}
function _update() {
    if (this.PE.isSleeping()) {
        if (this._callback) {
            var cb = this._callback;
            this._callback = undefined;
            cb();
        }
        return;
    }
    if (_getEnergy.call(this) < this._absRestTolerance) {
        _setParticlePosition.call(this, this.endState);
        _setParticleVelocity.call(this, [
            0,
            0,
            0
        ]);
        _sleep.call(this);
    }
}
function _setupDefinition(definition) {
    var defaults = SpringTransition.DEFAULT_OPTIONS;
    if (definition.period === undefined)
        definition.period = defaults.period;
    if (definition.dampingRatio === undefined)
        definition.dampingRatio = defaults.dampingRatio;
    if (definition.velocity === undefined)
        definition.velocity = defaults.velocity;
    if (definition.period < 150) {
        definition.period = 150;
        console.warn('The period of a SpringTransition is capped at 150 ms. Use a SnapTransition for faster transitions');
    }
    this.spring.setOptions({
        period: definition.period,
        dampingRatio: definition.dampingRatio
    });
    _setParticleVelocity.call(this, definition.velocity);
}
function _setAbsoluteRestTolerance() {
    var distance = this.endState.sub(this.initState).normSquared();
    this._absRestTolerance = distance === 0 ? this._restTolerance : this._restTolerance * distance;
}
function _setTarget(target) {
    this.endState.set(target);
    _setAbsoluteRestTolerance.call(this);
}
SpringTransition.prototype.reset = function reset(pos, vel) {
    this._dimensions = pos instanceof Array ? pos.length : 0;
    this.initState.set(pos);
    _setParticlePosition.call(this, pos);
    _setTarget.call(this, pos);
    if (vel)
        _setParticleVelocity.call(this, vel);
    _setCallback.call(this, undefined);
};
SpringTransition.prototype.getVelocity = function getVelocity() {
    return _getParticleVelocity.call(this);
};
SpringTransition.prototype.setVelocity = function setVelocity(v) {
    this.call(this, _setParticleVelocity(v));
};
SpringTransition.prototype.isActive = function isActive() {
    return !this.PE.isSleeping();
};
SpringTransition.prototype.halt = function halt() {
    this.set(this.get());
};
SpringTransition.prototype.get = function get() {
    _update.call(this);
    return _getParticlePosition.call(this);
};
SpringTransition.prototype.set = function set(endState, definition, callback) {
    if (!definition) {
        this.reset(endState);
        if (callback)
            callback();
        return;
    }
    this._dimensions = endState instanceof Array ? endState.length : 0;
    _wake.call(this);
    _setupDefinition.call(this, definition);
    _setTarget.call(this, endState);
    _setCallback.call(this, callback);
};
module.exports = SpringTransition;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\transitions\\SpringTransition.js","/..\\node_modules\\famous\\transitions")
},{"../math/Vector":22,"../physics/PhysicsEngine":24,"../physics/bodies/Particle":25,"../physics/forces/Spring":28,"VCmEsw":43,"buffer":40}],35:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var MultipleTransition = require('./MultipleTransition');
var TweenTransition = require('./TweenTransition');
function Transitionable(start) {
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];
    this.state = 0;
    this.velocity = undefined;
    this._callback = undefined;
    this._engineInstance = null;
    this._currentMethod = null;
    this.set(start);
}
var transitionMethods = {};
Transitionable.register = function register(methods) {
    var success = true;
    for (var method in methods) {
        if (!Transitionable.registerMethod(method, methods[method]))
            success = false;
    }
    return success;
};
Transitionable.registerMethod = function registerMethod(name, engineClass) {
    if (!(name in transitionMethods)) {
        transitionMethods[name] = engineClass;
        return true;
    } else
        return false;
};
Transitionable.unregisterMethod = function unregisterMethod(name) {
    if (name in transitionMethods) {
        delete transitionMethods[name];
        return true;
    } else
        return false;
};
function _loadNext() {
    if (this._callback) {
        var callback = this._callback;
        this._callback = undefined;
        callback();
    }
    if (this.actionQueue.length <= 0) {
        this.set(this.get());
        return;
    }
    this.currentAction = this.actionQueue.shift();
    this._callback = this.callbackQueue.shift();
    var method = null;
    var endValue = this.currentAction[0];
    var transition = this.currentAction[1];
    if (transition instanceof Object && transition.method) {
        method = transition.method;
        if (typeof method === 'string')
            method = transitionMethods[method];
    } else {
        method = TweenTransition;
    }
    if (this._currentMethod !== method) {
        if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
            this._engineInstance = new method();
        } else {
            this._engineInstance = new MultipleTransition(method);
        }
        this._currentMethod = method;
    }
    this._engineInstance.reset(this.state, this.velocity);
    if (this.velocity !== undefined)
        transition.velocity = this.velocity;
    this._engineInstance.set(endValue, transition, _loadNext.bind(this));
}
Transitionable.prototype.set = function set(endState, transition, callback) {
    if (!transition) {
        this.reset(endState);
        if (callback)
            callback();
        return this;
    }
    var action = [
        endState,
        transition
    ];
    this.actionQueue.push(action);
    this.callbackQueue.push(callback);
    if (!this.currentAction)
        _loadNext.call(this);
    return this;
};
Transitionable.prototype.reset = function reset(startState, startVelocity) {
    this._currentMethod = null;
    this._engineInstance = null;
    this._callback = undefined;
    this.state = startState;
    this.velocity = startVelocity;
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];
};
Transitionable.prototype.delay = function delay(duration, callback) {
    var endValue;
    if (this.actionQueue.length)
        endValue = this.actionQueue[this.actionQueue.length - 1][0];
    else if (this.currentAction)
        endValue = this.currentAction[0];
    else
        endValue = this.get();
    return this.set(endValue, {
        duration: duration,
        curve: function () {
            return 0;
        }
    }, callback);
};
Transitionable.prototype.get = function get(timestamp) {
    if (this._engineInstance) {
        if (this._engineInstance.getVelocity)
            this.velocity = this._engineInstance.getVelocity();
        this.state = this._engineInstance.get(timestamp);
    }
    return this.state;
};
Transitionable.prototype.isActive = function isActive() {
    return !!this.currentAction;
};
Transitionable.prototype.halt = function halt() {
    return this.set(this.get());
};
module.exports = Transitionable;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\transitions\\Transitionable.js","/..\\node_modules\\famous\\transitions")
},{"./MultipleTransition":33,"./TweenTransition":37,"VCmEsw":43,"buffer":40}],36:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Transitionable = require('./Transitionable');
var Transform = require('../core/Transform');
var Utility = require('../utilities/Utility');
function TransitionableTransform(transform) {
    this._final = Transform.identity.slice();
    this._finalTranslate = [
        0,
        0,
        0
    ];
    this._finalRotate = [
        0,
        0,
        0
    ];
    this._finalSkew = [
        0,
        0,
        0
    ];
    this._finalScale = [
        1,
        1,
        1
    ];
    this.translate = new Transitionable(this._finalTranslate);
    this.rotate = new Transitionable(this._finalRotate);
    this.skew = new Transitionable(this._finalSkew);
    this.scale = new Transitionable(this._finalScale);
    if (transform)
        this.set(transform);
}
function _build() {
    return Transform.build({
        translate: this.translate.get(),
        rotate: this.rotate.get(),
        skew: this.skew.get(),
        scale: this.scale.get()
    });
}
function _buildFinal() {
    return Transform.build({
        translate: this._finalTranslate,
        rotate: this._finalRotate,
        skew: this._finalSkew,
        scale: this._finalScale
    });
}
TransitionableTransform.prototype.setTranslate = function setTranslate(translate, transition, callback) {
    this._finalTranslate = translate;
    this._final = _buildFinal.call(this);
    this.translate.set(translate, transition, callback);
    return this;
};
TransitionableTransform.prototype.setScale = function setScale(scale, transition, callback) {
    this._finalScale = scale;
    this._final = _buildFinal.call(this);
    this.scale.set(scale, transition, callback);
    return this;
};
TransitionableTransform.prototype.setRotate = function setRotate(eulerAngles, transition, callback) {
    this._finalRotate = eulerAngles;
    this._final = _buildFinal.call(this);
    this.rotate.set(eulerAngles, transition, callback);
    return this;
};
TransitionableTransform.prototype.setSkew = function setSkew(skewAngles, transition, callback) {
    this._finalSkew = skewAngles;
    this._final = _buildFinal.call(this);
    this.skew.set(skewAngles, transition, callback);
    return this;
};
TransitionableTransform.prototype.set = function set(transform, transition, callback) {
    var components = Transform.interpret(transform);
    this._finalTranslate = components.translate;
    this._finalRotate = components.rotate;
    this._finalSkew = components.skew;
    this._finalScale = components.scale;
    this._final = transform;
    var _callback = callback ? Utility.after(4, callback) : null;
    this.translate.set(components.translate, transition, _callback);
    this.rotate.set(components.rotate, transition, _callback);
    this.skew.set(components.skew, transition, _callback);
    this.scale.set(components.scale, transition, _callback);
    return this;
};
TransitionableTransform.prototype.setDefaultTransition = function setDefaultTransition(transition) {
    this.translate.setDefault(transition);
    this.rotate.setDefault(transition);
    this.skew.setDefault(transition);
    this.scale.setDefault(transition);
};
TransitionableTransform.prototype.get = function get() {
    if (this.isActive()) {
        return _build.call(this);
    } else
        return this._final;
};
TransitionableTransform.prototype.getFinal = function getFinal() {
    return this._final;
};
TransitionableTransform.prototype.isActive = function isActive() {
    return this.translate.isActive() || this.rotate.isActive() || this.scale.isActive() || this.skew.isActive();
};
TransitionableTransform.prototype.halt = function halt() {
    this.translate.halt();
    this.rotate.halt();
    this.skew.halt();
    this.scale.halt();
    this._final = this.get();
    this._finalTranslate = this.translate.get();
    this._finalRotate = this.rotate.get();
    this._finalSkew = this.skew.get();
    this._finalScale = this.scale.get();
    return this;
};
module.exports = TransitionableTransform;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\transitions\\TransitionableTransform.js","/..\\node_modules\\famous\\transitions")
},{"../core/Transform":18,"../utilities/Utility":38,"./Transitionable":35,"VCmEsw":43,"buffer":40}],37:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
function TweenTransition(options) {
    this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this._startTime = 0;
    this._startValue = 0;
    this._updateTime = 0;
    this._endValue = 0;
    this._curve = undefined;
    this._duration = 0;
    this._active = false;
    this._callback = undefined;
    this.state = 0;
    this.velocity = undefined;
}
TweenTransition.Curves = {
    linear: function (t) {
        return t;
    },
    easeIn: function (t) {
        return t * t;
    },
    easeOut: function (t) {
        return t * (2 - t);
    },
    easeInOut: function (t) {
        if (t <= 0.5)
            return 2 * t * t;
        else
            return -2 * t * t + 4 * t - 1;
    },
    easeOutBounce: function (t) {
        return t * (3 - 2 * t);
    },
    spring: function (t) {
        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
    }
};
TweenTransition.SUPPORTS_MULTIPLE = true;
TweenTransition.DEFAULT_OPTIONS = {
    curve: TweenTransition.Curves.linear,
    duration: 500,
    speed: 0
};
var registeredCurves = {};
TweenTransition.registerCurve = function registerCurve(curveName, curve) {
    if (!registeredCurves[curveName]) {
        registeredCurves[curveName] = curve;
        return true;
    } else {
        return false;
    }
};
TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
    if (registeredCurves[curveName]) {
        delete registeredCurves[curveName];
        return true;
    } else {
        return false;
    }
};
TweenTransition.getCurve = function getCurve(curveName) {
    var curve = registeredCurves[curveName];
    if (curve !== undefined)
        return curve;
    else
        throw new Error('curve not registered');
};
TweenTransition.getCurves = function getCurves() {
    return registeredCurves;
};
function _interpolate(a, b, t) {
    return (1 - t) * a + t * b;
}
function _clone(obj) {
    if (obj instanceof Object) {
        if (obj instanceof Array)
            return obj.slice(0);
        else
            return Object.create(obj);
    } else
        return obj;
}
function _normalize(transition, defaultTransition) {
    var result = { curve: defaultTransition.curve };
    if (defaultTransition.duration)
        result.duration = defaultTransition.duration;
    if (defaultTransition.speed)
        result.speed = defaultTransition.speed;
    if (transition instanceof Object) {
        if (transition.duration !== undefined)
            result.duration = transition.duration;
        if (transition.curve)
            result.curve = transition.curve;
        if (transition.speed)
            result.speed = transition.speed;
    }
    if (typeof result.curve === 'string')
        result.curve = TweenTransition.getCurve(result.curve);
    return result;
}
TweenTransition.prototype.setOptions = function setOptions(options) {
    if (options.curve !== undefined)
        this.options.curve = options.curve;
    if (options.duration !== undefined)
        this.options.duration = options.duration;
    if (options.speed !== undefined)
        this.options.speed = options.speed;
};
TweenTransition.prototype.set = function set(endValue, transition, callback) {
    if (!transition) {
        this.reset(endValue);
        if (callback)
            callback();
        return;
    }
    this._startValue = _clone(this.get());
    transition = _normalize(transition, this.options);
    if (transition.speed) {
        var startValue = this._startValue;
        if (startValue instanceof Object) {
            var variance = 0;
            for (var i in startValue)
                variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
            transition.duration = Math.sqrt(variance) / transition.speed;
        } else {
            transition.duration = Math.abs(endValue - startValue) / transition.speed;
        }
    }
    this._startTime = Date.now();
    this._endValue = _clone(endValue);
    this._startVelocity = _clone(transition.velocity);
    this._duration = transition.duration;
    this._curve = transition.curve;
    this._active = true;
    this._callback = callback;
};
TweenTransition.prototype.reset = function reset(startValue, startVelocity) {
    if (this._callback) {
        var callback = this._callback;
        this._callback = undefined;
        callback();
    }
    this.state = _clone(startValue);
    this.velocity = _clone(startVelocity);
    this._startTime = 0;
    this._duration = 0;
    this._updateTime = 0;
    this._startValue = this.state;
    this._startVelocity = this.velocity;
    this._endValue = this.state;
    this._active = false;
};
TweenTransition.prototype.getVelocity = function getVelocity() {
    return this.velocity;
};
TweenTransition.prototype.get = function get(timestamp) {
    this.update(timestamp);
    return this.state;
};
function _calculateVelocity(current, start, curve, duration, t) {
    var velocity;
    var eps = 1e-7;
    var speed = (curve(t) - curve(t - eps)) / eps;
    if (current instanceof Array) {
        velocity = [];
        for (var i = 0; i < current.length; i++) {
            if (typeof current[i] === 'number')
                velocity[i] = speed * (current[i] - start[i]) / duration;
            else
                velocity[i] = 0;
        }
    } else
        velocity = speed * (current - start) / duration;
    return velocity;
}
function _calculateState(start, end, t) {
    var state;
    if (start instanceof Array) {
        state = [];
        for (var i = 0; i < start.length; i++) {
            if (typeof start[i] === 'number')
                state[i] = _interpolate(start[i], end[i], t);
            else
                state[i] = start[i];
        }
    } else
        state = _interpolate(start, end, t);
    return state;
}
TweenTransition.prototype.update = function update(timestamp) {
    if (!this._active) {
        if (this._callback) {
            var callback = this._callback;
            this._callback = undefined;
            callback();
        }
        return;
    }
    if (!timestamp)
        timestamp = Date.now();
    if (this._updateTime >= timestamp)
        return;
    this._updateTime = timestamp;
    var timeSinceStart = timestamp - this._startTime;
    if (timeSinceStart >= this._duration) {
        this.state = this._endValue;
        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
        this._active = false;
    } else if (timeSinceStart < 0) {
        this.state = this._startValue;
        this.velocity = this._startVelocity;
    } else {
        var t = timeSinceStart / this._duration;
        this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
    }
};
TweenTransition.prototype.isActive = function isActive() {
    return this._active;
};
TweenTransition.prototype.halt = function halt() {
    this.reset(this.get());
};
TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);
TweenTransition.customCurve = function customCurve(v1, v2) {
    v1 = v1 || 0;
    v2 = v2 || 0;
    return function (t) {
        return v1 * t + (-2 * v1 - v2 + 3) * t * t + (v1 + v2 - 2) * t * t * t;
    };
};
module.exports = TweenTransition;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\transitions\\TweenTransition.js","/..\\node_modules\\famous\\transitions")
},{"VCmEsw":43,"buffer":40}],38:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Utility = {};
Utility.Direction = {
    X: 0,
    Y: 1,
    Z: 2
};
Utility.after = function after(count, callback) {
    var counter = count;
    return function () {
        counter--;
        if (counter === 0)
            callback.apply(this, arguments);
    };
};
Utility.loadURL = function loadURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function onreadystatechange() {
        if (this.readyState === 4) {
            if (callback)
                callback(this.responseText);
        }
    };
    xhr.open('GET', url);
    xhr.send();
};
Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
    var element = document.createElement('div');
    element.innerHTML = html;
    var result = document.createDocumentFragment();
    while (element.hasChildNodes())
        result.appendChild(element.firstChild);
    return result;
};
Utility.clone = function clone(b) {
    var a;
    if (typeof b === 'object') {
        a = b instanceof Array ? [] : {};
        for (var key in b) {
            if (typeof b[key] === 'object' && b[key] !== null) {
                if (b[key] instanceof Array) {
                    a[key] = new Array(b[key].length);
                    for (var i = 0; i < b[key].length; i++) {
                        a[key][i] = Utility.clone(b[key][i]);
                    }
                } else {
                    a[key] = Utility.clone(b[key]);
                }
            } else {
                a[key] = b[key];
            }
        }
    } else {
        a = b;
    }
    return a;
};
module.exports = Utility;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\utilities\\Utility.js","/..\\node_modules\\famous\\utilities")
},{"VCmEsw":43,"buffer":40}],39:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2015
 */
var Entity = require('../core/Entity');
var Transform = require('../core/Transform');
var OptionsManager = require('../core/OptionsManager');
var EventHandler = require('../core/EventHandler');
var Transitionable = require('../transitions/Transitionable');
function FlexibleLayout(options) {
    this.options = Object.create(FlexibleLayout.DEFAULT_OPTIONS);
    this.optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this.id = Entity.register(this);
    this._ratios = new Transitionable(this.options.ratios);
    this._nodes = [];
    this._size = [
        0,
        0
    ];
    this._cachedDirection = null;
    this._cachedLengths = [];
    this._cachedTransforms = null;
    this._ratiosDirty = false;
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
}
FlexibleLayout.DIRECTION_X = 0;
FlexibleLayout.DIRECTION_Y = 1;
FlexibleLayout.DEFAULT_OPTIONS = {
    direction: FlexibleLayout.DIRECTION_X,
    transition: false,
    ratios: []
};
function _reflow(ratios, length, direction) {
    var currTransform;
    var translation = 0;
    var flexLength = length;
    var ratioSum = 0;
    var ratio;
    var node;
    var i;
    this._cachedLengths = [];
    this._cachedTransforms = [];
    for (i = 0; i < ratios.length; i++) {
        ratio = ratios[i];
        node = this._nodes[i];
        if (typeof ratio !== 'number')
            flexLength -= node.getSize()[direction] || 0;
        else
            ratioSum += ratio;
    }
    for (i = 0; i < ratios.length; i++) {
        node = this._nodes[i];
        ratio = ratios[i];
        length = typeof ratio === 'number' ? flexLength * ratio / ratioSum : node.getSize()[direction];
        currTransform = direction === FlexibleLayout.DIRECTION_X ? Transform.translate(translation, 0, 0) : Transform.translate(0, translation, 0);
        this._cachedTransforms.push(currTransform);
        this._cachedLengths.push(length);
        translation += length;
    }
}
function _trueSizedDirty(ratios, direction) {
    for (var i = 0; i < ratios.length; i++) {
        if (typeof ratios[i] !== 'number') {
            if (this._nodes[i].getSize()[direction] !== this._cachedLengths[i])
                return true;
        }
    }
    return false;
}
FlexibleLayout.prototype.render = function render() {
    return this.id;
};
FlexibleLayout.prototype.setOptions = function setOptions(options) {
    this.optionsManager.setOptions(options);
};
FlexibleLayout.prototype.sequenceFrom = function sequenceFrom(sequence) {
    this._nodes = sequence;
    if (this._ratios.get().length === 0) {
        var ratios = [];
        for (var i = 0; i < this._nodes.length; i++)
            ratios.push(1);
        this.setRatios(ratios);
    }
};
FlexibleLayout.prototype.setRatios = function setRatios(ratios, transition, callback) {
    if (transition === undefined)
        transition = this.options.transition;
    var currRatios = this._ratios;
    if (currRatios.get().length === 0)
        transition = undefined;
    if (currRatios.isActive())
        currRatios.halt();
    currRatios.set(ratios, transition, callback);
    this._ratiosDirty = true;
};
FlexibleLayout.prototype.getSize = function getSize() {
    return this._size;
};
FlexibleLayout.prototype.commit = function commit(context) {
    var parentSize = context.size;
    var parentTransform = context.transform;
    var parentOrigin = context.origin;
    var parentOpacity = context.opacity;
    var ratios = this._ratios.get();
    var direction = this.options.direction;
    var length = parentSize[direction];
    var size;
    if (length !== this._size[direction] || this._ratiosDirty || this._ratios.isActive() || direction !== this._cachedDirection || _trueSizedDirty.call(this, ratios, direction)) {
        _reflow.call(this, ratios, length, direction);
        if (length !== this._size[direction]) {
            this._size[0] = parentSize[0];
            this._size[1] = parentSize[1];
        }
        if (direction !== this._cachedDirection)
            this._cachedDirection = direction;
        if (this._ratiosDirty)
            this._ratiosDirty = false;
    }
    var result = [];
    for (var i = 0; i < ratios.length; i++) {
        size = [
            undefined,
            undefined
        ];
        length = this._cachedLengths[i];
        size[direction] = length;
        result.push({
            transform: this._cachedTransforms[i],
            size: size,
            target: this._nodes[i].render()
        });
    }
    if (parentSize && (parentOrigin[0] !== 0 && parentOrigin[1] !== 0))
        parentTransform = Transform.moveThen([
            -parentSize[0] * parentOrigin[0],
            -parentSize[1] * parentOrigin[1],
            0
        ], parentTransform);
    return {
        transform: parentTransform,
        size: parentSize,
        opacity: parentOpacity,
        target: result
    };
};
module.exports = FlexibleLayout;
}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\famous\\views\\FlexibleLayout.js","/..\\node_modules\\famous\\views")
},{"../core/Entity":9,"../core/EventHandler":11,"../core/OptionsManager":14,"../core/Transform":18,"../transitions/Transitionable":35,"VCmEsw":43,"buffer":40}],40:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
  // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
  // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
  // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
  // because we need to be able to add all the node Buffer API methods. This is an issue
  // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // assume that object is array-like
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
    // Speed optimization -- use set if we're copying from a typed array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  var len = end - start

  if (len < 100 || !Buffer._useTypedArrays) {
    for (var i = 0; i < len; i++)
      target[i + target_start] = this[i + start]
  } else {
    target._set(this.subarray(start, start + len), target_start)
  }
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\buffer\\index.js","/..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\buffer")
},{"VCmEsw":43,"base64-js":41,"buffer":40,"ieee754":42}],41:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\buffer\\node_modules\\base64-js\\lib\\b64.js","/..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\buffer\\node_modules\\base64-js\\lib")
},{"VCmEsw":43,"buffer":40}],42:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\buffer\\node_modules\\ieee754\\index.js","/..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\buffer\\node_modules\\ieee754")
},{"VCmEsw":43,"buffer":40}],43:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\process\\browser.js","/..\\node_modules\\gulp-browserify\\node_modules\\browserify\\node_modules\\process")
},{"VCmEsw":43,"buffer":40}],"box":[function(require,module,exports){
module.exports=require('f5ZaBP');
},{}],"f5ZaBP":[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {
/*
|------------------------------------------------
| Box.js
|------------------------------------------------
|
| A cross-browser localStorage wrapper API.
|
| @author     James Brumond
| @version    0.1.1-dev
| @copyright  Copyright 2011 James Brumond
| @license    Dual licensed under MIT and GPL
|
| Original concept based on the work of Marcus Westin in store.js
| @link       https://github.com/marcuswestin/store.js
|
*/

window.Box = (new (function(window, undefined) {
	
	var
	self     = this,
	write    = null,
	read     = null,
	init     = null,
	values   = null,
	win      = window,
	doc      = win.document,
	support  = true,

	/**
	 * Serializes a variable using the given format
	 *
	 * @access  private
	 * @param   mixed     the variable to encode
	 * @param   string    the encoding format (default: 'json')
	 * @return  string
	 */
	encode = function(data, format) {
		if (format == null) {
			var format = 'json';
		}
		switch (format) {
			case 'json':
				return self.JSON.stringify(data);
			break;
			case 'serialize':
				return self.PHPSerial.serialize(data);
			break;
			case 'pickle':
				return self.PickleJS.dumps(data);
			break;
			default:
				throw new Error('Unknown serialization format "' + format + '"');
			break;
		}
	},

	/**
	 * Unserializes a variable using the given format
	 *
	 * @access  private
	 * @param   string    the variable to decode
	 * @param   string    the encoding format (default: 'json')
	 * @return  mixed
	 */
	decode = function(data, format) {
		if (format == null) {
			var format = 'json';
		}
		switch (format) {
			case 'json':
				return self.JSON.parse(data);
			break;
			case 'serialize':
				return self.PHPSerial.unserialize(data);
			break;
			case 'pickle':
				return self.PickleJS.loads(data);
			break;
			default:
				throw new Error('Unknown serialization format "' + format + '"');
			break;
		}
	},

	/**
	 * Check if localStorage is available
	 *
	 * @access  private
	 * @return  boolean
	 */
	hasLocalStorage = function() {
		try {
			return ('localStorage' in win && win.localStorage);
		} catch (e) { return false; }
	},

	/**
	 * Check if globalStorage is available
	 *
	 * @access  private
	 * @return  boolean
	 */
	hasGlobalStorage = function() {
		try {
			return ('globalStorage' in win && win.globalStorage && win.globalStorage[win.location.hostname]);
		} catch (e) { return false; }
	},

	/**
	 * Check if MSIE userData is available
	 *
	 * @access  private
	 * @return  boolean
	 */
	hasUserData = function() {
		return (typeof doc.documentElement.addBehavior === 'function');
	};

// ----------------------------------------------------------------------------
//  HTML5 localStorage Model

	if (hasLocalStorage()) {

		storage = win.localStorage;
		
		write = function(name, value) {
			storage.setItem(name, value);
		};

		read = function(name) {
			return storage.getItem(name);
		};

		del = function(name) {
			storage.removeItem(name);
		};

		delAll = function() {
			storage.clear();
		};

		each = function(func) {
			for (var i in storage) {
				if (storage.getItem(i)) {
					func(i);
				}
			}
		};

	}

// ----------------------------------------------------------------------------
//  HTML5 globalStorage Model

	else if (hasGlobalStorage()) {

		storage = win.globalStorage[win.location.hostname];
		
		write = function(name, value) {
			storage[name] = value;
		};

		read = function(name) {
			var value = storage[name] && storage[name].value;
			if (value) {
				value = value;
			}
			return value;
		};

		del = function(name) {
			delete storage[name];
		};

		each = function(func) {
			for (var i in storage) {
				if (storage.hasOwnProperty(i)) {
					func(i);
				}
			}
		};

	}

// ----------------------------------------------------------------------------
//  MSIE userData Model

	else if (hasUserData()) {

		storage = doc.createElement('div');
		
		var withStore = function(func) {
			return function() {
				doc.body.appendChild(storage);
				storage.addBehavior('#default#userData');
				storage.load('localStorage');
				var args = Array.prototype.slice.call(arguments, 0);
				args.unshift(storage);
				result = func.apply(win, args);
				doc.body.removeChild(storage);
				return result;
			};
		};

		write = withStore(function(storage, name, value) {
			storage.setAttribue(name, value);
			storage.save('localStorage');
		});

		read = withStore(function(storage, name) {
			return storage.getAttribute(name);
		});

		del = withStore(function(storage, name) {
			storage.removeAttribute(name);
			storage.save('localStorage');
		});

		each = withStore(function(storage, func) {
			var attrs = storage.XMLDocument.documentElement.attributes;
			for (var i = 0, c = attrs.length; i < c; i++) {
				func(attr);
			}
		});

	}

// ----------------------------------------------------------------------------
//  Non-support

	else {
		support = false;
	}

// ----------------------------------------------------------------------------
//  External Functions

	self.supported = function() {
		return support;
	};

	if (support) {
	
		/**
		 * Write a value to storage
		 *
		 * @access  public
		 * @param   string    the name to store under
		 * @param   mixed     the value to store
		 * @return  void
		 */
		self.store = function(name, value) {
			return write(name, encode(value));
		};

		/**
		 * Read a value from storage
		 *
		 * @access  public
		 * @param   string    the name to read from
		 * @return  mixed
		 */
		self.fetch = function(name) {
			return decode(read(name));
		};
		
		/**
		 * Check if a name is in storage
		 *
		 * @access  public
		 * @param   string    the name to read from
		 * @return  mixed
		 */
		self.isset = function(name) {
			return (!! read(name));
		};

		/**
		 * Remove a value from storage
		 *
		 * @access  public
		 * @param   string    the name to remove
		 * @return  void
		 */
		self.unset = function(name) {
			del(name);
		};
		
		/**
		 * Remove all values from storage
		 *
		 * @access  public
		 * @return  void
		 */
		self.empty =
			(typeof delAll === 'function') ?
				function() { delAll(); } :
				function() { each(del); };

		/**
		 * Dumps the data in serialized form
		 *
		 * @access  public
		 * @param   string    the serializing format
		 * @return  string
		 */
		self.dumps = function(format) {
			// Get the data out of the store
			var data = { };
			each(function(name) {
				data[name] = decode(read(name));
			})
			// Do the data processing
			return encode(data, format)
		};

		/**
		 * Loads serialized data into the store
		 *
		 * @access  public
		 * @param   string    the data to load
		 * @param   string    the serializing format
		 * @return  void
		 */
		self.loads = function(data, format) {
			// Do the data processing
			data = decode(data, format);
			// Add the data to the store
			for (var i in data) {
				if (data.hasOwnProperty(i)) {
					write(i, encode(data[i]));
				}
			}
		};

		// Actually attempt to read and write data
		try {
			self.store('TestName', 'TestValue');
			if (self.fetch('TestName') !== 'TestValue') {
				support = false;
			}
			self.unset('TestName');
		} catch (e) { support = false; }

	}

// ----------------------------------------------------------------------------
//  JSON Data Encoding Sub-module

	self.JSON = (function() {
		/**
		 * JavaScript JSON Implementation By Douglas Crockford
		 *
		 * @link  http://www.JSON.org/json2.js
		 * @link  http://www.JSON.org/json_parse.js
		 * @link  http://www.JSON.org/js.html
		 */
		var JSON;
		if (!JSON) {
			JSON = {};
		}

		(function () {
			"use strict";

			function f(n) {
				// Format integers to have at least two digits.
				return n < 10 ? '0' + n : n;
			}

			if (typeof Date.prototype.toJSON !== 'function') {

				Date.prototype.toJSON = function (key) {

					return isFinite(this.valueOf()) ?
						this.getUTCFullYear()	 + '-' +
						f(this.getUTCMonth() + 1) + '-' +
						f(this.getUTCDate())	  + 'T' +
						f(this.getUTCHours())	 + ':' +
						f(this.getUTCMinutes())   + ':' +
						f(this.getUTCSeconds())   + 'Z' : null;
				};

				String.prototype.toJSON	  =
					Number.prototype.toJSON  =
					Boolean.prototype.toJSON = function (key) {
						return this.valueOf();
					};
			}

			var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
				escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
				gap,
				indent,
				meta = {	// table of character substitutions
					'\b': '\\b',
					'\t': '\\t',
					'\n': '\\n',
					'\f': '\\f',
					'\r': '\\r',
					'"' : '\\"',
					'\\': '\\\\'
				},
				rep;


			function quote(string) {

		// If the string contains no control characters, no quote characters, and no
		// backslash characters, then we can safely slap some quotes around it.
		// Otherwise we must also replace the offending characters with safe escape
		// sequences.

				escapable.lastIndex = 0;
				return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
					var c = meta[a];
					return typeof c === 'string' ? c :
						'\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				}) + '"' : '"' + string + '"';
			}


			function str(key, holder) {

		// Produce a string from holder[key].

				var i,		  // The loop counter.
					k,		  // The member key.
					v,		  // The member value.
					length,
					mind = gap,
					partial,
					value = holder[key];

		// If the value has a toJSON method, call it to obtain a replacement value.

				if (value && typeof value === 'object' &&
						typeof value.toJSON === 'function') {
					value = value.toJSON(key);
				}

		// If we were called with a replacer function, then call the replacer to
		// obtain a replacement value.

				if (typeof rep === 'function') {
					value = rep.call(holder, key, value);
				}

		// What happens next depends on the value's type.

				switch (typeof value) {
				case 'string':
					return quote(value);

				case 'number':

		// JSON numbers must be finite. Encode non-finite numbers as null.

					return isFinite(value) ? String(value) : 'null';

				case 'boolean':
				case 'null':

		// If the value is a boolean or null, convert it to a string. Note:
		// typeof null does not produce 'null'. The case is included here in
		// the remote chance that this gets fixed someday.

					return String(value);

		// If the type is 'object', we might be dealing with an object or an array or
		// null.

				case 'object':

		// Due to a specification blunder in ECMAScript, typeof null is 'object',
		// so watch out for that case.

					if (!value) {
						return 'null';
					}

		// Make an array to hold the partial results of stringifying this object value.

					gap += indent;
					partial = [];

		// Is the value an array?

					if (Object.prototype.toString.apply(value) === '[object Array]') {

		// The value is an array. Stringify every element. Use null as a placeholder
		// for non-JSON values.

						length = value.length;
						for (i = 0; i < length; i += 1) {
							partial[i] = str(i, value) || 'null';
						}

		// Join all of the elements together, separated with commas, and wrap them in
		// brackets.

						v = partial.length === 0 ? '[]' : gap ?
							'[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
							'[' + partial.join(',') + ']';
						gap = mind;
						return v;
					}

		// If the replacer is an array, use it to select the members to be stringified.

					if (rep && typeof rep === 'object') {
						length = rep.length;
						for (i = 0; i < length; i += 1) {
							if (typeof rep[i] === 'string') {
								k = rep[i];
								v = str(k, value);
								if (v) {
									partial.push(quote(k) + (gap ? ': ' : ':') + v);
								}
							}
						}
					} else {

		// Otherwise, iterate through all of the keys in the object.

						for (k in value) {
							if (Object.prototype.hasOwnProperty.call(value, k)) {
								v = str(k, value);
								if (v) {
									partial.push(quote(k) + (gap ? ': ' : ':') + v);
								}
							}
						}
					}

		// Join all of the member texts together, separated with commas,
		// and wrap them in braces.

					v = partial.length === 0 ? '{}' : gap ?
						'{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
						'{' + partial.join(',') + '}';
					gap = mind;
					return v;
				}
			}

		// If the JSON object does not yet have a stringify method, give it one.

			if (typeof JSON.stringify !== 'function') {
				JSON.stringify = function (value, replacer, space) {

		// The stringify method takes a value and an optional replacer, and an optional
		// space parameter, and returns a JSON text. The replacer can be a function
		// that can replace values, or an array of strings that will select the keys.
		// A default replacer method can be provided. Use of the space parameter can
		// produce text that is more easily readable.

					var i;
					gap = '';
					indent = '';

		// If the space parameter is a number, make an indent string containing that
		// many spaces.

					if (typeof space === 'number') {
						for (i = 0; i < space; i += 1) {
							indent += ' ';
						}

		// If the space parameter is a string, it will be used as the indent string.

					} else if (typeof space === 'string') {
						indent = space;
					}

		// If there is a replacer, it must be a function or an array.
		// Otherwise, throw an error.

					rep = replacer;
					if (replacer && typeof replacer !== 'function' &&
							(typeof replacer !== 'object' ||
							typeof replacer.length !== 'number')) {
						throw new Error('JSON.stringify');
					}

		// Make a fake root object containing our value under the key of ''.
		// Return the result of stringifying the value.

					return str('', {'': value});
				};
			}


		// If the JSON object does not yet have a parse method, give it one.

			if (typeof JSON.parse !== 'function') {
				JSON.parse = (function () {
					"use strict";

				// This is a function that can parse a JSON text, producing a JavaScript
				// data structure. It is a simple, recursive descent parser. It does not use
				// eval or regular expressions, so it can be used as a model for implementing
				// a JSON parser in other languages.

				// We are defining the function inside of another function to avoid creating
				// global variables.

					var at,	 // The index of the current character
						ch,	 // The current character
						escapee = {
							'"':  '"',
							'\\': '\\',
							'/':  '/',
							b:	'\b',
							f:	'\f',
							n:	'\n',
							r:	'\r',
							t:	'\t'
						},
						text,

						error = function (m) {

				// Call error when something is wrong.

							throw {
								name:	'SyntaxError',
								message: m,
								at:	  at,
								text:	text
							};
						},

						next = function (c) {

				// If a c parameter is provided, verify that it matches the current character.

							if (c && c !== ch) {
								error("Expected '" + c + "' instead of '" + ch + "'");
							}

				// Get the next character. When there are no more characters,
				// return the empty string.

							ch = text.charAt(at);
							at += 1;
							return ch;
						},

						number = function () {

				// Parse a number value.

							var number,
								string = '';

							if (ch === '-') {
								string = '-';
								next('-');
							}
							while (ch >= '0' && ch <= '9') {
								string += ch;
								next();
							}
							if (ch === '.') {
								string += '.';
								while (next() && ch >= '0' && ch <= '9') {
									string += ch;
								}
							}
							if (ch === 'e' || ch === 'E') {
								string += ch;
								next();
								if (ch === '-' || ch === '+') {
									string += ch;
									next();
								}
								while (ch >= '0' && ch <= '9') {
									string += ch;
									next();
								}
							}
							number = +string;
							if (!isFinite(number)) {
								error("Bad number");
							} else {
								return number;
							}
						},

						string = function () {

				// Parse a string value.

							var hex,
								i,
								string = '',
								uffff;

				// When parsing for string values, we must look for " and \ characters.

							if (ch === '"') {
								while (next()) {
									if (ch === '"') {
										next();
										return string;
									} else if (ch === '\\') {
										next();
										if (ch === 'u') {
											uffff = 0;
											for (i = 0; i < 4; i += 1) {
												hex = parseInt(next(), 16);
												if (!isFinite(hex)) {
													break;
												}
												uffff = uffff * 16 + hex;
											}
											string += String.fromCharCode(uffff);
										} else if (typeof escapee[ch] === 'string') {
											string += escapee[ch];
										} else {
											break;
										}
									} else {
										string += ch;
									}
								}
							}
							error("Bad string");
						},

						white = function () {

				// Skip whitespace.

							while (ch && ch <= ' ') {
								next();
							}
						},

						word = function () {

				// true, false, or null.

							switch (ch) {
							case 't':
								next('t');
								next('r');
								next('u');
								next('e');
								return true;
							case 'f':
								next('f');
								next('a');
								next('l');
								next('s');
								next('e');
								return false;
							case 'n':
								next('n');
								next('u');
								next('l');
								next('l');
								return null;
							}
							error("Unexpected '" + ch + "'");
						},

						value,  // Place holder for the value function.

						array = function () {

				// Parse an array value.

							var array = [];

							if (ch === '[') {
								next('[');
								white();
								if (ch === ']') {
									next(']');
									return array;   // empty array
								}
								while (ch) {
									array.push(value());
									white();
									if (ch === ']') {
										next(']');
										return array;
									}
									next(',');
									white();
								}
							}
							error("Bad array");
						},

						object = function () {

				// Parse an object value.

							var key,
								object = {};

							if (ch === '{') {
								next('{');
								white();
								if (ch === '}') {
									next('}');
									return object;   // empty object
								}
								while (ch) {
									key = string();
									white();
									next(':');
									if (Object.hasOwnProperty.call(object, key)) {
										error('Duplicate key "' + key + '"');
									}
									object[key] = value();
									white();
									if (ch === '}') {
										next('}');
										return object;
									}
									next(',');
									white();
								}
							}
							error("Bad object");
						};

					value = function () {

				// Parse a JSON value. It could be an object, an array, a string, a number,
				// or a word.

						white();
						switch (ch) {
						case '{':
							return object();
						case '[':
							return array();
						case '"':
							return string();
						case '-':
							return number();
						default:
							return ch >= '0' && ch <= '9' ? number() : word();
						}
					};

				// Return the json_parse function. It will have access to all of the above
				// functions and variables.

					return function (source, reviver) {
						var result;

						text = source;
						at = 0;
						ch = ' ';
						result = value();
						white();
						if (ch) {
							error("Syntax error");
						}

				// If there is a reviver function, we recursively walk the new structure,
				// passing each name/value pair to the reviver function for possible
				// transformation, starting with a temporary root object that holds the result
				// in an empty key. If there is not a reviver function, we simply return the
				// result.

						return typeof reviver === 'function' ? (function walk(holder, key) {
							var k, v, value = holder[key];
							if (value && typeof value === 'object') {
								for (k in value) {
									if (Object.prototype.hasOwnProperty.call(value, k)) {
										v = walk(value, k);
										if (v !== undefined) {
											value[k] = v;
										} else {
											delete value[k];
										}
									}
								}
							}
							return reviver.call(holder, key, value);
						}({'': result}, '')) : result;
					};
				}());
			}
		}());
		
		return JSON;
	}());

// ----------------------------------------------------------------------------
//  PHP Serialization Data Encoding Sub-module

	self.PHPSerial = (function() {
		var
		/**
		 * Encodes an ISO-8859-1 string to UTF-8
		 *
		 * @access  private
		 * @param   string    the string to encode
		 * @return  string
		 * @link    http://phpjs.org/functions/utf8_encode
		 */
		utf8_encode = function(argString) {
			var string = (argString + '');
			var utftext = "",
				start, end, stringl = 0;
		 
			start = end = 0;
			stringl = string.length;
			for (var n = 0; n < stringl; n++) {
				var c1 = string.charCodeAt(n);
				var enc = null;
		 
				if (c1 < 128) {
					end++;
				} else if (c1 > 127 && c1 < 2048) {
					enc = String.fromCharCode((c1 >> 6) | 192) +
						String.fromCharCode((c1 & 63) | 128);
				} else {
					enc = String.fromCharCode((c1 >> 12) | 224) +
						String.fromCharCode(((c1 >> 6) & 63) | 128) +
						String.fromCharCode((c1 & 63) | 128);
				}
				if (enc !== null) {
					if (end > start) {
						utftext += string.slice(start, end);
					}
					utftext += enc;
					start = end = n + 1;
				}
			}
		 
			if (end > start) {
				utftext += string.slice(start, stringl);
			}
		 
			return utftext;
		},
		/**
		 * Converts a UTF-8 encoded string to ISO-8859-1
		 *
		 * @access  private
		 * @param   string    the string to decode
		 * @return  string
		 */
		utf8_decode = function(str_data) {
			var tmp_arr = [],
				i = 0,
				ac = 0,
				c1 = 0,
				c2 = 0,
				c3 = 0;
		 
			str_data += '';
		 
			while (i < str_data.length) {
				c1 = str_data.charCodeAt(i);
				if (c1 < 128) {
					tmp_arr[ac++] = String.fromCharCode(c1);
					i++;
				} else if (c1 > 191 && c1 < 224) {
					c2 = str_data.charCodeAt(i + 1);
					tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = str_data.charCodeAt(i + 1);
					c3 = str_data.charCodeAt(i + 2);
					tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
		 
			return tmp_arr.join('');
		},
		/**
		 * PHP-style serialization function
		 *
		 * @access  public
		 * @param   mixed     the value to serialize
		 * @return  string
		 * @link    http://phpjs.org/functions/serialize
		 */
		serialize = function(mixed_value) {
			var _utf8Size = function (str) {
				var size = 0,
					i = 0,
					l = str.length,
					code = '';
				for (i = 0; i < l; i++) {
					code = str.charCodeAt(i);
					if (code < 0x0080) {
						size += 1;
					} else if (code < 0x0800) {
						size += 2;
					} else {
						size += 3;
					}
				}
				return size;
			};
			var _getType = function (inp) {
				var type = typeof inp,
					match;
				var key;
		 
				if (type === 'object' && !inp) {
					return 'null';
				}
				if (type === "object") {
					if (!inp.constructor) {
						return 'object';
					}
					var cons = inp.constructor.toString();
					match = cons.match(/(\w+)\(/);
					if (match) {
						cons = match[1].toLowerCase();
					}
					var types = ["boolean", "number", "string", "array"];
					for (key in types) {
						if (cons == types[key]) {
							type = types[key];
							break;
						}
					}
				}
				return type;
			};
			var type = _getType(mixed_value);
			var val, ktype = '';
		 
			switch (type) {
			case "function":
				val = "";
				break;
			case "boolean":
				val = "b:" + (mixed_value ? "1" : "0");
				break;
			case "number":
				val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;
				break;
			case "string":
				val = "s:" + _utf8Size(mixed_value) + ":\"" + mixed_value + "\"";
				break;
			case "array":
			case "object":
				val = "a";
				var count = 0;
				var vals = "";
				var okey;
				var key;
				for (key in mixed_value) {
					if (mixed_value.hasOwnProperty(key)) {
						ktype = _getType(mixed_value[key]);
						if (ktype === "function") {
							continue;
						}
		 
						okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
						vals += serialize(okey) + serialize(mixed_value[key]);
						count++;
					}
				}
				val += ":" + count + ":{" + vals + "}";
				break;
			case "undefined":
				// Fall-through
			default:
				// If the JS object has a property which contains a null value, the string
				// cannot be unserialized by PHP
				val = "N";
				break;
			}
			if (type !== "object" && type !== "array") {
				val += ";";
			}
			return val;
		},
		/**
		 * PHP-style unserialization function
		 *
		 * @access  public
		 * @param   string    the value to unserialize
		 * @return  mixed
		 * @link    http://phpjs.org/functions/unserialize
		 */
		unserialize = function(data) {
			var that = this;
			var utf8Overhead = function (chr) {
				var code = chr.charCodeAt(0);
				if (code < 0x0080) {
					return 0;
				}
				if (code < 0x0800) {
					return 1;
				}
				return 2;
			};
		 
		 
			var error = function (type, msg, filename, line) {
				throw new window[type](msg, filename, line);
			};
			var read_until = function (data, offset, stopchr) {
				var buf = [];
				var chr = data.slice(offset, offset + 1);
				var i = 2;
				while (chr != stopchr) {
					if ((i + offset) > data.length) {
						error('Error', 'Invalid');
					}
					buf.push(chr);
					chr = data.slice(offset + (i - 1), offset + i);
					i += 1;
				}
				return [buf.length, buf.join('')];
			};
			var read_chrs = function (data, offset, length) {
				var buf;
		 
				buf = [];
				for (var i = 0; i < length; i++) {
					var chr = data.slice(offset + (i - 1), offset + i);
					buf.push(chr);
					length -= utf8Overhead(chr);
				}
				return [buf.length, buf.join('')];
			};
			var _unserialize = function (data, offset) {
				var readdata;
				var readData;
				var chrs = 0;
				var ccount;
				var stringlength;
				var keyandchrs;
				var keys;
		 
				if (!offset) {
					offset = 0;
				}
				var dtype = (data.slice(offset, offset + 1)).toLowerCase();
		 
				var dataoffset = offset + 2;
				var typeconvert = function (x) {
					return x;
				};
		 
				switch (dtype) {
				case 'i':
					typeconvert = function (x) {
						return parseInt(x, 10);
					};
					readData = read_until(data, dataoffset, ';');
					chrs = readData[0];
					readdata = readData[1];
					dataoffset += chrs + 1;
					break;
				case 'b':
					typeconvert = function (x) {
						return parseInt(x, 10) !== 0;
					};
					readData = read_until(data, dataoffset, ';');
					chrs = readData[0];
					readdata = readData[1];
					dataoffset += chrs + 1;
					break;
				case 'd':
					typeconvert = function (x) {
						return parseFloat(x);
					};
					readData = read_until(data, dataoffset, ';');
					chrs = readData[0];
					readdata = readData[1];
					dataoffset += chrs + 1;
					break;
				case 'n':
					readdata = null;
					break;
				case 's':
					ccount = read_until(data, dataoffset, ':');
					chrs = ccount[0];
					stringlength = ccount[1];
					dataoffset += chrs + 2;
		 
					readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
					chrs = readData[0];
					readdata = readData[1];
					dataoffset += chrs + 2;
					if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
						error('SyntaxError', 'String length mismatch');
					}
		 
					// Length was calculated on an utf-8 encoded string
					// so wait with decoding
					readdata = utf8_decode(readdata);
					break;
				case 'a':
					readdata = {};
		 
					keyandchrs = read_until(data, dataoffset, ':');
					chrs = keyandchrs[0];
					keys = keyandchrs[1];
					dataoffset += chrs + 2;
		 
					for (var i = 0; i < parseInt(keys, 10); i++) {
						var kprops = _unserialize(data, dataoffset);
						var kchrs = kprops[1];
						var key = kprops[2];
						dataoffset += kchrs;
		 
						var vprops = _unserialize(data, dataoffset);
						var vchrs = vprops[1];
						var value = vprops[2];
						dataoffset += vchrs;
		 
						readdata[key] = value;
					}
		 
					dataoffset += 1;
					break;
				default:
					error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
					break;
				}
				return [dtype, dataoffset - offset, typeconvert(readdata)];
			};
		 
			return _unserialize((data + ''), 0)[2];
		};
		return {
			serialize: serialize,
			unserialize: unserialize
		};
	}());

// ----------------------------------------------------------------------------
//  Python Pickling Data Encoding Sub-module

	self.PickleJS = (function() {
		/*

			http://code.google.com/p/pickle-js/
			pickle-js is not yet stable enough for including. when
			it is, it will be added here.

		*/
		var pickle = {
			dumps: function() { },
			loads: function() { }
		};
		return {
			dumps: function(data) {
				return pickle.dumps(data);
			},
			loads: function(data) {
				return pickle.loads(data);
			}
		};
	}());
	
})(window));

/* End of file box.js */

; browserify_shim__define__module__export__(typeof box != "undefined" ? box : window.box);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\box.js\\box.js","/..\\res\\box.js")
},{"VCmEsw":43,"buffer":40}],46:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014 - 2015
 */

/**
 * Internal LayoutNode class used by `LayoutNodeManager`.
 *
 * @module
 */

    // import dependencies
    var OptionsManager = require('famous/core/OptionsManager');
    var Transform = require('famous/core/Transform');
    var Vector = require('famous/math/Vector');
    var Particle = require('famous/physics/bodies/Particle');
    var Spring = require('famous/physics/forces/Spring');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');
    var LayoutNode = require('./LayoutNode');
    var Transitionable = require('famous/transitions/Transitionable');

    /**
     * @class
     * @extends LayoutNode
     * @param {Object} renderNode Render-node which this layout-node represents
     * @param {Spec} spec Initial state
     * @param {Object} physicsEngines physics-engines to use
     * @alias module:FlowLayoutNode
     */
    function FlowLayoutNode(renderNode, spec) {
        LayoutNode.apply(this, arguments);

        if (!this.options) {
            this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
            this._optionsManager = new OptionsManager(this.options);
        }

        if (!this._pe) {
            this._pe = new PhysicsEngine();
            this._pe.sleep();
        }

        if (!this._properties) {
            this._properties = {};
        }
        else {
            for (var propName in this._properties) {
                this._properties[propName].init = false;
            }
        }

        if (!this._lockTransitionable) {
            this._lockTransitionable = new Transitionable(1);
        }
        else {
            this._lockTransitionable.halt();
            this._lockTransitionable.reset(1);
        }

        this._specModified = true;
        this._initial = true;
        if (spec) {
            this.setSpec(spec);
        }
    }
    FlowLayoutNode.prototype = Object.create(LayoutNode.prototype);
    FlowLayoutNode.prototype.constructor = FlowLayoutNode;

    FlowLayoutNode.DEFAULT_OPTIONS = {
        spring: {
            dampingRatio: 0.8,
            period: 300
        },
        properties: {
            opacity: true,
            align: true,
            origin: true,
            size: true,
            translate: true,
            skew: true,
            rotate: true,
            scale: true
        },
        particleRounding: 0.001
    };

    /**
     * Defaults
     */
    var DEFAULT = {
        opacity: 1,
        opacity2D: [1, 0],
        size: [0, 0],
        origin: [0, 0],
        align: [0, 0],
        scale: [1, 1, 1],
        translate: [0, 0, 0],
        rotate: [0, 0, 0],
        skew: [0, 0, 0]
    };

    /**
     * Verifies that the integrity of the layout-node is oke.
     */
    /*function _verifyIntegrity() {
        var i;
        for (var propName in this._properties) {
            var prop = this._properties[propName];
            if (prop.particle) {
                if (isNaN(prop.particle.getEnergy())) {
                    throw 'invalid particle energy: ' + propName;
                }
                var value = prop.particle.getPosition();
                for (i = 0; i < value.length; i++) {
                    if (isNaN(value[i])) {
                       throw 'invalid particle value: ' + propName + '(' + i + ')';
                    }
                }
                value = prop.endState.get();
                for (i = 0; i < value.length; i++) {
                    if (isNaN(value[i])) {
                       throw 'invalid endState value: ' + propName + '(' + i + ')';
                    }
                }
            }
        }
    }*/

    /**
     * Sets the configuration options
     */
    FlowLayoutNode.prototype.setOptions = function(options) {
        this._optionsManager.setOptions(options);
        var wasSleeping = this._pe.isSleeping();
        for (var propName in this._properties) {
            var prop = this._properties[propName];
            if (options.spring && prop.force) {
                prop.force.setOptions(this.options.spring);
            }
            if (options.properties && (options.properties[propName] !== undefined)) {
                if (this.options.properties[propName].length) {
                    prop.enabled = this.options.properties[propName];
                }
                else {
                    prop.enabled = [
                        this.options.properties[propName],
                        this.options.properties[propName],
                        this.options.properties[propName]
                    ];
                }
            }
        }
        if (wasSleeping) {
            this._pe.sleep();
        }
        return this;
    };

    /**
     * Set the properties from a spec.
     */
    FlowLayoutNode.prototype.setSpec = function(spec) {
        var set;
        if (spec.transform) {
            set = Transform.interpret(spec.transform);
        }
        if (!set) {
            set = {};
        }
        set.opacity = spec.opacity;
        set.size = spec.size;
        set.align = spec.align;
        set.origin = spec.origin;

        var oldRemoving = this._removing;
        var oldInvalidated = this._invalidated;
        this.set(set);
        this._removing = oldRemoving;
        this._invalidated = oldInvalidated;
    };

    /**
     * Reset the end-state. This function is called on all layout-nodes prior to
     * calling the layout-function. So that the layout-function starts with a clean slate.
     */
    FlowLayoutNode.prototype.reset = function() {
        if (this._invalidated) {
            for (var propName in this._properties) {
                this._properties[propName].invalidated = false;
            }
            this._invalidated = false;
        }
        this.trueSizeRequested = false;
        this.usesTrueSize = false;
    };

    /**
     * Markes the node for removal.
     */
    FlowLayoutNode.prototype.remove = function(removeSpec) {

        // Transition to the remove-spec state
        this._removing = true;
        if (removeSpec) {
            this.setSpec(removeSpec);
        }
        else {
            this._pe.sleep();
            this._specModified = false;
        }

        // Mark for removal
        this._invalidated = false;
    };

    /**
     * Temporarily releases the flowing-lock that is applied to the node.
     * E.g., when changing position, resizing, the lock should be released so that
     * the renderables can smoothly transition to their new positions.
     */
    FlowLayoutNode.prototype.releaseLock = function(enable) {
        this._lockTransitionable.halt();
        this._lockTransitionable.reset(0);
        if (enable) {
          this._lockTransitionable.set(1, {
              duration: this.options.spring.period || 1000
          });
        }
    };

    /**
     * Helper function for getting the property value.
     */
    function _getRoundedValue3D(prop, def, precision, lockValue) {
        if (!prop || !prop.init) {
            return def;
        }
        return [
            prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / precision) * precision) : prop.endState.x,
            prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / precision) * precision) : prop.endState.y,
            prop.enabled[2] ? (Math.round((prop.curState.z + ((prop.endState.z - prop.curState.z) * lockValue)) / precision) * precision) : prop.endState.z
        ];
    }

    /**
     * Creates the render-spec
     */
    FlowLayoutNode.prototype.getSpec = function() {

        // When the end state was reached, return the previous spec
        var endStateReached = this._pe.isSleeping();
        if (!this._specModified && endStateReached) {
            this._spec.removed = !this._invalidated;
            return this._spec;
        }
        this._initial = false;
        this._specModified = !endStateReached;
        this._spec.removed = false;

        // Step physics engine when not sleeping
        if (!endStateReached) {
            this._pe.step();
        }

        // Build fresh spec
        var spec = this._spec;
        var precision = this.options.particleRounding;
        var lockValue = this._lockTransitionable.get();

        // opacity
        var prop = this._properties.opacity;
        if (prop && prop.init) {
            spec.opacity = prop.enabled[0] ? (Math.round(Math.max(0, Math.min(1, prop.curState.x)) / precision) * precision) : prop.endState.x;
        }
        else {
            spec.opacity = undefined;
        }

        // size
        prop = this._properties.size;
        if (prop && prop.init) {
            spec.size = spec.size || [0, 0];
            spec.size[0] = prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / 0.1) * 0.1) : prop.endState.x;
            spec.size[1] = prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / 0.1) * 0.1) : prop.endState.y;
        }
        else {
            spec.size = undefined;
        }

        // align
        prop = this._properties.align;
        if (prop && prop.init) {
            spec.align = spec.align || [0, 0];
            spec.align[0] = prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / 0.1) * 0.1) : prop.endState.x;
            spec.align[1] = prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / 0.1) * 0.1) : prop.endState.y;
        }
        else {
            spec.align = undefined;
        }

        // origin
        prop = this._properties.origin;
        if (prop && prop.init) {
            spec.origin = spec.origin || [0, 0];
            spec.origin[0] = prop.enabled[0] ? (Math.round((prop.curState.x + ((prop.endState.x - prop.curState.x) * lockValue)) / 0.1) * 0.1) : prop.endState.x;
            spec.origin[1] = prop.enabled[1] ? (Math.round((prop.curState.y + ((prop.endState.y - prop.curState.y) * lockValue)) / 0.1) * 0.1) : prop.endState.y;
        }
        else {
            spec.origin = undefined;
        }

        // translate
        var translate = this._properties.translate;
        var translateX;
        var translateY;
        var translateZ;
        if (translate && translate.init) {
            translateX = translate.enabled[0] ? (Math.round((translate.curState.x + ((translate.endState.x - translate.curState.x) * lockValue)) / precision) * precision) : translate.endState.x;
            translateY = translate.enabled[1] ? (Math.round((translate.curState.y + ((translate.endState.y - translate.curState.y) * lockValue)) / precision) * precision) : translate.endState.y;
            translateZ = translate.enabled[2] ? (Math.round((translate.curState.z + ((translate.endState.z - translate.curState.z) * lockValue)) / precision) * precision) : translate.endState.z;
        }
        else {
            translateX = 0;
            translateY = 0;
            translateZ = 0;
        }

        // scale, skew, scale
        var scale = this._properties.scale;
        var skew = this._properties.skew;
        var rotate = this._properties.rotate;
        if (scale || skew || rotate) {
            spec.transform = Transform.build({
                translate: [translateX, translateY, translateZ],
                skew: _getRoundedValue3D.call(this, skew, DEFAULT.skew, this.options.particleRounding, lockValue),
                scale: _getRoundedValue3D.call(this, scale, DEFAULT.scale, this.options.particleRounding, lockValue),
                rotate: _getRoundedValue3D.call(this, rotate, DEFAULT.rotate, this.options.particleRounding, lockValue)
            });
        }
        else if (translate) {
            if (!spec.transform) {
                spec.transform = Transform.translate(translateX, translateY, translateZ);
            }
            else {
                spec.transform[12] = translateX;
                spec.transform[13] = translateY;
                spec.transform[14] = translateZ;
            }
        }
        else {
            spec.transform = undefined;
        }
        return this._spec;
    };

    /**
     * Helper function to set the property of a node (e.g. opacity, translate, etc..)
     */
    function _setPropertyValue(prop, propName, endState, defaultValue, immediate, isTranslate) {

        // Get property
        prop = prop || this._properties[propName];

        // Update the property
        if (prop && prop.init) {
            prop.invalidated = true;
            var value = defaultValue;
            if (endState !== undefined) {
                value = endState;
            }
            else if (this._removing) {
                value = prop.particle.getPosition();
            }
            //if (isTranslate && (this._lockDirection !== undefined) && (this._lockTransitionable.get() === 1)) {
            //    immediate = true; // this is a bit dirty, it should check !_lockDirection for non changes as well before setting immediate to true
            //}
            // set new end state (the quick way)
            prop.endState.x = value[0];
            prop.endState.y = (value.length > 1) ? value[1] : 0;
            prop.endState.z = (value.length > 2) ? value[2] : 0;
            if (immediate) {
                // set current state (the quick way)
                prop.curState.x = prop.endState.x;
                prop.curState.y = prop.endState.y;
                prop.curState.z = prop.endState.z;
                // reset velocity (the quick way)
                prop.velocity.x = 0;
                prop.velocity.y = 0;
                prop.velocity.z = 0;
            }
            else if ((prop.endState.x !== prop.curState.x) ||
                     (prop.endState.y !== prop.curState.y) ||
                     (prop.endState.z !== prop.curState.z)) {
                this._pe.wake();
            }
            return;
        }
        else {

            // Create property if neccesary
            var wasSleeping = this._pe.isSleeping();
            if (!prop) {
                prop = {
                    particle: new Particle({
                        position: (this._initial || immediate) ? endState : defaultValue
                    }),
                    endState: new Vector(endState)
                };
                prop.curState = prop.particle.position;
                prop.velocity = prop.particle.velocity;
                prop.force = new Spring(this.options.spring);
                prop.force.setOptions({
                    anchor: prop.endState
                });
                this._pe.addBody(prop.particle);
                prop.forceId = this._pe.attach(prop.force, prop.particle);
                this._properties[propName] = prop;
            }
            else {
                prop.particle.setPosition((this._initial || immediate) ? endState : defaultValue);
                prop.endState.set(endState);
            }
            if (!this._initial && !immediate) {
                this._pe.wake();
            }
            else if (wasSleeping) {
                this._pe.sleep(); // nothing has changed, put back to sleep
            }
            if (this.options.properties[propName] && this.options.properties[propName].length) {
                prop.enabled = this.options.properties[propName];
            }
            else {
                prop.enabled = [
                  this.options.properties[propName],
                  this.options.properties[propName],
                  this.options.properties[propName]
                ];
            }
            prop.init = true;
            prop.invalidated = true;
        }
    }

    /**
     * Get value if not equals.
     */
    function _getIfNE2D(a1, a2) {
        return ((a1[0] === a2[0]) && (a1[1] === a2[1])) ? undefined : a1;
    }
    function _getIfNE3D(a1, a2) {
        return ((a1[0] === a2[0]) && (a1[1] === a2[1]) && (a1[2] === a2[2])) ? undefined : a1;
    }

    /**
     * context.set(..)
     */
    FlowLayoutNode.prototype.set = function(set, defaultSize) {
        if (defaultSize) {
            this._removing = false;
        }
        this._invalidated = true;
        this.scrollLength = set.scrollLength;
        this._specModified = true;

        // opacity
        var prop = this._properties.opacity;
        var value = (set.opacity === DEFAULT.opacity) ? undefined : set.opacity;
        if ((value !== undefined) || (prop && prop.init)) {
            _setPropertyValue.call(this, prop, 'opacity', (value === undefined) ? undefined : [value, 0], DEFAULT.opacity2D);
        }

        // set align
        prop = this._properties.align;
        value = set.align ? _getIfNE2D(set.align, DEFAULT.align) : undefined;
        if (value || (prop && prop.init)) {
            _setPropertyValue.call(this, prop, 'align', value, DEFAULT.align);
        }

        // set orgin
        prop = this._properties.origin;
        value = set.origin ? _getIfNE2D(set.origin, DEFAULT.origin) : undefined;
        if (value || (prop && prop.init)) {
            _setPropertyValue.call(this, prop, 'origin', value, DEFAULT.origin);
        }

        // set size
        prop = this._properties.size;
        value = set.size || defaultSize;
        if (value || (prop && prop.init)) {
            _setPropertyValue.call(this, prop, 'size', value, defaultSize, this.usesTrueSize);
        }

        // set translate
        prop = this._properties.translate;
        value = set.translate;
        if (value || (prop && prop.init)) {
            _setPropertyValue.call(this, prop, 'translate', value, DEFAULT.translate, undefined, true);
        }

        // set scale
        prop = this._properties.scale;
        value = set.scale ? _getIfNE3D(set.scale, DEFAULT.scale) : undefined;
        if (value || (prop && prop.init)) {
            _setPropertyValue.call(this, prop, 'scale', value, DEFAULT.scale);
        }

        // set rotate
        prop = this._properties.rotate;
        value = set.rotate ? _getIfNE3D(set.rotate, DEFAULT.rotate) : undefined;
        if (value || (prop && prop.init)) {
            _setPropertyValue.call(this, prop, 'rotate', value, DEFAULT.rotate);
        }

        // set skew
        prop = this._properties.skew;
        value = set.skew ? _getIfNE3D(set.skew, DEFAULT.skew) : undefined;
        if (value || (prop && prop.init)) {
            _setPropertyValue.call(this, prop, 'skew', value, DEFAULT.skew);
        }
    };

    module.exports = FlowLayoutNode;

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-flex\\FlowLayoutNode.js","/..\\res\\famous-flex")
},{"./LayoutNode":49,"VCmEsw":43,"buffer":40,"famous/core/OptionsManager":14,"famous/core/Transform":18,"famous/math/Vector":22,"famous/physics/PhysicsEngine":24,"famous/physics/bodies/Particle":25,"famous/physics/forces/Spring":28,"famous/transitions/Transitionable":35}],47:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/**
 * LayoutContext is the interface for a layout-function to access
 * renderables in the data-source and set their size, position, tranformation, etc...
 *
 * The `next`, `prev` and `get` functions return an opaque object which represents
 * the renderable that is to be layed out. To access the actual renderable, use the
 * `.renderNode` property of this opaque object.
 *
 * @module
 */

    /**
     * @class
     * @alias module:LayoutContext
     */
    function LayoutContext(methods) {
        for (var n in methods) {
            this[n] = methods[n];
        }
    }

    /**
     * {Property} Size in which to layout the renderables.
     */
    LayoutContext.prototype.size = undefined;

    /**
     * {Property} Direction in which to layout the renderables (0 = X, 1 = Y).
     */
    LayoutContext.prototype.direction = undefined;

    /**
     * {Property} {Number} Scrolling offset at which to start laying out next/prev renderables.
     */
    LayoutContext.prototype.scrollOffset = undefined;

    /**
     * {Property} {Number} Top/left boundary to which to layout renderables (default: 0).
     */
    LayoutContext.prototype.scrollStart = undefined;

    /**
     * {Property} {Number} Bottom/right boundary to which to continue laying out renderables.
     */
    LayoutContext.prototype.scrollEnd = undefined;

    /**
     * Get the context-node for the next renderable in the data-source. When
     * the end of the data-source is reached, `undefined` is returned.
     * Use this function to enumerate the contents of a data-source that is
     * either an Array or a ViewSequence.
     *
     * **Example:**
     *
     * ```javascript
     * function MyLayoutFunction(context, options) {
     *   var height = 0;
     *   var node = context.next(); // get first next node
     *   while (node) {
     *     context.set(node, {
     *       size: [context.size[0], 100],
     *       translate: [0, height, 0]
     *     });
     *     height += 100;
     *     node = context.next(); // get next node
     *   }
     * }
     * ```
     *
     * @return {Object} context-node or undefined
     */
    LayoutContext.prototype.next = function() {
        // dummy implementation, override in constructor
    };

    /**
     * Get the context-node for the previous renderable in the data-source. When
     * the start of the data-source is reached, `undefined` is returned.
     * Use this function to enumerate the contents of a data-source that is
     * either an Array or a ViewSequence.
     *
     * **Example:**
     *
     * ```javascript
     * function MyLayoutFunction(context, options) {
     *   var height = 0;
     *   var node = context.prev(); // get first previous
     *   while (node) {
     *     height -= 100;
     *     context.set(node, {
     *       size: [context.size[0], 100],
     *       translate: [0, height, 0]
     *     });
     *     node = context.prev(); // get prev node
     *   }
     * }
     * ```
     *
     * @return {Object} context-node or undefined
     */
    LayoutContext.prototype.prev = function() {
        // dummy implementation, override in constructor
    };

    /**
     * Get the context-node for a renderable with a specific id. This function
     * should be used to access data-sources which are key-value collections.
     * When a data-source is an Array or a ViewSequence, use `next()`.
     * In many cases it is not neccesary to use `get()`, instead you can pass
     * the id of the renderable straight to the `set` function.
     *
     * **Example:**
     *
     * ```javascript
     * var layoutController = new LayoutController({
     *   layout: function (context, options) {
     *     var size = context.size;
     *     var left = context.get('left');
     *     context.set(left, { size: [100, size[1]] });
     *
     *     var right = context.get('right');
     *     context.set(right, {
     *       size: [100, size[1]],
     *       translate: [size[1] - 100, 0, 0]
     *     });
     *
     *     var middle = context.get('middle');
     *     context.set(middle, {
     *       size: [size[0] - 200, size[1]],
     *       translate: [100, 0, 0]
     *     });
     *   },
     *   dataSource: {
     *     left: new Surface({content: 'left'}),
     *     right: new Surface({content: 'right'}),
     *     middle: new Surface({content: 'middle'})
     *   }
     * });
     * ```
     *
     * **Arrays:**
     *
     * A value at a specific id in the datasource can also be an array. To access the
     * context-nodes in the array use `get()` to get the array and the elements in the
     * array:
     *
     * ```javascript
     * var layoutController = new LayoutController({
     *   layout: function (context, options) {
     *     var size = context.size;
     *     var left = 0;
     *
     *     // Position title
     *     context.set('title', { size: [100, size[1]] });
     *     left += 100;
     *
     *     // Position left-items (array)
     *     var leftItems = context.get('leftItems');
     *     for (var i = 0; i < leftItems.length; i++) {
     *       var leftItem = context.get(leftItems[i]);
     *       context.set(leftItem, {
     *         size: [100, size[1]],
     *         translate: [left, 0, 0]
     *       });
     *       left += 100;
     *     }
     *   },
     *   dataSource: {
     *     title: new Surface({content: 'title'}),
     *     leftItems: [
     *       new Surface({content: 'item1'}),
     *       new Surface({content: 'item2'})
     *     ]
     *   }
     * });
     * ```
     *
     * @param {Object|String} node context-node or node-id
     * @return {Object} context-node or undefined
     */
    LayoutContext.prototype.get = function(node) {
        // dummy implementation, override in constructor
    };

    /**
     * Set the size, origin, align, translation, scale, rotate, skew & opacity for a context-node.
     *
     * **Overview of all supported properties:**
     *
     * ```javascript
     * function MyLayoutFunction(context, options) {
     *   context.set('mynode', {
     *     size: [100, 20],
     *     origin: [0.5, 0.5],
     *     align: [0.5, 0.5],
     *     translate: [50, 10, 0],
     *     scale: [1, 1, 1],
     *     skew: [0, 0, 0],
     *     rotate: [Math.PI, 0, 0],
     *     opacity: 1
     *   })
     * }
     * ```
     *
     * @param {Object|String} node context-node or node-id
     * @param {Object} set properties: size, origin, align, translate, scale, rotate, skew & opacity
     */
    LayoutContext.prototype.set = function(node, set) {
        // dummy implementation, override in constructor
    };

    /**
     * Resolve the size of a context-node by accessing the `getSize` function
     * of the renderable.
     *
     * **Example:**
     *
     * ```javascript
     * var layoutController = new LayoutController({
     *   layout: function (context, options) {
     *     var centerSize = context.resolveSize('center');
     *     context.set('center', {origin: [0.5, 0.5]});
     *     context.set('centerRight', {
     *       origin: [0.5, 0.5],
     *       translate: [centerSize[0] / 2, 0, 0]
     *     });
     *   },
     *   dataSource: {
     *     center: new Surface({content: 'center'}),
     *     centerRight: new Surface({content: 'centerRight'}),
     *   }
     * });
     * ```
     *
     * **When the size of the renderable is calculated by the DOM (`true` size)**
     *
     * When the layout-function performs its layout for the first time, it is
     * possible that the renderable has not yet been rendered and its size
     * is unknown. In this case, the LayoutController will cause a second
     * reflow of the layout the next render-cycle, ensuring that the renderables
     * are layed out as expected.
     *
     * @param {Object|String} node context-node, node-id or array-element
     * @return {Size} size of the node
     */
    LayoutContext.prototype.resolveSize = function(node) {
        // dummy implementation, override in constructor
    };

    module.exports = LayoutContext;

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-flex\\LayoutContext.js","/..\\res\\famous-flex")
},{"VCmEsw":43,"buffer":40}],48:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014 - 2015
 */

/*global console*/
/*eslint no-console: 0*/

/**
 * LayoutController lays out renderables according to a layout-
 * function and a data-source.
 *
 * Events:
 *
 * |event      |description|
 * |-----------|-----------|
 * |layoutstart|Emitted before the layout function is executed.|
 * |layoutend  |Emitted after the layout function has been executed.|
 * |reflow     |Emitted after one or more renderables have been changed.|
 *
 * @module
 */

    // import dependencies
    var Utility = require('../../node_modules/famous/utilities/Utility');
    var Entity = require('../../node_modules/famous/core/Entity');
    var ViewSequence = require('../../node_modules/famous/core/ViewSequence');
    var OptionsManager = require('../../node_modules/famous/core/OptionsManager');
    var EventHandler = require('../../node_modules/famous/core/EventHandler');
    var LayoutUtility = require('./LayoutUtility');
    var LayoutNodeManager = require('./LayoutNodeManager');
    var LayoutNode = require('./LayoutNode');
    var FlowLayoutNode = require('./FlowLayoutNode');
    var Transform = require('../../node_modules/famous/core/Transform');
    require('./helpers/LayoutDockHelper');

    /**
     * @class
     * @param {Object} options Options.
     * @param {Function|Object} [options.layout] Layout function or layout-literal.
     * @param {Object} [options.layoutOptions] Options to pass in to the layout-function.
     * @param {Array|ViewSequence|Object} [options.dataSource] Array, ViewSequence or Object with key/value pairs.
     * @param {Utility.Direction} [options.direction] Direction to layout into (e.g. Utility.Direction.Y) (when omitted the default direction of the layout is used)
     * @param {Bool} [options.flow] Enables flow animations when the layout changes (default: `false`).
     * @param {Object} [options.flowOptions] Options used by nodes when reflowing.
     * @param {Bool} [options.flowOptions.reflowOnResize] Smoothly reflows renderables on resize (only used when flow = true) (default: `true`).
     * @param {Object} [options.flowOptions.spring] Spring options used by nodes when reflowing (default: `{dampingRatio: 0.8, period: 300}`).
     * @param {Object} [options.flowOptions.properties] Properties which should be enabled or disabled for flowing.
     * @param {Spec} [options.flowOptions.insertSpec] Size, transform, opacity... to use when inserting new renderables into the scene (default: `{}`).
     * @param {Spec} [options.flowOptions.removeSpec] Size, transform, opacity... to use when removing renderables from the scene (default: `{}`).
     * @param {Bool} [options.alwaysLayout] When set to true, always calls the layout function on every render-cycle (default: `false`).
     * @param {Bool} [options.autoPipeEvents] When set to true, automatically calls .pipe on all renderables when inserted (default: `false`).
     * @param {Object} [options.preallocateNodes] Optimisation option to improve initial scrolling/animation performance by pre-allocating nodes, e.g.: `{count: 50, spec: {size:[0, 0], transform: Transform.identity}}`.
     * @alias module:LayoutController
     */
    function LayoutController(options, nodeManager) {

        // Commit
        this.id = Entity.register(this);
        this._isDirty = true;
        this._contextSizeCache = [0, 0];
        this._commitOutput = {};

        // Create an object to we can capture the famo.us cleanup call on
        // LayoutController.
        this._cleanupRegistration = {
          commit: function() {
              return undefined;
          },
          cleanup: function(context) {
              this.cleanup(context);
          }.bind(this)
        };
        this._cleanupRegistration.target = Entity.register(this._cleanupRegistration);
        this._cleanupRegistration.render = function() {
          return this.target;
        }.bind(this._cleanupRegistration);

        // Setup input event handler
        this._eventInput = new EventHandler();
        EventHandler.setInputHandler(this, this._eventInput);

        // Setup event handlers
        this._eventOutput = new EventHandler();
        EventHandler.setOutputHandler(this, this._eventOutput);

        // Data-source
        //this._dataSource = undefined;
        //this._nodesById = undefined;
        //this._viewSequence = undefined;

        // Layout
        this._layout = {
            //function: undefined,
            //literal: undefined,
            //capabilities: undefined,
            options: Object.create({})
        };
        //this._direction = undefined;
        this._layout.optionsManager = new OptionsManager(this._layout.options);
        this._layout.optionsManager.on('change', function() {
            this._isDirty = true;
        }.bind(this));

        // Create options
        this.options = Object.create(LayoutController.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);

        // Create node manager that manages (Flow)LayoutNode instances
        if (nodeManager) {
            this._nodes = nodeManager;
        }
        else if (options && options.flow) {
            this._nodes = new LayoutNodeManager(FlowLayoutNode, _initFlowLayoutNode.bind(this));
        }
        else {
            this._nodes = new LayoutNodeManager(LayoutNode);
        }

        // Set options
        this.setDirection(undefined);
        if (options) {
            this.setOptions(options);
        }
    }

    LayoutController.DEFAULT_OPTIONS = {
        flow: false,
        flowOptions: {
            reflowOnResize: true,
            properties: {
                opacity: true,
                align: true,
                origin: true,
                size: true,
                translate: true,
                skew: true,
                rotate: true,
                scale: true
            },
            spring: {
                dampingRatio: 0.8,
                period: 300
            }
            /*insertSpec: {
                opacity: undefined,
                size: undefined,
                transform: undefined,
                origin: undefined,
                align: undefined
            },
            removeSpec: {
                opacity: undefined,
                size: undefined,
                transform: undefined,
                origin: undefined,
                align: undefined
            }*/
        }
    };

    /**
     * Called whenever a layout-node is created/re-used. Initializes
     * the node with the `insertSpec` if it has been defined.
     */
    function _initFlowLayoutNode(node, spec) {
        if (!spec && this.options.flowOptions.insertSpec) {
            node.setSpec(this.options.flowOptions.insertSpec);
        }
    }

    /**
     * Patches the LayoutController instance's options with the passed-in ones.
     *
     * @param {Options} options An object of configurable options for the LayoutController instance.
     * @param {Function|Object} [options.layout] Layout function or layout-literal.
     * @param {Object} [options.layoutOptions] Options to pass in to the layout-function.
     * @param {Array|ViewSequence|Object} [options.dataSource] Array, ViewSequence or Object with key/value pairs.
     * @param {Utility.Direction} [options.direction] Direction to layout into (e.g. Utility.Direction.Y) (when omitted the default direction of the layout is used)
     * @param {Object} [options.flowOptions] Options used by nodes when reflowing.
     * @param {Bool} [options.flowOptions.reflowOnResize] Smoothly reflows renderables on resize (only used when flow = true) (default: `true`).
     * @param {Object} [options.flowOptions.spring] Spring options used by nodes when reflowing (default: `{dampingRatio: 0.8, period: 300}`).
     * @param {Object} [options.flowOptions.properties] Properties which should be enabled or disabled for flowing.
     * @param {Spec} [options.flowOptions.insertSpec] Size, transform, opacity... to use when inserting new renderables into the scene (default: `{}`).
     * @param {Spec} [options.flowOptions.removeSpec] Size, transform, opacity... to use when removing renderables from the scene (default: `{}`).
     * @param {Bool} [options.alwaysLayout] When set to true, always calls the layout function on every render-cycle (default: `false`).
     * @return {LayoutController} this
     */
    LayoutController.prototype.setOptions = function(options) {
        if ((options.alignment !== undefined) && (options.alignment !== this.options.alignment)) {
            this._isDirty = true;
        }
        this._optionsManager.setOptions(options);
        if (options.nodeSpring) {
            console.warn('nodeSpring options have been moved inside `flowOptions`. Use `flowOptions.spring` instead.');
            this._optionsManager.setOptions({
                flowOptions: {
                    spring: options.nodeSpring
                }
            });
            this._nodes.setNodeOptions(this.options.flowOptions);
        }
        if (options.reflowOnResize !== undefined) {
            console.warn('reflowOnResize options have been moved inside `flowOptions`. Use `flowOptions.reflowOnResize` instead.');
            this._optionsManager.setOptions({
                flowOptions: {
                    reflowOnResize: options.reflowOnResize
                }
            });
            this._nodes.setNodeOptions(this.options.flowOptions);
        }
        if (options.insertSpec) {
            console.warn('insertSpec options have been moved inside `flowOptions`. Use `flowOptions.insertSpec` instead.');
            this._optionsManager.setOptions({
                flowOptions: {
                    insertSpec: options.insertSpec
                }
            });
            this._nodes.setNodeOptions(this.options.flowOptions);
        }
        if (options.removeSpec) {
            console.warn('removeSpec options have been moved inside `flowOptions`. Use `flowOptions.removeSpec` instead.');
            this._optionsManager.setOptions({
                flowOptions: {
                    removeSpec: options.removeSpec
                }
            });
            this._nodes.setNodeOptions(this.options.flowOptions);
        }
        if (options.dataSource) {
            this.setDataSource(options.dataSource);
        }
        if (options.layout) {
            this.setLayout(options.layout, options.layoutOptions);
        }
        else if (options.layoutOptions) {
            this.setLayoutOptions(options.layoutOptions);
        }
        if (options.direction !== undefined) {
            this.setDirection(options.direction);
        }
        if (options.flowOptions && this.options.flow) {
            this._nodes.setNodeOptions(this.options.flowOptions);
        }
        if (options.preallocateNodes) {
            this._nodes.preallocateNodes(options.preallocateNodes.count || 0, options.preallocateNodes.spec);
        }
        return this;
    };

    /**
     * Helper function to enumerate all the renderables in the datasource
     */
    function _forEachRenderable(callback) {
        var dataSource = this._dataSource;
        if (dataSource instanceof Array) {
            for (var i = 0, j = dataSource.length; i < j; i++) {
                callback(dataSource[i]);
            }
        }
        else if (dataSource instanceof ViewSequence) {
            var renderable;
            while (dataSource) {
                renderable = dataSource.get();
                if (!renderable) {
                    break;
                }
                callback(renderable);
                dataSource = dataSource.getNext();
            }
        }
        else {
            for (var key in dataSource) {
                callback(dataSource[key]);
            }
        }
    }

    /**
     * Sets the collection of renderables which are layed out according to
     * the layout-function.
     *
     * The data-source can be either an Array, ViewSequence or Object
     * with key/value pairs.
     *
     * @param {Array|Object|ViewSequence} dataSource Array, ViewSequence or Object.
     * @return {LayoutController} this
     */
    LayoutController.prototype.setDataSource = function(dataSource) {
        this._dataSource = dataSource;
        this._nodesById = undefined;
        if (dataSource instanceof Array) {
            this._viewSequence = new ViewSequence(dataSource);
        }
        else if ((dataSource instanceof ViewSequence) || dataSource.getNext) {
            this._viewSequence = dataSource;
        }
        else if (dataSource instanceof Object){
            this._nodesById = dataSource;
        }
        if (this.options.autoPipeEvents) {
            if (this._dataSource.pipe) {
                this._dataSource.pipe(this);
                this._dataSource.pipe(this._eventOutput);
            }
            else {
                _forEachRenderable.call(this, function(renderable) {
                    if (renderable && renderable.pipe) {
                        renderable.pipe(this);
                        renderable.pipe(this._eventOutput);
                    }
                }.bind(this));
            }
        }
        this._isDirty = true;
        return this;
    };

    /**
     * Get the data-source.
     *
     * @return {Array|ViewSequence|Object} data-source
     */
    LayoutController.prototype.getDataSource = function() {
        return this._dataSource;
    };

    /**
     * Set the new layout.
     *
     * @param {Function|Object} layout Layout function or layout-literal
     * @param {Object} [options] Options to pass in to the layout-function
     * @return {LayoutController} this
     */
    LayoutController.prototype.setLayout = function(layout, options) {

        // Set new layout funtion
        if (layout instanceof Function) {
            this._layout._function = layout;
            this._layout.capabilities = layout.Capabilities;
            this._layout.literal = undefined;

        // If the layout is an object, treat it as a layout-literal
        }
        else if (layout instanceof Object) {
            this._layout.literal = layout;
            this._layout.capabilities = undefined; // todo - derive from literal somehow?
            var helperName = Object.keys(layout)[0];
            var Helper = LayoutUtility.getRegisteredHelper(helperName);
            this._layout._function = Helper ? function(context, options2) {
                var helper = new Helper(context, options2);
                helper.parse(layout[helperName]);
            } : undefined;
        }
        else {
            this._layout._function = undefined;
            this._layout.capabilities = undefined;
            this._layout.literal = undefined;
        }

        // Update options
        if (options) {
            this.setLayoutOptions(options);
        }

        // Update direction
        this.setDirection(this._configuredDirection);
        this._isDirty = true;
        return this;
    };

    /**
     * Get the current layout.
     *
     * @return {Function|Object} Layout function or layout literal
     */
    LayoutController.prototype.getLayout = function() {
        return this._layout.literal || this._layout._function;
    };

    /**
     * Set the options for the current layout. Use this function after
     * `setLayout` to update one or more options for the layout-function.
     *
     * @param {Object} [options] Options to pass in to the layout-function
     * @return {LayoutController} this
     */
    LayoutController.prototype.setLayoutOptions = function(options) {
        this._layout.optionsManager.setOptions(options);
        return this;
    };

    /**
     * Get the current layout options.
     *
     * @return {Object} Layout options
     */
    LayoutController.prototype.getLayoutOptions = function() {
        return this._layout.options;
    };

    /**
     * Calculates the actual in-use direction based on the given direction
     * and supported capabilities of the layout-function.
     */
    function _getActualDirection(direction) {

        // When the direction is configured in the capabilities, look it up there
        if (this._layout.capabilities && this._layout.capabilities.direction) {

            // Multiple directions are supported
            if (Array.isArray(this._layout.capabilities.direction)) {
                for (var i = 0; i < this._layout.capabilities.direction.length; i++) {
                    if (this._layout.capabilities.direction[i] === direction) {
                        return direction;
                    }
                }
                return this._layout.capabilities.direction[0];
            }

            // Only one direction is supported, we must use that
            else {
                return this._layout.capabilities.direction;
            }
        }

        // Use Y-direction as a fallback
        return (direction === undefined) ? Utility.Direction.Y : direction;
    }

    /**
     * Set the direction of the layout. When no direction is set, the default
     * direction of the layout function is used.
     *
     * @param {Utility.Direction} direction Direction (e.g. Utility.Direction.X)
     * @return {LayoutController} this
     */
    LayoutController.prototype.setDirection = function(direction) {
        this._configuredDirection = direction;
        var newDirection = _getActualDirection.call(this, direction);
        if (newDirection !== this._direction) {
            this._direction = newDirection;
            this._isDirty = true;
        }
    };

    /**
     * Get the direction (e.g. Utility.Direction.Y). By default, this function
     * returns the direction that was configured by setting `setDirection`. When
     * the direction has not been set, `undefined` is returned.
     *
     * When no direction has been set, the first direction is used that is specified
     * in the capabilities of the layout-function. To obtain the actual in-use direction,
     * use `getDirection(true)`. This method returns the actual in-use direction and
     * never returns undefined.
     *
     * @param {Boolean} [actual] Set to true to obtain the actual in-use direction
     * @return {Utility.Direction} Direction or undefined
     */
    LayoutController.prototype.getDirection = function(actual) {
        return actual ? this._direction : this._configuredDirection;
    };

    /**
     * Get the spec (size, transform, etc..) for the given renderable or
     * Id.
     *
     * @param {Renderable|String} node Renderabe or Id to look for
     * @param {Bool} normalize When set to `true` normalizes the origin/align into the transform translation (default: `false`).
     * @return {Spec} spec or undefined
     */
    LayoutController.prototype.getSpec = function(node, normalize) {
        if (!node) {
            return undefined;
        }
        if ((node instanceof String) || (typeof node === 'string')) {
            if (!this._nodesById) {
               return undefined;
            }
            node = this._nodesById[node];
            if (!node) {
                return undefined;
            }

            // If the result was an array, return that instead
            if (node instanceof Array) {
                return node;
            }
        }
        if (this._specs) {
            for (var i = 0; i < this._specs.length; i++) {
                var spec = this._specs[i];
                if (spec.renderNode === node) {
                    if (normalize && spec.transform && spec.size && (spec.align || spec.origin)) {
                        var transform = spec.transform;
                        if (spec.align && (spec.align[0] || spec.align[1])) {
                            transform = Transform.thenMove(transform, [spec.align[0] * this._contextSizeCache[0], spec.align[1] * this._contextSizeCache[1], 0]);
                        }
                        if (spec.origin && (spec.origin[0] || spec.origin[1])) {
                            transform = Transform.moveThen([-spec.origin[0] * spec.size[0], -spec.origin[1] * spec.size[1], 0], transform);
                        }
                        return {
                            opacity: spec.opacity,
                            size: spec.size,
                            transform: transform
                        };
                    }
                    return spec;
                }
            }
        }
        return undefined;
    };

    /**
     * Forces a reflow of the layout the next render cycle.
     *
     * @return {LayoutController} this
     */
    LayoutController.prototype.reflowLayout = function() {
        this._isDirty = true;
        return this;
    };

    /**
     * Resets the current flow state, so that all renderables
     * are immediately displayed in their end-state.
     *
     * @return {LayoutController} this
     */
    LayoutController.prototype.resetFlowState = function() {
        if (this.options.flow) {
            this._resetFlowState = true;
        }
        return this;
    };

    /**
     * Inserts a renderable into the data-source.
     *
     * The optional argument `insertSpec` is only used `flow` mode is enabled.
     * When specified, the renderable is inserted using an animation starting with
     * size, origin, opacity, transform, etc... as specified in `insertSpec'.
     *
     * @param {Number|String} indexOrId Index (0 = before first, -1 at end), within dataSource array or id (String)
     * @param {Object} renderable Renderable to add to the data-source
     * @param {Spec} [insertSpec] Size, transform, etc.. to start with when inserting
     * @return {LayoutController} this
     */
    LayoutController.prototype.insert = function(indexOrId, renderable, insertSpec) {

        // Add the renderable in case of an id (String)
        if ((indexOrId instanceof String) || (typeof indexOrId === 'string')) {

            // Create data-source if neccesary
            if (this._dataSource === undefined) {
                this._dataSource = {};
                this._nodesById = this._dataSource;
            }

            // Insert renderable
            if (this._nodesById[indexOrId] === renderable) {
                return this;
            }
            this._nodesById[indexOrId] = renderable;
        }

        // Add the renderable using an index
        else {

            // Create data-source if neccesary
            if (this._dataSource === undefined) {
                this._dataSource = [];
                this._viewSequence = new ViewSequence(this._dataSource);
            }

            // Insert into array
            var dataSource = this._viewSequence || this._dataSource;
            if (indexOrId === -1) {
                dataSource.push(renderable);
            }
            else if (indexOrId === 0) {
                if (dataSource === this._viewSequence) {
                    dataSource.splice(0, 0, renderable);
                    if (this._viewSequence.getIndex() === 0) {
                        var nextViewSequence = this._viewSequence.getNext();
                        if (nextViewSequence && nextViewSequence.get()) {
                            this._viewSequence = nextViewSequence;
                        }
                    }
                }
                else {
                    dataSource.splice(0, 0, renderable);
                }
            }
            else {
                dataSource.splice(indexOrId, 0, renderable);
            }
        }

        // When a custom insert-spec was specified, store that in the layout-node
        if (insertSpec) {
            this._nodes.insertNode(this._nodes.createNode(renderable, insertSpec));
        }

        // Auto pipe events
        if (this.options.autoPipeEvents && renderable && renderable.pipe) {
            renderable.pipe(this);
            renderable.pipe(this._eventOutput);
        }

        // Force a reflow
        this._isDirty = true;

        return this;
    };

    /**
     * Adds a renderable to the end of a sequential data-source.
     *
     * The optional argument `insertSpec` is only used `flow` mode is enabled.
     * When specified, the renderable is inserted using an animation starting with
     * size, origin, opacity, transform, etc... as specified in `insertSpec'.
     *
     * @param {Object} renderable Renderable to add to the data-source
     * @param {Spec} [insertSpec] Size, transform, etc.. to start with when inserting
     * @return {LayoutController} this
     */
    LayoutController.prototype.push = function(renderable, insertSpec) {
        return this.insert(-1, renderable, insertSpec);
    };

    /**
     * Helper function for finding the view-sequence node at the given position.
     */
    function _getViewSequenceAtIndex(index, startViewSequence) {
        var viewSequence = startViewSequence || this._viewSequence;
        var i = viewSequence ? viewSequence.getIndex() : index;
        if (index > i) {
            while (viewSequence) {
                viewSequence = viewSequence.getNext();
                if (!viewSequence) {
                    return undefined;
                }
                i = viewSequence.getIndex();
                if (i === index) {
                    return viewSequence;
                }
                else if (index < i) {
                    return undefined;
                }
            }
        }
        else if (index < i) {
            while (viewSequence) {
                viewSequence = viewSequence.getPrevious();
                if (!viewSequence) {
                    return undefined;
                }
                i = viewSequence.getIndex();
                if (i === index) {
                    return viewSequence;
                }
                else if (index > i) {
                    return undefined;
                }
            }
        }
        return viewSequence;
    }

    /**
     * Helper that return the underlying array datasource if available.
     */
    function _getDataSourceArray() {
      if (Array.isArray(this._dataSource)) {
        return this._dataSource;
      }
      else if (this._viewSequence || this._viewSequence._) {
        return this._viewSequence._.array;
      }
      return undefined;
    }

    /**
     * Get the renderable at the given index or Id.
     *
     * @param {Number|String} indexOrId Index within dataSource array or id (String)
     * @return {Renderable} renderable or `undefined`
     */
    LayoutController.prototype.get = function(indexOrId) {
      if (this._nodesById || (indexOrId instanceof String) || (typeof indexOrId === 'string')) {
        return this._nodesById[indexOrId];
      }
      var viewSequence = _getViewSequenceAtIndex.call(this, indexOrId);
      return viewSequence ? viewSequence.get() : undefined;
    };

    /**
     * Swaps two renderables at the given positions.
     *
     * This method is only supported for dataSources of type Array or ViewSequence.
     *
     * @param {Number} index Index of the renderable to swap
     * @param {Number} index2 Index of the renderable to swap with
     * @return {LayoutController} this
     */
    LayoutController.prototype.swap = function(index, index2) {
        var array = _getDataSourceArray.call(this);
        if (!array) {
            throw '.swap is only supported for dataSources of type Array or ViewSequence';
        }
        if (index === index2) {
          return this;
        }
        if ((index < 0) || (index >= array.length)) {
          throw 'Invalid index (' + index + ') specified to .swap';
        }
        if ((index2 < 0) || (index2 >= array.length)) {
          throw 'Invalid second index (' + index2 + ') specified to .swap';
        }
        var renderNode = array[index];
        array[index] = array[index2];
        array[index2] = renderNode;
        this._isDirty = true;
        return this;
    };

    /**
     * Replaces a renderable at the given index or id.
     *
     * @param {Number|String} indexOrId Index within dataSource array or id (String)
     * @param {Renderable} renderable renderable to replace with
     * @return {Renderable} old renderable that has been replaced
     */
    LayoutController.prototype.replace = function(indexOrId, renderable) {
        var oldRenderable;
        if (this._nodesById || (indexOrId instanceof String) || (typeof indexOrId === 'string')) {
            oldRenderable = this._nodesById[indexOrId];
            if (oldRenderable !== renderable) {
              this._nodesById[indexOrId] = renderable;
              this._isDirty = true;
            }
            return oldRenderable;
        }
        var array = _getDataSourceArray.call(this);
        if (!array) {
          return undefined;
        }
        if ((indexOrId < 0) || (indexOrId >= array.length)) {
          throw 'Invalid index (' + indexOrId + ') specified to .replace';
        }
        oldRenderable = array[indexOrId];
        if (oldRenderable !== renderable) {
          array[indexOrId] = renderable;
          this._isDirty = true;
        }
        return oldRenderable;
    };

    /**
     * Moves a renderable to a new index.
     *
     * This method is only supported for dataSources of type Array or ViewSequence.
     *
     * @param {Number} index Index of the renderable to move.
     * @param {Number} newIndex New index of the renderable.
     * @return {LayoutController} this
     */
    LayoutController.prototype.move = function(index, newIndex) {
        var array = _getDataSourceArray.call(this);
        if (!array) {
            throw '.move is only supported for dataSources of type Array or ViewSequence';
        }
        if ((index < 0) || (index >= array.length)) {
          throw 'Invalid index (' + index + ') specified to .move';
        }
        if ((newIndex < 0) || (newIndex >= array.length)) {
          throw 'Invalid newIndex (' + newIndex + ') specified to .move';
        }
        var item = array.splice(index, 1)[0];
        array.splice(newIndex, 0, item);
        this._isDirty = true;
        return this;
    };

    /**
     * Removes a renderable from the data-source.
     *
     * The optional argument `removeSpec` is only used `flow` mode is enabled.
     * When specified, the renderable is removed using an animation ending at
     * the size, origin, opacity, transform, etc... as specified in `removeSpec'.
     *
     * @param {Number|String|Renderable} indexOrId Index, id (String) or renderable to remove.
     * @param {Spec} [removeSpec] Size, transform, etc.. to end with when removing
     * @return {Renderable} renderable that has been removed
     */
    LayoutController.prototype.remove = function(indexOrId, removeSpec) {
        var renderNode;

        // Remove the renderable in case of an id (String)
        if (this._nodesById || (indexOrId instanceof String) || (typeof indexOrId === 'string')) {

            // Find and remove renderable from data-source
            if ((indexOrId instanceof String) || (typeof indexOrId === 'string')) {
                renderNode = this._nodesById[indexOrId];
                if (renderNode) {
                    delete this._nodesById[indexOrId];
                }
            }
            else {
                for (var key in this._nodesById) {
                    if (this._nodesById[key] === indexOrId) {
                        delete this._nodesById[key];
                        renderNode = indexOrId;
                        break;
                    }
                }
            }
        }

        // Remove the renderable using an index
        else if ((indexOrId instanceof Number) || (typeof indexOrId === 'number')) {
            var array = _getDataSourceArray.call(this);
            if (!array || (indexOrId < 0) || (indexOrId >= array.length)) {
                throw 'Invalid index (' + indexOrId + ') specified to .remove (or dataSource doesn\'t support remove)';
            }
            renderNode = array[indexOrId];
            this._dataSource.splice(indexOrId, 1);
        }

        // Remove by renderable
        else {
            indexOrId = this._dataSource.indexOf(indexOrId);
            if (indexOrId >= 0) {
                this._dataSource.splice(indexOrId, 1);
                renderNode = indexOrId;
            }
        }

        // When a node is removed from the view-sequence, the current this._viewSequence
        // node may not be part of the valid view-sequence anymore. This seems to be a bug
        // in the famo.us ViewSequence implementation/concept. The following check was added
        // to ensure that always a valid viewSequence node is selected into the ScrollView.
        if (this._viewSequence && renderNode) {
            var viewSequence = _getViewSequenceAtIndex.call(this, this._viewSequence.getIndex(), this._dataSource);
            viewSequence = viewSequence || _getViewSequenceAtIndex.call(this, this._viewSequence.getIndex() - 1, this._dataSource);
            viewSequence = viewSequence || this._dataSource;
            this._viewSequence = viewSequence;
        }

        // When a custom remove-spec was specified, store that in the layout-node
        if (renderNode && removeSpec) {
            var node = this._nodes.getNodeByRenderNode(renderNode);
            if (node) {
                node.remove(removeSpec || this.options.flowOptions.removeSpec);
            }
        }

        // Force a reflow
        if (renderNode) {
            this._isDirty = true;
        }

        return renderNode;
    };

    /**
     * Removes all renderables from the data-source.
     *
     * The optional argument `removeSpec` is only used when `flow` mode is enabled.
     * When specified, the renderables are removed using an animation ending at
     * the size, origin, opacity, transform, etc... as specified in `removeSpec'.
     *
     * @param {Spec} [removeSpec] Size, transform, etc.. to end with when removing
     * @return {LayoutController} this
     */
    LayoutController.prototype.removeAll = function(removeSpec) {
        if (this._nodesById) {
            var dirty = false;
            for (var key in this._nodesById) {
                delete this._nodesById[key];
                dirty = true;
            }
            if (dirty) {
                this._isDirty = true;
            }
        }
        else if (this._dataSource){
            this.setDataSource([]);
        }
        if (removeSpec) {
            var node = this._nodes.getStartEnumNode();
            while (node) {
                node.remove(removeSpec || this.options.flowOptions.removeSpec);
                node = node._next;
            }
        }
        return this;
    };

    /**
     * Return size of contained element or `undefined` when size is not defined.
     *
     * @return {Array.Number} [width, height]
     */
    LayoutController.prototype.getSize = function() {
        return this._size || this.options.size;
    };

    /**
     * Generate a render spec from the contents of this component.
     *
     * @private
     * @method render
     * @return {Object} Render spec for this component
     */
    LayoutController.prototype.render = function render() {
        return this.id;
    };

    /**
     * Apply changes from this component to the corresponding document element.
     * This includes changes to classes, styles, size, content, opacity, origin,
     * and matrix transforms.
     *
     * @private
     * @method commit
     * @param {Context} context commit context
     */
    LayoutController.prototype.commit = function commit(context) {
        var transform = context.transform;
        var origin = context.origin;
        var size = context.size;
        var opacity = context.opacity;

        // Reset the flow-state when requested
        if (this._resetFlowState) {
            this._resetFlowState = false;
            this._isDirty = true;
            this._nodes.removeAll();
        }

        // When the size or layout function has changed, reflow the layout
        if (size[0] !== this._contextSizeCache[0] ||
            size[1] !== this._contextSizeCache[1] ||
            this._isDirty ||
            this._nodes._trueSizeRequested ||
            this.options.alwaysLayout){

            // Emit start event
            var eventData = {
                target: this,
                oldSize: this._contextSizeCache,
                size: size,
                dirty: this._isDirty,
                trueSizeRequested: this._nodes._trueSizeRequested
            };
            this._eventOutput.emit('layoutstart', eventData);

            // When the layout has changed, and we are not just scrolling,
            // disable the locked state of the layout-nodes so that they
            // can freely transition between the old and new state.
            if (this.options.flow) {
                var lock = false;
                if (!this.options.flowOptions.reflowOnResize) {
                    if (!this._isDirty &&
                        ((size[0] !== this._contextSizeCache[0]) ||
                         (size[1] !== this._contextSizeCache[1]))) {
                        lock = undefined;
                    }
                    else {
                      lock = true;
                    }
                }
                if (lock !== undefined) {
                    var node = this._nodes.getStartEnumNode();
                    while (node) {
                        node.releaseLock(lock);
                        node = node._next;
                    }
                }
            }

            // Update state
            this._contextSizeCache[0] = size[0];
            this._contextSizeCache[1] = size[1];
            this._isDirty = false;

            // Prepare for layout
            var scrollEnd;
            if (this.options.size && (this.options.size[this._direction] === true)) {
                scrollEnd = 1000000; // calculate scroll-length
            }
            var layoutContext = this._nodes.prepareForLayout(
                this._viewSequence,     // first node to layout
                this._nodesById, {      // so we can do fast id lookups
                    size: size,
                    direction: this._direction,
                    scrollEnd: scrollEnd
                }
            );

            // Layout objects
            if (this._layout._function) {
                this._layout._function(
                    layoutContext,          // context which the layout-function can use
                    this._layout.options    // additional layout-options
                );
            }

            // Mark non-invalidated nodes for removal
            this._nodes.removeNonInvalidatedNodes(this.options.flowOptions.removeSpec);

            // Cleanup any nodes in case of a VirtualViewSequence
            this._nodes.removeVirtualViewSequenceNodes();

            // Calculate scroll-length and use that as the true-size (height)
            if (scrollEnd) {
                scrollEnd = 0;
                node = this._nodes.getStartEnumNode();
                while (node) {
                    if (node._invalidated && node.scrollLength) {
                        scrollEnd += node.scrollLength;
                    }
                    node = node._next;
                }
                this._size = this._size || [0, 0];
                this._size[0] = this.options.size[0];
                this._size[1] = this.options.size[1];
                this._size[this._direction] = scrollEnd;
            }

            // Update output and optionally emit event
            var result = this._nodes.buildSpecAndDestroyUnrenderedNodes();
            this._specs = result.specs;
            this._commitOutput.target = result.specs;
            this._eventOutput.emit('layoutend', eventData);
            this._eventOutput.emit('reflow', {
                target: this
            });
        }
        else if (this.options.flow) {

            // Update output and optionally emit event
            result = this._nodes.buildSpecAndDestroyUnrenderedNodes();
            this._specs = result.specs;
            this._commitOutput.target = result.specs;
            if (result.modified) {
                this._eventOutput.emit('reflow', {
                    target: this
                });
            }
        }

        // Render child-nodes every commit
        var target = this._commitOutput.target;
        for (var i = 0, j = target.length; i < j; i++) {
            if (target[i].renderNode) {
                target[i].target = target[i].renderNode.render();
            }
        }

        // Add our cleanup-registration id also to the list, so that the
        // cleanup function is called by famo.us when the LayoutController is
        // removed from the render-tree.
        if (!target.length || (target[target.length-1] !== this._cleanupRegistration)) {
            target.push(this._cleanupRegistration);
        }

        // Translate dependent on origin
        if (origin && ((origin[0] !== 0) || (origin[1] !== 0))) {
            transform = Transform.moveThen([-size[0]*origin[0], -size[1]*origin[1], 0], transform);
        }
        this._commitOutput.size = size;
        this._commitOutput.opacity = opacity;
        this._commitOutput.transform = transform;
        return this._commitOutput;
    };

    /**
     * Called whenever the layout-controller is removed from the render-tree.
     *
     * @private
     * @param {Context} context cleanup context
     */
    LayoutController.prototype.cleanup = function(context) {
        if (this.options.flow) {
            this._resetFlowState = true;
        }
    };

    module.exports = LayoutController;

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-flex\\LayoutController.js","/..\\res\\famous-flex")
},{"../../node_modules/famous/core/Entity":9,"../../node_modules/famous/core/EventHandler":11,"../../node_modules/famous/core/OptionsManager":14,"../../node_modules/famous/core/Transform":18,"../../node_modules/famous/core/ViewSequence":20,"../../node_modules/famous/utilities/Utility":38,"./FlowLayoutNode":46,"./LayoutNode":49,"./LayoutNodeManager":50,"./LayoutUtility":51,"./helpers/LayoutDockHelper":53,"VCmEsw":43,"buffer":40}],49:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/**
 * Internal LayoutNode class used by `LayoutController`.
 *
 * @module
 */

    // import dependencies
    var Transform = require('famous/core/Transform');
    var LayoutUtility = require('./LayoutUtility');

    /**
     * @class
     * @param {Object} renderNode Render-node which this layout-node represents
     * @alias module:LayoutNode
     */
    function LayoutNode(renderNode, spec) {
        this.renderNode = renderNode;
        this._spec = spec ? LayoutUtility.cloneSpec(spec) : {};
        this._spec.renderNode = renderNode; // also store in spec
        this._specModified = true;
        this._invalidated = false;
        this._removing = false;
        //this.scrollLength = undefined;
        //this.trueSizeRequested = false;
    }

    /**
     * Called to update the options for the node
     */
    LayoutNode.prototype.setOptions = function(options) {
        // override to implement
    };

    /**
     * Called when the node is destroyed
     */
    LayoutNode.prototype.destroy = function() {
        this.renderNode = undefined;
        this._spec.renderNode = undefined;
        this._viewSequence = undefined;
    };

    /**
     * Reset the end-state. This function is called on all layout-nodes prior to
     * calling the layout-function. So that the layout-function starts with a clean slate.
     */
    LayoutNode.prototype.reset = function() {
        this._invalidated = false;
        this.trueSizeRequested = false;
    };

    /**
     * Set the spec of the node
     *
     * @param {Object} spec
     */
    LayoutNode.prototype.setSpec = function(spec) {
        this._specModified = true;
        if (spec.align) {
            if (!spec.align) {
                this._spec.align = [0, 0];
            }
            this._spec.align[0] = spec.align[0];
            this._spec.align[1] = spec.align[1];
        }
        else {
            this._spec.align = undefined;
        }
        if (spec.origin) {
            if (!spec.origin) {
                this._spec.origin = [0, 0];
            }
            this._spec.origin[0] = spec.origin[0];
            this._spec.origin[1] = spec.origin[1];
        }
        else {
            this._spec.origin = undefined;
        }
        if (spec.size) {
            if (!spec.size) {
                this._spec.size = [0, 0];
            }
            this._spec.size[0] = spec.size[0];
            this._spec.size[1] = spec.size[1];
        }
        else {
            this._spec.size = undefined;
        }
        if (spec.transform) {
            if (!spec.transform) {
                this._spec.transform = spec.transform.slice(0);
            }
            else {
                for (var i = 0; i < 16; i++) {
                    this._spec.transform[i] = spec.transform[i];
                }
            }
        }
        else {
            this._spec.transform = undefined;
        }
        this._spec.opacity = spec.opacity;
    };

    /**
     * Set the content of the node
     *
     * @param {Object} set
     */
    LayoutNode.prototype.set = function(set, size) {
        this._invalidated = true;
        this._specModified = true;
        this._removing = false;
        var spec = this._spec;
        spec.opacity = set.opacity;
        if (set.size) {
            if (!spec.size) {
                spec.size = [0, 0];
            }
            spec.size[0] = set.size[0];
            spec.size[1] = set.size[1];
        }
        else {
            spec.size = undefined;
        }
        if (set.origin) {
            if (!spec.origin) {
                spec.origin = [0, 0];
            }
            spec.origin[0] = set.origin[0];
            spec.origin[1] = set.origin[1];
        }
        else {
            spec.origin = undefined;
        }
        if (set.align) {
            if (!spec.align) {
                spec.align = [0, 0];
            }
            spec.align[0] = set.align[0];
            spec.align[1] = set.align[1];
        }
        else {
            spec.align = undefined;
        }

        if (set.skew || set.rotate || set.scale) {
            this._spec.transform = Transform.build({
                translate: set.translate || [0, 0, 0],
                skew: set.skew || [0, 0, 0],
                scale: set.scale || [1, 1, 1],
                rotate: set.rotate || [0, 0, 0]
            });
        }
        else if (set.translate) {
            this._spec.transform = Transform.translate(set.translate[0], set.translate[1], set.translate[2]);
        }
        else {
            this._spec.transform = undefined;
        }
        this.scrollLength = set.scrollLength;
    };

    /**
     * Creates the render-spec
     */
    LayoutNode.prototype.getSpec = function() {
        this._specModified = false;
        this._spec.removed = !this._invalidated;
        return this._spec;
    };

    /**
     * Marks the node for removal
     */
    LayoutNode.prototype.remove = function(removeSpec) {
        this._removing = true;
    };

    module.exports = LayoutNode;

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-flex\\LayoutNode.js","/..\\res\\famous-flex")
},{"./LayoutUtility":51,"VCmEsw":43,"buffer":40,"famous/core/Transform":18}],50:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014 - 2015
 */

/**
 * LayoutNodeManager is a private class used internally by LayoutController, ScrollController
 * and ScrollView. It manages the layout-nodes that are rendered and exposes the layout-context
 * which is passed along to the layout-function.
 *
 * LayoutNodeManager keeps track of every rendered node through an ordered double-linked
 * list. The first time the layout-function is called, the linked list is created.
 * After that, the linked list is updated to reflect the output of the layout-function.
 * When the layout is unchanged, then the linked-list exactly matches the order of the
 * accessed nodes in the layout-function, and no layout-nodes need to be created or
 * re-ordered.
 *
 * @module
 */

    // import dependencies
    var LayoutContext = require('./LayoutContext');
    var LayoutUtility = require('./LayoutUtility');

    var MAX_POOL_SIZE = 100;

    /**
     * @class
     * @param {LayoutNode} LayoutNode Layout-nodes to create
     * @param {Function} initLayoutNodeFn function to use when initializing new nodes
     * @alias module:LayoutNodeManager
     */
    function LayoutNodeManager(LayoutNode, initLayoutNodeFn) {
        this.LayoutNode = LayoutNode;
        this._initLayoutNodeFn = initLayoutNodeFn;
        this._layoutCount = 0;
        this._context = new LayoutContext({
            next: _contextNext.bind(this),
            prev: _contextPrev.bind(this),
            get: _contextGet.bind(this),
            set: _contextSet.bind(this),
            resolveSize: _contextResolveSize.bind(this),
            size: [0, 0]
            //,cycle: 0
        });
        this._contextState = {
            // enumation state for the context
            //nextSequence: undefined,
            //prevSequence: undefined,
            //next: undefined
            //prev: undefined
            //start: undefined
        };
        this._pool = {
            layoutNodes: {
                size: 0
                //first: undefined
            },
            resolveSize: [0, 0]
        };
        //this._first = undefined; // first item in the linked list
        //this._nodesById = undefined;
        //this._trueSizeRequested = false;
    }

    /**
     * Prepares the manager for a new layout iteration, after which it returns the
     * context which can be used by the layout-function.
     *
     * @param {ViewSequence} viewSequence first node to layout
     * @param {Object} [nodesById] dictionary to use when looking up nodes by id
     * @return {LayoutContext} context which can be passed to the layout-function
     */
    LayoutNodeManager.prototype.prepareForLayout = function(viewSequence, nodesById, contextData) {

        // Reset all nodes
        var node = this._first;
        while (node) {
            node.reset();
            node = node._next;
        }

        // Prepare data
        var context = this._context;
        this._layoutCount++;
        this._nodesById = nodesById;
        this._trueSizeRequested = false;
        this._reevalTrueSize =
            contextData.reevalTrueSize ||
            !context.size ||
            (context.size[0] !== contextData.size[0]) ||
            (context.size[1] !== contextData.size[1]);

        // Prepare context for enumation
        var contextState = this._contextState;
        contextState.startSequence = viewSequence;
        contextState.nextSequence = viewSequence;
        contextState.prevSequence = viewSequence;
        contextState.start = undefined;
        contextState.nextGetIndex = 0;
        contextState.prevGetIndex = 0;
        contextState.nextSetIndex = 0;
        contextState.prevSetIndex = 0;
        contextState.addCount = 0;
        contextState.removeCount = 0;
        contextState.lastRenderNode = undefined;

        // Prepare content
        context.size[0] = contextData.size[0];
        context.size[1] = contextData.size[1];
        context.direction = contextData.direction;
        context.reverse = contextData.reverse;
        context.alignment = contextData.reverse ? 1 : 0;
        context.scrollOffset = contextData.scrollOffset || 0;
        context.scrollStart = contextData.scrollStart || 0;
        context.scrollEnd = contextData.scrollEnd || context.size[context.direction];
        //context.cycle++;
        return context;
    };

    /**
     * When the layout-function no longer lays-out the node, then it is not longer
     * being invalidated. In this case the destination is set to the removeSpec
     * after which the node is animated towards the remove-spec.
     *
     * @param {Spec} [removeSpec] spec towards which the no longer layed-out nodes are animated
     */
    LayoutNodeManager.prototype.removeNonInvalidatedNodes = function(removeSpec) {
        var node = this._first;
        while (node) {

            // If a node existed, but it is no longer being layed out,
            // then set it to the '_removing' state.
            if (!node._invalidated && !node._removing) {
                node.remove(removeSpec);
            }

            // Move to next node
            node = node._next;
        }
    };

    /**
     * Cleans up any unaccessed virtual nodes that have been created by a VirtualViewSequence.
     */
    LayoutNodeManager.prototype.removeVirtualViewSequenceNodes = function() {
        if (this._contextState.startSequence && this._contextState.startSequence.cleanup) {
            this._contextState.startSequence.cleanup();
        }
    };

    /**
     * Builds the render-spec and destroy any layout-nodes that no longer
     * return a render-spec.
     *
     * @return {Array.Spec} array of Specs
     */
    LayoutNodeManager.prototype.buildSpecAndDestroyUnrenderedNodes = function(translate) {
        var specs = [];
        var result = {
            specs: specs,
            modified: false
        };
        var node = this._first;
        while (node) {
            var modified = node._specModified;
            var spec = node.getSpec();
            //if (spec.removed && (!this._contextState.addCount || (this._contextState.removeCount > 5))) {
            if (spec.removed) {

                // Destroy node
                var destroyNode = node;
                node = node._next;
                _destroyNode.call(this, destroyNode);

                // Mark as modified
                result.modified = true;
            }
            else {

                // Update stats
                if (modified) {
                    if (spec.transform && translate) {
                        spec.transform[12] += translate[0];
                        spec.transform[13] += translate[1];
                        spec.transform[14] += translate[2];
                        spec.transform[12] = Math.round(spec.transform[12] * 100000) / 100000;
                        spec.transform[13] = Math.round(spec.transform[13] * 100000) / 100000;
                    }
                    result.modified = true;
                }

                // Add node to result output
                specs.push(spec);
                node = node._next;
            }
        }
        this._contextState.addCount = 0;
        this._contextState.removeCount = 0;
        return result;
    };

    /**
     * Get the layout-node by its renderable.
     *
     * @param {Object} renderable renderable
     * @return {LayoutNode} layout-node or undefined
     */
    LayoutNodeManager.prototype.getNodeByRenderNode = function(renderable) {
        var node = this._first;
        while (node) {
            if (node.renderNode === renderable) {
                return node;
            }
            node = node._next;
        }
        return undefined;
    };

    /**
     * Inserts a layout-node into the linked-list.
     *
     * @param {LayoutNode} node layout-node to insert
     */
    LayoutNodeManager.prototype.insertNode = function(node) {
        node._next = this._first;
        if (this._first) {
            this._first._prev = node;
        }
        this._first = node;
    };

    /**
     * Sets the options for all nodes.
     *
     * @param {Object} options node options
     */
    LayoutNodeManager.prototype.setNodeOptions = function(options) {
        this._nodeOptions = options;
        var node = this._first;
        while (node) {
            node.setOptions(options);
            node = node._next;
        }
        node = this._pool.layoutNodes.first;
        while (node) {
            node.setOptions(options);
            node = node._next;
        }
    };

    /**
     * Pre-allocate layout-nodes ahead of using them.
     *
     * @param {Number} count number of nodes to pre-allocate with the given spec
     * @param {Spec} [spec] render-spec (defined the node properties which to pre-allocate)
     */
    LayoutNodeManager.prototype.preallocateNodes = function(count, spec) {
        var nodes = [];
        for (var i = 0; i < count ; i++) {
            nodes.push(this.createNode(undefined, spec));
        }
        for (i = 0; i < count ; i++) {
            _destroyNode.call(this, nodes[i]);
        }
    };

    /**
     * Creates a layout-node
     *
     * @param {Object} renderNode render-node for whom to create a layout-node for
     * @return {LayoutNode} layout-node
     */
    LayoutNodeManager.prototype.createNode = function(renderNode, spec) {
        var node;
        if (this._pool.layoutNodes.first) {
            node = this._pool.layoutNodes.first;
            this._pool.layoutNodes.first = node._next;
            this._pool.layoutNodes.size--;
            node.constructor.apply(node, arguments);
        }
        else {
            node = new this.LayoutNode(renderNode, spec);
            if (this._nodeOptions) {
                node.setOptions(this._nodeOptions);
            }
        }
        node._prev = undefined;
        node._next = undefined;
        node._viewSequence = undefined;
        node._layoutCount = 0;
        if (this._initLayoutNodeFn) {
            this._initLayoutNodeFn.call(this, node, spec);
        }
        return node;
    };

    /**
     * Removes all nodes.
     */
    LayoutNodeManager.prototype.removeAll = function() {
        var node = this._first;
        while (node) {
          var next = node._next;
          _destroyNode.call(this, node);
          node = next;
        }
        this._first = undefined;
    };

    /**
     * Destroys a layout-node
     */
    function _destroyNode(node) {

        // Remove node from linked-list
        if (node._next) {
            node._next._prev = node._prev;
        }
        if (node._prev) {
            node._prev._next = node._next;
        }
        else {
            this._first = node._next;
        }

        // Destroy the node
        node.destroy();

        // Add node to pool
        if (this._pool.layoutNodes.size < MAX_POOL_SIZE) {
            this._pool.layoutNodes.size++;
            node._prev = undefined;
            node._next = this._pool.layoutNodes.first;
            this._pool.layoutNodes.first = node;
        }
    }

    /**
     * Gets start layout-node for enumeration.
     *
     * @param {Bool} [next] undefined = all, true = all next, false = all previous
     * @return {LayoutNode} layout-node or undefined
     */
    LayoutNodeManager.prototype.getStartEnumNode = function(next) {
        if (next === undefined) {
            return this._first;
        }
        else if (next === true) {
            return (this._contextState.start && this._contextState.startPrev) ? this._contextState.start._next : this._contextState.start;
        }
        else if (next === false) {
            return (this._contextState.start && !this._contextState.startPrev) ? this._contextState.start._prev : this._contextState.start;
        }
    };

    /**
     * Checks the integrity of the linked-list.
     */
    /*function _checkIntegrity() {
        var node = this._first;
        var count = 0;
        var prevNode;
        while (node) {
            if (!node._prev && (node !== this._first)) {
                throw 'No prev but not first';
            }
            if (node._prev !== prevNode) {
                throw 'Bork';
            }
            prevNode = node;
            node = node._next;
            count++;
        }
    }

    function _checkContextStateIntegrity() {
        var node = this._contextState.start;
        while (node) {
            if (node === this._contextState.next) {
                break;
            }
            if (!node._invalidated) {
                throw 'WTF';
            }
            node = node._next;
        }
        node = this._contextState.start;
        while (node) {
            if (node === this._contextState.prev) {
                break;
            }
            if (!node._invalidated) {
                throw 'WTF';
            }
            node = node._prev;
        }
    }*/

    /**
     * Creates or gets a layout node.
     */
    function _contextGetCreateAndOrderNodes(renderNode, prev) {

        // The first time this function is called, the current
        // prev/next position is obtained.
        var node;
        var state = this._contextState;
        if (!state.start) {
            node = this._first;
            while (node) {
                if (node.renderNode === renderNode) {
                    break;
                }
                node = node._next;
            }
            if (!node) {
                node = this.createNode(renderNode);
                node._next = this._first;
                if (this._first) {
                    this._first._prev = node;
                }
                this._first = node;
            }
            state.start = node;
            state.startPrev = prev;
            state.prev = node;
            state.next = node;
            return node;
        }

        // Check whether node already exist at the correct position
        // in the linked-list. If so, return that node immediately
        // and advance the prev/next pointer for the next/prev
        // lookup operation.
        if (prev) {
            if (state.prev._prev && (state.prev._prev.renderNode === renderNode)) {
                state.prev = state.prev._prev;
                return state.prev;
            }
        }
        else {
            if (state.next._next && (state.next._next.renderNode === renderNode)) {
                state.next = state.next._next;
                return state.next;
            }
        }

        // Lookup the node anywhere in the list..
        node = this._first;
        while (node) {
            if (node.renderNode === renderNode) {
                break;
            }
            node = node._next;
        }

        // Create new node if neccessary
        if (!node) {
            node = this.createNode(renderNode);
        }

        // Node existed, remove from linked-list
        else {
            if (node._next) {
                node._next._prev = node._prev;
            }
            if (node._prev) {
                node._prev._next = node._next;
            }
            else {
                this._first = node._next;
            }
            node._next = undefined;
            node._prev = undefined;
        }

        // Insert node into the linked list
        if (prev) {
            if (state.prev._prev) {
                node._prev = state.prev._prev;
                state.prev._prev._next = node;
            }
            else {
                this._first = node;
            }
            state.prev._prev = node;
            node._next = state.prev;
            state.prev = node;
        }
        else {
            if (state.next._next) {
                node._next = state.next._next;
                state.next._next._prev = node;
            }
            state.next._next = node;
            node._prev = state.next;
            state.next = node;
        }

        return node;
    }

    /**
     * Get the next render-node
     */
    function _contextNext() {

        // Get the next node from the sequence
        if (!this._contextState.nextSequence) {
            return undefined;
        }
        if (this._context.reverse) {
            this._contextState.nextSequence = this._contextState.nextSequence.getNext();
            if (!this._contextState.nextSequence) {
                return undefined;
            }
        }
        var renderNode = this._contextState.nextSequence.get();
        if (!renderNode) {
            this._contextState.nextSequence = undefined;
            return undefined;
        }
        var nextSequence = this._contextState.nextSequence;
        if (!this._context.reverse) {
            this._contextState.nextSequence = this._contextState.nextSequence.getNext();
        }
        if (this._contextState.lastRenderNode === renderNode) {
          throw 'ViewSequence is corrupted, should never contain the same renderNode twice, index: ' + nextSequence.getIndex();
        }
        this._contextState.lastRenderNode = renderNode;
        return {
            renderNode: renderNode,
            viewSequence: nextSequence,
            next: true,
            index: ++this._contextState.nextGetIndex
        };
    }

    /**
     * Get the previous render-node
     */
    function _contextPrev() {

        // Get the previous node from the sequence
        if (!this._contextState.prevSequence) {
            return undefined;
        }
        if (!this._context.reverse) {
            this._contextState.prevSequence = this._contextState.prevSequence.getPrevious();
            if (!this._contextState.prevSequence) {
                return undefined;
            }
        }
        var renderNode = this._contextState.prevSequence.get();
        if (!renderNode) {
            this._contextState.prevSequence = undefined;
            return undefined;
        }
        var prevSequence = this._contextState.prevSequence;
        if (this._context.reverse) {
            this._contextState.prevSequence = this._contextState.prevSequence.getPrevious();
        }
        if (this._contextState.lastRenderNode === renderNode) {
          throw 'ViewSequence is corrupted, should never contain the same renderNode twice, index: ' + prevSequence.getIndex();
        }
        this._contextState.lastRenderNode = renderNode;
        return {
            renderNode: renderNode,
            viewSequence: prevSequence,
            prev: true,
            index: --this._contextState.prevGetIndex
        };
    }

    /**
     * Resolve id into a context-node.
     */
     function _contextGet(contextNodeOrId) {
        if (this._nodesById && ((contextNodeOrId instanceof String) || (typeof contextNodeOrId === 'string'))) {
            var renderNode = this._nodesById[contextNodeOrId];
            if (!renderNode) {
                return undefined;
            }

            // Return array
            if (renderNode instanceof Array) {
                var result = [];
                for (var i = 0, j = renderNode.length; i < j; i++) {
                    result.push({
                        renderNode: renderNode[i],
                        arrayElement: true
                    });
                }
                return result;
            }

            // Create context node
            return {
                renderNode: renderNode,
                byId: true
            };
        }
        else {
            return contextNodeOrId;
        }
    }

    /**
     * Set the node content
     */
    function _contextSet(contextNodeOrId, set) {
        var contextNode = this._nodesById ? _contextGet.call(this, contextNodeOrId) : contextNodeOrId;
        if (contextNode) {
            var node = contextNode.node;
            if (!node) {
                if (contextNode.next) {
                     if (contextNode.index < this._contextState.nextSetIndex) {
                        LayoutUtility.error('Nodes must be layed out in the same order as they were requested!');
                     }
                     this._contextState.nextSetIndex = contextNode.index;
                }
                else if (contextNode.prev) {
                     if (contextNode.index > this._contextState.prevSetIndex) {
                        LayoutUtility.error('Nodes must be layed out in the same order as they were requested!');
                     }
                     this._contextState.prevSetIndex = contextNode.index;
                }
                node = _contextGetCreateAndOrderNodes.call(this, contextNode.renderNode, contextNode.prev);
                node._viewSequence = contextNode.viewSequence;
                node._layoutCount++;
                if (node._layoutCount === 1) {
                    this._contextState.addCount++;
                }
                contextNode.node = node;
            }
            node.usesTrueSize = contextNode.usesTrueSize;
            node.trueSizeRequested = contextNode.trueSizeRequested;
            node.set(set, this._context.size);
            contextNode.set = set;
        }
        return set;
    }

    /**
     * Resolve the size of the layout-node from the renderable itsself
     */
    function _contextResolveSize(contextNodeOrId, parentSize) {
        var contextNode = this._nodesById ? _contextGet.call(this, contextNodeOrId) : contextNodeOrId;
        var resolveSize = this._pool.resolveSize;
        if (!contextNode) {
            resolveSize[0] = 0;
            resolveSize[1] = 0;
            return resolveSize;
        }

        // Get in use size
        var renderNode = contextNode.renderNode;
        var size = renderNode.getSize();
        if (!size) {
            return parentSize;
        }

        // Check if true-size is used and it must be reavaluated.
        // This particular piece of code specifically handles true-size Surfaces in famo.us.
        // It contains portions that ensure that the true-size of a Surface is re-evaluated
        // and also workaround code that backs up the size of a Surface, so that when the surface
        // is re-added to the DOM (e.g. when scrolling) it doesn't temporarily have a size of 0.
        var configSize = renderNode.size && (renderNode._trueSizeCheck !== undefined) ? renderNode.size : undefined;
        if (configSize && ((configSize[0] === true) || (configSize[1] === true))) {
            contextNode.usesTrueSize = true;
            var backupSize = renderNode._backupSize;
            if (renderNode._contentDirty || renderNode._trueSizeCheck) {
              this._trueSizeRequested = true;
              contextNode.trueSizeRequested = true;
            }
            if (renderNode._trueSizeCheck) {

                // Fix for true-size renderables. When true-size is used, the size
                // is incorrect for one render-cycle due to the fact that Surface.commit
                // updates the content after asking the DOM for the offsetHeight/offsetWidth.
                // The code below backs the size up, and re-uses that when this scenario
                // occurs.
                if (backupSize && (configSize !== size)) {
                    var newWidth = (configSize[0] === true) ? Math.max(backupSize[0], size[0]) : size[0];
                    var newHeight = (configSize[1] === true) ? Math.max(backupSize[1], size[1]) : size[1];
                    backupSize[0] = newWidth;
                    backupSize[1] = newHeight;
                    size = backupSize;
                    renderNode._backupSize = undefined;
                    backupSize = undefined;
                }
            }
            if (this._reevalTrueSize || (backupSize && ((backupSize[0] !== size[0]) || (backupSize[1] !== size[1])))) {
                renderNode._trueSizeCheck = true; // force request of true-size from DOM
                renderNode._sizeDirty = true;
                this._trueSizeRequested = true;
            }

            // Backup the size of the node
            if (!backupSize) {
                renderNode._backupSize = [0, 0];
                backupSize = renderNode._backupSize;
            }
            backupSize[0] = size[0];
            backupSize[1] = size[1];
        }

        // Ensure re-layout when a child layout-controller is using true-size and it
        // has ben changed.
        configSize = renderNode._nodes ? renderNode.options.size : undefined;
        if (configSize && ((configSize[0] === true) || (configSize[1] === true))) {
            if (this._reevalTrueSize || renderNode._nodes._trueSizeRequested) {
                contextNode.usesTrueSize = true;
                contextNode.trueSizeRequested = true;
                this._trueSizeRequested = true;
            }
        }

        // Resolve 'undefined' to parent-size and true to 0
        if ((size[0] === undefined) || (size[0] === true) || (size[1] === undefined) || (size[1] === true)) {
            resolveSize[0] = size[0];
            resolveSize[1] = size[1];
            size = resolveSize;
            if (size[0] === undefined) {
                size[0] = parentSize[0];
            }
            else if (size[0] === true) {
                size[0] = 0;
                this._trueSizeRequested = true;
                contextNode.trueSizeRequested = true;
            }
            if (size[1] === undefined) {
                size[1] = parentSize[1];
            }
            else if (size[1] === true) {
                size[1] = 0;
                this._trueSizeRequested = true;
                contextNode.trueSizeRequested = true;
            }
        }
        return size;
    }

    module.exports = LayoutNodeManager;

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-flex\\LayoutNodeManager.js","/..\\res\\famous-flex")
},{"./LayoutContext":47,"./LayoutUtility":51,"VCmEsw":43,"buffer":40}],51:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*global console*/
/*eslint no-console:0*/

/**
 * Utility class for famous-flex.
 *
 * @module
 */

    // import dependencies
    var Utility = require('famous/utilities/Utility');

    /**
     * @class
     * @alias module:LayoutUtility
     */
    function LayoutUtility() {
    }
    LayoutUtility.registeredHelpers = {};

    var Capabilities = {
        SEQUENCE: 1,
        DIRECTION_X: 2,
        DIRECTION_Y: 4,
        SCROLLING: 8
    };
    LayoutUtility.Capabilities = Capabilities;

    /**
     *  Normalizes the margins argument.
     *
     *  @param {Array.Number} margins
     */
    LayoutUtility.normalizeMargins = function(margins) {
        if (!margins) {
            return [0, 0, 0, 0];
        }
        else if (!Array.isArray(margins)) {
            return [margins, margins, margins, margins];
        }
        else if (margins.length === 0) {
            return [0, 0, 0, 0];
        }
        else if (margins.length === 1) {
            return [margins[0], margins[0], margins[0], margins[0]];
        }
        else if (margins.length === 2) {
            return [margins[0], margins[1], margins[0], margins[1]];
        }
        else {
            return margins;
        }
    };

    /**
     * Makes a (shallow) copy of a spec.
     *
     * @param {Spec} spec Spec to clone
     * @return {Spec} cloned spec
     */
    LayoutUtility.cloneSpec = function(spec) {
        var clone = {};
        if (spec.opacity !== undefined) {
            clone.opacity = spec.opacity;
        }
        if (spec.size !== undefined) {
            clone.size = spec.size.slice(0);
        }
        if (spec.transform !== undefined) {
            clone.transform = spec.transform.slice(0);
        }
        if (spec.origin !== undefined) {
            clone.origin = spec.origin.slice(0);
        }
        if (spec.align !== undefined) {
            clone.align = spec.align.slice(0);
        }
        return clone;
    };

    /**
     * Compares two arrays for equality.
     */
    function _isEqualArray(a, b) {
        if (a === b) {
            return true;
        }
        if ((a === undefined) || (b === undefined)) {
            return false;
        }
        var i = a.length;
        if (i !== b.length){
            return false;
        }
        while (i--) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Compares two specs for equality.
     *
     * @param {Spec} spec1 Spec to compare
     * @param {Spec} spec2 Spec to compare
     * @return {Boolean} true/false
     */
    LayoutUtility.isEqualSpec = function(spec1, spec2) {
        if (spec1.opacity !== spec2.opacity) {
            return false;
        }
        if (!_isEqualArray(spec1.size, spec2.size)) {
            return false;
        }
        if (!_isEqualArray(spec1.transform, spec2.transform)) {
            return false;
        }
        if (!_isEqualArray(spec1.origin, spec2.origin)) {
            return false;
        }
        if (!_isEqualArray(spec1.align, spec2.align)) {
            return false;
        }
        return true;
    };

    /**
     * Helper function that returns a string containing the differences
     * between two specs.
     *
     * @param {Spec} spec1 Spec to compare
     * @param {Spec} spec2 Spec to compare
     * @return {String} text
     */
    LayoutUtility.getSpecDiffText = function(spec1, spec2) {
        var result = 'spec diff:';
        if (spec1.opacity !== spec2.opacity) {
            result += '\nopacity: ' + spec1.opacity + ' != ' + spec2.opacity;
        }
        if (!_isEqualArray(spec1.size, spec2.size)) {
            result += '\nsize: ' + JSON.stringify(spec1.size) + ' != ' + JSON.stringify(spec2.size);
        }
        if (!_isEqualArray(spec1.transform, spec2.transform)) {
            result += '\ntransform: ' + JSON.stringify(spec1.transform) + ' != ' + JSON.stringify(spec2.transform);
        }
        if (!_isEqualArray(spec1.origin, spec2.origin)) {
            result += '\norigin: ' + JSON.stringify(spec1.origin) + ' != ' + JSON.stringify(spec2.origin);
        }
        if (!_isEqualArray(spec1.align, spec2.align)) {
            result += '\nalign: ' + JSON.stringify(spec1.align) + ' != ' + JSON.stringify(spec2.align);
        }
        return result;
    };

    /**
     * Helper function to call whenever a critical error has occurred.
     *
     * @param {String} message error-message
     */
    LayoutUtility.error = function(message) {
        console.log('ERROR: ' + message);
        throw message;
    };

    /**
     * Helper function to call whenever a warning error has occurred.
     *
     * @param {String} message warning-message
     */
    LayoutUtility.warning = function(message) {
        console.log('WARNING: ' + message);
    };

    /**
     * Helper function to log 1 or more arguments. All the arguments
     * are concatenated to produce a single string which is logged.
     *
     * @param {String|Array|Object} args arguments to stringify and concatenate
     */
    LayoutUtility.log = function(args) {
        var message = '';
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if ((arg instanceof Object) || (arg instanceof Array)) {
                message += JSON.stringify(arg);
            }
            else {
                message += arg;
            }
        }
        console.log(message);
    };

    /**
     * Combines two sets of options into a single set.
     *
     * @param {Object} options1 base set of options
     * @param {Object} options2 set of options to merge into `options1`
     * @param {Bool} [forceClone] ensures that a clone is returned rather that one of the original options objects
     * @return {Object} Combined options
     */
    LayoutUtility.combineOptions = function(options1, options2, forceClone) {
        if (options1 && !options2 && !forceClone) {
            return options1;
        }
        else if (!options1 && options2 && !forceClone) {
            return options2;
        }
        var options = Utility.clone(options1 || {});
        if (options2) {
            for (var key in options2) {
                options[key] = options2[key];
            }
        }
        return options;
    };

    /**
     * Registers a layout-helper so it can be used as a layout-literal for
     * a layout-controller. The LayoutHelper instance must support the `parse`
     * function, which is fed the layout-literal content.
     *
     * **Example:**
     *
     * ```javascript
     * Layout.registerHelper('dock', LayoutDockHelper);
     *
     * var layoutController = new LayoutController({
     *   layout: { dock: [,
     *     ['top', 'header', 50],
     *     ['bottom', 'footer', 50],
     *     ['fill', 'content'],
     *   ]},
     *   dataSource: {
     *     header: new Surface({content: 'Header'}),
     *     footer: new Surface({content: 'Footer'}),
     *     content: new Surface({content: 'Content'}),
     *   }
     * })
     * ```
     *
     * @param {String} name name of the helper (e.g. 'dock')
     * @param {Function} Helper Helper to register (e.g. LayoutDockHelper)
     */
    LayoutUtility.registerHelper = function(name, Helper) {
        if (!Helper.prototype.parse) {
            LayoutUtility.error('The layout-helper for name "' + name + '" is required to support the "parse" method');
        }
        if (this.registeredHelpers[name] !== undefined) {
            LayoutUtility.warning('A layout-helper with the name "' + name + '" is already registered and will be overwritten');
        }
        this.registeredHelpers[name] = Helper;
    };

    /**
     * Unregisters a layout-helper.
     *
     * @param {String} name name of the layout-helper
     */
    LayoutUtility.unregisterHelper = function(name) {
        delete this.registeredHelpers[name];
    };

    /**
     * Gets a registered layout-helper by its name.
     *
     * @param {String} name name of the layout-helper
     * @return {Function} layout-helper or undefined
     */
    LayoutUtility.getRegisteredHelper = function(name) {
        return this.registeredHelpers[name];
    };

    // Layout function
    module.exports = LayoutUtility;

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-flex\\LayoutUtility.js","/..\\res\\famous-flex")
},{"VCmEsw":43,"buffer":40,"famous/utilities/Utility":38}],52:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014 - 2015
 */

/**
 * Scrollable layout-controller.
 *
 * Key features:
 * -    Customizable layout
 * -    Insert/remove renderables into the scene using animations/spec
 * -    Support for `true` size renderables
 * -    Horizontal/vertical direction
 * -    Top/left or bottom/right alignment
 * -    Pagination
 * -    Option to embed in a ContainerSurface
 *
 * Events:
 *
 * |event      |description|
 * |-----------|-----------|
 * |scrollstart|Emitted when scrolling starts.|
 * |scroll     |Emitted as the content scrolls (once for each frame the visible offset has changed).|
 * |pagechange |Emitted whenever the visible page changes.|
 * |scrollend  |Emitted after scrolling stops (when the scroll particle settles).|
 *
 * Inherited from: [LayoutController](./LayoutController.md)
 * @module
 */

    // import dependencies
    var LayoutUtility = require('./LayoutUtility');
    var LayoutController = require('./LayoutController');
    var LayoutNode = require('./LayoutNode');
    var FlowLayoutNode = require('./FlowLayoutNode');
    var LayoutNodeManager = require('./LayoutNodeManager');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var Transform = require('famous/core/Transform');
    var EventHandler = require('famous/core/EventHandler');
    var Group = require('famous/core/Group');
    var Vector = require('famous/math/Vector');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');
    var Particle = require('famous/physics/bodies/Particle');
    var Drag = require('famous/physics/forces/Drag');
    var Spring = require('famous/physics/forces/Spring');
    var ScrollSync = require('famous/inputs/ScrollSync');
    var ViewSequence = require('famous/core/ViewSequence');

    /**
     * Boudary reached detection
     */
    var Bounds = {
        NONE: 0,
        PREV: 1, // top
        NEXT: 2, // bottom
        BOTH: 3
    };

    /**
     * Source of the spring
     */
    var SpringSource = {
        NONE: 'none',
        NEXTBOUNDS: 'next-bounds', // top
        PREVBOUNDS: 'prev-bounds', // bottom
        MINSIZE: 'minimal-size',
        GOTOSEQUENCE: 'goto-sequence',
        ENSUREVISIBLE: 'ensure-visible',
        GOTOPREVDIRECTION: 'goto-prev-direction',
        GOTONEXTDIRECTION: 'goto-next-direction'
    };

    /**
     * Pagination modes
     */
    var PaginationMode = {
        PAGE: 0,
        SCROLL: 1
    };

    /**
     * @class
     * @extends LayoutController
     * @param {Object} options Configurable options (see LayoutController for all inherited options).
     * @param {Bool} [options.useContainer] Embeds the view in a ContainerSurface to hide any overflow and capture input events (default: `false`).
     * @param {String} [options.container] Options that are passed to the ContainerSurface in case `useContainer` is true.
     * @param {Bool} [options.paginated] Enabled pagination when set to `true` (default: `false`).
     * @param {Number} [options.paginationEnergyThresshold] Thresshold after which pagination kicks in (default: `0.01`).
     * @param {PaginationMode} [options.paginationMode] Pagination-mode (either page-based or scroll-based) (default: `PaginationMode.PAGE`).
     * @param {Number} [options.alignment] Alignment of the renderables (0 = top/left, 1 = bottom/right) (default: `0`).
     * @param {Bool} [options.mouseMove] Enables scrolling by holding the mouse-button down and moving the mouse (default: `false`).
     * @param {Bool} [options.enabled] Enables or disabled user input (default: `true`).
     * @param {Bool} [options.overscroll] Enables or disables overscroll (default: `true`).
     * @param {Object} [options.scrollParticle] Options for the scroll particle (default: `{}`)
     * @param {Object} [options.scrollSpring] Spring-force options that are applied on the scroll particle when e.g. bounds is reached (default: `{dampingRatio: 1.0, period: 350}`)
     * @param {Object} [options.scrollDrag] Drag-force options to apply on the scroll particle
     * @param {Object} [options.scrollFriction] Friction-force options to apply on the scroll particle
     * @param {Bool} [options.layoutAll] When set to true, always lays out all renderables in the datasource (default: `false`).
     * @param {Number} [options.visibleItemThresshold] Thresshold (0..1) used for determining whether an item is considered to be the first/last visible item (default: `0.5`).
     * @alias module:ScrollController
     */
    function ScrollController(options) {
        options = LayoutUtility.combineOptions(ScrollController.DEFAULT_OPTIONS, options);
        var layoutManager = new LayoutNodeManager(options.flow ? FlowLayoutNode : LayoutNode, _initLayoutNode.bind(this));
        LayoutController.call(this, options, layoutManager);

        // Scrolling
        this._scroll = {
            activeTouches: [],
            // physics-engine to use for scrolling
            pe: new PhysicsEngine(),
            // particle that represents the scroll-offset
            particle: new Particle(this.options.scrollParticle),
            // drag-force that slows the particle down after a "flick"
            dragForce: new Drag(this.options.scrollDrag),
            frictionForce: new Drag(this.options.scrollFriction),
            // spring
            springValue: undefined,
            springForce: new Spring(this.options.scrollSpring),
            springEndState: new Vector([0, 0, 0]),
            // group
            groupStart: 0,
            groupTranslate: [0, 0, 0],
            // delta
            scrollDelta: 0,
            normalizedScrollDelta: 0,
            scrollForce: 0,
            scrollForceCount: 0,
            unnormalizedScrollOffset: 0,
            // state
            isScrolling: false
        };

        // Diagnostics
        this._debug = {
            layoutCount: 0,
            commitCount: 0
        };

        // Create groupt for faster rendering
        this.group = new Group();
        this.group.add({render: _innerRender.bind(this)});

        // Configure physics engine with particle and drag
        this._scroll.pe.addBody(this._scroll.particle);
        if (!this.options.scrollDrag.disabled) {
            this._scroll.dragForceId = this._scroll.pe.attach(this._scroll.dragForce, this._scroll.particle);
        }
        if (!this.options.scrollFriction.disabled) {
            this._scroll.frictionForceId = this._scroll.pe.attach(this._scroll.frictionForce, this._scroll.particle);
        }
        this._scroll.springForce.setOptions({ anchor: this._scroll.springEndState });

        // Listen to touch events
        this._eventInput.on('touchstart', _touchStart.bind(this));
        this._eventInput.on('touchmove', _touchMove.bind(this));
        this._eventInput.on('touchend', _touchEnd.bind(this));
        this._eventInput.on('touchcancel', _touchEnd.bind(this));

        // Listen to mouse-move events
        this._eventInput.on('mousedown', _mouseDown.bind(this));
        this._eventInput.on('mouseup', _mouseUp.bind(this));
        this._eventInput.on('mousemove', _mouseMove.bind(this));

        // Listen to mouse-wheel events
        this._scrollSync = new ScrollSync(this.options.scrollSync);
        this._eventInput.pipe(this._scrollSync);
        this._scrollSync.on('update', _scrollUpdate.bind(this));

        // Embed in container surface if neccesary
        if (this.options.useContainer) {
            this.container = new ContainerSurface(this.options.container);

            // Create container surface, which has one child, which just returns
            // the entity-id of this scrollview. This causes the Commit function
            // of this scrollview to be called
            this.container.add({
                render: function() {
                    return this.id;
                }.bind(this)
            });

            // Pipe events received in container to this scrollview
            if (!this.options.autoPipeEvents) {
                this.subscribe(this.container);
                EventHandler.setInputHandler(this.container, this);
                EventHandler.setOutputHandler(this.container, this);
            }
        }
    }
    ScrollController.prototype = Object.create(LayoutController.prototype);
    ScrollController.prototype.constructor = ScrollController;
    ScrollController.Bounds = Bounds;
    ScrollController.PaginationMode = PaginationMode;

    ScrollController.DEFAULT_OPTIONS = {
        useContainer: false,    // when true embeds inside a ContainerSurface for capturing input events & clipping
        container: {
            properties: {
                overflow: 'hidden' // overflow mode when useContainer is enabled
            }
        },
        visibleItemThresshold: 0.5, // by default, when an item is 50% visible, it is considered visible by `getFirstVisibleItem`
        scrollParticle: {
            // use defaults
        },
        scrollDrag: {
            forceFunction: Drag.FORCE_FUNCTIONS.QUADRATIC,
            strength: 0.001,
            disabled: true
        },
        scrollFriction: {
            forceFunction: Drag.FORCE_FUNCTIONS.LINEAR,
            strength: 0.0025,
            disabled: false
        },
        scrollSpring: {
            dampingRatio: 1.0,
            period: 350
        },
        scrollSync: {
            scale: 0.2
        },
        overscroll: true,
        paginated: false,
        paginationMode: PaginationMode.PAGE,
        paginationEnergyThresshold: 0.01,
        alignment: 0,         // [0: top/left, 1: bottom/right]
        touchMoveDirectionThresshold: undefined, // 0..1
        touchMoveNoVelocityDuration: 100,
        mouseMove: false,
        enabled: true,          // set to false to disable scrolling
        layoutAll: false,       // set to true is you want all renderables layed out/rendered
        alwaysLayout: false,    // set to true to always call the layout function
        extraBoundsSpace: [100, 100],
        debug: false
    };

    /**
     * Patches the ScrollController instance's options with the passed-in ones.
     *
     * @param {Object} options Configurable options (see LayoutController for all inherited options).
     * @param {Bool} [options.paginated] Enabled pagination when set to `true` (default: `false`).
     * @param {Number} [options.paginationEnergyThresshold] Thresshold after which pagination kicks in (default: `0.01`).
     * @param {PaginationMode} [options.paginationMode] Pagination-mode (either page-based or scroll-based) (default: `PaginationMode.PAGE`).
     * @param {Number} [options.alignment] Alignment of the renderables (0 = top/left, 1 = bottom/right) (default: `0`).
     * @param {Bool} [options.mouseMove] Enables scrolling by holding the mouse-button down and moving the mouse (default: `false`).
     * @param {Bool} [options.enabled] Enables or disables user input (default: `true`).
     * @param {Bool} [options.overscroll] Enables or disables overscroll (default: `true`).
     * @param {Object} [options.scrollParticle] Options for the scroll particle (default: `{}`)
     * @param {Object} [options.scrollSpring] Spring-force options that are applied on the scroll particle when e.g. bounds is reached (default: `{dampingRatio: 1.0, period: 500}`)
     * @param {Object} [options.scrollDrag] Drag-force options to apply on the scroll particle
     * @param {Object} [options.scrollFriction] Friction-force options to apply on the scroll particle
     * @param {Number} [options.visibleItemThresshold] Thresshold (0..1) used for determining whether an item is considered to be the first/last visible item (default: `0.5`).
     * @param {Bool} [options.layoutAll] When set to true, always lays out all renderables in the datasource (default: `false`).
     * @return {ScrollController} this
     */
    ScrollController.prototype.setOptions = function(options) {
        LayoutController.prototype.setOptions.call(this, options);
        if (this._scroll) {
            if (options.scrollSpring) {
                this._scroll.springForce.setOptions(options.scrollSpring);
            }
            if (options.scrollDrag) {
                this._scroll.dragForce.setOptions(options.scrollDrag);
            }
        }
        if (options.scrollSync && this._scrollSync) {
            this._scrollSync.setOptions(options.scrollSync);
        }
        return this;
    };

    /**
     * Called whenever a layout-node is created/re-used. Initializes
     * the node with the `insertSpec` if it has been defined and enabled
     * locking of the x/y translation so that the x/y position of the renderable
     * is immediately updated when the user scrolls the view.
     */
    function _initLayoutNode(node, spec) {
        if (!spec && this.options.flowOptions.insertSpec) {
            node.setSpec(this.options.flowOptions.insertSpec);
        }
    }

    /**
     * Helper function for logging debug statements to the console.
     */
    /*function _log(args) {
        if (!this.options.debug) {
            return;
        }
        var message = this._debug.commitCount + ': ';
        for (var i = 0, j = arguments.length; i < j; i++) {
            var arg = arguments[i];
            if ((arg instanceof Object) || (arg instanceof Array)) {
                message += JSON.stringify(arg);
            }
            else {
                message += arg;
            }
        }
        console.log(message);
    }*/

    /**
     * Sets the value for the spring, or set to `undefined` to disable the spring
     */
    function _updateSpring() {
        var springValue = this._scroll.scrollForceCount ? undefined : this._scroll.springPosition;
        if (this._scroll.springValue !== springValue) {
            this._scroll.springValue = springValue;
            if (springValue === undefined) {
                if (this._scroll.springForceId !== undefined) {
                    this._scroll.pe.detach(this._scroll.springForceId);
                    this._scroll.springForceId = undefined;
                    //_log.call(this, 'disabled spring');
                }
            }
            else {
                if (this._scroll.springForceId === undefined) {
                    this._scroll.springForceId = this._scroll.pe.attach(this._scroll.springForce, this._scroll.particle);
                }
                this._scroll.springEndState.set1D(springValue);
                this._scroll.pe.wake();
                //_log.call(this, 'setting spring to: ', springValue, ' (', this._scroll.springSource, ')');
            }
        }
    }

    /**
     * Called whenever the user presses the mouse button on the scrollview
     */
    function _mouseDown(event) {

        // Check whether mouse-scrolling is enabled
        if (!this.options.mouseMove) {
            return;
        }

        // Reset any previous mouse-move operation that has not yet been
        // cleared.
        if (this._scroll.mouseMove) {
            this.releaseScrollForce(this._scroll.mouseMove.delta);
        }

        // Calculate start of move operation
        var current = [event.clientX, event.clientY];
        var time = Date.now();
        this._scroll.mouseMove = {
            delta: 0,
            start: current,
            current: current,
            prev: current,
            time: time,
            prevTime: time
        };

        // Apply scroll force
        this.applyScrollForce(this._scroll.mouseMove.delta);
    }
    function _mouseMove(event) {

        // Check if any mouse-move is active
        if (!this._scroll.mouseMove || !this.options.enabled) {
            return;
        }

        // When a thresshold is configured, check whether the move operation (x/y ratio)
        // lies within the thresshold. A move of 10 pixels x and 10 pixels y is considered 45 deg,
        // which corresponds to a thresshold of 0.5.
        var moveDirection = Math.atan2(
            Math.abs(event.clientY - this._scroll.mouseMove.prev[1]),
            Math.abs(event.clientX - this._scroll.mouseMove.prev[0])) / (Math.PI / 2.0);
        var directionDiff = Math.abs(this._direction - moveDirection);
        if ((this.options.touchMoveDirectionThresshold === undefined) || (directionDiff <= this.options.touchMoveDirectionThresshold)){
            this._scroll.mouseMove.prev = this._scroll.mouseMove.current;
            this._scroll.mouseMove.current = [event.clientX, event.clientY];
            this._scroll.mouseMove.prevTime = this._scroll.mouseMove.time;
            this._scroll.mouseMove.direction = moveDirection;
            this._scroll.mouseMove.time = Date.now();
        }

        // Update scroll-force
        var delta = this._scroll.mouseMove.current[this._direction] - this._scroll.mouseMove.start[this._direction];
        this.updateScrollForce(this._scroll.mouseMove.delta, delta);
        this._scroll.mouseMove.delta = delta;
    }
    function _mouseUp(event) {

        // Check if any mouse-move is active
        if (!this._scroll.mouseMove) {
            return;
        }

        // Calculate delta and velocity
        var velocity = 0;
        var diffTime = this._scroll.mouseMove.time - this._scroll.mouseMove.prevTime;
        if ((diffTime > 0) && ((Date.now() - this._scroll.mouseMove.time) <= this.options.touchMoveNoVelocityDuration)) {
            var diffOffset = this._scroll.mouseMove.current[this._direction] - this._scroll.mouseMove.prev[this._direction];
            velocity = diffOffset / diffTime;
        }

        // Release scroll force
        this.releaseScrollForce(this._scroll.mouseMove.delta, velocity);
        this._scroll.mouseMove = undefined;
    }

    /**
     * Called whenever the user starts moving the scroll-view, using
     * touch gestures.
     */
    function _touchStart(event) {

        // Create touch-end event listener
        if (!this._touchEndEventListener) {
            this._touchEndEventListener = function(event2) {
                event2.target.removeEventListener('touchend', this._touchEndEventListener);
                _touchEnd.call(this, event2);
            }.bind(this);
        }

        // Remove any touches that are no longer active
        var oldTouchesCount = this._scroll.activeTouches.length;
        var i = 0;
        var j;
        var touchFound;
        while (i < this._scroll.activeTouches.length) {
            var activeTouch = this._scroll.activeTouches[i];
            touchFound = false;
            for (j = 0; j < event.touches.length; j++) {
                var touch = event.touches[j];
                if (touch.identifier === activeTouch.id) {
                    touchFound = true;
                    break;
                }
            }
            if (!touchFound) {
                //_log.cal(this, 'removing touch with id: ', activeTouch.id);
                this._scroll.activeTouches.splice(i, 1);
            }
            else {
                i++;
            }
        }

        // Process touch
        for (i = 0; i < event.touches.length; i++) {
            var changedTouch = event.touches[i];
            touchFound = false;
            for (j = 0; j < this._scroll.activeTouches.length; j++) {
                if (this._scroll.activeTouches[j].id === changedTouch.identifier) {
                    touchFound = true;
                    break;
                }
            }
            if (!touchFound) {
                var current = [changedTouch.clientX, changedTouch.clientY];
                var time = Date.now();
                this._scroll.activeTouches.push({
                    id: changedTouch.identifier,
                    start: current,
                    current: current,
                    prev: current,
                    time: time,
                    prevTime: time
                });

                // The following listener is automatically removed after touchend is received
                // and ensures that the scrollview always received touchend.
                changedTouch.target.addEventListener('touchend', this._touchEndEventListener);
            }
        }

        // The first time a touch new touch gesture has arrived, emit event
        if (!oldTouchesCount && this._scroll.activeTouches.length) {
            this.applyScrollForce(0);
            this._scroll.touchDelta = 0;
        }
    }

    /**
     * Called whenever the user is moving his/her fingers to scroll the view.
     * Updates the moveOffset so that the scroll-offset on the view is updated.
     */
    function _touchMove(event) {
        if (!this.options.enabled) {
            return;
        }

        // Process the touch event
        var primaryTouch;
        for (var i = 0; i < event.changedTouches.length; i++) {
            var changedTouch = event.changedTouches[i];
            for (var j = 0; j < this._scroll.activeTouches.length; j++) {
                var touch = this._scroll.activeTouches[j];
                if (touch.id === changedTouch.identifier) {

                    // When a thresshold is configured, check whether the move operation (x/y ratio)
                    // lies within the thresshold. A move of 10 pixels x and 10 pixels y is considered 45 deg,
                    // which corresponds to a thresshold of 0.5.
                    var moveDirection = Math.atan2(
                        Math.abs(changedTouch.clientY - touch.prev[1]),
                        Math.abs(changedTouch.clientX - touch.prev[0])) / (Math.PI / 2.0);
                    var directionDiff = Math.abs(this._direction - moveDirection);
                    if ((this.options.touchMoveDirectionThresshold === undefined) || (directionDiff <= this.options.touchMoveDirectionThresshold)){
                        touch.prev = touch.current;
                        touch.current = [changedTouch.clientX, changedTouch.clientY];
                        touch.prevTime = touch.time;
                        touch.direction = moveDirection;
                        touch.time = Date.now();
                        primaryTouch = (j === 0) ? touch : undefined;
                    }
                }
            }
        }

        // Update move offset and emit event
        if (primaryTouch) {
            var delta = primaryTouch.current[this._direction] - primaryTouch.start[this._direction];
            this.updateScrollForce(this._scroll.touchDelta, delta);
            this._scroll.touchDelta = delta;
        }
    }

    /**
     * Called whenever the user releases his fingers and the touch gesture
     * has completed. This will set the new position and if the user used a 'flick'
     * gesture give the scroll-offset particle a velocity and momentum into a
     * certain direction.
     */
    function _touchEnd(event) {

        // Remove touch
        var primaryTouch = this._scroll.activeTouches.length ? this._scroll.activeTouches[0] : undefined;
        for (var i = 0; i < event.changedTouches.length; i++) {
            var changedTouch = event.changedTouches[i];
            for (var j = 0; j < this._scroll.activeTouches.length; j++) {
                var touch = this._scroll.activeTouches[j];
                if (touch.id === changedTouch.identifier) {

                    // Remove touch from active-touches
                    this._scroll.activeTouches.splice(j, 1);

                    // When a different touch now becomes the primary touch, update
                    // its start position to match the current move offset.
                    if ((j === 0) && this._scroll.activeTouches.length) {
                        var newPrimaryTouch = this._scroll.activeTouches[0];
                        newPrimaryTouch.start[0] = newPrimaryTouch.current[0] - (touch.current[0] - touch.start[0]);
                        newPrimaryTouch.start[1] = newPrimaryTouch.current[1] - (touch.current[1] - touch.start[1]);
                    }
                    break;
                }
            }
        }

        // Wait for all fingers to be released from the screen before resetting the move-spring
        if (!primaryTouch || this._scroll.activeTouches.length) {
            return;
        }

        // Determine velocity and add to particle
        var velocity = 0;
        var diffTime = primaryTouch.time - primaryTouch.prevTime;
        if ((diffTime > 0) && ((Date.now() - primaryTouch.time) <= this.options.touchMoveNoVelocityDuration)) {
            var diffOffset = primaryTouch.current[this._direction] - primaryTouch.prev[this._direction];
            velocity = diffOffset / diffTime;
        }

        // Release scroll force
        var delta = this._scroll.touchDelta;
        this.releaseScrollForce(delta, velocity);
        this._scroll.touchDelta = 0;
    }

    /**
     * Called whenever the user is scrolling the view using either a mouse
     * scroll wheel or a track-pad.
     */
    function _scrollUpdate(event) {
        if (!this.options.enabled) {
            return;
        }
        var offset = Array.isArray(event.delta) ? event.delta[this._direction] : event.delta;
        this.scroll(offset);
    }

    /**
     * Updates the scroll offset particle.
     */
    function _setParticle(position, velocity, phase) {
        if (position !== undefined) {
            //var oldPosition = this._scroll.particle.getPosition1D();
            this._scroll.particleValue = position;
            this._scroll.particle.setPosition1D(position);
            //_log.call(this, 'setParticle.position: ', position, ' (old: ', oldPosition, ', delta: ', position - oldPosition, ', phase: ', phase, ')');
        }
        if (velocity !== undefined) {
            var oldVelocity = this._scroll.particle.getVelocity1D();
            if (oldVelocity !== velocity) {
                this._scroll.particle.setVelocity1D(velocity);
                //_log.call(this, 'setParticle.velocity: ', velocity, ' (old: ', oldVelocity, ', delta: ', velocity - oldVelocity, ', phase: ', phase, ')');
            }
        }
    }

    /**
     * Get the in-use scroll-offset.
     */
    function _calcScrollOffset(normalize, refreshParticle) {

        // When moving using touch-gestures, make the offset stick to the
        // finger. When the bounds is exceeded, decrease the scroll distance
        // by two.
        if (refreshParticle || (this._scroll.particleValue === undefined)) {
            this._scroll.particleValue = this._scroll.particle.getPosition1D();
            this._scroll.particleValue = Math.round(this._scroll.particleValue * 1000) / 1000;
        }

        // do stuff
        var scrollOffset = this._scroll.particleValue;
        if (this._scroll.scrollDelta || this._scroll.normalizedScrollDelta) {
            scrollOffset += this._scroll.scrollDelta + this._scroll.normalizedScrollDelta;
            if (((this._scroll.boundsReached & Bounds.PREV) && (scrollOffset > this._scroll.springPosition)) ||
               ((this._scroll.boundsReached & Bounds.NEXT) && (scrollOffset < this._scroll.springPosition)) ||
               (this._scroll.boundsReached === Bounds.BOTH)) {
                scrollOffset = this._scroll.springPosition;
            }
            if (normalize) {
                if (!this._scroll.scrollDelta) {
                    this._scroll.normalizedScrollDelta = 0;
                    _setParticle.call(this, scrollOffset, undefined, '_calcScrollOffset');
                }
                this._scroll.normalizedScrollDelta += this._scroll.scrollDelta;
                this._scroll.scrollDelta = 0;
            }
        }

        if (this._scroll.scrollForceCount && this._scroll.scrollForce) {
            if (this._scroll.springPosition !== undefined) {
                scrollOffset = (scrollOffset + this._scroll.scrollForce + this._scroll.springPosition) / 2.0;
            }
            else {
                scrollOffset += this._scroll.scrollForce;
            }
        }

        // Prevent the scroll position from exceeding the bounds when overscroll is disabled
        if (!this.options.overscroll) {
            if ((this._scroll.boundsReached === Bounds.BOTH) ||
                ((this._scroll.boundsReached === Bounds.PREV) && (scrollOffset > this._scroll.springPosition)) ||
                ((this._scroll.boundsReached === Bounds.NEXT) && (scrollOffset < this._scroll.springPosition))) {
                scrollOffset = this._scroll.springPosition;
            }
        }

        //_log.call(this, 'scrollOffset: ', scrollOffset, ', particle:', this._scroll.particle.getPosition1D(), ', moveToPosition: ', this._scroll.moveToPosition, ', springPosition: ', this._scroll.springPosition);
        return scrollOffset;
    }

    /**
     * Helper function that calculates the next/prev layed out height.
     * @private
     */
    ScrollController.prototype._calcScrollHeight = function(next, lastNodeOnly) {
        var calcedHeight = 0;
        var node = this._nodes.getStartEnumNode(next);
        while (node) {
            if (node._invalidated) {
                if (node.trueSizeRequested) {
                    calcedHeight = undefined;
                    break;
                }
                if (node.scrollLength !== undefined) {
                    calcedHeight = lastNodeOnly ? node.scrollLength : (calcedHeight + node.scrollLength);
                    if (!next && lastNodeOnly) {
                        break;
                    }
                }
            }
            node = next ? node._next : node._prev;
        }
        return calcedHeight;
    };

    /**
     * Calculates the scroll boundaries and sets the spring accordingly.
     */
    function _calcBounds(size, scrollOffset) {

        // Local data
        var prevHeight = this._calcScrollHeight(false);
        var nextHeight = this._calcScrollHeight(true);
        var enforeMinSize = this._layout.capabilities && this._layout.capabilities.sequentialScrollingOptimized;

        // 0. Don't set any springs when either next or prev-height could
        //    not be determined due to true-size renderables.
        if ((prevHeight === undefined) || (nextHeight === undefined)) {
            this._scroll.boundsReached = Bounds.NONE;
            this._scroll.springPosition = undefined;
            this._scroll.springSource = SpringSource.NONE;
            return;
        }

        // 1. When the rendered height is smaller than the total height,
        //    then lock to the primary bounds
        var totalHeight;
        if (enforeMinSize) {
            if ((nextHeight !== undefined) && (prevHeight !== undefined)) {
                totalHeight = prevHeight + nextHeight;
            }
            if ((totalHeight !== undefined) && (totalHeight <= size[this._direction])) {
                this._scroll.boundsReached = Bounds.BOTH;
                this._scroll.springPosition = this.options.alignment ? -nextHeight : prevHeight;
                this._scroll.springSource = SpringSource.MINSIZE;
                return;
            }
        }

        // 2. Check whether primary boundary has been reached
        if (this.options.alignment) {
            if (enforeMinSize) {
                if ((nextHeight !== undefined) && ((scrollOffset + nextHeight) <= 0)) {
                    this._scroll.boundsReached = Bounds.NEXT;
                    this._scroll.springPosition = -nextHeight;
                    this._scroll.springSource = SpringSource.NEXTBOUNDS;
                    return;
                }
            }
            else {
                var firstPrevItemHeight = this._calcScrollHeight(false, true);
                if ((nextHeight !== undefined) && firstPrevItemHeight && ((scrollOffset + nextHeight + size[this._direction]) <= firstPrevItemHeight)) {
                    this._scroll.boundsReached = Bounds.NEXT;
                    this._scroll.springPosition = nextHeight - (size[this._direction] - firstPrevItemHeight);
                    this._scroll.springSource = SpringSource.NEXTBOUNDS;
                    return;
                }
            }
        }
        else {
            if ((prevHeight !== undefined) && ((scrollOffset - prevHeight) >= 0)) {
                this._scroll.boundsReached = Bounds.PREV;
                this._scroll.springPosition = prevHeight;
                this._scroll.springSource = SpringSource.PREVBOUNDS;
                return;
            }
        }

        // 3. Check if secondary bounds has been reached
        if (this.options.alignment) {
            if ((prevHeight !== undefined) && ((scrollOffset - prevHeight) >= -size[this._direction])) {
                this._scroll.boundsReached = Bounds.PREV;
                this._scroll.springPosition = -size[this._direction] + prevHeight;
                this._scroll.springSource = SpringSource.PREVBOUNDS;
                return;
            }
        }
        else {
            var nextBounds = enforeMinSize ? size[this._direction] : this._calcScrollHeight(true, true);
            if ((nextHeight !== undefined) && ((scrollOffset + nextHeight) <= nextBounds)){
                this._scroll.boundsReached = Bounds.NEXT;
                this._scroll.springPosition = nextBounds - nextHeight;
                this._scroll.springSource = SpringSource.NEXTBOUNDS;
                return;
            }
        }

        // No bounds reached
        this._scroll.boundsReached = Bounds.NONE;
        this._scroll.springPosition = undefined;
        this._scroll.springSource = SpringSource.NONE;
    }

    /**
     * Calculates the scrollto-offset to which the spring is set.
     */
    function _calcScrollToOffset(size, scrollOffset) {
        var scrollToRenderNode = this._scroll.scrollToRenderNode || this._scroll.ensureVisibleRenderNode;
        if (!scrollToRenderNode) {
            return;
        }

        // 1. When boundary is reached, stop scrolling in that direction
        if ((this._scroll.boundsReached === Bounds.BOTH) ||
            (!this._scroll.scrollToDirection && (this._scroll.boundsReached === Bounds.PREV)) ||
            (this._scroll.scrollToDirection && (this._scroll.boundsReached === Bounds.NEXT))) {
            return;
        }

        // 2. Find the node to scroll to
        var foundNode;
        var scrollToOffset = 0;
        var node = this._nodes.getStartEnumNode(true);
        var count = 0;
        while (node) {
            count++;
            if (!node._invalidated || (node.scrollLength === undefined)) {
                break;
            }
            if (this.options.alignment) {
                scrollToOffset -= node.scrollLength;
            }
            if (node.renderNode === scrollToRenderNode) {
                foundNode = node;
                break;
            }
            if (!this.options.alignment) {
                scrollToOffset -= node.scrollLength;
            }
            node = node._next;
        }
        if (!foundNode) {
            scrollToOffset = 0;
            node = this._nodes.getStartEnumNode(false);
            while (node) {
                if (!node._invalidated || (node.scrollLength === undefined)) {
                   break;
                }
                if (!this.options.alignment) {
                    scrollToOffset += node.scrollLength;
                }
                if (node.renderNode === scrollToRenderNode) {
                    foundNode = node;
                    break;
                }
                if (this.options.alignment) {
                    scrollToOffset += node.scrollLength;
                }
                node = node._prev;
            }
        }

        // 3. Update springs
        if (foundNode) {
            if (this._scroll.ensureVisibleRenderNode) {
                if (this.options.alignment) {
                    if ((scrollToOffset - foundNode.scrollLength) < 0) {
                        this._scroll.springPosition = scrollToOffset;
                        this._scroll.springSource = SpringSource.ENSUREVISIBLE;
                    }
                    else if (scrollToOffset > size[this._direction]) {
                        this._scroll.springPosition = size[this._direction] - scrollToOffset;
                        this._scroll.springSource = SpringSource.ENSUREVISIBLE;
                    }
                    else {
                        if (!foundNode.trueSizeRequested) {
                            this._scroll.ensureVisibleRenderNode = undefined;
                        }
                    }
                }
                else {
                    scrollToOffset = -scrollToOffset;
                    if (scrollToOffset < 0) {
                        this._scroll.springPosition = scrollToOffset;
                        this._scroll.springSource = SpringSource.ENSUREVISIBLE;
                    }
                    else if ((scrollToOffset + foundNode.scrollLength) > size[this._direction]) {
                        this._scroll.springPosition = size[this._direction] - (scrollToOffset + foundNode.scrollLength);
                        this._scroll.springSource = SpringSource.ENSUREVISIBLE;
                    }
                    else {
                        if (!foundNode.trueSizeRequested) {
                          this._scroll.ensureVisibleRenderNode = undefined;
                        }
                    }
                }
            }
            else { // scrollToSequence
                this._scroll.springPosition = scrollToOffset;
                this._scroll.springSource = SpringSource.GOTOSEQUENCE;
            }
            return;
        }

        // 4. When node not found, keep searching
        if (this._scroll.scrollToDirection) {
            this._scroll.springPosition = scrollOffset - size[this._direction];
            this._scroll.springSource = SpringSource.GOTONEXTDIRECTION;

        }
        else {
            this._scroll.springPosition = scrollOffset + size[this._direction];
            this._scroll.springSource = SpringSource.GOTOPREVDIRECTION;
        }

        // 5. In case of a VirtualViewSequnce, make sure all the view-sequence nodes are touched, so
        //    that they are not cleaned up.
        if (this._viewSequence.cleanup) {
            var viewSequence = this._viewSequence;
            while (viewSequence.get() !== scrollToRenderNode) {
                viewSequence = this._scroll.scrollToDirection ? viewSequence.getNext(true) : viewSequence.getPrevious(true);
                if (!viewSequence) {
                    break;
                }
            }
        }
    }

    /**
     * Snaps to a page when pagination is enabled.
     */
    function _snapToPage() {

        // Check whether pagination is active
        if (!this.options.paginated ||
            this._scroll.scrollForceCount || //don't paginate while moving
            (this._scroll.springPosition !== undefined)) {
            return;
        }

        // When the energy is below the thresshold, paginate to the current page
        var item;
        switch (this.options.paginationMode) {
            case PaginationMode.SCROLL:
                if (!this.options.paginationEnergyThresshold || (Math.abs(this._scroll.particle.getEnergy()) <= this.options.paginationEnergyThresshold)) {
                    item = this.options.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
                    if (item && item.renderNode) {
                        this.goToRenderNode(item.renderNode);
                    }
                }
                break;
            case PaginationMode.PAGE:
                item = this.options.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
                if (item && item.renderNode) {
                    this.goToRenderNode(item.renderNode);
                }
                break;
        }
    }

    /**
     * Normalizes the view-sequence node so that the view-sequence is near to 0.
     */
    function _normalizePrevViewSequence(scrollOffset) {
        var count = 0;
        var normalizedScrollOffset = scrollOffset;
        var normalizeNextPrev = false;
        var node = this._nodes.getStartEnumNode(false);
        while (node) {
            if (!node._invalidated || !node._viewSequence) {
                break;
            }
            if (normalizeNextPrev) {
                this._viewSequence = node._viewSequence;
                normalizedScrollOffset = scrollOffset;
                normalizeNextPrev = false;
            }
            if ((node.scrollLength === undefined) || node.trueSizeRequested || (scrollOffset < 0)) {
                break;
            }
            scrollOffset -= node.scrollLength;
            count++;
            if (node.scrollLength) {
                if (this.options.alignment) {
                    normalizeNextPrev = (scrollOffset >= 0);
                }
                else {
                    this._viewSequence = node._viewSequence;
                    normalizedScrollOffset = scrollOffset;
                }
            }
            node = node._prev;
        }
        return normalizedScrollOffset;
    }
    function _normalizeNextViewSequence(scrollOffset) {
        var count = 0;
        var normalizedScrollOffset = scrollOffset;
        var node = this._nodes.getStartEnumNode(true);
        while (node) {
            if (!node._invalidated || (node.scrollLength === undefined) || node.trueSizeRequested || !node._viewSequence ||
                ((scrollOffset > 0) && (!this.options.alignment || (node.scrollLength !== 0)))) {
                break;
            }
            if (this.options.alignment) {
                scrollOffset += node.scrollLength;
                count++;
            }
            if (node.scrollLength || this.options.alignment) {
                this._viewSequence = node._viewSequence;
                normalizedScrollOffset = scrollOffset;
            }
            if (!this.options.alignment) {
                scrollOffset += node.scrollLength;
                count++;
            }
            node = node._next;
        }
        return normalizedScrollOffset;
    }
    function _normalizeViewSequence(size, scrollOffset) {

        // Check whether normalisation is disabled
        var caps = this._layout.capabilities;
        if (caps && caps.debug &&
            (caps.debug.normalize !== undefined) &&
            !caps.debug.normalize) {
            return scrollOffset;
        }

        // Don't normalize when forces are at work
        if (this._scroll.scrollForceCount) {
            return scrollOffset;
        }

        // 1. Normalize in primary direction
        var normalizedScrollOffset = scrollOffset;
        if (this.options.alignment && (scrollOffset < 0)) {
            normalizedScrollOffset = _normalizeNextViewSequence.call(this, scrollOffset);
        }
        else if (!this.options.alignment && (scrollOffset > 0)){
            normalizedScrollOffset = _normalizePrevViewSequence.call(this, scrollOffset);
        }

        // 2. Normalize in secondary direction
        if (normalizedScrollOffset === scrollOffset) {
            if (this.options.alignment && (scrollOffset > 0)) {
                normalizedScrollOffset = _normalizePrevViewSequence.call(this, scrollOffset);
            }
            else if (!this.options.alignment && (scrollOffset < 0)) {
                normalizedScrollOffset = _normalizeNextViewSequence.call(this, scrollOffset);
            }
        }

        // Adjust particle and springs
        if (normalizedScrollOffset !== scrollOffset) {
            var delta = normalizedScrollOffset - scrollOffset;

            // Adjust particle
            var particleValue = this._scroll.particle.getPosition1D();
            //var particleValue = this._scroll.particleValue;
            _setParticle.call(this, particleValue + delta, undefined, 'normalize');
            //_log.call(this, 'normalized scrollOffset: ', normalizedScrollOffset, ', old: ', scrollOffset, ', particle: ', particleValue + delta);

            // Adjust scroll spring
            if (this._scroll.springPosition !== undefined) {
                this._scroll.springPosition += delta;
            }

            // Adjust group offset
            if (caps && caps.sequentialScrollingOptimized) {
                this._scroll.groupStart -= delta;
            }
        }
        return normalizedScrollOffset;
    }

    /**
     * Get all items that are partly or completely visible.
     *
     * The returned result is an array of objects containing the
     * following properties. Example:
     * ```javascript
     * {
     *   viewSequence: {ViewSequence},
     *   index: {Number},
     *   renderNode: {renderable},
     *   visiblePerc: {Number} 0..1
     * }
     * ```
     * @return {Array} array of items
     */
    ScrollController.prototype.getVisibleItems = function() {
        var size = this._contextSizeCache;
        var scrollOffset = this.options.alignment ? (this._scroll.unnormalizedScrollOffset + size[this._direction]) : this._scroll.unnormalizedScrollOffset;
        var result = [];
        var node = this._nodes.getStartEnumNode(true);
        while (node) {
            if (!node._invalidated || (node.scrollLength === undefined) || (scrollOffset > size[this._direction])) {
                break;
            }
            scrollOffset += node.scrollLength;
            if ((scrollOffset >= 0) && node._viewSequence){
                result.push({
                    index: node._viewSequence.getIndex(),
                    viewSequence: node._viewSequence,
                    renderNode: node.renderNode,
                    visiblePerc: node.scrollLength ? ((Math.min(scrollOffset, size[this._direction]) - Math.max(scrollOffset - node.scrollLength, 0)) / node.scrollLength) : 1,
                    scrollOffset: scrollOffset - node.scrollLength,
                    scrollLength: node.scrollLength,
                    _node: node
                });
            }
            node = node._next;
        }
        scrollOffset = this.options.alignment ? (this._scroll.unnormalizedScrollOffset + size[this._direction]) : this._scroll.unnormalizedScrollOffset;
        node = this._nodes.getStartEnumNode(false);
        while (node) {
            if (!node._invalidated || (node.scrollLength === undefined) || (scrollOffset < 0)) {
                break;
            }
            scrollOffset -= node.scrollLength;
            if ((scrollOffset < size[this._direction]) && node._viewSequence) {
                result.unshift({
                    index: node._viewSequence.getIndex(),
                    viewSequence: node._viewSequence,
                    renderNode: node.renderNode,
                    visiblePerc: node.scrollLength ? ((Math.min(scrollOffset + node.scrollLength, size[this._direction]) - Math.max(scrollOffset, 0)) / node.scrollLength) : 1,
                    scrollOffset: scrollOffset,
                    scrollLength: node.scrollLength,
                    _node: node
                });
            }
            node = node._prev;
        }
        return result;
    };

    /**
     * Get the first visible item in the view.
     *
     * An item is considered to be the first visible item when:
     * -    First item that is partly visible and the visibility % is higher than `options.visibleItemThresshold`
     * -    It is the first item after the top/left bounds
     *
     * @return {Object} item or `undefined`
     */
    ScrollController.prototype.getFirstVisibleItem = function(includeNode) {
        var size = this._contextSizeCache;
        var scrollOffset = this.options.alignment ? (this._scroll.unnormalizedScrollOffset + size[this._direction]) : this._scroll.unnormalizedScrollOffset;
        var node = this._nodes.getStartEnumNode(true);
        var nodeFoundVisiblePerc;
        var nodeFoundScrollOffset;
        var nodeFound;
        while (node) {
            if (!node._invalidated || (node.scrollLength === undefined) || (scrollOffset > size[this._direction])) {
                break;
            }
            scrollOffset += node.scrollLength;
            if ((scrollOffset >= 0) && node._viewSequence) {
                nodeFoundVisiblePerc = node.scrollLength ? ((Math.min(scrollOffset, size[this._direction]) - Math.max(scrollOffset - node.scrollLength, 0)) / node.scrollLength) : 1;
                nodeFoundScrollOffset = scrollOffset - node.scrollLength;
                if ((nodeFoundVisiblePerc >= this.options.visibleItemThresshold) ||
                    (nodeFoundScrollOffset >= 0)) {
                    nodeFound = node;
                    break;
                }
            }
            node = node._next;
        }
        scrollOffset = this.options.alignment ? (this._scroll.unnormalizedScrollOffset + size[this._direction]) : this._scroll.unnormalizedScrollOffset;
        node = this._nodes.getStartEnumNode(false);
        while (node) {
            if (!node._invalidated || (node.scrollLength === undefined) || (scrollOffset < 0)) {
                break;
            }
            scrollOffset -= node.scrollLength;
            if ((scrollOffset < size[this._direction]) && node._viewSequence) {
                var visiblePerc = node.scrollLength ? ((Math.min(scrollOffset + node.scrollLength, size[this._direction]) - Math.max(scrollOffset, 0)) / node.scrollLength) : 1;
                if ((visiblePerc >= this.options.visibleItemThresshold) ||
                    (scrollOffset >= 0)) {
                    nodeFoundVisiblePerc = visiblePerc;
                    nodeFoundScrollOffset = scrollOffset;
                    nodeFound = node;
                    break;
                }
            }
            node = node._prev;
        }
        return nodeFound ? {
            index: nodeFound._viewSequence.getIndex(),
            viewSequence: nodeFound._viewSequence,
            renderNode: nodeFound.renderNode,
            visiblePerc: nodeFoundVisiblePerc,
            scrollOffset: nodeFoundScrollOffset,
            scrollLength: nodeFound.scrollLength,
            _node: nodeFound
        } : undefined;
    };

    /**
     * Get the last visible item in the view.
     *
     * An item is considered to be the last visible item when:
     * -    Last item that is partly visible and the visibility % is higher than `options.visibleItemThresshold`
     * -    It is the last item before the bottom/right bounds
     *
     * @return {Object} item or `undefined`
     */
    ScrollController.prototype.getLastVisibleItem = function() {
        var items = this.getVisibleItems();
        var size = this._contextSizeCache;
        for (var i = items.length - 1; i >= 0; i--) {
            var item = items[i];
            if ((item.visiblePerc >= this.options.visibleItemThresshold) ||
                ((item.scrollOffset + item.scrollLength) <= size[this._direction])) {
                return item;
            }
        }
        return items.length ? items[items.length - 1] : undefined;
    };

    /**
     * Helper function that goes to a view-sequence either by scrolling
     * or immediately without any scrolling animation.
     */
    function _goToSequence(viewSequence, next, noAnimation) {
        if (noAnimation) {
            this._viewSequence = viewSequence;
            this._scroll.springPosition = undefined;
            _updateSpring.call(this);
            this.halt();
            this._scroll.scrollDelta = 0;
            _setParticle.call(this, 0, 0, '_goToSequence');
            this._isDirty = true;
        }
        else {
            this._scroll.scrollToSequence = viewSequence;
            this._scroll.scrollToRenderNode = viewSequence.get();
            this._scroll.ensureVisibleRenderNode = undefined;
            this._scroll.scrollToDirection = next;
            this._scroll.scrollDirty = true;
        }
    }

    /**
     * Helper function that scrolls the view towards a view-sequence node.
     */
    function _ensureVisibleSequence(viewSequence, next) {
        this._scroll.scrollToSequence = undefined;
        this._scroll.scrollToRenderNode = undefined;
        this._scroll.ensureVisibleRenderNode = viewSequence.get();
        this._scroll.scrollToDirection = next;
        this._scroll.scrollDirty = true;
    }

    /**
     * Moves to the next node in the viewSequence.
     *
     * @param {Number} [amount] Amount of nodes to move
     * @param {Bool} [noAnimation] When set to true, immediately shows the node without any scrolling animation.
     */
    function _goToPage(amount, noAnimation) {

        // Get current scroll-position. When a previous call was made to
        // `scroll' or `scrollTo` and that node has not yet been reached, then
        // the amount is accumalated onto that scroll target.
        var viewSequence = (!noAnimation ? this._scroll.scrollToSequence : undefined) || this._viewSequence;
        if (!this._scroll.scrollToSequence && !noAnimation) {
            var firstVisibleItem = this.getFirstVisibleItem();
            if (firstVisibleItem) {
                viewSequence = firstVisibleItem.viewSequence;
                if (((amount < 0) && (firstVisibleItem.scrollOffset < 0)) ||
                    ((amount > 0) && (firstVisibleItem.scrollOffset > 0))) {
                    amount = 0;
                }
            }
        }
        if (!viewSequence) {
            return;
        }

        // Find scroll target
        for (var i = 0; i < Math.abs(amount); i++) {
            var nextViewSequence = (amount > 0) ? viewSequence.getNext() : viewSequence.getPrevious();
            if (nextViewSequence) {
                viewSequence = nextViewSequence;
            }
            else {
                break;
            }
        }
        _goToSequence.call(this, viewSequence, amount >= 0, noAnimation);
    }

    /**
     * Goes to the first page, making it visible.
     *
     * NOTE: This function does not work on ViewSequences that have the `loop` property enabled.
     *
     * @param {Bool} [noAnimation] When set to true, immediately shows the node without any scrolling animation.
     * @return {ScrollController} this
     */
    ScrollController.prototype.goToFirstPage = function(noAnimation) {
        if (!this._viewSequence) {
            return this;
        }
        if (this._viewSequence._ && this._viewSequence._.loop) {
            LayoutUtility.error('Unable to go to first item of looped ViewSequence');
            return this;
        }
        var viewSequence = this._viewSequence;
        while (viewSequence) {
            var prev = viewSequence.getPrevious();
            if (prev && prev.get()) {
                viewSequence = prev;
            }
            else {
                break;
            }
        }
        _goToSequence.call(this, viewSequence, false, noAnimation);
        return this;
    };

    /**
     * Goes to the previous page, making it visible.
     *
     * @param {Bool} [noAnimation] When set to true, immediately shows the node without any scrolling animation.
     * @return {ScrollController} this
     */
    ScrollController.prototype.goToPreviousPage = function(noAnimation) {
        _goToPage.call(this, -1, noAnimation);
        return this;
    };

    /**
     * Goes to the next page, making it visible.
     *
     * @param {Bool} [noAnimation] When set to true, immediately shows the node without any scrolling animation.
     * @return {ScrollController} this
     */
    ScrollController.prototype.goToNextPage = function(noAnimation) {
        _goToPage.call(this, 1, noAnimation);
        return this;
    };

    /**
     * Goes to the last page, making it visible.
     *
     * NOTE: This function does not work on ViewSequences that have the `loop` property enabled.
     *
     * @param {Bool} [noAnimation] When set to true, immediately shows the node without any scrolling animation.
     * @return {ScrollController} this
     */
    ScrollController.prototype.goToLastPage = function(noAnimation) {
        if (!this._viewSequence) {
            return this;
        }
        if (this._viewSequence._ && this._viewSequence._.loop) {
            LayoutUtility.error('Unable to go to last item of looped ViewSequence');
            return this;
        }
        var viewSequence = this._viewSequence;
        while (viewSequence) {
            var next = viewSequence.getNext();
            if (next && next.get()) {
                viewSequence = next;
            }
            else {
                break;
            }
        }
        _goToSequence.call(this, viewSequence, true, noAnimation);
        return this;
    };

    /**
     * Goes to the given renderable in the datasource.
     *
     * @param {RenderNode} node renderable to scroll to.
     * @param {Bool} [noAnimation] When set to true, immediately shows the node without scrolling animation.
     * @return {ScrollController} this
     */
    ScrollController.prototype.goToRenderNode = function(node, noAnimation) {

        // Verify arguments and state
        if (!this._viewSequence || !node) {
            return this;
        }

        // Check current node
        if (this._viewSequence.get() === node) {
            var next = _calcScrollOffset.call(this) >= 0;
            _goToSequence.call(this, this._viewSequence, next, noAnimation);
            return this;
        }

        // Find the sequence-node that we want to scroll to.
        // We look at both directions at the same time.
        // The first match that is encountered, that direction is chosen.
        var nextSequence = this._viewSequence.getNext();
        var prevSequence = this._viewSequence.getPrevious();
        while ((nextSequence || prevSequence) && (nextSequence !== this._viewSequence)){
            var nextNode = nextSequence ? nextSequence.get() : undefined;
            if (nextNode === node) {
                _goToSequence.call(this, nextSequence, true, noAnimation);
                break;
            }
            var prevNode = prevSequence ? prevSequence.get() : undefined;
            if (prevNode === node) {
                _goToSequence.call(this, prevSequence, false, noAnimation);
                break;
            }
            nextSequence = nextNode ? nextSequence.getNext() : undefined;
            prevSequence = prevNode ? prevSequence.getPrevious() : undefined;
        }
        return this;
    };

    /**
     * Ensures that a render-node is entirely visible.
     *
     * When the node is already visible, nothing happens. If the node is not entirely visible
     * the view is scrolled as much as needed to make it entirely visibl.
     *
     * @param {Number|ViewSequence|Renderable} node index, renderNode or ViewSequence
     * @return {ScrollController} this
     */
    ScrollController.prototype.ensureVisible = function(node) {

        // Convert argument into renderNode
        if (node instanceof ViewSequence) {
            node = node.get();
        }
        else if ((node instanceof Number) || (typeof node === 'number')) {
            var viewSequence = this._viewSequence;
            while (viewSequence.getIndex() < node) {
                viewSequence = viewSequence.getNext();
                if (!viewSequence) {
                    return this;
                }
            }
            while (viewSequence.getIndex() > node) {
                viewSequence = viewSequence.getPrevious();
                if (!viewSequence) {
                    return this;
                }
            }
        }

        // Check current node
        if (this._viewSequence.get() === node) {
            var next = _calcScrollOffset.call(this) >= 0;
            _ensureVisibleSequence.call(this, this._viewSequence, next);
            return this;
        }

        // Find the sequence-node that we want to scroll to.
        // We look at both directions at the same time.
        // The first match that is encountered, that direction is chosen.
        var nextSequence = this._viewSequence.getNext();
        var prevSequence = this._viewSequence.getPrevious();
        while ((nextSequence || prevSequence) && (nextSequence !== this._viewSequence)){
            var nextNode = nextSequence ? nextSequence.get() : undefined;
            if (nextNode === node) {
                _ensureVisibleSequence.call(this, nextSequence, true);
                break;
            }
            var prevNode = prevSequence ? prevSequence.get() : undefined;
            if (prevNode === node) {
                _ensureVisibleSequence.call(this, prevSequence, false);
                break;
            }
            nextSequence = nextNode ? nextSequence.getNext() : undefined;
            prevSequence = prevNode ? prevSequence.getPrevious() : undefined;
        }

        return this;
    };

    /**
     * Scrolls the view by the specified number of pixels.
     *
     * @param {Number} delta Delta in pixels (< 0 = down/right, > 0 = top/left).
     * @return {ScrollController} this
     */
    ScrollController.prototype.scroll = function(delta) {
        this.halt();
        this._scroll.scrollDelta += delta;
        return this;
    };

    /**
     * Checks whether the scrollview can scroll the given delta.
     * When the scrollView can scroll the whole delta, then
     * the return value is the same as the delta. If it cannot
     * scroll the entire delta, the return value is the number of
     * pixels that can be scrolled.
     *
     * @param {Number} delta Delta to test
     * @return {Number} Number of pixels the view is allowed to scroll
     */
    ScrollController.prototype.canScroll = function(delta) {

        // Calculate height in both directions
        var scrollOffset = _calcScrollOffset.call(this);
        var prevHeight = this._calcScrollHeight(false);
        var nextHeight = this._calcScrollHeight(true);

        // When the rendered height is smaller than the total height,
        // then no scrolling whatsover is allowed.
        var totalHeight;
        if ((nextHeight !== undefined) && (prevHeight !== undefined)) {
            totalHeight = prevHeight + nextHeight;
        }
        if ((totalHeight !== undefined) && (totalHeight <= this._contextSizeCache[this._direction])) {
            return 0; // no scrolling at all allowed
        }

        // Determine the offset that we can scroll
        if ((delta < 0) && (nextHeight !== undefined)) {
            var nextOffset = this._contextSizeCache[this._direction] - (scrollOffset + nextHeight);
            return Math.max(nextOffset, delta);
        }
        else if ((delta > 0) && (prevHeight !== undefined)) {
            var prevOffset = -(scrollOffset - prevHeight);
            return Math.min(prevOffset, delta);
        }
        return delta;
    };

    /**
     * Halts all scrolling going on. In essence this function sets
     * the velocity to 0 and cancels any `goToXxx` operation that
     * was applied.
     *
     * @return {ScrollController} this
     */
    ScrollController.prototype.halt = function() {
        this._scroll.scrollToSequence = undefined;
        this._scroll.scrollToRenderNode = undefined;
        this._scroll.ensureVisibleRenderNode = undefined;
        _setParticle.call(this, undefined, 0, 'halt');
        return this;
    };

    /**
     * Checks whether scrolling is in progress or not.
     *
     * @return {Bool} true when scrolling is active
     */
    ScrollController.prototype.isScrolling = function() {
        return this._scroll.isScrolling;
    };

    /**
     * Checks whether any boundaries have been reached.
     *
     * @return {ScrollController.Bounds} Either, Bounds.PREV, Bounds.NEXT, Bounds.BOTH or Bounds.NONE
     */
    ScrollController.prototype.getBoundsReached = function() {
        return this._scroll.boundsReached;
    };

    /**
     * Get the current scrolling velocity.
     *
     * @return {Number} Scroll velocity
     */
    ScrollController.prototype.getVelocity = function() {
        return this._scroll.particle.getVelocity1D();
    };

    /**
     * Set the scrolling velocity.
     *
     * @param {Number} velocity New scroll velocity
     * @return {ScrollController} this
     */
    ScrollController.prototype.setVelocity = function(velocity) {
        return this._scroll.particle.setVelocity1D(velocity);
    };

    /**
     * Applies a permanent scroll-force (delta) until it is released.
     * When the cumulative scroll-offset lies outside the allowed bounds
     * a strech effect is used, and the offset beyond the bounds is
     * substracted by halve. This function should always be accompanied
     * by a call to `releaseScrollForce`.
     *
     * This method is used for instance when using touch gestures to move
     * the scroll offset and corresponds to the `touchstart` event.
     *
     * @param {Number} delta Starting scroll-delta force to apply
     * @return {ScrollController} this
     */
    ScrollController.prototype.applyScrollForce = function(delta) {
        this.halt();
        if (this._scroll.scrollForceCount === 0) {
            this._scroll.scrollForceStartItem = this.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
        }
        this._scroll.scrollForceCount++;
        this._scroll.scrollForce += delta;
        return this;
    };

    /**
     * Updates a existing scroll-force previously applied by calling
     * `applyScrollForce`.
     *
     * This method is used for instance when using touch gestures to move
     * the scroll offset and corresponds to the `touchmove` event.
     *
     * @param {Number} prevDelta Previous delta
     * @param {Number} newDelta New delta
     * @return {ScrollController} this
     */
    ScrollController.prototype.updateScrollForce = function(prevDelta, newDelta) {
        this.halt();
        newDelta -= prevDelta;
        this._scroll.scrollForce += newDelta;
        return this;
    };

    /**
     * Releases a scroll-force and sets the velocity.
     *
     * This method is used for instance when using touch gestures to move
     * the scroll offset and corresponds to the `touchend` event.
     *
     * @param {Number} delta Scroll delta to release
     * @param {Number} [velocity] Velocity to apply after which the view keeps scrolling
     * @return {ScrollController} this
     */
    ScrollController.prototype.releaseScrollForce = function(delta, velocity) {
        this.halt();
        if (this._scroll.scrollForceCount === 1) {
            var scrollOffset = _calcScrollOffset.call(this);
            _setParticle.call(this, scrollOffset, velocity, 'releaseScrollForce');
            this._scroll.pe.wake();
            this._scroll.scrollForce = 0;
            this._scroll.scrollDirty = true;
            if (this._scroll.scrollForceStartItem && this.options.paginated && (this.options.paginationMode === PaginationMode.PAGE)) {
                var item = this.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
                if (item) {
                    if (item.renderNode !== this._scroll.scrollForceStartItem.renderNode) {
                        this.goToRenderNode(item.renderNode);
                    }
                    else if (this.options.paginationEnergyThresshold && (Math.abs(this._scroll.particle.getEnergy()) >= this.options.paginationEnergyThresshold)) {
                        velocity = velocity || 0;
                        if ((velocity < 0) && item._node._next && item._node._next.renderNode) {
                            this.goToRenderNode(item._node._next.renderNode);
                        }
                        else if ((velocity >= 0) && item._node._prev && item._node._prev.renderNode) {
                            this.goToRenderNode(item._node._prev.renderNode);
                        }
                    }
                    else {
                        this.goToRenderNode(item.renderNode);
                    }
                }
            }
            this._scroll.scrollForceStartItem = undefined;
        }
        else {
            this._scroll.scrollForce -= delta;
        }
        this._scroll.scrollForceCount--;
        return this;
    };

     /**
     * Get the spec (size, transform, etc..) for the given renderable or
     * Id.
     *
     * @param {Renderable|String} node Renderabe or Id to look for.
     * @param {Bool} normalize When set to `true` normalizes the origin/align into the transform translation (default: `false`).
     * @return {Spec} spec or undefined
     */
    ScrollController.prototype.getSpec = function(node, normalize) {
        var spec = LayoutController.prototype.getSpec.apply(this, arguments);
        if (spec && this._layout.capabilities && this._layout.capabilities.sequentialScrollingOptimized) {
            spec = {
                origin: spec.origin,
                align: spec.align,
                opacity: spec.opacity,
                size: spec.size,
                renderNode: spec.renderNode,
                transform: spec.transform
            };
            var translate = [0, 0, 0];
            translate[this._direction] = this._scrollOffsetCache + this._scroll.groupStart;
            spec.transform = Transform.thenMove(spec.transform, translate);
        }
        return spec;
    };

    /**
     * Executes the layout and updates the state of the scrollview.
     */
    function _layout(size, scrollOffset, nested) {

        // Track the number of times the layout-function was executed
        this._debug.layoutCount++;
        //_log.call(this, 'Layout, scrollOffset: ', scrollOffset, ', particle: ', this._scroll.particle.getPosition1D());

        // Determine start & end
        var scrollStart = 0 - Math.max(this.options.extraBoundsSpace[0], 1);
        var scrollEnd = size[this._direction] + Math.max(this.options.extraBoundsSpace[1], 1);
        if (this.options.layoutAll) {
            scrollStart = -1000000;
            scrollEnd = 1000000;
        }

        // Prepare for layout
        var layoutContext = this._nodes.prepareForLayout(
            this._viewSequence,     // first node to layout
            this._nodesById, {      // so we can do fast id lookups
                size: size,
                direction: this._direction,
                reverse: this.options.alignment ? true : false,
                scrollOffset: this.options.alignment ? (scrollOffset + size[this._direction]) : scrollOffset,
                scrollStart: scrollStart,
                scrollEnd: scrollEnd
            }
        );

        // Layout objects
        if (this._layout._function) {
            this._layout._function(
                layoutContext,          // context which the layout-function can use
                this._layout.options    // additional layout-options
            );
        }
        this._scroll.unnormalizedScrollOffset = scrollOffset;

        // Call post-layout function
        if (this._postLayout) {
            this._postLayout(size, scrollOffset);
        }

        // Mark non-invalidated nodes for removal
        this._nodes.removeNonInvalidatedNodes(this.options.flowOptions.removeSpec);

        // Check whether the bounds have been reached
        _calcBounds.call(this, size, scrollOffset);

        // Update scroll-to spring
        _calcScrollToOffset.call(this, size, scrollOffset);

        // When pagination is enabled, snap to page
        _snapToPage.call(this);

        // If the bounds have changed, and the scroll-offset would be different
        // than before, then re-layout entirely using the new offset.
        var newScrollOffset = _calcScrollOffset.call(this, true);
        if (!nested && (newScrollOffset !== scrollOffset)) {
            //_log.call(this, 'offset changed, re-layouting... (', scrollOffset, ' != ', newScrollOffset, ')');
            return _layout.call(this, size, newScrollOffset, true);
        }

        // Normalize scroll offset so that the current viewsequence node is as close to the
        // top as possible and the layout function will need to process the least amount
        // of renderables.
        scrollOffset = _normalizeViewSequence.call(this, size, scrollOffset);

        // Update spring
        _updateSpring.call(this);

        // Cleanup any nodes in case of a VirtualViewSequence
        this._nodes.removeVirtualViewSequenceNodes();

        // Calculate scroll-length and use that as the true-size (height)
        if (this.options.size && (this.options.size[this._direction] === true)) {
            var scrollLength = 0;
            var node = this._nodes.getStartEnumNode();
            while (node) {
                if (node._invalidated && node.scrollLength) {
                    scrollLength += node.scrollLength;
                }
                node = node._next;
            }
            this._size = this._size || [0, 0];
            this._size[0] = this.options.size[0];
            this._size[1] = this.options.size[1];
            this._size[this._direction] = scrollLength;
        }

        return scrollOffset;
    }

    /**
     * Inner render function of the Group
     */
    function _innerRender() {
        var specs = this._specs;
        for (var i3 = 0, j3 = specs.length; i3 < j3; i3++) {
            if (specs[i3].renderNode) {
                specs[i3].target = specs[i3].renderNode.render();
            }
        }

        // Add our cleanup-registration id also to the list, so that the
        // cleanup function is called by famo.us when the LayoutController is
        // removed from the render-tree.
        if (!specs.length || (specs[specs.length-1] !== this._cleanupRegistration)) {
            specs.push(this._cleanupRegistration);
        }
        return specs;
    }

    /**
     * Apply changes from this component to the corresponding document element.
     * This includes changes to classes, styles, size, content, opacity, origin,
     * and matrix transforms.
     *
     * @private
     * @method commit
     * @param {Context} context commit context
     */
    ScrollController.prototype.commit = function commit(context) {
        var size = context.size;

        // Update debug info
        this._debug.commitCount++;

        // Reset the flow-state when requested
        if (this._resetFlowState) {
            this._resetFlowState = false;
            this._isDirty = true;
            this._nodes.removeAll();
        }

        // Calculate scroll offset
        var scrollOffset = _calcScrollOffset.call(this, true, true);
        if (this._scrollOffsetCache === undefined) {
            this._scrollOffsetCache = scrollOffset;
        }

        // When the size or layout function has changed, reflow the layout
        var emitEndScrollingEvent = false;
        var emitScrollEvent = false;
        var eventData;
        if (size[0] !== this._contextSizeCache[0] ||
            size[1] !== this._contextSizeCache[1] ||
            this._isDirty ||
            this._scroll.scrollDirty ||
            this._nodes._trueSizeRequested ||
            this.options.alwaysLayout ||
            this._scrollOffsetCache !== scrollOffset) {

            // Prepare event data
            eventData = {
                target: this,
                oldSize: this._contextSizeCache,
                size: size,
                oldScrollOffset: -(this._scrollOffsetCache + this._scroll.groupStart),
                scrollOffset: -(scrollOffset + this._scroll.groupStart)
            };

            // When scroll-offset has changed, emit scroll-start and scroll events
            if (this._scrollOffsetCache !== scrollOffset) {
                if (!this._scroll.isScrolling) {
                    this._scroll.isScrolling = true;
                    this._eventOutput.emit('scrollstart', eventData);
                }
                emitScrollEvent = true;
            }
            else if (this._scroll.isScrolling && !this._scroll.scrollForceCount) {
                emitEndScrollingEvent = true;
            }

            this._eventOutput.emit('layoutstart', eventData);

            // When the layout has changed, and we are not just scrolling,
            // disable the locked state of the layout-nodes so that they
            // can freely transition between the old and new state.
            if (this.options.flow && (this._isDirty ||
                (this.options.flowOptions.reflowOnResize &&
                ((size[0] !== this._contextSizeCache[0]) ||
                 (size[1] !== this._contextSizeCache[1]))))) {
                var node = this._nodes.getStartEnumNode();
                while (node) {
                    node.releaseLock(true);
                    node = node._next;
                }
            }

            // Update state
            this._contextSizeCache[0] = size[0];
            this._contextSizeCache[1] = size[1];
            this._isDirty = false;
            this._scroll.scrollDirty = false;

            // Perform layout
            scrollOffset = _layout.call(this, size, scrollOffset);
            this._scrollOffsetCache = scrollOffset;

            // Emit end event
            eventData.scrollOffset = -(this._scrollOffsetCache + this._scroll.groupStart);
        }
        else if (this._scroll.isScrolling && !this._scroll.scrollForceCount) {
            emitEndScrollingEvent = true;
        }

        // Update output and optionally emit event
        var groupTranslate = this._scroll.groupTranslate;
        groupTranslate[0] = 0;
        groupTranslate[1] = 0;
        groupTranslate[2] = 0;
        groupTranslate[this._direction] = -this._scroll.groupStart - scrollOffset;
        var sequentialScrollingOptimized = this._layout.capabilities ? this._layout.capabilities.sequentialScrollingOptimized : false;
        var result = this._nodes.buildSpecAndDestroyUnrenderedNodes(sequentialScrollingOptimized ? groupTranslate : undefined);
        this._specs = result.specs;
        if (!this._specs.length) {
          this._scroll.groupStart = 0;
        }
        if (eventData) { // eventData is only used here to check whether there has been a re-layout
            this._eventOutput.emit('layoutend', eventData);
        }
        if (result.modified) {
            this._eventOutput.emit('reflow', {
                target: this
            });
        }

        // View has been scrolled, emit event
        if (emitScrollEvent) {
            this._eventOutput.emit('scroll', eventData);
        }

        // Check whether the current page has changed
        if (eventData) { // eventData is only used here to check whether there has been a re-layout
            var visibleItem = this.options.alignment ? this.getLastVisibleItem() : this.getFirstVisibleItem();
            if ((visibleItem && !this._visibleItemCache) || (!visibleItem && this._visibleItemCache) ||
                (visibleItem && this._visibleItemCache && (visibleItem.renderNode !== this._visibleItemCache.renderNode))) {
                this._eventOutput.emit('pagechange', {
                    target: this,
                    oldViewSequence: this._visibleItemCache ? this._visibleItemCache.viewSequence : undefined,
                    viewSequence: visibleItem ? visibleItem.viewSequence : undefined,
                    oldIndex: this._visibleItemCache ? this._visibleItemCache.index : undefined,
                    index: visibleItem ? visibleItem.index : undefined,
                    renderNode: visibleItem ? visibleItem.renderNode : undefined,
                    oldRenderNode: this._visibleItemCache ? this._visibleItemCache.renderNode : undefined
                });
                this._visibleItemCache = visibleItem;
            }
        }

        // Emit end scrolling event
        if (emitEndScrollingEvent) {
            this._scroll.isScrolling = false;
            eventData = {
                target: this,
                oldSize: size,
                size: size,
                oldScrollOffset: -(this._scroll.groupStart + scrollOffset),
                scrollOffset: -(this._scroll.groupStart + scrollOffset)
            };
            this._eventOutput.emit('scrollend', eventData);
        }

        // When renderables are layed out sequentiall (e.g. a ListLayout or
        // CollectionLayout), then offset the renderables onto the Group
        // and move the group offset instead. This creates a very big performance gain
        // as the renderables don't have to be repositioned for every change
        // to the scrollOffset. For layouts that don't layout sequence, disable
        // this behavior as it will be decremental to the performance.
        var transform = context.transform;
        if (sequentialScrollingOptimized) {
            var windowOffset = scrollOffset + this._scroll.groupStart;
            var translate = [0, 0, 0];
            translate[this._direction] = windowOffset;
            transform = Transform.thenMove(transform, translate);
        }

        // Return the spec
        return {
            transform: transform,
            size: size,
            opacity: context.opacity,
            origin: context.origin,
            target: this.group.render()
        };
    };

    /**
     * Generate a render spec from the contents of this component.
     *
     * @private
     * @method render
     * @return {number} Render spec for this component
     */
    ScrollController.prototype.render = function render() {
        if (this.container) {
            return this.container.render.apply(this.container, arguments);
        }
        else {
            return this.id;
        }
    };

    module.exports = ScrollController;

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-flex\\ScrollController.js","/..\\res\\famous-flex")
},{"./FlowLayoutNode":46,"./LayoutController":48,"./LayoutNode":49,"./LayoutNodeManager":50,"./LayoutUtility":51,"VCmEsw":43,"buffer":40,"famous/core/EventHandler":11,"famous/core/Group":12,"famous/core/Transform":18,"famous/core/ViewSequence":20,"famous/inputs/ScrollSync":21,"famous/math/Vector":22,"famous/physics/PhysicsEngine":24,"famous/physics/bodies/Particle":25,"famous/physics/forces/Drag":26,"famous/physics/forces/Spring":28,"famous/surfaces/ContainerSurface":30}],53:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014 - 2015
 */

/**
 * LayoutDockHelper helps positioning nodes using docking principles.
 *
 * **Example:**
 *
 * ```javascript
 * var LayoutDockHelper = require('famous-flex/helpers/LayoutDockHelper');
 *
 * function HeaderFooterLayout(context, options) {
 *   var dock = new LayoutDockHelper(context);
 *   dock.top('header', options.headerSize);
 *   dock.bottom('footer', options.footerSize);
 *   dock.fill('content');
 * };
 * ```
 *
 * You can also use layout-literals to create layouts using docking semantics:
 *
 * ```javascript
 * var layoutController = new LayoutController({
 *   layout: {dock: [
 *     ['top', 'header', 40],
 *     ['bottom', 'footer', 40, 1], // z-index +1
 *     ['fill', 'content']
 *   ]},
 *   dataSource: {
 *     header: new Surface({content: 'header'}),
 *     footer: new Surface({content: 'footer'}),
 *     content: new Surface({content: 'content'}),
 *   }
 * });
 * ```
 *
 * @module
 */

    // import dependencies
    var LayoutUtility = require('../LayoutUtility');

    /**
     * @class
     * @param {LayoutContext} context layout-context
     * @param {Object} [options] additional options
     * @param {Object} [options.margins] margins to start out with (default: 0px)
     * @param {Number} [options.translateZ] z-index to use when translating objects (default: 0)
     * @alias module:LayoutDockHelper
     */
    function LayoutDockHelper(context, options) {
        var size = context.size;
        this._size = size;
        this._context = context;
        this._options = options;
        this._z = (options && options.translateZ) ? options.translateZ : 0;
        if (options && options.margins) {
            var margins = LayoutUtility.normalizeMargins(options.margins);
            this._left = margins[3];
            this._top = margins[0];
            this._right = size[0] - margins[1];
            this._bottom = size[1] - margins[2];
        }
        else {
            this._left = 0;
            this._top = 0;
            this._right = size[0];
            this._bottom = size[1];
        }
    }

    /**
     * Parses the layout-rules based on a JSON data object.
     * The object should be an array with the following syntax:
     * `[[rule, node, value, z], [rule, node, value, z], ...]`
     *
     * **Example:**
     *
     * ```JSON
     * [
     *   ['top', 'header', 50],
     *   ['bottom', 'footer', 50, 10], // z-index: 10
     *   ['margins', [10, 5]], // marginate remaining space: 10px top/bottom, 5px left/right
     *   ['fill', 'content']
     * ]
     * ```
     *
     * @param {Object} data JSON object
     */
    LayoutDockHelper.prototype.parse = function(data) {
        for (var i = 0; i < data.length; i++) {
            var rule = data[i];
            var value = (rule.length >= 3) ? rule[2] : undefined;
            if (rule[0] === 'top') {
                this.top(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
            }
            else if (rule[0] === 'left') {
                this.left(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
            }
            else if (rule[0] === 'right') {
                this.right(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
            }
            else if (rule[0] === 'bottom') {
                this.bottom(rule[1], value, (rule.length >=4) ? rule[3] : undefined);
            }
            else if (rule[0] === 'fill') {
                this.fill(rule[1], (rule.length >=3) ? rule[2] : undefined);
            }
            else if (rule[0] === 'margins') {
                this.margins(rule[1]);
            }
        }
    };

    /**
     * Dock the node to the top.
     *
     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `height` argument argument is used for padding
     * @param {Number} [height] height of the layout-node, when omitted the height of the node is used
     * @param {Number} [z] z-index to use for the node
     * @return {LayoutDockHelper} this
     */
    LayoutDockHelper.prototype.top = function(node, height, z) {
        if (height instanceof Array) {
            height = height[1];
        }
        if (height === undefined) {
            var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
            height = size[1];
        }
        this._context.set(node, {
            size: [this._right - this._left, height],
            origin: [0, 0],
            align: [0, 0],
            translate: [this._left, this._top, (z === undefined) ? this._z : z]
        });
        this._top += height;
        return this;
    };

    /**
     * Dock the node to the left
     *
     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `width` argument argument is used for padding
     * @param {Number} [width] width of the layout-node, when omitted the width of the node is used
     * @param {Number} [z] z-index to use for the node
     * @return {LayoutDockHelper} this
     */
    LayoutDockHelper.prototype.left = function(node, width, z) {
        if (width instanceof Array) {
            width = width[0];
        }
        if (width === undefined) {
            var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
            width = size[0];
        }
        this._context.set(node, {
            size: [width, this._bottom - this._top],
            origin: [0, 0],
            align: [0, 0],
            translate: [this._left, this._top, (z === undefined) ? this._z : z]
        });
        this._left += width;
        return this;
    };

    /**
     * Dock the node to the bottom
     *
     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `height` argument argument is used for padding
     * @param {Number} [height] height of the layout-node, when omitted the height of the node is used
     * @param {Number} [z] z-index to use for the node
     * @return {LayoutDockHelper} this
     */
    LayoutDockHelper.prototype.bottom = function(node, height, z) {
        if (height instanceof Array) {
            height = height[1];
        }
        if (height === undefined) {
            var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
            height = size[1];
        }
        this._context.set(node, {
            size: [this._right - this._left, height],
            origin: [0, 1],
            align: [0, 1],
            translate: [this._left, -(this._size[1] - this._bottom), (z === undefined) ? this._z : z]
        });
        this._bottom -= height;
        return this;
    };

    /**
     * Dock the node to the right.
     *
     * @param {LayoutNode|String} [node] layout-node to dock, when omitted the `width` argument argument is used for padding
     * @param {Number} [width] width of the layout-node, when omitted the width of the node is used
     * @param {Number} [z] z-index to use for the node
     * @return {LayoutDockHelper} this
     */
    LayoutDockHelper.prototype.right = function(node, width, z) {
        if (width instanceof Array) {
            width = width[0];
        }
        if (node) {
            if (width === undefined) {
                var size = this._context.resolveSize(node, [this._right - this._left, this._bottom - this._top]);
                width = size[0];
            }
            this._context.set(node, {
                size: [width, this._bottom - this._top],
                origin: [1, 0],
                align: [1, 0],
                translate: [-(this._size[0] - this._right), this._top, (z === undefined) ? this._z : z]
            });
        }
        if (width) {
            this._right -= width;
        }
        return this;
    };

    /**
     * Fills the node to the remaining content.
     *
     * @param {LayoutNode|String} node layout-node to dock
     * @param {Number} [z] z-index to use for the node
     * @return {LayoutDockHelper} this
     */
    LayoutDockHelper.prototype.fill = function(node, z) {
        this._context.set(node, {
            size: [this._right - this._left, this._bottom - this._top],
            translate: [this._left, this._top, (z === undefined) ? this._z : z]
        });
        return this;
    };

    /**
     * Applies indent margins to the remaining content.
     *
     * @param {Number|Array} margins margins shorthand (e.g. '5', [10, 10], [5, 10, 5, 10])
     * @return {LayoutDockHelper} this
     */
    LayoutDockHelper.prototype.margins = function(margins) {
        margins = LayoutUtility.normalizeMargins(margins);
        this._left += margins[3];
        this._top += margins[0];
        this._right -= margins[1];
        this._bottom -= margins[2];
        return this;
    };

    // Register the helper
    LayoutUtility.registerHelper('dock', LayoutDockHelper);

    module.exports = LayoutDockHelper;

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-flex\\helpers\\LayoutDockHelper.js","/..\\res\\famous-flex\\helpers")
},{"../LayoutUtility":51,"VCmEsw":43,"buffer":40}],54:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/**
 * Lays out items and optionally sticky sections from top to bottom or left to right.
 *
 * |options|type|description|
 * |---|---|---|
 * |`[itemSize]`|Number/Function|Height or width in pixels of an item (used when renderNode has no size)|
 * |`[margins]`|Number/Array|Margins shorthand (e.g. 5, [10, 20], [2, 5, 2, 10])|
 * |`[spacing]`|Number|Spacing between items|
 * |`[isSectionCallback]`|Function|Callback that is called in order to check if a render-node is a section rather than a cell.|
 *
 * Example:
 *
 * ```javascript
 * var FlexScrollView = require('famous-flex/FlexScrollView');
 * var ListLayout = require('famous-flex/layouts/ListLayout');
 *
 * var scrollView = new FlexScrollView({
 *   layout: ListLayout,
 *   layoutOptions: {
 *     margins: [20, 10, 20, 10],
 *     spacing: 1,
 *     isSectionCallback: function(renderNode) {
 *       return renderNode.isSection;
 *     },
 *   },
 *   dataSource: [
 *     // first section
 *     _createSection(),
 *     _createCell(),
 *     _createCell(),
 *     // second section
 *     _createSection(),
 *     _createCell(),
 *   ]
 * });
 * this.add(scrollView);
 *
 * function _createCell() {
 *   return new Surface({
 *     size: [undefined, 50],
 *     content: 'my cell'
 *   });
 * }
 *
 * function _createSection() {
 *   var section = new Surface({
 *     size: [undefined, 30],
 *     content: 'my sticky section'
 *   });
 *   section.isSection = true; // mark renderNode as section
 *   return section;
 * }
 * ```
 * @module
 */

    // import dependencies
    var Utility = require('../../../node_modules/famous/utilities/Utility');
    var LayoutUtility = require('../LayoutUtility');

    // Define capabilities of this layout function
    var capabilities = {
        sequence: true,
        direction: [Utility.Direction.Y, Utility.Direction.X],
        scrolling: true,
        trueSize: true,
        sequentialScrollingOptimized: true
    };

    // Data
    var set = {
        size: [0, 0],
        translate: [0, 0, 0],
        scrollLength: undefined
    };
    var margin = [0, 0];

    // Layout function
    function ListLayout(context, options) {

        // Local data
        var size = context.size;
        var direction = context.direction;
        var alignment = context.alignment;
        var revDirection = direction ? 0 : 1;
        var offset;
        var margins = LayoutUtility.normalizeMargins(options.margins);
        var spacing = options.spacing || 0;
        var node;
        var nodeSize;
        var itemSize;
        var getItemSize;
        var lastSectionBeforeVisibleCell;
        var lastSectionBeforeVisibleCellOffset;
        var lastSectionBeforeVisibleCellLength;
        var lastSectionBeforeVisibleCellScrollLength;
        var firstVisibleCell;
        var lastNode;
        var lastCellOffsetInFirstVisibleSection;
        var isSectionCallback = options.isSectionCallback;
        var bound;

        //
        // reset size & translation
        //
        set.size[0] = size[0];
        set.size[1] = size[1];
        set.size[revDirection] -= (margins[1 - revDirection] + margins[3 - revDirection]);
        set.translate[0] = 0;
        set.translate[1] = 0;
        set.translate[2] = 0;
        set.translate[revDirection] = margins[direction ? 3 : 0];

        //
        // Determine item-size or use true=size
        //
        if ((options.itemSize === true) || !options.hasOwnProperty('itemSize')) {
            itemSize = true;
        }
        else if (options.itemSize instanceof Function) {
            getItemSize = options.itemSize;
        }
        else {
            itemSize = (options.itemSize === undefined) ? size[direction] : options.itemSize;
        }

        //
        // Determine leading/trailing margins
        //
        margin[0] = margins[direction ? 0 : 3];
        margin[1] = -margins[direction ? 2 : 1];

        //
        // Process all next nodes
        //
        offset = context.scrollOffset + margin[alignment];
        bound = context.scrollEnd + margin[alignment];
        while (offset < bound) {
            lastNode = node;
            node = context.next();
            if (!node) {
                if (lastNode && !alignment) {
                    set.scrollLength = nodeSize + margin[0] + -margin[1];
                    context.set(lastNode, set);
                }
                break;
            }

            //
            // Get node size
            //
            nodeSize = getItemSize ? getItemSize(node.renderNode) : itemSize;
            nodeSize = (nodeSize === true) ? context.resolveSize(node, size)[direction] : nodeSize;

            //
            // Position node
            //
            set.size[direction] = nodeSize;
            set.translate[direction] = offset + (alignment ? spacing : 0);
            set.scrollLength = nodeSize + spacing;
            context.set(node, set);
            offset += set.scrollLength;

            //
            // Keep track of the last section before the first visible cell
            //
            if (isSectionCallback && isSectionCallback(node.renderNode)) {
                set.translate[direction] = Math.max(margin[0], set.translate[direction]);
                context.set(node, set);
                if (!firstVisibleCell) {
                    lastSectionBeforeVisibleCell = node;
                    lastSectionBeforeVisibleCellOffset = offset - nodeSize;
                    lastSectionBeforeVisibleCellLength = nodeSize;
                    lastSectionBeforeVisibleCellScrollLength = nodeSize;
                }
                else if (lastCellOffsetInFirstVisibleSection === undefined) {
                    lastCellOffsetInFirstVisibleSection = offset - nodeSize;
                }
            }
            else if (!firstVisibleCell && (offset >= 0)) {
                firstVisibleCell = node;
            }
        }

        //
        // Process previous nodes
        //
        node = undefined;
        offset = context.scrollOffset + margin[alignment];
        bound = context.scrollStart + margin[alignment];
        while (offset > bound) {
            lastNode = node;
            node = context.prev();
            if (!node) {
                if (lastNode && alignment) {
                    set.scrollLength = nodeSize + margin[0] + -margin[1];
                    context.set(lastNode, set);
                    if (lastSectionBeforeVisibleCell === lastNode) {
                        lastSectionBeforeVisibleCellScrollLength = set.scrollLength;
                    }
                }
                break;
            }

            //
            // Get node size
            //
            nodeSize = getItemSize ? getItemSize(node.renderNode) : itemSize;
            nodeSize = (nodeSize === true) ? context.resolveSize(node, size)[direction] : nodeSize;

            //
            // Position node
            //
            set.scrollLength = nodeSize + spacing;
            offset -= set.scrollLength;
            set.size[direction] = nodeSize;
            set.translate[direction] = offset + (alignment ? spacing : 0);
            context.set(node, set);

            //
            // Keep track of the last section before the first visible cell
            //
            if (isSectionCallback && isSectionCallback(node.renderNode)) {
                set.translate[direction] = Math.max(margin[0], set.translate[direction]);
                context.set(node, set);
                if (!lastSectionBeforeVisibleCell) {
                    lastSectionBeforeVisibleCell = node;
                    lastSectionBeforeVisibleCellOffset = offset;
                    lastSectionBeforeVisibleCellLength = nodeSize;
                    lastSectionBeforeVisibleCellScrollLength = set.scrollLength;
                }
            }
            else if ((offset + nodeSize) >= 0) {
                firstVisibleCell = node;
                if (lastSectionBeforeVisibleCell) {
                    lastCellOffsetInFirstVisibleSection = offset + nodeSize;
                }
                lastSectionBeforeVisibleCell = undefined;
            }
        }

        //
        // When no first section is in the scrollable range, then
        // look back further in search for that section
        //
        if (isSectionCallback && !lastSectionBeforeVisibleCell) {
            node = context.prev();
            while (node) {
                if (isSectionCallback(node.renderNode)) {
                    lastSectionBeforeVisibleCell = node;
                    nodeSize = options.itemSize || context.resolveSize(node, size)[direction];
                    lastSectionBeforeVisibleCellOffset = offset - nodeSize;
                    lastSectionBeforeVisibleCellLength = nodeSize;
                    lastSectionBeforeVisibleCellScrollLength = undefined;
                    break;
                }
                else {
                    node = context.prev();
                }
            }
        }

        //
        // Reposition "last section before first visible cell" to the top of the layout
        //
        if (lastSectionBeforeVisibleCell) {
            var correctedOffset = Math.max(margin[0], lastSectionBeforeVisibleCellOffset);
            if ((lastCellOffsetInFirstVisibleSection !== undefined) &&
                (lastSectionBeforeVisibleCellLength > (lastCellOffsetInFirstVisibleSection - margin[0]))) {
                correctedOffset = ((lastCellOffsetInFirstVisibleSection - lastSectionBeforeVisibleCellLength));
            }
            set.size[direction] = lastSectionBeforeVisibleCellLength;
            set.translate[direction] = correctedOffset;
            set.scrollLength = lastSectionBeforeVisibleCellScrollLength;
            context.set(lastSectionBeforeVisibleCell, set);
        }
    }

    ListLayout.Capabilities = capabilities;
    ListLayout.Name = 'ListLayout';
    ListLayout.Description = 'List-layout with margins, spacing and sticky headers';
    module.exports = ListLayout;

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-flex\\layouts\\ListLayout.js","/..\\res\\famous-flex\\layouts")
},{"../../../node_modules/famous/utilities/Utility":38,"../LayoutUtility":51,"VCmEsw":43,"buffer":40}],55:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict'

document.addEventListener('DOMContentLoaded', function(e) {
    require('famous-polyfills');

    var Engine = require('famous/core/Engine');
    var Transitionable = require('famous/transitions/Transitionable');
    var SpringTransition = require('famous/transitions/SpringTransition');

    Engine.setOptions({
        appMode: false
    });

    var mainContext = Engine.createContext();
    mainContext.setPerspective(-1900);

    Transitionable.registerMethod('spring', SpringTransition);

    var MasterView = require('./views/MasterView.js');

    mainContext.add(MasterView.getRenderNode());

    // test read from local disk
    //var userService = require('./services/UserService');
    //var profileService = require('./services/ProfileService');
    Engine.on('keydown', function(e) {
    });
});

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_b161ad75.js","/")
},{"./views/MasterView.js":57,"VCmEsw":43,"buffer":40,"famous-polyfills":3,"famous/core/Engine":8,"famous/transitions/SpringTransition":34,"famous/transitions/Transitionable":35}],56:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict'

// Vendor
var View = require('famous/core/View'),
    Modifier = require('famous/core/Modifier'),
    Surface = require('famous/core/Surface'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    RenderNode = require('famous/core/RenderNode'),
    Transform = require('famous/core/Transform'),
    Easing = require('famous/transitions/Easing'),
    FlexScrollView = require('famous-flex/FlexScrollView'),
    LayoutController = require('famous-flex/LayoutController'),
    SizeConstraint = require('famous-sizeconstraint/SizeConstraint'),
    NavBarLayout = require('famous-flex/layouts/NavBarLayout'),
    CollectionLayout = require('famous-flex/layouts/CollectionLayout'),
    // Local
    MenuBarView = require('./partials/MenuBarView'),
    SearchForm = require('./partials/SearchForm');

function HeaderView(model) {
    View.call(this);

    var _this = this;

    /**
     * Self mod
     */

    this._selfMod = new Modifier({
        size: [undefined, 60]
    });

    this._selfRenderNode = new RenderNode();
    this._selfRenderNode.add(this._selfMod).add(this);

    // In animation
    this._selfMod.setTransform(Transform.translate(0, -this._selfMod.getSize()[1], 0));
    this._selfMod.setTransform(Transform.translate(0, 0, 0), {
        duration: 2000,
        curve: Easing.outBounce
    });

    /**
     * Background
     */

    var bg = new Surface({
        size: [undefined, undefined],
        attributes: {
            id: 'header-bg'
        }
    });

    var bgMod = new StateModifier({
        transform: Transform.behind
    });

    var bgRenderNode = new RenderNode();
    bgRenderNode.add(bgMod).add(bg);

    /**
     * Logo
     */

    var logo = new ImageSurface({
        size: [225, 40],
        content: 'assets/images/logo.png',
        properties: {
            zIndex: '101'
        }
    });

    /**
     * Layout
     */

    this._layout = new LayoutController({
        layout: NavBarLayout,
        layoutOptions: {
            margins: [10, 5,0,5]
        },
        dataSource: {
            background: new Surface({
                    size: [undefined, undefined],
                    attributes: {
                        id: 'header-bg'
                    }
                }),
                title: SearchForm.getRenderNode(),
                rightItems: [MenuBarView.getRenderNode()],
                leftItems: [logo]
        }
    });

    /**
     * Add to view
     */

    // this.add(bgRenderNode);
    this.add(this._layout);
}

HeaderView.prototype = Object.create(View.prototype);
HeaderView.constructor = HeaderView;

HeaderView.prototype.getRenderNode = function() {
    return this._selfRenderNode;
};

module.exports = new HeaderView();

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/views\\HeaderView.js","/views")
},{"./partials/MenuBarView":59,"./partials/SearchForm":60,"VCmEsw":43,"buffer":40,"famous-flex/FlexScrollView":61,"famous-flex/LayoutController":62,"famous-flex/layouts/CollectionLayout":63,"famous-flex/layouts/NavBarLayout":65,"famous-sizeconstraint/SizeConstraint":66,"famous/core/Modifier":13,"famous/core/RenderNode":15,"famous/core/Surface":17,"famous/core/Transform":18,"famous/core/View":19,"famous/modifiers/StateModifier":23,"famous/surfaces/ImageSurface":31,"famous/transitions/Easing":32}],57:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict'

var View = require('famous/core/View');
var RenderNode = require('famous/core/RenderNode');
var Modifier = require('famous/core/Modifier');
var ViewSequence = require('famous/core/ViewSequence');
var StateModifier = require('famous/modifiers/StateModifier');
var Transform = require('famous/core/Transform');
var Surface = require('famous/core/Surface');
var FlexScrollView = require('famous-flex/FlexScrollView');
var ListLayout = require('famous-flex/layouts/ListLayout');
var Engine = require('famous/core/Engine');
var Easing = require('famous/transitions/Easing');
var FlexibleLayout = require('famous/views/FlexibleLayout');

var HeaderView = require('./HeaderView');
var ProfileView = require('./ProfileView');

function MasterView() {
    View.call(this);

    var _this = this;

    /**
     * Self mod
     */

    this._selfMod = new Modifier({
        size: [undefined, undefined]
    });

    this._selfRenderNode = new RenderNode();
    this._selfRenderNode.add(this._selfMod).add(this);

    /**
     * Footer
     */

    this._footer = new Surface({
        size: [undefined, true],
        content: 'This is a footer message',
        classes: ['center-inner']
    });

    // this._footer.modAlign = new StateModifier({
    //     origin: [0.5, 0],
    //     align: [0.5, 0]
    // });

    this._footer.modPos = new Modifier({});

    this._footer.renderNode = new RenderNode();
    this._footer.renderNode.add(this._footer.modAlign).add(this._footer);

    /**
     * Layout
     */

    var layout = new FlexibleLayout({
        ratios: [true, true],
        direction: 1
    });
    
    layout.sequenceFrom([
        ProfileView.getRenderNode(),
        this._footer.renderNode
    ])

    var layoutMod = new Modifier({
        size: [undefined, undefined]
    });

    //In animation
    layoutMod.setTransform(Transform.translate(0, window.innerHeight, 0));
    layoutMod.setTransform(Transform.translate(0, 75, 0), {
        duration: 2000,
        curve: Easing.outBounce
    });

    /**
     * Add to view
     */

    this.add(HeaderView.getRenderNode());
    this.add(layoutMod).add(layout);
    this.add(new Surface({
        size:[undefined,undefined],
        properties:{
            backgroundColor:'rgb(167, 199, 220)',
            zIndex: '-100'
        }
    }))
}

MasterView.prototype = Object.create(View.prototype);
MasterView.constructor = MasterView;

MasterView.prototype.getRenderNode = function() {
    return this._selfRenderNode;
};

module.exports = new MasterView();

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/views\\MasterView.js","/views")
},{"./HeaderView":56,"./ProfileView":58,"VCmEsw":43,"buffer":40,"famous-flex/FlexScrollView":61,"famous-flex/layouts/ListLayout":64,"famous/core/Engine":8,"famous/core/Modifier":13,"famous/core/RenderNode":15,"famous/core/Surface":17,"famous/core/Transform":18,"famous/core/View":19,"famous/core/ViewSequence":20,"famous/modifiers/StateModifier":23,"famous/transitions/Easing":32,"famous/views/FlexibleLayout":39}],58:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict'

var View = require('famous/core/View');
var Modifier = require('famous/core/Modifier');
var StateModifier = require('famous/modifiers/StateModifier');
var RenderNode = require('famous/core/RenderNode');
var FlexibleLayout = require('famous/views/FlexibleLayout');
var Transform = require('famous/core/Transform');
var Surface = require('famous/core/Surface');
var Engine = require('famous/core/Engine');
var Easing = require('famous/transitions/Easing');
var ListLayout = require('famous-flex/layouts/ListLayout'),
    FlexScrollView = require('famous-flex/FlexScrollView'),
    LayoutController = require('famous-flex/LayoutController'),
    CollectionLayout = require('famous-flex/layouts/CollectionLayout');

function ProfileView() {
    View.call(this);

    var _this = this;

    /**
     * Self mod
     */

    this._selfMod = new Modifier({
    });

    this._selfRenderNode = new RenderNode();
    this._selfRenderNode.add(this._selfMod).add(this);

    /**
     * User info
     */

    this._userInfo = new Surface({
        size: [250, 55],
        content: [
            '<img class="user-icon-normal" src="assets/images/profile/daniel-craig.jpg"/>',
            'TODO: feed user model'
        ].join(''),
        classes: ['container']
    })

    this._userInfoMod = new StateModifier({
        origin: [0, 0],
        align: [0, 0]
    });

    this._userInfoRenderNode = new RenderNode();
    this._userInfoRenderNode.add(this._userInfoMod).add(this._userInfo);

    /**
     * Layout
     */

    /**
     * Add to view
     */

    this.add(this._userInfo);
}

ProfileView.prototype = Object.create(View.prototype);
ProfileView.constructor = ProfileView;

ProfileView.prototype.getRenderNode = function() {
    return this._selfRenderNode;
};

module.exports = new ProfileView();

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/views\\ProfileView.js","/views")
},{"VCmEsw":43,"buffer":40,"famous-flex/FlexScrollView":61,"famous-flex/LayoutController":62,"famous-flex/layouts/CollectionLayout":63,"famous-flex/layouts/ListLayout":64,"famous/core/Engine":8,"famous/core/Modifier":13,"famous/core/RenderNode":15,"famous/core/Surface":17,"famous/core/Transform":18,"famous/core/View":19,"famous/modifiers/StateModifier":23,"famous/transitions/Easing":32,"famous/views/FlexibleLayout":39}],59:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict'

var View = require('famous/core/View'),
    StateModifier = require('famous/modifiers/StateModifier'),
    RenderNode = require('famous/core/RenderNode'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    Surface = require('famous/core/Surface'),
    Transform = require('famous/core/Transform');

function NavBarView() {
    View.call(this);

    var _this = this;

    /**
     * Self mod.
     */

    var selfMod = new StateModifier({
        size: [220, 25],
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    this._selfRenderNode = new RenderNode()
    this._selfRenderNode.add(selfMod).add(this);

    // Model

    this._model = {
        //profileIcon: model.pic
        profilePic: 'assets/images/profile/daniel-craig.jpg'
    }

    /**
     * Buttons
     */

    // home
    var menuBarButtonsEl = document.createElement('div');

    var homeButtonEl = document.createElement('input');
    homeButtonEl.setAttribute('type', 'button');
    homeButtonEl.className = 'menu-bar';
    homeButtonEl.value = 'Home';

    var postUpdateEl = document.createElement('input');
    postUpdateEl.setAttribute('type', 'button');
    postUpdateEl.className = 'menu-bar';
    postUpdateEl.value = 'Post an update';

    menuBarButtonsEl.appendChild(homeButtonEl);
    menuBarButtonsEl.appendChild(postUpdateEl);

    var menuBarButtons = new Surface({
        size: [175, true],
        content: menuBarButtonsEl
    });

    menuBarButtons.mod = new StateModifier({
        origin: [0, 0.5],
        align: [0, 0.5]
    });

    menuBarButtons.renderNode = new RenderNode();
    menuBarButtons.renderNode.add(menuBarButtons.mod).add(menuBarButtons);

    /**
     * User icon
     */

    this._userIcon = new ImageSurface({
        size: [25, 25],
        content: this._model.profilePic
    });

    this._userIcon.mod = new StateModifier({
        origin: [1, 0],
        align: [1, 0],
        transform:Transform.translate(-15,0,0)
    });

    this._userIcon.renderNode = new RenderNode();
    this._userIcon.renderNode.add(this._userIcon.mod).add(this._userIcon);

    /**
     * Events
     */

    homeButtonEl.addEventListener('click', function() {
        _this._eventOutput.emit('home');
    });
    postUpdateEl.addEventListener('click', function() {
        _this._eventOutput.emit('post.update');
    });

    // Add to view

    this.add(menuBarButtons.renderNode);
    this.add(this._userIcon.renderNode);
}

NavBarView.prototype = Object.create(View.prototype);
NavBarView.constructor = NavBarView;

NavBarView.prototype.getRenderNode = function() {
    return this._selfRenderNode;
};

NavBarView.prototype.setModel = function(model) {
    this._model = model;

    this._updateModel();
};

NavBarView.prototype._updateModel = function() {
    this._userIcon.setContent(this._model.profilePic);
};


module.exports = new NavBarView();

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/views\\partials\\MenuBarView.js","/views\\partials")
},{"VCmEsw":43,"buffer":40,"famous/core/RenderNode":15,"famous/core/Surface":17,"famous/core/Transform":18,"famous/core/View":19,"famous/modifiers/StateModifier":23,"famous/surfaces/ImageSurface":31}],60:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict'

var View = require('famous/core/View'),
    StateModifier = require('famous/modifiers/StateModifier'),
    RenderNode = require('famous/core/RenderNode'),
    Transform = require('famous/core/Transform'),
    Easing = require('famous/transitions/Easing'),
    Surface = require('famous/core/Surface');

function SearchForm() {
    View.call(this);

    var _this = this;

    /**
     * Self mod
     */

    this._selfMod = new StateModifier({
        size: [287, 25],
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    this._selfRenderNode = new RenderNode();
    this._selfRenderNode.add(this._selfMod).add(this);

    /**
     * Go button
     */

    var goButtonEl = document.createElement('input');
    goButtonEl.setAttribute('type', 'button');
    goButtonEl.className = 'search-form';
    goButtonEl.value = 'Go';

    var goButton = new Surface({
        size: [true, true],
        content: goButtonEl
    });

    var goButtonMod = new StateModifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        transform: Transform.inFront
    });

    var goButtonRenderNode = new RenderNode();
    goButtonRenderNode.add(goButtonMod).add(goButton);

    goButton.on('mouseover', function(e) {
        goButtonMod.halt();
        goButtonMod.setTransform(Transform.rotate(0, 0, -0.32), {
                duration: 100,
                curve: Easing.outCirc
            },
            function() {
                goButtonMod.setTransform(Transform.rotate(0, 0, 0), {
                    method: 'spring',
                    dampingRatio: 0.0,
                    period: 400
                });
            }); //
    });
    goButton.on('mouseout', function(e) {
        goButtonMod.halt();
        goButtonMod.setTransform(Transform.rotate(0, 0, 0), {
            method: 'spring',
            dampingRatio: 0.08,
            period: 200
        });
    });

    // Button position view

    var goButtonViewMod = new StateModifier({
        size: [32, 25],
        origin: [1, 0],
        align: [1, 0]
    });
    var goButtonView = new View();
    goButtonView.add(goButtonRenderNode);

    var goButtonViewRenderNode = new RenderNode();
    goButtonViewRenderNode.add(goButtonViewMod).add(goButtonView);

    /**
     * Search box
     */

    var searchEl = document.createElement('input');
    searchEl.setAttribute('type', 'text');
    searchEl.className = 'search-form';

    var searchTextField = new Surface({
        size: [true, true],
        content: searchEl,
        properties: {
            backgroundColor: 'blue'
        }
    });

    /**
     * Events
     */

    goButtonEl.addEventListener('click', function() {
        _this._eventOutput.emit('submit', {
            query: searchEl.value
        });
    });

    /**
     * Add to view
     */

    this.add(searchTextField);
    this.add(goButtonViewRenderNode);
}

SearchForm.prototype = Object.create(View.prototype);
SearchForm.constructor = SearchForm;

SearchForm.prototype.getRenderNode = function() {
    return this._selfRenderNode;
};

module.exports = new SearchForm();

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/views\\partials\\SearchForm.js","/views\\partials")
},{"VCmEsw":43,"buffer":40,"famous/core/RenderNode":15,"famous/core/Surface":17,"famous/core/Transform":18,"famous/core/View":19,"famous/modifiers/StateModifier":23,"famous/transitions/Easing":32}],61:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2015
 */

/**
 * Flexible FlexScrollView for famo.us.
 *
 * Key features:
 * -    Customizable layout (uses ListLayout by default)
 * -    Insert/remove at any position using animations
 * -    Support for `true` size renderables
 * -    Pull to refresh (header & footer)
 * -    Horizontal/vertical direction
 * -    Top/left or bottom/right alignment
 * -    Pagination
 * -    Option to embed in a ContainerSurface
 * -    FlexScrollView linking
 *
 * Inherited from: [ScrollController](./ScrollController.md)
 * @module
 */
    // import dependencies
    var LayoutUtility = require('./LayoutUtility');
    var ScrollController = require('./ScrollController');
    var ListLayout = require('./layouts/ListLayout');

    //
    // Pull to refresh states
    //
    var PullToRefreshState = {
        HIDDEN: 0,
        PULLING: 1,
        ACTIVE: 2,
        COMPLETED: 3,
        HIDDING: 4
    };

    /**
     * @class
     * @extends ScrollController
     * @param {Object} options Configurable options (see ScrollController for all inherited options).
     * @param {Renderable} [options.pullToRefreshHeader] Pull to refresh renderable that is displayed when pulling down from the top.
     * @param {Renderable} [options.pullToRefreshFooter] Pull to refresh renderable that is displayed when pulling up from the bottom.
     * @param {FlexScrollView} [options.leadingScrollView] Leading scrollview into which input events are piped (see Tutorial)
     * @param {FlexScrollView} [options.trailingScrollView] Trailing scrollview into which input events are piped (see Tutorial)
     * @alias module:FlexScrollView
     */
    function FlexScrollView(options) {
        ScrollController.call(this, LayoutUtility.combineOptions(FlexScrollView.DEFAULT_OPTIONS, options));
        this._thisScrollViewDelta = 0;
        this._leadingScrollViewDelta = 0;
        this._trailingScrollViewDelta = 0;
    }
    FlexScrollView.prototype = Object.create(ScrollController.prototype);
    FlexScrollView.prototype.constructor = FlexScrollView;
    FlexScrollView.PullToRefreshState = PullToRefreshState;

    FlexScrollView.DEFAULT_OPTIONS = {
        layout: ListLayout,         // sequential layout, uses width/height from renderable
        direction: undefined,       // 0 = X, 1 = Y, undefined = use default from layout
        paginated: false,           // pagination on/off
        alignment: 0,               // 0 = top/left, 1 = bottom/right
        flow: false,                // allow renderables to flow between layouts when not scrolling
        mouseMove: false,           // allow mouse to hold and move the view
        useContainer: false,        // embeds inside a ContainerSurface for clipping and capturing input events
        visibleItemThresshold: 0.5, // by default, when an item is 50% visible, it is considered visible by `getFirstVisibleItem`
        pullToRefreshHeader: undefined, // assign pull-to-refresh renderable here (renderable must have a size)
        pullToRefreshFooter: undefined, // assign pull-to-refresh renderable here (renderable must have a size)
        leadingScrollView: undefined,
        trailingScrollView: undefined
        // see ScrollController for all other options
    };

    /**
     * Patches the FlexScrollView instance's options with the passed-in ones.
     *
     * @param {Object} options Configurable options (see ScrollController for all inherited options).
     * @param {Renderable} [options.pullToRefreshHeader] Pull to refresh renderable that is displayed when pulling down from the top.
     * @param {Renderable} [options.pullToRefreshFooter] Pull to refresh renderable that is displayed when pulling up from the bottom.
     * @param {FlexScrollView} [options.leadingScrollView] Leading scrollview into which input events are piped (see Tutorial).
     * @param {FlexScrollView} [options.trailingScrollView] Trailing scrollview into which input events are piped (see Tutorial).
     * @return {FlexScrollView} this
     */
    FlexScrollView.prototype.setOptions = function(options) {
        ScrollController.prototype.setOptions.call(this, options);

        // Update pull to refresh renderables
        if (options.pullToRefreshHeader || options.pullToRefreshFooter || this._pullToRefresh) {
            if (options.pullToRefreshHeader) {
                this._pullToRefresh = this._pullToRefresh || [undefined, undefined];
                if (!this._pullToRefresh[0]) {
                    this._pullToRefresh[0] = {
                        state: PullToRefreshState.HIDDEN,
                        prevState: PullToRefreshState.HIDDEN,
                        footer: false
                    };
                }
                this._pullToRefresh[0].node = options.pullToRefreshHeader;
            }
            else if (!this.options.pullToRefreshHeader && this._pullToRefresh) {
                this._pullToRefresh[0] = undefined;
            }
            if (options.pullToRefreshFooter) {
                this._pullToRefresh = this._pullToRefresh || [undefined, undefined];
                if (!this._pullToRefresh[1]) {
                    this._pullToRefresh[1] = {
                        state: PullToRefreshState.HIDDEN,
                        prevState: PullToRefreshState.HIDDEN,
                        footer: true
                    };
                }
                this._pullToRefresh[1].node = options.pullToRefreshFooter;
            }
            else if (!this.options.pullToRefreshFooter && this._pullToRefresh) {
                this._pullToRefresh[1] = undefined;
            }
            if (this._pullToRefresh && !this._pullToRefresh[0] && !this._pullToRefresh[1]) {
                this._pullToRefresh = undefined;
            }
        }
        return this;
    };

    /**
     * Sets the data-source (alias for setDataSource).
     *
     * This function is a shim provided for compatibility with the stock famo.us Scrollview.
     *
     * @param {Array|ViewSequence} node Either an array of renderables or a Famous viewSequence.
     * @return {FlexScrollView} this
     */
    FlexScrollView.prototype.sequenceFrom = function(node) {
        return this.setDataSource(node);
    };

    /**
     * Returns the index of the first visible renderable.
     *
     * This function is a shim provided for compatibility with the stock famo.us Scrollview.
     *
     * @return {Number} The current index of the ViewSequence
     */
    FlexScrollView.prototype.getCurrentIndex = function() {
        var item = this.getFirstVisibleItem();
        return item ? item.viewSequence.getIndex() : -1;
    };

    /**
     * Paginates the Scrollview to an absolute page index. This function is a shim provided
     * for compatibility with the stock famo.us Scrollview.
     *
     * @param {Number} index view-sequence index to go to.
     * @param {Bool} [noAnimation] When set to true, immediately shows the node without scrolling animation.
     * @return {FlexScrollView} this
     */
    FlexScrollView.prototype.goToPage = function(index, noAnimation) {
        var viewSequence = this._viewSequence;
        if (!viewSequence) {
            return this;
        }
        while (viewSequence.getIndex() < index) {
            viewSequence = viewSequence.getNext();
            if (!viewSequence) {
                return this;
            }
        }
        while (viewSequence.getIndex() > index) {
            viewSequence = viewSequence.getPrevious();
            if (!viewSequence) {
                return this;
            }
        }
        this.goToRenderNode(viewSequence.get(), noAnimation);
        return this;
    };

    /**
     * Returns the offset associated with the Scrollview instance's current node
     * (generally the node currently at the top).
     *
     * This function is a shim provided for compatibility with the stock famo.us Scrollview.
     *
     * @return {number} The position of either the specified node, or the Scrollview's current Node,
     * in pixels translated.
     */
    FlexScrollView.prototype.getOffset = function() {
        return this._scrollOffsetCache;
    };

    /**
     * Returns the position associated with the Scrollview instance's current node
     * (generally the node currently at the top).
     *
     * This function is a shim provided for compatibility with the stock famo.us Scrollview.
     *
     * @deprecated
     * @param {number} [node] If specified, returns the position of the node at that index in the
     * Scrollview instance's currently managed collection.
     * @return {number} The position of either the specified node, or the Scrollview's current Node,
     * in pixels translated.
     */
    FlexScrollView.prototype.getPosition = FlexScrollView.prototype.getOffset;

    /**
     * Returns the absolute position associated with the Scrollview instance.
     *
     * This function is a shim provided for compatibility with the stock famo.us Scrollview.
     *
     * @return {number} The position of the Scrollview's current Node, in pixels translated.
     */
    FlexScrollView.prototype.getAbsolutePosition = function() {
        return -(this._scrollOffsetCache + this._scroll.groupStart);
    };

    /**
     * Helper function for setting the pull-to-refresh status.
     */
    function _setPullToRefreshState(pullToRefresh, state) {
        if (pullToRefresh.state !== state) {
            pullToRefresh.state = state;
            if (pullToRefresh.node && pullToRefresh.node.setPullToRefreshStatus) {
                pullToRefresh.node.setPullToRefreshStatus(state);
            }
        }
    }

    /**
     * Helper function for getting the pull-to-refresh data.
     */
    function _getPullToRefresh(footer) {
        return this._pullToRefresh ? this._pullToRefresh[footer ? 1 : 0] : undefined;
    }

    /**
     * Post-layout function that adds the pull-to-refresh renderables.
     * @private
     */
    FlexScrollView.prototype._postLayout = function(size, scrollOffset) {

        // Exit immediately when pull to refresh is not configured
        if (!this._pullToRefresh) {
            return;
        }

        // Adjust scroll-offset for alignment
        if (this.options.alignment) {
            scrollOffset += size[this._direction];
        }

        // Prepare
        var prevHeight;
        var nextHeight;
        var totalHeight;

        // Show/activate pull to refresh renderables
        for (var i = 0; i < 2 ; i++) {
            var pullToRefresh = this._pullToRefresh[i];
            if (pullToRefresh) {

                // Calculate offset
                var length = pullToRefresh.node.getSize()[this._direction];
                var pullLength = pullToRefresh.node.getPullToRefreshSize ? pullToRefresh.node.getPullToRefreshSize()[this._direction] : length;
                var offset;
                if (!pullToRefresh.footer) {
                    // header
                    prevHeight = this._calcScrollHeight(false);
                    prevHeight = (prevHeight === undefined) ? -1 : prevHeight;
                    offset = (prevHeight >= 0) ? (scrollOffset - prevHeight) : prevHeight;
                    if (this.options.alignment) {
                        nextHeight = this._calcScrollHeight(true);
                        nextHeight = (nextHeight === undefined) ? -1 : nextHeight;
                        totalHeight = ((prevHeight >= 0) && (nextHeight >= 0)) ? (prevHeight + nextHeight) : -1;
                        if ((totalHeight >= 0) && (totalHeight < size[this._direction])) {
                            offset = Math.round((scrollOffset - size[this._direction]) + nextHeight);
                        }
                    }
                }
                else {
                    // footer
                    nextHeight = (nextHeight === undefined) ? nextHeight = this._calcScrollHeight(true) : nextHeight;
                    nextHeight = (nextHeight === undefined) ? -1 : nextHeight;
                    offset = (nextHeight >= 0) ? (scrollOffset + nextHeight) : (size[this._direction] + 1);
                    if (!this.options.alignment) {
                        prevHeight = (prevHeight === undefined) ? this._calcScrollHeight(false) : prevHeight;
                        prevHeight = (prevHeight === undefined) ? -1 : prevHeight;
                        totalHeight = ((prevHeight >= 0) && (nextHeight >= 0)) ? (prevHeight + nextHeight) : -1;
                        if ((totalHeight >= 0) && (totalHeight < size[this._direction])) {
                            offset = Math.round((scrollOffset - prevHeight) + size[this._direction]);
                        }
                    }
                    offset = -(offset - size[this._direction]);
                }

                // Determine current state
                var visiblePerc = Math.max(Math.min(offset / pullLength, 1), 0);
                switch (pullToRefresh.state) {
                    case PullToRefreshState.HIDDEN:
                        if (this._scroll.scrollForceCount) {
                            if (visiblePerc >= 1) {
                                _setPullToRefreshState(pullToRefresh, PullToRefreshState.ACTIVE);
                            }
                            else if (offset >= 0.2) {
                                _setPullToRefreshState(pullToRefresh, PullToRefreshState.PULLING);
                            }
                        }
                        break;
                    case PullToRefreshState.PULLING:
                        if (this._scroll.scrollForceCount && (visiblePerc >= 1)) {
                            _setPullToRefreshState(pullToRefresh, PullToRefreshState.ACTIVE);
                        }
                        else if (offset < 0.2) {
                            _setPullToRefreshState(pullToRefresh, PullToRefreshState.HIDDEN);
                        }
                        break;
                    case PullToRefreshState.ACTIVE:
                        // nothing to do, wait for completed
                        break;
                    case PullToRefreshState.COMPLETED:
                        if (!this._scroll.scrollForceCount) {
                            if (offset >= 0.2) {
                                _setPullToRefreshState(pullToRefresh, PullToRefreshState.HIDDING);
                            }
                            else {
                                _setPullToRefreshState(pullToRefresh, PullToRefreshState.HIDDEN);
                            }
                        }
                        break;
                    case PullToRefreshState.HIDDING:
                        if (offset < 0.2) {
                            _setPullToRefreshState(pullToRefresh, PullToRefreshState.HIDDEN);
                        }
                        break;
                }

                // Show pull to refresh node
                if (pullToRefresh.state !== PullToRefreshState.HIDDEN) {
                    var contextNode = {
                        renderNode: pullToRefresh.node,
                        prev: !pullToRefresh.footer,
                        next: pullToRefresh.footer,
                        index: !pullToRefresh.footer ? --this._nodes._contextState.prevGetIndex : ++this._nodes._contextState.nextGetIndex
                    };
                    var scrollLength;
                    if (pullToRefresh.state === PullToRefreshState.ACTIVE) {
                        scrollLength = length;
                    }
                    else if (this._scroll.scrollForceCount) {
                        scrollLength = Math.min(offset, length);
                    }
                    var set = {
                        size: [size[0], size[1]],
                        translate: [0, 0, -1e-3], // transform.behind
                        scrollLength: scrollLength
                    };
                    set.size[this._direction] = Math.max(Math.min(offset, pullLength), 0);
                    set.translate[this._direction] = pullToRefresh.footer ? (size[this._direction] - length) : 0;
                    this._nodes._context.set(contextNode, set);
                }
            }
        }
    };

    /**
     * Shows the pulls-to-refresh renderable indicating that a refresh is in progress.
     *
     * @param {Bool} [footer] set to true to show pull-to-refresh at the footer (default: false).
     * @return {FlexScrollView} this
     */
    FlexScrollView.prototype.showPullToRefresh = function(footer) {
        var pullToRefresh = _getPullToRefresh.call(this, footer);
        if (pullToRefresh) {
            _setPullToRefreshState(pullToRefresh, PullToRefreshState.ACTIVE);
            this._scroll.scrollDirty = true;
        }
    };

    /**
     * Hides the pull-to-refresh renderable in case it was visible.
     *
     * @param {Bool} [footer] set to true to hide the pull-to-refresh at the footer (default: false).
     * @return {FlexScrollView} this
     */
    FlexScrollView.prototype.hidePullToRefresh = function(footer) {
        var pullToRefresh = _getPullToRefresh.call(this, footer);
        if (pullToRefresh && (pullToRefresh.state === PullToRefreshState.ACTIVE)) {
            _setPullToRefreshState(pullToRefresh, PullToRefreshState.COMPLETED);
            this._scroll.scrollDirty = true;
        }
        return this;
    };

    /**
     * Get the visible state of the pull-to-refresh renderable.
     *
     * @param {Bool} [footer] set to true to get the state of the pull-to-refresh footer (default: false).
     */
    FlexScrollView.prototype.isPullToRefreshVisible = function(footer) {
        var pullToRefresh = _getPullToRefresh.call(this, footer);
        return pullToRefresh ? (pullToRefresh.state === PullToRefreshState.ACTIVE) : false;
    };

    /**
     * Delegates any scroll force to leading/trailing scrollviews.
     * @private
     */
    FlexScrollView.prototype.applyScrollForce = function(delta) {
        var leadingScrollView = this.options.leadingScrollView;
        var trailingScrollView = this.options.trailingScrollView;
        if (!leadingScrollView && !trailingScrollView) {
            return ScrollController.prototype.applyScrollForce.call(this, delta);
        }
        var partialDelta;
        if (delta < 0) {
            if (leadingScrollView) {
                partialDelta = leadingScrollView.canScroll(delta);
                this._leadingScrollViewDelta += partialDelta;
                leadingScrollView.applyScrollForce(partialDelta);
                delta -= partialDelta;
            }
            if (trailingScrollView) {
                partialDelta = this.canScroll(delta);
                ScrollController.prototype.applyScrollForce.call(this, partialDelta);
                this._thisScrollViewDelta += partialDelta;
                delta -= partialDelta;
                trailingScrollView.applyScrollForce(delta);
                this._trailingScrollViewDelta += delta;
            }
            else {
                ScrollController.prototype.applyScrollForce.call(this, delta);
                this._thisScrollViewDelta += delta;
            }
        }
        else {
            if (trailingScrollView) {
                partialDelta = trailingScrollView.canScroll(delta);
                trailingScrollView.applyScrollForce(partialDelta);
                this._trailingScrollViewDelta += partialDelta;
                delta -= partialDelta;
            }
            if (leadingScrollView) {
                partialDelta = this.canScroll(delta);
                ScrollController.prototype.applyScrollForce.call(this, partialDelta);
                this._thisScrollViewDelta += partialDelta;
                delta -= partialDelta;
                leadingScrollView.applyScrollForce(delta);
                this._leadingScrollViewDelta += delta;
            }
            else {
                ScrollController.prototype.applyScrollForce.call(this, delta);
                this._thisScrollViewDelta += delta;
            }
        }
        return this;
    };

    /**
     * Delegates any scroll force to leading/trailing scrollviews.
     * @private
     */
    FlexScrollView.prototype.updateScrollForce = function(prevDelta, newDelta) {
        var leadingScrollView = this.options.leadingScrollView;
        var trailingScrollView = this.options.trailingScrollView;
        if (!leadingScrollView && !trailingScrollView) {
            return ScrollController.prototype.updateScrollForce.call(this, prevDelta, newDelta);
        }
        var partialDelta;
        var delta = newDelta - prevDelta;
        if (delta < 0) {
            if (leadingScrollView) {
                partialDelta = leadingScrollView.canScroll(delta);
                leadingScrollView.updateScrollForce(this._leadingScrollViewDelta, this._leadingScrollViewDelta + partialDelta);
                this._leadingScrollViewDelta += partialDelta;
                delta -= partialDelta;
            }
            if (trailingScrollView && delta) {
                partialDelta = this.canScroll(delta);
                ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, this._thisScrollViewDelta + partialDelta);
                this._thisScrollViewDelta += partialDelta;
                delta -= partialDelta;
                this._trailingScrollViewDelta += delta;
                trailingScrollView.updateScrollForce(this._trailingScrollViewDelta, this._trailingScrollViewDelta + delta);
            }
            else if (delta) {
                ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, this._thisScrollViewDelta + delta);
                this._thisScrollViewDelta += delta;
            }
        }
        else {
            if (trailingScrollView) {
                partialDelta = trailingScrollView.canScroll(delta);
                trailingScrollView.updateScrollForce(this._trailingScrollViewDelta, this._trailingScrollViewDelta + partialDelta);
                this._trailingScrollViewDelta += partialDelta;
                delta -= partialDelta;
            }
            if (leadingScrollView) {
                partialDelta = this.canScroll(delta);
                ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, this._thisScrollViewDelta + partialDelta);
                this._thisScrollViewDelta += partialDelta;
                delta -= partialDelta;
                leadingScrollView.updateScrollForce(this._leadingScrollViewDelta, this._leadingScrollViewDelta + delta);
                this._leadingScrollViewDelta += delta;
            }
            else {
                ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, this._thisScrollViewDelta + delta);
                this._thisScrollViewDelta += delta;
            }
        }
        return this;
    };

    /**
     * Delegates any scroll force to leading/trailing scrollviews.
     * @private
     */
    FlexScrollView.prototype.releaseScrollForce = function(delta, velocity) {
        var leadingScrollView = this.options.leadingScrollView;
        var trailingScrollView = this.options.trailingScrollView;
        if (!leadingScrollView && !trailingScrollView) {
            return ScrollController.prototype.releaseScrollForce.call(this, delta, velocity);
        }
        var partialDelta;
        if (delta < 0) {
            if (leadingScrollView) {
                partialDelta = Math.max(this._leadingScrollViewDelta, delta);
                this._leadingScrollViewDelta -= partialDelta;
                delta -= partialDelta;
                leadingScrollView.releaseScrollForce(this._leadingScrollViewDelta, delta ? 0 : velocity);
            }
            if (trailingScrollView) {
                partialDelta = Math.max(this._thisScrollViewDelta, delta);
                this._thisScrollViewDelta -= partialDelta;
                delta -= partialDelta;
                ScrollController.prototype.releaseScrollForce.call(this, this._thisScrollViewDelta, delta ? 0 : velocity);
                this._trailingScrollViewDelta -= delta;
                trailingScrollView.releaseScrollForce(this._trailingScrollViewDelta, delta ? velocity : 0);
            }
            else {
                this._thisScrollViewDelta -= delta;
                ScrollController.prototype.releaseScrollForce.call(this, this._thisScrollViewDelta, delta ? velocity : 0);
            }
        }
        else {
            if (trailingScrollView) {
                partialDelta = Math.min(this._trailingScrollViewDelta, delta);
                this._trailingScrollViewDelta -= partialDelta;
                delta -= partialDelta;
                trailingScrollView.releaseScrollForce(this._trailingScrollViewDelta, delta ? 0 : velocity);
            }
            if (leadingScrollView) {
                partialDelta = Math.min(this._thisScrollViewDelta, delta);
                this._thisScrollViewDelta -= partialDelta;
                delta -= partialDelta;
                ScrollController.prototype.releaseScrollForce.call(this, this._thisScrollViewDelta, delta ? 0 : velocity);
                this._leadingScrollViewDelta -= delta;
                leadingScrollView.releaseScrollForce(this._leadingScrollViewDelta, delta ? velocity : 0);
            }
            else {
                this._thisScrollViewDelta -= delta;
                ScrollController.prototype.updateScrollForce.call(this, this._thisScrollViewDelta, delta ? velocity : 0);
            }
        }
        return this;
    };

    /**
     * Overriden commit, in order to emit pull-to-refresh event after
     * all the rendering has been done.
     * @private
     */
    FlexScrollView.prototype.commit = function(context) {

        // Call base class
        var result = ScrollController.prototype.commit.call(this, context);

        // Emit pull to refresh events after the whole commit call has been executed
        // so that when the refresh event is received, the FlexScrollView is in a valid state
        // and can be queried.
        if (this._pullToRefresh) {
            for (var i = 0; i < 2; i++) {
                var pullToRefresh = this._pullToRefresh[i];
                if (pullToRefresh) {
                    if ((pullToRefresh.state === PullToRefreshState.ACTIVE) &&
                        (pullToRefresh.prevState !== PullToRefreshState.ACTIVE)) {
                        this._eventOutput.emit('refresh', {
                            target: this,
                            footer: pullToRefresh.footer
                        });
                    }
                    pullToRefresh.prevState = pullToRefresh.state;
                }
            }
        }
        return result;
    };

    module.exports = FlexScrollView;

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-flex\\FlexScrollView.js","/..\\res\\famous-flex")
},{"./LayoutUtility":51,"./ScrollController":52,"./layouts/ListLayout":54,"VCmEsw":43,"buffer":40}],62:[function(require,module,exports){
module.exports=require(48)
},{"../../node_modules/famous/core/Entity":9,"../../node_modules/famous/core/EventHandler":11,"../../node_modules/famous/core/OptionsManager":14,"../../node_modules/famous/core/Transform":18,"../../node_modules/famous/core/ViewSequence":20,"../../node_modules/famous/utilities/Utility":38,"./FlowLayoutNode":46,"./LayoutNode":49,"./LayoutNodeManager":50,"./LayoutUtility":51,"./helpers/LayoutDockHelper":53,"VCmEsw":43,"buffer":40}],63:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*global console*/
/*eslint no-console: 0*/

/**
 * Lays a collection of renderables from left to right or top to bottom, and when the right/bottom edge is reached,
 * continues at the next column/row.
 *
 * |options|type|description|
 * |---|---|---|
 * |`[itemSize]`|Size/Function|Size of an item to layout or callback function which should return the size, e.g.: `function(renderNode, contextSize)`|
 * |`[cells]`|Array.Number|Number of columns and rows: [columns, rows]. When used causes the itemSize to be calculated from the number of number of cells that should be displayed.|
 * |`[margins]`|Number/Array|Margins shorthand (e.g. 5, [10, 20], [2, 5, 2, 10])|
 * |`[spacing]`|Number/Array|Spacing between items (e.g. 5, [10, 10])|
 * |`[justify]`|Bool/Array.Bool|Justify the renderables accross the width/height|
 *
 * Example:
 *
 * ```javascript
 * var CollectionLayout = require('famous-flex/layouts/CollectionLayout');
 *
 * // Create scrollable layout where items have a fixed width/height
 * var scrollView = new FlexScrollView({
 *   layout: CollectionLayout,
 *   layoutOptions: {
 *     itemSize: [100, 100],    // item has width and height of 100 pixels
 *     margins: [10, 5, 10, 5], // outer margins
 *     spacing: [10, 10]        // spacing between items
 *   },
 *   dataSource: [
 *     new Surface({content: 'item 1'}),
 *     new Surface({content: 'item 2'}),
 *     new Surface({content: 'item 3'})
 *   ]
 * });
 *
 * // Create grid layout with a fixed number of columns and rows.
 * var gridLayout = new LayoutController({
 *   layout: CollectionLayout,
 *   layoutOptions: {
 *     cells: [3, 5],           // 3 columns and 5 rows
 *     margins: [10, 5, 10, 5], // outer margins
 *     spacing: [10, 10]        // spacing between items
 *   },
 *   dataSource: [
 *     new Surface({content: 'item 1'}),
 *     new Surface({content: 'item 2'}),
 *     new Surface({content: 'item 3'})
 *   ]
 * });
 * ```
 *
 * Notes:
 *
 * * Recall that the **`direction`** option is given to `FlexScrollView` and not
 * the `ColllectionLayout`.  As such, it affects *scroll direction* and not
 * *layout direction*.  With direction `Y`, items are *laid out horizontally*,
 * but multiple rows *scroll vertically*, and this is the correct behaviour.
 * @module
 */

    // import dependencies
    var Utility = require('../../../node_modules/famous/utilities/Utility');
    var LayoutUtility = require('../LayoutUtility');

    // Define capabilities of this layout function
    var capabilities = {
        sequence: true,
        direction: [Utility.Direction.Y, Utility.Direction.X],
        scrolling: true,
        trueSize: true,
        sequentialScrollingOptimized: true
    };

    // Prepare
    var context;
    var size;
    var direction;
    var alignment;
    var lineDirection;
    var lineLength;
    var offset;
    var margins;
    var margin = [0, 0];
    var spacing;
    var justify;
    var itemSize;
    var getItemSize;
    var lineNodes;

    /**
     * Lays out the renderables in a single line. Taking into account
     * the following variables:
     * - true-size
     * - margins
     * - spacing
     * - justify
     * - center align
     */
    function _layoutLine(next, endReached) {
        if (!lineNodes.length) {
            return 0;
        }

        // Determine size of the line
        var i;
        var lineSize = [0, 0];
        var lineNode;
        for (i = 0; i < lineNodes.length; i++) {
            lineSize[direction] = Math.max(lineSize[direction], lineNodes[i].size[direction]);
            lineSize[lineDirection] += ((i > 0) ? spacing[lineDirection] : 0) + lineNodes[i].size[lineDirection];
        }

        // Layout nodes from left to right or top to bottom
        var justifyOffset = justify[lineDirection] ? ((lineLength - lineSize[lineDirection]) / (lineNodes.length * 2)) : 0;
        var lineOffset = (direction ? margins[3] : margins[0]) + justifyOffset;
        var scrollLength;
        for (i = 0; i < lineNodes.length; i++) {
            lineNode = lineNodes[i];
            var translate = [0, 0, 0];
            translate[lineDirection] = lineOffset;
            translate[direction] = next ? offset : (offset - (lineSize[direction]));
            scrollLength = 0;
            if (i === 0) {
                scrollLength = lineSize[direction];
                if (endReached && ((next && !alignment) || (!next && alignment))) {
                    scrollLength += direction ? (margins[0] + margins[2]) : (margins[3] + margins[1]);
                }
                else {
                    scrollLength += spacing[direction];
                }
            }
            lineNode.set = {
                size: lineNode.size,
                translate: translate,
                scrollLength: scrollLength
            };
            lineOffset += lineNode.size[lineDirection] + spacing[lineDirection] + (justifyOffset * 2);
        }

        // Set nodes
        for (i = 0; i < lineNodes.length; i++) {
            lineNode = next ? lineNodes[i] : lineNodes[(lineNodes.length - 1) - i];
            context.set(lineNode.node, lineNode.set);
        }

        // Prepare for next line
        lineNodes = [];
        return lineSize[direction] + spacing[direction];
    }

    /**
     * Helper function to resolving the size of a node.
     */
    function _resolveNodeSize(node) {
        var localItemSize = itemSize;
        if (getItemSize) {
            localItemSize = getItemSize(node.renderNode, size);
        }
        if ((localItemSize[0] === true) || (localItemSize[1] === true)) {
            var result = context.resolveSize(node, size);
            if (localItemSize[0] !== true) {
                result[0] = itemSize[0];
            }
            if (localItemSize[1] !== true) {
                result[1] = itemSize[1];
            }
            return result;
        }
        else {
            return localItemSize;
        }
    }

    /**
     * Collection-layout
     */
    function CollectionLayout(context_, options) {

        // Prepare
        context = context_;
        size = context.size;
        direction = context.direction;
        alignment = context.alignment;
        lineDirection = (direction + 1) % 2;
        if ((options.gutter !== undefined) && console.warn) {
            console.warn('option `gutter` has been deprecated for CollectionLayout, use margins & spacing instead');
        }
        if (options.gutter && !options.margins && !options.spacing) {
            var gutter = Array.isArray(options.gutter) ? options.gutter : [options.gutter, options.gutter];
            margins = [gutter[1], gutter[0], gutter[1], gutter[0]];
            spacing = gutter;
        }
        else {
            margins = LayoutUtility.normalizeMargins(options.margins);
            spacing = options.spacing || 0;
            spacing = Array.isArray(spacing) ? spacing : [spacing, spacing];
        }
        margin[0] = margins[direction ? 0 : 3];
        margin[1] = -margins[direction ? 2 : 1];
        justify = Array.isArray(options.justify) ? options.justify : (options.justify ? [true, true] : [false, false]);
        lineLength = size[lineDirection] - (direction ? (margins[3] + margins[1]) : (margins[0] + margins[2]));
        var node;
        var nodeSize;
        var lineOffset;
        var bound;

        //
        // Prepare item-size
        //
        if (options.cells) {
            if (options.itemSize && console.warn) {
                console.warn('options `cells` and `itemSize` cannot both be specified for CollectionLayout, only use one of the two');
            }
            itemSize = [
                (size[0] - (margins[1] + margins[3] + (spacing[0] * (options.cells[0] - 1)))) / options.cells[0],
                (size[1] - (margins[0] + margins[2] + (spacing[1] * (options.cells[1] - 1)))) / options.cells[1]
            ];
        }
        else if (!options.itemSize) {
            itemSize = [true, true]; // when no item-size specified, use size from renderables
        }
        else if (options.itemSize instanceof Function) {
            getItemSize = options.itemSize;
        }
        else if ((options.itemSize[0] === undefined) || (options.itemSize[0] === undefined)){
            // resolve 'undefined' into a fixed size
            itemSize = [
                (options.itemSize[0] === undefined) ? size[0] : options.itemSize[0],
                (options.itemSize[1] === undefined) ? size[1] : options.itemSize[1]
            ];
        }
        else {
            itemSize = options.itemSize;
        }

        //
        // Process all next nodes
        //
        offset = context.scrollOffset + (alignment ? 0 : margin[alignment]);
        bound = context.scrollEnd + (alignment ? 0 : margin[alignment]);
        lineOffset = 0;
        lineNodes = [];
        while (offset < bound) {
            node = context.next();
            if (!node) {
                _layoutLine(true, true);
                break;
            }
            nodeSize = _resolveNodeSize(node);
            lineOffset += (lineNodes.length ? spacing[lineDirection] : 0) + nodeSize[lineDirection];
            if (lineOffset > lineLength) {
                offset += _layoutLine(true, !node);
                lineOffset = nodeSize[lineDirection];
            }
            lineNodes.push({node: node, size: nodeSize});
        }

        //
        // Process previous nodes
        //
        offset = context.scrollOffset + (alignment ? margin[alignment] : 0);
        bound = context.scrollStart + (alignment ? margin[alignment] : 0);
        lineOffset = 0;
        lineNodes = [];
        while (offset > bound) {
            node = context.prev();
            if (!node) {
                _layoutLine(false, true);
                break;
            }
            nodeSize = _resolveNodeSize(node);
            lineOffset += (lineNodes.length ? spacing[lineDirection] : 0) + nodeSize[lineDirection];
            if (lineOffset > lineLength) {
                offset -= _layoutLine(false, !node);
                lineOffset = nodeSize[lineDirection];
            }
            lineNodes.unshift({node: node, size: nodeSize});
        }
    }

    CollectionLayout.Capabilities = capabilities;
    CollectionLayout.Name = 'CollectionLayout';
    CollectionLayout.Description = 'Multi-cell collection-layout with margins & spacing';
    module.exports = CollectionLayout;

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-flex\\layouts\\CollectionLayout.js","/..\\res\\famous-flex\\layouts")
},{"../../../node_modules/famous/utilities/Utility":38,"../LayoutUtility":51,"VCmEsw":43,"buffer":40}],64:[function(require,module,exports){
module.exports=require(54)
},{"../../../node_modules/famous/utilities/Utility":38,"../LayoutUtility":51,"VCmEsw":43,"buffer":40}],65:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/**
 * Navigation-bar layout consisting of optionally left and right items and a
 * title in the middle.
 *
 * When no item-width is specified, the width of the renderable itsself is used.
 *
 * |options|type|description|
 * |---|---|---|
 * |`[margins]`|Number/Array|Margins shorthand (e.g. 5, [10, 20], [2, 5, 2, 10])|
 * |`[itemWidth]`|Number|Width of the left & right items|
 * |`[leftItemWidth]`|Number|Width of the left items|
 * |`[rightItemWidth]`|Number|Width of the right items|
 * |`[itemSpacer]`|Number|Space in between items|
 *
 * Example:
 *
 * ```javascript
 * var NavBarLayout = require('famous-flex/layouts/NavBarLayout');
 *
 * var layout = new LayoutController({
 *   layout: NavBarLayout,
 *   layoutOptions: {
 *     margins: [5, 5, 5, 5], // margins to utilize
 *     itemSpacer: 10,        // space in between items
 *   },
 *   dataSource: {
 *     background: new Surface({properties: {backgroundColor: 'black'}}),
 *     title: new Surface({content: 'My title'}),
 *     leftItems:[
 *       new Surface({
 *         content: 'left1',
 *         size: [100, undefined] // use fixed width
 *       })
 *     ],
 *     rightItems: [
 *       new Surface({
 *         content: 'right1',
 *         size: [true, undefined] // use actual width of DOM-node
 *       }),
 *       new Surface({
 *         content: 'right2'
 *         size: [true, undefined] // use actual width of DOM-node
 *       })
 *     ]
 *   }
 * });
 * ```
 * @module
 */

    // import dependencies
    var LayoutDockHelper = require('../helpers/LayoutDockHelper');

    // Layout function
    module.exports = function NavBarLayout(context, options) {
        var dock = new LayoutDockHelper(context, {
            margins: options.margins,
            translateZ: 1
        });

        // Position background
        context.set('background', {size: context.size});

        // Position right items
        var node;
        var i;
        var rightItems = context.get('rightItems');
        if (rightItems) {
            for (i = 0; i < rightItems.length; i++) {
                // dock node
                node = context.get(rightItems[i]);
                dock.right(node, options.rightItemWidth || options.itemWidth);
                // spacer
                dock.right(undefined, options.rightItemSpacer || options.itemSpacer);
            }
        }

        // Position left item
        var leftItems = context.get('leftItems');
        if (leftItems) {
            for (i = 0; i < leftItems.length; i++) {
                // dock node
                node = context.get(leftItems[i]);
                dock.left(node, options.leftItemWidth || options.itemWidth);
                // spacer
                dock.left(undefined, options.leftItemSpacer || options.itemSpacer);
            }
        }

        // Position title
        dock.fill('title');
    };

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-flex\\layouts\\NavBarLayout.js","/..\\res\\famous-flex\\layouts")
},{"../helpers/LayoutDockHelper":53,"VCmEsw":43,"buffer":40}],66:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * This Source Code is licensed under the MIT license. If a copy of the
 * MIT-license was not distributed with this file, You can obtain one at:
 * http://opensource.org/licenses/mit-license.html.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*global define*/

/**
 * SizeConstraint makes it possible to set the following constraints on renderables:
 *
 * |Option|Description|
 * |--------|-----------|
 * |```scale```|Scales the size proportionally to the parent-size (factor).|
 * |```padding```|Inner width/height padding (pixels).|
 * |```max```|Sets the maximum-size (pixels).|
 * |```min```|Sets the minimum-size (pixels).|
 * |```ratio```|Aspect ratio to enforce (factor).|
 * |```size```|Default size to use instead of parent-size (pixels).|
 *
 * @module
 */
    // import dependencies
    var Entity = require('../../node_modules/famous/core/Entity');
    var RenderNode = require('../../node_modules/famous/core/RenderNode');
    var OptionsManager = require('../../node_modules/famous/core/OptionsManager');

    /**
     * Supported constraints
     */
    var Constraints = {
        scale: 'scale',
        padding: 'padding',
        max: 'max',
        min: 'min',
        ratio: 'ratio',
        size: 'size'
    };

    /**
     * Updates the internal constraint value and getter-function
     */
    function _updateConstraints() {
        for (var constraint in Constraints) {
            if (this._constraints[constraint] === undefined) {
                this._constraints[constraint] = {};
            }
            this._constraints[constraint].getter = (this.options[constraint] instanceof Function) ? this.options[constraint] : null;
            this._constraints[constraint].value = this.options[constraint];
        }
    }

    /**
     * @class
     * @param {Object} options Options.
     * @param {Array.Number|Function} [options.scale] Scale
     * @param {Array.Number|Function} [options.padding] Width/height padding
     * @param {Array.Number|Function} [options.max] Maximum-size
     * @param {Array.Number|Function} [options.min] Minimum-size
     * @param {Array.Number|Function} [options.ratio] Aspect-ratio
     * @param {Array.Number|Function} [options.size] Default size
     * @alias module:SizeConstraint
     */
    function SizeConstraint(options) {
        this.options = Object.create(SizeConstraint.DEFAULT_OPTIONS);
        this._optionsManager = new OptionsManager(this.options);
        this._constraints = {};
        _updateConstraints.call(this);
        if (options) {
            this.setOptions(options);
        }

        this._entityId = Entity.register(this);

        this._node = new RenderNode();
    }

    SizeConstraint.DEFAULT_OPTIONS = {
        scale: undefined,
        padding: undefined,
        max: undefined,
        min: undefined,
        ratio: undefined,
        size: undefined
    };

    /**
     * Add a child
     */
    SizeConstraint.prototype.add = function add() {
        return this._node.add.apply(this._node, arguments);
    };

    /**
     * Get the size
     *
     * @return {Array.Number} Size
     */
    SizeConstraint.prototype.getSize = function getSize() {
        return this._node.getSize.apply(this._node, arguments);
    };

    /**
     * Patches the SizeConstraint instance's options with the passed-in ones.
     *
     * @param {Options} options An object of configurable options for the SizeConstraint instance.
     */
    SizeConstraint.prototype.setOptions = function setOptions(options) {
        var result = this._optionsManager.setOptions(options);
        _updateConstraints.call(this);
        return result;
    };

    /**
     * Calculates the modified size based on the parent-size.
     *
     * @param {Array.Number} parentSize Size of the parent
     * @return {Array.Number} [width, height]
     */
    SizeConstraint.prototype.calcSize = function(parentSize) {

        // Get options
        var scale = this._constraints.scale.getter ? this._constraints.scale.getter() : this._constraints.scale.value;
        var padding = this._constraints.padding.getter ? this._constraints.padding.getter() : this._constraints.padding.value;
        var max = this._constraints.max.getter ? this._constraints.max.getter() : this._constraints.max.value;
        var min = this._constraints.min.getter ? this._constraints.min.getter() : this._constraints.min.value;
        var ratio = this._constraints.ratio.getter ? this._constraints.ratio.getter() : this._constraints.ratio.value;
        var fallbackSize = this._constraints.size.getter ? this._constraints.size.getter() : this._constraints.size.value;
        if (!scale && !padding && !max && !min && !ratio && !fallbackSize) {
            return null;
        }

        // init
        var size = [parentSize[0], parentSize[1]];

        // apply fallback-size
        if (fallbackSize) {
            size[0] = fallbackSize[0] || size[0];
            size[1] = fallbackSize[1] || size[1];
        }

        // apply scale
        if (scale) {
            size[0] = size[0] * ((scale[0] !== undefined) ? scale[0] : 1);
            size[1] = size[1] * ((scale[1] !== undefined) ? scale[1] : 1);
        }

        // apply scale
        if (padding) {
            size[0] = size[0] - ((padding[0] !== undefined) ? padding[0] : 0);
            size[1] = size[1] - ((padding[1] !== undefined) ? padding[1] : 0);
        }

        // apply max
        if (max) {
            size[0] = Math.min(size[0], max[0] !== undefined ? max[0] : size[0]);
            size[1] = Math.min(size[1], max[1] !== undefined ? max[1] : size[1]);
        }

        // apply min
        if (min) {
            size[0] = Math.max(size[0], min[0] !== undefined ? min[0] : size[0]);
            size[1] = Math.max(size[1], min[1] !== undefined ? min[1] : size[1]);
        }

        // apply ratio
        if (ratio) {
            var ratioVal = ratio[0] / ratio[1];
            if (ratioVal < (size[0] / size[1])) {
                size[0] = size[1] * ratioVal;
            }
            else {
                size[1] = size[0] / ratioVal;
            }
        }
        return size;
    };

    /**
     * Generate a render spec from the contents of this component.
     *
     * @private
     * @method render
     * @return {Object} Render spec for this component
     */
    SizeConstraint.prototype.render = function render() {
        return this._entityId;
    };

    /**
     * @private
     * @ignore
     * @method commit
     * @param {Context} context commit context
     */
    SizeConstraint.prototype.commit = function(context) {
        return {
            align: this.options.align || context.align,
            origin: this.options.origin || context.origin,
            size: this.calcSize(context.size),
            target: this._node.render()
        };
    };

    module.exports = SizeConstraint;

}).call(this,require("VCmEsw"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/..\\res\\famous-sizeconstraint\\SizeConstraint.js","/..\\res\\famous-sizeconstraint")
},{"../../node_modules/famous/core/Entity":9,"../../node_modules/famous/core/OptionsManager":14,"../../node_modules/famous/core/RenderNode":15,"VCmEsw":43,"buffer":40}]},{},[55])