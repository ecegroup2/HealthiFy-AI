import { Heart, Upload, Activity, BarChart3, Info, ArrowUp } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117] text-white p-4 font-sans">
      <div className="text-center">
        {/* Logo */}
        <div className="flex justify-center items-center mb-6">
          <div className="w-20 h-20 rounded-full border border-pink-500/30 flex items-center justify-center bg-[#161b22]/50">
            <Heart className="w-8 h-8 text-pink-400" />
          </div>
        </div>

        {/* Title and Subtitle */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">HealthiFy AI</h1>
        <div className="flex justify-center mb-5">
          <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
        </div>
        <p className="text-slate-400 max-w-lg text-sm sm:text-base">
          Advanced ECG analysis using artificial intelligence to help identify potential heart conditions
        </p>
      </div>

      {/* ECG Analyzer Card */}
      <div className="relative mt-12 w-full max-w-3xl">
        {/* Decorative Corner Bracket */}
        <div className="absolute -top-5 -left-5 w-12 h-12 border-l-2 border-t-2 border-pink-400/30 opacity-75"></div>

        <div className="bg-[#161b22] rounded-lg shadow-2xl shadow-black/50 overflow-hidden border border-slate-800">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-pink-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">ECG Analysis</h2>
            </div>
            <p className="text-slate-400 text-sm">Upload an ECG image to analyze heart health indicators</p>
          </div>

          {/* Step Tabs */}
          <div className="flex bg-[#0d1117]/50 border-y border-slate-800">
            {/* Step 1: Upload (Active) */}
            <div className="flex-1 p-3 sm:p-4 text-center border-b-2 border-pink-500">
              <p className="text-[10px] font-bold tracking-wider text-pink-500">STEP 1</p>
              <div className="flex items-center justify-center gap-2 mt-1 text-white">
                <Upload className="w-4 h-4 text-pink-500" />
                <span className="text-sm font-medium">Upload</span>
              </div>
            </div>

            {/* Step 2: Analyze */}
            <div className="flex-1 p-3 sm:p-4 text-center border-b-2 border-transparent text-slate-500">
              <p className="text-[10px] font-bold tracking-wider">STEP 2</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Activity className="w-4 h-4" />
                <span className="text-sm font-medium">Analyze</span>
              </div>
            </div>

            {/* Step 3: Results */}
            <div className="flex-1 p-3 sm:p-4 text-center border-b-2 border-transparent text-slate-500">
              <p className="text-[10px] font-bold tracking-wider">STEP 3</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Results</span>
              </div>
            </div>
          </div>
          
          {/* Upload Area */}
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-400/80" />
                    <h3 className="font-semibold text-slate-200">Upload ECG Image</h3>
                </div>
                <button className="w-6 h-6 bg-blue-500/80 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                    <Info className="w-4 h-4" />
                </button>
            </div>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 sm:p-10 flex flex-col items-center justify-center text-center bg-[#0d1117]/50 hover:border-pink-500/50 hover:bg-slate-900/40 transition-all cursor-pointer">
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg hover:bg-slate-200 transition-colors">
                <ArrowUp className="w-8 h-8 text-blue-600" />
              </button>
              <p className="text-slate-300">
                <span className="font-semibold text-white">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-500 mt-1">PNG, JPG, or SVG (max. 10MB)</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Index;
