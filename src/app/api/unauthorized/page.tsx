export default function UnauthorizedPage() {
  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold text-red-600">Akses Ditolak</h1>
        <p className="mt-2 text-gray-600">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
      </div>
    </div>
  );
}
