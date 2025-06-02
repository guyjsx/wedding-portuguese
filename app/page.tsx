// app/page.tsx
'use client'
import { useState, useEffect } from 'react'
// import { createClient } from '@supabase/supabase-js'

// Initialize Supabase (commented out until we implement sync)
// TODO: Implement Supabase sync for cross-device progress tracking
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions
interface Tool {
  name: string
  url: string
  icon: string
  color: string
}

interface Step {
  number: number
  title: string
  content: string
}

interface Phrase {
  pt: string
  en: string
}

interface Exercise {
  id: string
  time: string
  title: string
  duration: string
  tools?: Tool[]
  steps: Step[]
  phrases?: Phrase[]
  successMetric: string
}

interface DayContent {
  title: string
  subtitle: string
  motivation: string
  exercises: Exercise[]
  missions: string[]
}

interface Missions {
  [key: string]: {
    [key: number]: boolean
  }
}

interface ProgressData {
  missions: Missions
  points: number
}

// Day content data
const daysContent: Record<number, DayContent> = {
  1: {
    title: "Introductions & The Brazilian R",
    subtitle: "Introductions",
    motivation: "Every expert was once a beginner. Start with 'Oi!'",
    exercises: [
      {
        id: 'morning-1',
        time: "🌅 Morning",
        title: "Master the R Sound",
        duration: "15 min",
        tools: [
          { name: "Forvo", url: "https://forvo.com/languages/pt/", icon: "F", color: "bg-orange-500" },
          { name: "Speechling", url: "https://speechling.com", icon: "S", color: "bg-teal-500" },
          { name: "Google Translate", url: "https://translate.google.com", icon: "G", color: "bg-blue-500" },
          { name: "Voice Recorder", url: "#", icon: "🎙️", color: "bg-pink-500" }
        ],
        steps: [
          { number: 1, title: "Forvo Listening (5 min)", content: "Search \"Português do Brasil\":\n- Roberto (3 speakers)\n- Carro (3 speakers)\n- Amor (3 speakers)" },
          { number: 2, title: "Speechling Practice (5 min)", content: "Record these phrases:\n\"Prazer em conhecer\"\n\"Meu nome é Roberto\"\n\"Sou americano\"" },
          { number: 3, title: "Google Translate Comparison (5 min)", content: "Practice at different speeds:\nNormal → 0.75x → 0.5x\nRecord yourself matching rhythm" }
        ],
        phrases: [
          { pt: "Oi! Eu sou...", en: "Hi! I am..." },
          { pt: "Muito prazer!", en: "Nice to meet you!" },
          { pt: "Este é meu pai", en: "This is my father" },
          { pt: "Esta é minha noiva", en: "This is my fiancée" }
        ],
        successMetric: "Goal: Get 80%+ accuracy on Speechling"
      },
      {
        id: 'afternoon-1',
        time: "☀️ Afternoon",
        title: "Video Practice",
        duration: "15 min",
        tools: [
          { name: "YouTube", url: "https://youtube.com/results?search_query=portuguese+introduction", icon: "▶️", color: "bg-red-500" },
          { name: "TikTok", url: "https://tiktok.com", icon: "T", color: "bg-black" }
        ],
        steps: [
          { number: 1, title: "YouTube Shadow Speaking (10 min)", content: "1. Search: \"Como se apresentar em português\"\n2. Watch: \"Speaking Brazilian - Introductions\"\n3. Settings: 0.75x speed, Portuguese captions\n4. Shadow speak each introduction 3x" },
          { number: 2, title: "TikTok/Instagram Reels (5 min)", content: "1. Search: #portuguêsparainiciantes\n2. Find introduction videos\n3. Save 3 that you like\n4. Practice with their exact intonation" }
        ],
        successMetric: "Record yourself copying one video exactly"
      },
      {
        id: 'evening-1',
        time: "🌙 Evening",
        title: "Real Practice",
        duration: "20 min",
        tools: [
          { name: "Anki", url: "https://apps.ankiweb.net", icon: "A", color: "bg-blue-600" },
          { name: "HelloTalk", url: "https://hellotalk.com", icon: "H", color: "bg-red-400" }
        ],
        steps: [
          { number: 1, title: "Create Anki Flashcards (10 min)", content: "Add 10 family members with:\n- Photo\n- Portuguese introduction\n- Your voice recording\nExample: \"Este é meu irmão, Mike\"" },
          { number: 2, title: "HelloTalk Practice (10 min)", content: "Post: \"Oi! Estou aprendendo português!\"\nAsk: \"Minha pronúncia está boa?\"\nGet feedback from 3 natives" }
        ],
        successMetric: "Success: 3 native speakers understand you"
      }
    ],
    missions: [
      "Speechling score 80%+ on R sounds",
      "Shadow speak 1 YouTube video",
      "Create 10 Anki cards with audio",
      "Get feedback from 3 HelloTalk users",
      "Send Portuguese voice message to wife"
    ]
  },
  2: {
    title: "Emotions & Gratitude",
    subtitle: "Emotions",
    motivation: "Emotions make language memorable. Feel it to speak it!",
    exercises: [
      {
        id: 'morning-2',
        time: "🌅 Morning",
        title: "Emotion Recognition",
        duration: "15 min",
        tools: [
          { name: "Netflix", url: "https://netflix.com", icon: "N", color: "bg-red-600" },
          { name: "Speechling", url: "https://speechling.com", icon: "S", color: "bg-teal-500" }
        ],
        steps: [
          { number: 1, title: "Netflix Emotion Study (7 min)", content: "1. Open \"Vai Que Cola\" or \"3%\"\n2. Watch 5 minutes with Portuguese audio + subtitles\n3. Screenshot every emotion expression\n4. Create phone wallpaper with expressions" },
          { number: 2, title: "Speechling Emotion Practice (8 min)", content: "Record with feeling:\n- \"Estou muito feliz!\" (super happy)\n- \"Estou emocionado!\" (touch your heart)\n- \"Estou nervoso...\" (worried voice)\n- \"Que alegria!\" (pure joy)" }
        ],
        phrases: [
          { pt: "Estou muito feliz!", en: "I'm very happy!" },
          { pt: "Estou emocionado!", en: "I'm emotional/excited!" },
          { pt: "Obrigado por vir!", en: "Thank you for coming!" },
          { pt: "Que alegria!", en: "What joy!" }
        ],
        successMetric: "Goal: Native speakers can identify your emotion without context"
      },
      {
        id: 'afternoon-2',
        time: "☀️ Afternoon",
        title: "Music & Rhythm",
        duration: "15 min",
        tools: [
          { name: "Spotify", url: "https://spotify.com", icon: "S", color: "bg-green-500" },
          { name: "Letras.mus.br", url: "https://letras.mus.br", icon: "L", color: "bg-orange-500" }
        ],
        steps: [
          { number: 1, title: "Learn Through Music (10 min)", content: "1. Play \"Emoções\" - Roberto Carlos\n2. Open lyrics on Letras.mus.br\n3. Highlight all nasal sounds (ão, ões)\n4. Sing along focusing on nasals\n5. Record yourself singing chorus" },
          { number: 2, title: "Forvo Nasal Comparison (5 min)", content: "Search and practice:\n- Coração (heart) - 5 speakers\n- Emoção (emotion) - 5 speakers\n- Não (no) - note regional differences" }
        ],
        successMetric: "Record the song chorus, post to HelloTalk for feedback"
      },
      {
        id: 'evening-2',
        time: "🌙 Evening",
        title: "Digital Thank You Practice",
        duration: "20 min",
        tools: [
          { name: "WhatsApp", url: "https://web.whatsapp.com", icon: "W", color: "bg-green-400" },
          { name: "Instagram", url: "https://instagram.com", icon: "I", color: "bg-pink-500" }
        ],
        steps: [
          { number: 1, title: "WhatsApp Voice Messages (10 min)", content: "Send 5 different thank you messages:\n1. \"Obrigado pelo café, amor!\"\n2. \"Muito obrigado pela ajuda!\"\n3. \"Obrigado por me ensinar português!\"\n4. \"Nossa, brigado! Você é demais!\"\n5. \"Valeu! Tô muito grato!\"" },
          { number: 2, title: "Instagram Stories Practice (10 min)", content: "1. Post story with Brazilian flag\n2. Write: \"Aprendendo português!\"\n3. Add poll: \"Minha pronúncia está boa?\"\n4. Thank everyone who responds IN PORTUGUESE\n5. Save responses for motivation" }
        ],
        successMetric: "Collect 5 different ways natives say \"you're welcome\""
      }
    ],
    missions: [
      "Screenshot 5 emotion expressions from shows",
      "Sing nasal sounds correctly in song",
      "Send 5 unique WhatsApp thank yous",
      "Get Instagram story responses",
      "Practice emotions on ChatGPT Voice"
    ]
  },
  3: {
    title: "Asking for Help & Clarification",
    subtitle: "Help",
    motivation: "Confusion is the beginning of understanding. Embrace 'Não entendi!'",
    exercises: [
      {
        id: 'morning-3',
        time: "🌅 Morning",
        title: "AI Clarification Practice",
        duration: "15 min",
        tools: [
          { name: "ChatGPT Voice", url: "https://chat.openai.com", icon: "C", color: "bg-teal-600" },
          { name: "Google Assistant", url: "#", icon: "G", color: "bg-blue-500" }
        ],
        steps: [
          { number: 1, title: "ChatGPT Voice Conversation (10 min)", content: "1. Open ChatGPT app\n2. Use voice mode\n3. Say: \"Fale português comigo\"\n4. Practice clarification phrases\n5. Have 5-minute conversation" },
          { number: 2, title: "Google Assistant in Portuguese (5 min)", content: "1. Set phone to Portuguese (Brazil)\n2. Ask questions until Google understands\n3. Practice pronunciation" }
        ],
        phrases: [
          { pt: "Pode repetir?", en: "Can you repeat?" },
          { pt: "Mais devagar, por favor?", en: "Slower, please?" },
          { pt: "Desculpa, não entendi", en: "Sorry, I didn't understand" },
          { pt: "Como se diz...?", en: "How do you say...?" }
        ],
        successMetric: "Success: Google understands 5 questions"
      },
      {
        id: 'afternoon-3',
        time: "☀️ Afternoon",
        title: "Video Comprehension",
        duration: "15 min",
        tools: [
          { name: "YouTube", url: "https://youtube.com", icon: "▶️", color: "bg-red-500" },
          { name: "HelloTalk", url: "https://hellotalk.com", icon: "H", color: "bg-red-400" }
        ],
        steps: [
          { number: 1, title: "YouTube Practice (10 min)", content: "1. Channel: \"Speaking Brazilian School\"\n2. Video: \"Asking for Help in Portuguese\"\n3. Watch without subtitles first\n4. Then with subtitles\n5. Comment: \"Ótimo vídeo!\"" },
          { number: 2, title: "Create Your Own Video (5 min)", content: "Record yourself asking for help:\n- At a restaurant\n- On the street\n- At the wedding\nPost to HelloTalk" }
        ],
        successMetric: "Native speakers understand your video"
      },
      {
        id: 'evening-3',
        time: "🌙 Evening",
        title: "Real-World Tech Practice",
        duration: "20 min",
        tools: [
          { name: "Google Maps", url: "https://maps.google.com", icon: "📍", color: "bg-blue-500" },
          { name: "Uber", url: "https://uber.com", icon: "U", color: "bg-black" }
        ],
        steps: [
          { number: 1, title: "Google Maps in Portuguese (10 min)", content: "1. Change to Portuguese\n2. Search Brazilian restaurant\n3. Practice navigation phrases\n4. \"Vire à direita\", \"Siga em frente\"" },
          { number: 2, title: "Delivery Practice (10 min)", content: "1. Find Brazilian restaurant\n2. Write instructions in Portuguese\n3. Practice ordering conversation" }
        ],
        successMetric: "Successfully navigate to 3 places in Portuguese"
      }
    ],
    missions: [
      "Complete 5-min ChatGPT conversation",
      "Google understands your questions",
      "Comment on YouTube video in Portuguese",
      "Navigate somewhere with Portuguese GPS",
      "Order food with Portuguese instructions"
    ]
  },
  4: {
    title: "Integration & Review",
    subtitle: "Review",
    motivation: "Integration is where magic happens. You're becoming bilingual!",
    exercises: [
      {
        id: 'morning-4',
        time: "🌅 Morning",
        title: "Create Your Vlog",
        duration: "15 min",
        tools: [
          { name: "Instagram", url: "https://instagram.com", icon: "I", color: "bg-pink-500" },
          { name: "TikTok", url: "https://tiktok.com", icon: "T", color: "bg-black" }
        ],
        steps: [
          { number: 1, title: "Video Creation (10 min)", content: "Record daily vlog:\n1. \"Bom dia! Hoje é quinta-feira\"\n2. \"Estou aprendendo português\"\n3. \"Ontem eu aprendi...\"\n4. \"Hoje vou praticar...\"\n5. Post with #português" },
          { number: 2, title: "Podcast Listening (5 min)", content: "\"Português do Zero\" episode 1:\n- Listen while getting ready\n- Note 3 phrases you recognize\n- Practice saying them" }
        ],
        successMetric: "Get 10+ views on your Portuguese video"
      },
      {
        id: 'afternoon-4',
        time: "☀️ Afternoon",
        title: "Wedding Simulation",
        duration: "20 min",
        tools: [
          { name: "ChatGPT", url: "https://chat.openai.com", icon: "C", color: "bg-teal-600" },
          { name: "Mondly VR", url: "https://mondly.com", icon: "M", color: "bg-red-500" }
        ],
        steps: [
          { number: 1, title: "AI Roleplay (10 min)", content: "Prompt ChatGPT:\n\"Pretend you're a Brazilian wedding guest.\"\nPractice 4 scenarios" },
          { number: 2, title: "Review Week (10 min)", content: "Quick practice of:\n- Introductions (Day 1)\n- Emotions (Day 2)\n- Asking for help (Day 3)\n- Combine everything!" }
        ],
        successMetric: "Complete 3 full scenario conversations"
      },
      {
        id: 'evening-4',
        time: "🌙 Evening",
        title: "Social Media Immersion",
        duration: "20 min",
        tools: [
          { name: "Instagram", url: "https://instagram.com", icon: "I", color: "bg-pink-500" },
          { name: "Twitter/X", url: "https://twitter.com", icon: "X", color: "bg-blue-400" }
        ],
        steps: [
          { number: 1, title: "Instagram Brazilian Mode (10 min)", content: "1. Follow Brazilian accounts\n2. Comment on 5 posts\n3. Watch stories\n4. Note slang" },
          { number: 2, title: "Twitter Practice (10 min)", content: "1. Change to Portuguese\n2. Follow trends\n3. Tweet about learning\n4. Respond to tweets" }
        ],
        successMetric: "Get 5 Brazilian followers/interactions"
      }
    ],
    missions: [
      "Post Portuguese vlog",
      "Complete AI conversation practice",
      "Get Brazilian social media engagement",
      "Use 3 new apps successfully",
      "Send video update to wife's family"
    ]
  },
  5: {
    title: "Confidence Building & Performance",
    subtitle: "Confidence",
    motivation: "Confidence comes from practice. You've got this! 🚀",
    exercises: [
      {
        id: 'morning-5',
        time: "🌅 Morning",
        title: "Speed Challenge",
        duration: "15 min",
        tools: [
          { name: "Speechling", url: "https://speechling.com", icon: "S", color: "bg-teal-500" },
          { name: "Anki", url: "https://apps.ankiweb.net", icon: "A", color: "bg-blue-600" },
          { name: "HelloTalk", url: "https://hellotalk.com", icon: "H", color: "bg-red-400" },
          { name: "ChatGPT", url: "https://chat.openai.com", icon: "C", color: "bg-teal-600" }
        ],
        steps: [
          { number: 1, title: "Rapid Fire App Circuit (15 min)", content: "3 minutes each app, no breaks:\n1. Speechling: Record 5 introductions\n2. Anki: Review all cards 2x speed\n3. HelloTalk: Voice message 3 people\n4. ChatGPT: 3-minute speed conversation\n5. Forvo: Listen and repeat 10 words" }
        ],
        successMetric: "Complete circuit without using English"
      },
      {
        id: 'afternoon-5',
        time: "☀️ Afternoon",
        title: "Wedding Speech Creation",
        duration: "20 min",
        tools: [
          { name: "Google Docs", url: "https://docs.google.com", icon: "D", color: "bg-blue-500" },
          { name: "Canva", url: "https://canva.com", icon: "C", color: "bg-cyan-500" }
        ],
        steps: [
          { number: 1, title: "Create Your Speech (20 min)", content: "1. Google Docs Voice Typing\n2. Dictate: \"Boa noite, família e amigos\"\n3. Refine with Google Translate\n4. Record on Speechling\n5. Create video with Canva" }
        ],
        phrases: [
          { pt: "Boa noite, família e amigos", en: "Good evening, family and friends" },
          { pt: "Estou muito feliz e emocionado", en: "I'm very happy and emotional" },
          { pt: "Obrigado por estarem aqui", en: "Thank you for being here" },
          { pt: "Um brinde ao nosso amor!", en: "A toast to our love!" }
        ],
        successMetric: "90-second speech recorded perfectly"
      },
      {
        id: 'evening-5',
        time: "🌙 Evening",
        title: "Live Video Call",
        duration: "25 min",
        tools: [
          { name: "HelloTalk", url: "https://hellotalk.com", icon: "H", color: "bg-red-400" },
          { name: "Preply", url: "https://preply.com", icon: "P", color: "bg-blue-500" },
          { name: "Zoom", url: "https://zoom.us", icon: "Z", color: "bg-blue-400" },
          { name: "WhatsApp", url: "https://web.whatsapp.com", icon: "W", color: "bg-green-400" }
        ],
        steps: [
          { number: 1, title: "Preparation (5 min)", content: "Tech setup:\n- Good lighting\n- Stable internet\n- Backup phrases ready" },
          { number: 2, title: "Live Call (20 min)", content: "Option A: HelloTalk video\nOption B: Family call\nOption C: Online tutor" }
        ],
        successMetric: "Complete 5+ minutes speaking only Portuguese"
      }
    ],
    missions: [
      "Complete speed circuit challenge",
      "Record wedding speech draft",
      "Successful video call in Portuguese",
      "Post progress to social media",
      "Review week's recordings - note improvement"
    ]
  }
}

