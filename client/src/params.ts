const params = {
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || '3004',
    get url() { return `http://${ this.host }:${ this.port}` },
  },
}

export default params
