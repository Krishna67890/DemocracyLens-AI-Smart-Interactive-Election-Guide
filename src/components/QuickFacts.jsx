import { motion } from 'framer-motion';
import { Droplet, Home, Shield, History, MapPin, ExternalLink, Share2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const facts = [
  {
    icon: <Droplet className="text-cyber-blue" />,
    title: "The Indelible Ink",
    desc: "Made by CSIR, it contains Silver Nitrate. It stays for up to a month and was first used in 1962 to prevent multiple voting."
  },
  {
    icon: <Home className="text-cyber-purple" />,
    title: "Vote from Home",
    desc: "First introduced for Lok Sabha in 2024 for citizens 85+ and PwD. A team of 5 officers visits the residence for the process."
  },
  {
    icon: <Shield className="text-green-500" />,
    title: "NOTA Power",
    desc: "Introduced in 2013, 'None of the Above' allows citizens to express lack of support for all candidates while maintaining secrecy."
  },
  {
    icon: <History className="text-red-500" />,
    title: "President vs PM",
    desc: "The President is the ceremonial Head of State and Supreme Commander, while the Prime Minister is the Head of Government and leader of the Lok Sabha."
  }
];

const QuickFacts = () => {
  const [shared, setShared] = useState(null);

  const handleShare = (title, desc) => {
    const text = `🗳️ Did you know? ${title}: ${desc} \n\nCheck out DemocracyLens AI for more futuristic civic education!`;
    if (navigator.share) {
      navigator.share({
        title: 'DemocracyLens AI - Civic Fact',
        text: text,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      setShared(title);
      setTimeout(() => setShared(null), 2000);
    }
  };

  return (
    <div className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 font-orbitron">Cyber <span className="text-cyber-blue">Civic Facts</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Essential knowledge every digital citizen should know about our democratic machinery.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {facts.map((fact, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="glass p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center group relative"
          >
            <button
              onClick={() => handleShare(fact.title, fact.desc)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-cyber-blue/20 text-gray-400 hover:text-cyber-blue transition-all"
              title="Share Fact"
            >
              {shared === fact.title ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-cyber-blue/20 transition-colors">
              {fact.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{fact.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{fact.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 glass p-8 rounded-3xl border border-white/10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-cyber-blue" /> State Election Machinery
            </h3>
            <p className="text-gray-400 mb-6">
              Each state has its own autonomous Election Commission (SEC) responsible for local body elections (Panchayats & Municipalities).
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                'Andaman & Nicobar', 'Andhra Pradesh', 'Arunachal', 'Assam',
                'Bihar', 'Chandigarh', 'Chhattisgarh', 'DNH & DD',
                'Delhi', 'Goa', 'Gujarat', 'Haryana',
                'Himachal', 'J&K', 'Jharkhand', 'Karnataka',
                'Kerala', 'Lakshadweep', 'MP', 'Maharashtra',
                'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
                'Odisha', 'Puducherry', 'Punjab', 'Rajasthan',
                'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
                'UP', 'Uttarakhand', 'West Bengal'
              ].map(state => (
                <div key={state} className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] text-center text-gray-300 hover:border-cyber-blue/50 cursor-default truncate">
                  {state} SEC
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-64 aspect-square bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
            <div className="text-center p-6 relative z-10">
              <ExternalLink className="w-10 h-10 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold uppercase tracking-widest text-cyber-blue">Official Portals</p>
              <p className="text-[10px] text-gray-500 mt-2">Connecting 28 States & 8 UTs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickFacts;
