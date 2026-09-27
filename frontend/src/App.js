import React, { useState } from "react";
import "./App.css";
import { Package, Shield, Truck, CheckCircle } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SelectRole from "./components/SelectRole";
import ManufacturerDashboard from "./components/dashboards/ManufacturerDashboard";
import DistributorDashboard from "./components/dashboards/DistributorDashboard";
import RegulatorDashboard from "./components/dashboards/RegulatorDashboard";
import EndUserDashboard from "./components/dashboards/EndUserDashboard";

const ConnectWallet = ({ setAccount }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="logo-section">
          <div className="logo-box">
            <Package className="logo-icon" />
          </div>
          <div>
            <h1 className="logo-title">Narkos</h1>
            <p className="logo-sub">Blockchain Medicine Tracker</p>
          </div>
        </div>

        <h2 className="hero-title">
          Transparency in <span className="highlight-green">healthcare</span>,<br />
          powered by <span className="highlight-teal">blockchain</span>
        </h2>

        <p className="hero-subtitle">
          Empowering healthcare through decentralization — the future of
          pharmaceutical supply chain management is here!
        </p>

        <button onClick={connectWallet} className="connect-button">
          Connect Wallet
        </button>

        <div className="features-grid">
          <div className="feature-card">
            <Shield className="feature-icon" />
            <h3>Secure Tracking</h3>
            <p>Blockchain-verified pharmaceutical tracking from source to delivery</p>
          </div>

          <div className="feature-card">
            <Truck className="feature-icon" />
            <h3>Supply Chain</h3>
            <p>Real-time visibility across the entire distribution network</p>
          </div>

          <div className="feature-card">
            <CheckCircle className="feature-icon" />
            <h3>Verified Products</h3>
            <p>Ensure authenticity and prevent counterfeit medications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Role Selection Wrapper for Navigation
function RoleSelector({ setRole, account }) {
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);

    switch (selectedRole) {
      case "Manufacturer":
        navigate("/manufacturer");
        break;
      case "Distributor":
        navigate("/distributor");
        break;
      case "Regulator":
        navigate("/regulator");
        break;
      case "EndUser":
        navigate("/enduser");
        break;
      default:
        navigate("/");
    }
  };

  return <SelectRole setRole={handleRoleSelection} account={account} />;
}

function App() {
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Step 1: Connect Wallet */}
          <Route
            path="/"
            element={
              !account ? (
                <ConnectWallet setAccount={setAccount} />
              ) : (
                <Navigate to="/select-role" />
              )
            }
          />

          {/* Step 2: Role Selection */}
          <Route
            path="/select-role"
  element={
    account ? (
      <SelectRole setRole={setRole} account={account} setAccount={setAccount} />
    ) : (
      <Navigate to="/" />
    )
            }
          />

          {/* Step 3: Role-based Dashboards */}
          <Route
            path="/manufacturer"
            element={
              role === "Manufacturer" ? (
                <ManufacturerDashboard account={account} />
              ) : (
                <Navigate to="/select-role" />
              )
            }
          />
          <Route
            path="/distributor"
            element={
              role === "Distributor" ? (
                <DistributorDashboard account={account} />
              ) : (
                <Navigate to="/select-role" />
              )
            }
          />
          <Route
            path="/regulator"
            element={
              role === "Regulator" ? (
                <RegulatorDashboard account={account} />
              ) : (
                <Navigate to="/select-role" />
              )
            }
          />
          <Route
            path="/enduser"
            element={
              role === "EndUser" ? (
                <EndUserDashboard account={account} />
              ) : (
                <Navigate to="/select-role" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
