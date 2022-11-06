import {deployMocks} from "./script-deploy-mocks"

deployMocks().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
