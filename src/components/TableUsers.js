import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";

import "../App.scss";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../service/UserService";
import ModalAddNew from "./ModalAddNew.js";
import ModalEdit from "./ModalEdit.js";
import ModalComfirm from "./ModalComfirm";

const TableUsers = (props) => {
  const [listUsers, setListUser] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalComfirm, setIsShowModalComfirm] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});

  useEffect(() => {
    getUsers(1);
  }, []);

  const handleCloseModalAddNew = () => setIsShowModalAddNew(false);
  const handleCloseModalEdit = () => setIsShowModalEdit(false);
  const handleCloseModalComfirm = () => setIsShowModalComfirm(false);

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

  const handleUpdateUser = (user) => {
    setListUser([user, ...listUsers]);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalComfirm(true);
    setDataUserDelete(user);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUser(cloneListUsers);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUser(cloneListUsers);
  };

  return (
    <>
      <div className="d-flex justify-content-between my-3">
        <span>
          <h4>List Users:</h4>
        </span>
        <button
          onClick={() => setIsShowModalAddNew(true)}
          className="btn btn-success"
        >
          Add new user
        </button>
      </div>
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
                  <td className="">
                    <button
                      className="btn btn-warning mx-3 mt-5 align-item-center"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mt-5"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
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
      <ModalAddNew
        show={isShowModalAddNew}
        handleCloseModalAddNew={handleCloseModalAddNew}
        handleUpdateUser={handleUpdateUser}
      />

      <ModalEdit
        show={isShowModalEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalComfirm
        show={isShowModalComfirm}
        handleCloseModalComfirm={handleCloseModalComfirm}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default TableUsers;
