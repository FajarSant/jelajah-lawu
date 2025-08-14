  "use server";

  import { prisma } from "@/lib/prisma";
  import { revalidatePath } from "next/cache";
  import { z } from "zod";
  import { auth } from "@/lib/auth"; 

  // ─── SCHEMA VALIDASI ───────────────────────────────────────────────────────────
  const JeepSchema = z.object({
    nama: z.string().min(2, { message: "Nama wajib diisi" }),
    lokasi: z.string().min(2, { message: "Lokasi wajib diisi" }),
    harga: z.coerce.number().min(0, { message: "Harga harus berupa angka positif" }),
    deskripsi: z.string().min(10, { message: "Deskripsi minimal 10 karakter" }),
    kapasitas: z.coerce.number().min(1, { message: "Kapasitas harus lebih dari 0" }),
    rute: z.string().min(5, { message: "Rute wajib diisi" }),
    durasi: z.coerce.number().min(1, { message: "Durasi minimal 1 jam" }),
    gambarUrl: z.string().url({ message: "URL gambar tidak valid" }),
    vendorId: z.string().min(1, { message: "Vendor wajib dipilih" }),
    fasilitas: z.string().optional(),
  });

  // ─── FUNGSI CEK ROLE ───────────────────────────────────────────────────────────
  async function requireRole(allowedRoles: string[]) {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    if (!allowedRoles.includes(session.user.role)) {
      throw new Error("Forbidden");
    }
    return session;
  }

  // ─── CREATE ────────────────────────────────────────────────────────────────────
  export async function tambahJeepTour(form: FormData) {
    await requireRole(["ADMIN", "VENDOR"]);

    const formData = {
      nama: form.get("nama"),
      lokasi: form.get("lokasi"),
      harga: form.get("harga"),
      deskripsi: form.get("deskripsi"),
      kapasitas: form.get("kapasitas"),
      rute: form.get("rute"),
      durasi: form.get("durasi"),
      gambarUrl: form.get("gambarUrl"),
      vendorId: form.get("vendorId"),
      fasilitas: form.get("fasilitas") || undefined,
    };

    const parsed = JeepSchema.safeParse(formData);
    if (!parsed.success) {
      return { error: parsed.error.flatten().fieldErrors };
    }

    await prisma.jeepTour.create({ data: parsed.data });
    revalidatePath("/admin/jeep");
    return { success: "JeepTour berhasil ditambahkan" };
  }

  // ─── GET ALL ────────────────────────────────────────────────────────────────────
  export async function getAllJeepTour() {
    const data = await prisma.jeepTour.findMany({
      include: {
        vendor: { select: { name: true } },
        _count: { select: { bookings: true, reviews: true, favorites: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return data.map((j) => ({
      ...j,
      vendorNama: j.vendor?.name ?? "-",
      createdAt: j.createdAt.toISOString(),
      updatedAt: j.updatedAt.toISOString(),
    }));
  }

  // ─── GET BY ID ──────────────────────────────────────────────────────────────────
  export async function getJeepTourById(id: string) {
    const data = await prisma.jeepTour.findUnique({ where: { id } });
    if (!data) return null;

    return {
      ...data,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
    };
  }

  // ─── UPDATE ─────────────────────────────────────────────────────────────────────
  export async function updateJeepTour(id: string, form: FormData) {
    await requireRole(["ADMIN", "VENDOR"]);

    try {
      const formData = {
        nama: form.get("nama"),
        lokasi: form.get("lokasi"),
        harga: form.get("harga"),
        deskripsi: form.get("deskripsi"),
        kapasitas: form.get("kapasitas"),
        rute: form.get("rute"),
        durasi: form.get("durasi"),
        gambarUrl: form.get("gambarUrl"),
        vendorId: form.get("vendorId"),
        fasilitas: form.get("fasilitas") || undefined,
      };

      const parsed = JeepSchema.safeParse(formData);
      if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
      }

      await prisma.jeepTour.update({ where: { id }, data: parsed.data });
      revalidatePath("/admin/jeep");
      return { success: true };
    } catch (error) {
      console.error("Gagal update JeepTour:", error);
      return { success: false, error: "Gagal memperbarui Jeep Tour" };
    }
  }

  // ─── DELETE ─────────────────────────────────────────────────────────────────────
  export async function hapusJeepTour(id: string) {
    await requireRole(["ADMIN", "VENDOR"]);

    try {
      await prisma.jeepTour.delete({ where: { id } });
      revalidatePath("/admin/jeep");
      return { success: true };
    } catch (error) {
      console.error("Gagal hapus JeepTour:", error);
      return { success: false, error: "Gagal menghapus Jeep Tour" };
    }
  }

  // ─── DASHBOARD DATA ─────────────────────────────────────────────────────────────
  export async function getJeepDashboardData() {
    await requireRole(["ADMIN", "VENDOR"]);

    const [totalJeepTour, avgHarga, totalBooking, totalPendapatan] =
      await Promise.all([
        prisma.jeepTour.count(),
        prisma.jeepTour.aggregate({ _avg: { harga: true } }),
        prisma.booking.count({ where: { jeepTourId: { not: null } } }),
        prisma.booking.aggregate({
          _sum: { totalHarga: true },
          where: { jeepTourId: { not: null } },
        }),
      ]);

    const daftarJeepTour = await prisma.jeepTour.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { vendor: { select: { name: true } } },
    });

    const daftarUlasan = await prisma.review.findMany({
      where: { jeepTourId: { not: null }, tipe: "JEEP" },
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
        jeepTour: { select: { nama: true } },
      },
    });

    return {
      statistik: {
        totalJeepTour,
        rataRataHarga: avgHarga._avg.harga || 0,
        totalBooking,
        totalPendapatan: totalPendapatan._sum.totalHarga || 0,
      },
      jeepTourTerbaru: daftarJeepTour.map((j) => ({
        id: j.id,
        nama: j.nama,
        deskripsi: j.deskripsi,
        lokasi: j.lokasi,
        kapasitas: j.kapasitas,
        rute: j.rute,
        durasi: j.durasi,
        gambarUrl: j.gambarUrl,
        fasilitas: j.fasilitas,
        harga: j.harga,
        vendorId: j.vendorId,
        vendorNama: j.vendor?.name ?? "-",
        createdAt: j.createdAt,
      })),
      ulasanTerbaru: daftarUlasan.map((u) => ({
        namaUser: u.user?.name ?? "-",
        jeepTourNama: u.jeepTour?.nama ?? "-",
        rating: u.nilai,
        komentar: u.komentar,
        createdAt: u.createdAt,
      })),
    };
  }

  // ─── GET ALL VENDOR ─────────────────────────────────────────────────────────────
  export async function getAllVendors() {
    await requireRole(["ADMIN", "VENDOR"]);

    const vendors = await prisma.user.findMany({
      where: { role: "VENDOR", name: { not: null } },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    return vendors.map((v) => ({
      id: v.id,
      name: v.name ?? "Tanpa Nama",
    }));
  }
