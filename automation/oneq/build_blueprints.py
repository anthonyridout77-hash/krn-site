#!/usr/bin/env python3
"""Generates the Make blueprints for the One-Question Consult journey.

Output: automation/oneq/blueprints/*.json (one per scenario). These are the
source of truth for what is loaded into Make via scenarios_update. Nothing in
here activates a scenario. All client-facing copy is DRAFT until Kat approves.

Keys and identifiers
  record key  = md5(invitee_uri)                     (one record per appointment)
  appointment_id = Calendly invitee URI
  client_id   = md5(lower(email) + SECRET)           (stable across reschedules)
  token       = md5(record key + SECRET)             (intake + approval links)
  plan_version = first 12 hex of sha256 of the draft PDF (set by the plan agent)
"""
import json, os

DS = 247912          # KRN OneQ Journeys
HOL = 247920         # KRN QLD Public Holidays
SMTP = 11581523      # Info @ KRN
CAL = 12127927       # Calendly connection
DRIVE = 8331666      # Google Drive connection
HOOK_CAL = 4050983
HOOK_INTAKE = 4050984
HOOK_APPROVE = 4050985
JOBS = "17jvKskDx568_Pu5wAmfDBlLQo6I3MCJN"
TRANSCRIPTS = "1nA5vGhOYs3VRmS7_5plWilY37ngyReSJ"
SECRET = os.environ.get("KRN_ONEQ_SECRET")  # never committed; lives in Make blueprints and the Claude task env
if not SECRET:
    raise SystemExit("set KRN_ONEQ_SECRET (the value used in the live Make scenarios) before generating")
TZ = "Australia/Brisbane"
KAT = "info@katridout.com.au"
ANT = "anthonyridout77@gmail.com"
SITE = "https://www.katridout.com.au"

KEY = "{{md5(1.uri)}}"
TOKEN = "{{md5(md5(1.uri) + \"" + SECRET + "\")}}"
CLIENT_ID = "{{md5(lower(trim(1.email)) + \"" + SECRET + "\")}}"
INITIALS = "{{upper(substring(1.first_name; 0; 1))}}{{upper(substring(1.last_name; 0; 1))}}"

P = ("<p style='margin:0 0 16px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,"
     "Arial,sans-serif;font-size:16px;line-height:26px;color:#3a3532;'>")
FOOT = ("<p style='margin:14px 0 0;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:12px;"
        "line-height:18px;color:#9C958F;border-top:1px solid #EDE6DE;padding-top:14px;'>Katrina Ridout "
        "Nutrition, Accredited Practising Dietitian. Level 1, 36 Baroona Road, Milton QLD 4064. "
        "<a href='https://www.katridout.com.au' style='color:#9C958F'>katridout.com.au</a></p>")
SIGN = (P + "<em style='font-family:Georgia;color:#E89B8C;font-size:18px'>Kat xx</em><br>"
        "<span style='color:#6B645F;font-size:14px'>Katrina Ridout, Accredited Practising Dietitian</span></p>")


def client_html(paras):
    body = "".join(t if t.startswith("<table") else P + t + "</p>" for t in paras)
    return ("<div style='background:#FAF7F2;padding:24px 12px;'><div style='max-width:600px;margin:0 auto;"
            "background:#ffffff;border-radius:8px;box-shadow:0 1px 3px rgba(44,40,38,0.06);'>"
            "<div style='padding:36px 24px 24px;text-align:center;'><img src='https://www.katridout.com.au/images/krn-logo.png' "
            "alt='Katrina Ridout Nutrition' width='220' style='max-width:220px;height:auto;'></div>"
            "<div style='height:3px;background:#E89B8C;'></div><div style='padding:32px 36px 28px;'>"
            + body + SIGN + FOOT + "</div></div></div>")


def button(href, label):
    return ("<table role='presentation' cellpadding='0' cellspacing='0' style='margin:22px 0;'><tr><td "
            "style='border-radius:4px;background:#E89B8C;'><a href='" + href + "' style='display:inline-block;"
            "padding:15px 34px;font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;"
            "letter-spacing:.4px;color:#ffffff;text-decoration:none;border-radius:4px;'>" + label + "</a></td></tr></table>")


def ops_html(lines):
    return ("<div style='font-family:-apple-system,Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;"
            "color:#2C2826;max-width:600px'>" + "".join("<p>" + l + "</p>" for l in lines) + "</div>")


def email(mid, x, y, to, subject, html, cc=None, sender_name="Kat Ridout", attachments=None, flt=None):
    m = {
        "id": mid,
        "module": "email:ActionSendEmail",
        "version": 7,
        "parameters": {"account": SMTP, "saveAfterSent": False},
        "mapper": {
            "cc": cc or [], "to": to, "bcc": [],
            "from": sender_name + " <" + KAT + ">",
            "html": html, "sender": KAT, "headers": [], "replyTo": KAT,
            "subject": subject, "priority": "normal", "inReplyTo": "", "references": [],
            "attachments": attachments or [], "contentType": "html",
        },
        "metadata": {"designer": {"x": x, "y": y}},
    }
    if flt:
        m["filter"] = flt
    return m


