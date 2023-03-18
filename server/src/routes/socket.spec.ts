import { createServer } from 'http';
import { AddressInfo } from 'net';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import client from 'socket.io-client';

describe('my awesome project', () => {
  let clientSocket;

  // let io, serverSocket, clientSocket;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  let serverSocket: Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = (httpServer.address() as AddressInfo).port;
      clientSocket = client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('should work', (done) => {
    clientSocket.on('hello', (arg) => {
      expect(arg).toBe('world');
      done();
    });
    serverSocket.emit('hello', 'world');
  });

  test('should work (with ack)', (done) => {
    serverSocket.on('hi', (cb) => {
      cb('hola');
    });
    clientSocket.emit('hi', (arg) => {
      expect(arg).toBe('hola');
      done();
    });
  });
});
