// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import Ownable from the OpenZeppelin Contracts library
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IoToken.sol";

// Make Box inherit from the Ownable contract
contract ConsumerToken is Ownable {
    uint256 private _value;
    IoToken private iotToken;
    constructor (uint256 initialSupply) {

        iotToken = new IoToken(initialSupply);
    }

    event ValueChanged(uint256 value);

    // The onlyOwner modifier restricts who can call the store function
    function store(uint256 value) public onlyOwner {
        _value = value;
        iotToken.transfer(msg.sender, 1);
        emit ValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
        return _value;
    }

    function retrieveAddess() public view returns (address) {
        return address(iotToken);
    }
}