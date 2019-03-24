---
layout: post
title: Microsoft Excel Automation with Powershell 
date: 2019-03-24 11:00:45+00
tags: [mrpowerscripts, Microsoft Excel Automation, Microsoft Excel Powershell Automation. Automation with Powershell, Powershell Excel workbooks and worksheets]
description-long: Do you want to take your Excel skills to the next level? Did you know that you don't need Excel to work with Excel files? Sometimes doing things programmatically is a bit easier than pointing and clicking. Or maybe you need to process a lot of files really fast, over and over again. Powershell automation with Microsoft Excel is possible! In this video you'll see how you can update Excel workbooks and worksheets with a Powershell script.
---

Do you want to take your Excel skills to the next level? Did you know that you don't need Excel to work with Excel files? Sometimes doing things programmatically is a bit easier than pointing and clicking. Or maybe you need to process a lot of files really fast, over and over again. Powershell automation with Microsoft Excel is possible! {% include youtubePlayer.html id="3blgg3QfJP8" %} In this video you'll see how you can update Excel workbooks and worksheets with a Powershell script.

Excel has a COM interface which is a technology developed by Microsoft  (of course). I've never read an amazing explanation of COM but basically, it allows communication between programming languages and Windows applications. Even if the application was not built with the programming language. Powershell is more of a scripting language, but we can connect to the Excel COM interface all the same.

Through this COM interface Excel exposes [the Excel Object Model](https://docs.microsoft.com/en-us/office/vba/api/overview/excel/object-model). I've linked you to the current docs, but that link will probably be dead in six months - because Microsoft. Also, the examples shown  for the Excel Object Model use something called Visual Basic for Applications. Which is something I learned about 5 minutes ago when I was trying to find the old generic Excel Object Model reference. Apparently it doesn't exist anymore. Once again, because Microsoft. I wish I could offer more help and insights but - Microsoft. Still, you can use the script below to play around with creating and updating workbooks and worksheets. You can also explore the properties of the excel object with `Get-Member` to learn more about the available options. 

You can [find the file here on GitHub](https://github.com/MrPowerScripts/PowerScripts/blob/16740162b415b9d91f9d4bbd930b2a6d33de1788/Excel/WorkbooksAndWorksheetsExcel.ps1) or check out the source below.

```powershell

#None of this will work through an already open excel application
#You must open Excel and workbooks you want to manipulate via the COMobject

####################################################
############### Starting Excel #####################
####################################################

$Excel = New-Object -ComObject Excel.Application

$Excel.Visible = $true
$Excel.DisplayAlerts = $false

####################################################
############## Working with Workbooks ##############
####################################################

#Add a workbook to your current excel file
#You can add multiple workbooks with this method
$Excel.Workbooks.Add()

#Find all the workbooks in your excel file by name
$Excel.Workbooks | Select-Object -ExpandProperty name

#Activate a specifc workbook in your excel file
$Excel.Workbooks.Item(2).activate()
$Excel.Workbooks.Item("book1").activate()

#Acivate Random Workbook in Excel file
$Excel.Workbooks.Item((Get-Random -min 1 -Max ($Excel.Workbooks.Count+1))).activate()

#Open an existing workbook on your hardrive
$Excel.Workbooks.Open("$env:userprofile\desktop\mrpowerscripts.xlsx")

#close workbooks from an excel file
$Excel.Workbooks.Item(1).close()
$Excel.Workbooks.Item("MrPowerScripts.xlsx").close()

#Save workbooks to the hard drive
$Excel.Workbooks.item(1).SaveAs("$env:userprofile\Desktop\asdf.xlsx")


####################################################
########### Working with Worksheets ################
####################################################

#These bits of code will affect the active Workbook.

#Add a worksheet to your active workbook
$Excel.Worksheets.Add()

#Find all worksheets in your active workbook
$Excel.Worksheets | Select-Object -ExpandProperty name

#Change name of worksheet in workbook
$Excel.Worksheets.Item(1).name = "potato"
$Excel.Worksheets.Item("potato").name = "spud"

#Activate specific worksheet in workbook
$Excel.Worksheets.Item(2).activate()
$Excel.Worksheets.Item("sheet3").activate()

#Acivate Random Worksheet in Excel file
$Excel.Worksheets.Item((Get-Random -min 1 -Max ($Excel.Worksheets.Count+1))).activate()

#Delete worksheets from workbook
$Excel.Worksheets.Item(1).delete()
$Excel.Worksheets.Item("Sheet3").delete()


####################################################
########## Cleaning up the environment #############
####################################################

$Excel.Workbooks.Close()
$Excel.Quit()

#Check and you will see an excel process still exists after quitting
#Remove the excel process by piping it to stop-process
Get-Process excel | Stop-Process -Force

#Now we must release the $excel com object to ready it for garbage collection
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($Excel)
```