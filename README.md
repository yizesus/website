# Webshop Project

## Overview
This is a simple webshop project built using HTML, CSS, and JavaScript. It provides a basic structure for an online store, allowing users to browse products and interact with the shopping cart.

## Project Structure
```
webshop-project
├── src
│   ├── about.html
│   ├── admin.html
│   ├── cart.html
│   ├── contact.html
│   ├── index.html
│   ├── login.html
│   ├── products.html
│   ├── register.html
│   ├── css
│   │   └── styles.css
│   ├── images
│   │   ├── ad1.jpg
│   │   ├── ad2.jpg
│   │   └── ad3.jpg
│   └── js
│       ├── admin.js
│       ├── auth.js
│       └── scripts.js
├── server
│   ├── auth.js
│   ├── db.js
│   ├── routes.js
│   ├── server.js
└── README.md
```


## Setup Instructions
1. Clone the repository or download the project files.
2. Run `npm install` to install the dependencies.
3. Start the server by running `npm start`.
4. Open the `index.html` file in your web browser (or http://localhost:3000) to view the webshop.
5. You can modify the CSS in `styles.css` to change the appearance of the webshop.
6. Update the JavaScript in `scripts.js` to add interactivity and functionality.

## Database Setup
1. Ensure you have MySQL installed and running on your machine.
2. Open your MySQL command line or a MySQL client and execute the following SQL script to create the database and tables:

    ```sql
    CREATE DATABASE IF NOT EXISTS WebshopDB;

    USE WebshopDB;

    CREATE TABLE IF NOT EXISTS Products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        imageUrl VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS Users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') NOT NULL
    );
    ```

## Features
- Responsive design for various screen sizes.
- Basic product listing and details.
- Shopping cart functionality.
- User authentication (login and registration).
- Admin panel for product management.

## Future Improvements
- Implement payment processing.
- Enhance the user interface with more advanced CSS techniques.

## License
This project is open-source and available for modification and distribution.