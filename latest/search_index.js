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
    "text": "By default CSV files use a comma (,) to separate content in different columns. While that is the most common case, CSV files often use a different character to separate content in different columns. For example, you might want to read a file like this example that uses a semicolon (;) to separate columns:Name;Age\nJohn;34\nSally;52You can tell load to use a different character as the delimiter between columns by passing a Char value as the second argument to the load function:using Dataverse\n\ndf = load(\"mycsvfile_with_semicolon.csv\", ';') |> DataFrameYou can tell load to use any character as the column delimiter signal. Another common case besides the semicolon is a tab charachter, which you can pass easily enter as '\\t'."
},

{
    "location": "fileio.html#Column-Names-1",
    "page": "Tabular File IO",
    "title": "Column Names",
    "category": "section",
    "text": ""
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
