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
You can also use the pipe syntax to achieve the same result:
```julia
using Dataverse

df = load("mydata.csv") |> DataFrame
```
The pipe syntax is particularly useful when you want to apply some data
transformation to the data that you are loading. For example, you can
filter the data before you materialize into a `DataFrame` like this:
```julia
using Dataverse

df = load("mydata.csv") |> @filter(_.age>20) |> DataFrame
```
The `load` function can load many different tabular file formats. The
following code loads an Excel file:
```julia
using Dataverse

df = load("mydata.xlsx", "Sheet1") |> DataFrame
```
Note how we have to pass the name of the sheet to read as a second
argument to the `load` function for Excel files.

A full list of supported file formats is provided later in this chapter.

### Saving Data

The `save` function from the [FileIO.jl](https://github.com/JuliaIO/FileIO.jl)
package is the main function to save tabular data to disc. The first
argument to the `save` function is the filename you want to use for the
data. The file extension of that filename will determine in what format
the data will be written to disc. The second argument is the table you want
to write to disc. Here is a simple example that writes some data to a
CSV file:
```julia
using Dataverse

df = DataFrame(Name=["Jim", "Sally", "John"], Age=[23., 56., 34.])

save("mydata.csv", df)
```
You can also use the pipe syntax with the `save` function:
```julia
using Dataverse

df = DataFrame(Name=["Jim", "Sally", "John"], Age=[23., 56., 34.])

df |> save("mydata.csv")
```
The `save` function works with any tabular data structure, not just
`DataFrame`s and it supports many different file formats. The following
code shows how you can load data fro a CSV file, filter it and then write
it out directly as a Feather file, without ever materializing it into a
`DataFrame`:
```julia
using Dataverse

load("mydata.csv") |> @filter(_.age>23) |> save("mydata.feather")
```
