import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const editionDrop = sdk.getEditionDrop("0x8281b61499acA4dCBa3e082b28c56070135a4187");

(async () => {
    try {
        const claimConditions = [{
            startTime: new Date(),
            maxQuantity: 200,
            price: 0,
            quantityLimitPerTransaction: 5,
            // this is a maximum, meaning that people will only be able to claim once a maximum of 5 NFTs
            waitInSeconds: MaxUint256,
        }]
        await editionDrop.claimConditions.set("0", claimConditions);
        console.log("✅ Successfully set claim condition!");
    } catch (error) {
        console.error("Failed to set claim condition", error);
    }
}) ();