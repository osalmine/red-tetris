import * as httpMocks from 'node-mocks-http';
import * as fs from 'fs';
import httpRoutesHandler, { getFile } from './httpHandler';
import path from 'path';

// jest.mock('./httpHandler', () => ({
//   ...jest.requireActual('./httpHandler'),
//   getFile: jest.fn(),
// }));

jest.mock('fs');

describe('httpRoutesHandler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // it('should call getFile', () => {
  //   const req = httpMocks.createRequest({
  //     method: 'GET',
  //     url: '/',
  //   });
  //   const res = httpMocks.createResponse();
  //   const mockStream = {} as fs.ReadStream;

  //   // (httpHandler.getFile as jest.Mock).mockReturnValueOnce(mockStream);
  //   // const getFileSpy = jest.spyOn(httpHandler, 'getFile');

  //   httpHandler.httpRoutesHandler(req, res);

  //   // expect(getFileSpy).toBeCalledWith('/');
  //   expect(httpHandler.getFile).toBeCalledWith('/');
  // });
  it('should call getFile', async () => {
    // const req = httpMocks.createRequest({
    //   method: 'GET',
    //   url: '/',
    // });
    // const res = httpMocks.createResponse();
    const mockStream = {} as fs.ReadStream;
    const filePath = 'testFile.txt';
    jest.spyOn(fs, 'createReadStream').mockReturnValue(mockStream);
    await getFile(filePath);

    // (httpHandler.getFile as jest.Mock).mockReturnValueOnce(mockStream);
    // const getFileSpy = jest.spyOn(httpHandler, 'getFile');

    // httpHandler.httpRoutesHandler(req, res);

    // expect(getFileSpy).toBeCalledWith('/');
    expect(fs.createReadStream).toBeCalledWith(
      path.resolve(__dirname, '..', '..', '..', 'dist', filePath)
    );
  });
});
