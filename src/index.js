import express from 'express';
import apiRouter from './routes/index';
import * as http from 'http';
import { portArg, ClusterArgument } from './middlewares/args';
import os from 'os';
import cluster from 'cluster';
import compression from 'compression';
import {logger}  from './utils/logs';

const app = express();
const clusterMode = ClusterArgument;

const server = http.Server(app);
const numCPUs = os.cpus().length;

if (clusterMode && cluster.isMaster) {
  logger.info(`NUMERO DE CPUS ===> ${numCPUs}`);
  logger.info(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    logger.warn(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  // const PORT = Config.PORT;

  server.listen(portArg, () =>
    logger.info(
      `Servidor express escuchando en el puerto ${portArg} - PID WORKER ${process.pid}`
    )
  );
  server.on('error', error => logger.error(`Error en el servidor: ${error}`));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(compression());
app.use(apiRouter);


