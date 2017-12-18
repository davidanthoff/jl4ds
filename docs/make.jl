using Documenter

makedocs(
    format = :html,
    sitename = "Julia for Data Science",
    pages = [
        "index.md",
        "setup.md",
        "fileio.md",
        "iterabletables.md"
    ]
)

deploydocs(
    repo   = "github.com/davidanthoff/jl4ds",
    target = "build",
    deps   = nothing,
    make   = nothing,
    julia  = "0.6"
)
