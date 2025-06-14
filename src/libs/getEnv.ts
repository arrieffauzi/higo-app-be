import dotenv from "dotenv";

export function getEnv(key: any, default_value?: any, path?: any) {
  if (path === "example") {
    return "";
  }

  const env = dotenv.config({
    path: path ? `.${path}.env` : `.env`,
  });

  return env.parsed![key] ?? default_value;
}
