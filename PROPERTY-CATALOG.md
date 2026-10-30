# BrokerCel properties added to JMG Realty PH

Imported on **11 October 2026** from the company website [BrokerCel](https://brokercel.com/).

The JMG catalog now follows **province → city / municipality → development → house model**.

| Province | City / municipality | Development | Imported content |
| --- | --- | --- | --- |
| Bulacan | Marilao, Loma de Gato | Amaresa Homes | Alexandria, Amara Expanded, Kayla Prime, Arya Prime; one property tour |
| Bulacan | Santa Maria | North Orchard Residences | Florence |
| Bulacan | Santa Maria | Bellavista Subdivision | One property tour |
| Bulacan | San Jose del Monte | Beverly Homes | Two property tours |
| Pampanga | San Fernando | Madonna Residences | Rojul, Abigail, Julieta |
| Pampanga | Magalang | PHirst Park Homes Magalang East | One property tour |

## Included

- Eight model detail pages with published prices or **Contact for Price**, bedrooms, bathrooms, lot area, floor area, carport, descriptions and amenities.
- Five property tours linked to their original YouTube videos, organized by location.
- Seven locally stored and optimized property/development images.
- Province, city, development, property type, search and budget filters.
- A location directory with development counts and links into the catalog.
- Property inquiry links that fill in the model, development, city and province.
- The original eight JMG service areas and agent recruitment pages.

## Source details preserved

Four Amaresa models have published numeric prices. Florence and the three Madonna models publish **Contact for Price**; no price was invented. Approximate measurements remain labeled **Approx.**

Amaresa's development page identifies **Loma de Gato, Marilao, Bulacan**. Its model pages identify Amaresa, Bulacan, and its tour identifies Amaresa Marilao. The model pages explain this location mapping and ask clients to confirm the exact phase and lot.

The three Madonna model pages use the same development entrance illustration. JMG labels that image as a development illustration, with no claim that it depicts the individual model.

BrokerCel's general property search showed two duplicate **Sample Modern House** records, explicitly described as test data. Those were excluded. The unidentifiable **Location Two** and placeholder `VIDEO_ID` embeds were also excluded.

BrokerCel's development links could be read through its homepage, but loading those addresses directly returned a 404 during import. JMG detail pages link to the working BrokerCel homepage and identify the original development. Source detail addresses are retained in the editable data and inventory.

## Edit later

Extract the updated website ZIP and edit **app/property-data.ts**, or ask Codex to update the catalog from your revised inventory. **BrokerCel-property-inventory.csv** is an easy reference for reviewing the imported facts. Editing the CSV alone does not update the website.

This is a saved snapshot, so later changes on BrokerCel will need another import. Confirm current prices, availability, finishes and inclusions before launch. The JMG website displays this reminder.

## Review completed

The updated source passed TypeScript checks and a production build in a fresh build folder. All eight model pages, the homepage, location directory, property catalog, sitemap and seven image files returned successful responses. Browser checks covered city filters, budget sorting, image viewing and property inquiry details. Desktop and mobile layouts were reviewed.

The registered private Site remains unpublished. Its current live URL is empty and its saved version count is zero. The earlier automatic approval rejection of the publishing helper's input remains a hosting blocker; the updated source is supplied as a runnable website ZIP.
