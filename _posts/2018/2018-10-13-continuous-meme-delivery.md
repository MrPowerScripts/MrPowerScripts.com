---
layout: post
title: Continuous Integration Meme Delivery With CircleCI
categories: [fun]
tags: [mrpowerscripts, continuous integration, continuous delivery, send memes, continuous meme delivery ]
---

I made a video about continuous integration and continuous delivery. Also known as CI/CD. The cool way to do DevOps! Are you not practicing this yet? I bet you're still writing checks. You probably still think dippin' dots are the future of ice cream. At least the future of software development is here, so dive in old timer. We write tests now and YOLO every commit out to production faster than anyone has time to review them. {% include youtubePlayer.html id="oHaYyZgiDIU" %} The writing tests part is optional for maximum YOLO. You won't see this being taught in school, but I also like to dab at my desk every time I push a commit. Let all the haters (colleagues) know that I'm making some changes around here.

I've been working very closely in the CI/CD space for more than a year now. I've found that the practice really aligns with how I prefer to build out my own projects. If you've completed a feature, fixed a bug, or improved the look of your application why not get those changes out to your users as soon as possible? I want to see the stuff I've created go live and so do the users.

As usual, instead of making a practical example I chose to do something completely unnecessary and ridiculous to share this lovely concept of CI/CD. I configured a repository to deploy memes with CircleCI. The general idea is that you can keep your memes in git version control, and when you want to deploy a meme CircleCI will automate the workflow. I even added some tests to make sure the image isn't too large or too small. Remember, tests are completely optional and reduce your YOLO score. 

At the moment it automates deploying the meme to Reddit after it uploads it to Imgur. The memes can be managed in their own branches, and when you want to release a meme to Reddit you simply create and push a git tag. How pointless and cool is that? It's easier than ever to pollute the internet with memes nobody will ever care about. You're welcome society. 

You can [find the code here on GitHub](https://github.com/MrPowerScripts/meme-cd) if you want to deploy your own memes to Reddit. Deploy memes faster than anyone else on the planet using continuous meme delivery.







