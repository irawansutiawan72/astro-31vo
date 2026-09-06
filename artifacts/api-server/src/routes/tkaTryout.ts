import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";

const router: IRouter = Router();
const connectors = new ReplitConnectors();

const SPREADSHEET_ID = "1FNUmVVqjmYrBTXF_NYhedIqUOqC-SdbVktiM4RoEQT8";
const SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit`;
const RECIPIENT_EMAIL = "numatik.app@gmail.com";
const QUESTION_COUNT = 30;
const MAX_DURATION_SECONDS = 75 * 60;

// Kept server-side so the recorded score cannot be changed by editing the client request.
const CORRECT_ANSWERS = [
  1, 0, 1, 0, 0, 0, 2, 0, 1, 1,
  0, 1, 0, 0, 1, 2, 0, 1, 0, 1,
  1, 2, 1, 2, 1, 1, 0, 1, 2, 1,
];

type SubmitBody = {
  name?: unknown;
  school?: unknown;
  answers?: unknown;
  startedAt?: unknown;
  submittedAt?: unknown;
  durationSeconds?: unknown;
  submitReason?: unknown;
};

const textValue = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const connectorResponseBody = async (response: Response) => {
  try {
    return (await response.clone().text()).slice(0, 1000);
  } catch {
    return "";
  }
};

const toAnswerMap = (value: unknown) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.entries(value).reduce<Record<string, number>>((result, [key, answer]) => {
    const questionNumber = Number(key);
    const optionIndex = Number(answer);
    if (
      Number.isInteger(questionNumber) &&
      questionNumber >= 1 &&
      questionNumber <= QUESTION_COUNT &&
      Number.isInteger(optionIndex) &&
      optionIndex >= 0 &&
      optionIndex <= 3
    ) {
      result[String(questionNumber)] = optionIndex;
    }
    return result;
  }, {});
};

const encodeBase64Url = (value: string) =>
  Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const sendResultEmail = async ({
  name,
  school,
  score,
  answeredCount,
  percentage,
  durationSeconds,
  submittedAt,
  submitReason,
  packageNumber = 1,
}: {
  name: string;
  school: string;
  score: number;
  answeredCount: number;
  percentage: number;
  durationSeconds: number;
  submittedAt: string;
  submitReason: string;
  packageNumber?: number;
}) => {
  const durationMinutes = Math.floor(durationSeconds / 60);
  const durationRemainder = durationSeconds % 60;
  const packageLabel = `Try Out TKA Matematika ${packageNumber}`;
  const subject = `Hasil ${packageLabel} - ${name}`;
  const body = [
    `Hasil pengerjaan ${packageLabel}`,
    "",
    `Nama lengkap: ${name}`,
    `Asal sekolah: ${school}`,
    `Waktu pengerjaan: ${submittedAt}`,
    `Status pengumpulan: ${submitReason}`,
    `Terjawab: ${answeredCount}/${QUESTION_COUNT}`,
    `Skor benar: ${score}/${QUESTION_COUNT}`,
    `Nilai: ${percentage}`,
    `Durasi: ${durationMinutes} menit ${durationRemainder} detik`,
    "",
    `Spreadsheet hasil terakumulasi: ${SPREADSHEET_URL}`,
  ].join("\n");
  const raw = [
    `To: ${RECIPIENT_EMAIL}`,
    `Subject: ${subject}`,
    "Content-Type: text/plain; charset=UTF-8",
    "",
    body,
  ].join("\r\n");

  console.log("[TKA][Email] Mengirim hasil", {
    packageNumber,
    answeredCount,
    score,
    percentage,
  });

  const response = await connectors.proxy("google-mail", "/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ raw: encodeBase64Url(raw) }),
  });

  const responseBody = await connectorResponseBody(response);
  if (!response.ok) {
    console.error("[TKA][Email] Gagal mengirim hasil", {
      packageNumber,
      status: response.status,
      responseBody,
    });
    throw new Error(`Gmail send failed with status ${response.status}: ${responseBody}`);
  }

  console.log("[TKA][Email] Hasil berhasil dikirim", {
    packageNumber,
    status: response.status,
  });
};

router.post("/tka/tryout/1/submit", async (req, res) => {
  const body = req.body as SubmitBody;
  const name = textValue(body.name, 120);
  const school = textValue(body.school, 160);
  const answers = toAnswerMap(body.answers);
  const submittedAt = new Date().toISOString();
  const durationSeconds =
    typeof body.durationSeconds === "number" && Number.isFinite(body.durationSeconds)
      ? Math.max(0, Math.min(MAX_DURATION_SECONDS, Math.round(body.durationSeconds)))
      : 0;
  const submitReason =
    body.submitReason === "time-up"
      ? "Waktu habis (otomatis)"
      : body.submitReason === "security-violation"
        ? "Dihentikan otomatis karena pelanggaran mode ujian aman"
        : "Dikumpulkan oleh peserta";

  if (!name || !school) {
    res.status(400).json({ message: "Nama lengkap dan asal sekolah wajib diisi." });
    return;
  }

  const score = CORRECT_ANSWERS.reduce(
    (total, correct, index) => total + (answers[String(index + 1)] === correct ? 1 : 0),
    0,
  );
  const answeredCount = Object.keys(answers).length;
  const percentage = Math.round((score / QUESTION_COUNT) * 100);

  console.log("[TKA][Paket 1] Submit diterima API", {
    requestId: req.id,
    hasName: Boolean(name),
    hasSchool: Boolean(school),
    answeredCount,
    score,
    percentage,
    durationSeconds,
    submitReason,
  });

  try {
    console.log("[TKA][Paket 1] Mengirim ke Google Spreadsheet", {
      requestId: req.id,
      answeredCount,
      score,
    });

    const sheetResponse = await connectors.proxy(
      "google-sheet",
      `/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:J:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values: [[
            submittedAt,
            name,
            school,
            "Try Out TKA Matematika 1",
            QUESTION_COUNT,
            answeredCount,
            score,
            percentage,
            durationSeconds,
            submitReason,
          ]],
        }),
      },
    );

    const sheetResponseBody = await connectorResponseBody(sheetResponse);
    if (!sheetResponse.ok) {
      console.error("[TKA][Paket 1] Google Spreadsheet gagal menerima data", {
        requestId: req.id,
        status: sheetResponse.status,
        responseBody: sheetResponseBody,
      });
      throw new Error(
        `Google Sheets append failed with status ${sheetResponse.status}: ${sheetResponseBody}`,
      );
    }

    console.log("[TKA][Paket 1] Google Spreadsheet berhasil menerima data", {
      requestId: req.id,
      status: sheetResponse.status,
      responseBody: sheetResponseBody,
    });

    let emailSent = true;
    try {
      await sendResultEmail({
        name,
        school,
        score,
        answeredCount,
        percentage,
        durationSeconds,
        submittedAt,
        submitReason,
      });
    } catch (emailError) {
      emailSent = false;
      console.error("[TKA][Paket 1] Spreadsheet tersimpan, tetapi email gagal", {
        requestId: req.id,
        error: emailError,
      });
      req.log.error({ err: emailError }, "Try out result saved, but result email failed");
    }

    console.log("[TKA][Paket 1] Submit selesai", {
      requestId: req.id,
      emailSent,
      spreadsheetSaved: true,
    });

    res.status(201).json({
      ok: true,
      score,
      percentage,
      answeredCount,
      spreadsheetUrl: SPREADSHEET_URL,
      emailSent,
    });
  } catch (error) {
    console.error("[TKA][Paket 1] Submit gagal", {
      requestId: req.id,
      error,
    });
    req.log.error({ err: error }, "Could not save try out result");
    res.status(502).json({
      message: "Hasil belum berhasil disimpan. Silakan coba kumpulkan kembali.",
    });
  }
});

