import React, { useState, useEffect, useRef } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer,
} from "recharts";

/* =========================================================================
   ANURAG // OS  —  Fortune 100 UX Leadership Command Center
   A single-page executive transformation platform for Anurag Challapalli.
   Dark executive · strategic blue / teal / gold · glassmorphism.
   ========================================================================= */

/* ----------------------------- DATA LAYER ------------------------------- */

const NAV = [
  ["profile", "Profile"],
  ["gap", "Skill Gap"],
  ["roadmap", "Roadmap"],
  ["academy", "Academy"],
  ["library", "Library"],
  ["lifecycle", "Lifecycle"],
  ["domains", "Domains"],
  ["portfolio", "Portfolio"],
  ["resume", "Resume"],
  ["arena", "Interview Arena"],
  ["sector-interview", "Sector Prep"],
  ["storytelling", "Storytelling"],
  ["ai", "UX × AI"],
  ["plan", "90 Days"],
  ["quiz", "Assessment"],
];

const STATS = [
  { value: 16, suffix: "+", label: "Years across the full product stack" },
  { value: 25, suffix: "%", label: "Conversion lift — Trusana platform" },
  { value: 35, suffix: "%", label: "Faster task completion — ATS / PS&D" },
  { value: 10, suffix: "+", label: "Product surfaces on one design system" },
];

const MATURITY = [
  { k: "Senior UX Leader", s: "Today's baseline" },
  { k: "Enterprise UX Architect", s: "Current operating level" },
  { k: "Principal UX Architect", s: "12-month target" },
  { k: "Fortune 100 UX Director", s: "North star" },
];

const RADAR = [
  { dim: "Product Strategy", score: 78, target: 92 },
  { dim: "UX Research", score: 85, target: 90 },
  { dim: "UX Architecture", score: 88, target: 93 },
  { dim: "Design Systems", score: 90, target: 92 },
  { dim: "Visual Design", score: 92, target: 90 },
  { dim: "Front-End", score: 80, target: 74 },
  { dim: "AI Workflows", score: 72, target: 92 },
  { dim: "Accessibility", score: 86, target: 84 },
  { dim: "Exec Comms", score: 64, target: 93 },
  { dim: "Business Impact", score: 70, target: 92 },
];

const GAPS = [
  { cap: "Product Strategy", role: "Principal UX Architect · UX Director", now: "Advanced", req: "Executive", gap: "Medium", level: 78,
    action: "Tie portfolio cases to revenue, retention and efficiency. Author a PRD, product thesis and OKR tree.",
    proof: "One product strategy teardown plus a measurable UX roadmap decision.",
    interview: "Defend what you chose not to build and which OKR it protected." },
  { cap: "UX Research", role: "Experience Design Director", now: "Advanced", req: "Executive", gap: "Medium", level: 85,
    action: "Add mixed-method research storytelling, longitudinal insight loops and decision traceability.",
    proof: "Research program case showing signal, synthesis, decision and shipped result.",
    interview: "Explain how research changed strategy, not only screens." },
  { cap: "Design Systems", role: "Enterprise Design Systems Director", now: "Advanced", req: "Executive", gap: "Low", level: 90,
    action: "Layer governance, adoption metrics, contribution model and ROI on top of the system build.",
    proof: "Design-system operating model with adoption dashboard and ROI estimate.",
    interview: "Move past components into scale, governance, quality gates and cycle time." },
  { cap: "AI + UX", role: "AI Product Experience Leader", now: "Emerging / Advanced", req: "Strategic", gap: "Medium", level: 72,
    action: "Ship AI-native UX transformation case studies: copilots, human-in-the-loop flows and evaluation criteria.",
    proof: "Healthcare or enterprise AI copilot concept with trust, safety and metrics.",
    interview: "Show how you design AI products, not only how you use AI tools." },
  { cap: "Executive Storytelling", role: "UX Director · Bar Raiser", now: "Growing", req: "Boardroom", gap: "High", level: 60,
    action: "Drill VP-level narratives; convert every metric into a crisp business story.",
    proof: "Five-slide executive portfolio deck: problem, decision, trade-off, outcome, next bet.",
    interview: "Answer in business altitude first, then design detail." },
  { cap: "Business Impact Framing", role: "Director of Product Design", now: "Growing", req: "Executive", gap: "High", level: 64,
    action: "Build a metrics dashboard linking design work to P&L, operational efficiency and adoption.",
    proof: "Impact model connecting conversion, cycle time, task success and support deflection.",
    interview: "Quantify the business cost of bad UX and the value of your intervention." },
  { cap: "UX Architecture at Scale", role: "Principal UX Architect", now: "Advanced", req: "Principal", gap: "Low", level: 88,
    action: "Document cross-platform experience strategy across 10+ surfaces and legacy constraints.",
    proof: "Experience architecture map with services, journeys, components and governance.",
    interview: "Show how you simplify complexity without flattening domain nuance." },
  { cap: "Org Influence / Stakeholders", role: "Digital Transformation UX Leader", now: "Growing", req: "Director", gap: "Medium", level: 66,
    action: "Practice influence-without-authority, conflict resolution and executive stakeholder alignment plays.",
    proof: "Stakeholder map, decision log and escalation-free alignment story.",
    interview: "Describe a conflict where you changed minds by reframing the goal." },
];

const ROADMAP = [
  { t: "Strengthen the Foundation", tag: "Level 1",
    items: ["Advanced UX strategy", "Business model thinking", "Product discovery & JTBD",
      "Research synthesis", "Information architecture", "Service design", "Enterprise UX patterns"] },
  { t: "Become Principal-Level", tag: "Level 2",
    items: ["UX architecture at scale", "Enterprise design governance", "Multi-product design systems",
      "Cross-platform experience strategy", "Influence without authority", "OKRs / KPIs & metrics-driven UX",
      "Design maturity models"] },
  { t: "Become Director-Level", tag: "Level 3",
    items: ["Hiring & mentoring teams", "Design operations", "Portfolio strategy", "Stakeholder management",
      "Executive communication", "Budget & resource planning", "Org operating models", "Vision setting"] },
  { t: "Become AI-Future-Ready", tag: "Level 4",
    items: ["AI-assisted UX research", "AI-native product design", "Human–AI interaction patterns",
      "Ethical AI & governance", "Conversational UX", "Personalization engines", "AI-powered design systems"] },
];

const ACADEMY = [
  { track: "Product Strategy Studio", level: "Foundation → Principal", cadence: "3 sessions / week",
    modules: ["Business model teardown", "North-star metric design", "OKR tree writing", "Product discovery rituals"],
    output: "A Fortune 100-style product strategy memo for one healthcare or enterprise platform." },
  { track: "Research Leadership Lab", level: "Advanced → Executive", cadence: "2 sessions / week",
    modules: ["Mixed-method research", "Insight storytelling", "Research ops", "Decision traceability"],
    output: "A research-to-roadmap narrative that proves how insight changed investment decisions." },
  { track: "Enterprise UX Architecture", level: "Principal", cadence: "2 sessions / week",
    modules: ["Experience maps", "Service blueprints", "Information architecture", "Governance at scale"],
    output: "A cross-product architecture map for a complex enterprise ecosystem." },
  { track: "Design Systems Executive Practice", level: "Director", cadence: "1 deep dive / week",
    modules: ["Token strategy", "Contribution model", "Adoption metrics", "System ROI"],
    output: "A design-system business case that a VP can fund." },
  { track: "AI Experience Strategy", level: "Future-ready", cadence: "2 experiments / week",
    modules: ["Copilot UX", "Human-in-the-loop design", "AI trust patterns", "Evaluation metrics"],
    output: "An AI-native UX case study that turns AI fluency into leadership credibility." },
  { track: "Executive Communication Gym", level: "Boardroom", cadence: "15 minutes / day",
    modules: ["One-slide narratives", "VP Q&A", "Trade-off defense", "Career positioning"],
    output: "A crisp leadership story that makes your scope feel inevitable." },
];

const LIFECYCLE = [
  {
    stage: "01 · Opportunity Framing",
    pdlc: "Product vision, business problem, market context and success definition.",
    ux: "Understand users, jobs, journeys, pain points and behavioral evidence before solutioning.",
    curriculum: ["Business model canvas", "Product vision writing", "JTBD", "Market and competitor scan", "North-star metric selection"],
    best: ["Define the problem in business and human terms", "Separate symptoms from root causes", "Write measurable success criteria before ideation"],
    roadblocks: ["Stakeholders arrive with a pre-decided solution", "Problem is too broad", "Metrics are vanity metrics"],
    strategies: ["Run a framing workshop", "Use a one-page opportunity brief", "Ask what decision this work must enable"],
    deliverables: ["Opportunity brief", "Assumption map", "North-star metric", "Problem statement"],
    interview: ["How do you identify the right problem to solve?", "How do you connect UX work to business strategy?", "Tell me about a time you pushed back on a proposed solution."],
  },
  {
    stage: "02 · Discovery Research",
    pdlc: "Validate demand, risk, user segments, constraints and product-market assumptions.",
    ux: "Use qualitative and quantitative research to reveal needs, motivations and decision moments.",
    curriculum: ["Research planning", "User interviews", "Survey design", "Analytics review", "Heuristic evaluation", "Competitive UX teardown"],
    best: ["Recruit across key segments", "Triangulate interviews with behavioral data", "Document confidence level for each insight"],
    roadblocks: ["Low access to users", "Biased stakeholder interpretation", "Research gets treated as a checkbox"],
    strategies: ["Use proxy data when user access is blocked", "Create an insight-to-decision matrix", "Share clips and quotes carefully"],
    deliverables: ["Research plan", "Interview guide", "Insight themes", "Persona or archetype", "Journey map"],
    interview: ["How do you choose the right research method?", "How do you synthesize messy research?", "How did research change a product decision?"],
  },
  {
    stage: "03 · Product Strategy & Prioritization",
    pdlc: "Translate discovery into product bets, roadmap choices, OKRs and trade-offs.",
    ux: "Prioritize experience improvements by user value, business value, risk and feasibility.",
    curriculum: ["OKRs", "RICE / ICE scoring", "Product principles", "Roadmap influence", "MVP definition", "Trade-off narratives"],
    best: ["Tie every priority to an OKR", "Make trade-offs explicit", "Use evidence, not volume, to resolve stakeholder pressure"],
    roadblocks: ["Everything is priority one", "Feature requests replace outcomes", "Stakeholders optimize locally"],
    strategies: ["Use decision principles", "Score opportunities transparently", "Frame cuts as protection of strategic focus"],
    deliverables: ["Prioritization matrix", "OKR tree", "Product strategy memo", "MVP scope"],
    interview: ["How do you decide what not to build?", "How do you influence roadmap as a designer?", "Tell me about a difficult prioritization decision."],
  },
  {
    stage: "04 · Experience Architecture",
    pdlc: "Define the product structure, service flow, platform relationships and system dependencies.",
    ux: "Design information architecture, task flows, service blueprints and cross-channel journeys.",
    curriculum: ["Information architecture", "Task flow modeling", "Service blueprinting", "Content hierarchy", "Cross-platform ecosystem mapping"],
    best: ["Map the end-to-end journey before screens", "Design for edge cases and handoffs", "Name reusable patterns early"],
    roadblocks: ["Legacy systems constrain the ideal journey", "Teams own fragments of the experience", "Architecture is hidden inside UI files"],
    strategies: ["Create ecosystem maps", "Run alignment reviews with engineering", "Use service blueprints to expose backstage dependencies"],
    deliverables: ["IA map", "Journey map", "Service blueprint", "Experience principles", "Task flow library"],
    interview: ["How do you approach UX architecture at enterprise scale?", "How do you simplify complex workflows?", "How do you handle cross-product consistency?"],
  },
  {
    stage: "05 · Ideation & Concept Design",
    pdlc: "Generate solution options, test strategic directions and select promising product concepts.",
    ux: "Explore interaction models, flows, content, states and conceptual prototypes.",
    curriculum: ["Design studios", "Crazy 8s", "Concept testing", "Interaction patterns", "Content-first wireframing"],
    best: ["Explore multiple directions before converging", "Keep concepts tied to hypotheses", "Invite engineering early for feasibility signals"],
    roadblocks: ["Teams jump to polished UI too soon", "One loud opinion kills exploration", "Concepts are not tied to testable hypotheses"],
    strategies: ["Set divergence and convergence timeboxes", "Use hypothesis cards", "Separate critique from decision-making"],
    deliverables: ["Concept boards", "Low-fidelity flows", "Hypothesis backlog", "Decision log"],
    interview: ["How do you facilitate ideation?", "How do you evaluate competing concepts?", "How do you prevent design from becoming opinion-driven?"],
  },
  {
    stage: "06 · Interaction & Visual Design",
    pdlc: "Turn selected concepts into usable, accessible, branded and technically feasible product experiences.",
    ux: "Create wireframes, prototypes, interaction states, responsive behavior, content and UI specifications.",
    curriculum: ["Interaction design", "Visual hierarchy", "Responsive design", "Accessibility patterns", "Error states", "Microcopy"],
    best: ["Design full states, not happy paths", "Use system components where possible", "Check accessibility before handoff"],
    roadblocks: ["Incomplete states", "Design system gaps", "Accessibility gets deferred", "UI polish hides workflow problems"],
    strategies: ["Use a state checklist", "Document component gaps", "Run design QA before development starts"],
    deliverables: ["High-fidelity prototype", "Interaction specs", "Accessibility annotations", "Responsive layouts", "State matrix"],
    interview: ["How do you balance usability and visual craft?", "How do you design for accessibility?", "Walk me through your interaction design process."],
  },
  {
    stage: "07 · Validation & Usability Testing",
    pdlc: "Reduce product risk before build by testing comprehension, usability, value and readiness.",
    ux: "Run usability tests, prototype studies, accessibility checks and design experiments.",
    curriculum: ["Usability testing", "A/B testing basics", "Prototype evaluation", "Accessibility review", "Research synthesis"],
    best: ["Test the riskiest assumptions first", "Capture both task success and why", "Prioritize fixes by severity and business impact"],
    roadblocks: ["Testing happens too late", "Teams ignore inconvenient findings", "Sample size debates block action"],
    strategies: ["Run lightweight tests every sprint", "Use severity ratings", "Map findings to product risks"],
    deliverables: ["Test plan", "Usability report", "Severity matrix", "Iteration backlog"],
    interview: ["How do you know a design is ready?", "How do you handle negative usability findings?", "What metrics do you use in usability testing?"],
  },
  {
    stage: "08 · Build Partnership & Delivery",
    pdlc: "Partner with engineering and product to ship with quality, speed and measurable intent.",
    ux: "Support handoff, design QA, component usage, implementation decisions and release readiness.",
    curriculum: ["Design handoff", "Front-end collaboration", "Design QA", "Agile rituals", "Acceptance criteria", "Component governance"],
    best: ["Write UX acceptance criteria", "Stay close during implementation", "Resolve trade-offs with product and engineering together"],
    roadblocks: ["Design loses fidelity in build", "Engineering discovers late complexity", "Acceptance criteria ignore UX quality"],
    strategies: ["Create build-ready specs", "Use pairing reviews", "Maintain a decision log for compromises"],
    deliverables: ["Handoff package", "UX acceptance criteria", "QA checklist", "Component usage notes"],
    interview: ["How do you work with engineering?", "Tell me about a design compromise you made.", "How do you ensure shipped quality?"],
  },
  {
    stage: "09 · Launch, Measurement & Iteration",
    pdlc: "Launch, monitor adoption, learn from data and continue improving the product.",
    ux: "Measure task success, conversion, adoption, satisfaction, support load and behavioral outcomes.",
    curriculum: ["Product analytics", "Experiment design", "Post-launch measurement", "Feedback loops", "Continuous discovery"],
    best: ["Define launch metrics before release", "Separate adoption, usability and business metrics", "Turn data into the next product question"],
    roadblocks: ["No baseline", "Metrics are owned by another team", "Launch is treated as the finish line"],
    strategies: ["Create a measurement plan early", "Partner with analytics", "Run post-launch review rituals"],
    deliverables: ["Measurement plan", "Launch dashboard", "Learning report", "Iteration roadmap"],
    interview: ["How do you measure UX success?", "What do you do after launch?", "How have you used data to improve a product?"],
  },
  {
    stage: "10 · Scale, Governance & Transformation",
    pdlc: "Scale the product, operating model, design system and cross-team practices.",
    ux: "Create governance, design standards, reusable patterns, maturity models and transformation rituals.",
    curriculum: ["Design systems governance", "DesignOps", "Maturity models", "Change management", "Executive storytelling", "AI-enabled operating models"],
    best: ["Measure adoption and quality", "Define contribution rules", "Use governance to increase speed, not bureaucracy"],
    roadblocks: ["Teams resist standards", "Design system becomes a component shelf", "Executives do not see ROI"],
    strategies: ["Publish adoption metrics", "Create office hours and contribution paths", "Connect governance to cycle time and quality"],
    deliverables: ["Governance model", "Design maturity scorecard", "ROI narrative", "Operating model"],
    interview: ["How do you scale design quality?", "How do you measure a design system?", "How do you lead transformation without authority?"],
  },
];

