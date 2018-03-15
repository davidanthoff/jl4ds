# Advanced - TableTraits.jl

This chapter describes the internals of various table interfaces that are defined in the [TableTraits.jl](https://github.com/davidanthoff/TableTraits.jl) package. Most data science users do not need to read this chapter, it mostly targets developers that want to integrate their own packages with the ecosystem of packages described in this book.

## Overivew

The [TableTraits.jl](https://github.com/davidanthoff/TableTraits.jl) defines three interfaces that a table can implement: the iterable tables interface, the columns-copy interface and the columns-view interface. A function that accepts a table as an argument can then use these interfaces to access the data in the table. By accessing the data in the table via one of these three interfaces, the function can interact with many different types of tables, without taking a dependency on any specific table implementation.

While the three table interfaces are entirely independent from each other, one of the three is more equal than the others: any table that wants to participate in the Queryverse ecosystem *must* implement the iterable tables interface, and every function that accepts a table as an argument *must* be able to access the data from that table via the iterable tables interface. The iterable tables interface is thus the most fundamental and basic of the three interfaces that any implementation must support. The two other interfaces (columns-copy and columns-view) are more specialized, but can provide much better performance in certain situations. Tables and table consumers *may* support those interfaces in addition to the iterable tables interface.

## The iterable tables interface

### Specification

The iterable table interface has two core parts:

1. A simple way for a type to signal that it is an iterable table. It also provides a way for consumers of an iterable table to check whether a particular value is an iterable table and a convention on how to start the iteration of the table.
2. A number of conventions how tabular data should be iterated.

In addition, [TableTraits.jl](https://github.com/davidanthoff/TableTraits.jl) provides a number of small helper functions that make it easier to implement an iterable table consumer.

#### Signaling and detection of iterable tables

In general a type is an iterable table if it can be iterated and if the element type that is returned during iteration is a `NamedTuple`.

In a slight twist of the standard julia iteration interface, iterable tables introduces one extra step into this simple story: consumers should never iterate a data source directly by calling the `start` function on it, instead they should always call `IteratorInterfaceExtensions.getiterator` on the data source, and then use the standard julia iterator protocol on the value return by `IteratorInterfaceExtensions.getiterator`. This function is defined in the [IteratorInterfaceExtensions.jl](https://github.com/davidanthoff/IteratorInterfaceExtensions.jl) package.

This indirection enables us to implement type stable iterator functions `start`, `next` and `done` for data sources that don't incorporate enough information in their type for type stable versions of these three functions (e.g. `DataFrame`s). [IteratorInterfaceExtensions.jl](https://github.com/davidanthoff/IteratorInterfaceExtensions.jl) provides a default implementation of `IteratorInterfaceExtensions.getiterator` that just returns that data source itself. For data sources that have enough type information to implement type stable versions of the iteration functions, this default implementation of `IteratorInterfaceExtensions.getiterator` works well. For other types, like `DataFrame`, package authors can provide their own `IteratorInterfaceExtensions.getiterator` implementation that returns a value of some new type that has enough information encoded in its type parameters so that one can implement type stable versions of `start`, `next` and `done`.

The function `IteratorInterfaceExtensions.isiterable` enables a consumer to check whether any arbitrary value is iterable, in the sense that `IteratorInterfaceExtensions.getiterator` will return something that can be iterated. The default `IteratorInterfaceExtensions.isiterable(x::Any)` implementation checks whether a suitable `start` method for the type of `x` exists. Types that use the indirection described in the previous paragraph might not implement a `start` method, though. Instead they will return a type for which `start` is implemented from the `IteratorInterfaceExtensions.getiterator` function. Such types should manually add a method to `IteratorInterfaceExtensions.isiterable` that returns `true` for values of their type, so that consumers can detect that a call to `IteratorInterfaceExtensions.getiterator` is going to be successful.

The final function in the detection and signaling interface of iterable tables is `TableTraits.isiterabletable(x)`. This function is defined in the [TableTraits.jl](https://github.com/davidanthoff/TableTraits.jl) package. The fallback implementation for this method will check whether `IteratorInterfaceExtensions.isiterable(x)` returns `true`, and whether `eltype(x)` returns a `NamedTuple`. For types that don't provide their own `IteratorInterfaceExtensions.getiterator` method this will signal the correct behavior to consumers. For types that use the indirection method described above by providing their own `IteratorInterfaceExtensions.getiterator` method, package authors should provide their own `TableTraits.isiterabletable` method that returns `true` if that data source will iterate values of type `NamedTuples` from the value returned by `IteratorInterfaceExtensions.getiterator`.

#### Iteration conventions

Any iterable table should return elements of type `NamedTuple`. Each column of the source table should be encoded as a field in the named tuple, and the type of that field in the named tuple should reflect the data type of the column in the table. If a column can hold missing values, the type of the corresponding field in the `NamedTuple` should be a `DataValue{T}` where `T` is the data type of the column. The `NamedTuple` type is defined in the [NamedTuples.jl](https://github.com/blackrock/NamedTuples.jl) package, and the `DataValue` is defined in the [DataValues.jl](https://github.com/davidanthoff/DataValues.jl) package.

### Integration Guide

This section describes how package authors can integrate their own packages with the iterable tables ecosystem. Specifically, it explains how one can turn a type into an iterable table and how one can write code that consumes iterable tables.

The code that integrates a package with the iterable tables ecosystem should live in the repository of that package. For example, if `Foo.jl` wants to be integrated with the iterable tables ecosystem, one should add the necessary code to the `Foo.jl` repository.

#### Consuming iterable tables

One cannot dispatch on an iterable table because iterable tables don't have a common super type. Instead one has to add a method that takes a value of any type as an argument to consume an iterable table. For conversions between types it is recommended that one adds a constructor that takes one argument without any type restriction that can convert an iterable table into the target type. For example, if one has added a new table type called `MyTable`, one would add a constructor with this method signature for this type: `function MyTable(iterable_table)`. For other situations, for example a plotting function, one also would add a method without any type restriction, for example `plot(iterable_table)`.

The first step inside any function that consumes iterable tables is to check whether the argument that was passed is actually an iterable table or not. This can easily be done with the `TableTraits.isiterabletable` function. For example, the constructor for a new table type might start like this:
```julia
function MyTable(source)
    TableTraits.isiterabletable(source) || error("Argument is not an iterable table.")

    # Code that converts things follows
end
```
Once it has been established that the argument is actually an iterable table there are multiple ways to proceed. The following two sections describe three options, which one is appropriate for a given situation depends on a variety of factors.

##### Reusing an existing consumer of iterable tables

This option is by far the simplest way to add support for consuming an iterable table. Essentially the strategy is to reuse the conversion implementation of some other type. For example, one can simply convert the iterable table into a `DataFrame` right after one has checked that the argument of the function is actually an iterable table. Once the iterable table is converted to a `DataFrame`, one can use the standard API of `DataFrame`s to proceed. This strategy is especially simple for packages that already support interaction with `DataFrames` (or any of the other table types that support the iterable tables interface). The code for the ``MyTable`` constructor might look like this:
```julia
function MyTable(source)
    TableTraits.isiterabletable(source) || error("Argument is not an iterable table.")

    df = DataFrame(source)
    return MyTable(df)
end
```
This assumes that `MyTable` has another constructor that accepts a `DataFrame`.

While this strategy to consume iterable tables is simple to implement, it leads to a tighter couping than needed in many situations. In particular, a package that follows this strategy will still need a dependency on an existing table type, which is often not ideal. I therefore recommend this strategy only as a first quick-and-dirty way to get compatible with the iterable table ecosystem. The two two options described in the next sections are generally more robust ways to achieve the iterable table integration.

##### Coding a complete conversion

Coding a custom conversion is more work than reusing an existing consumer of iterable tables, but it provides more flexibility.

In general, a custom conversion function also needs to start with a call to `TableTraits.isiterabletable` to check whether one actually has an iterable table. The second step in any custom conversion function is to call the `IteratorInterfaceExtensions.getiterator` function on the iterable table. This will return an instance of a type that implements the standard julia iterator interface, i.e. one can call `start`, `next` and `done` on the instance that is returned by `IteratorInterfaceExtensions.getiterator`. For some iterable tables `IteratorInterfaceExtensions.getiterator` will just return the argument that one has passed to it, but for other iterable tables it will return an instance of a different type.

`IteratorInterfaceExtensions.getiterator` is generally not a type stable function. Given that this function is generally only called once per conversion this hopefully is not a huge performance issue. The functions that really need to be type-stable are `start`, `next` and `done` because they will be called for every row of the table that is to be converted. In general, these three functions will be type stable for the type of the return value of `IteratorInterfaceExtensions.getiterator`. But given that `IteratorInterfaceExtensions.getiterator` is not type stable, one needs to use a function barrier to make sure the three iteration functions are called from a type stable function.

The next step in a custom conversion function is typically to find out what columns the iterable table has. The helper functions `TableTraits.column_types` and `TableTraits.column_names` provide this functionality (note that these are not part of the official iterable tables interface, they are simply helper functions that make it easier to find this information). Both functions need to be called with the return value of ``IteratorInterfaceExtensions.getiterator` as the argument. `TableTraits.column_types` returns a vector of `Type`s that are the element types of the columns of the iterable table. `TableTraits.column_names` returns a vector of `Symbol`s with the names of the columns.

Custom conversion functions can at this point optionally check whether the iterable table implements the `length` function by checking whether `Base.iteratorsize(typeof(iter))==Base.HasLength()` (this is part of the standard iteration protocol). It is important to note that every consumer of iterable tables needs to handle the case where no length information is available, but can provide an additional, typically faster implementation if length information is provided by the source. A typical pattern might be that a consumer can pre-allocate the arrays that should hold the data from the iterable tables with the right size if length information is available from the source.

With all this information, a consumer now typically would allocate the data structures that should hold the converted data. This will almost always be very consumer specific. Once these data structures have been allocated, one can actually implement the loop that iterates over the source rows. To get good performance it is recommended that this loop is implemented in a new function (behind a function barrier), and that the function with the loop is type-stable. Often this will require the use of a generated function that generates code for each column of the source. This can avoid a loop over the columns while one is iterating over the rows. It is often key to avoid a loop over columns inside the loop over the rows, given that columns can have different types, which almost inevitably would lead to a type instability. 

A good example of a custom consumer of an iterable table is the code in the `DataTable` integration.

#### Creating an iterable table source

There are generally two strategies for turning some custom type into an iterable table. The first strategy works if one can implement a type-stable version of `start`, `next` and `done` that iterates elements of type `NamedTuple` directly for the source type. If that is not feasible, the strategy is to create a new iterator type. The following two sections describe both approaches.

##### Directly implementing the julia base iteration trait

This strategy only works if the type that one wants to expose as an iterable table has enough information about the strcuture of the table that one can implement a type stable version of `start`, `next` and `done`. Typically that requires that one can deduce the names and types of the columns of the table purely from the type (and type parameters). For some types that works, but for other types (like `DataFrame`) this strategy won't work.

If the type one wants to expose as an iterable table allows this strategy, the implementation is fairly straightforward: one simple needs to implement the standard julia base iterator interface, and during iteration one should return `NamedTuple`s for each element. The fields in the `NamedTuple` correspond to the columns of the table, i.e. the names of the fields are the column names, and the types of the field are the column types. If the source supports some notion of missing values, it should return `NamedTuples` that have fields of type `DataValue{T}`, where `T` is the data type of the column.

It is important to not only implement `start`, `next` and `end` from the julia iteration protocoll. Iterable tables also always require that `eltype` is implemented. Finally, one should either implement `length`, if the source supports returning the number of rows without expensive computations, or one should add a method `iteratorsize` that returns `SizeUnknown()` for the custom type.

The implementation of a type stable `next` method typically requires the use of generated functions.

##### Creating a custom iteration type

For types that don't have enough information encoded in their type to implement a type stable version of the julia iteration interface, the best strategy is to create a custom iteration type that implements the julia iteration interface and has enough type information.

For example, for the `MyTable` type one might create a new iterator type called `MyTableIterator{T}` that holds the type of the `NamedTuple` that this iterator will return in `T`.

To expose this new iterator type to consumers, one needs to add a method to the `IteratorInterfaceExtensions.getiterator` function. This function takes an instance of the type one wants to expose as an iterable table, and returns a new type that should actually be used for the iteration itself. For example, `function IteratorInterfaceExtensions.getiterator(table::MyTable)` would return an instance of `MyTableIterator{T}`.

In addition to adding a method to `IteratorInterfaceExtensions.getiterator`, one must also add methods to the `IteratorInterfaceExtensions.isiterable` and `TableTraits.isiterabletable` functions for the type one wants to turn into an iterable table, in both cases those methods should return `true`.

The final step is to implement the full julia iteration interface for the custom iterator type that one returned from `IteratorInterfaceExtensions.getiterator`. All the same requirements that were discussed in the previous section apply here as well.

An example of this strategy is the `DataTable` integration.
