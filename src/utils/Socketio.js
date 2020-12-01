// Component for connecting client to
// backend via socket io

// import io from 'socket.io-client';
// export default io.connect(`${process.env.REACT_APP_API}`);

import io from "socket.io-client";
export default io.connect(`${process.env.REACT_APP_API}`, {
  cors: {
    origin: `${process.env.REACT_APP_API}`,
    credentials: true,
  },
});
