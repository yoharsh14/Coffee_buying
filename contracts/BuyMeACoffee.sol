// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract BuyMeACoffee {
    //Event to emit when a Memo is created.abi
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    //Memo struct.
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    //List of all memos received from friends;
    Memo[] memos;

    //address of contract deployer.
    address payable private owner;

    //Deploy logic
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev buy a coffee from contract owner
     * @param _name name of the coffee buyer
     * @param _message a nice message from the coffee buyer
     */

    function buyCoffee(
        string memory _name,
        string memory _message
    ) public payable {
        require(msg.value > 0, "can't buy coffee with 0 eth");
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    
    /**
     * @dev this will check the request sender is owner or not
     */

    function changeOwner(address newOwner) public (){
        owner = newOwner;
    }
    /**
     * @dev this will check the request sender is owner or not
     */
    modifier is_owner(){
        require(msg.sender==owner,"you are not the owner, so you can't withdraw");
        _;
    }

    /**
     * @dev send the entrie balance stored in this contract to the owner
     */

    function withdrawTips() public is_owner{
        require(owner.send(address(this).balance));
    }

    /**
     * @dev retrieve all the memos received and stored on the blockchain.
     */
    function getMemos()public view returns(Memo[] memory){
        return memos;
    }
    function getOwner()public view returns(address){
        return owner;
    }
}
