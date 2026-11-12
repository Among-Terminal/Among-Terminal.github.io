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

Press `<Ctrl> + <Shift> + N`. A wide pane splits side by side; a tall pane splits into
a stack. The new terminal gets focus and starts in the original pane's known
directory. To follow directory changes, enable [shell integration](/install/#shell-integration).

<figure class="pane-clip">
<video autoplay loop muted controls playsinline preload="auto" poster="/media/app/split-resize-poster.png" width="1600" height="1200" aria-label="One terminal splits into a stack, then columns fill the right side with a file manager and a process monitor">
<source src="/media/app/split-resize.mp4" type="video/mp4">
</video>
<figcaption>Each split starts a separate shell in the same project directory, so a listing, a file manager and a monitor can run side by side.</figcaption>
</figure>

Drag a divider to resize. You can also hold `<Ctrl> + <Shift>` and press an arrow key.
Click a pane or use `<Alt> + Arrow` to move focus.

<figure class="pane-clip">
<video autoplay loop muted controls playsinline preload="auto" poster="/media/app/keyboard-resize-poster.png" width="1600" height="1200" aria-label="The divider between two terminals moves as arrow keys are pressed with the control and shift modifiers">
<source src="/media/app/keyboard-resize.mp4" type="video/mp4">
</video>
<figcaption>The keyboard moves the divider next to the focused pane without touching the mouse.</figcaption>
</figure>

<figure class="pane-clip">
<video autoplay loop muted controls playsinline preload="auto" poster="/media/app/mouse-resize-poster.png" width="1600" height="1200" aria-label="A divider is dragged with the mouse and the terminals on both sides keep running">
<source src="/media/app/mouse-resize.mp4" type="video/mp4">
</video>
<figcaption>Dragging a divider reallocates the space; both terminals keep their running programs.</figcaption>
</figure>

## Dragging a pane to a new position

Drag its header onto another pane's edge. The drop indicator shows the new
position. The terminal and its running tools move together.

<figure class="pane-clip">
<video autoplay loop muted controls playsinline preload="auto" poster="/media/app/pane-drag-poster.png" width="1600" height="1200" aria-label="A pane is dragged by its header onto another pane's edge and the layout rearranges around it">
<source src="/media/app/pane-drag.mp4" type="video/mp4">
</video>
<figcaption>The drop indicator previews the destination before the pane moves.</figcaption>
</figure>

## Moving a pane to another project

Drag its header onto a workspace in the sidebar. Among switches to that
workspace and makes room for the terminal. A workspace closes if you move
its only pane away.

## Workspaces

Press `<Ctrl> + <Shift> + T` or use New workspace in the window header. Click a workspace
to switch to it. Terminals in other workspaces keep running.

<figure class="pane-clip">
<video autoplay loop muted controls playsinline preload="auto" poster="/media/app/workspaces-poster.png" width="1600" height="1200" aria-label="A new workspace is created, renamed and then opened next to the existing workspace">
<source src="/media/app/workspaces.mp4" type="video/mp4">
</video>
<figcaption>Create, rename and switch workspaces. Terminals in other workspaces keep running.</figcaption>
</figure>

Double-click a name to rename it, then press Enter. Drag a workspace above or
below another to reorder it. `<Alt> + 1` through `<Alt> + 9` follow the sidebar order.
`<Ctrl> + Page Up` and `<Ctrl> + Page Down` cycle through workspaces.

Use the sidebar toggle beside Settings to collapse the list. Drag the expanded
sidebar's right edge to adjust its width.

<figure class="pane-clip">
<video autoplay loop muted controls playsinline preload="auto" poster="/media/app/sidebar-poster.png" width="1600" height="1200" aria-label="The sidebar collapses to a narrow strip and expands again while the workspace panes keep their layout">
<source src="/media/app/sidebar.mp4" type="video/mp4">
</video>
<figcaption>Collapsed, the sidebar keeps colours and terminal counts visible; expanding it restores the list and its width.</figcaption>
</figure>

## Expanding a pane

Press `<Ctrl> + <Shift> + X` to fill the workspace with the focused pane. Press it again,
or select Restore pane in its header, to return to the layout. Hidden terminals
keep running. Restore the layout before splitting or moving focus with arrows.

Press `F11` to enter or leave fullscreen.

## Terminal context menu

Right-click a terminal or press `<Shift> + F10` for copy, paste and pane controls.
Use `<Shift> + right + click` when a terminal program handles the mouse itself.
Select text before copying. Paste only commands you trust, since pasted
newlines can run commands in your shell.

## Following a link

Use `<Ctrl> + left + click` to open a web or email link with your desktop's handler.
The context menu also offers Copy Link and Open Link when you right-click a
supported link. An explicit hyperlink can point somewhere different from its
visible text. Check the destination before opening it.

## Terminal bells

A bell in an unfocused terminal marks its pane and workspace. Focus that
terminal to clear the mark. See [terminal notifications](/notifications/) for
desktop banners, sound, commands and the conditions that turn each one on.

## Closing and exiting

Press `<Ctrl> + <Shift> + W` to close the focused pane. This can end its running job.
Closing a workspace's last pane closes that workspace. Among asks before
exiting the final workspace or closing the application while terminals run.

Your layout can return at the next launch. Read what [sessions](/sessions/)
restore before closing tools you need to keep running.
