---
title: Sessions
---

# Sessions

Return to your workspace names, colours and pane layout after restarting Among.
Restored terminals open fresh shells in their last known directories.

## Restore your layout

Open Among and choose Restore when asked. Your other workspaces return too.
Commands, running tools and scrollback do not return. Start those tools again
in the restored panes.

[![The restore prompt explains that layouts return but commands and processes do not](/media/app/session-restore.png)](/media/app/session-restore.png)

Choose Start new for a single empty workspace. Its next save replaces the
previous session. Closing the restore prompt with the window's close button
leaves the saved session untouched.

## Keep track of directories

Optional [shell integration](/install/#shell-integration) lets new splits and
restored sessions use the directory you are working in. Without integration,
Among knows the directory where each shell started.

If a directory no longer exists or cannot be opened, the shell starts in an
accessible home or startup directory. Settings tells you which panes were affected.

## If saving fails

Among saves layout changes automatically and saves again on confirmed exit.
A crash can lose recent changes. Power loss or storage errors can lose more.

Settings shows saving problems. Fix the storage problem and Among retries.
If the final save fails, keep working to allow another attempt, or choose to
exit without saving.
