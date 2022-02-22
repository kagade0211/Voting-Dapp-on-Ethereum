//client side application. 
//abstraction of contract
var Election = artifacts.require("./Election.sol");
//declare a contract inject all accounts that exist in developmental environment
//
contract("Election",function(accounts){
    it("initializes with two candidates",function(){
        return Election.deployed().then(function(instance){
            return instance.candidatesCount();
        }).then(function(count){
            assert.equal(count, 2);
        });

    });
})
