import {deployLottery} from "./script-deploy-lottery"

deployLottery().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
