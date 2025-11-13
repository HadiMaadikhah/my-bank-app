import { useRef, useEffect, useState } from "react"

export default function OtpInput({ length = 6, onChange, onComplete }) {
  const inputs = useRef([])
  const [values, setValues] = useState(Array(length).fill(""))

  useEffect(() => {
    inputs.current[0]?.focus()
  }, [])

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    const newValues = [...values]
    newValues[index] = value
    setValues(newValues)

    // Move forward
    if (value && index < length - 1) {
      inputs.current[index + 1].focus()
    }

    const otp = newValues.join("")
    onChange(otp)

    // Auto submit ONLY when all digits filled
    if (otp.length === length && !otp.includes("")) {
      onComplete?.(otp)
    }

    // Small animation
    e.target.classList.add("scale-110")
    setTimeout(() => e.target.classList.remove("scale-110"), 120)

    // Vibration mobile
    if (navigator.vibrate) navigator.vibrate(10)
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputs.current[index - 1].focus()
    }
  }

  return (
    <div className="flex justify-between gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          type="tel"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={values[i]}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-12 h-14 text-center text-xl font-semibold bg-white 
                     rounded-xl border border-[#2e3092]/30 shadow-sm
                     focus:ring-2 focus:ring-[#2e3092] outline-none
                     transition-all duration-150"
        />
      ))}
    </div>
  )
}
