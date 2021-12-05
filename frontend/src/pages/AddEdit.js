import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export default function AddEdit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [nameErr, setNameErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [contactErr, setContactErr] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
        setName({...response.data[0].name});
        setEmail({...response.data[0].email});
        setContact({...response.data[0].contact});

        console.log({...response.data[0].name});
    }
  };
  const addUser = async (data) => {
    const response = await axios.post("http://localhost:5000/user", data);
    if (response.status === 200) {
      toast.success(response.data);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      //send to backend
      const data = {
        name,
        email,
        contact,
      };
      addUser(data);

      setName("");
      setEmail("");
      setContact("");
    }
  };

  const formValidation = () => {
    const nameErr = {};
    const emailErr = {};
    const contactErr = {};

    let isValid = true;

    if (name === "") {
      nameErr.nameMessage = "Please enter your name";
      isValid = false;
    }
    if (email === "") {
      emailErr.emailMessage = "Please  enter your email";
      isValid = false;
    }
    if (contact === "") {
      contactErr.contactMessage = "Please  enter your contact number";
      isValid = false;
    }

    setNameErr(nameErr);
    setEmailErr(emailErr);
    setContactErr(contactErr);
    return isValid;
  };

  return (
    <>
      <Row>
        <Col md={3}></Col>
        <Col xs={12} md={6}>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter name"
              />
            </Form.Group>
            {Object.keys(nameErr).map((key) => {
              return <div style={{ color: "red" }}>{nameErr[key]}</div>;
            })}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="name@example.com"
              />
            </Form.Group>
            {Object.keys(emailErr).map((key) => {
              return <div style={{ color: "red" }}>{emailErr[key]}</div>;
            })}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="number"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                }}
                placeholder="2565216"
              />
            </Form.Group>
            {Object.keys(contactErr).map((key) => {
              return <div style={{ color: "red" }}>{contactErr[key]}</div>;
            })}
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
