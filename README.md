<h1 align="center" underline="none">🛒 Comprify – Intelligent Shopping System</h1>



<p align="center">
  <b>Team Members:</b><br>
  Thamizh J L | Yeeswanth P L | Baskaran M S 
</p>


## 📖 Project Overview

Comprify is an innovative AI-powered smart retail ecosystem that transforms both in-store and online shopping. It integrates embedded IoT hardware, computer vision, mobile platforms, cloud-based inventory and billing systems to provide a fully automated, multilingual and user-friendly retail experience. The system features a Smart Trolley equipped with a camera module and weight sensors, enabling real-time product recognition and automated billing which significantly reduces checkout times and improves operational efficiency.



## 🎯 Goals:

- Eliminate checkout lines through real-time billing.
- Offer AI-powered insights to stores.
- Enable digital receipts and contactless transactions.
- Support home delivery & multilingual mobile UI.



## 🚀 Features

- 📱 **Flutter Mobile App** with live cart view, digital receipts and UPI payments  
- 🧠 **Computer Vision (YOLOv11)** for automatic product recognition  
- ⚖️ **Weight Sensors (HX711 + Load Cells)** for validation and accurate billing  
- 🌐 **Cloud Integration** via AWS S3 and MongoDB Atlas for real-time inventory & billing updates  
- 🖥️ **POS System** for admins with offline-first support and track trolley status  
- 📦 **Inventory Management** & multi-store support  
- 🗣️ Support multiple languages for inclusive user access  
- 🔐 **OTP + JWT Authentication** for secure access  
- 📊 Use AI analytics for sales insights and personalized recommendations  



## 🛠️ Tech Stack


| Category           | Tech Used                                         |
|--------------------|---------------------------------------------------|
| **Mobile App**     | Flutter                                           |
| **Frontend (POS)** | HTML, Tailwind, React (for UI)                    |
| **Backend**        | Node.js, Express.js                               |
| **Database**       | MongoDB Atlas                                     |
| **Cloud**          | AWS S3                                            |
| **AI/ML**          | YOLOv11 (TensorRT optimized)                      |
| **IoT Hardware**   | ESP32, HX711 + Load Cell, OV5640 Camera, PIR Sensor |
| **Auth**           | JWT, OTP via Email                                |
| **Testing**        | Jest (end-to-end testing)                         |



## 📦 Installation Guide

Clone the project and install dependencies for the backend and POS system.

    git clone https://github.com/Thamizhjaisankar-git/Comprify.git
    cd comprify/backend
    npm install
    npm run dev
    
For the Flutter Mobile App:

    cd comprify/mobile_app
    flutter pub get
    flutter run
    
Configure your .env file with the following:

    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    AWS_ACCESS_KEY=your_key
    AWS_SECRET_ACCESS=your_secret
    

## 📊 Future Enhancements

- 🛍️ Home Delivery Integration
- 🔁 Subscription-based Auto Orders
- 📈 AI-powered Insights for Retailers
- ⚙️ Offline POS Sync
- 📷 Smart Shelf and Rack Integration



## 🧪 Testing

    --npm test

- Unit and integration tests for:
- API endpoints (Node.js)
- Component rendering (React)



## 📸 Screenshots

📱 Mobile App Screens

