"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _compression = _interopRequireDefault(require("compression"));

var _index = _interopRequireDefault(require("../routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_index.default);
app.use((0, _compression.default)());
var _default = app;
exports.default = _default;