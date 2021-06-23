![GitHub](https://img.shields.io/github/license/fuguefoundation/ff-dapp)

<p align="center">
  <img src="https://github.com/fuguefoundation/ff-dapp/blob/master/src/assets/images/logo_150.png">
</p>

## About the Project

[Fugue Foundation](https://fuguefoundation.org) is a nonprofit dedicated to using open source, decentralized technology to achieve charitable goals rooted in the principles of effective altruism (EA). Read this [blog post](https://blog.fuguefoundation.org/ff-platform-overiew/) to learn more about the use case and architecture of our flagship project, the Fugue Foundation charitable donation platform and effective altruism research API.

This dapp also includes the following functionality, with more features on the way:
* Data queries of EA charities through a RESTful API
* Decentralized voting platform (Ropsten testnet) for registered voters
* Link to crypto donation impact calculator
* Explore on-chain data from the donation and voting contracts

## Setup

Have a look at a working [prototype](https://fuguefoundation.org/dev/dapp).

1. Clone the repo and `npm install`
2. Uncomment lines in following files to allow for local development with the HTTP requests:
    * `app.module.ts`: import statements and import declaration in `NgModule` for `HttpClientInMemoryWebApiModule` and `InMemoryDataService`
    * `evaulators.service.ts`: `private evaluatorsUrl`
    * `orgs.service.ts`: `private orgsUrl`
3. Adjust environment variables as appropriate inside `src/environments` folder (i.e., add API keys) for Block Native and Etherscan integration (optional).
4. `ng serve` and navigate to `http://localhost:4200/`

## Testing

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).  Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Integration

The live prototype is pulling data from a RESTful API, and the `web3` occurs on smart contracts currently deployed to the Goerli Ethereum testnet. For more information, see these repos: 

- API: https://github.com/fuguefoundation/ff-api
- Smart Contracts: https://github.com/fuguefoundation/ff-contracts
- Docs: https://github.com/fuguefoundation/ff-docs

<p align="center">
  <img src="https://github.com/fuguefoundation/ff-dapp/blob/master/src/assets/images/ff-dapp-flow.jpg">
</p>

## Contributing to the project

This is an open source project. Contributions are welcomed & encouraged! :smile: If you'd like to improve the code base, please see [Contributing Guidelines](https://github.com/fuguefoundation/ff-dapp/blob/master/.github/CONTRIBUTING.md).

## Workspace
* Angular: v12
* Angular CLI: v12
* Node: v14

## References
* [Web3](https://github.com/ethereum/wiki/wiki/JavaScript-API)
* [Angular CLI](https://github.com/angular/angular-cli)
* [Block Native](https://docs.blocknative.com/)
