# 🚀 AI Agent Call Executive Assistant

An advanced, AI-powered voice assistant integrating OpenAI's GPT-4 and Twilio for seamless real-time conversations. Featuring a modern React frontend and a robust Python backend, this assistant brings human-like interaction to the next level.

---

## 🔥 Features

- 🎙 **Real-time Voice Communication** – Instant, AI-driven voice interaction
- 🤖 **GPT-4 Intelligence** – Smart, contextual, and natural responses
- 🔊 **Lifelike Voice Synthesis** – Powered by Twilio
- 🔐 **Enterprise-Grade Security** – Secure authentication & encrypted data
- ⚡ **Ultra-Fast Processing** – Optimized for speed and efficiency
- 📱 **Modern, Responsive UI** – Built with cutting-edge front-end tech

---

## 🛠 Tech Stack

| Component   | Technology  |
|------------|------------|
| **Frontend**  | React.js (Styled Components) |
| **Backend**   | Python (Flask) |
| **AI**        | OpenAI GPT-4 |
| **Voice**     | Twilio |
| **Proxy**     | Ngrok |

---

## 📌 Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **Ngrok Account**
- **Twilio Account**
- **OpenAI API Key**

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
 git clone https://github.com/yashahlawatpro1709/AI-agent-call-executive.git
 cd AI-agent-call-executive
```

### 2️⃣ Install Frontend Dependencies
```bash
 cd "AI agent sales copy"
 npm install
```

### 3️⃣ Install Backend Dependencies
```bash
 python -m venv venv
 source venv/bin/activate  # Windows: venv\Scripts\activate
 pip install -r requirements.txt
```

### 4️⃣ Configuration
Create a `.env` file in the root directory and add the following credentials:
```ini
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
OPENAI_API_KEY=your_openai_key
TWILIO_PHONE_NUMBER=your_twilio_number
```

### 5️⃣ Running the Application
#### Start the Python Server
```bash
 python server.py
```

#### Start Ngrok (Expose Backend)
```bash
 ngrok http 5000
```

#### Start the React Frontend
```bash
 npm start
```

### 🎯 Access the Application
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend:** [http://localhost:5000](http://localhost:5000)
- **Ngrok URL:** (Check your Ngrok terminal output)

---

## 🌍 Project Structure

```
AI-agent-call-executive/
├── src/              # React frontend source code
├── public/           # Static assets
├── server.py         # Flask backend server
├── ai_agent.py       # AI agent logic
├── requirements.txt  # Python dependencies
├── package.json      # Node.js dependencies
└── .env              # Environment variables
```

---

## 🤝 Contributing

We welcome contributions! Follow these steps to get involved:

1. **Fork the Repository**
2. **Create a Feature Branch:**  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Make Your Changes & Commit:**  
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push Your Branch:**  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📜 License
This project is licensed under the **MIT License**.

---

### 🚀 Ready to Build the Future of AI Voice Assistants? Let’s Go! 🚀













