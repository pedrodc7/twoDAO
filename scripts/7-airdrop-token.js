import sdk from "./1-initialize-sdk.js";

const editionDrop = sdk.getEditionDrop("0x8281b61499acA4dCBa3e082b28c56070135a4187");

const token = sdk.getToken("0xEBC3E4C450Ff61dC312f5e5c8d0a9BCbe189818c");

(async () => {
    try {
        const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

        if (walletAddresses.length == 0) {
            console.log("No NFTs have benn claimed yet, maybe get some friends to claim your free NFTs!");
            process.exit(0)
        }

        const airdropTargets = walletAddresses.map((address) => {
            const randomAmount = Math.floor(Math.random() * (100 - 10 +1) + 10);
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);
            const airdropTarget = {
                toAddress: address,
                amount: randomAmount,
            };
            return airdropTarget;
        });

        console.log("Starting airdrop...");
        await token.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    } catch (err) {
        console.log("Failed to airdrop tokens", err)
    }
})();