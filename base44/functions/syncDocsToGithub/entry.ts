import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const REPO = "hutaohyunjin/khattat";
const BRANCH = "main";

async function getDefaultBranch(accessToken) {
  const res = await fetch(`https://api.github.com/repos/${REPO}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "Khattat-App",
    },
  });
  if (!res.ok) throw new Error(`Could not fetch repo info: ${await res.text()}`);
  const data = await res.json();
  return data.default_branch || "main";
}

async function upsertFile(accessToken, branch, path, content, message) {
  const base64Content = btoa(unescape(encodeURIComponent(content)));
  const url = `https://api.github.com/repos/${REPO}/contents/${path}`;

  const commonHeaders = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "Khattat-App",
  };

  // Get existing SHA if file exists (must query on the correct branch)
  let sha = undefined;
  const getRes = await fetch(`${url}?ref=${branch}`, { headers: commonHeaders });
  if (getRes.ok) {
    const existing = await getRes.json();
    sha = existing.sha;
  }

  const body = {
    message,
    content: base64Content,
    branch,
    ...(sha ? { sha } : {}),
  };

  const putRes = await fetch(url, {
    method: "PUT",
    headers: { ...commonHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    const err = await putRes.text();
    throw new Error(`Failed to upsert ${path}: ${err}`);
  }
  return await putRes.json();
}

const README_CONTENT = `# Khattat — Arabic Calligraphy Learning App

**Khattat** (خطاط) is a gamified web app for learning Arabic calligraphy, focusing on the **Thuluth** script.

## Features

- 📖 **Style Library** — Explore 6 major calligraphy styles: Thuluth, Naskh, Diwani, Ruq'ah, Kufic, and Nastaliq
- ✏️ **Letter Practice** — 28 Arabic letters with detailed stroke guides and proportions
- 🎓 **Structured Lessons** — Theory and practice lessons grouped by letter families
- 📊 **Progress Tracking** — XP system, streaks, levels, and mastery tracking
- 🏆 **Rank System** — From Novice Scribe to Legendary Khattāt

## Letter Groups

| Group | Letters |
|-------|---------|
| 1 | Alif (ا), Ba (ب), Ta (ت), Tha (ث) |
| 2 | Jeem (ج), Ha (ح), Kha (خ) |
| 3 | Dal (د), Dhal (ذ), Ra (ر), Zay (ز) |
| 4 | Seen (س), Sheen (ش), Saad (ص), Dhad (ض) |
| 5 | Tah (ط), Dhah (ظ), Aeen (ع), Ghaeen (غ) |
| 6 | Fa (ف), Qaaf (ق), Kaaf (ك) |
| 7 | Lam (ل), Meem (م), Noon (ن), Ha (ه) |
| 8 | Waw (و), Ya (ي) |

## Tech Stack

- **Frontend:** React + Tailwind CSS + Framer Motion
- **Backend:** Base44 BaaS (entities, auth, integrations)
- **Fonts:** Space Grotesk, Space Mono, Rajdhani, Noto Naskh Arabic

## XP & Level System

| Level | Title | XP Required |
|-------|-------|-------------|
| 1 | Novice Scribe | 0 |
| 2 | Apprentice | 50 |
| 3 | Student | 120 |
| 4 | Practitioner | 220 |
| 5 | Artisan | 350 |
| 6 | Skilled Calligrapher | 520 |
| 7 | Master Scribe | 730 |
| 8 | Grand Calligrapher | 1000 |
| 9 | Khattāt | 1350 |
| 10 | Master Khattāt | 1800 |
| 11 | Legendary Khattāt | 2400 |

## Lessons

Each lesson awards XP upon completion:

| Lesson | Type | XP |
|--------|------|----|
| Introduction to Arabic Calligraphy | Theory | 20 |
| Basic Strokes & Pen Control | Theory | 25 |
| Group 1: Alif, Ba, Ta, Tha | Practice | 30 |
| Group 2: Jeem, Ha, Kha | Practice | 35 |
| Group 3: Dal, Dhal, Ra, Zay | Practice | 30 |
| Group 4: Seen, Sheen, Saad, Dhad | Practice | 40 |
| Group 5: Tah, Dhah, Ain, Ghain | Practice | 40 |
| Group 6: Fa, Qaf, Kaf | Practice | 35 |
| Group 7: Lam, Meem, Noon, Ha | Practice | 35 |
| Group 8: Waw & Ya | Practice | 30 |
`;

const CALLIGRAPHY_DATA_DOC = `# Calligraphy Data Reference

This document describes the structured data used throughout the Khattat app.

---

## Calligraphy Styles

| ID | Name | Arabic | Difficulty |
|----|------|--------|------------|
| thuluth | Thuluth | الثلث | Advanced |
| naskh | Naskh | النسخ | Beginner |
| diwani | Diwani | الديواني | Advanced |
| ruqah | Ruq'ah | الرقعة | Beginner |
| kufi | Kufic | الكوفي | Intermediate |
| nastaliq | Nastaliq | النستعليق | Advanced |

---

## Thuluth Letters

All 28 letters of the Arabic alphabet as taught in the Thuluth style.

| ID | Letter | Name | Arabic Name | Transliteration | Group | Difficulty | Practice Order |
|----|--------|------|-------------|-----------------|-------|------------|----------------|
| alif | ا | Alif (ا) | ألف | ā / a | 1 | 1 | 1 |
| ba | ب | Ba (ب) | باء | b | 1 | 2 | 2 |
| ta | ت | Ta (ت) | تاء | t | 1 | 2 | 3 |
| tha | ث | Tha (ث) | ثاء | th | 1 | 2 | 4 |
| jim | ج | Jeem (ج) | جيم | j | 2 | 3 | 5 |
| ha_small | ح | Ha (ح) | حاء | ḥ | 2 | 3 | 6 |
| kha | خ | Kha (خ) | خاء | kh | 2 | 3 | 7 |
| dal | د | Dal (د) | دال | d | 3 | 2 | 8 |
| dhal | ذ | Dhal (ذ) | ذال | dh | 3 | 2 | 9 |
| ra | ر | Ra (ر) | راء | r | 3 | 1 | 10 |
| zay | ز | Zay (ز) | زاي | z | 3 | 1 | 11 |
| sin | س | Seen (س) | سين | s | 4 | 3 | 12 |
| shin | ش | Sheen (ش) | شين | sh | 4 | 3 | 13 |
| sad | ص | Saad (ص) | صاد | ṣ | 4 | 4 | 14 |
| dad | ض | Dhad (ض) | ضاد | ḍ | 4 | 4 | 15 |
| tah | ط | Tah (ط) | طاء | ṭ | 5 | 3 | 16 |
| dhah | ظ | Dhah (ظ) | ظاء | ẓ | 5 | 3 | 17 |
| ain | ع | Aeen (ع) | عين | ʿ | 5 | 4 | 18 |
| ghain | غ | Ghaeen (غ) | غين | gh | 5 | 4 | 19 |
| fa | ف | Fa (ف) | فاء | f | 6 | 2 | 20 |
| qaf | ق | Qaaf (ق) | قاف | q | 6 | 3 | 21 |
| kaf | ك | Kaaf (ك) | كاف | k | 6 | 4 | 22 |
| lam | ل | Lam (ل) | لام | l | 7 | 2 | 23 |
| mim | م | Meem (م) | ميم | m | 7 | 2 | 24 |
| nun | ن | Noon (ن) | نون | n | 7 | 2 | 25 |
| ha_big | ه | Ha (ه) | هاء | h | 7 | 3 | 26 |
| waw | و | Waw (و) | واو | w / ū | 8 | 2 | 27 |
| ya | ي | Ya (ي) | ياء | y / ī | 8 | 3 | 28 |

---

## Letter Groups

| Group | Lead Letter | Members |
|-------|-------------|---------|
| 1 | Alif | alif, ba, ta, tha |
| 2 | Jeem | jim, ha_small, kha |
| 3 | Dal | dal, dhal, ra, zay |
| 4 | Seen | sin, shin, sad, dad |
| 5 | Tah | tah, dhah, ain, ghain |
| 6 | Fa | fa, qaf, kaf |
| 7 | Lam | lam, mim, nun, ha_big |
| 8 | Waw | waw, ya |

---

## Proportion System

Thuluth uses the **rhombic dot** (نقطة معينية) as the fundamental unit of measurement — a diamond shape made by pressing the pen nib flat.

- **Alif height:** 7 rhombic dots
- **Lam height:** 7 rhombic dots (same as Alif)
- **Kaf vertical:** 5–6 dots
- **Tah vertical:** 5 dots
- **Ba depth:** 2 dots below baseline
- **Jim bowl depth:** 4 dots below baseline

---

## Pen Technique

- **Nib angle:** ~30° to the baseline
- **Thick strokes:** Vertical strokes (pen nib edge broadside)
- **Thin strokes:** Horizontal strokes (pen nib edge narrow)
- **Dots:** Press nib flat once — produces a rhombic diamond shape
`;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("github");
    const branch = await getDefaultBranch(accessToken);

    const readmeResult = await upsertFile(accessToken, branch, "README.md", README_CONTENT, "docs: update README via Khattat app");
    const dataResult = await upsertFile(accessToken, branch, "docs/calligraphy-data.md", CALLIGRAPHY_DATA_DOC, "docs: update calligraphy data reference via Khattat app");

    return Response.json({
      success: true,
      branch,
      readme: readmeResult.content?.path,
      calligraphyData: dataResult.content?.path,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});