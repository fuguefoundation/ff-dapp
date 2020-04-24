<p align="center">
  <img src="https://github.com/fuguefoundation/ff-dapp/blob/master/src/assets/images/logo_150.png">
</p>

## About the Project

[Fugue Foundation](https://fuguefoundation.org) is a nonprofit dedicated to using open source, decentralized technology to achieve charitable goals rooted in the principles of effective altruism. Read this [blog post](https://blog.fuguefoundation.org/ff-platform-overiew/) to learn more about the use case and architecture of our flagship project, the Fugue Foundation decentralized application.

## Setup

Have a look at a working [prototype](https://fuguefoundation.org/dev/prototype_v0).

1. Clone the repo and `npm install`
2. Install [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation) and run `truffle compile` to generate contract abstracts inside `/build/contracts` folder
    - Currently the smart contract capabilities of the dapp are being developed in a [different repo](https://github.com/fuguefoundation/ff-contracts). These contracts are here as filler for when the repos are integrated.
3. To get the Block Native integration working, you'll need to add your own API key into `src/environments/environment.ts` (dev) or `src/environments/environment.prod.ts` (production)
4. `ng serve` and navigate to `http://localhost:4200/`

## Testing

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).  Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Details

The app is currently using mock data pulled in using Angular's `InMemoryDataService`. This will ultimately be replaced by a RESTful API, a capability being developed in [this repo](https://github.com/fuguefoundation/ff-api). 

<p align="center">
  <img src="https://github.com/fuguefoundation/ff-dapp/blob/master/src/assets/images/ff-dapp-flow.jpg">
</p>

## Contributing to the project

This is an open source project. Contributions are welcomed & encouraged! :smile: If you'd like to improve the code base, please see [Contributing Guidelines](CONTRIBUTE.md).

## References
* [Ethereum](https://ethereum.org/)
* [Angular CLI](https://github.com/angular/angular-cli)
* [Truffle](http://truffleframework.com/docs/)
* [Open Zeppelin](https://docs.openzeppelin.com/openzeppelin/)
* [Block Native](https://docs.blocknative.com/)
