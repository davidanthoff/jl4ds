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

## The `load` and `save` function

[TODO]

## CSV Files

[TODO add general description of CSV files]

### Loading CSV Files

If you pass a filename with the extension `*.csv` to the `load` function, [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) will use the [CSVFiles.jl](https://github.com/davidanthoff/CSVFiles.jl) package to load that file. The package supports filenames that point to a file on your local computer and URLs that point to a file on remote server:
```julia
using Dataverse

# Load a local file
df = load("mycsv.csv") |> DataFrame

# Load a remote file
url = "https://raw.githubusercontent.com/davidanthoff/CSVFiles.jl/master/test/data.csv"
df = load(url) |> DataFrame
```

#### Delimter character

By default, CSV files use a comma `,` to separate content in different columns. While that is the most common case, CSV files also sometimes use a different character to separate content in different columns. For example, you might want to read a file that uses a semicolon `;` to separate columns, like the following example:
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
You can tell `load` to use any character as the column delimiter signal. Another common case besides the semicolon is a tab character (written as `'\t'` in julia).

#### Column Names

In most CSV files the first line contains the names of the columns, and subsequent lines the actual data itself. If you call `load` with no special arguments, it will assume that the first line in the CSV file holds column names. An example of such a CSV file might look like this:
```
Name,Age,Children
"John",23.,1
"Sally",54.,3
```
But sometimes CSV files don't have a special header row with the column names, and instead start with the actual data in the first row, like in this file:
```
"John",23.,1
"Sally",54.,3
```
You can indicate this situation by calling the `load` function with the keyword argument `header_exists=false`:
```julia
using Dataverse

df = load("myfile.csv", header_exists=false) |> DataFrame
```
The `header_exists=false` keyword argument will cause two things: the first row of the file will now be read as data, i.e. the resulting table will have a first row with data from the first line in the file. Second, the columns will be named by numbers, i.e. the name of the first column will be `1`, the name of the second column `2` and so on, unless you specify custom column names with the `colnames` keyword argument.

The `colnames` keyword argument of the `load` function allows you to specify your own column names. You can use that option to either specify the names of all columns as an array of `String`s, or you can change the name of only a few columns by passing a `Dict`.

When you pass an array of `String`s, you indicate that you want the names in the array to be used as the column names in the resulting table. The following code loads a CSV file and specifies custom column names:
```julia
using Dataverse

df = load("mydata.csv", colnames=["name", "age", "children"]) |> DataFrame
```
When you use the `colnames` argument with `header_exists=true` (or don't specify that keyword argument), the names in `colnames` will replace the names that are loaded from the file.

Sometimes you load some data from a CSV file that has a column header and you want to replace the names of just a few columns. While you could pass an array of `String`s to the `colnames` argument, it would cumbersome: you would have to specify the names of all columns, even the ones that you don't want to rename. In this situation you can pass a `Dict` to the `colnames` argument instead. Each element in the `Dict` is one renaming rule that `load` should apply to the columns it loads from the file. The key for each element specifies which column should be renamed, and the value the new name. The key can be specified either as a `String`, in which case it refers to the column name that is present in the file, or as an `Int`, in which case it refers to the position of the column that should be renamed. The values in the `Dict` always have to be `String`s, i.e. the new names. Note that you cannot pass a `Dict` to `colnames` when you call `load` with `header_exists=false`. The following code example will load a CSV file, and rename the column with the original name "Age" to "age", and the third column to "children". All other columns will keep the names that are specified in the file:
```julia
using Dataverse

df = load("mydata.csv", colnames=Dict("Age"=>"age", 3=>"children"))
```

#### Rows to Read

`load` accepts two keyword arguments that allow you to specify whether all lines in the file should be read or not.

With the `skiplines_begin` argument you can tell `load` to ignore a certain number of lines at the beginning of the file. This is useful if you have a file like this:
```
# This file was generated on 1/1/2017
# By John
Name,Age,Children
"John",34.,2
"Sally",23.,1
```
In this example the first two lines in the file contain some meta information that is not part of the table data itself. You can load such a file like this:
```julia
using Dataverse

df = load("mydata.csv", skiplines_begin=2) |> DataFrame
```
With that option, the first two lines will be ignored and the file is treated as if it started in line 3.

[TODO There should actually be an option to limit the number of rows that are read]

#### Column Types

[TODO]

#### Quote and Escape Character

If a CSV file has a column with string data, it should ideally surround the actual string in quotation marks `"` or some other quote character. This is important because otherwise such a string column could not contain the character that is used as the delimiter character between columns. A typical example CSV file might look like this:
```
Name,Age
"Smith, John",23.
"Smith, Sally",35.
```
Note that the values in the `Name` column here contain a comma `,` which is also the delimiter character between columns in this file. But because the whole string is surrounded by quotation marks `"`, the CSV reader understands that the comma between the last and first name here is part of the `Name` column and does not separate the `Name` from the `Age` column.

Some CSV files use a different character as their quotation character. For example, a file might use single quotation marks `'` like in this example:
```
Name,Age
'Smith, John',23.
'Smith, Sally',35.
```
The keyword argument `quotechar` of the `load` function allows you to specify the quote character used in the file you want to load. The above file could be loaded like this:
```julia
using Dataverse

df = load("mydata.csv", quotechar='\'') |> DataFrame
```
Note how we need to use the julia escape character `\` here to create a `Char` instance with content `'`.

There is still a problem, though: what if you have a column that sometimes contains the character that is used as the quote character? For that case you can specify an escape character: whenever the escape character followed by the quote character appears in a column, the quote character is not interpreted as the end of the column, but as an appearance of that character in the column itself. An example file might look like this:
```
Text,Number
"This text contains a \" mark",23
"This line doesn't",45
```
The content of the first column in the first row here should be read as `This text contains a " mark`. You can specify what character is used as the escape character with the `escapechar` keyword argument:
```julia
using Dataverse

df = load("mydata.csv", escapechar='\\')
```
Note how we have to escape the `\` character itself in the julia string: `\` is the julia escape character, and to create a `Char` instance with content `\` we have to write `'\\'`.

### Saving CSV Files

To save a table as a CSV file, call the `save` function with a filename that has a `*.csv` extension. [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) will then use the [CSVFiles.jl](https://github.com/davidanthoff/CSVFiles.jl) package to save the table. The following example shows how to save a table as a CSV file:
```julia
using Dataverse

df = DataFrame(name=["John", "Sally"], age=[23.,25.])

df |> save("mydata.csv")
```
The `save` function accepts a number of arguments when saving a CSV file that control the precise format of the CSV file that is written.

#### Delimter character

You can control which character should separate columns in the result file by passing the keyword argument `delim` to the `save` function. The following code uses a semicolon `;` as the column separator character:
```julia
using Dataverse

df = DataFrame(name=["John", "Sally"], age=[23.,25.])

df |> save("mydata.csv", delim=';')
```

#### Header

By default `save` writes the names of the columns as the first line in the CSV file. You can change that behavior by passing the `header=false` keyword argument:
```julia
using Dataverse

df = DataFrame(name=["John", "Sally"], age=[23.,25.])

df |> save("mydata.csv", header=false)
```
This will write a CSV file that looks like this:
```
"John",23.
"Sally",25.
```
#### Quote and Escape Character

The `quotechar` and `escapechar` keyword arguments control how text columns get written to disc. By default `save` will surround any text by double quotation marks `"`, and use a backslash `\` to escape any occurrence of the quote character in the actual text of a column. The following code instead uses plus `+` as the quote character and a forward slash `/` as the escape character:
```julia
using Dataverse

df = DataFrame(name=["John + Jim", "Sally"], age=[23.,25.])

df |> save("mydata.csv", quotechar='+', escapechar='/')
```
This code will write the following CSV file:
```
+name+,+age+
+John /+ Jim+,23.
+Sally+,25.
```

## Feather Files

[TODO add general description of Feather files]

### Loading Feather Files

If you pass a filename with the extension `*.feather` to the `load` function, [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) will use the [FeatherFiles.jl](https://github.com/davidanthoff/FeatherFiles.jl) package to load that file. The following example demonstrates how you can load a Feather file:
```julia
using Dataverse

# Load a local file
df = load("mydata.feather") |> DataFrame
```
There are no options you can specify when loading a Feather file.

### Saving Feather Files

You can save a table as a Feather file by calling the `save` function with a filename that has the `*.feather` extension. In that case [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) will use the [FeatherFiles.jl](https://github.com/davidanthoff/FeatherFiles.jl) package to save that file. This example shows you how to save a table as a Feather file:
```julia
using Dataverse

df = DataFrame(name=["John", "Sally"], age=[23.,25.])

df |> save("mydata.feather")
```
No other options can be specified when saving a Feather file.

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
