"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Building2, ChevronLeft, ChevronRight, Grid2X2, House, List, Search, SlidersHorizontal, X } from "lucide-react";
import { developments, properties, propertyTours } from "./content";
import { PropertyCard } from "./property-card";
import ProjectCard from "./project-card";
import { TourPlayer } from "./experience";
import { propertyCategory } from "./listing-status";
import { matchesBudget } from "./catalog-facts";
import { useContentMotion } from "./motion";
import { catalogQuery, defaultCatalogFilters, matchesCatalogProperty, readCatalogFilters, sortCatalogProperties, type CatalogFilters } from "./catalog-utils";

export function PropertyBrowser({initialQuery=""}: {initialQuery?:string}) {
  const [f, setFilters] = useState<CatalogFilters>(()=>readCatalogFilters(initialQuery));
  const [ready, setReady] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const results = useRef<HTMLDivElement>(null);
  const filterToggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const read = () => { setFilters(readCatalogFilters(window.location.search)); setReady(true); };
    read(); window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);
  const names = new Map(developments.map(d => [d.id, d.name]));
  const allLocations = [...developments, ...propertyTours];
  const regions = [...new Set(allLocations.map(p => p.area))].sort();
  const cities = [...new Set(allLocations.filter(p => !f.area || p.area === f.area).map(p => p.city))].sort();
  const projects = developments.filter(d => (!f.area || d.area === f.area) && (!f.city || d.city === f.city)).sort((a,b) => a.name.localeCompare(b.name));
  const matches = properties.filter(p => matchesCatalogProperty(p, f, names.get(p.developmentId) || ""));
  const found = sortCatalogProperties(matches.filter(p =>
    (f.pricing === "all" || (f.pricing === "published" ? p.price !== null : p.price === null)) &&
    matchesBudget(p, f.max, f.budgetBasis)), f.sort);
  const isProjects = f.browse === "projects";
  const foundProjects = developments.map(development => ({ development, matching: found.filter(p => p.developmentId === development.id) })).filter(item => item.matching.length > 0).sort((a,b) => {
    const key = (d: typeof a.development) => f.projectSort === "name" ? d.name : `${d.area} ${d.city} ${d.name}`;
    return key(a.development).localeCompare(key(b.development));
  });
  const resultCount = isProjects ? foundProjects.length : found.length;
  const pageCount = Math.max(1, Math.ceil(resultCount / f.pageSize));
  const page = Math.min(f.page, pageCount);
  const visible = found.slice((page - 1) * f.pageSize, page * f.pageSize);
  const visibleProjects = foundProjects.slice((page - 1) * f.pageSize, page * f.pageSize);
  const cards = useRef<HTMLDivElement>(null);
  useContentMotion(cards, `${f.browse}/${isProjects ? visibleProjects.map(p=>p.development.id).join(",") : visible.map(p=>p.id).join(",")}/${f.view}`);
  const needsPrice = matches.filter(p => p.price === null);
  const tours = propertyTours.filter(p => (!f.area || p.area === f.area) && (!f.city || p.city === f.city) &&
    (!f.project || p.developmentId === f.project) && (!f.search.trim() || `${p.title} ${p.development} ${p.city} ${p.area}`.toLowerCase().includes(f.search.trim().toLowerCase())));
  const filterKeys = ["area", "city", "project", "type", "max", "search", "beds", "minFloor", "minLot", "pricing", "subtype", "budgetBasis"] as const;
  const active = filterKeys.filter(key => f[key] !== defaultCatalogFilters[key]);
  const advancedCount = [f.beds, f.minFloor, f.minLot, f.pricing === "all" ? "" : f.pricing, f.subtype, f.budgetBasis === "starting" ? "" : f.budgetBasis].filter(Boolean).length;
  useEffect(() => {
    if (!ready) return;
    const query = catalogQuery({ ...f, page });
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
  }, [f, page, ready]);
  function update(values: Partial<CatalogFilters>) { setFilters(current => ({ ...current, ...values, page: 1 })); }
  function chooseArea(area: string) { update({ area, city: "", project: "" }); }
  function clearFilters() { setFilters(current => ({ ...defaultCatalogFilters, browse: current.browse, view: current.view, pageSize: current.pageSize })); }
  function remove(key: typeof filterKeys[number]) {
    if (key === "area") chooseArea("");
    else if (key === "city") update({city:"",project:""});
    else update({[key]:defaultCatalogFilters[key]});
  }
  function filterLabel(key: typeof filterKeys[number]) {
    if (key === "budgetBasis") return "Full displayed price range";
    if (key === "project") return names.get(f.project) || f.project;
    if (key === "max") return `Up to ₱${Number(f.max).toLocaleString("en-PH")}`;
    if (key === "beds") return `${f.beds}+ bedrooms`;
    if (key === "minFloor") return `Floor ≥ ${f.minFloor} sqm`;
    if (key === "minLot") return `Lot ≥ ${f.minLot} sqm`;
    if (key === "pricing") return f.pricing === "published" ? "Published prices" : "Price on inquiry";
    if (key === "search") return `“${f.search}”`;
    return f[key];
  }
  function changePage(event: MouseEvent<HTMLAnchorElement>, next: number) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    const query = catalogQuery({...f, page:next});
    window.history.pushState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
    setFilters(current => ({...current,page:next}));
    results.current?.scrollIntoView({block:"start",behavior:"instant"});
    results.current?.focus({preventScroll:true});
  }
  return <div className="compact-catalog">
    <div className="catalog-browse-switch" role="group" aria-label="Browse properties by">
      <button type="button" aria-pressed={!isProjects} onClick={()=>update({browse:"models"})}><House size={21} aria-hidden="true" /><span>Browse by model<small>Compare individual homes and unit types</small></span></button>
      <button type="button" aria-pressed={isProjects} onClick={()=>update({browse:"projects"})}><Building2 size={21} aria-hidden="true" /><span>Browse by project<small>Explore communities and developments</small></span></button>
    </div>
    <p className="catalog-browse-guidance">Compare individual homes and unit types, or explore their projects. Both views follow your filters.</p>
    <div className="catalog-search-bar">
      <label className="catalog-keyword">
        <Search size={19} aria-hidden="true" />
        <span className="sr-only">Search properties</span>
        <input type="search" value={f.search} onChange={e=>update({search:e.target.value})} placeholder="Search a project, model or location" />
      </label>
      <button ref={filterToggle} type="button" className="catalog-mobile-filters" aria-expanded={filtersOpen} aria-controls="catalog-filter-panel" onClick={()=>setFiltersOpen(!filtersOpen)}>
        <SlidersHorizontal size={17} /> Filters {active.length > 0 && <b>{active.length}</b>}
      </button>
      <label className="catalog-project-picker">Project<select value={f.project} onChange={e=>update({project:e.target.value})}><option value="">All projects</option>{projects.map(d=><option key={d.id} value={d.id}>{d.name}</option>)}</select></label>
    </div>
    <div id="catalog-filter-panel" className={`catalog-filter-panel ${filtersOpen ? "is-open" : ""}`}>
      <div className="catalog-basic-fields">
        <label>Province / region<select value={f.area} onChange={e=>chooseArea(e.target.value)}><option value="">All locations</option>{regions.map(a=><option key={a}>{a}</option>)}</select></label>
        <label>City / municipality<select value={f.city} onChange={e=>update({city:e.target.value,project:""})}><option value="">All cities / municipalities</option>{cities.map(c=><option key={c}>{c}</option>)}</select></label>
        <label>Property type<select value={f.type} onChange={e=>update({type:e.target.value,subtype:""})}><option value="">All types</option>{[...new Set(properties.map(p=>propertyCategory(p)))].sort().map(t=><option key={t}>{t}</option>)}</select></label>
        <label>Maximum budget<select value={f.max} onChange={e=>update({max:e.target.value})}><option value="">Any budget</option>{[3,5,10,20,50,100,150,200].map(m=><option value={m*1000000} key={m}>₱{m} million</option>)}</select></label>
      </div>
      <button type="button" className="catalog-more-button" aria-expanded={advancedOpen} aria-controls="catalog-advanced-fields" onClick={()=>setAdvancedOpen(!advancedOpen)}><SlidersHorizontal size={15} /> More filters {advancedCount > 0 && <b>{advancedCount}</b>}<ChevronRight size={15} /></button>
        <div id="catalog-advanced-fields" className="catalog-advanced-fields" hidden={!advancedOpen}>
          <label>House subtype<select value={f.subtype} onChange={e=>update({subtype:e.target.value,type:e.target.value ? "House & Lot" : f.type})}><option value="">Any house subtype</option>{[...new Set(properties.filter(p=>propertyCategory(p)==="House & Lot").map(p=>p.type))].sort().map(type=><option key={type}>{type}</option>)}</select></label>
          <label>Budget matching<select value={f.budgetBasis} onChange={e=>update({budgetBasis:e.target.value as CatalogFilters["budgetBasis"]})}><option value="starting">Starting guide fits budget</option><option value="full-range">Full displayed range fits budget</option></select></label>
          <label>Minimum bedrooms<select value={f.beds} onChange={e=>update({beds:e.target.value})}><option value="">Any bedroom count</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n}+ bedrooms</option>)}</select></label>
          <label>Minimum floor area (sqm)<input type="number" min="0" max="100000" step="any" value={f.minFloor} onChange={e=>update({minFloor:boundedArea(e.target.value)})} placeholder="Any floor area" /></label>
          <label>Minimum lot area (sqm)<input type="number" min="0" max="100000" step="any" value={f.minLot} onChange={e=>update({minLot:boundedArea(e.target.value)})} placeholder="Any lot area" /></label>
          <label>Price information<select value={f.pricing} onChange={e=>update({pricing:e.target.value as CatalogFilters["pricing"]})}><option value="all">All price information</option><option value="published">Published prices only</option><option value="request">Price on inquiry</option></select></label>
        </div>
      <button type="button" className="catalog-mobile-done" onClick={()=>{setFiltersOpen(false);filterToggle.current?.focus();}}>Show {resultCount} {isProjects ? "projects" : "models & unit types"} <ChevronRight size={16} /></button>
    </div>
    {f.max && <p className="catalog-budget-note">{f.budgetBasis === "full-range" ? "Budget matches use the upper end of each displayed guide range." : "Budget matches use the starting guide price; some configurations in a range may cost more."} Figures may be historical, expired or undated; fees may be extra.</p>}
    {active.length > 0 && <div className="catalog-active-filters" aria-label="Active property filters">
      {active.map(key=><button type="button" key={key} onClick={()=>remove(key)} aria-label={`Remove ${filterLabel(key)} filter`}>{filterLabel(key)}<X size={13} /></button>)}
      <button type="button" className="catalog-clear" onClick={clearFilters}>Clear all</button>
    </div>}
    <div className="catalog-result-bar" ref={results} tabIndex={-1}>
      <p role="status" aria-live="polite" aria-atomic="true"><strong>{resultCount}</strong> {isProjects ? (resultCount === 1 ? "project" : "projects") : "models & unit categories"}{resultCount>0 && <span>Showing {(page-1)*f.pageSize+1}–{Math.min(page*f.pageSize,resultCount)}</span>}</p>
      <div className="catalog-result-options">
        {isProjects ? <label className="catalog-sort"><span className="sr-only">Sort projects</span><select aria-label="Sort projects" value={f.projectSort} onChange={e=>update({projectSort:e.target.value as CatalogFilters["projectSort"]})}><option value="location">By location</option><option value="name">Project name: A–Z</option></select></label> : <label className="catalog-sort"><span className="sr-only">Sort properties</span><select aria-label="Sort properties" value={f.sort} onChange={e=>update({sort:e.target.value as CatalogFilters["sort"]})}><option value="location">By location</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="area-high">Floor area: largest first</option></select></label>}
        {!isProjects && <div className="catalog-view-switch" role="group" aria-label="Listing view">
          <button type="button" aria-label="Grid view" aria-pressed={f.view==="grid"} onClick={()=>setFilters(current=>({...current,view:"grid"}))}><Grid2X2 size={17} /></button>
          <button type="button" aria-label="List view" aria-pressed={f.view==="list"} onClick={()=>setFilters(current=>({...current,view:"list"}))}><List size={18} /></button>
        </div>}
      </div>
    </div>
    {f.max && f.pricing !== "published" && needsPrice.length>0 && <div className="catalog-price-help"><p>{needsPrice.length} {needsPrice.length===1?"model needs":"models need"} price confirmation and {needsPrice.length===1?"is":"are"} excluded from budget matches.</p><button type="button" onClick={()=>update({max:"",pricing:"request",browse:"models"})}>See these models <ArrowUpRight size={14} /></button></div>}
    {resultCount>0 ? <>
      <div ref={cards} className={isProjects ? "catalog-project-grid" : `catalog-card-grid ${f.view === "list" ? "is-list" : ""}`} aria-label={isProjects ? "Property projects" : "Property listings"}>
        {isProjects ? visibleProjects.map(({development,matching})=><ProjectCard development={development} matchingCount={matching.length} modelsUrl={`?${catalogQuery({...f,browse:"models",project:development.id,page:1})}`} key={development.id} />) : visible.map(p=><PropertyCard property={p} headingLevel={2} key={p.id} />)}
      </div>
      <div className="catalog-pagination-row">
        <label>Per page<select aria-label={isProjects ? "Projects per page" : "Properties per page"} value={f.pageSize} onChange={e=>update({pageSize:Number(e.target.value)})}><option value="12">12</option><option value="24">24</option></select></label>
        <nav className="catalog-pagination" aria-label={isProjects ? "Project result pages" : "Property result pages"}>
          {page>1 ? <a aria-label="Previous page" href={`?${catalogQuery({...f,page:page-1})}`} onClick={e=>changePage(e,page-1)}><ChevronLeft size={17} /></a> : <span aria-disabled="true"><ChevronLeft size={17} /></span>}
          {Array.from({length:pageCount},(_,i)=>i+1).map(n=><a key={n} aria-label={`Page ${n}`} aria-current={page===n?"page":undefined} href={`?${catalogQuery({...f,page:n})}`} onClick={e=>changePage(e,n)}>{n}</a>)}
          {page<pageCount ? <a aria-label="Next page" href={`?${catalogQuery({...f,page:page+1})}`} onClick={e=>changePage(e,page+1)}><ChevronRight size={17} /></a> : <span aria-disabled="true"><ChevronRight size={17} /></span>}
        </nav>
        <span className="catalog-page-caption">Page {page} of {pageCount}</span>
      </div>
    </> : <div className="catalog-empty"><Search size={27} /><h2>{isProjects ? "No matching projects yet." : "No matching homes yet."}</h2><p>Try a wider location, budget or space range. You can also ask JMG to find options for you.</p><button type="button" className="button" onClick={clearFilters}>Clear filters</button><a href="/contact?service=Property%20Matching">Request a property match <ArrowUpRight size={15} /></a></div>}
    <details className="catalog-information"><summary>About these prices & property details</summary><p>Each project and model page identifies its sources and material limitations. Source-review dates do not mean prices were refreshed. Confirm current prices, price basis, availability and inclusions with JMG Realty PH. Condo list prices are dated source examples and exclude additional charges. Budget filters include only numeric published prices. Space filters use reviewed minimum measurements, including labeled approximate areas; conflicting and unmeasured categories are excluded. Unknown bedroom counts and bedroom provisions do not match minimum-bedroom filters.</p></details>
    {tours.length>0 && <details className="catalog-video-tours" open={toursOpen} onToggle={e=>setToursOpen(e.currentTarget.open)} id="property-tours"><summary><span>Explore property tours <small>{tours.length} videos</small></span><ChevronRight size={19} /></summary><p>These BrokerCel tours follow your location, development and search selections. Model type, price and space filters apply to the homes and units above. Ask JMG for current details.</p>{toursOpen && <div className="tour-grid">{tours.map(t=><TourPlayer key={t.id} tour={t} />)}</div>}</details>}
  </div>;
}

function boundedArea(value: string) { return value === "" ? "" : String(Math.min(100000, Math.max(0, Number(value)))); }

