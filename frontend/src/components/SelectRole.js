import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SelectRole = ({ setRole, setAccount }) => {
  const navigate = useNavigate();

  // ✅ Navigate based on selected role
  const handleSelect = (role) => {
    setRole(role);
    navigate(`/${role.toLowerCase()}`);
  };

  // ✅ Proper back navigation
  const handleBack = () => {
    setAccount(null); // clears wallet connection
    navigate("/"); // redirects to Connect Wallet
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        {/* 🔙 Floating back button */}
        <button className="back-btn" onClick={handleBack}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <h1 className="logo-title">Select Your Role</h1>
        <p className="hero-subtitle">
          Choose your role in the blockchain-based supply chain network.
        </p>

        <div className="features-grid">
          <button className="connect-button" onClick={() => handleSelect("Manufacturer")}>
            🏭 Manufacturer
          </button>
          <button className="connect-button" onClick={() => handleSelect("Distributor")}>
            🚚 Distributor
          </button>
          <button className="connect-button" onClick={() => handleSelect("Regulator")}>
            ⚖️ Regulator
          </button>
          <button className="connect-button" onClick={() => handleSelect("EndUser")}>
            🧑‍⚕️ End User
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
