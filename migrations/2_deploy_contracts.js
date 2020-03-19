const XFFToken = artifacts.require("XFFToken");
const name = "FugueFoundation";
const symbol = "XFF";

module.exports = function(deployer, network) {

    console.log(`${"-".repeat(30)}
    DEPLOYING XFFToken Contract...\n
    Using ` + network + ` network\n`);

  deployer.deploy(XFFToken, name, symbol);

};
