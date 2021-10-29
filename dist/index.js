"use strict";

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index"));

var http = _interopRequireWildcard(require("http"));

var _args = require("./middlewares/args");

var _os = _interopRequireDefault(require("os"));

var _cluster = _interopRequireDefault(require("cluster"));

var _compression = _interopRequireDefault(require("compression"));

var _logs = require("./utils/logs");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const clusterMode = _args.ClusterArgument;
const server = http.Server(app);

const numCPUs = _os.default.cpus().length;

if (clusterMode && _cluster.default.isMaster) {
  _logs.logger.info(`NUMERO DE CPUS ===> ${numCPUs}`);

  _logs.logger.info(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    _cluster.default.fork();
  }

  _cluster.default.on('exit', worker => {
    _logs.logger.warn(`Worker ${worker.process.pid} died at ${Date()}`);

    _cluster.default.fork();
  });
} else {
  // const PORT = Config.PORT;
  server.listen(_args.portArg, () => _logs.logger.info(`Servidor express escuchando en el puerto ${_args.portArg} - PID WORKER ${process.pid}`));
  server.on('error', error => _logs.logger.error(`Error en el servidor: ${error}`));
}

app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _compression.default)());
app.use(_index.default);