const DOMAINS = {
  Healthcare: {
    ctx: "Patient + provider experiences under HIPAA, Medicare/Medicaid and high-trust constraints.",
    challenges: ["Digital front door & care navigation", "EHR integration friction", "Provider workflow load", "Accessibility & equity of access", "Clinical compliance and trust"],
    metrics: ["Conversion / enrollment", "Task success", "Contact-center deflection", "FCR · NPS", "Access cycle time"],
    cases: ["Digital front door transformation", "Trusana conversion lift (your own 25%)", "AI triage / care copilot", "HIPAA-compliant scheduling engine"],
    ai: "AI triage, care navigation copilots, AI-assisted prior-auth, clinical summary generation, accessibility auto-testing.",
  },
  "E-Commerce": {
    ctx: "Conversion-driven, experiment-heavy surfaces where milliseconds and trust move revenue.",
    challenges: ["Search & discovery", "Checkout friction", "Personalization at scale", "Loyalty & retention", "Dynamic cart updates"],
    metrics: ["Conversion rate", "AOV (Average Order Value)", "Cart abandonment rate", "LTV / repeat rate", "Search success rate"],
    cases: ["Checkout flow redesign", "Personalized discovery engine", "AI shopping assistant", "Post-purchase loyalty loops"],
    ai: "AI shopping assistants, semantic search, dynamic personalization, generative merchandising, predictive cart bundles.",
  },
  "Tourism & Hospitality": {
    ctx: "Inspiration-to-booking journeys across many languages, currencies, devices, and trust signals.",
    challenges: ["Booking flow clarity", "Multi-language UX parity", "Reviews & trust architecture", "Dynamic pricing clarity", "Contextual travel planning"],
    metrics: ["Look-to-book ratio", "Booking completion rate", "Repeat bookings", "Review submission rate", "Search filter usage"],
    cases: ["Hotel discovery → booking (your startup roots)", "Itinerary planner", "AI trip concierge", "Multi-currency checkout system"],
    ai: "AI itinerary planners, conversational booking, dynamic bundling, multilingual support, hyper-local recommendations.",
  },
  Finance: {
    ctx: "Trust, security and risk communication for high-stakes money decisions.",
    challenges: ["Risk communication", "Payments & security authentication", "Wealth dashboards", "Financial literacy", "Drop-off during complex KYC"],
    metrics: ["Activation rate", "Funded accounts", "Drop-off at KYC", "Support contact rate", "Transfer success rate"],
    cases: ["Wealth dashboard redesign", "KYC onboarding flow", "AI financial copilot", "Risk warning modernization"],
    ai: "AI financial copilots, fraud-signal surfacing, explainable risk, personalized literacy nudges, automatic budgeting advice.",
  },
  Telecom: {
    ctx: "High-volume self-service across complex plans, billing, and network support.",
    challenges: ["Plan comparison clarity", "Billing transparency", "Network issue resolution", "Omnichannel handoff", "Prepaid-to-postpaid flows"],
    metrics: ["Self-service rate", "Support deflection", "Churn rate", "Bill-shock complaints", "Plan upgrade rate"],
    cases: ["Plan comparison redesign", "Self-service billing", "AI support deflection bot", "Network troubleshooter dashboard"],
    ai: "AI support bots, proactive outage comms, guided troubleshooting, churn-risk surfacing, conversational billing helpers.",
  },
  "Digital Transformation": {
    ctx: "Legacy modernization and enterprise workflow redesign with adoption as the real KPI.",
    challenges: ["Legacy modernization", "Change management & learning curve", "Internal tooling load", "Workflow fragmentation", "Data entry efficiency"],
    metrics: ["Adoption rate", "Cycle-time reduction", "Error rate", "Operational efficiency", "User satisfaction (SUS)"],
    cases: ["ATS / PS&D workflow redesign (your 35%)", "Service blueprint", "AI workflow automation", "Legacy database modernization"],
    ai: "AI workflow automation, decision intelligence, predictive ops, internal copilots, automated document ingestion.",
  },
  "Product-Based / SaaS": {
    ctx: "High-retention B2B products where activation, adoption and admin trust drive growth.",
    challenges: ["Enterprise onboarding", "Permission complexity", "Feature discoverability", "Analytics clarity", "Admin-facing controls"],
    metrics: ["Activation rate", "Time to value (TTV)", "Seat expansion", "Retention rate", "NPS"],
    cases: ["Admin console simplification", "Role-based onboarding", "AI workflow copilot", "Product growth loops"],
    ai: "AI onboarding assistants, workflow recommendations, analytics summaries, automated task support, predictive text actions.",
  },
  "Service-Based Companies": {
    ctx: "Client management, consulting storytelling, and delivery excellence across multi-stakeholder engagements.",
    challenges: ["Client relationship management", "Consulting storytelling", "Delivery quality at scale", "Stakeholder alignment", "Proposal & RFP design", "Account expansion strategy", "UX maturity consulting"],
    metrics: ["Account growth", "Client NPS", "RFP win rate", "On-time delivery", "UX maturity score"],
    cases: ["Enterprise client UX transformation", "Multi-stakeholder alignment workshop", "UX maturity consulting framework"],
    ai: "AI proposal generation, client sentiment analysis, design review summarization, workshop facilitation assistants.",
  },
  "Automobile & Physical Product": {
    ctx: "Connected mobility, dealer journeys, service ownership and in-vehicle digital ecosystems.",
    challenges: ["Vehicle configuration & discovery", "Finance and trade-in clarity", "Service booking integration", "Connected app onboarding", "Safety-critical HMI design", "EV charging journeys", "AI voice assistants in vehicles"],
    metrics: ["Lead quality", "Test-drive booking rate", "Service retention", "App activation", "Task distraction time"],
    cases: ["Connected car onboarding", "Dealer-to-digital purchase flow", "AI service advisor", "EV charging journey redesign"],
    ai: "AI configuration assistants, predictive maintenance, connected-service copilots, voice UX, in-vehicle personalization.",
  }
};

const LIBRARY = [
  {
    title: "UX Strategy: How to Devise Blueprints for Digital Products",
    category: "UX Strategy",
    type: "Books",
    why: "Teaches how to align business strategy, user research, and product design into a cohesive product roadmap.",
    learn: "Value proposition design, competitive analysis matrix, validated user research loops, and strategic positioning.",
    time: "12 hours",
    level: "Intermediate",
    useCase: "Product Strategy round or portfolio setup where you must link business values to UI requirements.",
    assignment: "Select a legacy digital front door service and write a 2-page product strategy brief outlining the business value proposition."
  },
  {
    title: "Inspired: How to Create Tech Products Customers Love",
    category: "Product Management",
    type: "Books",
    why: "Bridges the gap between design processes and PM execution metrics (revenue, scale, engineering limits).",
    learn: "Product discovery rituals, opportunity assessment, RICE scoring, product risk types, and product-led growth loops.",
    time: "10 hours",
    level: "Advanced",
    useCase: "Product strategy and trade-off questions (answering what to build and why).",
    assignment: "Develop a RICE scoring matrix for three competing feature concepts for Trusana mental health platform conversion optimization."
  },
  {
    title: "Org Design for Design Orgs: Building and Managing In-House Teams",
    category: "Design Leadership",
    type: "Books",
    why: "Shows how to scale design operations, set career development frameworks, and structure design divisions.",
    learn: "Design team topologies, career pathing (IC vs. manager), hiring rubrics, and organizational design maturity models.",
    time: "8 hours",
    level: "Executive",
    useCase: "Design leadership rounds, handling team growth, or setting up a center of excellence.",
    assignment: "Draft a 1-page operating model outlining how design systems co-exist with product delivery squads across 10+ surfaces."
  },
  {
    title: "Mixed Methods: Triangulating Qualitative Insights with Quantitative Analytics",
    category: "UX Research",
    type: "Research papers",
    why: "Enables designers to present bulletproof arguments to VPs backed by both user sentiments and behavioral data.",
    learn: "Longitudinal study design, task analysis metrics, survey design, and linking analytics funnel drop-offs with usability findings.",
    time: "6 hours",
    level: "Advanced",
    useCase: "Hiring Manager and UX Research rounds where you must justify design changes using mixed methods.",
    assignment: "Write a research synthesis brief that maps user interface drop-off data in Trusana to 5 qualitative user quotes."
  },
  {
    title: "Service Blueprinting: Mapping Backstage Operations to Frontstage Journeys",
    category: "Service Design",
    type: "Frameworks",
    why: "Crucial for enterprise architects handling complex back-office tools and legacy systems.",
    learn: "Frontstage user steps, backstage employee actions, support processes, line of visibility, and technology touchpoints.",
    time: "4 hours",
    level: "Advanced",
    useCase: "Digital Transformation cases and workflow optimization questions (like the ATS/PS&D workflow redesign).",
    assignment: "Create a draft service blueprint layout for a patient booking a telemedicine consult, showing EHR syncing backstage."
  },
  {
    title: "Design Systems ROI: Quantifying Efficiency, Quality, and Adoption Metrics",
    category: "Design Systems",
    type: "Design system references",
    why: "Helps you defend a design system budget by showing concrete savings in design-to-development cycle times.",
    learn: "Token governance, component contribution models, dev cycle time metrics, and calculating design system ROI.",
    time: "5 hours",
    level: "Executive",
    useCase: "Design Systems round, justifying design operations investments to CFO/CIO stakeholders.",
    assignment: "Draft an ROI projection model demonstrating how standardizing 10+ surfaces saves 30% in development cycle time."
  },
  {
    title: "WCAG 2.2 AA Modernization for Enterprise Ecosystems",
    category: "Accessibility",
    type: "Frameworks",
    why: "Ensures legal compliance, equity of access, and embeds accessibility directly in the design tokens.",
    learn: "Keyboard accessibility, screen reader testing, semantic HTML structures, and accessibility-first annotations.",
    time: "7 hours",
    level: "Advanced",
    useCase: "Portfolio reviews and accessibility audit rounds in regulated industries like health or finance.",
    assignment: "Audit a checkout form and annotate it for contrast, tab order, ARIA labels, and error message accessibility."
  },
  {
    title: "Designing AI-Native Products: Copilots, Trust, and Evaluation Patterns",
    category: "AI in UX",
    type: "AI + UX resources",
    why: "Moves your profile from 'using AI tools' to 'architecting the AI user experience'.",
    learn: "Human-AI interaction guidelines, designing trust levels, graceful system failure patterns, and evaluation frameworks.",
    time: "8 hours",
    level: "Advanced",
    useCase: "AI Product Experience Leader and future-ready portfolio case studies.",
    assignment: "Design the error state and correction flow for a healthcare AI care copilot that incorrectly classifies a patient symptom."
  },
  {
    title: "Leading Legacy Modernization: Redesigning complex workflows without breaking systems",
    category: "Enterprise Transformation",
    type: "Case studies",
    why: "Provides a playbook for upgrading complex mainframe systems, billing setups, and high-frequency internal databases.",
    learn: "Incremental release strategies, strangler fig patterns, legacy data migration UX, and managing change resistance.",
    time: "9 hours",
    level: "Advanced",
    useCase: "Digital Transformation and SaaS leadership interviews.",
    assignment: "Write a change management memo for an enterprise transition from a legacy ATS to a modern SaaS database."
  },
  {
    title: "The Boardroom Pitch: Speaking in Business Outcomes, not Figma Files",
    category: "Executive Communication",
    type: "YouTube lectures",
    why: "Essential for Vice President/Director interviews where design jargon fails and strategic value is everything.",
    learn: "The Pyramid Principle, structured executive summaries, conversion rate metrics, and talking about product risk.",
    time: "3 hours",
    level: "Executive",
    useCase: "Executive panel, Bar Raiser round, and VP portfolio defenses.",
    assignment: "Re-frame your best portfolio case study into a 5-slide narrative: Context, Metric Target, Risk, Design Bet, Shipped ROI."
  },
  {
    title: "Case Study Storytelling for Design Directors and Architects",
    category: "Portfolio Storytelling",
    type: "Articles",
    why: "Ensures your portfolio reads like an executive recap of business decisions rather than a step-by-step school project.",
    learn: "Before/after comparative formats, connecting research insights to the final metric outcome, and explaining constraints.",
    time: "4 hours",
    level: "Executive",
    useCase: "Portfolio review and recruiter alignment sessions.",
    assignment: "Write a 300-word executive summary for the Trusana conversion case study, focusing on the 25% lift."
  }
];

const ROUNDS = [
  { r: "Recruiter Screen", tests: "Positioning, level fit, comp alignment, motivation.",
    how: "Lead with the rare full-stack frame; anchor to one quantified win; keep it 90 seconds.",
    q: "Walk me through your background.",
    star: "S/T: Providence needed enterprise UX across 10+ surfaces. A: Architected a tokenized design system + WCAG 2.2 AA. R: 60% fewer inconsistencies, 35% faster task completion." },
  { r: "Hiring Manager", tests: "Ownership, scope of impact, how you think about product.",
    how: "Show end-to-end ownership: strategy → research → design → code → outcome.",
    q: "Tell me about a product you owned end to end.",
    star: "Trusana: research → UI → front-end implementation → 25% conversion lift, tied to patient engagement and revenue." },
  { r: "Portfolio Review", tests: "Depth, decision quality, business framing of design.",
    how: "Narrate problem → constraint → decision → metric. One case in depth beats five shallow.",
    q: "Show the work you're proudest of and why.",
    star: "Frame the digital-front-door case as access → deflection → completion, each tied to a number." },
  { r: "Whiteboard / App Critique", tests: "Structured thinking, prioritization, trade-offs live.",
    how: "Clarify users & goal → map journey → prioritize (RICE) → sketch → state metrics.",
    q: "Redesign the digital front door for a system serving millions of patients.",
    star: "Patient journey → access → scheduling → EHR → AI triage → accessibility → measure conversion + FCR." },
  { r: "Product Strategy", tests: "Business model literacy, OKRs, prioritization rigor.",
    how: "Connect UX moves to revenue, retention and efficiency; speak in OKRs.",
    q: "How do you decide what NOT to build?",
    star: "Tie a RICE/ICE call to an OKR; show one thing you cut and the metric it protected." },
  { r: "UX Research", tests: "Method rigor, synthesis, turning insight into decisions.",
    how: "Mixed-method by design; show the path from raw signal to a shipped decision.",
    q: "Describe a research program you built from scratch.",
    star: "Interviews + usability + heuristic eval → reduced regulatory enrollment friction at Providence." },
  { r: "Design Systems", tests: "Scale, governance, adoption, ROI.",
    how: "Move past components to governance, tokens, adoption metrics and a system ROI model.",
    q: "How do you measure a design system's success?",
    star: "10+ surfaces, 60% fewer inconsistencies, 30% shorter design-to-dev cycles via tokens you could also build." },
  { r: "Leadership", tests: "Influence, mentoring, conflict, vision.",
    how: "Influence without authority; lead with critique cadences and quality gates you introduced.",
    q: "How do you raise a team's design maturity?",
    star: "Introduced review cadences, UX quality gates and cross-team critique — lifted org capability." },
  { r: "Executive / Bar Raiser", tests: "Boardroom narrative, strategic altitude, signal vs. noise.",
    how: "Compress everything into a business story; one slide, one metric, one decision.",
    q: "What's your design philosophy in one sentence?",
    star: "\"I turn business strategy, research, systems, accessibility, AI and code into one measurable outcome.\"" },
];

const AI_PHASES = [
  { p: "Phase 1", t: "AI as Productivity Layer",
    d: "Prompting, synthesis, rapid prototypes and design variations — speed without losing rigor.",
    you: "You already run this with Figma Make, Claude AI and Google Stitch." },
  { p: "Phase 2", t: "AI as Product Experience Layer",
    d: "Copilots, recommendation systems, personalization and conversational UX inside the product.",
    you: "Ship one healthcare copilot case to convert tool-use into product-design credibility." },
  { p: "Phase 3", t: "AI as Business Transformation Layer",
    d: "Workflow automation, operational efficiency, predictive insight and decision intelligence.",
    you: "Frame the ATS/PS&D efficiency story as AI-augmented workflow transformation." },
  { p: "Phase 4", t: "AI Experience Architect",
    d: "Design enterprise ecosystems where humans, data, workflows and agents collaborate.",
    you: "This is the title above Principal — own the human-in-the-loop operating model." },
];

const PLAN = [
  { w: "Weeks 1–2", t: "Executive Positioning",
    out: ["Rewrite LinkedIn headline", "Personal leadership narrative", "Role-targeted resume summary", "2-min \"tell me about yourself\""] },
  { w: "Weeks 3–4", t: "Product Strategy",
    out: ["One product strategy teardown", "OKR tree", "Product vision doc"] },
  { w: "Weeks 5–6", t: "UX Research Leadership",
    out: ["Mixed-method research plan", "Research synthesis story", "Research interview answers"] },
  { w: "Weeks 7–8", t: "Design Systems Leadership",
    out: ["Design-system ROI case study", "Governance model", "Adoption dashboard"] },
  { w: "Weeks 9–10", t: "AI + UX",
    out: ["AI design-workflow case study", "Human–AI interaction pattern library"] },
  { w: "Weeks 11–12", t: "Interview Mastery",
    out: ["Portfolio review script", "Leadership answers", "Mock interview scorecard", "Final readiness score"] },
];

