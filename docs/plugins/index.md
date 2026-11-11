---
title: Using plugins
---

# Using plugins

Add a clock, resource meters or directory labels to your terminals. Plugins
are optional and installed separately from Among.

## Installing

1. Open Settings with `Ctrl+,` and select Plugins.
2. Choose a plugin under Available, select Install and confirm.
3. Turn it on under Installed.
4. Review its access and choose Accept and enable.

Installation leaves a plugin disabled until you enable it and accept its
required access.

[![The Plugins page separates Installed and Available plugins](/media/preferences/plugins.png)](/media/preferences/plugins.png)

This example uses sample plugins and an example community source. Package
sizes and available versions depend on the source you use.

### Installing official plugins

The built-in [official source](https://github.com/Among-Terminal/among-plugins)
has a clock in the application footer, CPU, memory and disk meters in the
header, and directory labels under each pane. Directory labels need
[shell integration](/install/#shell-integration) to follow directory changes.

## Access review

Read the requested access before enabling a plugin. Required access must be
accepted. Optional access starts off. Open the plugin's details to see its
source and protection, or to review access again after stopping it.

[![The access review asks you to accept required access before enabling a plugin](/media/preferences/plugin-access-review.png)](/media/preferences/plugin-access-review.png)

Plugins can display status information, read the terminal context you allow,
read system metrics, save their own data or take part in notifications.
The plugin interface does not let them read scrollback, type into a terminal,
change its layout or run commands in your shell. A reported directory does
not itself grant access to the files inside it.

## Confinement

Among blocks plugin network access. With full protection, a plugin can read
its package and the system files it needs to run, and write its own private
data. Your other files stay outside those permissions. A plugin allowed to
read system metrics also gets the system data needed for those metrics.

### Reduced protection

Some systems cannot provide full filesystem protection. Settings explains
the available level before asking you to allow reduced protection. Depending
on that level, a plugin may be able to damage files outside its private data,
or read and write any file your account can access. Decline if you do not
accept that access. Without the required system-call protection, the plugin
cannot start.

Install code you trust. Plugins have no CPU or memory quotas. Turning a plugin
off may leave programs it started running under the same restrictions.

## Plugin sources

Use Sources, then Add source to preview a public GitHub repository. Choose
Add source only if you want to save it. Check source or Check all refreshes
saved lists. A failed check keeps the previous list.

[Community plugins](https://github.com/Among-Terminal/awesome-among-terminal)
are not reviewed or endorsed by the project. Review their source and access
before enabling them. A publisher change requires a separate review.

Removing a source leaves its plugins installed, but stops offering their updates.

## Updates and removal

Refresh the source and choose Update when offered. Review the new version and
requested access. Only that plugin may restart; your terminals keep running.
New required access or a changed publisher can require another review.

Choose Uninstall and confirm to stop and remove a plugin. Its saved settings
and private data remain. Use [Settings of removed plugins](/preferences/#retained-plugin-settings)
to delete retained settings.

## Notifications

A plugin can request a delivery role or provide a channel. Review that role on
its details page. A provided channel has its own switch in
[Notifications](/preferences/#notifications) and starts off; access review
alone does not enable delivery. See [plugin channels](/notifications/#plugin-channels).
Delivery plugins still have no network access.

## If a plugin stops working

Open Settings and read the reason beside it. A failed plugin loses its status
content while your terminals remain usable. Turn it off and on to retry after
fixing the problem.

To write a plugin, follow the [plugin author guide](/plugin-development/).
