import axios from "../utils/axiosInstance";

export async function login(email) {
  const res = await axios.get(`/users?email=${email}`);
  const user = res.data[0];

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } else {
    throw new Error("Sai thông tin đăng nhập");
  }
}
