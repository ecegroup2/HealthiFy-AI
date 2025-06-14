import { Separator } from "@/components/ui/separator";
import ECGAnalyzer from "@/components/ECGAnalyzer";
import { Activity, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#070b16] text-white">
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
  <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
  <div className="absolute -bottom-16 right-0 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

  <div className="relative max-w-7xl mx-auto py-4 sm:py-5 px-4 sm:px-6 md:px-8 flex items-center justify-between gap-3">
    {/* Back Button */}
    <button
      onClick={() => window.location.href = 'https://ecegroup2.github.io/'}
      className="group relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-600 hover:from-cyan-300 hover:via-teal-400 hover:to-blue-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-cyan-500/30 text-base md:text-lg backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
      aria-label="Go back to homepage"
    >
      {/* Animated background glow */}
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-500 to-blue-600 opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-500"></span>
      {/* Arrow icon */}
      <svg 
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1 relative z-10" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        strokeWidth="2.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      {/* Text */}
      <span className="relative z-10 tracking-wide group-hover:tracking-wider transition-all duration-300">
        Back
      </span>
      {/* Shine effect */}
      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></span>
      </span>
    </button>

    {/* Logo and Title */}
    <div className="flex items-center gap-3 flex-1 justify-center sm:justify-start relative">
      {/* Animated ping ring */}
      <span className="absolute -left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-rose-400/10 rounded-full blur-2xl animate-pulse pointer-events-none"></span>
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Animated ping ring */}
        <div className="absolute inset-0 border-2 border-rose-500 rounded-full opacity-20 animate-ping"></div>
        {/* Pulse ring */}
        <div className="absolute inset-0 border border-rose-400 rounded-full opacity-30 animate-pulse"></div>
        {/* Heart icon with bounce animation */}
        <Heart className="h-6 w-6 text-rose-500 z-10 animate-bounce drop-shadow-lg" />
      </div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-md">
        HealthiFy <span className="text-rose-400 animate-pulse">AI</span>
      </h1>
    </div>
  </div>
</header>



      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-100 mb-2">Comprehensive ECG Analysis</h2>
          <p className="text-gray-400">
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
