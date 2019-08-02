---
layout: post
title: Reduce memory usage of Gradle and Kotlin for Android development DevOps
date: 2019-03-10 05:00:45+00
categories: [tutorial]
tags: [mrpowerscripts, java memory, android development, gradle memory, kotlin memory]
description-long: When you're building your android project locally your machines probably have a lot of horsepower. When you're running in a DevOps workflow such as continuous integration and delivery you may not have as many resources. This can cause your builds to run out of memory. Here are some quick tips to help reduce the memory usage of your Gradle and Kotlin builds for Android development.
---

When you're building your android project locally your machines probably have a lot of horsepower. When you're running in a DevOps workflow such as continuous integration and delivery you may not have as many resources. This can cause your builds to run out of memory. Here are some quick tips to help reduce the memory usage of your Gradle and Kotlin builds for Android development.

## Tell Java to chill out with the memory usage

Since android build tools are Java-based, and Java is a memory hog, you can first tell Java to limit its memory usage. You might see people put these same options in a `GRADLE_OPTS` variable but if the process gets forked those options won't always get passed down into the forked process. It's better to set an environment variable consumed direction by Java. `_JAVA_OPTIONS` environment variable is widely supported in Oracle based Java environments. Combined with the `-Xmx` configuration you can set the max heap size for use by Java, which is where it stores things like class objects into memory. Setting this value to 75% of the available memory will give Java enough room to store what it needs without choking the rest of the system resources. If you have 4GB available, then try setting it to  3GB. `_JAVA_OPTIONS=-Xmx3g`.

## Shut down the daemons

This is a tip for both Gradle and Kotlin as they each have their own daemons. The daemons run in the background and help speed up re-compilation times by storing generated project information from previous compilation times. Typically when running in a CI workflow you won't be recompiling anything as environments are reset each time. In this case, the daemon will take up extra memory without providing any benefits.

Using these methods to control memory use in your Android DevOps lifecycle can reduce out of memory failures within environments that don't have limited resources.
