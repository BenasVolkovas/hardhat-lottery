import {run, network} from "hardhat"
import {developmentChains} from "../helper-hardhat-config"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const verify = async (contractAddress: string, args: any[]) => {
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        console.log("Verifying contract on etherscan...")
        try {
            await run("verify:verify", {
                address: contractAddress,
                constructorArguments: args,
            })
            console.log("Verified!")
            console.log("--------------------------------------------------")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            if (e.message.toLowerCase().includes("already verified")) {
                console.log("Already verified!")
            } else {
                console.log(e)
            }
        }
    } else {
        console.log("Not in development network OR no etherscan api key found")
    }
}
