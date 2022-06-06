import sdk from "./1-initialize-sdk.js";

const vote = sdk.getVote("0xE8c274C8330Fa5Fb329a052e5319d3D5918d6b63");
const token = sdk.getToken("0xEBC3E4C450Ff61dC312f5e5c8d0a9BCbe189818c");

(async () => {
    try {
        await token.roles.grant("minter", vote.getAddress());
        console.log("Seccessfully gave vote contract perimissions to act on token contract");
    } catch (error) {
        console.log("failed to grant vote contract permissions on token contract", error);
        process.exit(1);
    }

    try {
        // grab our wallet's token balance, remember -- we hold basically the entire supply right now!
        const ownedTokenBalance = await token.balanceOf(
            process.env.WALLET_ADDRESS
        );

        const ownedAmount = ownedTokenBalance.displayValue;
        const percent90 = Number(ownedAmount) / 100 * 90;

        await token.transfer(
            vote.getAddress(),
            percent90
        );

        console.log("✅ Successfully transferred " + percent90 + " tokens to vote contract");
    } catch (error) {
        console.error("failed to transfer tokens to vote contract", error);
    }
 })();