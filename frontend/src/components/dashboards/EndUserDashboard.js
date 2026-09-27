import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { UserCheck, Search } from "lucide-react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../utils/config";
import GPSMap from "../GPSMap";

const EndUserDashboard = ({ account }) => {
  const [batchId, setBatchId] = useState("");
  const [medicine, setMedicine] = useState(null);
  const [qty, setQty] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setContract(new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
    };
    init();
  }, []);

  const trackMedicine = async () => {
    if (!batchId) return alert("Enter Batch ID!");
    try {
      setLoading(true);
      const d = await contract.getMedicine(batchId);
      setMedicine({
        name: d[0],
        manufacturer: d[2],
        distributor: d[3],
        verified: d[8],
        endUserReceived: d[10],
        quantity: d[5].toString(),
      });
    } catch {
      alert("❌ Not found!");
    } finally {
      setLoading(false);
    }
  };

  const confirmReceipt = async (received) => {
    if (!batchId) return alert("Enter Batch ID");
    if (received && (!qty || !date)) return alert("Enter quantity & date");
    try {
      setLoading(true);
      const unix = received ? Math.floor(new Date(date).getTime() / 1000) : 0;
      const q = received ? ethers.BigNumber.from(qty) : 0;
      const tx = await contract.confirmReceipt(batchId, received, q, unix);
      await tx.wait();
      alert("✅ Status recorded!");
      trackMedicine();
    } catch {
      alert("❌ Transaction failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1><UserCheck className="header-icon" /> End User Dashboard</h1>
        <p>Connected Wallet: {account}</p>
      </header>

      <div className="dashboard-card">
        <h2>Track & Confirm Medicine</h2>
        <div className="input-grid">
          <input placeholder="Batch ID" value={batchId} onChange={(e)=>setBatchId(e.target.value)} />
          <button className="primary-btn" onClick={trackMedicine} disabled={loading}>
            {loading ? "Loading..." : <><Search /> Track</>}
          </button>
        </div>

        {medicine && (
          <div className="result-card">
            <h3>Medicine Info</h3>
            <p><b>Name:</b> {medicine.name}</p>
            <p><b>Manufacturer:</b> {medicine.manufacturer}</p>
            <p><b>Distributor:</b> {medicine.distributor}</p>
            <p><b>Quantity:</b> {medicine.quantity}</p>
            <p><b>Regulator Verified:</b> {medicine.verified ? "✅ Yes" : "❌ No"}</p>
            <div className="input-grid">
              <input type="number" placeholder="Received Quantity" value={qty} onChange={(e)=>setQty(e.target.value)} />
              <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
            </div>
            <div className="button-row">
              <button className="primary-btn" onClick={()=>confirmReceipt(true)}>✅ Received</button>
              <button className="secondary-btn" onClick={()=>confirmReceipt(false)}>❌ Not Received</button>
            </div>
          </div>
        )}
      </div>
            <div className="dashboard-card">
        <h2>Live GPS Tracking</h2>
        <GPSMap />
      </div>
    </div>
  );
};

export default EndUserDashboard;
