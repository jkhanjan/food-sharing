// import ImageKit, { toFile } from "@imagekit/nodejs";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";
// const client = new ImageKit({
//   privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
// });

// async function uploadFile(buffer, fileName) {
//   try {
//     const fileObject = await toFile(buffer, fileName);

//     const result = await client.files.upload({
//       file: fileObject,
//       fileName,
//     });

//     return result;
//   } catch (err) {
//     console.error("Image upload failed:", err);
//     throw err;
//   }
// }

const supaBase = createClient(
  process.env.SUPABASE_PROJ_URL,
  process.env.SUPABASE_KEY
);

export async function generatePresignedUploadUrl(
  fileExtension,
  bucketName = "video"
) {
  const fileName = `${uuid()}.${fileExtension}`;
  const storagePath = `user-files/${fileName}`;

  const { data, error } = await supaBase.storage
    .from(bucketName) // ✅ Dynamic bucket
    .createSignedUploadUrl(storagePath);

  if (error) {
    console.log(error, "error");
    throw new Error("Failed to generate presigned upload URL");
  }

  const { data: publicUrlData } = supaBase.storage
    .from(bucketName)
    .getPublicUrl(storagePath);

  return {
    uploadUrl: data.signedUrl,
    fileUrl: publicUrlData.publicUrl, // ✅ Add this
    storagePath: storagePath,
  };
}

export function getPublicUrl(storagePath, bucketName = "video") {
  const { data } = supaBase.storage.from(bucketName).getPublicUrl(storagePath);

  return data.publicUrl;
}
