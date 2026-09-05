// ─────────────────────────────────────────────────────────────────────────────
// industries.ts — Central data layer for all industry landing pages
// ─────────────────────────────────────────────────────────────────────────────

export interface CallFlowStep {
  title: string;
  detail: string;
}

export interface WorkflowStep {
  label: string;
  callerQ: string;
  khyraReply: string;
  actions: string[];
}

export interface IndustryMetric {
  value: string;
  label: string;
  sublabel?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ConvoAction {
  label: string;
}

export interface ConvoDemo {
  callerLine: string;
  khyraLine: string;
  actions: ConvoAction[];
}

export interface Industry {
  slug: string;
  name: string;
  shortName: string;
  accentColor: string;
  accentHex: string;
  icon: string;
  heroHeadline: string;
  heroSubhead: string;
  heroBadge: string;
  callFlowSteps: CallFlowStep[];
  painPoints: { title: string; description: string }[];
  capabilities: { title: string; description: string }[];
  workflows: WorkflowStep[];
  convoDemo: ConvoDemo;
  metrics: IndustryMetric[];
  faqs: FaqItem[];
  relatedSlugs: string[];
  liveDemo?: { roleId: string; domainId: string };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Healthcare & Clinics
// ─────────────────────────────────────────────────────────────────────────────
const healthcare: Industry = {
  slug: "healthcare",
  name: "Healthcare & Clinics",
  shortName: "Healthcare",
  accentColor: "142 71% 45%",
  accentHex: "#22c55e",
  icon: "Stethoscope",
  heroHeadline: "Every patient call ends with the next step booked.",
  heroSubhead:
    "Khyra answers patient calls 24×7, books and reschedules appointments, handles routine questions, and escalates emergencies — so your front desk focuses on patients in front of them.",
  heroBadge: "Healthcare & Clinics",
  callFlowSteps: [
    { title: "Patient calls", detail: "Arrives at the clinic, any hour of the day or night" },
    { title: "Need identified", detail: "Booking, query, or emergency understood in under 2s" },
    { title: "Calendar checked", detail: "Live slot availability queried for the right doctor" },
    { title: "Appointment confirmed", detail: "Slot locked, patient details captured" },
    { title: "Records updated", detail: "SMS sent and clinic management system updated" },
  ],
  painPoints: [
    {
      title: "Missed calls = missed revenue",
      description:
        "Patients who can't reach your clinic on the first call often book elsewhere. Khyra answers every call instantly.",
    },
    {
      title: "Receptionists overwhelmed at peak hours",
      description:
        "Morning rush and lunch-hour spikes leave patients on hold. Khyra handles unlimited parallel calls.",
    },
    {
      title: "After-hours inquiries go unanswered",
      description:
        "Patients call evenings and weekends. Without coverage, you lose bookings. Khyra is available 24×7.",
    },
    {
      title: "Repetitive FAQ calls drain staff time",
      description:
        "Timing, directions, procedure prep — Khyra answers these instantly without tying up your team.",
    },
    {
      title: "Rescheduling creates calendar chaos",
      description:
        "Khyra handles reschedules and cancellations in real time, keeping your calendar accurate.",
    },
    {
      title: "No-show reminder calls don't happen",
      description:
        "Khyra automatically calls patients 24 hours before appointments to confirm or reschedule.",
    },
  ],
  capabilities: [
    { title: "Instant call answering", description: "Picks up in under a second, every time — no hold music, no missed calls." },
    { title: "Appointment booking & rescheduling", description: "Checks live calendar availability and confirms slots in real time." },
    { title: "After-hours front desk", description: "Handles patient calls around the clock, even on holidays." },
    { title: "Automated reminder calls", description: "Outbound reminder calls that reduce no-shows by up to 35%." },
    { title: "Emergency escalation", description: "Identifies urgent calls and routes them to on-call staff immediately." },
    { title: "Patient record updates", description: "Logs every interaction to your clinic management system automatically." },
  ],
  workflows: [
    {
      label: "New Patient Call",
      callerQ: "Hi, I'd like to book an appointment with Dr. Mehta for tomorrow.",
      khyraReply: "Of course. Dr. Mehta has slots at 11 AM and 6:30 PM tomorrow. Which works better for you?",
      actions: ["Appointment booked", "Patient record created", "SMS confirmation sent"],
    },
    {
      label: "Reschedule / Cancel",
      callerQ: "I need to move my appointment on Thursday. Can I shift it to Friday?",
      khyraReply: "I've found your booking. Dr. Sharma has availability on Friday at 4 PM. Shall I move it?",
      actions: ["Appointment rescheduled", "Calendar updated", "Confirmation SMS sent"],
    },
    {
      label: "After-Hours Inquiry",
      callerQ: "What time does the clinic open tomorrow? And do you handle walk-ins?",
      khyraReply: "The clinic opens at 9 AM. Walk-ins are welcome before 11 AM. Would you like me to pre-book a slot instead?",
      actions: ["Question answered", "Slot offered", "Call logged"],
    },
  ],
  convoDemo: {
    callerLine: "Can I get an appointment for tomorrow evening?",
    khyraLine: "Dr. Mehta has 6:30 PM available. Should I confirm it?",
    actions: [
      { label: "Appointment booked" },
      { label: "Patient record updated" },
      { label: "SMS sent" },
    ],
  },
  metrics: [
    { value: "35%", label: "Reduction in no-shows", sublabel: "via automated reminder calls" },
    { value: "< 1s", label: "Call answer time", sublabel: "vs 40s average hold time" },
    { value: "3×", label: "More bookings captured", sublabel: "after-hours and peak hours" },
  ],
  faqs: [
    { question: "Can Khyra integrate with our clinic management software?", answer: "Yes. Khyra connects via webhook or API to most clinic management platforms. Our team handles the integration setup." },
    { question: "What happens during a medical emergency call?", answer: "Khyra identifies emergency keywords, collects basic information, and immediately routes the call to your on-call staff. It does not attempt to provide medical advice." },
    { question: "Is patient data stored securely?", answer: "All data is encrypted at rest and in transit, stored on Indian cloud infrastructure. Khyra follows strict data minimisation principles." },
    { question: "Can it handle multiple doctors' schedules?", answer: "Yes. Khyra can manage separate calendars for each doctor and route callers to the correct schedule." },
    { question: "How long does setup take?", answer: "Most clinics go live within 24–48 hours. Our team configures telephony, calendar integration, and clinic-specific knowledge for you." },
  ],
  relatedSlugs: ["dental", "veterinary", "cosmetic-clinics"],
  liveDemo: { roleId: "front_desk", domainId: "general_clinic" },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Real Estate
// ─────────────────────────────────────────────────────────────────────────────
const realEstate: Industry = {
  slug: "real-estate",
  name: "Real Estate",
  shortName: "Real Estate",
  accentColor: "221 83% 40%",
  accentHex: "#1d4ed8",
  icon: "Building2",
  heroHeadline: "Never lose a property lead to a missed call.",
  heroSubhead:
    "Khyra answers buyer and seller inquiries 24×7, qualifies leads, answers property questions, and books site visits — before your competitors even call back.",
  heroBadge: "Real Estate",
  callFlowSteps: [
    { title: "Enquiry arrives", detail: "Buyer or seller calls about a listing" },
    { title: "Lead qualified", detail: "Budget, location, and timeline captured" },
    { title: "Property answered", detail: "Availability, pricing, and details provided" },
    { title: "Visit scheduled", detail: "Site visit booked against agent calendar" },
    { title: "Agent notified", detail: "Lead summary and contact sent in real time" },
  ],
  painPoints: [
    { title: "Leads go cold within minutes", description: "Buyers who enquire and don't hear back quickly move on. Khyra responds instantly to every enquiry." },
    { title: "Agents can't cover all inbound at once", description: "During project launches, call volume spikes. Khyra handles unlimited simultaneous inquiries." },
    { title: "Weekend and evening calls missed", description: "Most property inquiries come outside office hours. Khyra is always available." },
    { title: "Lead qualification is inconsistent", description: "Khyra consistently asks the right qualification questions — budget, location, timeline — every time." },
    { title: "Site visit scheduling is a back-and-forth", description: "Khyra checks agent availability and books the visit on the spot, eliminating the follow-up chain." },
    { title: "Follow-up calls never happen", description: "Khyra automatically follows up with leads who enquired but didn't convert, keeping deals alive." },
  ],
  capabilities: [
    { title: "Instant inquiry response", description: "Answers every call within a second — no lead waits, no lead is lost." },
    { title: "Lead qualification", description: "Captures budget, location preference, timeline, and requirements automatically." },
    { title: "Site visit booking", description: "Checks agent availability and books site visits in real time." },
    { title: "Property FAQ answering", description: "Answers questions on price, availability, amenities, and possession date." },
    { title: "Automated lead follow-up", description: "Outbound calls to warm leads who haven't yet converted." },
    { title: "Agent notification", description: "Notifies the right agent immediately after a lead is qualified." },
  ],
  workflows: [
    {
      label: "Property Inquiry",
      callerQ: "Is the 3BHK in Whitefield still available? What's the price?",
      khyraReply: "Yes, it's available at ₹1.45 crore. It's a 1,450 sq ft unit with covered parking. Would you like to schedule a site visit?",
      actions: ["Property details provided", "Lead qualified", "Agent notified"],
    },
    {
      label: "Site Visit Booking",
      callerQ: "Can I visit the project this Saturday morning?",
      khyraReply: "Saturday 11 AM works. I've booked a visit for you with our site team. You'll receive a confirmation on WhatsApp.",
      actions: ["Site visit booked", "WhatsApp confirmation sent", "Calendar updated"],
    },
    {
      label: "Lead Follow-Up",
      callerQ: "(Khyra calls) Hi, this is Khyra from [Project]. You enquired about our 2BHK units last week.",
      khyraReply: "We have a limited availability update on the unit you were interested in. Would you like to schedule a visit this week?",
      actions: ["Lead re-engaged", "Follow-up logged", "Meeting booked"],
    },
  ],
  convoDemo: {
    callerLine: "Is the 3BHK in Whitefield still available?",
    khyraLine: "Yes, available at ₹1.45 crore. Want me to schedule a site visit?",
    actions: [
      { label: "Lead qualified" },
      { label: "Site visit booked" },
      { label: "Agent notified" },
    ],
  },
  metrics: [
    { value: "< 2min", label: "Lead response time", sublabel: "vs industry avg of 47 minutes" },
    { value: "2.5×", label: "More site visits booked", sublabel: "with instant AI qualification" },
    { value: "60%", label: "Of enquiries after hours", sublabel: "now captured automatically" },
  ],
  faqs: [
    { question: "Can Khyra answer questions about specific projects and inventory?", answer: "Yes. We configure Khyra with your current project details, pricing, availability, and FAQs. It answers accurately based on that data." },
    { question: "How does lead qualification work?", answer: "Khyra asks structured qualification questions — budget range, location preference, BHK requirement, timeline — and logs the responses for your sales team." },
    { question: "Can it book site visits with specific agents?", answer: "Yes. Khyra can route bookings to the right agent based on project, language, or availability." },
    { question: "What if the caller wants to negotiate pricing?", answer: "Khyra provides the listed price and routes pricing conversations to the appropriate agent for follow-up." },
    { question: "Does it work for rental property inquiries too?", answer: "Yes. Khyra can be configured for rental listings, commercial property, and land inquiries." },
  ],
  relatedSlugs: ["education", "cosmetic-clinics", "hotels-hospitality"],
  liveDemo: { roleId: "lead_followup", domainId: "real_estate" },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Salons & Wellness
// ─────────────────────────────────────────────────────────────────────────────
const salonsWellness: Industry = {
  slug: "salons-wellness",
  name: "Salons & Wellness",
  shortName: "Salons",
  accentColor: "336 80% 55%",
  accentHex: "#ec4899",
  icon: "Sparkles",
  heroHeadline: "Fill more appointment slots without adding another receptionist.",
  heroSubhead:
    "Khyra answers every call, books appointments, handles pricing questions, and reschedules automatically — so your stylists focus on clients, not phones.",
  heroBadge: "Salons & Wellness",
  callFlowSteps: [
    { title: "Client calls", detail: "During a service, after hours, or at peak volume" },
    { title: "Preference noted", detail: "Treatment and stylist preference identified" },
    { title: "Calendar checked", detail: "Live availability queried across all stylists" },
    { title: "Booking confirmed", detail: "Slot locked, SMS confirmation queued" },
    { title: "Reminder set", detail: "Automated reminder scheduled for the appointment" },
  ],
  painPoints: [
    { title: "Phone rings interrupt ongoing services", description: "Your team can't answer calls while cutting hair or during treatments. Khyra covers every call." },
    { title: "Empty slots from last-minute cancellations", description: "Khyra handles reschedules in real time and can offer vacant slots to waiting clients." },
    { title: "Pricing and service questions eat up time", description: "Khyra instantly answers 'What does a keratin treatment cost?' so your team doesn't have to." },
    { title: "Missed calls become missed bookings", description: "Khyra automatically calls back missed calls and converts them into appointments." },
    { title: "No-show rates drain revenue", description: "Automated reminder calls reduce no-shows and keep your schedule profitable." },
    { title: "Walk-in vs. appointment chaos", description: "Khyra communicates your current availability and sets expectations before clients arrive." },
  ],
  capabilities: [
    { title: "Instant call answering", description: "Every call answered — even while your team is mid-service." },
    { title: "Real-time booking", description: "Checks live availability across all stylists and books on the spot." },
    { title: "Service & pricing FAQs", description: "Instantly answers questions on treatments, duration, and pricing." },
    { title: "Missed call callback", description: "Automatically calls back missed calls and converts them to bookings." },
    { title: "Reminder calls", description: "Automated reminders that cut no-shows by up to 40%." },
    { title: "Stylist preference routing", description: "Remembers preferred stylists and routes bookings accordingly." },
  ],
  workflows: [
    {
      label: "New Booking",
      callerQ: "Hi, can I book a haircut and blow-dry for Saturday afternoon?",
      khyraReply: "Saturday 3 PM is available with Priya. Shall I confirm that for you?",
      actions: ["Appointment booked", "SMS confirmation sent", "Calendar updated"],
    },
    {
      label: "Pricing Query → Booking",
      callerQ: "How much does a keratin treatment cost, and how long does it take?",
      khyraReply: "A keratin treatment is ₹3,500 and takes about 2.5 hours. Would you like to book a slot?",
      actions: ["Pricing explained", "Booking offered", "Appointment created"],
    },
    {
      label: "Reschedule",
      callerQ: "I need to shift my 11 AM appointment on Sunday. Can I come in at 3 PM instead?",
      khyraReply: "3 PM on Sunday is available. I've moved your booking. You'll get a confirmation SMS.",
      actions: ["Appointment rescheduled", "Calendar updated", "SMS sent"],
    },
  ],
  convoDemo: {
    callerLine: "Can I book a haircut for Saturday afternoon?",
    khyraLine: "Saturday 3 PM is free with Priya. Confirm the booking?",
    actions: [
      { label: "Booking confirmed" },
      { label: "SMS sent" },
      { label: "Calendar updated" },
    ],
  },
  metrics: [
    { value: "40%", label: "Fewer no-shows", sublabel: "with automated reminders" },
    { value: "3×", label: "More bookings captured", sublabel: "from missed calls and after-hours" },
    { value: "0", label: "Calls dropped", sublabel: "even during peak hours" },
  ],
  faqs: [
    { question: "Can Khyra book appointments for multiple stylists?", answer: "Yes. Khyra manages separate schedules for each stylist and routes bookings based on availability and client preference." },
    { question: "What if the client wants a specific stylist who's unavailable?", answer: "Khyra checks that stylist's next available slot and offers it, or asks if the client would like to book with another available stylist." },
    { question: "Can it handle group bookings (e.g., bridal party)?", answer: "Yes. Khyra can handle multi-service, multi-person bookings and flag them for manual confirmation if needed." },
    { question: "Does it work with our booking software?", answer: "Khyra integrates via API or webhook with most booking platforms. Our team handles the setup." },
    { question: "How does the missed call callback work?", answer: "When Khyra detects a missed call, it automatically calls back within a few minutes, answers the client's question, and books an appointment." },
  ],
  relatedSlugs: ["healthcare", "cosmetic-clinics", "hotels-hospitality"],
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Hotels & Hospitality
// ─────────────────────────────────────────────────────────────────────────────
const hotelsHospitality: Industry = {
  slug: "hotels-hospitality",
  name: "Hotels & Hospitality",
  shortName: "Hospitality",
  accentColor: "38 92% 50%",
  accentHex: "#f59e0b",
  icon: "Hotel",
  heroHeadline: "Your hotel should answer before the guest hangs up.",
  heroSubhead:
    "Khyra runs your hotel's front desk around the clock — handling reservation inquiries, room questions, and guest requests instantly, in any language.",
  heroBadge: "Hotels & Hospitality",
  callFlowSteps: [
    { title: "Guest calls", detail: "Reservation inquiry or in-stay request received" },
    { title: "Requirement captured", detail: "Room type, dates, and preferences noted" },
    { title: "Inventory checked", detail: "Live room availability queried in real time" },
    { title: "Reservation made", detail: "Room booked and confirmation triggered" },
    { title: "Upsell offered", detail: "Relevant upgrade or package mentioned at the right moment" },
  ],
  painPoints: [
    { title: "Front desk can't handle peak call volume", description: "Check-in time creates a call surge. Khyra manages unlimited simultaneous calls without any wait." },
    { title: "After-hours reservation inquiries lost", description: "Guests booking late at night get no answer. Khyra handles reservations 24×7." },
    { title: "Repetitive room and amenity questions", description: "Check-in time, checkout, pool hours, parking — Khyra answers instantly without tying up staff." },
    { title: "Language barriers with guests", description: "Khyra communicates fluently in 11 Indian languages, ensuring every guest feels understood." },
    { title: "Missed upsell opportunities", description: "Khyra proactively mentions room upgrades, packages, and F&B offers during reservation calls." },
    { title: "In-room service requests delayed", description: "Khyra logs in-room requests instantly and routes them to the relevant department." },
  ],
  capabilities: [
    { title: "24×7 reservation handling", description: "Takes and confirms room bookings at any hour — no missed reservation." },
    { title: "Room availability & pricing", description: "Answers availability questions and quotes current rates in real time." },
    { title: "Amenity & policy FAQs", description: "Handles questions on check-in/out, parking, pool, gym, and restaurant timings." },
    { title: "Multilingual guest support", description: "11 Indian languages so every guest is served in their preferred language." },
    { title: "In-room service routing", description: "Logs housekeeping, F&B, and maintenance requests and routes them instantly." },
    { title: "Upsell prompting", description: "Mentions relevant upgrades and packages during reservation and inquiry calls." },
  ],
  workflows: [
    {
      label: "Reservation Inquiry",
      callerQ: "Do you have a room available for this Saturday night?",
      khyraReply: "Yes, we have a Deluxe King available at ₹4,500 per night including breakfast. Would you like me to reserve it?",
      actions: ["Availability confirmed", "Reservation created", "Confirmation email sent"],
    },
    {
      label: "Guest FAQ",
      callerQ: "What time is check-in and is there a swimming pool?",
      khyraReply: "Check-in is from 2 PM and checkout by 11 AM. Yes, our rooftop pool is open 7 AM to 9 PM.",
      actions: ["Policy answered", "Amenity confirmed", "Call logged"],
    },
    {
      label: "In-Room Service",
      callerQ: "This is room 204. Can we get extra towels and a menu for dinner?",
      khyraReply: "Of course. I've sent a towel request to housekeeping and the restaurant menu is on its way to your room.",
      actions: ["Housekeeping notified", "F&B request logged", "Guest record updated"],
    },
  ],
  convoDemo: {
    callerLine: "Do you have a room for Saturday night?",
    khyraLine: "Yes — Deluxe King at ₹4,500 incl. breakfast. Reserve it?",
    actions: [
      { label: "Reservation created" },
      { label: "Confirmation sent" },
      { label: "Upsell offered" },
    ],
  },
  metrics: [
    { value: "100%", label: "Calls answered", sublabel: "including after-hours and peak" },
    { value: "2×", label: "Reservations captured", sublabel: "vs unassisted front desk" },
    { value: "11", label: "Languages", sublabel: "for every guest" },
  ],
  faqs: [
    { question: "Can Khyra handle reservations for multiple room types?", answer: "Yes. Khyra is configured with your room inventory, types, pricing, and availability and can handle all of them." },
    { question: "Can it integrate with our PMS?", answer: "Yes, via webhook or API integration. Our team connects Khyra to your existing property management system as part of setup." },
    { question: "What if a guest has a complaint?", answer: "Khyra acknowledges the complaint, logs it, and escalates to the relevant department or duty manager immediately." },
    { question: "Does it support multi-property hotel groups?", answer: "Yes. Khyra can be deployed across multiple properties with separate configurations for each." },
    { question: "Can it offer room upgrades or packages?", answer: "Yes. Khyra is configured with your upsell offers and proactively mentions them at appropriate points in the conversation." },
  ],
  relatedSlugs: ["salons-wellness", "real-estate", "healthcare"],
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Veterinary
// ─────────────────────────────────────────────────────────────────────────────
const veterinary: Industry = {
  slug: "veterinary",
  name: "Veterinary Clinics",
  shortName: "Veterinary",
  accentColor: "173 80% 36%",
  accentHex: "#0f9b8e",
  icon: "PawPrint",
  heroHeadline: "A 24×7 front desk for your veterinary clinic.",
  heroSubhead:
    "Khyra answers pet owner calls, books appointments, handles vaccination reminders, and routes urgent cases — so your vet team stays focused on patients.",
  heroBadge: "Veterinary",
  callFlowSteps: [
    { title: "Owner calls", detail: "About a pet's health, appointment, or vaccination" },
    { title: "Urgency assessed", detail: "Emergency vs. routine identified instantly" },
    { title: "Vet matched", detail: "Right doctor selected by species and case type" },
    { title: "Appointment booked", detail: "Slot confirmed with the owner" },
    { title: "Records updated", detail: "Pet history and appointment logged in the system" },
  ],
  painPoints: [
    { title: "Emergency calls need instant routing", description: "Khyra identifies urgent keywords and immediately routes emergencies to the on-call vet — no delays." },
    { title: "After-hours pet owners panicking", description: "Pets don't get sick on schedule. Khyra provides 24×7 coverage and routes genuine emergencies." },
    { title: "Repetitive vaccination and deworming questions", description: "Khyra handles standard vaccination schedules and procedure queries without staff involvement." },
    { title: "Missed appointment reminders", description: "Automated outbound reminder calls for vaccination due dates and follow-up visits." },
    { title: "Multi-pet household bookings", description: "Khyra handles complex bookings for multiple pets in a single call, routing to the right vet." },
    { title: "Front desk overloaded during morning rush", description: "Khyra handles unlimited parallel calls, ensuring no pet owner waits during peak hours." },
  ],
  capabilities: [
    { title: "Emergency call routing", description: "Detects urgent situations and routes to on-call staff immediately." },
    { title: "Pet appointment booking", description: "Books appointments based on species, condition, and vet availability." },
    { title: "Vaccination reminders", description: "Outbound reminder calls for due vaccinations and deworming." },
    { title: "Procedure FAQs", description: "Answers standard questions on procedures, fasting, and post-care." },
    { title: "After-hours triage guidance", description: "Guides callers through basic triage and routes genuine emergencies." },
    { title: "Multi-vet scheduling", description: "Routes bookings to the correct vet based on species or specialisation." },
  ],
  workflows: [
    {
      label: "Pet Appointment",
      callerQ: "My dog hasn't been eating and seems lethargic. I need an appointment.",
      khyraReply: "I understand. Dr. Rao is available today at 3 PM and 5:30 PM. Which works for you?",
      actions: ["Appointment booked", "Symptom noted", "SMS confirmation sent"],
    },
    {
      label: "Vaccination Reminder",
      callerQ: "(Khyra outbound) Hi, this is Khyra from [Clinic]. Bruno's rabies vaccination is due this week.",
      khyraReply: "Would you like to book an appointment this week? Dr. Rao has slots on Thursday and Friday.",
      actions: ["Owner informed", "Appointment offered", "Booking created"],
    },
    {
      label: "Emergency Routing",
      callerQ: "My cat is bleeding and not moving. What do I do?",
      khyraReply: "This sounds urgent. I'm connecting you to our on-call vet right now. Please hold.",
      actions: ["Emergency detected", "On-call vet notified", "Call transferred"],
    },
  ],
  convoDemo: {
    callerLine: "My dog is lethargic. I need a vet today.",
    khyraLine: "Dr. Rao has 3 PM available. Book that slot?",
    actions: [
      { label: "Appointment booked" },
      { label: "Symptom flagged" },
      { label: "SMS sent" },
    ],
  },
  metrics: [
    { value: "24×7", label: "Emergency call coverage", sublabel: "no missed urgent calls" },
    { value: "45%", label: "Fewer no-shows", sublabel: "with automated reminders" },
    { value: "< 1s", label: "Answer time", sublabel: "for every call" },
  ],
  faqs: [
    { question: "Can Khyra identify veterinary emergencies?", answer: "Khyra is trained to identify emergency keywords and phrases and immediately routes those calls to on-call staff. It does not provide medical diagnosis or advice." },
    { question: "Can it handle bookings for different species?", answer: "Yes. Khyra can route bookings based on the type of pet and the relevant vet's expertise." },
    { question: "Can it send vaccination reminders automatically?", answer: "Yes. Khyra integrates with your patient records and makes outbound reminder calls when vaccinations are due." },
    { question: "What if the owner doesn't speak English?", answer: "Khyra supports 11 Indian languages and automatically detects and responds in the caller's preferred language." },
    { question: "Does it work after clinic hours?", answer: "Yes. Khyra is available 24×7. After hours, it handles routine inquiries and routes genuine emergencies to on-call staff." },
  ],
  relatedSlugs: ["healthcare", "dental", "cosmetic-clinics"],
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Education
// ─────────────────────────────────────────────────────────────────────────────
const education: Industry = {
  slug: "education",
  name: "Education",
  shortName: "Education",
  accentColor: "239 84% 58%",
  accentHex: "#4f46e5",
  icon: "GraduationCap",
  heroHeadline: "Turn every education inquiry into the next conversation.",
  heroSubhead:
    "Khyra answers course questions, qualifies prospective students, schedules counselling calls, and follows up automatically — so your admissions team converts more leads with less effort.",
  heroBadge: "Education",
  callFlowSteps: [
    { title: "Student calls", detail: "Course inquiry received at any hour" },
    { title: "Interest captured", detail: "Course, eligibility, and timeline noted" },
    { title: "Questions answered", detail: "Fees, duration, and admission details provided" },
    { title: "Counsellor booked", detail: "Callback or meeting scheduled" },
    { title: "Lead logged", detail: "Student details stored, follow-up queued automatically" },
  ],
  painPoints: [
    { title: "Admission inquiries go unanswered", description: "Prospective students who can't get through often choose a competitor. Khyra answers every call." },
    { title: "Counsellors can't handle peak inquiry volume", description: "Admission season creates call surges. Khyra qualifies and filters, so counsellors talk to serious students." },
    { title: "Evening and weekend inquiries missed", description: "Students call after office hours. Khyra provides 24×7 coverage and captures those leads." },
    { title: "Inconsistent counsellor qualification", description: "Khyra asks the same structured qualification questions every time — eligibility, course interest, location, timeline." },
    { title: "Follow-up on cold leads doesn't happen", description: "Khyra automatically follows up with students who enquired but didn't take the next step." },
    { title: "Repetitive FAQ calls drain staff time", description: "Fee structure, eligibility, batch timings — Khyra answers these instantly." },
  ],
  capabilities: [
    { title: "24×7 inquiry handling", description: "Answers course inquiries at any hour — never miss an admission lead." },
    { title: "Student lead qualification", description: "Captures eligibility, preferred course, location, and timeline." },
    { title: "Counselling call scheduling", description: "Books counsellor callbacks at a time that suits the prospective student." },
    { title: "Course & fee FAQs", description: "Answers questions on fees, duration, eligibility, and batch schedules." },
    { title: "Automated lead follow-up", description: "Outbound calls to prospective students who enquired but didn't convert." },
    { title: "Application status updates", description: "Provides real-time application status to enrolled or prospective students." },
  ],
  workflows: [
    {
      label: "Course Inquiry",
      callerQ: "What is the fee for the MBA programme and what are the eligibility requirements?",
      khyraReply: "The MBA is ₹4.5 lakhs over 2 years. You need a bachelor's degree with 50% aggregate. Want me to schedule a counselling call?",
      actions: ["Course details provided", "Lead captured", "Counsellor notified"],
    },
    {
      label: "Counselling Booking",
      callerQ: "Can I speak to an admission counsellor? I'm not sure which course is right for me.",
      khyraReply: "Of course. Our counsellor Priya is available tomorrow at 11 AM or 4 PM. Which works for you?",
      actions: ["Counsellor booked", "Student details logged", "Reminder set"],
    },
    {
      label: "Lead Follow-Up",
      callerQ: "(Khyra outbound) Hi, you enquired about our Data Science programme last week.",
      khyraReply: "We've just announced early admission discounts for the upcoming batch. Would you like to speak to a counsellor today?",
      actions: ["Lead re-engaged", "Offer communicated", "Meeting scheduled"],
    },
  ],
  convoDemo: {
    callerLine: "What's the fee for the MBA programme?",
    khyraLine: "₹4.5 lakhs over 2 years. Want to book a counselling call?",
    actions: [
      { label: "Details provided" },
      { label: "Counsellor booked" },
      { label: "Lead captured" },
    ],
  },
  metrics: [
    { value: "3×", label: "More counselling calls booked", sublabel: "vs manual follow-up" },
    { value: "65%", label: "Inquiries after office hours", sublabel: "now captured automatically" },
    { value: "< 1s", label: "Response to every inquiry", sublabel: "no student left waiting" },
  ],
  faqs: [
    { question: "Can Khyra handle inquiries for multiple courses?", answer: "Yes. Khyra is configured with details for all your programmes and routes inquiries to the relevant information." },
    { question: "Can it qualify leads before routing to counsellors?", answer: "Yes. Khyra asks structured qualification questions and only routes serious, qualified leads to your counselling team." },
    { question: "Does it work for coaching institutes and EdTech platforms?", answer: "Yes. Khyra is effective for universities, colleges, coaching institutes, EdTech companies, and study-abroad consultancies." },
    { question: "Can it follow up with students who didn't respond?", answer: "Yes. Khyra makes automated outbound follow-up calls to prospective students who enquired but didn't take the next step." },
    { question: "Can it handle regional language inquiries?", answer: "Yes. Khyra supports 11 Indian languages and automatically responds in the caller's preferred language." },
  ],
  relatedSlugs: ["real-estate", "healthcare", "cosmetic-clinics"],
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Cosmetic Clinics
// ─────────────────────────────────────────────────────────────────────────────
const cosmeticClinics: Industry = {
  slug: "cosmetic-clinics",
  name: "Cosmetic Clinics",
  shortName: "Cosmetic",
  accentColor: "270 80% 60%",
  accentHex: "#9333ea",
  icon: "Sparkles",
  heroHeadline: "Turn every consultation inquiry into a booked appointment.",
  heroSubhead:
    "Khyra answers treatment questions, handles pricing inquiries, and books consultation appointments — converting curious callers into confirmed clients.",
  heroBadge: "Cosmetic Clinics",
  callFlowSteps: [
    { title: "Prospect calls", detail: "Inquiry about a cosmetic treatment" },
    { title: "Interest identified", detail: "Treatment interest and concerns noted" },
    { title: "Questions answered", detail: "Procedure, recovery, and pricing provided" },
    { title: "Consultation booked", detail: "Slot confirmed with the right doctor" },
    { title: "Follow-up queued", detail: "Automated outbound call if not converted" },
  ],
  painPoints: [
    { title: "Prospective clients need reassurance before booking", description: "Khyra answers treatment questions with confidence and professionalism, building trust before the consultation." },
    { title: "Pricing calls don't convert without a follow-up", description: "Khyra offers a consultation at the right moment in the conversation, turning interest into a booked appointment." },
    { title: "Reception too busy to take inquiry calls", description: "During treatment hours, your team can't answer every inquiry. Khyra covers every call." },
    { title: "Leads who enquired don't get followed up", description: "Khyra automatically follows up with prospective clients who enquired but didn't book." },
    { title: "After-hours inquiries go to voicemail", description: "Many prospective clients call evenings. Khyra handles these calls and books consultations." },
    { title: "No-show consultation slots wasted", description: "Automated reminder calls ensure clients show up for their consultations." },
  ],
  capabilities: [
    { title: "Treatment & pricing FAQs", description: "Answers questions on procedures, recovery time, and pricing professionally." },
    { title: "Consultation booking", description: "Converts every interested caller into a booked consultation slot." },
    { title: "Lead follow-up", description: "Outbound calls to prospective clients who enquired but didn't book." },
    { title: "After-hours inquiry handling", description: "Captures evening and weekend inquiries when your clinic is closed." },
    { title: "Reminder calls", description: "Reduces consultation no-shows with automated appointment reminders." },
    { title: "Sensitive inquiry handling", description: "Trained to handle personal and sensitive cosmetic inquiries with discretion." },
  ],
  workflows: [
    {
      label: "Treatment Inquiry",
      callerQ: "I'm interested in a rhinoplasty consultation. How much does it cost and who is the doctor?",
      khyraReply: "Our rhinoplasty consultations are ₹1,500 and are with Dr. Sharma, our senior plastic surgeon. Would you like to book a slot?",
      actions: ["Inquiry answered", "Consultation offered", "Appointment booked"],
    },
    {
      label: "Pricing & Availability",
      callerQ: "How much is lip filler and do you have slots this week?",
      khyraReply: "Lip filler starts at ₹18,000 for 1ml. We have slots Thursday at 3 PM and Friday at 11 AM. Shall I book one?",
      actions: ["Pricing provided", "Availability confirmed", "Slot booked"],
    },
    {
      label: "Lead Follow-Up",
      callerQ: "(Khyra outbound) Hi, you enquired about our Botox treatments last week.",
      khyraReply: "We have a limited-time offer this month. Would you like to book a free consultation with Dr. Sharma?",
      actions: ["Lead re-engaged", "Offer communicated", "Consultation booked"],
    },
  ],
  convoDemo: {
    callerLine: "I'm interested in lip filler. How much is it?",
    khyraLine: "Starts at ₹18,000. We have Thursday 3 PM free — shall I book it?",
    actions: [
      { label: "Pricing provided" },
      { label: "Consultation booked" },
      { label: "SMS sent" },
    ],
  },
  metrics: [
    { value: "2×", label: "Consultation conversion rate", sublabel: "from inquiry to booking" },
    { value: "40%", label: "Fewer no-shows", sublabel: "with automated reminders" },
    { value: "< 1s", label: "Inquiry response time", sublabel: "every call, every hour" },
  ],
  faqs: [
    { question: "Can Khyra handle sensitive cosmetic inquiries discreetly?", answer: "Yes. Khyra is specifically trained to handle sensitive cosmetic and aesthetic inquiries with professionalism and privacy." },
    { question: "Can it answer detailed questions about specific treatments?", answer: "Yes. Khyra is configured with your procedure details, recovery information, and pricing and answers accurately." },
    { question: "Can it mention ongoing offers or seasonal promotions?", answer: "Yes. Khyra can be updated with current promotions and will mention them at appropriate points in the conversation." },
    { question: "What if a client has medical questions about a procedure?", answer: "Khyra answers general procedural questions and routes clinical or medical questions to the doctor for a consultation." },
    { question: "Does it support multiple doctors at the same clinic?", answer: "Yes. Khyra manages separate schedules for each doctor and routes bookings accordingly." },
  ],
  relatedSlugs: ["healthcare", "salons-wellness", "cosmetic-clinics"],
};

// ─────────────────────────────────────────────────────────────────────────────
// Master registry (7 verticals)
// ─────────────────────────────────────────────────────────────────────────────
export const INDUSTRIES: Industry[] = [
  healthcare, realEstate, salonsWellness, hotelsHospitality,
  veterinary, education, cosmeticClinics,
];

export const INDUSTRY_MAP: Record<string, Industry> = Object.fromEntries(
  INDUSTRIES.map((ind) => [ind.slug, ind]),
);

// Hero rotation scenarios for homepage auto-rotate
export const HERO_INDUSTRY_ROTATIONS = [
  {
    industry: "Healthcare",
    badge: "Clinic · Front Desk",
    callerLine: "Can I book an appointment with Dr. Mehta for tomorrow?",
    khyraLine: "Dr. Mehta has 6:30 PM tomorrow. Shall I confirm?",
    actions: ["Appointment booked", "Patient record updated", "SMS sent"],
    accentHex: "#22c55e",
  },
  {
    industry: "Real Estate",
    badge: "Real Estate · Lead Qualification",
    callerLine: "Is the 3BHK in Whitefield still available?",
    khyraLine: "Yes — ₹1.45 crore, 1,450 sq ft. Want to schedule a site visit?",
    actions: ["Lead qualified", "Site visit booked", "Agent notified"],
    accentHex: "#1d4ed8",
  },
  {
    industry: "Salon",
    badge: "Salon & Wellness · Booking",
    callerLine: "Can I get a haircut and blow-dry on Saturday?",
    khyraLine: "Saturday 3 PM is available with Priya. Confirm?",
    actions: ["Booking confirmed", "SMS sent", "Calendar updated"],
    accentHex: "#ec4899",
  },
] as const;
