const Post = require('../model/post.model');

const addPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!req.body) {
        res
          .status(500)
          .json({ message: "Invalid inputs passed, please check your data." });
      }
  
    const post = await Post.create({ title, content });
    res.status(200).json({
        status: true,
        message: "Create Post successfully",
        id: post.id,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 const getPost = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json({
        status: true,
        message: "Post Given successfully",
        data: posts,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({
        status: true,
        message: "Edit Post successfully",
        id: post.id,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

 const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await post.destroy();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {addPost, getPost, updatePost, deletePost};