---
title: Preferences
---

# Preferences

Open Settings with `Ctrl+,`. Its pages are Plugins, Notifications, Keyboard,
Terminal and About. Plugins opens first. You can return to a terminal without
closing Preferences, including while a source request is running.

## Plugins

The [plugin guide](/plugins/) covers installation, access review, protection,
updates and removal. Click a plugin row to open its settings and details.
Plugin-specific forms require Save; closing without saving discards edits.
Saving settings does not enable a disabled plugin. A running plugin can accept
or reject a change, or require a restart. Preferences distinguishes locally
saved settings from settings accepted by the running process.

## Notifications

Visual, Sound, Desktop and Command each have their own When condition:
Always, Terminal not in view or Among in background. Terminal not in view also
applies while Among is in the background. Preferences and native menus count
as foreground Among, but do not count as viewing a terminal.

| Channel | Default |
| --- | --- |
| Visual: Highlight the terminal | On when the originating terminal is not focused |
| Desktop: Desktop notification | On while Among is in the background |
| Sound: Play a sound | Off; background condition selected |
| Command: Run a command | Off and unconfigured; background condition selected |

![Notification channels and conditions in Preferences](/media/preferences/notifications.png)

A bell marks the originating pane and workspace as unread until you focus that
terminal. The thin line at the left of each header or row thickens and can pulse.
Disabling system animations stops the motion without clearing unread state.
With Always selected, a bell in the already focused terminal pulses briefly
without marking it unread.

Desktop notifications name the workspace and include the title and directory
when known. Clicking one switches to the originating terminal, restoring an
expanded sibling's layout if necessary. A terminal currently being viewed does
not send a desktop notification, even with Always selected. Closing or focusing
its source, disabling the channel or exiting Among withdraws the notification.

![A terminal bell notification in GNOME Shell](/media/app/desktop-notification.png)

Desktop delivery requires a notification service and a matching desktop entry;
see [installation requirements](/install/#desktop-notification-integration).
A service accepting a request does not confirm that a banner appeared. Missing
services and failed policy changes are reported on the Desktop row. Change a
Desktop setting to retry a failed policy update. If `general.json` is invalid
or unreadable, desktop delivery stays off for that session; a missing file uses
the defaults.

### Sound

Use the bundled Among alert or choose a WAV file with the folder button. Among
checks the file before selecting it. A rejected file leaves the previous valid
sound selected. A missing or invalid saved file disables playback until a valid
source is selected. The undo button restores the bundled sound.

Play previews the accepted sound even when event audio is off. Stop cancels
playback or an in-progress file check. If the previous sound is still stopping,
wait for it to stop and press Play again. An accepted playback request does not
confirm audible output from your speakers.

### Run a command

Choose an absolute program path and enter one literal argument per line, then
select Save in the Command group. Spaces, quotes and shell characters are part
of an argument. Nothing is split or unquoted, and no shell interprets the command.
Empty lines are skipped; a line containing spaces is an argument. Existing
arguments that cannot be represented this way remain editable as a JSON list.

![Notification command with one argument per line](/media/preferences/notifications-command.png)

No command is configured or enabled by default. Clearing the program disables
the channel. Saving or enabling it does not execute it; a new eligible event
triggers execution. Choose only a program you intend to run. Its environment
contains `PATH`, `LANG`, `HOME` and available desktop session variables, not
the terminal's full environment.

### Plugin channels

Each plugin delivery channel has its own choice and starts off. Unavailable
channels retain editable choices but receive no delivery. Inspecting a channel
does not start its plugin. See [plugin notifications](/plugins/#notifications)
for access and role controls.

## Keyboard

Select an action to record a shortcut or remove its binding. Changes apply
immediately. See [keyboard shortcuts](/shortcuts/) for defaults and reassignment.

## Terminal

Choose the text/background pair and ANSI palette independently. Both start with
GNOME Terminal default. Among reads GNOME Terminal's default profile once at
startup; it does not follow live changes or modify that profile.

![Terminal appearance choices](/media/preferences/terminal.png)

The embedded catalogue has eleven text/background schemes and six palettes,
available without GNOME Terminal installed. A selection applies to existing
and new panes without restarting their shells or changing the other dropdown.

If inherited text/background colours are unavailable, Among uses Gray on black
and explains why. If the inherited palette is unavailable, it uses VTE's
compiled-in palette. The source remains GNOME Terminal default for the next
launch. Colours that do not match a built-in choice are shown as custom.

## About

About shows the application version and recorded build commit and date.
Missing build metadata is shown as unknown. Copy build details copies the
version, commit, build date and operating-system description for a bug report.
Opening About does not make a network request; following a link opens it in
the desktop's default handler.

![About page with version and build details](/media/preferences/about.png)

## Stored settings

Settings live in `$XDG_CONFIG_HOME/among`, or `$HOME/.config/among` when
`XDG_CONFIG_HOME` is absent or empty.

| File | Contents |
| --- | --- |
| `managed-plugins.json` | Plugin choices, reviewed access, reduced-protection consent and settings |
| `general.json` | Notification policies, sound, command and plugin channel choices |
| `shortcuts.json` | Shortcut overrides, including explicitly removed bindings |
| `window.json` | Expanded sidebar width |
| `terminal.json` | Text/background and ANSI palette selections |

The old `plugins.json` is left untouched and is not used to enable managed
plugins. Session snapshots have [separate storage](/sessions/#storage-and-recovery).

Plugin switches, shortcut edits and notification policies apply immediately.
Plugin forms and command configuration need Save. Sidebar width saves when the
drag finishes. A failed preference write shows a warning; edits that remain
active only for the current session are identified as such. A later edit in
the same category retries pending changes.

Unknown fields are retained. Malformed files and future versions are reported
and are not silently overwritten. Symlink destinations are refused. Writes use
private temporary files and atomic replacement. A failure before replacement
preserves the previous file; a failure confirming directory durability reports
uncertainty after writing. External edits are merged when detected, but
simultaneous external writes are not fully serialized.
