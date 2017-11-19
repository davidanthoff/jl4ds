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
    "text": "This might eventually turn into a book, who knows. For now it is a work in progress that might be useful to some.This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-nd/4.0/."
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
    "text": "All you need to follow the examples in this book is a working installation of the programming language julia and the Dataverse.jl package. While that is technically all you need, I would also recommend that you install VS Code with the VS Code julia extension and IJulia, the julia kernel for Jupyter."
},

{
    "location": "setup.html#Installing-julia-1",
    "page": "Setup",
    "title": "Installing julia",
    "category": "section",
    "text": "Installing julia is easy: you just download a version for your computer from the julia language website and then install it on your machine. Once you have installed julia, try to start it. You should see the julia REPL: a command line at which you can enter julia code and execute it by pressing Enter.All examples in this book are based on julia 0.6.x."
},

{
    "location": "setup.html#Installing-the-Dataverse.jl-package-1",
    "page": "Setup",
    "title": "Installing the Dataverse.jl package",
    "category": "section",
    "text": "Once julia is installed, just start it and enter the following command at the REPL:julia> Pkg.clone(\"https://github.com/davidanthoff/Dataverse.jl\")This will install the Dataverse.jl package onto your system. The Dataverse.jl package is a meta-package that pulls in a large number of other packages that you need to run the code examples in this book. You could install all of these packages one-by-one manually, but it is much easier to just install (and later use) the Dataverse.jl package instead and not worry about those details.note: Note\nThe name \"Dataverse\" is not final and I am looking for a better name. Ideas and suggestions are welcome!"
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
    "text": "The main function for reading tabular data from disc is the load function from the FileIO.jl package. You always pass a filename as the first argument to the load function. For some file formats you can also pass additional arguments that control the details of how the data is loaded. You will learn about those additional arguments later in the chapter.It is often convenient to materialize the data from a tabular file into a data structure like a DataFrame. You can do that easily by passing the return value from the load function to the DataFrame constructor, like this:using Dataverse\n\ndf = DataFrame(load(\"mydata.csv\"))You can also use the pipe syntax to achieve the same result:using Dataverse\n\ndf = load(\"mydata.csv\") |> DataFrameThe pipe syntax is particularly useful when you want to apply some data transformation to the data that you are loading. For example, you can filter the data before you materialize it into a DataFrame like this:using Dataverse\n\ndf = load(\"mydata.csv\") |> @filter(_.age>20) |> DataFrameThe load function can load many different tabular file formats. The following code loads an Excel file:using Dataverse\n\ndf = load(\"mydata.xlsx\", \"Sheet1\") |> DataFrameNote how we have to pass the name of the sheet to read as a second argument to the load function for Excel files.A full list of supported file formats is provided later in this chapter.You can also use the load function to acquire data from a remote server by passing a URI as the filename. The following code loads a CSV file from a remote server:using Dataverse\n\ndf = load(\"https://raw.githubusercontent.com/davidanthoff/CSVFiles.jl/master/test/data.csv\") |> DataFrame"
},

{
    "location": "fileio.html#Saving-Data-1",
    "page": "Tabular File IO",
    "title": "Saving Data",
    "category": "section",
    "text": "The save function from the FileIO.jl package is the main function to save tabular data to disc. The first argument to the save function is the filename you want to use for the file. The file extension of that filename will determine in what format the data will be written to disc. The second argument is the table you want to write to disc. Here is a simple example that writes some data to a CSV file:using Dataverse\n\ndf = DataFrame(Name=[\"Jim\", \"Sally\", \"John\"], Age=[23., 56., 34.])\n\nsave(\"mydata.csv\", df)You can also use the pipe syntax with the save function:using Dataverse\n\ndf = DataFrame(Name=[\"Jim\", \"Sally\", \"John\"], Age=[23., 56., 34.])\n\ndf |> save(\"mydata.csv\")The save function works with any tabular data structure, not just DataFrames and it supports many different file formats. The following code shows how you can load data from a CSV file, filter it and then write it out directly as a Feather file, without ever materializing it into a DataFrame:using Dataverse\n\nload(\"mydata.csv\") |> @filter(_.age>23) |> save(\"mydata.feather\")For some file formats you can pass additional configuration arguments to the save function that control in detail how the file is written to disc. The following example writes a table to disc as a CSV file, but uses a non-standard delimeter character and also does not write a header to the file:using Dataverse\n\ndf = DataFrame(Name=[\"Jim\", \"Sally\", \"John\"], Age=[23., 56., 34.])\n\ndf |> save(\"mydata.csv\", delim=';', header=false)"
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
    "text": "If you pass a filename with the extension *.csv to the load function, FileIO.jl will use the CSVFiles.jl package to load that file. The package supports filenames that point to a file on your local computer and URLs that point to a file on remote server:using Dataverse\n\n# Load a local file\ndf = load(\"mycsv.csv\") |> DataFrame\n\n# Load a remote file\nurl = \"https://raw.githubusercontent.com/davidanthoff/CSVFiles.jl/master/test/data.csv\"\ndf = load(url) |> DataFrame"
},

