import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import "../App.scss";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../service/UserService";

const TableUsers = (props) => {
  const [listUsers, setListUser] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    const res = await fetchAllUsers(page);
    if (res && res.data) {
      setListUser(res.data);
      setTotalPage(res.total_pages);
      setPage(res.page);
    }
  };

  const handlePageClick = (event) => {
    // goi api lay dung so nguoi dung tai trang do
    getUsers(+(event.selected + 1));
  };

  return (
    <>
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
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        marginPagesDisplayed={2}
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
};

export default TableUsers;
