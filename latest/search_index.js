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
    "text": "This work is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-nd/4.0/."
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
    "text": "The main function for reading tabular data from disc is the load function from the FileIO.jl package. You always pass a filename as the first argument to the load function. For some file formats you can also pass additional arguments that control the details of how the data is loaded. You will learn about those additional arguments later in the chapter.It is often convenient to materialize the data from a tabular file into a data structure like a DataFrame. You can do that easily by passing the return value from the load function to the DataFrame constructor, like this:using Dataverse\n\ndf = DataFrame(load(\"mydata.csv\"))You can of course also use the pipe syntax to achieve the same result:using Dataverse\n\ndf = load(\"mydata.csv\") |> DataFrameThe pipe syntax is particularly useful when you want to apply some data transformation to the data that you are loading from a file. For example, you can filter the data before you materialize into a DataFrame like this:using Dataverse\n\ndf = load(\"mydata.csv\") |> @filter(_.age>20) |> DataFrameThe load function can load many different tabular file formats. For example, you can use the following code to load an Excel file:using Dataverse\n\ndf = load(\"mydata.xlsx\", \"Sheet1\") |> DataFrameNote how we have to pass the name of the sheet to read as a second argument to the load function for Excel files."
},

]}