{
    "location": "fileio.html#Specifying-a-different-delimter-character-1",
    "page": "Tabular File IO",
    "title": "Specifying a different delimter character",
    "category": "section",
    "text": "By default, CSV files use a comma (,) to separate content in different columns. While that is the most common case, CSV files also sometimes use a different character to separate content in different columns. For example, you might want to read a file that uses a semicolon (;) to separate columns, like the following example:Name;Age\nJohn;34\nSally;52You can tell load to use a different character as the delimiter between columns by passing a Char value as the second argument to the load function:using Dataverse\n\ndf = load(\"mycsvfile_with_semicolon.csv\", ';') |> DataFrameYou can tell load to use any character as the column delimiter signal. Another common case besides the semicolon is a tab character (written as '\\t' in julia)."
},

{
    "location": "fileio.html#Column-Names-1",
    "page": "Tabular File IO",
    "title": "Column Names",
    "category": "section",
    "text": "In most CSV files the first line contains the names of the columns, and subsequent lines the actual data itself. If you call load with no special arguments, it will assume that the first line in the CSV file holds column names. An example of such a CSV file might look like this:Name,Age,Children\n\"John\",23.,1\n\"Sally\",54.,3But sometimes CSV files don't have a special header row with the column names, and instead start with the actual data in the first row, like in this file:\"John\",23.,1\n\"Sally\",54.,3You can indicate this situation by calling the load function with the keyword argument header_exists=false:using Dataverse\n\ndf = load(\"myfile.csv\", header_exists=false) |> DataFrameThe header_exists=false keyword argument will cause two things: the first row of the file will now be read as data, i.e. the resulting table will have a first row with data from the first line in the file. Second, the columns will be named by numbers, i.e. the name of the first column will be 1, the name of the second column 2 and so on, unless you specify custom column names with the colnames keyword argument.The colnames keyword argument of the load function allows you to specify your own column names. You can use that option to either specify the names of all columns as an array of Strings, or you can change the name of only a few columns by passing a Dict.When you pass an array of Strings, you indicate that you want the names in the array to be used as the column names in the resulting table. The following code loads a CSV file and specifies custom column names:using Dataverse\n\ndf = load(\"mydata.csv\", colnames=[\"name\", \"age\", \"children\"]) |> DataFrameWhen you use the colnames argument with header_exists=true (or don't specify that keyword argument), the names in colnames will replace the names that are loaded from the file.Sometimes you load some data from a CSV file that has a column header and you want to replace the names of just a few columns. While you could pass an array of Strings to the colnames argument, it would cumbersome: you would have to specify the names of all columns, even the ones that you don't want to rename. In this situation you can pass a Dict to the colnames argument instead. Each element in the Dict is one renaming rule that load should apply to the columns it loads from the file. The key for each element specifies which column should be renamed, and the value the new name. The key can be specified either as a String, in which case it refers to the column name that is present in the file, or as an Int, in which case it refers to the position of the column that should be renamed. The values in the Dict always have to be Strings, i.e. the new names. Note that you cannot pass a Dict to colnames when you call load with header_exists=false. The following code example will load a CSV file, and rename the column with the original name \"Age\" to \"age\", and the third column to \"children\". All other columns will keep the names that are specified in the file:using Dataverse\n\ndf = load(\"mydata.csv\", colnames=Dict(\"Age\"=>\"age\", 3=>\"children\"))"
},

