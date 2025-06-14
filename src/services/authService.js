import axios from "../utils/axiosInstance";

export async function login(phone, password) {
  const res = await axios.get(`/users?phone=${phone}`);
  const user = res.data[0];

  if (user && user.password === password) {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } else {
    throw new Error("Sai số điện thoại hoặc mật khẩu");
  }
}

