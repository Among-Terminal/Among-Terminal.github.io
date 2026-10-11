#!/usr/bin/env python3
"""Copy the documentation prose from the application repository into the site.

The two repositories hold the same text in different shapes: the application
keeps it under docs/ with links relative to that directory, while the site needs
Jekyll front matter and site-root absolute media paths. Doing that by hand
drifted once already, so the transformation lives here and is applied in one
place.

Run from the site checkout with the application repository available:

    python3 tools/sync-docs.py /path/to/among
"""

import pathlib
import re
import shutil
import sys


def stamp(text: str, slug: str) -> str:
    """Give a page the front matter that makes Jekyll build it as a page."""
    if text.startswith("---"):
        return text
    title = ""
    for line in text.splitlines():
        if line.startswith("# "):
            title = line[2:].strip()
            break
    return f'---\nlayout: default\ntitle: "{title}"\npermalink: /{slug}/\n---\n\n{text}'


def site_paths(text: str) -> str:
    """Rewrite links that only make sense inside the application repository."""
    # A page at /features/ would resolve a relative media path against
    # /features/, so media links become site-root absolute.
    text = re.sub(r"\]\(media/", "](/media/", text)
    text = re.sub(r"\]`media/", "]`/media/", text)
    # The preview gallery is produced by the internal capture harness and is
    # not published, so links to it are dropped rather than left broken.
    text = re.sub(r"\[[^\]]*\]\((?:docs/)?media/features/index\.md\)\s*[·,]?\s*", "", text)
    text = re.sub(r"\(media/features/index\.md\)", "", text)
    return text


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__, file=sys.stderr)
        return 2
    source = pathlib.Path(sys.argv[1]) / "docs"
    target = pathlib.Path(__file__).resolve().parent.parent / "_docs"
    if not source.is_dir():
        print(f"no documentation at {source}", file=sys.stderr)
        return 1

    target.mkdir(exist_ok=True)
    removed = 0
    for existing in target.glob("*.md"):
        if not (source / existing.name).is_file():
            existing.unlink()
            removed += 1
            print(f"removed {existing.name}: not in the application repository")

    for page in sorted(source.glob("*.md")):
        text = site_paths(page.read_text())
        (target / page.name).write_text(stamp(text, page.stem))
    print(f"synchronised {len(list(target.glob('*.md')))} pages, removed {removed}")

    media = source / "media"
    if media.is_dir():
        destination = pathlib.Path(__file__).resolve().parent.parent / "media"
        shutil.rmtree(destination, ignore_errors=True)
        shutil.copytree(media, destination)
        # The capture harness writes its manifests into the media tree; they are
        # internal and must not be published.
        for pattern in ("overview-manifest.json", "features/manifest.json", "features/index.md"):
            (destination / pattern).unlink(missing_ok=True)
        print(f"copied media ({sum(1 for _ in destination.rglob('*') if _.is_file())} files)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())