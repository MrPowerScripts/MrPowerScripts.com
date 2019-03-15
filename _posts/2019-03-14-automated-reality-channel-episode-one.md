---
layout: post
title: Automated Reality Channel Episode One Released!
date: 2019-03-14 08:00:45+00
tags: [mrpowerscripts, Automated Reality Channel, automated youtube channel, automating youtube channel]
description-long: IT WORKS. IT. FREAKING. WORKS. I wrote a few months ago about this idea to automate my youtube channel Now, at the time the idea wasn't really well defined. I decided I wanted to do something and then I had to figure out how I was going to do it. I should have shut up and built it first, but I was too excited and prematurely let the idea out. It happens to everyone. Over time though I crafted a more well-defined concept. You can see the whole evolution in this playlist in fact. Well, I finally put together something I would consider a prototype. Despite many hiccups, lingering issues, and generally losing faith in the idea I managed to put together the scaffolding for a working project. This is how it all works.
---

IT WORKS. IT. FREAKING. WORKS. [I wrote a few months ago about this idea to automate my youtube channel]({% post_url 2018-12-12-help-me-automate-my-youtube-channel %}). Now, at the time the idea wasn't really well defined. I decided I wanted to do something and then I had to figure out how I was going to do it. I should have [shut up and built it first]({% post_url 2019-02-16-nobody-gives-a-damn-about-your-idea %}), but I was too excited and prematurely let the idea out. It happens to everyone. Over time though I crafted a more well-defined concept. You can see the whole evolution in this playlist in fact.
<iframe type="text/html" width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLqpaLALjc1lyekGkzAltr50RD3RD3kA4d&modestbranding=1&enablejsapi=1" frameborder="0"></iframe>
Well, I finally put together something I would consider a prototype. Despite many hiccups, lingering issues, and generally losing faith in the idea I managed to put together the scaffolding for a working project. This is how it all works.

It all starts with a yaml file to describe the video that should be created. Here's the file for the first episode.
<script src="https://gist-it.appspot.com/github/mrpowerscripts/automated-reality-channel/blob/master/scripts/arc-ep-1.yml?slice=0:30"></script>
The yaml file has an array which describes each scene of the video. Each scene describes what should be shown on the screen. To start off simple I chose to stick with providing an image and using text-to-speech to generate some dialogue, which is also described in the yaml file. In the future, it should recognize if the content is a video or if the audio is from a file as well. It will pull all of the assets accordingly and then builds each scene as described in the `scenes` array.

The script file is ingested through the PowerBot Discord bot that runs in [my discord channel](https:/bit.ly/mrps-discord). I can run commands in Discord that tell the bot what to do. Such as building the video by passing it the script file above. Here's a bit of the Discord bot code. You can click the footer to see the rest.
<script src="https://gist-it.appspot.com/github/MrPowerScripts/mrps-discord-powerbot/blob/master/veditor.js?slice=0:30"></script>

For the record, I'm completely ashamed of this code. I have no idea how to code in nodejs and a lot of this was done at 3 am when I should have been well asleep. Instead, I produced the monstrosity you see above. Anyway, the build function is what generates the video files from the script yaml. First, it downloads all of the assets which are images in this case. It uses `FFmpeg` to turn the images and audio of each scene into an individual video file. The audio at the moment is generated using the `espeak` text-to-speak application. Once each scene is generated `FFmpeg` once again combines all of the individual video files into a single video. How cool is that?

After the build is created I can preview the generated video. If I like what I see I can run a `publish` command that will automatically upload the video to the [Automated Reality Channel](https://bit.ly/mrps-arc) on YouTube. So, here I am to present the very first episode for your viewing pleasure.

{% include youtubePlayer.html id="h8esG-ZwwY4" %}

Okay. That wasn't very impressive. It's a start though! Next, I would like to polish up a lot of the code. There's a bunch of bugs. Sometimes it crashes. Nothing is really optimized. So, time to learn how to properly code in an async environment. Well, learn as best as I can. Also, remove a lot of the code duplication. A lot of the functions could be composed better. Also, adding some of the other elements that I talked about. Such as publishing drafts of individual scenes for people to vote on with emojis. SHowing draft previews that also allow voting. Allowing people to submit scene suggestions through discord commands. Such as text-to-speech scripts, or scene images. 

Lots of work to do. But the idea has reached a much more concrete position, and it works. Time for more iteration when I can find some more time
