import ImageKit, { toFile } from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

async function uploadFile(buffer, fileName) {
  try {
    const fileObject = await toFile(buffer, fileName);

    const result = await client.files.upload({
      file: fileObject,
      fileName,
    });

    return result;
  } catch (err) {
    console.error("Image upload failed:", err);
    throw err;
  }
}

export { uploadFile };
