# TOPSIS Web Service 🌐

A lightweight **web-based implementation of the TOPSIS (Technique for Order Preference by Similarity to Ideal Solution)** method.  
Users can upload a CSV file, specify weights and impacts, and obtain ranked results as a downloadable CSV file.

---

---

## Live Deployment

The TOPSIS web service is deployed online and accessible at:

https://topsis-webservice-kdgu.onrender.com

---

## Features

- Upload CSV files directly through the browser
- Supports user-defined **weights** and **impacts**
- Executes the TOPSIS algorithm on the server
- Generates ranked output as a downloadable CSV
- Clean and minimal user interface
- REST-style API built using Flask
---

## 🧠 What is TOPSIS?

TOPSIS is a multi-criteria decision-making (MCDM) technique used to rank alternatives based on their distance from an ideal best and an ideal worst solution.

---

## 🛠 Tech Stack

**Backend**
- Python
- Flask
- NumPy
- Pandas
- topsis-swastik-102303585

**Frontend**
- HTML
- CSS
- JavaScript (Vanilla)

---

## 📁 Project Structure

.
├── app.py
├── requirements.txt
├── static/
│   ├── script.js
│   └── style.css
├── templates/
│   └── index.html
└── README.md

---

## 📦 Installation

### 1️⃣ Clone the repository
git clone https://github.com/your-username/topsis-web-service.git  
cd topsis-web-service

### 2️⃣ Create a virtual environment (recommended)
python -m venv venv  
source venv/bin/activate  

### 3️⃣ Install dependencies
pip install -r requirements.txt

---

## ▶️ Running the Application

python app.py

The server will start at:  
http://127.0.0.1:5000

---

## 📄 Input Format

### CSV File
- First column: Alternative names
- Remaining columns: Numeric criteria values

### Weights
Comma-separated numeric values  
Example: 1,2,1

### Impacts
Comma-separated signs  
Example: -,+,+

---

## 📤 Output

- CSV file containing:
  - TOPSIS score
  - Rank (1 = best alternative)

---

## 🔌 API Endpoint

POST /run

Form Data:
- file: CSV file
- weights: comma-separated values
- impacts: comma-separated signs

Response:
- CSV file download

---

## 📜 License

MIT License

---

## 👤 Author

Avani Singh 
PyPI Package: topsis-avani
