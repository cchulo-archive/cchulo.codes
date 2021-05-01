/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

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
