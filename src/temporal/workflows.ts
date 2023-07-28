import { defineQuery, proxyActivities, setHandler, sleep,  } from "@temporalio/workflow";
import type * as activities from "./activities"
import { Message, MessageStatus } from "../models/Message";
import { QueryName } from "./queryName";


export type GetMessageResult = 
    Readonly<{ status: MessageStatus.PENDING }> | 
    Readonly<{ status: MessageStatus.SIGNED, encryptedMessage: string }>

export const getMessageQuery = defineQuery<GetMessageResult>(QueryName.GET_MESSAGE)

const { signMessage } = proxyActivities<typeof activities>({
    startToCloseTimeout: "1 minute"
})

export const startSignMessage = async (message: Message, uuid: string) => {
    let isSigned = false
    let signedMessage: string
    setHandler(getMessageQuery, () => {
        if (isSigned) {
            return { encryptedMessage: signedMessage, status: MessageStatus.SIGNED } as const
        } 
        return { status:MessageStatus.PENDING } as const
    })
    await sleep('30s')
    signedMessage = await signMessage(message, uuid)
    isSigned = true
}


