import {useCallback, useEffect, useState} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import { uploadFile } from '~/utils/file';

interface DropzoneProps {
  // className: string;
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  // disabled: boolean;
}

const Dropzone = ({files,setFiles}: DropzoneProps) =>{
  const [rejected,setRejectedFiles]=useState<FileRejection[]>([]);
  const [uploadStatus,setUploadStatus]=useState("");

  const onDrop = useCallback((acceptedFiles:File[],rejectedFiles:FileRejection[]) => {
    if(acceptedFiles.length){
      setFiles((previousFiles)=>[...previousFiles,...acceptedFiles.map((file)=>Object.assign(file,{preview:URL.createObjectURL(file)}))])
    }
    if(rejectedFiles?.length){
      setRejectedFiles((previousFiles)=>[
        ...previousFiles, ...rejectedFiles
      ]);
    }
   
  }, [setFiles]);

  useEffect(()=>{
    return ()=>{files.forEach((file)=>URL.revokeObjectURL(file.preview))}
  },[files])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept:{
      "image/*":[]
    }
  });

  // Function for deleting the image
  const handleDelete = (index:any)=>{ 
    setFiles((image)=>image.filter((_,id)=>id!==index))
  }

  const handleUpload = async()=>{
    setUploadStatus("Uploading....")
    try {
      files.forEach((file)=>{
        uploadFile(file);
      })
      setUploadStatus("Upload Succesful");
    } catch (error) {
      console.log("imageUpload" + error)
      setUploadStatus("Upload Failed...");
    }
    
  }


  return (
    <div className='container'>
    <div className='dropzone' {...getRootProps({
      onClick: (event:any) => console.log(event),
      role: 'button',
      'aria-label': 'drag and drop area',
    })}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
    {files.length>0 && <div className='flex-col justify-center items-center'>
      {files.map((image,index)=>
      <>
      <img src={image} key={index}/>
      <button onClick={()=>handleDelete(index)}>x</button>   
      </>
      )}

    
    {files.length>0 && 
    //Upload Button
    <button onClick={handleUpload} className='text-center bg-slate-500 rounded-md px-4 py-2 mt-4'>Upload to Cloudinary</button>}
    <p>{uploadStatus}</p>
      </div>}
    </div>
  )
}

export default Dropzone;