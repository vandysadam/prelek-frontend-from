import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FileTextIcon, Frown, XCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import { Input } from './ui/input';

export interface ISelectedFile {
  name: string;
  size: number;
  mime_type: string;
  url?: string; // Add url for editing mode
}
type AllowedExtensions =
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/png'
  | 'image/webp'
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'text/csv'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'text/plain';

interface AddFilesProps {
  maxFiles: number;
  allowedExtensions: AllowedExtensions[];
  maxFileSize: number; // in KB
  onFilesChange: (files: File[]) => void; // Callback to send files back to parent
  initialFiles?: ISelectedFile[]; // Add prop for initial files
}

const formSchema = z.object({
  files: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

const AddFiles = ({
  maxFiles,
  allowedExtensions,
  maxFileSize,
  onFilesChange,
  initialFiles = [], // default to an empty array if not provided
}: AddFilesProps) => {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [existingFiles, setExistingFiles] =
    useState<ISelectedFile[]>(initialFiles); // For existing files

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      if (
        files.length >
        maxFiles - selectedFile.length - existingFiles.length
      ) {
        setErrorMessage(
          `You can only upload up to ${maxFiles} files in total.`,
        );
        return;
      }

      for (const file of files) {
        if (
          !allowedExtensions.includes(file.type as AllowedExtensions) ||
          file.size > maxFileSize
        ) {
          setErrorMessage(`Invalid file type or size for ${file.name}.`);
          return;
        }
      }

      const updatedFiles = [...selectedFile, ...files];
      setSelectedFile(updatedFiles);
      onFilesChange(updatedFiles); // Notify parent of the file change
      setErrorMessage(null);
    }
  };

  const handleRemoveFile = (index: number, isExistingFile = false) => {
    if (isExistingFile) {
      const updatedExistingFiles = existingFiles.filter((_, i) => i !== index);
      setExistingFiles(updatedExistingFiles);
    } else {
      const updatedFileList = selectedFile.filter((_, i) => i !== index);
      setSelectedFile(updatedFileList);
      onFilesChange(updatedFileList); // Notify parent of the file change
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      const customEvent = {
        target: { files }, // Use the FileList from the drop event
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(customEvent); // Call the change handler with the custom event
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click using ref
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center w-full">
          <div
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
              isDragging ? 'border-blue-500 bg-gray-100' : 'border-gray-300'
            } dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500`}
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>

            <Form {...form}>
              <FormField
                name="files"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col items-center justify-center space-y-4 col-span-2">
                      <FormControl>
                        <Input
                          className="hidden"
                          type="file"
                          multiple
                          {...field}
                          onChange={(event) => {
                            handleFileChange(event);
                            field.onChange(event);
                          }}
                          ref={fileInputRef}
                        />
                      </FormControl>
                      {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                      )}
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </Form>
          </div>
        </div>

        <div className="px-4 mb-8 bg-neutral-800/10 mx-2 py-2 flex flex-wrap gap-4">
          {/* Check if there are no existing files and no newly selected files */}
          {existingFiles.length === 0 && selectedFile.length === 0 ? (
            <div className="text-center flex items-center justify-center gap-x-2">
              <Frown size={20} />
              <p className="text-sm">No File Selected</p>
            </div>
          ) : (
            <>
              {/* Display existing files */}
              {existingFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-start p-2 border border-gray-200 rounded-md bg-transparent"
                  style={{ width: '120px', minWidth: '120px' }}
                >
                  <div className="w-full h-12 flex items-center justify-center border border-gray-200 rounded overflow-hidden bg-white">
                    {file.mime_type.startsWith('image/') ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-16 object-cover rounded"
                      />
                    ) : (
                      <FileTextIcon size={24} className="text-gray-500" />
                    )}
                  </div>
                  <div className="mt-1 px-1 w-full">
                    <p className="text-xs font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                      {file.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="absolute top-0 right-0 mt-1 mr-1 text-red-500 bg-white rounded-full p-1"
                    style={{ zIndex: 10 }}
                    onClick={() => handleRemoveFile(index, true)} // Pass true to indicate removal from existingFiles
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              ))}

              {/* Display newly selected files */}
              {selectedFile.map((file, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-start p-2 border border-gray-200 rounded-md bg-transparent"
                  style={{ width: '120px', minWidth: '120px' }}
                >
                  <div className="w-full h-12 flex items-center justify-center border border-gray-200 rounded overflow-hidden bg-white">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-16 object-cover rounded"
                      />
                    ) : (
                      <FileTextIcon size={24} className="text-gray-500" />
                    )}
                  </div>
                  <div className="mt-1 px-1 w-full">
                    <p className="text-xs font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                      {file.name}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="absolute top-0 right-0 mt-1 mr-1 text-red-500 bg-white rounded-full p-1"
                    style={{ zIndex: 10 }}
                    onClick={() => handleRemoveFile(index)} // Handle removal for newly selected files
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddFiles;
