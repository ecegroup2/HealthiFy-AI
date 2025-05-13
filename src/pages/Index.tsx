
import { Separator } from "@/components/ui/separator";
import ECGAnalyzer from "@/components/ECGAnalyzer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-blue-600">Multi-Model</span> ECG Analyzer
          </h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Comprehensive ECG Analysis</h2>
          <p className="text-gray-600">
            Upload your ECG image to detect abnormalities using four advanced AI models.
            Our system provides a comprehensive analysis by combining specialized detection systems.
          </p>
          <Separator className="my-6" />
        </section>
        
        <ECGAnalyzer />
        
        <section className="mt-16">
          <Separator className="mb-6" />
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">1. Upload ECG</h3>
              <p className="text-gray-600 text-sm">
                Upload your ECG image in standard formats (JPG, PNG)
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">2. Multi-Model Analysis</h3>
              <p className="text-gray-600 text-sm">
                Our system analyzes your ECG using four specialized AI models working in parallel
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-2">3. Comprehensive Results</h3>
              <p className="text-gray-600 text-sm">
                Receive detailed analysis with combined insights from all models for maximum accuracy
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Multi-Model ECG Analyzer © {new Date().getFullYear()} | Advanced ECG Analysis Tool
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
