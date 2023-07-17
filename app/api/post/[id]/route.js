import Post from '@models/post'
import { connectToDB } from '@utils/database'

export const GET = async (request, { params }) => {
  try {
    await connectToDB()

    const post = await Post.findById(params.id)
    if (!post) return new Response('Post Not Found', { status: 404 })

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const { post, tag } = await request.json()

  try {
    await connectToDB()

    // Find the existing prompt by ID
    const existingPost = await Post.findById(params.id)

    if (!existingPost) {
      return new Response('Prompt not found', { status: 404 })
    }

    // Update the prompt with new data
    existingPost.prompt = prompt
    existingPost.tag = tag

    await existingPost.save()

    return new Response('Successfully updated the post', { status: 200 })
  } catch (error) {
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
