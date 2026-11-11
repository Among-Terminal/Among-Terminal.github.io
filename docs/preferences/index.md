---
title: Preferences
---

# Preferences

Press `Ctrl+,` to open Settings. Choose Plugins, Notifications, Keyboard,
Terminal or About at the top.

## Terminal

Choose your text and background colours, then choose an ANSI palette for
coloured terminal output. The choices apply to open panes without restarting
their shells. Configure your prompt in your shell itself.

[![Gray on black text and background with the Tango ANSI palette](/media/preferences/terminal.png)](/media/preferences/terminal.png)

GNOME Terminal default reads that application's default profile when Among
starts. You can also choose a bundled scheme without GNOME Terminal installed.

## Notifications

Use Highlight the terminal to mark a pane and its workspace when a bell needs
your attention. Their colour stripes thicken and can pulse. Focus the terminal
to clear its unread mark.

[![Choose when Among highlights a terminal, plays a sound or sends a desktop notification](/media/preferences/notifications.png)](/media/preferences/notifications.png)

Each channel has a When choice: Always, Terminal not in view or Among in
background. Terminal not in view also includes times when Among is in the
background. Visual marks start on for unfocused terminals. Desktop notifications
start on for background Among. Sound and commands start off.

Click a desktop notification to return to the terminal that rang. Notifications
can include its workspace name, terminal title and directory. That text may
appear on your lock screen. Turn Desktop off if it would reveal private information.

[![A GNOME desktop banner naming the workspace and terminal that rang](/media/app/desktop-notification.png)](/media/app/desktop-notification.png)

Desktop notifications need a notification service and an application launcher.
See [desktop notification integration](/install/#desktop-notification-integration)
if you use an AppImage or archive.

### Sound

Turn Play a sound on to use the bundled alert. The folder button lets you choose
a local, uncompressed WAV file. Use Play to preview it and Stop to end playback.
Choose an uncompressed PCM or IEEE-float WAV of at most 10 seconds and 10 MiB,
with a sample rate up to 96 kHz. If Among rejects a file, choose another or
return to the built-in sound with the undo button.

### Run a command

Choose a program, put each argument on its own line and select Save. Turn the
channel on when you are ready. Saving alone does not run it; an eligible event
does. Choose only a program you intend to run. Arguments are passed literally,
so shell quoting and shell operators do not apply.

### Plugin channels

Plugins can provide additional delivery channels. Each has its own switch and
starts off. Review the plugin's access before enabling a channel. See
[plugin notifications](/plugins/#notifications).

## Keyboard

Select an action and press a new shortcut. The [keyboard guide](/shortcuts/)
lists defaults and explains conflicts and removing bindings.

## Plugins

Install and enable plugins from the Plugins page. Open a plugin's details to
review access or change its settings. Plugin forms require Save. Leaving a
form without saving discards those edits. Saving does not enable a disabled
plugin. If accepted settings need a restart, use Restart plugin and confirm.
Your terminals keep running.

See [using plugins](/plugins/) for installation and protection.

### Retained plugin settings

After uninstalling a plugin, Settings of removed plugins lets you delete its
saved settings. Choose Delete settings and confirm. This cannot be undone.
It leaves the plugin's private data and access permissions in place.

## About

Use Copy build details when reporting a problem. It copies the application
version and available build and system details. About also links to the source
code, licence and issue tracker.

## If a setting cannot be saved

Settings shows a warning when a change cannot be saved. An edit may then apply
only to the current session. Fix the storage problem and change a setting in
the same section to retry.
