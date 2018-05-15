var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Julia for Data Science",
    "title": "Julia for Data Science",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#Julia-for-Data-Science-1",
    "page": "Julia for Data Science",
    "title": "Julia for Data Science",
    "category": "section",
    "text": "This might eventually turn into a book, who knows. For now it is a work in progress that might be useful to some.This book will not teach you about all the packages in the julia data ecosystem. The book describes a particular way to do data science with julia. That approach is based on a family of packages that follow a common philosophy and are tightly integrated with each other. While this makes for a coherent and simple story, it does mean that there is a risk that you are missing out on some great features in other packages if you blindly follow the advice in this book. I try to mitigate this with a section at the end of each chapter that points you towards alternative packages that you can use to achieve similar outcomes as described in that chapter.This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-nd/4.0/."
},

{
    "location": "setup.html#",
    "page": "Setup",
    "title": "Setup",
    "category": "page",
    "text": ""
},

{
    "location": "setup.html#Setup-1",
    "page": "Setup",
    "title": "Setup",
    "category": "section",
    "text": "All you need to follow the examples in this book is a working installation of the programming language julia and the Queryverse.jl package. While that is technically all you need, I would also recommend that you install VS Code with the VS Code julia extension and IJulia, the julia kernel for Jupyter."
},

{
    "location": "setup.html#Installing-julia-1",
    "page": "Setup",
    "title": "Installing julia",
    "category": "section",
    "text": "Installing julia is easy: you just download a version for your computer from the julia language website and then install it on your machine. Once you have installed julia, try to start it. You should see the julia REPL: a command line at which you can enter julia code and execute it by pressing Enter.All examples in this book are based on julia 0.6.x."
},

{
    "location": "setup.html#Installing-the-Queryverse.jl-package-1",
    "page": "Setup",
    "title": "Installing the Queryverse.jl package",
    "category": "section",
    "text": "Once julia is installed, just start it and enter the following command at the REPL:julia> Pkg.clone(\"https://github.com/davidanthoff/Queryverse.jl\")This will install the Queryverse.jl package onto your system. The Queryverse.jl package is a meta-package that pulls in a large number of other packages that you need to run the code examples in this book. You could install all of these packages one-by-one manually, but it is much easier to just install (and later use) the Queryverse.jl package instead and not worry about those details.note: Note\nThe name \"Queryverse\" is not final and I am looking for a better name. Ideas and suggestions are welcome!"
},

{
    "location": "fileio.html#",
    "page": "Tabular File IO",
    "title": "Tabular File IO",
    "category": "page",
    "text": ""
},

{
    "location": "fileio.html#Tabular-File-IO-1",
    "page": "Tabular File IO",
    "title": "Tabular File IO",
    "category": "section",
    "text": "This chapter will teach you how to read and write data from files. We will limit the discussion to tabular data, i.e. data that has the structure of a table."
},

{
    "location": "fileio.html#Getting-Started-1",
    "page": "Tabular File IO",
    "title": "Getting Started",
    "category": "section",
    "text": ""
},

{
    "location": "fileio.html#Loading-Data-1",
    "page": "Tabular File IO",
    "title": "Loading Data",
    "category": "section",
    "text": "The main function for reading tabular data from disc is the load function from the FileIO.jl package. You always pass a filename as the first argument to the load function. For some file formats you can also pass additional arguments that control the details of how the data is loaded. You will learn about those additional arguments later in the chapter.It is often convenient to materialize the data from a tabular file into a data structure like a DataFrame. You can do that easily by passing the return value from the load function to the DataFrame constructor, like this:using Queryverse\n\ndf = DataFrame(load(\"mydata.csv\"))You can also use the pipe syntax to achieve the same result:using Queryverse\n\ndf = load(\"mydata.csv\") |> DataFrameThe pipe syntax is particularly useful when you want to apply some data transformation to the data that you are loading. For example, you can filter the data before you materialize it into a DataFrame like this:using Queryverse\n\ndf = load(\"mydata.csv\") |> @filter(_.age>20) |> DataFrameThe load function can load many different tabular file formats. The following code loads an Excel file:using Queryverse\n\ndf = load(\"mydata.xlsx\", \"Sheet1\") |> DataFrameNote how we have to pass the name of the sheet to read as a second argument to the load function for Excel files.A full list of supported file formats is provided later in this chapter.You can also use the load function to acquire data from a remote server by passing a URI as the filename. The following code loads a CSV file from a remote server:using Queryverse\n\ndf = load(\"https://raw.githubusercontent.com/davidanthoff/CSVFiles.jl/master/test/data.csv\") |> DataFrame"
},

