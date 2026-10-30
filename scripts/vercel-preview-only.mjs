// Vercel's ignore command uses exit 0 to skip and exit 1 to build.
// Keep this project in preview mode until the owner explicitly chooses production.
if (process.env.VERCEL_ENV === "production") {
  console.log("Production build skipped: this Vercel project is for preview only.");
  process.exit(0);
}
process.exit(1);
