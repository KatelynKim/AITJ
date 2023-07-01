import { Schema, model, models } from 'mongoose'

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  content: {
    type: String,
    required: true
  },
  upVoteCount: {
    type: Number,
    default: 0
  },
  downVoteCount: {
    type: Number,
    default: 0
  },
  pollID: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

const Post = models.Post || model('Post', PostSchema)
export default Post
