---
layout: default
title: Among Terminal
---

# Among Terminal

A terminal multiplexer for GNOME: **split panes**, **named workspaces** in a
collapsible sidebar, and a **plugin pipeline** that turns shell data into
interface content.

The binary is `among`.

Terminal emulation is delegated to VTE (`libvte-2.91-gtk4`) through the
official GNOME World `vte4` crate — the same widget GNOME Terminal is built
on. Among Terminal owns the pane tree, workspace lifecycle, key routing and the
plugin pipeline, and does not reimplement terminal emulation.

## Install

Distributed as Snap, DEB and RPM for amd64 and arm64. Pick the package built
for your distribution:

- **Snap** — `sudo snap install among`
- **DEB** — `sudo apt install ./among-terminal_<version>-1_amd64.deb`
- **RPM** — `sudo dnf install ./among-<version>-1.fc44.x86_64.rpm`

See [installation](/install/) for the full matrix, upgrade, removal and
rollback.

## Start here

| | |
|---|---|
| [Overview](/overview/) | What the pieces are and how they fit together |
| [Panes](/panes/) | Splitting, resizing and moving panes |
| [Sessions](/sessions/) | Saving and restoring your workspace layout |
| [Shortcuts](/shortcuts/) | Every keyboard binding |
| [Plugins](/plugins/) | Writing a plugin that feeds the interface |
| [Preferences](/preferences/) | Settings and where they live |

## Build from source

Three independent Cargo packages, so a successful host build cannot stand in
for the others:

```sh
cargo build --release --locked
cargo build --release --locked --manifest-path examples/plugins/Cargo.toml
cargo build --release --locked --manifest-path tools/among-tools/Cargo.toml
```

Development prerequisites and the packaging checks are described in
[building](/build/).

## Licence

Apache-2.0. Native libraries are dynamically linked and keep their own terms;
see [licensing](/licensing/) for what is bundled, what is linked, and which
obligations apply.