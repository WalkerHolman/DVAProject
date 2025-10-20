from pathlib import Path

import pandas as pd


DATA_PATH = Path(__file__).resolve().parent / "data" / "spotify_songs.csv"
NUMERIC_COLUMNS: list[str] = [
    "danceability",
    "energy",
    "key",
    "loudness",
    "mode",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "liveness",
    "valence",
    "tempo",
    "duration_ms",
    "track_popularity",
]


def load_raw_data(csv_path: Path | str = DATA_PATH) -> pd.DataFrame:
    path = Path(csv_path)
    if not path.exists():
        raise FileNotFoundError(f"Data file not found at {path}")
    return pd.read_csv(path)


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    # Parse dates and derive year
    df["track_album_release_date"] = pd.to_datetime(
        df["track_album_release_date"], errors="coerce"
    )
    df["release_year"] = df["track_album_release_date"].dt.year

    # Ensure numeric types (errors coerced to NaN)
    for col in NUMERIC_COLUMNS:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    # Basic trimming/normalization for strings
    for text_col in ["track_name", "track_artist", "playlist_genre", "playlist_subgenre"]:
        if text_col in df.columns:
            df[text_col] = df[text_col].astype(str).str.strip()

    # Drop obviously empty rows (no name or artist)
    df = df.dropna(subset=[c for c in ["track_name", "track_artist"] if c in df.columns])

    return df


def analyze_albums(df: pd.DataFrame) -> pd.DataFrame:
    """
    Generic album-level analysis placeholder.
    Accepts a cleaned DataFrame and returns analyzed album data.
    For now, this returns an empty DataFrame.
    """
    return pd.DataFrame()


