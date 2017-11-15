using Documenter

makedocs(
    format = :html,
    sitename = "Julia for Data Science",
    pages = [
        "index.md",
        "fileio.md"
    ]
)

deploydocs(
    repo   = "github.com/davidanthoff/jl4ds",
    target = "build",
    deps   = nothing,
    make   = nothing,
    julia  = "0.6"
)
