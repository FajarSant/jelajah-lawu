"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  tambahRestoran,
  getAllVendors,
} from "@/lib/actions/admin/restoran/restoran-action";
import { Textarea } from "@/components/ui/textarea";

// Schema validasi sesuai model Restoran
const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama wajib diisi" }),
  deskripsi: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  lokasi: z.string().min(2, { message: "Lokasi wajib diisi" }),
  fasilitas: z.string().optional(),
  hargaRata: z
    .string()
    .refine((val) => Number(val) > 0, {
      message: "Harga rata-rata harus lebih dari 0",
    }),
  jenisMakanan: z.string().optional(),
  jamBuka: z.string().optional(),
  jamTutup: z.string().optional(),
  gambarUrl: z.string().url({ message: "URL gambar tidak valid" }),
  vendorId: z.string().min(1, { message: "Vendor wajib dipilih" }),
});

type FormSchema = z.infer<typeof formSchema>;
type Vendor = { id: string; name: string };
type RestoranResponse = {
  success?: string;
  error?: Record<string, string[]> | string;
};

export default function CreateRestoranPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { vendorId: "" },
  });

  useEffect(() => {
    async function fetchVendors() {
      try {
        const data = await getAllVendors();
        const formatted = data.map((vendor: Vendor) => ({
          id: vendor.id,
          name: vendor.name ?? "Tanpa Nama",
        }));
        setVendors(formatted);
      } catch (error) {
        toast.error("Gagal memuat data vendor");
        console.error(error);
      }
    }
    fetchVendors();
  }, []);

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true);

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    const res: RestoranResponse = await tambahRestoran(formData);

    if (res.success) {
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: res.success,
      });
      router.push("/admin/restoran");
    } else {
      const errorMessages =
        typeof res.error === "string"
          ? res.error
          : Object.values(res.error || {})
              .flat()
              .join(", ");
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMessages || "Terjadi kesalahan saat menambahkan Restoran",
      });
      console.error(res.error);
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="mx-auto mt-10 max-w-5xl shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-gray-800">
          Tambah Restoran Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup label="Nama Restoran" id="nama" error={errors.nama?.message}>
              <Input id="nama" {...register("nama")} />
            </FormGroup>

            <FormGroup label="Lokasi" id="lokasi" error={errors.lokasi?.message}>
              <Input id="lokasi" {...register("lokasi")} />
            </FormGroup>

            <FormGroup
              label="Harga Rata-rata"
              id="hargaRata"
              error={errors.hargaRata?.message}
            >
              <Input
                id="hargaRata"
                type="number"
                {...register("hargaRata")}
                placeholder="Contoh: 50000"
              />
            </FormGroup>

            <FormGroup label="Fasilitas" id="fasilitas" error={errors.fasilitas?.message}>
              <Input
                id="fasilitas"
                {...register("fasilitas")}
                placeholder="Contoh: WiFi, Parkir, AC"
              />
            </FormGroup>

            <FormGroup label="Jenis Makanan" id="jenisMakanan" error={errors.jenisMakanan?.message}>
              <Input
                id="jenisMakanan"
                {...register("jenisMakanan")}
                placeholder="Contoh: Seafood, Masakan Padang"
              />
            </FormGroup>

            <FormGroup label="URL Gambar" id="gambarUrl" error={errors.gambarUrl?.message}>
              <Input id="gambarUrl" {...register("gambarUrl")} />
            </FormGroup>

            <FormGroup label="Jam Buka" id="jamBuka" error={errors.jamBuka?.message}>
              <Input id="jamBuka" type="time" {...register("jamBuka")} />
            </FormGroup>

            <FormGroup label="Jam Tutup" id="jamTutup" error={errors.jamTutup?.message}>
              <Input id="jamTutup" type="time" {...register("jamTutup")} />
            </FormGroup>

            <div className="md:col-span-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                {...register("deskripsi")}
                rows={4}
                placeholder="Tuliskan deskripsi restoran secara lengkap"
              />
              {errors.deskripsi && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.deskripsi.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="vendorId" className="mb-1 block">
                Vendor
              </Label>
              <select
                id="vendorId"
                {...register("vendorId")}
                className="w-full border rounded-md p-2"
              >
                <option value="">Pilih Vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </select>
              {errors.vendorId && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.vendorId.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Restoran"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// Komponen kecil untuk label + input + error
function FormGroup({
  label,
  id,
  children,
  error,
  className = "",
}: {
  label: string;
  id: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-1 block">
        {label}
      </Label>
      {children}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
