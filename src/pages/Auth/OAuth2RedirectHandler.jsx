import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../services/userServices";
const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");

      if (token) {
        localStorage.setItem("token", token);

        try {
          const res = await getUserInfo();
          localStorage.setItem("user", JSON.stringify(res.data.data));
          console.log("User info:", res.data.data);

          navigate("/customer/dashboard");
        } catch (error) {
          console.error("Lỗi lấy thông tin người dùng:", error);
          // Bạn có thể redirect đến trang lỗi hoặc hiển thị thông báo
        }
      }
    };

    handleOAuthRedirect(); // gọi hàm async

    // Không cần return gì ở đây nếu không cleanup
  }, [navigate]);

  return <p>Đang đăng nhập bằng Google...</p>;
};

export default OAuth2RedirectHandler;
