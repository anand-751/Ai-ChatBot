# 💬 AI-ChatBot (with Real-Time Web Search)

**AI-ChatBot** is a smart conversational assistant that goes beyond static responses by integrating **real-time web search** via SERP API. It intelligently scrapes relevant links and content to provide dynamic, updated answers — making it significantly more powerful than a typical static LLM chatbot.

---

## ⚡️ Highlights

- 🔍 **Real-time web scraping** using [SerpAPI](https://serpapi.com/)
- 🧠 **LLM-powered** conversational intelligence (OpenAI / Gemini / Groq)
- 🔗 **Live, contextual links** embedded into responses
- 🧵 **Chat-like UI** with smooth user experience
- ⚙️ **Fast response times** via asynchronous scraping and optimized architecture
- 📦 **.env-based** config for managing sensitive API keys

---

## 🧠 How It Works

1. **User input** is passed to the chatbot frontend.
2. Backend fetches **SERP results** from Google using **SerpAPI**.
3. It scrapes snippets and relevant links in **real-time**.
4. These links and summaries are **fed to the AI model** to produce an enriched, updated response.
5. The answer, along with clickable resources, is sent back to the frontend.

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **AI Engine**: OpenAI / Gemini / Groq (Pluggable via `.env`)
- **Scraping/Search**: [SerpAPI](https://serpapi.com/) , Selenium
- **Environment Config**: dotenv

---

⚙️ Getting Started
                                                     
1️⃣ Clone the Repo
git clone https: https://github.com/anand-751/Ai-ChatBot.git                           and then              
cd Ai-ChatBot

2️⃣ Install Dependencies
cd server
npm install

3️⃣ Add Environment Variables
Create a .env file in the server/ directory:

GROQ_API_KEY=your_groq_key , 
OPENAI_API_KEY=your_openai_key , 
SERPAPI_KEY=your_serpapi_key  
      (Choose your preferred LLM provider (OpenAI/Groq/Gemini) and ensure the correct API key is set)

4️⃣ Run the Server
cd server
python3 server.py
Then, cd client -> npm run dev

AI-ChatBot Response:

<img width="1432" height="1572" alt="cafes" src="https://github.com/user-attachments/assets/90d45f48-5233-4966-9dde-072f27de972f" />