export default function Home() {
  const [currentDay, setCurrentDay] = useState<number>(1)
  const [missions, setMissions] = useState<Missions>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [points, setPoints] = useState<number>(0)

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = async (): Promise<void> => {
    try {
      // Try localStorage first
      const saved = localStorage.getItem('wedding-portuguese-progress')
      if (saved) {
        const data: ProgressData = JSON.parse(saved)
        setMissions(data.missions || {})
        setPoints(data.points || 0)
      }
      
      // TODO: Add Supabase sync here later
      // const { data: { user } } = await supabase.auth.getUser()
      // if (user) {
      //   const { data } = await supabase
      //     .from('progress')
      //     .select('*')
      //     .eq('user_id', user.id)
      //     .single()
      //   if (data) {
      //     setMissions(data.missions)
      //     setPoints(data.points)
      //   }
      // }
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveProgress = (newMissions: Missions, newPoints: number): void => {
    const data: ProgressData = { missions: newMissions, points: newPoints }
    localStorage.setItem('wedding-portuguese-progress', JSON.stringify(data))
    
    // TODO: Sync with Supabase here
    // const { data: { user } } = await supabase.auth.getUser()
    // if (user) {
    //   await supabase.from('progress').upsert({
    //     user_id: user.id,
    //     missions: newMissions,
    //     points: newPoints,
    //     updated_at: new Date().toISOString()
    //   })
    // }
  }

  const toggleMission = (day: number, missionIndex: number): void => {
    const newMissions = { ...missions }
    if (!newMissions[`day${day}`]) {
      newMissions[`day${day}`] = {}
    }
    
    const wasCompleted = newMissions[`day${day}`][missionIndex]
    newMissions[`day${day}`][missionIndex] = !wasCompleted
    
    // Update points
    const newPoints = wasCompleted ? points - 10 : points + 10
    
    setMissions(newMissions)
    setPoints(newPoints)
    saveProgress(newMissions, newPoints)
  }

  const calculateProgress = (): number => {
    let completed = 0
    const total = 25 // 5 missions per day × 5 days
    
    Object.keys(missions).forEach(day => {
      Object.keys(missions[day]).forEach(mission => {
        if (missions[day][parseInt(mission)]) completed++
      })
    })
    
    return (completed / total) * 100
  }

  const openTool = (url: string): void => {
    if (url === '#') {
      alert('Open your device\'s voice recorder app')
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your progress...</p>
        </div>
      </div>
    )
  }

  const dayContent = daysContent[currentDay] || daysContent[1]
  const dayMissions = missions[`day${currentDay}`] || {}

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-white shadow-xl">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-blue-700 text-white p-6 sticky top-0 z-50 shadow-lg">
        <h1 className="text-2xl font-bold text-center">🇧🇷 Wedding Portuguese</h1>
        <p className="text-center text-sm opacity-90 mt-1">Week 1: Foundation</p>
        <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-yellow-400 transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        <div className="text-center text-xs mt-1 opacity-90">
          {Math.round(calculateProgress())}% Complete • {points} Points
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-[104px] z-40 flex overflow-x-auto">
        {[1, 2, 3, 4, 5].map(day => {
          const dayCompleted = missions[`day${day}`] && 
            Object.values(missions[`day${day}`]).filter(Boolean).length === 5
          
          return (
            <button
              key={day}
              onClick={() => setCurrentDay(day)}
              className={`flex-1 min-w-[80px] py-4 text-center border-b-[3px] transition-all ${
                currentDay === day 
                  ? 'border-green-600 text-green-600 font-bold bg-green-50' 
                  : 'border-transparent hover:bg-gray-50'
              } ${dayCompleted ? 'bg-green-100' : ''}`}
            >
              <div className="text-xl font-bold">{day}</div>
              <div className="text-xs text-gray-600">
                {daysContent[day].subtitle}
              </div>
              {dayCompleted && <div className="text-xs">✅</div>}
            </button>
          )
        })}
      </nav>

      {/* Content */}
      <main className="p-6 pb-24">
        {/* Daily Motivation */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-lg text-center mb-6 shadow-md">
          <p className="text-gray-800 italic font-medium">{dayContent.motivation}</p>
        </div>

        {/* Exercises */}
        {dayContent.exercises.map((exercise) => (
          <div key={exercise.id} className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-green-600">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-green-700">
                {exercise.time}: {exercise.title}
              </h3>
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                {exercise.duration}
              </span>
            </div>
            
            {/* Tools */}
            {exercise.tools && (
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold text-blue-700 mb-2">🛠️ Tools for this exercise:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {exercise.tools.map((tool, toolIdx) => (
                    <button
                      key={toolIdx}
                      onClick={() => openTool(tool.url)}
                      className="flex items-center gap-2 p-2 bg-white rounded hover:shadow-md transition-all"
                    >
                      <span className={`w-8 h-8 ${tool.color} text-white rounded flex items-center justify-center font-bold text-sm`}>
                        {tool.icon}
                      </span>
                      <span className="text-sm">{tool.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Steps */}
            <div className="space-y-3 mb-4">
              {exercise.steps.map((step) => (
                <div key={step.number} className="bg-gray-50 p-4 rounded-lg relative pl-12">
                  <span className="absolute left-3 top-4 bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </span>
                  <strong className="block mb-1">{step.title}</strong>
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{step.content}</pre>
                </div>
              ))}
            </div>

            {/* Phrases */}
            {exercise.phrases && exercise.phrases.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                {exercise.phrases.map((phrase, phraseIdx) => (
                  <div key={phraseIdx} className="flex justify-between items-center p-2 hover:bg-white rounded transition-all">
                    <span className="font-semibold text-green-700">{phrase.pt}</span>
                    <span className="text-sm text-gray-600">{phrase.en}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Success Metric */}
            {exercise.successMetric && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg flex items-center gap-2">
                <span className="text-xl">✓</span>
                <span className="text-sm">{exercise.successMetric}</span>
              </div>
            )}
          </div>
        ))}

        {/* Daily Missions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
            📋 Daily Missions
            <span className="text-sm font-normal text-gray-600">
              (+10 points each)
            </span>
          </h3>
          <div className="space-y-3">
            {dayContent.missions.map((mission, idx) => (
              <label 
                key={idx} 
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={dayMissions[idx] || false}
                    onChange={() => toggleMission(currentDay, idx)}
                    className="w-6 h-6 text-green-600 rounded-full appearance-none border-2 border-green-600 checked:bg-green-600 checked:border-green-600"
                  />
                  {dayMissions[idx] && (
                    <span className="absolute inset-0 flex items-center justify-center text-white pointer-events-none">
                      ✓
                    </span>
                  )}
                </div>
                <span className={`flex-1 ${dayMissions[idx] ? 'line-through text-gray-400' : ''}`}>
                  {mission}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Weekend Challenge Preview (only on Day 5) */}
        {currentDay === 5 && (
          <div className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 border-2 border-yellow-400">
            <h3 className="text-lg font-bold text-orange-700 mb-2">🎉 Weekend Challenge Preview</h3>
            <p className="text-sm mb-2"><strong>Saturday:</strong> Full Portuguese immersion day - all devices in Portuguese!</p>
            <p className="text-sm mb-2"><strong>Sunday:</strong> Brazilian restaurant visit - order entirely in Portuguese!</p>
            <div className="mt-3 bg-white/80 rounded p-3 text-center font-semibold text-orange-700">
              Ready to live in Portuguese for a weekend? 🚀
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => {
          const completed = Object.values(missions).reduce((acc, day) => 
            acc + Object.values(day).filter(Boolean).length, 0
          )
          alert(`🇧🇷 Week 1 Progress Report 🇧🇷\n\nMissions: ${completed}/25 completed\nProgress: ${Math.round(calculateProgress())}%\nPoints: ${points}\n\nKeep going! You're doing amazing! 🎉`)
        }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-green-600 to-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-xl hover:scale-110 transition-transform z-50"
      >
        📊
      </button>
    </div>
  )
}