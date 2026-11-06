/* Single source of truth for the focused (One-Question) consultation.
   Positioning agreed 6 Nov 2026: the initial consultation is the primary clinical offer;
   this is a secondary option for one suitable, narrowly defined concern.
   ALL client-facing wording below is DRAFT pending Kat's approval (gate 2: public health copy).
   Fee appears ONLY on /one-question-consult/ (no-price rule for every other page).
   Keep Calendly event "one-question-consult" description, intake page and Brevo emails in line with this file. */

export const fc = {
  name: 'One-Question Consult', // working name; Kat decides the public name
  url: '/one-question-consult/',
  booking: 'https://calendly.com/katridout/one-question-consult',
  fee: '$129', // total fee, GST-free, prepaid (confirmed in Calendly + Stripe, 6 Nov 2026)
  duration: '30 minutes',
  format: 'video (telehealth, Australia-wide)',
  eligibility: 'New clients only, one per person',
  turnaround: '2 business days',

  heading: 'Already know the one concern you need help with?',
  summary:
    'A focused appointment for one suitable nutrition concern. Includes relevant background questions, practical advice within the agreed scope, and a brief written summary of the discussion and next steps.',

  includes: [
    'One agreed, focused nutrition concern, subject to suitability',
    'Relevant background questions and clarification during the appointment',
    'Advice appropriate to that concern and the assessment undertaken',
    'A brief written summary of the advice discussed and agreed next steps',
  ],

  initialBetterWhen: [
    'Several concerns need to be understood together',
    'A comprehensive dietary and health history assessment is needed',
    'Detailed pathology interpretation is required',
    'You need comprehensive meal or supplement planning',
    'You need ongoing condition management or coordinated reviews',
  ],

  deliverable: 'Brief written summary',
  deliverableDetail:
    'It records the advice and next steps discussed. It is not a comprehensive assessment, a full meal plan or an ongoing support package.',

  /* Existing approved credit terms (ADR-009 / 20 Oct plan). Do not expand without Anthony. */
  credit:
    'If you book an initial consultation or The Program within 30 days of your One-Question Consult, its fee is credited towards that booking. One credit per client, not transferable, not combined with a Medicare rebate.',

  /* Suitability rule decided by Anthony 6 Nov 2026 21:53; full refund option 21:55. Shown before payment. */
  suitability:
    'Kat reviews your concern within 1 business day of booking. If it needs more than a focused 30 minutes, she will move you to an initial consultation instead and credit your $129 towards it, so you only pay the difference. If you would rather not go ahead with an initial consultation, you get a full refund.',

  initialPitch:
    'Choose an initial consultation when you want to look at the whole picture, connect several concerns and build a coordinated nutrition plan.',
};
