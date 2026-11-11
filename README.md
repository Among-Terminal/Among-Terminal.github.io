# Among Terminal documentation

Source for [among-terminal.github.io](https://among-terminal.github.io).

A VitePress site for terminal users. Plugin author documentation belongs in
[among-plugin-template](https://github.com/Among-Terminal/among-plugin-template).
Application build and development documentation belongs in
[among](https://github.com/Among-Terminal/among/blob/main/CONTRIBUTING.md).
The existing development and build routes link to those repositories.
Public guides live in `docs/`; static media lives in
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
Markdown automatically on every build.
Do not maintain manual copies. Pages deploys `.vitepress/dist` only after the
route, link, anchor, media, generated-content and privacy checks pass.
`npm run check` validates all rendered local targets and URL syntax without
network requests. It cannot confirm external availability. Run build before check.

The 0.2.0 source map and verification results are in `DOCUMENTATION-REPORT.txt`.

Vite is pinned to 6.4.4 via an override: VitePress 1.6.4 otherwise selects an
older development server with known security advisories. Keep the override until
VitePress itself supplies a patched dependency; retest build and search on updates.
