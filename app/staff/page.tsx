export default function StaffPage() {
  return (
    <div className="flex flex-1 flex-col items-center px-6 py-16">
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Staff preparation queue
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          This is a placeholder for the staff preparation queue. It will show
          upcoming orders with pickup time, customer, drink, and
          customization details.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          This page is currently protected by authentication only.
          Role-based access (staff vs. customer) will be added after the
          PostgreSQL database and user profile model exist.
        </p>
      </div>
    </div>
  );
}
