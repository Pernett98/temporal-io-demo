import { Worker } from "@temporalio/worker"
import * as activities from './activities'
import { QueueName } from "./queueName"


export const startWorkers = async () => {
    const worker = await Worker.create({
        workflowsPath: require.resolve('./workflows'),
        activities,
        taskQueue: QueueName.MESSAGE_QUEUE
    })

    await worker.run()
}