{
    "location": "fileio.html#Saving-Data-1",
    "page": "Tabular File IO",
    "title": "Saving Data",
    "category": "section",
    "text": "The save function from the FileIO.jl package is the main function to save tabular data to disc. The first argument to the save function is the filename you want to use for the file. The file extension of that filename will determine in what format the data will be written to disc. The second argument is the table you want to write to disc. Here is a simple example that writes some data to a CSV file:using Queryverse\n\ndf = DataFrame(Name=[\"Jim\", \"Sally\", \"John\"], Age=[23., 56., 34.])\n\nsave(\"mydata.csv\", df)You can also use the pipe syntax with the save function:using Queryverse\n\ndf = DataFrame(Name=[\"Jim\", \"Sally\", \"John\"], Age=[23., 56., 34.])\n\ndf |> save(\"mydata.csv\")The save function works with any tabular data structure, not just DataFrames and it supports many different file formats. The following code shows how you can load data from a CSV file, filter it and then write it out directly as a Feather file, without ever materializing it into a DataFrame:using Queryverse\n\nload(\"mydata.csv\") |> @filter(_.age>23) |> save(\"mydata.feather\")For some file formats you can pass additional configuration arguments to the save function that control in detail how the file is written to disc. The following example writes a table to disc as a CSV file, but uses a non-standard delimeter character and also does not write a header to the file:using Queryverse\n\ndf = DataFrame(Name=[\"Jim\", \"Sally\", \"John\"], Age=[23., 56., 34.])\n\ndf |> save(\"mydata.csv\", delim=\';\', header=false)"
},

{
    "location": "fileio.html#The-load-and-save-function-1",
    "page": "Tabular File IO",
    "title": "The load and save function",
    "category": "section",
    "text": "[TODO]"
},

{
    "location": "fileio.html#CSV-Files-1",
    "page": "Tabular File IO",
    "title": "CSV Files",
    "category": "section",
    "text": "[TODO add general description of CSV files]"
},

{
    "location": "fileio.html#Loading-CSV-Files-1",
    "page": "Tabular File IO",
    "title": "Loading CSV Files",
    "category": "section",
    "text": "If you pass a filename with the extension *.csv to the load function, FileIO.jl will use the CSVFiles.jl package to load that file. The package supports filenames that point to a file on your local computer and URLs that point to a file on remote server:using Queryverse\n\n# Load a local file\ndf = load(\"mycsv.csv\") |> DataFrame\n\n# Load a remote file\nurl = \"https://raw.githubusercontent.com/davidanthoff/CSVFiles.jl/master/test/data.csv\"\ndf = load(url) |> DataFrame"
},

{
    "location": "fileio.html#Delimter-character-1",
    "page": "Tabular File IO",
    "title": "Delimter character",
    "category": "section",
    "text": "By default, CSV files use a comma , to separate content in different columns. While that is the most common case, CSV files also sometimes use a different character to separate content in different columns. For example, you might want to read a file that uses a semicolon ; to separate columns, like the following example:Name;Age\nJohn;34\nSally;52You can tell load to use a different character as the delimiter between columns by passing a Char value as the second argument to the load function:using Queryverse\n\ndf = load(\"mycsvfile_with_semicolon.csv\", \';\') |> DataFrameYou can tell load to use any character as the column delimiter signal. Another common case besides the semicolon is a tab character (written as \'\\t\' in julia).A special case arises when one or multiple spaces are used to separate columns. If you have a file like that, you can use the spacedelim=true argument with the load function. For example, say you have a file like this:Name   Age\nJohn   34\nSally  52Note how columns are separated with multiple spaces in this file. You can load this file with the following code:using Queryverse\n\ndf = load(\"mycsvfile_with_whitespaces.csv\", spacedelim=true) |> DataFrame"
},

{
    "location": "fileio.html#Column-Names-1",
    "page": "Tabular File IO",
    "title": "Column Names",
    "category": "section",
    "text": "In most CSV files the first line contains the names of the columns, and subsequent lines the actual data itself. If you call load with no special arguments, it will assume that the first line in the CSV file holds column names. An example of such a CSV file might look like this:Name,Age,Children\n\"John\",23.,1\n\"Sally\",54.,3But sometimes CSV files don\'t have a special header row with the column names, and instead start with the actual data in the first row, like in this file:\"John\",23.,1\n\"Sally\",54.,3You can indicate this situation by calling the load function with the keyword argument header_exists=false:using Queryverse\n\ndf = load(\"myfile.csv\", header_exists=false) |> DataFrameThe header_exists=false keyword argument will cause two things: the first row of the file will now be read as data, i.e. the resulting table will have a first row with data from the first line in the file. Second, the columns will be named by numbers, i.e. the name of the first column will be 1, the name of the second column 2 and so on, unless you specify custom column names with the colnames keyword argument.The colnames keyword argument of the load function allows you to specify your own column names. You can use that option to either specify the names of all columns as an array of Strings, or you can change the name of only a few columns by passing a Dict.When you pass an array of Strings, you indicate that you want the names in the array to be used as the column names in the resulting table. The following code loads a CSV file and specifies custom column names:using Queryverse\n\ndf = load(\"mydata.csv\", colnames=[\"name\", \"age\", \"children\"]) |> DataFrameWhen you use the colnames argument with header_exists=true (or don\'t specify that keyword argument), the names in colnames will replace the names that are loaded from the file.Sometimes you load some data from a CSV file that has a column header and you want to replace the names of just a few columns. While you could pass an array of Strings to the colnames argument, it would cumbersome: you would have to specify the names of all columns, even the ones that you don\'t want to rename. In this situation you can pass a Dict to the colnames argument instead. Each element in the Dict is one renaming rule that load should apply to the columns it loads from the file. The key for each element specifies which column should be renamed, and the value the new name. The key can be specified either as a String, in which case it refers to the column name that is present in the file, or as an Int, in which case it refers to the position of the column that should be renamed. The values in the Dict always have to be Strings, i.e. the new names. Note that you cannot pass a Dict to colnames when you call load with header_exists=false. The following code example will load a CSV file, and rename the column with the original name \"Age\" to \"age\", and the third column to \"children\". All other columns will keep the names that are specified in the file:using Queryverse\n\ndf = load(\"mydata.csv\", colnames=Dict(\"Age\"=>\"age\", 3=>\"children\"))"
},

