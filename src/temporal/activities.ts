import { Message } from "../models/Message";
import { encrypt } from "../utils/keypair";

export const signMessage = async (message: Message, uuid: string): Promise<string> => {
    return encrypt(JSON.stringify(message));
} 