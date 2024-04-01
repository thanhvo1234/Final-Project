import { useState } from "react";
import { Alert, Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { openNotificationWithIcon } from "../../components/notification/Notification";
import { registerUserAPI } from "../../api/apiUrl";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSuccessfulRegistration = () => {
    openNotificationWithIcon("success", "Registration Successful");
    setShowAlert(true);
    navigate("/login"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
  };

  const handleFailedRegistration = () => {
    openNotificationWithIcon("error", "Registration Failed");
    setShowError(true);
  };

  const onFinish = async (values) => {
    try {
      const response = await registerUserAPI(values);
      console.log("Response:", response);
      if (response.status === 200 || response.status === 201) {
        handleSuccessfulRegistration();
      } else {
        handleFailedRegistration();
      }
    } catch (error) {
      console.error("Registration error:", error);
      handleFailedRegistration();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="register-container">
      <div className="register">
        <Form
          name="register-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {showAlert && (
            <Alert
              message="Registration Successful"
              type="success"
              showIcon
              onClose={() => setShowAlert(false)}
            />
          )}
          {showError && (
            <Alert
              message="Registration Failed"
              type="error"
              showIcon
              onClose={() => setShowError(false)}
            />
          )}
          <p className="form-title">Welcome</p>
          <p className="welcome">
            {" "}
            Enter your email and password and confirm password to register new
            account.
          </p>
          <p className="title">Email</p>
          <Form.Item
            name="email"
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
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input right password!",
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your Password" />
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
            If you have an account,{" "}
            <Link to="/login">Click here</Link> to login.
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;