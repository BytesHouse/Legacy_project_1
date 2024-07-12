import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API
    ? `${process.env.API}/files`
    : "${process.env.API}/files",
});

export class ImagesService {
  static getImageId(id: string) {
    return instance.get(id);
  }
}