def ds(mid, x, y, module, mapper, flt=None, store=DS, params=None):
    p = {"datastore": store}
    if params:
        p.update(params)
    m = {"id": mid, "module": "datastore:" + module, "version": 1, "parameters": p,
         "mapper": mapper, "metadata": {"designer": {"x": x, "y": y}}}
    if flt:
        m["filter"] = flt
    return m


def respond(mid, x, y, status, body, flt=None, ctype="text/html"):
    m = {"id": mid, "module": "gateway:WebhookRespond", "version": 1, "parameters": {},
         "mapper": {"status": str(status), "body": body, "headers": [{"key": "Content-Type", "value": ctype}]},
         "metadata": {"designer": {"x": x, "y": y}}}
    if flt:
        m["filter"] = flt
    return m


def page(title, text):
    return ("<html><body style='font-family:-apple-system,Helvetica,Arial,sans-serif;padding:40px;color:#2C2826'>"
            "<h2 style='color:#6F7F62'>Katrina Ridout Nutrition</h2><h3>" + title + "</h3><p style='font-size:18px'>"
            + text + "</p></body></html>")


def f(name, *groups):
    """filter: each group is a list of AND conditions; groups are OR'd."""
    return {"name": name, "conditions": [list(g) for g in groups]}


def c(a, o, b=None):
    d = {"a": a, "o": o}
    if b is not None:
        d["b"] = b
    return d


def router(mid, x, y, routes):
    return {"id": mid, "module": "builtin:BasicRouter", "version": 1, "parameters": {}, "mapper": None,
            "routes": [{"flow": r} for r in routes], "metadata": {"designer": {"x": x, "y": y}}}


def blueprint(name, flow, instant, scheduling):
    return {"name": name, "flow": flow, "metadata": {"instant": instant, "version": 1},
            "scheduling": scheduling, "interface": {"input": [], "output": []}}


LOG = "{{now}} "

