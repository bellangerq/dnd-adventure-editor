import { createProxyMiddleware } from 'http-proxy-middleware'

// Imgur CORS config does not allow us to POST on it directly. So we use a route to proxy image uploads.
export default createProxyMiddleware({
  target: 'https://api.imgur.com',
  changeOrigin: true,
  pathRewrite: { '^/api/upload-image': '/3/upload' },
  headers: {
    // For some reasons, imgur will return status 429 (too many request) with
    // error code 403 (forbidden) if we keep this header ¯\_(ツ)_/¯
    // This was extremely annoying to find out
    Referer: null,
    Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
  },
})

export const config = {
  api: {
    bodyParser: false, // enable POST requests
    externalResolver: true, // hide warning message
  },
}
