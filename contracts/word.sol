pragma solidity ^0.4.18;

contract Words {
    mapping (bytes32 => string) public words;

    constructor() public {
        // do nothing
    }

    function saveSomeonesWord(bytes32 name, string word) public {
        words[name] = word;
    }

    function getWordBy(bytes32 name) public view returns (string) {
        return words[name];
    }
}
