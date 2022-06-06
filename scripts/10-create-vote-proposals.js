import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

const vote = sdk.getVote("0xE8c274C8330Fa5Fb329a052e5319d3D5918d6b63");
const token = sdk.getToken("0xEBC3E4C450Ff61dC312f5e5c8d0a9BCbe189818c");


(async () => {

    try {
        const amount = 420;
        const description = "Should the DAO mint additional " + amount + " tokens into the treasury?";
        const executions = [
            {
                toAddress: token.getAddress(),
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    "mintTo", [
                    vote.getAddress(),
                    ethers.utils.parseUnits(amount.toString(), 18),
                ]
                ),
            }
        ];
        await token.delegateTo(process.env.WALLET_ADDRESS);
        await vote.propose(description, executions);

        console.log("✅ Successfully created proposal to mint tokens");
    } catch(error) {
        console.log("failed to create first proposal", error);
        process.exit(1);
    }


    try {
        // create proposal to transfer ourselves 69 tokens for being awesome.
        const amount = 69;
        const description = "Should de DAO transfer " + amount + " tokens from the treasury to " + 
            process.env.WALLET_ADDRESS + " for being awasome?";
        const executions = [
            {
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    // we are doing a transfer from the treasury to our wallet
                    "transfer",
                    [
                        process.env.WALLET_ADDRESS,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
                toAddress: token.getAddress(),
            },
        ];

        await token.delegateTo(process.env.WALLET_ADDRESS);
        await vote.propose(description, executions);

        comsole.log("✅ Successfully created proposal to reward ourselves from the treasury");
    } catch (error) {
        console.error("failed to create second proposal", error);
    }
})();
