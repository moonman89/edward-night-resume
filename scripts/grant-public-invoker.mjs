/**
 * Grants allUsers Cloud Run Invoker so portfolio visitors can call askAssistant / generatePhoto.
 *
 * Run after: gcloud auth login  (or: gcloud auth application-default login)
 *   brew install --cask google-cloud-sdk
 *
 * Or use Google Cloud Console (see README).
 */
import { spawnSync } from "node:child_process";
import { GoogleAuth } from "google-auth-library";

const PROJECT_ID = "edward-night-resume";
const REGION = "us-central1";
const SERVICES = ["askassistant", "generatephoto"];

const GCLOUD_PATHS = [
  "gcloud",
  "/opt/homebrew/bin/gcloud",
  "/usr/local/bin/gcloud",
  `${process.env.HOME}/google-cloud-sdk/bin/gcloud`,
];

function findGcloud() {
  for (const path of GCLOUD_PATHS) {
    const check = spawnSync(path, ["--version"], { encoding: "utf8" });
    if (check.status === 0) return path;
  }
  return null;
}

function runGcloudBindings(gcloud) {
  for (const service of SERVICES) {
    console.log(`Granting public invoke on ${service}...`);
    const result = spawnSync(
      gcloud,
      [
        "run",
        "services",
        "add-iam-policy-binding",
        service,
        `--region=${REGION}`,
        `--project=${PROJECT_ID}`,
        "--member=allUsers",
        "--role=roles/run.invoker",
        "--quiet",
      ],
      { encoding: "utf8", stdio: "pipe" },
    );

    if (result.status !== 0) {
      const err = (result.stderr || result.stdout || "").trim();
      throw new Error(`gcloud failed for ${service}: ${err}`);
    }
    console.log(`  ✓ ${service}`);
  }
}

async function getAccessToken() {
  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) {
    throw new Error("No access token from Application Default Credentials.");
  }
  return token.token;
}

async function getIamPolicy(token, service) {
  const resource = `projects/${PROJECT_ID}/locations/${REGION}/services/${service}`;
  const url = `https://run.googleapis.com/v1/${resource}:getIamPolicy`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`getIamPolicy(${service}) ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function setIamPolicy(token, service, policy) {
  const resource = `projects/${PROJECT_ID}/locations/${REGION}/services/${service}`;
  const url = `https://run.googleapis.com/v1/${resource}:setIamPolicy`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ policy }),
  });
  if (!res.ok) {
    throw new Error(`setIamPolicy(${service}) ${res.status}: ${await res.text()}`);
  }
}

function ensurePublicInvoker(policy) {
  const bindings = policy.bindings ?? [];
  const role = "roles/run.invoker";
  const member = "allUsers";
  const existing = bindings.find((b) => b.role === role);
  if (existing) {
    if (!existing.members.includes(member)) existing.members.push(member);
  } else {
    bindings.push({ role, members: [member] });
  }
  return { ...policy, bindings };
}

async function runApiBindings() {
  const gcloud = findGcloud();
  if (gcloud) {
    const tokenResult = spawnSync(gcloud, ["auth", "print-access-token"], {
      encoding: "utf8",
    });
    if (tokenResult.status === 0 && tokenResult.stdout.trim()) {
      const token = tokenResult.stdout.trim();
      for (const service of SERVICES) {
        console.log(`Updating IAM for ${service} (API)...`);
        const policy = await getIamPolicy(token, service);
        await setIamPolicy(token, service, ensurePublicInvoker(policy));
        console.log(`  ✓ ${service}`);
      }
      return;
    }
  }

  const token = await getAccessToken();
  for (const service of SERVICES) {
    console.log(`Updating IAM for ${service}...`);
    const policy = await getIamPolicy(token, service);
    await setIamPolicy(token, service, ensurePublicInvoker(policy));
    console.log(`  ✓ ${service}`);
  }
}

function printManualSteps() {
  console.log(`
Could not authenticate to Google Cloud automatically.

Do ONE of the following:

━━━ Option 1: Google Cloud Console (no install) ━━━
1. https://console.cloud.google.com/run?project=edward-night-resume
2. Click  askassistant  →  Security  →  Allow unauthenticated invocations  → Save
3. Click  generatephoto  →  same steps

━━━ Option 2: Install gcloud, then re-run this script ━━━
  brew install --cask google-cloud-sdk
  gcloud auth login
  gcloud config set project edward-night-resume
  npm run functions:public

━━━ Option 3: Application Default Credentials ━━━
  gcloud auth application-default login
  npm run functions:public
`);
}

async function main() {
  const gcloud = findGcloud();
  if (gcloud) {
    try {
      runGcloudBindings(gcloud);
      console.log("\nDone. Hard-refresh https://edward-night-resume.web.app and test the chat.");
      return;
    } catch (err) {
      console.warn(`gcloud binding failed: ${err.message}`);
      console.warn("Trying API with gcloud token...\n");
    }
  }

  try {
    await runApiBindings();
    console.log("\nDone. Hard-refresh https://edward-night-resume.web.app and test the chat.");
  } catch (err) {
    console.error(err.message ?? err);
    printManualSteps();
    process.exit(1);
  }
}

main();
