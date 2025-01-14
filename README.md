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