{
    "location": "fileio.html#Rows-to-Read-1",
    "page": "Tabular File IO",
    "title": "Rows to Read",
    "category": "section",
    "text": "load accepts two keyword arguments that allow you to specify whether all lines in the file should be read or not.With the skiplines_begin argument you can tell load to ignore a certain number of lines at the beginning of the file. This is useful if you have a file like this:# This file was generated on 1/1/2017\n# By John\nName,Age,Children\n\"John\",34.,2\n\"Sally\",23.,1In this example the first two lines in the file contain some meta information that is not part of the table data itself. You can load such a file like this:using Queryverse\n\ndf = load(\"mydata.csv\", skiplines_begin=2) |> DataFrameWith that option, the first two lines will be ignored and the file is treated as if it started in line 3.[TODO There should actually be an option to limit the number of rows that are read]"
},

{
    "location": "fileio.html#Column-Types-1",
    "page": "Tabular File IO",
    "title": "Column Types",
    "category": "section",
    "text": "[TODO]"
},

{
    "location": "fileio.html#Quote-and-Escape-Character-1",
    "page": "Tabular File IO",
    "title": "Quote and Escape Character",
    "category": "section",
    "text": "If a CSV file has a column with string data, it should ideally surround the actual string in quotation marks \" or some other quote character. This is important because otherwise such a string column could not contain the character that is used as the delimiter character between columns. A typical example CSV file might look like this:Name,Age\n\"Smith, John\",23.\n\"Smith, Sally\",35.Note that the values in the Name column here contain a comma , which is also the delimiter character between columns in this file. But because the whole string is surrounded by quotation marks \", the CSV reader understands that the comma between the last and first name here is part of the Name column and does not separate the Name from the Age column.Some CSV files use a different character as their quotation character. For example, a file might use single quotation marks \' like in this example:Name,Age\n\'Smith, John\',23.\n\'Smith, Sally\',35.The keyword argument quotechar of the load function allows you to specify the quote character used in the file you want to load. The above file could be loaded like this:using Queryverse\n\ndf = load(\"mydata.csv\", quotechar=\'\\\'\') |> DataFrameNote how we need to use the julia escape character \\ here to create a Char instance with content \'.There is still a problem, though: what if you have a column that sometimes contains the character that is used as the quote character? For that case you can specify an escape character: whenever the escape character followed by the quote character appears in a column, the quote character is not interpreted as the end of the column, but as an appearance of that character in the column itself. An example file might look like this:Text,Number\n\"This text contains a \\\" mark\",23\n\"This line doesn\'t\",45The content of the first column in the first row here should be read as This text contains a \" mark. You can specify what character is used as the escape character with the escapechar keyword argument:using Queryverse\n\ndf = load(\"mydata.csv\", escapechar=\'\\\\\')Note how we have to escape the \\ character itself in the julia string: \\ is the julia escape character, and to create a Char instance with content \\ we have to write \'\\\\\'."
},

{
    "location": "fileio.html#Saving-CSV-Files-1",
    "page": "Tabular File IO",
    "title": "Saving CSV Files",
    "category": "section",
    "text": "To save a table as a CSV file, call the save function with a filename that has a *.csv extension. FileIO.jl will then use the CSVFiles.jl package to save the table. The following example shows how to save a table as a CSV file:using Queryverse\n\ndf = DataFrame(name=[\"John\", \"Sally\"], age=[23.,25.])\n\ndf |> save(\"mydata.csv\")The save function accepts a number of arguments when saving a CSV file that control the precise format of the CSV file that is written."
},

{
    "location": "fileio.html#Delimter-character-2",
    "page": "Tabular File IO",
    "title": "Delimter character",
    "category": "section",
    "text": "You can control which character should separate columns in the result file by passing the keyword argument delim to the save function. The following code uses a semicolon ; as the column separator character:using Queryverse\n\ndf = DataFrame(name=[\"John\", \"Sally\"], age=[23.,25.])\n\ndf |> save(\"mydata.csv\", delim=\';\')"
},

{
    "location": "fileio.html#Header-1",
    "page": "Tabular File IO",
    "title": "Header",
    "category": "section",
    "text": "By default save writes the names of the columns as the first line in the CSV file. You can change that behavior by passing the header=false keyword argument:using Queryverse\n\ndf = DataFrame(name=[\"John\", \"Sally\"], age=[23.,25.])\n\ndf |> save(\"mydata.csv\", header=false)This will write a CSV file that looks like this:\"John\",23.\n\"Sally\",25."
},

