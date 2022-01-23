import { BlogPost } from "./blog-post";

export class Tag {
    id: number;
    name: string;
    blogPosts: BlogPost[];
}
