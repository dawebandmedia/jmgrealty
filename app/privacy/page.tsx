import { canonical } from "../site-info";
import { Shell } from "../components";
import { company } from "../content";
export const metadata = { title: "Privacy Notice",
  description: "Read how JMG Realty PH handles inquiry details, property requests and recruitment information.",
  alternates: { canonical: canonical("/privacy") },
};
export default function Privacy() {
  return (
    <Shell>
      <section className="section wrap privacy-copy">
        <span className="eyebrow">YOUR INFORMATION</span>
        <h1>
          Privacy <em>notice.</em>
        </h1>
        <p>
          When you contact JMG Realty PH through this website, we collect the
          details you choose to provide: your name, email, phone number,
          location, service preferences, selected house models, contact
          preferences, requested viewing date and format, property requirements,
          message, and any application background.
        </p>
        <h2>How your details are used</h2>
        <p>
          JMG Realty PH uses your submitted details to respond to your inquiry,
          discuss property services, or review your interest in joining the
          team. Inquiries and applications are stored in the website’s database
          and can be reviewed through a protected owner inbox.
        </p>
        <h2>What to share</h2>
        <p>
          Please provide only the information needed for your inquiry. Do not
          include identity documents, payment details or sensitive records in
          the message field. The team can discuss any necessary documents with
          you directly.
        </p>
        <h2>Your choices</h2>
        <p>
          Contact <a href={`mailto:${company.email}`}>{company.email}</a> to ask
          about the details you have submitted, request a correction or
          deletion, or withdraw consent for further contact.
        </p>
        <h2>Website preferences</h2>
        <p>
          The public pages do not use advertising or analytics cookies. The
          protected owner inbox uses a session cookie to keep its administrator
          signed in. Basic hosting records may be used to operate and protect
          the website.
        </p>
        <p>
          Saved model selections are stored in this browser when local storage
          is available. Shortlist links contain the selected public model IDs;
          they do not include your contact details or the owner inbox's internal
          notes. Anyone with access to this website and that link can view its
          model selection.
        </p>
        <h2>Questions</h2>
        <p>
          For questions about this notice or your personal information, email
          JMG Realty PH or call {company.primaryPhone} during office hours.
        </p>
      </section>
    </Shell>
  );
}
