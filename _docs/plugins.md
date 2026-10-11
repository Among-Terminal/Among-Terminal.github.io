---
layout: default
title: "Using plugins"
permalink: /plugins/
---

# Plugins

A plugin is an executable run directly by Among Terminal as a separate process.
The host supplies no interpreter. Any language works if its installed executable
can run on the system; scripts may use a shebang and must provide their runtime.
Plugin code is never loaded into the application, and
that is the whole point: a plugin that segfaults, hangs, or misbehaves takes only
itself down, while the live terminals — which hold whatever the user is running —
stay up.

The cost is a process spawn and messaging round trips. Compiled examples also
require a build step, unlike a script that can be copied with its runtime available.

The exchange is newline-delimited JSON on the plugin's stdin and stdout. Nothing
else is shared. There is no GTK type, no widget handle, and no function pointer
crossing the boundary, so there is no ABI for either side to break.

## Live status examples

Host protocol 1.1 adds optional `meter` on a fragment: a finite fraction from 0
to 1 rendered as a compact GTK bar. Keep a readable percentage in `text`.
Bars are 50 pixels wide. Their whole track and fill share a continuously changing
hue: green at 0%, yellow at 50%, red at 100%; the track is translucent so the
filled fraction stays distinguishable. Numeric percentages remain a non-color cue.
The host's shared application header and footer use bold monospace by default,
including the clock and N/A labels. Footer text has opacity 0.7; the upper panel
and individual pane footers are not dimmed. Plugins do not select this typography.
Omit or set `meter` to null for N/A. Values outside this range are rejected.
Major 1 is unchanged; 1.0 hosts ignore the field and show only the text.

`clock` shows local 24-hour HH:MM:SS once at the right of the shared application
footer every second, demonstrating a different slot than the resource header.
It uses the process's local timezone configuration (including `TZ`), not UTC.

`system-status` shows labelled graphical CPU, MEM and DISK bars with percentages. CPU samples
the first eight aggregate `/proc/stat` counters: busy is the interval total minus
idle and iowait; guest counters are not counted twice. Startup, reset and zero
intervals show N/A. MEM is `(MemTotal - MemAvailable) / MemTotal`, not a sum that
treats all caches as unavailable. Both are rounded to the nearest percent and
sampled at most once a second. DISK targets `/` using `statvfs`: used is blocks
minus free, divided by used plus available (excluding reserved availability),
rounded upward like `df`. It is sampled at most once every five seconds.
Failed sources show N/A independently. These describe the process's proc/mount
namespace; sandbox figures need not describe the whole host.

`pane-pwd` polls each pane's last terminal-reported directory every second,
including unfocused panes. The full path is in the tooltip; long labels are
truncated. Labels contain only the path, without a `PWD:` prefix. Unknown
directories produce no content; the plugin never substitutes
the host or focused pane's directory. A known initial shell directory is available
at launch; subsequent directory changes require the shell to opt in to OSC 7.

For Bash, test this in a terminal (no shell files are modified):

```sh
among_osc7() {
    local LC_ALL=C directory uri='file://' byte encoded i
    directory=$(pwd -P && printf '.') || return
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
}
PROMPT_COMMAND="among_osc7${PROMPT_COMMAND:+; $PROMPT_COMMAND}"
among_osc7
```

This optional helper uses Bash builtins, encoding physical-directory bytes rather
than interpreting spaces, non-ASCII names or control characters as URI syntax.
Add it to your own Bash configuration only if wanted.
Try `cd /tmp` and wait up to two seconds for the footer. Other shells require
their own prompt hook; no untested zsh/fish integration is claimed here.

## Installing

Preferences saves explicit enable/disable choices immediately to `plugins.json`
and restores them on startup. A Faulted process remains desired-enabled until
you disable it. Save failures are reported as session-only changes; see
[Preferences storage](/preferences/).

`cargo run --release` builds only the application. It does **not** build this
independent example package, replace installed plugin files or enable new ones.
To build all examples, back up installed copies and add only missing default
configuration entries, run from the repository:

```sh
sh scripts/install-plugins.sh --enable-new
```

Existing configuration fields and enabled/disabled entries are preserved. Backups
are created before replacement. All three plugins are disabled by default;
enable wanted plugins explicitly in Preferences.
Existing explicitly enabled examples stay enabled during upgrades; turn them off
in Preferences if no longer wanted. Backups
are stored under `${XDG_DATA_HOME:-$HOME/.local/share}/among/plugin-backups/`.
To update only selected binaries without changing configuration:

```sh
sh scripts/install-plugins.sh system-status clock
```

Disable/re-enable running plugins in Preferences after replacement. Newly added
configuration names load on the next host startup. A rebuilt host does not
replace an already running single-instance process: another `cargo run --release`
may activate that process. Restart the host only when it is safe to end its live
terminal sessions. Plugin updates alone do not close any terminal.

Merge plugin configuration entries with existing settings rather than replacing
them. Clock and resource plugins are optional demonstrations of status slots.

Plugins are executables in `$XDG_DATA_HOME/among/plugins` (`~/.local/share/among/plugins`),
named after the plugin:

```sh
cargo build --release --locked --manifest-path examples/plugins/Cargo.toml
plugin_dir="${XDG_DATA_HOME:-$HOME/.local/share}/among/plugins"
mkdir -p "$plugin_dir"
install -m 755 examples/plugins/target/release/clock "$plugin_dir/clock"
install -m 755 examples/plugins/target/release/system-status "$plugin_dir/system-status"
install -m 755 examples/plugins/target/release/pane-pwd "$plugin_dir/pane-pwd"
```

Then register them in `$XDG_CONFIG_HOME/among/plugins.json` (`~/.config/among/plugins.json`):

```json
{"plugins": [
  {"name": "clock", "enabled": false},
  {"name": "system-status", "enabled": false},
  {"name": "pane-pwd", "enabled": false}
]}
```

Configuration is read leniently, because one broken entry must not stop the
application from starting:

- A missing file, unparsable JSON, or a file without a `plugins` key means no
  plugins are loaded.
- A plugin named in the configuration that is not installed is reported and
  skipped; the rest still load.
- An entry without a `name` is skipped.

### Updating an installed example

Changing an example in this repository does not update the installed copy.
Build first, then replace the selected installed executable at the same name:

```sh
cargo build --release --locked --manifest-path examples/plugins/Cargo.toml
install -m 755 examples/plugins/target/release/clock "${XDG_DATA_HOME:-$HOME/.local/share}/among/plugins/clock"
```

Disable and re-enable `clock` in preferences to start the updated copy
without closing any terminals.
Replacing an old script with the binary does not require deleting it first.
An already-running process keeps executing its old code until restarted.


## Develop a plugin

See [plugin development](/plugin-development/) for a Rust quick start and the JSON-lines protocol.
