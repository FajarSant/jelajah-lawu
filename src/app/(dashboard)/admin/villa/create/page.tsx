"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Swal from "sweetalert2";
import {
  tambahVilla,
  getAllVendors,
} from "@/lib/actions/admin/villa/villa.actions";
import { Textarea } from "@/components/ui/textarea";

// Zod Schema (sesuai backend)
const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama wajib diisi" }),
  lokasi: z.string().min(2, { message: "Lokasi wajib diisi" }),
  harga: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Harga harus berupa angka positif",
  }),
  deskripsi: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  gambarUrl: z.string().url({ message: "URL gambar tidak valid" }),
  kapasitas: z.string().refine((val) => Number(val) > 0, {
    message: "Kapasitas minimal 1 orang",
  }),
  fasilitas: z.string().optional(),
  vendorId: z.string().min(1, { message: "Vendor wajib dipilih" }),
});

type FormSchema = z.infer<typeof formSchema>;
type Vendor = { id: string; name: string };
type VillaResponse = {
  success?: string;
  error?: Record<string, string[]> | string;
};

export default function CreateVillaPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { vendorId: "" },
  });

  // Ambil data vendor
  useEffect(() => {
    async function fetchVendors() {
      try {
        const data = await getAllVendors();
        setVendors(data);
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

    const res: VillaResponse = await tambahVilla(formData);

    if (res.success) {
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: res.success,
      });
      router.push("/admin/villa");
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
        text: errorMessages || "Terjadi kesalahan saat menambahkan Villa",
      });
      console.error(res.error);
    }

    setIsSubmitting(false);
  };

  return (
    <Card className="mx-auto mt-10 max-w-5xl shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-gray-800">
          Tambah Villa Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama */}
            <FormGroup
              label="Nama Villa"
              id="nama"
              error={errors.nama?.message}
            >
              <Input id="nama" {...register("nama")} />
            </FormGroup>

            {/* Lokasi */}
            <FormGroup
              label="Lokasi"
              id="lokasi"
              error={errors.lokasi?.message}
            >
              <Input id="lokasi" {...register("lokasi")} />
            </FormGroup>

            {/* Harga */}
            <FormGroup label="Harga" id="harga" error={errors.harga?.message}>
              <Input
                id="harga"
                type="number"
                step="1000"
                {...register("harga")}
              />
            </FormGroup>

            {/* URL Gambar */}
            <FormGroup
              label="URL Gambar"
              id="gambarUrl"
              error={errors.gambarUrl?.message}
            >
              <Input id="gambarUrl" {...register("gambarUrl")} />
            </FormGroup>

            {/* Kapasitas */}
            <FormGroup
              label="Kapasitas"
              id="kapasitas"
              error={errors.kapasitas?.message}
            >
              <Input id="kapasitas" type="number" {...register("kapasitas")} />
            </FormGroup>

            {/* Fasilitas */}
            <div className="md:col-span-2">
              <Label htmlFor="fasilitas">Fasilitas (Opsional)</Label>
              <Textarea
                id="fasilitas"
                {...register("fasilitas")}
                rows={3}
                placeholder="Tuliskan fasilitas villa, misalnya: Kolam renang, Wi-Fi, AC"
              />
              {errors.fasilitas && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.fasilitas.message}
                </p>
              )}
            </div>

            {/* Deskripsi */}
            <div className="md:col-span-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                {...register("deskripsi")}
                rows={4}
                placeholder="Tuliskan deskripsi villa secara lengkap"
              />
              {errors.deskripsi && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.deskripsi.message}
                </p>
              )}
            </div>

            {/* Vendor */}
            <div className="md:col-span-2">
              <Label htmlFor="vendorId" className="mb-1 block">
                Vendor
              </Label>
              <Controller
                name="vendorId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.id}>
                          {vendor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.vendorId && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.vendorId.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Villa"}
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
