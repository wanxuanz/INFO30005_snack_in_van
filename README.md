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
* [How to access our database](#how-to-access-our-database)
* [Technologies](#technologies)
* [App server mockup instruction](#app-server-mockup-instruction)
* [Front end and back end (deliverable 3)](#Front-end-and-back-end-deliverable-3)


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
clone this repository and install all the dependencies in **package.json** and type **npm start** in terminal to run the code. However, you may not be able to run these codes because you cannot access our database. If you intend to do so, we have provide one of our username and password. Please refer to here: [How to access our database](#how-to-access-our-database).

## Handling images
the photos for each food are stored as **String** in database (in **Collections: foods**). The photo is retrieved from https://unsplash.com/photos/. If you want to see the photo, simply append the string found in database to this URL: https://unsplash.com/photos. <br />
For example, Cappuccino has photo String: **6o2Dk5Op8VI**, if you want to view the photo, you can go to this URL and view it.https://unsplash.com/photos/6o2Dk5Op8VI.


## How to access our database
Here is one of the username and password that allow you to access our database:<br />
**`MONGO_USERNAME=Michael`**<br />
**`MONGO_PASSWORD=1234`**

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

## Front end and back end (deliverable 3)
* (1) **`Customer Login`**<br />
This is the main website of our customer app <br />
https://snacks-in-a-van-webg100.herokuapp.com<br />
(1a) **Register**: you can register by click the "Register" on navigation bar or just go to the below url to register<br />
https://snacks-in-a-van-webg100.herokuapp.com/customer/register<br />
Once register is successful, the useer is automatically login. If the customer do not enter all the mandatory detail in the register page, they won't register successfully.<br />
(2a)**Login**: click the “Login” on navbar or just go to the below url to login<br />
https://snacks-in-a-van-webg100.herokuapp.com/customer/login<br />
Enter the sample username and password in LOGIN DETAIL: <br />
**`EMAIL=123@123.com`**<br />
**`PASSWORD=123`**<br />
After the customer login, the navigation bar will not displaying the `Login` or `Register` button anymore.The navigation bar will then include `Shopping cart` and `Orders` button.<br /> 
In addition, the user can log out at any time by click “Log Out” on navigation bar. <br />

* (2) **`View menu of snacks`**<br />
One can view the menu after login (in the navigation bar), but those who did not sign in can also view the menu. However, they cannot add the food they want to their `shopping cart` as the user hasn't login in.<br />
You can either click “Menu” on the navbar or go straight to the website. <br />
The list of snacks is shown on the below website **`(not login)`**<br />
https://snacks-in-a-van-webg100.herokuapp.com/customer/menu<br />
If the customer login in already, they need to click the `Menu` on the navigation bar and the URL will change accordingly<br />
assume the login customer is:<br />
**`EMAIL=123@123.com`**<br />
**`PASSWORD=123`**<br />
then the URL to access the menu of snacks will be: <br />
https://snacks-in-a-van-webg100.herokuapp.com/customer/608014ef58b68869da398c48/menu<br />
You may view the details of each food by clicking on the food name on the menu page <br />
When you view the details of each food, you can add the current food to `shopping cart` by click `Add to Cart` button.
eg:https://snacks-in-a-van-webg100.herokuapp.com/customer/608014ef58b68869da398c48/menu/1001<br />
This URL will access the detail of `Cappuccino`
If the customer hasn't login, the link below can view the detail of `Cappuccino`<br />
eg:https://snacks-in-a-van-webg100.herokuapp.com/customer/menu/1001

* (3) **`Order three different snacks`**<br />
To be able to order foods, one must be logged in to do so. If one did not log in, when it tries to add something to the shopping cart, it will be directed to the login page. <br />
If you already logged in, go to the menu page and click the food name you are interested in to go to the food detail page, and then you can click the  `add to cart` button to add the item to shopping cart. You can implement the above sentence several times to add other foods you want to cart. <br />
After adding foods to your shopping cart, you can click the `Shopping cart` on the navbar. Then you can see the list of items, you may choose to remove some items from the shopping cart or check out, which is by clicking on the “place order” button. <br />
Next, your new order will go to the database and you can find it in collection named **`Orders`**! The reason why we didn't use the **`orders`** collection is that we change some features but as deliverable 2 need **`orders`**, we cannot change the orders collection, hence we create a collection called **`Orders`** in our database. <br />


* (4) **`View order details`**<br />
After login, click on the “Orders” in the navbar to view all order details of this customer which includes order id, time, order status, items and total price. <br />
