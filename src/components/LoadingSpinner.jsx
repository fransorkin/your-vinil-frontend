export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-950 border-t-amber-600 shadow-lg shadow-amber-950/50"></div>
    </div>
  );
}
