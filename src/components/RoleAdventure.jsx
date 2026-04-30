import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Megaphone, ChevronRight, RotateCcw, Award, HelpCircle } from 'lucide-react';

const scenarios = {
  voter: {
    title: 'The First-Time Voter',
    icon: User,
    color: 'cyber-blue',
    steps: [
      {
        id: 'v1',
        text: 'You arrive at the polling booth and realize you forgot your Voter ID card. What do you do?',
        options: [
          { text: 'Go back home and lose your chance to vote.', next: 'v_fail', points: 0 },
          { text: 'Check if other government IDs like Aadhaar are accepted.', next: 'v2', points: 50 },
        ]
      },
      {
        id: 'v2',
        text: 'The officer confirms Aadhaar is valid. You enter the booth and see a candidate’s supporter distributing flyers near the queue. Your reaction?',
        options: [
          { text: 'Ignore it and keep waiting.', next: 'v3', points: 20 },
          { text: 'Inform the Presiding Officer about the violation of Model Code of Conduct.', next: 'v3', points: 100 },
        ]
      },
      {
        id: 'v3',
        text: 'You are 85 years old and find it difficult to walk to the booth. Which facility can you use?',
        options: [
          { text: 'Request a neighbor to vote on your behalf (Proxy).', next: 'v_fail', points: 0 },
          { text: 'Register for "Vote from Home" using Form 12-D 10 days in advance.', next: 'v_success', points: 100 },
        ]
      }
    ]
  },
  officer: {
    title: 'The Polling Officer',
    icon: Shield,
    color: 'cyber-purple',
    steps: [
      {
        id: 'o1',
        text: 'It’s 6:00 AM. A candidate’s agent asks to see the EVM before polling starts. What is the protocol?',
        options: [
          { text: 'Show them the machine and start polling.', next: 'o_fail', points: 0 },
          { text: 'Conduct a Mock Poll of at least 50 votes to demonstrate transparency.', next: 'o2', points: 100 },
        ]
      },
      {
        id: 'o2',
        text: 'During polling, a voter’s signature doesn’t perfectly match the records. What’s the protocol?',
        options: [
          { text: 'Ask for additional ID and verify identity strictly.', next: 'o3', points: 50 },
          { text: 'Let them vote anyway to save time.', next: 'o_fail', points: 0 },
        ]
      },
      {
        id: 'o3',
        text: 'The day ends with 80% turnout. You must seal the EVM. Who should witness this?',
        options: [
          { text: 'Just your staff.', next: 'o_fail', points: 0 },
          { text: 'All polling agents present from different parties.', next: 'o_success', points: 100 },
        ]
      }
    ]
  },
  candidate: {
    title: 'The Future Candidate',
    icon: Megaphone,
    color: 'white',
    steps: [
      {
        id: 'c1',
        text: 'You want to organize a massive rally. When must you stop all loud-speaker campaigning?',
        options: [
          { text: 'Right when the first person votes.', next: 'c2', points: 20 },
          { text: '48 hours before the conclusion of the poll (Campaign Silence).', next: 'c2', points: 100 },
        ]
      },
      {
        id: 'c2',
        text: 'You notice a competitor is promising free laptops to everyone who votes for them. Is this allowed?',
        options: [
          { text: 'Yes, it’s a standard election promise.', next: 'c3', points: 0 },
          { text: 'No, it’s a Corrupt Practice under the Representation of People Act.', next: 'c3', points: 100 },
        ]
      },
      {
        id: 'c3',
        text: 'Results are being announced. You lose by 5 votes. What is your right?',
        options: [
          { text: 'Accept immediately.', next: 'c_success', points: 20 },
          { text: 'Request a recount of VVPAT slips for specific booths.', next: 'c_success', points: 100 },
        ]
      }
    ]
  },
  scholar: {
    title: 'Ballot Master Quiz',
    icon: HelpCircle,
    color: 'cyber-blue',
    steps: [
      { id: 'q1', text: 'Which article of the Indian Constitution provides for the Election Commission?', options: [{ text: 'Article 324', next: 'q2', points: 20 }, { text: 'Article 370', next: 'q2', points: 0 }] },
      { id: 'q2', text: 'What is the minimum age to vote in India?', options: [{ text: '18 Years', next: 'q3', points: 20 }, { text: '21 Years', next: 'q3', points: 0 }] },
      { id: 'q3', text: 'Who was the first Chief Election Commissioner of India?', options: [{ text: 'Sukumar Sen', next: 'q4', points: 20 }, { text: 'T. N. Seshan', next: 'q4', points: 0 }] },
      { id: 'q4', text: 'When is National Voters Day celebrated?', options: [{ text: 'January 25', next: 'q5', points: 20 }, { text: 'August 15', next: 'q5', points: 0 }] },
      { id: 'q5', text: 'Which ink is used to mark the voter’s finger?', options: [{ text: 'Silver Nitrate Ink', next: 'q6', points: 20 }, { text: 'Permanent Marker', next: 'q6', points: 0 }] },
      { id: 'q6', text: 'What does VVPAT stand for?', options: [{ text: 'Voter Verifiable Paper Audit Trail', next: 'q7', points: 20 }, { text: 'Voter Verified Paper Account Track', next: 'q7', points: 0 }] },
      { id: 'q7', text: 'Which form is used for New Voter Registration?', options: [{ text: 'Form 6', next: 'q8', points: 20 }, { text: 'Form 8', next: 'q8', points: 0 }] },
      { id: 'q8', text: 'Which state first used EVMs in a assembly election?', options: [{ text: 'Kerala (1982)', next: 'q9', points: 20 }, { text: 'Gujarat (1990)', next: 'q9', points: 0 }] },
      { id: 'q9', text: 'What is the color of the ballot paper for Lok Sabha elections?', options: [{ text: 'White', next: 'q10', points: 20 }, { text: 'Pink', next: 'q10', points: 0 }] },
      { id: 'q10', text: 'The NOTA (None of the Above) option was introduced in?', options: [{ text: '2013', next: 'q11', points: 20 }, { text: '2009', next: 'q11', points: 0 }] },
      { id: 'q11', text: 'How many Lok Sabha constituencies are there in India?', options: [{ text: '543', next: 'q12', points: 20 }, { text: '552', next: 'q12', points: 0 }] },
      { id: 'q12', text: 'Who appoints the Chief Election Commissioner?', options: [{ text: 'The President of India', next: 'q13', points: 20 }, { text: 'The Prime Minister', next: 'q13', points: 0 }] },
      { id: 'q13', text: 'Model Code of Conduct comes into force from?', options: [{ text: 'Date of announcement of schedule', next: 'q14', points: 20 }, { text: 'Date of notification', next: 'q14', points: 0 }] },
      { id: 'q14', text: 'Which form is used for correction in Voter ID details?', options: [{ text: 'Form 8', next: 'q15', points: 20 }, { text: 'Form 7', next: 'q15', points: 0 }] },
      { id: 'q15', text: 'Maximum number of candidates an EVM can support (Standard unit)?', options: [{ text: '64', next: 'q16', points: 20 }, { text: '16', next: 'q16', points: 0 }] },
      { id: 'q16', text: 'What is the term of the Chief Election Commissioner?', options: [{ text: '6 years or 65 years of age', next: 'q17', points: 20 }, { text: '5 years or 62 years of age', next: 'q17', points: 0 }] },
      { id: 'q17', text: 'Which form is used for Overseas (NRI) Voters?', options: [{ text: 'Form 6A', next: 'q18', points: 20 }, { text: 'Form 6B', next: 'q18', points: 0 }] },
      { id: 'q18', text: 'Voting by Post is technically called?', options: [{ text: 'Postal Ballot', next: 'q19', points: 20 }, { text: 'Direct Vote', next: 'q19', points: 0 }] },
      { id: 'q19', text: 'Who was the first woman Chief Election Commissioner?', options: [{ text: 'V. S. Ramadevi', next: 'q20', points: 20 }, { text: 'Meira Kumar', next: 'q20', points: 0 }] },
      { id: 'q20', text: 'Election symbols are allotted to parties by?', options: [{ text: 'Election Commission', next: 'scholar_success', points: 20 }, { text: 'Parliament', next: 'scholar_success', points: 0 }] },
    ]
  }
};

