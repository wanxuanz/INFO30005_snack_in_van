**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository

Welcome!

We have added to this repository a `README.md`, `.gitignore`, and `.gitattributes`.

* **README.md**: is the document you are currently reading. It should be replaced with information about your project, and instructions on how to use your code in someone else's local computer.

* **.gitignore**: lets you filter out files that should not be added to git. For example, Windows 10 and Mac OS create hidden system files (e.g., .DS_Store) that are local to your computer and should not be part of the repository. This files should be filtered by the `.gitignore` file. This initial `.gitignore` has  been created to filter local files when using MacOS and Node. Depending on your project make sure you update the `.gitignore` file.  More information about this can be found in this [link](https://www.atlassian.com/git/tutorials/saving-changes/gitignore).

* **.gitattributes**: configures the line ending of files, to ensure consistency across development environments. More information can be found in this [link](https://git-scm.com/docs/gitattributes).

Remember that _"this document"_ can use `different formats` to **highlight** important information. This is just an example of different formating tools available for you. For help with the format you can find a guide [here](https://docs.github.com/en/github/writing-on-github).

## Table of contents
* [Team Members](#team-members)
* [General Info](#general-info)
* [Technologies](#technologies)
* [Code Implementation](#code-implementation)
* [Adding Images](#adding-images)

## Team Members

| Name | Task | State |
| :---         |     :---:      |          ---: |
| Yu-Wen Michael Zhang  | manage the customer app     |  Done |
| Ming Zhang   | README Format and manage the customer app      |  Done |
| Yifei Wang    | manage the customer app    |  Done |
| Claire    | manage the vender app    |  Done |
| Chloe    | manage the vender app    |  Done |

## General info
This is project is about creating an vendor app and customer app from scratch. The home page of our website is [link](https://snacks-in-a-van-webg100.herokuapp.com/).


## Technologies
Project is created with:
* NodeJs 14.16.X
* Ipsum version: 2.33
* Ament library version: 999

## Code Implementation

You can include a code snippet here.

```HTML
<!--
Example code from: https://www.w3schools.com/jsref/met_win_alert.asp
__>

<!DOCTYPE html>
<html>
<body>

<p>Click the button to display an alert box.</p>

<button onclick="myFunction()">Try it</button>

<script>
function myFunction() {
  alert("Hello! I am an alert box!");
}
</script>

</body>
</html>
```

## Adding Images

You can use images/gif hosted online:

<p align="center">
  <img src="https://github.com/Martin-Reinoso/sandpit-Profile/raw/main/Images_Readme/01.gif"  width="300" >
</p>

Or you can add your own images from a folder in your repo with the following code. The example has a folder `Gifs` with an image file `Q1-1.gif`:
```HTML
<p align="center">
  <img src="Gifs/Q1-1.gif"  width="300" >
</p>
```

To create a gif from a video you can follow this [link](https://ezgif.com/video-to-gif/ezgif-6-55f4b3b086d4.mov).

You can use emojis :+1: but do not over use it, we are looking for professional work. If you would not add them in your job, do not use them here! :shipit:

**Now Get ready to complete all the tasks:**

- [x] Read the Project handouts carefully
- [x] User Interface (UI)mockup
- [ ] App server mockup
- [ ] Front-end + back-end (one feature)
- [ ] Complete system + source code
- [ ] Report on your work(+ test1 feature)


App server mockup instruction:

customer features:
1) View menu of snacks (including pictures and prices)
input this url below
https://snacks-in-a-van-webg100.herokuapp.com/customer/menu

2) View details of a snack
input the foodid after menu, the page would change to the snack detail of this id.
eg:https://snacks-in-a-van-webg100.herokuapp.com/customer/menu/1004

3) Customer starts a new order by requesting a snack
input "add" after the foodid that you want to order, 
after that this food will be shown at cart array of this customer(assume we have logged in as Michael)   
eg:https://snacks-in-a-van-webg100.herokuapp.com/customer/menu/1004/add

at our customer app, we have also achieved the following function
1) Add new customer to our database
when you are at page https://snacks-in-a-van-webg100.herokuapp.com/customer/, you can input the new customer detail at body(postman),
the input format is {"firstName":xxxx,"lastName":xxxx,"customerId":xxxx}
after that you can see new customer detail at page https://snacks-in-a-van-webg100.herokuapp.com/customer/.


vendor features:
1) Setting van status (vendor sends location, marks van as ready-for-orders)

a)vendor sends location:
input the vanId you want to log in behind https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/
when you are at page https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/0001, you can input the location at body(postman), the location of this van will change.

b)marks van as ready-for-orders
input the ":vanId/update_status" behind https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/, 
after that, you can change the status of this van(close to open. open to close)
eg:https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/

2) Show list of all outstanding orders
input "orders/outstanding" after vanId to show list of all outstanding orders of this van
eg https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/0001/orders/outstanding

3) Mark an order as "fulfilled" (ready to be picked up by customer)
input orderid which is shown at previous feature(Show list of all outstanding orders) behind orders, after that input update_status, the status of this order would change to fullfilled.
eg https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/0001/orders/10005/update_status
