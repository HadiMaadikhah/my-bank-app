import { useState, useEffect } from "react"
import { KeyRound, RefreshCw, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import OtpInput from "@/components/OtpInput"

export default function Otp() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(45)
  const [resendActive, setResendActive] = useState(false)
  const [loading, setLoading] = useState(false)

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setResendActive(true)
      return
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleResend = () => {
    setTimeLeft(45)
    setResendActive(false)
  }

  // تبدیل شد برای auto-submit
  const handleVerify = (code) => {
    const finalCode = code || otp

    if (finalCode.length === 6) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        navigate("/dashboard")
      }, 2000)
    } else {
      alert("Please enter a valid 6-digit code.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f2f4ff] to-white relative overflow-hidden">
      
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50 transition-all">
          <Loader2 className="w-10 h-10 text-[#2e3092] animate-spin mb-3" />
          <p className="text-[#2e3092] font-medium text-sm tracking-wide">
            Verifying your code...
          </p>
        </div>
      )}

      <div className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6 border border-[#2e3092]/20">
        <h2 className="text-center text-lg font-semibold text-[#2e3092] mb-4">
          Enter Verification Code
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          {/* Luxury Dubai OTP Input */}
          <OtpInput 
            length={6} 
            onChange={setOtp} 
            onComplete={(code) => handleVerify(code)} 
          />

          <div className="text-center mt-2 text-sm text-gray-600">
            {resendActive ? (
              <button
                type="button"
                onClick={handleResend}
                className="flex items-center justify-center space-x-1 text-[#2e3092] font-medium hover:underline mx-auto mt-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Resend Code</span>
              </button>
            ) : (
              <p>
                Resend available in{" "}
                <span className="text-[#2e3092] font-semibold">
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
              </p>
            )}
          </div>

          {!loading && (
            <button
              type="button"
              onClick={() => handleVerify()}
              className="w-full bg-[#2e3092] hover:bg-[#23246e] text-white mt-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center space-x-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Verify & Login</span>
            </button>
          )}

          <p
            onClick={() => navigate("/")}
            className="text-center text-sm text-[#2e3092] hover:underline cursor-pointer mt-3"
          >
            Change mobile number
          </p>
        </form>
      </div>
    </div>
  )
}
