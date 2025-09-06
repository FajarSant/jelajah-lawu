"use client";

import { useState, useTransition } from "react";
import { updateUserProfile } from "@/lib/actions/updateUserProfile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { toast } from "sonner";
import { format } from "date-fns";

type User = {
  id: string;
  name: string | null;
  email: string;
  nomorHp: string | null;
  alamat: string | null;
  role: string;
  jenisKelamin: "PRIA" | "WANITA" | "LAINNYA";
  tanggalLahir: string | null;
  image: string | null;
};

export default function UserInfo({ user }: { user: User }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: user.name ?? "",
    nomorHp: user.nomorHp ?? "",
    alamat: user.alamat ?? "",
    jenisKelamin: (user.jenisKelamin ?? "LAINNYA") as
      | "LAKI_LAKI"
      | "PEREMPUAN"
      | "LAINNYA",
    tanggalLahir: user.tanggalLahir?.slice(0, 10) ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    startTransition(() => {
      updateUserProfile(user.id, formData)
        .then(() => {
          toast.success("Profil berhasil diperbarui 🎉");
          setIsEdit(false);
        })
        .catch(() => {
          toast.error("Gagal memperbarui profil ❌");
        });
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-6 sm:p-8 shadow-lg rounded-2xl border border-gray-100 bg-white">
      <CardHeader className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          {user.image ? (
            <Image
              src={user.image}
              alt="Foto profil"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-white shadow-md ring-2 ring-blue-100"
            />
          ) : (
            <div className="w-[120px] h-[120px] bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-lg font-bold shadow-inner">
              {user.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
          )}
        </div>
        <div>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {user.name || "Nama tidak tersedia"}
          </CardTitle>
          <p className="text-sm text-gray-500">{user.email}</p>
          <span className="text-xs mt-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium tracking-wide uppercase">
            {user.role}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="font-medium block mb-1 text-sm text-gray-600">
              Nama
            </label>
            {isEdit ? (
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            ) : (
              <p className="text-gray-800">{user.name || "-"}</p>
            )}
          </div>

          <div>
            <label className="font-medium block mb-1 text-sm text-gray-600">
              Nomor HP
            </label>
            {isEdit ? (
              <Input
                name="nomorHp"
                value={formData.nomorHp}
                onChange={handleChange}
              />
            ) : (
              <p className="text-gray-800">{user.nomorHp || "-"}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="font-medium block mb-1 text-sm text-gray-600">
              Alamat
            </label>
            {isEdit ? (
              <Textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="resize-none"
              />
            ) : (
              <p className="text-gray-800">{user.alamat || "-"}</p>
            )}
          </div>

          <div>
            <label className="font-medium block mb-1 text-sm text-gray-600">
              Jenis Kelamin
            </label>
            {isEdit ? (
              <Select
                value={formData.jenisKelamin}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    jenisKelamin: value as
                      | "LAKI_LAKI"
                      | "PEREMPUAN"
                      | "LAINNYA",
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LAKI_LAKI">Laki-laki</SelectItem>
                  <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                  <SelectItem value="LAINNYA">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-800">{user.jenisKelamin}</p>
            )}
          </div>

          <div>
            <label className="font-medium block mb-1 text-sm text-gray-600">
              Tanggal Lahir
            </label>
            {isEdit ? (
              <Input
                name="tanggalLahir"
                type="date"
                value={formData.tanggalLahir}
                onChange={handleChange}
              />
            ) : (
              <p className="text-gray-800">
                {user.tanggalLahir
                  ? format(new Date(user.tanggalLahir), "dd MMM yyyy")
                  : "-"}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          {isEdit ? (
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="w-full sm:w-auto rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 shadow transition-all duration-200"
            >
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          ) : (
            <Button
              onClick={() => setIsEdit(true)}
              className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 shadow-md hover:shadow-lg transition-all duration-200"
            >
              Edit Profil
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
