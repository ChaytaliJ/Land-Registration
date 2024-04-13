// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.2;
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
        address landOwner;
        bool isLandForSale;
    }

    struct User {
        address id;
        string name;
        uint age;
        string city;
        string aadharNumber;
        string panNumber;
        string document;
        string email;
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
        bool isRejected;
    }

    struct OwnershipTransfer {
        address previousOwner;
        address newOwner;
        uint timestamp;
    }
    mapping(uint => OwnershipTransfer[]) public ownershipTransfers;
    mapping(uint => Landreg) public lands;
    mapping(address => uint[]) public userOwnedLands;
    mapping(uint => LandInspector) public InspectorMapping;
    mapping(address => User) public UserMapping;
    mapping(uint => LandRequest) public RequestsMapping;

    mapping(address => bool) public RegisteredAddressMapping;
    mapping(address => bool) public RegisteredUserMapping;
    mapping(address => bool) public UserVerification;
    mapping(address => bool) public UserRejection;
    mapping(uint => bool) public LandVerification;
    mapping(uint => address) public LandOwner;
    mapping(uint => bool) public RequestStatus;
    mapping(uint => bool) public RequestedLands;
    mapping(uint => bool) public PaymentReceived;

    address public Land_Inspector;
    address[] public users;
    uint public landsCount;
    uint public inspectorsCount;
    uint public usersCount;
    uint public requestsCount;
    uint[] public landIds;

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
    modifier onlyUser() {
        require(isUser(msg.sender), "Caller is not a registered User");
        _;
    }

    constructor() public {
        Land_Inspector = msg.sender;
        addLandInspector("Inspector 1", 45, "Tehsil Manager");
    }

    function addLandInspector(
        string memory _name,
        uint _age,
        string memory _designation
    ) private {
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
    ) public onlyUser {
        require(isVerified(msg.sender), "User is not verified");

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
            _document,
            msg.sender,
            false
        );
        LandOwner[landsCount] = msg.sender;
        userOwnedLands[msg.sender].push(landsCount);
        landIds.push(landsCount);
    }

    function makeLandForSale(uint _landId) public {
        require(
            LandVerification[_landId],
            "Land must be verified to be put up for sale"
        );
        require(
            LandOwner[_landId] == msg.sender,
            "Only the land owner can put the land up for sale"
        );

        lands[_landId].isLandForSale = true;
    }

    function isLandForSale(uint _landId) public view returns (bool) {
        return lands[_landId].isLandForSale;
    }

    function getAllLandIds() public view returns (uint[] memory) {
        return landIds;
    }

    function registerUser(
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
            "User is already registered"
        );

        RegisteredAddressMapping[msg.sender] = true;
        RegisteredUserMapping[msg.sender] = true;
        usersCount++;
        UserMapping[msg.sender] = User(
            msg.sender,
            _name,
            _age,
            _city,
            _aadharNumber,
            _panNumber,
            _document,
            _email
        );
        users.push(msg.sender);

        emit Registration(msg.sender);
    }

    function requestLand(address _sellerId, uint _landId) public onlyUser {
        require(isVerified(msg.sender), "User is not verified");

        requestsCount++;
        RequestsMapping[requestsCount] = LandRequest(
            requestsCount,
            _sellerId,
            msg.sender,
            _landId,
            false
        );
        RequestStatus[requestsCount] = false;
        RequestedLands[requestsCount] = true;

        emit LandRequested(_sellerId);
    }

    function approveRequest(uint _reqId) public onlyUser {
        RequestStatus[_reqId] = true;

        emit RequestApproved(_reqId);
    }

    function rejectRequest(uint _reqId) public {
        require(
            RequestsMapping[_reqId].sellerId == msg.sender,
            "Only the seller can reject the request"
        );

        RequestsMapping[_reqId].isRejected = true;
    }

    function verifyUser(address _userId) public onlyLandInspector {
        UserVerification[_userId] = true;
        emit Verified(_userId);
    }

    function rejectUser(address _userId) public onlyLandInspector {
        UserRejection[_userId] = true;
        emit Rejected(_userId);
    }

    function verifyLand(uint _landId) public onlyLandInspector {
        LandVerification[_landId] = true;
    }

    function isLandVerified(uint _id) public view returns (bool) {
        return LandVerification[_id];
    }

    function isVerified(address _id) public view returns (bool) {
        return UserVerification[_id];
    }

    function isRejected(address _id) public view returns (bool) {
        return UserRejection[_id];
    }

    function isUser(address _id) public view returns (bool) {
        return RegisteredUserMapping[_id];
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

    function getUsersCount() public view returns (uint) {
        return usersCount;
    }

    function getUser() public view returns (address[] memory) {
        return (users);
    }

    function getUserOwnedLands(
        address user
    ) public view returns (uint[] memory) {
        return userOwnedLands[user];
    }

    function getLandInfo(uint landId) public view returns (Landreg memory) {
        Landreg memory land = lands[landId];
        land.landOwner = LandOwner[landId]; // Update land owner with the latest owner from LandOwner mapping
        return land;
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
            UserMapping[i].name,
            UserMapping[i].city,
            UserMapping[i].panNumber,
            UserMapping[i].document,
            UserMapping[i].email,
            UserMapping[i].age,
            UserMapping[i].aadharNumber
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

    function getBuyerRequestDetails(
        address _buyer
    )
        public
        view
        returns (
            uint[] memory,
            address[] memory,
            uint[] memory,
            bool[] memory,
            bool[] memory
        )
    {
        uint[] memory reqIds = new uint[](requestsCount);
        address[] memory sellerIds = new address[](requestsCount);
        uint[] memory allIds = new uint[](requestsCount);
        bool[] memory statuses = new bool[](requestsCount);
        bool[] memory rejections = new bool[](requestsCount);

        uint index = 0;
        for (uint i = 1; i <= requestsCount; i++) {
            if (RequestsMapping[i].buyerId == _buyer) {
                reqIds[index] = RequestsMapping[i].reqId;
                sellerIds[index] = RequestsMapping[i].sellerId;
                allIds[index] = RequestsMapping[i].landId;
                statuses[index] = RequestStatus[i];
                rejections[index] = RequestsMapping[i].isRejected;
                index++;
            }
        }

        assembly {
            mstore(reqIds, index)
            mstore(sellerIds, index)
            mstore(allIds, index)
            mstore(statuses, index)
            mstore(rejections, index)
        }

        return (reqIds, sellerIds, landIds, statuses, rejections);
    }

    function getSellerRequestDetails(
        address _seller
    )
        public
        view
        returns (
            uint[] memory,
            address[] memory,
            uint[] memory,
            bool[] memory,
            bool[] memory
        )
    {
        uint[] memory reqIds = new uint[](requestsCount);
        address[] memory buyerIds = new address[](requestsCount);
        uint[] memory allIds = new uint[](requestsCount);
        bool[] memory statuses = new bool[](requestsCount);
        bool[] memory rejections = new bool[](requestsCount);

        uint index = 0;
        for (uint i = 1; i <= requestsCount; i++) {
            if (RequestsMapping[i].sellerId == _seller) {
                reqIds[index] = RequestsMapping[i].reqId;
                buyerIds[index] = RequestsMapping[i].buyerId;
                allIds[index] = RequestsMapping[i].landId;
                statuses[index] = RequestStatus[i];
                rejections[index] = RequestsMapping[i].isRejected;
                index++;
            }
        }

        // Resize arrays to remove any unused slots
        assembly {
            mstore(reqIds, index)
            mstore(buyerIds, index)
            mstore(allIds, index)
            mstore(statuses, index)
            mstore(rejections, index)
        }

        return (reqIds, buyerIds, landIds, statuses, rejections);
    }

    function isRequested(uint _id) public view returns (bool) {
        return RequestedLands[_id];
    }

    function isApproved(uint _id) public view returns (bool) {
        return RequestStatus[_id];
    }

    function LandOwnershipTransfer(uint _landId, address _newOwner) public {
        require(isLandInspector(msg.sender));

        address previousOwner = LandOwner[_landId]; // Store the previous owner
        RequestedLands[_landId] = false;
        PaymentReceived[_landId] = false;
        LandOwner[_landId] = _newOwner; // Update land ownership to the new owner

        ownershipTransfers[_landId].push(
            OwnershipTransfer({
                previousOwner: previousOwner,
                newOwner: _newOwner,
                timestamp: block.timestamp
            })
        );

        lands[_landId].isLandForSale = false; // Set isLandForSale to false

        uint[] storage ownedLandIds = userOwnedLands[previousOwner];
        for (uint i = 0; i < ownedLandIds.length; i++) {
            if (ownedLandIds[i] == _landId) {
                ownedLandIds[i] = ownedLandIds[ownedLandIds.length - 1];
                ownedLandIds.pop();
                break;
            }
        }

        userOwnedLands[_newOwner].push(_landId);
    }

    function getOwnershipTransfers(
        uint _landId
    ) public view returns (OwnershipTransfer[] memory) {
        return ownershipTransfers[_landId];
    }

    function isPaid(uint _landId) public view returns (bool) {
        return PaymentReceived[_landId];
    }

    function getCompletedTransactions()
        public
        view
        returns (address[] memory, address[] memory, uint[] memory)
    {
        uint count = 0;

        for (uint i = 1; i <= requestsCount; i++) {
            if (
                RequestStatus[i] && PaymentReceived[RequestsMapping[i].landId]
            ) {
                count++;
            }
        }

        address[] memory sellers = new address[](count);
        address[] memory buyers = new address[](count);
        uint[] memory allIds = new uint[](count);

        uint index = 0;
        for (uint i = 1; i <= requestsCount; i++) {
            if (
                RequestStatus[i] && PaymentReceived[RequestsMapping[i].landId]
            ) {
                sellers[index] = RequestsMapping[i].sellerId;
                buyers[index] = RequestsMapping[i].buyerId;
                allIds[index] = RequestsMapping[i].landId;
                index++;
            }
        }

        return (sellers, buyers, landIds);
    }

    function getAllOwnershipTransfers()
        public
        view
        returns (OwnershipTransfer[][] memory)
    {
        uint[] memory allIds = getAllLandIds();
        OwnershipTransfer[][] memory allTransfers = new OwnershipTransfer[][](
            allIds.length
        );

        for (uint i = 0; i < allIds.length; i++) {
            allTransfers[i] = ownershipTransfers[allIds[i]];
        }

        return allTransfers;
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
