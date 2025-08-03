import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  nomorHp: z.string().optional(),
  alamat: z.string().optional(),
  jenisKelamin: z.enum(["PRIA", "WANITA", "LAINNYA"]),
  tanggalLahir: z.string().optional(),
});
