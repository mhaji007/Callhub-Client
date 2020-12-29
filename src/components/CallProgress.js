import { Container, Step } from "semantic-ui-react";


function CallProgress({call}) {
    function answerCall(sid) {
      socket.client.emit("answer-call", { sid });
    }
  return (
    <Container>
      <Step.Group fluid>
        <Step
          icon="phone"
          title="Ringing"
          description={call.CallSid}
          // description={call.data.From}
          active={call.CallStatus==="ringing"}
          completed={call.CallStatus !=="ringing"}
        />
        <Step
          icon="cogs"
          title="In queue"
          description=" User waiting in queue"
          active = {call.CallStatus ==="enqueue"}
          disabled={call.CallStatus === "ringing"}
          onClick={() => answerCall(call.CallSid)}
        />
        <Step
          icon="headphones"
          title="Answered"
          description=" Answered by John"
          disabled = {call.CallStatus === "ringing" || call.CallStatus === "enqueue"}
        />
        <Step icon="times" title="Hang up" description=" Missed call" />
      </Step.Group>
    </Container>
  );
}

export default CallProgress;
