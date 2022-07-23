import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { createNote } from '../../api/API';

const CreateNote = (props: {
    show: boolean,
    onHide: () => void,
  }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const token = localStorage.getItem("token") || "";
  const commit = async () => {
    await createNote({
      name: name,
      text: text,
    }, token);
    props.onHide();
  }
  return (
    <Modal centered show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Создать запись
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Note name..."
          className='my-2'/>
          <Form.Control
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Note text..." />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary'
        onClick={commit}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateNote;