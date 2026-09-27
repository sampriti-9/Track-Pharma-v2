import React from "react";
import { ethers } from "ethers";

const ConnectWallet = ({ setAccount }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <button onClick={connectWallet}>🦊 Connect Wallet</button>
    </div>
  );
};

export default ConnectWallet;
