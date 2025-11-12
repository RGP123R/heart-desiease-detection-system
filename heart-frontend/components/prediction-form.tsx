"use client"

import type React from "react"

import { useState } from "react"
import InputField from "./input-field"

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

interface PredictionFormProps {
  onSubmit: (data: FormData) => void
  onReset: () => void
  isLoading: boolean
}

export default function PredictionForm({ onSubmit, onReset, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    age: 50,
    sex: 1,
    cp: 1,
    trestbps: 120,
    chol: 200,
    fbs: 0,
    restecg: 0,
    thalach: 100,
    exang: 0,
    oldpeak: 0,
    slope: 1,
    ca: 0,
    thal: 3,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: Number.parseFloat(value),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleReset = () => {
    setFormData({
      age: 50,
      sex: 1,
      cp: 1,
      trestbps: 120,
      chol: 200,
      fbs: 0,
      restecg: 0,
      thalach: 100,
      exang: 0,
      oldpeak: 0,
      slope: 1,
      ca: 0,
      thal: 3,
    })
    onReset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* First Row */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          min="1"
          max="120"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">Female</option>
            <option value="1">Male</option>
          </select>
        </div>
      </div>

      {/* Chest Pain Type and Resting BP */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Chest Pain Type</label>
          <select
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">Typical Angina</option>
            <option value="1">Atypical Angina</option>
            <option value="2">Non-anginal Pain</option>
            <option value="3">Asymptomatic</option>
          </select>
        </div>
        <InputField
          label="Resting BP (mmHg)"
          name="trestbps"
          type="number"
          value={formData.trestbps}
          onChange={handleChange}
          min="90"
          max="200"
        />
      </div>

      {/* Cholesterol and FBS */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Cholesterol (mg/dl)"
          name="chol"
          type="number"
          value={formData.chol}
          onChange={handleChange}
          min="100"
          max="400"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">FBS &gt; 120 mg/dl</label>
          <select
            name="fbs"
            value={formData.fbs}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
      </div>

      {/* Resting ECG and Max HR */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resting ECG</label>
          <select
            name="restecg"
            value={formData.restecg}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">Normal</option>
            <option value="1">ST-T Abnormality</option>
            <option value="2">LV Hypertrophy</option>
          </select>
        </div>
        <InputField
          label="Max Heart Rate"
          name="thalach"
          type="number"
          value={formData.thalach}
          onChange={handleChange}
          min="60"
          max="220"
        />
      </div>

      {/* Exercise Angina and ST Depression */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Angina</label>
          <select
            name="exang"
            value={formData.exang}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <InputField
          label="ST Depression"
          name="oldpeak"
          type="number"
          value={formData.oldpeak}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
        />
      </div>

      {/* Slope and CA */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ST Slope</label>
          <select
            name="slope"
            value={formData.slope}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">Upsloping</option>
            <option value="1">Flat</option>
            <option value="2">Downsloping</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Major Vessels</label>
          <select
            name="ca"
            value={formData.ca}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>

      {/* Thalassemia */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Thalassemia</label>
        <select
          name="thal"
          value={formData.thal}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="3">Normal</option>
          <option value="6">Fixed Defect</option>
          <option value="7">Reversible Defect</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
        >
          {isLoading ? "Predicting..." : "Predict"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          Reset
        </button>
      </div>
    </form>
  )
}