const PORTFOLIO = [
  {
    case: "Healthcare Digital Front Door Transformation",
    signal: "Product Strategy & Healthcare Access Leadership",
    mustShow: ["Access journey", "Patient and provider research", "20% call deflection", "Epic / Cerner EHR integration"],
    upgrade: "Lead with the business and care-access problem before showing UI.",
    problem: "Low patient digital enrollment (40% drop-off) and high contact-center overload due to complex provider discovery and booking workflows.",
    constraints: "Legacy EHR integrations (Epic/Cerner), strict HIPAA compliance, and multi-state insurance verification rules.",
    role: "Lead Enterprise UX Architect: Spearheaded user research, cross-department scheduling alignment, and accessible UI specs.",
    research: "Conducted mixed-method research: 25 provider interviews, 1,000+ patient surveys, and search analytics funnel analysis to identify booking friction.",
    strategy: "Designed the patient access UX roadmap. Aligned engineering, clinical operations, and marketing around patient scheduling cycle-time metrics.",
    process: "Mapped the patient access journey. Created wireframes and high-fidelity responsive screens for doctor search, triage flows, and booking confirm.",
    systems: "Contributed accessible booking forms and provider card patterns to the enterprise design system, standardizing components across 10 surfaces.",
    ai: "Integrated a smart care-triage copilot matching symptom search terms to appropriate clinic types and care levels.",
    accessibility: "Led WCAG 2.2 AA audit and annotated contrast, keyboard tab index, and ARIA labels for all screen states.",
    solution: "A clean search-and-book patient portal featuring real-time insurance verification and clinical triage recommendation cards.",
    metrics: "Deflected contact-center calls by 20% and increased self-serve booking completions by 18% during pilot phase.",
    impact: "Directly lowered booking cycle time and improved care coordinator efficiency by 30%.",
    reflection: "At Director altitude, I would establish a shared dashboard linking UX completion speed to billing outcomes and provider satisfaction earlier."
  },
  {
    case: "Enterprise Design System across 10+ Surfaces",
    signal: "Director-level Systems Architecture & Governance",
    mustShow: ["10+ surfaces standardized", "Governance model", "60% inconsistency reduction", "30% faster cycles"],
    upgrade: "Reframe from component craft to enterprise operating model and ROI.",
    problem: "Product team duplication, fragmented visual styles across 10 distinct surfaces, and massive design-to-development cycle latency.",
    constraints: "Diverse frontend frameworks (React, Angular, legacy JSP) and decentralized product engineering teams with conflicting sprint schedules.",
    role: "Director of Design Systems & Architecture: Oversaw token architecture, component specs, and cross-team contribution models.",
    research: "Audited UI components across 10 platforms; logged 3,000+ unique button styles, font overrides, and redundant color definitions.",
    strategy: "Defined system roadmap and ROI modeling, highlighting cycle-time reduction targets and contribution rules to engineering VPs.",
    process: "Designed token systems in Figma and translated to JSON; built core components (forms, navigation, tables) with responsive variations.",
    systems: "Established a federated governance board and contribution pipeline to review, approve, and deploy system upgrades.",
    ai: "Leveraged automated Figma to code generators (Figma Make, Claude AI) to speed up initial draft token code by 45%.",
    accessibility: "Embedded high-contrast constraints and screen-reader accessibility rules directly inside core token properties.",
    solution: "ANURAG//DS: A cross-framework tokenized design system library containing 50+ components, complete with automated style-dictionary pipelines.",
    metrics: "Reduced design-to-dev cycles by 30% and cut platform visual inconsistencies by 60% across all 10 surfaces.",
    impact: "Saved an estimated 4,000 engineering hours in the first year, speeding up time-to-market for new features by 2.5x.",
    reflection: "I would secure dedicated engineering headcount for the system team earlier rather than relying on part-time contributions from federated squads."
  },
  {
    case: "Applicant Tracking System Workflow Redesign",
    signal: "Enterprise Workflow Efficiency & Digital Transformation",
    mustShow: ["Legacy friction map", "35% task time reduction", "40% operational gain", "Adoption strategy"],
    upgrade: "Tell it as a digital transformation story, not a redesign story.",
    problem: "Legacy recruiter console caused high cognitive load, manual data entries, and a 45-minute average job posting time.",
    constraints: "Legacy database structures, high data densities, and zero tolerance for data loss or service disruption during migrations.",
    role: "Lead Full-Stack Product Designer: Led service blueprinting, database mapping, interaction design, and CSS front-end implementation.",
    research: "Conducted contextual inquiries: shadowed 12 recruiters, logged click-paths, and did task analysis on database entries.",
    strategy: "Realigned the task-flow roadmap around task completion time and error reduction, proposing a modular tabbed workspace.",
    process: "Sketched workspace layout options; mapped complex job distribution dependencies; built interactive wireframes and prototype flows.",
    systems: "Designed a reusable datagrid system and multi-select filters, which were adopted into the broader enterprise SaaS system.",
    ai: "Introduced an AI-assisted job description generator and candidate match scoring indicator to speed up initial posting tasks.",
    accessibility: "Ensured keyboard accessibility (no keyboard traps) and screen reader support for dense table structures.",
    solution: "A high-performance workspace dashboard featuring progressive form wizards, batch actions, and unified candidate reviews.",
    metrics: "Reduced task completion time by 35% and cut manual data entry errors by 50% during testing.",
    impact: "Improved operational efficiency by 40% and raised recruiter team satisfaction scores (SUS) from 42 to 84.",
    reflection: "I would co-design the database migration schema with engineering leads earlier to prevent latency in batch candidate actions."
  },
  {
    case: "Trusana Mental Health Platform Conversion",
    signal: "Product-Led Growth (PLG) & Conversion Optimization",
    mustShow: ["25% enrollment lift", "Conversational onboarding", "HIPAA-compliance", "Patient intake trust"],
    upgrade: "Lead with the business and customer onboarding metrics before showing visual layouts.",
    problem: "High drop-off rate (50%) during patient intake and onboarding, directly impacting enrollment and active treatment numbers.",
    constraints: "High emotional sensitivity of users, strict medical intake compliance guidelines, and rapid startup delivery timelines.",
    role: "Full-Stack UX Architect: Led product strategy, user discovery, responsive prototyping, and final CSS/React build integration.",
    research: "Run user testing with patients; identified emotional friction, trust concerns, and confusing insurance terminologies during intake.",
    strategy: "Defined a PLG onboarding roadmap focused on reducing cognitive friction, clarifying care security, and shortening time-to-value.",
    process: "Created a conversational onboarding wizard, progressive visual check-ins, and clear trust badges; implemented responsive layout CSS.",
    systems: "Built reusable conversational input patterns and card selections that became the foundation of the startup’s new design library.",
    ai: "Designed a personalization engine matching user intakes with highly compatible provider profiles using dynamic sorting.",
    accessibility: "Tested contrast, type scales, and screen-reader accessibility for patients with sensory sensitivities.",
    solution: "An intake onboarding journey featuring friendly progress updates, HIPAA-security trust signals, and personalized care recommendations.",
    metrics: "Achieved a 25% lift in enrollment conversion, directly growing patient onboarding numbers and subscription revenue.",
    impact: "Raised active therapy session booking volumes and increased startup customer lifetime value (LTV) by 20%.",
    reflection: "I would implement longitudinal feedback surveys at week 4 of therapy to tie the intake design directly to clinical health outcomes."
  },
  {
    case: "AI-Enabled UX Workflow Transformation",
    signal: "AI Operations & Transformation Strategy",
    mustShow: ["30% shorter cycle times", "Claude / Figma Make integration", "Prompt engineering library", "Automated UI audits"],
    upgrade: "Reframe from using AI tools to setting systemic design operations strategies.",
    problem: "Designers spending 40% of their time on manual layout updates, data synthesis, and repetitive screen variations.",
    constraints: "Ensuring proprietary design data is protected under company compliance; managing tool learning curves.",
    role: "AI Transformation Lead: Developed prompt engineering playbooks, built Figma plugins, and ran workshops on AI integration.",
    research: "Audited design team work hours; logged time spent on raw research coding, wireframing, mockup rendering, and handoff specs.",
    strategy: "Proposed a three-phase AI adoption framework: 1. Productivity helper; 2. Design partner; 3. Systematic automated testing.",
    process: "Tuned prompt engines for research synthesis; set up Figma plugins for instant dummy data injection; integrated automated visual QA.",
    systems: "Incorporated AI-powered visual regression testing into the design system contribution workflow to catch UI breaks.",
    ai: "Used Figma Make, Claude AI, and Google Stitch to automate mockup variations, synthesis logs, and accessibility code snippets.",
    accessibility: "Leveraged AI accessibility evaluators to programmatically scan design screens for contrast and tab order errors.",
    solution: "An AI-augmented design operations program featuring prompt libraries, plugin presets, and automated UI testing dashboards.",
    metrics: "Cut design-to-development cycles by 30% and boosted design team output capacity by 45%.",
    impact: "Allowed design team to spend 2x more time on strategic product discovery and user testing instead of file production.",
    reflection: "I would partner with the legal department earlier to establish clear guidelines on generative assets and speed up tool approval."
  },
  {
    case: "Accessibility Modernization Program",
    signal: "Systemic WCAG 2.2 AA Modernization & Compliance",
    mustShow: ["95% WCAG 2.2 AA compliance", "500+ legacy pages scanned", "Core accessibility tokens", "Unified audit tracker"],
    upgrade: "Show how accessibility was scaled systematically via tokens instead of ad-hoc CSS overrides.",
    problem: "An enterprise platform faced legal compliance risks and user exclusion due to severe accessibility gaps across its legacy portals.",
    constraints: "Over 500 legacy screen templates, limited front-end documentation, and developer resistance to code re-writes.",
    role: "Accessibility Advocate & Lead Architect: Audited codebase, wrote compliance standards, and mentored engineering squads.",
    research: "Conducted automated and manual audits using JAWS, NVDA, and VoiceOver; mapped accessibility failures across core portals.",
    strategy: "Created a compliance roadmap prioritizing high-traffic transactional flows; tied audit achievements directly to product release gates.",
    process: "Re-engineered design system colors for contrast; authored accessibility specs (tab order, ARIA regions) for standard components.",
    systems: "Embedded accessibility compliance as a mandatory gate in the design system contribution pipeline.",
    ai: "Used AI accessibility scanners to programmatically scan 500+ legacy pages, accelerating discovery speed by 5x.",
    accessibility: "Wrote core keyboard accessibility scripts, focus managers, and custom screen-reader announcements.",
    solution: "A platform-wide accessibility program including updated code specs, an audit database, and developer training modules.",
    metrics: "Achieved 95% WCAG 2.2 AA compliance across all targeted surfaces and resolved all active compliance risks.",
    impact: "Expanded accessible customer base by 12% and established accessibility-first development hygiene across 8 engineering teams.",
    reflection: "I would introduce automated accessibility linting in the development build pipeline earlier to prevent new failures in pull requests."
  },
  {
    case: "Hospitality & Tourism Platform Booking Engine",
    signal: "Conversion Optimization & Dynamic Checkout Systems",
    mustShow: ["15% booking lift", "22% mobile checkout conversion", "Multi-currency scheduling", "Localized forms"],
    upgrade: "Demonstrate conversion metrics alongside multi-device grid designs.",
    problem: "Confusing booking funnels, lack of price breakdown transparency, and poor conversion on hotel checkout screens.",
    constraints: "Dynamic inventory pricing database syncs; supporting multi-currency and multi-device checkout flows.",
    role: "UX Designer & Product Strategy Partner: Led user mapping, responsive grid structures, and interactive checkout design.",
    research: "Reviewed conversion analytics; ran 15 usability tests on booking grids; identified pricing transparency as key trust barrier.",
    strategy: "Proposed booking funnel consolidation, reducing checkout steps from 5 to 2; prioritized mobile-first layouts.",
    process: "Wireframed 2-step booking; prototyped dynamic price summary cards; coded responsive layout patterns to match Figma specs.",
    systems: "Created booking cards and checkout form components that were reused across hotel and flight search portals.",
    ai: "Collaborated on a rule-based personalization engine matching users with relevant lodging packages based on search intent.",
    accessibility: "Ensured high color contrast for price details and screen-reader accessibility for booking progress bars.",
    solution: "Consolidated booking funnel dashboard with instant currency toggles, clear billing summaries, and card layouts.",
    metrics: "Increased hotel booking conversions by 15% and boosted mobile checkout completion rates by 22%.",
    impact: "Improved look-to-book ratios, driving business revenue growth and lowering customer support cart questions.",
    reflection: "I would test localized payment options (e.g. mobile wallets) earlier in the check-out flow to capture more international users."
  },
  {
    case: "Physical Product UX: Connected Automobile Ecosystem",
    signal: "HMI Design & Safety-Critical Interactive Interfaces",
    mustShow: ["32% distraction reduction", "40% voice action success", "HMI design token system", "Glare contrast optimization"],
    upgrade: "Tie safety-critical testing metrics to design system scale.",
    problem: "In-vehicle digital infotainment systems causing driver distraction, with multi-level touchscreen menus that are hard to use safely.",
    constraints: "Automotive safety standards (NHTSA guidelines), varying screen sizes, hardware limits, and real-time sensor syncs.",
    role: "UX Architect & HMI Specialist: Led screen layout guidelines, physical-digital touchpoints, and interactive prototypes.",
    research: "Shadowed drivers; ran eye-tracking tests to log glance durations during navigation and media changes.",
    strategy: "Set a 2-second glance rule limit; designed a grid layout hierarchy and prioritized voice commands for complex entries.",
    process: "Designed infotainment layout guides; prototyped large touch button grid cards; mapped voice control feedback prompts.",
    systems: "Designed HMI token frameworks (colors, tap targets, type sizes) that scale across different vehicle dashboard screen shapes.",
    ai: "Integrated AI voice assistant that understands natural speech and predicts screen prompts based on route sensors.",
    accessibility: "Optimized contrast for extreme glare conditions; designed high-contrast dark modes for safe night driving.",
    solution: "A clean dashboard infotainment system featuring large widget cards, tactile physical backup shortcuts, and voice prompts.",
    metrics: "Reduced driver task distraction times by 32% and increased first-try voice action success by 40%.",
    impact: "Improved vehicle safety metrics and raised customer infotainment satisfaction scores by 25%.",
    reflection: "I would run usability tests under varying simulator glare conditions earlier to optimize font weight decisions."
  }
];

const RESUME_ENGINE = [
  { label: "Headline", before: "Full-Stack Product Designer / Enterprise UX Architect",
    after: "Enterprise UX Architect and AI-enabled Product Design Leader driving measurable product transformation across healthcare, commerce and enterprise platforms." },
  { label: "Opening Summary", before: "16+ years of experience in UX, UI, research, design systems and front-end.",
    after: "16+ years transforming complex digital products through product strategy, mixed-method research, scalable design systems, accessibility modernization, front-end fluency and AI-enabled design operations." },
  { label: "Impact Language", before: "Designed dashboards, portals, workflows and UI components.",
    after: "Improved conversion by 25%, reduced task completion time by 35%, shortened design-to-development cycles by 30% and raised operational efficiency by 40% through measurable UX architecture decisions." },
  { label: "Leadership Proof", before: "Worked with stakeholders and developers.",
    after: "Aligned product, engineering, compliance and executive stakeholders around roadmap priorities, governance models and measurable experience outcomes." },
];

const MOCK_CENTER = [
  { mode: "15-Minute Recruiter Sprint", focus: "Positioning, level fit and career narrative", score: "Clarity · confidence · role fit" },
  { mode: "45-Minute Portfolio Defense", focus: "Case depth, business impact and trade-offs", score: "Problem framing · decision quality · metrics" },
  { mode: "60-Minute Product Strategy Panel", focus: "OKRs, prioritization and roadmap influence", score: "Strategic altitude · prioritization · executive language" },
  { mode: "30-Minute Design Systems Deep Dive", focus: "Governance, tokens, adoption and ROI", score: "Scale thinking · operating model · measurable value" },
  { mode: "45-Minute AI Experience Critique", focus: "Copilots, trust, failure states and evaluation", score: "AI fluency · safety · product judgment" },
  { mode: "30-Minute Bar Raiser", focus: "Leadership maturity, conflict and judgment", score: "Executive presence · self-awareness · influence" },
];

const SCORECARD = [
  ["Portfolio Proof", 76, "Needs stronger business-first case framing"],
  ["Interview Narrative", 68, "Practice tighter VP-level answers"],
  ["Design Systems Authority", 90, "Already a flagship strength"],
  ["AI Product Strategy", 72, "Add one AI-native product case"],
  ["Leadership Signal", 74, "Make mentoring, governance and influence more explicit"],
  ["Fortune 100 Packaging", 69, "Sharpen resume, LinkedIn and one-slide story"],
];

