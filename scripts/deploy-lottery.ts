import {ethers, network} from "hardhat"
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers"
import {
    networkConfig,
    developmentChains,
    VRF_SUBSCRIPTION_FUND_AMOUNT,
} from "../helper-hardhat-config"
import {VRFCoordinatorV2Mock} from "../typechain-types"
import {deployMocks} from "./deploy-mocks"
import {verify} from "../utils/verify"

const main = async () => {
    const accounts: SignerWithAddress[] = await ethers.getSigners()
    const deployer: SignerWithAddress = accounts[0]
    const chainId = network.config.chainId as number

    // If mock address is empty string it means no mocks where deployed
    // For that reason we get the real coordinator address from config file
    let vrfCoordinatorV2MockAddress: string, subscriptionId: string
    const vrfCoordinatorV2Mock: VRFCoordinatorV2Mock | null =
        await deployMocks()

    if (developmentChains.includes(network.name) && vrfCoordinatorV2Mock) {
        vrfCoordinatorV2MockAddress = vrfCoordinatorV2Mock.address

        // Create VRF subscription and get its id from event
        const txResponse = await vrfCoordinatorV2Mock.createSubscription()
        const txReceipt = await txResponse.wait()
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        subscriptionId = txReceipt.events![0].args!.subId.toString()
        await vrfCoordinatorV2Mock.fundSubscription(
            subscriptionId,
            VRF_SUBSCRIPTION_FUND_AMOUNT
        )
    } else {
        vrfCoordinatorV2MockAddress = networkConfig[chainId][
            "vrfCoordinatorV2"
        ] as string
        subscriptionId = networkConfig[chainId]["subscriptionId"] as string
    }

    const lotteryEntranceFee = networkConfig[chainId]["lotteryEntranceFee"]
    const gasLane = networkConfig[chainId]["gasLane"]
    const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
    const loteryInterval = networkConfig[chainId]["lotteryInterval"]
    const args = [
        vrfCoordinatorV2MockAddress,
        lotteryEntranceFee,
        gasLane,
        subscriptionId,
        callbackGasLimit,
        loteryInterval,
    ] as const // "as const" makes values readonly and value spread used in deploy is enabled

    console.log("Deploying lottery contract...")
    const lotteryFactory = await ethers.getContractFactory("Lottery", deployer)
    const lottery = await lotteryFactory.deploy(...args)
    await lottery.deployed()

    console.log("Lottery deployed!")
    console.log("--------------------------------------------------")

    verify(lottery.address, args)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
