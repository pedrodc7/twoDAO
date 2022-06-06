import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0xEBC3E4C450Ff61dC312f5e5c8d0a9BCbe189818c");

(async () => {
    try {
        // log current roles
        const allRoles = await token.roles.getAll();

        console.log("Roles that exist right now", allRoles);

        // revoke all the superpowers your wallet had over the ERC20 contract
        await token.roles.setAll({ admin: [], minter: []});
        console.log("Roles after revoking ourselves", await token.roles.getAll());
        console.log("Successfully revoked our superpowers from the ERC-20 contract");

    } catch (error) {
        console.error("Failed to revoke ourselves from the DAO treasure", error);
    }
})();