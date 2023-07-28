import { startServer } from "./http_server/httpServer";
import { startClient as startTemporalClient } from "./temporal/client";
import { startWorkers } from "./temporal/worker";
import { genKeyPair } from "./utils/keypair";

(async () => {
    try {
        genKeyPair()
        await startTemporalClient()
        await Promise.all([startServer(), startWorkers()])
    } catch (e) {
        console.log("Error starting the server ", e)
        process.exit(1)
    }
})()