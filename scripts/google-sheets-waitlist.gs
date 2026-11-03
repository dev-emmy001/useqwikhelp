/**
 * QwikHelp waitlist → Google Sheet
 *
 * Setup (one time, ~5 minutes):
 *  1. Create a Google Sheet (e.g. "QwikHelp Waitlist"). Open Extensions → Apps Script.
 *  2. Replace the editor contents with this file. Set SECRET below to the same long random string
 *     you put in WAITLIST_SECRET in .env.local / your hosting env vars.
 *  3. Deploy → New deployment → type "Web app".
 *       Execute as: Me
 *       Who has access: Anyone            (the SECRET check is what keeps strangers out)
 *     Authorise when asked, then copy the Web app URL (ends in /exec) into WAITLIST_WEBHOOK_URL.
 *  4. After editing this script later: Deploy → Manage deployments → edit → Version: New version.
 *     (Saving alone does not update the live URL.)
 *
 * Each signup appends: Timestamp | Email | Role | Source  (duplicate emails are skipped).
 */

const SECRET = "PASTE-THE-SAME-VALUE-AS-WAITLIST_SECRET";
const SHEET_NAME = "Waitlist";
const HEADERS = ["Timestamp", "Email", "Role", "Source"];

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (body.secret !== SECRET) return json_({ ok: false, error: "unauthorized" });

    const email = String(body.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json_({ ok: false, error: "invalid email" });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000); // serialise concurrent signups so rows never collide
    try {
      const sheet = getSheet_();
      const last = sheet.getLastRow();
      if (last > 1) {
        const existing = sheet.getRange(2, 2, last - 1, 1).getValues().flat();
        if (existing.indexOf(email) !== -1) return json_({ ok: true, duplicate: true });
      }
      sheet.appendRow([
        new Date(body.submittedAt || Date.now()),
        email,
        body.role === "provider" ? "provider" : "customer",
        String(body.source || "").slice(0, 100),
      ]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
