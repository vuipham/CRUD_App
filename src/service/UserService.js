import instance from "./customizeAxios.js";

const fetchAllUsers = (page) => {
  return instance.get(`/api/users?page=${page}`);
};

export { fetchAllUsers };
