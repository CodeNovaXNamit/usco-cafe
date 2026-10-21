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
    errorCorrectionLevel: "M",
    margin: 4,
    scale: 4,
    color: {
      dark: "#36432dff",
      light: "#00000000",
    },
  });

  const { width: qrWidth } = await sharp(qr).metadata();

  // Inset from the botanical corner so the transparent quiet zone stays clear.
  await sharp(path.join(certificateDir, certificate.source))
    .composite([{ input: qr, left: 1290 - qrWidth, top: 48 }])
    .png()
    .toFile(path.join(certificateDir, certificate.output));

  console.log(`Generated ${certificate.output} -> ${destination}`);
}
