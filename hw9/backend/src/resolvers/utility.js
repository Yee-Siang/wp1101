

const makeName = (name1, name2) => {
    return [name1, name2].sort().join("_");
};

const checkUser = (db, name, errFunc) => {
    if (!name) throw new Error("Missing user name for " + errFunc);
    return db.UserModel.findOne({ name });
};

const checkChatBox = (db, chatBoxName, errFunc) => {
    if (!chatBoxName) throw new Error("Missing chatBox name for " + errFunc);
    return db.ChatBoxModel.findOne({ name: chatBoxName });
};

const checkMessage = async (db, from, to, message, errFunc) => {
    const chatBoxName = makeName(from, to);
    return {
        chatBox: await checkChatBox(db, chatBoxName, errFunc),
        sender: await checkUser(db, from, errFunc),
        to: await checkUser(db, to, errFunc),
    }
}