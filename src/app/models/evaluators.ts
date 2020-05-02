export interface Evaluators {
    count: number;
    evaluators: [{
        _id: string;
        name: string;
        url: string;
        logo: string;
        image: string;
        focus: string;
        short_desc: string;
        desc: string;
        request: {
            type: string;
            url: string;
        }
    }]
  }