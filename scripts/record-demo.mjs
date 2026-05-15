/**
 * Records a TalentLens walkthrough video with Playwright.
 * Usage: npm run demo:video
 * Optional env (in .env.local): DEMO_EMAIL, DEMO_PASSWORD
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const baseUrl = process.env.DEMO_BASE_URL ?? "http://127.0.0.1:3000";
const outputDir = path.join(root, "demo-videos");
const demoEmail = process.env.DEMO_EMAIL ?? process.env.DEMO_CANDIDATE_EMAIL;
const demoPassword = process.env.DEMO_PASSWORD ?? process.env.DEMO_CANDIDATE_PASSWORD;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function startServer() {
  const server = spawn("npm", ["run", "start"], {
    cwd: root,
    env: { ...process.env, PORT: "3000" },
    stdio: ["ignore", "pipe", "pipe"],
  });

  const ready = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Server did not start in time")), 120_000);
    const onData = (chunk) => {
      const text = chunk.toString();
      if (text.includes("Ready") || text.includes("started server") || text.includes("localhost:3000")) {
        clearTimeout(timeout);
        resolve();
      }
    };
    server.stdout?.on("data", onData);
    server.stderr?.on("data", onData);
    server.on("error", reject);
  });

  await ready;
  await wait(1500);
  return server;
}

async function scrollPage(page, steps = 6) {
  for (let i = 0; i < steps; i += 1) {
    await page.mouse.wheel(0, 700);
    await wait(900);
  }
}

async function runDemo() {
  await mkdir(outputDir, { recursive: true });

  let server;
  const useExternal = process.env.DEMO_SKIP_SERVER === "1";

  if (!useExternal) {
    console.log("Starting production server…");
    server = await startServer();
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1440, height: 900 },
    },
  });
  const page = await context.newPage();

  try {
    console.log("Recording landing page…");
    await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 60_000 });
    await wait(2000);
    await scrollPage(page, 5);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await wait(1200);

    console.log("Recording login…");
    await page.goto(`${baseUrl}/login`, { waitUntil: "networkidle" });
    await wait(2500);

    if (demoEmail && demoPassword) {
      console.log("Recording authenticated candidate flow…");
      await page.fill('input[name="email"]', demoEmail);
      await page.fill('input[name="password"]', demoPassword);
      await page.click('button[type="submit"]');
      await page.waitForURL(/\/(dashboard|onboarding)/, { timeout: 45_000 });
      await wait(2000);

      if (page.url().includes("/onboarding")) {
        await page.goto(`${baseUrl}/dashboard`, { waitUntil: "networkidle" }).catch(() => null);
        await wait(1500);
      }

      const candidateRoutes = [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/passport", label: "Passport" },
        { path: "/missions", label: "Missions" },
        { path: "/gap-report", label: "Gap Report" },
      ];

      for (const route of candidateRoutes) {
        console.log(`Recording ${route.label}…`);
        await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle" });
        await wait(2500);
        await scrollPage(page, 2);
        await wait(1000);
      }

      console.log("Recording mission interaction…");
      await page.goto(`${baseUrl}/missions`, { waitUntil: "networkidle" });
      await wait(1500);
      const moduleCard = page.locator("button").filter({ hasText: /Module [ABCD]/ }).first();
      if (await moduleCard.isVisible().catch(() => false)) {
        await moduleCard.click();
        await wait(800);
      }
      const generateBtn = page.getByRole("button", { name: /Generate Mission/i });
      if (await generateBtn.isVisible().catch(() => false)) {
        await generateBtn.click();
        await wait(6000);
      }
    } else {
      console.log("No DEMO_EMAIL/DEMO_PASSWORD — skipping authenticated flows.");
      await page.goto(`${baseUrl}/register`, { waitUntil: "networkidle" });
      await wait(2000);
    }
  } finally {
    await context.close();
    await browser.close();
    server?.kill("SIGTERM");
  }

  const entries = await import("node:fs/promises").then((fs) =>
    fs.readdir(outputDir).catch(() => [])
  );
  const webm = entries.find((f) => f.endsWith(".webm"));
  if (webm) {
    const from = path.join(outputDir, webm);
    const to = path.join(outputDir, "talentlens-demo.webm");
    await import("node:fs/promises").then((fs) => fs.rename(from, to).catch(() => null));
    console.log(`\nDemo video saved: ${to}`);
  } else {
    console.log(`\nCheck ${outputDir} for recorded video files.`);
  }
}

runDemo().catch((err) => {
  console.error(err);
  process.exit(1);
});
