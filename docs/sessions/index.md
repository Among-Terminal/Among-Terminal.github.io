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

Choose Start new for a single empty workspace. Its next save replaces the
previous session. Closing the restore prompt with the window's close button
leaves the saved session untouched.

## Keep track of directories

Shell integration lets Among follow directory changes. New splits can then
start in the directory you are working in, and session restoration can return
there. The optional pane directory plugin uses the same information.

Follow the optional [shell integration setup](/install/#shell-integration).
Among does not change your shell configuration. Without integration, it knows
the directory where each shell started.

Use this setup in local shells. It does not restore SSH connections. A directory
reported by a remote shell is treated as a path on your own computer.

If a directory no longer exists or cannot be opened, the shell starts in an
accessible home or startup directory. Settings tells you which panes were affected.

## If saving fails

Among saves layout changes automatically and saves again on confirmed exit.
A crash can lose recent changes. Power loss or storage errors can lose more.

Settings shows saving problems. Fix the storage problem and Among retries.
If the final save fails, keep working to allow another attempt, or choose to
exit without saving.
