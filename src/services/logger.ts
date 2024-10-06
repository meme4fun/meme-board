import log4js from 'log4js';

// if (process.env.APP_ENV === 'production') {

// }

const isPROD = process.env.APP_ENV === 'production';

log4js.addLayout('json', function (config) {
  return function (logEvent) {
    return JSON.stringify(logEvent) + config.separator ?? '';
  };
});

log4js.configure({
  appenders: {
    default: { type: 'stdout', layout: { type: 'basic' } },
    FEReportErrorLog: {
      type: isPROD ? 'dateFile' : 'stdout',
      filename: '/data/logs/node/fe-report-error-logs.log',
      keepFileExt: true,
    },
    ReservoirReportErrorLog: {
      type: isPROD ? 'dateFile' : 'stdout',
      filename: '/data/logs/node/reservoir-report-error-logs.log',
      keepFileExt: true,
    },
  },
  categories: {
    default: { appenders: ['default'], level: 'info' },
    defaultError: { appenders: ['default'], level: 'error' },
    FEReportErrorLog: {
      appenders: ['default', 'FEReportErrorLog'],
      level: 'info',
    },
    ReservoirReportErrorLog: {
      appenders: ['default', 'ReservoirReportErrorLog'],
      level: 'info',
    },
    NextjsAPI: {
      appenders: ['default'],
      level: 'info',
    },
  },
  pm2: true,
  disableClustering: true,
});

/* logger for capture FE error */
export const FEErrorLogger = log4js.getLogger('FEReportErrorLog');
export const ReservoirReportErrorLogger = log4js.getLogger(
  'ReservoirReportErrorLog',
);

export const APILogger = log4js.getLogger('NextjsAPI');

// console.log = (...args: Parameters<typeof console.log>) =>
//   log4js.getLogger('default').log(...args);
// console.info = (...args: Parameters<typeof console.info>) =>
//   log4js.getLogger('default').info(...args);
// console.error = (...args: Parameters<typeof console.error>) =>
//   log4js.getLogger('default').error(...args);
