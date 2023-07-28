import Fastify from "fastify"
import { getMessageById, startSignMessageCall } from "../temporal/client"
import { Message } from "../models/Message"

const fastify = Fastify({
    logger: true
})

fastify.post('/messages/:messageId', async (req, res) => {
    // @ts-ignore
    const messageId: string = req.params.messageId
    const message: Message = req.body as Message
    await startSignMessageCall(message, messageId)
    res.send({ info: 'signing process started' })
})

fastify.get('/messages/:messageId', async (req, res) => {
    // @ts-ignore
    const result = await getMessageById(req.params?.messageId as string)
    res.send(result)
})

export const startServer = async () => {
    const address = await fastify.listen({port: 8081})
    console.log(`Http server running on ${address}`)
}