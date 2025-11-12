"use client"

import type React from "react"

interface InputFieldProps {
  label: string
  name: string
  type?: string
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  min?: string
  max?: string
  step?: string
}

export default function InputField({ label, name, type = "number", value, onChange, min, max, step }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={isNaN(value) ? '' : value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}
