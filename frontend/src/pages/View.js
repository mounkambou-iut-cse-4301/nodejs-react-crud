import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table,Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function View() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setUser({ ...response.data[0] });
    }
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th> Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user && user.name}</td>
          <td>{user && user.email}</td>
          <td>{user && user.contact}</td>
          <td>
            <Link to="/">
              <Button variant="secondary">Go back</Button>
            </Link>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
