import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Note from '../components/Note';
import { NoteType } from '../types/NoteType';
import { getNotes } from '../api/API';
import CreateNote from '../components/modals/CreateNote';
import { DateRange } from '../types/DateRange';

const NotePage = () => {
  const token = localStorage.getItem("token") || "";
  const [searchStr, setSearchStr] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [processedNotes, setProcessedNotes] = useState<NoteType[]>(notes);
  const [useProcessed, setUseProcessed] = useState<boolean>(false);
  const [createVisible, setCreateVisible] = useState<boolean>(false);
  useEffect(() => {
    const setNotesAsync = async () => {
      let noteList = await getNotes(token);
      setNotes(noteList);
    }
    setNotesAsync();
  });
  const filterByDate = (from: Date, to: Date) => {
    if(from.getTime() > to.getTime()) return;
    let dateRange = new DateRange(from, to);
    const filter = (value: NoteType) => dateRange.isInRange(value.created_at);
    setProcessedNotes(notes.filter((value) => filter(value)));
    setUseProcessed(true);
  }
  const filterByStatus = (status: boolean) => {
    setProcessedNotes(notes.filter((value) => value.completed === status));
    setUseProcessed(true);
  }
  const search = () => {
    setProcessedNotes(notes.filter((value) => value.name.includes(searchStr)));
    setUseProcessed(true);
  }
  const disableProcessed = () => {
    setProcessedNotes(notes);
    setUseProcessed(false);
  }
  let elems = (useProcessed ? processedNotes : notes).map((item) => {
    return <Note {...item}></Note>
  });
  return (
    <Container>
      <Form>
        <Row>
          <Col xs={3} />
          <Col xs={6} className='mt-2 d-flex align-items-center'>
            <Form.Control
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            placeholder='Search...'></Form.Control>
            <Button
            variant='primary'
            onClick={search}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="my-3">
        <Col>
        </Col>
        <Col xs={5}>
          {elems}
        </Col>
        <Col className='d-flex align-items-center justify-content-center flex-column'>
          <Button variant='primary' className='mb-2' onClick={() => setCreateVisible(true)}>+</Button>
          <h2>Filters</h2>
          <Form className='d-flex pt-2 flex-column align-items-center'>
            <h5>Pick date</h5>
            <Form.Label>From</Form.Label>
            <Form.Control type='date'
              onChange={(e) => setFromDate(new Date(e.target.value))}
              placeholder='From...'/>
            <Form.Label>To</Form.Label>
            <Form.Control type='date'
              onChange={(e) => setToDate(new Date(e.target.value))}
              placeholder='To...' />
            <Button variant='primary'
              onClick={() => filterByDate(fromDate, toDate)}
              className='my-2'>Apply date filter</Button>
          </Form>
          <Form className='d-flex align-items-center flex-column pt-2'>
            <h5>Pick status</h5>
            <Form.Check
              checked={status}
              onChange={(e) => {
                setStatus(!status);
              }} />
            <Button variant='primary'
              onClick={() => filterByStatus(status)}
              className='my-2'>Apply status filter</Button>
          </Form>
          <Button variant='danger'
            onClick={() => disableProcessed()}>Disable filters</Button>
        </Col>
      </Row>
      <CreateNote show={createVisible} onHide={() => setCreateVisible(false)}/>
    </Container>
  )
}

export default NotePage;
