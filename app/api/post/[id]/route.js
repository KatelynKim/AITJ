import Post from '@models/post'
import { connectToDB } from '@utils/database'

export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const post = await Post.findById(params.id)
    if (!post) return new Response('Post Not Found', { status: 404 })

    post.viewCount += 1
    await post.save()

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    console.log('error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const { title, upVoteCount, downVoteCount } = await request.json()
  console.log('upVotecount', upVoteCount)

  try {
    await connectToDB()

    const existingPost = await Post.findById(params.id)
    if (!existingPost) {
      return new Response('Post not found', { status: 404 })
    }

    // Update the prompt with new data
    existingPost.title = title
    existingPost.upVoteCount = upVoteCount
    existingPost.downVoteCount = downVoteCount

    await existingPost.save()

    return new Response('Successfully updated the post', { status: 200 })
  } catch (error) {
    console.log('error:', error)
    return new Response('Error Updating Prompt', { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    // Find the prompt by ID and remove it
    await Post.findByIdAndRemove(params.id)

    return new Response('Post deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Error deleting prompt', { status: 500 })
  }
}
