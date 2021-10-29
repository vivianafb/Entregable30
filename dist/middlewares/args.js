"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.portArg = exports.clientSecretArgt = exports.clientIdArg = exports.ClusterArgument = exports.Argumentos = void 0;

var _minimist = _interopRequireDefault(require("minimist"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const args = (0, _minimist.default)(process.argv.slice(2));
const Argumentos = args;
exports.Argumentos = Argumentos;
const portArg = args.puerto || 8080;
exports.portArg = portArg;
const clientIdArg = args.clientId;
exports.clientIdArg = clientIdArg;
const clientSecretArgt = args.clientSecret;
exports.clientSecretArgt = clientSecretArgt;
const ClusterArgument = args.cluster;
exports.ClusterArgument = ClusterArgument;