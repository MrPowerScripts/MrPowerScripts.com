---
layout: post
title: Create a reddit bot that gets you all the karma. It's easy as py(thon)
tags: [python, reddit, machine learning, markov chains]
---

I made a video a while ago about a small bot I made for Reddit. It didn't take much code thanks to some python libraries. The point of the bot was to figure out a way to farm karma on reddit. Earning the sites social currency (karma) without having to actually do any real work. Think of it as a digital reality show stars. I managed to put together a very simple bot that had surprisingly successfuly results. The bot would repost old threads from a year ago to earn post karma and used a markov chain based learning algorithm to generate somewhat relevant replies to comments. It wasn't perfect, but it worked well far longer than I thought it would. You can see in the first video how one of the bot iterations was able to farm up a significant karma count in just a few days.

{% include youtubePlayer.html id="8DrOERA5FGc" %} 

I also made a technical video that covered the code which made it all happen. You can see that in the video here if you're interested.

{% include youtubePlayer.html id="KgWsqKkDEtI" %} 

It turned out to be a much simpler project than I thought it would be. The bot was eventually found out because everything about it seemed VERY mechincal. Comments were sent out every 10 minutess exactly. Posts were reposted from exactly one year ago. It was very obvious when looking at the user profile there was something running driving this account like clockwork. 

I didn't want to create the perfect bot. It was more about showing how simple it was for a single person to create an automated influencer. Karma on reddit matters. It allows you to open new features and by many it's seen as a sign of credibility and contribution to the communities (or subreddits) on the site. Through the experience I learned of many tweaks that I could have made to hiude the fact it was a bot all along. 

For instance I could have randomized the date when I stole old posts to repost them rather than doing it exactly one year ago. Also, randomizing the comments and simulating some period period of activity for a given timezone. The bots comments as well seemed to become wildly ridiculous strings of random text when they returned back too large. Only using shorter responded from the bot often times seemed to be more relevant as responses. This it one of the key clues that led to the end of the bot. People saw it posting large paragraphs of nonsensing and began checking the post history to make sure this account wasn't having a stroke. Some noticed the pattern of postings and then made it their job to report every single comment from the bot, and make comments indiciating that the posts were coming from a bot. Eventually the account was banned entirely. With some adjustments keeping those issues in mind I think there's a chance the bot could have lived a long life on Reddit before anyone was keen to the fact it was really a cold dead machine looking for validation on the internet. Like reality show stars.

In the end all I really accomplished is further reinforcing my view that most of social media is far more manipulated than anyone is willing to accept or care about. When you're interacting on social media you might be part of social experiment without even realizing it. 