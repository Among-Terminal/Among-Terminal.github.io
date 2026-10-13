---
title: Installing Among Terminal
---

# Installing Among Terminal

Download the file for your system. The links below always fetch the
[latest release](https://github.com/Among-Terminal/among/releases/latest).
No Git, Rust toolchain or compilation is needed.

## Download

Every release carries the same files for x86-64 (`amd64`) and ARM 64-bit
(`arm64`), under names without a version.

| System | x86-64 (`amd64`) | ARM 64-bit (`arm64`) |
| --- | --- | --- |
| Ubuntu 24.04 — DEB | [among-terminal-ubuntu24.04-amd64.deb](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-ubuntu24.04-amd64.deb) | [among-terminal-ubuntu24.04-arm64.deb](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-ubuntu24.04-arm64.deb) |
| Debian 13 — DEB | [among-terminal-debian13-amd64.deb](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-debian13-amd64.deb) | [among-terminal-debian13-arm64.deb](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-debian13-arm64.deb) |
| Fedora 44 — RPM | [among-terminal-fedora44-amd64.rpm](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-fedora44-amd64.rpm) | [among-terminal-fedora44-arm64.rpm](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-fedora44-arm64.rpm) |
| Fedora 43 — RPM | [among-terminal-fedora43-amd64.rpm](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-fedora43-amd64.rpm) | [among-terminal-fedora43-arm64.rpm](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-fedora43-arm64.rpm) |
| Other distributions with glibc 2.39+ — AppImage | [among-terminal-amd64.AppImage](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-amd64.AppImage) | [among-terminal-arm64.AppImage](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-arm64.AppImage) |
| Ubuntu 24.04 — binary archive | [among-terminal-ubuntu24.04-amd64.tar.gz](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-ubuntu24.04-amd64.tar.gz) | [among-terminal-ubuntu24.04-arm64.tar.gz](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-ubuntu24.04-arm64.tar.gz) |
| Debian 13 — binary archive | [among-terminal-debian13-amd64.tar.gz](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-debian13-amd64.tar.gz) | [among-terminal-debian13-arm64.tar.gz](https://github.com/Among-Terminal/among/releases/latest/download/among-terminal-debian13-arm64.tar.gz) |

`uname -m` prints `x86_64` for amd64 and `aarch64` for arm64. Use the package
built for your own distribution release: a Debian package is not a substitute
on Ubuntu or the reverse, and a package for one Fedora release is not a
substitute on another. Earlier versions and their notes are on the
[releases page](https://github.com/Among-Terminal/among/releases).

## Verify the download

Each release also carries
[SHA256SUMS](https://github.com/Among-Terminal/among/releases/latest/download/SHA256SUMS).
Put it next to your downloaded file and run:

```sh
sha256sum --check --ignore-missing SHA256SUMS
```

The line for your file must end in `OK`. Releases are immutable: once
published, their files and tag cannot change. GitHub records an attestation for
each release; with the GitHub CLI,
`gh release verify-asset <tag> <file> --repo Among-Terminal/among` checks a
downloaded file against it.

## Debian and Ubuntu (DEB)

Open a terminal in the download directory and install the file you downloaded:

```sh
sudo apt install ./among-terminal-ubuntu24.04-amd64.deb
```

Keep the `./` prefix: it tells APT to install a local file. APT installs the
libraries Among needs from your distribution repositories.

## Fedora (RPM)

```sh
sudo dnf install ./among-terminal-fedora44-amd64.rpm
```

DNF installs GTK 4, libadwaita, GTK 4 VTE and the icon and settings data from
the Fedora repositories.

After installing the DEB or RPM, start **Among Terminal** from the applications
menu, or run `among`. If a Cargo-built, Snap or source-installed copy is also
present, `/usr/bin/among` starts the package installation explicitly.

## AppImage

An AppImage is one executable file that carries Among together with GTK,
libadwaita, VTE and the libraries they need. It installs nothing. It needs GNU
C library 2.39 or newer; its release checks start it on Debian 13, Ubuntu 24.04
and Fedora 43 on both architectures. Some libraries must come from the host,
including the C and C++ runtime, X11 and XCB, Wayland client, fontconfig and
FreeType; the
[AppImage section of the installation guide](https://github.com/Among-Terminal/among/blob/main/docs/install.md#appimage)
lists all of them with install commands.

Make the file executable and start it:

```sh
chmod +x among-terminal-amd64.AppImage
./among-terminal-amd64.AppImage
```

The AppImage mounts itself with FUSE, which needs `fusermount3` from the
`fuse3` package (`sudo apt-get install fuse3` or `sudo dnf install fuse3`).
Without FUSE it prints `Cannot mount AppImage, please check your FUSE setup`.
Then extract it and start the extracted copy instead:

```sh
./among-terminal-amd64.AppImage --appimage-extract
./squashfs-root/AppRun
```

This creates `squashfs-root/` in the current directory; move or delete it like
any directory. The AppImage does not add itself to the applications menu; the
installation guide linked above shows how to add a menu entry.

## Binary archive

A binary archive holds the same executables as the DEB of the same release,
without a package manager. It is built for one distribution and architecture
and does not bundle libraries: Debian 13 or Ubuntu 24.04 must provide them.

```sh
sudo apt-get install --no-install-recommends libgtk-4-1 libadwaita-1-0 libvte-2.91-gtk4-0 librsvg2-common
mkdir ~/among
tar -xzf among-terminal-ubuntu24.04-amd64.tar.gz -C ~/among
~/among/bin/among
```

`INSTALL.txt` inside the archive lists the exact runtime packages and minimum
versions. The archive adds no applications-menu entry. See the
[binary archive guide](https://github.com/Among-Terminal/among/blob/main/docs/install.md#binary-archive)
for details.

## Update and remove

To update, download the newer release's file and install it the same way:
`sudo apt install ./file.deb` or `sudo dnf upgrade ./file.rpm` with its exact
name; for the AppImage, use the newer file in place of the old one. There is no
Among APT or RPM repository, so `apt upgrade` and `dnf upgrade` never move to a
new version by themselves. Close and reopen Among to use the new version.

```sh
sudo apt remove among-terminal   # DEB
sudo dnf remove among            # RPM
```

To remove the AppImage, delete the file and, if you added them, its desktop
entry and icon. To remove a binary archive, delete `~/among`.

Removal keeps your preferences, sessions and separately installed plugins:
they live in your home directory and belong to the application, not to the
package. A Cargo-built, Snap or source-installed copy is separate and stays
after the package is removed.

## Plugins

Every format ships the example plugins, disabled by default: the DEB and RPM
install them under `/usr/share/among/plugins/`, the binary archive in
`~/among/plugins/`, and the AppImage carries them inside the image in
`usr/share/among/plugins/`. They stay disabled until you install and enable
them as described in [using plugins](/plugins/#installing).

## What the release checks cover

DEB and RPM packages are built and installed for checking on GitHub release
runners, once per distribution and architecture, in fresh containers. The
display backend exercised there is X11 under Xvfb; GNOME and Wayland sessions
are not covered. Nothing here is a claim about distributions, versions or
architectures outside the table above.

## For developers

To compile or modify the application, see [building from source](/build/).
Source compilation is not required to install these packages.