const TRYOUT_2_CORRECT_ANSWERS = [
  2, 1, 0, 1, 2, 2, 1, 3, 2, 2,
  1, 2, 2, 0, 2, 2, 2, 1, 2, 0,
  2, 0, 1, 2, 2, 2, 2, 2, 1, 2,
];

router.post("/tka/tryout/2/submit", async (req, res) => {
  const body = req.body as SubmitBody;
  const name = textValue(body.name, 120);
  const school = textValue(body.school, 160);
  const answers = toAnswerMap(body.answers);
  const submittedAt = new Date().toISOString();
  const maxDurationSeconds = 75 * 60;
  const durationSeconds =
    typeof body.durationSeconds === "number" && Number.isFinite(body.durationSeconds)
      ? Math.max(0, Math.min(maxDurationSeconds, Math.round(body.durationSeconds)))
      : 0;
  const submitReason =
    body.submitReason === "time-up"
      ? "Waktu habis (otomatis)"
      : body.submitReason === "security-violation"
        ? "Dihentikan otomatis karena pelanggaran mode ujian aman"
        : "Dikumpulkan oleh peserta";

  if (!name || !school) {
    res.status(400).json({ message: "Nama lengkap dan asal sekolah wajib diisi." });
    return;
  }

  const score = TRYOUT_2_CORRECT_ANSWERS.reduce(
    (total, correct, index) => total + (answers[String(index + 1)] === correct ? 1 : 0),
    0,
  );
  const answeredCount = Object.keys(answers).length;
  const percentage = Math.round((score / QUESTION_COUNT) * 100);

  console.log("[TKA][Paket 2] Submit diterima API", {
    requestId: req.id,
    hasName: Boolean(name),
    hasSchool: Boolean(school),
    answeredCount,
    score,
    percentage,
    durationSeconds,
    submitReason,
  });

  try {
    console.log("[TKA][Paket 2] Mengirim ke Google Spreadsheet", {
      requestId: req.id,
      answeredCount,
      score,
    });

    const sheetResponse = await connectors.proxy(
      "google-sheet",
      `/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:J:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values: [[
            submittedAt,
            name,
            school,
            "Try Out TKA Matematika 2",
            QUESTION_COUNT,
            answeredCount,
            score,
            percentage,
            durationSeconds,
            submitReason,
          ]],
        }),
      },
    );

    const sheetResponseBody = await connectorResponseBody(sheetResponse);
    if (!sheetResponse.ok) {
      console.error("[TKA][Paket 2] Google Spreadsheet gagal menerima data", {
        requestId: req.id,
        status: sheetResponse.status,
        responseBody: sheetResponseBody,
      });
      throw new Error(
        `Google Sheets append failed with status ${sheetResponse.status}: ${sheetResponseBody}`,
      );
    }

    console.log("[TKA][Paket 2] Google Spreadsheet berhasil menerima data", {
      requestId: req.id,
      status: sheetResponse.status,
      responseBody: sheetResponseBody,
    });

    let emailSent = true;
    try {
      await sendResultEmail({
        name,
        school,
        score,
        answeredCount,
        percentage,
        durationSeconds,
        submittedAt,
        submitReason,
        packageNumber: 2,
      });
    } catch (emailError) {
      emailSent = false;
      console.error("[TKA][Paket 2] Spreadsheet tersimpan, tetapi email gagal", {
        requestId: req.id,
        error: emailError,
      });
      req.log.error({ err: emailError }, "Try out 2 result saved, but result email failed");
    }

    console.log("[TKA][Paket 2] Submit selesai", {
      requestId: req.id,
      emailSent,
      spreadsheetSaved: true,
    });

    res.status(201).json({
      ok: true,
      score,
      percentage,
      answeredCount,
      spreadsheetUrl: SPREADSHEET_URL,
      emailSent,
    });
  } catch (error) {
    console.error("[TKA][Paket 2] Submit gagal", {
      requestId: req.id,
      error,
    });
    req.log.error({ err: error }, "Could not save try out 2 result");
    res.status(502).json({
      message: "Hasil belum berhasil disimpan. Silakan coba kumpulkan kembali.",
    });
  }
});

export default router;