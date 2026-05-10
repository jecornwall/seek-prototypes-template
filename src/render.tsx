import { renderToString } from 'react-dom/server';
import type { Render } from 'sku';
import { App } from './App';

export default {
  renderApp: ({ SkuProvider }) => renderToString(<SkuProvider><App /></SkuProvider>),

  renderDocument: ({ app, headTags, bodyTags }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Prototype workspace spike</title>
  ${headTags}
</head>
<body>
  <div id="app">${app}</div>
  ${bodyTags}
</body>
</html>
`,
} satisfies Render;
