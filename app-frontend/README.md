# Frontend Coding Challenge

## Project Structure

-   `components/` - app's components
-   `pages/` - app's pages
-   `pages/api` - app's API routes

## Introduction

In this challege, you will implement a simple page with two views. Specifically, you will be using the [randomuser]('https://randomuser.me') API to display the information of some random users and delete them, using best practices and avoiding antipatterns. A correctly implemented end result will pass all the tests.

**Note that you should not need to edit any file other than** `/components/Challenge.jsx` **for this challenge, but are free to utilize sub-components. You will also not need to use any external libraries to complete the assignment.**

## The Challenge

We would like you to implement a simple page with two views:

1. The initial view: a grid with 4 elements per row displaying the picture of the user in the appropriate HTML tag and their first and last name in a string. The `alt` of the image must be the person's last name.
2. The alternate view: a table displaying the name information for the user, as well as a flattened list of their location data, using the appropriate HTML tag.

Both these views should avoid antipatterns, as some would actually cause the tests to fail.

When the page is loaded, ten random user records from the referenced API should be displayed. Whenever the record is clicked (in the entirety of its representation on the page), that user's record should be deleted.

In addition, we would like a toggle button with the ID `switcher` to alternate between the two views. There should also be a button with the ID `addition` that adds an invidual random user to the page. In the case where there are no more users due to deletion, both views should just be replaced with a div with the text "No persons...".

Finally, we would like you to create an input that filters the displayed users by their name, in a case-insensitive manner.

## Final written question

In this readme, would like you to roughly explain what React is doing under the box of `<Challenge />` in `/components/Challenge.jsx`. Note that you need not explain anything in the context of NextJs and can just assume a plain React app.

### Bonus

We recognize that there is room to grow here. Please feel free to tell us a way in which this challenge could be improved.

#### You are done!

#### Overview of My Implementation

To start with we define the states we will be using. A users state object holding both the entire list of users and a displayed users list that will contain the users that have not been filtered by name

Next we define functions that will be used to add, delete, and filter Users and the function that will toggle the current page view

Now we use the useEffect hook. this hook is a bit of a swiss army knife replacing lifecycle methods of class based react. In this case we are using it to populate the users state after the component mounts

This sets the stage for our react to proceed. The challenge component houses either of our views based on the current boolean value of isTableView. A state is used so that the page will rerender with the correct view whenever that isTableView value is changed. it further houses some simple html elements such as the buttons and the input needed for User interaction

The userGrid component simply returns a div with the tailwind classes to force a 4 element grid and a map of the currently displayedUsers onto User components. The User component is a dumb component that only spits out html elements with the bare minimum checking for the existence of a user.

The userTable Component is also a relatively simple component just returning html elements. The only complexity here is a map of the displayedUsers to create table rows for each one.

both userGrid and userTable will return the NoPersons component in the case of displayedUsers being empty while the NoPersons component is EXTREMELY simple it does make the entire project much more DRY as code duplication should be avoided for long term maintenance.

because displayedUsers is passed to either view as a prop whenever displayedUser is changed these components will rerender assuring that the correct data is always displayed.
