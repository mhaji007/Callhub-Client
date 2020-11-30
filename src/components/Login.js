import React from "react";
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react";

function Login({user:{username, mobileNumber}, setUser}) {
  // draft => coing from immer
  // event => React's synthetic event
  // data => Since semantic ui is used here
  function populateFields(event, data) {
    setUser((draft) => {
      draft[data.name] = data.value
    })
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
              placeHolder="Username"
              value={username}
              onChange={(event,data) => populateFields(event,data)}
              name="username"

              />
            <Form.Input
              fluid
              icon="mobile alternate"
              iconPosition="left"
              placeholder="Mobile number"
              value={mobileNumber}
              onChange={(event,data) => populateFields(event,data)}
              name="mobileNumber"
            />
            <Button color="blue" fluid size="large">
              Login/Signup
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
