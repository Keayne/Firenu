import { Button, Col, Stack, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export function ExpenseList() {
  return (
    <>
      <Row>
        <Col>
          <h1>My expenses</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
    </>
  );
}
