// =========================
// GLOBAL STATE MANAGEMENT
// =========================

let currentView = 'hub-view';
let diceHistory = [];

// Powers management
let activeBioticPowers = [];
let activeTechPowers = [];
let bioticPowerIdCounter = 1;
let techPowerIdCounter = 1;

// =========================
// GAME DATA DEFINITIONS
// =========================

const classData = {
    'Soldier': {
        description: 'Masters of combat tactics and weaponry. Soldiers excel in direct confrontation and can use any weapon or armor effectively.',
        effects: '• +2 to Combat attribute\n• Can use Heavy Armor without penalty\n• Extra weapon training (can use all weapon types)\n• Tactical expertise in battlefield scenarios'
    },
    'Engineer': {
        description: 'Technical specialists who excel at manipulating technology and creating solutions through ingenuity.',
        effects: '• +2 to Tech attribute\n• Can hack and modify technology systems\n• Creates tech mines and deployable defenses\n• Bonus to engineering and repair tasks'
    },
    'Adept': {
        description: 'Biotic specialists who harness dark energy to manipulate matter and create devastating attacks.',
        effects: '• +2 to Biotics attribute\n• Access to powerful biotic abilities\n• Can manipulate gravity and mass\n• Increased biotic energy pool'
    },
    'Vanguard': {
        description: 'Aggressive fighters who combine biotic powers with close-combat expertise for devastating hit-and-run tactics.',
        effects: '• +1 to Combat, +1 to Biotics\n• Biotic charge abilities for closing distance\n• Can use medium armor effectively\n• Enhanced mobility in combat'
    },
    'Sentinel': {
        description: 'Versatile operatives who blend tech and biotic abilities to support allies and control the battlefield.',
        effects: '• +1 to Tech, +1 to Biotics\n• Tech armor for enhanced protection\n• Can combine tech and biotic powers\n• Support and defensive specialization'
    },
    'Infiltrator': {
        description: 'Stealth specialists who use technology and precision to eliminate targets from the shadows.',
        effects: '• +1 to Combat, +1 to Tech\n• Tactical cloak for stealth operations\n• Sniper rifle expertise\n• Enhanced hacking and sabotage abilities'
    }
};

const raceData = {
    'Human': {
        description: 'Adaptable and determined, humans are newcomers to the galactic community but have quickly established themselves as a major power.',
        effects: '• +1 to any two different attributes\n• Extra skill point at character creation\n• Diplomatic bonus with most species\n• Leadership bonuses in mixed groups'
    },
    'Asari': {
        description: 'Long-lived and naturally biotic, the asari are known for their wisdom, diplomacy, and powerful biotic abilities.',
        effects: '• +2 to Biotics\n• +1 to Charisma\n• Natural biotic abilities\n• Extended lifespan provides vast experience\n• Diplomatic immunity in Citadel space'
    },
    'Turian': {
        description: 'Disciplined militaristic culture with natural tactical aptitude and strong sense of duty and honor.',
        effects: '• +2 to Combat\n• +1 to Tech\n• Military training and discipline\n• Natural armor provides damage resistance\n• Tactical expertise in organized warfare'
    },
    'Krogan': {
        description: 'Physically powerful and resilient warriors from a harsh homeworld, known for their incredible durability.',
        effects: '• +3 to Health\n• +1 to Combat\n• Natural regeneration abilities\n• Redundant organ systems\n• Resistance to toxins and radiation'
    },
    'Salarian': {
        description: 'Highly intelligent and fast-thinking, salarians excel at science, espionage, and rapid problem-solving.',
        effects: '• +2 to Tech\n• +1 to Evasion\n• Enhanced intelligence and memory\n• Fast reflexes and quick thinking\n• Scientific and research bonuses'
    },
    'Quarian': {
        description: 'Nomadic people living in environmental suits, with exceptional technical skills developed from shipboard life.',
        effects: '• +2 to Tech\n• +1 to Evasion\n• Master engineers and technicians\n• Environmental suit provides protection\n• Ship and fleet operation expertise'
    },
    'Drell': {
        description: 'Reptilian species with perfect memory and natural agility, often serving as assassins or scholars.',
        effects: '• +1 to Combat\n• +1 to Charisma\n• Perfect memory (eidetic recall)\n• Natural climbing and acrobatic abilities\n• Enhanced reflexes'
    },
    'Batarian': {
        description: 'Four-eyed humanoids known for their slave trade and antagonistic relationship with humans.',
        effects: '• +1 to Combat\n• +1 to Tech\n• Enhanced vision and depth perception\n• Criminal underworld connections\n• Slavers guild knowledge'
    },
    'Vorcha': {
        description: 'Short-lived but highly adaptive species with rapid regeneration and ability to adapt to environments.',
        effects: '• +2 to Health\n• +1 to Combat\n• Rapid regeneration\n• Environmental adaptation\n• Resilience to damage and disease'
    },
    'Volus': {
        description: 'Small, pressure-suit wearing traders and economists who are the financial backbone of Citadel space.',
        effects: '• +2 to Charisma\n• +1 to Tech\n• Financial and trade expertise\n• Pressure suit environmental protection\n• Economic analysis and negotiation skills'
    }
};

const backgroundData = {
    'Military': {
        description: 'Served in organized armed forces, trained in tactics, discipline, and combat operations.',
        effects: '• Combat training and weapons familiarity\n• Military contacts and protocols\n• Leadership and command experience\n• Access to military equipment and intel'
    },
    'Corporate Executive': {
        description: 'High-level business leader with extensive corporate networks and financial resources.',
        effects: '• Substantial financial resources\n• Corporate contacts and influence\n• Business negotiation expertise\n• Access to corporate facilities and data'
    },
    'Frontier Colonist': {
        description: 'Grew up on the edge of civilized space, learning to survive in harsh conditions.',
        effects: '• Survival and self-reliance skills\n• Knowledge of frontier territories\n• Resourcefulness and improvisation\n• Familiarity with dangerous wildlife'
    },
    'Criminal Underground': {
        description: 'Operated outside the law in criminal organizations, learning stealth and underworld connections.',
        effects: '• Criminal contacts and black market access\n• Stealth and infiltration skills\n• Knowledge of illegal activities\n• Street smarts and survival instincts'
    },
    'Academic Researcher': {
        description: 'Dedicated scholar with extensive knowledge and research experience.',
        effects: '• Vast academic knowledge\n• Research and analysis skills\n• Academic contacts and library access\n• Scientific method and critical thinking'
    },
    'Mercenary': {
        description: 'Professional soldier-for-hire with combat experience across multiple conflicts.',
        effects: '• Combat experience and tactics\n• Mercenary band connections\n• Flexible moral code\n• Knowledge of conflicts and battlefields'
    },
    'Engineer': {
        description: 'Technical specialist with engineering training and practical technical skills.',
        effects: '• Engineering and technical expertise\n• Equipment maintenance and repair\n• Technical problem-solving\n• Understanding of complex systems'
    },
    'Medic': {
        description: 'Medical professional trained in healing and biological sciences.',
        effects: '• Medical knowledge and healing skills\n• Access to medical supplies\n• Biological and chemical expertise\n• Emergency response training'
    },
    'Pilot': {
        description: 'Skilled vehicle operator with extensive experience flying spacecraft and atmospheric craft.',
        effects: '• Expert piloting skills\n• Spacecraft and vehicle knowledge\n• Navigation and astrogation\n• Pilot network contacts'
    },
    'Diplomat': {
        description: 'Trained in negotiation, cultural sensitivity, and inter-species relations.',
        effects: '• Diplomatic immunity and protocols\n• Cultural knowledge and etiquette\n• Negotiation and persuasion skills\n• Government and embassy contacts'
    },
    'N7 Operative': {
        description: 'Elite Systems Alliance special forces operative with the highest military training.',
        effects: '• Elite military training and tactics\n• Advanced combat specializations\n• Alliance command authority\n• Access to classified operations'
    },
    'C-Sec Officer': {
        description: 'Citadel Security officer trained in law enforcement and maintaining peace.',
        effects: '• Law enforcement authority\n• Investigation and forensics training\n• Citadel security clearance\n• Contact with other law enforcement'
    },
    'Spectre Agent': {
        description: 'Elite Citadel Council agent with unlimited authority to preserve galactic peace.',
        effects: '• Council authority and resources\n• Above-the-law operational freedom\n• Advanced training in all specialties\n• Galactic intelligence network access'
    },
    'Alliance Marine': {
        description: 'Systems Alliance ground forces specialist trained for planetary assault operations.',
        effects: '• Advanced military combat training\n• Planetary assault specialization\n• Alliance military support\n• Knowledge of Alliance operations'
    },
    'Cerberus Operative': {
        description: 'Human-first organization member with advanced training and controversial methods.',
        effects: '• Advanced black ops training\n• Cerberus technology and resources\n• Human supremacist contacts\n• Classified human tech access'
    },
    'Terminus Smuggler': {
        description: 'Outlaw operating in lawless space, expert at avoiding authorities and moving contraband.',
        effects: '• Criminal network in Terminus systems\n• Smuggling routes and safe houses\n• Ship modification expertise\n• Black market connections'
    },
    'Citadel Politician': {
        description: 'Galactic government official with political power and diplomatic connections.',
        effects: '• Political influence and authority\n• Diplomatic contacts across species\n• Government resource access\n• Knowledge of galactic politics'
    },
    'Omega Mercenary': {
        description: 'Hardened fighter from the lawless station Omega, experienced in brutal combat.',
        effects: '• Brutal combat experience\n• Omega underworld connections\n• Survival in lawless environments\n• Knowledge of criminal organizations'
    },
    'STG Agent': {
        description: 'Salarian Special Tasks Group operative trained in espionage and intelligence.',
        effects: '• Advanced espionage training\n• Intelligence gathering expertise\n• Salarian government authority\n• Access to classified information'
    },
    'Migrant Fleet Engineer': {
        description: 'Quarian engineer responsible for maintaining the massive ships of the Migrant Fleet.',
        effects: '• Advanced ship engineering skills\n• Quarian fleet technology access\n• Resource conservation expertise\n• Knowledge of fleet operations'
    }
};

