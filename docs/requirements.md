# Requirements Definition

## Introduction and Context

Dan has opened up a frappuccino restaurant and is in need of software to serve as a multi\-purpose management and sales system for all sales and store activity to go through\. This project aims to create a system to allow users of all roles to efficiently do what they need to do at the restaurant\.

Customers and Employees will be able to make orders from an assortment of customizable drinks\. When purchasing, customers will be able to pick them up with ease\. Similarly for employees, creating orders will add them to the queue for baristas to prepare\. They also have the ability to log their work hours within the same system\.

It will allow the manager/store owner to order inventory and keep track of items in stock, pricing, employees, store balance, and work hours\. They have the ability to create, edit, and remove employees that can be paid for their work time based on their flat rate of $15/hour\. 

By giving all users an easy way to get what they need out of Dan’s Frappuccino Paradise, the multi\-user software will help customers, employees, and managers alike in achieving a good frappuccino experience\.

## Functional Requirements

1. __Authentication__
	1. Available views are determined by the Account Role
		1. Visitors to the site must have an Account prior to accessing any pages other than sign in or create account
	2. Authentication state is maintained across site visits using a cookie to save an authorization token
	3. Account Usernames are not case sensitive
	4. Account Passwords are encrypted
	5. Account Passwords have a minimum character count of 8
	6. There are three distinct Account Roles: User, Employee, and Manager
2. __Placing an Order__
	1. An authenticated Account \(“the Account”\) is presented with a list of all Products, each with an image and a price
	2. When the Account selects a Product, they are taken to a Product page which lists the Visible ProductIngredients, each with a quantity, and a size selector, from which they can choose Mini \(8 oz\), Medium \(16 oz\), Massive \(24 oz\)
		1. Changing the Size will modify the count of each ProductIngredient by a scale of 1x \(Small\), 2x \(Medium\), or 3x \(Large\), which will in turn affect the item price
		2. The Account cannot remove default ProductIngredients from the item
		3. The Account can add new ProductIngredients to the item, and remove those items which they have added
		4. The Account can click an Add To Order button which will do the following:
			1. Create an Order if there is no unpaid order for the associated Account
			2. Add an OrderProduct to the Order
			3. Add any applicable OrderAddOns to the OrderProducts
	3. The Account has a Cart, which displays the Products and their associated AddOns from the Account’s most recent unpaid Order
		1. Products can be removed from the Cart
	4. The Cart has a Place Order button
		1. Following a successful purchase, the Account is directed to an Order page which displays the current fulfillment status of the Order
3. __User Home__
	1. The User Home is accessible by an Account of any Role
	2. This page presents the user with a list of their orders, sorted by createdAt descending
		1. OrderProducts are listed below each order
		2. There is a dropdown menu next to each OrderProduct, which presents some options to:
		   1. Favorite it, which will automatically add it the favorite orders on the same page
		   2. Cancel the order, which will refund the money to their account and mark the order as cancelled
	3. This page also presents a numeric entry from which the user can add funds to their Balance
	4. This page also has a list of favorite drinks, which can be easily reordered
		1. When an Order is favorited / unfavorited, this list should dynamically update
4. __Employee Home__
	1. The Employee Home is accessible by an Employee or a Manager
	2. Can make an Order on behalf of an Account by searching their username
	3. Marks Orders as fulfilled
	4. Able to log their Hours
5. __Manager Home__
	1. The Manager Home is only accessible by a Manager
	2. Can add money to Store Balance with a simple numeric entry, which creates a Transaction
	3. Can distribute money to Employees based on their hours entered, which deducts from the Store Balance and creates a Transaction
		1. Employees are paid a flat rate of $15 / hr
	4. Can order inventory items, which increases the QuantityOnHand for the ProductIngredient, deducts from the Store Balance, and creates a Transaction
	5. Can change the percentPriceModifier, smallBasePrice, mediumBasePrice, largeBasePrice
	6. Has access to a table that displays all Products, each with a bulleted list of its ingredients, the cost of each, a total calculated price, and a delete button
		1. Deleting a Product adds an isDeleted flag to the model to prevent destroying current and past orders
	7. Can create new Products with a form to input the Product Name, Image Url, a list of all ProductIngredients with checkboxes to make them toggle\-able, a dynamically calculated price, and a submit button which creates the new Product and its associated ProductIngredients
	8. Can create Employees by assigning them a username and a password
	9. Can delete Employees or demote them to User

