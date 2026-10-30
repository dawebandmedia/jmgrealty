import { Shell, Action } from "./components";
export default function NotFound() {
  return (
    <Shell>
      <section className="section wrap empty-listings">
        <span className="eyebrow">LET’S FIND YOUR WAY</span>
        <h1>
          A different
          <br />
          <em>path forward.</em>
        </h1>
        <p>
          This page or property isn’t available. Explore our services or contact
          JMG Realty PH for help.
        </p>
        <Action href="/">Return to home</Action>
      </section>
    </Shell>
  );
}
