export interface PublicInfoPage {
  slug: string; eyebrow: string; title: string; lead: string;
  cards: Array<{ title: string; copy: string }>;
}

/** Shared answers for the consultation and paid-proposal stages. These are
    rendered on both the booking page and the main FAQ page so the website and
    sales team can use one consistent explanation. */
export const PROJECT_INITIATION_FAQ: Array<{ title: string; copy: string }> = [
  {
    title: 'Is the consultation and site visit really free?',
    copy: 'Yes. There is no fee to apply or for an approved project consultation. For suitable complete-bathroom projects, that consultation includes one site assessment. Applications are reviewed for scope, location, timing and realistic investment before an appointment is confirmed, so submitting the form does not automatically book a free visit.',
  },
  {
    title: 'Why can’t I receive a final quotation first?',
    copy: 'A dependable final quotation requires actual measurements, site conditions, service changes, a resolved design, selected materials and a defined fixture scope. Before the paid proposal, we can discuss published starting prices or a realistic range. The final construction quotation is one of the deliverables in the detailed design and construction proposal.',
  },
  {
    title: 'Exactly what does LKR 50,000 include?',
    copy: 'For one bathroom, it includes the personalised layout, five 3D presentation images, 3D walkthrough, fixture, accessory, material and named-brand selections, complete construction scope, assumptions and exclusions, final quotation, project timeline, staged payment plan, quality commitments and applicable warranty schedule. The complimentary consultation and approved site assessment happen before this paid stage.',
  },
  {
    title: 'Is the LKR 50,000 an additional cost?',
    copy: 'Not when LUXEhome constructs that bathroom. It becomes your first project payment and is credited in full against the construction balance. For example, if the agreed contract value is LKR 1,500,000, the remaining balance is LKR 1,450,000 after the LKR 50,000 already paid.',
  },
  {
    title: 'When will I receive the proposal?',
    copy: 'The complete proposal is delivered within seven working days after the LKR 50,000 proposal payment and the completed consultation. The design and final quotation are based on the measured room and confirmed site conditions.',
  },
  {
    title: 'What happens if I do not proceed?',
    copy: 'You still keep the completed proposal. The LKR 50,000 is retained for the professional design, material and brand selection, costing, scoping and proposal documentation already completed. The earlier approved consultation itself has no fee.',
  },
  {
    title: 'What happens if I have several bathrooms?',
    copy: 'Apply with the first bathroom you want assessed. After consultation, commission one LKR 50,000 proposal and review the complete result before deciding on the others. A separate detailed proposal for another bathroom may require its own LKR 50,000 payment, credited to that related LUXEhome construction scope.',
  },
  {
    title: 'How much does a typical bathroom cost?',
    copy: 'A complete LUXEhome bathroom typically starts around LKR 1.5 million. The actual amount depends on room size, whether it is new construction or renovation, existing site conditions, service changes, materials, fixtures and the selected design. Published design prices are starting guides; the proposal contains the final construction quotation.',
  },
  {
    title: 'How are quality and warranties protected?',
    copy: 'The proposal records the approved materials, brands, scope, construction process and quality commitments. Critical stages such as plumbing pressure testing, waterproofing, flood testing, tile installation and final inspection are checked before handover. LUXEhome workmanship is covered for 24 months from the documented handover date, with a 30-day snagging review; product and supplier warranties are recorded separately under their own written terms.',
  },
];

