# Inventory Management System  

A web-based inventory management solution designed to streamline the management of stock for institutions. This system provides secure access to authorized staff and includes robust features for handling inventory operations, such as adding, updating, deleting, and tracking items.  

## 🚀 Features  

- **User Authentication**  
  - Secure login system for authorized staff.  
  - Password hashing using bcrypt for enhanced security.  
  - Input validation to prevent unauthorized access.  

- **Dynamic Inventory Operations**  
  - Add new items with details like name, category, quantity, location, and date.  
  - Move items between locations while updating quantities and room details.  
  - Delete items from the inventory to maintain an accurate database.  

- **Advanced Filtering**  
  - Retrieve inventory records by specific time periods (e.g., year and month).  
  - Generate time-specific reports for better analysis.  

- **Transaction History**  
  - Maintain a detailed log of all inventory transactions, including:  
    - Type of action (e.g., added, moved, deleted).  
    - Quantity affected.  
    - Timestamp of the transaction.  

- **Responsive Design**  
  - Fully responsive interface for seamless use across devices, including desktops, tablets, and smartphones.  

## 💻 Tech Stack  

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (with Mongoose ORM)  
- **Tools & Techniques:**  
  - bcrypt for password hashing.  
  - Input validation for secure and reliable operations.  
  - RESTful API design for backend endpoints.  

## 🛠 Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/inventory-management-system.git
   
2. Navigate to project directory
   cd inventory-management-system

3. Install dependencies
   npm install express mongoose dotenv bcrypt
   npm install --save-dev nodemon

4. Set up environment variables:
Create a .env file in the root directory and add the following:
   PORT=your_port_number
   MONGO_URI=your_mongodb_connection_string

5. Start the development server:
    npm start

6. Open your browser and navigate to:
    http://localhost:<your_port_number>

Project Structure:
├── frontend/           # Static files (CSS, JS, images)  
├── views/            # HTML templates  
├── controllers/      # Backend logic  
├── models/           # Mongoose schemas  
├── routes/           # API endpoints  
├── .env              # Environment variables  
├── server.js         # Entry point  
└── README.md         # Project documentation  

Lessons Learned
This project helped me strengthen my skills in:

Full-stack development.
Building secure and scalable systems.
Database modeling with Mongoose.
Designing user-friendly and responsive interfaces.
🤝 Contributions
Contributions are welcome! Feel free to fork the repository, make your changes, and submit a pull request.

📄 License
This project is licensed under the MIT License.

📬 Contact
If you have any questions or feedback, feel free to reach out:

LinkedIn: www.linkedin.com/in/aryan-balani-
Email: aryanbalani99@gmail.com

