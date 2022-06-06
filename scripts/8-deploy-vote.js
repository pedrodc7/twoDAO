import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        const voteContractAddress = await sdk.deployer.deployVote({
            name: "This is how stuff works around here",
            voting_token_address: "0xEBC3E4C450Ff61dC312f5e5c8d0a9BCbe189818c",
            voting_delay_in_blocks: 0,

            // 1 day, 6570 blocks
            voting_period_in_blocks: 6570,
            // minimum % of the total supply to pass after voting_period_in_blocks
            voting_quorum_fraction: 0,
            // minimum number of token each individual needs to be allowed to create a proposal
            proposal_token_treshold: 0,
        });

        console.log("✅ Successfully deployed vote contract, address:", voteContractAddress);
    } catch (err) {
        console.log("Failed to deploy vote contract", err);
    }
})();