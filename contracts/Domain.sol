//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "hardhat/console.sol";
import { StringUtils } from "./libraries/StringUtils.sol";
contract Domain{
    string public tld;
    mapping(string => address) public domains;
    mapping(string => string) public spotify;
    constructor(string memory _tld) payable {
        tld = _tld;
        console.log("%s name service deployed ",_tld);

    }

    function getPrice(string calldata _name) public pure returns(uint){
        uint l = StringUtils.strlen(_name);
        require(l>0);
        if(l == 3){
            return 5*10**17;
        } else if (l==4){
            return 3*10**17;
        } else{
            return 1*10**17;
        }
    }

    function registerDomain(string calldata _name) payable public{
        require(domains[_name]== address(0));
        uint _price = getPrice(_name);
        require(msg.value>=_price, "insufficient funds!");
        domains[_name] = msg.sender;
        console.log("%s has been registed by %s!", _name, msg.sender);
    }

    function getAddress(string calldata _name) public view returns(address){
        return domains[_name];
    }

    function setDomain(string calldata _name, string memory _link) public{
        require(domains[_name]==msg.sender);
        spotify[_name]=_link;
    }

    function getLink(string calldata _name) public view returns(string memory){
        return spotify[_name];
    }
}



