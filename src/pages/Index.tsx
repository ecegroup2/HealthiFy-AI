import { Separator } from "@/components/ui/separator";
import ECGAnalyzer from "@/components/ECGAnalyzer";
import { Activity, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#070b16] text-white overflow-x-hidden">
{/*       <header className="bg-[#0f1729] shadow-md border-b border-gray-800">
  <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
    <div className="flex items-center gap-3">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <div className="absolute inset-0 border-2 border-rose-500 rounded-full opacity-20 animate-ping"></div>
        <Heart className="h-6 w-6 text-rose-500 z-10" />
      </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
        HealthiFy AI
        </h1>
    </div>
  </div>
</header> */}



<header className="relative bg-gradient-to-br from-[#1e293b] via-[#22304a] to-[#111827] shadow-xl border-b border-cyan-700/60 backdrop-blur-lg">
  {/* Decorative blurred circles for depth */}
  <div className="absolute -top-12 -left-12 w-32 h-32 sm:w-48 sm:h-48 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
  <div className="absolute -bottom-16 right-0 w-40 h-40 sm:w-60 sm:h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

  <div className="relative max-w-7xl mx-auto px-3 py-3 sm:px-6 sm:py-4 md:px-8 flex items-center justify-between">
    {/* Left: Heart Icon */}
    <div className="flex-1 flex items-center justify-start">
      <div className="relative w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center">
        <div className="absolute inset-0 border-2 border-rose-500 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute inset-0 border border-rose-400 rounded-full opacity-30 animate-pulse"></div>
        <Heart className="h-4 w-4 sm:h-6 sm:w-6 md:h-7 md:w-7 text-rose-500 z-10 animate-bounce drop-shadow-lg" />
      </div>
    </div>

    {/* Center: Title */}
    <div className="flex-1 flex justify-center">
      <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-md text-center">
        HealthiFy <span className="text-rose-400 animate-pulse">AI</span>
      </h1>
    </div>

    {/* Right: Back Button */}
    <div className="flex-1 flex items-center justify-end">
      <button
        onClick={() => window.location.href = 'https://ecegroup2.github.io/'}
        className="group relative flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-600 hover:from-cyan-300 hover:via-teal-400 hover:to-blue-500 text-white font-medium sm:font-semibold rounded-xl sm:rounded-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-cyan-500/25 text-xs sm:text-sm md:text-base backdrop-blur-sm border border-white/10 hover:border-white/20 active:scale-95"
        aria-label="Go back to homepage"
      >
        <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></span>
        <svg 
          className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-x-1 relative z-10" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden xs:inline sm:inline relative z-10 tracking-wide group-hover:tracking-wider transition-all duration-300">
          Back
        </span>
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
        </div>
      </button>
    </div>
  </div>
</header>




      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-100 mb-2">Comprehensive ECG Analysis</h2>
          <p className="text-gray-400 text-justify">
            Upload your ECG image to detect abnormalities using advanced AI models.
            Our system provides a comprehensive analysis by combining specialized detection systems.
          </p>
          <Separator className="my-6 bg-gray-800" />
        </section>
        
        <ECGAnalyzer />
        
        <section className="mt-16">
          <Separator className="mb-6 bg-gray-800" />
          <h2 className="text-xl font-semibold text-gray-100 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0f1729] p-4 rounded-lg shadow-sm border border-gray-800">
              <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                1. Upload ECG
              </h3>
              <p className="text-gray-400 text-sm">
                Upload your ECG image in standard formats (JPG, PNG)
              </p>
            </div>
            <div className="bg-[#0f1729] p-4 rounded-lg shadow-sm border border-gray-800">
              <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                2. Multi-Model Analysis
              </h3>
              <p className="text-gray-400 text-sm">
                Our system analyzes your ECG using multiple specialized AI models working in parallel
              </p>
            </div>
            <div className="bg-[#0f1729] p-4 rounded-lg shadow-sm border border-gray-800">
              <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" /> 
                3. Comprehensive Results
              </h3>
              <p className="text-gray-400 text-sm">
                Receive detailed analysis with combined insights from all models for maximum accuracy
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-[#0f1729] mt-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Multi-Model ECG Analyzer © {new Date().getFullYear()} | Advanced ECG Analysis with AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