{
    "location": "fileio.html#Rows-to-Read-1",
    "page": "Tabular File IO",
    "title": "Rows to Read",
    "category": "section",
    "text": "load accepts two keyword arguments that allow you to specify whether all lines in the file should be read or not.With the skiplines_begin argument you can tell load to ignore a certain number of lines at the beginning of the file. This is useful if you have a file like this:# This file was generated on 1/1/2017\n# By John\nName,Age,Children\n\"John\",34.,2\n\"Sally\",23.,1In this example the first two lines in the file contain some meta information that is not part of the table data itself. You can load such a file like this:using Dataverse\n\ndf = load(\"mydata.csv\", skiplines_begin=2) |> DataFrameWith that option, the first two lines will be ignored and the file is treated as if it started in line 3.[TODO There should actually be an option to limit the number of rows that are read]"
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
    "text": "If a CSV file has a column with string data, it should ideally surround the actual string in quotation marks \" or some other quote character. This is important because otherwise such a string column could not contain the character that is used as the delimiter character between columns. A typical example CSV file might look like this:Name,Age\n\"Smith, John\",23.\n\"Smith, Sally\",35.Note that the values in the Name column here contain a comma , which is also the delimiter character between columns in this file. But because the whole string is surrounded by quotation marks \", the CSV reader understands that the comma between the last and first name here is part of the Name column and does not separate the Name from the Age column.Some CSV files use a different character as their quotation character. For example, a file might use single quotation marks ' like in this example:Name,Age\n'Smith, John',23.\n'Smith, Sally',35.The keyword argument quotechar of the load function allows you to specify the quote character used in the file you want to load. The above file could be loaded like this:using Dataverse\n\ndf = load(\"mydata.csv\", quotechar='\\'') |> DataFrameNote how we need to use the julia escape character \\ here to create a Char instance with content '.There is still a problem, though: what if you have a column that sometimes contains the character that is used as the quote character? For that case you can specify an escape character: whenever the escape character followed by the quote character appears in a column, the quote character is not interpreted as the end of the column, but as an appearance of that character in the column itself. An example file might look like this:Text,Number\n\"This text contains a \\\" mark\",23\n\"This line doesn't\",45The content of the first column in the first row here should be read as This text contains a \" mark. You can specify what character is used as the escape character with the escapechar keyword argument:using Dataverse\n\ndf = load(\"mydata.csv\", escapechar='\\\\')Note how we have to escape the \\ character itself in the julia string: \\ is the julia escape character, and to create a Char instance with content \\ we have to write '\\\\'."
},

{
    "location": "fileio.html#Saving-CSV-Files-1",
    "page": "Tabular File IO",
    "title": "Saving CSV Files",
    "category": "section",
    "text": ""
},

{
    "location": "fileio.html#Feather-Files-1",
    "page": "Tabular File IO",
    "title": "Feather Files",
    "category": "section",
    "text": "[TODO]"
},

{
    "location": "fileio.html#Excel-Files-1",
    "page": "Tabular File IO",
    "title": "Excel Files",
    "category": "section",
    "text": "[TODO]"
},

{
    "location": "fileio.html#Stata,-SPSS,-and-SAS-Files-1",
    "page": "Tabular File IO",
    "title": "Stata, SPSS, and SAS Files",
    "category": "section",
    "text": "[TODO]"
},

{
    "location": "fileio.html#Alternative-Packages-1",
    "page": "Tabular File IO",
    "title": "Alternative Packages",
    "category": "section",
    "text": "This section described how you can use packages from the Dataverse to load and save data. While those are useful, they are not the only julia packages that you can use for tabular file IO, in fact there are many other excellent packages for those tasks. I encourage you to explore those packages and use them whenever they are a good fit for your work. Here is an (incomplete) list of other packages you might want to take a look at:CSV.jl.\nuCSV.jl.\nTextParse.jl (*).\nReadWriteDlm2.jl.\nFeather.jl (*).\nReadStat.jl (*).\nExcelReaders.jl (*).\nTaro.jl.\nBedgraph.jl (*).\nDBFTables.jl.\nRData.jl.Note that some of these packages actually power the Dataverse file IO packages, I have denoted those packages with (*)."
},

]}
