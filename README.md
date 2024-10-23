# upGrad E-Shop Application 

This project was created as part of the Assignments for MS in Computer S

# Instalation Steps. 

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### Workaround to be applied to maintain access token. 

As mentioned in issues, i am unable to fetch access token from backend. hence workaround is used to hardcode access token receied on postman.

update access token in : /components/signin/Signin.js  ->   (hardcoded access token will work only for few hours.)

![image](https://github.com/user-attachments/assets/2c19d465-d0f4-4cac-929e-f64d76e39468)



# Screen Shots form the Application. 

## Home Page when user is not logged in. 

![image](https://github.com/user-attachments/assets/bfd16419-da27-4582-9d21-5a8bfcfd62db)

## Signup: Signup page for new user Sign up
![image](https://github.com/user-attachments/assets/3234d37d-9faf-4d9a-bae5-65175dc8efc4)

#### Succesfull Signup:

![image](https://github.com/user-attachments/assets/cc115181-ec07-41c9-a238-788c03a8e261)

#### Signup errors:

![image](https://github.com/user-attachments/assets/0986ebc1-4cfb-46c3-af4f-5978fd35cbe4)

![image](https://github.com/user-attachments/assets/f641bc6b-67dd-4add-8b32-a2b3e303d9a0)

Error message for negetive response form the APi
![image](https://github.com/user-attachments/assets/11dbfd98-36e3-4f27-9fd4-95f0f124f266)


## Login as Non Admin User:

![image](https://github.com/user-attachments/assets/5771c28d-9dfb-4073-b89e-463d940c0268)

Login Error: 

![image](https://github.com/user-attachments/assets/54b68420-0d1f-4352-973a-d6f86081fef0)


#### Products Listing (Non- Admin User):

![image](https://github.com/user-attachments/assets/a26bbd7a-b2cf-467c-8e53-447dcbcd8e76)

#### Quick Filter or Search bar:

Searched for Shoe: 
Note: Search Bar is available only on the product page. 

![image](https://github.com/user-attachments/assets/9ff346fe-9e14-4bb8-bec0-d0ab4b396367)


#### Sort By Price (Non Admin User):
![image](https://github.com/user-attachments/assets/5ab46696-6840-49d4-88b3-d63b6ec4eb97)


## Login as Admin user

#### Product Details (Admin User).


![image](https://github.com/user-attachments/assets/077d8984-e8fb-40dc-bf6f-79fb2a1ae549)


![image](https://github.com/user-attachments/assets/cbae3687-97fc-426d-bf4c-bd72de2a910e)

#### Add New Product (Only using Admin Login)

![image](https://github.com/user-attachments/assets/13a779c3-ca37-47e9-ae01-aedd7ea0da86)



#### Edit Existing Product (Only using Admin Login)


#### Delete Product (Only using Admin Login)


## Product Details Page

![image](https://github.com/user-attachments/assets/0206eea7-2bb4-4c70-bbb8-3d898aa78a12)



## Place Order Page

#### Step 1: items 

![image](https://github.com/user-attachments/assets/3bf03338-0071-47ef-9324-f743d373c606)

#### Step 2: Select Address 

selecting Address is mandatory, else show error. 

![image](https://github.com/user-attachments/assets/543a3be7-ea4f-4f51-9678-2f2c7fbf6e39)

after sellecting Address. 

![image](https://github.com/user-attachments/assets/cd94b4a2-7764-47b1-b8df-9a09be9bf273)

error scenario:

![image](https://github.com/user-attachments/assets/d1115866-6ff1-4012-9aef-2c0768b38829)


#### Order Confirmation Page

![image](https://github.com/user-attachments/assets/490200e7-170d-46ca-a373-886bf0a04e5e)

Place order will take back to Products page. 




