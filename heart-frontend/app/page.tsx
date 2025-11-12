"use client"

import { useState, useEffect } from "react"
import PredictionForm from "@/components/prediction-form"
import ResultCard from "@/components/result-card"
import Spinner from "@/components/spinner"
import Toast from "@/components/toast"

interface FormData {
  age: number
  sex: number
  cp: number
  trestbps: number
  chol: number
  fbs: number
  restecg: number
  thalach: number
  exang: number
  oldpeak: number
  slope: number
  ca: number
  thal: number
}

interface PredictionResult {
  prediction: number
  probability: number
  risk_level: string
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const showToast = (message: string, type: "success" | "error" = "error") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const handlePredict = async (formData: FormData) => {
    setLoading(true)
    setResult(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const token = localStorage.getItem('token')

      if (!token) {
        throw new Error("Please login to use the prediction feature")
      }

      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        if (response.status === 401 || response.status === 422) {
          localStorage.removeItem('token')
          throw new Error("Session expired, please login again")
        }
        throw new Error(`API error: ${response.status}`)
      }

      const data: PredictionResult = await response.json()
      setResult(data)
      showToast("Prediction completed successfully", "success")
    } catch (error) {
      console.error("Prediction error:", error)
      showToast(
        error instanceof Error ? error.message : "Failed to get prediction. Please ensure the backend is running.",
      )
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block mb-6 p-4 bg-blue-50 rounded-full">
            <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V9" />
              <path d="M14 1v4m3 6a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} stroke="currentColor" fill="none" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Heart Disease Detection System</h1>
          <p className="text-lg text-gray-600 mb-8">Please login to access the prediction features</p>
          <div className="space-x-4">
            <a href="/login" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Login
            </a>
            <a href="/register" className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Register
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 p-3 bg-blue-50 rounded-full">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V9" />
              <path d="M14 1v4m3 6a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} stroke="currentColor" fill="none" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Heart Disease Detection System</h1>
          <p className="text-lg text-gray-600">Advanced AI-powered medical prediction for early detection</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Medical Parameters</h2>
              <PredictionForm onSubmit={handlePredict} onReset={handleReset} isLoading={loading} />
            </div>
          </div>

          {/* Result Section */}
          <div>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Spinner />
              </div>
            ) : result ? (
              <ResultCard result={result} />
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 text-gray-300 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <p className="text-gray-500 font-medium">
                    Enter your medical parameters and click "Predict" to see results
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 text-sm text-yellow-800">
            <p className="font-medium">⚠️ Disclaimer</p>
            <p>
              This tool is for educational use only and should not be used as a substitute for professional medical
              advice.
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </main>
  )
}
