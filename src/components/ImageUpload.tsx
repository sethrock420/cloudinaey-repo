import {useState} from 'react'
import { generateSignature } from '~/utils/generateSignature';

export const ImageUpload = () => {
    const [isImageUploaded,setIsImageUploaded] = useState(false);

async function handleClick(){

        const widget = (window as any).cloudinary.createUploadWidget({
            cloudName:"dh1bowbbe",
            apiKey:"692272739484127", //API KEY TO BE STORED IN ENV FILE
            uploadSignature:generateSignature ,
            resourceType:"image",
        },(error:any,result:any)=>{
            if(!error && result && result.event=="success"){
                console.log("Uploaded",result.info);
                setIsImageUploaded(true);
            }
            else if(error){
                console.log(error);
            }
        });
        widget.open();
    }
  return (
    <div>
        <button type='button' onClick={handleClick}>Upload Image</button>
        {isImageUploaded?(
            <>
            <div>Succesfully Uploaded</div></>
        ):null}
    </div>
  )
}

export default ImageUpload