// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Land{

    address contractOwner;

    constructor(){
        contractOwner=msg.sender;
    }

    struct User{
        address id;
        string name;
        uint age;
        string email;
        string city;
        string aadharCardNum;
        string panCardNum;
        string document;
        bool isUserVerified; 
    }
    struct LandInspector{
        uint id;
        address addr;
        string name;
        uint age;
        string city;
        string destination;
    }
    struct Landregister{
        uint id;
        uint area;
        uint propId;//property id
        string landAddres;
        uint landprice;
        string document;
        bool isAvailableForSale;
        address payable ownerAddress;
        bool isLandVerified;
        
    }

    enum reStatus{
        request,
        accept,
        reject,
        payment,
        completed
    }


    uint inspectorCount;
    uint public userCount;
    uint public landsCount;
    uint public documentId;
    uint requestCount;


    mapping(address=>LandInspector) public InspectorMapping;
    mapping(uint=>address[]) LandInspectorList;
    mapping(address=>bool) RegisteredInspectorMapping;
    mapping(address=>bool) RegisteredUserMapping;
    mapping(address=>User) public UserMapping;
    mapping(uint=>address) Users;
    mapping(uint=>address[]) UserList;
    mapping (uint=>Landregister)public lands;
    mapping(address => uint[])  Lands;//mine
    mapping(address => uint[])  ReceivedLandRequest;//mine
    mapping(address => uint[])  SentLandRequest;//mine
    mapping(uint =>uint[]) LandList;



    function isContractOwner(address _addr) public view returns (bool)
    {
        if(_addr==contractOwner)
            return true;
        else
            return false;
    }
    function changeContractOwner(address _addr) public{
        require(msg.sender==contractOwner,"This is not the contract Owner signing");

        contractOwner=_addr;
    }

//----------------------------------------LandInspector---------------------------------------------------//

function addLandInspector(address _addr,string memory _name, uint _age, string memory _designation,string memory _city) public returns(bool){
        if(contractOwner!=msg.sender)
            return false;
        require(contractOwner==msg.sender);
        RegisteredInspectorMapping[_addr]=true;
        LandInspectorList[1].push(_addr);
        InspectorMapping[_addr] = LandInspector(inspectorCount,_addr,_name, _age, _designation,_city);
        return true;
    }

    function ReturnAllLandIncpectorList() public view returns(address[] memory)
    {
        return LandInspectorList[1];
    }

    function removeLandInspector(address _addr) public{
        require(msg.sender==contractOwner,"You are not contractOwner");
        require(RegisteredInspectorMapping[_addr],"Land Inspector not found");
        RegisteredInspectorMapping[_addr]=false;


        uint len=LandInspectorList[1].length;
        for(uint i=0;i<len;i++)
        {
            if(LandInspectorList[1][i]==_addr)
            {
                LandInspectorList[1][i]=LandInspectorList[1][len-1];
                LandInspectorList[1].pop();
                break;
            }
        }
    }
    function isLandInspector(address _id) public view returns (bool) {
        if(RegisteredInspectorMapping[_id]){
            return true;
        }else{
            return false;
        }
    }

//-----------------------------------------------------------------------------User Registration-----------------------------------------------------//
    function UserRegistration(string memory name,
    uint age,
    string memory city,
    string memory aadharNumber, 
    string memory panNumber,
    string memory email,
    string memory document) 
    public {

        require(!RegisteredUserMapping[msg.sender]);
        RegisteredUserMapping[msg.sender]=true;
        userCount++;
        UserList[1].push(msg.sender);
        Users[userCount]=msg.sender;
        UserMapping[msg.sender]=User(msg.sender, name, age, city, aadharNumber, panNumber,email,document,false);
        //emit Registration(msg.sender);
    }

    function isUserRegistered(address _addr) public view returns(bool)
    {
        if(RegisteredUserMapping[_addr]){
            return true;
        } 
        else{
            return false;
        }
    }

    function UserVerification(address _userId) public{
        require(isLandInspector(msg.sender));
        UserMapping[_userId].isUserVerified=true;

    }
    function isUserVerified(address id) public view returns(bool){
        return UserMapping[id].isUserVerified;
    }
    function ReturnAllUserList() public view returns(address[] memory)
    {
        return UserList[1];
    }


}