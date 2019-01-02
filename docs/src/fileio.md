# Tabular File IO

This chapter will teach you how to read and write data from files. We will limit the discussion to tabular data, i.e. data that has the structure of a table.

## Getting Started

### Loading Data

The main function for reading tabular data from disc is the `load` function from the [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) package. You always pass a filename as the first argument to the `load` function. For some file formats you can also pass additional arguments that control the details of how the data is loaded. You will learn about those additional arguments later in the chapter.

It is often convenient to materialize the data from a tabular file into a data structure like a `DataFrame`. You can do that easily by passing the return value from the `load` function to the `DataFrame` constructor, like this:

```julia
using Queryverse

df = DataFrame(load("mydata.csv"))
```

You can also use the pipe syntax to achieve the same result:

```julia
using Queryverse

df = load("mydata.csv") |> DataFrame
```

The pipe syntax is particularly useful when you want to apply some data transformation to the data that you are loading. For example, you can filter the data before you materialize it into a `DataFrame` like this:

```julia
using Queryverse

df = load("mydata.csv") |> @filter(_.age>20) |> DataFrame
```

The `load` function can load many different tabular file formats. The following code loads an Excel file:

```julia
using Queryverse

df = load("mydata.xlsx", "Sheet1") |> DataFrame
```

Note how we have to pass the name of the sheet to read as a second argument to the `load` function for Excel files.

A full list of supported file formats is provided later in this chapter.

You can also use the `load` function to acquire data from a remote server by passing a URI as the filename. The following code loads a CSV file from a remote server:

```julia
using Queryverse

df = load("https://raw.githubusercontent.com/queryverse/CSVFiles.jl/master/test/data.csv") |> DataFrame
```

### Saving Data

The `save` function from the [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) package is the main function to save tabular data to disc. The first argument to the `save` function is the filename you want to use for the file. The file extension of that filename will determine in what format the data will be written to disc. The second argument is the table you want to write to disc. Here is a simple example that writes some data to a CSV file:

```julia
using Queryverse

df = DataFrame(Name=["Jim", "Sally", "John"], Age=[23., 56., 34.])

save("mydata.csv", df)
```

You can also use the pipe syntax with the `save` function:

```julia
using Queryverse

df = DataFrame(Name=["Jim", "Sally", "John"], Age=[23., 56., 34.])

df |> save("mydata.csv")
```

The `save` function works with any tabular data structure, not just `DataFrame`s and it supports many different file formats. The following code shows how you can load data from a CSV file, filter it and then write it out directly as a Feather file, without ever materializing it into a `DataFrame`:

```julia
using Queryverse

load("mydata.csv") |> @filter(_.age>23) |> save("mydata.feather")
```

For some file formats you can pass additional configuration arguments to the `save` function that control in detail how the file is written to disc. The following example writes a table to disc as a CSV file, but uses a non-standard delimiter character and also does not write a header to the file:

```julia
using Queryverse

df = DataFrame(Name=["Jim", "Sally", "John"], Age=[23., 56., 34.])

df |> save("mydata.csv", delim=';', header=false)
```

## The `load` and `save` function

[TODO]

## CSV Files

[TODO add general description of CSV files]

### Loading CSV Files

