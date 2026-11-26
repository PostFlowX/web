import path from "node:path";
import Fastify from "fastify";
import fastifyView from "@fastify/view";
import ejs from "ejs";

const app = Fastify({ logger: true });

await app.register(fastifyView, {
    engine: { ejs },
  root: path.join(import.meta.dirname, "..", "views"),   // gilt in src/ und in dist/
});

app.get("/healthz", async () => ({ web: "ok" }));
app.get("/", async (_req, reply) =>
    reply.view("index.ejs", { status: { web: "ok", server: "unknown", db: "unknown" } }));

await app.listen({ port: Number(process.env.PORT ?? 8080), host: process.env.HOST ?? "127.0.0.1" });