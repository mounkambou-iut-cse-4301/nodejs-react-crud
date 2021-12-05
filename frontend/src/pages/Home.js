import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  //delete
  const onDeleteUser=async(id)=>{
      if(window.confirm('are you sur you want to delete this item ?')){
        const response = await axios.delete(`http://localhost:5000/user/${id}`);
        if (response.status === 200) {
          toast.success(response.data);
          getUsers();
        } 
      }
  }

  console.log("data=>", data);
  return (
    <div className="mt-5">
      <h2>Home</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{index+1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>
                      <Link to={`/update/${item.id}`}>
                      <Button variant="primary">Edit</Button>
                      </Link>
                  </td>
                  <td>
                      <Link to={`/view/${item.id}`}>
                      <Button variant="secondary">View</Button>
                      </Link>
                  </td>
                  <td>
                      <Link to={`/delete/${item.id}`}>
                      <Button variant="danger" onClick={()=>onDeleteUser(item.id)}>Delete</Button>
                      </Link>
                  </td>
                </tr>
                
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
