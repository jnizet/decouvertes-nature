# Functions

This contains 4 functions which allow managing users of the applications.
There are two reasons these functions exist:

1. Allow the users of the app to create and manage users from the app itself rather than through the Firebase console
2. Allow specifying a display name, and custom claims in users, so that the app can display names rather than
   emails, and so that the app can 
   - display users administration pages only to the administrators;
   - display export pages only to the exporters;
   - prevent access to any user who hasn't been created by the application itself, but has signed up 
     (since there is no way to prevent signup in Forebase)

All these functions check that the current user invoking them is an administrator, which causes an issue for the very 
first user, which can't be created with the CLI or the console with this admin custom claim.
That's the reason why the backend, to check that the user is an admin, has a specific exception for the user
with the email "jnizet@gmail.com", which may thus administer users even without the custom claim.

So, for the very first user creation, the steps are the following:

- deploy the app and the functions (note that the Blaze plan is required for functions)
- go to the firebase console of the project, and create a single user with the email "jnizet@gmail.com" and
  a chosen password.
- Use the app, login as jnizet@gmail.com, and go to the path "/users" (the "Users" navbar item won't appear since 
  jnizet@gmail.com doesn't have the custom admin claim yet)
- Edit the admin user and give it the admin claim (you'll have to re-login to see the "Users" navbar item appear)
- Add as many other users and administrators as required. Now everything goes through the application.
