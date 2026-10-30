export const inquiryStages = [
  ["new", "New"],
  ["contacted", "Contacted"],
  ["qualified", "Qualified"],
  ["viewing_requested", "Viewing requested"],
  ["viewing_confirmed", "Viewing confirmed"],
  ["follow_up", "Follow-up"],
  ["closed", "Closed"],
] as const;
export const applicationStages = [
  ["new", "New"],
  ["contacted", "Contacted"],
  ["conversation_scheduled", "Conversation scheduled"],
  ["follow_up", "Follow-up"],
  ["onboarding", "Onboarding"],
  ["closed", "Closed"],
] as const;
export const allStages = [
  ...inquiryStages,
  ...applicationStages.filter(
    ([id]) => !inquiryStages.some(([value]) => (value as string) === id),
  ),
];

export function manilaDateTime(value: string): string {
  return new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
export function followUpInput(value?: string | null): string {
  if (!value) return "";
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(value));
  const part = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}T${part("hour")}:${part("minute")}`;
}
