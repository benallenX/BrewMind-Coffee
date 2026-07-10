import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function SavedDrinkForm() {
  return (
    <form className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="drink-name">Drink</Label>
        <Input id="drink-name" defaultValue="Oat milk latte" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pickup-location">Pickup location</Label>
        <Input id="pickup-location" defaultValue="Downtown Café (Main St)" disabled />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pickup-email">Notification email</Label>
        <Input
          id="pickup-email"
          type="email"
          defaultValue="not-an-email"
          aria-invalid
        />
        <p className="text-sm text-destructive">Enter a valid email address.</p>
      </div>
      <Button type="button" className="w-full">
        Save drink
      </Button>
    </form>
  );
}
