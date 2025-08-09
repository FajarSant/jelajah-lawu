"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ReviewTableProps {
  reviews: {
    id: string;
    namaUser: string;
    kategori: string;
    namaItem: string;
    nilai: number;
    komentar: string;
    tanggal: Date;
  }[];
}

export function ReviewTable({ reviews }: ReviewTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama User</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Komentar</TableHead>
            <TableHead>Tanggal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">{review.namaUser}</TableCell>
              <TableCell>
                <Badge variant="outline">{review.kategori}</Badge>
              </TableCell>
              <TableCell>{review.namaItem}</TableCell>
              <TableCell className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                {review.nilai}
              </TableCell>
              <TableCell className="max-w-xs truncate">{review.komentar}</TableCell>
              <TableCell>{new Date(review.tanggal).toLocaleDateString("id-ID")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
