## v0.7.2020

* Upgrade to Angular 10
* Created `explore` component. This enables calls to the Etherscan API to retrieve event data. There is also a script that parses a transaction hash to display a unique series of colors. The intent is to integrate this with the FF NFT.
    * Created new `Colors` and `Events` models for typescript
* Check box acknowledgement of Terms of Service before donation submit is enabled
* Link added in side nav to the Impact Calculator
* Integration of Google Analytics
* Edits to `angular.json` and `tsconfig` to suppress warnings (`allowedCommonJsDependencies`)

## v0.719.2020

* Added SVG kudos to `explore` component
* Blocknative
    * Integrated onclick into notify popups, linking to Etherscan for the tx
    * Allowed `connectWallet` to retain state in localstorage and when change between components
    * Allowed users to `changeWallet`, clearing out localstorage
    * Added Authereum and Dapper as options