import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to SeqNuc Database</h1>
        <p className="mb-8">
          The SeqNuc Nucleotide Sequence Database is a comprehensive platform
          for accessing nucleotide sequences from various organisms. Our
          database allows users to search, upload, and explore a vast collection
          of genetic data.
        </p>
        <Link
          href="/browse"
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition duration-300"
        >
          Browse Sequences
        </Link>
      </div>
    </Layout>
  );
}