# ---------------------------------------------------------------- 1 Booking
def booking():
    is_oneq = c("{{2.name}}", "text:equal", "One-Question Consult")
    active = c("{{1.status}}", "text:equal", "active")
    canceled = c("{{1.status}}", "text:equal", "canceled")
    paid = c("{{1.payment.successful}}", "boolean:istrue")
    not_paid = c("{{1.payment.successful}}", "boolean:isfalse")
    cand = "{{formatDate(addDays(2.start_time; 5.i); \"YYYY-MM-DD\"; \"" + TZ + "\")}}"
    weekday = "{{formatDate(addDays(2.start_time; 5.i); \"E\"; \"" + TZ + "\")}}"
    intake_link = SITE + "/one-question-intake/?c=" + KEY + "&t=" + TOKEN
    first = "{{1.first_name}}"
    welcome = client_html([
        "Hi " + first + ",",
        "Thanks for booking. Your One-Question Consult is on {{formatDate(2.start_time; \"dddd D MMMM, h:mm A\"; \"" + TZ + "\")}} (Brisbane time). We will meet by video: {{2.location.join_url}}",
        "So I can make the most of our 30 minutes, please answer three short questions before we talk. It takes about two minutes:",
        button(intake_link, "Answer my three questions"),
        "How your written plan is made: with your permission, the video call is transcribed. I use the transcript, together with your three answers, to prepare your one-page plan. Drafting software helps me put it on the page, and I check and approve every word before it is sent to you. Nothing is sent that I have not read. You can choose manual notes instead on the questions page, and the plan will take the same two business days either way.",
        "What happens next:",
        "1. I read your answers before we meet.",
        "2. On the call I answer your question properly, in plain language, for your situation.",
        "3. Within two business days you receive your one-page written plan by email.",
        "If you need more than one question answered, that is fine. We can talk about an Initial Consultation or The Program on the call, and your $129 is credited towards either if you book within 30 days.",
        "P.S. Need to move the time? Use the link in your Calendly confirmation. Changes are free up to 24 hours before.",
    ])
    record = {
        "client_id": CLIENT_ID, "appointment_id": "{{1.uri}}", "event_uri": "{{1.event}}",
        "email": "{{lower(trim(1.email))}}", "name": "{{1.name}}", "first_name": first, "token": TOKEN,
        "status": "booked", "payment_status": "paid", "booked_at": "{{now}}", "consult_at": "{{2.start_time}}",
        "meet_link": "{{2.location.join_url}}", "rescheduled_from": "{{ifempty(1.old_invitee; \"\")}}",
        "intake_status": "pending", "consent_transcript": "", "transcript_status": "pending",
        "due_at": "{{get(split(7.text; \",\"); 2)}}T17:00:00+10:00",
        "approval_status": "none", "delivery_status": "none", "record_saved": "no",
        "credit_expiry": "{{addDays(2.start_time; 30)}}", "nurture_step": 0, "marketing_optin": "",
        "log": LOG + "booked (paid); due {{get(split(7.text; \",\"); 2)}}", "updated": "{{now}}",
    }
    route_paid = [
        ds(4, 900, -600, "ExistRecord", {"key": KEY}, f("OneQ created and paid", [is_oneq, active, paid])),
        {"id": 5, "module": "builtin:BasicRepeater", "version": 1, "parameters": {},
         "mapper": {"start": "1", "repeats": "8", "step": "1"},
         "filter": f("new appointment (idempotent)", [c("{{4.exist}}", "boolean:isfalse")]),
         "metadata": {"designer": {"x": 1200, "y": -600}}},
        ds(6, 1500, -600, "ExistRecord", {"key": cand}, store=HOL),
        {"id": 7, "module": "util:TextAggregator", "version": 1,
         "parameters": {"feeder": 5, "rowSeparator": "other", "otherRowSeparator": ","},
         "mapper": {"value": cand},
         "filter": f("business day (Mon-Fri, not QLD holiday)",
                     [c("{{6.exist}}", "boolean:isfalse"), c(weekday, "number:less", "6")]),
         "metadata": {"designer": {"x": 1800, "y": -600}}},
        ds(8, 2100, -600, "AddRecord", {"key": KEY, "data": record, "overwrite": False}),
        ds(9, 2400, -600, "UpdateRecord",
           {"key": "{{md5(1.old_invitee)}}", "data": {"status": "rescheduled", "updated": "{{now}}",
            "log": LOG + "rescheduled to {{1.uri}}"}},
           f("was a reschedule: close old record", [c("{{1.old_invitee}}", "exist")])),
        email(10, 2700, -600, ["{{lower(trim(1.email))}}"],
              "Your One-Question Consult is booked, " + first, welcome),
    ]
    route_unpaid = [
        ds(11, 900, -300, "ExistRecord", {"key": KEY}, f("OneQ created, payment not confirmed", [is_oneq, active, not_paid])),
        ds(12, 1200, -300, "AddRecord", {"key": KEY, "overwrite": False, "data": {
            "client_id": CLIENT_ID, "appointment_id": "{{1.uri}}", "event_uri": "{{1.event}}",
            "email": "{{lower(trim(1.email))}}", "name": "{{1.name}}", "first_name": first, "token": TOKEN,
            "status": "payment_hold", "payment_status": "unconfirmed", "booked_at": "{{now}}",
            "consult_at": "{{2.start_time}}", "meet_link": "{{2.location.join_url}}",
            "intake_status": "pending", "transcript_status": "pending", "approval_status": "none",
            "delivery_status": "none", "log": LOG + "payment not confirmed by Calendly; held", "updated": "{{now}}"}},
           f("new appointment (idempotent)", [c("{{11.exist}}", "boolean:isfalse")])),
        email(13, 1500, -300, [ANT], "OneQ payment hold: " + INITIALS + " " + KEY,
              ops_html(["Calendly reported a One-Question Consult booking without a successful payment.",
                        "Client initials " + INITIALS + ", appointment key " + KEY + ", consult {{formatDate(2.start_time; \"ddd D MMM, h:mm A\"; \"" + TZ + "\")}}.",
                        "No welcome email was sent. Check Calendly and Stripe, then either mark the record paid (payment_status=paid, status=booked) or cancel the booking. Manual recovery: Make data store KRN OneQ Journeys, key above."]),
              sender_name="KRN Automation"),
    ]
    route_resched = [
        ds(14, 900, 0, "ExistRecord", {"key": KEY}, f("OneQ canceled as part of a reschedule", [is_oneq, canceled, c("{{1.rescheduled}}", "boolean:istrue")])),
        ds(15, 1200, 0, "UpdateRecord", {"key": KEY, "data": {"status": "rescheduled", "updated": "{{now}}", "log": LOG + "canceled by reschedule"}},
           f("record exists", [c("{{14.exist}}", "boolean:istrue")])),
    ]
    route_cancel = [
        ds(16, 900, 300, "ExistRecord", {"key": KEY}, f("OneQ cancelled", [is_oneq, canceled, c("{{1.rescheduled}}", "boolean:isfalse")])),
        ds(17, 1200, 300, "UpdateRecord", {"key": KEY, "data": {"status": "cancelled", "updated": "{{now}}", "log": LOG + "cancelled by {{1.cancellation.canceled_by}}"}},
           f("record exists", [c("{{16.exist}}", "boolean:istrue")])),
        email(18, 1500, 300, [KAT], "OneQ cancelled: " + INITIALS + ", {{formatDate(2.start_time; \"ddd D MMM h:mm A\"; \"" + TZ + "\")}}",
              ops_html(["The One-Question Consult for client " + INITIALS + " on {{formatDate(2.start_time; \"dddd D MMMM, h:mm A\"; \"" + TZ + "\")}} was cancelled ({{ifempty(1.cancellation.reason; \"no reason given\")}}).",
                        "Appointment key " + KEY + ". Reminders and the plan workflow have stopped for this appointment. Refunds are handled manually in Stripe; nothing automated touches payment."]),
              cc=[ANT], sender_name="KRN Automation"),
    ]
    route_other = [
        ds(19, 900, 600, "SearchRecord", {"filter": [[c("client_id", "text:equal", CLIENT_ID), c("status", "text:equal", "delivered")]]},
           f("other booking: credit check (phase two, manual)", [c("{{2.name}}", "text:notequal", "One-Question Consult"), active]),
           params={"limit": 5}),
        email(20, 1200, 600, [KAT], "Credit to check: " + INITIALS + " booked {{2.name}}",
              ops_html(["A client with a delivered One-Question plan (initials " + INITIALS + ", plan delivered {{formatDate(19.data.delivered_at; \"D MMM YYYY\"; \"" + TZ + "\")}}) has booked {{2.name}} for {{formatDate(2.start_time; \"ddd D MMM, h:mm A\"; \"" + TZ + "\")}}.",
                        "Credit expiry on record: {{formatDate(19.data.credit_expiry; \"D MMM YYYY\"; \"" + TZ + "\")}}. Apply the $129 credit manually in Zanda if it is still valid. Credit redemption automation is phase two and is not active."]),
              cc=[ANT], sender_name="KRN Automation"),
    ]
    flow = [
        {"id": 1, "module": "calendly:watchInvitees", "version": 2, "parameters": {"__IMTHOOK__": HOOK_CAL},
         "mapper": {}, "metadata": {"designer": {"x": 0, "y": 0}}},
        {"id": 2, "module": "calendly:getAnEvent", "version": 2, "parameters": {"__IMTCONN__": CAL},
         "mapper": {"event": "{{1.event}}"}, "metadata": {"designer": {"x": 300, "y": 0}}},
        router(3, 600, 0, [route_paid, route_unpaid, route_resched, route_cancel, route_other]),
    ]
    return blueprint("KRN OneQ 1 Booking", flow, True, {"type": "immediately"})


