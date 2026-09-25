import BookingWidget from "@/components/booking/BookingWidget";
import SimpleShell from "@/components/booking/SimpleShell";

export const metadata = {
  title: "Book an E-Bike | Oahu.BIKE",
  description:
    "Reserve a foldable RadExpand 5 e-bike in Honolulu. Pick a time and pickup spot, pay securely online, and get your lockbox code by text.",
};

const first = (v) => (Array.isArray(v) ? v[0] : v);

export default async function BookPage({ searchParams }) {
  const sp = await searchParams;
  return (
    <SimpleShell>
      <section className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">Book your e-bike</h1>
        <p className="mt-2 text-slate-600">
          Foldable RadExpand 5 e-bikes with a helmet and U-lock included. Pick a time and spot, pay securely,
          and we&rsquo;ll text your lockbox code before pickup.
        </p>
        <div className="mt-8">
          <BookingWidget
            initialRental={first(sp.rental)}
            initialLocation={first(sp.location)}
            partner={first(sp.partner)}
            cancelled={first(sp.cancelled) === "1"}
          />
        </div>
      </section>
    </SimpleShell>
  );
}
