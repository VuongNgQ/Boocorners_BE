import axios, { endpoints } from 'src/utils/axios';

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(endpoints.file.upload, formData);

  return response.data;
}