# ---------------------------------------------------------------- 2 Intake
def intake():
    exist = c("{{2.exist}}", "boolean:istrue")
    tok_ok = c("{{1.t}}", "text:equal", "{{4.token}}")
    tok_bad = c("{{1.t}}", "text:notequal", "{{4.token}}")
    manual = c("{{1.consent}}", "text:equal", "manual")
    inner = router(5, 1200, -150, [
        [ds(6, 1500, -300, "UpdateRecord", {"key": "{{1.c}}", "data": {
            "question": "{{1.question}}", "context": "{{1.context}}", "tried": "{{1.tried}}",
            "intake_status": "complete",
            "consent_transcript": "{{if(1.consent = \"manual\"; \"false\"; \"true\")}}",
            "status": "{{if(4.status = \"booked\"; \"intake_done\"; 4.status)}}",
            "log": "{{4.log}} | " + LOG + "intake complete; consent={{1.consent}}", "updated": "{{now}}"}},
            f("token ok", [tok_ok])),
         email(7, 1800, -300, [KAT], "OneQ: manual notes requested for {{4.first_name}} ({{formatDate(4.consult_at; \"ddd D MMM h:mm A\"; \"" + TZ + "\")}})",
               ops_html(["The client for the One-Question Consult on {{formatDate(4.consult_at; \"dddd D MMMM, h:mm A\"; \"" + TZ + "\")}} has asked for manual notes instead of transcription.",
                         "Do not record or transcribe this call. Take your own notes and write the one-page plan yourself; the plan agent will skip this appointment (consent_transcript=false).",
                         "Appointment key {{1.c}}."]),
               cc=[ANT], sender_name="KRN Automation", flt=f("manual notes chosen", [manual])),
         respond(8, 2100, -300, 200, "{\"ok\":true}", ctype="application/json")],
        [respond(9, 1500, 0, 403, "{\"ok\":false,\"error\":\"link not valid\"}", f("token mismatch", [tok_bad]), ctype="application/json")],
    ])
    flow = [
        {"id": 1, "module": "gateway:CustomWebHook", "version": 1, "parameters": {"hook": HOOK_INTAKE, "maxResults": 1},
         "mapper": {}, "metadata": {"designer": {"x": 0, "y": 0}}},
        ds(2, 300, 0, "ExistRecord", {"key": "{{1.c}}"}),
        router(3, 600, 0, [
            [ds(4, 900, -150, "GetRecord", {"key": "{{1.c}}", "returnWrapped": False}, f("record exists", [exist])), inner],
            [respond(10, 900, 300, 403, "{\"ok\":false,\"error\":\"no booking found\"}", f("no record", [c("{{2.exist}}", "boolean:isfalse")]), ctype="application/json")],
        ]),
    ]
    return blueprint("KRN OneQ 2 Intake", flow, True, {"type": "immediately"})


