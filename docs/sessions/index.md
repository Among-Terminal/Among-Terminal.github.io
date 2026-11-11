---
title: Sessions
---

# Sessions

Among saves workspace names, colours, sidebar order, nested splits, focus and
known directories. Restoring starts fresh shells. It does not resume commands,
running processes or scrollback, and does not retain temporary pane expansion.

## Saving and restoring

A new application process with a valid saved session asks you to choose Restore
or Start new. Restore recreates inactive workspaces too, with the saved active
workspace and focused pane. A pane moved to another workspace belongs to that
destination in the saved session.

Start new, or Escape, opens a single-terminal workspace. Its next checkpoint
replaces the previous session. Closing the window while the prompt is open
exits without starting terminals or changing the old snapshot. Activating an
already running application does not ask again. The window opens maximized.

Changed state is checkpointed every two seconds. Checkpoints do not write to
disk when the state is unchanged. Disk completion depends on storage
availability. Confirmed exit saves the latest state before closing
terminals; cancelling exit keeps them running. A crash can lose changes since
the last completed checkpoint. Power loss or storage errors can lose more.

## Directory reporting

Among knows each shell's initial directory. Later changes require the shell to
publish OSC 7 directory reports, even when the workspace is inactive. No plugin
is needed, and Among never edits shell startup files. Installing Starship alone
does not provide directory reporting.

For Bash, test this helper in a terminal without changing shell files:

```sh
among_osc7() {
    local status=$? LC_ALL=C directory uri='file://' byte encoded i
    directory=$(pwd -P && printf '.') || return "$status"
    directory=${directory%.}
    directory=${directory%$'\n'}
    for ((i=0; i<${#directory}; i++)); do
        byte=${directory:i:1}
        case "$byte" in
            [a-zA-Z0-9/._~-]) uri+=$byte ;;
            *) printf -v encoded '%%%02X' "'$byte"; uri+=$encoded ;;
        esac
    done
    printf '\033]7;%s\007' "$uri"
    return "$status"
}
PROMPT_COMMAND="among_osc7${PROMPT_COMMAND:+; $PROMPT_COMMAND}"
among_osc7
```

The helper percent-encodes the physical directory using Bash builtins. Add it
to your Bash configuration if wanted. It keeps the previous command's exit
status, so prompt tools that run after it, such as Starship, still see that
status. Other shells need their own prompt hook.
The same reports supply [pane directory labels](/plugins/#live-status-examples)
and the initial directory when [splitting a pane](/panes/#splitting-a-pane).

Use this hook in local shells. If it runs in a remote shell over SSH, it reports
the remote directory as a local file URI. Among discards any hostname in OSC 7
file URIs and treats the path as local. For example, `file://server/srv/project`
becomes `/srv/project` on your computer. Splitting or restoring uses that local
path; it does not reconnect over SSH.

If a saved directory has been deleted or cannot be entered, the shell falls
back to an accessible home or startup directory. Settings lists affected panes.
Among records the actual known directory, not an unavailable requested path or
another terminal's location.

## Storage and recovery

When `XDG_DATA_HOME` is set, the snapshot path is that value followed by
`among/session.json`. An empty value produces the relative path
`among/session.json`; a relative value also stays relative. Only when
`XDG_DATA_HOME` is unset does Among use `$HOME/.local/share/among/session.json`,
if `HOME` is set. If both variables are unset, no snapshot path is available.

Saving it does not change preferences, install plugins or modify shell files.
It contains no commands, process IDs, shell environment or scrollback.

Snapshots are limited to 8 MiB, 64 nested splits, 4096 panes and 256 workspaces.

Storage errors appear in Settings without blocking input. Later checkpoints
retry after the problem is fixed. If the final save fails, choose whether to
keep working or exit without saving. Keeping the window open resumes retries.

Invalid or future-version snapshots are preserved until corrected or removed
externally. Symlink and non-regular destinations are refused. New snapshots
are private, with mode `0600`; existing stricter permissions are preserved.
Atomic replacement keeps the previous complete file if replacement fails.
A directory-sync error after replacement means the new file was written but
its durability through power loss is uncertain. Editing a snapshot while Among
saves it can produce a retryable concurrent-change warning.
