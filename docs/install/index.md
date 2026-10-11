---
title: Installing Among Terminal
---

# Installing Among Terminal

Download a ready-made package and install it with APT. No Git, Rust, Cargo or
build scripts are needed.

## Download

These are **0.1.0 RC2 preview packages**, not a stable release. Choose the file
matching both your distribution version and CPU architecture:

| Distribution | amd64 (Intel/AMD 64-bit) | arm64 (64-bit ARM) |
| --- | --- | --- |
| Ubuntu 24.04 | [Download `.deb`](https://github.com/Among-Terminal/among/releases/download/v0.1.0-rc.2/among-terminal_0.1.0.rc.2-1.ubuntu24.04_amd64.deb) | [Download `.deb`](https://github.com/Among-Terminal/among/releases/download/v0.1.0-rc.2/among-terminal_0.1.0.rc.2-1.ubuntu24.04_arm64.deb) |
| Debian 13 | [Download `.deb`](https://github.com/Among-Terminal/among/releases/download/v0.1.0-rc.2/among-terminal_0.1.0.rc.2-1.debian13_amd64.deb) | [Download `.deb`](https://github.com/Among-Terminal/among/releases/download/v0.1.0-rc.2/among-terminal_0.1.0.rc.2-1.debian13_arm64.deb) |

Not sure which architecture you have? Run `dpkg --print-architecture`.
Check your distribution version in **Settings → About**, or `/etc/os-release`.
Do not use a Debian package on Ubuntu or vice versa. Other distribution versions
have not been accepted for these packages.

## Install and launch

Open a terminal in the folder containing the downloaded file. On Ubuntu 24.04
with amd64, run:

```sh
sudo apt install ./among-terminal_0.1.0.rc.2-1.ubuntu24.04_amd64.deb
```

For another supported target, use the exact filename you downloaded. Keep the
`./` prefix: it tells APT to install a local package. APT downloads the required
runtime libraries from your configured distribution repositories.

Launch **Among Terminal** from the applications menu, or run `among`.
If an older Cargo, Snap or source-built copy is also installed, `/usr/bin/among`
explicitly launches the DEB installation.

## Update and remove

Download the newer package for the same distribution and architecture, then run
`sudo apt install ./filename.deb` with its exact filename. Close and relaunch
Among Terminal after the update.

There is no Among APT repository yet: `apt upgrade` does not download newer
Among releases automatically. An RC of the same base version sorts below the
stable version; do not downgrade an existing stable installation to that RC.

```sh
sudo apt remove among-terminal
```

Your preferences, sessions and separately installed plugins are kept in your
home directory. Removing the DEB does not remove another Snap, Cargo or
source-built copy.

## Package contents and integrity

The DEB installs the application, desktop entry, icon and licence notices.
Example plugins are provided but disabled by default. See [using plugins](/plugins/).

The [release page](https://github.com/Among-Terminal/among/releases/tag/v0.1.0-rc.2)
provides checksums, matching source materials and build/check provenance.
Checksums detect changed files; they are not a separate publisher signature.
Installed CI checks cover X11/Xvfb, not full stable acceptance or GNOME/Wayland
certification. See the release notes for the exact scope and known limitations.

## For developers

To compile or modify the application, see [building from source](/build/).
Source compilation is not required to install these packages.
