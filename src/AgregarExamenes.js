import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

function AgregarExamenes({ show, handleClose, materiaId }) {
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
  const [error, setError] = useState('');

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = questions.slice();
    newQuestions[index][event.target.name] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Validar que se hayan agregado preguntas y respuestas
    if (questions.some(q => !q.question || !q.answer)) {
      setError('Por favor, complete todas las preguntas y respuestas.');
      return;
    }

    const examData = {
      materiaId,
      questions
    };

    try {
      const response = await axios.post('http://localhost:3001/crearExamen', examData);
      console.log('Examen creado exitosamente:', response.data);
      alert("Contenido Agregado Exitosamente");
      handleClose();
    } catch (error) {
      console.error('Error al crear el examen:', error);
      console.log(materiaId);
      setError('Error al crear el examen. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Examenes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={index}>
              <Form.Group controlId={`formQuestion${index}`}>
                <Form.Label>Pregunta {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  name="question"
                  value={q.question}
                  onChange={(event) => handleQuestionChange(index, event)}
                  placeholder="Escribe la pregunta"
                />
              </Form.Group>
              <Form.Group controlId={`formAnswer${index}`}>
                <Form.Label>Respuesta</Form.Label>
                <Form.Control
                  type="text"
                  name="answer"
                  value={q.answer}
                  onChange={(event) => handleQuestionChange(index, event)}
                  placeholder="Escribe la respuesta"
                />
              </Form.Group>
              <hr />
            </div>
          ))}
          <Button variant="secondary" onClick={handleAddQuestion}>
            Agregar Pregunta
          </Button>
          <Button variant="primary" type="submit" className="mt-3">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AgregarExamenes;