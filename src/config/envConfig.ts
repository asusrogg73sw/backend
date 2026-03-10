import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const requiredEnvs = [
  "MONGO_URI",
  "JWT_SECRET",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
];

requiredEnvs.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`Missing Environment Variable: ${env}`);
  }
});