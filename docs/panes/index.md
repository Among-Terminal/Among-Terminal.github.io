---
title: Panes and workspaces
---

# Panes and workspaces

Each pane holds a terminal, a header and any plugin footer content. The header
shows the terminal's title and a permanent `#N` identity label. An empty footer
stays hidden.

## Splitting a pane

Press `Ctrl+Shift+N` to split the focused pane. If its width is at least its
height, the terminals sit side by side. A taller pane splits into a stack.
The new pane receives keyboard focus.

The new terminal starts in the original pane's known directory. Its shell and
subsequent directory changes are independent. If that directory is unavailable,
the new shell uses an accessible home or startup directory and Among reports
the fallback. A workspace's first terminal uses the normal startup directory.

The initial shell directory is known at launch. Later changes need
[shell directory reporting](/sessions/#directory-reporting).

Drag a divider to resize the panes. `Ctrl+Shift+Left` and `Ctrl+Shift+Right`
move the nearest side-by-side divider above the focused pane in the layout.
`Ctrl+Shift+Up` and `Ctrl+Shift+Down` move the nearest stacked divider.

## Dragging a pane to a new position

Drag a pane header onto another pane's edge. The drop indicator shows where
it will go. Left and right edges place the panes side by side; top and bottom
edges stack them. Dropping divides the target's area in half.

The moved pane keeps its terminal and running process, and focus follows it.
Its old space closes up. Dropping on itself or outside a pane changes nothing.
Dragging inside terminal text selects text.

## Moving a pane to another project

Drag a pane header onto another workspace's entry in either sidebar view.
The outlined destination receives the pane after its last pane in layout order,
becomes active and gives the moved terminal focus.

The terminal retains its process, scrollback, directory, plugin content and
title-change marker. Its header takes the destination workspace's colour.
A workspace that loses its only pane closes. Dropping on the same workspace
or empty sidebar space changes nothing. Hovering alone does not switch workspaces.

## Workspaces

Use New workspace in the header or `Ctrl+Shift+T`. Click an entry in the sidebar
to activate it. Inactive workspaces keep their terminals running.

Double-click a name to edit it. Enter or clicking elsewhere applies the name;
Escape cancels. An empty name or one containing only spaces is refused.
Starting another rename ends the first. Renaming preserves terminals,
directories and layout, then returns keyboard focus to the terminal.

Drag a workspace entry onto the upper or lower half of another entry to place
it before or after that workspace. The insertion edge is highlighted. This
works in the expanded list and collapsed strip. Holding a drag near a scrollable
sidebar edge reveals more entries. Escape or a drop outside leaves the order
unchanged. Reordering does not change the active workspace.

`Alt+1` through `Alt+9` follow the current sidebar order. `Ctrl+PageUp` and
`Ctrl+PageDown` cycle through it. The order is saved with the [session](/sessions/).

The sidebar toggle collapses the list to a strip with workspace colours and
terminal counts. Drag the expanded sidebar's right edge to change its width.
The width returns after expansion and restart, including when starting a new
session. A smaller window may temporarily constrain the displayed width.

## Headers and the terminal's title

Clicking a terminal or its header makes that pane active. A program can set
its title to show a file, remote host or current task. Without a nonempty title,
the header shows `Terminal N`.

When an unfocused terminal changes its title, its header stays marked until
you focus it. A title change in the focused terminal leaves no mark. Plugin
content appears beside the title. Workspace terminal counts require no plugin.

## Terminal bells

Bells have separate unread indicators and desktop notification controls. See
[notification preferences](/preferences/#notifications) for defaults and how
to return to a terminal that rang.

## Terminal context menu

Right-click a terminal or press `Shift+F10` in the focused terminal. If a program
handles mouse input, use `Shift+right-click` for Among's menu. Arrow keys navigate,
Enter activates a row, and Escape returns to terminal input.

The menu belongs to the terminal that opened it. Copy uses its selection;
Paste sends clipboard text through VTE, including bracketed paste when the
program requests it. Copy is disabled without a selection and Paste without
clipboard text. Both update while the menu is open. Select All includes available
terminal text and scrollback. A shell can interpret pasted newlines, so paste
only commands you trust.

A pointer-opened menu can offer Copy Link and Open Link. An explicit hyperlink
uses its target, even when the displayed text differs. Plain absolute `http`,
`https` and `mailto` URLs are also recognized. Other valid explicit schemes
can be copied but not opened. Malformed, control-containing or oversized targets
are refused. A keyboard-opened menu has no link target.

Split Pane, Expand/Restore Pane and Close Terminal use the same controls as
keyboard shortcuts. Their hints follow your bindings, and removing a binding
leaves its menu action available. Split Pane is inactive while a pane is expanded.

## Following a link

`Ctrl+left-click` opens an `http`, `https` or `mailto` link with the desktop
handler. Plain URLs exclude trailing sentence punctuation. An explicit
hyperlink opens its target. Other schemes do not launch.

A Ctrl+click on an openable link takes precedence over mouse-reporting programs
and text selection, including a drag beginning on that link. Other clicks and
drags keep their usual behaviour. Opening a link preserves selection and
scrollback; an unfocused pane receives focus first. Refused launches are
reported on stderr without a dialog, and the terminal stays usable.

## Closing and exiting

`Ctrl+Shift+W` closes the focused pane and its process. Its surviving sibling
receives focus; if the sibling is split, its first terminal in layout order
receives focus. Closing a background pane preserves focus.

A shell exiting follows the same layout rules. Closing a workspace's last pane
closes that workspace. At the final workspace, Among asks for confirmation
before exiting. Closing the application window also asks while terminals are
running. Closing a pane can end a running job.

## Expanding a pane

`Ctrl+Shift+X` expands the focused pane to fill its workspace. Press it again
or use Restore pane at the right of its header to return to the stored layout.
The button also works with Enter or Space when focused.

Hidden terminals keep running. While expanded, directional focus stays on the
visible pane and splitting is refused. Closing or restoring still works.
Restoration preserves nested divider positions and returns focus to the
originating terminal. Closing an expanded pane restores the normal layout.
Expansion in one workspace does not affect another.

Clicking a desktop notification for a hidden terminal restores the layout and
focuses that terminal. An activation for a terminal that has closed or belongs
to a previous application instance only raises the window.
