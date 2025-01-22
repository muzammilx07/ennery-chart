import React, { useState } from "react";
import EnergyBarChart from "./components/EnergyBarChart";
import Form from "./components/Form";

const App = () => {
  const [fullData, setFullData] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center min-w-screen">
      <div className="h-screen w-screen flex justify-center items-center">
        
        <EnergyBarChart fullData={fullData} />
      </div>
      <Form setFullData={setFullData} />
    </div>
  );
};

export default App;