const weaponData = {
    // Assault Rifles
    'M-8 Avenger': {
        description: 'Standard Systems Alliance assault rifle. Reliable, accurate, and easy to use.',
        effects: '• Damage: 2d6\n• Range: Medium\n• Auto-fire capable\n• Standard military issue'
    },
    'M-15 Vindicator': {
        description: 'Burst-fire assault rifle with excellent accuracy and stopping power.',
        effects: '• Damage: 2d8 (burst)\n• Range: Medium\n• Burst-fire mode\n• High accuracy'
    },
    'M-76 Revenant': {
        description: 'Heavy machine gun with devastating firepower and high rate of fire.',
        effects: '• Damage: 3d6\n• Range: Long\n• Full-auto capable\n• Heavy weapon penalties'
    },
    'M-96 Mattock': {
        description: 'Semi-automatic rifle combining assault rifle power with sniper precision.',
        effects: '• Damage: 2d8\n• Range: Long\n• Semi-auto precision\n• Scope attachment'
    },
    'M-37 Falcon': {
        description: 'Grenade launcher that fires micro-grenades with explosive payload.',
        effects: '• Damage: 3d8 (explosive)\n• Range: Medium\n• Area of effect\n• Limited ammo'
    },
    'Geth Pulse Rifle': {
        description: 'Alien technology weapon firing concentrated energy pulses.',
        effects: '• Damage: 2d6 (energy)\n• Range: Medium\n• No ammo concerns\n• Geth technology'
    },

    // Sniper Rifles
    'M-92 Mantis': {
        description: 'Standard sniper rifle with exceptional range and stopping power.',
        effects: '• Damage: 3d8\n• Range: Extreme\n• Single-shot precision\n• Scope included'
    },
    'M-97 Viper': {
        description: 'Semi-automatic sniper rifle for rapid precision shots.',
        effects: '• Damage: 2d8\n• Range: Long\n• Semi-auto capability\n• Fast follow-up shots'
    },
    'M-98 Widow': {
        description: 'Heavy sniper rifle capable of penetrating heavy armor and barriers.',
        effects: '• Damage: 4d8\n• Range: Extreme\n• Armor penetration\n• Massive stopping power'
    },
    'Black Widow': {
        description: 'Advanced sniper rifle with three-round burst capability.',
        effects: '• Damage: 3d8 (3-round burst)\n• Range: Extreme\n• Burst precision\n• Elite weapon'
    },

    // Shotguns
    'M-23 Katana': {
        description: 'Standard shotgun effective at close range with wide spread.',
        effects: '• Damage: 3d6\n• Range: Close\n• Wide spread pattern\n• Close-quarters specialist'
    },
    'M-27 Scimitar': {
        description: 'Semi-automatic shotgun with rapid fire capability.',
        effects: '• Damage: 2d8\n• Range: Close\n• Semi-auto fire\n• Fast reload'
    },
    'M-300 Claymore': {
        description: 'Heavy shotgun with devastating close-range damage.',
        effects: '• Damage: 4d6\n• Range: Close\n• Massive damage\n• Slow reload'
    },
    'Geth Plasma Shotgun': {
        description: 'Alien energy weapon that charges for increased damage.',
        effects: '• Damage: 2d6-4d6 (charge)\n• Range: Close\n• Chargeable shot\n• Energy-based'
    },

    // SMGs
    'M-4 Shuriken': {
        description: 'Compact submachine gun for close-quarters combat.',
        effects: '• Damage: 1d8\n• Range: Close\n• High rate of fire\n• Compact design'
    },
    'M-9 Tempest': {
        description: 'High-velocity SMG with excellent accuracy.',
        effects: '• Damage: 2d6\n• Range: Close\n• High accuracy\n• Stable platform'
    },
    'M-12 Locust': {
        description: 'Precise SMG with burst-fire capability.',
        effects: '• Damage: 1d10 (burst)\n• Range: Close\n• Burst-fire mode\n• High precision'
    },

    // Pistols
    'M-3 Predator': {
        description: 'Standard sidearm used throughout the galaxy.',
        effects: '• Damage: 1d8\n• Range: Medium\n• Reliable backup\n• Quick draw'
    },
    'M-5 Phalanx': {
        description: 'Heavy pistol with increased stopping power.',
        effects: '• Damage: 2d6\n• Range: Medium\n• High damage\n• Slower fire rate'
    },
    'M-6 Carnifex': {
        description: 'High-caliber hand cannon with massive damage potential.',
        effects: '• Damage: 2d8\n• Range: Medium\n• Massive damage\n• Limited capacity'
    },
    'M-77 Paladin': {
        description: 'Elite heavy pistol with armor-penetrating rounds.',
        effects: '• Damage: 2d10\n• Range: Medium\n• Armor penetration\n• Elite weapon'
    }
};

const armorData = {
    // Light Armor
    'Light Combat Armor': {
        description: 'Basic protection that doesn\'t impede movement or biotic abilities.',
        effects: '• Armor Rating: 2\n• No mobility penalties\n• Biotic-friendly\n• Standard protection'
    },
    'Explorer Armor': {
        description: 'Specialized armor for frontier exploration and harsh environments.',
        effects: '• Armor Rating: 2\n• Environmental protection\n• Enhanced sensors\n• Survival gear integrated'
    },
    'Stealth Armor': {
        description: 'Advanced armor with built-in stealth capabilities.',
        effects: '• Armor Rating: 1\n• Stealth bonuses\n• Silent movement\n• Reduced signatures'
    },

    // Medium Armor
    'Standard Combat Armor': {
        description: 'Military-grade protection balancing defense and mobility.',
        effects: '• Armor Rating: 4\n• Balanced protection\n• Military standard\n• Good mobility'
    },
    'Tactical Armor': {
        description: 'Enhanced armor with integrated tactical systems.',
        effects: '• Armor Rating: 4\n• Tactical HUD\n• Enhanced communications\n• Targeting assistance'
    },
    'Barrier Armor': {
        description: 'Armor enhanced with kinetic barrier technology.',
        effects: '• Armor Rating: 3\n• Kinetic barriers\n• Energy resistance\n• Shield regeneration'
    },

    // Heavy Armor
    'Heavy Combat Armor': {
        description: 'Maximum protection for front-line combat operations.',
        effects: '• Armor Rating: 6\n• Maximum protection\n• Heavy weapon support\n• Reduced mobility'
    },
    'Assault Armor': {
        description: 'Specialized armor for aggressive combat tactics.',
        effects: '• Armor Rating: 5\n• Assault bonuses\n• Intimidation factor\n• Combat optimization'
    },
    'Fortress Armor': {
        description: 'Ultimate protection with integrated weapon systems.',
        effects: '• Armor Rating: 8\n• Integrated weapons\n• Maximum defense\n• Severe mobility penalties'
    }
};

