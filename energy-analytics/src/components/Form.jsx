import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ setFullData }) => {
  const [formData, setFormData] = useState({
    accessTime: "", // Time input
    accessDate: "", // Date input
    algo_status: "0", // Dropdown for Energy Saving Mode
    total_kwh: "", // Input for kWh
  });

  const [serialNo, setSerialNo] = useState("");

  useEffect(() => {
    // Generate a random serial number on mount
    const generateSerialNo = () =>
      Math.floor(100000 + Math.random() * 900000).toString();
    setSerialNo(generateSerialNo);

    fetchFullData();
  }, []);

  const fetchFullData = async () => {
    try {
      console.log("Fetching full data...");
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

      console.log("Fetched data:", transformedData);

      setFullData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Handling change: ${name} = ${value}`);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    // Prepare the data to be sent in the request
    const dataToSubmit = {
      serialNo: serialNo, // Random serial number
      clientID: "64ba1aedf4bfdb003572d56a", // Use static clientID, based on the provided test data
      deviceMapID: "64dcb84fb1a15041673d8e91", // Use static deviceMapID
      devices: ["64dcb2eff4b9f70034e50a7c"], // Use static device IDs
      total_kwh: parseFloat(formData.total_kwh) || 0, // Ensure that total_kwh is numeric
      ac_run_hrs: 1.48, // Use static data as provided in the example
      ac_fan_hrs: 0, // Static value
      algo_status: formData.algo_status === "1" ? 1 : 0, // Map '1' to active energy saving mode
      billing_ammount: 40.25, // Static value from test data
      cost_reduction: 0, // Static value
      energy_savings: {
        savings_percent: 0, // Static value
        ref_kwh: 0, // Static value
        us_meter: 0, // Static value
        us_calc: 0, // Static value
        inv_factor: 0, // Static value
      },
      mitigated_co2: 0, // Static value
      weather: {
        max_temp: 28.9, // Static value
        min_temp: 27.2, // Static value
      },
    };

    console.log("Data to submit:", dataToSubmit);

    try {
      // Perform the POST request to import data
      const response = await axios.post(
        "https://ennery-chart.onrender.com/api/chart-data/import",
        dataToSubmit,
        { headers: { "Content-Type": "application/json" } }
      );

      // Log the successful response
      console.log("Data successfully posted:", response.data);

      // Fetch updated data after the submission (useful for refreshing the view)
      fetchFullData();

      // Reset the form fields after submission
      setFormData({
        accessTime: "",
        accessDate: "",
        algo_status: "0", // Default algo_status
        total_kwh: "", // Reset the kWh value input
      });
    } catch (error) {
      // Log the error details
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
