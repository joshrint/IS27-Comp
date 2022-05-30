# IS27-Comp
** IS27 – Full Stack Developer Competition **
** Josh Rintoul **

## Introduction
This is the frontend for the coding assessment for hte IS 27 competition.
Frontend Repo: https://github.com/joshrint/IS27-Comp-frontend
Frontend URL:https://black-sand-01264c71e.1.azurestaticapps.net/
Backend repo: https://github.com/joshrint/IS27-Comp-backend
Backend URL: https://is27-comp-backend.azurewebsites.net/

The application is built using React. 
The styling is using bootstrap.
Tests are the React Testing Library

## Components
### Home.js
The home component holds the kanban style board for the boats. It has 4 swimlanes:
1. Docked
2. Outbound to Sea
3. Inbound ot Harbor
4. Maintenance

The boat cards are able to be moved by selecting the new swimlane from a dropdown within the card. They are also sorted within this component into their swimlanes.

The get and update requests are handled within this component as well as rendering the Modal pop-ups.

### Header.js
Holds the new boat button and the title.

### Swimlane.js
The swimlanes take in the list of boats and renders them into their cards. No logic is in this component.

### NewBoat.js
The new boat form is rendered and handled within this Modal popup component.
the post request is made within this component as well.

### Popup.js
The popup component is used to ensure that the user wanted to delete a boat. It is a modal component that is shown when the delete button on a card is selected.

## Stylesheets
For the majority of the applicaiton I use the bootstrap css framework. There are a few adjustments made throughout for spacing of the components within the application.

## Unit Tests
### Home
1. Test that the New Boat button is rendering properly.
2. Test that clicking the New Boat button opens up the New Boat form Modal.
### New Boat Form
1. Test that the Boat Name input element renders by looking for placeholder text.
2. Test that you are able to edit the text within the New Boat input element.
### Swimlane Component
1. Tests that the card header renders when given an array of 2 boats.
2. Tests that there are 2 cards rendered when the given array has 2 boats in it.

## Functional Testing
For functional tests I would have a tester run through the lifecycle of a boat. Have them create a boat from the New Boat Form. Have them move it through all of the swimlanes and then delete the boat. I would also ensure that whenever they create a new boat it starts in the Docked swimlane.
