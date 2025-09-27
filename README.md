# The Digital Shelf

**The Digital Shelf** is a full-stack platform engineered with a Node.js and Express.js back-end that serves both a RESTful API and a server-side rendered front-end application. This responsive e-commerce storefront allows users to browse, search, filter, and sort through a variety of mobile products from top brands. The front-end is dynamically rendered using EJS, providing a seamless and interactive user experience.

-----

## **Folder Structure**

```
/
├── db/
│   └── connect.js              # Handles MongoDB connection logic
├── errors/
│   └── customError.js          # Custom error handling classes
├── middlewares/
│   ├── 404.js                  # Middleware for handling 404 Not Found errors
│   ├── asyncWrapper.js         # Wraps async functions to catch errors
│   └── errorHandler.js         # Central error handling middleware
├── models/
│   └── products.js             # Mongoose schema for products
├── public/
│   ├── script.js               # Client-side JavaScript for interactivity
│   └── style.css               # Stylesheet for the application
├── routes/
│   ├── home.js                 # Routes for the server-rendered homepage
│   └── products.js             # API routes for products
├── views/
│   └── index.ejs               # EJS template for the main page
├── .gitignore                  # Specifies files for Git to ignore
├── app.js                      # Main application entry point
├── package.json                # Project metadata and dependencies
├── populateDB.js               # Script to seed the database with initial data
└── products.json               # JSON data for database seeding
```

-----

## **Installation Guide**

Follow these steps to set up and run the project locally.

### **1. Clone the Repository**

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/the-digital-shelf.git
cd the-digital-shelf
```

### **2. Install Dependencies**

Next, install the required npm packages listed in `package.json`:

```bash
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the root directory. This file should contain your MongoDB connection string. **Note:** The `.env` file is included in the `.gitignore` and should not be committed to version control.

```
MONGO_URI=your_mongodb_connection_string_here
```

### **4. Populate the Database**

Run the `populateDB.js` script to seed your MongoDB database with the product data from `products.json`. This script will first delete any existing products before adding the new ones.

```bash
node populateDB.js
```

### **5. Start the Server**

Finally, start the application:

```bash
node app.js
```

The server will be running on `http://localhost:5000`.

-----

## **API Endpoints**

The application exposes the following endpoints:

### **Home Page**

  * `GET /`
      * **Description**: Renders the main HTML page using EJS, displaying products with default settings. This endpoint also processes query parameters from the front-end to filter and sort the displayed products.

### **Products API**

  * `GET /api/v1/products`
      * **Description**: Returns a JSON object containing a list of products based on the provided query parameters. This is the main endpoint for fetching product data.
      * **Query Parameters**:
          * `featured` (Boolean): Filters for featured products.
              * Example: `/api/v1/products?featured=true`
          * `company` (String): Filters by company name (case-insensitive).
              * Example: `/api/v1/products?company=Apple`
          * `name` (String): Searches for products by name using a regular expression (case-insensitive).
              * Example: `/api/v1/products?name=galaxy`
          * `sort` (String): Sorts the results. Use a comma-separated list for multiple sort fields. Use a `-` prefix for descending order.
              * Example: `/api/v1/products?sort=price,-name`
          * `fields` (String): Selects which fields to include in the response (comma-separated).
              * Example: `/api/v1/products?fields=name,price`
          * `numericFilters` (String): Applies numeric comparisons on fields like `price` and `rating`.
              * Supported operators: `=`, `>`, `>=`, `<`, `<=`
              * Example: `/api/v1/products?numericFilters=price<=200000,rating>=4.5`
          * `page` (Number): Specifies the page number for pagination.
              * Example: `/api/v1/products?page=2`
          * `limit` (Number): Sets the number of items per page.
              * Example: `/api/v1/products?limit=5`

-----

## **Tech Stack**

  * **Backend**:
      * **Node.js**: JavaScript runtime environment.
      * **Express**: Web framework for Node.js.
      * **MongoDB**: NoSQL database for storing product data.
      * **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
  * **Frontend**:
      * **EJS (Embedded JavaScript)**: Templating engine for server-side rendering of HTML.
      * **CSS3**: For styling the user interface.
      * **JavaScript (ES6+)**: For client-side interactivity and API calls.
  * **Development**:
      * **dotenv**: For managing environment variables.
      * **cors**: For enabling Cross-Origin Resource Sharing.
