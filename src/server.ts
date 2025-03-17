import { app } from "./app";
import { env } from "./env/env";

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(
      `🚀 Server listening at http://localhost:${env.PORT} in ${env.NODE_ENV} mode`
    );
  });