const omniToolData = {
    // Tier 1
    'Hahne-Kedar OT-11': {
        description: 'Basic omni-tool with standard fabrication and hacking capabilities.',
        effects: '• Tech bonus: +1\n• Basic fabrication\n• Standard hacking\n• Emergency medical'
    },
    'Kassa Fabrication OT-12': {
        description: 'Fabrication-focused omni-tool with enhanced manufacturing.',
        effects: '• Tech bonus: +1\n• Enhanced fabrication\n• Material synthesis\n• Rapid prototyping'
    },
    'Sirta Foundation OT-13': {
        description: 'Medical-focused omni-tool with advanced health monitoring.',
        effects: '• Tech bonus: +1\n• Medical enhancement\n• Health monitoring\n• Emergency treatment'
    },

    // Tier 2
    'Aldrin Labs OT-21': {
        description: 'Advanced omni-tool with improved processing power.',
        effects: '• Tech bonus: +2\n• Enhanced processing\n• Advanced hacking\n• Multi-tool functions'
    },
    'Ariake Technologies OT-22': {
        description: 'Combat-oriented omni-tool with weapon integration.',
        effects: '• Tech bonus: +2\n• Weapon integration\n• Combat apps\n• Targeting assistance'
    },
    'Rosenkov Materials OT-23': {
        description: 'Engineering-focused tool with advanced fabrication.',
        effects: '• Tech bonus: +2\n• Advanced engineering\n• Complex fabrication\n• System integration'
    },

    // Tier 3
    'Techtronic OT-31': {
        description: 'Elite omni-tool with cutting-edge technology.',
        effects: '• Tech bonus: +3\n• Elite capabilities\n• Advanced AI assist\n• Quantum processing'
    },
    'Devlon Industries OT-32': {
        description: 'Military-grade omni-tool with enhanced security.',
        effects: '• Tech bonus: +3\n• Military encryption\n• Advanced security\n• Combat optimization'
    },
    'Elkoss Combine OT-33': {
        description: 'Top-tier omni-tool with experimental features.',
        effects: '• Tech bonus: +3\n• Experimental tech\n• Research capabilities\n• Prototype functions'
    }
};

const bioticAmpData = {
    // Basic Amps (L1-L3)
    'L1 Biotic Amp': {
        description: 'Entry-level biotic amplifier for basic biotic manipulation.',
        effects: '• Biotics bonus: +1\n• Basic amplification\n• Stable output\n• Safe for beginners'
    },
    'L2 Biotic Amp': {
        description: 'Improved amplifier with better power regulation.',
        effects: '• Biotics bonus: +1\n• Improved stability\n• Better efficiency\n• Enhanced safety'
    },
    'L3 Biotic Amp': {
        description: 'Advanced entry-level amp with enhanced capabilities.',
        effects: '• Biotics bonus: +2\n• Enhanced power\n• Improved control\n• Reduced strain'
    },

    // Intermediate Amps (L4-L6)
    'L4 Biotic Amp': {
        description: 'Professional-grade amplifier for experienced biotics.',
        effects: '• Biotics bonus: +2\n• Professional grade\n• Enhanced duration\n• Better precision'
    },
    'L5 Biotic Amp': {
        description: 'High-performance amp with advanced power management.',
        effects: '• Biotics bonus: +3\n• High performance\n• Advanced management\n• Extended use'
    },
    'L6 Biotic Amp': {
        description: 'Elite amplifier used by specialized biotic operatives.',
        effects: '• Biotics bonus: +3\n• Elite performance\n• Specialized functions\n• Combat optimization'
    },

    // Advanced Amps (L7-L9)
    'L7 Biotic Amp': {
        description: 'Cutting-edge amplifier with experimental technology.',
        effects: '• Biotics bonus: +4\n• Experimental tech\n• Massive amplification\n• Prototype features'
    },
    'L8 Biotic Amp': {
        description: 'Military-grade amp for special forces biotics.',
        effects: '• Biotics bonus: +4\n• Military grade\n• Combat enhanced\n• Maximum output'
    },
    'L9 Biotic Amp': {
        description: 'Ultimate biotic amplifier for the most powerful biotics.',
        effects: '• Biotics bonus: +5\n• Ultimate power\n• Legendary capabilities\n• Unmatched performance'
    }
};

const bioticPowersData = {
    // Offensive Powers
    'Throw': {
        description: 'A basic biotic attack that hurls enemies away using mass effect fields.',
        effects: '• Throws target back 5 meters\n• 2d6 damage on impact\n• Can affect multiple targets\n• Cooldown: 1 round'
    },
    'Warp': {
        description: 'Advanced biotic power that destabilizes target\'s mass effect fields.',
        effects: '• 3d6 damage over time\n• Reduces armor effectiveness\n• Affects barriers and shields\n• Duration: 3 rounds'
    },
    'Singularity': {
        description: 'Creates a localized gravity well that pulls enemies together.',
        effects: '• Creates 3m radius gravity well\n• Pulls enemies to center\n• 2d6 damage per round trapped\n• Duration: 4 rounds'
    },
    'Biotic Charge': {
        description: 'Propels the user forward with biotic energy to close distance instantly.',
        effects: '• Instant movement to target\n• 3d8 impact damage\n• Restores barriers\n• Cooldown: 2 rounds'
    },
    'Slam': {
        description: 'Lifts target and slams them to the ground with tremendous force.',
        effects: '• Lifts then slams target\n• 4d6 damage\n• Knockdown effect\n• Armor ignoring'
    },
    'Reave': {
        description: 'Damages enemies while healing the user through biotic vampirism.',
        effects: '• 2d8 damage to target\n• Heals user for half damage dealt\n• Affects barriers and armor\n• Duration: 2 rounds'
    },
    'Lash': {
        description: 'Grabs and whips enemies with biotic tendrils.',
        effects: '• 2d6 damage\n• Pulls or pushes target\n• Can affect multiple enemies\n• Quick cooldown'
    },

    // Defensive Powers
    'Barrier': {
        description: 'Creates a protective biotic field around the user.',
        effects: '• +4 to damage resistance\n• Absorbs 20 points of damage\n• Regenerates over time\n• Duration: Until depleted'
    },
    'Stasis': {
        description: 'Freezes target in a time-dilated biotic field.',
        effects: '• Target cannot move or act\n• Immune to damage while frozen\n• Cannot affect large enemies\n• Duration: 3 rounds'
    },
    'Lift': {
        description: 'Suspends enemies in the air, leaving them helpless.',
        effects: '• Target helpless while lifted\n• Cannot act or move\n• Vulnerable to other attacks\n• Duration: 3 rounds'
    },
    'Pull': {
        description: 'Draws enemies toward the user using biotic attraction.',
        effects: '• Pulls target closer\n• Disrupts enemy positioning\n• Can affect multiple targets\n• Breaks enemy cover'
    },

    // Support Powers
    'Unity': {
        description: 'Revives and heals allies using shared biotic energy.',
        effects: '• Revives unconscious allies\n• Restores 3d6 health\n• Affects all nearby allies\n• Long cooldown'
    },
    'Dominate': {
        description: 'Takes control of enemy minds using biotic influence.',
        effects: '• Controls enemy actions\n• Target fights for you\n• Only affects organics\n• Duration: 4 rounds'
    },
    'Mind Control': {
        description: 'Advanced mental manipulation through biotic neural interference.',
        effects: '• Complete control of target\n• Access to target abilities\n• Affects any organic\n• Duration: 3 rounds'
    }
};

