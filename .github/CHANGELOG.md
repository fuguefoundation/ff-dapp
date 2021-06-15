## 20210614

* Incorporated voting functionality on Ropsten
    * new Vote component
    * updates to `etherscan.service` and `explore.component`
* Added Truffle Contract
* Update Angular v12; Update Angular Material v12 using `ng update`, which automatically altered several core documents as well as some of the docs in `src`
* Had to make adjustments to `polyfills.ts`, `index.html`, `tsconfig.app.json`, and add
`paths` to `tsconfig.json` to address browser compatability errors
* Updated all remaining packages to current version

## 20210214

* Changed repo from `https` to `ssh` version control

## v0.725.2020
* Added caching to API calls using `HTTP_INTERCEPTORS` | [reference](https://blog.fullstacktraining.com/caching-http-requests-with-angular/)
* Added LeaderBoard in `explore` component, pulls top donor and recipient values from Etherscan events
* Close sidenav with first onclick, added icons

## v0.719.2020

* Added SVG kudos to `explore` component
* Introduced slider (and corresponding form validation) into `donate` component to help conversion of ETH to wei
* Blocknative
    * Integrated onclick into notify popups, linking to Etherscan for the tx
    * Allowed `connectWallet` to retain state in localstorage and when change between components
    * Allowed users to `changeWallet`, clearing out localstorage
    * Added Authereum and Dapper as options

## v0.7.2020

* Upgrade to Angular 10
* Created `explore` component. This enables calls to the Etherscan API to retrieve event data. There is also a script that parses a transaction hash to display a unique series of colors. The intent is to integrate this with the FF NFT.
    * Created new `Colors` and `Events` models for typescript
* Check box acknowledgement of Terms of Service before donation submit is enabled
* Link added in side nav to the Impact Calculator
* Integration of Google Analytics
* Edits to `angular.json` and `tsconfig` to suppress warnings (`allowedCommonJsDependencies`)

