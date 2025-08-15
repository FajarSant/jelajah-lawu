"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

export default function CategoryCard({ title, icon: Icon, href, color }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer text-white shadow-lg ${color}`}
    >
      <Icon size={36} className="mb-3" />
      <Link href={href} className="font-semibold text-lg">
        {title}
      </Link>
    </motion.div>
  );
}
