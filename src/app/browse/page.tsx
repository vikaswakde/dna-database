"use client";

import { useState, useEffect } from "react";
import data from "@/data/data.json";
import Layout from "@/components/Layout";

interface Sequence {
  "DATABASE ID": number;
  "ACCESSION ID": string;
  "SOURCE ORGANISM": string;
  "LENGTH": string;
  "MOL-TYPE": string;
  "TOPOLOGY": string;
  "DIVISION": string;
  "SEQUENCE IN FASTA": string[];
}

const formatSequences = (rawData: Record<string, unknown>[]): Sequence[] => {
  const formattedSequences: Sequence[] = [];
  let currentSequence: Partial<Sequence> = {};

  rawData.forEach((item) => {
    if ('DATABASE ID' in item) {
      if (Object.keys(currentSequence).length > 0) {
        formattedSequences.push(currentSequence as Sequence);
      }
      currentSequence = {
        ...item,
        "ACCESSION ID": (item["ACCESSION ID "] as string).trim(),
        "SEQUENCE IN FASTA": [item["SEQUENCE IN FASTA"] as string]
      };
    } else if ('SEQUENCE IN FASTA' in item) {
      currentSequence["SEQUENCE IN FASTA"] = [
        ...(currentSequence["SEQUENCE IN FASTA"] || []),
        item["SEQUENCE IN FASTA"] as string
      ];
    }
  });

  if (Object.keys(currentSequence).length > 0) {
    formattedSequences.push(currentSequence as Sequence);
  }

  return formattedSequences;
};

export default function Browse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSequences, setFilteredSequences] = useState<Sequence[]>([]);

  useEffect(() => {
    const formattedSequences = formatSequences(data.Sheet1);
    setFilteredSequences(formattedSequences);
  }, []);

  const handleSearch = () => {
    const filtered = filteredSequences.filter((sequence) =>
      sequence["ACCESSION ID"].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSequences(filtered);
  };

  return (
    <Layout>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by ACCESSION ID..."
          className="w-64 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded-r-md hover:bg-teal-600 transition duration-300"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Nucleotide Sequences</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-700 text-white">
              <th className="border px-4 py-2">ACCESSION ID</th>
              <th className="border px-4 py-2">SOURCE ORGANISM</th>
              <th className="border px-4 py-2">LENGTH</th>
              <th className="border px-4 py-2">MOL-TYPE</th>
              <th className="border px-4 py-2">TOPOLOGY</th>
              <th className="border px-4 py-2">DIVISION</th>
              <th className="border px-4 py-2">SEQUENCE IN FASTA</th>
            </tr>
          </thead>
          <tbody>
            {filteredSequences.map((sequence, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border px-4 py-2">{sequence["ACCESSION ID"]}</td>
                <td className="border px-4 py-2">{sequence["SOURCE ORGANISM"]}</td>
                <td className="border px-4 py-2">{sequence["LENGTH"]}</td>
                <td className="border px-4 py-2">{sequence["MOL-TYPE"]}</td>
                <td className="border px-4 py-2">{sequence["TOPOLOGY"]}</td>
                <td className="border px-4 py-2">{sequence["DIVISION"]}</td>
                <td className="border px-4 py-2">
                  {sequence["SEQUENCE IN FASTA"].map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