const techPowersData = {
    // Hacking Powers
    'Sabotage': {
        description: 'Disrupts enemy weapons and equipment through electronic interference.',
        effects: '• Causes weapon malfunction\n• 2d6 tech damage\n• Affects synthetic enemies\n• Duration: 2 rounds'
    },
    'AI Hacking': {
        description: 'Takes control of artificial intelligence systems.',
        effects: '• Controls AI/synthetic enemies\n• Target fights for you\n• Only affects synthetics\n• Duration: 4 rounds'
    },
    'Overload': {
        description: 'Overcharges electronic systems causing explosive feedback.',
        effects: '• 3d6 electrical damage\n• Destroys shields instantly\n• Chain effect to nearby enemies\n• Disables electronics'
    },
    'Neural Shock': {
        description: 'Delivers electrical impulses that disrupt neural activity.',
        effects: '• 2d8 damage + stun\n• Affects organic enemies\n• Bypasses shields\n• Disrupts biotic powers'
    },

    // Combat Powers
    'Incinerate': {
        description: 'Launches burning plasma that ignites enemies.',
        effects: '• 3d6 fire damage initially\n• 1d6 damage per round (burning)\n• Affects armor heavily\n• Duration: 3 rounds'
    },
    'Cryo Blast': {
        description: 'Freezes enemies in super-cooled plasma.',
        effects: '• 2d6 cold damage\n• Slows enemy movement\n• Makes enemies brittle\n• Area of effect'
    },
    'Energy Drain': {
        description: 'Drains energy from shields and barriers to restore your own.',
        effects: '• Drains enemy shields/barriers\n• Restores your shields\n• 2d6 damage to synthetics\n• No cooldown'
    },
    'Combat Drone': {
        description: 'Deploys an automated combat drone to assist in battle.',
        effects: '• Drone attacks independently\n• 1d8 damage per round\n• Distracts enemies\n• Duration: 5 rounds'
    },

    // Defense Powers
    'Tech Armor': {
        description: 'Encases the user in protective energy fields and hardened plating.',
        effects: '• +6 damage resistance\n• Immune to tech attacks\n• Explodes when depleted\n• Duration: Until depleted'
    },
    'Defense Matrix': {
        description: 'Projects defensive barriers around allies.',
        effects: '• +2 damage resistance to allies\n• Protects against projectiles\n• Affects whole squad\n• Duration: 4 rounds'
    },
    'Fortification': {
        description: 'Hardens armor and increases physical resistance.',
        effects: '• +4 to armor rating\n• Resistance to physical damage\n• Immunity to knockdown\n• Duration: 5 rounds'
    },

    // Support Powers
    'First Aid': {
        description: 'Deploys medical nanobots for emergency healing.',
        effects: '• Restores 2d6+2 health\n• Cures poison/disease\n• Can be used on others\n• Quick activation'
    },
    'Decryption': {
        description: 'Advanced code-breaking algorithms for bypassing security.',
        effects: '• Unlocks encrypted systems\n• Bypasses security doors\n• Accesses classified data\n• Passive enhancement'
    },
    'Electronics': {
        description: 'Manipulates electronic systems and improves tech efficiency.',
        effects: '• Enhances all tech powers\n• Repairs damaged equipment\n• Improves shield recharge\n• Passive enhancement'
    },
    'Hacking': {
        description: 'Infiltrates and controls computer systems and networks.',
        effects: '• Controls enemy systems\n• Gathers intelligence\n• Disables security measures\n• Passive enhancement'
    }
};

// =========================
// APP INITIALIZATION
// =========================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadDiceHistory();
});

function initializeApp() {
    console.log('🚀 Sci-Fi Solo RPG Companion App initialized');

    // Show hub view by default
    showView('hub-view');

    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    }

    // PWA Install Prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;

        // Show install button/hint if desired
        console.log('💾 PWA can be installed');
    });

    // Handle app installation
    window.addEventListener('appinstalled', () => {
        console.log('🎉 PWA was installed');
        deferredPrompt = null;
    });
}

// =========================
// EVENT LISTENERS SETUP
// =========================

