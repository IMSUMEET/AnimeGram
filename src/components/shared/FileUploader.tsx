import React, {useCallback, useState} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'
import { Button } from '../ui/button';


type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string;
}


const FileUploader = ({fieldChange, mediaUrl}: FileUploaderProps) => {
    const [file, setfile] = useState<File[]>([]);
    const [fileUrl, setfileUrl] = useState('');

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setfile(acceptedFiles); 
        fieldChange(acceptedFiles);
        setfileUrl(URL.createObjectURL(acceptedFiles[0]));
      }, [file])
      const {getRootProps, getInputProps} = useDropzone({
        onDrop, 
        accept: {
            'image/*': ['.jpg', '.png', '.gif', '.jpeg']
    }})

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer'/>
      {
        fileUrl ? (
            <>
                <div className='flex flex-1 w-full justify-center p-5 lg:p-10'>
                    <img src={fileUrl} alt="image" className='file_uploader-img' />
                </div>
                <p className='file_uploader-label'>Click or drag photo to replace</p>
            </>
        ) : 
          <div className='file_uploader-box'>
            <img src="/assets/icons/file-upload.svg" alt="file-upload" height={77} width={96}/>

            <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
            <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPEG</p>
            
            <Button className="shad-button_dark_4">
                Upload from device
            </Button>
          </div>

      }
    </div>
  )
}

export default FileUploader