# Tabular File IO

This chapter will teach you how to read and write data from files. We will
limit the discussion to tabular data, i.e. data that has the structure of
a table.

## Getting Started

### Loading Data

The main function for reading tabular data from disc is the `load` function
from the [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) package. You
always pass a filename as the first argument to the `load` function. For
some file formats you can also pass additional arguments that control the
details of how the data is loaded. You will learn about those additional
arguments later in the chapter.

It is often convenient to materialize the data from a tabular file into
a data structure like a `DataFrame`. You can do that easily by passing
the return value from the `load` function to the `DataFrame` constructor,
like this:
```julia
using Dataverse

df = DataFrame(load("mydata.csv"))
```
You can of course also use the pipe syntax to achieve the same result:
```julia
using Dataverse

df = load("mydata.csv") |> DataFrame
```
The pipe syntax is particularly useful when you want to apply some data
transformation to the data that you are loading from a file. For example,
you can filter the data before you materialize into a `DataFrame` like
this:
```julia
using Dataverse

df = load("mydata.csv") |> @filter(_.age>20) |> DataFrame
```
The `load` function can load many different tabular file formats. For
example, you can use the following code to load an Excel file:
```julia
using Dataverse

df = load("mydata.xlsx", "Sheet1") |> DataFrame
```
Note how we have to pass the name of the sheet to read as a second
argument to the `load` function for Excel files.
