# JMG Realty PH — motion update, 15 October 2026

Updated source ZIP only; no hosting or publication changes.

## The ten enhancements

| Effect | Implementation | Usability boundary |
| --- | --- | --- |
| Spring bookmark | 300 ms icon compression and settle on Save/Remove | Button hit area is stable; no animation at the three-model limit |
| Property-photo depth | 2.5% photo zoom, 220 ms, inside listing-image frames | Fine mouse pointers only; cards, prices and actions remain stationary |
| Filter feedback | 160 ms result fade and active-filter chip feedback | Results, counts and URLs update immediately; no delayed search or animated grid reflow |
| Gallery cross-fades | 200 ms outgoing-photo fade after the incoming image loads | Featured models, primary gallery dialogs and interior-photo viewer; at most one outgoing decorative image; no automatic slideshow |
| Gold architectural line | Decorative abstract building/roof outline draws once in 1.1 seconds | Not a property plan or construction claim; heading, image and calls to action are immediately available |
| Spring selection markers | Small gold marker follows the selected featured model/location in 260 ms | Works with mouse, keyboard and tap; only the marker moves; resize-aware positioning |
| Plan focus transition | 180 ms transform transition for button/keyboard zoom and reset | Drag/pinch updates remain immediate; source drawings and geometry are unchanged |
| Soft spotlight | Faint radial light tracks the pointer inside the homepage photo | Fine mouse pointers only; no intercepted clicks; one scheduled frame at a time; stops at rest, pointer exit, hidden page or reduced motion |
| Inquiry success check | Checkmark draws once in 320 ms | Mounted only after the existing successful saved-reference check; no fake success or sample submission |
| Comparison emphasis | Differing facts receive a 600 ms fading gold highlight when selection changes | Text remains readable; no table-row movement or alteration of facts |

The main animation sources are `app/motion.tsx` and `app/motion.css`. No animation package, physics engine, remote script, image download, autoplay video or continuously running scene was added. “Spring” describes a short easing/keyframe response, not a heavyweight physics simulation.

## Calm mode and compatibility

- Device `prefers-reduced-motion` settings take priority and suppress decorative movement, including existing entrance/parallax effects.
- A small **Reduce motion** button in the footer lets visitors choose calm mode directly. The local browser preference is retained where storage is available. It does not override a device's reduced-motion preference.
- Hover depth and pointer lighting are gated by hover/fine-pointer support; touch devices retain direct, ordinary controls. Existing keyboard shortcuts, original-image links, image zoom and modal close controls remain available.
- Web Animations and ResizeObserver use feature detection. Unsupported animation features fall back to immediate updates. Older media-query listeners and viewport-height fallbacks are included. The base site retains its existing browser requirements, including JavaScript for its interactive features and modern dialog support for modal galleries.
- Most effects animate transform/opacity. The one-time small line/check strokes use vector drawing. No custom scroll engine, custom cursor, scroll lock for decorative effects, hidden result delay or full-page animation framework was added.
- Original property assets, floors plans, flyers, contacts, prices, price notices and the Windows launcher are preserved. The source-review date is not a current quotation date.

The implementation targets current Chrome, Edge, Firefox and Safari on phones, tablets and computers, with static effect fallbacks. Universal compatibility or a fixed frame rate on every historical device cannot be guaranteed. Local responsive checks do not replace physical iOS/Android or cross-browser testing.

## Verification

Build/type checks and manual responsive inspection are recorded in the delivery. No automated test suite was run. No inquiry was submitted or saved, per the owner's instruction; the success animation was inspected in the guarded success branches without triggering them.

Manual checks completed in the available Chromium-based preview browser:

- Desktop layouts at 1280 × 720 and 1440 × 900; narrow phones at 360 × 800 and 390 × 844; tablet at 768 × 1024; landscape phone at 844 × 390. No horizontal overflow was observed on the sampled homepage, listing, comparison and model journeys.
- Selected featured models and changed locations; the gold markers stayed within the resized selector groups, and image/specification updates remained usable.
- Saved and removed a local shortlist model; the spring icon played and the Save button remained 104 px wide in both states. No database inquiry was created.
- Changed mobile catalog filters to General Trias; results updated from six to three model categories, with the filter controls still operable. Compact list view fit the narrow phone layout.
- Opened original floor plans, zoomed to 150%, fitted and closed the viewer. The transition was 180 ms with motion enabled. A cramped landscape footer found during inspection was corrected; the original-image link and footer then fit inside the dialog.
- Advanced Nila's interior gallery to the next photograph; the new photo and a single decorative outgoing image occupied the same frame, with the caption and count updating correctly. Close controls remained usable.
- Observed the fine-pointer spotlight on the desktop homepage. It remained confined to the photo and did not intercept the image click.
- Enabled Reduce motion, navigated to another page and opened a plan. The preference persisted, comparison highlights were disabled, and the plan transition became 0 seconds. Restored ordinary motion afterward.
- No browser console warnings or errors were reported in the collected preview log. Original media files are checked byte-for-byte during packaging.

These were responsive browser checks, not physical-device or Safari/Firefox/Android testing, and no universal frame-rate claim is made.

Technical references: [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), [reduced-motion preference](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), [animation performance](https://web.dev/articles/animations-guide).
