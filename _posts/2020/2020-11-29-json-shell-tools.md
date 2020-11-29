---
layout: post
title: JSON command line tools
categories: ["JSON"]
tags: [mrpowerscripts]
---

So you want to manipulate JSON from the command line? Well, you're in luck! It's 2020, and there are several ways to do this. Also, you're super unlucky. It's 2020, and the entire world is falling apart. But we can still learn about JSON at the command line!

## What is JSON

JSON stands for Javascript Object Notation. It has nothing to do with javascript, even though the name makes it sound related. It's a standard way for formatting data using key-value pairs with various value types. Such as strings, integers, arrays, and objects. JSON has become the defacto format for transmitting structured data between web services. You will likely encounter it when using any web API on the internet.

## Why would you use JSON from the command line

JSON is a general-purpose data format. While predominantly used for communication between web services, it has many other use cases. If you've ever created a nodejs project, you've likely configured your package.json file, which is JSON. Many programming languages like Python and Javascript can parse JSON into native objects of the respective language, but it's not convenient to write a script to work with JSON all the time. There are times where you may want to curl data from a web service and inspect or manipulate it from the command line. It's much more convenient this way. Also, maybe you're writing a bash script where native command-line tools are preferable to calling additional scripts. There are probably many other examples of reasons to work with JSON from the command line - but the biggest question is: What is the best way to do it?

## How to work with JSON at the command line with Powershell

If you have Powershell installed on Windows or Linux, this is the easiest way to work with JSON at the command line. Powershell has a cmdlet called `ConvertFrom-Json` to turn JSON data into a Powershell object, which you can then interact with from the command line like any other Powershell object. Here's a oneliner to try it yourself `$json = Invoke-WebRequest https://reddit.com/.json | select -ExpandProperty content | ConvertFrom-Json`. In this example, we're downloading the Reddit front page data as JSON, which then converts to a Powershell object and stored in the $json variable. Now you can inspect the data in the variable quickly like this: `$json.data.children[0].data`, which will output the first post on the front page.

## How to work with JSON at the command in Linux

The Linux shell handles data as strings, making it awkward to work with structured data like JSON. All sorts of command-line tools are needed to interact with string data like sed, awk, and cut. But even with these tools, it's still tricky to efficiently interact with JSON on the Linux shell. A downloadable command called `jq` comes to the rescue for working with JSON at Linux's command line.

## The jq tool helps you work with JSON data on a Linux command line

The `jq` command is like a function. You give it a JSON input, and based on a string filter, it converts that JSON to the desired output. Let's look at the same example above but using the Linux command line. `json=$(curl -s -L https://reddit.com/.json -H "Accept: application/json" -H "User-Agent: avoid-rate-limit")`. If you `echo` the `$json` variable, you'll see a large string output of the JSON data. Scary! How will we get the same post output as easily as we could with the Powershell object? We can do it with a `jq` filter that looks very much like the Powershell object's notation. `printf '%s' "$json" | jq '.data.children[0].data'`. Rather than echo the contents to the pipeline, we use `printf '%s' "$json" which will not accidentally interpret any newlines in the JSON because it breaks the structure. 

After running this `jq` command, you'll see the same output as we did when we accessed the Powershell object properties. But it's important to remember the Powershell example is an actual object which can be combined with other cmdlets to loop through values, perform arithmetic, or anything else we can do with Powershell objects. In `jq`, the string filter we provide has incredible flexibility far beyond the simple example.

For instance, you can use a `,` to combine filters within the filter string. Consider this filter `printf '%s' "$json" | jq '.data.children[0].data,.data.children[4].data.stickied'`. This will output our original top post value as well as one property from the 5th post. `jq` also supports basic arithmetic operators. `printf '%s' "$json" | jq '.data.children[4].data.num_comments+1'`. In this example, we're telling `jq` to access a single property and add one to the outputted value. `jq` also has built-in functions to help with many tasks. For instance let's say we want to get all of the keys for a certain object in a list. `printf '%s' "$json" | jq '.data.children[4].data | keys'`. Like most shells, you can pipeline values using the `|` character. In this example, we're pipelining the 5th post object to the `jq` function called `keys`, which will output a list of the object's keys.

## Which tools should you use to work with JSON at the command line

`jq` is an incredible tool for working with JSON data at the command line. While Powershell might be more comfortable, it's not as readily available as a simple command-line tool, which you can install pretty much anywhere like `jq`. Check out the [jq documentation](https://stedolan.github.io/jq/manual) for all the goodies.