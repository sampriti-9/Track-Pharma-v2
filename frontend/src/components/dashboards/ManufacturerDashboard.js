import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Package } from "lucide-react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../utils/config";
import GPSMap from "../GPSMap";

const ManufacturerDashboard = ({ account }) => {
  const [formData, setFormData] = useState({
    name: "",
    batchId: "",
    manufacturer: "",
    distributor: "",
    transportNumber: "",
    quantity: "",
    dispatchDate: "",
    location: "",
  });
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) {
        alert("⚠️ Please install MetaMask!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      if (network.chainId !== 80002) {
        alert("Switch MetaMask to Polygon Amoy Testnet!");
        return;
      }

      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setContract(contractInstance);
    };
    init();
  }, []);

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleRegister = async () => {
    const { name, batchId, manufacturer, distributor, transportNumber, quantity, dispatchDate, location } = formData;

    if (!name || !batchId || !manufacturer || !distributor || !transportNumber || !quantity || !dispatchDate || !location)
      return alert("⚠️ Please fill all fields!");

    try {
      setLoading(true);
      const unix = Math.floor(new Date(dispatchDate).getTime() / 1000);
      const tx = await contract.registerMedicine(
        name,
        batchId,
        manufacturer,
        distributor,
        transportNumber,
        ethers.BigNumber.from(quantity),
        unix,
        location
      );
      alert("⏳ Transaction sent! Waiting confirmation...");
      await tx.wait();
      alert("✅ Medicine registered successfully!");
      setFormData({
        name: "",
        batchId: "",
        manufacturer: "",
        distributor: "",
        transportNumber: "",
        quantity: "",
        dispatchDate: "",
        location: "",
      });
    } catch (err) {
      console.error("❌ Registration failed:", err);
      alert("❌ Transaction failed! Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1><Package className="header-icon" /> Manufacturer Dashboard</h1>
        <p>Connected Wallet: {account}</p>
      </header>

      <div className="dashboard-card">
        <h2>Register New Medicine</h2>
        <div className="input-grid">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              name={key}
              type={key.includes("Date") ? "date" : "text"}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
              value={formData[key]}
              onChange={handleChange}
            />
          ))}
        </div>
        <button className="primary-btn" onClick={handleRegister} disabled={loading}>
          {loading ? "⏳ Processing..." : "Register on Blockchain"}
        </button>
      </div>
      <div className="dashboard-card">
        <h2>Live GPS Tracking</h2>
        <GPSMap />
      </div>
    </div>
  );
};

export default ManufacturerDashboard;