<table width="100%">
  <tr>
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/welcome.jpg" alt="welcome page" width="280" />
    </td>
    <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/loadingpageinprior.jpg" alt="loading page" width="280" />
    </td>
   <!-- gap -->
    <td align="center" width="25%">
      <img src="src/mobile_screenshots/langs.jpg" alt="lang selection page" width="280" />
    </td>
    <td align="center" width="25%">
      <img src="src/mobile_screenshots/home.jpg" alt="home page" width="280" />
    </td>
  </tr>

  <tr>
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/home2.jpg" alt="home2 page" width="250" />
    </td>
    <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/connecttrolley.jpg" alt="smart shopping page" width="250" />
    </td>
   <!-- gap -->
    <td align="center" width="25%">
      <img src="src/mobile_screenshots/findstore.jpg" alt="find stores page" width="250" />
    </td>
    <td align="center" width="25%">
      <img src="src/mobile_screenshots/qrscanner.jpg" alt="scanning page" width="250" />
    </td>
  </tr>

  <tr>
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/livecart.jpg" alt="live cart page" width="250" />
    </td>
    <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/seacrchany.jpg" alt="search page" width="250" />
    </td>
   <!-- gap -->
    <td align="center" width="25%">
      <img src="src/mobile_screenshots/brsmarket.jpg" alt="brs market page" width="250" />
    </td>
    <td align="center" width="25%">
      <img src="src/mobile_screenshots/products.jpg" alt="brs market page" width="250" />
    </td>
  </tr>

  <tr>
    <td align="center" width="25%">
      <img src="src/mobile_screenshots/cokepage.jpg" alt="brs market page" width="250" />
    </td>
    <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/mycartsummary.jpg" alt="mycart page" width="250" />
    </td>
   <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/buy.jpg" alt="buy page" width="250" />
    </td>
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/paymentmethod.jpg" alt="payment options page" width="250" />
    </td>
  </tr>

  <tr>
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/paycontinue.jpg" alt="payment page" width="250" />
    </td>
    <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/adddebitcard.jpg" alt="payment page" width="250" />
    </td>
   <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/otpforpay.jpg" alt="payment options page" width="250" />
    </td>
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/revieworder.jpg" alt="revieworder page" width="250" />
    </td>
  </tr>

   <tr>
    <td align="center" width="25%">
      <img src="src/mobile_screenshots/loading.jpg" alt="loading page" width="250" />
    </td>
    <!-- gap -->
    <td align="center" width="25%">
      <img src="src/mobile_screenshots/paymentsuccess.jpg" alt="payment success page" width="250" />
    </td>
   <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/mycart.jpg" alt="cart page" width="250" />
    </td>
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/history.jpg" alt="categories page" width="250" />
    </td>
  </tr>

   <tr>
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/history2.jpg" alt="categories page" width="250" />
    </td>
    <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/historyproducts.jpg" alt="historyproducts page" width="250" />
    </td>
   <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/notify.jpg" alt="notify page" width="250" />
    </td>
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/searchstores.jpg" alt="searchstores page" width="250" />
    </td>
  </tr>

   <tr>
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/dmart.jpg" alt="dmart page" width="250" />
    </td>
    <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/searchshops.jpg" alt="searchshops page" width="250" />
    </td>
   <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/favstores.jpg" alt="favstores page" width="250" />
    </td>
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/profile2.jpg" alt="profile page" width="250" />
    </td>
  </tr>

   <tr>
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/theme.jpg" alt="theme page" width="250" />
    </td>
    <!-- gap -->
    <td align="center" width="25%">
       <img src="src/mobile_screenshots/editprofile.jpg" alt="edit profile page" width="250" />
    </td>
     <td>
       <img src="src/mobile_screenshots/profile.jpg" alt="profile page" width="250" />
     </td>
  </tr>

</table>

🖥️ POS Screenshots

<table width="100%">
  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/landing page.jpg" alt="Landing Page" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/land for pos.jpg" alt="landing page for pos" width="100%"> 
    </td>
  </tr>

  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/mobile landing.jpg" alt="Landing Page for mobile" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/sign up.jpg" alt="sign up" width="100%">
    </td>
  </tr>

  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/sign in.jpg" alt="sign in" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/otp.jpg" alt="otp" width="100%">
    </td>
  </tr>

  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/create bill.jpg" alt="create bill" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/bill history list.jpg" alt="bill history list" width="100%">
    </td>
  </tr>

  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/bill history - grid.jpg" alt="bill history - grid" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/add cust.jpg" alt="add cust" width="100%">
    </td>
  </tr>

  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/customer list - list.jpg" alt="customer list - list" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/cust grid.jpg" alt="cust grid" width="100%">
    </td>
  </tr>

  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/add product.jpg" alt="add product" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/product list -list.jpg" alt="product list -list" width="100%">
    </td>
  </tr>

  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/product grid.jpg" alt="product grid" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/category.jpg" alt="category" width="100%">
    </td>
  </tr>

  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/category grid.jpg" alt="category grid" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/stock list.jpg" alt="stock list" width="100%">
    </td>
  </tr>
</table>

<table width="100%">
  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/stock grid.jpg" alt="stock grid" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/add emp new.jpg" alt="add emp new" width="100%">
    </td>
  </tr>

  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/emp list.jpg" alt="emp list" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/emp grid.jpg" alt="emp grid" width="100%">
    </td>
  </tr>

  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/store info.jpg" alt="store info" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/edit store info.jpg" alt="edit store info" width="100%">
    </td>
  </tr>

  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/stock list.jpg" alt="stock list" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/stock grid.jpg" alt="stock grid" width="100%">
    </td>
  </tr>

  <tr>
    <td align="left" width="48%">
      <img src="src/pos_screenshots/trolley.jpg" alt="trolley" width="100%">
    </td>
    <td align="right" width="48%">
      <img src="src/pos_screenshots/trolley list.jpg" alt="trolley list" width="100%">
    </td>
  </tr>
</table>

## 👨‍💻 Author

- Thamizh Jaisankar
- 📧 thamizhjaisankar@gmail.com
- 🔗 [Portfolio](https://portfolio-fawn-beta-24.vercel.app/) | [GitHub](https://github.com/Thamizhjaisankar-git) | [LinkedIn](https://www.linkedin.com/in/thamizhjaisankar/)

