import { FC, ReactNode, createContext, useState } from "react";

interface FileData {
  fileName: string;
  file: File;
}

interface FileContext {
  files: FileData[];
  setFiles: (files: FileData[]) => void;
}

interface FileContextProps {
  children: ReactNode;
}

const FileContextDefaultValues: FileContext = {
  files: [],
  setFiles: (files: FileData[]) => {},
};

const FileContext = createContext<FileContext>(FileContextDefaultValues);

const FileProvider: FC<FileContextProps> = ({ children }) => {
  const [files, setFiles] = useState<FileData[]>([]);

  return (
    <FileContext.Provider
      value={{
        files,
        setFiles,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContext;

export { FileProvider };
