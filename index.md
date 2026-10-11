---
layout: default
title: Among Terminal — features
---

# Among Terminal

Keep your shells, projects and tools together in one native GNOME window.
Among Terminal combines VTE terminals with split panes, named workspaces and
optional live status plugins.

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
