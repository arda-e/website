import { renderToString } from "react-dom/server";
import { Response } from 'express'
import Home from "./pages/home/Home";

export default function renderHtml(res: Response) {
    const html = renderToString(<Home />);

    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Arda Eren</title>
        <link rel="stylesheet" href="/main.css">
        <script type="importmap">
          {
            "imports": {
              "react": "https://esm.sh/react@19.1.0",
              "react/jsx-runtime": "https://esm.sh/react@19.1.0/jsx-runtime",
              "react/jsx-dev-runtime": "https://esm.sh/react@19.1.0/jsx-dev-runtime",
              "react-dom/client": "https://esm.sh/react-dom@19.1.0/client"
            }
          }
        </script>
      </head>
      <body>
        <div id="root">${html}</div>
        <script type="module" src="/app.js"></script>    
      </body>
    </html>
  `);
}