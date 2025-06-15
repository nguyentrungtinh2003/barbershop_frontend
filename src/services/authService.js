import axios from "../utils/axiosInstance";

export async function login(phoneNumber, password) {
  const res = await axios.post(
    `/login`,
    { phoneNumber, password },
    {
      withCredentials: true,
    }
  );

  if (res.data.statusCode === 200) {
    const user = res.data.data;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
}
