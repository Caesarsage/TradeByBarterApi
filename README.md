## EazySwap API Documentation

<p>This is the backend documentation for how to consume the api </br>

```diff
+ OPEN SOURCE: Refer to the contributing.md file to see how to contribute to this codebase
```

### Heroku BASE URL link

<a href="https://zuri-team9.herokuapp.com/">https://zuri-team9.herokuapp.com/</a>
### Response Form
{ msg: String, data: < Data Object> }

<hr />

# Contents: Quick Reference 🚀

<ol>
<header>User endpoints</header>
  <em>Authentication</em>
  <li>
    <a href="#register">Register User</a>
  </li>
  <li>
    <a href="#login">Login User</a>
  </li>
  <li>
    <a href="#forget">Forget Password</a>
  </li>
  <li>
    <a href="#retrieve">Retrieve Password</a>
  </li>
  
  <header>User(s)</header>
  <li>
    <a href="#get_users">Get Users</a>
  </li>
  <li>
    <a href="#get_user">Get a User</a>
  </li>
  <li>
    <a href="#update_user">Edit and Update a User</a>
  </li>
  <li>
    <a href="#delete_user">Delete a User</a>
  </li>
  <ul>
    <header>Admin logins</header>
  </ul>
</ol>
<ol>
  <header>Product(s) endpoints</header>
   <li>
    <a href="#create_product">Create Product</a>
  </li>
  <li>
    <a href="#get_all_products">Get all Product</a>
  </li>
   <li>
    <a href="#show_product">Get a particular product</a>
  </li>
   <li>
    <a href="#update_product">Update Product</a>
  </li>
   <li>
    <a href="#delete_product">Delete Product</a>
  </li>
  <li>
    <a href="#search_product">Search for Product by name</a>
  </li>
</ol>
<ol>
<header>Review endpoints</header>
  <li>
    <a href="#create_review">Create a review</a>
  </li>
  <li>
    <a href="#delete_review">Delete a review</a>
  </li>
</ol>


# REGISTER USER
<p id="register">
  Register user with required field and returns token(needed for authorization) and the user
</p>
<ul>
  <li>URL <br/>
  https://zuri-team9.herokuapp.com/api/auth/register
  </li>
  <li>Method  <br/>
 
 ```
  POST
 ```
</li>
<li>URL Params  <br/>
 None
</li>
<li>Data Params  <br/>
 
 ```
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: [Number, 'not starting with zero']
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String
  },
  avatar:{
    type: File,[png, jpeg, jpg]
  }
  ```
</li>
<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    {
      "msg": "register successfully",
      "data": <Object>
      "token":token
    }
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 500</li></ul>=
  
```
    {
      "msg": "error",
      "data": error
    }
 
```

 <ul><li>Code: 400</li></ul>=
  
```
    {
      "msg": "email or user already exist",
      "data": error
    }
 
```
</li>

</ul>

# LOGIN USER
<p id="login">
  Login user with required field and returns token(needed for authorization) and the user
</p>
<ul>
  <li>URL <br/>
  https://zuri-team9.herokuapp.com/api/auth/login
  </li>
  <li>Method  <br/>
 
 ```
  POST
 ```
</li>
<li>URL Params  <br/>
 None
</li>
<li>Data Params  <br/>
 
 ```
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
  ```
</li>
<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    {
      "msg": "login successfully",
      "data": <Object>
      "token":token
    }
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 500</li></ul>=
  
```
    {
      "msg": "error",
      "data": error
    }
 
```

 <ul><li>Code: 400</li></ul>=
  
```
    {
      "msg": "user not found or invalid credentials",
      "data": error
    }
 
```
</li>
</ul>

# FORGET USER
<p id="forget">

</p>
<ul>
  <li>URL <br/>
  https://zuri-team9.herokuapp.com/api/auth/forget
  </li>
  <li>Method  <br/>
 
 ```
  POST
 ```
</li>
<li>URL Params  <br/>
 None
</li>
<li>Data Params  <br/>
 
 ```
  email: {
    type: String,
    required: true,
    unique: true
  }

  ```
</li>
<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    {
      "msg": "email sent",
      "data": <Object>
      "token":token
    }
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 500</li></ul>=
  
