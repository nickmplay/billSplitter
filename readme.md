# Bill Splitter App

A basic app to calculate the share of the total bill each person has. Each person can simply either:
* Split the total 
* Pay a certain amount more than the average
* Pay a certain amount less than the average
* Pay a fixed amount irrespective of the total

More people can be added from the inital two created as a default. A demo of the site can be found [here](http://nickwip-com.stackstaging.com/billsplitter/)

## Underlying code structure

The main objective of the app is to explore using the Model-View-Controller (MVC) approach. 

The bill.js file contains the model class. All the functions related to CRUD people and the total bill amount are implemented here. The view.js file contains the view class that creates the various app DOM objects. The controller.js file contains the controller class that implements the model into the view, and wires up the necessary event listeners. All three classes are tested using Jest in the tests directory.

The index.html file then has the class instantiations and anchors the app into the DOM given a target id. 
