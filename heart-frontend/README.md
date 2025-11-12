# Heart Disease Detection System

A professional, responsive web application for AI-powered heart disease detection using medical parameters. Built with Next.js, React, and Tailwind CSS.

## Features

- 📋 Comprehensive form with 13 medical parameters
- 🤖 Real-time prediction using Flask backend API
- 📊 Color-coded risk assessment (Low, Medium, High)
- 📈 Probability visualization with confidence gauge
- ⚡ Smooth animations and loading states
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern, professional UI with Tailwind CSS
- ⚠️ Educational disclaimer and medical advisories

## Tech Stack

- **Frontend Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks
- **API Communication**: Fetch API
- **Deployment**: Ready for Vercel

## Installation

### Prerequisites

- Node.js 18+ and npm
- Running Flask backend at `http://localhost:5000`

### Setup

1. **Clone or download the project**

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment variables**
   
   Create a `.env.local` file (copy from `.env.local.example`):
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

   Edit `.env.local` if your backend runs on a different URL:
   \`\`\`
   NEXT_PUBLIC_API_URL=http://localhost:5000
   \`\`\`

4. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open in browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

## Usage

1. Fill in all medical parameters in the form:
   - Age, Sex, Chest Pain Type
   - Resting Blood Pressure, Cholesterol
   - Fasting Blood Sugar, Resting ECG
   - Maximum Heart Rate Achieved
   - Exercise Induced Angina
   - ST Depression, ST Slope
   - Number of Major Vessels, Thalassemia

2. Click **"Predict"** button to send data to the backend

3. View results immediately:
   - Risk Level (Low/Medium/High) with color coding
   - Probability percentage
   - Confidence gauge visualization
   - Detailed prediction information

4. Use **"Reset"** to clear results and start over

## Backend Integration

The app expects a Flask backend running at `http://localhost:5000` with:

### Endpoint: `/predict`
- **Method**: POST
- **Content-Type**: application/json

**Request Body Example:**
\`\`\`json
{
  "age": 63,
  "sex": 1,
  "cp": 3,
  "trestbps": 145,
  "chol": 233,
  "fbs": 1,
  "restecg": 0,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 2.3,
  "slope": 0,
  "ca": 0,
  "thal": 1
}
\`\`\`

**Expected Response:**
\`\`\`json
{
  "prediction": 1,
  "probability": 0.82,
  "risk_level": "High"
}
\`\`\`

**Parameter Definitions:**
- `age`: Patient age in years
- `sex`: 0 = Female, 1 = Male
- `cp`: Chest pain type (0-3)
- `trestbps`: Resting blood pressure in mmHg
- `chol`: Serum cholesterol in mg/dl
- `fbs`: Fasting blood sugar > 120 mg/dl (0 = No, 1 = Yes)
- `restecg`: Resting electrocardiogram (0-2)
- `thalach`: Maximum heart rate achieved
- `exang`: Exercise induced angina (0 = No, 1 = Yes)
- `oldpeak`: ST depression induced by exercise
- `slope`: Slope of peak exercise ST segment (0-2)
- `ca`: Number of major vessels (0-3)
- `thal`: Thalassemia (0 = Normal, 1 = Fixed Defect, 2 = Reversible Defect)

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com/import](https://vercel.com/import)
   - Select your GitHub repository
   - Click "Import"

3. **Set Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` with your Flask backend URL
   - Example: `https://your-flask-backend.onrender.com`

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at a Vercel URL

### Backend Deployment

For the Flask backend, deploy to services like:
- Render
- Railway
- Heroku
- AWS

Then update `NEXT_PUBLIC_API_URL` to point to your backend's deployed URL.

## Local Testing

1. Start Flask backend:
   \`\`\`bash
   python app.py
   \`\`\`

2. Start Next.js frontend:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Fill the form with test data and click "Predict"

4. Expected result display with risk assessment

## Error Handling

The app includes graceful error handling for:
- ❌ Backend connection failures
- ❌ Invalid form submissions
- ❌ Network timeouts
- ❌ API errors

Errors display as toast notifications with clear messaging.

## Disclaimer

⚠️ **Educational Use Only**

This application is intended for educational and demonstration purposes only. It should NOT be used for:
- Medical diagnosis
- Treatment recommendations
- Clinical decision-making
- Replacement of professional medical advice

Always consult with qualified healthcare professionals for actual medical concerns. The predictions are based on machine learning models and should not be treated as medical advice.

## Support

For issues or questions:
1. Check that Flask backend is running at `http://localhost:5000`
2. Verify `.env.local` configuration
3. Check browser console for error messages
4. Ensure all medical parameters are within valid ranges

## License

MIT License - Feel free to use and modify for educational purposes.
