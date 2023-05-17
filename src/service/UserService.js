import instance from "./customizeAxios.js";

const fetchAllUsers = () => {
  return instance.get("/api/users?page=1");
};

export { fetchAllUsers };
