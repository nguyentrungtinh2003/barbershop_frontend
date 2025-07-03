import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, restoreUser } from "../../services/userServices";
import { getShopsById } from "../../services/shopServices";
import { getFeedbackByShopId } from "../../services/feedbackServices";
import {
  FaTrashAlt,
  FaEdit,
  FaPlus,
  FaLock,
  FaLockOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
} from "react-icons/fa";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import AddService from "./AddService";
import EditService from "./EditService";
import { useParams } from "react-router-dom";

export default function OwnerUser() {
  const [users, setUsers] = useState([]);
  const [shop, setShop] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModalUser, setShowAddModalUser] = useState(false);
  const [showEditModalUser, setShowEditModalUser] = useState(false);
  const [showAddModalService, setShowAddModalService] = useState(false);
  const [showEditModalService, setShowEditModalService] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const { id } = useParams();

  const fetchShop = async () => {
    setLoading(true);
    try {
      const res = await getShopsById(parseInt(id));
      const shop = res.data.data;
      setShop(shop);
      setUsers(res.data.data.barbers);

      const feedbacks = await getFeedbackByShopId(shop.id);

      setFeedbacks(feedbacks?.data?.data);
    } catch (error) {
      console.error("Lỗi khi lấy shop:", error);
    }
    setLoading(false);
  };

  // const fetchUsers = async () => {
  //   // Tái lấy danh sách user từ shop
  //   fetchShop();
  // };

  useEffect(() => {
    fetchShop();
  }, []);

  console.log(feedbacks);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá dịch vụ này?")) {
      await deleteService(id);
      fetchServices();
    }
  };

  return (
    <div className="p-6 mx-auto bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      {/* THÔNG TIN SHOP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-gray-900 p-6 rounded-xl border border-yellow-400 shadow-lg">
        {/* Ảnh shop */}
        <div className="md:col-span-1 flex justify-center">
          <div className="w-52 h-52 rounded-xl overflow-hidden shadow-md border border-yellow-300">
            {shop.img ? (
              <img
                src={shop.img}
                alt="Shop"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-300">
                Không có ảnh
              </div>
            )}
          </div>
        </div>

        {/* Thông tin shop */}
        <div className="md:col-span-2 space-y-2">
          {/* Hình ảnh shop */}

          <img
            src={shop.shopImg}
            alt={shop.name}
            className="w-full max-h-64 object-cover rounded-xl mb-3"
          />

          {/* Tên shop */}
          <p className="text-2xl font-bold text-yellow-400">{shop.name}</p>

          {/* Slogan */}
          {shop.slogan && (
            <p className="text-sm italic text-yellow-300">"{shop.slogan}"</p>
          )}

          {/* Mô tả */}
          <p className="text-sm text-gray-300">{shop.description}</p>

          {/* Thông tin chủ shop */}
          {shop?.owner?.username && (
            <div className="flex items-center gap-3 mt-2">
              {shop.ownerImg && (
                <img
                  src={shop.owner.img || "/user.jpg"}
                  alt={shop?.owner?.username}
                  className="w-10 h-10 rounded-full object-cover border"
                />
              )}
              <span className="text-sm text-white">
                Chủ shop: {shop?.owner?.username}
              </span>
            </div>
          )}

          {/* Địa chỉ, email, sđt */}
          <div className="space-y-1 mt-2">
            <p>
              <span className="font-semibold text-white">Địa chỉ:</span>{" "}
              {shop.address}
            </p>
            <p>
              <span className="font-semibold text-white">Email:</span>{" "}
              {shop.email}
            </p>
            <p>
              <span className="font-semibold text-white">SĐT:</span>{" "}
              {shop.phoneNumber}
            </p>
          </div>
        </div>
      </div>
      <p className="m-2 text-xl font-semibold">Quản lí Barber</p>
      {/* NÚT THÊM */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowAddModalUser(true)}
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl hover:bg-yellow-500 flex items-center gap-2 shadow"
        >
          <FaPlus />
          Thêm Barber
        </button>
      </div>

      {/* BẢNG BARBER */}
      {loading ? (
        <div className="text-center text-gray-300">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-700">
          <table className="w-full text-sm text-left text-white bg-gray-800">
            <thead className="text-xs uppercase bg-yellow-400 text-black">
              <tr>
                <th className="px-6 py-3">Tên</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">SDT</th>
                <th className="px-6 py-3">Hình</th>
                <th className="px-6 py-3">Vai trò</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-700 ${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } hover:bg-gray-700 transition`}
                >
                  <td className="px-6 py-4 font-medium">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4">
                    <img
                      src={user.img || "/user.jpg"}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 capitalize">{user.roleEnum}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        !user.deleted
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {!user.deleted ? (
                        <FaCheckCircle className="text-lg" />
                      ) : (
                        <FaTimesCircle className="text-lg" />
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowEditModalUser(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </button>
                    {user.deleted === false ? (
                      <button
                        onClick={async () => {
                          await deleteUser(user.id);
                          fetchUsers();
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                        title="Khoá"
                      >
                        <FaLock />
                      </button>
                    ) : (
                      <button
                        onClick={async () => {
                          await restoreUser(user.id);
                          fetchUsers();
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                        title="Mở khoá"
                      >
                        <FaLockOpen />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-400">
                    Không có người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <p className="m-2 text-xl font-semibold">Quản lí Dịch vụ</p>
      {/* NÚT THÊM SERVICE*/}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowAddModalService(true)}
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl hover:bg-yellow-500 flex items-center gap-2 shadow"
        >
          <FaPlus />
          Thêm dịch vụ
        </button>
      </div>
      {/* BẢNG SERVICE */}
      {loading ? (
        <div className="text-center text-gray-300">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-700">
          <table className="w-full text-sm text-left text-white bg-gray-800">
            <thead className="text-xs uppercase bg-yellow-400 text-black">
              <tr>
                <th className="px-6 py-3">Tên</th>
                <th className="px-6 py-3">Mô tả</th>
                <th className="px-6 py-3">Giá</th>
                <th className="px-6 py-3">Hình</th>
                <th className="px-6 py-3">Thời lượng</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {shop?.services?.map((service, index) => (
                <tr
                  key={service.id}
                  className={`border-b border-gray-700 ${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } hover:bg-gray-700 transition`}
                >
                  <td className="px-6 py-4 font-medium">{service.name}</td>
                  <td className="px-6 py-4">{service.description}</td>
                  <td className="px-6 py-4">{service.price} VND</td>
                  <td className="px-6 py-4">
                    <img src={service.img} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {service.duration} Phút
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        !service.deleted
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {!service.deleted ? (
                        <FaCheckCircle className="text-lg" />
                      ) : (
                        <FaTimesCircle className="text-lg" />
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedService(service);
                        setShowEditModalService(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </button>
                    {service.deleted === false ? (
                      <button
                        onClick={async () => {
                          await handleDelete(service.id);
                          fetchUsers();
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                        title="Khoá"
                      >
                        <FaLock />
                      </button>
                    ) : (
                      <button
                        onClick={async () => {
                          await restoreService(service.id);
                          fetchUsers();
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                        title="Mở khoá"
                      >
                        <FaLockOpen />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-400">
                    Không có người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <p className="m-2 text-xl font-semibold">Danh sách đánh giá</p>
      {/* BẢNG FEEDBACK */}
      {loading ? (
        <div className="text-center text-gray-300">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-700">
          <table className="w-full text-sm text-left text-white bg-gray-800">
            <thead className="text-xs uppercase bg-yellow-400 text-black">
              <tr>
                <th className="px-6 py-3">Tên khách hàng</th>
                <th className="px-6 py-3">Nội dung</th>
                <th className="px-6 py-3">Đánh giá</th>
                <th className="px-6 py-3">Hình</th>
                <th className="px-6 py-3">Barber</th>
                <th className="px-6 py-3">Shop</th>
                <th className="px-6 py-3">Ngày</th>
                {/* <th className="px-6 py-3 text-center">Hành động</th> */}
              </tr>
            </thead>
            <tbody>
              {feedbacks?.map((feedback, index) => (
                <tr
                  key={feedback.id}
                  className={`border-b border-gray-700 ${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                  } hover:bg-gray-700 transition`}
                >
                  <td className="px-6 py-4 font-medium">
                    {feedback.customerName}
                  </td>
                  <td className="px-6 py-4">{feedback.comment}</td>
                  <td className="px-6 py-4 text-yellow-500 flex items-center gap-1">
                    {feedback.rating} <FaStar />
                  </td>

                  <td className="px-6 py-4">
                    <img
                      src={feedback.img}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {feedback.barberName}
                  </td>
                  <td className="px-6 py-4 capitalize">{feedback.shopName}</td>
                  <td className="px-6 py-4 capitalize">{feedback.createAt}</td>
                  {/* <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        !feedback.deleted
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {!service.deleted ? (
                        <FaCheckCircle className="text-lg" />
                      ) : (
                        <FaTimesCircle className="text-lg" />
                      )}
                    </span>
                  </td> */}
                  {/* <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedService(service);
                        setShowEditModalService(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded"
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </button>
                    {service.deleted === false ? (
                      <button
                        onClick={async () => {
                          await handleDelete(service.id);
                          fetchUsers();
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                        title="Khoá"
                      >
                        <FaLock />
                      </button>
                    ) : (
                      <button
                        onClick={async () => {
                          await restoreService(service.id);
                          fetchUsers();
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                        title="Mở khoá"
                      >
                        <FaLockOpen />
                      </button>
                    )}
                  </td> */}
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-400">
                    Không có người dùng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal Thêm */}
      {showAddModalUser && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50">
          <div className="bg-black border border-yellow-400 p-6 rounded-lg w-full max-w-xl text-white shadow-xl">
            <AddUser
              onClose={() => {
                setShowAddModalUser(false);
                fetchUsers();
              }}
            />
          </div>
        </div>
      )}

      {/* Modal Sửa */}
      {showEditModalUser && selectedUser && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50">
          <div className="bg-black border border-yellow-400 p-6 rounded-lg w-full max-w-xl text-white shadow-xl">
            <EditUser
              user={selectedUser}
              onClose={() => {
                setShowEditModalUser(false);
                setSelectedUser(null);
                fetchUsers();
              }}
            />
          </div>
        </div>
      )}

      {/* Modal Thêm */}
      {showAddModalService && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50">
          <div className="bg-black border border-yellow-400 p-6 rounded-lg w-full max-w-xl text-white shadow-xl">
            <AddService
              onClose={() => {
                setShowAddModalService(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Modal Sửa */}
      {showEditModalService && selectedService && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50">
          <div className="bg-black border border-yellow-400 p-6 rounded-lg w-full max-w-xl text-white shadow-xl">
            <EditService
              user={selectedService}
              onClose={() => {
                setShowEditModalService(false);
                setSelectedService(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
