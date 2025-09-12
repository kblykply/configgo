// app/contact/page.tsx
import Contact from "../components/contact/contact";
import MeetBooking from "../components/contact/MeetBooking";

export const metadata = {
  title: "Contact",
  description: "Get in touch about Digital Twin projects, demos, and partnerships.",
};

export default function Page() {
  return (
    <main className="min-h-svh bg-[var(--background)] text-white">
      <Contact />
      <MeetBooking /> 
    </main>
  );
}
