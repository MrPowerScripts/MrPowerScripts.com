---
layout: post
title: How I discovered the Google Discover page with a Reddit bot
categories: [reddit, google]
tags: [mrpowerscripts, reddit]
published: false
description-long: Bit of context late last year, I decided to learn as much as I could about SEO, and one of those mediums for learning is this blog. So if you found this through search - Hi - it worked. And through learning more about SEO, Marketing, and other dark arts, I arrived at one of the most insidious practices of these evil arts - Affiliate marketing. It's not quite moving to Chiang Mai and drop shipping pantyhose, but it feels just as dirty. So I started a site called ReviewHuntr.com, which is loaded with product reviews - with a twist. I'll let you figure out what that twist could be, though.
---

Bit of context: late last year, I decided to learn as much as I could about SEO, and one of those mediums for learning is this blog. So if you found this through search - Hi - it worked. And through learning more about SEO, Marketing, and other dark arts, I arrived at one of the most insidious practices of these evil arts - Affiliate marketing. It's not quite moving to Chiang Mai and drop shipping pantyhose, but it feels just as dirty. So I started a site called ReviewHuntr.com, which is loaded with product reviews - with a twist. I'll let you figure out what that twist could be, though.

So now, I have an affiliate marketing site, and I want to drive traffic to it. I could pay for advertising, but what if I did some low-key slightly shady growth hacking stuff instead? I remembered [this blog post](https://medium.com/hackernoon/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5) a while back about hiding code in a popular library that people run without actually checking. Wouldn't that be cool if I had something that lots of people run without checking? And I could use it to promote my site?

Oh right. I do have something like that - I wrote a sneaky [open-source Reddit bot that pretends to be a user](https://github.com/MrPowerScripts/reddit-karma-farming-bot) and makes comments and posts on Reddit to farm karma. And every day, people are finding the bot, running the code, and not even checking it!

Jackpot.

So I [added a bit of code](https://github.com/MrPowerScripts/reddit-karma-farming-bot/commit/ab3d3d4a5494539dc6111d97a938c83f11fc6dd8) to the bot that would sometimes share a random link to one of the articles on the affiliate page. And guess what? It worked. People started spinning up this bot that would pretend to be a Reddit user. And periodically, it would drop a random link to one of the pages. You can see all the comments [here on redditsearch.io](https://redditsearch.io/?term=reviewhuntr.com&dataviz=false&aggs=false&subreddits=&searchtype=comments&search=true&start=0&end=1573350991&size=100).

{% include image.html src="/images/gdr/redditsearchio-reviewhuntr.png" %}

Life was good. I had some free advertisement. Then one day, out of nowhere, I started getting a ton of traffic from Reddit. One person ran the bot, and it looked like they got lucky and left comments on a bunch of highly visible posts.

I searched [redditsearch.io for the two days](https://redditsearch.io/?term=https://reviewhuntr.com/reviews&dataviz=false&aggs=false&subreddits=&searchtype=comments&search=true&start=1569538800&end=1569625200&size=100) that I received the traffic bump. Fifty-Four comments in total from a single bot. Nice. Thank you whoever ran `/u/karmalover121` with the bot!

Some luck was required, but the bot does try to focus on posts that will become popular. By default, when it [decides where to leave a comment](https://github.com/MrPowerScripts/reddit-karma-farming-bot/blob/293ac77a0339c9ab6fea18ed5a8442e7c00396a1/src/reddit.py#L290), it looks for `hot` submissions. Which means `find posts that are quickly receiving many upvotes.`.

{% include image.html src="/images/gdr/google-analytics-results.png" %}

That's dope as fuck, I thought to myself.

Then a few days later, I was checking the Google Search Console for the site. And there was a new tab.

{% include image.html src="/images/gdr/gsc-discover-button.png" %}

Discover? Google Discover? What the hell is that? After some searching, I found out [Google Discover is the rebranded Google feed](https://www.blog.google/products/search/introducing-google-discover/), which shows content you might be interested in seeing.

The Discover tab opened up for me because Google promoted one of the pages to their Discover feed. I wasn't paying for any advertising at the time. The site had few impressions and almost no clicks on Google search. It was a brand new site with barely any traffic, why would it end up on the Google Discover page? Then I remembered the click storm, which the bot produced a few days before.

Google Discover only promoted one article from the comments that day. It was [about the darkphone](https://reviewhuntr.com/reviews/new-darkphone-by-darkweb-review/).

{% include image.html src="/images/gdr/gsc-discover-results.png" %}

Out of the fifty-four bot comments that day [only eight comments show up with the URL](https://redditsearch.io/?term=https://reviewhuntr.com/reviews/new-darkphone-by-darkweb-review/&dataviz=false&aggs=false&subreddits=&searchtype=comments&search=true&start=1569452400&end=1569625200&size=100) that was in the Google Discover report. It's not that many, but if you look at each of those comments, you'll notice that they're on posts that combine for hundreds of thousands of upvotes. Meaning almost all those posts were highly visible, and possibly near/on the front page of Reddit at the time. Many of the comments are gone, but we can see where they used to exist. For instance, from the search above, we can see one comment with the link was posted as a reply to the third-highest voted comment of [this post](https://www.reddit.com/r/antimeme/comments/d9xv58/well_well_well/f1m1fk0/), which made it highly visible to people on a post with 28k upvotes. Some of the other posts upvote counts were 89.7k, 22.0k, 43.0k, 39.8k, 8.3k, 28.5k, 34.8k.

Google saw a lot of traffic clicking through to that link and thought it would be worth promoting on their Discover feed. Once the traffic from Reddit subsided, either through the comments removed or the posts losing popularity, it lost status on the Google Discover feed.

How exactly Google decided it was worth sharing in the first place, I'm still not sure, but it's pretty clear what the source was. Not only did the bot generate some traffic through Reddit, but it also had the side effect of fooling Google into thinking it was popular content worth promoting on Google Discover. Which further increased traffic to the site.

The page had it's 15 minutes of fame on Google Discover thanks to the Reddit karma farming bot. I learned what the Google Discover page is. And nobody learned to read code before they run it. Good times.
