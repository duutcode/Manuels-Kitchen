// client/src/pages/Orders.js
import React, { useState, useEffect } from "react";
import { Container, Card, Badge, Alert } from "react-bootstrap";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view your orders.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5001/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load orders. Please try again.");
        console.error("Orders fetch error:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <p>Loading your orders...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="warning">{error}</Alert>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h3>No orders yet</h3>
        <p>Time to order some delicious Ghanaian food!</p>
        <a href="/" className="btn btn-danger mt-3">
          Browse Restaurants
        </a>
      </Container>
    );
  }

  return (
    <div className="orders-page">
      <Container>
        <h1 className="text-center mb-5">My Orders</h1>
        {orders.map((order) => (
          <Card key={order._id} className="mb-4 order-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5>
                    Order #{order.orderNumber}{" "}
                    <Badge bg={order.status === "Delivered" ? "success" : "warning"}>
                      {order.status}
                    </Badge>
                  </h5>
                  <p className="text-muted mb-1">
                    {new Date(order.createdAt).toLocaleDateString()} at{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                  <p className="mb-0">
                    <strong>Items:</strong>{" "}
                    {order.items.map((i) => i.name).join(", ")}
                  </p>
                </div>
                <div className="text-end">
                  <h5 className="text-danger">GH₵ {order.total.toFixed(2)}</h5>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default Orders;