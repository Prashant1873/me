#!/usr/bin/env python3
"""
Batch Optimize Project Photos to WebP
Phase 25: PROJ-IMG-01 & PROJ-IMG-02
Converts raw project screenshots in public/images/projects to modern, lightweight WebP
generating both full-size display photos and compact thumbnails.
"""

import os
import sys
import logging
from pathlib import Path
from PIL import Image, ImageOps

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

BASE_DIR = Path(__file__).resolve().parent.parent
PROJECTS_DIR = BASE_DIR / "public" / "images" / "projects"

MAX_FULL_DIMENSION = 1600
MAX_THUMB_DIMENSION = 380
WEBP_QUALITY_FULL = 85
WEBP_QUALITY_THUMB = 82

def process_image(src_path: Path):
    rel_path = src_path.relative_to(PROJECTS_DIR)
    try:
        orig_size = src_path.stat().st_size
        with Image.open(src_path) as img:
            img = ImageOps.exif_transpose(img)
            
            # Format mode conversion
            if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                target_mode = "RGBA"
            else:
                target_mode = "RGB"
            if img.mode != target_mode:
                img = img.convert(target_mode)

            # 1. Full-size WebP
            full_img = img.copy()
            full_img.thumbnail((MAX_FULL_DIMENSION, MAX_FULL_DIMENSION), Image.Resampling.LANCZOS)
            full_out = src_path.with_suffix(".webp")
            full_img.save(full_out, "WEBP", quality=WEBP_QUALITY_FULL, method=6)
            full_size = full_out.stat().st_size

            # 2. Thumbnail WebP
            thumb_img = img.copy()
            thumb_img.thumbnail((MAX_THUMB_DIMENSION, MAX_THUMB_DIMENSION), Image.Resampling.LANCZOS)
            parent_dir = src_path.parent
            base_name = src_path.stem
            if base_name.startswith("thumb_"):
                return
            thumb_out = parent_dir / f"thumb_{base_name}.webp"
            thumb_img.save(thumb_out, "WEBP", quality=WEBP_QUALITY_THUMB, method=6)
            thumb_size = thumb_out.stat().st_size

            reduction = (1 - (full_size / orig_size)) * 100
            logging.info(
                f"Optimized {rel_path} | Orig: {orig_size / 1024:.1f}KB -> Full WebP: {full_size / 1024:.1f}KB ({reduction:.1f}% off), Thumb: {thumb_size / 1024:.1f}KB"
            )
            return orig_size, full_size, thumb_size
    except Exception as e:
        logging.error(f"Failed to process {rel_path}: {e}")
        return None

def main():
    if not PROJECTS_DIR.exists():
        logging.error(f"Projects directory does not exist: {PROJECTS_DIR}")
        sys.exit(1)

    logging.info(f"Scanning project screenshots in {PROJECTS_DIR}...")
    total_orig = 0
    total_full = 0
    total_thumb = 0
    count = 0

    for root, _, files in os.walk(PROJECTS_DIR):
        for f in sorted(files):
            if f.lower().endswith((".png", ".jpg", ".jpeg")):
                if f.startswith("thumb_"):
                    continue
                file_path = Path(root) / f
                res = process_image(file_path)
                if res:
                    orig_s, full_s, thumb_s = res
                    total_orig += orig_s
                    total_full += full_s
                    total_thumb += thumb_s
                    count += 1

    if count > 0:
        total_saved = (1 - (total_full / total_orig)) * 100
        logging.info("=" * 60)
        logging.info(f"Done! Processed {count} project screenshots.")
        logging.info(f"Original total size: {total_orig / (1024 * 1024):.2f} MB")
        logging.info(f"Optimized WebP total size: {total_full / (1024 * 1024):.2f} MB ({total_saved:.1f}% reduction)")
        logging.info(f"Thumbnails WebP total size: {total_thumb / 1024:.1f} KB")
        logging.info("=" * 60)

if __name__ == "__main__":
    main()
