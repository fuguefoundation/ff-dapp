export interface Orgs {
    count: number;
    nonprofits: [{
        _id: string;
        name: string;
        url: string;    
        address: string;
        logo: string;
        image: string;
        short_desc: string;
        desc: string;
        evaluatorId: {
            _id: string;
            name: string;
        };
        stats: {
            metric1: string;
            metric2: number;
        };
        request: {
            type: string;
            url: string;
        }
    }]
  }