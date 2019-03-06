---
layout: post
title: Host your own private docker registry with Portus
date: 2019-01-01 09:06:45+00
tags: [mrpowerscripts, private Docker registry, setup docker registry, set up private Docker registry]
description-long: If you're familiar with docker then you've probably used DockerHub. Dockerhub is AWESOME. I absolutely love (most) of it and what it does. DockerHub is simply a docker container registry. It's a place where you can store, pull, and share docker containers. It's not the only container registry. Google has their own container registry where you can upload your images. Microsoft and Amazon also have docker container registries. All of that is great, but what if you want to host your won docker images in a private registry. Those registries I mentioned have support for private accounts, but I'm going to reveal how you can host your own private container registry that you control.
---

If you're familiar with docker then you've probably used DockerHub. Dockerhub is AWESOME. I absolutely love (most) of it and what it does. DockerHub is simply a docker container registry. It's a place where you can store, pull, and share docker containers. {% include youtubePlayer.html id="gvaRfAqCfGY" %} It's not the only container registry. Google has their own container registry where you can upload your images. Microsoft and Amazon also have docker container registries. All of that is great, but what if you want to host your won docker images in a private registry. Those registries I mentioned have support for private accounts, but I'm going to reveal how you can host your own private container registry that you control.

Want to automate this whole configuration process? I have a script that will set all of this up in 10 minutes! With some extra configuration that is very useful for a first install. You can [find a link to the script here](https://bit.ly/mrps-docker-registry). Enjoy!

Two requirements:

- A domain name
- A server

The server is simple. I used at $10 Ubuntu 18.10 droplet on Digital Ocean configured with SSH access. Though it should work for 18.04 as well. When you can SSH into your server you're ready for the next step

I'm sure you want to login to your docker registry using the docker client locally - as you do with DockerHub. In order for that to happen, there must be a secured connection between you and the registry (your server). Else docker will throw a fit and require all kinds of hacks to get things working.

So, you're going to need an SSL certificate from a trusted certifitate authority. We're going to use [LetsEncrypt](https://letsencrypt.org) because it's free and can be automated. I used [this blog post](https://www.humankode.com/ssl/how-to-set-up-free-ssl-certificates-from-lets-encrypt-using-docker-and-nginx) to get my SSL cert on the server.  It explains everything you'll need to make sure your domain is configured properly for secured connections.

Once you have your domain configured properly and the SSL certificate is on the server you can start configuring the registry. Docker themselves maintains and releases [a docker image](https://hub.docker.com/_/registry/) that is a Docker registry. Yea, they put a docker container registry in a docker container. But there's one problem. There's no GUI. There's no access control. It's not that exciting by itself. If only there was some open source project built off this registry container that had all the cool bells and whistles included. Oh, right, there is. [Portus](https://github.com/SUSE/Portus).

Portus is amazing. I'll go over the Portus UI in the video, but it does basically everything you could want it to do. You can create accounts, teams, and namespaces. You can add access controls to make images private, private to logged in users, or public for anyone on the internet to use. The UI is very clean and well organized.

This [blog post](https://www.objectif-libre.com/en/blog/2018/06/11/self-hosting-a-secure-docker-registry-with-portus/) put me in the right direction to configure Portus and get it running. Thankfully they have a `docker-compose.yml` file that can be used which spins up all the services.

After modifying the `docker-compose.yml` from the blog article to use my own SSL certificate, and extra little config changes here and there to improve the experience, the Portus server is live!

Now I'm able to `docker login` into my own secure private Docker registry where I can manage and share access to images.