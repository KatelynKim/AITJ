import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  try {
    const { author, title, content, pollID } =  await request.json()
    await connectToDB()
    const newPost = new Post({
      author,
      title,
      content,
      pollID
    })

    await newPost.save()
    return new Response(JSON.stringify(newPost), {
      status:201
    })
  } catch (error) {
    console.log('error:', error)
    return new Response("Failed to save the post in the database.", { status: 500 })
  }
}