function setupEventListeners() {
    // Central dice roller button
    document.getElementById('dice-roller-btn').addEventListener('click', openDiceModal);

    // Radial navigation buttons
    document.getElementById('character-btn').addEventListener('click', () => showView('character-view'));
    document.getElementById('rules-btn').addEventListener('click', () => showView('rules-view'));
    document.getElementById('enemies-btn').addEventListener('click', () => showView('enemies-view'));
    document.getElementById('encounters-btn').addEventListener('click', () => showView('encounters-view'));
    document.getElementById('ship-btn').addEventListener('click', () => showView('ship-view'));
    document.getElementById('notes-btn').addEventListener('click', () => showView('notes-view'));

    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.dataset.target || 'hub-view';
            showView(target);
        });
    });

    // Dice modal controls
    document.getElementById('close-dice-modal').addEventListener('click', closeDiceModal);
    document.getElementById('roll-dice-btn').addEventListener('click', rollDice);
    document.getElementById('dice-formula').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') rollDice();
    });

    // Individual die buttons
    document.querySelectorAll('.die-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const dieType = e.target.dataset.die;
            document.getElementById('dice-formula').value = `1${dieType}`;
            rollDice();
        });
    });

    // Modal backdrop click to close
    document.getElementById('dice-modal').addEventListener('click', (e) => {
        if (e.target.id === 'dice-modal') {
            closeDiceModal();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// =========================
// VIEW MANAGEMENT
// =========================

function showView(viewId) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    // Show target view
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
        currentView = viewId;

        // Add any view-specific initialization
        if (viewId === 'character-view') {
            initializeCharacterView();
        }
    }
}

function initializeCharacterView() {
    // Initialize character sheet functionality
    console.log('Character view initialized');
    initializeCharacterSheet();
}

// =========================
// DICE ROLLING SYSTEM
// =========================

function openDiceModal() {
    const modal = document.getElementById('dice-modal');
    modal.classList.add('active');
    document.getElementById('dice-formula').focus();
}

function closeDiceModal() {
    const modal = document.getElementById('dice-modal');
    modal.classList.remove('active');
}

function rollDice() {
    const formula = document.getElementById('dice-formula').value.trim();
    if (!formula) return;

    try {
        const result = parseDiceFormula(formula);
        displayDiceResult(formula, result);
        addToHistory(formula, result);
        saveDiceHistory();
    } catch (error) {
        displayDiceResult(formula, { error: error.message });
    }
}

function parseDiceFormula(formula) {
    // Clean the formula
    const cleanFormula = formula.toLowerCase().replace(/\s+/g, '');

    // Handle simple die rolls (e.g., "d20", "3d6")
    const simpleMatch = cleanFormula.match(/^(\d+)?d(\d+)$/);
    if (simpleMatch) {
        const count = parseInt(simpleMatch[1]) || 1;
        const sides = parseInt(simpleMatch[2]);
        return rollMultipleDice(count, sides);
    }

    // Handle complex formulas (e.g., "3d6+2", "2d10-1")
    const complexMatch = cleanFormula.match(/^(\d+)?d(\d+)([+-]\d+)?$/);
    if (complexMatch) {
        const count = parseInt(complexMatch[1]) || 1;
        const sides = parseInt(complexMatch[2]);
        const modifier = parseInt(complexMatch[3]) || 0;

        const diceResult = rollMultipleDice(count, sides);
        return {
            ...diceResult,
            modifier: modifier,
            total: diceResult.total + modifier
        };
    }

    // Handle advantage/disadvantage (e.g., "adv", "dis")
    if (cleanFormula === 'adv' || cleanFormula === 'advantage') {
        return rollAdvantage();
    }
    if (cleanFormula === 'dis' || cleanFormula === 'disadvantage') {
        return rollDisadvantage();
    }

    throw new Error('Invalid dice formula. Examples: d20, 3d6, 2d10+5, adv, dis');
}

function rollMultipleDice(count, sides) {
    if (count < 1 || count > 100) throw new Error('Dice count must be between 1 and 100');
    if (sides < 2 || sides > 1000) throw new Error('Dice sides must be between 2 and 1000');

    const rolls = [];
    let total = 0;

    for (let i = 0; i < count; i++) {
        const roll = Math.floor(Math.random() * sides) + 1;
        rolls.push(roll);
        total += roll;
    }

    return {
        count: count,
        sides: sides,
        rolls: rolls,
        total: total,
        modifier: 0
    };
}

function rollAdvantage() {
    const roll1 = Math.floor(Math.random() * 20) + 1;
    const roll2 = Math.floor(Math.random() * 20) + 1;
    const total = Math.max(roll1, roll2);

    return {
        count: 2,
        sides: 20,
        rolls: [roll1, roll2],
        total: total,
        modifier: 0,
        advantage: true
    };
}

function rollDisadvantage() {
    const roll1 = Math.floor(Math.random() * 20) + 1;
    const roll2 = Math.floor(Math.random() * 20) + 1;
    const total = Math.min(roll1, roll2);

    return {
        count: 2,
        sides: 20,
        rolls: [roll1, roll2],
        total: total,
        modifier: 0,
        disadvantage: true
    };
}

function displayDiceResult(formula, result) {
    const resultDiv = document.getElementById('dice-result');

    if (result.error) {
        resultDiv.innerHTML = `
            <div style="color: #ef4444;">
                <strong>Error:</strong> ${result.error}
            </div>
        `;
        return;
    }

    let html = `<div class="result-formula">${formula}</div>`;

    if (result.advantage) {
        html += `
            <div class="result-details">Advantage: [${result.rolls.join(', ')}]</div>
            <div class="result-total" style="color: #22c55e;">Result: ${result.total}</div>
        `;
    } else if (result.disadvantage) {
        html += `
            <div class="result-details">Disadvantage: [${result.rolls.join(', ')}]</div>
            <div class="result-total" style="color: #ef4444;">Result: ${result.total}</div>
        `;
    } else {
        if (result.rolls.length > 1) {
            html += `<div class="result-details">Rolls: [${result.rolls.join(', ')}]</div>`;
        }
        if (result.modifier !== 0) {
            const modifierStr = result.modifier > 0 ? `+${result.modifier}` : `${result.modifier}`;
            html += `<div class="result-details">Base: ${result.total - result.modifier} ${modifierStr}</div>`;
        }
        html += `<div class="result-total">Total: ${result.total}</div>`;
    }

    resultDiv.innerHTML = html;

    // Add animation effect
    resultDiv.style.transform = 'scale(0.8)';
    setTimeout(() => {
        resultDiv.style.transform = 'scale(1)';
    }, 100);
}

// =========================
// DICE HISTORY MANAGEMENT
// =========================

function addToHistory(formula, result) {
    const historyItem = {
        timestamp: new Date().toLocaleTimeString(),
        formula: formula,
        result: result
    };

    diceHistory.unshift(historyItem);

    // Keep only last 20 rolls
    if (diceHistory.length > 20) {
        diceHistory = diceHistory.slice(0, 20);
    }

    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');

    if (diceHistory.length === 0) {
        historyList.innerHTML = '<div style="color: #64748b; text-align: center;">No rolls yet</div>';
        return;
    }

    historyList.innerHTML = diceHistory.map(item => {
        let resultText = '';
        if (item.result.error) {
            resultText = `Error: ${item.result.error}`;
        } else if (item.result.advantage) {
            resultText = `Advantage: ${item.result.total}`;
        } else if (item.result.disadvantage) {
            resultText = `Disadvantage: ${item.result.total}`;
        } else {
            resultText = `Total: ${item.result.total}`;
        }

        return `
            <div class="history-item">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #00d9ff;">${item.formula}</span>
                    <span style="color: #64748b; font-size: 0.8em;">${item.timestamp}</span>
                </div>
                <div style="color: #e2e8f0; margin-top: 0.25rem;">${resultText}</div>
            </div>
        `;
    }).join('');
}

function saveDiceHistory() {
    localStorage.setItem('scifiRpgDiceHistory', JSON.stringify(diceHistory));
}

function loadDiceHistory() {
    const saved = localStorage.getItem('scifiRpgDiceHistory');
    if (saved) {
        diceHistory = JSON.parse(saved);
        updateHistoryDisplay();
    }
}

// =========================
// KEYBOARD SHORTCUTS
// =========================

function handleKeyboardShortcuts(e) {
    // Only handle shortcuts when not typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch(e.key.toLowerCase()) {
        case 'escape':
            if (currentView !== 'hub-view') {
                showView('hub-view');
            } else {
                closeDiceModal();
            }
            break;
        case 'd':
        case ' ':
            if (currentView === 'hub-view') {
                openDiceModal();
            }
            break;
        case '1':
            if (currentView === 'hub-view') showView('character-view');
            break;
        case '2':
            if (currentView === 'hub-view') showView('rules-view');
            break;
        case '3':
            if (currentView === 'hub-view') showView('enemies-view');
            break;
        case '4':
            if (currentView === 'hub-view') showView('encounters-view');
            break;
        case '5':
            if (currentView === 'hub-view') showView('ship-view');
            break;
        case '6':
            if (currentView === 'hub-view') showView('notes-view');
            break;
    }
}

// =========================
// UTILITY FUNCTIONS
// =========================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// =========================
// FEATURE FLAGS & CONFIG
// =========================

const APP_CONFIG = {
    version: '1.0.0',
    features: {
        characterSheet: true,
        diceRoller: true,
        rulesReference: false,
        enemyDatabase: false,
        encounterManager: false,
        shipInventory: false,
        campaignNotes: false
    }
};

// =========================
// CHARACTER SHEET FUNCTIONALITY
// =========================

// Squad Management Variables
let currentCharacterIndex = 1;
let squadData = {
    1: {},
    2: {},
    3: {},
    4: {}
};

// Status Effects Management
let activeStatusEffects = [];

function initializeCharacterSheet() {
    console.log('Initializing character sheet...');

    // Setup event listeners for character sheet
    setupCharacterEventListeners();

    // Load saved squad data
    loadSquadData();

    // Initialize character 1
    loadCharacterFromMemory(currentCharacterIndex);
    updateTabNames();
    updateStatusEffectsDisplay();
}

function setupCharacterEventListeners() {
    // Character field change listeners for auto-save
    const fields = [
        'character-name', 'character-class', 'character-race', 'character-background',
        'health', 'combat', 'evasion', 'charisma', 'tech', 'biotics', 'credits',
        'primary-weapon', 'secondary-weapon', 'armor', 'omni-tool', 'biotic-amp',
        'hp-current', 'hp-max', 'biotic-energy-current', 'biotic-energy-max',
        'tech-points-current', 'tech-points-max', 'kb-current', 'kb-max',
        'bb-current', 'bb-max', 'armor-value'
    ];

    fields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        if (element) {
            element.addEventListener('input', debounce(autoSaveCharacter, 500));
            element.addEventListener('change', autoSaveCharacter);
        }
    });

    // Class and race change listeners for stat updates
    const classElement = document.getElementById('character-class');
    const raceElement = document.getElementById('character-race');

    if (classElement) {
        classElement.addEventListener('change', () => {
            updateClassStats();
            updateClassDescription();
            autoSaveCharacter();
        });
    }

    if (raceElement) {
        raceElement.addEventListener('change', () => {
            updateRaceStats();
            updateRaceDescription();
            autoSaveCharacter();
        });
    }

    // Background change listener for description updates
    const backgroundElement = document.getElementById('character-background');
    if (backgroundElement) {
        backgroundElement.addEventListener('change', () => {
            updateBackgroundDescription();
            autoSaveCharacter();
        });
    }

    // Equipment change listeners for description updates
    const equipmentElements = [
        'primary-weapon', 'secondary-weapon', 'armor', 'omni-tool', 'biotic-amp'
    ];

    equipmentElements.forEach(equipmentId => {
        const element = document.getElementById(equipmentId);
        if (element) {
            element.addEventListener('change', () => {
                updateEquipmentDescription(equipmentId);
                autoSaveCharacter();
            });
        }
    });

    // Status effects system
    setupStatusEffectsListeners();

    // Powers systems
    setupPowersListeners();
}

