import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

// Run the actual shared browser/server validator without a second test framework.
const source = readFileSync(new URL("../app/inquiry-validation.ts", import.meta.url), "utf8");
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const module = { exports: {} };
vm.runInNewContext(code, { module, exports: module.exports, require: createRequire(import.meta.url) });
const { normalizeInquiryPhone, parseInquiryContact, validateInquiryIdentity } = module.exports;
let checks = 0;
function check(condition, message) { assert.ok(condition, message); checks++; }

for (const input of ["09123456789", "0912 345 6789", "(0912) 345-6789", "+63 912 345 6789", "+63 (912) 345-6789", "639123456789", "00639123456789", "9123456789", "+63 (0) 912 345 6789", "0912–345–6789", " 0912.345.6789 "]) {
  check(normalizeInquiryPhone(input) === "+639123456789", `Accept and consistently normalize ${input}`);
}
for (const input of ["", "09", "0912345678", "091234567890", "+63912345678", "+63091234567890", "0912abc56789", "+63++9123456789", "1234567", "01234567890", "+00000000", "9123456789 or 9999999999"]) {
  check(normalizeInquiryPhone(input) === null, `Reject invalid phone ${input}`);
}
check(normalizeInquiryPhone("+1 (202) 555-0123") === "+12025550123", "Support an overseas client's international number");
check(parseInquiryContact("  Buyer+home@Example.com ")?.email === "buyer+home@example.com", "Trim and normalize a valid email without rejecting plus addressing");
check(parseInquiryContact("0912 345 6789")?.email === "", "Phone-only contact does not manufacture an email");
check(parseInquiryContact("buyer@example.com")?.phone === "", "Email-only contact does not manufacture a phone");
for (const input of ["buyer@", "buyer example.com", "buyer@example", "buyer @example.com", "a@b.com;c@d.com"]) check(parseInquiryContact(input) === null, `Reject malformed contact ${input}`);

const minimum = { name: "Maria Dela Cruz", contact: "buyer@example.com", service: "Buying a Property", consent: true };
check(Object.keys(validateInquiryIdentity(minimum)).length === 0, "Three main fields plus consent pass with no optional data");
check(Object.keys(validateInquiryIdentity({ ...minimum, contact: "09123456789" })).length === 0, "Phone-only inquiry passes");
check(Object.keys(validateInquiryIdentity({ ...minimum, name: "José O'Neill-Santos" })).length === 0, "Names allow accents, apostrophes and hyphens");
for (const [field, value] of [["name", "   "], ["contact", ""], ["service", ""], ["consent", false]]) {
  check(Boolean(validateInquiryIdentity({ ...minimum, [field]: value })[field]), `Explain missing ${field}`);
}
check(Boolean(validateInquiryIdentity({ ...minimum, name: "A" }).name), "Reject an incomplete one-character name");
check(Boolean(validateInquiryIdentity({ ...minimum, name: "A".repeat(121) }).name), "Reject oversized names");
check(Object.keys(validateInquiryIdentity({ ...minimum, name: "A".repeat(120) })).length === 0, "Accept the supported name length boundary");
console.log(`Inquiry validation: ${checks} checks passed.`);
