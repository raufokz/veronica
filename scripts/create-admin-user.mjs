// Creates a confirmed admin user in Supabase Auth.
//
//   node --env-file=.env.local scripts/create-admin-user.mjs
//
// Email and password are typed at the prompt, never passed as arguments, so
// they don't end up in shell history. Uses the service-role key from
// .env.local — server-side only, never import this from app code.

import { createClient } from "@supabase/supabase-js";
import readline from "node:readline";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Run with: node --env-file=.env.local scripts/create-admin-user.mjs"
  );
  process.exit(1);
}

function ask(question, { hidden = false } = {}) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  if (hidden) {
    // Swallow the echoed characters so the password isn't shown on screen.
    rl._writeToOutput = function (chunk) {
      if (chunk.includes(question)) rl.output.write(question);
    };
  }

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      if (hidden) rl.output.write("\n");
      rl.close();
      resolve(answer.trim());
    });
  });
}

const email = await ask("Email: ");
const password = await ask("Password: ", { hidden: true });

if (password.length < 12) {
  console.error("\nPassword must be at least 12 characters.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true, // confirmed immediately, so sign-in works right away
});

if (error) {
  console.error("\nFailed to create user:", error.message);
  process.exit(1);
}

console.log(`\nCreated user ${data.user.email} (${data.user.id}).`);
console.log("Sign in at /admin/login with that email and password.");
