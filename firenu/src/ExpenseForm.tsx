import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";

export function ExpenseForm() {
  return (
    <Form>
      <Stack gap={1}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect isMulti />
            </Form.Group>
          </Col>
          <Form.Group controlId="cost">
            <Form.Label>Cost</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="switch"
              id="oneTimeSwitch"
              label="One time payment"
            />
            <Form.Check type="switch" id="paidSwitch" label="Paid" />
          </Form.Group>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control required as="textarea" rows={15} />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to=".."></Link>
          <Button type="button" variant="outline-secundary">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
