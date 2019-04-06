---
layout: post
title: How I made the MrPowerScripts.com website FAST on GitHub pages with Cloudflare and CircleCI
date: 2019-03-30 10:00:45+00
tags: [mrpowerscripts, CircleCI automation, Cloudflare, improve website speed, website speed tips, Cloudflare caching, Cloudflare website speed ]
description-long: The performance of my website recently tanked. On Google PageSpeed Insights I had a ~99 rating. I went to look at within the past couple of days and it TANKED down to 44. 44! The whole point of this blog was to journey into learning more about SEO. One of the most important metrics for Google Page rank and general SEO ranking is the speed of your website. 44 was unacceptable. I needed to change some things FAST to make the website FAST. I even have the charts to show how much faster it is. Wait until you see the results!
---

The performance of my website recently tanked. On Google PageSpeed Insights I had a ~99 rating. I went to look at within the past couple of days and it TANKED down to 44. 44! The whole point of this blog was to [journey into learning more about SEO](https://www.youtube.com/watch?v=5YsFoEY7Ulo&list=PLqpaLALjc1lwz6nHCgsP98xYX_Ykawh3J). One of the most important metrics for Google Page rank and general SEO ranking is the speed of your website. 44 was unacceptable. I needed to change some things FAST to make the website FAST. I even have the charts to show how much faster it is. Wait until you see the results!

Since the site [is an open source repo hosted via GitHub Pages](https://github.com/MrPowerScripts/MrPowerScripts.com) I have no control over server-side hosting decisions. Such as cache settings, and various other techniques that could help improve the performance to my website. Ya know what is really great for improving delivery of web assets? CDNs. Content Delivery Networks.

In comes Cloudflare, one of the biggest CDNs on the web.  I didn't do all the work to figure this out, to be honest. They posted their own [great blog post](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/) on how to set up their service in front of GitHub pages to cache ALL THE THINGS.  Once I configured MrPowerScripts.com on their service using the free plan all I had to do was update my name servers in NameCheap to use the ones they provided me. From there Cloudflare handled all of the caching and requests to the site. Dramatically reducing the page size and loading time.  Check the results for yourself:

{% include image.html src="/images/mrps-fast/page-size.png" %}

First off, the size of the page download is MUCH smaller. It went from ~1.5MB to ~205KB. That's HUGE. The entire website size was reduced by over 1MB. Also, check out the number of requests needed to render the site. It went from around 38 requests to about 15. Yeah, it cut the number of requests by more than half. Amazing! All of that lead to the following chart.

{% include image.html src="/images/mrps-fast/page-timings.png" %}

Previously, the entire site took more than 4 seconds to load. Now, that doesn't mean 4 seconds to see things on the page. It just means for the entire site to finish loading. Including various background requests. Now, the entire site loads in less than a second. These are amazing results! Cloudflare has allowed me to cache all site assets, and to keep them cached for up to 8 days. Then, the caches will be purged.

This creates a problem though. What if I update the website? Cloudflare will deliver the cached website they have stored rather than the latest updates i've pushed to GitHub Pages. Cloudflare has a nice API though, so i've connected CircleCI to my GitHub repository to run a job every time a push a commit. That job sends an API request to Cloudflare telling it to clear out the cache. The next person that visits the site will see the latest version of it, and Cloudflare will rebuild the cache. You can see [the CircleCI config file here](https://github.com/MrPowerScripts/MrPowerScripts.com/blob/f41b5b2a8d51b5f80f4d7da9bab33368d3b602c3/.circleci/config.yml) with the api call that perfoms the cache clearing. CircleCI has a generous open source plan (it's free. that's pretty generous). Now this isn't perfect. It could be optimized to only purge the cache of certain pages, but it works for my simple little blog.

None of this costs me any money since i'm using the free tier of each application, and now my website is SUPER FAST once again.

If you want to see some more stats on the site improvements you can [check out the live results I pulled the graphs from](https://gtmetrix.com/reports/mrpowerscripts.com/S4kSarB8).
