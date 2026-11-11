---
title: Install Among Terminal
---

# Install Among Terminal

Choose a package for your Linux distribution and processor. Version 0.2.0 has
DEB, RPM, AppImage and binary archives. You do not need Rust or a compiler.

## Download

These links download the latest stable release. For version 0.2.0 specifically,
use the [0.2.0 release page](https://github.com/Among-Terminal/among/releases/tag/v0.2.0).

| System | x86-64 (`amd64`) | ARM 64-bit (`arm64`) |
| --- | --- | --- |
| Ubuntu 24.04 | [DEB](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-ubuntu24.04-amd64.deb) | [DEB](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-ubuntu24.04-arm64.deb) |
| Debian 13 | [DEB](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-debian13-amd64.deb) | [DEB](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-debian13-arm64.deb) |
| Fedora 44 | [RPM](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-fedora44-amd64.rpm) | [RPM](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-fedora44-arm64.rpm) |
| Fedora 43 | [RPM](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-fedora43-amd64.rpm) | [RPM](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-fedora43-arm64.rpm) |
| glibc 2.39 or newer | [AppImage](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-amd64.AppImage) | [AppImage](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-arm64.AppImage) |
| Ubuntu 24.04 | [Archive](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-ubuntu24.04-amd64.tar.gz) | [Archive](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-ubuntu24.04-arm64.tar.gz) |
| Debian 13 | [Archive](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-debian13-amd64.tar.gz) | [Archive](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-debian13-arm64.tar.gz) |

If you are unsure which processor you have, run:

```sh
uname -m
```

Choose amd64 for `x86_64` or arm64 for `aarch64`. Snap Store and distribution
archive packages are not available in 0.2.0.

## Verify the download

Download `SHA256SUMS` from the same release and place it beside your package.
For the latest stable release, use [SHA256SUMS](https://github.com/Among-Terminal/among/releases/latest/download/SHA256SUMS).

```sh
sha256sum --check --ignore-missing SHA256SUMS
```

The line for your file must end in `OK` before you install it.

## Debian and Ubuntu (DEB)

Open a terminal in your download directory. Use the filename you downloaded:

```sh
sudo apt install ./among-terminal-ubuntu24.04-amd64.deb
```

APT installs the dependencies. Open Among Terminal from the applications menu.

## Fedora (RPM)

Use the RPM filename for your Fedora release and processor:

```sh
sudo dnf install ./among-terminal-fedora44-amd64.rpm
```

DNF installs the dependencies. Open Among Terminal from the applications menu.

## AppImage

Choose this for a system with glibc 2.39 or newer. Install the host libraries
if they are missing. On Debian or Ubuntu:

```sh
sudo apt-get install libwayland-client0 libx11-6 libxcb1 libfontconfig1 libfreetype6 libharfbuzz0b \
  libfribidi0 libexpat1 libgmp10 libgpg-error0 libcom-err2 zlib1g libstdc++6 fonts-dejavu-core \
  libgl1 libegl1 libgles2 libgbm1 libdrm2 libx11-xcb1 fuse3
```

On Fedora:

```sh
sudo dnf install libwayland-client libX11 libxcb fontconfig freetype harfbuzz fribidi expat gmp \
  libgpg-error libcom_err zlib-ng-compat libstdc++ dejavu-sans-fonts \
  libglvnd-glx libglvnd-egl libglvnd-gles mesa-libgbm libdrm libX11-xcb fuse3
```

After verifying the download, make it executable and run it. Replace amd64
with arm64 if that is the file you downloaded.

```sh
chmod +x among-terminal-amd64.AppImage
./among-terminal-amd64.AppImage
```

If it reports a FUSE mounting error, extract and run it instead:

```sh
./among-terminal-amd64.AppImage --appimage-extract
./squashfs-root/AppRun
```

This creates a folder beside the image. The AppImage does not add itself to
the applications menu. AppImageLauncher can create a launcher for it.

## Binary archive

Use the archive matching your distribution and processor. Its `INSTALL.txt`
lists the required libraries. For an Ubuntu 24.04 ARM archive:

```sh
sudo apt-get install --no-install-recommends libgtk-4-1 libadwaita-1-0 libvte-2.91-gtk4-0 librsvg2-common libgtk-4-media-gstreamer gstreamer1.0-plugins-good
mkdir ~/among
tar -xzf among-terminal-ubuntu24.04-arm64.tar.gz -C ~/among
~/among/bin/among
```

Choose a new extraction directory. An archive does not add an application launcher.

## Desktop notification integration

DEB and RPM packages install the launcher GNOME needs for desktop notifications.
For an AppImage or archive, follow the [launcher setup](https://github.com/Among-Terminal/among/blob/main/docs/install.md#desktop-notification-integration).
An AppImageLauncher entry alone does not supply the notification identity.

If you have both a native package and an AppImage, the manual launcher can
replace the native package's menu entry. Check which executable it opens.

## Shell integration

This optional setup helps new panes and [restored sessions](/sessions/) open
in the directory where you were working. It also supplies directory labels
when you enable that plugin.

For Bash, paste this block into a local Among terminal to try it. To keep it
for future shells, add it once to your Bash startup configuration.

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

Use it only in local shells. Reports from a remote SSH shell are treated as
local paths and do not restore the remote connection. Other shells need their
own directory-reporting setup. Among does not edit your shell configuration.

## Your first workspace

Press `Ctrl+Shift+N` to split a pane and `Ctrl+Shift+T` to create a workspace.
Double-click a workspace name to rename it. Open Settings with `Ctrl+,` to
choose colours or [install optional plugins](/plugins/#installing).

Continue with [panes and workspaces](/panes/).

## Update and remove

Download a newer release and install it the same way. Among has no APT or RPM
repository, so system upgrades alone do not fetch new Among releases. Close
and reopen Among after installing the new version.

For an AppImage, replace the file and update its launcher. If AppImageLauncher
manages it, use that launcher's integration controls. Delete the image and its
manual launcher and icon to remove it. Delete the archive's extraction folder
to remove an archive installation.

For a native package, use the command for your system:

```sh
sudo apt remove among-terminal
```

On Fedora:

```sh
sudo dnf remove among
```

Removal preserves preferences, sessions and separately installed plugins.

For source builds, follow the [application build guide](/build/).
