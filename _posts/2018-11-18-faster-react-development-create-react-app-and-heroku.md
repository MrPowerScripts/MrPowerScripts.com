---
layout: post
title: Faster ReactJS development with Create-React-App and Heroku
date: 2018-11-18 07:00:45+00
tags: [mrpowerscripts, git, create-react-app, reactjs, learn react, react and Heroku, Heroku buildpack, create-react-app and heroku]
description-long: 
---

{% include youtubePlayer.html id="xckpWg-Kpss" %}
I always loved working putting together react projects. There was a lot of overhead getting started early on for me. I don't even want to get into how many hours I spent learning how webpack work. Oh, there's a new version of webpack? EVERYTHING IS DIFFERENT NOW. React isn't that much better with breaking changes. When you combine all these various software "solutions" it can be hard to even get started with what you originally wanted to do. Code the freaking idea up. It took me a long time to figure out a setup that allowed me to jump right into developing the react app and thinking less about the setup. This is what I've finally settled on.

First off Create-React-App is an amazing project that basically takes a lot of best practices of React configuration and packs it all together into a framework for building simple React apps. Is it perfect for everything? No, but for most of my projects starting with a Creat-React-App was enough to get me started. Running `create-react-app project-name` would create and configure a full React development environment folder structure. It even comes bundled with a hot reloading web server so you can watch things change as you develop. I find it especially wonderful for getting new people into and learning React. Without having to worry about all the React configuration up front.

Building and working on apps locally is fun, but ultimately you're going to want to show off what you've made. That's where Heroku and their buildpacks come into play here. Buildpacks are Heroku libraries that automate building and deploying tasks on Heroku. There are many buildpacks for many kinds of projects. One of those kinds is create-react-app buildpacks. I used [this one in the video](https://github.com/nhutphuongit/create-react-app-buildpack) but you might find others that you like.

With a Heroku account and their [sweet CLI tool installed](https://devcenter.heroku.com/articles/heroku-cli) you can configure a buildpack on your local Create-React-App project. This will add a new `git remote` called `heroku` to your project. Want to deploy your Create-React-App to a live domain that you can share with anyone? All you have to do is `git push heroku master` and your code will be pushed up to Heroku where the buildpack will build and optimize your Create-React-App for production. 

How freaking cool is that? No need to manage a server. No need to get all wrapped up in webpack. You can get a React project started up and live within ten minutes and start coding out your new idea to share with everyone. At least that has been the case for me. If you like to prototype React projects quickly I highly suggest checking out Heroku and Create-React-App.