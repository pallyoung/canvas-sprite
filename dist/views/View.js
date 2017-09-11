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
define(["require", "exports", "./../event/EventDispatcher"], function (require, exports, EventDispatcher_1) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var View = (function (_super) {
        __extends(View, _super);
        function View() {
            var _this = _super.call(this) || this;
            _this._children = [];
            _this.x = 0;
            _this.y = 0;
            _this.pageX = 0;
            _this.pageY = 0;
            _this.touchEnabled = false;
            _this.rotate(0);
            _this.translate(0);
            _this.scale(1);
            _this._isAttached = false;
            return _this;
        }
        View.prototype.path = function (canvasContext) {
        };
        View.prototype.layout = function (canvasContext) {
            this.onMeasure();
            this.onLayout();
            if (this.parent != null) {
                this.pageX = this.parent.pageX + this.x;
                this.pageY = this.parent.pageY + this.y;
            }
            this.draw(canvasContext);
        };
        View.prototype.onLayout = function () {
        };
        View.prototype.onMeasure = function () {
        };
        View.prototype.draw = function (canvasContext) {
            this.onDraw(canvasContext);
            this.dispatchDraw(canvasContext);
        };
        View.prototype.onDraw = function (canvasContext) {
            canvasContext.beginPath();
            canvasContext.closePath();
        };
        View.prototype.dispatchDraw = function (canvasContext) {
            var self = this;
            this._children.forEach(function (child) {
                canvasContext.save();
                canvasContext.strokeStyle = 'transparent';
                canvasContext.beginPath();
                canvasContext.translate(child.x + child._translateX, child.y + child._translateY);
                canvasContext.translate(child._rotateX, child._rotateY);
                canvasContext.rotate(child._rotate);
                canvasContext.translate(child._rotateX, child._rotateY);
                canvasContext.scale(child._scaleX, child._scaleY);
                child.path(canvasContext);
                canvasContext.stroke();
                canvasContext.closePath();
                canvasContext.clip();
                child.layout(canvasContext);
                canvasContext.restore();
            });
        };
        View.prototype.onDispatchTouchEvent = function (event) {
            if (!this.touchEnabled) {
                if (this.parent != this && event.isPropagation) {
                    this.parent.dispatchPropagationEvent(event);
                }
                return;
            }
            if (!this.dispatchTouchEvent(event)) {
                this.dispatchPropagationEvent(event);
            }
        };
        View.prototype.dispatchTouchEvent = function (event) {
            var _a = event.touches[0], pageX = _a.pageX, pageY = _a.pageY;
            for (var i = this._children.length - 1, children = this._children, child = void 0; i >= 0; i--) {
                child = children[i];
                if (child.pageX < pageX &&
                    (child.pageX + child.width) > pageX &&
                    child.pageY < pageY &&
                    (child.pageY + child.pageY) > pageY) {
                    child.onDispatchTouchEvent(event);
                    return true;
                }
            }
            return false;
        };
        View.prototype.dispatchPropagationEvent = function (event) {
            event.target = this;
            this.dispatchEvent(event.type, event);
            if (this.parent != this && event.isPropagation) {
                this.parent.dispatchPropagationEvent(event);
            }
        };
        View.prototype.addChild = function (child) {
            if (child._isAttached) {
                throw new Error();
            }
            child.parent = this;
            child._isAttached = true;
            child.x = child.x || 0;
            child.y = child.y || 0;
            this._children.push(child);
        };
        View.prototype.removeChild = function (child) {
            for (var i = 0, children = this._children, l = children.length; i < l; i++) {
                if (child == children[i]) {
                    this._children.splice(i, 1);
                    return;
                }
            }
        };
        View.prototype.scale = function (xy, y) {
            this._scaleX = xy;
            this._scaleY = y || xy;
        };
        View.prototype.rotate = function (rotate, x, y) {
            this._rotate = rotate;
            this._rotateX = x || 0;
            this._rotateY = y || 0;
        };
        View.prototype.translate = function (xy, y) {
            this._translateX = xy;
            this._translateY = y || xy;
        };
        return View;
    }(EventDispatcher_1.EventDispatcher));
    exports.View = View;
});
