import { Chat } from "../../dao/models/Chat.model.js";

class ChatManager {
    async addMessage(message) {
        try {
            console.log(message)
            let CM = new Chat(message)
            let addingMessage = await CM.save()
            if (!addingMessage) {
                console.log('No se envió el mensaje');
                return false;
            }
            return addingMessage
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getMessage() {
        try {
            let gettingMessage = await Chat.find({})
            if (!gettingMessage) {
                console.log('mensajes vacios')
                return gettingMessage = []
            }
            return gettingMessage
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deleteMessages(){
        try {
            let deletingMessages = await Chat.deleteMany({})
            if(!deletingMessages){
                return false
            }
            return deletingMessages
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export { ChatManager }