{
    "location": "fileio.html#Quote-and-Escape-Character-2",
    "page": "Tabular File IO",
    "title": "Quote and Escape Character",
    "category": "section",
    "text": "The quotechar and escapechar keyword arguments control how text columns get written to disc. By default save will surround any text by double quotation marks \", and use a backslash \\ to escape any occurrence of the quote character in the actual text of a column. The following code instead uses plus + as the quote character and a forward slash / as the escape character:using Queryverse\n\ndf = DataFrame(name=[\"John + Jim\", \"Sally\"], age=[23.,25.])\n\ndf |> save(\"mydata.csv\", quotechar=\'+\', escapechar=\'/\')This code will write the following CSV file:+name+,+age+\n+John /+ Jim+,23.\n+Sally+,25."
},

{
    "location": "fileio.html#Feather-Files-1",
    "page": "Tabular File IO",
    "title": "Feather Files",
    "category": "section",
    "text": "[TODO add general description of Feather files]"
},

{
    "location": "fileio.html#Loading-Feather-Files-1",
    "page": "Tabular File IO",
    "title": "Loading Feather Files",
    "category": "section",
    "text": "If you pass a filename with the extension *.feather to the load function, FileIO.jl will use the FeatherFiles.jl package to load that file. The following example demonstrates how you can load a Feather file:using Queryverse\n\n# Load a local file\ndf = load(\"mydata.feather\") |> DataFrameThere are no options you can specify when loading a Feather file."
},

{
    "location": "fileio.html#Saving-Feather-Files-1",
    "page": "Tabular File IO",
    "title": "Saving Feather Files",
    "category": "section",
    "text": "You can save a table as a Feather file by calling the save function with a filename that has the *.feather extension. In that case FileIO.jl will use the FeatherFiles.jl package to save that file. This example shows you how to save a table as a Feather file:using Queryverse\n\ndf = DataFrame(name=[\"John\", \"Sally\"], age=[23.,25.])\n\ndf |> save(\"mydata.feather\")No other options can be specified when saving a Feather file."
},

{
    "location": "fileio.html#Excel-Files-1",
    "page": "Tabular File IO",
    "title": "Excel Files",
    "category": "section",
    "text": "[TODO add general description of Excel files]"
},

{
    "location": "fileio.html#Loading-Excel-Files-1",
    "page": "Tabular File IO",
    "title": "Loading Excel Files",
    "category": "section",
    "text": "You can load both *.xls and *.xlsx files with load. If you pass a filename with one of those extensions to load, FileIO.jl will use the ExcelFiles.jl package to load those files.To load an Excel file, you always need to specify either a sheet name or range in addition to the filename itself.The following example loads the sheet Sheet1 from an Excel file:using Queryverse\n\ndf = load(\"mydata.xlsx\", \"Sheet1\") |> DataFrameWhen you pass a sheet name to load without any other option, it will automatically skip any initial empty rows or columns in the Excel file, and then read the remaining content on the sheet. You can also manually control what data should be read from the sheet by using a number of keyword arguments. The skipstartrows argument takes an Int, when specified the load function will ignore the first skipstartrows rows in the file. Note that in this case load will no longer attempt to automatically figure out on which row your data is starting in the sheet. The skipstartcols option works the same way, but for columns. The nrows and ncols keyword arguments allow you to specify how many rows and columns you want to read from the sheet. The following example uses all four options to skip the first two rows and first three columns, to then read a table with four rows and five columns:using Queryverse\n\ndf = load(\"mydata.xlsx\", \"Sheet1\", skipstartrows=2, skipstartcols=3, nrows=4, ncols=5) |> DataFrameInstead of passing a sheet name to load, you can also pass a full Excel range specification. Excel range specifications have the form Sheetname!CellRef1:CellRef2. CellRef1 and CellRef2 designate the top left and bottom right cell of the rectangle that you want to load. For example, the range specification Sheet1!B2:D5 denotes the data on Sheet1 that lies in the rectangle that has cell B2 as the top left corner and D5 as the bottom right corner. To load that data with julia you can use this code:using Queryverse\n\ndf = load(\"mydata.xlsx\", \"Sheet1!B2:D5\") |> DataFrameWithout any other arguments, load will assume that the first row in this rectangle contains the columns names of a table. If that is not the case for your data, you can specify the keyword argument header=false, in which case load will treat the first row in the rectangle specified by the range as data. The columns will get automatically generated names. You can also pass custom column names with the colnames keyword argument, which accepts an array of Strings. If you pass column names via the colnames argument with the option header=true (the default setting), load will ignore the first row in the range specified rectangle and instead use the names you passed in the colnames argument. The following code reads data from Sheet1 in range A2:C5, treats the first row as data and assigns custom column names:using Queryverse\n\ndf = load(\"mydata.xlsx\", \"Sheet1!B2:C5\", header=false, colnames=[\"Name\", \"Age\", \"Children\"]) |> DataFrame"
},

