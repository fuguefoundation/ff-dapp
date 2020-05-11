export interface Evaluator {
  id: string;
  name: string;
  url: string;
  logo: string;
  image: string;
  focus: string;
  short_desc: string;
  desc: string;
  request: {
    type: string;
    description: string;
    url: string;
  }
}