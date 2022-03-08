//client side application. 
//abstraction of contract assigned to var Election
var Election = artifacts.require("./Election.sol");

//declare a contract inject all accounts that exist in developmental environment 

contract("Election",function(accounts){
    var electionInstance;
    // first we are going to test contract is declared and initialized with correct no of candidates i.e. 2.
    //it - gets from mocha framework
    it("initializes with two candidates", function() {
// instance of deployed contract 
        return Election.deployed().then(function(instance) {
            // fetch candidatesCount asych.
            return instance.candidatesCount();
        }).then(function(count) {
            //asserts get from chai
            assert.equal(count, 2);
        });
    });
// test for contract is correct values like name id and vote
    it("it initializes the candidates with the correct values", function() {
        // deployed version 
        return Election.deployed().then(function(instance) {
            electionInstance = instance;
            return electionInstance.candidates(1);
        }).then(function(candidate) {
            //try to read first candidate . this call is asynchronous
            //first value is id 
            assert.equal(candidate[0], 1, "contains the correct id");
            // second value is name
            assert.equal(candidate[1], "Candidate 1", "contains the correct name");
            //third value is vote count
            assert.equal(candidate[2], 0, "contains the correct votes count");
            return electionInstance.candidates(2);
        }).then(function(candidate) {
            // similarly for second candidate
            assert.equal(candidate[0], 2, "contains the correct id");
            assert.equal(candidate[1], "Candidate 2", "contains the correct name");
            assert.equal(candidate[2], 0, "contains the correct votes count");
        });
    });


// to account who has voted and increament voter count 
it("it allows voters to cast vote", function() {
    return Election.deployed().then(function(instance) {
        electionInstance = instance;
        candidateID = 1 ;
        return electionInstance.vote (candidateId,{ from: accounts[0] });
    }).then(function(receipt) {
        return electionInstance.voters (accounts[0]);
    }).then(function(voted) {
        assert (voted, "the voter was marked as voted");        
        return electionInstance.candidates(candidateId);
    }).then (function(candidate) {
        var voteCount = candidate[2];
        assert.equal(voteCount,1,"increaments the candidates vote count");
    
        })
    });
});
