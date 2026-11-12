---
title: Preferences
---

# Preferences

Press `<Ctrl> + ,` to open Settings. Choose Plugins, Notifications, Keyboard,
Terminal or About at the top. Most changes apply immediately and there is no
general Save button; plugin forms and the command fields have their own Save
buttons.

## Light and dark styling

Among uses the desktop's light or dark styling, and open windows follow a change
as it happens. Terminal text and background colours remain a separate choice.

<figure class="pane-clip">
<video autoplay loop muted controls playsinline preload="auto" poster="/media/app/theme-switch-poster.png" width="1600" height="1200" aria-label="An open terminal window switches from light to dark styling and back as the loop repeats">
<source src="/media/app/theme-switch.mp4" type="video/mp4">
</video>
<figcaption>The window, sidebar and terminal colours switch together while the shells keep running; the clip loops the fade.</figcaption>
</figure>

## Terminal

Choose text and background colours, then an ANSI palette. The two choices are
independent and apply to open panes without restarting their shells. GNOME
Terminal default follows that application's profile when Among starts; bundled
schemes work without GNOME Terminal installed.

[![Gray on black text and background with the Tango ANSI palette](/media/preferences/terminal.png)](/media/preferences/terminal.png)

Configure your prompt in your shell itself.

## Notifications

The Notifications tab holds the four built-in channels and any plugin channels.
Their defaults, conditions, desktop banner, sound limits and command rules are
described in [Terminal notifications](/notifications/).

## Keyboard

Select an action and press a new shortcut. Assigning a combination already in
use removes the earlier assignment. See [keyboard shortcuts](/shortcuts/) for
the defaults, conflicts and removing a binding.

## Plugins

Install, enable, update and remove plugins on the Plugins page. A plugin form
requires Save. Saving does not enable a disabled plugin. See
[using plugins](/plugins/) for installation, access review and protection.

### Retained plugin settings

After uninstalling a plugin, Settings of removed plugins deletes its saved
settings. The plugin's private data directory and the record of accepted access
remain. Among has no separate action to delete them yet.

## About

Copy build details reports the application version and the available build and
system details. The page also links to the source, licence and issue tracker.

[![The About tab with version, source, licence and build details](/media/preferences/about.png)](/media/preferences/about.png)

## If a setting cannot be saved

Settings shows a warning when a change cannot be saved; that edit may apply only
to the current session. Fix the storage problem, then change a setting in the
same section to retry.
