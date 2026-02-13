import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import PostClientLayout from "./PostClientLayout";

// The "await" fix for Next.js 15
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // This kills the "undefined" error
  
  const postsDir = path.join(process.cwd(), "content/blogs");
  
  // Find the file that matches the slug exactly
  const filePath = path.join(postsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const words = content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <PostClientLayout 
      post={{
        ...data,
        contentHtml,
        readTime,
        date: data.date || "13.02.2026"
      }} 
    />
  );
}
