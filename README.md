# Among Terminal documentation

Source for [among-terminal.github.io](https://among-terminal.github.io).

A Jekyll site. Pages live in `_docs/`; the prose is kept in step with the
`docs/` directory of [Among-Terminal/among](https://github.com/Among-Terminal/among)
and the two are edited together.

```sh
bundle install
bundle exec jekyll serve
```

Ruby code inside a page must be wrapped in `{% raw %}` … `{% endraw %}`: the
Rust plugin example contains doubled braces that Liquid would otherwise read as
an interpolation.
