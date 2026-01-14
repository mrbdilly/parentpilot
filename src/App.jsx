import React, { useState } from 'react';
import { Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

const activities = [
  { id: 1, name: "Sensory Basket Exploration", age: "12-18mo", setting: "home", time: 20, energy: "low", cost: "free", materials: "Basket, safe household items (spoon, soft cloth, ball, cup)", description: "Babies explore different textures, shapes, and sounds by pulling items out of a basket and examining them." },
  { id: 2, name: "Tupperware Tower", age: "12-18mo", setting: "home", time: 20, energy: "low", cost: "free", materials: "Tupperware, lids", description: "Stack and knock down plastic containers to learn about sizes and cause-and-effect." },
  { id: 3, name: "Mirror Play Time", age: "12-18mo", setting: "home", time: 20, energy: "low", cost: "free", materials: "Handheld or wall mirror", description: "Explore reflections and make faces together to build self-awareness." },
  { id: 4, name: "Ball Drop Game", age: "12-18mo", setting: "home", time: 20, energy: "low", cost: "free", materials: "Balls, boxes, paper towel tubes", description: "Drop balls into containers or down cardboard tubes to develop hand-eye coordination." },
  { id: 5, name: "Book Browsing", age: "12-18mo", setting: "home", time: 20, energy: "low", cost: "free", materials: "Board books", description: "Look at board books together, point and name objects to build early language skills." },
  { id: 6, name: "Texture Touch Board", age: "12-18mo", setting: "home", time: 20, energy: "low", cost: "free", materials: "Cardboard, fabric scraps, glue", description: "Feel different fabrics glued to cardboard for tactile exploration." },
  { id: 7, name: "Couch Cushion Climb", age: "12-18mo", setting: "home", time: 20, energy: "medium", cost: "free", materials: "Couch cushions, pillows", description: "Arrange cushions on the floor to create a safe climbing and crawling obstacle course." },
  { id: 8, name: "Push & Pull Toys", age: "12-18mo", setting: "home", time: 45, energy: "medium", cost: "free", materials: "Push/pull toys", description: "Walk behind push toys or pull along stuffed animals to practice walking." },
  { id: 9, name: "Container Fill & Dump", age: "12-18mo", setting: "home", time: 30, energy: "medium", cost: "free", materials: "Bowls, safe objects (blocks, balls)", description: "Transfer objects between bowls and containers to develop fine motor skills." },
  { id: 10, name: "Balloon Tap", age: "12-18mo", setting: "home", time: 20, energy: "medium", cost: "free", materials: "Balloon", description: "Gently tap a balloon back and forth together (always supervised)." },
  { id: 11, name: "Dance Party", age: "12-18mo", setting: "home", time: 20, energy: "medium", cost: "free", materials: "Music player", description: "Play music and bounce, sway, clap together to build rhythm." },
  { id: 12, name: "Tunnel Crawl", age: "12-18mo", setting: "home", time: 30, energy: "high", cost: "free", materials: "Play tunnel or chairs with blanket", description: "Crawl through play tunnel or under chairs draped with blankets." },
  { id: 13, name: "Chase & Catch", age: "12-18mo", setting: "home", time: 20, energy: "high", cost: "free", materials: "None", description: "Crawl or toddle after each other around the house for active play." },
  { id: 14, name: "Stroller Nature Walk", age: "12-18mo", setting: "out", time: 45, energy: "low", cost: "free", materials: "Stroller, snacks, water", description: "Go on a slow walk and point out birds, trees, cars, and sounds to build early language skills." },
  { id: 15, name: "Window Shopping Walk", age: "12-18mo", setting: "out", time: 45, energy: "low", cost: "free", materials: "Stroller", description: "Stroll and look at store displays, people-watch for visual stimulation." },
  { id: 16, name: "Pet Store Visit", age: "12-18mo", setting: "out", time: 30, energy: "low", cost: "free", materials: "None", description: "Look at fish, birds, and small animals to learn about creatures." },
  { id: 17, name: "Baby Swing Time", age: "12-18mo", setting: "out", time: 30, energy: "medium", cost: "free", materials: "None", description: "Swing at playground with bucket swings for vestibular development." },
  { id: 18, name: "Splash Pad Visit", age: "12-18mo", setting: "out", time: 90, energy: "medium", cost: "free", materials: "Swimsuit, towel, sunscreen", description: "Play in shallow water at splash pad during warm weather." },
  { id: 19, name: "Toddler Play Space", age: "12-18mo", setting: "out", time: 120, energy: "high", cost: "paid", materials: "Socks, water bottle", description: "Visit indoor play area with soft climbing structures and slides." },
  { id: 20, name: "Beach or Lake Visit", age: "12-18mo", setting: "out", time: 150, energy: "high", cost: "free", materials: "Bucket, shovel, swimsuit, sunscreen", description: "Play in sand and shallow water with close supervision." },
  { id: 21, name: "Sticker Sorting", age: "18-24mo", setting: "home", time: 20, energy: "low", cost: "paid", materials: "Stickers, paper", description: "Toddlers practice fine motor skills by peeling and placing stickers onto paper." },
  { id: 22, name: "Playdough Squish", age: "18-24mo", setting: "home", time: 45, energy: "low", cost: "free", materials: "Playdough", description: "Squeeze, poke, and flatten playdough for sensory exploration." },
  { id: 23, name: "Magnet Play", age: "18-24mo", setting: "home", time: 20, energy: "low", cost: "free", materials: "Large magnets, metal surface", description: "Stick magnets on fridge or cookie sheet to learn about magnetic force." },
  { id: 24, name: "Coloring Time", age: "18-24mo", setting: "home", time: 45, energy: "low", cost: "free", materials: "Crayons, paper", description: "Scribble with chunky crayons on paper to develop pre-writing skills." },
  { id: 25, name: "Puzzle Practice", age: "18-24mo", setting: "home", time: 20, energy: "low", cost: "free", materials: "3-5 piece puzzles", description: "Complete simple wooden puzzles with knobs for problem-solving." },
  { id: 26, name: "Sorting Game", age: "18-24mo", setting: "home", time: 45, energy: "low", cost: "free", materials: "Toys or household objects", description: "Sort items by type like animals, vehicles, or colors." },
  { id: 27, name: "Water Transfer", age: "18-24mo", setting: "home", time: 45, energy: "low", cost: "free", materials: "Plastic containers, water, towels", description: "Use cups to pour water between containers for fine motor practice." },
  { id: 28, name: "Building Blocks", age: "18-24mo", setting: "home", time: 45, energy: "medium", cost: "free", materials: "Building blocks", description: "Stack and knock down soft or wooden blocks to learn about balance." },
  { id: 29, name: "Toy Car Race", age: "18-24mo", setting: "home", time: 45, energy: "medium", cost: "free", materials: "Toy cars, cardboard ramps", description: "Push cars down ramps or along the floor for cause-and-effect learning." },
  { id: 30, name: "Dress-Up Play", age: "18-24mo", setting: "home", time: 45, energy: "medium", cost: "free", materials: "Dress-up clothes", description: "Try on hats, scarves, and big shoes for imaginative play." },
  { id: 31, name: "Bubble Chase", age: "18-24mo", setting: "home", time: 20, energy: "medium", cost: "free", materials: "Bubble solution", description: "Blow bubbles for them to pop and chase around the room." },
  { id: 32, name: "Animal Sounds Game", age: "18-24mo", setting: "home", time: 20, energy: "medium", cost: "free", materials: "Toy animals", description: "Identify toy animals and make their sounds together." },
  { id: 33, name: "Music & Movement Party", age: "18-24mo", setting: "home", time: 20, energy: "high", cost: "free", materials: "Music player", description: "Play upbeat songs and dance, jump, and wiggle together to burn energy and build coordination." },
  { id: 34, name: "Indoor Obstacle Course", age: "18-24mo", setting: "home", time: 45, energy: "high", cost: "free", materials: "Pillows, cushions, tape", description: "Crawl, climb, and jump over pillows and toys in a safe course." },
  { id: 35, name: "Follow the Leader", age: "18-24mo", setting: "home", time: 20, energy: "high", cost: "free", materials: "None", description: "Copy movements like jumping, clapping, spinning for coordination." },
  { id: 36, name: "Ball Pit Play", age: "18-24mo", setting: "home", time: 45, energy: "high", cost: "paid", materials: "Plastic balls, large container", description: "Jump and play in homemade ball pit for sensory fun." },
  { id: 37, name: "Grocery Store Trip", age: "18-24mo", setting: "out", time: 45, energy: "low", cost: "free", materials: "Shopping list", description: "Name fruits, vegetables, and colors while shopping together." },
  { id: 38, name: "Aquarium Visit", age: "18-24mo", setting: "out", time: 90, energy: "low", cost: "paid", materials: "None", description: "Watch fish and sea creatures swim in tanks." },
  { id: 39, name: "Farmer's Market Stroll", age: "18-24mo", setting: "out", time: 90, energy: "medium", cost: "free", materials: "Snacks, stroller", description: "Look at produce, flowers, and food vendors together." },
  { id: 40, name: "Children's Museum", age: "18-24mo", setting: "out", time: 150, energy: "medium", cost: "paid", materials: "Membership or admission", description: "Explore toddler areas with hands-on exhibits and activities." },
  { id: 41, name: "Playground Free Play", age: "18-24mo", setting: "out", time: 45, energy: "high", cost: "free", materials: "Snacks, water, sunscreen", description: "Let your toddler climb, slide, and explore freely at a playground while you supervise." },
  { id: 42, name: "Toddler Gym Class", age: "18-24mo", setting: "out", time: 90, energy: "high", cost: "paid", materials: "Gym membership, socks", description: "Structured movement and play at local gym with other toddlers." },
  { id: 43, name: "Park Exploration", age: "18-24mo", setting: "out", time: 90, energy: "high", cost: "free", materials: "Bucket, snacks", description: "Climb on logs, collect sticks and rocks for nature exploration." },
  { id: 44, name: "Color Sorting Game", age: "2-3yr", setting: "home", time: 20, energy: "low", cost: "free", materials: "Colored toys or blocks, bowls", description: "Kids sort objects by color, helping build early math and categorization skills." },
  { id: 45, name: "Matching Game", age: "2-3yr", setting: "home", time: 45, energy: "low", cost: "free", materials: "Memory cards or duplicate toys", description: "Match pairs of cards or objects to develop memory skills." },
  { id: 46, name: "Playdough Creations", age: "2-3yr", setting: "home", time: 45, energy: "low", cost: "free", materials: "Playdough, cookie cutters, rolling pin", description: "Roll snakes, make shapes, use cookie cutters for creative play." },
  { id: 47, name: "Painting Fun", age: "2-3yr", setting: "home", time: 45, energy: "low", cost: "paid", materials: "Paint, paper, brushes, smock", description: "Paint with watercolors or finger paints to explore colors and creativity." },
  { id: 48, name: "Cutting Practice", age: "2-3yr", setting: "home", time: 45, energy: "low", cost: "free", materials: "Safety scissors, paper or playdough", description: "Cut playdough or paper with safety scissors for fine motor development." },
  { id: 49, name: "Stringing Beads", age: "2-3yr", setting: "home", time: 45, energy: "low", cost: "free", materials: "Large beads, string", description: "Thread large beads onto string for hand-eye coordination." },
  { id: 50, name: "Simple Baking", age: "2-3yr", setting: "home", time: 90, energy: "low", cost: "free", materials: "Recipe ingredients, bowls", description: "Help stir, pour, and mix simple recipes like muffins or cookies." },
  { id: 51, name: "Pretend Restaurant", age: "2-3yr", setting: "home", time: 45, energy: "medium", cost: "free", materials: "Toy food, plates, paper, crayons", description: "Your child takes orders, serves food, and plays pretend, building imagination and social skills." },
  { id: 52, name: "Doctor's Office Play", age: "2-3yr", setting: "home", time: 45, energy: "medium", cost: "free", materials: "Toy doctor kit, stuffed animals", description: "Use toy medical kit to check up on stuffed animals and dolls." },
  { id: 53, name: "Train Track Building", age: "2-3yr", setting: "home", time: 45, energy: "medium", cost: "free", materials: "Train set", description: "Build tracks and push trains around for spatial reasoning." },
  { id: 54, name: "Hide and Seek", age: "2-3yr", setting: "home", time: 45, energy: "medium", cost: "free", materials: "None", description: "Take turns hiding and finding each other around the house." },
  { id: 55, name: "Puppet Show", age: "2-3yr", setting: "home", time: 45, energy: "medium", cost: "free", materials: "Puppets or stuffed animals", description: "Put on a show with hand puppets or stuffed animals." },
  { id: 56, name: "Fort Building", age: "2-3yr", setting: "home", time: 90, energy: "medium", cost: "free", materials: "Blankets, chairs, pillows", description: "Build blanket fort and play inside with books or toys." },
  { id: 57, name: "Simple Board Games", age: "2-3yr", setting: "home", time: 45, energy: "medium", cost: "paid", materials: "Board games (Candyland, First Orchard)", description: "Play toddler-appropriate games to learn turn-taking." },
  { id: 58, name: "Backyard Obstacle Course", age: "2-3yr", setting: "home", time: 45, energy: "high", cost: "free", materials: "Cones, pillows, hula hoops, boxes", description: "Create a simple course to crawl under, jump over, and run around to build gross motor skills." },
  { id: 59, name: "Dance Freeze", age: "2-3yr", setting: "home", time: 20, energy: "high", cost: "free", materials: "Music player", description: "Dance to music, freeze when it stops for listening skills." },
  { id: 60, name: "Simon Says", age: "2-3yr", setting: "home", time: 20, energy: "high", cost: "free", materials: "None", description: "Follow movement commands for body awareness and listening." },
  { id: 61, name: "Indoor Bowling", age: "2-3yr", setting: "home", time: 45, energy: "high", cost: "free", materials: "Plastic bottles, ball", description: "Knock down plastic bottles with a ball for hand-eye coordination." },
  { id: 62, name: "Trampoline Time", age: "2-3yr", setting: "home", time: 20, energy: "high", cost: "paid", materials: "Toddler trampoline", description: "Jump on small indoor trampoline with close supervision." },
  { id: 63, name: "Bookstore Browse", age: "2-3yr", setting: "out", time: 45, energy: "low", cost: "free", materials: "None", description: "Look at books and read together in kids section." },
  { id: 64, name: "Train or Bus Ride", age: "2-3yr", setting: "out", time: 90, energy: "low", cost: "paid", materials: "Transit fare", description: "Take public transit just for the experience and observation." },
  { id: 65, name: "Coffee Shop Date", age: "2-3yr", setting: "out", time: 45, energy: "low", cost: "paid", materials: "Money for snacks", description: "Get a treat and watch the world go by together." },
  { id: 66, name: "Library Storytime Trip", age: "2-3yr", setting: "out", time: 90, energy: "medium", cost: "free", materials: "Library card, snacks", description: "Attend a storytime session or browse books together to build early literacy skills." },
  { id: 67, name: "Nature Scavenger Hunt", age: "2-3yr", setting: "out", time: 90, energy: "medium", cost: "free", materials: "Printed list, bag", description: "Find items on a simple list like leaf, rock, flower in nature." },
  { id: 68, name: "Zoo Trip", age: "2-3yr", setting: "out", time: 150, energy: "medium", cost: "paid", materials: "Zoo admission, snacks", description: "Visit animals and talk about what they eat and do." },
  { id: 69, name: "Mini Golf", age: "2-3yr", setting: "out", time: 90, energy: "medium", cost: "paid", materials: "Admission", description: "Try a few holes at toddler-friendly mini golf course." },
  { id: 70, name: "Bike Ride", age: "2-3yr", setting: "out", time: 45, energy: "medium", cost: "free", materials: "Bike, trailer or balance bike", description: "Ride in bike trailer or on balance bike around neighborhood." },
  { id: 71, name: "Swimming", age: "2-3yr", setting: "out", time: 90, energy: "high", cost: "paid", materials: "Swimsuit, towels, floaties", description: "Swim at pool or beach with flotation devices and supervision." },
  { id: 72, name: "Hiking Easy Trail", age: "2-3yr", setting: "out", time: 90, energy: "high", cost: "free", materials: "Stroller or carrier, snacks, water", description: "Walk a short, flat nature trail together." },
  { id: 73, name: "Sports Class", age: "2-3yr", setting: "out", time: 90, energy: "high", cost: "paid", materials: "Class fee, athletic clothes", description: "Soccer, tumbling, or other toddler sports for structured play." },
  { id: 74, name: "Trampoline Park", age: "2-3yr", setting: "out", time: 90, energy: "high", cost: "paid", materials: "Admission, grip socks", description: "Bounce in toddler-only area at trampoline park." }
];

export default function ParentPilot() {
  const [step, setStep] = useState('input');
  const [age, setAge] = useState('');
  const [energy, setEnergy] = useState('medium');
  const [setting, setSetting] = useState('either');
  const [suggestions, setSuggestions] = useState([]);
  const [completedActivities, setCompletedActivities] = useState([]);

  const energyOptions = [
    { value: 'low', label: 'Exhausted', emoji: '😴', description: 'Supervision only' },
    { value: 'medium', label: 'Moderate', emoji: '😊', description: 'Some participation' },
    { value: 'high', label: 'Energized', emoji: '⚡', description: 'Full engagement' }
  ];

  const findActivities = () => {
    let filtered = activities.filter(activity => {
      const ageMatch = activity.age === age;
      const settingMatch = setting === 'either' || activity.setting === setting;
      const energyMatch = activity.energy === energy || (energy === 'high' && activity.energy === 'medium');
      return ageMatch && settingMatch && energyMatch;
    });

    if (filtered.length === 0) {
      filtered = activities.filter(activity => {
        const ageMatch = activity.age === age;
        const settingMatch = setting === 'either' || activity.setting === setting;
        return ageMatch && settingMatch;
      });
    }

    const shuffled = filtered.sort(() => Math.random() - 0.5);
    setSuggestions(shuffled.slice(0, Math.min(4, shuffled.length)));
    setStep('results');
  };

  const handleShuffle = () => {
    let filtered = activities.filter(activity => {
      const ageMatch = activity.age === age;
      const settingMatch = setting === 'either' || activity.setting === setting;
      const energyMatch = activity.energy === energy || (energy === 'high' && activity.energy === 'medium');
      return ageMatch && settingMatch && energyMatch;
    });

    if (filtered.length === 0) {
      filtered = activities.filter(activity => {
        const ageMatch = activity.age === age;
        const settingMatch = setting === 'either' || activity.setting === setting;
        return ageMatch && settingMatch;
      });
    }

    const currentIds = suggestions.map(s => s.id);
    let newFiltered = filtered.filter(a => !currentIds.includes(a.id));
    
    if (newFiltered.length === 0) {
      newFiltered = filtered;
    }

    const shuffled = newFiltered.sort(() => Math.random() - 0.5);
    setSuggestions(shuffled.slice(0, Math.min(4, shuffled.length)));
  };

  const handleDidThis = (activityId) => {
    setCompletedActivities([...completedActivities, activityId]);
  };

  const resetForm = () => {
    setStep('input');
    setAge('');
    setEnergy('medium');
    setSetting('either');
    setSuggestions([]);
  };

  if (step === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 sm:p-8">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap');
          body { font-family: 'Comic Neue', cursive; font-weight: 300; }
        `}</style>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-10 h-10 text-amber-600" strokeWidth={2.5} />
              <h1 className="text-6xl font-bold text-gray-900">ParentPilot</h1>
            </div>
            <p className="text-2xl text-gray-700 mb-8">
              Parenting is hard. Let's make it easier.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-10">
            <div className="text-center mb-6">
              <p className="text-lg text-gray-600">
                Get personalized toddler activities in under 2 minutes
              </p>
            </div>
            <div>
              <label className="block text-xl font-bold text-gray-900 mb-5">
                How old is your toddler?
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['12-18mo', '18-24mo', '2-3yr'].map((ageOption) => (
                  <button
                    key={ageOption}
                    onClick={() => setAge(ageOption)}
                    className={`py-5 px-6 rounded-2xl font-bold text-lg transition-all ${
                      age === ageOption
                        ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xl scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {ageOption}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xl font-bold text-gray-900 mb-5">
                What is your energy level right now?
              </label>
              <div className="grid grid-cols-3 gap-4">
                {energyOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setEnergy(option.value)}
                    className={`py-6 px-4 rounded-2xl font-bold transition-all ${
                      energy === option.value
                        ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-xl scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className="text-lg">{option.label}</div>
                    <div className={`text-sm mt-1 ${energy === option.value ? 'text-white opacity-90' : 'text-gray-500'}`}>
                      {option.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xl font-bold text-gray-900 mb-5">
                Where do you want to be?
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'home', label: 'Home', emoji: '🏠' },
                  { value: 'out', label: 'Out & About', emoji: '🌳' },
                  { value: 'either', label: 'Either', emoji: '✨' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSetting(option.value)}
                    className={`py-5 px-6 rounded-2xl font-bold text-lg transition-all ${
                      setting === option.value
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-xl scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.emoji}</div>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={findActivities}
              disabled={!age}
              className={`w-full py-6 rounded-2xl font-bold text-2xl transition-all ${
                age
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white hover:shadow-2xl hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Find Activities ✨
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 sm:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap');
        body { font-family: 'Comic Neue', cursive; font-weight: 300; }
      `}</style>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Here are your activities!
          </h1>
          <p className="text-lg text-gray-600">
            {age} · {energyOptions.find(e => e.value === energy).label} energy · {setting === 'either' ? 'Anywhere' : setting === 'home' ? 'At home' : 'Out & about'}
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <button
            onClick={resetForm}
            className="bg-white text-gray-700 px-6 py-3 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
          >
            ← Back
          </button>

          {suggestions.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <p className="text-xl text-gray-600 mb-6">
                No activities found for these filters. Try adjusting your preferences!
              </p>
              <button
                onClick={resetForm}
                className="bg-gradient-to-br from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Try Again
              </button>
            </div>
          ) : (
            suggestions.map((activity) => (
              <div key={activity.id} className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">
                      {activity.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm font-semibold">
                      <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
                        ⏱️ {activity.time} min
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                        {activity.setting === 'home' ? '🏠' : '🌳'} {activity.setting === 'home' ? 'Home' : 'Out & about'}
                      </span>
                      <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
                        {activity.cost === 'free' ? '💰 Free' : '💵 Paid'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-5 leading-relaxed">
                  {activity.description}
                </p>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 mb-5">
                  <p className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Materials needed:
                  </p>
                  <p className="text-gray-600">{activity.materials}</p>
                </div>

                <button
                  onClick={() => handleDidThis(activity.id)}
                  disabled={completedActivities.includes(activity.id)}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                    completedActivities.includes(activity.id)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-xl hover:scale-105'
                  }`}
                >
                  {completedActivities.includes(activity.id) ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Did this!
                    </span>
                  ) : (
                    'Mark as Done'
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleShuffle}
            className="flex-1 bg-white text-gray-700 px-6 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            Not feeling it? Shuffle
          </button>
          <button
            onClick={resetForm}
            className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white px-6 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
