import { PrismaClient, Role } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@travel.com" },
    update: {},
    create: {
      nama: "Admin Travel",
      email: "admin@travel.com",
      role: Role.ADMIN,
      image: "https://i.pravatar.cc/150?img=1",
    },
  })

  await prisma.user.upsert({
    where: { email: "vendor@travel.com" },
    update: {},
    create: {
      nama: "Vendor Jeep",
      email: "vendor@travel.com",
      role: Role.VENDOR,
      image: "https://i.pravatar.cc/150?img=2",
    },
  })

  console.log("✅ Seeder berhasil!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
