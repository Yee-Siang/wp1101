import { checkUser, newUser, makeName, checkChatBox, newChatBox } from './utility'

const Mutation = {
  async createChatBox(parent, { name1, name2 }, { db, pubsub }, info) {

    const { chatBox, sender } = await checkMessage(
      db,
      from,
      to,
      message,
      "createMessage"
    );
    /*
    if (!name1 || !name2) { throw new Error("Missing ChatBox name for CreateChatBox"); }

    if (!(await checkUser(db, name1, "createChatBox"))) {
      console.log("User dose not exist for CreateChatBox: " + name1);
    }

    if (!(await checkUser(db, name2, "createChatBox"))) {
      console.log("User dose not exist for CreateChatBox: " + name2);
    }
    */

    if (!chatBox) throw new Error("ChatBox not found for createMessage.");
    if (!sender) throw new Error("User not found: " + from);

    const chatBoxName = makeName(from, to);
    const newMsg = await newMessage(db, sender, message);
    chatBox.messages.push(newMsg);
    await chatBox.save();

    pubsub.publish(`chatBox ${chatBoxName}`, {
      message: { mutation: "CREATED", message: newMsg },
    });
    return newMsg;
  }
}