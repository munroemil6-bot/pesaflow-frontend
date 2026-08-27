const BACKEND_URL = 'https://pesaflow-backend-wdbv.onrender.com'

async function readBody(request) {
  const chunks = []
  for await (const chunk of request) chunks.push(Buffer.from(chunk))
  return chunks.length ? Buffer.concat(chunks) : undefined
}

export default async function handler(request, response) {
  const requestUrl = new URL(request.url, 'http://localhost')
  const backendPath = requestUrl.pathname.replace(/^\/api/, '') || '/'
  const targetUrl = `${BACKEND_URL}/api${backendPath}${requestUrl.search}`
  const headers = { ...request.headers }
  delete headers.host
  delete headers['content-length']

  try {
    const backendResponse = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : await readBody(request),
    })

    response.statusCode = backendResponse.status
    backendResponse.headers.forEach((value, key) => {
      if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(key)) {
        response.setHeader(key, value)
      }
    })
    response.send(Buffer.from(await backendResponse.arrayBuffer()))
  } catch {
    response.statusCode = 502
    response.json({ detail: 'The backend could not be reached.' })
  }
}
