pragma solidity ^0.4.18;

contract PromiseBox {
    // this struct represents each word
    struct Word {
        string text;
        // uint timestamp;
        uint bet;
        address owner;
        bool resolved;
        bool verdict;
    }

    // this mapping stores names wrt addresses
    mapping (address => string) public names;

    // a map that stores all the words
    mapping (uint => Word) public words;

    // treasure address
    address private treasure;

    // identifier for words
    uint private counter;

    // constants
    // 0.001 eth
    uint constant min_bet = 10**15;
    // 0.001 eth
    uint constant nick_price = 10**15;

    // constructor, saves private information for the contract
    constructor(address treasure_) public {
        treasure = treasure_;
        counter = 0;
    }

    /// Save your word to the blockchain
    function addWord(string text) public payable {
        require(msg.value >= min_bet, "Bet should be more than 0.001 eth");
        words[getID()] = Word({
            text: text,
            bet: msg.value,
            owner: msg.sender,
            resolved: false,
            verdict: false
        });
    }

    /// Resolve a word status
    function resolveWord(uint id, bool verdict) public {
        require(words[id].resolved == false, "Word not found by ID or Word already resolved");
        require(msg.sender == words[id].owner, "Incorrect owner for this word");
        words[id].resolved = true;
        words[id].verdict = verdict;
        // TODO: return back value
        if (!verdict) {
            msg.sender.transfer(words[id].bet / 100 * 20);
            treasure.transfer(words[id].bet / 100 * 80);
        } else {
            msg.sender.transfer(words[id].bet / 100 * 99);
            treasure.transfer(words[id].bet / 100 * 1);
        }
    }

    /// Set a nickname for yourself
    function setNick(string name) public payable {
        require(msg.value >= nick_price, "Insufficient fees for setting nick");
        names[msg.sender] = name;
        treasure.transfer(msg.value);
    }

    /// Return nickname given the address
    function getNickByAddress(address ad) public view returns(string) {
        return names[ad];
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

    /// Returns total balance of Smart Contract
    function getContractBalance() public view returns(uint256) {
        return address(this).balance;
    }

    // private functions
    function getID() private returns(uint) {
        return counter++;
    }
}
