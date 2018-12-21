# Setup

All you need to follow the examples in this book is a working installation of the programming language [julia](https://julialang.org/) and the [Queryverse.jl](https://github.com/queryverse/Queryverse.jl) package. While that is technically all you need, I would also recommend that you install [VS Code](https://code.visualstudio.com/) with the [VS Code julia extension](https://marketplace.visualstudio.com/items?itemName=julialang.language-julia) and [IJulia](https://github.com/JuliaLang/IJulia.jl), the julia kernel for [Jupyter](http://jupyter.org/).

## Installing julia

Installing julia is easy: you just download a version for your computer from the [julia language website](https://julialang.org/downloads/) and then install it on your machine. Once you have installed julia, try to start it. You should see the julia REPL: a command line at which you can enter julia code and execute it by pressing `Enter`.

All examples in this book are based on julia 1.0 or newer.

## Installing the Queryverse.jl package

Once julia is installed, just start it and enter the following command in the Pkg REPL-mode:

```julia
pkg> add Queryverse
```

This will install the [Queryverse.jl](https://github.com/queryverse/Queryverse.jl) package onto your system. The [Queryverse.jl](https://github.com/queryverse/Queryverse.jl) package is a meta-package that pulls in a large number of other packages that you need to run the code examples in this book. You could install all of these packages one-by-one manually, but it is much easier to just install (and later use) the [Queryverse.jl](https://github.com/queryverse/Queryverse.jl) package instead and not worry about those details.
