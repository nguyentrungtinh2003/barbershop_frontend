import instance from "../utils/axiosInstance";

export async function login(username, password) {
  const res = await instance.post(
    `/login`,
    { username, password },
    {
      withCredentials: true,
    }
  );

  if (res.data.statusCode === 200) {
    const user = res.data.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", res.data.token);

    return user;
  }
}

export async function forgot({ email, otp, password }) {
  const res = await instance.post(
    `/forgot-password`,
    { email, otp, password },
    {
      withCredentials: true,
    }
  );

  if (res.data.statusCode === 200) {
    const user = res.data.data;

    return user;
  }
}

export async function reset({ email, otp, password }) {
  const res = await instance.post(
    `/reset-password`,
    { email, otp, password },
    {
      withCredentials: true,
    }
  );

  if (res.data.statusCode === 200) {
    const user = res.data.data;

    return user;
  }
}