const QUIZ = {
  "UX Strategy": [
    { q: "A product VP wants to cut research budget. How do you defend the UX research program at Director altitude?",
      opts: [
        "Argue that research is standard practice and skipping it violates user-centered design principles.",
        "Show a chart of research hours spent vs features designed.",
        "Re-frame research as a risk reduction tool, showing how discovery research on the Trusana project saved $150k in development waste.",
        "Explain that the design team needs research to make screens look modern."
      ],
      a: 2, why: "Directors and VP-level leaders speak in risk, cost, and opportunity. Connecting research directly to engineering cost savings and risk reduction aligns with business metrics.", impact: "+ Risk-Mitigation Alignment" },
    { q: "When setting a UX roadmap for standardizing 10+ surfaces, what is your primary alignment mechanism with engineering?",
      opts: [
        "Sending them a finished component library in Figma.",
        "Aligning design system tokens with their existing front-end architecture to reduce migration cost and cycle time.",
        "Requiring them to attend all design critiques.",
        "Writing a memo insisting they stop writing custom styles."
      ],
      a: 1, why: "Aligning design tokens with the dev codebases directly impacts cycle times and lowers the engineering friction of adoption, which is key for enterprise scale.", impact: "+ Cross-Functional Alignment" },
    { q: "How do you define the north-star metric for a legacy digital front door redesign serving millions of patients?",
      opts: [
        "Page views on the new landing page.",
        "The visual consistency score of the interface.",
        "Patient access cycle time, measuring speed from symptom-to-appointment confirmation.",
        "Count of new components created."
      ],
      a: 2, why: "A true north-star metric must measure human value combined with business success—speeding up the patient access cycle time directly improves appointment booking rates.", impact: "+ Business Metrics Integration" }
  ],
  "Product Thinking": [
    { q: "Two features have the same RICE priority score. What is the strongest Director-level tiebreaker to select one?",
      opts: [
        "Whichever feature is easier to design in Figma.",
        "The feature that protects or advances our primary OKR target most directly.",
        "The one requested by the most vocal engineering lead.",
        "Whichever concept looks more visually impressive in a presentation."
      ],
      a: 1, why: "Strategic prioritization requires that product decisions defer to primary company OKRs first, ensuring engineering focus remains on outcomes rather than features.", impact: "+ Strategic Prioritization" },
    { q: "A PM suggests building a new feature to address user drop-off in a checkout flow. How do you respond?",
      opts: [
        "Immediately start designing screens for the new feature.",
        "Advocate for a quick discovery phase to identify why users are dropping off before deciding if a new feature is the correct solution.",
        "Ask engineering to build it and measure afterwards.",
        "Argue that checkout flows should never be modified."
      ],
      a: 1, why: "Principal designers focus on discovery and problem definition first. Building a feature for an undefined problem risks waste and feature bloat.", impact: "+ Problem Definition Rigor" },
    { q: "How do you prove that a product-led growth (PLG) experiment was successful?",
      opts: [
        "By showing that the design team was happy with the final mockups.",
        "By demonstrating a statistically significant increase in self-serve activation and feature adoption.",
        "By counting the number of users who clicked the button once.",
        "By presenting the project at an internal design conference."
      ],
      a: 1, why: "PLG success is defined by repeatable, self-serve metric outcomes like activation, retention, and time-to-value, not visual outputs.", impact: "+ Growth Outcome Focus" }
  ],
  "Design Systems Governance": [
    { q: "A product team refuses to adopt the new design system components, claiming it limits their design freedom. What is your play?",
      opts: [
        "Escalate to the VP of Product to mandate adoption immediately.",
        "Run an adoption audit, identify their specific workflow bottleneck, and create token variations or templates that solve it.",
        "Ignore them and focus on teams that are willing to adopt the system.",
        "Redesign the components to be more visually complex."
      ],
      a: 1, why: "Design systems must be treated as products. Solving friction via workflow tools and token variations drives organic, sustained adoption better than top-down mandates.", impact: "+ System Governance Maturity" },
    { q: "How do you calculate the ROI of your design system across 10+ surfaces?",
      opts: [
        "Count the number of components used in Figma.",
        "Multiply the design-to-development cycle-time reduction (e.g. 30%) by the blended engineering hourly rate and number of releases.",
        "Ask developers if they like the system during a survey.",
        "Compare our system with external systems."
      ],
      a: 1, why: "ROI is calculated by measuring tangible business outcomes—time saved in cycles translates directly to financial efficiency and increased feature velocity.", impact: "+ Financial Impact Analysis" },
    { q: "What is the primary role of a 'contribution model' in design systems?",
      opts: [
        "To allow any designer to modify core components without review.",
        "To structure a clear quality-gate process for federated teams to propose, test, and merge new patterns.",
        "To limit who can view system files.",
        "To collect feedback from users."
      ],
      a: 1, why: "A contribution model ensures scale by enabling federated teams to add value while preserving stability via core quality gates.", impact: "+ Scale Strategy" }
  ],
  "Healthcare UX": [
    { q: "You are redesigning an EHR workflow that providers complain is causing alert fatigue. What is your approach?",
      opts: [
        "Remove 80% of alerts immediately without consulting clinical leads.",
        "Group alerts by clinical severity and context, and introduce progressive disclosure patterns for non-critical alerts.",
        "Make all alerts larger and flashing red to ensure they are read.",
        "Re-train providers to tolerate the alerts better."
      ],
      a: 1, why: "Providers operate under high cognitive load. progressive disclosure and categorization of alerts by severity mitigates alert fatigue while preserving clinical safety.", impact: "+ Clinical UX Strategy" },
    { q: "A healthcare digital front door booking flow drops 40% of patients during appointment selection. What is the most likely UX cause?",
      opts: [
        "The logo is not modern enough.",
        "High search complexity, lack of dynamic provider availability, and poor accessibility compliance.",
        "The page colors are too dark.",
        "Patients prefer calling the hospital directly."
      ],
      a: 1, why: "Complexity in search filtering and a lack of real-time scheduling confirmation are the primary friction points in healthcare booking platforms.", impact: "+ Patient Conversion Optimization" },
    { q: "How do you ensure WCAG 2.2 AA accessibility modernization across Medicare workflows?",
      opts: [
        "Run a single automated color-contrast checker before launch.",
        "Embed semantic tags and screen-reader requirements directly into the core design system tokens and audit with users with disabilities.",
        "Ask the development team to fix it post-launch.",
        "Add an accessibility overlay widget."
      ],
      a: 1, why: "Accessibility cannot be patched post-launch. Embedding accessibility properties in tokens ensures systematic compliance across all surfaces.", impact: "+ Accessibility Leadership" }
  ],
  "E-Commerce Conversion": [
    { q: "A retail site's cart abandonment rate is at 70%. Which test has the highest probability of conversion lift?",
      opts: [
        "Changing the font family across the whole store.",
        "Testing single-page guest checkouts and progressive form fields with instant inline validation.",
        "Adding more related product recommendations at checkout.",
        "Adding a rotating banner on the cart page."
      ],
      a: 1, why: "Checkout friction is the main driver of cart abandonment. Guest checkout and inline form validation minimize task completion time and user anxiety.", impact: "+ Conversion Growth Strategy" },
    { q: "How do you balance personalization engines with user trust during search and discovery?",
      opts: [
        "Show highly specific recommendations based on user history without explaining why.",
        "Provide clear, explainable recommendation tags (e.g., 'Because you bought X') and give users controls to reset their preferences.",
        "Stop personalizing search results entirely.",
        "Always recommend the most expensive items."
      ],
      a: 1, why: "Personalization requires trust. Transparency ('explainable AI') and user control prevent users from feeling stalked and increase preference alignment.", impact: "+ Trust-Centric Personalization" },
    { q: "What metric is most critical when validating a mobile search results redesign?",
      opts: [
        "Average session duration.",
        "Search-to-detail-click rate and time-to-first-click.",
        "Total page views.",
        "Font contrast score."
      ],
      a: 1, why: "In search and discovery, success is defined by speed and relevance. Getting users to a product detail page quickly is the primary conversion driver.", impact: "+ Discovery Performance" }
  ],
  "AI + UX Future": [
    { q: "You are designing an AI copilot feature for financial analysts. What is the most critical UX pattern for AI output?",
      opts: [
        "Always present the AI output as 100% accurate without qualifications.",
        "Show the AI output along with a confidence score, citation links to source data, and an easy edit/override workflow.",
        "Hide the fact that the output was generated by an AI.",
        "Make the output copyable as an uneditable PDF."
      ],
      a: 1, why: "Trust is the primary risk in AI-enabled tools. Explainable AI, citations, and correction loops allow users to review and trust recommendations.", impact: "+ AI Trust Architecture" },
    { q: "A team wants to use AI to generate research personas. What is your advice?",
      opts: [
        "Fully replace user research with AI-generated personas to save money.",
        "Use AI to synthesize real customer interview logs into archetypes, maintaining a direct traceability link to raw user statements.",
        "Ban the use of AI in research entirely.",
        "Ask AI to generate random personas based on generic web data."
      ],
      a: 1, why: "AI-generated personas without grounding in real user research propagate biases and lead to feature misalignment. AI should synthesize real research, not fabricate it.", impact: "+ Grounded AI Strategy" },
    { q: "How do you design for a scenario where an AI service model experiences latency or fails to respond?",
      opts: [
        "Show a generic spinning wheel forever.",
        "Design progressive loading states, set expectations on processing time, and offer an alternative lookup option.",
        "Crash the application screen gracefully.",
        "Display a raw JSON timeout error to the user."
      ],
      a: 1, why: "Graceful degradation and proactive status updates are essential for maintaining user confidence when AI endpoints suffer from high latency.", impact: "+ Resilience Design" }
  ],
  "Executive Stakeholder Management": [
    { q: "A Director of Engineering opposes your proposed navigation redesign, citing lack of development capacity. How do you resolve this?",
      opts: [
        "Complain to the VP of Design that engineering is blocking progress.",
        "Review the engineering roadmap, identify code dependencies, and propose an incremental rollout plan that minimizes current sprint footprint.",
        "Redesign the navigation to be identical to the old version.",
        "Demand that they hire more engineers to implement it."
      ],
      a: 1, why: "Director-level leadership requires understanding trade-offs and engineering constraints. Phased implementation shows strategic collaboration.", impact: "+ Leadership Alignment" },
    { q: "During a portfolio review, a VP interrupts and asks about the business outcome of a design choice. What is your response strategy?",
      opts: [
        "Ask them to wait until the end of the presentation to see the UI.",
        "Cite the user interviews and aesthetic enhancements in detail.",
        "Answer immediately in business metrics (e.g. support call reduction, conversion lift) before diving into visual or structural design details.",
        "Explain that design is a creative process and cannot be measured."
      ],
      a: 2, why: "Executive communications must lead with the business outcome. Reframing the design bet in terms of cost or conversion immediately builds boardroom trust.", impact: "+ Boardroom Storytelling" },
    { q: "How do you handle a scenario where two senior business stakeholders have conflicting visions for a product dashboard?",
      opts: [
        "Design two separate dashboards and let the users choose.",
        "Facilitate a data-driven workshop mapping both visions to key user task completions and validate with a quick usability study.",
        "Implement the design requested by the stakeholder with the highest title.",
        "Refuse to work on the dashboard until they agree."
      ],
      a: 1, why: "Resolving stakeholder conflict requires shifting the debate from opinion to objective data and task-performance criteria.", impact: "+ Stakeholder Influence" }
  ],
  "Accessibility Compliance": [
    { q: "You need to audit an enterprise platform for WCAG 2.2 compliance. What is your prioritization roadmap?",
      opts: [
        "Fix all hover state animations first.",
        "Focus first on core transactional flows (login, billing, checkout), keyboard navigation, screen reader accessibility, and color contrast.",
        "Only audit pages that have low traffic.",
        "Rely entirely on an automated accessibility scanner to fix issues."
      ],
      a: 1, why: "Accessibility priority should focus on high-impact user flows to ensure users can complete critical tasks without discrimination.", impact: "+ Systematic Inclusion" },
    { q: "A team lead suggests ignoring screen reader accessibility because 'our users don't use screen readers'. How do you respond?",
      opts: [
        "Agree with them to save design and development time.",
        "Present WCAG compliance as a legal requirement and present evidence of user segments requiring assistive tech, highlighting market expansion.",
        "File a complaint with HR against the team lead.",
        "Implement it secretly without telling the team."
      ],
      a: 1, why: "Framing accessibility as both a compliance safeguard and a market expansion driver wins business consensus and aligns with standard compliance models.", impact: "+ Compliance Risk Defense" },
    { q: "What is the best way to handle color contrast compliance in complex data visualization dashboards?",
      opts: [
        "Avoid using colors in data charts entirely.",
        "Ensure all chart elements use high-contrast borders, distinct patterns or textures, and text label annotations alongside color codes.",
        "Only provide a dark mode option.",
        "Make the background pure black and text pure white."
      ],
      a: 1, why: "Color should never be the sole conveyor of information. Multi-channel representation (borders, textures, labels) ensures usability for colorblind and low-vision users.", impact: "+ Accessible Data Visualization" }
  ]
};

const READINESS = 73; // current; target 95

/* ----------------------------- HELPERS ---------------------------------- */

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function useCountUp(target, run, dur = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, dur]);
  return v;
}

function Section({ id, eyebrow, title, kicker, children }) {
  const [ref, shown] = useReveal();
  return (
    <section id={id} className="cc-section">
      <div ref={ref} className={"cc-reveal " + (shown ? "cc-in" : "")}>
        <div className="cc-eyebrow">{eyebrow}</div>
        <h2 className="cc-h2">{title}</h2>
        {kicker && <p className="cc-kicker">{kicker}</p>}
        {children}
      </div>
    </section>
  );
}

function gapColor(g) {
  return g === "High" ? "var(--gold)" : g === "Medium" ? "var(--violet)" : "var(--blue)";
}

/* ----------------------------- COMPONENTS -------------------------------- */

function ReadinessRing({ value }) {
  const [ref, shown] = useReveal();
  const v = useCountUp(value, shown, 1600);
  const R = 88, C = 2 * Math.PI * R;
  const off = C * (1 - v / 100);
  return (
    <div className="cc-ring-wrap" ref={ref}>
      <svg viewBox="0 0 200 200" className="cc-ring">
        <defs>
          <linearGradient id="ringgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--blue)" />
            <stop offset="55%" stopColor="var(--violet)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={R} className="cc-ring-track" />
        <circle cx="100" cy="100" r={R} className="cc-ring-prog"
          strokeDasharray={C} strokeDashoffset={off}
          transform="rotate(-90 100 100)" />
      </svg>
      <div className="cc-ring-center">
        <div className="cc-ring-num">{v}</div>
        <div className="cc-ring-label">Fortune 100 Readiness</div>
        <div className="cc-ring-sub">Target 95</div>
      </div>
    </div>
  );
}

function StatCounter({ s }) {
  const [ref, shown] = useReveal();
  const v = useCountUp(s.value, shown, 1400);
  return (
    <div className="cc-stat" ref={ref}>
      <div className="cc-stat-v">{v}{s.suffix}</div>
      <div className="cc-stat-l">{s.label}</div>
    </div>
  );
}

