// Component for connecting client to
// backend via socket io

// import io from 'socket.io-client';
// export default io.connect(`${process.env.REACT_APP_API}`);

// =========================================================== //

// import io from "socket.io-client";

// export default io.connect(`${process.env.REACT_APP_API}`, {
  //   cors: {
    //     origin: `${process.env.REACT_APP_API}`,
    //     credentials: true,
    //   },
    // });

// =========================================================== //

import io from "socket.io-client";

class Socket {
  client = null;
  constructor() {
    this.client = io.connect(`${process.env.REACT_APP_API}`);
  }
  addToken(token) {
    this.client = io.connect(`${process.env.REACT_APP_API}`, {
      query: { token },
    });
  }
  removeToken() {
    this.client = io.connect(`${process.env.REACT_APP_API}`);
  }
}

const instance = new Socket();

export default instance;
