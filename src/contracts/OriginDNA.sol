// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title OriginDNA
 * @notice BAA UA-AIDC MODULE 5 — NOVA PROTOCOL V16
 * @dev ERC721 certificate for Living Apps and Origin Pixels.
 * Every pixel and component has a father: Idea-Coin, Breeder Agent, CE Nodes, Code APIs.
 * Splitting royalties automatically via Account Abstraction.
 */

contract OriginDNA {
    string public name = "BAA NOVA Origin DNA Certificate";
    string public symbol = "ORIGIN";

    address public owner;
    address public novaFactory;

    struct RoyaltySplit {
        uint256 creatorPct;       // 10%
        uint256 breederPct;       // 5%
        uint256 ceNodesPct;       // 5%
        uint256 codeDevsPct;      // 5%
        uint256 uaaidcPct;        // 10%
        uint256 cooperativePct;   // 65%
    }

    struct LivingAppDNA {
        string livingAppId;
        string novaUrl;
        address creatorWallet;
        string ideaCoinId;
        string breederAgentId;
        bytes32 originDnaHash;
        uint256 birthTimestamp;
        RoyaltySplit split;
    }

    mapping(string => LivingAppDNA) public livingApps;
    mapping(bytes32 => bool) public verifiedPixelHashes;
    mapping(address => uint256) public pendingRoyalties;

    event LivingAppRegistered(string livingAppId, string novaUrl, address indexed creator, bytes32 originDnaHash);
    event RoyaltyPaid(string elementId, address indexed creator, uint256 amount);
    event CopyReported(string suspectedUrl, string originalNovaUrl, uint256 redirectedAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyNova() {
        require(msg.sender == novaFactory || msg.sender == owner, "Only NOVA factory");
        _;
    }

    constructor() {
        owner = msg.sender;
        novaFactory = msg.sender;
    }

    function setNovaFactory(address _factory) external onlyOwner {
        novaFactory = _factory;
    }

    function registerLivingApp(
        string memory _livingAppId,
        string memory _novaUrl,
        address _creator,
        string memory _ideaCoinId,
        string memory _breederAgentId,
        bytes32 _dnaHash
    ) external onlyNova {
        RoyaltySplit memory defaultSplit = RoyaltySplit(10, 5, 5, 5, 10, 65);
        livingApps[_livingAppId] = LivingAppDNA({
            livingAppId: _livingAppId,
            novaUrl: _novaUrl,
            creatorWallet: _creator,
            ideaCoinId: _ideaCoinId,
            breederAgentId: _breederAgentId,
            originDnaHash: _dnaHash,
            birthTimestamp: block.timestamp,
            split: defaultSplit
        });

        verifiedPixelHashes[_dnaHash] = true;
        emit LivingAppRegistered(_livingAppId, _novaUrl, _creator, _dnaHash);
    }

    function verifyPixel(bytes32 _originDnaHash) external view returns (bool) {
        return verifiedPixelHashes[_originDnaHash];
    }

    function payRoyalty(
        string memory _elementId,
        string memory _livingAppId
    ) external payable {
        LivingAppDNA memory appDna = livingApps[_livingAppId];
        require(appDna.creatorWallet != address(0), "App DNA not found");

        uint256 creatorShare = (msg.value * appDna.split.creatorPct) / 100;
        pendingRoyalties[appDna.creatorWallet] += creatorShare;

        emit RoyaltyPaid(_elementId, appDna.creatorWallet, creatorShare);
    }

    function withdrawRoyalties() external {
        uint256 amount = pendingRoyalties[msg.sender];
        require(amount > 0, "No royalties pending");
        pendingRoyalties[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}
