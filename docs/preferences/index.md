---
title: Preferences
---

# Preferences

Press `Ctrl+,` to open Settings. Choose Plugins, Notifications, Keyboard,
Terminal or About at the top. Changes apply immediately; the tab has no Save
button.

## Terminal

Choose text and background colours, then an ANSI palette. The two choices are
independent and apply to open panes without restarting their shells. GNOME
Terminal default follows that application's profile when Among starts; bundled
schemes work without GNOME Terminal installed.

[![Gray on black text and background with the Tango ANSI palette](/media/preferences/terminal.png)](/media/preferences/terminal.png)

[See the available schemes and palettes](/features/#choose-your-terminal-colours).
Configure your prompt in your shell itself.

## Notifications

Use Highlight the terminal, Play a sound, Desktop notification and Run a command
to choose how a bell reaches you. Each channel has a When choice: Always,
Terminal not in view or Among in background. Visual marks start on for unfocused
terminals. Desktop notifications start on for background Among. Sound and
commands start off.

[![Choose when Among highlights a terminal, plays a sound or sends a desktop notification](/media/preferences/notifications.png)](/media/preferences/notifications.png)

Click a desktop notification to return to the terminal that rang. Notifications
can include the workspace, terminal title and directory, and that text may
appear on the lock screen. Turn Desktop off if it would reveal private
information. An AppImage or archive needs a desktop launcher; see
[desktop notification integration](/install/#desktop-notification-integration).

[![A GNOME desktop banner naming the workspace and terminal that rang](/media/app/desktop-notification.png)](/media/app/desktop-notification.png)

[How the marks look in the window](/panes/#terminal-bells).

### Sound

Play a sound uses the bundled alert or a local WAV. Use Play and Stop to
preview it. The file must be uncompressed PCM or IEEE-float WAV, at most
10 seconds and 10 MiB, with a sample rate up to 96 kHz.

### Run a command

Choose a program, put each argument on its own line and select Save. Arguments
are passed literally: shell quoting and operators do not apply. Saving does not
run the command; turn the channel on when you are ready.

### Plugin channels

A plugin can add a delivery channel. Each starts off and has its own switch.
Review the plugin's access before enabling it. See
[plugin notifications](/plugins/#notifications).

## Keyboard

Select an action and press a new shortcut. Assigning a combination already in
use removes the earlier assignment. The [keyboard guide](/shortcuts/) lists the
defaults and explains removing a binding.

[![Select an action in Keyboard to change its shortcut](/media/preferences/keyboard.png)](/media/preferences/keyboard.png)

## Plugins

Install, enable, update and remove plugins from the Plugins page. A plugin form
requires Save. Leaving it without saving discards the edits, and saving does not
enable a disabled plugin. See [using plugins](/plugins/) for installation,
access review and protection.

### Retained plugin settings

After uninstalling a plugin, Settings of removed plugins deletes its saved
settings. Private data and accepted access remain until you remove them
separately.

## About

Copy build details reports the application version and the available build and
system details. The page also links to the source, licence and issue tracker.

## If a setting cannot be saved

Settings shows a warning when a change cannot be saved; that edit may apply only
to the current session. Fix the storage problem, then change a setting in the
same section to retry.
