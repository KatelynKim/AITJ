import { Schema, model, models } from 'mongoose'

const LikeOrDislikeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  liked: {
    type: Boolean,
    required: true,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
})

LikeOrDislikeSchema.index({ userId: 1, postId: 1, liked: 1 }, { unique: true })

const LikeOrDislike =
  models.LikeOrDislike || model('LikeOrDislike', LikeOrDislikeSchema)
export default LikeOrDislike
