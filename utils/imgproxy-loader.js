// imageLoader.js
import Imgproxy from 'imgproxy';

const imgproxy = new Imgproxy({
  baseUrl: process.env.IMGPROXY_URL,
  key: process.env.IMGPROXY_KEY,
  salt: process.env.IMGPROXY_SALT,
  encode: true,
});

export default function loader({ src, width, quality }) {
  if (!process.env.IMGPROXY_KEY || !process.env.IMGPROXY_SALT) {
    console.warn('IMGPROXY_KEY or IMGPROXY_SALT not set');
    return src;
  }

  try {
    const sourceUrl = src.startsWith('http')
      ? src
      : `${process.env.NEXT_PUBLIC_BASE_URL}${src}`;

    const processedUrl = imgproxy
      .builder()
      .resize('fill', width || 800, width || 800, 0)
      .quality(quality || 50)
      .generateUrl(sourceUrl);

    return processedUrl;
  } catch (error) {
    console.error('Error generating imgproxy URL:', error);
    return src;
  }
}
