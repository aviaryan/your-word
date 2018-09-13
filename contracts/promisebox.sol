pragma solidity ^0.4.18;

contract PromiseBox {
    // this struct represents each word
    struct Word {
        string text;
        // uint timestamp;
        address owner;
        bool resolved;
        bool verdict;
    }

    // this mapping stores names wrt addresses
    mapping (address => string) public names;

    // a map that stores all the words
    mapping (uint => Word) public words;
    // Word[] public words;

    // important addresses
    address private escrow;
    address private treasure;

    // identifier for words
    uint private counter;

    // constructor, saves private information for the contract
    constructor(address escrow_, address treasure_) public {
        escrow = escrow_;
        treasure = treasure_;
        counter = 0;
    }

    /// Save your word to the blockchain
    function addWord(string text) public {
        words[getID()] = Word({
            text: text,
            owner: msg.sender,
            resolved: false,
            verdict: false
        });
        // TODO: get value for transaction
    }

    /// Resolve a word status
    function resolveWord(uint id, bool verdict) public {
        require(words[id].resolved == false, "Word not found by ID or Word already resolved");
        require(msg.sender == words[id].owner, "Incorrect owner for this word");
        words[id].resolved = true;
        words[id].verdict = verdict;
        // TODO: return back value
    }

    /// Returns word by a given ID
    function getWordById(uint id) public view returns(string, address, bool, bool) {
        Word memory word = words[id];
        return (word.text, word.owner, word.resolved, word.verdict);
    }

    /// Returns the total number of words saved in the contract
    function getTotalWords() public view returns(uint) {
        return counter;
    }

    // private functions
    function getID() private returns(uint) {
        return counter++;
    }
}
