import { motion } from "framer-motion";

const InstitutionalLegacy = () => {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container-wide px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-widest">
                Our Institutional Legacy
              </span>
            </div>
            
            <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 leading-tight">
              A 28-Year Foundation of <span className="text-accent">Educational Excellence</span>
            </h2>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Leadership and Management Development Associates (LMDA) represents a 28-year legacy of excellence in Pakistan’s training ecosystem. Founded by Prof. Dr. Ali Sajid (T.I.), a presidential award winner and PhD from the USA, LMDA has pioneered high-velocity sales training and executive leadership workshops for over 10,000 professionals.
              </p>
              
              <p>
                As an official training partner of the Pakistan Engineering Council (PEC), we specialize in bridging the gap between technical expertise and commercial mastery. Our modules, ranging from NLP communication to AI-powered sales excellence, are beneficial for companies and individuals alike, ensuring every topic we touch supports your sustainable growth and strategic authority.
              </p>
              
              <p>
                At LMDA, we don't just teach; we transform. Our mission is to build the next generation of sales leaders through PEC-partnered certifications and real-world consultancy, ensuring every organization we touch achieves sustainable growth and strategic authority.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-[4/5] bg-slate-50 border border-slate-200 p-8 flex flex-col justify-center relative overflow-hidden group">
              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="text-5xl font-serif font-bold text-primary mb-2">10,000+</div>
                  <div className="text-sm font-bold text-accent uppercase tracking-wider">Professionals Certified</div>
                </div>
                
                <div className="mb-8">
                  <div className="text-5xl font-serif font-bold text-primary mb-2">28+</div>
                  <div className="text-sm font-bold text-accent uppercase tracking-wider">Years of Market Impact</div>
                </div>
                
                <div className="space-y-4 pt-8 border-t border-slate-200">
                  <h4 className="text-lg font-bold text-primary">Key Credentials:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-accent" />
                      <span>Official PEC Training Partner</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-accent" />
                      <span>Tamgha-e-Imtiaz Recipient</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-accent" />
                      <span>USA-PhD Led Curriculum</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default InstitutionalLegacy;
