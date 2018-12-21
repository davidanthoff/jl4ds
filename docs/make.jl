using Documenter

makedocs(
    sitename = "Julia for Data Science",
    pages = [
        "index.md",
        "setup.md",
        "fileio.md",
        "tabletraits.md"
    ]
)

deploydocs(
    repo   = "github.com/davidanthoff/jl4ds"
)