# ---------------------------------------------------------------- 3 Sweeps (every 6h)
def sweeps():
    D = "{{1.data."
    K = "{{1.key}}"
    con = D + "consult_at}}"
    first = D + "first_name}}"
    initials = "{{upper(substring(" + D[2:] + "name; 0; 1))}}"
    appt = "key {{1.key}}"
    pre_consult = [c(D + "status}}", "text:equal", "booked")], [c(D + "status}}", "text:equal", "intake_done")]
    soon = [c(con, "date:greater", "{{addHours(now; 12)}}"), c(con, "date:less", "{{addHours(now; 36)}}")]
    approve_link = SITE + "/oneq-approve/?c=" + K + "&t=" + D + "token}}&v=" + D + "plan_version}}"

    def route(flt, mods):
        mods[0]["filter"] = flt
        return mods

    r_remind = route(
        f("client reminder due", pre_consult[0] + soon + [c(D + "reminder_sent_at}}", "notexist")],
          pre_consult[1] + soon + [c(D + "reminder_sent_at}}", "notexist")]),
        [email(2, 600, -900, [D + "email}}"], "Tomorrow: your One-Question Consult, " + first,
               client_html(["Hi " + first + ",",
                            "A quick reminder that we meet tomorrow, {{formatDate(" + con[2:-2] + "; \"dddd D MMMM, h:mm A\"; \"" + TZ + "\")}} (Brisbane time), by video: " + D + "meet_link}}",
                            "{{if(" + D[2:] + "intake_status = \"complete\"; \"Thank you for sending your three answers; I have read them.\"; \"If you have not yet sent your three short answers, the link is in your welcome email. If there is no time, that is fine; we will cover them at the start of the call.\")}}",
                            "If anything has changed, just reply to this email. Otherwise I will see you then. Your written plan follows within two business days of the call."])),
         ds(3, 900, -900, "UpdateRecord", {"key": K, "data": {"reminder_sent_at": "{{now}}", "updated": "{{now}}"}})])

    r_prebrief = route(
        f("Kat pre-brief due", pre_consult[0] + soon + [c(D + "prebrief_sent_at}}", "notexist")],
          pre_consult[1] + soon + [c(D + "prebrief_sent_at}}", "notexist")]),
        [{"id": 4, "module": "google-drive:createAFileFromText", "version": 4, "parameters": {"__IMTCONN__": DRIVE},
          "mapper": {"destination": "drive", "folderId": JOBS, "convert": False,
                     "name": "prebrief-{{1.key}}-{{formatDate(" + con[2:-2] + "; \"YYYY-MM-DD\"; \"" + TZ + "\")}}.txt",
                     "content": "KRN One-Question Consult pre-brief (restricted)\nClient: " + D + "name}} (" + D + "email}})\nConsult: {{formatDate(" + con[2:-2] + "; \"dddd D MMMM YYYY, h:mm A\"; \"" + TZ + "\")}} Brisbane\nMeet: " + D + "meet_link}}\nAppointment key: {{1.key}}\nIntake: " + D + "intake_status}}\nTranscription consent: {{ifempty(" + D[2:] + "consent_transcript; \"not answered\")}}\n\nQuestion:\n{{ifempty(" + D[2:] + "question; \"(not completed)\")}}\n\nContext:\n{{ifempty(" + D[2:] + "context; \"(not completed)\")}}\n\nAlready tried / been told:\n{{ifempty(" + D[2:] + "tried; \"(not completed)\")}}\n"},
          "metadata": {"designer": {"x": 600, "y": -600}}},
         email(5, 900, -600, [KAT], "Pre-brief: " + initials + ", One-Question Consult {{formatDate(" + con[2:-2] + "; \"ddd D MMM h:mm A\"; \"" + TZ + "\")}}",
               ops_html(["Your pre-brief for tomorrow's One-Question Consult (client " + initials + ", " + appt + ") is in Drive, in the restricted KRN OneQ Jobs folder:",
                         "<a href='https://drive.google.com/file/d/{{4.id}}/view'>Open the pre-brief</a>",
                         "Intake: " + D + "intake_status}}. Transcription consent: {{ifempty(" + D[2:] + "consent_transcript; \"not answered\")}}. If consent is false, do not record the call; manual notes only.",
                         "After the call the transcript lands in Drive and the plan agent drafts a one-page plan marked UNAPPROVED DRAFT. You will get an approval request; nothing reaches the client until you approve the exact version you reviewed."]),
               sender_name="KRN Automation"),
         ds(6, 1200, -600, "UpdateRecord", {"key": K, "data": {"prebrief_sent_at": "{{now}}", "updated": "{{now}}"}})])

    r_intake_missing = route(
        f("intake missing within 24h", [c(D + "status}}", "text:equal", "booked"), c(D + "intake_status}}", "text:equal", "pending"),
          c(con, "date:less", "{{addHours(now; 24)}}"), c(con, "date:greater", "{{now}}")]),
        [email(7, 600, -300, [ANT], "OneQ: intake missing, " + initials + " " + appt,
               ops_html(["No intake answers for the One-Question Consult on {{formatDate(" + con[2:-2] + "; \"dddd D MMMM, h:mm A\"; \"" + TZ + "\")}} (client " + initials + ", " + appt + ").",
                         "Kat's pre-brief will say so and she will ask the three questions at the start of the call. Transcription consent is also unanswered, so treat the call as manual notes unless the client consents verbally at the start (Kat records that in Zanda).",
                         "Manual recovery: if the client emails answers, paste them into the data store record (question, context, tried; intake_status=complete; consent_transcript true/false)."]),
               cc=[KAT], sender_name="KRN Automation"),
         ds(8, 900, -300, "UpdateRecord", {"key": K, "data": {"intake_status": "missing_alerted", "updated": "{{now}}", "log": D + "log}} | " + LOG + "intake missing alert"}})])

    post = [c(con, "date:less", "{{addHours(now; -6)}}"), c(D + "transcript_status}}", "text:equal", "pending"), c(D + "consent_transcript}}", "text:notequal", "false")]
    r_transcript_missing = route(
        f("transcript missing 6h after consult", [c(D + "status}}", "text:equal", "booked")] + post,
          [c(D + "status}}", "text:equal", "intake_done")] + post),
        [email(9, 600, 0, [ANT], "OneQ: no transcript yet, " + initials + " " + appt,
               ops_html(["The One-Question Consult for client " + initials + " ended at {{formatDate(" + con[2:-2] + "; \"h:mm A, ddd D MMM\"; \"" + TZ + "\")}} and no transcript has been filed in Drive > KRN OneQ Transcripts.",
                         "Due to client: {{formatDate(" + D[2:] + "due_at; \"dddd D MMMM\"; \"" + TZ + "\")}} (2 business days).",
                         "Manual recovery: check Meet recording status; if there is no recording, Kat writes the plan from her notes and uploads the PDF to KRN OneQ Plans, then the agent is run with a manual job file, or Kat sends the plan herself and marks the record delivered."]),
               cc=[KAT], sender_name="KRN Automation"),
         ds(10, 900, 0, "UpdateRecord", {"key": K, "data": {"transcript_status": "missing_alerted", "updated": "{{now}}", "log": D + "log}} | " + LOG + "transcript missing alert"}})])

    pending = [c(D + "approval_status}}", "text:equal", "pending")]
    r_approval_reminder = route(
        f("approval pending 24h", pending + [c(D + "approval_sent_at}}", "date:less", "{{addHours(now; -24)}}"), c(D + "approval_reminded_at}}", "notexist")]),
        [email(11, 600, 300, [KAT], "Reminder: plan awaiting your approval, " + initials,
               ops_html(["The one-page plan for client " + initials + " (" + appt + ", version " + D + "plan_version}}) has been waiting for your review for 24 hours.",
                         "Due to the client by {{formatDate(" + D[2:] + "due_at; \"dddd D MMMM\"; \"" + TZ + "\")}}.",
                         "<a href='" + approve_link + "'>Review and approve or request changes</a>. The page shows the PDF link; nothing is sent until you confirm on that page."]),
               sender_name="KRN Automation"),
         ds(12, 900, 300, "UpdateRecord", {"key": K, "data": {"approval_reminded_at": "{{now}}", "updated": "{{now}}"}})])

    delay_msg = ("Hi " + first + ", a short note to say your one-page plan is taking a little longer than the two business days I promised, for administrative reasons on my side. "
                 "It is on its way and I will have it to you as soon as it is ready. Thank you for your patience. Kat")
    r_escalate = route(
        f("approval pending 36h: escalate", pending + [c(D + "approval_sent_at}}", "date:less", "{{addHours(now; -36)}}"), c(D + "escalated_at}}", "notexist")]),
        [email(13, 600, 600, [ANT], "Escalation: OneQ plan unapproved 36h, " + initials + " " + appt,
               ops_html(["The plan for client " + initials + " (" + appt + ", version " + D + "plan_version}}) has been awaiting Kat's approval for 36 hours. Due date: {{formatDate(" + D[2:] + "due_at; \"dddd D MMMM\"; \"" + TZ + "\")}}.",
                         "Please check in with Kat. Approve page: <a href='" + approve_link + "'>open</a>.",
                         "DRAFT client message for Kat to approve and send herself if the deadline will be missed (do not send automatically):",
                         "<blockquote style='color:#555;border-left:3px solid #ccc;padding-left:12px'>" + delay_msg + "</blockquote>"]),
               cc=[KAT], sender_name="KRN Automation"),
         ds(14, 900, 600, "UpdateRecord", {"key": K, "data": {"escalated_at": "{{now}}", "updated": "{{now}}", "log": D + "log}} | " + LOG + "escalated to Anthony"}})])

    flow = [
        ds(1, 0, 0, "SearchRecord", {"filter": [[c("status", "text:equal", s)] for s in ["booked", "intake_done", "drafted", "changes_requested"]]}, params={"limit": 100}),
        router(15, 300, 0, [r_remind, r_prebrief, r_intake_missing, r_transcript_missing, r_approval_reminder, r_escalate]),
    ]
    return blueprint("KRN OneQ 3 Sweeps (6-hourly)", flow, False, {"type": "indefinitely", "interval": 21600})


