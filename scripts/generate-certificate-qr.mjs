import path from "node:path";
import QRCode from "qrcode";
import sharp from "sharp";

const siteUrl = "https://www.uscocollective.com";
const certificateDir = path.resolve("public/cert");

const certificates = [
  {
    slug: "namit-bhardwaj",
    source: "Namit Bhardwaj.png",
    output: "Namit Bhardwaj-with-qr.png",
  },
  {
    slug: "rajyavardhan-chauhan",
    source: "Rajyavardhan Chauhan.png",
    output: "Rajyavardhan Chauhan-with-qr.png",
  },
];

for (const certificate of certificates) {
  const destination = `${siteUrl}/certificates/${certificate.slug}`;
  const qr = await QRCode.toBuffer(destination, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 190,
    color: {
      dark: "#1e2c1b",
      light: "#f8f6f1",
    },
  });

  const qrCard = await sharp({
    create: {
      width: 218,
      height: 218,
      channels: 4,
      background: { r: 248, g: 246, b: 241, alpha: 1 },
    },
  })
    .composite([{ input: qr, left: 14, top: 14 }])
    .png()
    .toBuffer();

  await sharp(path.join(certificateDir, certificate.source))
    .composite([{ input: qrCard, left: 1280, top: 42 }])
    .png()
    .toFile(path.join(certificateDir, certificate.output));

  console.log(`Generated ${certificate.output} -> ${destination}`);
}
