/* -------------------------------------------------------------------

                  ⚡ Storm Software - Flash Flood

 This code was released as part of the Flash Flood project. Flash Flood
 is maintained by Storm Software under the Apache-2.0 License, and is
 free for commercial and private use. For more information, please visit
 our licensing page.

 Website:         https://stormsoftware.com
 Repository:      https://github.com/storm-software/flash-flood
 Documentation:   https://stormsoftware.com/projects/flash-flood/docs
 Contact:         https://stormsoftware.com/contact
 License:         https://stormsoftware.com/projects/flash-flood/license

 ------------------------------------------------------------------- */

/* eslint-disable unused-imports/no-unused-vars */

import { exec } from "node:child_process";
import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { promisify } from "node:util";
import { chalk, echo } from "zx";

// usePwsh();

const execAsync = promisify(exec);

async function question(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(query, ans => {
      rl.close();
      resolve(ans);
    });
  });
}

async function getPostgresURL() {
  console.log("Step 2: Setting up Postgres");
  const dbChoice = await question(
    "Do you want to use a local Postgres instance with Docker (L) or a remote Postgres instance (R)? (L/R): "
  );

  if (dbChoice.toLowerCase() === "l") {
    console.log("Setting up local Postgres instance with Docker...");
    await setupLocalPostgres();
    return "postgres://postgres:postgres@localhost:54322/postgres";
  } else {
    console.log(
      "You can find Postgres databases at: https://vercel.com/marketplace?category=databases"
    );
    return question("Enter your POSTGRES_URL: ");
  }
}

async function setupLocalPostgres() {
  console.log("Checking if Docker is installed...");
  try {
    await execAsync("docker --version");
    console.log("Docker is installed.");
  } catch (error) {
    console.error(
      "Docker is not installed. Please install Docker and try again."
    );
    console.log(
      "To install Docker, visit: https://docs.docker.com/get-docker/"
    );
    process.exit(1);
  }

  console.log("Creating docker-compose.yml file...");
  const dockerComposeContent = `
services:
  postgres:
    image: postgres:16.4-alpine
    container_name: next_saas_starter_postgres
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "54322:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
`;

  await fs.writeFile(
    path.join(process.cwd(), "docker-compose.yml"),
    dockerComposeContent
  );
  console.log("docker-compose.yml file created.");

  console.log("Starting Docker container with `docker compose up -d`...");
  try {
    await execAsync("docker compose up -d");
    console.log("Docker container started successfully.");
  } catch (error) {
    console.error(
      "Failed to start Docker container. Please check your Docker installation and try again."
    );
    process.exit(1);
  }
}

function generateAuthSecret() {
  console.log("Step 5: Generating AUTH_SECRET...");
  return crypto.randomBytes(32).toString("hex");
}

async function writeEnvFile(envVars) {
  console.log("Step 6: Writing environment variables to .env");
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  await fs.writeFile(path.join(process.cwd(), ".env"), envContent);
  console.log(".env file created with the necessary variables.");
}

try {
  await echo`${chalk.whiteBright("📋  Linting the monorepo...")}`;

  const POSTGRES_URL = await getPostgresURL();
  const BASE_URL = "http://localhost:3000";
  const AUTH_SECRET = generateAuthSecret();

  await writeEnvFile({
    POSTGRES_URL,
    BASE_URL,
    AUTH_SECRET
  });

  echo`${chalk.green("Successfully linted the monorepo's files")}`;
} catch (error) {
  echo`${chalk.red(error?.message ? error.message : "A failure occured while linting the monorepo")}`;

  process.exit(1);
}
