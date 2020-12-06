import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import CallCenter from "./components/CallCenter";
import { useImmer } from "use-immer";
import axios from "./utils/Axios";
import socket from "./utils/Socketio";
import useTokenFromLocalStorage from "./hooks/useTokenFromLocalStorage";

function App() {
  // State for storing calls (req.body) object
  // sent back from calls-new endpoint
  const [calls, setCalls] = useImmer({
    calls: [],
  });
  // State for storing token received from server
  // after code verification
  // const [token, setToken] = useState();

  // State for storing username and mobile number
  // of the user entered in the login form as well
  // as verification status of the code
  const [user, setUser] = useImmer({
    username: "",
    mobileNumber: "",
    verificationCode: "",
    verificationSent: false,
  });

  // const [storedToken, setStoredToken] = useLocalStorage("token", null);
  const [storedToken, setStoredToken, isValidToken] = useTokenFromLocalStorage( null);

  // Upon component mounting listen
  // on socket for disconnect event
  useEffect(() => {
    socket.client.on("disconnect", () => {
      console.log("Socket disconnected");
    });
    // Receives the data that is sent back
    // from new-call endpoint that handles Twilio's
    // webhook call and stores it in local state
    // Destructure CallSid and CallStatus from data
    socket.client.on("call-new", ({data:{ CallSid, CallStatus }}) => {
      setCalls((draft) => {
        draft.calls.push({ CallSid, CallStatus });
      });
    });


    socket.client.on('enqueue', ({ data: { CallSid } }) => {
      setCalls((draft) => {
        const index = draft.calls.findIndex(
          ({ CallSid }) => CallSid === CallSid
        );
        if (index === -1) {
          return;
        }
        draft.calls[index].CallStatus = 'enqueue';
      });
    });
    return () => {};
  }, []);

  // Function to send user's credentials along
  // with channel type to server to request for
  // a verification code
  async function sendSmsCode() {
    console.log("Sending SMS");
    await axios.post("/login", {
      to: user.mobileNumber,
      username: user.username,
      channel: "sms",
    });

    // Set verificationSent to true
    // draft => {} always takes a funciton
    setUser((draft) => {
      draft.verificationSent = true;
    });
  }
  // Function to send back the code
  // to server to request verification
  // and receive a jwt token.
  // Once the request is made, if code is valid
  // server creates and sends back a jwt token
  async function sendVerificationCode() {
    console.log("Sending Verification");
    const response = await axios.post("/verify", {
      to: user.mobileNumber,
      code: user.verificationCode,
      username: user.username,
    });

    console.log("Received token", response.data.token);
    setStoredToken(response.data.token);
  }

  return (
    <div>
      {/* State and function requesting the verification
      code is passed onto the login form */}
      {isValidToken ? (
        <CallCenter calls={calls} />
      ) : (
        <Login
          user={user}
          setUser={setUser}
          sendSmsCode={sendSmsCode}
          sendVerificationCode={sendVerificationCode}
        />
      )}
      {/* map through the calls
      first calls is our local state
      which is in fact the body object sent back
      from server's new-calls endpoint upon receiving a call
      second call is a property on that object
      that is sent back from server */}
    </div>
  );
}

export default App;
