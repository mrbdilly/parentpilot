import React, { useState } from 'react';
import { Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

// Activity database - easily editable
const activities = [
  {
    id: 1,
    name: "Sensory Basket Exploration",
    age: "12-18mo",
    setting: "home",
    time: 20,
    energy: "low",
    cost: "free",
    materials: "Basket, safe household items (spoon, soft cloth, ball, cup)",
    description: "Babies explore different textures, shapes, and sounds by pulling items out of a basket and examining them."
  },
  {
    id: 2,
    name: "Couch Cushion Climb",
    age: "12-18mo",
    setting: "home",
    time: 20,
    energy: "medium",
    cost: "free",
    materials: "Couch cushions, pillows",
    description: "Arrange cushions on the floor to create a safe climbing and crawling obstacle course."
  },
  {
    id: 3,
    name: "Stroller Nature Walk",
    age: "12-18mo",
    setting: "out",
    time: 45,
    energy: "low",
    cost: "free",
    materials: "Stroller, snacks, water",
    description: "Go on a slow walk and point out birds, trees, cars, and sounds to build early language skills."
  },
  {
    id: 4,
    name: "Sticker Sorting",
    age: "18-24mo",
    setting: "home",
    time: 20,
    energy: "low",
    cost: "paid",
    materials: "Stickers, paper",
    description: "Toddlers practice fine motor skills by peeling and placing stickers onto paper."
  },
  {
    id: 5,
    name: "Playground Free Play",
    age: "18-24mo",
    setting: "out",
    time: 45,
    energy: "high",
    cost: "free",
    materials: "Snacks, water, sunscreen",
    description: "Let your toddler climb, slide, and explore freely at a playground while you supervise."
  },
  {
    id: 6,
    name: "Music & Movement Party",
    age: "18-24mo",
    setting: "home",
    time: 20,
    energy: "high",
    cost: "free",
    materials: "Music player",
    description: "Play upbeat songs and dance, jump, and wiggle together to burn energy and build coordination."
  },
  {
    id: 7,
    name: "Color Sorting Game",
    age: "2-3yr",
    setting: "home",
    time: 20,
    energy: "low",
    cost: "free",
    materials: "Colored toys or blocks, bowls",
    description: "Kids sort objects by color, helping build early math and categorization skills."
  },
  {
    id: 8,
    name: "Backyard Obstacle Course",
    age: "2-3yr",
    setting: "home",
    time: 45,
    energy: "high",
    cost: "free",
    materials: "Cones, pillows, hula hoops, boxes",
    description: "Create a simple course to crawl under, jump over, and run around to build gross motor skills."
  },
  {
    id: 9,
    name: "Library Storytime Trip",
    age: "2-3yr",
    setting: "out",
    time: 90,
    energy: "medium",
    cost: "free",
    materials: "Library card, snacks",
    description: "Attend a storytime session or browse books together to build early literacy skills."
  },
  {
    id: 10,
    name: "Pretend Restaurant",
    age: "2-3yr",
    setting: "home",
    time: 45,
    energy: "medium",
    cost: "free",
    materials: "Toy food, plates, paper, crayons",
    description: "Your child 'takes orders,' serves food, and plays pretend, building imagination and social skills."
  }
];

export default function ParentPilot() {
  const [step, setStep] = useState('input');
  const [age, setAge] = useState('');
  const [energy, setEnergy] = useState(50);
  const [setting, setSetting] = useState('either');
  const [suggestions, setSuggestions] = useState([]);
  const [completedActivities, setCompletedActivities] = useState([]);

  const energyLevels = {
    low: [0, 33],
    medium: [34, 66],
    high: [67, 100]
  };

  const getEnergyLevel = (value) => {
    if (value <= 33) return 'low';
    if (value <= 66) return 'medium';
    return 'high';
  };

  const getEnergyLabel = (value) => {
    if (value <= 33) return 'Exhausted';
    if (value <= 66) return 'Moderate';
    return 'Energized';
  };

  const findActivities = () => {
    const userEnergyLevel = getEnergyLevel(energy);
    
    let filtered = activities.filter(activity => {
      const ageMatch = activity.age === age;
      const settingMatch = setting === 'either' || activity.setting === setting;
      const energyMatch = activity.energy === userEnergyLevel || 
                         (userEnergyLevel === 'high' && activity.energy === 'medium');
      
      return ageMatch && settingMatch && energyMatch;
    });

    // If no exact matches, broaden the search
    if (filtered.length === 0) {
      filtered = activities.filter(activity => {
        const ageMatch = activity.age === age;
        const settingMatch = setting === 'either' || activity.setting === setting;
        return ageMatch && settingMatch;
      });
    }

    // Shuffle and take top 3-4
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    setSuggestions(shuffled.slice(0, Math.min(4, shuffled.length)));
    setStep('results');
  };

  const handleShuffle = () => {
    findActivities();
  };

  const handleDidThis = (activityId) => {
    setCompletedActivities([...completedActivities, activityId]);
  };

  const resetForm = () => {
    setStep('input');
    setAge('');
    setEnergy(50);
    setSetting('either');
    setSuggestions([]);
  };

  if (step === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 p-4 sm:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-orange-500" />
              <h1 className="text-5xl font-bold text-gray-900">ParentPilot</h1>
            </div>
            <p className="text-xl text-gray-600">
              Get personalized toddler activities in under 2 minutes
            </p>
          </div>

          {/* Input Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
            {/* Age Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                How old is your toddler?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['12-18mo', '18-24mo', '2-3yr'].map((ageOption) => (
                  <button
                    key={ageOption}
                    onClick={() => setAge(ageOption)}
                    className={`py-4 px-6 rounded-2xl font-semibold text-lg transition-all ${
                      age === ageOption
                        ? 'bg-orange-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {ageOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                What's your energy level right now?
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={energy}
                  onChange={(e) => setEnergy(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>😴 Exhausted</span>
                  <span className="font-semibold text-lg text-orange-600">
                    {getEnergyLabel(energy)}
                  </span>
                  <span>⚡ Energized</span>
                </div>
              </div>
            </div>

            {/* Location Preference */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Where do you want to be?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'home', label: '🏠 Home', emoji: '🏠' },
                  { value: 'out', label: '🌳 Out & About', emoji: '🌳' },
                  { value: 'either', label: '✨ Either', emoji: '✨' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSetting(option.value)}
                    className={`py-4 px-6 rounded-2xl font-semibold text-lg transition-all ${
                      setting === option.value
                        ? 'bg-blue-500 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={findActivities}
              disabled={!age}
              className={`w-full py-5 rounded-2xl font-bold text-xl transition-all ${
                age
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-2xl hover:scale-105'
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

  // Results view
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Here are your activities!
          </h1>
          <p className="text-lg text-gray-600">
            {age} · {getEnergyLabel(energy)} energy · {setting === 'either' ? 'Anywhere' : setting === 'home' ? 'At home' : 'Out & about'}
          </p>
        </div>

        {/* Activity Cards */}
        <div className="space-y-6 mb-8">
          {suggestions.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <p className="text-xl text-gray-600 mb-4">
                No activities found for these filters. Try adjusting your preferences!
              </p>
              <button
                onClick={resetForm}
                className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-orange-600"
              >
                Try Again
              </button>
            </div>
          ) : (
            suggestions.map((activity) => (
              <div key={activity.id} className="bg-white rounded-3xl shadow-xl p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {activity.name}
                    </h3>
                    <div className="flex gap-3 text-sm text-gray-600">
                      <span className="bg-orange-100 px-3 py-1 rounded-full">
                        ⏱️ {activity.time} min
                      </span>
                      <span className="bg-blue-100 px-3 py-1 rounded-full">
                        {activity.setting === 'home' ? '🏠' : '🌳'} {activity.setting === 'home' ? 'Home' : 'Out & about'}
                      </span>
                      <span className="bg-green-100 px-3 py-1 rounded-full">
                        {activity.cost === 'free' ? '💰 Free' : '💵 Paid'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-lg mb-4">
                  {activity.description}
                </p>

                <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Materials needed:
                  </p>
                  <p className="text-gray-600">{activity.materials}</p>
                </div>

                <button
                  onClick={() => handleDidThis(activity.id)}
                  disabled={completedActivities.includes(activity.id)}
                  className={`w-full py-3 rounded-2xl font-semibold transition-all ${
                    completedActivities.includes(activity.id)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg'
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

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleShuffle}
            className="flex-1 bg-white text-gray-700 px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Not feeling it? Shuffle
          </button>
          <button
            onClick={resetForm}
            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
