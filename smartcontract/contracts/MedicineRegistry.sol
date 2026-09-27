// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract MedicineRegistry {
    struct Medicine {
        // Core
        string name;
        string batchId;
        string manufacturer;

        // Supply chain + logistics
        string distributor;
        string transportNumber;
        uint256 quantity;

        // Live status
        string currentLocation;
        string status;

        // Dates
        uint256 dispatchDate;
        uint256 deliveryDate;
        uint256 createdAt;

        // Regulator
        bool verifiedByRegulator;
        string regulatorRemarks;

        // End user confirmation
        bool endUserReceived;
        uint256 endUserQty;
        uint256 endUserDate;

        bool exists;
    }

    mapping(string => Medicine) private medicines; // batchId => details
    string[] private allBatchIds;

    // ---- Events ----
    event MedicineRegistered(string batchId, string name, string manufacturer, string distributor);
    event MedicineUpdated(string batchId, string location, string status);
    event DeliveryDateSet(string batchId, uint256 deliveryDate);
    event RegulatorVerified(string batchId, bool verified, string remarks);
    event EndUserConfirmed(string batchId, bool received, uint256 qty, uint256 date);

    // ---- Register new medicine ----
    function registerMedicine(
        string memory _name,
        string memory _batchId,
        string memory _manufacturer,
        string memory _distributor,
        string memory _transportNumber,
        uint256 _quantity,
        uint256 _dispatchDate,
        string memory _location
    ) external {
        require(!medicines[_batchId].exists, "Medicine already exists!");

        medicines[_batchId] = Medicine({
            name: _name,
            batchId: _batchId,
            manufacturer: _manufacturer,
            distributor: _distributor,
            transportNumber: _transportNumber,
            quantity: _quantity,
            currentLocation: _location,
            status: "Registered",
            dispatchDate: _dispatchDate,
            deliveryDate: 0,
            createdAt: block.timestamp,
            verifiedByRegulator: false,
            regulatorRemarks: "",
            endUserReceived: false,
            endUserQty: 0,
            endUserDate: 0,
            exists: true
        });

        allBatchIds.push(_batchId);
        emit MedicineRegistered(_batchId, _name, _manufacturer, _distributor);
    }

    // ---- Update location / status ----
    function updateStatus(
        string memory _batchId,
        string memory _newLocation,
        string memory _newStatus
    ) external {
        require(medicines[_batchId].exists, "Medicine not found!");
        medicines[_batchId].currentLocation = _newLocation;
        medicines[_batchId].status = _newStatus;
        emit MedicineUpdated(_batchId, _newLocation, _newStatus);
    }

    // ---- Set delivery date ----
    function setDeliveryDate(string memory _batchId, uint256 _deliveryDate) external {
        require(medicines[_batchId].exists, "Medicine not found!");
        medicines[_batchId].deliveryDate = _deliveryDate;
        emit DeliveryDateSet(_batchId, _deliveryDate);
    }

    // ---- Regulator verifies ----
    function verifyByRegulator(
        string memory _batchId,
        bool _isVerified,
        string memory _remarks
    ) external {
        require(medicines[_batchId].exists, "Medicine not found!");
        medicines[_batchId].verifiedByRegulator = _isVerified;
        medicines[_batchId].regulatorRemarks = _remarks;
        emit RegulatorVerified(_batchId, _isVerified, _remarks);
    }

    // ---- End user confirmation ----
    function confirmReceipt(
        string memory _batchId,
        bool _received,
        uint256 _qty,
        uint256 _date
    ) external {
        require(medicines[_batchId].exists, "Medicine not found!");
        medicines[_batchId].endUserReceived = _received;
        medicines[_batchId].endUserQty = _qty;
        medicines[_batchId].endUserDate = _date;
        emit EndUserConfirmed(_batchId, _received, _qty, _date);
    }

    // ---- View medicine ----
    function getMedicine(string memory _batchId)
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            uint256,
            bool,
            string memory,
            bool,
            uint256,
            uint256,
            uint256,
            bool
        )
    {
        require(medicines[_batchId].exists, "Medicine not found!");
        Medicine memory m = medicines[_batchId];
        return (
            m.name,
            m.batchId,
            m.manufacturer,
            m.distributor,
            m.transportNumber,
            m.quantity,
            m.dispatchDate,
            m.deliveryDate,
            m.verifiedByRegulator,
            m.regulatorRemarks,
            m.endUserReceived,
            m.endUserQty,
            m.endUserDate,
            m.createdAt,
            m.exists
        );
    }

    function getAllBatchIds() external view returns (string[] memory) {
        return allBatchIds;
    }
}
