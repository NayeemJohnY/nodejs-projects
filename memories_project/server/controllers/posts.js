import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    // res.send("This Works");

    try {
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).send({error: error.message})
    }

}

export const createPost = async(req, res) => {
    // res.send("Post Creation");
    const post = req.body
    const newPost = await new PostMessage(post)
    try {
         await newPost.save()
         res.status(201).json(newPost)
    } catch (error) {
        res.status(409).send({error: error.message})
    }
}

export const updatePost = async(req, res) => {
    // res.send("Post Creation");
    const {id: _id} = req.params

    try {
        if(!mongoose.types.ObjectId.isValid(_id)) res.status(404).send("No post with the id " + _id)
         const updatedPost = await PostMessage.findByIdAndUpdate(_id, req.body, {new :true})
         res.status(201).json(updatedPost)
    } catch (error) {
        res.status(409).send({error: error.message})
    }
}

