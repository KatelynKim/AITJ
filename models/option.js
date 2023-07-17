import { Schema } from 'mongoose'

const OptionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  voteCount: {
    type: Number,
    default: 0,
  },
})

export default OptionSchema
