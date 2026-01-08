"use client"

import { ArrowLeft, Plus, Edit3, Lock } from "lucide-react"
import { useState, useEffect } from "react"
import StalkeaLanding from "./stalkea-landing"

interface InstagramMessagesProps {
  onBack: () => void
  username: string
}

export default function InstagramMessages({ onBack, username }: InstagramMessagesProps) {
  const [timeRemaining, setTimeRemaining] = useState(586)
  const [showVipPage, setShowVipPage] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const stories = [
    { id: 1, username: "Sua nota", image: "/images/7b2d50653d-4e1f-468f-a7e2-12f9e2249195-7d.png", isOwn: true },
    { id: 2, username: "Geo*****", image: "/young-woman-selfie.jpg" },
    { id: 3, username: "Sad*****", image: "/beautiful-woman-portrait.png" },
    { id: 4, username: "Syl*****", image: "/woman-smiling-photo.jpg" },
  ]

  const messages = [
    {
      id: 1,
      username: "Fer*****",
      message: "Oi delícia, adivinha o que vc ...",
      time: "Agora",
      unread: true,
      locked: false,
      avatar: "/attractive-woman-profile.png",
    },
    {
      id: 2,
      username: "Ash*****",
      message: "Encaminhou um reel de jor...",
      time: "33 min",
      unread: true,
      locked: false,
      avatar: "/blonde-woman-instagram.jpg",
    },
    {
      id: 3,
      username: "Lac*****",
      message: "Blz depois a gente se fala",
      time: "2 h",
      unread: false,
      locked: false,
      avatar: "/brunette-woman-profile.jpg",
    },
    {
      id: 4,
      username: "And*****",
      message: "Reagiu com 👍 à sua mensagem",
      time: "6 h",
      unread: false,
      locked: false,
      avatar: "/redhead-woman-photo.jpg",
    },
    {
      id: 5,
      username: "Bru****",
      message: "4 novas mensagens",
      time: "22 h",
      unread: true,
      locked: false,
      avatar: "/young-woman-selfie.jpg",
    },
    {
      id: 6,
      username: "Ash*****",
      message: "Enviou um reel de dr.diegooficial",
      time: "2 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 7,
      username: "Lac*****",
      message: "Enviado sábado",
      time: "2 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 8,
      username: "abb*****",
      message: "Enviou uma mensagem de voz",
      time: "2 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 9,
      username: "ale*****",
      message: "kkkkkkkkk",
      time: "2 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 10,
      username: "ana*****",
      message: "Curtiu sua mensagem",
      time: "2 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 11,
      username: "asp*****",
      message: "🔥🔥",
      time: "3 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 12,
      username: "Ava*****",
      message: "Enviado sexta-feira",
      time: "3 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 13,
      username: "*****",
      message: "Enviado segunda-feira",
      time: "3 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 14,
      username: "*****",
      message: "Delícia você 🔥🔥",
      time: "4 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 15,
      username: "*****",
      message: "Curtiu sua mensagem",
      time: "4 d",
      unread: false,
      locked: true,
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  const handleOpenVipPage = () => {
    setShowVipPage(true)
  }

  if (showVipPage) {
    return <StalkeaLanding onBack={() => setShowVipPage(false)} username={username} />
  }

  return (
    <div className="bg-[#000000] text-white min-h-screen pb-24 max-w-[480px] mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#000000] border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
            <span className="font-semibold text-base">{username}</span>
          </div>
          <div className="flex items-center gap-4">
            <Plus className="w-6 h-6 cursor-pointer" />
            <Edit3 className="w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Meta AI Search Bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="bg-[#262626] rounded-full px-4 py-2.5 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <div className="w-3 h-3 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-gray-400 text-sm">Interaja com a Meta AI ou pesquise</span>
        </div>
      </div>

      {/* Stories Row */}
      <div className="px-4 py-3 border-b border-gray-800">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {stories.map((story) => (
            <div key={story.id} className="flex flex-col items-center flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800 border-2 border-gray-700 relative">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.username}
                  className="w-full h-full object-cover"
                />
                {story.isOwn && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                )}
              </div>
              <p className="text-[10px] mt-1.5 text-gray-300 truncate w-16 text-center">{story.username}</p>
            </div>
          ))}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#262626] flex items-center justify-center text-xs text-gray-400 text-center px-2 leading-tight border-2 border-gray-700">
              <span>O vontd tudo a 3</span>
            </div>
            <p className="text-[10px] mt-1.5 text-gray-300 truncate w-16 text-center">Grupo</p>
          </div>
        </div>
      </div>

      {/* Messages Header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <h2 className="text-white font-bold text-base">Mensagens</h2>
        <span className="text-blue-500 text-sm font-semibold">Pedidos (4)</span>
      </div>

      {/* Messages List */}
      <div className="divide-y divide-gray-800">
        {messages.map((msg) => (
          <div key={msg.id} className="px-4 py-3 flex items-center gap-3 hover:bg-[#1a1a1a] transition-colors">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-800">
                <img
                  src={msg.avatar || "/placeholder.svg"}
                  alt={msg.username}
                  className={`w-full h-full object-cover ${msg.locked ? "blur-sm brightness-50" : ""}`}
                />
              </div>
              {msg.locked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-semibold text-sm text-white">{msg.username}</span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs">{msg.time}</span>
                  {msg.unread && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-sm truncate ${msg.unread ? "text-white font-medium" : "text-gray-400"}`}>
                  {msg.message}
                </p>
                {!msg.locked && (
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIP Banner - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-[480px] mx-auto">
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
              <span className="text-lg">⚡</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-xs flex items-center gap-1.5">
                Prévia disponível por {formatTime(timeRemaining)}
                <span className="inline-block w-2 h-2 rounded-full bg-white/40 animate-pulse"></span>
              </p>
              <p className="text-purple-100 text-[10px] leading-tight mt-0.5">
                Você ganhou 10 minutos para testar gratuitamente nossa ferramenta, mas para liberar todas as
                funcionalidades e ter acesso permanente é necessário ser um membro VIP.
              </p>
            </div>
            <button
              onClick={handleOpenVipPage}
              className="bg-white text-purple-600 font-bold px-4 py-2 rounded-full text-xs whitespace-nowrap hover:bg-purple-50 transition-colors flex-shrink-0 shadow-lg"
            >
              Tornar-se VIP
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
