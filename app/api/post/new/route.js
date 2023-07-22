import Post from '@models/post'
import { connectToDB } from '@utils/database'

const defaultOptions = [
  { name: 'YTJ' },
  { name: 'NTJ' },
  { name: 'ESH' },
  { name: 'NJH' },
]

export const POST = async (request) => {
  try {
    const {
      userId,
      username,
      title,
      content,
      options = defaultOptions,
      votingLength,
    } = await request.json()

    await connectToDB()
    const newPost = new Post({
      userId,
      username,
      title,
      content,
      options,
      votingLength,
    })

    await newPost.save()
    return new Response(JSON.stringify(newPost), {
      status: 201,
    })
  } catch (error) {
    console.log('error:', error)
    return new Response('Failed to save the post in the database.', {
      status: 500,
    })
  }
}
