# Smart Attendance Tracker

Smart Attendance solution involves using smartphones to communicate with a proximity beacon to determine whether or not students are currently in class. we developed an application that is to be installed onto a student’s smartphone. That application, when started, will look for a specific beacon within a predefined range. If the beacon is found, which means that the student is in class, the application sends an indication to the web server (used by the professor) which stores attendance information for all students for the use of the professor to track. Our solution has minimal setup for everyone involved. Students are only required to register their student ID through the application for each class prior to the start of the term. Our application then sends the student’s unique device ID along with the associating student ID to the web server. By doing it in this way, students will only be allowed to use one device in order to mark their attendance. This will limit the number of students that try to circumvent the system.

### Technologies:
  • Raspberry Pi
  • BLE service on smartphone
  • Android
  • Node.js
  • Handlebars.js
  • MongoDB
  • Bootstrap
  
### Architecture:

![](iot_architecture.png)
