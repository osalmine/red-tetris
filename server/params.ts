const params = {
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || '3004',
    get url() { return `http://${ this.host }:${ this.port}` },
  },
  board: {
    rows: 20,
    cols: 10,
  },
}

export default params
