# Software Requirement Specification Document


### Introduction
  1.1 Introduction

#### Functional Requirement:

1. System must be able to display the vitals of the machine for analytics purposes. The vitals like speed, pressure, and temperature must be visualized as graphs for a selected machine
2. The machine logs and messages must be displayed for a selected machine along with the vitals
3. The system must be supported with information export functionalities to either CSV and text files.
4. The Vitals of a selected machine must be exported as CSV file with file name having as a combination of vitals, machine name and date of export (e.g: vitals_machineA_DDMMYYYY.csv). The exported file must at least contain the following information
      - Timestamp
      - Machine Id
      - Pressure
      - Speed
      - Temperature
5. The logs for a selected machine must be exported as the CSV file with file name as the combination of logs, machine name and date of export (e.g: logs_machineA_DDMMYYYY.csv). The exported file must at least contain the following information
      - Timestamp
      - Machine Id
      - Criticality Level
      - Message
6. The User interface must be divided into 2 pages
      - Dashboard - to display the vitals and prediction results. Dashboard being the default home page of the web application
      - Resource Management - to manage various entities with the system. For the first version only machines will be displayed in the resource management page
7. Resource Management must show all the machines attached to the system. By default only active machines will be shown.
8. User of the app must be able to add new machine into the system.
9. The app can able to export a short of synopsis of the machines from the resource manager. This export file must be a text file.
10. The resource manager should have the red light indicators for status of the machine
11. Resource manager should be equipped with several filters like "show all resources", "active resources" and "in-active resources"
12. The prediction results must have the red light indicators, according to the criticality.

#### Business Requirements

1. The app must be available from any location at all times
2. The app should be a web application not a desktop application
3. All major browsers like Chrome, Safari must be supported
4. All the important actions taken in the server side must be logged properly for audit purposes
5. All the data files, log files and other artifacts must be stored at centralized location
6. No data will be stored on the client browser machine for any reason or computation
7. All the released versions of software must be supported by the operating manuals and changelog details
8. The software must also contain the trouble shooting guide and installation guide