```
    {
      "msg": "error",
      "data": error
    }
 
```

 <ul><li>Code: 400</li></ul>=
  
```
    {
      "msg": "user not found or invalid credentials",
      "data": error
    }
 
```
</li>
</ul>
<!-- forget and retrieve in a bit -->

## SHOW ALL USER
<p id="get_users">
  Returns an array of json object of all user created(admin access only)
</p>
<ul>
<li>URL <br/>
 https://zuri-team9.herokuapp.com/api/user
</li>
<li>Method  <br/>
 
 ```
  GET
 ```
</li>
<li>URL Params  <br/>
 None
</li>
<li>Data Params  <br/>
 None
</li>
<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    [{
      "msg": "all users found",
      "data": <Object>
      }
    }]
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 404</li></ul>
  
```
    {
      "message": "error",
      "data": error
    }
 
```
</li>
</ul>

## GET USER
<p id="get_user">
  Returns json object of the particular data and product associated with the user
</p>
<ul>
<li>URL <br/>
 https://zuri-team9.herokuapp.com/api/user/:id
</li>
<li>Method  <br/>
  
  ```
    GET
  ```
</li>
<li>URL Params  <br/>
  <strong>Required</strong> 
  
  ```
  id=[integer]
  ```
</li>
<li>Data Params  <br/>
 None
</li>
<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    {
      "message": "user found",
      "user": user <Object>
      "product": product <Object>
    }
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 404</li></ul>
  
```
    {
      "message": "user not found",
      "data": error
    }
 
```
</ul>

<!-- update user -->
## UPDATE USER
<p id="update_user">
  Returns json object of the data updated
</p>
<ul>
<li>URL <br/>
 https://zuri-team9.herokuapp.com/api/user/:id
</li>
<li>Method  <br/>
  
  ```
  PUT
  ```
</li>
<li>URL Params  <br/>
  <strong>Required</strong>
  
  ```
  id=[integer]
  ```
</li>
<li>Data Params  <br/>
 
  ```
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: [Number, 'not starting with zero']
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String
  },
  avatar:{
    type: File,[png, jpeg, jpg]
  }
  ```
</li>

<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    {
      "msg": "user updated successfully",
      "data": user <Object>
    }
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 404</li></ul>
  
```
    {
      "msg": error,
      "data": error
    }
 
```
  </li>
</ul>

<!-- DELETE USER -->
## DELETE USER

<p id="delete_user">
  Returns json object of the deleted user
</p>
<ul>
<li>URL <br/>
 https://zuri-team9.herokuapp.com/api/user/:id
</li>
<li>Method  <br/>
  
  ```
  DELETE
  ```
</li>
<li>URL Params  <br/>
  <strong>Required</strong>
  
  ```
  id=[integer]
  ```
</li>
<li>Data Params  <br/>
 None
</li>

<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    {
      "msg": "deleted user",
      "data": user <Object>
    }
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 404</li></ul>
  
```
    {
      "msg": "no user found",
      "data": error
    }
 
```
  </li>
</ul>

<!-- PRODUCTS -->

## CREATE PRODUCT
<p id="create_product">
  Returns json object of the data created
</p>
<ul>
<li>URL <br/>
 https://zuri-team9.herokuapp.com/api/products
</li>
<li>Method  <br/>
  
  ```
  POST
  ```
</li>
<li>URL Params  <br/>
 None
</li>
<li>Data Params  <br/>
 
 ```
  name: {
    type: String,
    required: true,
  },
  description:{
    type: String
  },
  email: {
    type: String,
    required: true
  },
  image: File,
  quantity: {
    type: Number,
    required: true
  },
  productLocation: {
    type: String,
    required: true
  },
  worth: {
    type: String,
    required
  }
  category: {
    type: String,
  },
  ```
</li>
<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    {
      "msg": "Product created successfully",
       data: product <Object>
    }
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 404</li></ul>
  
```
    {
      "msg": "ouch, an error occur",
      error
    }
 
```
  </li>
</ul>


## SHOW ALL PRODUCT
<p id="get_all_products">
  Returns json object of all data created
</p>
<ul>
<li>URL <br/>
 https://zuri-team9.herokuapp.com/api/products
</li>
<li>Method  <br/>
 
 ```
  GET
 ```
