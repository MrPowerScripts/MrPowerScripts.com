---
layout: post
title: Oh My Gosh turn your PWA into an Android app in the Google play store
date: 2020-04-26 03:00:45+00
categories: ["blog post"]
tags: [mrpowerscripts]
description-long: Do you have a Progressive Web App (PWA) that you would love to see in Google's Android play store? You can make that happen today! With bubblewrap from GoogleChromeLabs. It is an experimental tool that uses a CLI to process your PWA and generate an apk you can upload to the play store. Let's look at how I did it for one of my sits. Now, mrpowerscripts.com isn't a PWA... yet. But I have many other flat Jekyll sites that are progressive web apps. 
---

Do you have a [Progressive Web App (PWA)](https://en.wikipedia.org/wiki/Progressive_web_application) that you would love to see in Google's Android play store? You can make that happen today! With [bubblewrap from GoogleChromeLabs](https://github.com/GoogleChromeLabs/bubblewrap). It is an experimental tool that [uses a CLI](https://github.com/GoogleChromeLabs/bubblewrap/tree/master/packages/cli) to process your PWA and generate an apk you can upload to the play store. Let's look at how I did it for one of my sits. Now, mrpowerscripts.com isn't a PWA... yet. But I have many other flat Jekyll sites that are progressive web apps.

## Progressive Web apps look like native apps

You install a progressive web app through browsers like Chome. Not every browser supports PWAs yet, but support is growing. For instance, Firefox Mobile supports them, but Firefox Desktop, as of this date, does not. All you need to do to turn your website into a progressive web app is to add a manifest file with the details of your PWA and a service worker. Here is an example of my manifest.json file, which lives in the root of my site.

```json
{
  "name": "ThisIsMySiteOrPWAName",
  "short_name": "ThisIsShorter",
  "theme_color": "#39a4cd",
  "background_color": "#fff",
  "prefer_related_applications": false,
  "display": "standalone",
  "Scope": "/",
  "start_url": "/?utm_source=a2hs",
  "icons": [
    {
      "src": "assets/img/favicon/manifest-icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/img/favicon/manifest-icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

Browsers will see this file and know that it should treat your site as a progressive web app. You also need to configure a service worker, which allows your PWA to have cool capabilities. Like offline viewing with caching, and push notifications. You know, like a native app! But this isn't a howto on setting up a PWA. I'm assuming you already have one.

## The bubblewrap CLI

Once you have a site that is working as a PWA, you can start using [the bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap/tree/master/packages/cli). Now, this may feel a bit overwhelming but stay with me here. Here are the commands you need to run to turn the PWA into an APK. `bubblewrap init --manifest https://example.com/manifest.json` and `bubblewrap build`. That's it? That's it. The bubblewrap CLI tool pulls in your PWA manifest file information and uses it to initialize the project. It might be a good idea to use the `--directory=` on the init as well, so it keeps everything in a folder for you. Then you can turn that folder into a git repo and track the changes. The `bubblewrap build` command takes the initialized project and uses it to build an Android APK. From there, you can treat it as a standard Android APK file. Like uploading it to the play store.

Now, if you went to look at the repo, you'll notice that there is a bit of setup because of dependencies. But it seems like this is a relatively new project that has a lot of ongoing work, so I think the dependencies will be managed better in the future. The great thing is that it works now! If you have any issues setting it up pop into [Discord](https://bit.ly/mrps-discord) and get help.

## This works thanks to Trusted Web Activity

Trusted web activity is an open way to verify trusted web content within an Android app. So, anything that is being opened by the mobile Chrome browser within an app. Sometimes you'll see native apps can load web content in a browser. It's still chrome, embedded within the native app. TWA tells the browser that the content is from the same developer as the app. How does the browser know that the website it's opening is a TWA? It does this by creating a Digital Asset Links file, which like the manifest file, is accessible from your website. It would live here: `https://example.com/.well-known/assetlinks.json` Here's an example `assetlinks.json` from [Google's TWA Quickstart guide](https://developers.google.com/web/android/trusted-web-activity/quick-start#creating-your-asset-link-file).  

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.appspot.pwa_directory",
    "sha256_cert_fingerprints": [
      "FA:2A:03:CB:38:9C:F3:BE:28:E3:CA:7F:DA:2E:FA:4F:4A:96:F3:BC:45:2C:08:A2:16:A1:5D:FD:AB:46:BC:9D",
      "4F:FF:49:FF:C6:1A:22:E3:BB:6F:E6:E1:E6:5B:40:17:55:C0:A9:F9:02:D9:BF:28:38:0B:AE:A7:46:A0:61:8C"

    ]
  }
}]
```

I created that file through a tool in their quickstart guide called `Peter's Asset Link Tool`. You can [download Peter's Asset Link Tool](https://play.google.com/store/apps/details?id=dev.conn.assetlinkstool&hl=en) from the Play store. After publishing a Beta version of the app to the play store and downloading it, I was able to use that tool to generate the `assetlinks.json file` and add it to my site. So when the generated APK opens my PWA using chrome, it knows that I made the app because of the fingerprint on my website. My content is therefor trusted and granted special abilities like being full screen. Otherwise, you would see the chrome toolbar at the top. Similar to when you see other native apps open a browser. So it's a website disguised as a PWA disguised as a native app. It's pretty cool!

PWA's brought a lot of bower to websites on native devices, and TWA with fancy new tools is further blurring the line between web and native applications. In this case, I only need one code base any my responsive site works on Desktop, tablets, mobile devices, Play store, and many more interfaces thanks to simple web conventions.

Try it out!

