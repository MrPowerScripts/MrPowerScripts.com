---
layout: post
title: Automate Simple Static Website Testing
date: 2020-03-14 03:00:45+00
categories: [automation]
tags: [mrpowerscripts, productivity, automation]
description-long: I like to use Jekyll to build simple static websites where I can. A static website is a site built with simple HTML, CSS, and Javascript. Ready to be served up by any webserver. Jekyll is one of the many frameworks that help create static websites using nifty features like templates, logic, and an embedded development server.
---

I like to use Jekyll to build simple static websites where I can. A static website is a site built with simple HTML, CSS, and Javascript. Ready to be served up by any webserver. Jekyll is one of the many frameworks that help create static websites using nifty features like templates, logic, and an embedded development server. 

These static site generators can't prevent you from writing bad code, but they do make it easier to duplicate that bade code across your whole website. You can have borked syntax or bad links throughout the generated website source code. Maybe you're using some JSON files as an "API", and you need to make sure it's not broken in some way.

ALL. OF. THIS. CAN. BE. AUTOMATED.

YAY

We're going to use a few tools that other people have written, and that's the easiest part about this whole thing. The first thing I test is all of the JSON files that my site generates using `jsonlint` combined with a command that finds all of the JSON files in the site directory tree.

```bash
FILES=$(find ./_site -type f -name '*.json') && echo "$FILES" && jsonlint $FILES
```

The code above uses the `find` command to locate all the JSON files in the directory, and displays them on the screen, and then passes them to `jsonlint,` which will validate that all of the files are valid JSON.

Great. So now we know our JSON isn't screwed up. Now we can make sure that all of the site HTML is well-formed as well. We'll use a tool called `htmlproofer` which can check the integrity of the produced site. You can see everything it tests [here on their repo](https://github.com/gjtorikian/html-proofer). I run the command:

```bash
htmlproofer ./_site --check-html --disable-external --check-opengraph --check-favicon
```

The first time I tried `htmlproofer` on one of my Jekyll sites, it found over 300 errors. It took me a while to fix all of the broken issues with my HTML, but `htmlproofer` helped me test it very quickly as I was updating the code.

Next, this isn't precisely testing, but sometimes allowing the wrong sizes of images to get through can provide a poor user experience. So why not automate preventing that? We can do that with the `mogrify` command from the ImageMagick toolset. I use the command below to make sure none of the images on my site are to larger than 500px on either axis, and this will resize them if they are, which helps make sure image file sizes are relatively small.

```bash
find ./_site/assets/img/ -name '*.jpg' -execdir mogrify -resize 500x {} \;
```

But sometimes that isn't enough to get the file sizes down to a reasonable level. We can use the `jpegoptim` command to enforce that image files are under a specific file size, and automatically optimize the image to fit within that limitation. The command below grabs all image files in a folder and reduces their sizes to below 70k.

```bash
find ./_site/assets/img -type d -exec sh -c 'ls "$0"/*.jpg 2>/dev/null && jpegoptim --size=70k --max=90 --all-progressive --strip-all -t "$0"/*.jpg' {} \;
```

Then you can automate all of that using devops tools like CircleCI for testing and trimming your source before it gets deployed somewhere like GitHub pages, which is where this blog lives. Every commit I push to update the website automatically gets validated through CircleCI using the tools above in processed config below before it deploys live — no more shipping sites with tons of broken code that can hurt SEO or the user's experience.

<script src="http://gist-it.appspot.com/http://github.com/MrPowerScripts/MrPowerScripts.com/blob/master/.circleci/config.yml"></script>

We could take the website optimization a few steps further by using tools that help minimize the site source code or run SEO checks. But using these simple tools drastically improved the confidence of the code I was shipping out enough.
