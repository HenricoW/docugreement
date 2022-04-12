import { FC, ReactNode, createContext, useState } from "react";

interface FileData {
  fileName: string;
  file: File;
  id: string;
}

export interface FileListData {
  name: string;
  size: string;
  id: string;
  creation_time: string;
  type: string;
}

interface FileContext {
  currFiles: FileData[];
  setCurrFiles: (currFiles: FileData[]) => void;
  fileList: FileListData[];
  setFileList: (fileList: FileListData[]) => void;
}

interface FileContextProps {
  children: ReactNode;
}

const FileContextDefaultValues: FileContext = {
  currFiles: [],
  setCurrFiles: (currFiles: FileData[]) => {},
  fileList: [],
  setFileList: (fileList: FileListData[]) => {},
};

const FileContext = createContext<FileContext>(FileContextDefaultValues);

const FileProvider: FC<FileContextProps> = ({ children }) => {
  const [currFiles, setCurrFiles] = useState<FileData[]>([]);
  const [fileList, setFileList] = useState<FileListData[]>([]);

  return (
    <FileContext.Provider
      value={{
        currFiles,
        setCurrFiles,
        fileList,
        setFileList,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileContext;

export { FileProvider };
