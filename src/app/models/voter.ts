export class Voter {
    weight: number;
    voted: boolean;
    registered: boolean;
    hasChangedVote: boolean;
    delegate: string;
    vote: number;
    registerAddr: string;
    electionID: number; 
    delegateTo: string;
    delegateElectionID: number;
    changeVoteProposal: number;
    changeVoteElectionID: number;
    show: boolean;
}