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

import { FileText, Frown, XCircle, Database, FileTextIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { Input } from './ui/input';

export interface ISelectedFile {
  name: string;
  size: number;
  mime_type: string;
}

const formSchema = z.object({
  files: z.array(
    z.object({
      name: z.string(),
      // type: z.string().refine((value) => /\.(doc|docx|pdf)$/i.test(value), {
      //   message: 'File must be a document or PDF',
      // }),
    }),
  ),
});

const AddFiles = () => {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: [],
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (event.target.files) {
    //   const selected: ISelectedFile[] = Array.from(event.target.files).map(
    //     (file: File) => {
    //       return {
    //         name: file.name,
    //         size: file.size,
    //         mime_type: file.type,
    //       };
    //     },
    //   );
    //   setSelectedFile(selected);
    // }
    if (event.target.files) {
      const selected: File[] = Array.from(event.target.files);
      setSelectedFile(selected);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFileList = selectedFile.filter((_, i) => i !== index);
    setSelectedFile(updatedFileList);
  };
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // Use a ref for the file input

  // Drag and drop handlers with type definitions
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
      // Manually create a custom event to simulate the input's onChange
      const target = {
        files, // Use the FileList from the drop event
      };

      const customEvent = {
        target,
      } as React.ChangeEvent<HTMLInputElement>;

      handleFileChange(customEvent); // Call the change handler with the custom event
    }
  };

  // Handle the click to trigger the file input
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click using ref
    }
  };

  const onSubmit = () => {
    //TODO:
  };

  console.log(selectedFile);

  return (
    <>
      <div>
        <div className="flex items-center justify-center w-full">
          {/* dotted border */}
          {/* <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"> */}
          <div
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
              isDragging ? 'border-blue-500 bg-gray-100' : 'border-gray-300'
            } dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500`}
            onClick={handleClick} // Trigger click on the file input
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop} // Handle file drop
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-y-6"
              >
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
                            ref={fileInputRef} // Add this ref to correctly reference the input
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </form>
            </Form>
          </div>
        </div>

        {/* <div className="px-4 mb-8 bg-neutral-800/10 mx-2 py-2">
          {selectedFile.length > 0 ? (
            selectedFile.map((file, index) => (
              <li key={index} className="list-none flex items-center gap-2">
                <FileText size={20} />
                <p className="text-sm">{file.name}</p>
                <p className="text-sm">{file.size}</p>
                <p className="text-sm">{file.mime_type}</p>
                <button
                  type="button"
                  className="text-red-500 ml-auto"
                  onClick={() => handleRemoveFile(index)}
                >
                  <XCircle size={20} />
                </button>
              </li>
            ))
          ) : (
            <div className="text-center flex items-center justify-center gap-x-2">
              <Frown size={20} />
              <p className=" text-sm">No File Selected</p>
            </div>
          )}
        </div> */}

        <div className="px-4 mb-8 bg-neutral-800/10 mx-2 py-2 flex flex-wrap gap-4">
          {selectedFile.length > 0 ? (
            selectedFile.map((file, index) => {
              let icon;

              // Determine the icon based on file type
              if (
                [
                  'application/pdf',
                  'application/msword',
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  'text/csv',
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                  'text/plain',
                ].includes(file.type)
              ) {
                icon = <FileTextIcon size={24} className="text-gray-500" />;
              } else if (file.type.startsWith('image/')) {
                icon = (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-16 object-cover rounded"
                  />
                );
              } else {
                icon = <FileTextIcon size={24} className="text-gray-500" />;
              }

              return (
                <div
                  key={index}
                  className="relative flex flex-col items-start p-2 border border-gray-200 rounded-md bg-transparent"
                  style={{ width: '120px', minWidth: '120px' }}
                >
                  {/* Icon or Image */}
                  <div className="w-full h-12 flex items-center justify-center border border-gray-200 rounded overflow-hidden bg-white">
                    {icon}
                  </div>

                  {/* File Details */}
                  <div className="mt-1 px-1 w-full">
                    <p className="text-xs font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    className="absolute top-0 right-0 mt-1 mr-1 text-red-500 bg-white rounded-full p-1"
                    style={{ zIndex: 10 }}
                    onClick={() => handleRemoveFile(index)}
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-center flex items-center justify-center gap-x-2">
              <Frown size={20} />
              <p className="text-sm">No File Selected</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddFiles;
