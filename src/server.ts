import app from "./app";

const PORT = Number(process.env.PORT) || 3000;
const HOST = "127.0.0.1";

const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});


server.on("error", (err: unknown) => {
  console.error("Failed to start server:", err);
  process.exitCode = 1;
});


const shutdown = (signal: string) => {
  console.log(`\n${signal} received. Closing server...`);
  server.close(() => {
    console.log("HTTP server closed. Bye!");
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

export default server;