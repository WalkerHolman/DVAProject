from pathlib import Path

from flask import Flask, send_from_directory


BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "visualizations"

app = Flask(
    __name__,
    static_folder=str(STATIC_DIR),
    static_url_path="/static",
)


@app.route("/")
def index() -> str:
    return send_from_directory(STATIC_DIR, "index.html")


def run() -> None:
    app.run(host="127.0.0.1", port=5000, debug=True)


if __name__ == "__main__":
    run()


