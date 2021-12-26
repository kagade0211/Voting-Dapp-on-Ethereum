// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.6.0; 

contract Election {
  // store candidate
  //read constructor
  string public candidate;
  //constructor
  constructor () public { 
    candidate = "Candidate1";
  }
}