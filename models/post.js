import { Schema, model, models } from 'mongoose'
import OptionSchema from '@models/option'

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  content: {
    type: Object,
    required: true,
  },
  upVoteCount: {
    type: Number,
    default: 0,
  },
  downVoteCount: {
    type: Number,
    default: 0,
  },
  options: [OptionSchema],
  votingLength: {
    type: Number,
    required: true,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
})

const Post = models.Post || model('Post', PostSchema)
export default Post
