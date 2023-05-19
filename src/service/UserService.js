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

export { fetchAllUsers, createUser, editUser };
