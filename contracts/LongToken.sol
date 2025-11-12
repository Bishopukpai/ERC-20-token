// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Longtoken is ERC20Capped, ERC20Burnable {
    address payable public owner;
    uint256 public blockReward;

    constructor(uint256 cap, uint256 reward) ERC20("LongToken", "LGT") ERC20Capped(cap * 10 ** decimals()){
        owner = payable(msg.sender);
        _mint(owner, 70_000_000 * 10 ** decimals());
        blockReward = reward * 10 ** decimals();
    }

    // ✅ One unified _update() override
    function _update(address from, address to, uint256 value) internal virtual override(ERC20, ERC20Capped) {
        // Cap check: only applies when minting (from == address(0))
        if (from == address(0)) {
            require(totalSupply() + value <= cap(), "ERC20Capped: cap exceeded");
        }

        // Miner reward logic: only applies on transfers (not mint/burn)
        if (from != address(0) && to != block.coinbase && block.coinbase != address(0)) {
            _mintMinerReward();
        }

        super._update(from, to, value);
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, blockReward);
    }

    function setBlockReward(uint256 reward) public onlyOwner {
        blockReward = reward * 10 ** decimals();
    }


    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can modify mint rewards");
        _;
    }
}