const RoleAdventure = ({ onExperienceGained }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [currentStepId, setCurrentStepId] = useState(null);
  const [adventureStatus, setAdventureStatus] = useState('selection'); // selection, active, result
  const [totalPoints, setTotalPoints] = useState(0);

  const startAdventure = (roleKey) => {
    setSelectedRole(roleKey);
    setCurrentStepId(scenarios[roleKey].steps[0].id);
    setAdventureStatus('active');
    setTotalPoints(0);
  };

  const handleOption = (option) => {
    const newPoints = totalPoints + option.points;
    setTotalPoints(newPoints);

    if (option.next.includes('success')) {
      setAdventureStatus('success');
      onExperienceGained(newPoints + 100);
    } else if (option.next.includes('fail')) {
      setAdventureStatus('fail');
    } else {
      setCurrentStepId(option.next);
    }
  };

  const reset = () => {
    setAdventureStatus('selection');
    setSelectedRole(null);
    setCurrentStepId(null);
  };

  const currentStep = selectedRole ? scenarios[selectedRole].steps.find(s => s.id === currentStepId) : null;

  return (
    <div className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Choose Your <span className="text-cyber-purple">Adventure</span></h2>
        <p className="text-gray-400">Step into the shoes of key players and navigate real-world election dilemmas.</p>
      </div>

      <div className="max-w-4xl mx-auto min-h-[400px]">
        <AnimatePresence mode="wait">
          {adventureStatus === 'selection' && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {Object.entries(scenarios).map(([key, role]) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => startAdventure(key)}
                  className="glass p-8 rounded-3xl border-white/10 cursor-pointer text-center group"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-${role.color}/10 group-hover:bg-${role.color}/20 transition-colors`}>
                    <role.icon className={`w-10 h-10 text-${role.color === 'white' ? 'white' : 'cyber-blue'}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                  <button className="text-xs uppercase tracking-widest text-cyber-blue font-bold flex items-center gap-2 mx-auto">
                    Select Role <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {adventureStatus === 'active' && currentStep && (
            <motion.div
              key="active"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass p-6 md:p-12 rounded-[2rem] md:rounded-[40px] border-cyber-blue/20"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="px-3 py-1 bg-cyber-blue/10 text-cyber-blue rounded-full text-[10px] font-bold uppercase tracking-tighter">
                  Decision Point
                </span>
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cyber-blue"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(scenarios[selectedRole].steps.indexOf(currentStep) + 1) / scenarios[selectedRole].steps.length * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-medium mb-6 md:text-10 leading-relaxed">
                {currentStep.text}
              </h3>

              <div className="grid gap-4">
                {currentStep.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 10, backgroundColor: 'rgba(0,210,255,0.1)' }}
                    onClick={() => handleOption(opt)}
                    className="p-6 rounded-2xl border border-white/10 text-left flex items-center justify-between group"
                  >
                    <span>{opt.text}</span>
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {(adventureStatus === 'success' || adventureStatus === 'fail') && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-6 md:p-12 rounded-[2rem] md:rounded-[40px] text-center border-cyber-purple/20"
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${adventureStatus === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {adventureStatus === 'success' ? <Award className="w-12 h-12 text-green-500" /> : <RotateCcw className="w-12 h-12 text-red-500" />}
              </div>
              <h3 className="text-4xl font-bold mb-4">
                {adventureStatus === 'success' ? 'Path Mastered!' : 'Critical Error'}
              </h3>

              {selectedRole === 'scholar' && adventureStatus === 'success' && (
                <div className="mb-6">
                  <div className="text-6xl font-black text-cyber-blue mb-2">
                    {Math.round((totalPoints / 400) * 100)}%
                  </div>
                  <div className="text-sm uppercase tracking-widest text-gray-500 font-bold">
                    Accuracy Score: {totalPoints/20} / 20 Correct
                  </div>
                </div>
              )}

              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                {adventureStatus === 'success'
                  ? `You successfully navigated the complexities of democracy and earned ${totalPoints} XP for your civic wisdom.`
                  : "Every mistake is a learning opportunity. The election process requires strict adherence to rules and transparency."}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={reset}
                  className="px-8 py-4 bg-white text-black font-bold rounded-xl"
                >
                  Try Another Role
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoleAdventure;
