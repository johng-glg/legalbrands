/**
 * GLG Brand Portfolio — single source of truth
 * ---------------------------------------------
 * One templated site system, themed per brand from this file.
 * Adding a brand = add an entry here + drop logo/photography assets.
 * No template code changes.
 *
 * All values transcribed from the approved brand & marketing packages.
 * `parent` is intentionally NOT surfaced in public UI by default —
 * expose it only where you decide it should appear.
 */

export type FunnelRole = "top" | "mid" | "bottom";
export type BrandFamily = "peace" | "empowerment";

export interface BrandTokens {
  // identity
  slug: string;
  name: string;
  domain: string;
  parent: "Guardian Litigation Group";
  family: BrandFamily;
  funnel: FunnelRole;
  oneLiner: string;

  // positioning
  mission: string;
  positioning: string;
  audience: string;
  mindset: string;
  triggers: string[];          // "what brings them to us"
  taglinePrimary: string;
  taglinesSecondary: string[];
  pillars: { title: string; meaning: string; proof: string }[];
  voiceWeAre: string[];
  voiceWeAreNot: string[];

  // color — drives CSS custom properties at build time
  color: {
    primary: string;           // 60–70% dominance
    dark: string;              // backgrounds / reverse
    accent: string;            // CTAs only
    supporting: string;        // captions / secondary
    light: string;             // light background
  };

  // type — load primary from Google Fonts; fallback is the web/Office-safe stack
  type: {
    headline: string;
    headlineFallback: string;
    body: string;
    bodyFallback: string;
    headlineTransform?: "uppercase" | "none";
  };

  // visual direction (for asset selection + AI image prompts)
  logoDirection: string;
  pattern: string;
  photography: string;

  // marketing (powers landing-page hero variants + paid LP routing)
  channels: { channel: string; role: string; use: string }[];
}