If you pass a filename with the extension `*.csv` to the `load` function, [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) will use the [CSVFiles.jl](https://github.com/queryverse/CSVFiles.jl) package to load that file. The package supports filenames that point to a file on your local computer and URLs that point to a file on remote server:

```julia
using Queryverse

# Load a local file
df = load("mycsv.csv") |> DataFrame

# Load a remote file
url = "https://raw.githubusercontent.com/queryverse/CSVFiles.jl/master/test/data.csv"
df = load(url) |> DataFrame
```

#### Delimiter character

By default, CSV files use a comma `,` to separate content in different columns. While that is the most common case, CSV files also sometimes use a different character to separate content in different columns. For example, you might want to read a file that uses a semicolon `;` to separate columns, like the following example:

```
Name;Age
John;34
Sally;52
```

You can tell `load` to use a different character as the delimiter between columns by passing a `Char` value as the second argument to the `load` function:

```julia
using Queryverse

df = load("mycsvfile_with_semicolon.csv", ';') |> DataFrame
```

You can tell `load` to use any character as the column delimiter signal. Another common case besides the semicolon is a tab character (written as `'\t'` in julia).

A special case arises when one or multiple spaces are used to separate columns. If you have a file like that, you can use the `spacedelim=true` argument with the `load` function. For example, say you have a file like this:

```
Name   Age
John   34
Sally  52
```

Note how columns are separated with multiple spaces in this file. You can load this file with the following code:

```julia
using Queryverse

df = load("mycsvfile_with_whitespaces.csv", spacedelim=true) |> DataFrame
```

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
using Queryverse

df = load("myfile.csv", header_exists=false) |> DataFrame
```

The `header_exists=false` keyword argument will cause two things: the first row of the file will now be read as data, i.e. the resulting table will have a first row with data from the first line in the file. Second, the columns will be named by numbers, i.e. the name of the first column will be `1`, the name of the second column `2` and so on, unless you specify custom column names with the `colnames` keyword argument.

The `colnames` keyword argument of the `load` function allows you to specify your own column names. You can use that option to either specify the names of all columns as an array of `String`s, or you can change the name of only a few columns by passing a `Dict`.

When you pass an array of `String`s, you indicate that you want the names in the array to be used as the column names in the resulting table. The following code loads a CSV file and specifies custom column names:

```julia
using Queryverse

df = load("mydata.csv", colnames=["name", "age", "children"]) |> DataFrame
```

When you use the `colnames` argument with `header_exists=true` (or don't specify that keyword argument), the names in `colnames` will replace the names that are loaded from the file.

Sometimes you load some data from a CSV file that has a column header and you want to replace the names of just a few columns. While you could pass an array of `String`s to the `colnames` argument, it would cumbersome: you would have to specify the names of all columns, even the ones that you don't want to rename. In this situation you can pass a `Dict` to the `colnames` argument instead. Each element in the `Dict` is one renaming rule that `load` should apply to the columns it loads from the file. The key for each element specifies which column should be renamed, and the value the new name. The key can be specified either as a `String`, in which case it refers to the column name that is present in the file, or as an `Int`, in which case it refers to the position of the column that should be renamed. The values in the `Dict` always have to be `String`s, i.e. the new names. Note that you cannot pass a `Dict` to `colnames` when you call `load` with `header_exists=false`. The following code example will load a CSV file, and rename the column with the original name "Age" to "age", and the third column to "children". All other columns will keep the names that are specified in the file:

```julia
using Queryverse

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
using Queryverse

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
using Queryverse

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
using Queryverse

df = load("mydata.csv", escapechar='\\')
```

Note how we have to escape the `\` character itself in the julia string: `\` is the julia escape character, and to create a `Char` instance with content `\` we have to write `'\\'`.

### Saving CSV Files

To save a table as a CSV file, call the `save` function with a filename that has a `*.csv` extension. [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) will then use the [CSVFiles.jl](https://github.com/queryverse/CSVFiles.jl) package to save the table. The following example shows how to save a table as a CSV file:

```julia
using Queryverse

df = DataFrame(name=["John", "Sally"], age=[23.,25.])

df |> save("mydata.csv")
```

The `save` function accepts a number of arguments when saving a CSV file that control the precise format of the CSV file that is written.

#### Delimiter character

You can control which character should separate columns in the result file by passing the keyword argument `delim` to the `save` function. The following code uses a semicolon `;` as the column separator character:

```julia
using Queryverse

df = DataFrame(name=["John", "Sally"], age=[23.,25.])

df |> save("mydata.csv", delim=';')
```

#### Header

By default `save` writes the names of the columns as the first line in the CSV file. You can change that behavior by passing the `header=false` keyword argument:

```julia
using Queryverse

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
using Queryverse

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

If you pass a filename with the extension `*.feather` to the `load` function, [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) will use the [FeatherFiles.jl](https://github.com/queryverse/FeatherFiles.jl) package to load that file. The following example demonstrates how you can load a Feather file:

```julia
using Queryverse

# Load a local file
df = load("mydata.feather") |> DataFrame
```

There are no options you can specify when loading a Feather file.

### Saving Feather Files

You can save a table as a Feather file by calling the `save` function with a filename that has the `*.feather` extension. In that case [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) will use the [FeatherFiles.jl](https://github.com/queryverse/FeatherFiles.jl) package to save that file. This example shows you how to save a table as a Feather file:

```julia
using Queryverse

df = DataFrame(name=["John", "Sally"], age=[23.,25.])

df |> save("mydata.feather")
```

No other options can be specified when saving a Feather file.

## Excel Files

[TODO add general description of Excel files]

### Loading Excel Files

You can load both `*.xls` and `*.xlsx` files with `load`. If you pass a filename with one of those extensions to `load`, [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) will use the [ExcelFiles.jl](https://github.com/queryverse/ExcelFiles.jl) package to load those files.

To load an Excel file, you always need to specify either a sheet name or range in addition to the filename itself.

The following example loads the sheet `Sheet1` from an Excel file:

```julia
using Queryverse

df = load("mydata.xlsx", "Sheet1") |> DataFrame
```

When you pass a sheet name to `load` without any other option, it will automatically skip any initial empty rows or columns in the Excel file, and then read the remaining content on the sheet. You can also manually control what data should be read from the sheet by using a number of keyword arguments. The `skipstartrows` argument takes an `Int`, when specified the `load` function will ignore the first `skipstartrows` rows in the file. Note that in this case `load` will no longer attempt to automatically figure out on which row your data is starting in the sheet. The `skipstartcols` option works the same way, but for columns. The `nrows` and `ncols` keyword arguments allow you to specify how many rows and columns you want to read from the sheet. The following example uses all four options to skip the first two rows and first three columns, to then read a table with four rows and five columns:

```julia
using Queryverse

df = load("mydata.xlsx", "Sheet1", skipstartrows=2, skipstartcols=3, nrows=4, ncols=5) |> DataFrame
```

Instead of passing a sheet name to `load`, you can also pass a full Excel range specification. Excel range specifications have the form `Sheetname!CellRef1:CellRef2`. `CellRef1` and `CellRef2` designate the top left and bottom right cell of the rectangle that you want to load. For example, the range specification `Sheet1!B2:D5` denotes the data on `Sheet1` that lies in the rectangle that has cell `B2` as the top left corner and `D5` as the bottom right corner. To load that data with julia you can use this code:

```julia
using Queryverse

df = load("mydata.xlsx", "Sheet1!B2:D5") |> DataFrame
```

Without any other arguments, `load` will assume that the first row in this rectangle contains the columns names of a table. If that is not the case for your data, you can specify the keyword argument `header=false`, in which case `load` will treat the first row in the rectangle specified by the range as data. The columns will get automatically generated names. You can also pass custom column names with the `colnames` keyword argument, which accepts an array of `String`s. If you pass column names via the `colnames` argument with the option `header=true` (the default setting), `load` will ignore the first row in the range specified rectangle and instead use the names you passed in the `colnames` argument. The following code reads data from `Sheet1` in range `A2:C5`, treats the first row as data and assigns custom column names:

```julia
using Queryverse

df = load("mydata.xlsx", "Sheet1!B2:C5", header=false, colnames=["Name", "Age", "Children"]) |> DataFrame
```

### Saving Excel Files

To save a table as an Excel file, call the `save` function with a filename that has a `*.xlsx` extension. [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) will then use the [ExcelFiles.jl](https://github.com/queryverse/ExcelFiles.jl) package to save the table. The following example shows how to save a table as an Excel file:

```julia
using Queryverse

df = DataFrame(name=["John", "Sally"], age=[23.,25.])

df |> save("mydata.xlsx")
```

#### Sheet name

You can specify the name of the sheet in the Excelfile that will receive the table data via the `sheetname` keyword argument of the `save` function. The following code writes the data to a sheet with name `Custom Name`:

```julia
using Queryverse

df = DataFrame(name=["John", "Sally"], age=[23.,25.])

df |> save("mydata.xlsx", sheetname="Custom Name")
```

## Stata, SPSS, and SAS Files

[TODO add general description of stats files]

### Loading Stata, SPSS, and SAS Files

You can load files that were saved in one of the formats of these statistical software packages that have the extension `*.dta`, `*.por`, `*.save` or `*.sas7bdat`. If you call the `load` function with a filename with any of these extensions, [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) will use the [StatFiles.jl](https://github.com/queryverse/StatFiles.jl) package to read those files. The following code example demonstrates how you can read a file in each of these formats:

```julia
using Queryverse

df1 = load("mydata.dta") |> DataFrame

df2 = load("mydata.por") |> DataFrame

df3 = load("mydata.sav") |> DataFrame

df4 = load("mydata.sas7bdat") |> DataFrame
```

There are no further options you can specify when loading one of these files.

## Parquet Files

[TODO add general description of Parquet files]

### Loading Parquet Files

If you pass a filename with the extension `*.parquet` to the `load` function, [FileIO.jl](https://github.com/JuliaIO/FileIO.jl) will use the [ParquetFiles.jl](https://github.com/queryverse/ParquetFiles.jl) package to load that file. The following example demonstrates how you can load a Feather file:

```julia
using Queryverse

# Load a local file
df = load("mydata.parquet") |> DataFrame
```

There are no options you can specify when loading a Parquet file.

## Alternative Packages

This section described how you can use packages from the Queryverse to
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
- [Feather.jl](https://github.com/JuliaData/Feather.jl).
- [FeatherLib.jl](https://github.com/queryverse/FeatherLib.jl) (*).
- [ReadStat.jl](https://github.com/WizardMac/ReadStat.jl) (*).
- [SASLib.jl](https://github.com/tk3369/SASLib.jl).
- [ExcelReaders.jl](https://github.com/queryverse/ExcelReaders.jl) (*).
- [XLSX.jl](https://github.com/felipenoris/XLSX.jl) (*).
- [Taro.jl](https://github.com/aviks/Taro.jl).
- [Bedgraph.jl](https://github.com/CiaranOMara/Bedgraph.jl) (*).
- [DBFTables.jl](https://github.com/JuliaData/DBFTables.jl).
- [RData.jl](https://github.com/JuliaStats/RData.jl).

Note that some of these packages actually power the Queryverse file IO packages, I have denoted those packages with (*).
