declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      DB_MONGOOSE: string;
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      SMTP_HOST: string;
      SMTP_PORT: number;
      SMTP_EMAIL: string;
      SMTP_PASSWORD: string;
      API_URL: string;
      CLIENT_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
