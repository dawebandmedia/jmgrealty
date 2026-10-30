import { canonical } from "../site-info";
import { inspirationImages } from "../listing-inspiration";
import { Shell, PageHero, ArrowUpRight } from "../components";
import LocationDirectory from "../location-directory";
export const metadata = { title: "Areas We Serve",
  description: "Browse property models in Metro Manila, Bulacan, Pampanga and Cavite, or ask JMG Realty PH about our other service areas.",
  alternates: { canonical: canonical("/areas") },
};
export default function Areas() {
  return (
    <Shell>
      <PageHero
        eyebrow="EIGHT AREAS. ONE TRUSTED PARTNER."
        title="Connected to"
        italic="your next move."
        description="Explore our properties by province, city and development, or ask about brokerage and appraisal across the eight areas we serve."
        image={inspirationImages.skyline.src}
        imageAlt={inspirationImages.skyline.alt}
        imageCaption={inspirationImages.skyline.caption}
        imageHref={inspirationImages.skyline.href}
      />
      <section className="section wrap">
        <LocationDirectory />
        <div className="location-note">
          <p>
            Looking beyond these areas? Contact us to discuss your property’s
            location and the support you need.
          </p>
          <a className="text-link" href="/contact">
            Talk to our team <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </Shell>
  );
}
