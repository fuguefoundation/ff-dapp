export class Event {
	name: string;
	fromBlock: number;
	address: string;
	topic: string;
	contract: string;
}

export class EventVote {
	name: string;
	fromBlock: number;
	address: string;
	topic: string;
	contract: string;
    admin: string;
    voter: string;
    desc: string;
}