import React, { useState, useEffect } from "react";
import axios from "axios";




const Form = ({ setFullData }) => {
  const [formData, setFormData] = useState({
    clientID: "",
    deviceMapID: "",
    devices: [],
    total_kwh: "",
    ac_run_hrs: "",
    ac_fan_hrs: "",
    algo_status: "0", // Default selection
    billing_ammount: "",
    cost_reduction: "",
    energy_savings: {
      savings_percent: "",
      ref_kwh: "",
      us_meter: "",
      us_calc: "",
      inv_factor: "",
    },
    mitigated_co2: "",
    weather: {
      max_temp: "",
      min_temp: "",
    },
  });

  const [serialNo, setSerialNo] = useState("");

  useEffect(() => {
    const generateSerialNo = Math.floor(100000 + Math.random() * 900000);
    setSerialNo(generateSerialNo);

    // Fetch full data immediately
    fetchFullData();
  }, []);

  const fetchFullData = async () => {
    try {
      const response = await axios.get(
        "https://ennery-chart.onrender.com/api/chart-data/fetch"
      );
      setFullData(response.data); // Pass fetched full data to parent component
    } catch (error) {
      console.error("Error fetching full data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prevState) => {
        const nestedField = { ...prevState[keys[0]] };
        nestedField[keys[1]] = value;
        return { ...prevState, [keys[0]]: nestedField };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = { ...formData, serialNo };

    try {
      await axios.post(
        "https://ennery-chart.onrender.com/api/chart-data/import",
        dataToSubmit,
        { headers: { "Content-Type": "application/json" } }
      );

      // Fetch the latest full data
      fetchFullData();

      // Optionally, reset form fields
      setFormData({
        clientID: "",
        deviceMapID: "",
        devices: [],
        total_kwh: "",
        ac_run_hrs: "",
        ac_fan_hrs: "",
        algo_status: "0",
        billing_ammount: "",
        cost_reduction: "",
        energy_savings: {
          savings_percent: "",
          ref_kwh: "",
          us_meter: "",
          us_calc: "",
          inv_factor: "",
        },
        mitigated_co2: "",
        weather: {
          max_temp: "",
          min_temp: "",
        },
      });
    } catch (error) {
      console.error("Error submitting data:", error.response || error.message);
    }
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
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
              Client ID:
            </label>
            <input
              type="text"
              name="clientID"
              value={formData.clientID}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Device Map ID:
            </label>
            <input
              type="text"
              name="deviceMapID"
              value={formData.deviceMapID}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Devices:
            </label>
            <input
              type="text"
              name="devices"
              value={formData.devices}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                AC Run Hours:
              </label>
              <input
                type="number"
                name="ac_run_hrs"
                value={formData.ac_run_hrs}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                AC Fan Hours:
              </label>
              <input
                type="number"
                name="ac_fan_hrs"
                value={formData.ac_fan_hrs}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Algorithm Status:
              </label>
              <select
                name="algo_status"
                value={formData.algo_status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="0">Energy Saving Mode Off</option>
                <option value="1">Energy Saving Mode On</option>
              </select>
            </div>
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
