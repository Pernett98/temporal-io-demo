import { Client, Connection } from "@temporalio/client"
import { getMessageQuery, startSignMessage } from "./workflows"
import { QueueName } from "./queueName"
import { Message } from "../models/Message"

export let client: Client

export const startClient = async () => {
    const connection = await Connection.connect()
    client = new Client({
        connection
    })
}

export const startSignMessageCall = (message: Message, uuid: string) => client.workflow
    .start(startSignMessage, {
        args: [message, uuid],
        taskQueue: QueueName.MESSAGE_QUEUE,
        // TODO: Not sure if should I use this uuid for the workflow
        workflowId: uuid,
    }).then((handle) => {
        console.log(`Started workflow ${handle.workflowId}`)
        return handle
    })


export const getMessageById = async (uuid: string) => {
    const handle = client.workflow.getHandle(uuid)
    const value = await handle.query(getMessageQuery)
    return value
}