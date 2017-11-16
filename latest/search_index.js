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
    "text": "The main function for reading tabular data from disc is the load function from the FileIO.jl package. You always pass a filename as the first argument to the load function. For some file formats you can also pass additional arguments that control the details of how the data is loaded. You will learn about those additional arguments later in the chapter.It is often convenient to materialize the data from a tabular file into a data structure like a DataFrame. You can do that easily by passing the return value from the load function to the DataFrame constructor, like this:using Dataverse\n\ndf = DataFrame(load(\"mydata.csv\"))You can also use the pipe syntax to achieve the same result:using Dataverse\n\ndf = load(\"mydata.csv\") |> DataFrameThe pipe syntax is particularly useful when you want to apply some data transformation to the data that you are loading. For example, you can filter the data before you materialize into a DataFrame like this:using Dataverse\n\ndf = load(\"mydata.csv\") |> @filter(_.age>20) |> DataFrameThe load function can load many different tabular file formats. The following code loads an Excel file:using Dataverse\n\ndf = load(\"mydata.xlsx\", \"Sheet1\") |> DataFrameNote how we have to pass the name of the sheet to read as a second argument to the load function for Excel files.A full list of supported file formats is provided later in this chapter."
},

{
    "location": "fileio.html#Saving-Data-1",
    "page": "Tabular File IO",
    "title": "Saving Data",
    "category": "section",
    "text": "The save function from the FileIO.jl package is the main function to save tabular data to disc. The first argument to the save function is the filename you want to use for the data. The file extension of that filename will determine in what format the data will be written to disc. The second argument is the table you want to write to disc. Here is a simple example that writes some data to a CSV file:using Dataverse\n\ndf = DataFrame(Name=[\"Jim\", \"Sally\", \"John\"], Age=[23., 56., 34.])\n\nsave(\"mydata.csv\", df)You can also use the pipe syntax with the save function:using Dataverse\n\ndf = DataFrame(Name=[\"Jim\", \"Sally\", \"John\"], Age=[23., 56., 34.])\n\ndf |> save(\"mydata.csv\")The save function works with any tabular data structure, not just DataFrames and it supports many different file formats. The following code shows how you can load data from a CSV file, filter it and then write it out directly as a Feather file, without ever materializing it into a DataFrame:using Dataverse\n\nload(\"mydata.csv\") |> @filter(_.age>23) |> save(\"mydata.feather\")"
},

{
    "location": "fileio.html#Alternative-Packages-1",
    "page": "Tabular File IO",
    "title": "Alternative Packages",
    "category": "section",
    "text": "This section described how you can use packages from the Dataverse to load and save data. While those are useful, they are not the only julia packages that you can use for tabular file IO, in fact there are many other excellent packages for those tasks. I encourage you to explore those packages and use them whenever they are a good fit for your work. Here is an (incomplete) list of other packages you might want to take a look at:CSV.jl.\nuCSV.jl.\nTextParse.jl (*).\nReadWriteDlm2.jl.\nFeather.jl (*).\nReadStat.jl (*).\nExcelReaders.jl (*).\nTaro.jl.\nBedgraph.jl (*).\nDBFTables.jl.\nRData.jl.Note that some of these packages actually power the Dataverse file IO packages, I have denoted those packages with (*)."
},

]}
