**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository

**Welcome to webg100 Group Repository !**


## Table of contents
* [Team Members](#team-members)
* [General Info](#general-info)
* [Detailed Info](#detailed-info)
* [Instructions of Using code](#instructions-of-Using-code)
* [Technologies](#technologies)
* [App server mockup instruction](#app-server-mockup-instruction)


## Team Members

| Name | Task | State |
| :---         |     :---:      |          ---: |
| Yu-Wen Michael Zhang  | manage the customer app     |  Done |
| Ming Zhang   | README Format and manage the customer app      |  Done |
| Yifei Wang    | manage the customer app    |  Done |
| Claire    | manage the vender app    |  Done |
| Chloe    | manage the vender app    |  Done |

## General info
This is project is about creating an vendor app and customer app from scratch. 
* The home page of our website is https://snacks-in-a-van-webg100.herokuapp.com. 
* The customer side application can be accessed by https://snacks-in-a-van-webg100.herokuapp.com/customer.
* The vendor side application can be accessed through https://snacks-in-a-van-webg100.herokuapp.com/vender.

## Detailed info
In detailed info, we will explain the usage of all the links in our server.

Features needs to be delivered in **Deliverable 2 - Mockup App Server** can be found here [App server mockup instruction](#app-server-mockup-instruction). 

_The following inclues other features which are not part of the **Deliverable 2 - Mockup App Server**_

* when you are at page https://snacks-in-a-van-webg100.herokuapp.com/customer/, you will be able to view all the customers' details who are currently stored in our database (the Collection name that the customers details stored is **`customers`**). You can add a new customer in postman by typing this URL https://snacks-in-a-van-webg100.herokuapp.com/customer/ and set the request as POST. Then in the body you can type `{"firstName":xxxx,"lastName":xxxx,"customerId":xxxx}` in the text box and set the input format as **`raw`** and **`JSON(application/javascript)`** above the text box. After that you can see new customer detail at page https://snacks-in-a-van-webg100.herokuapp.com/customer/.


## Instructions of Using code
clone this repository and install all the dependencies in **package.json** and type **npm start** to run the code. However, you may not be able to run these codes because you cannot access our database. Further information will be posted here soon or you can email the following: **yuwenmichael@student.unimelb.edu.au** to ask for authentication.

## Technologies
Project is created with:
* NodeJs 14.16.X
* Ipsum version: 2.33
* Ament library version: 999


**Now Get ready to complete all the tasks:**

- [x] Read the Project handouts carefully
- [x] User Interface (UI)mockup
- [x] App server mockup
- [ ] Front-end + back-end (one feature)
- [ ] Complete system + source code
- [ ] Report on your work(+ test1 feature)


## App server mockup instruction:

**customer features:**
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
