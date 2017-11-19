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
filter the data before you materialize it into a `DataFrame` like this:
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

You can also use the `load` function to acquire data from a remote server
by passing a URI as the filename. The following code loads a CSV file
from a remote server:
```julia
using Dataverse

df = load("https://raw.githubusercontent.com/davidanthoff/CSVFiles.jl/master/test/data.csv") |> DataFrame
```

### Saving Data

The `save` function from the [FileIO.jl](https://github.com/JuliaIO/FileIO.jl)
package is the main function to save tabular data to disc. The first
argument to the `save` function is the filename you want to use for the
file. The file extension of that filename will determine in what format
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
code shows how you can load data from a CSV file, filter it and then write
it out directly as a Feather file, without ever materializing it into a
`DataFrame`:
```julia
using Dataverse

load("mydata.csv") |> @filter(_.age>23) |> save("mydata.feather")
```
For some file formats you can pass additional configuration arguments to
the `save` function that control in detail how the file is written to
disc. The following example writes a table to disc as a CSV file, but
uses a non-standard delimeter character and also does not write a
header to the file:
```julia
using Dataverse

df = DataFrame(Name=["Jim", "Sally", "John"], Age=[23., 56., 34.])

df |> save("mydata.csv", delim=';', header=false)
```

## CSV Files

[TODO add general description of CSV files]

### Loading CSV Files

If you pass a filename with the extension `*.csv` to the `load` function, [FileIO.jl]() will use the [CSVFiles.jl]() package to load that file. The package supports filenames that point to a file on your local computer and URLs that point to a file on remote server:
```julia
using Dataverse

# Load a local file
df = load("mycsv.csv") |> DataFrame

# Load a remote file
url = "https://raw.githubusercontent.com/davidanthoff/CSVFiles.jl/master/test/data.csv"
df = load(url) |> DataFrame
```

#### Specifying a different delimter character

By default CSV files use a comma (`,`) to separate content in different columns. While that is the most common case, CSV files often use a different character to separate content in different columns. For example, you might want to read a file like this example that uses a semicolon (`;`) to separate columns:
```
Name;Age
John;34
Sally;52
```
You can tell `load` to use a different character as the delimiter between columns by passing a `Char` value as the second argument to the `load` function:
```julia
using Dataverse

df = load("mycsvfile_with_semicolon.csv", ';') |> DataFrame
```
You can tell `load` to use any character as the column delimiter signal. Another common case besides the semicolon is a tab charachter, which you can pass easily enter as `'\t'`.

#### Column Names



### Saving CSV Files

## Feather Files

[TODO]

## Excel Files

[TODO]

## Stata, SPSS, and SAS Files

[TODO]


## Alternative Packages

This section described how you can use packages from the Dataverse to
load and save data. While those are useful, they are not the only julia
packages that you can use for tabular file IO, in fact there are many other
excellent packages for those tasks. I encourage you to explore those
packages and use them whenever they are a good fit for your work. Here
is an (incomplete) list of other packages you might want to take a look
at:
- [CSV.jl](https://github.com/JuliaData/CSV.jl).
- [uCSV.jl](https://github.com/cjprybol/uCSV.jl).
- [TextParse.jl](https://github.com/JuliaComputing/TextParse.jl) (*).
- [ReadWriteDlm2.jl](https://github.com/strickek/ReadWriteDlm2.jl).
- [Feather.jl](https://github.com/JuliaData/Feather.jl) (*).
- [ReadStat.jl](https://github.com/WizardMac/ReadStat.jl) (*).
- [ExcelReaders.jl](https://github.com/davidanthoff/ExcelReaders.jl) (*).
- [Taro.jl](https://github.com/aviks/Taro.jl).
- [Bedgraph.jl](https://github.com/CiaranOMara/Bedgraph.jl) (*).
- [DBFTables.jl](https://github.com/JuliaData/DBFTables.jl).
- [RData.jl](https://github.com/JuliaStats/RData.jl).
Note that some of these packages actually power the Dataverse file IO
packages, I have denoted those packages with (*).
