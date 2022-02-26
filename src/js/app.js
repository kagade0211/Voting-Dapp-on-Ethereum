App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  // first initialise app

  init: function() {
    return App.initWeb3();
  },
// initialise web3 to connect client side application to local blockchain.
  initWeb3: function() { // this function initialises our connection of client application to local blockchain
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask. we get instance of
      //web-3 attached to window through metamask. it turns chrome browser to web-3 browser which connect to 
      //or ethreum blockchain conected browser.
      //set this web3 provider from browser to applications web3 provider
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance (i.e. from local blockchain instance ) if no web3 instance (i.e. metamask) provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },
//initialise contract
  initContract: function() {
    // this function loads contract in client side application so we can interact with it 
    // load json file of election artifact. use json to generate truffle contract
    //getJSON works on election.json because we are using  the browser sync package  that comes with 
    //truffle box (i.e. bs-config.json file in project folder) , it is configured to read files in build/contracts directory 
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  //initialise app as soon as window loads
  $(window).load(function() {
    App.init();
  });
});
