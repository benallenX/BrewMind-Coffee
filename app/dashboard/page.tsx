import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();
  const displayName =
    user?.firstName ?? user?.emailAddresses[0]?.emailAddress ?? "there";

  const cards = [
    {
      title: "Choose plan",
      description: "Pick one of three monthly subscription plans.",
    },
    {
      title: "Save drink",
      description: "Set the one drink we'll prepare for you each pickup.",
    },
    {
      title: "Set pickup schedule",
      description: "Choose a recurring weekly pickup day and time.",
    },
  ];

  return (
    <div className="flex flex-1 flex-col items-center bg-background px-6 py-16">
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome, {displayName}
          </h1>
          <p className="mt-2 text-foreground/70">
            Subscription setup comes next.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-white/70 p-5 backdrop-blur-md dark:bg-white/5"
            >
              <h2 className="font-semibold tracking-tight text-foreground">
                {card.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-foreground/70">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
