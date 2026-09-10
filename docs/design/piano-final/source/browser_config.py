"""Use an explicitly configured, installed, or Playwright-managed Chromium."""
import os
import shutil
import sys
from pathlib import Path


def chromium_options():
    override = os.environ.get("PIANO_CHROMIUM_PATH")
    if override and not Path(override).is_file():
        raise FileNotFoundError("PIANO_CHROMIUM_PATH does not point to a browser executable")
    executable = override or shutil.which("chromium") or shutil.which("chromium-browser") or shutil.which("google-chrome")
    options = {"headless": True}
    if executable:
        options["executable_path"] = executable
    if sys.platform.startswith("linux") and getattr(os, "geteuid", lambda: -1)() == 0:
        options["args"] = ["--no-sandbox"]
    return options
