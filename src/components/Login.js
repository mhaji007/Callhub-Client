import React from "react";
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react";

function Login() {
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
            />
            <Form.Input
              fluid
              icon="mobile alternate"
              iconPosition="left"
              placeholder="Mobile number"
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
