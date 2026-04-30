export const INDIA_ELECTION_CONTEXT = {
    system: {
        type: "Parliamentary Democracy",
        description: "India is the world's largest democracy. It follows a parliamentary system where power is distributed between the Union government and the States.",
        heads: {
            president: {
                title: "Ceremonial Head of State",
                role: "Supreme Commander-in-Chief of all defense forces. Monitors rule of law through Governors. Can take over executive powers (President's Rule) if state machinery fails.",
                fact: "The President dissolves the existing State government if necessary and a new election is conducted."
            },
            primeMinister: {
                title: "Head of Government",
                role: "Leader of the party/alliance with a majority in the Lok Sabha. Head of the Union Council of Ministers and leader of the legislative branch."
            },
            chiefMinister: {
                title: "State Executive Head",
                role: "Leader of the party/alliance with a majority in the State Assembly (Vidhan Sabha). Exercises executive powers within the State."
            }
        },
        structure: {
            lokSabha: {
                name: "Lower House (House of the People)",
                seats: 543,
                term: "5 years",
                election: "Directly elected by all adult citizens (18+) via universal suffrage."
            },
            rajyaSabha: {
                name: "Upper House (Council of States)",
                role: "Second-level review body for legislation. Money bills must originate in Lok Sabha.",
                members: "Elected by State Legislative Assemblies; 12 nominated by President.",
                tenure: "6 years (1/3 members retire every 2 years).",
                chairman: "The Vice President of India is the ex-officio Chairman."
            }
        }
    },
    bodies: {
        eci: {
            name: "Election Commission of India (ECI)",
            description: "Autonomous constitutional authority (Article 324) responsible for Union and State elections (Parliament, State Legislatures, President, Vice President).",
            firstCommissioner: "Sukumar Sen",
            machinery: {
                ceo: "Chief Electoral Officer (State level) - Senior IAS officer nominated by ECI.",
                deo: "District Election Officer (District level) - Usually the District Collector.",
                ro: "Returning Officer - Responsible for conducting elections in a specific constituency (Lok Sabha or Assembly).",
                ero: "Electoral Registration Officer - Manages voter lists.",
                blo: "Booth Level Officer - Field level officer for grassroots voter list management.",
                presiding: "Presiding Officer - Conducts polling at a specific booth."
            }
        },
        sec: {
            name: "State Election Commissions (SEC)",
            role: "Autonomous authority responsible for the '3rd tier' of governance: Panchayati Raj Institutions and Urban Local Bodies.",
            states: [
                "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
                "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
                "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
                "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
                "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
                "Uttar Pradesh", "Uttarakhand", "West Bengal"
            ]
        }
    },
    historicalResults: {
        firstElection: {
            year: "1951-52",
            totalVotes: "105,847,982",
            topParties: [
                { name: "Indian National Congress", votes: "47,665,951", seats: 364, percentage: "45.03%" },
                { name: "Socialist Party", votes: "11,216,719", seats: 12, percentage: "10.60%" },
                { name: "Communist Party of India", votes: "3,487,401", seats: 16, percentage: "3.29%" }
            ]
        },
        latestElection: {
            year: "2024",
            totalVotes: "614,190,359",
            alliances: {
                nda: {
                    name: "National Democratic Alliance",
                    seats: 293,
                    majorParty: { name: "BJP", votes: "235,974,144", seats: 240, percentage: "38.42%" }
                },
                india: {
                    name: "I.N.D.I.A",
                    seats: 234,
                    majorParty: { name: "INC", votes: "136,759,064", seats: 99, percentage: "22.27%" }
                }
            },
            nota: "6,372,220 votes (1.04%)"
        }
    },
    technology: {
        evm: {
            name: "Electronic Voting Machine",
            history: "First used in 1997; universal since 2004. Standalone, non-networked.",
            components: "Control Unit (with Presiding Officer), Balloting Unit (in Voting Compartment), and VVPAT."
        },
        vvpat: {
            name: "Voter Verifiable Paper Audit Trail",
            intro: "Introduced 2013 (Nagaland). Universal since 2019.",
            function: "Displays a slip for 7 seconds showing candidate serial number, name, and symbol."
        },
        ink: {
            name: "Indelible Ink",
            composition: "Contains Silver Nitrate (photo-sensitive).",
            history: "Introduced 1962, developed by CSIR-NPL. Marks the left index finger.",
            durability: "Stays for at least 2 days, up to a month depending on temperature."
        }
    },
    procedures: {
        voteFromHome: {
            eligibility: "Voters aged 85+ and PwD (since 2024).",
            process: "Submit Form 12-D 10 days in advance. 5-officer team (inc. videographer) visits home.",
            voluntary: "Voluntary option, but once chosen, it cannot be reversed for that election."
        },
        nota: "Introduced 2013. Right to register a negative vote. The candidate with the most votes wins even if NOTA is higher.",
        postalBallot: "Available for 'Service Voters' (Armed Forces, etc.), voters 85+, PwD, and people in preventive detention.",
        mcc: "Model Code of Conduct: Guidelines to ensure fair play. Campaigning ends 48 hours before conclusion of poll."
    },
    stories: {
        dolma: {
            name: "Dolma",
            age: 83,
            feat: "Walked 14km on a snowy road to cast her vote in the 2022 Himachal Pradesh elections.",
            message: "Inspiration for civic participation."
        }
    },
    upcomingElections: {
        byeElection2026: {
            title: "Bye-Election 2026",
            summary: "ECI has scheduled bye-elections for 8 Assembly Seats across 6 states to fill vacancies caused by the passing of sitting representatives.",
            announcementDate: "March 15, 2026",
            phases: [
                {
                    pollDate: "April 9, 2026",
                    constituencies: [
                        { state: "Goa", name: "Ponda", reason: "Death of Sitting MLA" },
                        { state: "Karnataka", name: "Bagalkot", reason: "Death of Sh. Meti Hullappa" },
                        { state: "Karnataka", name: "Davanagere South", reason: "Death of Sh. Shamanur Shivashankarappa" },
                        { state: "Nagaland", name: "Koridang (ST)", reason: "Death of Sh. Imkong L. Imchen" },
                        { state: "Tripura", name: "Dharmanagar", reason: "Death of Sitting MLA" }
                    ]
                },
                {
                    pollDate: "April 23, 2026",
                    constituencies: [
                        { state: "Gujarat", name: "Umreth", reason: "Death of Sitting MLA" },
                        { state: "Maharashtra", name: "Baramati", reason: "Death of Sh. Ajit Pawar" },
                        { state: "Maharashtra", name: "Rahuri", reason: "Death of Sh. Shivaji Kardile" }
                    ]
                }
            ],
            countingDay: "May 4, 2026",
            completionDate: "May 6, 2026",
            stats: {
                totalCandidates: "~1,955 (including concurrent elections)",
                kycModule: "Know Your Candidate (KYC) on ECINet",
                highTurnoutRef: "Tamil Nadu recorded 84.69% in April 23rd phase"
            },
            officialResources: "ECINet for Voter Services & Candidate KYC (affidavits and criminal antecedents)."
        }
    }
};
