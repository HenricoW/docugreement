import { FileListData } from "../contexts/fileContext";
import { AppName } from "../pages/_app";

export const postUpload = (file: File, id: string) => {
  const fdata: FileListData = {
    name: file.name,
    size: file.size.toString(),
    id,
    creation_time: (Date.now() / 1000).toString(),
    type: "application/pdf",
  };

  // store user file list
  const fileList = localStorage.getItem(`${AppName}_ufl`);
  console.log("storing file entry: ", fileList);
  if (!fileList) {
    localStorage.setItem(`${AppName}_ufl`, JSON.stringify([fdata]));
  } else {
    const fileArray: FileListData[] = JSON.parse(fileList);
    localStorage.setItem(`${AppName}_ufl`, JSON.stringify([...fileArray, fdata]));
  }
};

export async function downloadFile(id: string = "xqwYhHI5dppuSh-IMyGfE4kQi5u1o0N2gsLKzLpGveg"): Promise<Blob> {
  const url = `https://arweave.net/${id}`;

  return new Promise(async (res, rej) => {
    try {
      const response = await fetch(url);
      console.log("download response: ", response);

      const blob = await (await response).blob();
      console.log("redirect blob: ", blob);

      res(blob);
    } catch (err) {
      rej(err);
    }
  });
}
