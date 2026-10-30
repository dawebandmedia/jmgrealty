# JMG Realty PH — design audit and redesign direction

12 October 2026

## Honest assessment

The existing site has a coherent green palette, but its experience is too close to a polished brochure template. A large stock architecture photograph does most of the visual work. The same serif heading, italic second line, two-column introduction and generous vertical gap repeat throughout. Buyers reach real properties only after a company introduction and services section. The imported catalog then switches to a conventional grid with small facts and six equally weighted filters. It does not help visitors retain, compare or act on what they discover.

The most serious authenticity gap is visual: the original stock hero is more aspirational than the available BrokerCel model photography. The remedy is explicit captions and better presentation of the real records. Enlarging a low-resolution image cannot create missing detail. Madonna's entrance illustration must continue to be identified as an illustration rather than a photograph of each house.

“500% better” is a design ambition, not a measurable claim. The priorities below are ranked by the combined visual, usability, implementation and business benefit. Ratings are design judgments, not measured conversion results.

## The ten highest-impact changes

| Rank | Change | Visual impact | UX impact | Practicality | Business value |
| --- | --- | --- | --- | --- | --- |
| 1 | Art-direct the first screen | Very high | High | High | High |
| 2 | Put real properties immediately after the hero | High | Very high | Very high | Very high |
| 3 | Build an editorial model showcase | Very high | High | High | High |
| 4 | Simplify discovery and mobile filters | High | Very high | Very high | Very high |
| 5 | Add a persistent shortlist and comparison | Medium | Very high | High | Very high |
| 6 | Rebuild the property detail journey | Very high | Very high | High | Very high |
| 7 | Make location exploration interactive | High | High | High | High |
| 8 | Turn services into a purposeful decision guide | High | High | Very high | High |
| 9 | Give recruitment its own memorable invitation | High | High | Very high | High |
| 10 | Apply a disciplined mobile and motion system | Very high | Very high | High | Very high |

### 1. Art-direct the first screen

**Weakness:** Full-width stock photography, a dark gradient and “next chapter” typography are familiar luxury website conventions. The image is barely identified as inspiration on the homepage.

**Alternative:** An architectural composition: a deep green field, an oversized but readable headline, an inset photographic frame, fine rules, a deliberate image caption and a compact property-discovery panel. The picture and typography should have separate space instead of competing under a heavy overlay.

**Visitor benefit:** Immediate identity, clarity about the company and a direct way into the catalog.

**Implementation:** Recompose the homepage hero in semantic HTML/CSS; keep the first local WebP eager-loaded. Reveal the title and frame once, use a small desktop-only scroll offset, and disable motion for reduced-motion users. No autoplay carousel or scroll hijacking.

### 2. Put real properties immediately after the hero

**Weakness:** Company explanations and services delay the main buyer task. Several sections make essentially the same emotional promise.

**Alternative:** Hero → real model collection → location exploration → professional guidance → recruitment → focused questions. Consolidate repetitive introduction and inspiration sections.

**Visitor benefit:** Visitors see concrete homes, published prices and useful specifications before being asked to read a long company story.

**Implementation:** Rewrite the homepage structure while retaining all six services, eight service areas, recruitment and contact routes. Show accurate catalog counts, not invented sales or company statistics.

### 3. Build an editorial model showcase

**Weakness:** Equal-sized development cards flatten the collection; property photos are treated like generic thumbnails.

**Alternative:** A large model image paired with a numbered model selector, published price, bedroom/bathroom counts, floor/lot dimensions and a clear detail link. Alternate dense information with quiet imagery.

**Visitor benefit:** Buyers can understand differences between real models without opening several pages immediately.

**Implementation:** Manual buttons change the showcased model, with an accessible live summary and short image transition. Preserve complete images where useful, captions, approximate measurements and Contact for Price. Do not manufacture new property photos, floor plans or interiors.

### 4. Simplify discovery and mobile filters

**Weakness:** Six filters receive equal emphasis. On phones they become a long form before results. Active selections are not summarized well.

**Alternative:** Location first, then optional refinement. Use an expandable filter panel, explicit active-filter chips, a live result count and simple clearing. Keep province → city → development dependencies.

**Visitor benefit:** Less work to see relevant models; easy recovery from an empty search.

**Implementation:** Retain shareable URL state and budget rules. Use native labels and controls, a mobile disclosure, announced result changes and tap targets of at least 44 pixels.

### 5. Add a persistent shortlist and comparison

**Weakness:** The visitor loses their choices when browsing. There is no practical way to compare lot area, floor area, bedrooms or price.

