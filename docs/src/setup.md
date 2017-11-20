# Setup

All you need to follow the examples in this book is a working
installation of the programming language [julia](https://julialang.org/)
and the [Queryverse.jl](https://github.com/davidanthoff/Queryverse.jl)
package. While that is technically all you need, I would also recommend
that you install [VS Code](https://code.visualstudio.com/) with the [VS
Code julia
extension](https://marketplace.visualstudio.com/items?itemName=julialang.language-julia)
and [IJulia](https://github.com/JuliaLang/IJulia.jl), the julia kernel
for [Jupyter](http://jupyter.org/).

## Installing julia

Installing julia is easy: you just download a version for your computer
from the [julia language website](https://julialang.org/downloads/) and
then install it on your machine. Once you have installed julia, try to
start it. You should see the julia REPL: a command line at which you can
enter julia code and execute it by pressing `Enter`.

All examples in this book are based on julia 0.6.x.

## Installing the Queryverse.jl package

Once julia is installed, just start it and enter the following command
at the REPL:
```julia
julia> Pkg.clone("https://github.com/davidanthoff/Queryverse.jl")
```
This will install the
[Queryverse.jl](https://github.com/davidanthoff/Queryverse.jl) package
onto your system. The
[Queryverse.jl](https://github.com/davidanthoff/Queryverse.jl) package is
a meta-package that pulls in a large number of other packages that you
need to run the code examples in this book. You could install all of
these packages one-by-one manually, but it is much easier to just
install (and later use) the
[Queryverse.jl](https://github.com/davidanthoff/Queryverse.jl) package
instead and not worry about those details.

!!! note

    The name "Queryverse" is not final and I am looking for a better
    name. Ideas and suggestions are welcome!
