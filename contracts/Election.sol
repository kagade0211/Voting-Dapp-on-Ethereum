// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.6.0;

contract Election {
  //model candidate
  struct Candidate {
    uint id;
    string name;
    unit voteCount;
  }
  // Store candidates
  //Fetch Candidate
  mapping(uint => id) public candidates;
  //store candidates count
  uint public candidatesCount;

  function Election () public {

  }
  function addCandidate (string _name) private {
    candidatesCount ++;
    candidates[candidatesCount] = Candidate(candidantesCount, _name,0);
  }
}