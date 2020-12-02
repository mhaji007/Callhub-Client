import React from "react";
import NavBar from "./NavBar";
import CallProgress from "./CallProgress";

function CallCenter({ calls }) {
  return (
    <div>
      <NavBar />
      {calls.calls.map((call) => (
        // <h1> {call.data.CallSid}</h1>
        <CallProgress call={call}/>
      ))}
    </div>
  );
}

export default CallCenter;
