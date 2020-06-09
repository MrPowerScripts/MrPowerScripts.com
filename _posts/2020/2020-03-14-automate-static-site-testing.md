---
layout: post
title: Automate Simple Static Website Testing
categories: [automation]
tags: [mrpowerscripts, productivity, automation]
---

I like using Jekyll to build static websites when I can. A static website is a site built with simple HTML, CSS, and Javascript. Ready to be served up by webservers. Jekyll is one of the many frameworks that help create static websites by using nifty features like templating, and an embedded development server.

These static site generators can't prevent you from writing bad structure to your HTML other potential problems. You can have borked syntax or bad links throughout the generated website source code that may go undeteceted. Even JSON files can also be generated with invalid syntax very easily. And there's plenty of tools to help you avoid shipping that crappy code live. Plus...

ALL. OF. THIS. CAN. BE. AUTOMATED.

YAY

We're going to use a few tools that other people have written, and that's the easiest part about this whole thing. First thing is test all of the JSON files that my site generates using `jsonlint` combined with a command that finds all of the JSON files in the site directory tree.

```bash
FILES=$(find ./_site -type f -name '*.json') && echo "$FILES" && jsonlint $FILES
```

The code above uses the `find` command to locate all the JSON files in the directory, and displays them on the screen, and then passes them to `jsonlint`, which will validate that all of the files are good whomesome JSON like Mom used to make.

Great. So now we know our JSON isn't screwed up. We can make sure that all of the site HTML is well-formed as well. We'll use a tool called `htmlproofer` which can check the integrity of the produced site. You can see everything it tests [here on their repo](https://github.com/gjtorikian/html-proofer). I run the command:

```bash
htmlproofer ./_site --check-html --disable-external --check-opengraph --check-favicon
```

The first time I tried `htmlproofer` on one of my Jekyll sites, it found over 300 errors. It took me a while to fix all of the broken issues with my HTML, but `htmlproofer` helped me test it very quickly as I was updating the code.

Next, this isn't really testing, but sometimes allowing the wrong sizes of images to get through can provide a poor user experience. So why not automate preventing that? We can do that with the `mogrify` command from the [ImageMagick toolset](https://imagemagick.org/script/download.php). I use the command below on one of my sites to make sure images are no larger than 500px on either side, and this will resize them if they are, which helps make sure image file sizes are smaller.

```bash
find ./_site/assets/img/ -name '*.jpg' -execdir mogrify -resize 500x {} \;
```

But sometimes that isn't enough to get the file sizes down to a reasonable level. We can use the `jpegoptim` command to enforce that image files are under a specific file size, and automatically optimize the image to fit within that limit. The command below grabs all image files in a folder and reduces their sizes to below 70k.

```bash
find ./_site/assets/img -type d -exec sh -c 'ls "$0"/*.jpg 2>/dev/null && jpegoptim --size=70k --max=90 --all-progressive --strip-all -t "$0"/*.jpg' {} \;
```

Then you can automate all of that using devops tools like CircleCI for testing and trimming your source before it gets deployed somewhere, like GitHub pages, which is where this blog lives. Every commit I push to update the website automatically gets validated through CircleCI using the tools above. The CircleCI config with test and deploy jobs make sure the site is validated every single time I make a change before it gets deployed live — no more shipping sites with tons of broken code that can hurt SEO or the user's experience.

<script src="http://gist-it.appspot.com/http://github.com/MrPowerScripts/MrPowerScripts.com/blob/master/.circleci/config.yml"></script>

When I pushed the change that contained this blog post [it actually hit an error](https://circleci.com/gh/MrPowerScripts/MrPowerScripts.com/298) because I added a `"` where it can break site formatting. The CircleCI job failed and the site was not deployed. I was able to fix the site code and [push a new commit](https://circleci.com/workflow-run/852b83a1-84ec-425a-823b-c5032b288265) where it was validated as successful and the site was deployed successfully.

We could take the website optimization a few steps further by using tools that help minimize the site source code or run SEO checks. But using these simple tools drastically improved the confidence of the code I was shipping out.
