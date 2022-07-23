import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { updateNote } from '../../api/API';

const EditNote = (props: {
    show: boolean,
    onHide: () => void,
    note_id: string,
    name: string,
    text: string,
}) => {
  const [name, setName] = useState<string>(props.name);
  const [text, setText] = useState<string>(props.text);
  const token = localStorage.getItem('token') || '';
  const commit = async () => {
    await updateNote({note_id: props.note_id, name: name, text: text}, token);
    props.onHide();
  }
  return (
    <Modal centered show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Редактировать запись
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
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditNote;