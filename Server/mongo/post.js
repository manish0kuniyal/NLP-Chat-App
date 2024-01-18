const mongoose=require('mongoose')
const {model}=mongoose

const postSchema=new mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
},{
    timestamp:true,
})

const PostModel=model('Post',postSchema)
module.exports=PostModel