import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, FileText, Landmark, Fingerprint, Box, BarChart3, CheckCircle2 } from 'lucide-react';

const steps = [
  { id: 1, title: 'Registration', icon: UserCheck, desc: 'Ensure you are on the electoral roll.', points: 50 },
  { id: 2, title: 'Verification', icon: FileText, desc: 'Check your details and polling station.', points: 50 },
  { id: 3, title: 'Polling Day', icon: Landmark, desc: 'Reach your designated polling booth.', points: 50 },
  { id: 4, title: 'Identification', icon: Fingerprint, desc: 'Official verification and inking.', points: 100 },
  { id: 5, title: 'Vote Casting', icon: Box, desc: 'The moment of democratic power.', points: 200 },
  { id: 6, title: 'Counting', icon: BarChart3, desc: 'Transparency in the results.', points: 50 },
];

const JourneyMap = ({ onCompleteStep }) => {
  const [completed, setCompleted] = useState([]);

  const toggleStep = (id, points) => {
    if (!completed.includes(id)) {
      setCompleted([...completed, id]);
      onCompleteStep(points);
    }
  };

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Interactive <span className="text-cyber-purple">Voter Map</span></h2>
        <p className="text-gray-400">Master the 6-step roadmap of the democratic process.</p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden lg:block"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative">
          {steps.map((step, index) => {
            const isCompleted = completed.includes(step.id);
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div
                  onClick={() => toggleStep(step.id, step.points)}
                  className={`cursor-pointer glass rounded-2xl p-6 text-center transition-all duration-500 border-2 ${
                    isCompleted ? 'border-cyber-blue bg-cyber-blue/5 shadow-[0_0_20px_rgba(0,210,255,0.2)]' : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
                    isCompleted ? 'bg-cyber-blue text-black' : 'bg-white/5 text-gray-500 group-hover:text-gray-300'
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className={`font-bold mb-2 ${isCompleted ? 'text-cyber-blue' : 'text-gray-300'}`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>

                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                    >
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="h-8 w-px bg-white/5 mx-auto lg:hidden"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyMap;