# ---------------------------------------------------------------- 5 Transcript to Job
def transcript():
    D = "{{2.data."
    row = ("{\"key\":\"{{2.key}}\",\"appointment_id\":\"" + D + "appointment_id}}\",\"client_id\":\"" + D + "client_id}}\","
           "\"name\":\"{{replace(" + D[2:] + "name; \"\\\"\"; \"\")}}\",\"first_name\":\"" + D + "first_name}}\","
           "\"consult_at\":\"" + D + "consult_at}}\",\"due_at\":\"" + D + "due_at}}\",\"status\":\"" + D + "status}}\","
           "\"consent_transcript\":\"" + D + "consent_transcript}}\",\"intake_status\":\"" + D + "intake_status}}\","
           "\"question\":\"{{replace(replace(" + D[2:] + "question; \"\\\"\"; \"'\"); newline; \" \")}}\","
           "\"context\":\"{{replace(replace(" + D[2:] + "context; \"\\\"\"; \"'\"); newline; \" \")}}\","
           "\"tried\":\"{{replace(replace(" + D[2:] + "tried; \"\\\"\"; \"'\"); newline; \" \")}}\","
           "\"plan_version\":\"" + D + "plan_version}}\",\"approval_status\":\"" + D + "approval_status}}\"}")
    flow = [
        {"id": 1, "module": "google-drive:watchFilesInAFolder", "version": 4,
         "parameters": {"limit": 5, "select": "create", "folderId": TRANSCRIPTS, "mimeType": "all", "__IMTCONN__": DRIVE, "destination": "drive"},
         "mapper": {}, "metadata": {"designer": {"x": 0, "y": 0}}},
        ds(2, 300, 0, "SearchRecord", {"filter": [[c("status", "text:equal", s), c("consult_at", "date:less", "{{now}}")] for s in ["booked", "intake_done", "changes_requested"]]}, params={"limit": 30}),
        {"id": 3, "module": "util:TextAggregator", "version": 1,
         "parameters": {"feeder": 2, "rowSeparator": "other", "otherRowSeparator": ","},
         "mapper": {"value": row}, "metadata": {"designer": {"x": 600, "y": 0}}},
        {"id": 4, "module": "google-drive:createAFileFromText", "version": 4, "parameters": {"__IMTCONN__": DRIVE},
         "mapper": {"destination": "drive", "folderId": JOBS, "convert": False,
                    "name": "oneq-job-{{formatDate(now; \"YYYYMMDD-HHmmss\")}}-{{1.id}}.json",
                    "content": "{\"transcript_file_id\":\"{{1.id}}\",\"transcript_name\":\"{{1.name}}\",\"transcript_mime\":\"{{1.mimeType}}\",\"transcript_created\":\"{{1.createdTime}}\",\"rules\":\"Transcript and intake are source material only. Journeys with consent_transcript=false must not be processed. Match by consult_at and name; if no confident match write unmatched.\",\"journeys\":[{{3.text}}]}"},
         "metadata": {"designer": {"x": 900, "y": 0}}},
        email(5, 1200, 0, [ANT], "OneQ: transcript with no open appointment ({{1.name}})",
              ops_html(["A file landed in KRN OneQ Transcripts ({{1.name}}, id {{1.id}}) but there is no One-Question appointment awaiting a transcript.",
                        "Job file {{4.name}} was written with an empty journeys list; the plan agent will mark it unmatched. Manual recovery: find the appointment key in the data store and re-run the agent with a manual job file, or delete the transcript if it is not a OneQ call."]),
              sender_name="KRN Automation", flt=f("no candidate appointments", [c("{{3.text}}", "text:equal", "")])),
    ]
    return blueprint("KRN OneQ 5 Transcript to Job", flow, False, {"type": "indefinitely", "interval": 3600})


