import fs from "fs";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use(async (req, res) => {
    try {
      const url = req.originalUrl;

      let template = fs.readFileSync(
        path.resolve(__dirname, "../index.html"),
        "utf-8",
      );

      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");

      const { html, data, meta } = await render(url);

      const responseHtml = template
        .replace("<!--ssr-outlet-->", html)
        .replace(/<title>(.*?)<\/title>/i, `<title>${meta.title}</title>`)
        .replace(
          "</head>",
          `
      <meta name="description" content="${meta.description}" />
      <link rel="canonical" href="luxexperience.com${meta.canonical}" />

      <meta property="og:title" content="${meta.title}" />
      <meta property="og:description" content="${meta.description}" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="${meta.image}" />
      <meta property="og:url" content="luxexperience.com${meta.canonical}" />
    </head>
    `,
        )
        .replace(
          "</body>",
          `<script>
      window.__SSR_DATA__ = ${JSON.stringify(data)}
    </script></body>`,
        );
      res.status(200).set({ "Content-Type": "text/html" }).end(responseHtml);
    } catch (err: unknown) {
      vite.ssrFixStacktrace(err as Error);
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

  app.listen(5173, () => {
    console.log("SSR server running at http://localhost:5173");
  });
}

startServer();
