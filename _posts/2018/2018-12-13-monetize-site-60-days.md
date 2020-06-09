---
layout: post
title: How to build a monetizable web app in 60 days
categories: [personal projects, web development]
tags: [mrpowerscripts, serverless, monetizable web app in 60 days, AWS Lambda, Lob.com, SparkPost, GitHub Pages, Stripe]
---

Well, 63 days if we're going by the latest commit in the repo. But that's close enough! Do you have any side projects? I have tons of them. I have side projects that are waiting on side-side projects for the side project that will (fingers crossed) make them even more awesome (when they're finished (if ever)). Do you have any side projects that make money? Ah, now THAT is a much rarer sighting. I've personally never had a side project that was capable of generating money on its own. {% include youtubePlayer.html id="zAWGcx4aNZE" %} I suppose the Youtube channel does, but it's nothing to write home about. Every once in a while we're sitting at our desk thinking we could be doing something better with our time, and changing the world with code! And I've had that moment many times myself. I have an idea. I get started on it. It turns out to be way harder than I thought. It doesn't just happen to individuals. It happens to companies as well.

Many of the companies I've worked for ended up failing within two years of working there. I don't know if that says more about my luck or my impact, but I've learned a lot through all of those failures. Even when peoples livelihoods depend on shit working sometimes it's hard to get shit to work.

I've worked on a few of these failures with my buddy in the quote below. One of them was a startup where we worked on a remote team together. It crashed and burned. Then we had our own idea that was going to change everything. It only changed our net worths. Negatively. That's part of the process though. You learn from your experiences and your mistakes and you keep trying. So on Oct 8th, 2018 while working at home I get this message from my buddy:

(all spelling and grammatical errors included)

>10:00 AM
>I’m wracking my brain (and yours) to assemble a list of interesting and instantly monetizable problems which haven’t been worked on.
>
>I’ve come to recognize the type of products and services I enjoy working on the most are centered around making peoples’ “daily grinds” (individually or as a community) less crappy. For example, some of the items I’ve put on my list:
>
>{ his list }
>
>I want to devote my time, energy, and creativity to a problem that can make modern life more manageable for people, even if it’s only in a small way. The idea doesn’t have to be world-changing, but it does need to be something people was consistently throw money at without a second thought if it did a great job doing what it said it would do I loved working on Daology, and want to get back to the same feeling of having a purpose...but this time I want to ensure we have a clear path to revenue and a huge pool of potential customers, first. No reason to do anything overly ambitious. I don’t care if the idea is boring-sounding, if it has an immediate and quantifiable reason to exist. Hell, I’d build a company around (literal) garbage collection and processing if I could reliably make money and improve lives while doing it.When I look at the most successful people and companies I know, the vast majority took some seemingly mundane, but prevalent pain people all over suffer through and incrementally improved it.They didn’t build the next social network, “redefined AI”, or a rocket ship...they made it easier for people like us to drop off clothes for cleaning, simplified keeping track of household finances, or designed and produced a small little elastic strap to keep your damn hair out of your eyes while working out or a ponytail neatly in place.Wow...that was a dump of early morning thoughts on you. Apologies for the actual wall of text

Now, that was a dump of thoughts on me at 10 am. And it took me a while to respond because initially, my answer was no. I'm burnt out from all this. I can't deal with another unfinished or failed side project. But a lot of things have changed since the last time we worked on something together. I started to think about the whole approach differently. And eventually I replied with:

>10:22 AM
>yeah I don't really have a path forward on this, but I've come to the conclusion that the only managble way for me to build side income in tech would be some kind of pay once service that does some specific thing. It lives on AWS lambda and only runs when someone pays for it to run. it does that one specific thing, and sends the result to the person (or does the thing). This is infinitely scalable infrastructure wise, doesn't require ongoing support, and doesn't require ongoing monitoring or maintenance. That's the only thing I can think of that would work for people with limited time to commit. I don't know what that service looks like unfortunately

Well, maybe not exactly infinitely scalable. Unfortunately, hyperbole is a superpower of mine. After this day we eventually figured out what that service looks like. What we eventually landed on isn't going to change the world. But it is a working, complete, scalable web app that was built by two people on their spare time in 60 days. Let's take a look at what it is, and how it works.

SendPostMoji.com lets you send personalized emoji postcards in the mail using a simple online card creator.

The app consists of two git repositories. One is a GitHub Pages repo which hosts the front-end. Everything you see on SendPostMoji.com is being served directly from GitHub for free. Whenever we push a change up to the repo GitHub automatically rebuilds the Jekyll based website. So, effectively we don't have to worry about our website going down other than the periodic GitHub Pages maintenance periods. But for a small project like this those are acceptable inconveniences to trade for having someone else deal with hosting for free. My buddy handled the vast majority of the frontend work. I helped mock content, fix some crossed wires, and finish up some features. But even for an MVP how beautiful does it look?

That's the impact of working with an experienced UX designer. If I find a screenshot of what I originally mocked up I'll share it here so we can all laugh at how bad I am at design. Being able to collaborate with people that complement your strengths and weaknesses is huuuuge. I can't emphasize enough how important it is to network and find people who like to build and tinker with things on the side. I would have never been able to produce such a result in the time span on my own. It would have probably ended up abandoned. Thankfully I didn't have to. Collaboration is such a rewarding experience with great people. Get out there and mingle ya'll. My deal in this arrangement was to work primarily on the backend.

Remember we're two people with full-time jobs. My buddy has the whole house, wife, kids, blah blah blah deal and I'm generally very lazy. So time is extremely limited for us both in somewhat different but equally valid ways. Whatever we build needs to be able to survive on its own for the most part without costing us too much. We don't have time to be putting out fires in the middle of the night on top of our existing lives. Infrastructure is hard to manage and maintain even when you're paid to do it. But we don't have to worry about infrastructure where we're going, kids! Because we're going Serverless! With Serverless Computing! (Superman pose) I [made a video](https://www.youtube.com/watch?v=kp1SFflR2A0) not too long ago about AWS Lambda functions with the Serverless framework. Showing how to create a simple HTTP endpoint.

As the video states, there's a number of advantages to building around the compute function architecture. For one, you don't have a server constantly running all day when in reality it only needs about 6 seconds for X to happen. X of course, can be anything. That's your function. Like any old programming function. So what's my function? Send a PostMoji.

After you choose your PostMoji, enter the message and address, and finally pay for the postcard it fires off all that information to an AWS Lambda function. It's a NodeJS based function using various libraries for the services we're relying on. The function relies on several external services that handle the entire process of creating and mailing the PostMoji, charging the customer's credit card, and mailing a notification to the user.

1. Lob.com - API to create a send various types of mailing. Including letters and postcards.
1. Stripe.com - API that handles credit card transactions securely.
1. SparkPost.com - API to send emails
1. MailChimp.com - Mailing List manager with API

Once the Lambda function spins up the first thing we do is check to see if they want to be bothered by us through email sometimes. If the user ticked yes we send their email address to a mailing list on MailChimp so we can poke them later.

Then we take the recipient address and send it through Lob's address validation service. This lets us know if we can send a PostMoji to that address. From there we'll create a test postcard with Lobs test API to make sure there are no issues with the postcard data entered. If there are no issues with the test postcard we finally send the real postcard - which obviously should pass by this point. When that returns successfully we attempt to charge the users credit card.

 Can I just say for a second I love stripe? Basically, the way it works is they provide you with this awesome credit card form code that gives you an amazing credit card input. Does all of the validation and looks super jazzy. It sends the credit card info directly to stripe and then returns a transaction payload. Now you send this transaction payload to your backend for processing. The transaction payload doesn't contain any personal information of the user or their credit card. So there's no chance of accidentally leaking user credit card info in logs and what not. So cool. Anywho.

Now finally if the payment is successful we send the user a confirmation e-mail that the PostMoji is on its way. Any exceptions met along the way are attempted to be handled gracefully. Such as if the credit card charge fails for any reason we immediately cancel the postcard order. Neato! Now you know what it is, and how it works. Why is this so fundamentally different from how we've approached projects and side projects before? We focused our stack and goals to work within our defined limitations. Here's some of the key things that we identified in our final setup.

- No active running costs. GitHub Pages is hosting our frontend for free. We have no hosting costs or servers to monitor. Nor do we need to worry about scalability in the future. The one con is we're subject to GitHub pages maintenance downtimes. The AWS Lambda is not constantly running. It only spins up to perform its function when someone makes a purchase.

- Predictable costs. Every action within our Lambda has a predictable cost. The number of emails we send, Stripe's cut from charging the user, and the cost of postcards are all wrapped within the cost of running the lambda. We're still using the free tier for many of the services, but we should be able to predict costs fairly accurately with our configuration.

- No infrastructure ownership. With GitHub handling the frontend and AWS handling the servers, we don't have any alarms to monitor or resources to manage. We can sleep at night and worry about our day jobs when the sun is up.

- Security through isolation. Every user's order is managed in its own isolated environment.

- (Almost) limitless scalability. Our Lambda relies on other APIs. So really they're our only bottleneck. I wouldn't be surprised if AWS was hosting the APIs for all the services in the Lambda. They do big things yo. Right now the Lambda isn't aware of rate limits, so that would need to be considered in the future. But we would need to start receiving dozens of orders per second before that becomes a cause for concern. I don't see that happening soon.

- Manageable codebase. Our lambda function is only about 130 lines of code. The serverless framework adds quite a few files to the repo and you have to configure the `serverless.yml`. Once you have it set up it's a breeze to manage a Serverless function. The frontend is a simple Jekyll app mostly powered by jquery. In a word of React and Vue - I know. There are only a few main files to mess around with in that repo. We also have a nice clean distinction between our backend and our frontend in two separate folders.

- Flexibility. We've branded this site around emoji images after we scaled back on many ideas and iterations of what this project would be. But we can quickly substitute any other kind of branded cards in our card creator system. We could consider licensing sports team logos and set up a totally new site layout fairly fast. The lambda and frontend were built with this type of flexibility in mind, so they can quickly adapt to support other iterations without changing much code.

The projects that we tackled before had us spending so much time focusing on what hard problems we were going to solve. We would get far enough into the process to end up tangled by the tech we were using or our own limitations. This time around we started with identifying our own problems and limitations. In our case mostly having time and money to invest. Then we designed our passion project around the understanding of those limitations. So we could arrive at not only something that would be completed within a reasonable timespan but also continue to exist and potentially thrive without requiring us to helicopter over it.

Is this set up sustainable? I have no idea in all honesty. I've never built anything like this before. But it SOUNDS like it should be. How hard can the postcard business be? We're going to become the Apple of emoji based postcards. Who's in our way right now? Nobody! (I think?) I suppose with enough time and luck we'll see. For a long time, I felt like monetizable projects needed to be game-changers. Which often left me tangled in the weeds deep in the woods. But there's a lot of opportunities to set realistic goals within your means now more than ever. With some consideration of your architecture, goals, limitations, and collaboration it's possible to develop a monetizable web app on a budget in 60 days.

We aren't going to change the world by making it super easy for people to send emoji postcards. But we might help someone put a smile on someone else's face. That's pretty cool too. We have a great foundation, so from here we can continue to improve and learn from this experience over time. I would absolutely love if you could help us test this new service by sending someone you know a PostMoji, and telling us how the experience was for you. PostMoji is only available to send to USA addresses at the moment.

[https://SendPostMoji.com](https://SendPostMoji.com)
