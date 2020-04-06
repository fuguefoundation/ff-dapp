<p align="center">
  <img src="https://github.com/fuguefoundation/dapp-nonprofit/blob/master/src/assets/images/logo_150.png">
</p>

## Quick Start

1. Clone the repo
2. `npm install`
3. Install [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation) and run `truffle compile` to generate contract abstracts inside `/build/contracts` folder
    - Currently the smart contract capabilities of the dapp are being developed in a [different repo](https://github.com/fuguefoundation/ff-contracts). These contracts are here as filler for when the repos are integrated.
4. `ng serve` and navigate to `http://localhost:4200/`
    - You'll need to create and add environment variables in `src/environments/environment.ts` and `src/environments/environment.prod.ts`

```
export const environment = {
  production: false, //or true if prod.ts
  BLOCK_NATIVE_KEY: "api-key-here"
};
```

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
