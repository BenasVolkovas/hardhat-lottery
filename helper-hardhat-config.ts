export const developmentChains = ["hardhat", "localhost"]
export const networkConfig = {
    31337: {
        name: "localhost",
        blockConfirmations: 1,
        // subscriptionId: "588",
        // gasLane:
        //     "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        // keepersUpdateInterval: "30",
        // raffleEntranceFee: "100000000000000000", // 0.1 ETH
        // callbackGasLimit: "500000", // 500,000 gas
    },
    // 5: {
    //     name: "goerli",
    //     blockConfirmations: 6,
    //     vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
    //     // subscriptionId: "",
    //     // gasLane: "", // 30 gwei
    //     // keepersUpdateInterval: "",
    //     // raffleEntranceFee: "", // 0.1 ETH
    //     // callbackGasLimit: "", // 500,000 gas
    // },
    // 80001: {
    //     name: "mumbai",
    //     blockConfirmations: 6,
    // },
}
