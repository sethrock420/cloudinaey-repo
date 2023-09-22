import multer from "multer";
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
import { CloudinaryStorage } from "multer-storage-cloudinary";


// const storage = multer.memoryStorage();
// const upload = multer({ storage,limits:{fieldSize: 25 * 1024 * 1024} });
// const myUploadMiddleware = upload.array("file");

cloudinary.config({
  cloud_name: "dh1bowbbe",
  api_key:"692272739484127",
  api_secret: "K_uL_rAnk82GEECmZw5zbGSjwUY",
  secure: true,
});

// export async function handleUpload(file:any) {
//     const res= await cloudinary.uploader.upload(file,{
//         resource_type:"auto",
//     });
//     return res;
// }

// function runMiddleware(req:any, res:any, fn:any) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result:any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

// export default async function handler(req:any, res:any) {
//   await runMiddleware(req, res, myUploadMiddleware);
//   for (const file of req.files) {
//     try {
//       const b64 = Buffer.from(file.buffer).toString("base64");
//       let dataURI = "data:" + file.mimetype + ";base64," + b64;
//       const response = await cloudinary.uploader.upload(dataURI, {
//         folder: "kala-test",
//       });
//       res.json(response)
//     } catch (error) {
//       res.status(400).json(error);
//       return;
//     }
//   }
//   res.status(200).json({ message: "Upload successfull" });
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const params = {
  folder:"Kalasangama Testing",
  format: async (req:any,file:any)=> 'png',
  public_id:(req:any,file:any)=>'computed-filename-using-request',
}


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params
  });

  export const config = { cloudinary, upload: multer({ storage }) }