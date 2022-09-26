# Users and their Goals

*Figure 1 \- User attempts access of the application*

![diagram1](diagrams/diagram1.png)

Participating Actor: User 

Entry Condition:

- User wants to access Dan’s Frappuccino Paradise \(To order, view the menu, do employee tasks, manager tasks, or edit account information\.\)

Exit condition: 

- User has gained access
- User is rejected
- User no longer wants to use the app

Event flow: 

1. User opens the application
2. System requires a sign in
	1. Create an account
	2. Sign in 
3. Display role\-specific pages
	1. User home
	2. Employee home
	3. Manager home



*Figure 2 \- Customer creates account*

![diagram2](diagrams/diagram2.png)

Participating actor: User

Entry Conditions:

- Customer wants to create an account

Exit Conditions: 

- Successful account creation
- Customer decides to not make an account

Event Flow: 

- User makes creation request
- System inquiries user information \(username, password, role\)
- Allow user into application with role\-based permissions 



*Figure 3 \- Customer places an order*

![diagram3](diagrams/diagram3.png)

Participating actor: Customer

Entry Conditions:

- Customer wants to order a frappuccino 

Exit Conditions: 

- Successful order

Event Flow: 

- User logs in
- System displays drink options for them to customize
- Customer purchases a drink, depleting their balance and receiving confirmation 



*Figure 4 \- Customer cancels order*

![diagram4](diagrams/diagram4.png)

Participating actor: Customer

Entry Conditions:

- Customer wants to cancel an order

Exit Conditions: 

- Successful cancellation 
- Denied cancellation 

Event Flow: 

- User logs in, accesses user home
- They select an order to cancel
- If it isn’t already finished, the order is removed from the system



*Figure 5 \- Manager distributes money*

![diagram5](diagrams/diagram5.png)

Participating actor: Manager

Entry Conditions:

- Manager wants to pay employees for work hours

Exit Conditions: 

- Employee balance is increased

Event Flow: 

- Manger logs in 
- They select an employee
- Approve work hours and they are paid based on their wage



*Figure 6 \-  Manager orders items for inventory*

![diagram6](diagrams/diagram6.png)

Participating actor: Manager

Entry Conditions:

- Manager needs to order items for store inventory

Exit Conditions: 

- Items are successfully “ordered” \(increase quantity in database\)

Event Flow: 

- Manger logs in 
- They select quantity of items
- Confirm order, values of QuantityOnHand per ProductIngredient increase\.



*Figure 7 \- Employee marks order as fulfilled*

![diagram7](diagrams/diagram7.png)

Participating actor: Employee

Entry Conditions:

- Employee needs to tell the system an order is complete

Exit Conditions: 

- Order is marked as Fulfilled = true

Event Flow: 

- Employee logs in
- They locate and select the completed order
- Mark it as fulfilled, database changes to reflect 



*Figure 8 \- Employee tracks work hours*

![diagram8](diagrams/diagram8.png)

Participating actor: Employee

Entry Conditions:

- Employee needs to record their labor hours

Exit Conditions: 

- Hours are added to system

Event Flow: 

- Employee logs in
- They add times for a date
- Increase HoursWorked in database
