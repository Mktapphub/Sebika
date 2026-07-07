import { BadgeCheck, MapPin, Star, Clock } from "lucide-react";
import type { Doctor } from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-lift">
      <div className="flex items-start gap-4">
        <Avatar className="h-14 w-14 shrink-0 border border-border">
          <AvatarFallback className="bg-primary-soft text-primary font-semibold">
            {doctor.initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-sans text-base font-semibold text-foreground">
              {doctor.name}
            </h3>
            {doctor.verified && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-primary" aria-label="Verified" />
            )}
          </div>
          <p className="truncate text-sm font-medium text-primary">{doctor.specialty}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{doctor.degrees}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-warning text-warning" />
          <span className="font-semibold text-foreground">{doctor.rating}</span>({doctor.reviews})
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {doctor.hospital}, {doctor.location}
        </span>
        <span>{doctor.experience} yrs exp.</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {doctor.verified && (
          <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/10">
            BMDC Verified
          </Badge>
        )}
        {doctor.languages.map((l) => (
          <Badge key={l} variant="outline" className="font-normal">
            {l}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-[11px] text-muted-foreground">Next available</p>
          <p className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {doctor.nextSlot}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-muted-foreground">Fee</p>
          <p className="text-sm font-semibold text-foreground">৳{doctor.fee}</p>
        </div>
      </div>

      <Button
        className="mt-4 w-full"
        onClick={() => toast.success(`Appointment requested with ${doctor.name}`, {
          description: doctor.nextSlot,
        })}
      >
        Book Appointment
      </Button>
    </div>
  );
}
