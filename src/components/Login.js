import React from "react";
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react";

function Login({
  user: { username, mobileNumber, verificationCode, verificationSent },
  setUser,
  sendSmsCode,
  sendVerificationCode
}) {
  // draft => coming from immer
  // event => React's synthetic event
  // data => Since semantic ui is used here
  function populateFields(event, data) {
    setUser((draft) => {
      draft[data.name] = data.value;
    });
  }

  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          {" "}
          Login into your account:
        </Header>
        <Form>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={(event, data) => populateFields(event, data)}
              name="username"
            />
            <Form.Input
              fluid
              icon="mobile alternate"
              iconPosition="left"
              placeholder="Mobile number"
              value={mobileNumber}
              onChange={(event, data) => populateFields(event, data)}
              name="mobileNumber"
            />
            {/* If verification code is sent, display an
            input field for the user to enter the verification code */}
            {verificationSent && (
              <Form.Input
                fluid
                icon="key"
                iconPosition="left"
                placeholder="Enter your code"
                value={verificationCode}
                onChange={(event, data) => populateFields(event, data)}
                name="verificationCode"
              />
            )}
            <Button
              color="blue"
              fluid
              size="large"
              onClick={!verificationSent ? sendSmsCode : sendVerificationCode}
            >
              {!verificationSent ? "Login/Signup" : "Enter your code"}
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