function setupStatusEffectsListeners() {
    const addEffectBtn = document.getElementById('add-effect-btn');
    const effectSelect = document.getElementById('effect-select');
    const durationSelect = document.getElementById('duration-select');

    if (addEffectBtn) {
        addEffectBtn.addEventListener('click', addStatusEffect);
    }

    // Enable/disable add button based on selections
    [effectSelect, durationSelect].forEach(select => {
        if (select) {
            select.addEventListener('change', () => {
                updateAddButtonState();
            });
        }
    });

    // Initialize button state
    updateAddButtonState();
}

// Squad Management Functions
function switchCharacter(characterIndex) {
    // Save current character data before switching
    saveCurrentCharacterToMemory();

    // Update current character index
    currentCharacterIndex = characterIndex;

    // Update tab visual states
    document.querySelectorAll('.tab-button').forEach(tab => tab.classList.remove('active'));
    const activeTab = document.getElementById(`tab-${characterIndex}`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Load the selected character data
    loadCharacterFromMemory(characterIndex);

    // Update tab name in case character name changed
    updateTabNames();
}

function saveCurrentCharacterToMemory() {
    squadData[currentCharacterIndex] = {
        // Character Basics
        name: getValue('character-name'),
        characterClass: getValue('character-class'),
        race: getValue('character-race'),
        background: getValue('character-background'),

        // Core Attributes
        health: getValue('health'),
        combat: getValue('combat'),
        evasion: getValue('evasion'),
        charisma: getValue('charisma'),
        tech: getValue('tech'),
        biotics: getValue('biotics'),
        credits: getValue('credits'),

        // Equipment
        primaryWeapon: getValue('primary-weapon'),
        secondaryWeapon: getValue('secondary-weapon'),
        armor: getValue('armor'),
        omniTool: getValue('omni-tool'),
        bioticAmp: getValue('biotic-amp'),

        // Combat Stats
        hpCurrent: getValue('hp-current'),
        hpMax: getValue('hp-max'),
        bioticEnergyCurrent: getValue('biotic-energy-current'),
        bioticEnergyMax: getValue('biotic-energy-max'),
        techPointsCurrent: getValue('tech-points-current'),
        techPointsMax: getValue('tech-points-max'),
        kbCurrent: getValue('kb-current'),
        kbMax: getValue('kb-max'),
        bbCurrent: getValue('bb-current'),
        bbMax: getValue('bb-max'),
        armorValue: getValue('armor-value'),
        statusEffects: [...activeStatusEffects],

        // Powers
        bioticPowers: [...activeBioticPowers],
        techPowers: [...activeTechPowers]
    };
}

function loadCharacterFromMemory(characterIndex) {
    const data = squadData[characterIndex] || {};

    // Character Basics
    setValue('character-name', data.name || '');
    setValue('character-class', data.characterClass || '');
    setValue('character-race', data.race || '');
    setValue('character-background', data.background || '');

    // Core Attributes
    setValue('health', data.health || '0');
    setValue('combat', data.combat || '0');
    setValue('evasion', data.evasion || '0');
    setValue('charisma', data.charisma || '0');
    setValue('tech', data.tech || '0');
    setValue('biotics', data.biotics || '0');
    setValue('credits', data.credits || '0');

    // Equipment
    setValue('primary-weapon', data.primaryWeapon || '');
    setValue('secondary-weapon', data.secondaryWeapon || '');
    setValue('armor', data.armor || '');
    setValue('omni-tool', data.omniTool || '');
    setValue('biotic-amp', data.bioticAmp || '');

    // Combat Stats
    setValue('hp-current', data.hpCurrent || '0');
    setValue('hp-max', data.hpMax || '0');
    setValue('biotic-energy-current', data.bioticEnergyCurrent || '0');
    setValue('biotic-energy-max', data.bioticEnergyMax || '0');
    setValue('tech-points-current', data.techPointsCurrent || '0');
    setValue('tech-points-max', data.techPointsMax || '0');
    setValue('kb-current', data.kbCurrent || '0');
    setValue('kb-max', data.kbMax || '0');
    setValue('bb-current', data.bbCurrent || '0');
    setValue('bb-max', data.bbMax || '0');
    setValue('armor-value', data.armorValue || '0');

    // Load status effects
    activeStatusEffects = data.statusEffects || [];
    updateStatusEffectsDisplay();

    // Load powers
    activeBioticPowers = data.bioticPowers || [];
    activeTechPowers = data.techPowers || [];
    updateBioticPowersDisplay();
    updateTechPowersDisplay();

    // Update description fields based on loaded selections
    updateClassDescription();
    updateRaceDescription();
    updateBackgroundDescription();

    // Update equipment descriptions
    updateEquipmentDescription('primary-weapon');
    updateEquipmentDescription('secondary-weapon');
    updateEquipmentDescription('armor');
    updateEquipmentDescription('omni-tool');
    updateEquipmentDescription('biotic-amp');
}

function updateTabNames() {
    for (let i = 1; i <= 4; i++) {
        const tabName = document.getElementById(`tab-name-${i}`);
        const characterData = squadData[i];
        if (tabName) {
            if (characterData && characterData.name) {
                tabName.textContent = characterData.name;
            } else {
                tabName.textContent = `Character ${i}`;
            }
        }
    }
}

function autoSaveCharacter() {
    saveCurrentCharacterToMemory();
    // Auto-save the squad data to localStorage
    localStorage.setItem('scifiRpgSquad', JSON.stringify(squadData));
}

function loadSquadData() {
    const saved = localStorage.getItem('scifiRpgSquad');
    if (saved) {
        try {
            squadData = JSON.parse(saved);
        } catch (error) {
            console.error('Error loading squad data:', error);
            squadData = { 1: {}, 2: {}, 3: {}, 4: {} };
        }
    }
}

// Squad Control Functions
function saveSquad() {
    saveCurrentCharacterToMemory();
    const squadJson = JSON.stringify(squadData, null, 2);
    const blob = new Blob([squadJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'squad_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show confirmation
    alert('Squad data exported successfully!');
}

function loadSquad() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedData = JSON.parse(e.target.result);
                    squadData = importedData;
                    loadCharacterFromMemory(currentCharacterIndex);
                    updateTabNames();
                    localStorage.setItem('scifiRpgSquad', JSON.stringify(squadData));
                    alert('Squad imported successfully!');
                } catch (error) {
                    alert('Error importing squad file. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function clearSquad() {
    if (confirm('Are you sure you want to clear all character data? This cannot be undone.')) {
        squadData = { 1: {}, 2: {}, 3: {}, 4: {} };
        loadCharacterFromMemory(currentCharacterIndex);
        updateTabNames();
        localStorage.setItem('scifiRpgSquad', JSON.stringify(squadData));
        alert('Squad data cleared!');
    }
}

function exportSquad() {
    saveSquad(); // Use the same function
}

function importSquad(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                squadData = importedData;
                loadCharacterFromMemory(currentCharacterIndex);
                updateTabNames();
                localStorage.setItem('scifiRpgSquad', JSON.stringify(squadData));
                alert('Squad imported successfully!');
            } catch (error) {
                alert('Error importing squad file. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}

// Pool adjustment functions
function adjustPool(poolType, delta) {
    const currentElement = document.getElementById(`${poolType}-current`);
    const maxElement = document.getElementById(`${poolType}-max`);

    if (currentElement && maxElement) {
        const current = parseInt(currentElement.value) || 0;
        const max = parseInt(maxElement.value) || 0;
        const newValue = Math.max(0, Math.min(max, current + delta));

        currentElement.value = newValue;
        autoSaveCharacter();
    }
}

// Basic stat update functions
function updateClassStats() {
    // Basic implementation - can be expanded
    autoSaveCharacter();
}

function updateRaceStats() {
    // Basic implementation - can be expanded
    autoSaveCharacter();
}

function updateClassDescription() {
    const classSelect = document.getElementById('character-class');
    const descField = document.getElementById('class-description');
    const effectsField = document.getElementById('class-effects');
    const descFieldContainer = document.getElementById('class-description-field');
    const effectsFieldContainer = document.getElementById('class-effects-field');

    if (!classSelect || !descField || !effectsField) return;

    const selectedClass = classSelect.value;

    if (selectedClass && classData[selectedClass]) {
        const data = classData[selectedClass];
        descField.value = data.description;
        effectsField.value = data.effects;
        descFieldContainer.style.display = 'block';
        effectsFieldContainer.style.display = 'block';
    } else {
        descFieldContainer.style.display = 'none';
        effectsFieldContainer.style.display = 'none';
    }
}

function updateRaceDescription() {
    const raceSelect = document.getElementById('character-race');
    const descField = document.getElementById('race-description');
    const effectsField = document.getElementById('race-effects');
    const descFieldContainer = document.getElementById('race-description-field');
    const effectsFieldContainer = document.getElementById('race-effects-field');

    if (!raceSelect || !descField || !effectsField) return;

    const selectedRace = raceSelect.value;

    if (selectedRace && raceData[selectedRace]) {
        const data = raceData[selectedRace];
        descField.value = data.description;
        effectsField.value = data.effects;
        descFieldContainer.style.display = 'block';
        effectsFieldContainer.style.display = 'block';
    } else {
        descFieldContainer.style.display = 'none';
        effectsFieldContainer.style.display = 'none';
    }
}

function updateBackgroundDescription() {
    const backgroundSelect = document.getElementById('character-background');
    const descField = document.getElementById('background-description');
    const effectsField = document.getElementById('background-effects');
    const descFieldContainer = document.getElementById('background-description-field');
    const effectsFieldContainer = document.getElementById('background-effects-field');

    if (!backgroundSelect || !descField || !effectsField) return;

    const selectedBackground = backgroundSelect.value;

    if (selectedBackground && backgroundData[selectedBackground]) {
        const data = backgroundData[selectedBackground];
        descField.value = data.description;
        effectsField.value = data.effects;
        descFieldContainer.style.display = 'block';
        effectsFieldContainer.style.display = 'block';
    } else {
        descFieldContainer.style.display = 'none';
        effectsFieldContainer.style.display = 'none';
    }
}

function updateEquipmentDescription(equipmentType) {
    const selectElement = document.getElementById(equipmentType);
    const descField = document.getElementById(`${equipmentType}-description`);
    const effectsField = document.getElementById(`${equipmentType}-effects`);
    const descFieldContainer = document.getElementById(`${equipmentType}-description-field`);
    const effectsFieldContainer = document.getElementById(`${equipmentType}-effects-field`);

    if (!selectElement || !effectsField) return;

    const selectedItem = selectElement.value;
    let data = null;

    // Determine which data source to use based on equipment type
    if (equipmentType.includes('weapon')) {
        data = weaponData[selectedItem];
    } else if (equipmentType === 'armor') {
        data = armorData[selectedItem];
    } else if (equipmentType === 'omni-tool') {
        data = omniToolData[selectedItem];
    } else if (equipmentType === 'biotic-amp') {
        data = bioticAmpData[selectedItem];
    }

    if (selectedItem && data) {
        // Only show description for weapons and armor
        if (descField && (equipmentType.includes('weapon') || equipmentType === 'armor')) {
            descField.value = data.description;
            descFieldContainer.style.display = 'block';
        }

        // Always show effects for all equipment types
        effectsField.value = data.effects;
        effectsFieldContainer.style.display = 'block';
    } else {
        // Hide both fields when nothing is selected
        if (descFieldContainer) descFieldContainer.style.display = 'none';
        effectsFieldContainer.style.display = 'none';
    }
}

// Random character generation (simplified version)
function generateRandomCharacter() {
    if (!confirm(`This will overwrite Character ${currentCharacterIndex} with a randomly generated one. Continue?`)) {
        return;
    }

    // Simple random character generation
    const names = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn'];
    const classes = ['Soldier', 'Engineer', 'Adept', 'Vanguard', 'Sentinel', 'Infiltrator'];
    const races = ['Human', 'Asari', 'Turian', 'Krogan', 'Salarian', 'Quarian'];

    setValue('character-name', getRandomItem(names));
    setValue('character-class', getRandomItem(classes));
    setValue('character-race', getRandomItem(races));
    setValue('health', Math.floor(Math.random() * 5) + 1);
    setValue('combat', Math.floor(Math.random() * 5) + 1);
    setValue('evasion', Math.floor(Math.random() * 5) + 1);
    setValue('charisma', Math.floor(Math.random() * 5) + 1);
    setValue('tech', Math.floor(Math.random() * 5) + 1);
    setValue('biotics', Math.floor(Math.random() * 5) + 1);

    autoSaveCharacter();
    updateTabNames();

    alert(`Generated random character for Character ${currentCharacterIndex}!`);
}

// Helper functions
function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value;
    }
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// =========================
// STATUS EFFECTS SYSTEM
// =========================

function getEffectType(effectName) {
    const debuffs = ['Stunned', 'Dazed', 'Knocked Prone', 'Lifted', 'Frozen', 'Burning', 'Poisoned', 'Bleeding', 'Blinded', 'Deafened', 'Slowed', 'Weakened', 'Dominated', 'Immobilized'];
    const buffs = ['Biotic Barrier', 'Shield Boost', 'Adrenaline Rush', 'Enhanced Reflexes', 'Combat Stimulant', 'Tactical Advantage'];
    const conditions = ['Heavy Injury', 'Critical Injury', 'Exhausted', 'Overheated', 'System Malfunction'];
    const environmental = ['In Cover', 'Exposed', 'Zero Gravity', 'Toxic Atmosphere', 'Extreme Heat', 'Extreme Cold'];

    if (debuffs.includes(effectName)) return 'debuff';
    if (buffs.includes(effectName)) return 'buff';
    if (conditions.includes(effectName)) return 'condition';
    if (environmental.includes(effectName)) return 'environmental';
    return 'other';
}

function extractTurnCount(duration) {
    // Extract numeric value from duration strings like "3 turns", "2 rounds"
    const match = duration.match(/^(\d+)\s+(turn|round)s?$/);
    if (match) {
        return parseInt(match[1]);
    }

    // For non-numeric durations, return null (no turn counter)
    return null;
}

function updateAddButtonState() {
    const addBtn = document.getElementById('add-effect-btn');
    const effectSelect = document.getElementById('effect-select');
    const durationSelect = document.getElementById('duration-select');

    if (addBtn && effectSelect && durationSelect) {
        const effectSelected = effectSelect.value !== '';
        const durationSelected = durationSelect.value !== '';

        addBtn.disabled = !(effectSelected && durationSelected);
    }
}

function addStatusEffect() {
    const effectSelect = document.getElementById('effect-select');
    const durationSelect = document.getElementById('duration-select');

    if (!effectSelect || !durationSelect) return;

    const effectName = effectSelect.value;
    const duration = durationSelect.value;

    if (!effectName || !duration) {
        alert('Please select both an effect and duration.');
        return;
    }

    // Check if effect already exists
    const existingEffect = activeStatusEffects.find(effect => effect.name === effectName);
    if (existingEffect) {
        if (confirm(`${effectName} is already active. Replace with new duration?`)) {
            removeStatusEffect(existingEffect.id);
        } else {
            return;
        }
    }

    // Create new effect
    const newEffect = {
        id: generateId(),
        name: effectName,
        duration: duration,
        type: getEffectType(effectName),
        timestamp: Date.now(),
        turnsRemaining: extractTurnCount(duration)
    };

    activeStatusEffects.push(newEffect);

    // Reset dropdowns
    effectSelect.value = '';
    durationSelect.value = '';
    updateAddButtonState();

    // Update display and save
    updateStatusEffectsDisplay();
    autoSaveCharacter();
}

function removeStatusEffect(effectId) {
    activeStatusEffects = activeStatusEffects.filter(effect => effect.id !== effectId);
    updateStatusEffectsDisplay();
    autoSaveCharacter();
}

function updateStatusEffectsDisplay() {
    const container = document.getElementById('active-effects');
    if (!container) return;

    if (activeStatusEffects.length === 0) {
        container.innerHTML = '<div class="no-effects-message">No active status effects</div>';
        return;
    }

    container.innerHTML = activeStatusEffects.map(effect => {
        const hasTurnCounter = effect.turnsRemaining !== null && effect.turnsRemaining !== undefined;

        return `
            <div class="effect-item effect-type-${effect.type}" data-effect-id="${effect.id}">
                <div class="effect-info">
                    <div class="effect-name">${effect.name}</div>
                    <div class="effect-duration">${effect.duration}</div>
                </div>
                ${hasTurnCounter ? `
                    <div class="turn-counter">
                        <label class="counter-label">Turns:</label>
                        <div class="counter-controls">
                            <button class="counter-btn minus" onclick="adjustTurnCount('${effect.id}', -1)" title="Decrease turns">-</button>
                            <span class="turn-count ${effect.turnsRemaining <= 0 ? 'expired' : ''}">${effect.turnsRemaining}</span>
                            <button class="counter-btn plus" onclick="adjustTurnCount('${effect.id}', 1)" title="Increase turns">+</button>
                        </div>
                    </div>
                ` : ''}
                <button class="remove-effect-btn" onclick="removeStatusEffect('${effect.id}')" title="Remove effect">
                    ×
                </button>
            </div>
        `;
    }).join('');
}

function adjustTurnCount(effectId, delta) {
    const effect = activeStatusEffects.find(e => e.id === effectId);
    if (!effect || effect.turnsRemaining === null) return;

    effect.turnsRemaining = Math.max(0, effect.turnsRemaining + delta);

    // Auto-remove effect if turns reach 0 and user confirms
    if (effect.turnsRemaining === 0) {
        const shouldRemove = confirm(`${effect.name} has expired (0 turns remaining). Remove it?`);
        if (shouldRemove) {
            removeStatusEffect(effectId);
            return;
        }
    }

    updateStatusEffectsDisplay();
    autoSaveCharacter();
}

function clearAllStatusEffects() {
    if (activeStatusEffects.length === 0) return;

    if (confirm('Remove all status effects?')) {
        activeStatusEffects = [];
        updateStatusEffectsDisplay();
        autoSaveCharacter();
    }
}

// Utility function to advance all turn-based effects by 1 turn
function advanceAllTurnCounters() {
    let expiredEffects = [];

    activeStatusEffects.forEach(effect => {
        if (effect.turnsRemaining !== null && effect.turnsRemaining > 0) {
            effect.turnsRemaining -= 1;
            if (effect.turnsRemaining === 0) {
                expiredEffects.push(effect);
            }
        }
    });

    if (expiredEffects.length > 0) {
        const expiredNames = expiredEffects.map(e => e.name).join(', ');
        const shouldRemove = confirm(`The following effects have expired: ${expiredNames}\n\nRemove them?`);

        if (shouldRemove) {
            expiredEffects.forEach(effect => {
                removeStatusEffect(effect.id);
            });
        }
    }

    updateStatusEffectsDisplay();
    autoSaveCharacter();
}

// =========================
// POWERS MANAGEMENT SYSTEM
// =========================

function setupPowersListeners() {
    // Biotic Powers
    const bioticPowerSelect = document.getElementById('biotic-power-select');
    const addBioticPowerBtn = document.getElementById('add-biotic-power-btn');

    if (bioticPowerSelect && addBioticPowerBtn) {
        bioticPowerSelect.addEventListener('change', () => {
            addBioticPowerBtn.disabled = !bioticPowerSelect.value;
        });

        addBioticPowerBtn.addEventListener('click', () => {
            addBioticPower();
        });
    }

    // Tech Powers
    const techPowerSelect = document.getElementById('tech-power-select');
    const addTechPowerBtn = document.getElementById('add-tech-power-btn');

    if (techPowerSelect && addTechPowerBtn) {
        techPowerSelect.addEventListener('change', () => {
            addTechPowerBtn.disabled = !techPowerSelect.value;
        });

        addTechPowerBtn.addEventListener('click', () => {
            addTechPower();
        });
    }
}

function addBioticPower() {
    const select = document.getElementById('biotic-power-select');
    const powerName = select.value;

    if (!powerName || activeBioticPowers.find(p => p.name === powerName)) {
        return; // Already has this power
    }

    const power = {
        id: bioticPowerIdCounter++,
        name: powerName,
        description: bioticPowersData[powerName]?.description || '',
        effects: bioticPowersData[powerName]?.effects || ''
    };

    activeBioticPowers.push(power);
    updateBioticPowersDisplay();
    autoSaveCharacter();

    // Reset selection
    select.value = '';
    document.getElementById('add-biotic-power-btn').disabled = true;
}

function addTechPower() {
    const select = document.getElementById('tech-power-select');
    const powerName = select.value;

    if (!powerName || activeTechPowers.find(p => p.name === powerName)) {
        return; // Already has this power
    }

    const power = {
        id: techPowerIdCounter++,
        name: powerName,
        description: techPowersData[powerName]?.description || '',
        effects: techPowersData[powerName]?.effects || ''
    };

    activeTechPowers.push(power);
    updateTechPowersDisplay();
    autoSaveCharacter();

    // Reset selection
    select.value = '';
    document.getElementById('add-tech-power-btn').disabled = true;
}

function removeBioticPower(powerId) {
    activeBioticPowers = activeBioticPowers.filter(power => power.id !== powerId);
    updateBioticPowersDisplay();
    autoSaveCharacter();
}

function removeTechPower(powerId) {
    activeTechPowers = activeTechPowers.filter(power => power.id !== powerId);
    updateTechPowersDisplay();
    autoSaveCharacter();
}

function updateBioticPowersDisplay() {
    const container = document.getElementById('active-biotic-powers');
    const noMessage = document.getElementById('no-biotic-powers-message');

    if (!container) return;

    if (activeBioticPowers.length === 0) {
        if (noMessage) noMessage.style.display = 'block';
        container.innerHTML = container.innerHTML.includes('no-powers-message') ?
            container.innerHTML : '<div class="no-powers-message">No biotic powers selected. Choose from the dropdown above to add powers.</div>';
        return;
    }

    if (noMessage) noMessage.style.display = 'none';

    container.innerHTML = activeBioticPowers.map(power => `
        <div class="power-item" data-power-id="${power.id}">
            <div class="power-header">
                <h4 class="power-name">${power.name}</h4>
                <button class="remove-power-btn" onclick="removeBioticPower(${power.id})" title="Remove Power">
                    ×
                </button>
            </div>
            <div class="power-content">
                <div class="power-description">
                    <strong>Description:</strong>
                    <p>${power.description}</p>
                </div>
                <div class="power-effects">
                    <strong>Effects:</strong>
                    <p>${power.effects.replace(/\n/g, '<br>')}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function updateTechPowersDisplay() {
    const container = document.getElementById('active-tech-powers');
    const noMessage = document.getElementById('no-tech-powers-message');

    if (!container) return;

    if (activeTechPowers.length === 0) {
        if (noMessage) noMessage.style.display = 'block';
        container.innerHTML = container.innerHTML.includes('no-powers-message') ?
            container.innerHTML : '<div class="no-powers-message">No tech powers selected. Choose from the dropdown above to add powers.</div>';
        return;
    }

    if (noMessage) noMessage.style.display = 'none';

    container.innerHTML = activeTechPowers.map(power => `
        <div class="power-item" data-power-id="${power.id}">
            <div class="power-header">
                <h4 class="power-name">${power.name}</h4>
                <button class="remove-power-btn" onclick="removeTechPower(${power.id})" title="Remove Power">
                    ×
                </button>
            </div>
            <div class="power-content">
                <div class="power-description">
                    <strong>Description:</strong>
                    <p>${power.description}</p>
                </div>
                <div class="power-effects">
                    <strong>Effects:</strong>
                    <p>${power.effects.replace(/\n/g, '<br>')}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showView,
        rollDice,
        parseDiceFormula,
        switchCharacter,
        generateRandomCharacter,
        APP_CONFIG
    };
}