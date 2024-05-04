/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./styles/ShippingAddress.css";
export default function ShippingAddress() {
  const navigate = useNavigate();
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));

  const [receiver, setReceiver] = useState(shippingAddress?.receiver || "");
  const [phoneNumber, setPhoneNum] = useState(
    shippingAddress?.phoneNumber || ""
  );
  const [street, setStreet] = useState(shippingAddress?.street || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [district, setDistrict] = useState(shippingAddress?.district || "");
  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        receiver,
        phoneNumber,
        street,
        city,
        district,
      })
    );
    navigate("/previewOrder");
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };
  return (
    <div>
      <title>Shipping Address</title>

      <div className="create-order-container">
        <Button className="backtoCart" onClick={handleBackToCart}>
          Back to Cart
        </Button>
      </div>
      <div className="container small-container">
        <h1 className="my-3">Your Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="inputField" controlId="receiver">
            <Form.Label>Receiver Name</Form.Label>
            <Form.Control
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="inputField" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              value={phoneNumber}
              onChange={(e) => setPhoneNum(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="inputField" controlId="street">
            <Form.Label>Street</Form.Label>
            <Form.Control
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="inputField" controlId="district">
            <Form.Label>District</Form.Label>
            <Form.Control
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="inputField" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <div className="inputField">
            <Button variant="primary" type="submit">
              Preview Order
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
