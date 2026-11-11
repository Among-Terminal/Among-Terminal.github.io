---
title: Keyboard shortcuts
---

# Keyboard shortcuts

These shortcuts work while Among has focus. Desktop shortcuts can intercept
keys before Among receives them. Among does not register global shortcuts;
use your desktop's keyboard settings to launch it from another window.

## Defaults

| Action | Binding | Behaviour |
| --- | --- | --- |
| Focus up, down, left or right | `Alt+Up`, `Alt+Down`, `Alt+Left`, `Alt+Right` | No change without a neighbour or while expanded |
| Activate workspace 1 through 9 | `Alt+1` through `Alt+9` | Uses current sidebar order; no change beyond the last workspace |
| New workspace | `Ctrl+Shift+T` | Creates and activates a workspace |
| Split pane | `Ctrl+Shift+N` | Chooses orientation from the pane's shape; refused while expanded |
| Move divider up or down | `Ctrl+Shift+Up`, `Ctrl+Shift+Down` | Moves the nearest stacked divider above the pane in the layout |
| Move divider left or right | `Ctrl+Shift+Left`, `Ctrl+Shift+Right` | Moves the nearest side-by-side divider above the pane in the layout |
| Close pane | `Ctrl+Shift+W` | Closes its process; the last workspace asks before exit |
| Open preferences | `Ctrl+,` | Opens Settings |
| Toggle fullscreen | `F11` | Returns to the previous size |
| Toggle pane zoom | `Ctrl+Shift+X` | Expands the focused pane or restores the layout |
| Next workspace | `Ctrl+PageDown` | Wraps around |
| Previous workspace | `Ctrl+PageUp` | Wraps around |

`Ctrl+Shift+Arrow` resizes dividers; `Alt+Arrow` moves focus. There is no default
`Alt+0` binding for the tenth workspace. See [workspace ordering](/panes/#workspaces)
and [the terminal context menu](/panes/#terminal-context-menu) for mouse controls
and `Shift+F10`.

## Preferences

Open Settings with `Ctrl+,` and select Keyboard. Every action is listed,
including actions with no binding. Select a row and press a new combination.
Select it again to cancel capture, or press Escape to remove its binding.

![Keyboard shortcut editor in Preferences](/media/preferences/keyboard.png)

Changes apply immediately. Assigning a shortcut already used by another action
removes the previous assignment. Removed and displaced bindings are saved too.
Check for conflicts in your desktop settings, especially for `Super` and
`Ctrl+Alt` combinations. Among does not check the desktop's assignments.

A failed save leaves the edit active for this session and shows a warning.
See [stored settings](/preferences/#stored-settings).

## Startup overrides

Print the built-in defaults from a new application process, then exit:

```sh
AMONG_LIST_BINDINGS=1 among
```

Override a binding when starting a new process:

```sh
AMONG_REBIND="split-pane=<Control><Shift>d" among
```

Separate multiple overrides with commas. Unknown actions and unusable
accelerators are reported and ignored. Assigning an occupied combination
unbinds its previous action.

## Running an action without a key

```sh
AMONG_ACTION=split_pane among
```

Accepted names include `new-workspace`, `split-pane`/`split`, `close-pane`/`close`,
`focus-up`, `focus-down`, `focus-left`, `focus-right`, `resize-up`, `resize-down`,
`resize-left`, `resize-right`, `next-workspace`, `previous-workspace`,
`workspace-N` (a positive position), `preferences`/`open-preferences`,
`fullscreen`/`toggle-fullscreen`, and `zoom`/`toggle-zoom`.
Hyphens and underscores are interchangeable; names are case-insensitive.

This setting does not forward an action to an already running instance.
An unknown name is reported. An action with no binding is also reported and
does not run through this setting. Unclaimed keys reach the focused terminal.
