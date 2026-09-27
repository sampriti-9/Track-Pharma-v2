// src/utils/contractABI.js

const ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "batchId", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "deliveryDate", "type": "uint256" }
    ],
    "name": "DeliveryDateSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "batchId", "type": "string" },
      { "indexed": false, "internalType": "bool", "name": "received", "type": "bool" },
      { "indexed": false, "internalType": "uint256", "name": "qty", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "date", "type": "uint256" }
    ],
    "name": "EndUserConfirmed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "batchId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "manufacturer", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "distributor", "type": "string" }
    ],
    "name": "MedicineRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "batchId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "location", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "status", "type": "string" }
    ],
    "name": "MedicineUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "batchId", "type": "string" },
      { "indexed": false, "internalType": "bool", "name": "verified", "type": "bool" },
      { "indexed": false, "internalType": "string", "name": "remarks", "type": "string" }
    ],
    "name": "RegulatorVerified",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_batchId", "type": "string" },
      { "internalType": "bool", "name": "_received", "type": "bool" },
      { "internalType": "uint256", "name": "_qty", "type": "uint256" },
      { "internalType": "uint256", "name": "_date", "type": "uint256" }
    ],
    "name": "confirmReceipt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllBatchIds",
    "outputs": [
      { "internalType": "string[]", "name": "", "type": "string[]" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_batchId", "type": "string" }
    ],
    "name": "getMedicine",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "bool", "name": "", "type": "bool" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "bool", "name": "", "type": "bool" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "bool", "name": "", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_batchId", "type": "string" },
      { "internalType": "string", "name": "_manufacturer", "type": "string" },
      { "internalType": "string", "name": "_distributor", "type": "string" },
      { "internalType": "string", "name": "_transportNumber", "type": "string" },
      { "internalType": "uint256", "name": "_quantity", "type": "uint256" },
      { "internalType": "uint256", "name": "_dispatchDate", "type": "uint256" },
      { "internalType": "string", "name": "_location", "type": "string" }
    ],
    "name": "registerMedicine",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_batchId", "type": "string" },
      { "internalType": "uint256", "name": "_deliveryDate", "type": "uint256" }
    ],
    "name": "setDeliveryDate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_batchId", "type": "string" },
      { "internalType": "string", "name": "_newLocation", "type": "string" },
      { "internalType": "string", "name": "_newStatus", "type": "string" }
    ],
    "name": "updateStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_batchId", "type": "string" },
      { "internalType": "bool", "name": "_isVerified", "type": "bool" },
      { "internalType": "string", "name": "_remarks", "type": "string" }
    ],
    "name": "verifyByRegulator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default ABI;
