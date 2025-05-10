
import React from 'react';

const ExampleOutput: React.FC = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See ninjaChef in Action</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Here's what ninjaChef can create with just a few basic ingredients
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 animate-fade-in">
            <div className="mb-4 text-ninja-accent font-medium text-lg">breakfast:</div>
            <h3 className="font-bold text-xl mb-2">Miso Scrambled Eggs</h3>
            
            <div className="mt-6">
              <div className="text-ninja-accent font-medium mb-2">steps to cook:</div>
              <div className="code-block">
                <ol className="list-decimal pl-4 space-y-1 text-white/80">
                  <li>Crack the eggs into a bowl and whisk with miso paste.</li>
                  <li>Heat oil in a pan and scramble the mixture gently.</li>
                  <li>Cook until just set but still creamy.</li>
                  <li>Serve with a sprinkle of green onions if available.</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 animate-fade-in delay-100">
            <div className="mb-4 text-ninja-accent font-medium text-lg">lunch:</div>
            <h3 className="font-bold text-xl mb-2">Garlic Soy Rice Bowl</h3>
            
            <div className="mt-6">
              <div className="text-ninja-accent font-medium mb-2">steps to cook:</div>
              <div className="code-block">
                <ol className="list-decimal pl-4 space-y-1 text-white/80">
                  <li>Cook rice according to package instructions.</li>
                  <li>In a small pan, heat oil and sauté minced garlic until fragrant.</li>
                  <li>Add soy sauce and a splash of water, simmer briefly.</li>
                  <li>Mix the sauce with hot rice and top with a fried egg.</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 animate-fade-in delay-200">
            <div className="mb-4 text-ninja-accent font-medium text-lg">dinner:</div>
            <h3 className="font-bold text-xl mb-2">Soy-Glazed Egg Stir Fry</h3>
            
            <div className="mt-6">
              <div className="text-ninja-accent font-medium mb-2">steps to cook:</div>
              <div className="code-block">
                <ol className="list-decimal pl-4 space-y-1 text-white/80">
                  <li>Scramble eggs in a hot wok until just set, then remove.</li>
                  <li>In the same wok, fry minced garlic until golden.</li>
                  <li>Add any vegetables you have, stir fry until tender-crisp.</li>
                  <li>Return eggs to wok, add soy sauce and rice vinegar if available.</li>
                  <li>Serve over rice with a drizzle of any hot sauce.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExampleOutput;
