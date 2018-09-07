---
layout: post
title: Create a Reddit bot that gets you all the karma. It's easy as py(thon)
tags: [python, Reddit, machine learning, Markov chains]
---

I made a video a while ago about a small bot I made for Reddit. The point of the bot was to figure out a way to farm karma on Reddit. Earning the sites social currency (karma) without having to actually do any real work. Think of it as a digital reality show star. I managed to put together a very simple bot that had surprisingly successful results. It didn't take much code thanks to some python libraries that did most of the work. The bot would repost old threads from a year ago to earn post karma and used a Markov chain based learning algorithm to generate somewhat relevant replies to comments. It wasn't perfect, but it worked well enough far longer than I thought it would. You can see in the first video how one of the bot iterations was able to farm up a significant karma count in just a few days.

{% include youtubePlayer.html id="8DrOERA5FGc" %} 

Karma on Reddit matters. It allows you to open new features on the site, and is considered by many as a sign of credibility/contribution to the communities (or subreddits). Which makes having older accounts with high karma counts and activity very attractive to people who want to do fun, nefarious, or profitable activities.

I also made a technical video that covered the code which made it all happen.

{% include youtubePlayer.html id="KgWsqKkDEtI" %} 

It turned out to be a much simpler project than I thought it would be. The bot had a lot of people replying it its comments as if it was a real person. Which I found quite amusing. The bot was eventually found out because everything about its footprint seemed VERY mechanical. Comments were sent out every 10 minutes exactly. Posts were reposted from exactly one year ago. It was obvious when looking at the user profile there was something driving this account like clockwork. 


I didn't set out to create the perfect bot, and the code definietly reflects that. There's a lot of room for improvment that could have allowed the bot to live a longer life. For instance, I could have randomized the date when I stole old posts to repost them rather than doing it exactly one year ago. Also, randomizing the comments and simulating some period of activity. Maybe decreasing postings significantly during a period of time to simulate the bot is "at work". Unless I wanted to simulate the bot having an office job. In which case I would increase the activity during that period. The bots comments seemed to become wildly ridiculous strings of random text when they returned back too large. Shorter responses from the bot often times seemed to be more relevant to the comment it was attempting to reply to. I could have had it cycle through creating responses and discard anything longer than a fixed character count. This is one of the key clues that led to the end of the bot. People saw it posting large paragraphs of nonsense and began checking the post history to make sure this account wasn't having a stroke. Some noticed the pattern of postings and then made it their job to report every single comment from the bot, and make comments indicating that the posts were coming from a bot. Eventually, the account was banned entirely. With some adjustments I think there's a chance the bot could have lived a long life on Reddit before anyone was keen to the fact it was really a cold dead machine looking for validation on the internet. Like reality show stars.

In the end, all I really accomplished is a small proof of concept. When you're interacting on social media you might be part of social experiment without even realizing it. That would be the least of anyones concerns though. I don't think it would be too difficult to create bots that apear as everyday people but have some minor tweaks to serve different purposes. Such as suggesting certain products to buy when a relevant topic is brought up. Influening poltical discussions with misinformation. I'm sure there's plenty of other purposes with money, influence, or other motives.

The battle between robots and humans is already raging on even if it doesn't involve Arnold Schwarzenegger coming to the rescue. Actually, he posts quite a bit on Reddit. So maybe we're living out a reality closer to Terminator than we actually thought. The world wide web is still very much the wild wild west when it comes to information.