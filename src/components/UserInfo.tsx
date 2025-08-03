"use client";

import { useState, useTransition } from "react";
import { updateUserProfile } from "@/lib/actions/user";
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
          toast.success("Profil berhasil diperbarui");
          setIsEdit(false);
        })
        .catch(() => {
          toast.error("Gagal memperbarui profil");
        });
    });
  };

  return (
    <Card className="w-full max-w-full sm:max-w-xl mx-auto p-6 shadow-md space-y-6">
      <CardHeader className="flex items-center gap-4 text-center">
        <div className="flex flex-col items-center w-full">
          {user.image ? (
            <Image
              src={user.image}
              alt="Foto profil"
              width={100}
              height={100}
              className="rounded-full object-cover border shadow"
            />
          ) : (
            <div className="w-[100px] h-[100px] bg-gray-300 rounded-full" />
          )}
          <CardTitle className="mt-2 text-2xl">
            {user.name || "Nama tidak tersedia"}
          </CardTitle>
          <p className="text-muted-foreground">{user.email}</p>
          <span className="text-xs text-gray-500 uppercase tracking-wide mt-1">
            {user.role}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-medium block mb-1">Nama</label>
            {isEdit ? (
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            ) : (
              <p>{user.name || "-"}</p>
            )}
          </div>

          <div>
            <label className="font-medium block mb-1">Nomor HP</label>
            {isEdit ? (
              <Input
                name="nomorHp"
                value={formData.nomorHp}
                onChange={handleChange}
              />
            ) : (
              <p>{user.nomorHp || "-"}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="font-medium block mb-1">Alamat</label>
            {isEdit ? (
              <Textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
              />
            ) : (
              <p>{user.alamat || "-"}</p>
            )}
          </div>

          <div>
            <label className="font-medium block mb-1">Jenis Kelamin</label>
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
                  <SelectValue>
                    {formData.jenisKelamin === "LAKI_LAKI"
                      ? "LAKI-LAKI"
                      : formData.jenisKelamin === "PEREMPUAN"
                      ? "PEREMPUAN"
                      : "LAINNYA"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LAKI_LAKI">Laki-laki</SelectItem>
                  <SelectItem value="PEREMPUAN">Perempuan</SelectItem>
                  <SelectItem value="LAINNYA">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p>{user.jenisKelamin}</p>
            )}
          </div>

          <div>
            <label className="font-medium block mb-1">Tanggal Lahir</label>
            {isEdit ? (
              <Input
                name="tanggalLahir"
                type="date"
                value={formData.tanggalLahir}
                onChange={handleChange}
              />
            ) : (
              <p>
                {user.tanggalLahir
                  ? format(new Date(user.tanggalLahir), "dd MMM yyyy")
                  : "-"}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          {isEdit ? (
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          ) : (
            <Button
              onClick={() => setIsEdit(true)}
              className="w-full sm:w-auto"
            >
              Edit Profil
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
