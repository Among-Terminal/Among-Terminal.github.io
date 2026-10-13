---
title: Features and quick install
---

# Among Terminal

Keep your shells, projects and tools together in one native GNOME window.
Among Terminal combines VTE terminals with split panes, named workspaces and
optional live status plugins.

## Install a release package

Download a ready-made file from the
[latest release](https://github.com/Among-Terminal/among/releases/latest), for
x86-64 (`amd64`) or ARM 64-bit (`arm64`). No Rust toolchain or compilation is
needed.

| Format | Best for |
| --- | --- |
| DEB | Ubuntu 24.04, Debian 13; APT installs runtime dependencies |
| RPM | Fedora 43, Fedora 44; DNF installs runtime dependencies |
| AppImage | Other distributions with glibc 2.39+; GTK, libadwaita and VTE included |
| Binary archive | Ubuntu 24.04, Debian 13 without a package manager |

Install from the download directory, using the file name you downloaded:

```sh
sudo apt install ./among-terminal-ubuntu24.04-amd64.deb   # Debian, Ubuntu
sudo dnf install ./among-terminal-fedora44-amd64.rpm      # Fedora
chmod +x among-terminal-amd64.AppImage && ./among-terminal-amd64.AppImage
```

Start **Among Terminal** from the applications menu, or run `among`.
[Direct download links, checksums, updates and removal](/install/).

<video id="demo" controls playsinline preload="metadata" poster="/media/among-terminal-action-v5.png" aria-label="Among Terminal: panes, workspaces and plugins" style="width:100%;height:auto">
  <source src="/media/among-terminal-action-v5.mp4" type="video/mp4">
  <a href="/media/among-terminal-action-v5.mp4">Watch or download the demonstration</a>.
</video>

[Watch or download the video](/media/among-terminal-action-v5.mp4).
The feature guide describes every action without requiring video playback.

## Built for several things at once

- **Split and resize.** Keep an editor, shell and monitor side by side;
  adjust dividers with the mouse or keyboard.
- **Rearrange live panes.** Drag pane headers to change the layout without
  restarting their processes.
- **Organize workspaces.** Name and colour-code projects, switch instantly,
  and collapse the sidebar without losing access to running terminals.
- **Stay on the keyboard.** Move focus, zoom a pane, switch workspaces and
  customize shortcuts in Settings.
- **Restore your layout.** Reopen splits and known directories in fresh shells.
  Running commands and scrollback are not resumed.
- **Choose your status.** Enable a clock, resource meters or per-pane directory
  labels. Plugins are optional and disabled by default.

[Explore features with screenshots and demonstrations →](/features/)

## Make your own plugin

Plugins are separate executables exchanging JSON lines with the application.
They can supply status text, icons and meters without depending on GTK.
They run as your user, not in a security sandbox: install only trusted code.

[Write your first plugin →](/plugin-development/#writing-one) ·
[Protocol reference](/plugin-development/#protocol)

## Learn the controls

[Panes](/panes/) · [Workspaces and sessions](/sessions/) ·
[Keyboard shortcuts](/shortcuts/) · [Preferences](/preferences/)

Ready to try it? See [installation](/install/).
