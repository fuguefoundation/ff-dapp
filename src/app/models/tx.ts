export interface Transaction {
    status: String, // current status of the transaction
    hash: String, // transaction hash
    to: String, // the address the transaction is being sent to
    from: String, // the address the transaction is being sent from
    gas: Number, // the gas in wei
    gasPrice: String, // the gasPrice in wei
    nonce: Number, // the nonce of the transaction
    value: String, // the value being sent
    eventCode: String, // the event code for this status
    blockHash: String, // the hash of the block that this transaction was included in
    blockNumber: Number, // the block number of the block that this transaction was included in
    input: String, // hex string of the input data
    transactionIndex: Number, // same as the nonce
    r: String, // transaction signature
    s: String, // transaction signature
    v: String, // transaction signature
    counterParty: String, // address of the counterparty of the transaction when watching an account
    direction: String, // the direction of the transaction in relation to the account that is being watched ("incoming" or "outgoing")
    watchedAddress: String, // the address of the account being watched
    originalHash: String, // if a speedup or cancel status, this will be the hash of the original transaction
    asset: String, // the asset that was transferred
    contractCall: { // if transaction was a contract call otherwise undefined
      contractAddress: String, // the address of the contract that has been called
      contractType: String, // the contract type eg: ERC20, ERC721
      methodName: String, // the name of the method that was called
      params: {
        // params that the contract method was called with
      }
    }
  }