</li>
<li>URL Params  <br/>
 None
</li>
<li>Data Params  <br/>
 None
</li>
<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    [{
      "msg": "Successfully request",
      "data": <Object>
    }]
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 404</li></ul>
  
```
    {
      "msg": "error",
      "data": error
    }
 
```
</li>
</ul>

## UPDATE PRODUCT
<p id="update_product">
  Returns json object of the data updated
</p>
<ul>
<li>URL <br/>
https://zuri-team9.herokuapp.com/api/products
</li>
<li>Method  <br/>
  
  ```
  PUT
  ```
</li>
<li>URL Params  <br/>
  <strong>Required</strong>
  
  ```
  id=[integer]
  ```
</li>
<li>Data Params  <br/>
 
 ```
   name: {
    type: String,
    required: true,
  },
  description:{
    type: String
  },
  email: {
    type: String,
    required: true
  },
  image: File,
  quantity: {
    type: Number,
    required: true
  },
  productLocation: {
    type: String,
    required: true
  },
  worth: {
    type: String,
    required
  }
  category: {
    type: String,
  },
  
  ```
</li>

<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    {
      "msg": "Updated successfully",
      "data": product <Object>
    }
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 404</li></ul>
  
```
    {
      "msg": "an error occur, failed to update",
      "data": error
    }
 
```
  </li>
</ul>


## DELETE PRODUCT
<p id="delete_product">
  Returns json object of the data updated
</p>
<ul>
<li>URL <br/>
 https://zuri-team9.herokuapp.com/api/products/:id
</li>
<li>Method  <br/>
  
  ```
  DELETE
  ```
</li>
<li>URL Params  <br/>
  <strong>Required</strong>
  
  ```
  id=[integer]
  ```
</li>
<li>Data Params  <br/>
 None
</li>

<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    {
      "msg": "Data deleted successfully",
      "data": <Object>
    }
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 404</li></ul>
  
```
    {
      "msg": "an error occur",
      "data": error
    }
 
```
  </li>
</ul>

## SEARCH PRODUCT

<p id="search_product">
  Returns json search data
</p>
<ul>
<li>URL <br/>
 https://zuri-team9.herokuapp.com/api/products?<query>
</li>
<li>Method  <br/>
  
  ```
  GET
  ```
</li>
<li>URL Params  <br/>
 ```
 query
 ```

</li>
<li>Data Params  <br/>
 ```
  name: String
 ```
</li>
<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    {
      "msg": "",
      product: <Object>
    }
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 404</li></ul>
  
```
    {
      "msg": "ouch, an error occur",
      error
    }
 
```
  </li>
</ul>

<!-- REVIEW -->

## CREATE REVIEW
<p id="create_review">
  Returns json object of the data created
</p>
<ul>
<li>URL <br/>
 https://zuri-team9.herokuapp.com/api/products/:id/reviews
</li>
<li>Method  <br/>
  
  ```
  POST
  ```
</li>
<li>URL Params  <br/>
 None
</li>
<li>Data Params  <br/>
 
 ```
  body: {
    type: String,
  },
  rating:{
    type: String
  }
  ```
</li>
<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    {
      "message": "review added",
       data: newReview <Object>
    }
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 404</li></ul>
  
```
    {
      "msg": "ouch, an error occur",
      error
    }
 
```
  </li>
</ul>

## DELETE REVIEW
<p id="delete_review">
  Returns json object of the data deleted
</p>
<ul>
<li>URL <br/>
 https://zuri-team9.herokuapp.com/api/products/:id/reviews/:reviewId
</li>
<li>Method  <br/>
  
  ```
  DELETE
  ```
</li>
<li>URL Params  <br/>
  <strong>Required</strong>
  
  ```
  id=[integer]
  reviewId=[integer]
  ```
</li>
<li>Data Params  <br/>
 None
</li>

<li>Success Response  <br/>
  <ul><li>Code: 200</li></ul>
  
  ```
    {
      "message": "Data deleted successfully",
      "data": <Object>
    }
  
  ```

</li>

<li>Error Response
  <ul><li>Code: 404</li></ul>
  
```
    {
      "message": "an error occur",
      "data": error
    }
 
```
  </li>
</ul>
