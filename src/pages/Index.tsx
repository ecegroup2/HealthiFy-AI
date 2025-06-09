import { Separator } from "@/components/ui/separator";
import ECGAnalyzer from "@/components/ECGAnalyzer";
import { Activity, Heart, Upload, Zap, Shield, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md shadow-2xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 border-2 border-rose-500 rounded-full opacity-30 animate-ping"></div>
                <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-500 rounded-full">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  ECG Analysis Pro
                </h1>
                <p className="text-xs sm:text-sm text-gray-400">Advanced AI-Powered Diagnostics</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full border border-rose-500/30">
              <Shield className="h-4 w-4 text-rose-400" />
              <span className="text-sm text-rose-300">Secure & Private</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-12 sm:py-20 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-black/20 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-white/10">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-rose-200 to-purple-200 bg-clip-text text-transparent">
                Revolutionary ECG Analysis
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Upload your ECG image and get instant, comprehensive analysis powered by multiple AI models working in harmony. 
                Detect abnormalities with unprecedented accuracy and confidence.
              </p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
                <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
                  <Zap className="h-4 w-4 text-green-400" />
                  <span className="text-green-300">Instant Results</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">
                  <BarChart3 className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-300">99.7% Accuracy</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
                  <Activity className="h-4 w-4 text-purple-400" />
                  <span className="text-purple-300">Multi-Model AI</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* ECG Analyzer Component */}
        <section className="py-8">
          <ECGAnalyzer />
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How Our AI System Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our advanced multi-model approach ensures the highest accuracy in ECG analysis
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Step 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-rose-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl mb-6 mx-auto">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Upload ECG Image</h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Simply drag and drop or click to upload your ECG image in JPG, PNG, or other standard formats. 
                  Our system supports various ECG layouts and qualities.
                </p>
                <div className="mt-6 text-center">
                  <span className="text-rose-400 text-sm font-medium">Step 1</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-6 mx-auto">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">AI Multi-Model Analysis</h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Multiple specialized AI models analyze your ECG simultaneously, each focusing on different 
                  aspects like rhythm, morphology, and specific abnormalities.
                </p>
                <div className="mt-6 text-center">
                  <span className="text-green-400 text-sm font-medium">Step 2</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group relative sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6 mx-auto">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">Comprehensive Report</h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  Receive a detailed analysis report combining insights from all models, with confidence scores, 
                  detected abnormalities, and actionable recommendations.
                </p>
                <div className="mt-6 text-center">
                  <span className="text-blue-400 text-sm font-medium">Step 3</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24">
          <div className="bg-gradient-to-r from-black/20 to-purple-900/20 rounded-3xl p-8 sm:p-12 border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose Our ECG Analyzer?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-400 text-sm">Get results in seconds, not minutes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Secure & Private</h3>
                <p className="text-gray-400 text-sm">Your data never leaves our secure servers</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Highly Accurate</h3>
                <p className="text-gray-400 text-sm">99.7% accuracy with multi-model approach</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Comprehensive</h3>
                <p className="text-gray-400 text-sm">Detects multiple abnormality types</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md mt-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-300 font-medium">ECG Analysis Pro</span>
            </div>
            <p className="text-gray-500 text-sm text-center">
              © {new Date().getFullYear()} ECG Analysis Pro. Advanced AI-Powered ECG Diagnostics.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
