'use strict';
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
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter_1 = require("./../EventEmitter/EventEmitter");
var View = (function (_super) {
    __extends(View, _super);
    function View() {
        return _super.call(this) || this;
    }
    View.prototype.addChild = function (child) {
    };
    View.prototype.removeChild = function (child) {
    };
    View.prototype.onLayout = function () {
    };
    View.prototype.onMeasure = function () {
    };
    View.prototype.onDraw = function (canvas) {
    };
    return View;
}(EventEmitter_1.default));
exports.default = View;
