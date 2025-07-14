<h1 align="center">🛒 Comprify – Intelligent Shopping System</h1>



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

📱 Mobile App Interface
![Mobile App Screenshot]()

🖥️ POS Dashboard


🧠 Smart Trolley & IoT Hardware

		

## 👨‍💻 Author

- Thamizh Jaisankar
- 📧 thamizhjaisankar@gmail.com
- 🔗 [Portfolio](https://portfolio-fawn-beta-24.vercel.app/) | [GitHub](https://github.com/Thamizhjaisankar-git) | [LinkedIn](https://www.linkedin.com/in/thamizhjaisankar/)