{
    "location": "fileio.html#Stata,-SPSS,-and-SAS-Files-1",
    "page": "Tabular File IO",
    "title": "Stata, SPSS, and SAS Files",
    "category": "section",
    "text": "[TODO add general description of stats files]"
},

{
    "location": "fileio.html#Loading-Stata,-SPSS,-and-SAS-Files-1",
    "page": "Tabular File IO",
    "title": "Loading Stata, SPSS, and SAS Files",
    "category": "section",
    "text": "You can load files that were saved in one of the formats of these statistical software packages that have the extension *.dta, *.por, *.save or *.sas7bdat. If you call the load function with a filename with any of these extensions, FileIO.jl will use the StatFiles.jl package to read those files. The following code example demonstrates how you can read a file in each of these formats:using Queryverse\n\ndf1 = load(\"mydata.dta\") |> DataFrame\n\ndf2 = load(\"mydata.por\") |> DataFrame\n\ndf3 = load(\"mydata.sav\") |> DataFrame\n\ndf4 = load(\"mydata.sas7bdat\") |> DataFrameThere are no further options you can specify when loading one of these files."
},

{
    "location": "fileio.html#Parquet-Files-1",
    "page": "Tabular File IO",
    "title": "Parquet Files",
    "category": "section",
    "text": "[TODO add general description of Parquet files]"
},

{
    "location": "fileio.html#Loading-Parquet-Files-1",
    "page": "Tabular File IO",
    "title": "Loading Parquet Files",
    "category": "section",
    "text": "If you pass a filename with the extension *.parquet to the load function, FileIO.jl will use the ParquetFiles.jl package to load that file. The following example demonstrates how you can load a Feather file:using Queryverse\n\n# Load a local file\ndf = load(\"mydata.parquet\") |> DataFrameThere are no options you can specify when loading a Parquet file."
},

{
    "location": "fileio.html#Alternative-Packages-1",
    "page": "Tabular File IO",
    "title": "Alternative Packages",
    "category": "section",
    "text": "This section described how you can use packages from the Queryverse to load and save data. While those are useful, they are not the only julia packages that you can use for tabular file IO, in fact there are many other excellent packages for those tasks. I encourage you to explore those packages and use them whenever they are a good fit for your work. Here is an (incomplete) list of other packages you might want to take a look at:CSV.jl.\nuCSV.jl.\nTextParse.jl (*).\nReadWriteDlm2.jl.\nFeather.jl.\nFeatherLib.jl (*).\nReadStat.jl (*).\nSASLib.jl.\nExcelReaders.jl (*).\nXLSX.jl.\nTaro.jl.\nBedgraph.jl (*).\nDBFTables.jl.\nRData.jl.Note that some of these packages actually power the Queryverse file IO packages, I have denoted those packages with (*)."
},

{
    "location": "tabletraits.html#",
    "page": "Advanced - TableTraits.jl",
    "title": "Advanced - TableTraits.jl",
    "category": "page",
    "text": ""
},

{
    "location": "tabletraits.html#Advanced-TableTraits.jl-1",
    "page": "Advanced - TableTraits.jl",
    "title": "Advanced - TableTraits.jl",
    "category": "section",
    "text": "This chapter describes the internals of various table interfaces that are defined in the TableTraits.jl package. Most data science users do not need to read this chapter, it mostly targets developers that want to integrate their own packages with the ecosystem of packages described in this book."
},

{
    "location": "tabletraits.html#Overivew-1",
    "page": "Advanced - TableTraits.jl",
    "title": "Overivew",
    "category": "section",
    "text": "The TableTraits.jl defines three interfaces that a table can implement: the iterable tables interface, the columns-copy interface and the columns-view interface. A function that accepts a table as an argument can then use these interfaces to access the data in the table. By accessing the data in the table via one of these three interfaces, the function can interact with many different types of tables, without taking a dependency on any specific table implementation.While the three table interfaces are entirely independent from each other, one of the three is more equal than the others: any table that wants to participate in the Queryverse ecosystem must implement the iterable tables interface, and every function that accepts a table as an argument must be able to access the data from that table via the iterable tables interface. The iterable tables interface is thus the most fundamental and basic of the three interfaces that any implementation must support. The two other interfaces (columns-copy and columns-view) are more specialized, but can provide much better performance in certain situations. Tables and table consumers may support those interfaces in addition to the iterable tables interface.The TableTraitsUtils.jl package provides a number of helper functions that make it easier to implement and consume the interfaces described in this package. Most packages that want to integrate with the ecosystem described in this chapter should first check whether any of the helper functions in that package can be used to implement these interfaces, before attempting to folow the guidelines in this chapter to implement these interfaces manually."
},

{
    "location": "tabletraits.html#The-iterable-tables-interface-1",
    "page": "Advanced - TableTraits.jl",
    "title": "The iterable tables interface",
    "category": "section",
    "text": ""
},

{
    "location": "tabletraits.html#Specification-1",
    "page": "Advanced - TableTraits.jl",
    "title": "Specification",
    "category": "section",
    "text": "The iterable table interface has two core parts:A simple way for a type to signal that it is an iterable table. It also provides a way for consumers of an iterable table to check whether a particular value is an iterable table and a convention on how to start the iteration of the table.\nA number of conventions how tabular data should be iterated.In addition, TableTraits.jl provides a number of small helper functions that make it easier to implement an iterable table consumer."
},

