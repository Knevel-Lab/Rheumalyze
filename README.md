# Rheumalyze

This project provides a client-based webtool tool that classifies rheumatoid arthritis into four distinct phenotypes based on initial clinical presentation, that were primarily characterized by their unique joint involvement pattern (JIP): feet, oligoarticular, hand, and polyarticular distribution.

## Features

-   Runs locally (your data never leaves your PC)
-   Interactive visualizations
-   Upload a CSV with multiple patients (Or enter a single patient for clustering)

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/Knevel-Lab/Rheumalyze.git
    ```
2. Navigate to the project directory:
    ```
    cd Rheumalyze
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Run development server

    ```
    npm run dev
    ```

5. (optional) Export to static HTML/CSS/JS
    ```
    npm run build
    ```

## References

1. Maarseveen, T.D., Maurits, M.P., Coletto, L.A. et al. Location and amount of joint involvement differentiates rheumatoid arthritis into different clinical subsets. npj Digit. Med. 8, 623 (2025). https://doi.org/10.1038/s41746-025-01997-1

## Note: Latent factors

You can also download the raw latent factor coordinates directly after a run instead of using the hard cluster labels. Since these coordinates are not stored after the session ends, download them as a CSV (bottom of the page) immediately after the analysis completes.
