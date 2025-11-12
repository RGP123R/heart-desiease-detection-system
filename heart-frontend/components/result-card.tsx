"use client"

import { useEffect, useState } from "react"

interface ResultCardProps {
  result: {
    prediction: number
    probability: number
    risk_level: string
  }
}

export default function ResultCard({ result }: ResultCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", icon: "✓" }
      case "medium":
        return { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", icon: "⚠" }
      case "high":
        return { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", icon: "!" }
      default:
        return { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700", icon: "?" }
    }
  }

  const colors = getRiskColor(result.risk_level)
  const probability = Math.round(result.probability * 100)

  return (
    <div
      className={`transform transition-all duration-500 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
    >
      <div className={`bg-white rounded-xl shadow-lg p-8 border-2 ${colors.border}`}>
        <div className={`${colors.bg} rounded-lg p-6 mb-6`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`text-3xl ${colors.text}`}>{colors.icon}</div>
            <h3 className={`text-xl font-bold ${colors.text}`}>Risk Assessment</h3>
          </div>
          <p className={`text-4xl font-bold ${colors.text} mb-2`}>{result.risk_level}</p>
          <p className={`text-sm ${colors.text} opacity-80`}>Probability: {probability}%</p>
        </div>

        {/* Probability Gauge */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-700">Confidence Level</p>
            <span className="text-sm font-bold text-blue-600">{probability}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                probability < 50 ? "bg-green-500" : probability < 75 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${probability}%` }}
            />
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Prediction Result</span>
            <span className="text-lg font-bold text-gray-900">{result.prediction === 0 ? "Negative" : "Positive"}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-sm text-gray-600">Risk Level</span>
            <span className={`text-lg font-bold ${colors.text}`}>{result.risk_level}</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            This prediction is based on the provided medical parameters and should not be considered as medical advice.
            Please consult with a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  )
}
