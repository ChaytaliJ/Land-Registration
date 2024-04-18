import { useState } from 'react';
import lighthouse from '@lighthouse-web3/sdk'

const useFileUpload = () => {
    const [documentHash, setDocumentHash] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    console.log(uploadProgress)

    const progressCallback = (progressData) => {
        let percentageDone =
            //@ts-ignore
            100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
        console.log(percentageDone)
        setUploadProgress(percentageDone)
    }
    const uploadFile = async (file: any) => {
        //@ts-ignore
        setUploadProgress(0)
        const output: any = await lighthouse?.upload(file, import.meta.env.VITE_LIGHTHOUSE_API_KEY, false, null, progressCallback)
        setDocumentHash(output.data.Hash)
        console.log('File Status:', output)
        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash)
    }
    return { uploadFile, documentHash, uploadProgress };
};

export default useFileUpload;
