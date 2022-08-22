import {ethers, network} from "hardhat"
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers"
import {networkConfig, developmentChains} from "../helper-hardhat-config"
import {VRFCoordinatorV2Mock} from "../typechain-types"
import {deployMocks} from "./deploy-mocks"

const main = async () => {
    const accounts: SignerWithAddress[] = await ethers.getSigners()
    const deployer: SignerWithAddress = accounts[0]
    const chainId: number = network.config.chainId as number
    // let vrfCoordinatorV2MockAddress: string = await deployMocks()

    console.log(networkConfig[chainId as keyof typeof networkConfig])

    // if (!vrfCoordinatorV2MockAddress) {
    // }

    // const lockFactory = await ethers.getContractFactory("Lottery", deployer)
    // const lock = await lockFactory.deploy()
    // await lock.deployed()
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
