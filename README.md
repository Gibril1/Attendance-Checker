# Attendance Checker
A node with express api for marking attendance in a school

## Scope of Project
This project involves the development of an Express API for marking attendance in a primary or junior high school, where students are not allowed to use their phones. At the beginning of each academic semester, teachers create courses they will be teaching, and students register for the courses by joining them. The software is bespoke and can be used by the entire school.

## Overview
There are two types of users with different roles: students and teachers. A teacher creates a course, and students join the courses they prefer. When the teacher decides to take attendance, they log into the system and start mentioning the names of the students who have registered for their courses. This helps to foster familiarity between the teacher and their students and allows the teacher to learn the names of their students.

Additionally, the system provides analytical features for both types of users, allowing them to track their attendance record, such as the number of days they have been present or absent.


## Folder Structure
The main folder for this project is labelled **backend**. It contains the following folders.
1. ***models***: This folder contains all the database models used for this project
2. ***routes***: This folder contains the routes for the project. It has separate routes for each entity in the project.
3. ***controllers***: The controllers folder contains files with functions for each route. These functions are invoked for every API endpoint.
4. ***config***: This folder contains a single file called ***db.js*** that contains the function for connecting to the mongoose database
5. ***utils***: This folder contains files for Multer configuration, which allows multipart/form-data to be parsed and processed. The Cloudinary file allows images and files to be stored in Cloudinary and returns a URL for the stored image, which is then stored in the database.
6. ***middleware***: The middleware folder contains files for checking errors and an authentication middleware for ensuring users are authenticated before accessing any routes

## Routes and Entities
The routes for this project are classified into

. Auth Routes
---------------
These are authentication routes that are used for registration and logging into the system.
##### ``` POST /api/auth/register ```
This is the end point for registering a user into the system

##### ``` POST /api/auth/login  ```
This is the end point that logs a user into the system

The functions for this router are found in the controllers folder.

. Course Routes
-------------------
These are endpoints for CRUD operations on courses. These routes are protected and only teachers can access these routes.

#### ``` POST /api/course/ ```
This is the end point for techers to create a course

#### ``` GET /api/course/ ```
This is the end point for teachers to get all the courses they have created

#### ``` GET /api/course/:id ```
For getting the details of a particular course

#### ``` PUT /api/course/:id ```
For updating the details of a particular course

#### ``` DELETE /api/course/:id ```
Deleting courses that have been created by a teacher. You cannot delete a course you did not create.


. Student Routes
-------------------
These are end points that allows students to access the system. Teachers cannot access these routes

#### ``` GET /api/student/ ```
This is the end point for students to have a view of all the courses in the system

#### ``` POST /api/student/join/:id  ```
This is the endpoint for students to join a course they are interested in. The **id** is in reference to the id of that course

#### ``` GET /api/student/joined-courses/  ```
This is the end point for students to get all the courses they have registered for

#### ``` GET /api/student/check/:id  ```
This is for checking the number of items a student has been present and absent for a particular course

#### ``` GET /api/student/attendance/:id  ```
This is for checking the list of all attendances that have been taken for a particular course


. Teacher Routes
--------------------
These are end points that allows teachers to access the system. Students cannot access these routes

#### ``` POST /api/teacher/mark/:id ```
This is the route for marking attendance

#### ``` GET /api/teacher/get-students/:id ```
This is the route for getting students that have enrolled for a particular course



