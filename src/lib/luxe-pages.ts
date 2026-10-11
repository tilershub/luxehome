export interface PublicInfoPage {
  slug: string; eyebrow: string; title: string; lead: string;
  cards: Array<{ title: string; copy: string }>;
}

/** Shared answers for the consultation and paid-proposal stages. These are
    rendered on both the booking page and the main FAQ page so the website and
    sales team can use one consistent explanation. */
export const PROJECT_INITIATION_FAQ: Array<{ title: string; copy: string }> = [
  {title:'What is free, and what costs LKR 30,000?',copy:'Your initial phone or WhatsApp conversation is free. The LKR 30,000 package is for one bathroom, paid upfront before preparing its site visit, layout plan, 3D images, 3D walkthrough video and detailed quotation with materials and fixtures. Sending an enquiry does not commit you to payment.'},
  {title:'What does the package include?',copy:'A site visit and measurements, personalised layout plan, 3D images and walkthrough video, selected materials and fixtures with named brands, and a detailed construction quotation. The proposal also records the agreed scope, assumptions, exclusions, timeline, payment stages and applicable warranties.'},
  {title:'Can we discuss the budget first?',copy:'Yes. We discuss your requirements and an initial investment range before you commission the package. Complete renovations typically start around LKR 1.5M. The measured design and selected materials determine the final quotation.'},
  {title:'Is the LKR 30,000 credited toward construction?',copy:'Yes. The full LKR 30,000 paid for each bathroom is credited against the agreed construction price for that bathroom when BathSpace is appointed. For a LKR 1,500,000 bathroom, LKR 1,470,000 remains after the package payment.'},
  {title:'When will I receive the proposal?',copy:'Within seven working days after package payment and the completed site visit. We confirm the appointment and agreed project scope with you first.'},
  {title:'What happens if I do not proceed with construction?',copy:'You keep the completed proposal. The package fee covers the site visit, design, selections, costing and documentation already completed.'},
  {title:'What if the project has several bathrooms?',copy:'Tell us about all bathrooms when you enquire. The package is LKR 30,000 per bathroom, payable upfront before we prepare the deliverables. Each bathroom has separate measurements, a layout plan, 3D images, a walkthrough video and a detailed construction quotation. If you proceed with BathSpace for those bathrooms, every package fee is credited in full against their agreed renovation prices.'},
  {title:'How are quality and warranties protected?',copy:'The proposal records materials, brands, scope and applicable warranties. Plumbing pressure testing, waterproofing flood testing and final inspection are checked before handover. BathSpace workmanship is covered for 24 months, with a 30-day snagging review; manufacturer and supplier warranties follow their separate written terms.'},
];

