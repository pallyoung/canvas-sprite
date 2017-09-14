'use strict';
/// <reference path="./../paint/Painter.ts" />
/// <reference path="../event/EventTarget.ts" />
'use script';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var cs;
(function (cs) {
    var paint;
    (function (paint_1) {
        var Painter;
        (function (Painter) {
            function childrenForEach(children) {
            }
            function paint(displayer) {
                var children = displayer.children;
                var i = 0, l = children.length, child;
                var context = displayer.canvasContext;
                child = children[0];
                measure(child, 0, 0);
                context.clearRect(0, 0, displayer.width, displayer.height);
                draw(child, context);
            }
            Painter.paint = paint;
            function setHeight(view, childrenHeight) {
                if (view.height === view.WRAP_CONTENT) {
                    view.height = childrenHeight;
                }
                else if (view.height === view.MATCH_PARNET) {
                    var parent = view.parent || view.displayer;
                    if (parent) {
                        view.height = parent.height;
                    }
                }
            }
            function setWidth(view, childrenWidth) {
                if (view.width === view.WRAP_CONTENT) {
                    view.width = childrenWidth;
                }
                else if (view.width === view.MATCH_PARNET) {
                    var parent = view.parent || view.displayer;
                    if (parent) {
                        view.width = parent.width;
                    }
                }
            }
            function measure(view, preWidth, preHeight) {
                var children = view.children;
                var i = 0, l = children.length, child;
                var contentHeight = 0, contentWidth = 0;
                while (i < l) {
                    child = children[i];
                    measure(child, contentHeight, contentWidth);
                    contentHeight = Math.max(child.height + child.y, contentHeight);
                    contentWidth = Math.max(child.width + child.x, contentWidth);
                    i++;
                }
                view.contentHeight = contentHeight;
                view.contentWidth = contentWidth;
                view.onMeasure(view.width, view.height);
                layout(view, preWidth, preHeight);
            }
            function layout(view, preWidth, preHeight) {
                var top = view.y;
                var left = view.x || 0;
                if (top === undefined) {
                    top = preHeight;
                }
                var right = left + view.width;
                var bottom = top + view.height;
                view.onLayout(top, left, right, bottom);
            }
            function draw(view, canvasContext) {
                //判断是否可见
                if (!view.visibility) {
                    return;
                }
                canvasContext.save();
                canvasContext.strokeStyle = 'transparent';
                canvasContext.beginPath();
                canvasContext.translate(view.x, view.y);
                //缩放
                canvasContext.scale(view.scaleX, view.scaleY);
                //旋转
                canvasContext.translate(view.originX, view.originY);
                canvasContext.rotate(view.rotate);
                canvasContext.translate(-view.originX, -view.originY);
                //设置绘制上下文
                canvasContext.rect(0, 0, view.width, view.height);
                canvasContext.stroke();
                canvasContext.closePath();
                canvasContext.clip();
                canvasContext.save();
                view.onDraw(canvasContext);
                canvasContext.restore();
                view.children.forEach(function (child) {
                    draw(child, canvasContext);
                });
                canvasContext.restore();
            }
        })(Painter = paint_1.Painter || (paint_1.Painter = {}));
    })(paint = cs.paint || (cs.paint = {}));
})(cs || (cs = {}));
/**
 * https://dom.spec.whatwg.org/#dom-event-composed
 */