**Alternative:** Save up to three models, then inspect an aligned comparison and send an inquiry containing the selected model names and locations.

**Visitor benefit:** A concrete decision tool and a more useful conversation with JMG.

**Implementation:** Local browser storage for model IDs; native modal dialog, explicit remove/clear controls, accessible saved-state buttons and a mobile-friendly comparison layout. State must survive navigation and gracefully handle unavailable browser storage.

### 6. Rebuild the property detail journey

**Weakness:** A long description repeats in the hero and body. The price and inquiry button appear below the introductory image. Video tours are plain external links; amenities are an undifferentiated list.

**Alternative:** A concise model identity, an uncropped image stage, a prominent specification ribbon, sticky price/inquiry panel, jump links and organized sections for model, community, imagery and source video.

**Visitor benefit:** The visitor can understand the home and ask about it from any point in the page.

**Implementation:** Reuse verified records and the existing gallery. Load YouTube only after an intentional play action; keep a source link as a fallback. Add shortlist control and related models. Source images remain honest about their limitations.

### 7. Make location exploration interactive

**Weakness:** Eight province links communicate coverage but little about what is actually available in the catalog.

**Alternative:** A large location index with a selected province's cities, developments, model counts and tours. Clearly distinguish service coverage from published catalog records.

**Visitor benefit:** Buyers see the correct location hierarchy and can reach a precise collection directly.

**Implementation:** An accessible province button list and linked detail panel based entirely on imported records. Areas without published models lead to a location-specific inquiry. No fabricated map coordinates, travel times or local amenities.

### 8. Turn services into a purposeful decision guide

**Weakness:** Three near-identical service cards repeat explanatory text and hide the other services.

**Alternative:** A numbered service index that reveals one clear explanation and relevant next action at a time, followed by a concise three-step client journey.

**Visitor benefit:** Buyers, sellers and appraisal clients can identify the right starting point.

**Implementation:** Six explicit buttons, a controlled content panel and existing service/contact links with the service preselected. Keep company credentials and fees limited to supplied facts.

### 9. Give recruitment its own memorable invitation

**Weakness:** Recruitment resembles another property inspiration section and lacks a clear emotional and practical identity.

**Alternative:** A bold green invitation with a visible recruitment label, two entry paths for aspiring and experienced professionals, and a plain explanation of what happens after applying.

**Visitor benefit:** Candidates immediately recognize that joining JMG is a central purpose of the website.

**Implementation:** Recompose the homepage recruitment section and refine the application page hierarchy. Preserve its working form and consent. Do not invent salary, commission percentages, training schedules, accreditation or guaranteed placement.

### 10. Apply a disciplined mobile and motion system

**Weakness:** Important body text is often 10–12 pixels. Most reveals move the same way. Desktop sections shrink rather than acquiring an intentional phone composition.

**Alternative:** A consistent spacing/type scale, stronger contrast, larger factual text, carefully composed narrow layouts, quiet transitions and persistent contextual access to saved homes.

**Visitor benefit:** A premium experience that remains readable and practical on a phone and with a keyboard.

**Implementation:** Fluid type and spacing; a bounded hero height; separate phone layout; visible focus; native dialogs; page progress; limited transform/opacity motion; reduced-motion fallbacks. Verify real interactions at desktop and phone widths, not only a screenshot of the hero.

## Cohesive direction: Architecture, with a human purpose

Use pine green, dark forest, warm stone and restrained sage. Pair expressive Cormorant headlines with readable Manrope facts. Build identity through a framed architectural image, precise rules, small numbered indexes and broad green/stone surfaces. Alternate a photographic opening, an editorial model collection, an interactive location index, a structured service guide and a bold recruitment invitation.

Motion should explain state changes and direct attention. It should never delay access, replace native scrolling or require a high-performance device. Model imagery and real specifications carry the product story. Saved comparisons and prefilled inquiries carry the business journey.

## Reference principles

The references inform the direction rather than supplying JMG content or a copied layout:

