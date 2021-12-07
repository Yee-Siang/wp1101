import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

const savePost = async (title, content) => {
    //const existing = await Post.findOne({ name: name, subject: subject });
    //if (existing) throw new Error(`data ${name} exists!!`);
    if (existing) {
        try {

            ////////////////////
            var myquery = { name: name, subject: subject };
            var newvalues = { $set: { score: score } };
            User.updateOne(myquery, newvalues, function (err, res) { })
            ///////////////////
            return `Updating(${name},${subject},${score})`;
        } catch (e) { throw new Error("User Criterion Error: " + e); }
    }
    else {
        try {
            const newUser = new User({ name, subject, score });
            console.log("Created user", newUser);
            const re = newUser.save();
            return `Adding(${name},${subject},${score})`;
        } catch (e) { throw new Error("User Criterion Error: " + e); }
    }

};

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/api/allPosts', async (req, res) => {
    try {
        ////////////////////
        const allPost = await Post.find({}).sort({ timestamp: -1 });
        ///////////////////

        console.log(allPost);
        res.status(200).send({ message: 'success', data: [allPost] });
    } catch (e) { res.status(403).send({ message: "error", data: null }) }

})
// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/api/postDetail', async (req, res) => {
    let postId = req.body.pid;
    let existing;
    existing = await Post.findOne({ postId: `${postId}` });
    if (existing) {
        res.status(200).send({ message: "success", post: existing })
    }
    else {
        res.status(403).send({ message: "error", post: null })
    }

})

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/api/newPost', async (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    res.json({ message: `${content}`, card: 'ok' })
})


// TODO 5-(1): create the 4th API (/api/post)

export default router