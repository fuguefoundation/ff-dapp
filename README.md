<p align="center">
  <img src="https://github.com/fuguefoundation/ff-dapp/blob/master/src/assets/images/logo_150.png">
</p>

## Stop COVID-19 Hackathon Deliverables

1. Working Prototypes: 
    - [Decentralized App](https://fuguefoundation.org/dev/prototype_v0)
    - [RESTful API](https://ff-effective-altruism-api.herokuapp.com/api/v0/nonprofits)
2. Pitch Presentation:
    - [Video (YouTube)](https://www.youtube.com/watch?v=NHzl7chYPq4)
    - [PDF](https://fuguefoundation.org/docs/ff-prospectus.pdf) or [HTML](https://fuguefoundation.org/docs/) 
4. Other relevant links:
    - [Fugue Foundation homepage](https://fuguefoundation.org)
    - [API GitHub repo](https://github.com/fuguefoundation/ff-api)
    - [Smart Contracts GitHub repo](https://github.com/fuguefoundation/ff-contracts)
    - [Docs repo](https://github.com/fuguefoundation/ff-docs)

## About the Project

[Fugue Foundation](https://fuguefoundation.org) is a nonprofit dedicated to using open source, decentralized technology to achieve charitable goals rooted in the principles of effective altruism. Read this [blog post](https://blog.fuguefoundation.org/ff-platform-overiew/) to learn more about the use case and architecture of our flagship project, the Fugue Foundation charitable donation platform and effective altruism research API.

## Setup

Have a look at a working [prototype](https://fuguefoundation.org/dev/prototype_v0).

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

This is an open source project. Contributions are welcomed & encouraged! :smile: If you'd like to improve the code base, please see [Contributing Guidelines](CONTRIBUTE.md).

## References
* [Web3](https://github.com/ethereum/wiki/wiki/JavaScript-API)
* [Angular CLI](https://github.com/angular/angular-cli)
* [Block Native](https://docs.blocknative.com/)
