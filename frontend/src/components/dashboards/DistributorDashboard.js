import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Truck, Eye } from "lucide-react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../utils/config";
import GPSMap from "../GPSMap";

const DistributorDashboard = ({ account }) => {
  const [form, setForm] = useState({
    batchId: "",
    newLocation: "",
    newStatus: "",
    deliveryDate: "",
  });
  const [info, setInfo] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      if (network.chainId !== 80002) {
        alert("Switch to Polygon Amoy!");
        return;
      }
      setContract(new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
    };
    init();
  }, []);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const d = await contract.getMedicine(form.batchId);
      setInfo({
        name: d[0], batchId: d[1], manufacturer: d[2],
        distributor: d[3], transportNumber: d[4],
        quantity: d[5].toString(), currentLocation: d[9],
        verified: d[8], endUserReceived: d[10],
      });
    } catch {
      alert("❌ Record not found!");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    const { batchId, newLocation, newStatus } = form;
    if (!batchId || !newLocation || !newStatus)
      return alert("Fill all fields!");
    try {
      setLoading(true);
      const tx = await contract.updateStatus(batchId, newLocation, newStatus);
      await tx.wait();
      alert("✅ Status updated!");
      fetchStatus();
    } catch {
      alert("❌ Update failed!");
    } finally {
      setLoading(false);
    }
  };

  const setDelivered = async () => {
    if (!form.batchId || !form.deliveryDate) return alert("Enter Batch ID & Date");
    try {
      setLoading(true);
      const unix = Math.floor(new Date(form.deliveryDate).getTime() / 1000);
      const tx = await contract.setDeliveryDate(form.batchId, unix);
      await tx.wait();
      alert("✅ Delivery date set!");
      fetchStatus();
    } catch {
      alert("❌ Delivery update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1><Truck className="header-icon" /> Distributor Dashboard</h1>
        <p>Connected Wallet: {account}</p>
      </header>

      <div className="dashboard-card">
        <h2>Update Medicine Location / Status</h2>
        <div className="input-grid">
          <input name="batchId" placeholder="Batch ID" value={form.batchId} onChange={onChange} />
          <input name="newLocation" placeholder="New Location" value={form.newLocation} onChange={onChange} />
          <input name="newStatus" placeholder="Status (In Transit, Delivered...)" value={form.newStatus} onChange={onChange} />
          <input name="deliveryDate" type="date" value={form.deliveryDate} onChange={onChange} />
        </div>

        <div className="button-row">
          <button onClick={updateStatus} className="primary-btn" disabled={loading}>🚚 Update</button>
          <button onClick={fetchStatus} className="secondary-btn" disabled={loading}><Eye /> View</button>
          <button onClick={setDelivered} className="secondary-btn" disabled={loading}>📦 Set Delivery</button>
        </div>
      </div>

      {info && (
        <div className="dashboard-card result-card">
          <h3>📦 Medicine Details</h3>
          <p><b>Name:</b> {info.name}</p>
          <p><b>Batch ID:</b> {info.batchId}</p>
          <p><b>Distributor:</b> {info.distributor}</p>
          <p><b>Location:</b> {info.currentLocation}</p>
          <p><b>Status:</b> {form.newStatus}</p>
          <p><b>Verified:</b> {info.verified ? "✅ Yes" : "⏳ Pending"}</p>
        </div>
      )}
            <div className="dashboard-card">
        <h2>Live GPS Tracking</h2>
        <GPSMap />
      </div>
    </div>
  );
};

export default DistributorDashboard;
