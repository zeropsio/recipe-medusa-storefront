// imageLoader.js
import Imgproxy from 'imgproxy';

console.log({
  baseUrl: process.env.IMGPROXY_URL,
  key: process.env.IMGPROXY_KEY,
  salt: process.env.IMGPROXY_SALT,
});

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

    console.log({ sourceUrl: sourceUrl });
    return imgproxy
      .builder()
      .resize('fill', width || 0, 0, 0)
      .quality(quality || 80)
      .generateUrl(sourceUrl);
  } catch (error) {
    console.error('Error generating imgproxy URL:', error);
    return src;
  }
}
