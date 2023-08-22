const sendPostRequest = async ({ url, body }) => {
  console.log('body:', body)
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    console.log('Post response:', response)
    if (response.ok) {
      return response
    }
  } catch (error) {
    console.log('Post request failed', error)
  }
}

const sendPatchRequest = async ({ url, body }) => {
  try {
    console.log('Sending a patch request to')
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
    if (response.ok) {
      return response
    }
  } catch (error) {
    console.log('Patch request failed', error)
  }
}
const sendGetRequest = async ({ url }) => {
  try {
    return await fetch(url)
  } catch (error) {
    console.log('Get request failed:', error)
  }
}

const sendDeleteRequest = async ({ url }) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    })
    if (response.ok) {
      return response
    }
  } catch (error) {
    console.log('Delete request failed', error)
  }
}

module.exports = {
  sendPostRequest,
  sendPatchRequest,
  sendGetRequest,
  sendDeleteRequest,
}
