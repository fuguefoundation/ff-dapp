export interface ETHPrice {
    status: string;
    message: string;
    result: {
        ethbtc: string;
        ethbtc_timestamp: string;
        ethusd: string;
        ethusd_timestamp: string;
    };
  }