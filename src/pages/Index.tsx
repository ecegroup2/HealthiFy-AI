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

      <header className="bg-[#0f1729] shadow-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto py-3 sm:py-4 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
            {/* Back Button */}
            <button
              onClick={() => window.location.href = 'https://ecegroup2.github.io/'}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-300 hover:to-blue-400 text-white font-medium sm:font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
              aria-label="Go back to homepage"
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden xs:inline sm:inline">Back</span>
            </button>
            
            {/* Logo and Title */}
            <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial justify-center sm:justify-start">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-rose-500 rounded-full opacity-20 animate-ping"></div>
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-rose-500 z-10" />
              </div>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white truncate">
                HealthiFy AI
              </h1>
            </div>
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
