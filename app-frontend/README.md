# Frontend Coding Challenge

## Project Structure

- `components/` - app's components
- `pages/` - app's pages
- `pages/api` - app's API routes

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

This is a component and it is one of the core building blocks of React. React takes these components and uses them to build the UI. In this instance React is taking the code in the Challenge.jsx file and displaying that code to the end user through the parent component located in the pages folder.

### Bonus

We recognize that there is room to grow here. Please feel free to tell us a way in which this challenge could be improved.

This was a wonderful challenge. I have to admit that I had to shake a few cobwebs loose when trying to remember certain things but I really enjoyed it! Also I forgot to fork the repo so all my commits are on a seperate branch on my local directory. If that is needed I can absolutely provide it. As far as improvement there is nothing that comes to mind. Thank you again for the opportunity.

#### You are done!
