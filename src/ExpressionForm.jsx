// src/ExpressionForm.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Table, Alert } from 'react-bootstrap';

const ExpressionForm = () => {
  const [expressions, setExpressions] = useState([]);
  const [formData, setFormData] = useState({
    ruleType: 'Age',
    operator: '>',
    value: '50',
    score: '60',
    connector: 'AND',
  });
  const [showJson, setShowJson] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddExpression = () => {
    setExpressions([...expressions, { ...formData }]);
    setFormData({
      ruleType: 'Age',
      operator: '>',
      value: '50',
      score: '60',
      connector: 'AND',
    });
  };

  const handleDeleteExpression = (index) => {
    const updatedExpressions = [...expressions];
    updatedExpressions.splice(index, 1);
    setExpressions(updatedExpressions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddExpression();
  };

  const handleShowJson = () => {
    setShowJson(true);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="form-container">
            <h2 className="text-center mb-4">Expression Form</h2>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="ruleType">
                  <Form.Label>Rule Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="ruleType"
                    value={formData.ruleType}
                    onChange={handleInputChange}
                  >
                    <option value="Age">Age</option>
                    <option value="Credit Score">Credit Score</option>
                    <option value="Account Balance">Account Balance</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="operator">
                  <Form.Label>Operator</Form.Label>
                  <Form.Control
                    as="select"
                    name="operator"
                    value={formData.operator}
                    onChange={handleInputChange}
                  >
                    <option value=">">{'>'}</option>
                    <option value="<">{'<'}</option>
                    <option value="≥">{'≥'}</option>
                    <option value="≤">{'≤'}</option>
                    <option value="=">{'='}</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="value">
                  <Form.Label>Value</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter value"
                    name="value"
              
                    value={formData.value}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="score">
                  <Form.Label>Score</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter score"
                    name="score"
                    value={formData.score}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="connector">
                  <Form.Label>Connector</Form.Label>
                  <Form.Control
                    as="select"
                    name="connector"
                    value={formData.connector}
                    onChange={handleInputChange}
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Button className="btn-secondary me-2" onClick={handleAddExpression}>
              Add Expression
            </Button>

            <Button className="btn-primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      {expressions.length > 0 && (
        <Row className="justify-content-md-center mt-4">
          <Col md={6}>
            <h2>Submitted Expressions</h2>
            <Table striped bordered hover>
            <thead>
                <tr>
                  <th>Rule Type</th>
                  <th>Operator</th>
                  <th>Value</th>
                  <th>Score</th>
                  <th>Connector</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {expressions.map((expression, index) => (
                  <tr key={index}>
                    <td>{expression.ruleType}</td>
                    <td>{expression.operator}</td>
                    <td>{expression.value}</td>
                    <td>{expression.score}</td>
                    <td>{expression.connector}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteExpression(index)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      {showJson && expressions.length > 0 && (
        <Row className="justify-content-md-center mt-4">
          <Col md={6}>
            <h2>Expressions in JSON Format</h2>
            <Alert variant="info">
              <pre>{JSON.stringify(expressions, null, 2)}</pre>
            </Alert>
          </Col>
        </Row>
      )}

      {expressions.length > 0 && (
        <Row className="justify-content-md-center mt-4">
          <Col md={6}>
            <Button className="btn-primary" onClick={handleShowJson}>
              Show JSON
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ExpressionForm;
