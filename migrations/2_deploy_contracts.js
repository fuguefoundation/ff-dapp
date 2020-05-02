const FFKudos = artifacts.require("FFKudos");
const FFPaymentSplit = artifacts.require("FFPaymentSplit");
const name = "FugueFoundation";
const symbol = "FF";
const payees = ["address_here"]
const evaluatorIds = [1];

module.exports = function(deployer, network) {

    console.log(`${"-".repeat(30)}
    DEPLOYING FFKudos Contract...\n
    Using ` + network + ` network\n`);

    deployer.deploy(FFKudos, name, symbol);

    console.log(`${"-".repeat(30)}
    DEPLOYING FFPaymentSplit Contract...\n`);

    deployer.deploy(FFPaymentSplit, payees, evaluatorIds);
};
