import LikeOrDislike from '@models/likeOrDislike'
import { connectToDB } from '@utils/database'

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const { userId, postId } = params
    const like = await LikeOrDislike.findOne({ userId, postId })
    if (!like) return new Response('{}', { status: 404 })
    return new Response(JSON.stringify(like), { status: 200 })
  } catch (error) {
    console.log('error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()
    const { userId, postId } = params

    await LikeOrDislike.findOneAndDelete({ userId, postId })

    return new Response('Like undone successfully', { status: 200 })
  } catch (error) {
    return new Response('Error deleting like', { status: 500 })
  }
}

export const POST = async (request) => {
  try {
    const { userId, postId, liked } = await request.json()

    await connectToDB()
    const options = {
      new: true,
      upsert: true,
    }

    const existingLike = await LikeOrDislike.findOne({ userId, postId })

    // If a user is liking/disliking a post that he has liked/disliked already, just delete the record.
    if (existingLike && existingLike.liked === liked) {
      await LikeOrDislike.findOneAndDelete({ id: existingLike._id })
      return new Response(JSON.stringify({ liked: null }), {
        status: 201,
      })
    }

    const createdOrUpdatedLike = await LikeOrDislike.findOneAndUpdate(
      { userId, postId },
      { userId, postId, liked },
      options
    )
    return new Response(JSON.stringify(createdOrUpdatedLike), {
      status: 201,
    })
  } catch (error) {
    console.log('error:', error)
    return new Response('Failed to save the like in the database.', {
      status: 500,
    })
  }
}
