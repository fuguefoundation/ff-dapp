import { Event } from './event';
import { EventVote } from './event';

export const EVENTSDATA: Event[] = [{
    name: "Payment Distributed",
    fromBlock: 2978493,
    address: "0x98dBF1F0c06ae508F226B36429fF1FcFa4Fb43A2",
    topic: "0xbb7369a2acb7e704f3d961db35e7f788b5ce06ba94c3a3ac468fee346549c6b7",
    contract: "FFDonation"
  },
  {
    name: "Donation Received",
    fromBlock: 2978493,
    address: "0x98dBF1F0c06ae508F226B36429fF1FcFa4Fb43A2",
    topic: "0xc3ab6874f28550ff0b3fc995b6303b04a40d68dec493aed05d47bf7ba9ab576f",
    contract: "FFDonation"
  }
];

export const EVENTSVOTEDATA: EventVote[] = [{
    name: "Elections",
    fromBlock: 9922004,
    address: "",
    topic: "",
    contract: "Elections.sol",
    admin: "",
    voter: "",
    desc: "List of all created elections by ID"
  },
  {
    name: "New Voter Request",
    fromBlock: 9922004,
    address: "",
    topic: "",
    contract: "Elections.sol",
    admin: "",
    voter: "",
    desc: "Alerts the admin that a voter requests their address be registered as eligible to vote"
  },
  {
    name: "Role Granted",
    fromBlock: 9922004,
    address: "",
    topic: "",
    contract: "Elections.sol",
    admin: "",
    voter: "",
    desc: "Specific role (VOTER or ADMIN) granted to a given address"
  },
  {
    name: "Voter Registered",
    fromBlock: 9922004,
    address: "",
    topic: "",
    contract: "Elections.sol",
    admin: "",
    voter: "",
    desc: "Address with VOTER role has registered for a specific election"
  },
  {
    name: "Vote Cast",
    fromBlock: 9922004,
    address: "",
    topic: "",
    contract: "Elections.sol",
    admin: "",
    voter: "",
    desc: "List of all votes cast for a specific election"
  },
  {
    name: "NFT Issued",
    fromBlock: 9922004,
    address: "",
    topic: "",
    contract: "ERC-721",
    admin: "",
    voter: "",
    desc: "Non-fungible token issued by ID to an address as a reward for casting a vote"
  },
  {
    name: "Vote Changed",
    fromBlock: 9922004,
    address: "",
    topic: "",
    contract: "Elections.sol",
    admin: "",
    voter: "",
    desc: "Vote changed for a specific election"
  },
  {
    name: "Vote Delegated",
    fromBlock: 9922004,
    address: "",
    topic: "",
    contract: "Elections.sol",
    admin: "",
    voter: "",
    desc: "Vote delegated to another eligible voter for a specific election"
  }
];