---
title: Installing Among Terminal
---

# Installing Among Terminal

The 0.2.0 release provides DEB, RPM, AppImage and binary archives for x86-64
(`amd64`) and ARM 64-bit (`arm64`). No Rust toolchain or compilation is needed.
Application packages contain no plugins; [install plugins separately](/plugins/#installing).

Snap Store and distribution archive packages are not available in 0.2.0.
Use the direct downloads below.

## Download

These links fetch the latest stable release. For the exact 0.2.0 files, use
the [0.2.0 release page](https://github.com/Among-Terminal/among/releases/tag/v0.2.0).

| System | x86-64 (`amd64`) | ARM 64-bit (`arm64`) |
| --- | --- | --- |
| Ubuntu 24.04 (DEB) | [Download DEB](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-ubuntu24.04-amd64.deb) | [Download DEB](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-ubuntu24.04-arm64.deb) |
| Debian 13 (DEB) | [Download DEB](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-debian13-amd64.deb) | [Download DEB](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-debian13-arm64.deb) |
| Fedora 44 (RPM) | [Download RPM](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-fedora44-amd64.rpm) | [Download RPM](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-fedora44-arm64.rpm) |
| Fedora 43 (RPM) | [Download RPM](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-fedora43-amd64.rpm) | [Download RPM](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-fedora43-arm64.rpm) |
| glibc 2.39+ (AppImage) | [Download AppImage](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-amd64.AppImage) | [Download AppImage](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-arm64.AppImage) |
| Ubuntu 24.04 (archive) | [Download archive](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-ubuntu24.04-amd64.tar.gz) | [Download archive](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-ubuntu24.04-arm64.tar.gz) |
| Debian 13 (archive) | [Download archive](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-debian13-amd64.tar.gz) | [Download archive](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-debian13-arm64.tar.gz) |

`uname -m` prints `x86_64` for amd64 and `aarch64` for arm64. Choose the native
package or archive for your distribution release and architecture.

## Verify the download

Download `SHA256SUMS` from the same release as your package. For the latest
release, use [SHA256SUMS](https://github.com/Among-Terminal/among/releases/latest/download/SHA256SUMS).
Put it next to the downloaded file and run:

```sh
sha256sum --check --ignore-missing SHA256SUMS
```

The line for your file must end in `OK`. Releases are immutable once published.
With the GitHub CLI, `gh release verify-asset <tag> <file> --repo Among-Terminal/among`
checks the file against the release attestation.

## Debian and Ubuntu (DEB)

Open a terminal in the download directory and use the filename you downloaded:

```sh
sudo apt install ./among-terminal-ubuntu24.04-amd64.deb
```

APT installs runtime dependencies. Local installation adds no Among repository
or signing key. GNOME Software may show a generic local-package card, including
Unknown License, even though the package carries licensing and AppStream data.

## Fedora (RPM)

```sh
sudo dnf install ./among-terminal-fedora44-amd64.rpm
```

DNF installs runtime dependencies. After installing a DEB or RPM, start Among
Terminal from the applications menu or run `among`.

## AppImage

An AppImage carries Among, GTK, libadwaita, VTE and their bundled dependencies.
It installs nothing. It needs glibc 2.39 or newer. The supplied release checks
cover Debian 13, Ubuntu 24.04 and Fedora 43 on both architectures.

The host must provide its graphics stack, fonts and several runtime libraries.
Install these on Debian or Ubuntu:

```sh
sudo apt-get install libwayland-client0 libx11-6 libxcb1 libfontconfig1 libfreetype6 libharfbuzz0b \
  libfribidi0 libexpat1 libgmp10 libgpg-error0 libcom-err2 zlib1g libstdc++6 fonts-dejavu-core \
  libgl1 libegl1 libgles2 libgbm1 libdrm2 libx11-xcb1
```

On Fedora:

```sh
sudo dnf install libwayland-client libX11 libxcb fontconfig freetype harfbuzz fribidi expat gmp \
  libgpg-error libcom_err zlib-ng-compat libstdc++ dejavu-sans-fonts \
  libglvnd-glx libglvnd-egl libglvnd-gles mesa-libgbm libdrm libX11-xcb
```

After verifying the download, make it executable and start it:

```sh
chmod +x among-terminal-amd64.AppImage
./among-terminal-amd64.AppImage
```

Mounting requires `fusermount3` from `fuse3`: install it with
`sudo apt-get install fuse3` or `sudo dnf install fuse3`. If the image reports
`Cannot mount AppImage, please check your FUSE setup`, extract and run it:

```sh
./among-terminal-amd64.AppImage --appimage-extract
./squashfs-root/AppRun
```

This creates `squashfs-root/` in the current directory. The image does not add
itself to the applications menu. AppImageLauncher can create an entry; Among
uses a matching registration for that exact image when available. Duplicate or
old registrations can still point to older files. For a manual entry, see below.

### Checking an AppImageLauncher entry

Check the entry's actual `Exec` path against the AppImage you are launching.
Among uses the entry only when its executable points to that exact image.
When launched without a matching desktop entry supplied by the launcher, Among
looks for one existing match. If several entries match, it does not choose one.

### Upgrading an AppImageLauncher installation

These commands assume the full AppImageLauncher, which provides `ail-cli`.
Close the old process and remove only its owned integration:

```sh
ail-cli unintegrate "/actual/integrated/old.AppImage"
ail-cli integrate "/path/to/new.AppImage"
```

Use the old entry's actual `Exec` path; AppImageLauncher may move the image to
a hash-suffixed filename. Pin the replacement entry. Beside a native package,
AppImageLauncher may suffix the display name with `(1)`; native DEB pins remain
separate. Do not delete unrelated entries or reset the dock. Old pins, duplicate
manual launchers and caches can reference older files; an invisible icon alone
does not identify the failed layer. Without registration, a direct GNOME Wayland
launch may show a technical ID and generic icon. Beside a DEB, prefer the distinct
AppImageLauncher entry: a manual native-ID entry can override the DEB launcher.

## Desktop notification integration

GNOME Shell needs `com.github.among-terminal.desktop` in its application search
path to associate bell notifications with Among. DEB and RPM install it. An extracted
archive or bare AppImage does not. An AppImageLauncher entry named
`appimagekit_…` alone does not match this notification identity.

For an AppImage placed at `~/Applications/among.AppImage`, add a manual entry:

```sh
(
set -e
mkdir -p ~/.local/share/applications ~/.local/share/icons/hicolor/scalable/apps
among_icon_dir=$(mktemp -d "$HOME/Applications/.among-icon.XXXXXX")
trap 'rm -rf -- "$among_icon_dir"' 0
cd "$among_icon_dir"
"$HOME/Applications/among.AppImage" --appimage-extract usr/share/icons/hicolor/scalable/apps/com.github.among-terminal.svg
cp squashfs-root/usr/share/icons/hicolor/scalable/apps/com.github.among-terminal.svg \
  ~/.local/share/icons/hicolor/scalable/apps/
cat > ~/.local/share/applications/com.github.among-terminal.desktop <<EOF_DESKTOP
[Desktop Entry]
Type=Application
Name=Among Terminal
Comment=Organize live terminals in project workspaces
Exec=$HOME/Applications/among.AppImage
Icon=com.github.among-terminal
Terminal=false
Categories=System;TerminalEmulator;
StartupNotify=true
StartupWMClass=among
X-GNOME-UsesNotifications=true
EOF_DESKTOP
)
```

The commands extract the icon in a new temporary directory, stop on failure
and remove only that directory when the subshell exits. If you move the image,
update `Exec=`. This manual entry uses the native package's ID and can override
its launcher if both are installed.

For a binary archive, create `~/.local/share/applications/` and save the same
desktop entry there as `com.github.among-terminal.desktop`. Set `Exec=` to the
absolute path of the archive's `bin/among` executable. For the extraction below,
that is `$HOME/among/bin/among`. Expand `$HOME` to your home directory when
editing the file; desktop entries do not expand shell variables. Skip the
AppImage icon-extraction commands.

`X-GNOME-UsesNotifications=true` makes the entry available in GNOME's notification
settings. Notification clicks target the running application; they do not restart
it. A running notification service accepting a request does not prove that GNOME
displayed a banner.

## Binary archive

An archive contains the same executables as the corresponding DEB, without
bundled libraries or a desktop entry. `INSTALL.txt` lists exact runtime packages
and minimum versions. On Debian 13 or Ubuntu 24.04:

```sh
sudo apt-get install --no-install-recommends libgtk-4-1 libadwaita-1-0 libvte-2.91-gtk4-0 librsvg2-common libgtk-4-media-gstreamer gstreamer1.0-plugins-good
mkdir ~/among
tar -xzf among-terminal-ubuntu24.04-arm64.tar.gz -C ~/among
~/among/bin/among
```

Use a new extraction directory and the archive matching your system.

## Update and remove

There is no Among APT or RPM repository. Updates for both DEB and RPM are manual;
`apt upgrade` or `dnf upgrade` alone will not fetch a new Among release.

Download a newer release and install it the same way. For AppImage, replace
the file and update any launcher that refers to it. For an AppImageLauncher
installation, follow the [upgrade procedure](#upgrading-an-appimagelauncher-installation).
Close and reopen Among to use the new binary. Installation does not close
running terminals for you.

Remove native packages with:

```sh
sudo apt remove among-terminal
sudo dnf remove among
```

Use the first command for DEB and the second for RPM. Delete an AppImage and
its manually added desktop entry and icon to remove it. Delete `~/among` to
remove the archive installed above. Preferences, sessions and separately
installed plugins are preserved.

## What the release checks cover

The DEB and RPM release workflows build and install packages in containers for
each listed distribution and architecture. Their display checks use X11 under
Xvfb.

## Building from source

For source installation and development, follow the
[application build guide](https://github.com/Among-Terminal/among/blob/main/docs/build.md)
and [contributor instructions](https://github.com/Among-Terminal/among/blob/main/CONTRIBUTING.md).
