import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";

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
  const [sortBy, setSortBy] = useState("esc");
  const [sortField, setSortField] = useState("");
  // const [keyword, setKeyword] = useState("");
  const [exportData, setExportData] = useState([]);

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

  const handleSort = (sortField, sortBy) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUser(cloneListUsers);
  };

  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(term)
      );
      setListUser(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 500);

  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setExportData(result);
      done();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between my-3 position-relative">
        <div>
          <span>
            <h4>List Users:</h4>
          </span>
        </div>
        <div className="position-absolute top-50 end-0">
          <label htmlFor="test" className="btn btn-warning">
            Import
          </label>
          <input id="test" type="file" hidden />
          <CSVLink
            data={exportData}
            filename={"my-file.csv"}
            className="btn btn-primary mx-2"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            Export
          </CSVLink>
          <button
            onClick={() => setIsShowModalAddNew(true)}
            className="btn btn-success"
          >
            Add new
          </button>
        </div>
      </div>
      <div className="mb-4">
        <input
          // value={keyword}
          onChange={(e) => handleSearch(e)}
          style={{ width: "300px", padding: "3px 5px" }}
          placeholder="Search by email..."
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="d-flex justify-content-between">
                ID
                <div>
                  <i
                    className="fa-solid fa-arrow-up mx-2"
                    onClick={() => handleSort("id", "esc")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("id", "desc")}
                  ></i>
                </div>
              </div>
            </th>
            <th>
              <div className="d-flex justify-content-between">Email</div>
            </th>
            <th>
              <div className="d-flex justify-content-between">
                First name
                <div>
                  <i
                    className="fa-solid fa-arrow-up mx-2"
                    onClick={() => handleSort("first_name", "esc")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("first_name", "desc")}
                  ></i>
                </div>
              </div>
            </th>
            <th>Last Name</th>
            <th>Avartar</th>
            <th>Action</th>
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
