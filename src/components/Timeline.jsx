import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Bell, Clock, Search, FileText, UserMinus, MapPin, Mail, ExternalLink, HelpCircle, Landmark } from 'lucide-react';
import { useState } from 'react';

const events = [
  { date: 'JAN 2026', fullDate: '20260101T090000Z/20260131T180000Z', title: 'Special Intensive Revision (SIR)', type: 'deadline', desc: 'Critical period for updating voter rolls. Verify your name in the last SIR Deletion list.' },
  { date: 'MAR 15', fullDate: '20260315T090000Z/20260315T180000Z', title: 'Announcement', type: 'event', desc: 'ECI officially announces the 2026 Bye-Election schedule and Model Code of Conduct.' },
  { date: 'APR 09', fullDate: '20260409T070000Z/20260409T180000Z', title: 'Phase 1 Polling', type: 'highlight', desc: 'Polling in Goa, Karnataka, Nagaland, and Tripura constituencies.' },
  { date: 'APR 23', fullDate: '20260423T070000Z/20260423T180000Z', title: 'Phase 2 Polling', type: 'highlight', desc: 'Polling in Gujarat and Maharashtra (inc. Baramati & Rahuri).' },
  { date: 'MAY 04', fullDate: '20260504T080000Z/20260504T200000Z', title: 'Counting Day', type: 'result', desc: 'Counting of votes and declaration of results.' },
];

const voterServices = [
  {
    id: 'search-deletion',
    title: 'SIR Deletion Search',
    form: 'Search',
    icon: <Search className="w-5 h-5 text-yellow-400" />,
    desc: 'Search your name in the last Special Intensive Revision (SIR) Deletion list to ensure your registration status is active.',
    link: 'https://voters.eci.gov.in/'
  },
  {
    id: 'deletion',
    title: 'Voter Name Deletion',
    form: 'Form 7',
    icon: <UserMinus className="w-5 h-5 text-red-400" />,
    desc: 'Fill Form 7 to get a name deleted from the existing electoral roll (due to relocation, death, or disqualification).',
    link: 'https://voters.eci.gov.in/'
  },
  {
    id: 'migrant-station',
    title: 'Kashmir Migrants',
    form: 'Form M',
    icon: <MapPin className="w-5 h-5 text-cyber-blue" />,
    desc: 'This form is for the Migrant Electors of Kashmir who want to cast vote from any one special polling station of Delhi, Jammu and Udhampur.',
    link: 'https://voters.eci.gov.in/'
  },
  {
    id: 'migrant-postal',
    title: 'Migrant Postal Ballot',
    form: 'Form 12C',
    icon: <Mail className="w-5 h-5 text-cyber-purple" />,
    desc: 'This form is for Migrant Electors of Kashmir who want to cast vote through postal ballot.',
    link: 'https://voters.eci.gov.in/'
  }
];

