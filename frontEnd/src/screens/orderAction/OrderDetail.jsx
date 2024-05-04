/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import {
  useGetOneOrder,
  useMakeMomoPayment,
  usePaysuccessData,
} from "../../hooks/useOrder";
import "./OrderDetail.css";
import { formatCurrency } from "../../helpers/format";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, isError } = useGetOneOrder(id);
  const updateOrderMutation = usePaysuccessData(id); // Initialize the hook
  const makeMomoPaymentMutation = useMakeMomoPayment();

  useEffect(() => {
    if (!isLoading && order) {
      const query = new URLSearchParams(location.search);
      const message = query.get("message");
      if (message === "Successful.") {
        console.log(message);
        handleUpdate();
      }
    }
  }, [location, isLoading, order]);

  const handlePaymentInitiation = () => {
    if (order?.order && order?.order.totalPrice) {
      const amount = order?.order.totalPrice;
      const redirectUrl = window.location.href;
      makeMomoPaymentMutation.mutate(
        { amount, redirectUrl },
        {
          onSuccess: (data) => {
            // window.location.href = data?.data.payUrl;
          },
          onError: (error) => {
            console.error("Payment initiation error:", error.response.data);
            alert("Error: " + error.response.data.message);
          },
        }
      );
    }
  };

  const handleUpdate = async () => {
    const updatedData = {
      isPaid: "success",
      paidAt: new Date().toISOString(),
    };

    updateOrderMutation.mutateAsync(updatedData, {
      onSuccess: () => {
        console.log("Order updated successfully.");
        navigate(`/order/${id}`); // Assuming this route shows the updated order
      },
      onError: (error) => {
        console.error("Failed to update order:", error);
      },
    });
  };

  return (
    <div className="container">
      <h1>Detail Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Receiver Name:</strong>{" "}
                {order?.order.shippingAddress.receiver} <br />
                <strong>Phone Number:</strong>{" "}
                {order?.order.shippingAddress.phoneNumber} <br />
                <strong>Address: </strong>
                {order?.order.shippingAddress.street},{" "}
                {order?.order.shippingAddress.district},
                {order?.order.shippingAddress.city}
              </Card.Text>
              <div
                className={`status-card ${
                  order?.order.isDelivery === "success"
                    ? "status-success"
                    : order?.order.isDelivery === "pending"
                    ? "status-pending"
                    : "status-delivering"
                }`}
              >
                {order?.order.isDelivery === "success"
                  ? `Delivered at ${order?.order.deliveryAt}`
                  : order?.order.isDelivery === "pending"
                  ? "Not Delivered"
                  : "Delivering for 3 day"}
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> Momo
              </Card.Text>
              <div
                className={`status-card ${
                  order?.order.isPaid === "success"
                    ? "status-success"
                    : order?.order.isPaid === "pending"
                    ? "status-pending"
                    : "status-delivering"
                }`}
              >
                {order?.order.isPaid === "success"
                  ? `Paid at ${order?.order.paidAt}`
                  : "Not Delivered"}
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order &&
                  order?.order.items &&
                  order?.order.items.map((item) => (
                    <ListGroup.Item key={item.id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="img-thumbnail"
                          />
                        </Col>
                        <Col md={6}>
                          <Link to={`/productDetail/${item.product.sku}`}>
                            {item.product.nameProduct}
                          </Link>
                        </Col>
                        <Col md={6}>
                          <span>Quantity: {item.quantity}</span>
                        </Col>
                        <Col md={6}>
                          <span>Discount: {item.product.coupon}%</span>
                        </Col>
                        <Col md={6}>
                          Price: {formatCurrency(item.product.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items: {formatCurrency(order?.order.totalPrice)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Shipping fee: {formatCurrency(order?.order.shippingFee)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax fee: {formatCurrency(order?.order.taxFee)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>
                        Total: {formatCurrency(order?.order.totalPrice)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {order?.order.isPaid !== "success" && (
                    <div className="d-grid">
                      <button
                        type="button"
                        className="buttonSubmit"
                        onClick={handlePaymentInitiation}
                      >
                        Payment by Momo
                      </button>
                    </div>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
