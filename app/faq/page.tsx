import { canonical } from "../site-info";
import { inspirationImages } from "../listing-inspiration";
import { Shell, PageHero, FAQ, Action } from "../components";
export const metadata = { title: "Frequently Asked Questions",
  description: "Understand historical property prices, representative photographs, floor plans, viewing requests and the JMG Realty PH inquiry process.",
  alternates: { canonical: canonical("/faq") },
};
export default function Questions() {
  return (
    <Shell>
      <PageHero
        eyebrow="HELPFUL CLARITY"
        title="Good questions."
        italic="Clear answers."
        description="A starting point for your property journey or your interest in joining JMG Realty PH."
        image={inspirationImages.studio.src}
        imageAlt={inspirationImages.studio.alt}
        imageCaption={inspirationImages.studio.caption}
        imageHref={inspirationImages.studio.href}
      />
      <section className="section wrap faq-page">
        <FAQ />
        <div className="faq-followup">
          <h2>
            Something else
            <br />
            <em>on your mind?</em>
          </h2>
          <Action href="/contact">Ask our team</Action>
        </div>
      </section>
    </Shell>
  );
}
