# Requirements Definition

## Introduction and Context

Dan has opened up a frappuccino restaurant and is in need of software to serve as a multi\-purpose management and sales system for all sales and store activity to go through\. This project aims to create a system to allow users of all roles to efficiently do what they need to do at the restaurant\.

Customers and Employees will be able to make orders from an assortment of customizable drinks\. When purchasing, customers will be able to pick them up with ease\. Similarly for employees, creating orders will add them to the queue for baristas to prepare\. They also have the ability to log their work hours within the same system\.

It will allow the manager/store owner to order inventory and keep track of items in stock, pricing, employees, store balance, and work hours\. They have the ability to create, edit, and remove employees that can be paid for their work time based on their flat rate of $15/hour\. 

By giving all users an easy way to get what they need out of Dan’s Frappuccino Paradise, the multi\-user software will help customers, employees, and managers alike in achieving a good frappuccino experience\.

## Functional Requirements

1. **Authentication**
	1. Available views are determined by the Account Role
		1. Visitors to the site must have an Account prior to accessing any pages other than sign in or create account
	2. Authentication state is maintained across site visits using a cookie to save an authorization token
	3. Account Usernames are not case sensitive
	4. Account Passwords are encrypted
	5. Account Passwords have a minimum character count of 8
	6. There are three distinct Account Roles: User, Employee, and Manager
2. **Placing an Order**
	1. An authenticated Account \(“the Account”\) is presented with a list of all Products, each with an image and a price
	2. When the Account selects a Product, they are taken to a Product page which lists the Visible ProductIngredients, each with a quantity, and a size selector, from which they can choose Small \(8 oz\), Medium \(16 oz\), Large \(24 oz\)
		1. Changing the Size will modify the count of each ProductIngredient by a scale of 1x \(Small\), 2x \(Medium\), or 3x \(Large\), which will in turn affect the item price
		2. The Account can add new ProductIngredients to the item, and remove ProductIngredients from the item
		3. The Account can click a Place Order button which will do the following:
		  1. Create an Order if there is no unpaid order for the associated Account
		  2. Add an OrderProduct to the Order
		  3. Add any applicable OrderAddOns to the OrderProducts
		  4. Place the Order
		  5. Redirect them to their Account page, where they can see recent Orders and their current fulfillment status
		4. Employees can order on behalf of another User on this page by searching for them by their username
3. **User Home**
	1. The User Home is accessible by an Account of any Role
	2. This page presents the user with a list of their orders, sorted by createdAt descending
	  1. OrderProducts are listed below each order
	  2. There is a dropdown button next to the order which allows the user to reorder it with the click of a button
	3. This page also presents a numeric entry from which the user can add funds to their Balance
4. **Employee Home**
	1. The Employee Home is accessible by an Employee or a Manager
	3. Marks Orders as fulfilled
	4. Able to log their Hours
5. **Manager Home**
	1. The Manager Home is only accessible by a Manager
	2. Can add money to Store Balance with a simple numeric entry, which creates a Transaction
	3. Can distribute money to Employees based on their hours entered, which deducts from the Store Balance and creates a Transaction
		1. Employees are paid a flat rate of $15 / hr
	4. Can order inventory items, which increases the QuantityOnHand for the ProductIngredient, deducts from the Store Balance, and creates a Transaction
	5. Can change the percentPriceModifier, smallBasePrice, mediumBasePrice, largeBasePrice
	8. Can create Employees by assigning them a username and a password
	9. Can delete Employees or demote them to User

## Non-functional Requirements

6. **Orders**
	1. The price of an OrderProduct is calculated as follows:
	   
	   ![Order Price Calculation](diagrams/orderPriceCalculation.png)
	   
		 where *size* is 1 for small, 2 for medium, and 3 for large; *modifier* is percentPriceModifier; *base* is smallBasePrice, mediumBasePrice, or largeBasePrice; *ingredients* are the associated OrderProductIngredients
	   
	2. The price of an Order is the sum of all of its OrderProducts
	
	3. Failure conditions of an order
	
	   1. Whenever an Order fails to be paid, it should not be deleted or modified
	   2. When the Account’s Balance is less than the calculated Order total, an error message is displayed informing the user that they have insufficient funds
	
	4. Actions to take upon successful payment
	
	   1. A Transaction is created
	   2. The Account’s Balance is deducted by the Order Price
	   3. The Order is marked as Paid
	   4. The QuantityOnHand is decremented for each ProductIngredient and each OrderAddOn
	   5. The quantity to deduct is scaled by the Product size: 1 for small, 2 for medium, 3 for large
	
7. **The project will employ a database with the following entities (see UML diagrams for more information):**
	
	1. **StoreConfig**
		1. *key* \(string\)
		2. value \(float\)
	2. **Product**
		1. *id* \(int\)
		2. name \(string\)
		3. imageUrl \(string\)
		4. isDeleted \(boolean default false\)
	3. **ProductIngredient**
		1. *id* \(int\)
		2. name \(string\)
		3. price \(float\)
		4. quantityOnHand \(integer\)
	4. **Account**
		1. *id* \(int\)
		2. role \(user | employee | manager\)
		3. username \(string\)
		4. password \(hashed string\)
		5. balance \(float\)
		6. isDeleted \(boolean default false\)
	5. **AccountFavorite**
		1. *id* \(int\)
		2. **accountId** \(int\)
		3. **orderProductId** \(int\)
		4. name \(nullable string\)
	6. **Order**
		1. *id* (int)
		2. **accountId** (int)
		3. paid \(boolean default false\)
		4. status (created | cancelled | fulfilled)
	7. **OrderProduct**
		1. *id* (int)
		2. **orderId** (int)
		3. **productId** (int)
		4. size \(small | medium | large\)
	8. **OrderProductIngredient**
		1. *id* (int)
		2. **orderProductId** (int)
		3. **productIngredientId** (int)
		4. quantity (int)
	9. **Hours**
		1. *id* (int)
		1. **accountId** (int)
		2. minutesWorked (int)
		3. paid \(boolean default false\)
	
8. **The project will contain an initialization setup script which seeds the database with the following:**
	1. StoreConfig \(key: ‘balance’, value: 10000\)
	2. StoreConfig \(key: ‘percentPriceModifier’, value: 1\.50\)
	3. StoreConfig \(key: ‘smallBasePrice’, value: 2\.00\)
	4. StoreConfig \(key: ‘mediumBasePrice’, value: 4\.00\)
	5. StoreConfig \(key: ‘largeBasePrice’, value: 5\.00\)
	6. 1 Manager \(username: ‘dan’, password: ‘password123’, balance: $0\)
	7. 1 Employee \(username: ‘employee’, password: ‘password123’, balance: $0\)
	8. 1 User \(username: ‘user’, password: ‘password123’, balance: $10\)

## Future Features

1. Deploy to Netlify to allow anyone around the globe to order our delicious fraps.
2. Allow purchasing a drink as a guest (without a login).
3. Implementing an integration with Stripe to use actual currency.

## Glossary

This section explains important terms and definitions.


*Customer* - a user who wishes to purchase drinks with the available customization options

*Employee* - a user that receives money for work hours and can make orders on behalf of customers 

*Manager* - the superuser with total access that can order inventory, pay and edit employees, and manage the store balance

*User* - any of the four types of users of Dan's system