import { Event } from './event';

export const EVENTSDATA: Event[] = [
  {
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