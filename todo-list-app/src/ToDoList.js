// Ebad Ur Rahman Mohammed - 9 Oct 2024

import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Tab, Form, Button } from 'react-bootstrap';
import todosData from './todoItems';
import './ToDoList.css';

const ToDoList = () => {
  const [todos, setTodos] = useState(todosData);
  const [newTodo, setNewTodo] = useState({ title: '', dueDate: '' });
  const [activeTab, setActiveTab] = useState(null);

  const getVariant = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);

    currentDate.setHours(0, 0, 0, 0);
    dueDateObj.setHours(0, 0, 0, 0);

    const diffTime = dueDateObj - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) return 'primary';
    if (diffDays <= 7 && diffDays > 4) return 'success';
    if (diffDays <= 4 && diffDays > 2) return 'warning';
    return 'danger';
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.title && newTodo.dueDate) {
      setTodos([...todos, { ...newTodo, description: `Description for ${newTodo.title}` }]);
      setNewTodo({ title: '', dueDate: '' });
    }
  };

  const handleDescriptionChange = (index, event) => {
    const updatedTodos = [...todos];
    updatedTodos[index].description = event.target.textContent;
    setTodos(updatedTodos);
  };

  const handleDueDateChange = (index, event) => {
    const updatedTodos = [...todos];
    updatedTodos[index].dueDate = event.target.value;
    setTodos(updatedTodos);
  };

  return (
    <Container>
      <h2 className="header">Ebad's Assignment 2: ToDo List</h2>
      <Row>
        <Col sm={4}>
          <Form onSubmit={addTodo} className="todo-form">
            <Form.Group controlId="newTodoItem">
              <Form.Label>ToDo Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add todo item"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="newDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newTodo.dueDate}
                onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="add-button">Add Todo</Button>
          </Form>
        </Col>
        <Col sm={8}>
          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Row>
              <Col sm={4}>
                <ListGroup>
                  {todos.map((todo, index) => (
                    <ListGroup.Item
                      action
                      href={`#todo${index + 1}`}
                      className={`list-group-item-${getVariant(todo.dueDate)}`}
                      key={index}
                      onClick={() => setActiveTab(`#todo${index + 1}`)}
                    >
                      {todo.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {todos.map((todo, index) => (
                    <Tab.Pane eventKey={`#todo${index + 1}`} key={index}>
                      <p
                        className="todo-description"
                        contentEditable={true}
                        onBlur={(e) => handleDescriptionChange(index, e)}
                      >
                        {todo.description}
                      </p>
                      <Form.Control
                        type="date"
                        value={todo.dueDate}
                        onChange={(e) => handleDueDateChange(index, e)}
                      />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ToDoList;