- [Norm Architects](https://normcph.com/project/): project-oriented categorization and emphasis on architectural work. Interpretation for JMG: properties should carry the story before corporate explanations.
- [Aman destinations](https://www.aman.com/destinations): place-led exploration and distinct location experiences. Interpretation for JMG: show a clear province/city/development hierarchy.
- [Porsche model overview](https://www.porsche.com/usa/models/): explicit model selection, filtering and understanding differences. Interpretation for JMG: a useful comparison should accompany aspirational presentation.

The existing Blackhouse reference page could not be retrieved in this review; no new claims about its current design are based on that failed retrieval.

## What requires better source material

Authentic high-resolution house exteriors, interiors, approved agent photographs, floor plans and professionally captured tours would raise the ceiling further. The current records do not supply the materials needed for a trustworthy interactive floor plan, 360-degree tour or house-specific 3D model. Payment plans also require confirmed developer terms. These should be added when available; synthetic house details and financing offers would damage trust.

## Verification target

Production build and type checking; desktop and phone overflow/readability; model switching; all location paths; filtering and empty results; saving, removing and comparing homes; persistence after navigation; prefilled inquiries; video opening/closing; native gallery; recruitment form; keyboard focus and Escape; reduced-motion behavior. A successful local preview must load its CSS, scripts and images before handoff.

## Implemented redesign — 12 October 2026

All ten ranked areas have been addressed in the available code. The homepage now proceeds from a framed forest-green opening to real model exploration, location selection, a service decision guide and recruitment. The collection page prioritizes province selection and offers additional filters on request. Individual model pages give the published price, a large uncropped image, clear specifications and a contextual inquiry.

The new saved-home experience retains up to three valid models in browser storage, compares published facts and carries the selected model names and locations into an inquiry. It handles unavailable storage with a session-only fallback. Native image and video dialogs provide close controls and Escape behavior. YouTube video embeds load only after the visitor chooses to play a tour.

The BrokerCel records, six services, eight service areas, contact details and existing inquiry/application storage remain intact. Missing prices continue to say Contact for Price. The Madonna development illustration and architectural inspiration photographs remain labeled.

## Verification completed

| Check | Result |
|---|---|
| Production build and TypeScript | Passed for the final implementation. |
| Local visual asset readiness | Stylesheet, eleven browser scripts and both initial images returned nonempty content with the correct types before opening the preview. |
| Routes | All 18 page routes returned complete HTML with status 200, including all eight imported model pages. |
| Desktop layout | Reviewed at 1440 × 1000; opening, collection, model detail and comparison fit without horizontal overflow. |
| Phone layout | Reviewed at 390 × 844 and 320 × 740; homepage, catalog, detail and recruitment fit without horizontal overflow. Key model/search controls meet a 44-pixel minimum height. |
| Model showcase | Switching models updates the image, name, price and specifications. Desktop and phone selections checked. |
| Location index | All eight province paths checked; published cities lead to the correct province/city collection, other areas to a location-specific matching inquiry. |
| Service guide | All six services checked; contact service selection and recruitment links are correct. Phone service selection checked. |
| Catalog filters | Province, city, development, model search, budget, clear filters and price sorting checked. Filters update the address and result count. A numeric budget excludes models without a published price and produces a useful empty state. |
| Saved homes | Save, remove, three-model limit, desktop comparison, stacked phone comparison and persistence after navigation/reload checked. |
| Contextual inquiry | Selecting three homes prefills the inquiry with their model names, developments, cities and provinces; brokerage is selected. |
| Gallery and video | Full-image gallery opens and closes. A real Amaresa development video plays in the dialog. Closing removes its iframe and restores page scrolling. |
| Mobile navigation and keyboard | Menu focus, background exclusion and scroll lock checked. Escape closes a comparison opened from the menu first, then closes the menu on the next press. Dialog focus returns to its trigger. |
| Forms | Empty inquiry submission focuses the required name field. One clearly labeled synthetic local inquiry and one synthetic local recruitment request saved successfully and returned reference numbers. No email notifications were sent. |
| Browser errors | No browser console errors were observed during the final local page checks. |
| Reduced motion | CSS and component logic inspected: reveals become static, transitions/animations are removed, smooth scrolling is disabled and hero parallax is suppressed. The operating-system preference was not emulated in the browser tool. |

These are functional and visual checks, not a full accessibility certification, a slow-network performance benchmark or evidence of conversion uplift. Live hosting and cross-browser/device testing remain separate from the verified local build. The verification requests live only in the local database; runtime data and dependencies are excluded from the downloadable source.

## Remaining opportunities

1. Replace labeled inspiration imagery with a professionally shot JMG brand photograph when available.
2. Add authentic interiors, floor plans and verified house-specific tours to deepen property decisions.
3. Add approved agent profiles and genuine client feedback to strengthen trust.
4. Add confirmed recruitment requirements and compensation/support details to help candidates assess fit.
5. Complete hosting, then evaluate real visitor behavior and inquiry completion before claiming business improvements.

The publishing helper's credential-input step was rejected by automatic approval review. The existing private Site is preserved, but the redesign has not been deployed publicly. The download includes the complete editable source, assets and corrected Windows launcher.