{
    "location": "tabletraits.html#Signaling-and-detection-of-iterable-tables-1",
    "page": "Advanced - TableTraits.jl",
    "title": "Signaling and detection of iterable tables",
    "category": "section",
    "text": "In general a type is an iterable table if it can be iterated and if the element type that is returned during iteration is a NamedTuple.In a slight twist of the standard julia iteration interface, iterable tables introduces one extra step into this simple story: consumers should never iterate a data source directly by calling the start function on it, instead they should always call IteratorInterfaceExtensions.getiterator on the data source, and then use the standard julia iterator protocol on the value return by IteratorInterfaceExtensions.getiterator. This function is defined in the IteratorInterfaceExtensions.jl package.This indirection enables us to implement type stable iterator functions start, next and done for data sources that don\'t incorporate enough information in their type for type stable versions of these three functions (e.g. DataFrames). IteratorInterfaceExtensions.jl provides a default implementation of IteratorInterfaceExtensions.getiterator that just returns that data source itself. For data sources that have enough type information to implement type stable versions of the iteration functions, this default implementation of IteratorInterfaceExtensions.getiterator works well. For other types, like DataFrame, package authors can provide their own IteratorInterfaceExtensions.getiterator implementation that returns a value of some new type that has enough information encoded in its type parameters so that one can implement type stable versions of start, next and done.The function IteratorInterfaceExtensions.isiterable enables a consumer to check whether any arbitrary value is iterable, in the sense that IteratorInterfaceExtensions.getiterator will return something that can be iterated. The default IteratorInterfaceExtensions.isiterable(x::Any) implementation checks whether a suitable start method for the type of x exists. Types that use the indirection described in the previous paragraph might not implement a start method, though. Instead they will return a type for which start is implemented from the IteratorInterfaceExtensions.getiterator function. Such types should manually add a method to IteratorInterfaceExtensions.isiterable that returns true for values of their type, so that consumers can detect that a call to IteratorInterfaceExtensions.getiterator is going to be successful.The final function in the detection and signaling interface of iterable tables is TableTraits.isiterabletable(x). This function is defined in the TableTraits.jl package. The fallback implementation for this method will check whether IteratorInterfaceExtensions.isiterable(x) returns true, and whether eltype(x) returns a NamedTuple. For types that don\'t provide their own IteratorInterfaceExtensions.getiterator method this will signal the correct behavior to consumers. For types that use the indirection method described above by providing their own IteratorInterfaceExtensions.getiterator method, package authors should provide their own TableTraits.isiterabletable method that returns true if that data source will iterate values of type NamedTuples from the value returned by IteratorInterfaceExtensions.getiterator."
},

{
    "location": "tabletraits.html#Iteration-conventions-1",
    "page": "Advanced - TableTraits.jl",
    "title": "Iteration conventions",
    "category": "section",
    "text": "Any iterable table should return elements of type NamedTuple. Each column of the source table should be encoded as a field in the named tuple, and the type of that field in the named tuple should reflect the data type of the column in the table. If a column can hold missing values, the type of the corresponding field in the NamedTuple should be a DataValue{T} where T is the data type of the column. The NamedTuple type is defined in the NamedTuples.jl package, and the DataValue is defined in the DataValues.jl package."
},

{
    "location": "tabletraits.html#Integration-Guide-1",
    "page": "Advanced - TableTraits.jl",
    "title": "Integration Guide",
    "category": "section",
    "text": "This section describes how package authors can integrate their own packages with the iterable tables ecosystem. Specifically, it explains how one can turn a type into an iterable table and how one can write code that consumes iterable tables.The code that integrates a package with the iterable tables ecosystem should live in the repository of that package. For example, if Foo.jl wants to be integrated with the iterable tables ecosystem, one should add the necessary code to the Foo.jl repository."
},

{
    "location": "tabletraits.html#Consuming-iterable-tables-1",
    "page": "Advanced - TableTraits.jl",
    "title": "Consuming iterable tables",
    "category": "section",
    "text": "One cannot dispatch on an iterable table because iterable tables don\'t have a common super type. Instead one has to add a method that takes a value of any type as an argument to consume an iterable table. For conversions between types it is recommended that one adds a constructor that takes one argument without any type restriction that can convert an iterable table into the target type. For example, if one has added a new table type called MyTable, one would add a constructor with this method signature for this type: function MyTable(iterable_table). For other situations, for example a plotting function, one also would add a method without any type restriction, for example plot(iterable_table).The first step inside any function that consumes iterable tables is to check whether the argument that was passed is actually an iterable table or not. This can easily be done with the TableTraits.isiterabletable function. For example, the constructor for a new table type might start like this:function MyTable(source)\n    TableTraits.isiterabletable(source) || error(\"Argument is not an iterable table.\")\n\n    # Code that converts things follows\nendOnce it has been established that the argument is actually an iterable table there are multiple ways to proceed. The following two sections describe three options, which one is appropriate for a given situation depends on a variety of factors."
},

