import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { FormEvent, useRef, useState } from "react";
import { ExpenseData, Tag } from "./App";

type ExpenseFormProps = {
  onSubmit: (data: ExpenseData) => void;
};

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const costRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      //values can't be null as required from form
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
      //cost: costRef.current!.value,
    });
  }
  return (
    <Form onSubmit={handleSubmit}>
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
              <CreatableReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
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
          <Button type="button" variant="outline-secondary">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