export const brands: Record<string, BrandTokens> = {
  "off-the-hook": {
    slug: "off-the-hook",
    name: "Off the Hook Law",
    domain: "offthehooklaw.com",
    parent: "Guardian Litigation Group",
    family: "peace",
    funnel: "top",
    oneLiner: "The relief brand — make the harassment stop.",
    mission:
      "Give financially distressed people their peace back — stopping creditor harassment and resolving debt with honest, attorney-led help.",
    positioning:
      "For people drowning in collector calls and debt stress, Off the Hook Law is the debt-relief law firm that makes the harassment stop and the worry lift — because real attorneys take the problem off your plate.",
    audience:
      "Stressed consumers carrying $10k–$100k+ in unsecured debt, frequent collector contact, anxious/embarrassed, often not yet sued.",
    mindset: "“I just want it to stop.”",
    triggers: [
      "Relentless collector calls",
      "Threatening letters",
      "Anxiety and shame about money",
      "A spouse or family stressor",
      "Just learned an attorney can help",
    ],
    taglinePrimary: "You're off the hook.",
    taglinesSecondary: ["The calls stop here.", "Breathe. We've got it from here.", "Debt called. We'll answer."],
    pillars: [
      { title: "The calls stop here", meaning: "Once we represent you, collectors come to us — not you.", proof: "Attorney representation routes collector contact through counsel; we field it from here." },
      { title: "Real attorneys, not a settlement company", meaning: "A law firm takes the problem off your plate — not a call-center program.", proof: "Licensed attorneys handle the file end to end, including defense if you're sued." },
      { title: "Relief first", meaning: "We meet panic with calm and a clear next step, in plain language.", proof: "Free consult, honest expectations, and a person who picks up." },
    ],
    voiceWeAre: ["Reassuring", "Warm", "Plain-spoken", "Honest"],
    voiceWeAreNot: ["Jargon-heavy", "Alarmist", "Cold", "Salesy"],
    color: { primary: "#1E9E6A", dark: "#0F3A2C", accent: "#FF7A59", supporting: "#222826", light: "#FBF6EE" },
    type: { headline: "Poppins", headlineFallback: "Calibri, sans-serif", body: "Inter", bodyFallback: "Calibri, sans-serif" },
    logoDirection: "Open-loop hook releasing its line, doubling as a phone going off the hook. Rounded, friendly.",
    pattern: "Soft rounded loops and gentle arcs in single-color tints.",
    photography: "Candid relief — exhaling at the kitchen table, parent relaxed with kids, warm natural light. No staged courtroom shots.",
    channels: [
      { channel: "Paid social", role: "Demand-gen", use: "Relief-first creative; before/after calm." },
      { channel: "Paid search", role: "Intent capture", use: "“stop collector calls”, “debt harassment lawyer”." },
    ],
  },

  "high-ground": {
    slug: "high-ground",
    name: "High Ground Law",
    domain: "highgroundlaw.com",
    parent: "Guardian Litigation Group",
    family: "peace",
    funnel: "mid",
    oneLiner: "The control brand — rise above the chaos, back on solid ground.",
    mission:
      "Lift financially distressed people out of the chaos of debt and back onto solid ground — with attorney-led plans that restore control.",
    positioning:
      "For overwhelmed people determined to climb out of debt, High Ground Law puts them back in control — attorneys give you the higher ground in every collector conversation and a clear route to stable footing.",
    audience:
      "Consumers with significant unsecured debt who feel underwater but are motivated; value control, a plan, and competence.",
    mindset: "“I need to get back on top of this.”",
    triggers: [
      "Falling behind despite trying",
      "Escalating collections",
      "Wants a real plan",
      "Researching options seriously",
      "Protecting family stability",
    ],
    taglinePrimary: "Get back on solid ground.",
    taglinesSecondary: ["Rise above the calls.", "The high ground is yours.", "A clear way out."],
    pillars: [
      { title: "Control restored", meaning: "The higher position and a plan they can see.", proof: "Step-by-step roadmap; attorney handles creditor contact." },
      { title: "The attorney advantage", meaning: "Real legal leverage, not a settlement company's promises.", proof: "Lawsuit defense, FDCPA leverage, licensed counsel." },
      { title: "Clear footing", meaning: "Plain, honest guidance so clients know the next step.", proof: "Transparent process and expectations." },
    ],
    voiceWeAre: ["Steady", "Confident", "Clear", "Protective"],
    voiceWeAreNot: ["Hype-y", "Alarmist", "Condescending", "Cold"],
    color: { primary: "#173A5E", dark: "#5C6B78", accent: "#E8973A", supporting: "#5C6B78", light: "#F4F7F9" },
    type: { headline: "Archivo", headlineFallback: "Arial, sans-serif", body: "Source Sans 3", bodyFallback: "Calibri, sans-serif" },
    logoDirection: "Clean summit/peak mark — upward triangle or ascending ridge line. Confident, geometric.",
    pattern: "Topographic contour lines and ascending ridge shapes in single-color tints.",
    photography: "People standing tall, calm and capable — morning light, wide horizons. Aspirational but real.",
    channels: [
      { channel: "Paid search", role: "Primary intent capture", use: "“debt relief options”, “how to get out of debt”." },
      { channel: "SEO / content", role: "Authority", use: "Guides on options, rights, what to expect." },
      { channel: "Email nurture", role: "Convert considerers", use: "Roadmap drip sequence." },
    ],
  },

  "countersuit": {
    slug: "countersuit",
    name: "Countersuit Law",
    domain: "countersuitlaw.com",
    parent: "Guardian Litigation Group",
    family: "empowerment",
    funnel: "bottom",
    oneLiner: "The fight-back brand — they sued you, sue back.",
    mission:
      "Turn the tables for people sued over debt — defending the claim and holding abusive collectors accountable.",
    positioning:
      "For people sued by a debt collector, Countersuit Law turns the case around — we defend the claim and pursue the collector's violations, making them answer to you.",
    audience: "Consumers just sued by a collector or debt buyer who want to fight and possibly counterclaim; motivated by fairness and anger.",
    mindset: "“They came after me — I want to hit back.”",
    triggers: ["Served with a debt lawsuit", "Robo-signed / junk-debt suit", "Collector law violations", "Wants to counterclaim", "Refuses to just pay"],
    taglinePrimary: "They sued you. Sue back.",
    taglinesSecondary: ["Turn the case around.", "The claim cuts both ways.", "Make them the defendant."],
    pillars: [
      { title: "Turn the tables", meaning: "Defense plus affirmative counterclaims flip the case.", proof: "FDCPA counterclaims; defend the underlying suit." },
      { title: "Accountability", meaning: "Collectors who break the law can owe you.", proof: "Statutory damages and fees where violations exist." },
      { title: "Courtroom credibility", meaning: "A real firm that will litigate.", proof: "Licensed litigators; trial-ready posture." },
    ],
    voiceWeAre: ["Authoritative", "Bold", "Principled", "Combative", "Direct"],
    voiceWeAreNot: ["Meek", "Ambiguous", "Reckless", "Empty bravado", "Cold"],
    color: { primary: "#A3122B", dark: "#14171A", accent: "#9C7A3C", supporting: "#6E6E6E", light: "#F3EEE3" },
    type: { headline: "Zilla Slab", headlineFallback: "Cambria, serif", body: "Inter", bodyFallback: "Calibri, sans-serif" },
    logoDirection: "Wordmark with a 'counter' mark — two opposing/returning arrows (the suit sent back). Optional subtle gavel cue.",
    pattern: "Opposing-arrow and return motifs over subtle legal-rule textures; crimson on parchment.",
    photography: "Composed, resolute people; courthouse cues used sparingly; dignified, never victimized.",
    channels: [
      { channel: "Paid search (high-intent)", role: "Primary", use: "“being sued by debt collector”, “countersue debt collector”, “FDCPA lawyer”." },
      { channel: "LSAs / legal directories", role: "Intent capture", use: "Strong for “sued” queries." },
      { channel: "Retargeting", role: "Convert", use: "“Sue back” creative." },
    ],
  },

  "spearhead": {
    slug: "spearhead",
    name: "Spearhead Law",
    domain: "spearheadlaw.com",
    parent: "Guardian Litigation Group",
    family: "empowerment",
    funnel: "bottom",
    oneLiner: "The offense brand — go on offense, lead the charge.",
    mission:
      "Put financially attacked people on offense — leading the charge against abusive collectors with aggressive, attorney-driven action.",
    positioning:
      "For people tired of being chased by collectors, Spearhead Law goes on offense — we lead the charge, defend the lawsuit, and press the collector's violations instead of waiting to react.",
    audience: "Consumers being actively sued or aggressively pursued; angry, motivated, ready to fight; want action and a firm that takes the lead.",
    mindset: "“I'm done being pushed around — do something.”",
    triggers: ["Served with a lawsuit", "Wage-garnishment threat", "Aggressive collector tactics", "Wants to fight, not settle quietly", "Learned collectors can be countered"],
    taglinePrimary: "Go on offense.",
    taglinesSecondary: ["Lead the charge.", "Point. Push. Prevail.", "We don't wait for the lawsuit."],
    pillars: [
      { title: "We lead the charge", meaning: "Proactive litigation, not reactive damage control.", proof: "Defend the suit and press the collector's violations instead of waiting to react." },
      { title: "Target becomes aggressor", meaning: "We flip the dynamic so the collector has to answer to you.", proof: "Affirmative FDCPA counterclaims and statutory damages where violations exist." },
      { title: "Momentum on deadlines", meaning: "Once you're served, speed and force decide the case.", proof: "Trial-ready litigators move fast on court timelines and garnishment threats." },
    ],
    voiceWeAre: ["Confident", "Combative", "Credible", "Direct", "Kinetic"],
    voiceWeAreNot: ["Passive", "Empty bravado", "Cold", "Bullying"],
    color: { primary: "#1F4FE0", dark: "#121417", accent: "#FF5A1F", supporting: "#8A94A0", light: "#FFFFFF" },
    type: { headline: "Rajdhani", headlineFallback: "Arial, sans-serif", body: "Inter", bodyFallback: "Arial, sans-serif", headlineTransform: "uppercase" },
    logoDirection: "Forward chevron / spear-tip mark driving right. Angular and kinetic; chevron repeats as a momentum motif.",
    pattern: "Forward chevrons and arrow fields with diagonal motion lines, single-color.",
    photography: "Determined, forward-leaning people; dynamic angles; high contrast; sense of motion. Protagonists, not victims.",
    channels: [
      { channel: "Paid search", role: "Primary", use: "Bottom-funnel just-sued capture; court-deadline urgency." },
      { channel: "Paid social", role: "Anger-hook demand", use: "Fight-back creative." },
    ],
  },

  "steelpoint": {
    slug: "steelpoint",
    name: "Steelpoint Law",
    domain: "steelpointlaw.com",
    parent: "Guardian Litigation Group",
    family: "empowerment",
    funnel: "bottom",
    oneLiner: "The precision brand — sharp, hard, exact under pressure.",
    mission:
      "Give financially pressured people the sharpest defense against creditors — precise, disciplined, attorney-led representation.",
    positioning:
      "For people who want the toughest, most precise defense against collectors, Steelpoint Law is built on precision under pressure — disciplined, attorney-led strategy that cuts through creditor tactics where bluster fails.",
    audience: "Consumers facing lawsuits or serious collections who want competence and edge; often higher-balance or higher-income-but-squeezed.",
    mindset: "“Get me the sharpest representation — no fumbling.”",
    triggers: ["Sued or facing judgment", "High-balance debt", "Wants the strongest firm", "Distrusts soft 'settlement' shops", "Values competence"],
    taglinePrimary: "Sharp where it counts.",
    taglinesSecondary: ["Precision under pressure.", "The point that won't bend.", "Built to cut through."],
    pillars: [
      { title: "Surgical defense", meaning: "Precise, disciplined litigation — no wasted motion.", proof: "Targeted motion practice and hard negotiation aimed at the weak point in the claim." },
      { title: "Strength over bluster", meaning: "Competence and edge where noise and intimidation fail.", proof: "Licensed litigators who cut through collector tactics with strategy, not theatrics." },
      { title: "Premium representation", meaning: "The sharpest defense for higher-balance, higher-stakes files.", proof: "Senior attorney attention and a controlled, deliberate case strategy." },
    ],
    voiceWeAre: ["Precise", "Disciplined", "Premium", "Tough", "Controlled"],
    voiceWeAreNot: ["Sloppy", "Soft", "Bluster", "Generic"],
    color: { primary: "#1C2329", dark: "#1C2329", accent: "#25B6C4", supporting: "#BFC6CC", light: "#F6F7F8" },
    type: { headline: "Saira", headlineFallback: "Arial, sans-serif", body: "IBM Plex Sans", bodyFallback: "Arial, sans-serif", headlineTransform: "uppercase" },
    logoDirection: "Faceted steel 'point' mark — sharp geometric blade or diamond tip. Cold and precise; faceted motif repeats with tight geometry.",
    pattern: "Faceted angular facets and precise grid lines in a metallic single tone.",
    photography: "Sharp, high-contrast, architectural imagery; close detail; cool steel tones; minimal and premium.",
    channels: [
      { channel: "Paid search", role: "Primary", use: "Quality/strength queries; higher case value." },
      { channel: "Retargeting", role: "Convert", use: "Premium, precision-led creative." },
    ],
  },

  "rally-point": {
    slug: "rally-point",
    name: "Rally Point Law",
    domain: "rallypointlaw.com",
    parent: "Guardian Litigation Group",
    family: "peace",
    funnel: "mid",
    oneLiner: "The veterans brand — regroup, recover, and move forward with a firm that gets service.",
    mission:
      "Help veterans regroup from debt and move forward — with respectful, attorney-led representation from a firm that understands military life.",
    positioning:
      "For veterans carrying debt after service, Rally Point Law is the debt-relief and defense firm that helps you regroup and recover — because real attorneys who respect your service handle the collectors, defend the lawsuits, and give you a clear plan forward.",
    audience:
      "Veterans (and often their spouses) carrying unsecured debt — frequently after transition out of service, a medical or disability event, or a stretch of instability. Proud and self-reliant, reluctant to ask for help, and wary of anything that looks like a scam aimed at vets.",
    mindset: "“I don't ask for help easily — but I need to regroup.”",
    triggers: [
      "Financial strain after transition / separation",
      "Relentless collector calls and letters",
      "Medical or disability-related debt",
      "A lawsuit or wage-garnishment threat",
      "Distrust of predatory 'veteran' debt offers",
    ],
    taglinePrimary: "Regroup. Recover. Advance.",
    taglinesSecondary: ["You had our back. Now we've got yours.", "Find your rally point.", "Get your unit behind you."],
    pillars: [
      { title: "Served by people who get it", meaning: "A firm built to respect military life and how veterans actually got here.", proof: "Intake and counsel that understand transition, disability, and service-related financial strain." },
      { title: "Regroup with a plan", meaning: "A clear, attorney-led route back into formation.", proof: "Step-by-step roadmap; attorney handles creditor contact and lawsuit defense." },
      { title: "Not a scam that targets vets", meaning: "A real law firm — not a predatory 'veteran benefit' pitch.", proof: "Licensed attorneys, transparent process, and no government-affiliation claims." },
    ],
    voiceWeAre: ["Respectful", "Grounded", "Straight-talking", "Dependable", "Squared-away"],
    voiceWeAreNot: ["Pandering", "Saccharine", "Performative-patriotic", "Condescending", "Slick"],
    color: { primary: "#4B5840", dark: "#20261C", accent: "#D6A43C", supporting: "#9C9176", light: "#F1ECDF" },
    type: { headline: "Barlow Semi Condensed", headlineFallback: "Arial, sans-serif", body: "Barlow", bodyFallback: "Calibri, sans-serif", headlineTransform: "none" },
    logoDirection: "Waypoint mark — converging chevrons meeting at a single point (the unit rallying), reading equally as 'regroup here' and a forward bearing. Field Olive with a Reveille Gold accent; optional dawn-horizon line beneath.",
    pattern: "Map coordinate grid and converging route lines with a marked waypoint, single-tone olive.",
    photography: "Real veterans across eras, branches, and ages — and their families — dignified, warm, and grounded. A vet with family at the kitchen table, a handshake with counsel, a vet outdoors at first light looking forward. No combat imagery, no dress-uniform pathos, no flags draped for effect, no saluting clichés.",
    channels: [
      { channel: "Paid social", role: "Affinity demand-gen", use: "Veteran-targeted creative; “you had our back” hook — top of funnel." },
      { channel: "Paid search", role: "Intent capture", use: "“veteran debt help”, “debt lawyer for veterans”, “stop collector calls”." },
      { channel: "Community / partnerships", role: "Trust & authority", use: "Veteran communities, podcasts, and forums — affinity, no implied government affiliation." },
      { channel: "Email nurture", role: "Convert considerers", use: "Regroup-roadmap drip sequence." },
    ],
  },
};

export const brandList = Object.values(brands);
export const byFunnel = (f: FunnelRole) => brandList.filter((b) => b.funnel === f);
