import { ArrowUpRight, Phone } from "lucide-react";

// Names, roles and channels supplied by the JMG owners, 15 October 2026.
// Credentials below were additionally supplied by the owner; current PRC status
// and membership have not been independently checked.
export const contactPeople = [
  {
    name: "Broker Cel", fullName: "Maricel Gacutan", role: "Broker & Appraiser", phone: "0967 521 8935", tel: "+639675218935",
    experience: "15 years of Philippine real estate experience",
    expertise: "Brokerage · Property Sales · Marketing · Client Representation · Real Estate Investment Guidance · Property Valuation",
    credentials: ["PRC Licensed Real Estate Broker · License No. 0037391", "PRC Licensed Real Estate Appraiser · License No. 0014262", "Member, Philippine Federation of Real Estate Service Professionals, Inc. (PFRESPI)"],
    channels: [
      { label: "Viber", url: "https://viber.me/639675218935", detail: "0967 521 8935" },
      { label: "WhatsApp", url: "https://wa.me/639335661347", detail: "0933 566 1347" },
    ],
    links: [
      { label: "Facebook", url: "https://www.facebook.com/maricelgavenagacutan/" },
      { label: "Website", url: "https://brokercel.com/" },
      { label: "YouTube", url: "https://www.youtube.com/@maricelgaveñagacutan" },
    ],
  },
  {
    name: "Home Empire PH", fullName: "", role: "Salesperson", phone: "+63 967 426 9838", tel: "+639674269838", experience: "", expertise: "", credentials: [] as string[],
    channels: [
      { label: "Viber", url: "https://viber.me/639674269838", detail: "0967 426 9838" },
      { label: "WhatsApp", url: "https://wa.me/639674269838", detail: "0967 426 9838" },
    ],
    links: [
      { label: "Facebook", url: "https://www.facebook.com/HomeEmpirePropertiesPHbyJIG" },
      { label: "YouTube", url: "https://www.youtube.com/@homeempirepropertiesphByJig" },
      { label: "Instagram", url: "https://www.instagram.com/homeempireproperties/" },
      { label: "TikTok", url: "https://www.tiktok.com/@jighomeempire" },
    ],
  },
];

export default function ContactPeople({ expandedCredentials = false }: { expandedCredentials?: boolean }) {
  return <div className="contact-people">{contactPeople.map(person => <article className="contact-person" key={person.name}>
    <span className="eyebrow">{person.role}</span><h3>{person.name}</h3>
    {person.fullName && <p className="person-full-name">{person.fullName}</p>}
    {person.experience && <p className="person-experience">{person.experience}</p>}
    {person.expertise && <p className="person-expertise">{person.expertise}</p>}
    {person.credentials.length > 0 && <details className="person-credentials" open={expandedCredentials}><summary>Professional credentials</summary><ul>{person.credentials.map(credential => <li key={credential}>{credential}</li>)}</ul></details>}
    <a className="person-phone" href={`tel:${person.tel}`}><Phone size={16} aria-hidden="true"/>{person.phone}</a>
    <div className="person-channels">{person.channels.map(link => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on ${link.label}: ${link.detail}`}><strong>{link.label}<ArrowUpRight size={15} aria-hidden="true"/></strong><span>{link.detail}</span></a>)}</div>
    <nav className="person-socials" aria-label={`${person.name} public profiles`}>{person.links.map(link => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight size={13} aria-hidden="true"/></a>)}</nav>
  </article>)}</div>;
}
