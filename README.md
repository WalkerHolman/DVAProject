# DVAProject

DESCRIPTION


INSTALLATION


EXECUTION

## Overview

This project loads Spotify track data from `src/data/spotify_songs.csv`, cleans it with pandas, computes summary statistics, and serves a local web app using Flask. The frontend uses D3 to visualize aggregate metrics by playlist genre.

## Setup

1. Ensure Python 3.10+
2. Create and activate a virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

3. Install dependencies (via `pyproject.toml`)

```bash
pip install -U pip
pip install -e .
```

If you prefer without editable mode:

```bash
pip install .
```

## Run the app

```bash
python -m src.main
```

Then open `http://127.0.0.1:5000/` in your browser.

## Frontend

Single-page app served at `/`. The D3 assets live in `src/visualization/`. There are no additional API endpoints for now.

An example placeholder analysis function `analyze_albums(df)` exists in `src/analysis.py` and currently returns an empty DataFrame.

## Notes

- Data file path: `src/data/spotify_songs.csv`
- You can adjust metrics and aggregations in `src/analysis.py`.