# Among Terminal documentation

Source for [among-terminal.github.io](https://among-terminal.github.io).

A VitePress site with a feature-led homepage, user guides and a separate plugin
development reference. Public guides live in `docs/`; static media lives in
`docs/public/media/`.

With Node 24:

```sh
npm ci
npm run dev
```

Before deploying:

```sh
npm run build
npm run check
```

Directory-based pages preserve the existing routes, such as `/features/` and
`/plugin-development/`. Adapt repository-relative links to these public routes;
do not copy internal recording tools, rehearsal reports or local machine paths.

`vitepress-plugin-llms` generates `/llms.txt`, `/llms-full.txt` and per-page
Markdown automatically on every build, including the homepage's quick install.
Do not maintain manual copies. Pages deploys `.vitepress/dist` only after the
route, generated-content and privacy checks pass.

Vite is pinned to 6.4.4 via an override: VitePress 1.6.4 otherwise selects an
older development server with known security advisories. Keep the override until
VitePress itself supplies a patched dependency; retest build and search on updates.
