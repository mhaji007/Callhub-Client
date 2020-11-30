import React from "react";
import Login from "./components/Login";
import {useImmer} from 'use-immer';
import axios from './utils/Axios';


function App() {
  // State for storing username and mobile number
  // of the user entered in the login form
  const [user, setUser] = useImmer({
    username:"",
    mobileNumber:"",
    verificationCode:"",
    verificationSent: false,
  })
// Function to send user's credentials along
// with channel type to server to request for
// a verification code
async function sendSmsCode() {
  console.log('Sending SMS');
  await axios.post('/login', {
    to: user.mobileNumber,
    username: user.username,
    channel: "sms"
  });
// Set verificationSent to true
// draft => {} always takes a funciton

setUser(draft => {
  draft.verificationSent=true;
})

}

  return (
    <div>
      {/* State and function requesting the verificatio code is passed onto the login form */}
      <Login user={user} setUser={setUser} sendSmsCode={sendSmsCode}/>
    </div>
  );
}

export default App;
