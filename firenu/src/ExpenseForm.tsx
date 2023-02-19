import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { FormEvent, useRef, useState } from "react";
import { ExpenseData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

type ExpenseFormProps = {
  onSubmit: (data: ExpenseData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function ExpenseForm({
  onSubmit,
  onAddTag,
  availableTags,
}: ExpenseFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const costRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const oneTimePayment = useRef<HTMLInputElement>(null);
  const paid = useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      //values can't be null as required from form
      title: titleRef.current!.value,
      cost: costRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
      oneTimePayment: oneTimePayment.current?.checked || false, // 3726
      paid: paid.current?.checked || false,
    });

    //navigate(".."); navigate back to previous page after submit, disabled for testing
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={1}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]); //append new Tag
                }}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
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
            <Form.Control ref={costRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="switch"
              id="oneTimeSwitch"
              label="One time payment"
              ref={oneTimePayment}
            />
            <Form.Check type="switch" id="paidSwitch" label="Paid" ref={paid} />
          </Form.Group>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control required as="textarea" rows={15} ref={markdownRef} />
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