var cs;
(function (cs) {
    var event;
    (function (event_1) {
        ;
        ;
        function flattenEventListenerOptions(options) {
            if (typeof options === 'boolean') {
                return options;
            }
            else {
                return options.capture;
            }
        }
        function flattenAddEventListenerOptions(options) {
            var capture = flattenEventListenerOptions(options);
            var once = false, passive = false;
            if (typeof options === 'object') {
                once = !!options.once;
                passive = !!options.passive;
            }
            return {
                capture: capture,
                once: once,
                passive: passive
            };
        }
        /**
         * @export
         * @class EventTarget
         * @description implement EventTarget interface
         */
        var EventListener = (function () {
            function EventListener(type, callback, options) {
                this.$capture = false;
                this.$passive = false;
                this.$once = false;
                this.$removed = false;
                this.$type = type;
                this.$callback = callback;
                options = options || {
                    passive: false,
                    once: false,
                    capture: false
                };
                this.$passive = !!options.passive;
                this.$once = !!options.once;
                this.$capture = !!options.capture;
            }
            Object.defineProperty(EventListener.prototype, "type", {
                get: function () {
                    return this.$type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventListener.prototype, "callback", {
                get: function () {
                    return this.$callback;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventListener.prototype, "capture", {
                get: function () {
                    return this.$capture;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventListener.prototype, "passive", {
                get: function () {
                    return this.$passive;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventListener.prototype, "once", {
                get: function () {
                    return this.$once;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventListener.prototype, "removed", {
                get: function () {
                    return this.$removed;
                },
                set: function (removed) {
                    this.$removed = removed;
                },
                enumerable: true,
                configurable: true
            });
            EventListener.prototype.handleEvent = function (event) {
                if (event.type == this.$type && !this.$removed) {
                    this.$callback.call(null, event);
                }
            };
            return EventListener;
        }());
        var EventTarget = (function () {
            function EventTarget() {
                this.$eventListeners = [];
            }
            EventTarget.prototype.addEventListener = function (type, callback, options) {
                if (callback == null) {
                    return;
                }
                var eventListeners = this.$eventListeners;
                var eventListener;
                var i = 0, l = eventListeners.length;
                options = flattenAddEventListenerOptions(options);
                while (i < l) {
                    eventListener = eventListeners[i];
                    if (eventListener.type === type && eventListener.callback === callback && eventListener.capture === options.capture) {
                        return;
                    }
                    i++;
                }
                eventListeners.push(new EventListener(type, callback, options));
            };
            EventTarget.prototype.removeEventListener = function (type, callback, options) {
                if (callback == null) {
                    return;
                }
                var eventListeners = this.$eventListeners;
                var eventListener;
                var i = 0, l = eventListeners.length;
                options = flattenEventListenerOptions(options);
                while (i < l) {
                    eventListener = eventListeners[i];
                    if (eventListener.type === type && eventListener.callback === callback && eventListener.capture === options) {
                        eventListeners.splice(i, 1);
                        eventListener.removed = true;
                        l--;
                    }
                    else {
                        i++;
                    }
                }
            };
            EventTarget.prototype.dispatchEvent = function (event) {
                this.$eventListeners.forEach(function (eventListener) {
                    eventListener.handleEvent(event);
                });
                return event.cancelable && event.defaultPrevented;
            };
            return EventTarget;
        }());
        event_1.EventTarget = EventTarget;
    })(event = cs.event || (cs.event = {}));
})(cs || (cs = {}));
var cs;
(function (cs) {
    var displayer;
    (function (displayer) {
        function createCanvas(width, height) {
            var canvas = document.createElement('canvas');
            canvas.height = height;
            canvas.width = width;
            return canvas;
        }
        var Displayer = (function (_super) {
            __extends(Displayer, _super);
            function Displayer(container, options) {
                var _this = _super.call(this) || this;
                _this.$running = false;
                _this.$container = container;
                options = options || {};
                var height = options.height || container.clientHeight;
                var width = options.width || container.clientWidth;
                _this.$canvas = createCanvas(width, height);
                _this.$height = height;
                _this.$width = width;
                _this.$canvasContext = _this.$canvas.getContext('2d');
                _this.onCreate();
                return _this;
            }
            Object.defineProperty(Displayer.prototype, "canvasContext", {
                get: function () {
                    return this.$canvasContext;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Displayer.prototype, "children", {
                get: function () {
                    return this.$children;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Displayer.prototype, "height", {
                get: function () {
                    return this.$height;
                },
                set: function (height) {
                    this.$canvas.height = height;
                    this.$height = height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Displayer.prototype, "width", {
                get: function () {
                    return this.$width;
                },
                set: function (width) {
                    this.$canvas.width = width;
                    this.$width = width;
                },
                enumerable: true,
                configurable: true
            });
            Displayer.prototype.onCreate = function () {
                this.$container.appendChild(this.$canvas);
            };
            Displayer.prototype.setContentView = function (view) {
                this.$children = [view];
                this.piant();
            };
            Displayer.prototype.piant = function () {
                var _this = this;
                if (this.$children.length < 1) {
                    return;
                }
                else {
                    cs.paint.Painter.paint(this);
                    requestAnimationFrame(function () { return _this.piant(); });
                }
            };
            return Displayer;
        }(cs.event.EventTarget));
        displayer.Displayer = Displayer;
    })(displayer = cs.displayer || (cs.displayer = {}));
})(cs || (cs = {}));
var cs;
(function (cs) {
    var TIME_ORIGIN = Date.now();
    var time;
    (function (time) {
        var TimeImpl = (function () {
            function TimeImpl() {
            }
            Object.defineProperty(TimeImpl.prototype, "TIME_ORIGIN", {
                get: function () {
                    return TIME_ORIGIN;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimeImpl.prototype, "timeStamp", {
                get: function () {
                    return Date.now() - TIME_ORIGIN;
                },
                enumerable: true,
                configurable: true
            });
            return TimeImpl;
        }());
        time.Time = new TimeImpl();
    })(time = cs.time || (cs.time = {}));
})(cs || (cs = {}));
var cs;
(function (cs) {
    var event;
    (function (event) {
        /**
         * @export
         * @class Event
         * @description implement Event interface
         */
        var Event = (function () {
            function Event(type, eventInitDict) {
                /**
                 * EventParse
                 *
                 * @private
                 * @type {number}
                 * @memberof Event
                 */
                this.$NONE = 0;
                this.$CAPTURING_PHASE = 1;
                this.$AT_TARGET = 2;
                this.$BUBBLING_PHASE = 3;
                /**
                 * eventPhase
                 *
                 * @private
                 * @type {number}
                 * @memberof Event
                 */
                this.$eventPhase = 2;
                /**
                 * 是否取消冒泡
                 *
                 * @private
                 * @type {boolean}
                 * @memberof Event
                 */
                this.$cancelBubble = false;
                this.$isTrusted = false;
                this.$isStopImmediatePropagation = false;
                this.$path = [];
                /**
                 * initialized flag
                 *
                 * @private
                 * @type {boolean}
                 * @memberof Event
                 */
                this.$initialized = false;
                this.$initialized = true;
                this.$timeStamp = cs.time.Time.timeStamp;
                this.$composed = !!eventInitDict.composed;
                this.$isTrusted = false;
                this.$target = null;
                this.$currentTarget = null;
                this.initEvent(type, eventInitDict.bubbles, eventInitDict.cancelable);
            }
            Object.defineProperty(Event.prototype, "type", {
                get: function () {
                    return this.$type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "target", {
                get: function () {
                    return this.$target;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "currentTarget", {
                get: function () {
                    return this.$currentTarget;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "NONE", {
                get: function () {
                    return this.$NONE;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "CAPTURING_PHASE", {
                get: function () {
                    return this.$CAPTURING_PHASE;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "AT_TARGET", {
                get: function () {
                    return this.$AT_TARGET;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "BUBBLING_PHASE", {
                get: function () {
                    return this.$BUBBLING_PHASE;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "eventPhase", {
                get: function () {
                    return this.$eventPhase;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "cancelBubble", {
                get: function () {
                    return this.$cancelBubble;
                },
                set: function (cancelBubble) {
                    this.$cancelBubble = cancelBubble;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "bubbles", {
                get: function () {
                    return this.$bubbles;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "cancelable", {
                get: function () {
                    return this.$cancelable;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "defaultPrevented", {
                get: function () {
                    return this.$defaultPrevented;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "composed", {
                get: function () {
                    return this.$composed;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "timeStamp", {
                get: function () {
                    return this.$timeStamp;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "isTrusted", {
                get: function () {
                    return this.$isTrusted;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Event.prototype, "path", {
                get: function () {
                    return this.$path;
                },
                enumerable: true,
                configurable: true
            });
            Event.prototype.$setTarget = function (target) {
                this.$target = target;
            };
            Event.prototype.$setCurrentTarget = function (currentTarget) {
                this.$currentTarget = currentTarget;
            };
            Event.prototype.stopPropagation = function () {
                this.$cancelBubble = true;
            };
            Event.prototype.stopImmediatePropagation = function () {
                this.$cancelBubble = true;
                this.$isStopImmediatePropagation = true;
            };
            Event.prototype.preventDefault = function () {
                if (this.$cancelable) {
                    this.$defaultPrevented = true;
                }
            };
            /**
             * https://dom.spec.whatwg.org/#dom-event-cancelbubble
             *
             * The composedPath() method, when invoked, must run these steps:
             *
             *  Let composedPath be a new empty list.
             *
             *  Let currentTarget be context object’s currentTarget attribute value.
             *
             *  For each tuple in context object’s path:
             *
             *    If currentTarget is a Window object, then:
             *
             *    If tuple’s item is not a node, or tuple’s item is not closed-shadow-hidden from tuple’s item’s shadow-including root, then append tuple’s item to composedPath.
             *
             *    Otherwise, if currentTarget is a node and tuple’s item is not closed-shadow-hidden from currentTarget, or currentTarget is not a node, then append tuple’s item to composedPath.
             *
             *   Return composedPath.
             *
             * @returns {Array<EventTarget>}
             * @memberof Event
             * @todo
             */
            Event.prototype.composedPath = function () {
                var composedPath = [];
                var path = this.path;
                var currentTarget = this.currentTarget;
                composedPath = path;
                return composedPath;
            };
            Event.prototype.initEvent = function (type, bubbles, cancelable) {
                if (this.$isTrusted) {
                    return;
                }
                this.$type = type;
                this.$bubbles = !!bubbles;
                this.$cancelable = !!cancelable;
            };
            return Event;
        }());
        event.Event = Event;
    })(event = cs.event || (cs.event = {}));
})(cs || (cs = {}));
/**
 * 构造View
 * onMeasure
 * onSizeChanged
 * onLayout
 * onDraw
 */
var cs;
(function (cs) {
    var view;
    (function (view) {
        var MATCH_PARNET = Infinity;
        var WRAP_CONTENT = -Infinity;
        var View = (function (_super) {
            __extends(View, _super);
            function View() {
                var _this = _super.call(this) || this;
                _this.$height = WRAP_CONTENT;
                _this.$width = WRAP_CONTENT;
                _this.contentHeight = 0;
                _this.contentWidth = 0;
                _this.$children = [];
                _this.$parent = null;
                _this.$displayer = null;
                _this.touchEnabled = false;
                _this.scaleX = 1;
                _this.scaleY = 1;
                _this.rotate = 0;
                _this.originX = 0;
                _this.originY = 0;
                _this.$visibility = true;
                return _this;
            }
            Object.defineProperty(View.prototype, "MATCH_PARNET", {
                get: function () {
                    return MATCH_PARNET;
                },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(View.prototype, "WRAP_CONTENT", {
                get: function () {
                    return WRAP_CONTENT;
                },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(View.prototype, "x", {
                get: function () {
                    return this.$x || 0;
                },
                set: function (x) {
                    this.$x = x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "y", {
                get: function () {
                    return this.$y;
                },
                set: function (y) {
                    this.$y = y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "clientX", {
                get: function () {
                    return this.$x;
                },
                set: function (clientX) {
                    this.$x = clientX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "clientY", {
                get: function () {
                    return this.$y;
                },
                set: function (clientY) {
                    this.$y = clientY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "height", {
                get: function () {
                    if (this.$height === WRAP_CONTENT) {
                        return this.contentHeight;
                    }
                    else if (this.$height === MATCH_PARNET) {
                        var parent = this.parent || this.displayer || { height: 0 };
                        return parent.height;
                    }
                    return this.$width;
                },
                set: function (height) {
                    this.$height = height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "width", {
                get: function () {
                    if (this.$width === WRAP_CONTENT) {
                        return this.contentWidth;
                    }
                    else if (this.$width === MATCH_PARNET) {
                        var parent = this.parent || this.displayer || { width: 0 };
                        return parent.width;
                    }
                    return this.$width;
                },
                set: function (width) {
                    this.$width = width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "children", {
                get: function () {
                    return this.$children;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "parent", {
                get: function () {
                    return this.$parent;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "displayer", {
                get: function () {
                    return this.$displayer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "visibility", {
                get: function () {
                    return this.$visibility;
                },
                set: function (visibility) {
                    this.$visibility = visibility;
                },
                enumerable: true,
                configurable: true
            });
            View.prototype.$setParent = function (parent) {
                this.$parent = parent;
            };
            View.prototype.onMount = function () {
            };
            View.prototype.onUnmount = function () {
            };
            View.prototype.onLayout = function (t, r, b, l) {
            };
            View.prototype.onMeasure = function (ow, oh) {
            };
            View.prototype.onDraw = function (canvasContext) {
                //背景
                if (this.$width !== WRAP_CONTENT) {
                    canvasContext.fillStyle = this.backgroundColor || 'transparent';
                    canvasContext.fillRect(0, 0, this.width, this.height);
                }
                //border
            };
            View.prototype.onSizeChanged = function () {
            };
            View.prototype.dispatchTouchEvent = function (event) {
                // var { pageX, pageY } = event.touches[0];
                // for (let i = this._children.length - 1, children = this._children, child: IView; i >= 0; i--) {
                //     child = children[i];
                //     if (child.pageX < pageX &&
                //         (child.pageX + child.width) > pageX &&
                //         child.pageY < pageY &&
                //         (child.pageY + child.pageY) > pageY) {
                //         child.onDispatchTouchEvent(event);
                //         return true;
                //     }
                // }
                return false;
            };
            View.prototype.addChild = function (child) {
                if (child.parent) {
                    throw new Error();
                }
                child.$setParent(this);
                this.$children.push(child);
            };
            View.prototype.removeChild = function (child) {
                for (var i = 0, children = this.$children, l = children.length; i < l; i++) {
                    if (child == children[i]) {
                        this.$children.splice(i, 1);
                        return;
                    }
                }
            };
            return View;
        }(cs.event.EventTarget));
        view.View = View;
    })(view = cs.view || (cs.view = {}));
})(cs || (cs = {}));
var cs;
(function (cs) {
    var view;
    (function (view) {
        var Text = (function (_super) {
            __extends(Text, _super);
            function Text() {
                return _super.call(this) || this;
            }
            Text.prototype.onDraw = function () {
            };
            return Text;
        }(view.View));
        view.Text = Text;
    })(view = cs.view || (cs.view = {}));
})(cs || (cs = {}));
