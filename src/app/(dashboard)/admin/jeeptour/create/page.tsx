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
  tambahJeepTour,
  getAllVendors,
} from "@/lib/actions/admin/jeep/jeep-action";

// Validasi form
const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama wajib diisi" }),
  lokasi: z.string().min(2, { message: "Lokasi wajib diisi" }),
  harga: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Harga harus berupa angka positif",
  }),
  deskripsi: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
  gambarUrl: z.string().url({ message: "URL gambar tidak valid" }),
  vendorId: z.string().min(1, { message: "Vendor wajib dipilih" }),
});

type FormSchema = z.infer<typeof formSchema>;

type Vendor = {
  id: string;
  name: string;
};

export default function CreateJeepTourPage() {
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
    defaultValues: {
      vendorId: "",
    },
  });

  useEffect(() => {
    async function fetchVendors() {
      try {
        const data = await getAllVendors();
        const formatted = data.map((vendor: { id: string; name: string }) => ({
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
    formData.append("nama", data.nama);
    formData.append("lokasi", data.lokasi);
    formData.append("harga", String(Number(data.harga)));
    formData.append("deskripsi", data.deskripsi);
    formData.append("gambarUrl", data.gambarUrl);
    formData.append("vendorId", data.vendorId);

    const res = await tambahJeepTour(formData);

   
 if (res.success) {
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: res.success,
        confirmButtonText: "OK",
      });

      router.push("/admin/destination");
    } else {
      // Gabungkan pesan error dari object menjadi satu string
      const errorMessages = Object.values(res.error || {})
        .flat()
        .join(", ");

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: errorMessages || "Terjadi kesalahan saat menambahkan destinasi",
      });

      console.error(res.error);
    }


    setIsSubmitting(false);
  };

  return (
    <Card className="mx-auto mt-10 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center text-gray-700">
          Tambah Jeep Tour Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama */}
            <div>
              <Label htmlFor="nama">Nama Jeep Tour</Label>
              <Input id="nama" {...register("nama")} />
              {errors.nama && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.nama.message}
                </p>
              )}
            </div>

            {/* Lokasi */}
            <div>
              <Label htmlFor="lokasi">Lokasi</Label>
              <Input id="lokasi" {...register("lokasi")} />
              {errors.lokasi && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.lokasi.message}
                </p>
              )}
            </div>

            {/* Harga */}
            <div>
              <Label htmlFor="harga">Harga</Label>
              <Input
                id="harga"
                type="number"
                step="1000"
                {...register("harga")}
              />
              {errors.harga && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.harga.message}
                </p>
              )}
            </div>

            {/* Gambar */}
            <div>
              <Label htmlFor="gambarUrl">URL Gambar</Label>
              <Input id="gambarUrl" {...register("gambarUrl")} />
              {errors.gambarUrl && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.gambarUrl.message}
                </p>
              )}
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Input id="deskripsi" {...register("deskripsi")} />
            {errors.deskripsi && (
              <p className="text-sm text-red-500 mt-1">
                {errors.deskripsi.message}
              </p>
            )}
          </div>

          {/* Vendor */}
          <div>
            <Label htmlFor="vendorId">Vendor</Label>
            <Controller
              name="vendorId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
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

          {/* Submit */}
          <div className="pt-4 text-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Jeep Tour"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
