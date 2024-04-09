// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Land {
    struct Landreg {
        uint id;
        uint area;
        string city;
        string state;
        uint landPrice;
        uint propertyPID;
        uint physicalSurveyNumber;
        string ipfsHash;
        string document;
    }

    struct Buyer {
        address id;
        string name;
        uint age;
        string city;
        string aadharNumber;
        string panNumber;
        string document;
        string email;
    }

    struct Seller {
        address id;
        string name;
        uint age;
        string aadharNumber;
        string panNumber;
        string landsOwned;
        string document;
    }

    struct LandInspector {
        uint id;
        string name;
        uint age;
        string designation;
    }

    struct LandRequest {
        uint reqId;
        address sellerId;
        address buyerId;
        uint landId;
    }

    struct ContractOwner {
        address ownerAddress;
        mapping(address => bool) landInspectors;
    }

    mapping(uint => Landreg) public lands;
    mapping(uint => LandInspector) public InspectorMapping;
    mapping(address => Seller) public SellerMapping;
    mapping(address => Buyer) public BuyerMapping;
    mapping(uint => LandRequest) public RequestsMapping;

    mapping(address => bool) public RegisteredAddressMapping;
    mapping(address => bool) public RegisteredSellerMapping;
    mapping(address => bool) public RegisteredBuyerMapping;
    mapping(address => bool) public SellerVerification;
    mapping(address => bool) public SellerRejection;
    mapping(address => bool) public BuyerVerification;
    mapping(address => bool) public BuyerRejection;
    mapping(uint => bool) public LandVerification;
    mapping(uint => address) public LandOwner;
    mapping(uint => bool) public RequestStatus;
    mapping(uint => bool) public RequestedLands;
    mapping(uint => bool) public PaymentReceived;

    address public Land_Inspector;
    address[] public sellers;
    address[] public buyers;
    ContractOwner public contractOwner;
    uint public landsCount;
    uint public inspectorsCount;
    uint public sellersCount;
    uint public buyersCount;
    uint public requestsCount;

    event Registration(address _registrationId);
    event LandRequested(address _sellerId);
    event RequestApproved(uint _reqId);
    event Verified(address _id);
    event Rejected(address _id);

    modifier onlyLandInspector() {
        require(
            msg.sender == Land_Inspector,
            "Only land inspector can call this function"
        );
        _;
    }

    modifier onlyOwner() {
        require(
            msg.sender == contractOwner.ownerAddress,
            "Only Contract Owner can call this function"
        );
        _;
    }

    modifier onlySeller() {
        require(isSeller(msg.sender), "Caller is not a registered seller");
        _;
    }

    modifier onlyBuyer() {
        require(isBuyer(msg.sender), "Caller is not a registered buyer");
        _;
    }

    constructor() {
        contractOwner.ownerAddress = msg.sender;
    }

    function addLandInspector(
        string memory _name,
        uint _age,
        string memory _designation
    ) public onlyOwner {
        inspectorsCount++;
        InspectorMapping[inspectorsCount] = LandInspector(
            inspectorsCount,
            _name,
            _age,
            _designation
        );
    }

    function addLand(
        uint _area,
        string memory _city,
        string memory _state,
        uint _landPrice,
        uint _propertyPID,
        uint _surveyNum,
        string memory _ipfsHash,
        string memory _document
    ) public onlySeller {
        require(isVerified(msg.sender), "Seller is not verified");

        landsCount++;
        lands[landsCount] = Landreg(
            landsCount,
            _area,
            _city,
            _state,
            _landPrice,
            _propertyPID,
            _surveyNum,
            _ipfsHash,
            _document
        );
        LandOwner[landsCount] = msg.sender;
    }

    function registerSeller(
        string memory _name,
        uint _age,
        string memory _aadharNumber,
        string memory _panNumber,
        string memory _landsOwned,
        string memory _document
    ) public {
        require(
            !RegisteredAddressMapping[msg.sender],
            "Seller is already registered"
        );

        RegisteredAddressMapping[msg.sender] = true;
        RegisteredSellerMapping[msg.sender] = true;
        sellersCount++;
        SellerMapping[msg.sender] = Seller(
            msg.sender,
            _name,
            _age,
            _aadharNumber,
            _panNumber,
            _landsOwned,
            _document
        );
        sellers.push(msg.sender);

        emit Registration(msg.sender);
    }

    function registerBuyer(
        string memory _name,
        uint _age,
        string memory _city,
        string memory _aadharNumber,
        string memory _panNumber,
        string memory _document,
        string memory _email
    ) public {
        require(
            !RegisteredAddressMapping[msg.sender],
            "Buyer is already registered"
        );

        RegisteredAddressMapping[msg.sender] = true;
        RegisteredBuyerMapping[msg.sender] = true;
        buyersCount++;
        BuyerMapping[msg.sender] = Buyer(
            msg.sender,
            _name,
            _age,
            _city,
            _aadharNumber,
            _panNumber,
            _document,
            _email
        );
        buyers.push(msg.sender);

        emit Registration(msg.sender);
    }

    function requestLand(address _sellerId, uint _landId) public onlyBuyer {
        require(isVerified(msg.sender), "Buyer is not verified");

        requestsCount++;
        RequestsMapping[requestsCount] = LandRequest(
            requestsCount,
            _sellerId,
            msg.sender,
            _landId
        );
        RequestStatus[requestsCount] = false;
        RequestedLands[requestsCount] = true;

        emit LandRequested(_sellerId);
    }

    function approveRequest(uint _reqId) public onlySeller {
        RequestStatus[_reqId] = true;

        emit RequestApproved(_reqId);
    }

    function verifySeller(address _sellerId) public onlyLandInspector {
        SellerVerification[_sellerId] = true;
        emit Verified(_sellerId);
    }

    function rejectSeller(address _sellerId) public onlyLandInspector {
        SellerRejection[_sellerId] = true;
        emit Rejected(_sellerId);
    }

    function verifyBuyer(address _buyerId) public onlyLandInspector {
        BuyerVerification[_buyerId] = true;
        emit Verified(_buyerId);
    }

    function rejectBuyer(address _buyerId) public onlyLandInspector {
        BuyerRejection[_buyerId] = true;
        emit Rejected(_buyerId);
    }

    function verifyLand(uint _landId) public onlyLandInspector {
        LandVerification[_landId] = true;
    }

    function isLandVerified(uint _id) public view returns (bool) {
        return LandVerification[_id];
    }

    function isVerified(address _id) public view returns (bool) {
        return SellerVerification[_id] || BuyerVerification[_id];
    }

    function isRejected(address _id) public view returns (bool) {
        return SellerRejection[_id] || BuyerRejection[_id];
    }

    function isSeller(address _id) public view returns (bool) {
        return RegisteredSellerMapping[_id];
    }

    function isBuyer(address _id) public view returns (bool) {
        return RegisteredBuyerMapping[_id];
    }

    function isLandInspector(address _id) public view returns (bool) {
        return Land_Inspector == _id;
    }

    function isRegistered(address _id) public view returns (bool) {
        return RegisteredAddressMapping[_id];
    }

    function getLandsCount() public view returns (uint) {
        return landsCount;
    }

    function getSellersCount() public view returns (uint) {
        return sellersCount;
    }

    function getBuyersCount() public view returns (uint) {
        return buyersCount;
    }

    function getSeller() public view returns (address[] memory) {
        return (sellers);
    }

    function getSellerDetails(
        address i
    )
        public
        view
        returns (
            string memory,
            uint,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            SellerMapping[i].name,
            SellerMapping[i].age,
            SellerMapping[i].aadharNumber,
            SellerMapping[i].panNumber,
            SellerMapping[i].landsOwned,
            SellerMapping[i].document
        );
    }

    function getBuyer() public view returns (address[] memory) {
        return (buyers);
    }

    function getBuyerDetails(
        address i
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint,
            string memory
        )
    {
        return (
            BuyerMapping[i].name,
            BuyerMapping[i].city,
            BuyerMapping[i].panNumber,
            BuyerMapping[i].document,
            BuyerMapping[i].email,
            BuyerMapping[i].age,
            BuyerMapping[i].aadharNumber
        );
    }

    function getRequestDetails(
        uint i
    ) public view returns (address, address, uint, bool) {
        return (
            RequestsMapping[i].sellerId,
            RequestsMapping[i].buyerId,
            RequestsMapping[i].landId,
            RequestStatus[i]
        );
    }

    function isRequested(uint _id) public view returns (bool) {
        return RequestedLands[_id];
    }

    function isApproved(uint _id) public view returns (bool) {
        return RequestStatus[_id];
    }

    function LandOwnershipTransfer(uint _landId, address _newOwner) public {
        require(isLandInspector(msg.sender));

        LandOwner[_landId] = _newOwner;
    }

    function isPaid(uint _landId) public view returns (bool) {
        return PaymentReceived[_landId];
    }

    function payment(
        address payable _receiver,
        uint _landId,
        uint _landPrice
    ) public payable {
        require(msg.value >= _landPrice, "Insufficient payment amount");

        PaymentReceived[_landId] = true;
        _receiver.transfer(_landPrice);
    }
}
