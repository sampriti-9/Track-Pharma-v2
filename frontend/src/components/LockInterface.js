import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/config";
import { Package, Plus, Search, Truck } from "lucide-react";

const LockInterface = ({ account }) => {
  const [activeTab, setActiveTab] = useState("register");
  const [formData, setFormData] = useState({
    name: "",
    batchId: "",
    manufacturer: "",
    currentLocation: "",
  });
  const [searchId, setSearchId] = useState("");
  const [medicine, setMedicine] = useState(null);
  const [allBatchIds, setAllBatchIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);

  //  Connect to contract when wallet is connected
  useEffect(() => {
    const initContract = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const registryContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );
        setContract(registryContract);
        console.log("✅ Connected to contract:", CONTRACT_ADDRESS);
      }
    };
    initContract();
  }, []);

  //  Register a new medicine on blockchain
  const handleRegister = async () => {
    if (
      !formData.name ||
      !formData.batchId ||
      !formData.manufacturer ||
      !formData.currentLocation
    ) {
      alert("⚠️ Please fill all fields before registering.");
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.registerMedicine(
        formData.name,
        formData.batchId,
        formData.manufacturer,
        formData.currentLocation
      );
      await tx.wait();
      alert("✅ Medicine registered successfully!");
      setFormData({ name: "", batchId: "", manufacturer: "", currentLocation: "" });
    } catch (error) {
      console.error(error);
      alert("❌ Error registering medicine. Check console.");
    } finally {
      setLoading(false);
    }
  };

  //  Fetch medicine details by Batch ID
  const handleSearch = async () => {
    if (!searchId) {
      alert("Enter a Batch ID to search.");
      return;
    }
    try {
      setLoading(true);
      const data = await contract.getMedicine(searchId);
      const medData = {
        name: data[0],
        batchId: data[1],
        manufacturer: data[2],
        currentLocation: data[3],
        status: data[4],
        timestamp: new Date(Number(data[5]) * 1000).toLocaleString(),
      };
      setMedicine(medData);
    } catch (error) {
      console.error(error);
      alert("❌ Medicine not found on blockchain.");
      setMedicine(null);
    } finally {
      setLoading(false);
    }
  };

  //  Fetch all registered Batch IDs
  const fetchAllMedicines = async () => {
    try {
      setLoading(true);
      const batchIds = await contract.getAllBatchIds();
      setAllBatchIds(batchIds);
    } catch (error) {
      console.error("Error fetching batch IDs:", error);
    } finally {
      setLoading(false);
    }
  };

  // UI Section
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <Package className="icon" />
          <h1>Narkos — Medicine Registry</h1>
        </div>
        <p>Connected Wallet: {account.slice(0, 6)}...{account.slice(-4)}</p>
      </header>

      {/* Tabs */}
      <div className="tabs">
        <button
          onClick={() => setActiveTab("register")}
          className={activeTab === "register" ? "active" : ""}
        >
          <Plus /> Register
        </button>
        <button
          onClick={() => setActiveTab("track")}
          className={activeTab === "track" ? "active" : ""}
        >
          <Search /> Track
        </button>
        <button
          onClick={() => {
            setActiveTab("all");
            fetchAllMedicines();
          }}
          className={activeTab === "all" ? "active" : ""}
        >
          <Truck /> All Products
        </button>
      </div>

      {/* Register Form */}
      {activeTab === "register" && (
        <div className="card">
          <h2>Register New Product</h2>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Batch ID"
              value={formData.batchId}
              onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
            />
            <input
              type="text"
              placeholder="Manufacturer"
              value={formData.manufacturer}
              onChange={(e) =>
                setFormData({ ...formData, manufacturer: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Current Location"
              value={formData.currentLocation}
              onChange={(e) =>
                setFormData({ ...formData, currentLocation: e.target.value })
              }
            />
          </div>
          <button onClick={handleRegister} disabled={loading}>
            {loading ? "⏳ Registering..." : "Register on Blockchain"}
          </button>
        </div>
      )}

      {/* Track Medicine */}
      {activeTab === "track" && (
        <div className="card">
          <h2>Track Product</h2>
          <input
            type="text"
            placeholder="Enter Batch ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? "🔍 Searching..." : "Search"}
          </button>

          {medicine && (
            <div className="details">
              <h3>Medicine Details</h3>
              <p><b>Name:</b> {medicine.name}</p>
              <p><b>Batch ID:</b> {medicine.batchId}</p>
              <p><b>Manufacturer:</b> {medicine.manufacturer}</p>
              <p><b>Location:</b> {medicine.currentLocation}</p>
              <p><b>Status:</b> {medicine.status}</p>
              <p><b>Timestamp:</b> {medicine.timestamp}</p>
            </div>
          )}
        </div>
      )}

      {/* All Medicines */}
      {activeTab === "all" && (
        <div className="card">
          <h2>All Registered Medicines</h2>
          {loading ? (
            <p>⏳ Loading...</p>
          ) : (
            <ul>
              {allBatchIds.length > 0 ? (
                allBatchIds.map((id, idx) => <li key={idx}>{id}</li>)
              ) : (
                <p>No medicines found on blockchain.</p>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default LockInterface;
