import {ethers} from "hardhat"
import {BigNumber} from "ethers"

export interface networkConfigItem {
    name: string
    blockConfirmations: number
    gasLane: string
    vrfCoordinatorV2?: string
    premiumBaseFee: BigNumber
    subscriptionId: string
    callbackGasLimit: number
    lotteryEntranceFee: string
    lotteryInterval: number
}
export interface networkConfigInfo {
    [key: number]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    31337: {
        name: "localhost",
        blockConfirmations: 1,
        gasLane:
            "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", // fake because it won't be used
        premiumBaseFee: ethers.utils.parseEther("0.25"),
        subscriptionId: "0",
        callbackGasLimit: 100000, // 100'000 gas is default
        lotteryEntranceFee: ethers.utils.parseEther("0.01").toString(),
        lotteryInterval: 604800, // 1 week in seconds
    },
    5: {
        name: "goerli",
        blockConfirmations: 6,
        vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        gasLane:
            "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15", // 30 gwei
        premiumBaseFee: ethers.utils.parseEther("0.25"),
        subscriptionId: "0",
        callbackGasLimit: 100000, // 100'000 gas is default
        lotteryEntranceFee: ethers.utils.parseEther("0.01").toString(),
        lotteryInterval: 604800, // 1 week in seconds
    },
    80001: {
        name: "mumbai",
        blockConfirmations: 6,
        vrfCoordinatorV2: "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed",
        gasLane:
            "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f", // 500 gwei
        premiumBaseFee: ethers.utils.parseEther("0.0005"),
        subscriptionId: "0",
        callbackGasLimit: 100000, // 100'000 gas is default
        lotteryEntranceFee: ethers.utils.parseEther("20").toString(),
        lotteryInterval: 604800, // 1 week in seconds
    },
}

export const developmentChains = ["hardhat", "localhost"]
export const VRF_SUBSCRIPTION_FUND_AMOUNT = ethers.utils.parseEther("2")
