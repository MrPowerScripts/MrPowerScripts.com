---
layout: post
title: Advanced function parameters in Powershell
date: 2019-08-02 03:00:45+00
categories: [powershell, tutorial]
tags: [mrpowerscripts, powershell function parameters, advanced powershellfunction parameters, functions in powershell, powershell functions.]
description-long: If you're not making use of functions in your Powershell code then you need to stop what you're doing right now and learn about them! But where?!? Oh, click the video below and watch. That will get you started. That's awesome! Now you know what functions are! Exciting! But after you've made a function you'll probably want to adapt it a bit. Reusability of code without some customization is super limiting. Next you'll want to learn how to add parameters to your functions. By adding parameters to your functions you'll unlock the true power of functions in Powershell! Thankfully the video below will get you up to speed on function parameters in powershell. Then you're ready for the advanced stuff!
---

If you're not making use of functions in your Powershell code then you need to stop what you're doing right now and learn about them! But where?!? Oh, click the video below and watch. That will get you started. {% include youtubePlayer.html id="qz0x_WL8ueo" %} That's awesome! Now you know what functions are! Exciting! But after you've made a function you'll probably want to adapt it a bit. Reusability of code without some customization is super limiting. Next you'll want to learn how to add parameters to your functions. By adding parameters to your functions you'll unlock the true power of functions in Powershell! Thankfully the video below will get you up to speed on function parameters in powershell. Then you're ready for the advanced stuff!

{% include youtubePlayer.html id="RW2tRebxqzQ" %}

So now you know what functions are in Powershell, and you've learned a few ways to add parameters to them. But if you create your Powershell functions without some of the advanced Powershell function parameter techniques you might be setting yourself up for future disaster! Leading you or others using your code to end up in an endless pit of darkness and dispair.

Here are a few reasons why you would want to use advanced powershell function parameters:

1. Control the types of arguments passed into functions. If someone puts an string into a function when it should be an integer Powershell will automatically warn them.
1. Flags allow you to modify a powershell functions behavior without users needing to supply a parameter.
1. Create help messages for your parameters so that users will know how to use them appropriately
1. Configure some parameters to be mandatory and prevent the function from running if it is unused
1. Add validation to the arguments passed into the function. Only want the user to enter a number between 1 and 100? You can enforce that. Do you want to control whether they can pass in a null value, or empty string? You can validate for that as well. You can even validate the argument using a regex string.
1. Control whether or not an argument can be passed into the function through the powershell Pipleline.

These are a few of the benefits, and there are even more! Adding some of these advanced powershell function parameter techniques can seriously improve the reliablity and reusability of your functions. Check out the video below to see some of the benefits in action!

{% include youtubePlayer.html id="6ySxsnOGnCU" %}
