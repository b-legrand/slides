import Reveal from "reveal.js/dist/reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";
import Notes from "reveal.js/plugin/markdown/markdown.esm.js";

import "reveal.js/dist/reset.css";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "reveal.js/plugin/highlight/monokai.css";

let deck = new Reveal({
  plugins: [Markdown, Highlight, Notes],
});

deck.initialize({
   controls: true,
   progress: true,
   history: true,
   center: true,
   // default/cube/page/concave/zoom/linear/fade/none
   // transition: 'none',
 });