{
    "location": "tabletraits.html#Reusing-an-existing-consumer-of-iterable-tables-1",
    "page": "Advanced - TableTraits.jl",
    "title": "Reusing an existing consumer of iterable tables",
    "category": "section",
    "text": "This option is by far the simplest way to add support for consuming an iterable table. Essentially the strategy is to reuse the conversion implementation of some other type. For example, one can simply convert the iterable table into a DataFrame right after one has checked that the argument of the function is actually an iterable table. Once the iterable table is converted to a DataFrame, one can use the standard API of DataFrames to proceed. This strategy is especially simple for packages that already support interaction with DataFrames (or any of the other table types that support the iterable tables interface). The code for the MyTable constructor might look like this:function MyTable(source)\n    TableTraits.isiterabletable(source) || error(\"Argument is not an iterable table.\")\n\n    df = DataFrame(source)\n    return MyTable(df)\nendThis assumes that MyTable has another constructor that accepts a DataFrame.While this strategy to consume iterable tables is simple to implement, it leads to a tighter couping than needed in many situations. In particular, a package that follows this strategy will still need a dependency on an existing table type, which is often not ideal. I therefore recommend this strategy only as a first quick-and-dirty way to get compatible with the iterable table ecosystem. The two two options described in the next sections are generally more robust ways to achieve the iterable table integration."
},

{
    "location": "tabletraits.html#Coding-a-complete-conversion-1",
    "page": "Advanced - TableTraits.jl",
    "title": "Coding a complete conversion",
    "category": "section",
    "text": "Coding a custom conversion is more work than reusing an existing consumer of iterable tables, but it provides more flexibility.In general, a custom conversion function also needs to start with a call to TableTraits.isiterabletable to check whether one actually has an iterable table. The second step in any custom conversion function is to call the IteratorInterfaceExtensions.getiterator function on the iterable table. This will return an instance of a type that implements the standard julia iterator interface, i.e. one can call start, next and done on the instance that is returned by IteratorInterfaceExtensions.getiterator. For some iterable tables IteratorInterfaceExtensions.getiterator will just return the argument that one has passed to it, but for other iterable tables it will return an instance of a different type.IteratorInterfaceExtensions.getiterator is generally not a type stable function. Given that this function is generally only called once per conversion this hopefully is not a huge performance issue. The functions that really need to be type-stable are start, next and done because they will be called for every row of the table that is to be converted. In general, these three functions will be type stable for the type of the return value of IteratorInterfaceExtensions.getiterator. But given that IteratorInterfaceExtensions.getiterator is not type stable, one needs to use a function barrier to make sure the three iteration functions are called from a type stable function.The next step in a custom conversion function is typically to find out what columns the iterable table has. The helper functions TableTraits.column_types and TableTraits.column_names provide this functionality (note that these are not part of the official iterable tables interface, they are simply helper functions that make it easier to find this information). Both functions need to be called with the return value of `IteratorInterfaceExtensions.getiterator as the argument. TableTraits.column_types returns a vector of Types that are the element types of the columns of the iterable table. TableTraits.column_names returns a vector of Symbols with the names of the columns.Custom conversion functions can at this point optionally check whether the iterable table implements the length function by checking whether Base.iteratorsize(typeof(iter))==Base.HasLength() (this is part of the standard iteration protocol). It is important to note that every consumer of iterable tables needs to handle the case where no length information is available, but can provide an additional, typically faster implementation if length information is provided by the source. A typical pattern might be that a consumer can pre-allocate the arrays that should hold the data from the iterable tables with the right size if length information is available from the source.With all this information, a consumer now typically would allocate the data structures that should hold the converted data. This will almost always be very consumer specific. Once these data structures have been allocated, one can actually implement the loop that iterates over the source rows. To get good performance it is recommended that this loop is implemented in a new function (behind a function barrier), and that the function with the loop is type-stable. Often this will require the use of a generated function that generates code for each column of the source. This can avoid a loop over the columns while one is iterating over the rows. It is often key to avoid a loop over columns inside the loop over the rows, given that columns can have different types, which almost inevitably would lead to a type instability. A good example of a custom consumer of an iterable table is the code in the DataTable integration."
},

{
    "location": "tabletraits.html#Creating-an-iterable-table-source-1",
    "page": "Advanced - TableTraits.jl",
    "title": "Creating an iterable table source",
    "category": "section",
    "text": "There are generally two strategies for turning some custom type into an iterable table. The first strategy works if one can implement a type-stable version of start, next and done that iterates elements of type NamedTuple directly for the source type. If that is not feasible, the strategy is to create a new iterator type. The following two sections describe both approaches."
},

