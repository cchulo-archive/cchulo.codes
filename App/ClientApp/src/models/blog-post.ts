import { UploadFile } from "./upload-file";
import { Tag } from "./tag";

export class BlogPost {
    id: number;
    title: string;
    publishedAt: string;
    description: string;
    contents: string;
    banner: UploadFile;
    resources: UploadFile[];
    downloadable: UploadFile[];
    tags: Tag[];
}
