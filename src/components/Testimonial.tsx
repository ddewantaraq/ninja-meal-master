
import React from 'react';

const Testimonial: React.FC = () => {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-ninja-accent/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-ninja-primary/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="text-center mb-6 relative z-10">
            <svg className="w-12 h-12 text-ninja-accent/30 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl md:text-2xl font-medium italic text-white/90">
              "I made a 3-course day out of just eggs, rice, garlic, and soy sauce! ninjaChef transformed my nearly empty fridge into a gourmet experience."
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-ninja-primary/30 flex items-center justify-center text-white font-medium">JP</div>
            <div>
              <div className="font-medium">Jamie Peterson</div>
              <div className="text-sm text-white/60">Busy parent & home cook</div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Ready to transform your cooking?</h3>
          <button className="btn-primary text-lg">
            Try ninjaChef for Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