function Hero() {
  return (
    <header className="cc-hero" id="top">
      <div className="cc-hero-grid" aria-hidden />
      <div className="cc-hero-inner">
        <div className="cc-hero-left">
          <div className="cc-eyebrow">From Enterprise UX Architect → Fortune 100 UX Director</div>
          <h1 className="cc-h1">
            The full-stack architect who turns <span className="cc-grad">strategy, systems, accessibility, AI & code</span> into measurable outcomes.
          </h1>
          <p className="cc-lede">
            A personalized executive command center built to make Anurag Challapalli
            interview-ready, portfolio-ready, leadership-ready and AI-future-ready for
            Principal UX Architect and UX Director roles.
          </p>
          <div className="cc-cta-row">
            <a href="#roadmap" className="cc-btn cc-btn-pri">Start the roadmap</a>
            <a href="#gap" className="cc-btn">View skill gap</a>
            <a href="#arena" className="cc-btn">Enter the arena</a>
            <a href="#ai" className="cc-btn">Explore UX × AI</a>
          </div>
          <div className="cc-maturity">
            {MATURITY.map((m, i) => (
              <div className="cc-mat" key={m.k}>
                <div className="cc-mat-dot" style={{ opacity: 0.3 + i * 0.23 }} />
                <div className="cc-mat-k">{m.k}</div>
                <div className="cc-mat-s">{m.s}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="cc-hero-right">
          <ReadinessRing value={READINESS} />
        </div>
      </div>
      <div className="cc-stat-row">
        {STATS.map((s) => <StatCounter key={s.label} s={s} />)}
      </div>
    </header>
  );
}

function Profile() {
  return (
    <Section id="profile" eyebrow="01 · Leadership Profile"
      title="Most candidates speak design. You speak business, research, systems, code, accessibility & AI."
      kicker="A rare hybrid operating across the entire product value chain — Duke Executive PG · HFI-CUA · IIT Bombay Design Thinking · ET Healthcare Awards 2023.">
      <div className="cc-profile">
        <div className="cc-card cc-radar-card">
          <div className="cc-card-tag">Capability constellation</div>
          <div className="cc-radar-box">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR} outerRadius="72%">
                <PolarGrid stroke="rgba(255,255,255,0.10)" />
                <PolarAngleAxis dataKey="dim" tick={{ fill: "#9fb0c8", fontSize: 10 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Target" dataKey="target" stroke="var(--gold)"
                  fill="var(--gold)" fillOpacity={0.06} strokeWidth={1} />
                <Radar name="Current" dataKey="score" stroke="var(--violet)"
                  fill="var(--violet)" fillOpacity={0.28} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="cc-legend">
            <span><i style={{ background: "var(--violet)" }} /> Current level</span>
            <span><i style={{ background: "var(--gold)" }} /> Fortune 100 target</span>
          </div>
        </div>
        <div className="cc-profile-side">
          {[
            ["Full-Stack Product Designer", "Strategy → research → design → tokens → production front-end."],
            ["Enterprise UX Architect", "Design systems standardizing 10+ surfaces with governance."],
            ["Accessibility Advocate", "Org-wide WCAG 2.2 AA embedded at token & component level."],
            ["AI Design Transformation Leader", "Figma Make · Claude AI · Google Stitch in live workflows."],
          ].map(([k, d]) => (
            <div className="cc-pill-card" key={k}>
              <div className="cc-pill-k">{k}</div>
              <div className="cc-pill-d">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function GapAnalyzer() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="gap" eyebrow="02 · Fortune 100 Skill Gap Analyzer"
      title="The exact distance between today and the title you want."
      kicker="Tap any capability to see the gap and the action that closes it.">
      <div className="cc-gap-list">
        {GAPS.map((g, i) => {
          const isOpen = open === i;
          return (
            <div className={"cc-gap " + (isOpen ? "cc-gap-open" : "")} key={g.cap}
              onClick={() => setOpen(isOpen ? -1 : i)}
              role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") setOpen(isOpen ? -1 : i); }}>
              <div className="cc-gap-head">
                <div>
                  <div className="cc-gap-cap">{g.cap}</div>
                  <div className="cc-gap-role">{g.role}</div>
                </div>
                <div className="cc-gap-meta">
                  <span className="cc-lvl">{g.now} → {g.req}</span>
                  <span className="cc-gap-badge" style={{ color: gapColor(g.gap), borderColor: gapColor(g.gap) }}>{g.gap} gap</span>
                </div>
              </div>
              <div className="cc-bar">
                <div className="cc-bar-fill" style={{ width: g.level + "%" }} />
                <div className="cc-bar-target" style={{ left: "92%" }} />
              </div>
              <div className="cc-gap-body" style={{ maxHeight: isOpen ? 260 : 0 }}>
                <div className="cc-gap-detail-grid">
                  <p><b>Learning action</b>{g.action}</p>
                  <p><b>Proof of work</b>{g.proof}</p>
                  <p><b>Interview focus</b>{g.interview}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Roadmap() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="roadmap" eyebrow="03 · Master Learning Roadmap"
      title="Four levels from foundation to AI-future-ready."
      kicker="A typed progression — each level unlocks the altitude of the next.">
      <div className="cc-road">
        {ROADMAP.map((r, i) => {
          const isOpen = open === i;
          return (
            <div className={"cc-road-card " + (isOpen ? "cc-road-open" : "")} key={r.t}>
              <button className="cc-road-head" onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className="cc-road-tag">{r.tag}</span>
                <span className="cc-road-t">{r.t}</span>
                <span className="cc-road-chev">{isOpen ? "–" : "+"}</span>
              </button>
              <div className="cc-road-body" style={{ maxHeight: isOpen ? 300 : 0 }}>
                <div className="cc-chips">
                  {r.items.map((it) => <span className="cc-chip" key={it}>{it}</span>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function Academy() {
  const [track, setTrack] = useState(0);
  const active = ACADEMY[track];
  return (
    <Section id="academy" eyebrow="04 · Learning Academy"
      title="A private executive academy built around the exact title you are pursuing."
      kicker="Each track turns learning into visible leadership proof: memos, maps, cases, scorecards and interview stories.">
      <div className="cc-academy">
        <div className="cc-academy-list">
          {ACADEMY.map((a, i) => (
            <button key={a.track} className={"cc-academy-item " + (track === i ? "cc-academy-on" : "")}
              onClick={() => setTrack(i)}>
              <span>{a.level}</span>
              {a.track}
            </button>
          ))}
        </div>
        <div className="cc-card cc-academy-detail card-fade" key={active.track}>
          <div className="cc-card-tag">{active.cadence}</div>
          <h3>{active.track}</h3>
          <div className="cc-chips cc-academy-chips">
            {active.modules.map((m) => <span className="cc-chip" key={m}>{m}</span>)}
          </div>
          <div className="cc-output">
            <span>Executive output</span>
            {active.output}
          </div>
        </div>
      </div>
    </Section>
  );
}

function MaterialsLibrary() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const categories = ["All", ...new Set(LIBRARY.map((l) => l.category))];

  const filtered = LIBRARY.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                        item.why.toLowerCase().includes(search.toLowerCase()) ||
                        item.learn.toLowerCase().includes(search.toLowerCase());
    const matchCat = cat === "All" || item.category === cat;
    return matchSearch && matchCat;
  });

  return (
    <Section id="library" eyebrow="05 · Curated Learning Materials Library"
      title="Boardroom-level frameworks, references & books."
      kicker="Search and filter the structured materials designed to sharpen your product strategy, accessibility governance, and AI design leadership.">
      <div className="cc-lib-controls">
        <input type="text" placeholder="Search materials by title, key learnings..." 
          value={search} onChange={(e) => setSearch(e.target.value)} className="cc-search-input" />
        <div className="cc-lib-tabs">
          {categories.map((c) => (
            <button key={c} className={"cc-tab " + (cat === c ? "cc-tab-on" : "")}
              onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      </div>
      <div className="cc-lib-grid">
        {filtered.map((item) => (
          <div className="cc-card cc-lib-card" key={item.title}>
            <div className="cc-lib-meta-row">
              <span className="cc-lib-badge-cat">{item.category}</span>
              <span className="cc-lib-badge-type">{item.type}</span>
            </div>
            <h3 className="cc-lib-title">{item.title}</h3>
            <div className="cc-lib-details">
              <div className="cc-lib-stat"><b>Duration</b>{item.time}</div>
              <div className="cc-lib-stat"><b>Difficulty</b>{item.level}</div>
            </div>
            <p className="cc-lib-text"><b>Why it matters:</b> {item.why}</p>
            <p className="cc-lib-text"><b>What to learn:</b> {item.learn}</p>
            <p className="cc-lib-text"><b>Interview Use Case:</b> {item.useCase}</p>
            <div className="cc-lib-assignment">
              <span>Practical Assignment</span>
              <p>{item.assignment}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="cc-no-results">No materials match your filter or search terms.</div>
        )}
      </div>
    </Section>
  );
}

function LifecycleLearning() {
  const [stage, setStage] = useState(0);
  const s = LIFECYCLE[stage];
  return (
    <Section id="lifecycle" eyebrow="05 · Product + UX Lifecycle Learning System"
      title="Learn every stage of product development and UX design like a Principal-level operator."
      kicker="Each stage includes the product-development view, the UX-design view, curriculum, best practices, roadblocks, strategies, deliverables and interview questions.">
      <div className="cc-life">
        <div className="cc-life-rail">
          {LIFECYCLE.map((x, i) => (
            <button key={x.stage} className={"cc-life-step " + (stage === i ? "cc-life-on" : "")}
              onClick={() => setStage(i)}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {x.stage.replace(/^\d+ · /, "")}
            </button>
          ))}
        </div>
        <div className="cc-life-detail card-fade" key={s.stage}>
          <div className="cc-life-top">
            <div>
              <div className="cc-card-tag">Lifecycle stage</div>
              <h3>{s.stage}</h3>
            </div>
            <div className="cc-life-badge">PDLC × UXLC</div>
          </div>
          <div className="cc-life-compare">
            <div>
              <span>Product development lens</span>
              <p>{s.pdlc}</p>
            </div>
            <div>
              <span>UX design lens</span>
              <p>{s.ux}</p>
            </div>
          </div>
          <div className="cc-life-grid">
            <div className="cc-life-card">
              <div className="cc-card-tag">Curriculum</div>
              <ul className="cc-ul">{s.curriculum.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="cc-life-card">
              <div className="cc-card-tag">Best practices</div>
              <ul className="cc-ul">{s.best.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="cc-life-card">
              <div className="cc-card-tag">Common roadblocks</div>
              <ul className="cc-ul">{s.roadblocks.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="cc-life-card">
              <div className="cc-card-tag">Strategies to solve them</div>
              <ul className="cc-ul">{s.strategies.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="cc-life-card">
              <div className="cc-card-tag">Proof deliverables</div>
              <ul className="cc-ul">{s.deliverables.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="cc-life-card cc-life-interview">
              <div className="cc-card-tag">Interview questions</div>
              <ul className="cc-ul">{s.interview.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Domains() {
  const keys = Object.keys(DOMAINS);
  const [tab, setTab] = useState(keys[0]);
  const d = DOMAINS[tab];
  return (
    <Section id="domains" eyebrow="06 · Domain-Wise Case Study Lab"
      title="Eight sectors, one operating playbook."
      kicker="Switch sectors to load its context, metrics and AI opportunity.">
      <div className="cc-tabs">
        {keys.map((k) => (
          <button key={k} className={"cc-tab " + (tab === k ? "cc-tab-on" : "")}
            onClick={() => setTab(k)}>{k}</button>
        ))}
      </div>
      <div className="cc-domain card-fade" key={tab}>
        <p className="cc-domain-ctx">{d.ctx}</p>
        <div className="cc-domain-grid">
          <div className="cc-card">
            <div className="cc-card-tag">Key UX challenges</div>
            <ul className="cc-ul">{d.challenges.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="cc-card">
            <div className="cc-card-tag">Metrics that matter</div>
            <ul className="cc-ul">{d.metrics.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="cc-card">
            <div className="cc-card-tag">Portfolio case ideas</div>
            <ul className="cc-ul">{d.cases.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="cc-card cc-card-ai">
            <div className="cc-card-tag">AI transformation opportunity</div>
            <p className="cc-domain-ai">{d.ai}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function PortfolioLab() {
  const [sel, setSel] = useState(0);
  const p = PORTFOLIO[sel] || PORTFOLIO[0];

  return (
    <Section id="portfolio" eyebrow="07 · Portfolio Transformation Lab"
      title="Turn strong work into Director-level proof."
      kicker="Tap any project card below to load the Case Study Lab Workspace. The workspace translates standard design cases into detailed 14-point executive briefs.">
      <div className="cc-portfolio-grid">
        {PORTFOLIO.map((item, idx) => (
          <button key={item.case} 
            className={"cc-card cc-portfolio-card text-left " + (sel === idx ? "cc-portfolio-card-active" : "")} 
            onClick={() => setSel(idx)}>
            <div className="cc-card-tag">{item.signal}</div>
            <h3>{item.case}</h3>
            <div className="cc-chips cc-portfolio-chips">
              {item.mustShow.slice(0, 3).map((m) => <span className="cc-chip" key={m}>{m}</span>)}
            </div>
            <div className="cc-upgrade"><span>Director Upgrade</span>{item.upgrade}</div>
          </button>
        ))}
      </div>

      <div className="cc-card cc-portfolio-detail card-fade" key={p.case} style={{ marginTop: "24px" }}>
        <div className="cc-portfolio-detail-header" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", borderBottom: "1px solid var(--line)", paddingBottom: "18px", marginBottom: "20px" }}>
          <div>
            <span className="cc-card-tag" style={{ color: "var(--gold)", marginBottom: "4px", display: "block" }}>Active Workspace</span>
            <h3 style={{ fontSize: "24px", margin: "0", fontFamily: "Space Grotesk", color: "var(--ink)" }}>{p.case}</h3>
          </div>
          <div className="cc-portfolio-tag-large" style={{ fontFamily: "IBM Plex Mono", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "6px 14px", border: "1px solid var(--gold)", borderRadius: "4px", color: "var(--gold)", alignSelf: "center" }}>14-Point Architect Review</div>
        </div>

        <div className="cc-portfolio-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div className="cc-portfolio-detail-col" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="cc-portfolio-item" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--gold)", marginBottom: "4px" }}>01 · Leadership Signal</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.signal}</p>
            </div>
            <div className="cc-portfolio-item" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--gold)", marginBottom: "4px" }}>02 · Core Business & User Problem</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.problem}</p>
            </div>
            <div className="cc-portfolio-item" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--gold)", marginBottom: "4px" }}>03 · Platform Constraints</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.constraints}</p>
            </div>
            <div className="cc-portfolio-item" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--gold)", marginBottom: "4px" }}>04 · Full-Stack Role</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.role}</p>
            </div>
            <div className="cc-portfolio-item" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--gold)", marginBottom: "4px" }}>05 · Research Synthesis Story</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.research}</p>
            </div>
            <div className="cc-portfolio-item" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--gold)", marginBottom: "4px" }}>06 · UX Roadmap & Prioritization</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.strategy}</p>
            </div>
            <div className="cc-portfolio-item" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--gold)", marginBottom: "4px" }}>07 · Design Process & Wireframing</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.process}</p>
            </div>
          </div>

          <div className="cc-portfolio-detail-col" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="cc-portfolio-item" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--gold)", marginBottom: "4px" }}>08 · System Thinking & Tokens</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.systems}</p>
            </div>
            <div className="cc-portfolio-item" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--gold)", marginBottom: "4px" }}>09 · Future AI Integration</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.ai}</p>
            </div>
            <div className="cc-portfolio-item" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--gold)", marginBottom: "4px" }}>10 · Accessibility Compliance (WCAG AA)</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.accessibility}</p>
            </div>
            <div className="cc-portfolio-item" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--line)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--gold)", marginBottom: "4px" }}>11 · Final Product Solution</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.solution}</p>
            </div>
            <div className="cc-portfolio-item" style={{ background: "rgba(34,197,169,0.06)", border: "1px solid rgba(34,197,169,0.22)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--violet)", marginBottom: "4px" }}>12 · Shipped Metrics (A/B Test Results)</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.metrics}</p>
            </div>
            <div className="cc-portfolio-item" style={{ background: "rgba(232,176,75,0.06)", border: "1px solid rgba(232,176,75,0.22)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--gold)", marginBottom: "4px" }}>13 · Total Business Impact</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.impact}</p>
            </div>
            <div className="cc-portfolio-item" style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.22)", borderRadius: "8px", padding: "14px" }}>
              <b style={{ display: "block", fontSize: "12px", fontFamily: "Space Grotesk", color: "var(--blue)", marginBottom: "4px" }}>14 · Director-level Reflection & Retrospective</b>
              <p style={{ margin: "0", fontSize: "13.5px", color: "var(--ink)" }}>{p.reflection}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ResumeEngine() {
  const [sel, setSel] = useState(0);
  const r = RESUME_ENGINE[sel];
  return (
    <Section id="resume" eyebrow="08 · Resume Positioning Engine"
      title="Package the same experience at Fortune 100 altitude."
      kicker="Every line should make the reviewer see scope, judgment, leadership and measurable enterprise value.">
      <div className="cc-resume">
        <div className="cc-resume-tabs">
          {RESUME_ENGINE.map((x, i) => (
            <button key={x.label} className={sel === i ? "cc-resume-on" : ""} onClick={() => setSel(i)}>{x.label}</button>
          ))}
        </div>
        <div className="cc-resume-panels card-fade" key={r.label}>
          <div className="cc-resume-panel">
            <div className="cc-card-tag">Before</div>
            <p>{r.before}</p>
          </div>
          <div className="cc-resume-panel cc-resume-after">
            <div className="cc-card-tag">Fortune 100-ready</div>
            <p>{r.after}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Arena() {
  const [sel, setSel] = useState(0);
  const r = ROUNDS[sel];
  return (
    <Section id="arena" eyebrow="09 · Interview Arena"
      title="Nine rounds. One narrative — yours."
      kicker="Pick a round to load what it tests, how to answer, and a STAR example wired to your resume.">
      <div className="cc-arena">
        <div className="cc-arena-list">
          {ROUNDS.map((x, i) => (
            <button key={x.r} className={"cc-arena-item " + (sel === i ? "cc-arena-on" : "")}
              onClick={() => setSel(i)}>
              <span className="cc-arena-i">{String(i + 1).padStart(2, "0")}</span>{x.r}
            </button>
          ))}
        </div>
        <div className="cc-arena-detail card-fade" key={sel}>
          <h3 className="cc-arena-title">{r.r}</h3>
          <div className="cc-arena-block">
            <div className="cc-card-tag">What they test</div>
            <p>{r.tests}</p>
          </div>
          <div className="cc-arena-block">
            <div className="cc-card-tag">How to answer</div>
            <p>{r.how}</p>
          </div>
          <div className="cc-arena-block">
            <div className="cc-card-tag">Sample question</div>
            <p className="cc-arena-q">“{r.q}”</p>
          </div>
          <div className="cc-arena-block cc-arena-star">
            <div className="cc-card-tag">STAR example — from your record</div>
            <p>{r.star}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function MockCenter() {
  return (
    <Section id="mock" eyebrow="10 · Mock Interview Center"
      title="Practice like a candidate. Debrief like a director."
      kicker="Use each mode as a repeatable interview drill with a clear scoring rubric.">
      <div className="cc-mock-grid">
        {MOCK_CENTER.map((m) => (
          <div className="cc-mock" key={m.mode}>
            <div className="cc-mock-mode">{m.mode}</div>
            <p>{m.focus}</p>
            <div className="cc-mock-score">{m.score}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AIFuture() {
  return (
    <Section id="ai" eyebrow="11 · UX × AI Future"
      title="The future of UX is AI-orchestrated human experience design."
      kicker="A four-phase climb from productivity tool to Experience Architect.">
      <div className="cc-phases">
        {AI_PHASES.map((p, i) => (
          <div className="cc-phase" key={p.t}>
            <div className="cc-phase-rail"><span className="cc-phase-node">{i + 1}</span></div>
            <div className="cc-card cc-phase-card">
              <div className="cc-phase-p">{p.p}</div>
              <div className="cc-phase-t">{p.t}</div>
              <p className="cc-phase-d">{p.d}</p>
              <div className="cc-phase-you"><span>You →</span> {p.you}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Plan() {
  return (
    <Section id="plan" eyebrow="12 · 90 / 180 / 365-Day Transformation"
      title="Twelve weeks. Six proofs of work."
      kicker="Each phase ends in an artifact you can show, not just study.">
      <div className="cc-plan">
        {PLAN.map((p, i) => (
          <div className="cc-plan-card" key={p.w}>
            <div className="cc-plan-w">{p.w}</div>
            <div className="cc-plan-t">{p.t}</div>
            <ul className="cc-ul">{p.out.map((o) => <li key={o}>{o}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="cc-longterm">
        <div className="cc-lt"><b>180 days</b><span>Interview-ready for Principal UX Architect / UX Director.</span></div>
        <div className="cc-lt"><b>365 days</b><span>Globally visible AI-enabled Enterprise UX Transformation Leader.</span></div>
      </div>
    </Section>
  );
}

function ReadinessScorecard() {
  return (
    <Section id="scorecard" eyebrow="13 · Fortune 100 Readiness Scorecard"
      title="The readiness model: where you are strong, and where the next leap happens."
      kicker="Current score is 73. The practical target is 95: strong enough to enter a VP-level review with proof, clarity and strategic range.">
      <div className="cc-score-grid">
        <ReadinessRing value={READINESS} />
        <div className="cc-score-list">
          {SCORECARD.map(([label, value, note]) => (
            <div className="cc-score-row" key={label}>
              <div className="cc-score-head">
                <span>{label}</span>
                <b>{value}</b>
              </div>
              <div className="cc-bar">
                <div className="cc-bar-fill" style={{ width: value + "%" }} />
                <div className="cc-bar-target" style={{ left: "95%" }} />
              </div>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Quiz() {
  const [module, setModule] = useState(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const modules = Object.keys(QUIZ);

  function startQuiz(modName) {
    setModule(modName);
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  }

  function choose(idx) {
    if (picked !== null) return;
    setPicked(idx);
    const q = QUIZ[module][i];
    if (idx === q.a) setScore((s) => s + 1);
  }

  function next() {
    const qList = QUIZ[module];
    if (i + 1 >= qList.length) {
      setDone(true);
      return;
    }
    setI(i + 1);
    setPicked(null);
  }

  function backToModules() {
    setModule(null);
    setDone(false);
  }

  // Case 1: No module selected (Dashboard view)
  if (!module) {
    return (
      <Section id="quiz" eyebrow="15 · Interactive Quiz & Assessment Engine"
        title="Test your executive decision-making instincts."
        kicker="Select a training module to run a scenario assessment. Each scenario challenges your strategy, stakeholder management, accessibility, or AI integration metrics.">
        <div className="cc-quiz-dashboard">
          {modules.map((m) => (
            <button key={m} className="cc-card cc-quiz-dashboard-card" onClick={() => startQuiz(m)}>
              <div className="cc-card-tag">Quiz Module</div>
              <h3>{m}</h3>
              <p>Scenario-based diagnostic questions focusing on executive judgment.</p>
              <div className="cc-quiz-dashboard-btn">Start assessment &rarr;</div>
            </button>
          ))}
        </div>
      </Section>
    );
  }

  const questions = QUIZ[module];
  const q = questions[i];

  // Case 2: Module completed (Result view)
  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    let msg = "Drill executive communication and strategic mapping.";
    if (pct >= 80) msg = "Boardroom-ready instincts! Strong grasp of metrics and leadership framing.";
    else if (pct >= 50) msg = "Solid foundations. Sharpen alignment stories and operational metrics.";

    return (
      <Section id="quiz" eyebrow="15 · Assessment Results" title={`${module}: Assessment Complete`}>
        <div className="cc-card cc-quiz-result">
          <div className="cc-quiz-score">{score}<span>/{questions.length}</span></div>
          <div className="cc-quiz-pct">{pct}% · {msg}</div>
          <div className="cc-quiz-result-meta">
            <b>Recommended Revision:</b>
            <p>Re-read the {module} track in the Domain Lab, and practice the STAR frameworks in the Interview Arena.</p>
          </div>
          <div className="cc-quiz-actions">
            <button className="cc-btn cc-btn-pri" onClick={() => startQuiz(module)}>Retake Quiz</button>
            <button className="cc-btn" onClick={backToModules}>Back to Dashboard</button>
          </div>
        </div>
      </Section>
    );
  }

  // Case 3: Quiz in progress
  return (
    <Section id="quiz" eyebrow="15 · Interactive Quiz & Assessment Engine"
      title={module}
      kicker={`Question ${i + 1} of ${questions.length}`}>
      <div className="cc-card cc-quiz">
        <div className="cc-quiz-q">{q.q}</div>
        <div className="cc-quiz-opts">
          {q.opts.map((o, idx) => {
            let cls = "cc-quiz-opt";
            if (picked !== null) {
              if (idx === q.a) cls += " cc-opt-correct";
              else if (idx === picked) cls += " cc-opt-wrong";
            }
            return (
              <button key={o} className={cls} onClick={() => choose(idx)} disabled={picked !== null}>
                {o}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <div className="cc-quiz-why">
            <div className="cc-card-tag" style={{ color: "var(--gold)" }}>{q.impact}</div>
            <p><b>Explanation:</b> {q.why}</p>
            <button className="cc-btn cc-btn-pri" onClick={next}>
              {i + 1 >= questions.length ? "See results" : "Next question"}
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}

function Nav() {
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const ids = ["top", ...NAV.map((n) => n[0])];
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let cur = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={"cc-nav " + (scrolled ? "cc-nav-solid" : "")}>
      <a href="#top" className="cc-brand">ANURAG<span>// OS</span></a>
      <div className="cc-nav-links">
        {NAV.map(([id, label]) => (
          <a key={id} href={"#" + id} className={active === id ? "cc-on" : ""}>{label}</a>
        ))}
      </div>
      <div className="cc-nav-pill"><span className="cc-pulse" />Readiness {READINESS}</div>
    </nav>
  );
}

const SECTOR_QUESTIONS = {
  Healthcare: [
    {
      q: "How would you redesign a digital front door for a healthcare system serving millions of patients?",
      why: "Tests your ability to manage high-complexity integrations (EHR, billing) while optimizing patient access and ensuring strict WCAG 2.2 accessibility.",
      mistakes: "Focusing solely on a clean search bar or pretty landing page illustration without discussing clinical constraints (HIPAA, Medicare, provider load).",
      structure: "1. Strategic goals (conversion, access, deflection). 2. Patient access journey mapping. 3. Backstage clinical integrations (EHR, scheduling systems). 4. Accessibility-first design tokens. 5. Quantified outcomes.",
      answer: "I would approach this by aligning patient navigation with health system capacity. At Providence, we faced a similar challenge standardizing 10+ surfaces. First, I would implement a unified triage engine (AI-triage or guided symptom checks) that defers to provider scheduling systems like Epic or Cerner. Second, I would ensure that the scheduling slot database syncs in real-time, reducing contact-center load. Third, because healthcare services serve diverse demographics, I would embed WCAG 2.2 AA accessibility requirements directly into our token structure (such as screen-reader labels and focus indicators). The target outcome is contact-center deflection and conversion lift—similar to the 25% lift I led on the Trusana mental health platform, which directly improved care access and scheduling completion.",
      connect: "Connect this to your Trusana 25% conversion lift and Providence design system standardization across 10+ surfaces."
    }
  ],
  "E-Commerce": [
    {
      q: "How would you optimize cart-to-checkout flows for an enterprise marketplace experiencing high abandonment rates?",
      why: "Checks your A/B testing and experimentation rigor, and your ability to design checkout systems that balance security with speed.",
      mistakes: "Proposing a generic 'redesign' of the page layout instead of focusing on metrics like Average Order Value (AOV) and cart funnel analysis.",
      structure: "1. Funnel data teardown. 2. Identification of friction elements (guest checkout, payment, form validations). 3. Iterative testing strategy. 4. Measured performance outcomes.",
      answer: "I would start with a detailed funnel drop-off analysis. E-commerce checkout optimization is about removing micro-frictions. I would test: (a) guest checkout options to remove onboarding gates, (b) progressive address autocomplete and inline validation, and (c) dynamic payment integration (Apple Pay, Google Pay). In my work, I prioritize A/B testing—measuring how changes impact conversion and AOV. Similar to standardizing forms via a central design system, we can reduce form completion time by 35%, which directly correlates with a lower abandonment rate and higher purchase completions.",
      connect: "Link this to your ability to speed up task completion by 35% and design reusable component patterns that convert."
    }
  ],
  Finance: [
    {
      q: "How do you design high-trust risk communication interfaces for investment and wealth products?",
      why: "Tests your ability to convey regulatory information clearly without overwhelming the user, maintaining trust under high-stakes conditions.",
      mistakes: "Hiding risk details in small print (legal deflection) or over-simplifying risk so that users make uninformed decisions (ethical liability).",
      structure: "1. Trust taxonomy (transparency, control, clarity). 2. Progressive disclosure of risk/compliance details. 3. Interactive wealth forecasting visualizations. 4. Accessible risk disclosures.",
      answer: "Trust is built through transparency and predictability. I design risk communication using progressive disclosure: presenting a clean dashboard with immediate action items, while offering deep-dive access to details and security indicators (KYC flows). For wealth products, I use interactive charts that show best-case and worst-case scenarios, ensuring colorblind accessibility (WCAG 2.2) so contrast alone doesn't convey risk. I tie this to enterprise design systems where risk warnings are standard, reusable components, maintaining compliance across 10+ platform surfaces.",
      connect: "Connect this to your experience in legacy modernization and accessibility-first component strategies."
    }
  ],
  "Tourism & Hospitality": [
    {
      q: "How would you optimize a hotel discovery and booking path to handle dynamic pricing and multi-language requirements?",
      why: "Evaluates your ability to handle internationalization (i18n), dynamic database updates, and look-to-book ratio optimization.",
      mistakes: "Overlooking how translations affect text wrapping and layout, or failing to address price-change notifications.",
      structure: "1. Inspiration-to-booking journey. 2. Internationalization (i18n) design systems. 3. Dynamic pricing communication. 4. Performance metrics (look-to-book).",
      answer: "My approach is built on inspiration-to-booking clarity. In my early career, I designed hotel discovery systems that faced these exact constraints. To support multi-language layouts, our design tokens must account for text length variances (e.g. German text is often 30% longer than English). For dynamic pricing, we must communicate changes immediately during the booking flow without breaking user flow, using micro-interactions. The metric target is the look-to-book ratio—simplifying filters and card structures to get users to checkout 30% faster.",
      connect: "Tie this back to your early startup days building tourism platforms and your deep knowledge of responsive CSS layouts."
    }
  ],
  Telecom: [
    {
      q: "How do you redesign plan comparison and billing tools to deflect support calls and reduce customer churn?",
      why: "Checks your ability to simplify extremely complex telecom plan architectures (bundles, add-ons, prepaid/postpaid) into clear self-service tools.",
      mistakes: "Designing a generic comparison grid that ignores complex add-ons or billing shock scenarios.",
      structure: "1. Self-service utility mapping. 2. Simplifying billing structures. 3. Omnichannel handoff points. 4. Support deflection metrics.",
      answer: "Telecom customers churn primarily due to bill-shock or plan confusion. I would redesign the plan page using a modular card system with toggle comparison layers, built into the core design system. For billing, I would introduce proactive outages alerts and an interactive invoice teardown highlighting charges. At Providence, we reduced task completion time by 35% by simplifying database interactions—applying that same logic here, a self-service Billing Portal can deflect 40% of standard billing calls to contact centers.",
      connect: "Link this directly to your 40% operational efficiency improvement and 35% task completion speedup."
    }
  ],
  "Enterprise SaaS": [
    {
      q: "How do you scale user onboarding for B2B enterprise consoles with complex permissions and role-based access control?",
      why: "Tests your ability to manage high-complexity admin workflows, seat activation, and time-to-value (TTV) metrics.",
      mistakes: "Creating a long walkthrough tutorial that users skip, or ignoring the different needs of admins vs. standard users.",
      structure: "1. Persona-based onboarding pathways. 2. Permission grouping and inheritance models. 3. Time-to-value (TTV) optimization. 4. Enterprise governance.",
      answer: "In enterprise SaaS, time-to-value is everything. Rather than static tours, I use role-based onboarding: an admin sees a setup checklist, while an end-user sees a simplified task dashboard. For permission matrices, I design grouping templates that simplify role assignments. When modernizing internal tools (like the ATS/PS&D workflow), we standardized layout grids and permissions, reducing task completion time by 35% and improving admin setup efficiency by 40%.",
      connect: "Connect this to your enterprise workflow redesigns and 35% task completion time reduction."
    }
  ],
  "Automobile & Physical Product": [
    {
      q: "How do you design in-car infotainment (HMI) screens to minimize driver distraction while maintaining a premium brand experience?",
      why: "Checks your safety-critical design experience, HMI standards (NHTSA guidelines), and screen-to-voice interaction paradigms.",
      mistakes: "Designing complex touchscreen menus with small tap targets that require the driver to look away from the road.",
      structure: "1. Distraction limits (the 2-second look rule). 2. Large, touch-friendly grid system. 3. Voice-control and tactile backup loops. 4. Premium dark-mode aesthetics.",
      answer: "Infotainment UX is safety-critical. I design around the '2-second rule': drivers should never look at a screen for more than 2 seconds. I use high-contrast dark modes, large tap targets (minimum 48px), and physical dial feedback. Additionally, I prioritize voice-first actions for destination input. The aesthetic should feel premium—using custom HSL palettes and glassmorphic elevations, similar to this dashboard command center. I also align our HMI components with a unified design token system to ensure rapid prototyping across different physical dashboard screens.",
      connect: "Showcase your aesthetic craft, glassmorphic UI, and systematic design tokens."
    }
  ],
  "AI Product Experience": [
    {
      q: "How do you design trust loops and human-in-the-loop workflows for AI-generated reports or predictions?",
      why: "Tests your understanding of AI limitations (hallucinations, latency) and your ability to design confidence indicators and editing interfaces.",
      mistakes: "Treating AI as a magic box that is always right, or providing no way for users to edit the AI's output.",
      structure: "1. Confidence levels and annotations. 2. Actionable correction loops. 3. Handling latency progressively. 4. Human-AI collaboration models.",
      answer: "Trust is built when the user remains in control. When designing AI experiences (such as a medical diagnosis or risk predictor), I follow a three-step trust loop: first, show a confidence score with citations; second, design immediate correction triggers (inline inputs); third, enable the user to approve or reject recommendations before they affect the system database. This ensures a true 'human-in-the-loop' model, transforming AI from an automation tool into a collaborative partner.",
      connect: "Connect this to your AI-native workflows (Claude, Google Stitch) and your positioning as an AI Design Transformation Leader."
    }
  ],
  "Digital Transformation": [
    {
      q: "How do you lead the modernization of a fragmented legacy platform without disrupting business operations?",
      why: "Evaluates your strategic leadership, risk management, design system rollout, and stakeholder alignment skills.",
      mistakes: "Proposing a massive 'big bang' release that breaks integrations and causes user backlash.",
      structure: "1. Legacy system mapping and blueprints. 2. Design system token alignment. 3. Phased rollout (the Strangler Pattern). 4. Measuring adoption and efficiency.",
      answer: "Successful digital transformation is phased and metric-driven. I start by mapping the ecosystem's service blueprint. I then establish a design system token layer that sits on top of legacy code, allowing us to modernization styles incrementally. We did this across 10+ surfaces, reducing design-to-development cycle times by 30%. I roll out changes in phases—first to internal pilot groups, measuring task success and error rates. The business outcome is clear: at Providence, our modernization lowered task completion times by 35% and raised operational efficiency by 40%.",
      connect: "Anchor this to your 16+ years experience, 40% operational efficiency gain, 30% dev cycle reduction, and Providence design systems."
    }
  ]
};

function SectorInterviewBank() {
  const keys = Object.keys(SECTOR_QUESTIONS);
  const [activeTab, setActiveTab] = useState(keys[0]);
  const [openIndex, setOpenIndex] = useState(0);

  const questions = SECTOR_QUESTIONS[activeTab] || [];

  return (
    <Section id="sector-interview" eyebrow="11 · Sector prep"
      title="Sector-Specific Interview Questions"
      kicker="Review target-role questions, weaknesses, ideal structures, and boardroom-ready responses tailored to Anurag's unique hybrid capability.">
      <div className="cc-tabs">
        {keys.map((k) => (
          <button key={k} className={"cc-tab " + (activeTab === k ? "cc-tab-on" : "")}
            onClick={() => { setActiveTab(k); setOpenIndex(0); }}>
            {k}
          </button>
        ))}
      </div>
      <div className="cc-sector-interview-list card-fade" key={activeTab}>
        {questions.map((q, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div className={"cc-gap " + (isOpen ? "cc-gap-open" : "")} key={q.q} onClick={() => setOpenIndex(isOpen ? -1 : idx)}>
              <div className="cc-gap-head">
                <div className="cc-gap-cap" style={{ fontSize: "16px", color: "var(--ink)" }}>{q.q}</div>
                <span className="cc-road-chev">{isOpen ? "–" : "+"}</span>
              </div>
              <div className="cc-gap-body" style={{ maxHeight: isOpen ? 800 : 0 }}>
                <div className="cc-sector-prep-content">
                  <div className="cc-sector-grid-row">
                    <div>
                      <b>Why they ask</b>
                      <p>{q.why}</p>
                    </div>
                    <div>
                      <b>Common mistakes to avoid</b>
                      <p>{q.mistakes}</p>
                    </div>
                  </div>
                  <div className="cc-sector-block">
                    <b>Ideal answer structure</b>
                    <p>{q.structure}</p>
                  </div>
                  <div className="cc-sector-block cc-arena-star">
                    <b>Boardroom-Ready Sample Answer (Anurag Challapalli)</b>
                    <p style={{ fontStyle: "normal", fontSize: "15px", lineHeight: "1.6" }}>{q.answer}</p>
                  </div>
                  <div className="cc-sector-block" style={{ borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
                    <span className="cc-card-tag" style={{ color: "var(--gold)" }}>Executive Tie-In Strategy</span>
                    <p style={{ margin: "5px 0 0", color: "var(--muted)", fontSize: "13.5px" }}>{q.connect}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const STORYTELLING_DATA = [
  {
    q: "Tell me about yourself.",
    rationale: "Checks if you can introduce yourself strategically, highlighting leadership altitude rather than just reciting your resume chronologically.",
    framework: "1. The Hook (Who you are at altitude) -> 2. The Proof Points (Scale and metric wins) -> 3. The Future Fit (Why this role is the natural next step)",
    answer: "I am an Enterprise UX Architect and Full-Stack Product Designer with 16+ years of experience transforming complex digital products into measurable business outcomes. I specialize in bridging the gap between product strategy, user research, scalable design systems, accessibility compliance, and code. Over my career, I've led design operations standardizing systems across 10+ surfaces, which reduced design-to-development cycles by 30% and platform visual inconsistencies by 60%. In product roles, I've driven growth loops that delivered outcomes like a 25% conversion lift on the Trusana mental health platform and improved workflow task completion times by 35% on recruiter consoles. Most recently, I've integrated AI design operations like Figma Make and Claude into live workflows to increase efficiency by 40%. I'm looking for a Principal or Director role where I can scale design quality and lead teams to drive measurable business transformation."
  },
  {
    q: "Why UX Director?",
    rationale: "Tests your transition from individual craft output to team scaling, budget authority, design operations, and business alignment.",
    framework: "1. Leadership evolution -> 2. Team scaling & DesignOps wins -> 3. Elevating design maturity to impact company profit and velocity.",
    answer: "I am pursuing a UX Director role because my value is now scaled through team empowerment, operational alignment, and strategic design gates. Over 16+ years, I have moved past component craft. I spend my time establishing design-to-dev contribution pipelines, defining token standards, mentoring design leads, and defending budgets. For instance, by aligning our design systems with engineering codebases, I saved thousands of development hours. As a Director, I want to establish UX quality metrics directly linked to product OKRs, ensuring that design acts as a revenue driver rather than a cost center."
  },
  {
    q: "Why Principal UX Architect?",
    rationale: "Evaluates your ability to handle extreme platform complexity, define information architecture at scale, and simplify legacy platform workflows.",
    framework: "1. Platform complexity mastery -> 2. Service blueprinting and alignment -> 3. Standardizing systems to ensure cross-product coherence.",
    answer: "Principal UX Architecture is about simplifying complexity without flattening domain details. I thrive when mapping service blueprints for multi-tier applications and resolving legacy database constraints. When standardizing 10+ surfaces, my focus was not just on layout visual polish, but on token governance, information architecture coherence, and systemic keyboard/screen-reader compliance. I want to step into this role to architect unified ecosystems where humans, data, and workflows collaborate seamlessly."
  },
  {
    q: "Why Fortune 100?",
    rationale: "Tests if you can handle high compliance, large cross-functional teams, legacy system constraints, and massive user bases.",
    framework: "1. Scale appetite -> 2. Regulatory and compliance literacy -> 3. Driving multi-million dollar business outcomes.",
    answer: "I want to operate at Fortune 100 scale because that is where systematic design decisions have the highest leverage. Redesigning a workflow that affects millions of patients or standardizing billing tools across a massive telecom user base turns micro-interactions into millions of dollars in support deflection and conversion revenue. I am deeply comfortable working within regulatory constraints like HIPAA or WCAG 2.2 AA compliance. I want to apply my 16+ years of hybrid design-and-dev experience to drive change across large-scale enterprise surfaces."
  },
  {
    q: "How do you influence product strategy?",
    rationale: "Verifies if you have product thinking, speak in OKRs, and can argue based on user discovery and risk reduction rather than aesthetics.",
    framework: "1. Outcome definition -> 2. Mixed-method research signal -> 3. Prioritizing via OKRs/RICE -> 4. Concrete business win.",
    answer: "I influence product strategy by translating user discovery signals into risk mitigation models. I do not ask for a seat at the table; I earn it by showing the business risk of bad UX. For example, during a platform intake redesign, I used usability testing drop-off data to prove that user confusion on insurance verification was our main drop-off driver. I mapped this to the primary product OKR, proposed a conversational intake wizard, and delivered a 25% lift in enrollment conversion. When you connect design bets directly to company OKRs, product managers treat you as a core strategic partner."
  },
  {
    q: "How do you measure UX impact?",
    rationale: "Checks if you know the difference between vanity metrics (clicks, page views) and true product outcomes (conversion, support cost, cycle times).",
    framework: "1. Core metric types (Adoption, Usability, Business) -> 2. Baseline measurement -> 3. Quantified outcome from a shipped project.",
    answer: "I measure UX impact by linking user task success directly to business P&L outcomes. I track three key metrics: first, Conversion and Retention (e.g. Trusana's 25% lift); second, Operational Efficiency and Cycle Time (e.g. cutting recruiter posting times by 35% and improving database efficiency by 40%); third, Handoff Velocity (e.g. reducing design-to-development cycles by 30% via standardized tokens). Every design decision must start with a target baseline, and end with a quantified A/B test validation."
  },
  {
    q: "How do you handle difficult stakeholders?",
    rationale: "Evaluates your emotional intelligence, empathy, negotiation skills, and ability to use data rather than opinion to build consensus.",
    framework: "1. Empathy first (understand their incentive/OKR) -> 2. Re-frame the dispute against business objectives -> 3. Co-own a low-risk test/validation loop.",
    answer: "I handle difficult stakeholders by first diagnosing what they are measured on. If an engineering leader objects to a design because of build time, I do not argue about usability. Instead, I review their sprint capacity, propose a phased rollout (the Strangler pattern), and leverage design system tokens to lower their implementation effort. If a business lead objects, I re-frame the design bet against their own OKR targets. By shifting the conversation from aesthetic opinions to shared business risks, we align faster and co-own the validation test."
  },
  {
    q: "How do you scale design systems?",
    rationale: "Verifies that you know how to build operations, contribution frameworks, token style dictionaries, and drive developer adoption.",
    framework: "1. Tokenization and tool setup -> 2. Federated contribution pipeline -> 3. Adoption metrics and ROI reporting.",
    answer: "Scaling a design system is 20% component design and 80% governance and operations. To scale standardizations across 10+ surfaces, I implemented a style dictionary pipeline that translates JSON tokens directly into React, Angular, and JSP codebases. This eliminated developer manual re-writes. Second, I introduced a federated contribution model where product teams can propose new patterns via a clear review gate. Finally, I tracked adoption using scanner scripts in code repos, proving a 30% reduction in cycle times to keep the project funded."
  },
  {
    q: "How do you lead without authority?",
    rationale: "Essential for Principal designers who must direct cross-functional teams and align product roadmaps without direct reports.",
    framework: "1. Establishing quality standards and review rituals -> 2. Providing high-utility tooling -> 3. Educating the team on UX ROI.",
    answer: "Leading without authority requires building trust through utility and structured rituals. I introduced weekly design critiques and UX quality gates that engineering and product leads joined. Rather than acting as a gatekeeper, I provided teams with high-utility assets—like ready-to-use form layouts, pre-annotated accessibility specifications, and AI-enabled prompting templates. When you help teams ship their features faster with higher quality, they naturally look to you for strategic guidance."
  },
  {
    q: "How do you use AI in UX?",
    rationale: "Tests if you are future-ready, understand AI safety/trust, and how to automate design operations without losing human-centered design rigor.",
    framework: "1. Automation layer (tools you run) -> 2. AI product design patterns -> 3. Operational efficiency outcomes.",
    answer: "I treat AI both as a productivity accelerant and as a new product experience paradigm. Operationally, I use tools like Figma Make, Claude, and Google Stitch to automate mockup variations, synthesis logs, and accessibility code snippets, boosting design output by 45%. Strategically, I design AI-native product flows—like healthcare care copilots—by building human-in-the-loop validation patterns, explainability tags (explaining why the AI made a recommendation), and graceful error correction states to protect patient safety."
  },
  {
    q: "What is your leadership philosophy?",
    rationale: "Checks your self-awareness, mentoring style, and how you foster a culture of quality, inclusion, and accountability.",
    framework: "1. Servant leadership core -> 2. Focus on systematic excellence and tooling -> 3. Psychological safety combined with high standards.",
    answer: "My leadership philosophy is centered on systemic empowerment. My job as a leader is to build the environment, tools, and quality gates that enable designers to do their best work. I combine high standards of craft with psychological safety: we critique the work heavily, but support the designer fully. I measure my success by how many of my team members transition to senior and lead roles, and how easily our design operations scale without my day-to-day oversight."
  },
  {
    q: "What makes you different?",
    rationale: "The ultimate positioning question. Tests if you can summarize your unique hybrid value proposition in a memorable way.",
    framework: "1. The hybrid pitch -> 2. The multi-sector range -> 3. The bottom-line business outcome statement.",
    answer: "Most candidates speak design. I speak business, research, systems, code, accessibility, and AI transformation. Having 16+ years of experience across healthcare, SaaS, commerce, and finance, I am comfortable writing a React component, annotating WCAG AA tags, defining design token architecture, and presenting a conversion roadmap to a C-level executive in the boardroom. I do not just design interfaces; I orchestrate product systems that deliver measurable, scalable business outcomes."
  }
];

function ExecutiveStorytelling() {
  const [sel, setSel] = useState(0);
  const currentItem = STORYTELLING_DATA[sel] || STORYTELLING_DATA[0];

  return (
    <Section id="storytelling" eyebrow="12 · Storytelling"
      title="Executive Storytelling Engine"
      kicker="Twelve strategic boardroom response frameworks. Tap any leadership question to load its intent, structural framework, and a direct response customized for Anurag Challapalli.">
      <div className="cc-arena">
        <div className="cc-arena-list" style={{ maxHeight: "480px", overflowY: "auto", paddingRight: "4px" }}>
          {STORYTELLING_DATA.map((item, idx) => (
            <button key={item.q} className={"cc-arena-item " + (sel === idx ? "cc-arena-on" : "")}
              onClick={() => setSel(idx)}>
              <span className="cc-arena-i">{String(idx + 1).padStart(2, "0")}</span>{item.q}
            </button>
          ))}
        </div>
        <div className="cc-arena-detail card-fade" key={sel}>
          <h3 className="cc-arena-title" style={{ fontSize: "20px", color: "var(--ink)", fontFamily: "Space Grotesk", borderBottom: "1px solid var(--line)", paddingBottom: "12px" }}>
            “{currentItem.q}”
          </h3>
          <div className="cc-arena-block" style={{ marginTop: "14px" }}>
            <div className="cc-card-tag" style={{ color: "var(--gold)" }}>Interviewer Intent & Rationale</div>
            <p style={{ fontSize: "14px", color: "var(--muted)" }}>{currentItem.rationale}</p>
          </div>
          <div className="cc-arena-block">
            <div className="cc-card-tag" style={{ color: "var(--blue)" }}>Structural Framework</div>
            <p style={{ fontSize: "14px", color: "var(--muted)", fontStyle: "italic" }}>{currentItem.framework}</p>
          </div>
          <div className="cc-arena-block cc-arena-star" style={{ background: "rgba(34,197,169,0.06)", border: "1px solid rgba(34,197,169,0.22)", padding: "18px" }}>
            <div className="cc-card-tag" style={{ color: "var(--violet)", marginBottom: "8px" }}>Boardroom Response (Anurag Challapalli)</div>
            <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "var(--ink)" }}>{currentItem.answer}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ----------------------------- ROOT APP --------------------------------- */

export default function App() {
  return (
    <div className="cc-root">
      <style>{CSS}</style>
      <Nav />
      <Hero />
      <main>
        <Profile />
        <GapAnalyzer />
        <Roadmap />
        <Academy />
        <MaterialsLibrary />
        <LifecycleLearning />
        <Domains />
        <PortfolioLab />
        <ResumeEngine />
        <Arena />
        <SectorInterviewBank />
        <ExecutiveStorytelling />
        <MockCenter />
        <AIFuture />
        <Plan />
        <ReadinessScorecard />
        <Quiz />
      </main>
      <footer className="cc-footer">
        <p className="cc-footer-line">
          “Anurag Challapalli — the Full-Stack UX Architect transforming business strategy,
          human experience, design systems, accessibility, code and AI into measurable enterprise outcomes.”
        </p>
        <div className="cc-footer-meta">Career transformation command center · built for the next title.</div>
      </footer>
    </div>
  );
}

/* ----------------------------- STYLES ----------------------------------- */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

.cc-root{
  --bg:#070B16; --panel:#0E1424; --panel2:#121A2E;
  --blue:#3B82F6; --violet:#22C7A9; --gold:#E8B04B;
  --ink:#E7ECF6; --muted:#93A2BC; --line:rgba(255,255,255,0.09);
  background:var(--bg); color:var(--ink);
  font-family:'Inter',system-ui,sans-serif; line-height:1.55;
  -webkit-font-smoothing:antialiased; overflow-x:hidden;
}
.cc-root *{box-sizing:border-box;}
.cc-root a{color:inherit;text-decoration:none;}

/* NAV */
.cc-nav{position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;justify-content:space-between;
  padding:14px 28px;background:rgba(7,11,22,0.88);backdrop-filter:blur(14px);
  border-bottom:1px solid var(--line);transition:box-shadow .3s,border-color .3s;}
.cc-nav-solid{box-shadow:0 12px 34px -26px rgba(0,0,0,.8);}
.cc-brand{font-family:'Space Grotesk';font-weight:700;letter-spacing:.5px;font-size:18px;}
.cc-brand span{color:var(--gold);font-weight:500;margin-left:2px;font-size:13px;}
.cc-nav-links{display:flex;gap:22px;font-size:13px;color:var(--muted);}
.cc-nav-links a{transition:color .2s;position:relative;}
.cc-nav-links a:hover{color:var(--ink);}
.cc-nav-links a.cc-on{color:var(--ink);}
.cc-nav-links a.cc-on:after{content:"";position:absolute;left:0;right:0;bottom:-7px;height:2px;
  background:linear-gradient(90deg,var(--blue),var(--violet));border-radius:2px;}
.cc-nav-pill{display:flex;align-items:center;gap:8px;font-family:'IBM Plex Mono';font-size:12px;
  padding:7px 13px;border:1px solid var(--line);border-radius:99px;color:var(--muted);background:rgba(255,255,255,0.02);}
.cc-pulse{width:8px;height:8px;border-radius:50%;background:var(--gold);box-shadow:0 0 0 0 rgba(232,176,75,.6);animation:pulse 2s infinite;}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(232,176,75,.5);}70%{box-shadow:0 0 0 8px rgba(232,176,75,0);}100%{box-shadow:0 0 0 0 rgba(232,176,75,0);}}

/* HERO */
.cc-hero{position:relative;padding:118px 28px 0;max-width:1180px;margin:0 auto;}
.cc-hero-grid{position:absolute;inset:-40px 0 auto;height:520px;z-index:0;pointer-events:none;
  background:
   radial-gradient(620px 380px at 78% 18%, rgba(34,197,169,.16), transparent 70%),
   radial-gradient(560px 340px at 12% 8%, rgba(59,130,246,.18), transparent 70%),
   linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
   linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size:auto,auto,44px 44px,44px 44px;mask-image:linear-gradient(#000,transparent);}
.cc-hero-inner{position:relative;z-index:1;display:grid;grid-template-columns:1.45fr 1fr;gap:40px;align-items:center;}
.cc-eyebrow{font-family:'IBM Plex Mono';font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:18px;}
.cc-h1{font-family:'Space Grotesk';font-weight:700;font-size:clamp(30px,4.4vw,52px);line-height:1.06;letter-spacing:0;margin:0 0 20px;}
.cc-grad{background:linear-gradient(100deg,var(--blue),var(--violet) 55%,var(--gold));-webkit-background-clip:text;background-clip:text;color:transparent;}
.cc-lede{color:var(--muted);font-size:17px;max-width:560px;margin:0 0 26px;}
.cc-cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:34px;}
.cc-btn{font-size:14px;padding:11px 18px;border:1px solid var(--line);border-radius:8px;color:var(--ink);
  background:rgba(255,255,255,0.025);transition:all .2s;cursor:pointer;}
.cc-btn:hover{border-color:rgba(255,255,255,.28);transform:translateY(-2px);}
.cc-btn-pri{background:linear-gradient(100deg,var(--blue),var(--violet));border-color:transparent;font-weight:600;
  box-shadow:0 8px 26px -10px rgba(34,197,169,.55);}
.cc-maturity{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;border-top:1px solid var(--line);padding-top:22px;}
.cc-mat-dot{width:10px;height:10px;border-radius:50%;background:linear-gradient(var(--blue),var(--violet));margin-bottom:9px;}
.cc-mat-k{font-family:'Space Grotesk';font-weight:600;font-size:13.5px;}
.cc-mat-s{color:var(--muted);font-size:11.5px;margin-top:2px;}
.cc-hero-right{display:flex;justify-content:center;}

/* RING */
.cc-ring-wrap{position:relative;width:260px;height:260px;}
.cc-ring{width:100%;height:100%;filter:drop-shadow(0 14px 40px rgba(34,197,169,.24));}
.cc-ring-track{fill:none;stroke:rgba(255,255,255,.07);stroke-width:10;}
.cc-ring-prog{fill:none;stroke:url(#ringgrad);stroke-width:10;stroke-linecap:round;transition:stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1);}
.cc-ring-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;}
.cc-ring-num{font-family:'Space Grotesk';font-weight:700;font-size:62px;line-height:1;
  background:linear-gradient(120deg,#fff,var(--gold));-webkit-background-clip:text;background-clip:text;color:transparent;}
.cc-ring-label{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-top:6px;max-width:130px;}
.cc-ring-sub{font-family:'IBM Plex Mono';font-size:11px;color:var(--gold);margin-top:6px;}

/* STAT ROW */
.cc-stat-row{position:relative;z-index:1;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:54px 0 12px;}
.cc-stat{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:20px;}
.cc-stat-v{font-family:'Space Grotesk';font-weight:700;font-size:34px;color:var(--gold);}
.cc-stat-l{color:var(--muted);font-size:12.5px;margin-top:4px;}

/* SECTIONS */
.cc-section{max-width:1180px;margin:0 auto;padding:84px 28px;scroll-margin-top:86px;}
.cc-reveal{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s cubic-bezier(.22,1,.36,1);}
.cc-reveal.cc-in{opacity:1;transform:none;}
.cc-h2{font-family:'Space Grotesk';font-weight:700;font-size:clamp(24px,3vw,36px);letter-spacing:0;margin:6px 0 0;max-width:780px;line-height:1.12;}
.cc-kicker{color:var(--muted);font-size:15.5px;max-width:680px;margin:14px 0 36px;}

/* CARDS */
.cc-card{background:linear-gradient(180deg,var(--panel),var(--panel2));border:1px solid var(--line);
  border-radius:8px;padding:22px;position:relative;overflow:hidden;}
.cc-card-tag{font-family:'IBM Plex Mono';font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:12px;}
.cc-ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;}
.cc-ul li{position:relative;padding-left:18px;font-size:14px;color:var(--ink);}
.cc-ul li:before{content:"";position:absolute;left:0;top:8px;width:6px;height:6px;border-radius:50%;background:linear-gradient(var(--blue),var(--violet));}

/* PROFILE */
.cc-profile{display:grid;grid-template-columns:1.3fr 1fr;gap:22px;}
.cc-radar-box{height:340px;}
.cc-legend{display:flex;gap:20px;justify-content:center;margin-top:6px;font-size:12px;color:var(--muted);}
.cc-legend i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:middle;}
.cc-profile-side{display:flex;flex-direction:column;gap:14px;}
.cc-pill-card{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:18px;transition:transform .2s,border-color .2s;}
.cc-pill-card:hover{transform:translateY(-3px);border-color:rgba(34,197,169,.38);}
.cc-pill-k{font-family:'Space Grotesk';font-weight:600;font-size:15px;}
.cc-pill-d{color:var(--muted);font-size:13px;margin-top:5px;}

/* GAP */
.cc-gap-list{display:flex;flex-direction:column;gap:12px;}
.cc-gap{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:18px 20px;cursor:pointer;transition:border-color .2s,background .2s;}
.cc-gap:hover{border-color:rgba(255,255,255,.2);}
.cc-gap-open{border-color:rgba(34,197,169,.42);background:var(--panel2);}
.cc-gap-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;}
.cc-gap-cap{font-family:'Space Grotesk';font-weight:600;font-size:15.5px;}
.cc-gap-role{font-size:12px;color:var(--muted);margin-top:2px;}
.cc-gap-meta{display:flex;align-items:center;gap:12px;}
.cc-lvl{font-family:'IBM Plex Mono';font-size:12px;color:var(--muted);}
.cc-gap-badge{font-size:11px;padding:4px 10px;border:1px solid;border-radius:99px;font-weight:600;}
.cc-bar{position:relative;height:7px;border-radius:6px;background:rgba(255,255,255,.06);margin-top:14px;overflow:visible;}
.cc-bar-fill{height:100%;border-radius:6px;background:linear-gradient(90deg,var(--blue),var(--violet));}
.cc-bar-target{position:absolute;top:-3px;width:2px;height:13px;background:var(--gold);border-radius:2px;}
.cc-gap-body{overflow:hidden;transition:max-height .35s ease;}
.cc-gap-detail-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:16px;}
.cc-gap-body p{color:var(--muted);font-size:13.5px;margin:0;background:rgba(255,255,255,.025);border:1px solid var(--line);border-radius:8px;padding:13px;}
.cc-gap-body b{display:block;color:var(--ink);font-family:'Space Grotesk';font-size:13px;margin-bottom:5px;}

/* ROADMAP */
.cc-road{display:flex;flex-direction:column;gap:12px;}
.cc-road-card{background:var(--panel);border:1px solid var(--line);border-radius:8px;overflow:hidden;transition:border-color .2s;}
.cc-road-open{border-color:rgba(59,130,246,.45);}
.cc-road-head{width:100%;display:flex;align-items:center;gap:16px;padding:18px 20px;background:none;border:none;color:var(--ink);cursor:pointer;text-align:left;}
.cc-road-tag{font-family:'IBM Plex Mono';font-size:11px;color:var(--gold);border:1px solid var(--line);border-radius:6px;padding:3px 8px;}
.cc-road-t{font-family:'Space Grotesk';font-weight:600;font-size:16px;flex:1;}
.cc-road-chev{font-size:22px;color:var(--muted);font-family:'Space Grotesk';}
.cc-road-body{overflow:hidden;transition:max-height .4s ease;}
.cc-chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 20px 20px;}
.cc-chip{font-size:12.5px;color:var(--ink);background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:99px;padding:6px 12px;}

/* ACADEMY */
.cc-academy{display:grid;grid-template-columns:340px 1fr;gap:20px;}
.cc-academy-list{display:flex;flex-direction:column;gap:8px;}
.cc-academy-item{display:flex;flex-direction:column;gap:5px;text-align:left;font-size:15px;padding:15px 16px;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.02);color:var(--ink);cursor:pointer;transition:all .2s;font-family:'Space Grotesk';}
.cc-academy-item span{font-family:'IBM Plex Mono';font-size:11px;color:var(--muted);}
.cc-academy-item:hover{border-color:rgba(255,255,255,.22);transform:translateY(-2px);}
.cc-academy-on{border-color:transparent;background:linear-gradient(100deg,rgba(59,130,246,.24),rgba(34,197,169,.18));}
.cc-academy-detail{min-height:100%;}
.cc-academy-detail h3{font-family:'Space Grotesk';font-size:25px;line-height:1.15;margin:0 0 18px;}
.cc-academy-chips{padding:0;margin-bottom:22px;}
.cc-output{border-top:1px solid var(--line);padding-top:18px;color:var(--ink);font-size:15px;}
.cc-output span{display:block;font-family:'IBM Plex Mono';font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:7px;}

/* LIFECYCLE */
.cc-life{display:grid;grid-template-columns:310px 1fr;gap:20px;align-items:start;}
.cc-life-rail{position:sticky;top:86px;display:flex;flex-direction:column;gap:8px;max-height:calc(100vh - 110px);overflow:auto;padding-right:4px;}
.cc-life-step{display:flex;align-items:center;gap:10px;text-align:left;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.02);color:var(--muted);padding:12px 13px;font-family:'Inter';font-size:13px;cursor:pointer;transition:all .2s;}
.cc-life-step span{font-family:'IBM Plex Mono';font-size:11px;color:var(--gold);min-width:24px;}
.cc-life-step:hover{color:var(--ink);border-color:rgba(255,255,255,.22);}
.cc-life-on{color:var(--ink);border-color:transparent;background:linear-gradient(100deg,rgba(59,130,246,.24),rgba(34,197,169,.18));}
.cc-life-detail{background:linear-gradient(180deg,var(--panel),var(--panel2));border:1px solid var(--line);border-radius:8px;padding:24px;}
.cc-life-top{display:flex;justify-content:space-between;gap:18px;align-items:start;margin-bottom:18px;}
.cc-life-top h3{font-family:'Space Grotesk';font-size:26px;line-height:1.12;margin:0;}
.cc-life-badge{font-family:'IBM Plex Mono';font-size:11px;color:var(--gold);border:1px solid rgba(232,176,75,.35);border-radius:99px;padding:6px 10px;white-space:nowrap;}
.cc-life-compare{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;}
.cc-life-compare div{background:rgba(255,255,255,.025);border:1px solid var(--line);border-radius:8px;padding:16px;}
.cc-life-compare span{display:block;color:var(--gold);font-family:'IBM Plex Mono';font-size:11px;letter-spacing:1.3px;text-transform:uppercase;margin-bottom:7px;}
.cc-life-compare p{font-size:14px;color:var(--ink);margin:0;}
.cc-life-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
.cc-life-card{background:rgba(255,255,255,.025);border:1px solid var(--line);border-radius:8px;padding:16px;}
.cc-life-interview{background:linear-gradient(180deg,rgba(232,176,75,.08),rgba(255,255,255,.025));border-color:rgba(232,176,75,.24);}

/* DOMAINS */
.cc-tabs{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:24px;}
.cc-tab{font-size:13px;padding:8px 15px;border:1px solid var(--line);border-radius:99px;background:rgba(255,255,255,.02);color:var(--muted);cursor:pointer;transition:all .2s;font-family:'Inter';}
.cc-tab:hover{color:var(--ink);}
.cc-tab-on{color:var(--ink);border-color:transparent;background:linear-gradient(100deg,var(--blue),var(--violet));font-weight:600;}
.cc-domain-ctx{font-size:16px;color:var(--ink);max-width:760px;margin:0 0 22px;}
.cc-domain-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
.cc-card-ai{background:linear-gradient(180deg,rgba(232,176,75,.08),var(--panel2));border-color:rgba(232,176,75,.28);}
.cc-domain-ai{font-size:14px;color:var(--ink);margin:0;}
.card-fade{animation:fade .45s ease;}
@keyframes fade{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}

/* PORTFOLIO */
.cc-portfolio-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
.cc-portfolio-card h3{font-family:'Space Grotesk';font-size:20px;margin:0 0 16px;}
.cc-upgrade{margin-top:18px;padding-top:16px;border-top:1px solid var(--line);color:var(--muted);font-size:14px;}
.cc-upgrade span{display:block;color:var(--gold);font-family:'IBM Plex Mono';font-size:11px;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;}

/* RESUME */
.cc-resume{display:grid;grid-template-columns:240px 1fr;gap:20px;}
.cc-resume-tabs{display:flex;flex-direction:column;gap:8px;}
.cc-resume-tabs button{font-size:14px;text-align:left;padding:13px 15px;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.02);color:var(--muted);cursor:pointer;font-family:'Inter';}
.cc-resume-tabs button:hover{color:var(--ink);border-color:rgba(255,255,255,.2);}
.cc-resume-tabs .cc-resume-on{color:var(--ink);border-color:transparent;background:linear-gradient(100deg,rgba(59,130,246,.22),rgba(34,197,169,.16));}
.cc-resume-panels{display:grid;grid-template-columns:1fr 1.15fr;gap:16px;}
.cc-resume-panel{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:22px;}
.cc-resume-panel p{margin:0;color:var(--muted);font-size:15px;}
.cc-resume-after{background:linear-gradient(180deg,rgba(232,176,75,.08),var(--panel2));border-color:rgba(232,176,75,.3);}
.cc-resume-after p{color:var(--ink);font-family:'Space Grotesk';font-size:18px;line-height:1.4;}

/* ARENA */
.cc-arena{display:grid;grid-template-columns:300px 1fr;gap:20px;}
.cc-arena-list{display:flex;flex-direction:column;gap:6px;}
.cc-arena-item{display:flex;align-items:center;gap:12px;text-align:left;font-size:14px;padding:13px 15px;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.02);color:var(--muted);cursor:pointer;transition:all .2s;font-family:'Inter';}
.cc-arena-item:hover{color:var(--ink);border-color:rgba(255,255,255,.2);}
.cc-arena-on{color:var(--ink);border-color:transparent;background:linear-gradient(100deg,rgba(59,130,246,.22),rgba(34,197,169,.16));}
.cc-arena-i{font-family:'IBM Plex Mono';font-size:12px;color:var(--gold);}
.cc-arena-detail{background:linear-gradient(180deg,var(--panel),var(--panel2));border:1px solid var(--line);border-radius:8px;padding:26px;}
.cc-arena-title{font-family:'Space Grotesk';font-weight:700;font-size:22px;margin:0 0 18px;}
.cc-arena-block{margin-bottom:18px;}
.cc-arena-block p{font-size:14px;color:var(--muted);margin:0;}
.cc-arena-q{color:var(--ink) !important;font-style:italic;}
.cc-arena-star{background:rgba(232,176,75,.06);border:1px solid rgba(232,176,75,.22);border-radius:8px;padding:16px;}
.cc-arena-star p{color:var(--ink) !important;}

/* MOCK CENTER */
.cc-mock-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.cc-mock{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:20px;transition:transform .2s,border-color .2s;}
.cc-mock:hover{transform:translateY(-3px);border-color:rgba(232,176,75,.38);}
.cc-mock-mode{font-family:'Space Grotesk';font-weight:700;font-size:16px;margin-bottom:9px;}
.cc-mock p{color:var(--muted);font-size:14px;margin:0 0 16px;}
.cc-mock-score{font-family:'IBM Plex Mono';font-size:11px;line-height:1.5;color:var(--gold);border-top:1px solid var(--line);padding-top:13px;}

/* AI PHASES */
.cc-phases{display:flex;flex-direction:column;gap:0;}
.cc-phase{display:grid;grid-template-columns:60px 1fr;gap:18px;}
.cc-phase-rail{display:flex;flex-direction:column;align-items:center;}
.cc-phase-node{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk';font-weight:700;
  background:linear-gradient(var(--blue),var(--violet));box-shadow:0 6px 20px -6px rgba(34,197,169,.55);}
.cc-phase:not(:last-child) .cc-phase-rail:after{content:"";flex:1;width:2px;background:linear-gradient(var(--violet),rgba(255,255,255,.05));margin:6px 0;}
.cc-phase-card{margin-bottom:18px;}
.cc-phase-p{font-family:'IBM Plex Mono';font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);}
.cc-phase-t{font-family:'Space Grotesk';font-weight:700;font-size:19px;margin:4px 0 8px;}
.cc-phase-d{color:var(--muted);font-size:14px;margin:0 0 12px;}
.cc-phase-you{font-size:13.5px;color:var(--ink);border-top:1px solid var(--line);padding-top:12px;}
.cc-phase-you span{color:var(--violet);font-weight:600;}

/* PLAN */
.cc-plan{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.cc-plan-card{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:20px;transition:transform .2s,border-color .2s;}
.cc-plan-card:hover{transform:translateY(-3px);border-color:rgba(59,130,246,.4);}
.cc-plan-w{font-family:'IBM Plex Mono';font-size:12px;color:var(--gold);}
.cc-plan-t{font-family:'Space Grotesk';font-weight:600;font-size:16px;margin:6px 0 14px;}
.cc-longterm{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px;}
.cc-lt{background:linear-gradient(100deg,rgba(59,130,246,.1),rgba(34,197,169,.1));border:1px solid var(--line);border-radius:8px;padding:20px;}
.cc-lt b{font-family:'Space Grotesk';font-size:18px;display:block;margin-bottom:6px;color:var(--gold);}
.cc-lt span{color:var(--muted);font-size:14px;}

/* SCORECARD */
.cc-score-grid{display:grid;grid-template-columns:320px 1fr;gap:30px;align-items:center;}
.cc-score-list{display:flex;flex-direction:column;gap:13px;}
.cc-score-row{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:16px 18px;}
.cc-score-head{display:flex;justify-content:space-between;gap:18px;font-family:'Space Grotesk';font-weight:600;}
.cc-score-head b{color:var(--gold);}
.cc-score-row p{color:var(--muted);font-size:13px;margin:9px 0 0;}

/* QUIZ */
.cc-quiz{max-width:760px;}
.cc-quiz-q{font-family:'Space Grotesk';font-weight:600;font-size:18px;margin-bottom:18px;}
.cc-quiz-opts{display:flex;flex-direction:column;gap:10px;}
.cc-quiz-opt{text-align:left;font-size:14px;padding:14px 16px;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,.02);color:var(--ink);cursor:pointer;transition:all .18s;font-family:'Inter';}
.cc-quiz-opt:hover:not(:disabled){border-color:rgba(34,197,169,.5);transform:translateX(3px);}
.cc-quiz-opt:disabled{cursor:default;}
.cc-opt-correct{border-color:rgba(74,222,128,.6);background:rgba(74,222,128,.12);}
.cc-opt-wrong{border-color:rgba(248,113,113,.6);background:rgba(248,113,113,.1);}
.cc-quiz-why{margin-top:18px;padding-top:18px;border-top:1px solid var(--line);}
.cc-quiz-why p{color:var(--muted);font-size:14px;margin:6px 0 16px;}
.cc-quiz-result{text-align:center;max-width:480px;margin:0 auto;padding:40px;}
.cc-quiz-score{font-family:'Space Grotesk';font-weight:700;font-size:64px;color:var(--gold);}
.cc-quiz-score span{font-size:28px;color:var(--muted);}
.cc-quiz-pct{font-size:16px;color:var(--ink);margin:8px 0 24px;}

/* FOOTER */
.cc-footer{max-width:900px;margin:0 auto;padding:80px 28px 100px;text-align:center;}
.cc-footer-line{font-family:'Space Grotesk';font-weight:500;font-size:clamp(18px,2.4vw,26px);line-height:1.4;
  background:linear-gradient(100deg,#fff,var(--muted));-webkit-background-clip:text;background-clip:text;color:transparent;}
.cc-footer-meta{font-family:'IBM Plex Mono';font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-top:22px;}

/* LIBRARY */
.cc-lib-controls{display:flex;flex-direction:column;gap:16px;margin-bottom:24px;}
.cc-search-input{width:100%;font-size:14px;padding:12px 16px;border:1px solid var(--line);border-radius:8px;
  background:var(--panel2);color:var(--ink);font-family:'Inter';outline:none;transition:border-color .2s,box-shadow .2s;}
.cc-search-input:focus{border-color:var(--blue);box-shadow:0 0 10px rgba(59,130,246,0.25);}
.cc-lib-tabs{display:flex;flex-wrap:wrap;gap:8px;}
.cc-lib-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.cc-lib-card{display:flex;flex-direction:column;justify-content:space-between;height:100%;}
.cc-lib-meta-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
.cc-lib-badge-cat{font-family:'IBM Plex Mono';font-size:10px;color:var(--violet);border:1px solid rgba(34,197,169,0.3);padding:3px 8px;border-radius:4px;text-transform:uppercase;}
.cc-lib-badge-type{font-family:'IBM Plex Mono';font-size:10px;color:var(--gold);border:1px solid rgba(232,176,75,0.3);padding:3px 8px;border-radius:4px;text-transform:uppercase;}
.cc-lib-title{font-family:'Space Grotesk';font-size:18px;margin:0 0 12px;line-height:1.3;color:var(--ink);}
.cc-lib-details{display:flex;gap:16px;margin-bottom:12px;border-bottom:1px solid var(--line);padding-bottom:12px;}
.cc-lib-stat{font-size:12px;color:var(--muted);}
.cc-lib-stat b{display:block;font-size:10px;font-family:'IBM Plex Mono';text-transform:uppercase;color:var(--gold);margin-bottom:2px;}
.cc-lib-text{font-size:13px;color:var(--muted);margin:0 0 8px;}
.cc-lib-text b{color:var(--ink);font-family:'Space Grotesk';font-size:12.5px;margin-right:4px;}
.cc-lib-assignment{background:rgba(34,197,169,0.04);border:1px solid rgba(34,197,169,0.2);border-radius:6px;padding:12px;margin-top:auto;}
.cc-lib-assignment span{display:block;font-family:'IBM Plex Mono';font-size:10px;color:var(--violet);text-transform:uppercase;margin-bottom:4px;}
.cc-lib-assignment p{margin:0;font-size:12.5px;color:var(--ink);font-style:italic;}
.cc-no-results{grid-column:1/-1;text-align:center;color:var(--muted);padding:40px;border:1px dashed var(--line);border-radius:8px;}

/* QUIZ DASHBOARD */
.cc-quiz-dashboard{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;}
.cc-quiz-dashboard-card{text-align:left;cursor:pointer;transition:transform .2s,border-color .2s;background:none;border:1px solid var(--line);border-radius:8px;padding:20px;}
.cc-quiz-dashboard-card:hover{transform:translateY(-3px);border-color:rgba(34,197,169,.38);background:var(--panel2);}
.cc-quiz-dashboard-card h3{font-family:'Space Grotesk';font-size:18px;margin:0 0 8px;color:var(--ink);}
.cc-quiz-dashboard-card p{font-size:13px;color:var(--muted);margin:0 0 16px;line-height:1.4;}
.cc-quiz-dashboard-btn{font-family:'IBM Plex Mono';font-size:11px;color:var(--gold);text-transform:uppercase;}
.cc-quiz-result-meta{background:rgba(255,255,255,0.02);border:1px solid var(--line);border-radius:8px;padding:14px;margin-top:16px;text-align:left;}
.cc-quiz-result-meta b{font-family:'Space Grotesk';font-size:14px;color:var(--gold);display:block;margin-bottom:4px;}
.cc-quiz-result-meta p{margin:0;font-size:13px;color:var(--muted);}
.cc-quiz-actions{display:flex;gap:12px;justify-content:center;margin-top:20px;}

/* SECTOR PREP ACCORDION */
.cc-sector-prep-content{padding-top:14px;}
.cc-sector-grid-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px;}
.cc-sector-grid-row b{display:block;font-family:'Space Grotesk';font-size:13px;color:var(--gold);margin-bottom:4px;}
.cc-sector-grid-row p{margin:0;font-size:13.5px;color:var(--muted);background:rgba(255,255,255,.02);border:1px solid var(--line);border-radius:6px;padding:10px;}
.cc-sector-block{margin-bottom:14px;}
.cc-sector-block b{display:block;font-family:'Space Grotesk';font-size:13px;color:var(--blue);margin-bottom:4px;}
.cc-sector-block p{margin:0;font-size:13.5px;color:var(--muted);}

/* PORTFOLIO CARD ACTIVE */
.cc-portfolio-card-active{border-color:var(--gold) !important;box-shadow:0 0 12px rgba(232,176,75,0.18);background:var(--panel2) !important;}
.cc-portfolio-chips{padding:0;margin-bottom:14px;display:flex;gap:6px;flex-wrap:wrap;}

/* RESPONSIVE */
@media(max-width:920px){
  .cc-nav-links{display:none;}
  .cc-hero-inner{grid-template-columns:1fr;}
  .cc-hero-right{margin-top:10px;}
  .cc-stat-row{grid-template-columns:repeat(2,1fr);}
  .cc-maturity{grid-template-columns:repeat(2,1fr);}
  .cc-profile{grid-template-columns:1fr;}
  .cc-gap-detail-grid{grid-template-columns:1fr;}
  .cc-academy{grid-template-columns:1fr;}
  .cc-life{grid-template-columns:1fr;}
  .cc-life-rail{position:static;max-height:none;}
  .cc-life-compare{grid-template-columns:1fr;}
  .cc-life-grid{grid-template-columns:1fr;}
  .cc-domain-grid{grid-template-columns:1fr;}
  .cc-portfolio-grid{grid-template-columns:1fr;}
  .cc-resume{grid-template-columns:1fr;}
  .cc-resume-panels{grid-template-columns:1fr;}
  .cc-arena{grid-template-columns:1fr;}
  .cc-mock-grid{grid-template-columns:1fr;}
  .cc-plan{grid-template-columns:1fr;}
  .cc-longterm{grid-template-columns:1fr;}
  .cc-score-grid{grid-template-columns:1fr;}
  .cc-score-grid .cc-ring-wrap{margin:0 auto;}
  .cc-lib-grid{grid-template-columns:1fr;}
  .cc-quiz-dashboard{grid-template-columns:1fr;}
  .cc-sector-grid-row{grid-template-columns:1fr;}
  .cc-portfolio-detail-grid{grid-template-columns:1fr;}
}
@media(max-width:560px){
  .cc-stat-row{grid-template-columns:1fr;}
  .cc-maturity{grid-template-columns:1fr;}
  .cc-cta-row{flex-direction:column;}
  .cc-btn{text-align:center;}
}
@media(prefers-reduced-motion:reduce){
  .cc-reveal{transition:none;opacity:1;transform:none;}
  .cc-ring-prog{transition:none;}
  *{animation:none !important;}
}
`;
