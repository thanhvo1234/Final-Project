import { Button, Form, Input } from "antd";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="login-container">
      <div className="login">
        <Form name="login-form">
          <p className="form-title">Welcome</p>
          <p className="welcome">
            {" "}
            Enter your email and password and confirm password to register new
            account.
          </p>
          <p className="title">Email</p>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="Enter your Email" />
          </Form.Item>
          <p className="title">Password</p>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your Password" />
          </Form.Item>
          <p className="title">Confirm Password</p>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input right password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
          </Form.Item>
          <p className="welcome">
            {" "}
            If you have account,<Link to="/login">Click here</Link> to login.
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