{
    "location": "tabletraits.html#Directly-implementing-the-julia-base-iteration-trait-1",
    "page": "Advanced - TableTraits.jl",
    "title": "Directly implementing the julia base iteration trait",
    "category": "section",
    "text": "This strategy only works if the type that one wants to expose as an iterable table has enough information about the strcuture of the table that one can implement a type stable version of start, next and done. Typically that requires that one can deduce the names and types of the columns of the table purely from the type (and type parameters). For some types that works, but for other types (like DataFrame) this strategy won\'t work.If the type one wants to expose as an iterable table allows this strategy, the implementation is fairly straightforward: one simple needs to implement the standard julia base iterator interface, and during iteration one should return NamedTuples for each element. The fields in the NamedTuple correspond to the columns of the table, i.e. the names of the fields are the column names, and the types of the field are the column types. If the source supports some notion of missing values, it should return NamedTuples that have fields of type DataValue{T}, where T is the data type of the column.It is important to not only implement start, next and end from the julia iteration protocoll. Iterable tables also always require that eltype is implemented. Finally, one should either implement length, if the source supports returning the number of rows without expensive computations, or one should add a method iteratorsize that returns SizeUnknown() for the custom type.The implementation of a type stable next method typically requires the use of generated functions."
},

{
    "location": "tabletraits.html#Creating-a-custom-iteration-type-1",
    "page": "Advanced - TableTraits.jl",
    "title": "Creating a custom iteration type",
    "category": "section",
    "text": "For types that don\'t have enough information encoded in their type to implement a type stable version of the julia iteration interface, the best strategy is to create a custom iteration type that implements the julia iteration interface and has enough type information.For example, for the MyTable type one might create a new iterator type called MyTableIterator{T} that holds the type of the NamedTuple that this iterator will return in T.To expose this new iterator type to consumers, one needs to add a method to the IteratorInterfaceExtensions.getiterator function. This function takes an instance of the type one wants to expose as an iterable table, and returns a new type that should actually be used for the iteration itself. For example, function IteratorInterfaceExtensions.getiterator(table::MyTable) would return an instance of MyTableIterator{T}.In addition to adding a method to IteratorInterfaceExtensions.getiterator, one must also add methods to the IteratorInterfaceExtensions.isiterable and TableTraits.isiterabletable functions for the type one wants to turn into an iterable table, in both cases those methods should return true.The final step is to implement the full julia iteration interface for the custom iterator type that one returned from IteratorInterfaceExtensions.getiterator. All the same requirements that were discussed in the previous section apply here as well.An example of this strategy is the DataTable integration."
},

{
    "location": "tabletraits.html#The-columns-copy-interface-[experimental]-1",
    "page": "Advanced - TableTraits.jl",
    "title": "The columns-copy interface [experimental]",
    "category": "section",
    "text": "Note that this interface is still experimental and might change in the future."
},

{
    "location": "tabletraits.html#Specification-2",
    "page": "Advanced - TableTraits.jl",
    "title": "Specification",
    "category": "section",
    "text": "The columns-copy interface consists of only two functions: TableTraits.supports_get_columns_copy (to check whether a table supports this interface) and TableTraits.get_columns_copy (to get a copy of all the columns in the table).This interface allows a consumer of a table to obtain a copy of the data in a table. The copy will consist of one vector for each column of the source table. The key feature of this interface is that the consumer of this interface will \"own\" the vectors that are obtained via this interface. The consumer can modify, delete or do anything else with the vectors returned from this interface. This implies that a source that returns columns via this interface should not hold onto the actual vectors that it returns via this interface.The TableTraits.supports_get_columns_copy function accepts one argument that has to be a table. It will return true or false, depending on whether the table supports the columns-copy interface or not.The TableTraits.get_columns_copy function also accepts one argument that is a table. It returns a NamedTuple with one field for each column in the source table. Each field should hold a vector with the actual values for that column.If the source table supports a notion of missing data in a column, it should return a DataValueVector from the DataValues.jl package for such columns."
},

{
    "location": "tabletraits.html#The-columns-view-interface-1",
    "page": "Advanced - TableTraits.jl",
    "title": "The columns-view interface",
    "category": "section",
    "text": ""
},

{
    "location": "tabletraits.html#Specification-3",
    "page": "Advanced - TableTraits.jl",
    "title": "Specification",
    "category": "section",
    "text": "The columns-view interface consists of only two functions: TableTraits.supports_get_columns_view (to check whether a table supports this interface) and TableTraits.get_columns_view (to get a view into the source table).This interface allows a consumer of a table to get access to the columns in a table via a standardized interface. In particular, a consumer can obtain a NamedTuple of columns from a source table that give access to the data in the source table. The key feature of this interface is that the consumer is only allowed to read data from the arrays returned by this interface. The consumer must not attempt to modify the content of the source table via the arrays that were returned from this interface. A source should in general not make copies of the data if it implements this interface. In essence this interface gives a read-only view into a table that a consumer can use to access any cell in a table.The TableTraits.supports_get_columns_view function accepts one argument that has to be a table. It will return true or false, depending on whether the table supports the columns-view interface or not.The TableTraits.get_columns_view function also accepts one argument that is a table. It returns a NamedTuple with one field for each column in the source table. Each field should hold a vector with the actual values for that column.If the source table supports a notion of missing data in a column, the eltype of the vector for that column must be of type DataValue."
},

{
    "location": "tabletraits.html#The-TableTraitsUtils.jl-package-1",
    "page": "Advanced - TableTraits.jl",
    "title": "The TableTraitsUtils.jl package",
    "category": "section",
    "text": "[TODO]"
},

]}
