// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV1 is Initializable {
  // These state variables and their values will be preserved forever, regardless of upgrading.
  uint public numSodas;
  address public owner;

  function initialize(uint _numSodas) public initializer {
    numSodas = _numSodas;
    owner = msg.sender;
  }

  function purchaseSoda() public payable {
    require(numSodas > 0, "Machine is out of sodas, sorry.");
    require(msg.value >= 1000 wei, "You must pay 1000 wei for a soda!");
    
    numSodas--;
  }
}