## Non-functional Requirements

6. __Orders__
	1. The price of an OrderProduct is calculated as follows:where *size* is 1 for small, 2 for medium, and 3 for large; *modifier* is percentPriceModifier; *base* is smallBasePrice, mediumBasePrice, or largeBasePrice
	2. The price of an Order is the sum of all of its OrderProducts
	3. Failure conditions of an order
		1. Whenever an Order fails to be paid, it should not be deleted or modified
		2. When the Account’s Balance is less than the calculated Order total, an error message is displayed informing the user that they have insufficient funds
	4. Actions to take upon successful payment
		1. A Transaction is created
		2. The Account’s Balance is deducted by the Order Price
		3. The Order is marked as Paid
		4. The QuantityOnHand is decremented for each ProductIngredient and each OrderAddOn
			1. The quantity to deduct is scaled by the Product size: 1 for small, 2 for medium, 3 for large
7. __The project will employ a database with the following entities:__
	1. StoreConfig
		1. Key \(string\)
		2. Value \(float\)
	2. Product
		1. Slug \(string\)
		2. Name \(string\)
		3. ImageUrl \(string\)
		4. IsDeleted \(boolean default false\)
	3. ProductIngredient
		1. Slug \(string\)
		2. Name \(string\)
		3. Price \(float\)
		4. QuantityOnHand \(integer\)
	4. Account
		1. Role \(User | Employee | Manager\)
		2. Username \(string\)
		3. Password \(hashed string\)
		4. Balance \(float\)
		5. isDeleted \(boolean default false\)
	5. AccountFavorite
		1. AccountId
		2. OrderProductId
		3. Name \(nullable string\)
	6. Transaction
		1. StoreId
		2. AccountId \(nullable integer\)
		3. Type \(FundsAdded | OrderPaid | InventoryPurchased\)
		4. OrderId \(nullable integer\)
		5. Price \(float\)
	7. Order
		1. AccountId
		2. Paid \(boolean default false\)
		3. Status (Created | Cancelled | Fulfilled)
	8. OrderProduct
		1. OrderId
		2. ProductId
		3. Size \(Small | Medium | Large\)
	9. OrderAddOn
		1. OrderProductId
		2. ProductIngredientId
	10. Hours
		1. AccountId
		2. HoursWorked
		3. Paid \(boolean default false\)
8. __The project will contain an initialization setup script which seeds the database with the following:__
	1. StoreConfig \(Key: ‘balance’, Value: 10000\)
	2. StoreConfig \(Key: ‘percentPriceModifier’, Value: 1\.50\)
	3. StoreConfig \(Key: ‘smallBasePrice’, Value: 2\.00\)
	4. StoreConfig \(Key: ‘mediumBasePrice’, Value: 4\.00\)
	5. StoreConfig \(Key: ‘largeBasePrice’, Value: 5\.00\)
	6. 1 Manager \(Username: ‘dan’, Password: ‘password123’, Balance: $0\)
	7. 1 Employee \(Username: ‘employee’, Password: ‘password123’, Balance: $0\)
	8. 1 User \(Username: ‘user’, Password: ‘password123’, Balance: $10\)

## Glossary

This section explains important terms and definitions.


*Customer* - a user who wishes to purchase drinks with the available customization options

*Employee* - a user that receives money for work hours and can make orders on behalf of customers 

*Manager* - the superuser with total access that can order inventory, pay and edit employees, and manage the store balance

*User* - any of the four types of users of Dan's system