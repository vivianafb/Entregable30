"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  createLogger,
  format,
  transports
} = _winston.default;
const {
  combine,
  printf,
  timestamp,
  colorize
} = format;
const logConfiguration = {
  level: 'info',
  format: combine(timestamp({
    format: 'MMM-DD-YYYY HH:mm:ss'
  }), colorize(), printf(info => `${info.level} |  ${[info.timestamp]} | ${info.message}`)),
  transports: [new transports.Console(), new _winston.default.transports.File({
    filename: './logs/warn.log',
    level: 'warn'
  }), new _winston.default.transports.File({
    filename: './logs/error.log',
    level: 'error'
  }) //   new winston.transports.File({
  //     filename: './logs/info.log',
  //     level: 'info',
  //   }),
  ]
};
const logger = createLogger(logConfiguration);
exports.logger = logger;