export interface Org {
  id: string;
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
    url: string;
    logo: string;
    image: string;
    focus: string;
    short_desc: string;
    desc: string;
  };
  stats: {
    metric1: string;
    metric2: number;
  };
  request: {
    type: string;
    description: string;
    url: string;
  };
}