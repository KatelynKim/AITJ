import { Schema, model, models } from 'mongoose'

const OptionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  voteCount: {
    type: Number,
    default: 0
  }
})

const PollSchema = new Schema({
  postID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  options: [OptionSchema]
})

const Poll = models.User || model('Poll', PollSchema)
export default Poll
