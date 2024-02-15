# Real-time Chat Application using Socket.io, React.js, Node.js & Express.js
My goal was to build a Chat app that allows users to create room and do real-time communication. 
This app is build using web sockets that Socket.io uses internally.

# The app is live here - 
[Click here to see the live demo](https://chat-app-client-seven-puce.vercel.app/)

# The project structure is distributed into sections - 
* client 
* server
# The libraries included in this app are - 
* For the Server side it has the backend packages like -
  * Node.js 
  * Express.js(CORS middleware) 
  * Socket.io 
  * Nodemon
* For the Client side - 
  * React 
  * React-router-dom
  * Socket.io Client
  * react-scroll-to-bottom

# Setting up the server-side
Most of the server-side setup is done requiring http module and then encapsulating it inside the socket.io. Using express makes setting up easier and allows us to use different middleware like the CORS middleware which has been used here.
All the handling of the users adding, removing, admin work,... everything is done on the server side. Also used nodemon module to automaate the serving.

# Setting up the client-side 
Firstly, the design is completely mine, asthetics is an important part that I always try to maintain in all of my projects.
The home page design was build using a tool called blush which allows to make vector illustrations based on humaaans vector graphics.
The responsive design of the page using media queries will run when opened in a mobile-device.
Secondly, for React file structure two main components were created Join.js(Homepage) and Chat.js(ChatPage). All the other components were created on top of these main components
React-router-dom is used for routing and apart from that for smooth scrolling react-scroll-to-bottom for more user interaction just like any other Chat-app. 

Both the client and the server is connected using socket.io, the socket.io-client at the client side and socket.io in the server side enables the user to send constant events. There is constant emmiting and listening of events between the client and the server.

# Deployment
The server is deployed using Heroku and the client is deployed using Github Pages.

# Features
* It shows the current users who are in the chat,
* It welcomes when user join the chat 
* Send notifications all members when any user joins or left the chat,

# Future Scope
* This app is currently session based and does not at any circumstances stores. 
* Will be connected to a database either FIrebase or MongoDB to act as cache so that users can take a look at their previous chats.
* A column will be added to show all the online users.
* The ability to add images, videos and docs.
* To add a variety of emojis more easily
