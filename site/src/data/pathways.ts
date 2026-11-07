/* Pathway timelines shown on /consultations/.
   Condensed from the Sep 2026 Program Redesign (section 6), which Kat approved.
   Public-safe: topics only, no doses, no drug names, no outcome claims.
   KAT GATE: any wording change here is public health copy and needs her sign-off. */

export type Consult = {
  when: string;      // week or stage marker
  length: string;    // "75 min"
  title: string;     // short focus
  detail: string;    // one or two lines
  takeaway?: string; // what she leaves with
  phase?: string;    // optional row label shown before this consult (desktop rows)
};

export type Pathway = {
  id: string;
  tab: string;             // radio label
  name: string;            // heading
  who: string;             // one line
  story: string;           // one or two lines, why this shape
  program: string;         // which product
  medicare: string;        // GPCCMP position, compliant wording
  consults: Consult[];
  utm: string;
};

const CALENDLY = 'https://calendly.com/katridout/15-minute-investigative-callback';
// One generic code for every pathway: no condition (or mappable code) is sent to Calendly or analytics.
export const callLink = (_p: Pathway) => `${CALENDLY}?utm_source=site&utm_medium=pathways&utm_campaign=pathways`;

const takeawayFirst = 'Dietary assessment summary, starter meal plan, your individualised supplement plan, recipe booklet and snack ideas, all within 2 business days.';

