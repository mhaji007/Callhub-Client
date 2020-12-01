// Component for connecting client to
// backend via socket io

// import io from 'socket.io-client';
// export default io.connect(`http://localhost:3002`);

import io from "socket.io-client";
export default io.connect(`http://localhost:3002`, {
  cors: {
    origin: "http://localhost:3002",
    credentials: true,
  },
});