export const PUBLIC_INFO_PAGES: PublicInfoPage[] = [
  { slug:'how-it-works', eyebrow:'From first request to final clean', title:'Six stages. One responsible team.', lead:'Every stage is documented, approved and communicated before the next begins.', cards:[{title:'01 · Tell us about your project',copy:'Share your WhatsApp number, property location, project type, timing, investment range and the bathrooms included in your project. Measurements are optional.'},{title:'02 · Discuss your requirements',copy:'We discuss your requirements and budget by phone or WhatsApp, with no initial conversation fee.'},{title:'03 · Commission the proposal',copy:'Commission the LKR 30,000 package per bathroom: site visit, layout plan, 3D images, walkthrough video and detailed quotation for each room.'},{title:'04 · Complete proposal',copy:'Within seven working days after package payment and the completed site visit, you receive the design visuals, walkthrough, selections, named brands, scope, timeline, warranties and final construction quotation.'},{title:'05 · Construction',copy:'If you appoint BathSpace by LUXEhome to build, the full LKR 30,000 already paid for each bathroom is shown as an advance and deducted from its construction balance. Verified teams build while progress and quality checks are shared through WhatsApp.'},{title:'06 · Clean & handover',copy:'We test, inspect, clean and hand over the completed space with its warranty record.'}] },
  { slug:'bathroom-renovation', eyebrow:'BathSpace', title:'Complete bathroom renovation.', lead:'One complete wet-area project—planned, coordinated and delivered from the existing room to final handover.', cards:[{title:'Start with the real room',copy:'We assess the existing bathroom, access, services, drainage, layout, timing and realistic investment before resolving the project.'},{title:'Designed for the actual site',copy:'Layouts, drawings, finishes and fixtures are developed around the measured room and approved requirements.'},{title:'One accountable team',copy:'Civil, plumbing, electrical, waterproofing, tiling, ceiling, joinery, glass and finishing are coordinated together.'}] },
  { slug:'materials-brands', eyebrow:'Materials & brands', title:'Known products. Written specifications.', lead:'We specify brands and construction systems openly so clients know what is going into their home.', cards:[{title:'Waterproofing',copy:'Tokyo Super 2K waterproofing with the preparation, application and testing method documented.'},{title:'Tile installation',copy:'Swisstek adhesive and grout selected for the tile, substrate and room condition.'},{title:'Plumbing',copy:'S-lon pipes and accessories with supply, waste and drainage routes documented.'},{title:'Electrical',copy:'ACL wiring and cables with points, circuits and switching resolved before finishes.'},{title:'Finishes',copy:'Swiss Bathware, Rocell, iPanel, tempered glass, Eco Board and 5mm mirrors—with alternatives approved before purchase.'}] },
  { slug:'pricing-guide', eyebrow:'Investment clarity', title:'Know the range before you spend time.', lead:'BathSpace complete renovations typically begin around LKR 1.5M. Your room, material choices and construction scope determine the final quotation.', cards:[{title:'Typical entry point · around LKR 1.5M',copy:'A complete renovation at this level can include coordinated construction, plumbing, electrical work, waterproofing, tiling, fixtures and finishing, subject to the actual room and approved scope.'},{title:'What changes the investment',copy:'Bathroom size, existing damage, plumbing relocation, concealed systems, tile and fixture selection, vanity, mirror, shower glass, access and structural work can materially change the final price.'},{title:'Where the final price comes from',copy:'After the free initial conversation, the LKR 30,000 detailed proposal records the measured solution, materials, brands, construction scope, timeline, payment stages, exclusions and final construction quotation.'}] },
  {
    slug: 'warranty-aftercare',
    eyebrow: 'Warranty & aftercare',
    title: 'Our responsibility continues after handover.',
    lead: 'Every completed BathSpace bathroom includes a 24-month LUXEhome workmanship warranty from the documented handover date. Product and supplier warranties remain separate and follow their own written terms.',
    cards: [
      { title: '24-month workmanship warranty', copy: 'Covers eligible defects in BathSpace by LUXEhome waterproofing, internal plumbing, bathroom electrical connections, tiling, ceiling and fixture-installation workmanship within the agreed written scope.' },
      { title: '30-day handover review', copy: 'Report completion or snagging items during the first 30 days so they can be assessed and corrected where covered. This review does not shorten the 24-month workmanship period.' },
      { title: 'Product warranties', copy: 'Bathware, tapware, lights, accessories and other supplied products follow the selected manufacturer’s written warranty, supported by the available invoice or warranty card.' },
      { title: 'Supplier-backed systems', copy: 'A longer system warranty applies only when the relevant supplier formally registers and issues it in writing for that specific project.' },
      { title: 'If something goes wrong', copy: 'Send the project reference, photos or video and a clear description through WhatsApp, and provide reasonable access for assessment.' },
      { title: 'Our response', copy: 'We assess whether the concern is covered, arrange an inspection when necessary and document the agreed resolution.' },
    ],
  },
  { slug:'team', eyebrow:'The people responsible', title:'A permanent core. Verified specialists.', lead:'Every project has clear ownership from client communication through procurement, site quality and handover.', cards:[{title:'Design & Client Experience',copy:'Guides the brief, design selection and approvals.'},{title:'Project Manager',copy:'Coordinates procurement, programme and specialist teams.'},{title:'Quality Supervisor',copy:'Checks critical construction stages before work proceeds.'},{title:'TILERSHUB Verified Specialists',copy:'Trade teams selected for the needs and location of each project.'}] },
  { slug:'faq', eyebrow:'Questions, answered honestly', title:'Before design. Before construction.', lead:'Clear answers help clients make better decisions and help projects start correctly.', cards:[...PROJECT_INITIATION_FAQ,{title:'Do I need to know my bathroom size?',copy:'No. Choose “please measure it” in the consultation application. Approximate dimensions are helpful but never required.'},{title:'Can I change fixtures and colours?',copy:'Yes, while protecting technical performance, design consistency and budget clarity.'},{title:'Do you work outside Colombo?',copy:'Yes, subject to location, complete-project scope and application review.'},{title:'How long does a renovation take?',copy:'A typical bathroom programme is around six weeks; the actual programme depends on site condition, scope and procurement.'}] },
  { slug:'terms', eyebrow:'Legal', title:'Terms & conditions.', lead:'The terms governing quotations, approvals, variations, construction and handover.', cards:[{title:'Quotations',copy:'Validity, scope, assumptions, exclusions and changes must be documented.'},{title:'Client responsibilities',copy:'Access, approvals, utilities, timely decisions and agreed payments.'},{title:'Variations',copy:'Additional or changed work requires written approval and may affect cost and time.'},{title:'Handover',copy:'Completion, defects review, care instructions and warranty commencement.'}] },
  {
    slug: 'warranty-terms',
    eyebrow: 'Legal',
    title: 'Warranty terms.',
    lead: 'BathSpace by LUXEhome provides a 24-month workmanship warranty from the documented handover date. Manufacturer and supplier warranties are separate and apply only under their own written conditions.',
    cards: [
      { title: 'Workmanship cover · 24 months', copy: 'Covers eligible defects caused by BathSpace by LUXEhome workmanship within the agreed written construction scope. The period begins on the documented handover date.' },
      { title: 'Handover review · 30 days', copy: 'Completion and snagging items should be reported during the first 30 days. This review is additional aftercare and does not reduce the 24-month workmanship period.' },
      { title: 'Manufacturer product cover', copy: 'Manufacturing defects in bathware, tapware, lighting, accessories and other products are handled under the selected manufacturer’s terms, exclusions and proof-of-purchase requirements.' },
      { title: 'Supplier-backed system cover', copy: 'Any period longer than the BathSpace by LUXEhome workmanship warranty applies only when the supplier has formally registered and issued that warranty for the named project.' },
      { title: 'Client-supplied products', copy: 'BathSpace by LUXEhome covers only its eligible installation workmanship. The client or original supplier remains responsible for defects in client-supplied products.' },
      { title: 'Not covered', copy: 'Misuse, accidental damage, normal wear, routine maintenance or cosmetic discolouration, blockages arising after handover, abnormal water pressure or water quality, building movement, third-party alteration and matters outside the written scope are not covered.' },
      { title: 'Reporting and assessment', copy: 'Provide the project reference, clear evidence and reasonable site access. BathSpace by LUXEhome will assess the cause and confirm whether repair is covered before work is arranged.' },
      { title: 'Effective policy', copy: 'This policy applies to proposals issued on or after 8 August 2026. Earlier accepted or issued agreements remain governed by the warranty schedule written into those documents.' },
    ],
  },
  {
    slug: 'payment-cancellation',
    eyebrow: 'Payment terms',
    title: 'Clear payments, tied to visible progress.',
    lead: 'The free initial phone or WhatsApp conversation happens before the LKR 30,000 detailed proposal. If BathSpace by LUXEhome builds, that proposal payment becomes part of the construction amount; the remaining balance follows documented milestones.',
    cards: [
      {
        title: 'After consultation · LKR 30,000 proposal',
        copy: 'The initial phone or WhatsApp conversation is free. The LKR 30,000 package is charged for each bathroom and includes a site visit, layout plan, 3D images, walkthrough video and detailed quotation for that bathroom. It is paid upfront before these deliverables are prepared. It is delivered within seven working days after package payment and the completed site visit. If construction does not proceed, the fee is retained for the completed design, selections, costing and documentation work.',
      },
      {
        title: '01 · Construction commencement · 50%',
        copy: 'The first construction payment is 50% of the final agreed contract value. The LKR 30,000 proposal payment already paid is included within this 50%, not added on top. Once the agreement is signed and the cleared balance of this payment is received, procurement and mobilisation begin. On-site work starts within seven working days, subject to approved selections, site access and the agreed commencement date.',
      },
      {
        title: '02 · Waterproofing milestone · 20%',
        copy: 'This payment is due when the waterproofing application is complete and the bathroom is ready for flood testing. The 20% is collected before the flood test begins. If testing identifies an issue, BathSpace corrects and retests the waterproofing without an additional charge. Tiling begins only after the flood test passes.',
      },
      {
        title: '03 · Tiling milestone · 10%',
        copy: 'This payment is due after the contracted bathroom tiling and grouting work is completed.',
      },
      {
        title: '04 · Fixtures milestone · 10%',
        copy: 'This payment is due after the ceiling, lighting, bathware, tapware, vanity, mirror and bathroom accessories included in the contract are installed.',
      },
      {
        title: '05 · Final completion · 10%',
        copy: 'The final payment is due after the shower cubicle, final testing, agreed snag corrections and cleaning are completed and the bathroom is ready for handover.',
      },
      {
        title: 'Example · LKR 1,500,000 bathroom',
        copy: 'The 50% commencement amount is LKR 750,000. Because the LKR 30,000 proposal payment has already been paid, only LKR 720,000 is then due. The remaining payments are LKR 300,000 at waterproofing, followed by LKR 150,000 at tiling, LKR 150,000 at fixtures and LKR 150,000 at final completion. The total remains LKR 1,500,000.',
      },
      {
        title: 'Several bathrooms',
        copy: 'For multi-bathroom construction, each bathroom has its own LKR 30,000 proposal fee and separate design deliverables. The full sum of those fees is credited against the agreed construction prices of the bathrooms BathSpace is appointed to build. The proposal states how construction milestones apply across the agreed phases.',
      },
      {
        title: 'Changes, cancellation or delay',
        copy: 'Changes to the approved scope require written agreement and may affect the price and programme. Cancellation, delayed selections, unavailable site access or overdue payments are assessed against completed work, ordered materials, supplier commitments and documented costs, and may move the project dates or pause work.',
      },
    ],
  },
];