const Timeline = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('timeline');

  const addToCalendar = (event) => {
    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.desc)}&dates=${event.fullDate}`;
    window.open(googleUrl, '_blank');
  };

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-cyber-blue font-bold text-xs uppercase tracking-widest mb-3">
             <Landmark className="w-4 h-4" /> Official Voter Gateway
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 font-orbitron tracking-tight">Election <span className="text-cyber-blue">Intelligence</span></h2>
          <p className="text-gray-400 leading-relaxed">
            Stay ahead with official 2026 SIR data, form requirements, and real-time election milestones.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'timeline' ? 'bg-cyber-blue text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab('forms')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'forms' ? 'bg-cyber-blue text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Forms & Services
            </button>
          </div>

          <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 border-white/10 flex-1 sm:flex-none">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full sm:w-40 placeholder:text-gray-600"
            />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'timeline' ? (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-16"
          >
            <div className="grid md:grid-cols-5 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`glass p-6 rounded-[2rem] border-b-4 transition-all hover:-translate-y-2 group ${
                    event.type === 'highlight' ? 'border-cyber-blue shadow-[0_10px_30px_rgba(0,210,255,0.1)]' :
                    event.type === 'deadline' ? 'border-red-500 shadow-[0_10px_30px_rgba(239,68,68,0.1)]' :
                    event.type === 'result' ? 'border-green-500 shadow-[0_10px_30px_rgba(34,197,94,0.1)]' : 'border-cyber-purple'
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                      <span className="text-[10px] font-black font-orbitron text-white tracking-widest uppercase">
                        {event.date}
                      </span>
                    </div>
                    <Clock className="w-4 h-4 text-gray-700 group-hover:text-cyber-blue transition-colors" />
                  </div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-white transition-colors">{event.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-8 h-12 overflow-hidden">
                    {event.desc}
                  </p>
                  <button
                    onClick={() => addToCalendar(event)}
                    className="w-full py-3 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3 h-3" /> Sync Event
                  </button>
                </motion.div>
              ))}
            </div>

            {/* SEC Portals Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px bg-white/10 flex-1"></div>
                <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-[0.3em]">Official <span className="text-cyber-blue">Portals</span></h3>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { name: "Andaman & Nicobar", url: "https://sec.andaman.gov.in/" },
                  { name: "Andhra Pradesh", url: "https://sec.ap.gov.in/" },
                  { name: "Arunachal", url: "https://sec.arunachal.gov.in/" },
                  { name: "Assam", url: "https://sec.assam.gov.in/" },
                  { name: "Bihar", url: "https://sec.bihar.gov.in/" },
                  { name: "Chandigarh", url: "http://secchandigarh.gov.in/" },
                  { name: "Chhattisgarh", url: "https://sec.cg.gov.in/" },
                  { name: "DNH & DD", url: "https://sec-dnhdd.gov.in/" },
                  { name: "Delhi", url: "https://sec.delhi.gov.in/" },
                  { name: "Goa", url: "https://sec.goa.gov.in/" },
                  { name: "Gujarat", url: "https://sec.gujarat.gov.in/" },
                  { name: "Haryana", url: "https://sec.haryana.gov.in/" },
                  { name: "Himachal", url: "https://sechimachal.nic.in/" },
                  { name: "J&K", url: "https://ceojk.nic.in/" },
                  { name: "Jharkhand", url: "https://sec.jharkhand.gov.in/" },
                  { name: "Karnataka", url: "https://sec.karnataka.gov.in/" },
                  { name: "Kerala", url: "https://sec.kerala.gov.in/" },
                  { name: "Lakshadweep", url: "https://sec.utl.gov.in/" },
                  { name: "MP", url: "https://mplocalpost.gov.in/" },
                  { name: "Maharashtra", url: "https://sec.maharashtra.gov.in/" },
                  { name: "Manipur", url: "https://secmanipur.nic.in/" },
                  { name: "Meghalaya", url: "https://secmeghalaya.nic.in/" },
                  { name: "Mizoram", url: "https://sec.mizoram.gov.in/" },
                  { name: "Nagaland", url: "https://sec.nagaland.gov.in/" },
                  { name: "Odisha", url: "https://sec.odisha.gov.in/" },
                  { name: "Puducherry", url: "https://sec.py.gov.in/" },
                  { name: "Punjab", url: "https://sec.punjab.gov.in/" },
                  { name: "Rajasthan", url: "https://sec.rajasthan.gov.in/" },
                  { name: "Sikkim", url: "https://sec.sikkim.gov.in/" },
                  { name: "Tamil Nadu", url: "https://tnsec.tn.nic.in/" },
                  { name: "Telangana", url: "https://tsec.gov.in/" },
                  { name: "Tripura", url: "https://sec.tripura.gov.in/" },
                  { name: "UP", url: "https://sec.up.nic.in/" },
                  { name: "Uttarakhand", url: "https://sec.uk.gov.in/" },
                  { name: "West Bengal", url: "https://wbsec.gov.in/" },
                  { name: "ECI (National)", url: "https://eci.gov.in/" }
                ].map((state) => (
                  <a
                    key={state.name}
                    href={state.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400 hover:text-cyber-blue hover:border-cyber-blue/30 hover:bg-white/10 transition-all text-center truncate group"
                  >
                    <span className="group-hover:scale-105 inline-block transition-transform">{state.name}</span>
                  </a>
                ))}
              </div>
              <p className="text-[10px] text-gray-500 text-center italic mt-4 uppercase tracking-widest">
                Connecting 28 States & 8 UTs to their respective State Election Commission (SEC) portals.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="forms"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {voterServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-cyber-blue/30 transition-all"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                   <FileText className="w-16 h-16" />
                </div>
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-0.5 bg-cyber-blue/20 text-cyber-blue text-[10px] font-black rounded-full uppercase tracking-widest">{service.form}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  {service.desc}
                </p>
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-cyber-blue hover:text-black rounded-2xl border border-white/10 transition-all group/btn"
                >
                  <span className="text-xs font-black uppercase tracking-widest">Access Official Portal</span>
                  <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="mt-16 p-8 rounded-[2.5rem] bg-gradient-to-br from-cyber-blue/10 to-transparent border border-cyber-blue/20 flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-16 h-16 bg-cyber-blue text-black rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,210,255,0.4)]">
           <HelpCircle className="w-8 h-8" />
        </div>
        <div className="flex-1 text-center md:text-left">
           <h4 className="text-lg font-bold mb-2">About the Election Commission of India</h4>
           <p className="text-sm text-gray-400 leading-relaxed">
             The ECI is an autonomous constitutional authority responsible for administering Union and State election processes. It manages elections to the Lok Sabha, Rajya Sabha, State Assemblies, and the offices of President and Vice President.
           </p>
        </div>
        <a
          href="https://results.eci.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
        >
          View Election Results
        </a>
      </motion.div>

      {/* Mini Stats Dashboard */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Voters (2024)', value: '968.8M', color: 'text-cyber-blue' },
          { label: 'Polling Stations', value: '1.05M', color: 'text-cyber-purple' },
          { label: 'Seats (Lok Sabha)', value: '543', color: 'text-red-500' },
          { label: '2024 Total Votes', value: '614.1M', color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-[2rem] border-white/5 text-center group hover:border-white/20 transition-all">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-bold">{stat.label}</div>
            <div className={`text-2xl font-black font-orbitron group-hover:scale-110 transition-transform ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
