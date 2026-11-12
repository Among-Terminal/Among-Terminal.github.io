---
title: Panes and workspaces
---

# Panes and workspaces

Keep related terminals together. Use panes for tools you want to see at once
and workspaces for separate tasks.

<figure class="pane-clip">
<video autoplay loop muted controls playsinline preload="auto" poster="/media/app/panes-poster.png" width="1600" height="1000" aria-label="One pane splits into five, the dividers move, a pane is dragged to a new position, then other workspaces open">
<source src="/media/app/panes.mp4" type="video/mp4">
</video>
<figcaption>One terminal becomes five: split, resize the dividers, drag a pane by its header, then create and rename a workspace. The example project is synthetic.</figcaption>
</figure>

## Splitting a pane

Press `Ctrl+Shift+N`. A wide pane splits side by side; a tall pane splits into
a stack. The new terminal gets focus and starts in the original pane's known
directory. To follow directory changes, enable [shell integration](/install/#shell-integration).

Drag a divider to resize. You can also hold `Ctrl+Shift` and press an arrow key.
Click a pane or use `Alt+Arrow` to move focus.

## Dragging a pane to a new position

Drag its header onto another pane's edge. The drop indicator shows the new
position. The terminal and its running tools move together.

## Moving a pane to another project

Drag its header onto a workspace in the sidebar. Among switches to that
workspace and makes room for the terminal. A workspace closes if you move
its only pane away.

## Workspaces

Press `Ctrl+Shift+T` or use New workspace in the window header. Click a workspace
to switch to it. Terminals in other workspaces keep running.

Double-click a name to rename it, then press Enter. Drag a workspace above or
below another to reorder it. `Alt+1` through `Alt+9` follow the sidebar order.
`Ctrl+PageUp` and `Ctrl+PageDown` cycle through workspaces.

Use the sidebar toggle beside Settings to collapse the list. Drag the expanded
sidebar's right edge to adjust its width.

## Expanding a pane

Press `Ctrl+Shift+X` to fill the workspace with the focused pane. Press it again,
or select Restore pane in its header, to return to the layout. Hidden terminals
keep running. Restore the layout before splitting or moving focus with arrows.

Press `F11` to enter or leave fullscreen.

## Terminal context menu

Right-click a terminal or press `Shift+F10` for copy, paste and pane controls.
Use `Shift+right-click` when a terminal program handles the mouse itself.
Select text before copying. Paste only commands you trust, since pasted
newlines can run commands in your shell.

## Following a link

Use `Ctrl+left-click` to open a web or email link with your desktop's handler.
The context menu also offers Copy Link and Open Link when you right-click a
supported link. An explicit hyperlink can point somewhere different from its
visible text. Check the destination before opening it.

## Terminal bells

A bell in an unfocused terminal marks its pane and workspace. Focus that
terminal to clear the mark. See [terminal notifications](/notifications/) for
desktop banners, sound, commands and the conditions that turn each one on.

## Closing and exiting

Press `Ctrl+Shift+W` to close the focused pane. This can end its running job.
Closing a workspace's last pane closes that workspace. Among asks before
exiting the final workspace or closing the application while terminals run.

Your layout can return at the next launch. Read what [sessions](/sessions/)
restore before closing tools you need to keep running.
