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

### Finding and inspecting plugins

Search matches names, descriptions, full identities and origins in both
Installed and Available. Plugins with the same name remain separate. With
several sources, user plugins show their repository. An installed plugin whose
source was removed shows `source removed`.

An unavailable or faulted plugin shows its reason in place of the description.
An installation or removal in progress, or a failed operation, takes precedence
over that reason.

Use the info button to inspect source, protection and access. Available plugins
also have details, without an enable switch or settings. Their protection reads
`Checked when the plugin starts.` Installed plugins show Settings only when they
provide configurable options. See
[plugin settings](/preferences/#plugins) for saving changes.

Technical details starts collapsed and shows the plugin identity. For an
installed plugin, it also shows the repository and API compatibility, including
the API observed when it ran. You can select and copy the values.
Use Tab or Shift+Tab to move between controls, Space to change switches, and
Back or Escape to return. Opening or searching the inventory neither saves
defaults nor enables plugins.

## Access review

Required access must be accepted before a plugin can run. Optional access is
unchecked on the first review. A plugin's details show its source, protection,
settings and requested access. The shield describes origin and protection;
its accessible name also identifies them. It is not a code audit.

![Reviewing a plugin's required and optional access](/media/preferences/plugin-access-review.png)

Review what the plugin needs: status display, terminal identifiers, reported
directories, titles, process-running state, terminal events, system metrics,
settings or notification roles. Unknown directories and titles stay unavailable.
Read the [notification role rules](#notifications) before enabling those features.

For an installed plugin with notification roles, open Notification role, then
Review role / access. This control is on the plugin's page and remains available
after an earlier review. The page distinguishes your reviewed role from the
role currently allowed to run. The Notifications page contains channel controls.

If the plugin is running, choose Stop and disable plugin, wait for it to stop,
then reopen the review. Save reviewed access stores the choice for that plugin
and publisher without enabling the plugin or its channels. The initial enable
flow uses Accept and enable.

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

A running plugin's protection text shows the level it actually reached. The
warning shield remains while permission for reduced protection is saved, even
if the current run has full protection. Problems with the plugin's data-directory
path, ownership or permissions leave it Unavailable.

There are no CPU or memory quotas, and confinement does not protect against
kernel vulnerabilities. Install code you trust. A plugin can deliberately leave
programs running after you turn it off. Those programs remain subject to the
same protection.

## Live status examples

The clock shows local time in 24-hour `HH:MM:SS` format, including `TZ` when
supplied to Among.

The `system-status` meters show CPU, memory and root filesystem usage as
percentages. CPU excludes idle time and I/O wait and initially shows `N/A`.
Memory usage is based on `MemAvailable`. Disk usage is for `/`, with reserved
space excluded from available space, as in `df`.
The meters show the plugin process's view of the system, which may differ
inside a container or package sandbox.

`pane-pwd` shows each pane's last reported directory, including unfocused panes.
The label contains at most 480 characters. Its tooltip contains the full path.
Unknown directories produce no content.
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

Among does not offer a lower version as an update. Different installed and
offered version labels must both follow Semantic Versioning 2.0.0 for Among to
determine which is newer. Otherwise, no update is offered and the plugin's
details explain that the version order is unknown.

![Plugin details with settings, source and protection information](/media/preferences/plugin-info.png)

Uninstall asks for confirmation, stops the plugin and removes its installation.
Its local settings and private data directory remain. Retained settings can be
removed through [Settings of removed plugins](/preferences/#retained-plugin-settings).
If stopping or removal fails, the manager reports the failure and keeps the
remaining state visible.

A row shows either progress or one action, such as Install, Update or Uninstall.
Installation offers a Stop button. Uninstall shows progress in the row without
a separate progress dialog and cannot be cancelled after it begins. A failure
leaves the details page open with a banner. When removal completes, the page
closes and focus returns to the list.

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
checks preserve the saved list. Saved lists checked at least 24 hours ago, or
with a check time in the future, are marked.
A publisher change needs explicit review before replacing saved metadata; this
does not grant installed code new access. An official publisher mismatch is refused.

If a publisher changes while you are using Pre-release, choose Stable, check
the source again and approve the change there. Prerelease catalogues are not saved.

Repository identity survives a rename. A different repository reusing the old
name does not inherit it. Removing a source does not stop or uninstall its
plugins, but their updates are no longer offered.

A GitHub rate limit stops source checks and shows the remaining count, or unknown.
No retry is scheduled. A permission refusal without a rate-limit indication
reports the failure and continues checking the remaining sources.

The optional `AMONG_GITHUB_TOKEN` environment variable
authenticates API requests; it is not sent to download hosts or child processes.
Its original value can still be visible to the same user through Among's process
information. Use a token with no access beyond reading public data.

## Failure handling

Starting, Running, Stopping and Faulted describe the plugin's current state.
An enabled switch records your choice and can remain on when startup is
unavailable or incompatible, or the plugin has failed.

If a plugin crashes, stops communicating or stops responding, its status content
disappears and Settings reports the failure. At most three automatic restarts
follow, after 2, 4 and 8 seconds. Turning it off and on resets that allowance.
Missing or incompatible
executables are not automatically retried. Terminals remain usable.

Unusable plugin updates are ignored. If valid updates do not arrive in time,
the plugin can be marked Faulted. While Settings shows Stopping, Among is still
waiting for the plugin to stop. It will not start another copy until then.

To write a plugin, use the [author guide and API reference](https://github.com/Among-Terminal/among-plugin-template).
