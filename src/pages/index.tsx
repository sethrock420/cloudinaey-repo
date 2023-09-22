import { SetStateAction, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Dropzone from "~/components/Dropzone";
import { api } from "~/utils/api";
import { uploadFile } from "~/utils/file";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = () => {
    try {
      files.forEach((file)=>{
        uploadFile(file);
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <Dropzone className={""} files={[]} setFiles={function (value: SetStateAction<any[]>): void {
        throw new Error("Function not implemented.");
      } } disabled={false} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
