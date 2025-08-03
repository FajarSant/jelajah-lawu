'use client';

import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Review {
  id: string;
  komentar: string;
  nilai: number;
  createdAt: Date;
  user: { name: string | null };
  destinasi: { nama: string };
}

interface Props {
  reviews: Review[];
}

export function DestinationReviewTable({ reviews }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ulasan Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Destinasi</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Komentar</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.user.name || 'Anonim'}</TableCell>
                  <TableCell>{review.destinasi.nama}</TableCell>
                  <TableCell>{review.nilai} ⭐</TableCell>
                  <TableCell className="max-w-xs truncate">{review.komentar}</TableCell>
                  <TableCell>{format(new Date(review.createdAt), 'dd MMM yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