export const pathways: Pathway[] = [
  {
    id: 'fertility', tab: 'Trying to conceive', name: 'Fertility pathway', utm: 'fertility',
    who: 'Trying to conceive now, planning a pregnancy in the next 6 to 12 months, or starting again after loss.',
    story: 'The egg you release in three months is being built now, so the program runs over 12 weeks: get the right supplements started early, then build the eating pattern around them.',
    program: 'The Program: 1 initial + 4 reviews over about 12 weeks. If you conceive, remaining consults convert to the Pregnancy pathway.',
    medicare: 'Usually private or private health extras. If a chronic condition sits underneath (for example PMOS, endometriosis or thyroid disease), your GP may be able to refer you under a GP Chronic Condition Management Plan.',
    consults: [
      { when: 'Week 0', length: '75 min', title: 'Full assessment', detail: 'Medical, cycle and diet history, blood results, current supplements, weight history, alcohol and caffeine. Goals set together.', takeaway: takeawayFirst },
      { when: 'Week 2', length: '30 min', title: 'Plan check', detail: 'What worked, what did not, how the supplements are sitting. Cycle-phase eating guide and the first two habit changes locked in.' },
      { when: 'Week 6', length: '45 min', title: 'Pathology review', detail: 'Repeat bloods reviewed. Eating pattern built properly: whole grains, fish, vegetable protein, less discretionary food.', takeaway: 'Updated meal plan and supplement plan.' },
      { when: 'Week 9', length: '30 min', title: 'Energy and lifestyle', detail: 'Weight where relevant, alcohol, caffeine, sleep and movement. Partner handout issued.' },
      { when: 'Week 12', length: '30 min', title: 'Consolidate', detail: 'Plan for the next stage, first-trimester nausea toolkit ready in advance, and how your remaining consults convert if you conceive.' },
    ],
  },
  {
    id: 'ivf', tab: 'IVF', name: 'IVF and assisted reproduction pathway', utm: 'ivf',
    who: 'Preparing for a cycle, between cycles, or asked by your clinic to change weight before treatment.',
    story: 'Your clinic manages the medical side. Kat focuses on the three months of nutrition around your cycle and helps you trim your supplement list to what the evidence supports.',
    program: 'The Program timed to your cycle: pre-cycle, stimulation, transfer and the two-week wait, then early pregnancy or between-cycle recovery.',
    medicare: 'Usually private or private health extras.',
    consults: [
      { when: 'Pre-cycle', length: '75 min', title: 'Full assessment', detail: 'Cycle history, clinic requirements, your current supplement stack, bloods, gut symptoms and stress eating.', takeaway: takeawayFirst + ' Supplement plan rationalised against current guidance.' },
      { when: 'Week 2', length: '30 min', title: 'Plan check', detail: 'The eating pattern built into your real week. Clinic weight plan where one is needed. Pre-cycle routine set.' },
      { when: 'Stimulation', length: '45 min', title: 'Pathology review and stimulation', detail: 'Protein, fluids and bloating, constipation, caffeine and alcohol during stimulation.', takeaway: 'Updated meal plan.' },
      { when: 'Transfer and the two-week wait', length: '30 min', title: 'The wait', detail: 'What the evidence does and does not say about the usual advice, managing anxiety-driven eating, a realistic plan for the wait.' },
      { when: 'Week 12', length: '30 min', title: 'Next stage', detail: 'Early pregnancy transition (nausea toolkit, food safety) or a between-cycle recovery plan and what to repeat before the next cycle.' },
    ],
  },
  {
    id: 'pregnancy', tab: 'Pregnant', name: 'Pregnancy pathway', utm: 'pregnancy',
    who: 'Any trimester, including twins, vegetarian or vegan pregnancies, and higher or lower BMI pregnancies.',
    story: 'Each trimester has two or three nutrition jobs. Iron, iodine, weight gain and food safety come first, because the later months build on them.',
    program: 'The Journey: 1 initial + 7 reviews spaced across your pregnancy and into the first weeks after birth. The Program (1 + 4) covers a 12-week window if you are joining later.',
    medicare: 'Usually private or private health extras, unless a chronic condition applies.',
    consults: [
      { phase: 'Getting started', when: 'Booking consult, any trimester', length: '75 min', title: 'Full assessment', detail: 'Gestation, bloods, pre-pregnancy BMI and weight-gain range, nausea and aversions, supplements, food safety, dietary restrictions.', takeaway: takeawayFirst },
      { when: 'Two weeks later', length: '30 min', title: 'Food safety and nausea', detail: 'Food safety guide, supplement check, nausea toolkit, small changes that stick.' },
      { when: 'Around 20 weeks', length: '30 min', title: 'Second trimester', detail: 'Appetite returns: protein, iron-rich meals, calcium, movement, weight-gain check without stigma.' },
      { when: 'Around 28 weeks', length: '45 min', title: 'Pathology review', detail: 'Iron and omega-3 reviewed against your bloods, gestational diabetes screen preparation.', takeaway: 'Updated meal plan and supplement plan.' },
      { phase: 'Third trimester and after birth', when: 'Around 32 weeks', length: '30 min', title: 'Third-trimester comfort', detail: 'Reflux, constipation, energy for the last stretch, freezer stocking begins.' },
      { when: 'Around 36 weeks', length: '45 min', title: 'Third-trimester plan update', detail: 'Second meal plan and supplement update for the final weeks.', takeaway: 'Third-trimester plan.' },
      { when: 'Around 38 weeks', length: '30 min', title: 'Birth and breastfeeding', detail: 'Birth and early breastfeeding nutrition, postpartum iron plan, one-handed meals list.', takeaway: 'Birth and early breastfeeding guide.' },
      { when: 'Within 6 weeks of birth', length: '30 min', title: 'Postpartum', detail: 'Recovery, feeding, energy when sleep is short, and a hand-over to the Postpartum pathway if you want it.' },
    ],
  },
  {
    id: 'gdm', tab: 'Gestational diabetes', name: 'Gestational diabetes pathway', utm: 'gdm',
    who: 'Newly diagnosed, usually at 24 to 28 weeks, or diagnosed early in pregnancy.',
    story: 'Kat prioritises new gestational diabetes clients so the first consult happens quickly, then follows the review schedule the guidelines recommend. This pathway runs about 16 weeks so the last consult lands after birth.',
    program: 'The Program, spaced for gestational diabetes: a prompt start, close follow-up while readings settle, then a postpartum consult.',
    medicare: 'Gestational diabetes is short-lived, so ask your GP whether you are eligible for a GP Chronic Condition Management Plan. Private health extras may apply.',
    consults: [
      { when: 'As soon as possible after diagnosis', length: '75 min', title: 'Understand the diagnosis', detail: 'Carbohydrate amount and spread across meals and snacks, protein and fibre, glucose monitoring as set by your obstetric team, breakfast and fasting readings.', takeaway: takeawayFirst + ' 7-day meal plan.' },
      { when: 'Week 1', length: '30 min', title: 'First readings', detail: 'Your first week of readings reviewed. Breakfast, snacks and portions adjusted. Movement after meals, eating out, cultural foods.' },
      { when: 'Week 3', length: '45 min', title: 'Readings and weight', detail: 'Readings review, weight-gain check, constipation, cravings, and what changes if medication starts.', takeaway: 'Updated meal plan.' },
      { when: 'Weeks 34 to 36', length: '30 min', title: 'Third trimester', detail: 'Insulin resistance peaks: adjustments, birth-plan nutrition, breastfeeding and blood glucose.' },
      { when: '6 to 12 weeks after birth', length: '30 min', title: 'After birth', detail: 'The postpartum glucose test, breastfeeding, a family eating pattern that lowers lifetime risk, and planning for a next pregnancy.' },
    ],
  },
  {
    id: 'postpartum', tab: 'Postpartum', name: 'Postpartum pathway', utm: 'postpartum',
    who: 'Birth to two years, breastfeeding or not, including after gestational diabetes.',
    story: 'Recovery first (iron, energy, fluids), then eating that fits life with a baby, then gentle goals that do not touch milk supply.',
    program: 'The Program: 1 initial + 4 reviews over about 12 weeks, starting from two weeks after birth.',
    medicare: 'Usually private or private health extras, unless a chronic condition applies.',
    consults: [
      { when: 'From 2 weeks after birth', length: '75 min', title: 'Full assessment', detail: 'Birth and blood loss, feeding, bloods, mood, sleep, appetite, supplements.', takeaway: takeawayFirst + ' One-handed meals and freezer list.' },
      { when: 'Week 2', length: '30 min', title: 'Recovery nutrition', detail: 'Iron repletion, iodine and choline while breastfeeding, fluids, supply myths handled kindly, caffeine and alcohol guidance.' },
      { when: 'Week 6', length: '45 min', title: 'Pathology review', detail: 'Bloods reviewed, meal logistics with a baby, mood and eating pattern, partner cooking plan.', takeaway: 'Updated meal plan.' },
      { when: 'Week 9', length: '30 min', title: 'Movement and energy', detail: 'Return to movement and, only if you want it, gradual goals that protect supply. Post-GDM follow-up if relevant.' },
      { when: 'Week 12', length: '30 min', title: 'Family eating', detail: 'Long-term family eating pattern, starting-solids preview, and a plan for a next pregnancy if that is ahead.' },
    ],
  },
  {
    id: 'pmos', tab: 'PMOS (PCOS)', name: 'PMOS (PCOS) pathway', utm: 'pmos',
    who: 'Diagnosed PMOS (PCOS), irregular cycles, insulin resistance, or PMOS plus fertility.',
    story: 'There is no single superior diet for PMOS (PCOS). Lifestyle change helps even without weight loss, and the plan is built around insulin, hunger and what you can sustain. A weight-neutral option is always offered.',
    program: 'The Program: 1 initial + 4 reviews over about 12 weeks, with a hand-over to the Fertility pathway if that is the goal.',
    medicare: 'PMOS (PCOS) is a chronic condition, so your GP may be able to refer you under a GP Chronic Condition Management Plan: up to five rebated visits a calendar year, which matches the five consults.',
    consults: [
      { when: 'Week 0', length: '75 min', title: 'Full assessment', detail: 'Cycle pattern, symptoms, bloods, medications, weight and dieting history, movement. Weight-neutral option offered.', takeaway: takeawayFirst },
      { when: 'Week 2', length: '30 min', title: 'Insulin, explained plainly', detail: 'Carbohydrate quality and spread, protein and fibre at each meal, regular eating to manage hunger and cravings.' },
      { when: 'Week 6', length: '45 min', title: 'Pathology review', detail: 'Bloods reviewed, supplement and medication questions discussed with your GP\'s plan in mind.', takeaway: 'Updated meal plan and supplement plan.' },
      { when: 'Week 9', length: '30 min', title: 'Movement and body', detail: 'Activity that fits your week, cravings toolkit, mental health check-in.' },
      { when: 'Week 12', length: '30 min', title: 'Consolidate', detail: 'Transition to the Fertility pathway, or a six-month maintenance plan with relapse-prevention strategies.' },
    ],
  },
  {
    id: 'endo', tab: 'Endometriosis', name: 'Endometriosis pathway', utm: 'endo',
    who: 'Diagnosed or suspected endometriosis with bloating, bowel symptoms, pain flares or fatigue.',
    story: 'Dietary strategies for endometriosis symptoms are done as a supervised, time-limited cycle, not a forever diet. Many women arrive on restrictions that are not helping; we find the two or three things that matter.',
    program: 'The Program: 1 initial + 4 reviews over about 12 weeks, with the Fertility pathway layered on if you are trying to conceive.',
    medicare: 'Endometriosis is a chronic condition, so your GP may be able to refer you under a GP Chronic Condition Management Plan: up to five rebated visits a calendar year.',
    consults: [
      { when: 'Week 0', length: '75 min', title: 'Full assessment', detail: 'Symptom diary, bowel pattern, pain and cycle mapping, bloods, medications, current restrictions.', takeaway: takeawayFirst },
      { when: 'Week 2', length: '30 min', title: 'Start the plan', detail: 'A structured, supervised elimination phase where bowel symptoms are present, built from your usual foods, or an anti-inflammatory pattern and flare-day eating plan.' },
      { when: 'Week 6', length: '45 min', title: 'Symptom and pathology review', detail: 'Two-week symptom check, iron plan for heavy bleeding, reintroduction schedule designed.', takeaway: 'Updated meal plan.' },
      { when: 'Week 9', length: '30 min', title: 'Reintroduction', detail: 'Identify the food groups that matter and liberalise everything else. Fatigue and medication-related nausea.' },
      { when: 'Week 12', length: '30 min', title: 'Least-restrictive long term', detail: 'A sustainable pattern, fertility supplements layered on if relevant, and links to pelvic physiotherapy or psychology where useful.' },
    ],
  },
  {
    id: 'general', tab: 'General nutrition / another concern', name: 'General nutrition', utm: 'general',
    who: 'Support with everyday eating, family nutrition or a health concern.',
    story: 'Start with a free introductory call to discuss what you need and how Kat may be able to help. Your initial consultation explores your history, eating habits, preferences and practical circumstances so you can develop an individualised plan together.',
    program: 'Not required. After your assessment, you and Kat can discuss individual reviews or other ongoing support if it would help.',
    medicare: 'If you have a chronic condition, your GP may be able to refer you under a GP Chronic Condition Management Plan; Medicare rebates may apply for eligible clients.',
    consults: [
      { when: 'First appointment', length: '75 min', title: 'Initial consultation', detail: 'Your history, eating habits, preferences, results and practical circumstances, and what matters most to you.', takeaway: 'Your individualised plan and resources within 2 business days.' },
      { when: 'If helpful', length: '30 min', title: 'Review appointments', detail: 'Booked as you need them, to check how the plan is working and adjust it.' },
    ],
  },
];