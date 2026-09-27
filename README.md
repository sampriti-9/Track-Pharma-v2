# Track Pharma (Narkos)

## 📌 Overview

**Track Pharma (Narkos)** is a blockchain-based pharmaceutical and precursor supply-chain tracking system designed to provide secure, transparent, and tamper-resistant tracking of products throughout their journey from the manufacturer to the end user.

The system combines **Blockchain, Smart Contracts, React.js, Firebase, MetaMask, and IoT/GPS-based location tracking** to improve supply-chain visibility, accountability, and regulatory monitoring.

It records important supply-chain information on the blockchain and provides role-based access for different participants involved in the movement and monitoring of pharmaceutical/precursor products.

---

## 🎯 Problem Statement

The movement of pharmaceutical and chemical precursor products involves multiple participants and stages. Traditional tracking systems may face challenges such as:

- Lack of complete supply-chain transparency
- Difficulty in monitoring product movement
- Possibility of unauthorized modifications to records
- Limited visibility for regulatory authorities
- Difficulty in detecting unexpected route deviations
- Lack of a tamper-resistant record of transactions

Track Pharma addresses these challenges by using blockchain technology to maintain a transparent and tamper-resistant record of supply-chain activities.

---

## 💡 Proposed Solution

Track Pharma provides a decentralized tracking system where important supply-chain events can be recorded through **Solidity smart contracts**.

The system enables:

- Secure recording of product and transaction information
- Role-based access for supply-chain participants
- Blockchain-based verification of records
- Wallet-based authentication using MetaMask
- Product movement monitoring
- IoT/GPS-based location tracking
- Route-deviation detection
- Transparent access to relevant supply-chain information

---

## ✨ Key Features

### 🔐 Blockchain-Based Tracking

Supply-chain information is recorded using Solidity smart contracts deployed on the **Polygon Amoy Testnet**.

Blockchain provides a tamper-resistant record of important transactions and product movements.

### 👥 Role-Based Access

The system supports different participants in the supply chain, including:

- Manufacturer
- Distributor
- Regulatory Officer
- End User

Each participant can access functionality according to their role.

### 🦊 MetaMask Integration

MetaMask is used to connect users' wallets with the blockchain application and interact with deployed smart contracts.

### 📍 IoT & GPS Tracking

The system can integrate GPS-enabled IoT devices to monitor the movement of products during transportation.

GPS-based tracking can be used to:

- Monitor product location
- Track transportation routes
- Detect route deviations
- Improve supply-chain visibility

### 🗺️ Location Visualization

The application supports map-based visualization for tracking product movement and locations.

### 🔗 Smart Contract Integration

The blockchain layer is implemented using Solidity smart contracts and accessed through the frontend using Ethers.js.

### 🔥 Firebase Integration

Firebase is used for application-level data and supporting functionality where required.

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    │ Manufacturer /       │
                    │ Distributor /         │
                    │ Regulatory Officer /  │
                    │ End User              │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React.js Frontend  │
                    │                      │
                    │ Dashboard             │
                    │ Supply Chain          │
                    │ Tracking              │
                    │ Maps & Location       │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
             ┌──────────────┐       ┌──────────────┐
             │   MetaMask   │       │   Firebase   │
             │    Wallet    │       │    Services  │
             └──────┬───────┘       └──────────────┘
                    │
                    ▼
          ┌────────────────────────┐
          │ Solidity Smart Contract│
          │    MedicineRegistry    │
          └───────────┬────────────┘
                      │
                      ▼
             ┌──────────────────┐
             │ Polygon Amoy     │
             │    Testnet       │
             └──────────────────┘

                      ▲
                      │
             ┌────────┴─────────┐
             │    IoT / GPS     │
             │ Location Tracking│
             └──────────────────┘# Track-Pharma-v2
