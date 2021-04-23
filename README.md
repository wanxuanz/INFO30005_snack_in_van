**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository

**Welcome to webg100 Group Repository !**


## Table of contents
* [Team Members](#team-members)
* [General Info](#general-info)
* [Detailed Info](#detailed-info)
* [Instructions of Using code](#instructions-of-Using-code)
* [Handling images](#handling-images)
* [Technologies](#technologies)
* [App server mockup instruction](#app-server-mockup-instruction)


## Team Members

| Name | Student ID| Task | State |
| :---         |     :---:      |     :---:      |          ---: |
| Yu-Wen Michael Zhang  |1089117| README Format manage the customer app     |  Done |
| Ming Zhang   |1068302| README Format and manage the customer app      |  Done |
| Yifei Wang    |1001686| manage Postman testing and the customer app    |  Done |
| Claire    |1080915| manage the vender app    |  Done |
| Chloe    |1079686| manage the vender app    |  Done |

## General info
This is project is about creating an vendor app and customer app from scratch. 
* The home page of our website is https://snacks-in-a-van-webg100.herokuapp.com. 
* The customer side application can be accessed by https://snacks-in-a-van-webg100.herokuapp.com/customer.
* The vendor side application can be accessed through https://snacks-in-a-van-webg100.herokuapp.com/vender.

## Detailed info
In detailed info, we will explain the usage of all the links in our server.

Features needs to be delivered in **Deliverable 2 - Mockup App Server** can be found here [App server mockup instruction](#app-server-mockup-instruction). 

_The following inclues other features which are not part of the **Deliverable 2 - Mockup App Server**_

* When you are at page https://snacks-in-a-van-webg100.herokuapp.com/customer/, you will be able to view all the customers' details who are currently stored in our database (the Collection name that the customers details stored is **`customers`**). You can add a new customer in postman by typing this URL https://snacks-in-a-van-webg100.herokuapp.com/customer/ and set the request as POST. Then you can type `{"firstName":xxxx,"lastName":xxxx,"customerId":xxxx}` in the text box and set the input format as `raw` and `JSON(application/javascript)` above the text box. After that you can see new customer detail at page https://snacks-in-a-van-webg100.herokuapp.com/customer/.


## Instructions of Using code
clone this repository and install all the dependencies in **package.json** and type **npm start** in terminal to run the code. However, you may not be able to run these codes because you cannot access our database. Further information will be posted here soon or you can email the following: **yuwenmichael@student.unimelb.edu.au** to ask for authentication.

## Handling images
the photos for each food are stored as **String** in database (in **Collections: foods**). The photo is retrieved from https://unsplash.com/photos/. If you want to see the photo, simply append the string found in database to this URL: https://unsplash.com/photos. <br />
For example, Cappuccino has photo String: **6o2Dk5Op8VI**, if you want to view the photo, you can go to this URL and view it.https://unsplash.com/photos/6o2Dk5Op8VI.
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

* (1) **`View menu of snacks (including pictures and prices)`**<br />
type this url below<br />
https://snacks-in-a-van-webg100.herokuapp.com/customer/menu

* (2) **`View details of a snack`**<br />
type the foodid after menu, you will be able to see the snack detail of this foodid.<br />
eg:https://snacks-in-a-van-webg100.herokuapp.com/customer/menu/1004

* (3) **`Customer starts a new order by requesting a snack`**<br />
type "add" after the foodid that you want to order, after that this food will be shown at cart array of the current customer (assume the login customer is Michael)<br /> 
eg:https://snacks-in-a-van-webg100.herokuapp.com/customer/menu/1004/add<br />


**vendor features:**

* (1) **`Setting van status (vendor sends location, marks van as ready-for-orders)`**<br />
  In the following link you will be able to see all the vans we currently have in our database: https://snacks-in-a-van-webg100.herokuapp.com/vender/vans 
* (1a) vendor sends location:
type the **vanId** you want to login after this link  https://snacks-in-a-van-webg100.herokuapp.com/vender/vans <br />
eg: https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/0001 <br />
then if you want to send the location in the database(assuming the vendor doesn't change it location), you can type **send_location** like the following: https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/0001/send_location. <br />
If the logined van changes its selling location, they need to change it current location in the database and send its current new location by typing **send_location** like the following: https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/0001/send_location. <br />
but this time, it will be a **POST** request. <br />
you need to use postman to run this.  you can type `{"location": xxxxxxx}` in the text box and set the input format as `raw` and `JSON(application/javascript)` above the text box. After that you will be able to see this change in the database(collection name is **`vans`**). Also, a text will be displayed in postman like: `Van locatioin: "xxxxxx" has been updated and sent successfully`. <br />

* (1b) marks van as ready-for-orders<br />
type **update_status** after the current vanId like: https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/0001, after that, you can change the status of this van(from close to open, or from open to close)<br />
eg: https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/0001/update_status

* (2) **`Show list of all outstanding orders`** <br />
type "orders/outstanding" after vanId to show list of all outstanding orders of the current van <br />
eg: https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/0001/orders/outstanding

* (3) **`Mark an order as "fulfilled" (ready to be picked up by customer)`** <br />
type orderid which is shown at previous feature(Show list of all outstanding orders) behind orders, after that type **update_status**, the status of this order would change to fullfilled.<br />
eg: https://snacks-in-a-van-webg100.herokuapp.com/vender/vans/0001/orders/10005/update_status <br />
This will change the status from outstanding to fullfilled of order 10005 in vans 0001.
