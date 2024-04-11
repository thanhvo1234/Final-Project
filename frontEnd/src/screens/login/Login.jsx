import { useState } from "react";
import { Button, Form, Input, Alert } from "antd";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAPI } from "../../api/apiUrl";
import axios from "axios";
import {notification} from "antd";



const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

const Login = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSuccessfulLogin = (userData) => {
    openNotificationWithIcon("success", "Login Successfully");
    setShowAlert(true);

    const user = {
      fullName: userData.userData.fullName || null,
      phoneNumber: userData.userData.phoneNumber || null,
      email: userData.userData.email,
      address: userData.userData.address || null
    };
    console.log(user,"aaa");
    console.log(userData,"bbb");
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("authenticated", "true");
    navigate("/");
  };

  const handleFailedLogin = () => {
    openNotificationWithIcon("error", "Login Failed");
    setShowError(true);
  };

  const onFinish = async (values) => {
    try {
      const response = await loginUserAPI(values); // Call loginUserAPI function with form values
      const { data } = response;
      if (data) {
        handleSuccessfulLogin(data);
      } else {
        handleFailedLogin();
      }
    } catch (error) {
      console.error("Login error:", error);
      handleFailedLogin();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login">
        <Form name="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          {showAlert && (
            <Alert
              message="Login Successfully"
              type="success"
              showIcon
              onClose={() => setShowAlert(false)}
            />
          )}
          {showError && (
            <Alert
              message="Login Failed"
              type="error"
              showIcon
              onClose={() => setShowError(false)}
            />
          )}
          <p className="form-title">Welcome back!</p>
          <p className="welcome">
            {" "}
            Enter your email and password to login to the system.
          </p>
          <p className="title">Email</p>
          <Form.Item
            name="email" // Change from "username" to "email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}>
            <Input className="custom-input" placeholder="Enter your Email" />
          </Form.Item>
          <p className="title">Password</p>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <Input.Password className="custom-input" placeholder="Enter your Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign In
            </Button>
          </Form.Item>
          <p className="welcome">
            {" "}
            If you dont have an account, <Link to="/register">Click here</Link> to register.
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;