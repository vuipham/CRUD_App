import instance from "./customizeAxios.js";

const fetchAllUsers = (page) => {
  return instance.get(`/api/users?page=${page}`);
};

const createUser = (name, job) => {
  return instance.post("/api/users", { name, job });
};

const editUser = (name, job) => {
  return instance.put("/api/users/", { name, job });
};

const deleteUser = (userId) => {
  return instance.delete(`/api/users/${userId}`);
};

const loginApi = (email, password) => {
  return instance.post("/api/login", {email, password});
};


export { fetchAllUsers, createUser, editUser, deleteUser, loginApi };
