pragma solidity ^0.4.18;

contract SimpleStorage {
  uint storedData;

  event Set(
      uint _value
    );

  function set(uint value) public {
    storedData = value;
    Set(value);
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