export const PUBLIC_INFO_PAGES: PublicInfoPage[] = [
  { slug:'how-it-works', eyebrow:'From first request to final clean', title:'Six stages. One responsible team.', lead:'Every stage is documented, approved and communicated before the next begins.', cards:[{title:'01 · Consultation application',copy:'Share your WhatsApp number, property location, project type, timing, investment range and the first bathroom you want us to assess. Measurements are optional.'},{title:'02 · Suitability & consultation',copy:'We review the application first. Suitable complete-bathroom projects receive a complimentary consultation including one detailed site assessment; no consultation payment is required.'},{title:'03 · Commission the proposal',copy:'After consultation, commission the detailed design and construction proposal for one bathroom for LKR 50,000.'},{title:'04 · Complete proposal',copy:'Within seven working days after proposal payment and the completed consultation, you receive the design visuals, walkthrough, selections, named brands, scope, timeline, warranties and final construction quotation.'},{title:'05 · Construction',copy:'If you appoint LUXEhome to build, the full LKR 50,000 is shown as an advance and deducted from the construction balance. Verified teams build while progress and quality checks are shared through WhatsApp.'},{title:'06 · Clean & handover',copy:'We test, inspect, clean and hand over the completed space with its warranty record.'}] },
  { slug:'bathroom-renovation', eyebrow:'Bathrooms', title:'Bathroom design & renovation.', lead:'A complete room—designed, documented and built from waterproofing to final fixture.', cards:[{title:'Choose a named design',copy:'Start with a documented Flora, Island, Heritage or Ceylon Gems bathroom.'},{title:'Customised for the room',copy:'Layouts, drawings, finishes and fixtures are adapted to the actual site.'},{title:'One accountable team',copy:'Civil, plumbing, electrical, tiling, ceiling and finishing are coordinated together.'}] },
  { slug:'materials-brands', eyebrow:'Materials & brands', title:'Known products. Written specifications.', lead:'We specify brands and construction systems openly so clients know what is going into their home.', cards:[{title:'Waterproofing',copy:'Tokyo Super 2K waterproofing with the preparation, application and testing method documented.'},{title:'Tile installation',copy:'Swisstek adhesive and grout selected for the tile, substrate and room condition.'},{title:'Plumbing',copy:'S-lon pipes and accessories with supply, waste and drainage routes documented.'},{title:'Electrical',copy:'ACL wiring and cables with points, circuits and switching resolved before finishes.'},{title:'Finishes',copy:'Swiss Bathware, Rocell, iPanel, tempered glass, Eco Board and 5mm mirrors—with alternatives approved before purchase.'}] },
  { slug:'pricing-guide', eyebrow:'Pricing clarity', title:'A starting point—not a hidden promise.', lead:'Published design prices are honest starting points. The final project price is prepared in the paid proposal after consultation, detailed design and material selection.', cards:[{title:'Sigiriya · minimum 4.5 m²',copy:'A new bathroom starts from LKR 1.775M. Renovating an existing bathroom starts from LKR 1.884M.'},{title:'Choose by room size',copy:'Compare Minimum, Recommended and Spacious fits. Larger or technically complex rooms receive a custom price.'},{title:'What stays clear',copy:'The approved scope, quantities, materials, fixtures, labour, programme, payment stages and exclusions are written into the quotation.'}] },
  {
    slug: 'warranty-aftercare',
    eyebrow: 'Warranty & aftercare',
    title: 'Our responsibility continues after handover.',
    lead: 'Every completed LUXEhome bathroom includes a 24-month workmanship warranty from the documented handover date. Product and supplier warranties remain separate and follow their own written terms.',
    cards: [
      { title: '24-month workmanship warranty', copy: 'Covers eligible defects in LUXEhome waterproofing, internal plumbing, bathroom electrical connections, tiling, ceiling and fixture-installation workmanship within the agreed written scope.' },
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
    lead: 'LUXEhome provides a 24-month workmanship warranty from the documented handover date. Manufacturer and supplier warranties are separate and apply only under their own written conditions.',
    cards: [
      { title: 'Workmanship cover · 24 months', copy: 'Covers eligible defects caused by LUXEhome workmanship within the agreed written construction scope. The period begins on the documented handover date.' },
      { title: 'Handover review · 30 days', copy: 'Completion and snagging items should be reported during the first 30 days. This review is additional aftercare and does not reduce the 24-month workmanship period.' },
      { title: 'Manufacturer product cover', copy: 'Manufacturing defects in bathware, tapware, lighting, accessories and other products are handled under the selected manufacturer’s terms, exclusions and proof-of-purchase requirements.' },
      { title: 'Supplier-backed system cover', copy: 'Any period longer than the LUXEhome workmanship warranty applies only when the supplier has formally registered and issued that warranty for the named project.' },
      { title: 'Client-supplied products', copy: 'LUXEhome covers only its eligible installation workmanship. The client or original supplier remains responsible for defects in client-supplied products.' },
      { title: 'Not covered', copy: 'Misuse, accidental damage, normal wear, routine maintenance or cosmetic discolouration, blockages arising after handover, abnormal water pressure or water quality, building movement, third-party alteration and matters outside the written scope are not covered.' },
      { title: 'Reporting and assessment', copy: 'Provide the project reference, clear evidence and reasonable site access. LUXEhome will assess the cause and confirm whether repair is covered before work is arranged.' },
      { title: 'Effective policy', copy: 'This policy applies to proposals issued on or after 8 August 2026. Earlier accepted or issued agreements remain governed by the warranty schedule written into those documents.' },
    ],
  },
  {
    slug: 'payment-cancellation',
    eyebrow: 'Payment terms',
    title: 'Clear payments, tied to visible progress.',
    lead: 'The complimentary consultation happens before the LKR 50,000 detailed proposal. If LUXEhome builds, that proposal payment becomes part of the construction amount; the remaining balance follows documented milestones.',
    cards: [
      {
        title: 'After consultation · LKR 50,000 proposal',
        copy: 'The consultation and approved site assessment have no fee. After that consultation, the detailed design and construction proposal can be commissioned for one bathroom. It is delivered within seven working days after proposal payment and the completed consultation. If construction does not proceed, the fee is retained for the completed design, selections, costing and documentation work.',
      },
      {
        title: '01 · Construction commencement · 50%',
        copy: 'The first construction payment is 50% of the final agreed contract value. The LKR 50,000 proposal payment already paid is included within this 50%, not added on top. Once the agreement is signed and the cleared balance of this payment is received, procurement and mobilisation begin. On-site work starts within seven working days, subject to approved selections, site access and the agreed commencement date.',
      },
      {
        title: '02 · Waterproofing milestone · 20%',
        copy: 'This payment is due when the waterproofing application is complete and the bathroom is ready for flood testing. The 20% is collected before the flood test begins. If testing identifies an issue, LUXEhome corrects and retests the waterproofing without an additional charge. Tiling begins only after the flood test passes.',
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
        copy: 'The 50% commencement amount is LKR 750,000. Because the LKR 50,000 proposal payment has already been paid, only LKR 700,000 is then due. The remaining payments are LKR 300,000 at waterproofing, followed by LKR 150,000 at tiling, LKR 150,000 at fixtures and LKR 150,000 at final completion. The total remains LKR 1,500,000.',
      },
      {
        title: 'Several bathrooms',
        copy: 'For multi-bathroom construction, the proposal states how payment milestones apply across the agreed phases. Each paid bathroom proposal is credited only to its related bathroom or construction scope.',
      },
      {
        title: 'Changes, cancellation or delay',
        copy: 'Changes to the approved scope require written agreement and may affect the price and programme. Cancellation, delayed selections, unavailable site access or overdue payments are assessed against completed work, ordered materials, supplier commitments and documented costs, and may move the project dates or pause work.',
      },
    ],
  },
];
