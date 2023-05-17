import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../service/UserService";

const TableUsers = (props) => {
  const [listUsers, setListUser] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await fetchAllUsers();
    if (res && res.data) {
      setListUser(res.data);
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Avartar</th>
        </tr>
      </thead>
      <tbody>
        {listUsers &&
          listUsers.length > 0 &&
          listUsers.map((item, index) => {
            return (
              <tr key={`user ${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>
                  <img src={item.avatar} alt="Mô tả ảnh" />
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default TableUsers;
