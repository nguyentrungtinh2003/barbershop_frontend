import React, { useEffect, useState } from "react";
import { getServices, deleteService } from "../../services/serviceServices";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import AddService from "./AddService";
import EditService from "./EditService";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await getServices();
      setServices(res.data);
    } catch (error) {
      console.error("Lỗi khi tải dịch vụ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá dịch vụ này?")) {
      await deleteService(id);
      fetchServices();
    }
  };

  return (
    <div className="p-6 mx-auto bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-400">Quản lý dịch vụ</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl hover:bg-yellow-500 flex items-center gap-2 shadow"
        >
          <FaPlus />
          Thêm dịch vụ
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-300">Đang tải...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-black/20 rounded-xl overflow-hidden shadow-lg">
            <thead className="text-xs uppercase bg-yellow-400 text-black">
              <tr>
                <th className="px-6 py-3">Tên dịch vụ</th>
                <th className="px-6 py-3">Mô tả</th>
                <th className="px-6 py-3">Giá</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="px-6 py-4 font-medium">{service.name}</td>
                  <td className="px-6 py-4">{service.description}</td>
                  <td className="px-6 py-4">{service.price} VNĐ</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        service.status === "available"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {service.status === "available"
                        ? "Sẵn sàng"
                        : "Tạm ngừng"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setSelectedService(service);
                        setShowEditModal(true);
                      }}
                      className="text-yellow-300 hover:text-yellow-500 transition"
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-400 hover:text-red-600 transition"
                      title="Xoá"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
                    Không có dịch vụ nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Thêm */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50">
          <div className="bg-black border border-yellow-400 p-6 rounded-lg w-full max-w-xl text-white shadow-xl">
            <AddService
              onClose={() => {
                setShowAddModal(false);
                fetchServices();
              }}
            />
          </div>
        </div>
      )}

      {/* Modal Sửa */}
      {showEditModal && selectedService && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex justify-center items-center z-50">
          <div className="bg-black border border-yellow-400 p-6 rounded-lg w-full max-w-xl text-white shadow-xl">
            <EditService
              service={selectedService}
              onClose={() => {
                setShowEditModal(false);
                setSelectedService(null);
                fetchServices();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
