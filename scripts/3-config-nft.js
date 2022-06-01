import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x8281b61499acA4dCBa3e082b28c56070135a4187");

(async () => {
    try {
        await editionDrop.createBatch([
            {
                name: "bcnft",
                description: "This NFT will give you access to the twoDAO",
                image: readFileSync("scripts/assets/diamond.png"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.log("failed to create the new NFT", error);
    }
}) ();