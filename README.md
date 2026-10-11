# Among Terminal documentation

Source for [among-terminal.github.io](https://among-terminal.github.io).

A Jekyll site with a feature-led homepage, user guides and a separate
plugin-development reference. Public guides live in `_docs/`; media lives only
in `media/`.

When adapting prose from [Among-Terminal/among](https://github.com/Among-Terminal/among),
preserve each page's front matter and use published routes, not repository-relative
Markdown paths. The site intentionally excludes internal recording tools,
release rehearsal reports and local machine paths.

```sh
bundle install
bundle exec jekyll serve
```

Build and check the generated pages before deploying; a successful Markdown copy
does not prove Jekyll has created the corresponding routes.
