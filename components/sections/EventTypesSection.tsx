import { eventTypes } from "@/data/events";
import EventCard from "@/components/ui/EventCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function EventTypesSection() {
  return (
    <section id="dogadjaji" className="bg-wine px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Za svaku priliku"
          title="Događaji koje pokrivamo"
          subtitle="Bilo da slavite rođendan, organizujete poslovni sastanak ili dočekujete Novu godinu — imamo rešenje."
          light
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
          {eventTypes.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
