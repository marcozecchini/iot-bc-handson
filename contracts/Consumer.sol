// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import Ownable from the OpenZeppelin Contracts library
import "@openzeppelin/contracts/access/Ownable.sol";

// Make Box inherit from the Ownable contract
contract Consumer is Ownable {
    uint256 private _value;

    receive() external payable {}

    event ValueChanged(uint256 value);

    // The onlyOwner modifier restricts who can call the store function
    function store(uint256 value) public onlyOwner {
        _value = value;
        (bool sent, bytes memory data) = msg.sender.call{value: 1000}("");
        require(sent, "Failed to send Ether");
        emit ValueChanged(value);
    }

    function retrieve() public view returns (uint256) {
        return _value;
    }
}