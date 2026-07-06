export default function StaffPage() {
  return (
    <div className="flex flex-1 flex-col items-center bg-background px-6 py-16">
      <div className="flex w-full max-w-3xl flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Staff preparation queue
        </h1>
        <div className="rounded-2xl border border-border bg-white/70 p-6 backdrop-blur-md dark:bg-white/5">
          <p className="text-foreground/70">
            This is a placeholder for the staff preparation queue. It will
            show upcoming orders with pickup time, customer, drink, and
            customization details.
          </p>
          <span className="mt-4 inline-block rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Authenticated access only
          </span>
          <p className="mt-3 text-sm text-foreground/60">
            Role-based access (staff vs. customer) will be added after the
            PostgreSQL database and user profile model exist.
          </p>
        </div>
      </div>
    </div>
  );
}
