import { inspirationImages } from "../listing-inspiration";
import { Shell, PageHero, InquiryForm, Reveal, FAQ } from "../components";
import { company } from "../content";
import ContactPeople from "../contact-people";
import { canonical } from "../site-info";
export const metadata = { title: "Contact Us", description: "Contact Broker Cel or Home Empire PH at JMG Realty PH by phone, Viber, WhatsApp or the inquiry form for current property details.", alternates: { canonical: canonical("/contact") } };
export default function Contact() {
  return (
    <Shell className="site-contact">
      <PageHero
        eyebrow="LET’S START WITH A CONVERSATION"
        title="Your next move."
        italic="We’re here for it."
        description="Buying, selling, investing, or requesting an appraisal? Tell JMG Realty PH what you have in mind."
        image={inspirationImages.living.src}
        imageAlt={inspirationImages.living.alt}
        imageCaption={inspirationImages.living.caption}
        imageHref={inspirationImages.living.href}
      />
      <div className="wrap contact-quick-actions"><a href="#send-inquiry" className="button">Send an inquiry ↗</a><a href="#contact-people" className="text-link">Call or message our team ↓</a></div>
      <section className="section wrap contact-layout">
        <div id="contact-people" className="contact-details">
          <span className="eyebrow">GET IN TOUCH</span>
          <h2>
            Let’s talk
            <br />
            <em>possibilities.</em>
          </h2>
          <p>Reach out directly or share a few details through the form.</p>
          <ContactPeople />
          <div className="contact-block">
            <span className="eyebrow">EMAIL</span>
            <a className="email-contact" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </div>
          <div className="contact-block">
            <span className="eyebrow">OFFICE HOURS</span>
            <p>
              Monday–Saturday
              <br />
              8:00 AM–5:00 PM · GMT+8
            </p>
          </div>
          {company.address && (
            <div className="contact-block">
              <span className="eyebrow">VISIT US</span>
              <p>{company.address}</p>
            </div>
          )}
          <p>
            Interested in joining the team?
            <br />
            <a href="/join" className="text-link">
              Visit our recruitment page ↗
            </a>
          </p>
        </div>
        <div id="send-inquiry" className="contact-form-first"><InquiryForm /></div>
      </section>
      <section className="section wrap faq-layout">
        <div>
          <span className="eyebrow">BEFORE YOU REACH OUT</span>
          <h2>
            A little
            <br />
            <em>helpful clarity.</em>
          </h2>
        </div>
        <FAQ limit={3} />
      </section>
    </Shell>
  );
}
