import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Scale } from "lucide-react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../utils/config";
import GPSMap from "../GPSMap";

const RegulatorDashboard = ({ account }) => {
  const [batchId, setBatchId] = useState("");
  const [details, setDetails] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setContract(new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
    };
    init();
  }, []);

  const fetchRecord = async () => {
    if (!batchId) return alert("Enter Batch ID!");
    try {
      setLoading(true);
      const d = await contract.getMedicine(batchId);
      setDetails({
        name: d[0], batchId: d[1], manufacturer: d[2],
        distributor: d[3], quantity: d[5].toString(),
        verified: d[8], regulatorRemarks: d[9],
      });
    } catch {
      alert("❌ Record not found!");
    } finally {
      setLoading(false);
    }
  };

  const verify = async (approve) => {
    if (!batchId) return alert("Enter Batch ID!");
    try {
      setLoading(true);
      const tx = await contract.verifyByRegulator(batchId, approve, remarks);
      await tx.wait();
      alert("✅ Verification recorded!");
      fetchRecord();
    } catch {
      alert("❌ Verification failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1><Scale className="header-icon" /> Regulator Dashboard</h1>
        <p>Connected Wallet: {account}</p>
      </header>

      <div className="dashboard-card">
        <h2>Audit & Verify Records</h2>
        <input value={batchId} onChange={(e) => setBatchId(e.target.value)} placeholder="Enter Batch ID" />
        <button onClick={fetchRecord} className="primary-btn" disabled={loading}>Fetch Details</button>
      </div>

      {details && (
        <div className="dashboard-card result-card">
          <h3>Medicine Details</h3>
          <p><b>Name:</b> {details.name}</p>
          <p><b>Batch:</b> {details.batchId}</p>
          <p><b>Manufacturer:</b> {details.manufacturer}</p>
          <p><b>Distributor:</b> {details.distributor}</p>
          <p><b>Quantity:</b> {details.quantity}</p>
          <textarea placeholder="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
          <div className="button-row">
            <button onClick={() => verify(true)} className="primary-btn">✅ Verify</button>
            <button onClick={() => verify(false)} className="secondary-btn">❌ Reject</button>
          </div>
        </div>
      )}
            <div className="dashboard-card">
        <h2>Live GPS Tracking</h2>
        <GPSMap />
      </div>
    </div>

  );
};

export default RegulatorDashboard;
