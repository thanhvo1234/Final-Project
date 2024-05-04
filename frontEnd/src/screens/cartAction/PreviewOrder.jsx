/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useGetCartData } from "../../hooks/useCart";
import { useCreateOrder } from "../../hooks/useOrder";
import "./styles/PreviewOrder.css";
import { formatCurrency } from "../../helpers/format";

export default function PreviewOrder() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const cartId = user.cart.id;
  const { data: cartData, refetch } = useGetCartData(cartId);
  console.log(cartData);
  const taxPrice = 0.01 * cartData?.data.totalPrice;
  const shippingFee = 20000;
  const totalCart = taxPrice + shippingFee + cartData?.data.totalPrice;
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const [orderId, setOrderId] = useState(null);
  const createOrderMutation = useCreateOrder();

  const handleCreateOrder = async () => {
    try {
      const result = await createOrderMutation.mutateAsync({
        userId: cartData.data.user.id,
        user: cartData.data.user,
        totalPrice: totalCart,
        items: cartData.data.items,
        taxFee: taxPrice,
        shippingFee: shippingFee,
        shippingAddress: shippingAddress,
      });
    localStorage.removeItem("shippingAddress");
      const newOrderId = result.data.id; // Lấy ID của đơn hàng từ kết quả trả về
      setOrderId(newOrderId);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (orderId) {
    navigate(`/order/${orderId}`); // Chuyển hướng sau khi có ID của đơn hàng
    return null; // Không cần render gì nữa sau khi chuyển hướng
  }
  return (
    <div className="container">
      <h1>Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Receiver Name:</strong> {shippingAddress.receiver}{" "}
                <br />
                <strong>Phone Number:</strong> {shippingAddress.phoneNumber}{" "}
                <br />
                <strong>Address: </strong>
                {shippingAddress.street}, {shippingAddress.district},
                {shippingAddress.city}
              </Card.Text>
              <div className="card-footer-link">
                <Link to="/shippingAddress">Back to Shipping Address</Link>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> Momo
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cartData &&
                  cartData.data.items &&
                  cartData.data.items.map((item) => (
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
              <div className="card-footer-link">
                <Link to="/cart">Back to Shopping Cart</Link>
              </div>
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
                    <Col>Items: {formatCurrency(cartData?.data.totalPrice)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping fee: {shippingFee}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax fee: {formatCurrency(taxPrice)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total: {formatCurrency(totalCart)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <button
                      type="button"
                      className="buttonSubmit"
                      disabled={cartData?.data.cart?.items.length === 0}
                      onClick={handleCreateOrder}
                    >
                      Create Order
                    </button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
