import ReviewDashboardStatsCard from "@/components/Admin/Review/ReviewStatusCard";
import { ReviewTable } from "@/components/Admin/Review/ReviewTable";
import { getReviewDashboardStats, getLatestReviews } from "@/lib/actions/admin/review/review-action";

export default async function ReviewDashboardPage() {
  const stats = await getReviewDashboardStats();
  const latestReviews = await getLatestReviews(10);

  const defaultStats = {
    totalReview: 0,
    totalPerKategori: { destinasi: 0, jeep: 0, villa: 0, restoran: 0 },
    rataRataNilai: 0,
  };

  const mappedReviews =
    latestReviews.data?.map((r) => ({
      ...r,
      kategori: String(r.kategori), 
    })) ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Review</h1>

      <ReviewDashboardStatsCard statistik={stats.data ?? defaultStats} />

      <div>
        <h2 className="text-lg font-semibold mb-4">Review Terbaru</h2>
        <ReviewTable reviews={mappedReviews} />
      </div>
    </div>
  );
}
