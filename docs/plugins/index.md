---
title: Using plugins
---

# Using plugins

Plugins are separate programs that add status information or handle
notifications. Among draws their content and controls their access.
Application packages contain no plugins; install the ones you want in Settings.

## What plugins can do

With your permission, plugins can display text, icons and meters in the window,
workspace, sidebar or individual panes. They can read selected terminal context,
such as a reported directory or title, read system metrics, store their own
settings and data, or take part in notifications.

The plugin interface cannot type into terminals, read scrollback, open or close
panes, change the layout, or run commands in your shell. It does not expose
process command lines or environment variables. Plugins cannot create arbitrary
HTML, CSS or GTK widgets. Knowing a directory does not grant access to its files.

Network access is blocked, including for notification delivery plugins.
Filesystem protection depends on the level shown in Settings. Read
[confinement](#confinement) before accepting reduced protection.

## Installing

1. Open Settings with `Ctrl+,` and select Plugins.
2. Find a plugin under Available and choose Install. Check the version, package
   and requested access in the confirmation.
3. Once installed, turn it on under Installed.
4. Review required and optional access, then choose Accept and enable.

Installation downloads a ready-built package and leaves it disabled. Among
checks compatibility, release information, sizes and hashes before saving it.
It does not compile code or run installation scripts. Opening the catalogue or
plugin details does not install or enable anything.

![Install and verify a package, then review access and protection before running it](/media/diagrams/plugin-install.svg)

If a check fails, that step stops and displays a reason. Copying an executable
into an `among/plugins` directory does not install a managed plugin.

### Installing official plugins

The built-in Official plugins for Among Terminal source is
[Among-Terminal/among-plugins](https://github.com/Among-Terminal/among-plugins).
It cannot be removed. Official identity is tied to the repository and publisher,
not just their display names.

| Plugin | Display | Required access |
| --- | --- | --- |
| `clock` | Local time in the application footer | Status content |
| `system-status` | CPU, memory and root filesystem usage in the header | Status content and system metrics |
| `pane-pwd` | Each pane's reported directory in its footer | Status content, terminal identifiers and directories |

![Installed and available plugins](/media/preferences/plugins.png)

The screenshots include sample plugins and a sample additional source.
The table lists the official plugins.

The Plugins page uses a saved catalogue when available. Without one, opening
the page fetches the official list once. A failed fetch shows its reason and
Load or refresh controls. It does not retry continuously. Refresh explicitly
to check a saved catalogue for changes.

## Access review

Required access must be accepted before a plugin can run. Optional access is
unchecked on the first review. A plugin's details show its source, protection,
settings and requested access. The shield describes origin and protection;
it is not a code audit.

![Reviewing a plugin's required and optional access](/media/preferences/plugin-access-review.png)

Review what the plugin needs: status display, terminal identifiers, reported
directories, titles, process-running state, terminal events, system metrics,
settings or notification roles. Unknown directories and titles stay unavailable.
Read the [notification role rules](#notifications) before enabling those features.

Stop a running plugin before changing its reviewed access. Saving a review
does not restart it or enable a notification delivery channel.

## Confinement

Among applies Linux Landlock filesystem rules and a seccomp system-call filter
before a managed plugin starts. It refuses startup if the child cannot confirm
the required protection.

With full protection, the plugin can:

- Read its installed package and execute its packaged programs.
- Read system runtime paths: `/usr`, `/lib`, `/lib64`, `/etc/ld.so.cache` and
  `/etc/localtime`, where present. Execution is allowed in the system directories.
- Read and write its own private data directory, but not execute files there.
- Read `/proc/stat`, `/proc/meminfo` and `/proc/loadavg` if granted system metrics.

The installed package is read-only. Other user files are outside these grants.
Repository plugin data lives at
`$XDG_DATA_HOME/among/plugin-data/<repo-id>/<plugin-id>/`. An unset, empty or
relative `XDG_DATA_HOME` falls back to `$HOME/.local/share`.

The filter blocks network and local sockets, process inspection and memory
access, signal sending, shared IPC, and selected kernel operations. It also
blocks changes to file permissions, ownership, timestamps and extended
attributes. Child processes inherit the restrictions. Plugins do not inherit
your `HOME`, `XDG_*` settings or full environment.

### Reduced protection

| Available protection | What it means |
| --- | --- |
| Landlock ABI 3 or newer plus seccomp | Full protection; available from kernel 6.2 where supported |
| Landlock ABI 1 or 2 plus seccomp | Requires consent; a plugin can still truncate writable files outside allowed paths |
| Seccomp without usable Landlock | Requires consent; the plugin can read and write any file your account can |
| No usable seccomp | The plugin cannot start, even with consent |

Settings shows the observed level and offers Allow reduced protection when
applicable. The permission is stored per plugin and remains marked while saved.
Each launch checks the kernel again. If it offers less protection than you
accepted, Among asks again.

There are no CPU or memory quotas, and confinement does not protect against
kernel vulnerabilities. Install code you trust. A child that deliberately leaves
the supervised process group remains confined but is no longer stopped with
that group.

## Live status examples

The clock uses local time, including `TZ` when supplied to Among. Resource meters
show the plugin process's view of the system, which may differ inside a container
or package sandbox.

`pane-pwd` shows each pane's last reported directory, including unfocused panes.
Its tooltip contains the full path. Unknown directories produce no content.
Later directory changes need [shell directory reporting](/sessions/#directory-reporting).

## Notifications

Plugin events follow your [notification policies](/preferences/#notifications).
Submitting an event does not prove that a sound played or a desktop banner appeared.
Notification content can include buttons. Clicking one sends an action to the
plugin and does not execute a shell command.

A plugin can produce events or provide delivery channels, but cannot do both
in the same process. If it offers both optional roles, choose one or neither.
Notification interface content is a separate permission.

Delivery channels have separate switches in Notifications and start off.
Access review alone does not enable them. A delivery plugin still has no network
access or direct access to desktop services. Unavailable providers keep their
saved choices but receive no delivery.

## Updates and removal

Refresh the source, then choose Update when a newer compatible version is
offered. Review the version and access requirements. Only the selected plugin
may restart; its settings remain. New required access or a changed publisher
can require a new access review before startup.

![Plugin details with settings, source and protection information](/media/preferences/plugin-info.png)

Uninstall asks for confirmation, stops the plugin and removes its installation.
Its local settings and private data directory remain. Retained settings can be
removed separately in Preferences. If stopping or removal fails, the manager
reports the failure and keeps the remaining state visible.

### Testing prereleases

Quit Among before starting `among --plugin-development`. The mode is not saved
and cannot be enabled on an already running instance. Settings then offers a
Stable / Pre-release selector. Prerelease installations remain visibly marked
and start only in this mode. Replacing an installation with a prerelease starts
it disabled and requires a new access review.

Among retains the previous verified package. In this mode, Technical details
offers Recover previous. Recovery still checks compatibility and access.
For authoring and local package testing, use the
[plugin template](https://github.com/Among-Terminal/among-plugin-template).

## Plugin sources

Use Add source to look up a public GitHub repository by `owner/repository` or URL.
Previewing it is read-only. Add source saves the registration and catalogue;
Cancel saves neither. Among supports up to 32 user sources plus the official source.

![Plugin sources with catalogue age and check controls](/media/preferences/sources.png)

Check source refreshes one repository; Check all checks them in order. Failed
checks preserve the saved list. Old or future-dated check times are marked.
A publisher change needs explicit review before replacing saved metadata; this
does not grant installed code new access. An official publisher mismatch is refused.

Repository identity survives a rename. A different repository reusing the old
name does not inherit it. Removing a source does not stop or uninstall its
plugins, but their updates are no longer offered.

A GitHub rate limit stops source checks and shows the remaining count, or unknown.
No retry is scheduled. The optional `AMONG_GITHUB_TOKEN` environment variable
authenticates API requests; it is not sent to download hosts or child processes.
Its original value can still be visible to the same user through Among's process
information. Use a token with no access beyond reading public data.

## Failure handling

Starting, Running, Stopping and Faulted describe the process state. An enabled
switch records your choice and can remain on when startup is unavailable or
incompatible, or the process has faulted.

A crash, closed output pipe or unanswered status request faults the plugin and removes
its status content. At most three automatic restarts follow, after 2, 4 and 8
seconds. Turning it off and on resets that allowance. Missing or incompatible
executables are not automatically retried. Terminals remain usable.

Malformed replies are rejected; repeated invalid replies can lead to a timeout.
Stopping may persist until Among confirms that the supervised process group
has gone. It will not start a replacement of that identity before confirmation.

To write a plugin, use the [author guide and API reference](https://github.com/Among-Terminal/among-plugin-template).
