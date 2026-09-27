import { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Clock,
  LayoutDashboard,
  Users,
  CalendarCheck2,
  Workflow,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { BookDemoButton } from "@/components/landing/ui/BookDemoButton";
import type { Industry } from "@/data/industries";

import dashboardImg from "@/assets/1. dashboard.png";
import timeSlotsImg from "@/assets/2. time slots.png";
import appointmentsImg from "@/assets/3. Appointment .png";
import customersImg from "@/assets/4. users.png";

interface ShowcaseStage {
  id: string;
  tabLabel: string;
  badge: string;
  workflowStage: string;
  title: string;
  subtitle: string;
  copy: string;
  primaryImage: string;
  primaryAlt: string;
  secondaryImage: string;
  secondaryAlt: string;
  secondaryLabel: string;
  secondaryTitle: string;
  features: string[];
}

interface IndustryShowcaseConfig {
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  description: string;
  stages: ShowcaseStage[];
}

const INDUSTRY_CONFIGS: Record<string, IndustryShowcaseConfig> = {
  healthcare: {
    eyebrow: "Operational Platform Evidence",
    headlinePrefix: "The operational system behind ",
    headlineHighlight: "healthcare & clinic workflows.",
    description:
      "Khyra provides a single operational workspace to keep patient context, appointment scheduling, and front-desk actions unified across your clinic operations.",
    stages: [
      {
        id: "customer-workspace",
        tabLabel: "Patient Workspace",
        badge: "Customer Context",
        workflowStage: "Unified Directory Sync",
        title: "Operational context, in one place",
        subtitle: "Unified Patient Context & Record Verification",
        copy: "Khyra keeps customer activity, schedules, requests and workflow status connected so teams can see what happened and what needs to happen next.",
        primaryImage: customersImg,
        primaryAlt: "Khyra Operations customer workspace showing unified contact directory",
        secondaryImage: timeSlotsImg,
        secondaryAlt: "Khyra scheduling capacity workspace",
        secondaryLabel: "Next View",
        secondaryTitle: "Provider Availability",
        features: [
          "Instant caller directory match by phone number before confirming any booking",
          "Continuous activity timeline linking previous visits, requests, and provider notes",
          "Eliminates duplicate profiles and siloed records across clinic front desks",
        ],
      },
      {
        id: "scheduling",
        tabLabel: "Capacity Coordination",
        badge: "Capacity & Coordination",
        workflowStage: "Automated Slot Locking",
        title: "Capacity & provider slot locking",
        subtitle: "Live Provider Calendar Synchronization",
        copy: "Appointments, consultations, and provider schedules stay organized with real-time slot locking that prevents double-booking.",
        primaryImage: timeSlotsImg,
        primaryAlt: "Khyra scheduling workspace showing live time slot capacity",
        secondaryImage: appointmentsImg,
        secondaryAlt: "Khyra appointment execution workspace",
        secondaryLabel: "Next View",
        secondaryTitle: "Action Execution",
        features: [
          "Real-time morning and afternoon capacity tracking with remaining slot counters",
          "Multi-provider availability indicators with automated buffer rules",
          "Instant reservation locking triggered directly by inbound patient conversations",
        ],
      },
      {
        id: "execution",
        tabLabel: "Action Execution",
        badge: "Action Execution",
        workflowStage: "Request-to-Action Engine",
        title: "From request to completed action",
        subtitle: "Request-to-Execution Engine",
        copy: "Khyra connects the interaction with the operational work behind it — from scheduling and assignment to updates and follow-through.",
        primaryImage: appointmentsImg,
        primaryAlt: "Khyra appointment management and activity execution workspace",
        secondaryImage: dashboardImg,
        secondaryAlt: "Khyra Operations central command dashboard",
        secondaryLabel: "Next View",
        secondaryTitle: "Central Command",
        features: [
          "Chronological upcoming and completed schedules with verified reason codes",
          "Automated multi-channel confirmations and proactive reminder dispatches",
          "Full audit trail logged directly into connected management systems",
        ],
      },
    ],
  },
  "real-estate": {
    eyebrow: "Operational Platform Evidence",
    headlinePrefix: "The operational system behind ",
    headlineHighlight: "real estate sales & viewing workflows.",
    description:
      "Khyra connects inbound buyer qualification directly to listing broker calendars, property passes, and CRM deal stages with zero manual lag.",
    stages: [
      {
        id: "buyer-workspace",
        tabLabel: "Buyer Workspace",
        badge: "Lead Context",
        workflowStage: "Buyer Directory & Triage",
        title: "Operational context, in one place",
        subtitle: "High-Intent Buyer & Investor Profiles",
        copy: "Khyra keeps customer activity, schedules, requests and workflow status connected so teams can see what happened and what needs to happen next.",
        primaryImage: customersImg,
        primaryAlt: "Khyra Operations workspace showing buyer and prospect records",
        secondaryImage: timeSlotsImg,
        secondaryAlt: "Khyra showing availability calendar",
        secondaryLabel: "Next View",
        secondaryTitle: "Showing Availability",
        features: [
          "Instant buyer lookup with pre-qualified budget, move-in timeline, and property criteria",
          "Continuous activity timeline tracking every inquiry, callback, and broker touchpoint",
          "Zero manual data entry: CRM records and deal stages update automatically",
        ],
      },
      {
        id: "showing-scheduling",
        tabLabel: "Showing Availability",
        badge: "Capacity & Coordination",
        workflowStage: "Broker Slot Locking",
        title: "Private showing availability",
        subtitle: "Listing Specialist Calendar Synchronization",
        copy: "Locks private viewing windows and agent availability in real time without back-and-forth messaging.",
        primaryImage: timeSlotsImg,
        primaryAlt: "Khyra scheduling workspace showing viewing availability",
        secondaryImage: appointmentsImg,
        secondaryAlt: "Khyra showing pass and appointment execution",
        secondaryLabel: "Next View",
        secondaryTitle: "Tour Execution",
        features: [
          "Live viewing slot reservation aligned with listing specialist territories",
          "Automated travel and buffer time protection between property visits",
          "Instant calendar locking triggered directly during inbound caller qualification",
        ],
      },
      {
        id: "tour-execution",
        tabLabel: "Tour & Deal Action",
        badge: "Action Execution",
        workflowStage: "Tour & Pipeline Progression",
        title: "From request to completed action",
        subtitle: "Tour Scheduling & Deal Pipeline",
        copy: "Khyra connects the interaction with the operational work behind it — from scheduling and assignment to updates and follow-through.",
        primaryImage: appointmentsImg,
        primaryAlt: "Khyra appointments workspace showing scheduled property viewings",
        secondaryImage: dashboardImg,
        secondaryAlt: "Khyra central command dashboard",
        secondaryLabel: "Next View",
        secondaryTitle: "Broker Command",
        features: [
          "Confirmed property tour orders with location briefs and visitor pass codes",
          "Automated WhatsApp and SMS confirmations dispatched directly to prospects",
          "Direct pipeline stage progression and instant agent briefing dispatch",
        ],
      },
    ],
  },
  "hotels-hospitality": {
    eyebrow: "Operational Platform Evidence",
    headlinePrefix: "The operational system behind ",
    headlineHighlight: "hotel & guest operations.",
    description:
      "Khyra coordinates guest inquiries, front-desk service requests, and dining reservations in a unified operational workspace.",
    stages: [
      {
        id: "guest-visibility",
        tabLabel: "Guest Operations",
        badge: "Operational Visibility",
        workflowStage: "Live Command Surface",
        title: "Operational visibility, in real time",
        subtitle: "Live Guest Requests & Service Dispatch",
        copy: "Khyra keeps customer activity, schedules, requests and workflow status connected so teams can see what happened and what needs to happen next.",
        primaryImage: dashboardImg,
        primaryAlt: "Khyra central command dashboard showing live operational visibility",
        secondaryImage: customersImg,
        secondaryAlt: "Khyra guest profile workspace",
        secondaryLabel: "Next View",
        secondaryTitle: "Guest Profiles",
        features: [
          "Live operational timeline of guest inquiries, front-desk tasks, and service dispatches",
          "Real-time visibility into concierge requests, housekeeping orders, and late checkouts",
          "Single command surface eliminating paper logs, missed calls, and siloed desk tools",
        ],
      },
      {
        id: "guest-workspace",
        tabLabel: "Guest Profiles",
        badge: "Guest Context",
        workflowStage: "PMS & Stay Sync",
        title: "Operational context, in one place",
        subtitle: "Unified Guest Context & Stay Records",
        copy: "Guest preferences, past stay records, and request history stay connected across every department.",
        primaryImage: customersImg,
        primaryAlt: "Khyra customer workspace showing guest profiles and stay context",
        secondaryImage: timeSlotsImg,
        secondaryAlt: "Khyra service scheduling workspace",
        secondaryLabel: "Next View",
        secondaryTitle: "Service Booking",
        features: [
          "Instant guest profile lookup with room numbers, stay dates, and VIP status",
          "Interaction history tracking every guest call, dining request, and amenity order",
          "Direct synchronization with Property Management Systems (PMS)",
        ],
      },
      {
        id: "amenity-scheduling",
        tabLabel: "Amenity Scheduling",
        badge: "Capacity & Coordination",
        workflowStage: "Automated Slot Reservation",
        title: "From request to completed action",
        subtitle: "Dining, Spa & Amenity Slot Locking",
        copy: "Khyra connects the interaction with the operational work behind it — from scheduling and assignment to updates and follow-through.",
        primaryImage: timeSlotsImg,
        primaryAlt: "Khyra time slots workspace showing amenity availability",
        secondaryImage: appointmentsImg,
        secondaryAlt: "Khyra reservation management",
        secondaryLabel: "Next View",
        secondaryTitle: "Reservation Confirmation",
        features: [
          "Live capacity management for dining tables, spa suites, and private transport",
          "Instant slot reservation confirmed during guest phone or concierge inquiries",
          "Automated calendar lock and guest confirmation notification dispatch",
        ],
      },
    ],
  },
  "field-services": {
    eyebrow: "Operational Platform Evidence",
    headlinePrefix: "The operational system behind ",
    headlineHighlight: "field dispatch & service operations.",
    description:
      "Khyra turns emergency customer calls into dispatched work orders, route arrival windows, and real-time status updates for field teams.",
    stages: [
      {
        id: "dispatch-command",
        tabLabel: "Dispatch Command",
        badge: "Operational Visibility",
        workflowStage: "Live Command Surface",
        title: "Central command for field operations",
        subtitle: "Real-time Dispatch Visibility",
        copy: "Khyra keeps customer activity, schedules, requests and workflow status connected so teams can see what happened and what needs to happen next.",
        primaryImage: dashboardImg,
        primaryAlt: "Khyra Operations dashboard showing active field dispatch jobs",
        secondaryImage: timeSlotsImg,
        secondaryAlt: "Khyra arrival window scheduling workspace",
        secondaryLabel: "Next View",
        secondaryTitle: "Arrival Windows",
        features: [
          "Live tracking of active crew dispatches, inbound service calls, and ongoing jobs",
          "Immediate emergency intake with location matching and severity classification",
          "Eliminates dispatch lag between customer phone requests and truck deployment",
        ],
      },
      {
        id: "arrival-windows",
        tabLabel: "Arrival Windows",
        badge: "Capacity & Coordination",
        workflowStage: "Route Slot Locking",
        title: "Dispatch window coordination",
        subtitle: "Territory Availability & Route Capacity",
        copy: "Coordinates technician arrival windows based on territory, job scope, and crew availability in real time.",
        primaryImage: timeSlotsImg,
        primaryAlt: "Khyra time slots showing territory arrival window availability",
        secondaryImage: appointmentsImg,
        secondaryAlt: "Khyra work orders workspace",
        secondaryLabel: "Next View",
        secondaryTitle: "Work Orders",
        features: [
          "Morning and afternoon service window capacity tracking by zone",
          "Travel buffer rules preventing overlapping or delayed field appointments",
          "Instant arrival window lock triggered directly during customer phone calls",
        ],
      },
      {
        id: "work-orders",
        tabLabel: "Work Orders",
        badge: "Action Execution",
        workflowStage: "Request-to-Execution Engine",
        title: "From request to completed action",
        subtitle: "Work Order Dispatch & Customer Confirmation",
        copy: "Khyra connects the interaction with the operational work behind it — from scheduling and assignment to updates and follow-through.",
        primaryImage: appointmentsImg,
        primaryAlt: "Khyra appointments workspace showing scheduled technician jobs",
        secondaryImage: customersImg,
        secondaryAlt: "Khyra customer account directory",
        secondaryLabel: "Next View",
        secondaryTitle: "Customer Account",
        features: [
          "Structured work orders created automatically with customer address and issue notes",
          "Technician briefing dispatched instantly with diagnostic history and gate codes",
          "Automated customer SMS arrival notice and verified field service status log",
        ],
      },
    ],
  },
  "professional-services": {
    eyebrow: "Operational Platform Evidence",
    headlinePrefix: "The operational system behind ",
    headlineHighlight: "consulting & professional practice workflows.",
    description:
      "Khyra keeps client matters, advisor consultations, and engagement deliverables organized in one operational workspace.",
    stages: [
      {
        id: "client-workspace",
        tabLabel: "Client Workspace",
        badge: "Client Context",
        workflowStage: "Matter & Account Sync",
        title: "Operational context, in one place",
        subtitle: "Client Records & Matter History",
        copy: "Khyra keeps customer activity, schedules, requests and workflow status connected so teams can see what happened and what needs to happen next.",
        primaryImage: customersImg,
        primaryAlt: "Khyra customer workspace showing client directory and matter context",
        secondaryImage: timeSlotsImg,
        secondaryAlt: "Khyra consultation calendar",
        secondaryLabel: "Next View",
        secondaryTitle: "Consultant Calendar",
        features: [
          "Instant client directory search with engagement status and billing profile",
          "Continuous conversation audit log attached to matter files",
          "Eliminates intake bottlenecks for partners and project leads",
        ],
      },
      {
        id: "advisor-scheduling",
        tabLabel: "Consultant Capacity",
        badge: "Capacity & Coordination",
        workflowStage: "Partner Slot Locking",
        title: "Consultation availability & slot locking",
        subtitle: "Partner & Advisor Calendar Synchronization",
        copy: "Coordinates client reviews, discovery sessions, and retainer meetings with precise buffer times.",
        primaryImage: timeSlotsImg,
        primaryAlt: "Khyra scheduling workspace showing consultation time slots",
        secondaryImage: appointmentsImg,
        secondaryAlt: "Khyra engagement execution workspace",
        secondaryLabel: "Next View",
        secondaryTitle: "Action Follow-Through",
        features: [
          "Real-time calendar slot lock aligned with practice area specialists",
          "Automated conflict check and qualification rules before booking",
          "Instant calendar invite and meeting link generation",
        ],
      },
      {
        id: "action-execution",
        tabLabel: "Action Execution",
        badge: "Action Execution",
        workflowStage: "Engagement Deliverables",
        title: "From request to completed action",
        subtitle: "Request-to-Execution Engine",
        copy: "Khyra connects the interaction with the operational work behind it — from scheduling and assignment to updates and follow-through.",
        primaryImage: appointmentsImg,
        primaryAlt: "Khyra appointments workspace showing scheduled reviews and sessions",
        secondaryImage: dashboardImg,
        secondaryAlt: "Khyra central command dashboard",
        secondaryLabel: "Next View",
        secondaryTitle: "Practice Command",
        features: [
          "Structured engagement logging with reason codes and meeting agendas",
          "Automated intake summary dispatched to assigned consultant",
          "Complete client record update with zero administrative delay",
        ],
      },
    ],
  },
  "salons-wellness": {
    eyebrow: "Operational Platform Evidence",
    headlinePrefix: "The operational system behind ",
    headlineHighlight: "salon & wellness workflows.",
    description:
      "Khyra connects phone bookings, specialist availability, and recurring visit cadences into a synchronized appointment engine.",
    stages: [
      {
        id: "client-records",
        tabLabel: "Client Records",
        badge: "Client Context",
        workflowStage: "Loyalty & Profile Sync",
        title: "Operational context, in one place",
        subtitle: "Client Preferences & Treatment History",
        copy: "Khyra keeps customer activity, schedules, requests and workflow status connected so teams can see what happened and what needs to happen next.",
        primaryImage: customersImg,
        primaryAlt: "Khyra customer workspace showing salon client profiles",
        secondaryImage: timeSlotsImg,
        secondaryAlt: "Khyra chair scheduling workspace",
        secondaryLabel: "Next View",
        secondaryTitle: "Chair Availability",
        features: [
          "Instant client lookup with preferred stylists, therapists, and past treatments",
          "Visit frequency counters and loyalty tier tracking",
          "Direct integration with salon point-of-sale and booking software",
        ],
      },
      {
        id: "chair-scheduling",
        tabLabel: "Chair & Specialist",
        badge: "Capacity & Coordination",
        workflowStage: "Chair & Specialist Locking",
        title: "Chair & specialist slot coordination",
        subtitle: "Real-Time Chair & Room Availability",
        copy: "Balances treatment duration, processing time, and chair availability across service providers.",
        primaryImage: timeSlotsImg,
        primaryAlt: "Khyra scheduling workspace showing chair availability",
        secondaryImage: appointmentsImg,
        secondaryAlt: "Khyra booking management",
        secondaryLabel: "Next View",
        secondaryTitle: "Booking Execution",
        features: [
          "Live slot visualization with remaining daily booking capacity",
          "Multi-service duration calculation preventing schedule overruns",
          "Instant slot reservation triggered by caller inquiry",
        ],
      },
      {
        id: "booking-execution",
        tabLabel: "Booking Execution",
        badge: "Action Execution",
        workflowStage: "Automated Reminder Flow",
        title: "From request to completed action",
        subtitle: "Request-to-Execution Engine",
        copy: "Khyra connects the interaction with the operational work behind it — from scheduling and assignment to updates and follow-through.",
        primaryImage: appointmentsImg,
        primaryAlt: "Khyra appointment workspace showing confirmed salon sessions",
        secondaryImage: dashboardImg,
        secondaryAlt: "Khyra central command dashboard",
        secondaryLabel: "Next View",
        secondaryTitle: "Salon Command",
        features: [
          "Confirmed appointments with selected service options and staff notes",
          "Automated SMS confirmations and timely pre-visit reminders",
          "Seamless calendar and ledger updates with zero front-desk lag",
        ],
      },
    ],
  },
  veterinary: {
    eyebrow: "Operational Platform Evidence",
    headlinePrefix: "The operational system behind ",
    headlineHighlight: "veterinary clinic workflows.",
    description:
      "Khyra synchronizes pet medical records, exam room availability, and vaccination reminders into a seamless operational workflow.",
    stages: [
      {
        id: "pet-records",
        tabLabel: "Patient Records",
        badge: "Patient Context",
        workflowStage: "Pet & Owner Profile Sync",
        title: "Operational context, in one place",
        subtitle: "Pet Profiles & Owner Records",
        copy: "Khyra keeps customer activity, schedules, requests and workflow status connected so teams can see what happened and what needs to happen next.",
        primaryImage: customersImg,
        primaryAlt: "Khyra customer workspace showing pet and owner records",
        secondaryImage: timeSlotsImg,
        secondaryAlt: "Khyra vet appointment slots",
        secondaryLabel: "Next View",
        secondaryTitle: "Exam Room Slots",
        features: [
          "Instant pet and owner matching by phone number on inbound call",
          "Access to vaccination history, breed notes, and previous visit logs",
          "Synchronized with veterinary clinic management database",
        ],
      },
      {
        id: "exam-scheduling",
        tabLabel: "Exam Room Capacity",
        badge: "Capacity & Coordination",
        workflowStage: "Vet & Surgery Slot Locking",
        title: "Exam room & vet availability",
        subtitle: "Live Doctor & Surgery Slot Synchronization",
        copy: "Coordinates routine wellness exams, vaccinations, and surgical appointments without staff phone tag.",
        primaryImage: timeSlotsImg,
        primaryAlt: "Khyra scheduling workspace showing exam room availability",
        secondaryImage: appointmentsImg,
        secondaryAlt: "Khyra appointment execution workspace",
        secondaryLabel: "Next View",
        secondaryTitle: "Visit Execution",
        features: [
          "Live capacity tracking for general consults and procedure rooms",
          "Automated triage classification before booking non-routine visits",
          "Instant slot locking directly from caller conversation",
        ],
      },
      {
        id: "visit-execution",
        tabLabel: "Visit Execution",
        badge: "Action Execution",
        workflowStage: "Pre-Care & Intake Flow",
        title: "From request to completed action",
        subtitle: "Request-to-Execution Engine",
        copy: "Khyra connects the interaction with the operational work behind it — from scheduling and assignment to updates and follow-through.",
        primaryImage: appointmentsImg,
        primaryAlt: "Khyra appointments workspace showing scheduled veterinary visits",
        secondaryImage: dashboardImg,
        secondaryAlt: "Khyra central command dashboard",
        secondaryLabel: "Next View",
        secondaryTitle: "Clinic Command",
        features: [
          "Confirmed visit logs with clear reason codes (Vaccination, Exam, Urgent)",
          "Automated pre-visit fasting or medication instructions sent via SMS",
          "Live calendar update keeping veterinary technicians prepared",
        ],
      },
    ],
  },
  education: {
    eyebrow: "Operational Platform Evidence",
    headlinePrefix: "The operational system behind ",
    headlineHighlight: "admissions & academic workflows.",
    description:
      "Khyra automates prospective student inquiries, campus tour bookings, and counselor interview scheduling with zero administrative lag.",
    stages: [
      {
        id: "applicant-records",
        tabLabel: "Applicant Records",
        badge: "Student Context",
        workflowStage: "Admissions CRM Sync",
        title: "Operational context, in one place",
        subtitle: "Applicant & Family Records",
        copy: "Khyra keeps customer activity, schedules, requests and workflow status connected so teams can see what happened and what needs to happen next.",
        primaryImage: customersImg,
        primaryAlt: "Khyra customer workspace showing student applicant directory",
        secondaryImage: timeSlotsImg,
        secondaryAlt: "Khyra tour scheduling calendar",
        secondaryLabel: "Next View",
        secondaryTitle: "Tour Capacity",
        features: [
          "Instant applicant lookup with grade level, program interest, and history",
          "Unified inquiry log capturing questions, open-house requests, and notes",
          "Direct synchronization with admissions CRM and student records",
        ],
      },
      {
        id: "tour-scheduling",
        tabLabel: "Tour & Interview",
        badge: "Capacity & Coordination",
        workflowStage: "Counselor Slot Locking",
        title: "Campus tour & interview coordination",
        subtitle: "Admissions Counselor Slot Locking",
        copy: "Coordinates campus tours, counselor interviews, and informational sessions with real-time capacity.",
        primaryImage: timeSlotsImg,
        primaryAlt: "Khyra scheduling workspace showing tour and interview availability",
        secondaryImage: appointmentsImg,
        secondaryAlt: "Khyra admissions appointments",
        secondaryLabel: "Next View",
        secondaryTitle: "Admissions Action",
        features: [
          "Group and individual tour capacity tracking with headcount limits",
          "Direct counselor calendar synchronization with automated buffer rules",
          "Instant slot reservation during inbound parent or student calls",
        ],
      },
      {
        id: "admissions-execution",
        tabLabel: "Admissions Action",
        badge: "Action Execution",
        workflowStage: "Milestone Confirmation",
        title: "From request to completed action",
        subtitle: "Request-to-Execution Engine",
        copy: "Khyra connects the interaction with the operational work behind it — from scheduling and assignment to updates and follow-through.",
        primaryImage: appointmentsImg,
        primaryAlt: "Khyra appointment workspace showing confirmed campus sessions",
        secondaryImage: dashboardImg,
        secondaryAlt: "Khyra central command dashboard",
        secondaryLabel: "Next View",
        secondaryTitle: "Admissions Command",
        features: [
          "Confirmed tour and interview appointments with directions and agenda",
          "Automated SMS/Email confirmations and reminder cadences",
          "Audit trail of admissions touchpoints updated in real time",
        ],
      },
    ],
  },
  "cosmetic-clinics": {
    eyebrow: "Operational Platform Evidence",
    headlinePrefix: "The operational system behind ",
    headlineHighlight: "aesthetic & cosmetic clinic workflows.",
    description:
      "Khyra synchronizes consultation requests, practitioner availability, and treatment room schedules into a confidential operational engine.",
    stages: [
      {
        id: "treatment-workspace",
        tabLabel: "Treatment Records",
        badge: "Client Context",
        workflowStage: "Aesthetic Record Sync",
        title: "Operational context, in one place",
        subtitle: "Treatment Context & Client Workspace",
        copy: "Khyra keeps customer activity, schedules, requests and workflow status connected so teams can see what happened and what needs to happen next.",
        primaryImage: customersImg,
        primaryAlt: "Khyra customer workspace showing client treatment records",
        secondaryImage: timeSlotsImg,
        secondaryAlt: "Khyra practitioner scheduling workspace",
        secondaryLabel: "Next View",
        secondaryTitle: "Suite Capacity",
        features: [
          "Instant client record match by phone with treatment history and practitioner notes",
          "Interaction timeline capturing inquiries, follow-ups, and preferences",
          "Direct sync with aesthetic clinic management and charting systems",
        ],
      },
      {
        id: "suite-scheduling",
        tabLabel: "Suite & Practitioner",
        badge: "Capacity & Coordination",
        workflowStage: "Room & Specialist Locking",
        title: "Practitioner & suite availability",
        subtitle: "Treatment Room & Provider Slot Coordination",
        copy: "Coordinates aesthetic consultations and multi-step procedures with real-time suite and specialist capacity.",
        primaryImage: timeSlotsImg,
        primaryAlt: "Khyra scheduling workspace showing practitioner availability",
        secondaryImage: appointmentsImg,
        secondaryAlt: "Khyra consultation booking workspace",
        secondaryLabel: "Next View",
        secondaryTitle: "Procedure Booking",
        features: [
          "Live practitioner capacity tracking with procedure duration rules",
          "Prevents overlapping suite bookings and provides turn-around buffers",
          "Instant slot locking directly from caller inquiries",
        ],
      },
      {
        id: "procedure-execution",
        tabLabel: "Procedure Booking",
        badge: "Action Execution",
        workflowStage: "Pre-Care & Confirmation",
        title: "From request to completed action",
        subtitle: "Request-to-Execution Engine",
        copy: "Khyra connects the interaction with the operational work behind it — from scheduling and assignment to updates and follow-through.",
        primaryImage: appointmentsImg,
        primaryAlt: "Khyra appointments workspace showing scheduled cosmetic consultations",
        secondaryImage: dashboardImg,
        secondaryAlt: "Khyra central command dashboard",
        secondaryLabel: "Next View",
        secondaryTitle: "Clinic Command",
        features: [
          "Confirmed consultation bookings with pre-care instructions sent via SMS",
          "Treatment reason tagging and practitioner preparation notes",
          "Immediate calendar update eliminating administrative overhead",
        ],
      },
    ],
  },
};

export function IndustryProductShowcase({ industry }: { industry: Industry }) {
  const [activeTab, setActiveTab] = useState(0);
  const reveal = useScrollReveal();

  const config = INDUSTRY_CONFIGS[industry.slug] || INDUSTRY_CONFIGS.healthcare;
  const current = config.stages[activeTab] || config.stages[0];
  const nextIdx = (activeTab + 1) % config.stages.length;

  return (
    <section
      ref={reveal.ref}
      id="product-evidence"
      data-visible={reveal.visible}
      className="mx-auto max-w-7xl px-6 py-14 sm:py-18 lg:py-20 border-t border-border/60 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-10 border-b border-border/60">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="section-label font-semibold text-xs tracking-wider uppercase"
              style={{ color: industry.accentHex }}
            >
              {config.eyebrow}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Khyra Operations Engine
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.1]">
            {config.headlinePrefix}
            <span className="italic" style={{ color: industry.accentHex }}>
              {config.headlineHighlight}
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {config.description}
          </p>
        </div>

        <div className="max-w-xs">
          <p className="text-xs font-medium text-muted-foreground/90 border-l-2 pl-4 py-1 leading-relaxed" style={{ borderColor: `${industry.accentHex}80` }}>
            Configured around your operational policies, live availability, and existing software systems.
          </p>
        </div>
      </div>

      {/* Tab Navigation Selector */}
      <div
        role="tablist"
        aria-label={`${industry.name} Operational Stages`}
        className="grid grid-cols-3 gap-2.5 my-6 sm:my-8"
      >
        {config.stages.map((stage, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={stage.id}
              role="tab"
              id={`industry-tab-${stage.id}`}
              aria-selected={isActive}
              aria-controls={`industry-tabpanel-${stage.id}`}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`group text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 focus:outline-none focus-visible:ring-2 cursor-pointer ${
                isActive
                  ? "shadow-sm ring-1"
                  : "border-border/80 bg-card hover:bg-secondary/40 hover:border-border"
              }`}
              style={{
                borderColor: isActive ? industry.accentHex : undefined,
                backgroundColor: isActive ? `${industry.accentHex}0d` : undefined,
                boxShadow: isActive ? `0 0 0 1px ${industry.accentHex}40` : undefined,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: isActive ? industry.accentHex : "var(--muted-foreground)" }}
                >
                  0{idx + 1}
                </span>
                <span
                  className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: isActive ? `${industry.accentHex}15` : "var(--secondary)",
                    borderColor: isActive ? `${industry.accentHex}30` : "var(--border)",
                    color: isActive ? industry.accentHex : "var(--muted-foreground)",
                  }}
                >
                  {stage.badge}
                </span>
              </div>
              <div className="font-display text-sm sm:text-base text-ink font-semibold mt-0.5 truncate">
                {stage.tabLabel}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Showcase Stage Card */}
      <div
        id={`industry-tabpanel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`industry-tab-${current.id}`}
        className="rounded-3xl border border-border/90 bg-card p-5 sm:p-6 lg:p-8 shadow-lg"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Operational Narrative & Verification Checkpoints (5 cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border"
              style={{
                backgroundColor: `${industry.accentHex}10`,
                borderColor: `${industry.accentHex}25`,
                color: industry.accentHex,
              }}
            >
              <Sparkles className="h-3.5 w-3.5" style={{ color: industry.accentHex }} />
              <span>{current.badge}</span>
              <span className="opacity-40">·</span>
              <span className="text-[11px] font-mono">{current.workflowStage}</span>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">
                {current.subtitle}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-3xl text-ink leading-snug">
                {current.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              {current.copy}
            </p>

            {/* Feature Bullets */}
            <div className="space-y-2.5 pt-3 border-t border-border/60">
              {current.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-2.5 rounded-xl border border-border/50 bg-background/80 p-2.5 sm:p-3 shadow-2xs transition-all hover:border-border"
                >
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 mt-0.5"
                    style={{ color: industry.accentHex }}
                  />
                  <span className="text-xs font-medium text-foreground/90 leading-relaxed">
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Row */}
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-4">
              <div
                className="inline-flex rounded-xl transition hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: industry.accentHex }}
              >
                <BookDemoButton className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white shadow-xs cursor-pointer">
                  <span>Schedule Operational Demo</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </BookDemoButton>
              </div>

              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Enterprise integration ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Generalized Khyra Operations Device Display (7 cols) */}
          <div className="lg:col-span-7 flex justify-center items-center py-2">
            <div className="relative flex justify-center items-center w-full min-h-[460px] sm:min-h-[500px]">
              {/* Ambient Radial Accent */}
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none opacity-40"
                style={{
                  background: `radial-gradient(ellipse at center, ${industry.accentHex}18, transparent 70%)`,
                }}
              />

              {/* Dominant Active Screenshot - Completely Visible in One Glance */}
              <div className="relative z-10 transition-all duration-500 flex justify-center sm:translate-x-[-20px] md:translate-x-[-30px] lg:translate-x-[-35px]">
                <img
                  key={current.id}
                  src={current.primaryImage}
                  alt={current.primaryAlt}
                  className="h-[430px] sm:h-[470px] lg:h-[500px] w-auto max-w-[245px] sm:max-w-[260px] object-contain rounded-[24px] sm:rounded-[28px] drop-shadow-2xl transition-transform duration-700 ease-out hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>

              {/* Secondary Layered Subordinate Device (Staggered Composition) */}
              <button
                type="button"
                onClick={() => setActiveTab(nextIdx)}
                className="hidden sm:block absolute right-2 sm:right-4 md:right-8 lg:right-4 xl:right-8 bottom-3 z-20 w-[145px] sm:w-[155px] lg:w-[165px] rounded-2xl border border-border/80 bg-background/95 p-2 shadow-2xl backdrop-blur-md opacity-95 transition-all duration-300 hover:opacity-100 hover:scale-105 cursor-pointer text-left group"
                style={{ borderColor: `${industry.accentHex}40` }}
                title={`Next: Switch to ${current.secondaryTitle}`}
              >
                <div className="flex items-center justify-between px-1.5 py-0.5 border-b border-border/60 text-[9px] font-semibold text-muted-foreground uppercase">
                  <div className="flex items-center gap-1" style={{ color: industry.accentHex }}>
                    <Clock className="h-2.5 w-2.5" />
                    <span>{current.secondaryLabel}</span>
                  </div>
                  <ChevronRight className="h-2.5 w-2.5 text-muted-foreground group-hover:text-ink transition-colors" />
                </div>
                <div className="px-1.5 pt-1 pb-0.5">
                  <p className="text-[10px] font-semibold text-ink truncate">
                    {current.secondaryTitle}
                  </p>
                </div>
                <img
                  src={current.secondaryImage}
                  alt={current.secondaryAlt}
                  className="mt-0.5 h-[230px] sm:h-[255px] lg:h-[275px] w-auto mx-auto rounded-xl object-contain opacity-90 transition-opacity group-hover:opacity-100"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
