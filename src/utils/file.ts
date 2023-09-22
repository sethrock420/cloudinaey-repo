// import { env } from '~/env.mjs';
type CloudinaryResponse= {
    signature:string;
    timestamp:string;
}

export async function uploadFile(file:any){
const res = await fetch("/api/cloudinary/sign",{
method:"GET",
});
const {signature,timestamp} = (await res.json()) as CloudinaryResponse;
const formData = new FormData();
formData.append("file", file);
formData.append("api_key", "692272739484127");
formData.append("signature", signature);
formData.append("timestamp", timestamp);
formData.append("folder", "next");

const endpoint = `https://api.cloudinary.com/v1_1/dh1bowbbe/image/upload`;


const data = (await fetch(endpoint, {
    method: "POST",
    body: formData,
  }).then((res) => res.json())) as {
    url: string;
  };
  return data.url;
}
