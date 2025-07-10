import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { getAppointmentByShopIdAndIsPaid } from "../../services/appointmentService";
import { useParams } from "react-router-dom";

export default function Payments() {
  const { id } = useParams();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);

    const res = await getAppointmentByShopIdAndIsPaid(id);
    const appointments = res.data.data;
    console.log(appointments);

    // Group doanh thu theo tháng + năm
    const revenueByMonth = {};

    appointments.forEach((appt) => {
      const dateArray = appt.createdAt; // năm, tháng, ngày
      const date = dayjs(`${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`);

      const month = dayjs(date).format("MM/YYYY");

      if (!revenueByMonth[month]) {
        revenueByMonth[month] = 0;
      }

      revenueByMonth[month] += appt.price;
    });

    const chartData = Object.entries(revenueByMonth).map(
      ([month, revenue]) => ({
        month,
        revenue,
      })
    );

    // Sort đúng theo thời gian
    chartData.sort(
      (a, b) =>
        dayjs(a.month, "MM/YYYY").toDate() - dayjs(b.month, "MM/YYYY").toDate()
    );

    setPayments(chartData);
    console.log(chartData);
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-6 mx-auto bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen text-white font-vietnam">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        Biểu đồ doanh thu hàng tháng
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={payments}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderColor: "#facc15",
            }}
            labelStyle={{ color: "#facc15" }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#facc15"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
