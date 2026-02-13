import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogClient from "./BlogClient";

export default function BlogPage() {
  const postsDir = path.join(process.cwd(), "content/blogs");
  
  // Create folder if it doesn't exist so it doesn't crash
  if (!fs.existsSync(postsDir)) {
    return <div className="min-h-screen bg-black" />; 
  }

  const files = fs.readdirSync(postsDir);

  const posts = files
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      const wordCount = content.trim().split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));

      return {
        // IMPORTANT: Slug must be the filename without .md
        slug: file.replace(/\.md$/, ""),
        title: data.title || "Untitled",
        date: data.date || "13.02.2026",
        readingTime: readingTime,
        excerpt: data.excerpt || content.replace(/[#*`_]/g, "").slice(0, 140).trim() + "..."
      };
    })
    .sort((a, b) => {
        const parseDate = (d: string) => {
            const parts = d.split('.');
            return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).getTime();
        };
        return parseDate(b.date) - parseDate(a.date);
    });

  return <BlogClient posts={posts} />;
}
