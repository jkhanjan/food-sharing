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

export async function generatePresignedUploadUrl(fileExtension) {
  const fileName = `${uuid()}.${fileExtension}`;

  const { data, error } = await supaBase.storage
    .from("video")
    .createSignedUploadUrl(`user-files/${fileName}`);

  if (error) {
    console.log(error, "error");
    throw new Error("Failed to generate presigned upload URL");
  }

  return {
    uploadUrl: data.signedUrl, 
    storagePath: `user-files/${fileName}`,
  };
}

export function getPublicUrl(storagePath) {
  const { data } = supaBase.storage
    .from('video')
    .getPublicUrl(storagePath);
  
  return data.publicUrl;
}