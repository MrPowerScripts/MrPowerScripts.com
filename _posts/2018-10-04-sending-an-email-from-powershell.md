---
layout: post
title: Sending an email from Powershell
date: 2018-10-03 12:00:45+00
tags: [mrpowerscripts, sending email, send email PowerShell, send email from PowerShell ]
description-long: I made this video about sending an email from Powershell about five years ago. I didn't think much of it at the time, but I used my actual email address in the example of the video. This resulted in people copy/pasting the example including my email and sending me all of their test emails. I've really loved it!
---

{% include youtubePlayer.html id="gxHdAic6im8" %}
I made this video about sending an email from Powershell about five years ago. I didn't think much of it at the time, but I used my actual email address in the example of the video. This resulted in people copy/pasting the example including my email and sending me all of their test emails. I've really loved it!

You never think that something as simple as sending an email from Powershell could be interesting to so many people. I didn't think so at the time. Since that video has existed I've received "test" emails from people all over the world working at lots of different companies. Big and small. Governments and non-profits. It's hard to imagine how sharing something so simple can impact so many people. If you want to bug me as well here's the code itself:

    $MyEmail = "PlayingWithPowershell@gmail.com"
    $SMTP= "smtp.gmail.com"
    $To = "PlayingWithPowershell@gmail.com"
    $Subject = "BRO!"
    $Body = "WHAT UP MR.POWERSCRIPTS?"
    $Creds = (Get-Credential -Credential "$MyEmail")

    Start-Sleep 2

    Send-MailMessage -To $to -From $MyEmail -Subject $Subject -Body $Body -SmtpServer $SMTP -Credential $Creds -UseSsl -Port 587 -DeliveryNotificationOption never

    <# 
    $PSEmailServer variable can be used to pre-configure the
    SMTP server in your Powershell Profile. Then you don't need
    to specify -smtpserver paramter. Send-MailMessage will use the
    SMTP sever address assigned to $PSEmailServer
    Delivery Notification Options:
    -- None: No notification.        
    -- OnSuccess: Notify if the delivery is successful.      
    -- OnFailure: Notify if the delivery is unsuccessful.     
    -- Delay: Notify if the delivery is delayed.       
    -- Never: Never notify.
    #>


Make sure that you go to https://myaccount.google.com/security and scroll all the way to the bottom to toggle on "Allow less secure apps" if you want to try this with your Gmail account like in the video example. You can toggle it back off once you've finished screwing around. 

I'll usually reply when I have time. With something like "Congratulations! It Worked!". 99% of the time I never hear a reply back. But once in a while, I'll get further requests for support. Which I don't reply to 99% of the time. Ya'll know how to use Google like I do.



