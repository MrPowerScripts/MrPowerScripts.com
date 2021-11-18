---
layout: post
title: Github Actions Deadman's switch to publish your final GitHub Pages post 
categories: ["deadman"]
tags: [mrpowerscripts]
---

Well, in our ever-inclusive world, this would probably be better titled as dead persons switch. It's for anyone who wants to make an eerie final blog post after some point in the future. It doesn't only have to be because you're dead! Many things could happen that prevent your blogging activities. Comas, life sentence in jail, leaving society to live in the woods. I'm sure there's more that I'm not thinking of... hmmm, alien abduction, maybe?

Whatever the reason, here's a cute little script I threw together that can make a post to your GitHub pages after some date. This mechanism is an active process in that you must continually update a date value in your repo. There may be some passive means to do it, but this felt like a good place to start. 

First off, this only works if you're letting GitHub itself generate your page. It works using a GitHub action to create the new post and then commits it back to the GitHub repo. But it only makes that new post if the current date is after a date value set in a file called `canary.sh` in the repo's root.

In the `canary.sh` file, I have the sole value `KILLCANARY=2021-10-23`. Simple variable assignment with a `yyy-mm-dd` date value. You'll see where this comes into play within the script. With that file in the repo's root, all you need to do is create a GitHub action yml file. I named my file `.github/workflows/canary-workflow.yml` and you can find the full script at the bottom of the page. Most of the bilerplace GitHub Action code is from another Action that makes it easier to push changes back to your repo and you can [see that action on their repo here](https://github.com/ad-m/github-push-action).

So let's just break down the actual bash that makes this action work:

```bash

. canary.sh # Source all the envars from our canary.sh file for access

currentdate=$(date '+%Y-%m-%d') # Get current day
postdate=date -d "$KILLCANARY - 2 days" '+%Y-%m-%d'

# convert dates to seconds for math
currentdateseconds=$(date -d $currentdate +%s)
deadcanaryseconds=$(date -d $KILLCANARY +%s)

# If the current date is past the kill canary date 
# then create the new github pages post with the release date
if [ $currentdateseconds -ge $deadcanaryseconds ]; then
    # check if the dead.canary exists - so this doesn't run multiple times
    if [ ! -f dead.canary ]; then
    # create a dead.canary file, so that we don't run our dead canary code
    # on any further scheduled github action runs
    echo "CANARY IS DEAD" > dead.canary
    # create a post with a date from two days ago
    # this will assure that github pages publishes it
    printf -- "---\nlayout: post\nimg: someimage.jpg\ntitle: This is the article title\ntags: []\n---\n\nThis is some content for the article" > "_posts/${postdate//[$'\t\r\n']}-last-post.md"
    fi
fi 
```

That's pretty much the guts of how it works. At the top, we have `. canary.sh`. Notice the `.` in front of `canary.sh`. That's the same as calling `source canary.sh`. All this does is absorb the values into the current shell. Since I defined a variable with `KILLCANARY=2021-10-23`, that variable is now available in the bash shell of the GitHub Action.

Next we're using that variable we absorbed, and defining some other variables to use:

```bash
currentdate=$(date '+%Y-%m-%d') # Get current day
postdate=date -d "+$(($KILLCANARY -2)) days" '+%Y-%m-%d'

# convert dates to seconds for math
currentdateseconds=$(date -d $currentdate +%s)
deadcanaryseconds=$(date -d $KILLCANARY +%s)
```

The first two are human-readable dates in the `yyyy-mm-dd` format. The first one is simply the current date, which will be when the Action is running. The second date is the date used for naming the post. In my situation, it's a GitHub Page built with Jekyll, and any new blog posts in the `_posts` folder need to start with a date. You'll notice that I subtract two days from the post date. Setting the date well in the past to make sure Jekyll builds the post when we trigger the site rebuild. Jekyll won't publish posts in the future, and this helps to avoid any weird timezone issues.  The next set of date variables is simply converting those dates to epoch timestamps to make comparison easier. 

Once we have those we can run the checks that decide if the post should be published.

```yml
# If the current date is past the kill canary date 
# then create the new github pages post with the release date
if [ $currentdateseconds -ge $deadcanaryseconds ]; then
    # check if the dead.canary exists - so this doesn't run multiple times
    if [ ! -f dead.canary ]; then
    # create a dead.canary file, so that we don't run our dead canary code
    # on any further scheduled github action runs
    echo "CANARY IS DEAD" > dead.canary
    # create a post with a date from two days ago
    # this will assure that github pages publishes it
    printf -- "---\nlayout: post\nimg: someimage.jpg\ntitle: This is the article title\ntags: []\n---\n\nThis is some content for the article" > "_posts/${postdate//[$'\t\r\n']}-last-post.md"
    fi
fi 
```

The first thing that happens is checking to see if `$currentdateseconds` is greater than `$deadcanaryseconds`. If we've arrived at the date that the canary dies, then we should try to create the post. We'll also create a file called `dead.canary` in the root of the repo. There's another `if` statement that checks to see if the file exists. If the canary is already dead, then we won't rerun this. Doing so will prevent the Action from repeating any of this code in the future.

From that point, it's about doing whatever you want the switch to do once the canary is dead. As a straightforward example, I'm using `printf` to generate a new post in the `_posts` folder using the date calculated from two days prior.

From there we quickly configure git, add all the files and create a new commit.

```bash
git config --local user.email "41898282+github-actions[bot]@users.noreply.github.com"
git config --local user.name "github-actions[bot]"
git add -A
git commit -m "Add changes $KILLCANARY" -a
```

There won't be anything to commit to the repo if we haven't reached the kill canary date. So the git code is skipped, and nothing is pushed back to the repo. If this runs after the date, the new files will be created and pushed back to the repo triggering GitHub Pages to generate the latest site version with the final post.

You may notice that i've triggered this specific workflow to always fail.

```yml
- name: Fail to notify
  run: exit 1
```

By default, GitHub Actions only sends a notification for failures. I didn't want to turn on notifications for successful workflows in case I added others. Then I start getting spammed with these e-mails for every successful workflow. This way, any time the workflow runs, I'll get a notification without changing anything.  The push still occurs and the site gets updated regardless.

```yml
on:
  schedule:
   - cron: '30 1 1,15 * *'
```

I've set the workflow to run every two weeks. It'll perform that date check, and if the date passes, the content will get posted. The site is updated and published live. If it's not that date yet, the workflow will fail, and I'll get a reminder in my e-mail to keep pushing the date forward. All I need to do is edit the date in the `canary.sh` file. Pretty simple.

You never know what could happen to you, but at least you can have the final say in it all.

Full GitHub Action code is available below.

```yml
on:
  schedule:
   - cron: '30 1 1,15 * *'
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
      with:
        persist-credentials: false # otherwise, the token used is the GITHUB_TOKEN, instead of your personal access token.
        fetch-depth: 0 # otherwise, there would be errors pushing refs to the destination repository.
    - name: Create local changes
      run: |

        . canary.sh # Source all the envars from our canary.sh file for access

        currentdate=$(date '+%Y-%m-%d') # Get current day
        postdate=date -d "+$(($KILLCANARY -2)) days" '+%Y-%m-%d'
        
        # convert dates to seconds for math
        currentdateseconds=$(date -d $currentdate +%s)
        deadcanaryseconds=$(date -d $KILLCANARY +%s)
        
        # If the current date is past the kill canary date 
        # then create the new github pages post with the release date
        if [ $currentdateseconds -ge $deadcanaryseconds ]; then
          # check if the dead.canary exists - so this doesn't run multiple times
          if [ ! -f dead.canary ]; then
            # create a dead.canary file, so that we don't run our dead canary code
            # on any further scheduled github action runs
            echo "CANARY IS DEAD" > dead.canary
            # create a post with a date from two days ago
            # this will assure that github pages publishes it
            printf -- "---\nlayout: post\nimg: someimage.jpg\ntitle: This is the article title\ntags: []\n---\n\nThis is some content for the article" > "_posts/${postdate//[$'\t\r\n']}-last-post.md"
          fi
        fi 

    - name: Commit files
      run: |
        git config --local user.email "41898282+github-actions[bot]@users.noreply.github.com"
        git config --local user.name "github-actions[bot]"
        git add -A
        git commit -m "Add changes $KILLCANARY" -a
    - name: Push changes
      uses: ad-m/github-push-action@master
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        branch: ${{ github.ref }}
    - name: Fail to notify
      run: exit 1
```