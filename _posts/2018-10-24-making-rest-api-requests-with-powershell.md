---
layout: post
title: Send GET requests to API with Powershell
date: 2018-10-24 13:00:45+00
tags: [mrpowerscripts, PowerShell, how do I make a rest API request, restful API, make rest API request in Powershell, Powershell API request]
description-long: When I started learning Powershell web technologies were much of a mystery for me. I was a simple systems admin trying to make my life easier by automating things. Sure, I knew how to create a simple HTML site with some CSS, but even basic javascript was well beyond my understanding. Though over time I developed an interest in developing for the web, which spurred me to learn how Powershell can interact with things beyond my computer or local network. How can I scrape a website with Powershell? How can I access an API? How can I send data from my computer to services on the web? I had so many questions for a long time. 
---

When I started learning Powershell web technologies were mostly a mystery for me. I was a simple systems admin trying to make my life easier by automating things. Sure, I knew how to create a basic HTML site with some CSS, but even javascript was well beyond my understanding. Though over time I developed an interest in developing for the web, which spurred me to learn how Powershell can interact with things beyond my computer or local network. {% include youtubePlayer.html id="7mEmQgGowMY" %} How can I scrape a website with Powershell? How can I access an API? How can I send data from my computer to services on the web? I had so many questions for a long time.

{% include youtubePlayer.html id="9piyM38it_8" %}

I discovered the concept of an API and found it absolutely amazing. Having a standard way for different computers with different operating systems running different programs build with different code sounded so cool. I don't need a browser to interact with this website? That's amazing! Think of all the automation possibilities!

Eventually, I found out about RESTful or a REST API design. Through the process of learning about REST APIs, I discovered the JSON data format. As someone who had to work a lot with verbose XML files for configuration data and data transfer, it looked like an amazing alternative.  Once I learned a bit more about what a REST API is and how to format data as JSON it opened up this new world of communicating with other systems through the web.

I was able to use Invoke-WebRequest in Powershell to GET or POST data from various API resources. I looked around for all kinds of APIs on the internet to see what I could do with them. That encouraged me to learn how to make my own API interfaces. Which I eventually managed to do using tools like Flask with Python and ExpressJS with NodeJS.

The Powershell cmdlet Invoke-WebRequest automatically turned JSON objects from GET requests into Powershell Objects which made it super easy to inspect and play around with the data from the command line. Making it super easy to test and play around with the data I was passing through the APIs I made.

Eventually, request tools like Postman and Insomnia became popular, and I generally steered away from using Windows while developing. When all of my web work started though Powershell was there to help me along, and I still think it's a really great tool for quickly scripting and working with data at the command line. Objects are awesome.

I've linked above the two videos I made about using Invoke-WebRequest to make Get and Post requests. Those two are all you need to get started with the fun world of APIs and web automation with Powershell. Happy scripting!
