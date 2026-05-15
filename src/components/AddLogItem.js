import React from "react";
import { useState } from "react";
import { Card, Form, Row, Col, Button, CardBody } from "react-bootstrap";

const AddLogItem = ({ addItem }) => {
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [priority, setPriority] = useState("medium");

  const onSubmit = (e) => {
    e.preventDefault();
    addItem({ text, user, priority });
    setText("");
    setUser("");
    setPriority("low");
  };
  return (
    <Card className="mt-5 mb-3">
      <CardBody>
        <Form onSubmit={onSubmit}>
          <Row className="my-3">
            <Col>
              <Form.Control
                placeholder="Log"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                placeholder="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="0">Select Priority</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Button type="submit" variant="secondary" block="true">
                Save Log
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default AddLogItem;