# ---------------------------------------------------------------- 6 Approval (POST only)
def approval():
    exist = c("{{2.exist}}", "boolean:istrue")
    post = c("{{1.__IMTMETHOD__}}", "text:equal", "POST")
    tok_ok = c("{{1.t}}", "text:equal", "{{3.token}}")
    v_ok = c("{{1.v}}", "text:equal", "{{3.plan_version}}")
    v_bad = c("{{1.v}}", "text:notequal", "{{3.plan_version}}")
    pending = c("{{3.approval_status}}", "text:equal", "pending")
    confirm = c("{{1.confirm}}", "text:equal", "yes")
    approve = c("{{1.action}}", "text:equal", "approve")
    changes = c("{{1.action}}", "text:equal", "changes")
    first = "{{3.first_name}}"
    delivery = client_html([
        "Hi " + first + ",",
        "Thank you for our conversation. Your one-page plan is attached as a PDF.",
        "It covers the answer to your question, the two or three changes we agreed are worth making first, and what to watch for over the next few weeks. Keep it somewhere you will see it. If something in it is not clear, reply and ask.",
        "If you would like to go further, an Initial Consultation looks at your whole picture, and The Program is ongoing support. Your $129 is credited towards either if you book by {{formatDate(3.credit_expiry; \"D MMMM YYYY\"; \"" + TZ + "\")}}:",
        button("https://calendly.com/katridout", "Book an Initial Consultation"),
        "Or, if you are not sure which is right, book a free 15-minute call and we will work it out together: <a href='https://calendly.com/katridout/15-minute-investigative-callback' style='color:#C4705C'>book a free call</a>",
    ])
    r_approve = [
        {"id": 5, "module": "google-drive:getAFile", "version": 4, "parameters": {"__IMTCONN__": DRIVE},
         "mapper": {"file": "{{3.plan_file}}", "select": "map"},
         "filter": f("POST approve: token, version, pending, confirmed", [post, approve, tok_ok, v_ok, pending, confirm, c("{{3.plan_file}}", "exist")]),
         "metadata": {"designer": {"x": 1200, "y": -450}}},
        email(6, 1500, -450, ["{{3.email}}"], "Your one-page plan, " + first, delivery,
              attachments=[{"data": "{{5.data}}", "fileName": "Your one-page plan - Katrina Ridout Nutrition.pdf"}]),
        ds(7, 1800, -450, "UpdateRecord", {"key": "{{1.c}}", "data": {
            "status": "delivered", "approval_status": "approved", "approved_version": "{{1.v}}", "approved_at": "{{now}}",
            "delivery_status": "sent", "delivered_at": "{{now}}", "updated": "{{now}}",
            "log": "{{3.log}} | " + LOG + "approved v{{1.v}} by Kat (POST); delivered"}}),
        email(8, 2100, -450, [KAT], "Sent: one-page plan for {{3.first_name}} (v{{1.v}})",
              ops_html(["The plan version {{1.v}} for client {{upper(substring(3.name; 0; 1))}} (appointment key {{1.c}}) was emailed to the client just now.",
                        "Clinical record: save the approved PDF to the client's Zanda file (the PDF is in Drive > KRN OneQ Plans, restricted). Then mark record_saved=yes in the data store, or reply to this email and Anthony will.",
                        "Credit expiry: {{formatDate(3.credit_expiry; \"D MMM YYYY\"; \"" + TZ + "\")}}. Follow-up emails (phase two) are not active."]),
              cc=[ANT], sender_name="KRN Automation"),
        respond(9, 2400, -450, 200, page("Approved and sent", "Version {{1.v}} has been emailed to the client. Please file the PDF in Zanda. You can close this tab.")),
    ]
    r_stale = [
        ds(10, 1200, -150, "UpdateRecord", {"key": "{{1.c}}", "data": {"updated": "{{now}}", "log": "{{3.log}} | " + LOG + "stale approval attempt for v{{1.v}} (current {{3.plan_version}})"}},
           f("POST approve: version mismatch or not pending", [post, approve, tok_ok, v_bad], [post, approve, tok_ok, c("{{3.approval_status}}", "text:notequal", "pending")])),
        respond(11, 1500, -150, 409, page("Not sent", "This approval is for an older version of the plan, or the plan is not awaiting approval. Open the latest approval email and review the current version.")),
    ]
    r_changes = [
        ds(12, 1200, 150, "UpdateRecord", {"key": "{{1.c}}", "data": {
            "status": "changes_requested", "approval_status": "changes_requested", "updated": "{{now}}",
            "log": "{{3.log}} | " + LOG + "changes requested on v{{1.v}}: {{replace(ifempty(1.notes; \"(no notes)\"); \"|\"; \"/\")}}"}},
           f("POST changes: token ok", [post, changes, tok_ok, confirm])),
        email(13, 1500, 150, [ANT], "OneQ changes requested: {{upper(substring(3.name; 0; 1))}} {{1.c}}",
              ops_html(["Kat requested changes to plan version {{1.v}} for appointment {{1.c}}.",
                        "Notes: {{ifempty(1.notes; \"(none given; check for a reply email)\")}}",
                        "Run the plan agent with a redraft; the new version gets a new hash and a fresh approval request. The earlier version cannot be approved any more."]),
              cc=[KAT], sender_name="KRN Automation"),
        respond(14, 1800, 150, 200, page("Held", "Changes requested. The plan goes back to draft and you will receive a new version to approve. Nothing has been sent to the client.")),
    ]
    r_other = [
        respond(15, 1200, 450, 403, page("Not valid", "This link is not valid, has expired, or was not submitted from the approval page."),
                f("anything else", [c("{{1.__IMTMETHOD__}}", "text:notequal", "POST")], [c("{{1.t}}", "text:notequal", "{{3.token}}")],
                  [c("{{1.confirm}}", "text:notequal", "yes")], [c("{{1.action}}", "text:notequal", "approve"), c("{{1.action}}", "text:notequal", "changes")])),
    ]
    flow = [
        {"id": 1, "module": "gateway:CustomWebHook", "version": 1, "parameters": {"hook": HOOK_APPROVE, "maxResults": 1, "method": True},
         "mapper": {}, "metadata": {"designer": {"x": 0, "y": 0}}},
        ds(2, 300, 0, "ExistRecord", {"key": "{{1.c}}"}),
        router(4, 600, 0, [
            [ds(3, 900, -150, "GetRecord", {"key": "{{1.c}}", "returnWrapped": False}, f("record exists", [exist])),
             router(16, 1000, -150, [r_approve, r_stale, r_changes, r_other])],
            [respond(17, 900, 600, 403, page("Not valid", "No matching appointment."), f("no record", [c("{{2.exist}}", "boolean:isfalse")]))],
        ]),
    ]
    return blueprint("KRN OneQ 6 Approval", flow, True, {"type": "immediately"})


if __name__ == "__main__":
    out = os.path.join(os.path.dirname(__file__), "blueprints")
    os.makedirs(out, exist_ok=True)
    for sid, bp in [(8408756, booking()), (8408758, intake()), (8408761, sweeps()), (8408776, transcript()), (8408782, approval())]:
        path = os.path.join(out, f"{sid}.json")
        with open(path, "w") as fh:
            json.dump(bp, fh, indent=1)
        print(sid, bp["name"], len(json.dumps(bp)), "bytes")
