# AUTHENTICATION

<p>Authentication is defined as a security process followed to verify and confirm the identity of an individual, device, or system attempting to access a particular resource or service.<p>

## Baseurl

https://authentication-backend-1-961o.onrender.com/

## Endpoints

### /signup-user

<p>=>This endpoint will create the username,email,password and stores in db</P>
https://authentication-backend-1-961o.onrender.com/api/signup-user

### /signin-user

<p>=>This endpoint will  checks the email,password in db .</P>
<p>=>If exist, login as a authorized user .</P>
<p>=>If not,throw error message</P>
https://authentication-backend-1-961o.onrender.com/api/signin-user

### /get-user

<p>=>This endpoint will get the user by the request of headers authorization token</P>

https://authentication-backend-1-961o.onrender.com/api/get-user

### /forgot-password

<p>=>This endpoint will checks the useremail if the user exist or not .</P>
<p>=>If user exist, create the token and send the mail to the user which will redirect to the reset password</P>
<p>=>If not,throw error message</P>

https://authentication-backend-1-961o.onrender.com/api/forgot-password

### /reset-password/${id}/${token}

<p>=>This endpoint will helps to reset the password by request of body password and verify the token, if the token matches or not,not means invalid token </P>
<p>=>If the token and id  matches,it allows you to reset the password and new password will be stored in the db</P>

https://authentication-backend-1-961o.onrender.com/api/reset-password/${id}/${token}

## API DOCUMENTATION:-

https://documenter.getpostman.com/view/34950603/2sA3XMjj8j


Notes:-I changed my backend url due to some problems