import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ChevronLeft } from 'lucide-react';
import { useApp } from '../App';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [investmentGoal, setInvestmentGoal] = useState('');
  const [riskComfort, setRiskComfort] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useApp();

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      if (user) {
        setUser({
          ...user,
          experienceLevel,
          investmentGoal,
          riskComfort,
          onboardingComplete: true,
        });
      }
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canContinue = () => {
    if (step === 1) return experienceLevel !== '';
    if (step === 2) return investmentGoal !== '';
    if (step === 3) return riskComfort !== '';
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-gray-900 text-xl">The Real Crypto G</span>
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {step} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Onboarding Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
          {/* Step 1: Experience Level */}
          {step === 1 && (
            <div>
              <h2 className="text-gray-900 mb-3">How experienced are you with crypto?</h2>
              <p className="text-gray-600 mb-8">
                This helps us personalize your insights and recommendations.
              </p>

              <div className="space-y-3">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setExperienceLevel(level)}
                    className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                      experienceLevel === level
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-gray-900">{level}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {level === 'Beginner' && 'New to crypto or just getting started'}
                      {level === 'Intermediate' && 'Familiar with basics, actively investing'}
                      {level === 'Advanced' && 'Experienced trader with portfolio strategy'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Investment Goal */}
          {step === 2 && (
            <div>
              <h2 className="text-gray-900 mb-3">What's your main goal?</h2>
              <p className="text-gray-600 mb-8">
                We'll tailor insights to help you achieve your objectives.
              </p>

              <div className="space-y-3">
                {[
                  { value: 'Learn and explore', desc: 'Understanding crypto with small investments' },
                  { value: 'Grow wealth over time', desc: 'Long-term holding and gradual accumulation' },
                  { value: 'Active trading', desc: 'Regular buying and selling for profits' },
                ].map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => setInvestmentGoal(goal.value)}
                    className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                      investmentGoal === goal.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-gray-900">{goal.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{goal.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Risk Comfort */}
          {step === 3 && (
            <div>
              <h2 className="text-gray-900 mb-3">How do you feel about risk?</h2>
              <p className="text-gray-600 mb-8">
                This helps us calibrate your portfolio risk score.
              </p>

              <div className="space-y-3">
                {[
                  { value: 'Very cautious', desc: 'Prefer stability, minimal volatility' },
                  { value: 'Balanced', desc: 'Accept moderate risk for reasonable returns' },
                  { value: 'Aggressive', desc: 'Comfortable with high volatility for growth' },
                ].map((comfort) => (
                  <button
                    key={comfort.value}
                    onClick={() => setRiskComfort(comfort.value)}
                    className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                      riskComfort === comfort.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-gray-900">{comfort.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{comfort.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 ${
              step === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-white border border-gray-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canContinue()}
            className={`px-8 py-3 rounded-lg transition-colors ${
              canContinue()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {step === totalSteps ? 'Go to dashboard' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
