import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ setFullData }) => {
  const [formData, setFormData] = useState({
    accessTime: "",
    accessDate: "",
    algo_status: "0",
    total_kwh: "",
  });

  const [serialNo, setSerialNo] = useState("");

  useEffect(() => {
    const generateSerialNo = () =>
      Math.floor(100000 + Math.random() * 900000).toString();
    setSerialNo(generateSerialNo);
    fetchFullData();
  }, []);

  const fetchFullData = async () => {
    try {
      const response = await axios.get(
        "https://ennery-chart.onrender.com/api/chart-data/fetch"
      );
      const transformedData = response.data.map((d) => ({
        ...d,
        createdAt: new Date(d.createdAt.$date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }));
      setFullData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      serialNo: serialNo,
      clientID: "64ba1aedf4bfdb003572d56a",
      deviceMapID: "64dcb84fb1a15041673d8e91",
      devices: ["64dcb2eff4b9f70034e50a7c"],
      total_kwh: parseFloat(formData.total_kwh) || 0,
      ac_run_hrs: 1.48,
      ac_fan_hrs: 0,
      algo_status: formData.algo_status === "1" ? 1 : 0,
      billing_ammount: 40.25,
      cost_reduction: 0,
      energy_savings: {
        savings_percent: 0,
        ref_kwh: 0,
        us_meter: 0,
        us_calc: 0,
        inv_factor: 0,
      },
      mitigated_co2: 0,
      weather: {
        max_temp: 28.9,
        min_temp: 27.2,
      },
    };

    try {
      await axios.post(
        "https://ennery-chart.onrender.com/api/chart-data/import",
        dataToSubmit,
        { headers: { "Content-Type": "application/json" } }
      );
      fetchFullData();
      setFormData({
        accessTime: "",
        accessDate: "",
        algo_status: "0",
        total_kwh: "",
      });
    } catch (error) {
      console.error(
        "Error submitting data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          Chart Data Submission Form
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Serial No:
            </label>
            <input
              type="text"
              value={serialNo}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Access Time:
            </label>
            <input
              type="time"
              name="accessTime"
              value={formData.accessTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Access Date:
            </label>
            <input
              type="date"
              name="accessDate"
              value={formData.accessDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Energy Saving Mode:
            </label>
            <select
              name="algo_status"
              value={formData.algo_status}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            >
              <option value="0">Energy Saving Mode Off</option>
              <option value="1">Energy Saving Mode On</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Total kWh:
            </label>
            <input
              type="number"
              name="total_kwh"
              value={formData.total_kwh}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
