import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Luminacid",
  description: "Experimental apps exploring memory, focus, and human potential.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <nav className="flex justify-between items-center p-6 border-b border-neutral-800">
          <Link href="/" className="text-xl font-bold">
            Luminacid
          </Link>
          <div className="flex gap-6 text-gray-400">
            <Link href="/apps">Apps</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}