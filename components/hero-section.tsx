"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Lock, Key, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { InstagramLoading } from "./instagram-loading"
import { ProfileConfirmation } from "./profile-confirmation"
import { InstagramFeed } from "./instagram-feed"

function getDayOfWeek(): string {
  const days = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"]
  return days[new Date().getDay()]
}

export function HeroSection() {
  const [username, setUsername] = useState("")
  const [showInput, setShowInput] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showFeed, setShowFeed] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)
  const [userProfileData, setUserProfileData] = useState<any>(null)
  const [currentDay, setCurrentDay] = useState("")

  useEffect(() => {
    setCurrentDay(getDayOfWeek())
  }, [])

  const handleSpyClick = async () => {
    if (!showInput) {
      setShowInput(true)
      return
    }

    if (!username.trim()) {
      return
    }

    setShowLoading(true)

    try {
      const [profileResponse, postsResponse] = await Promise.all([
        fetch("https://instagram120.p.rapidapi.com/api/instagram/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": "instagram120.p.rapidapi.com",
            "x-rapidapi-key": "42865ce77amsh6b3ec8ac168e4c3p1ae1b6jsndc1ea20ce2d0",
          },
          body: JSON.stringify({
            username: username,
          }),
        }),
        fetch("https://instagram120.p.rapidapi.com/api/instagram/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": "instagram120.p.rapidapi.com",
            "x-rapidapi-key": "42865ce77amsh6b3ec8ac168e4c3p1ae1b6jsndc1ea20ce2d0",
          },
          body: JSON.stringify({
            username: username,
            maxId: "",
          }),
        }),
      ])

      const profileDataResult = await profileResponse.json()
      const postsDataResult = await postsResponse.json()

      console.log("[v0] Profile API response:", JSON.stringify(profileDataResult))
      console.log("[v0] Posts API response:", JSON.stringify(postsDataResult))

      setUserProfileData(profileDataResult)
      setProfileData(postsDataResult)
    } catch (error) {
      console.error("[v0] API Error:", error)
    }
  }

  const handleLoadingConfirm = () => {
    setShowLoading(false)
    setShowConfirmation(true)
  }

  const handleCorrect = () => {
    setShowConfirmation(false)
    setShowLoading(false)
    setShowInput(true)
  }

  const handleConfirm = () => {
    setShowConfirmation(false)
    setShowFeed(true)
  }

  if (showFeed && profileData) {
    const profile = userProfileData?.result || userProfileData

    const enrichedProfileData = {
      ...profileData,
      username: username,
      fullName: profile?.full_name || username,
      profilePicUrl: profile?.profile_pic_url_hd || profile?.profile_pic_url || "/placeholder.svg",
      biography: profile?.biography || "",
      followersCount: profile?.follower_count || profile?.edge_followed_by?.count || 0,
      followingCount: profile?.following_count || profile?.edge_follow?.count || 0,
      postsCount:
        profile?.media_count || profile?.edge_owner_to_timeline_media?.count || profileData.result?.edges?.length || 0,
    }

    console.log("[v0] Enriched profile data for feed:", JSON.stringify(enrichedProfileData))

    return <InstagramFeed profileData={enrichedProfileData} username={username} />
  }

  if (showConfirmation && profileData) {
    const profile = userProfileData?.result || userProfileData

    return (
      <ProfileConfirmation
        profileData={{
          username: username,
          fullName: profile?.full_name || username,
          profilePicUrl: profile?.profile_pic_url_hd || profile?.profile_pic_url || "/placeholder.svg",
          postsCount: profile?.media_count || profile?.edge_owner_to_timeline_media?.count || 0,
          followersCount: profile?.follower_count || profile?.edge_followed_by?.count || 0,
          followingCount: profile?.following_count || profile?.edge_follow?.count || 0,
          biography: profile?.biography || "",
        }}
        onCorrect={handleCorrect}
        onConfirm={handleConfirm}
      />
    )
  }

  if (showLoading) {
    return <InstagramLoading username={username} onConfirm={handleLoadingConfirm} />
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center border-2 border-purple-400">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold">
                <span className="text-white">STALKEA</span>
                <span className="text-purple-500">.AI</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-6 leading-tight">
            O que seu <span className="text-purple-500">Cônjuge</span> faz quando está no Instagram?
          </h1>

          {!showInput ? (
            <p className="text-gray-400 text-center mb-8 text-lg">
              Descubra a verdade sobre <span className="font-semibold text-white">qualquer pessoa</span>, acessando o
              instagram dela!
            </p>
          ) : (
            <div className="mb-8">
              <p className="text-gray-400 text-center mb-6 text-base">
                Digite o nome de usuário da pessoa a ser espionada, sem o arroba "@"
              </p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 text-lg font-mono">@</span>
                <Input
                  type="text"
                  placeholder="Ex: nomedoconjuge_10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent border-gray-700 text-white pl-8 h-12 text-base placeholder:text-gray-600"
                />
              </div>
            </div>
          )}

          <Button
            onClick={handleSpyClick}
            className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-2xl mb-8 flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Espionar Agora
          </Button>

          <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Lock className="w-4 h-4 text-purple-500" />
              <span>100% Anônimo</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Key className="w-4 h-4 text-purple-500" />
              <span>Sem Senha</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Check className="w-4 h-4 text-purple-500" />
              <span>Teste Grátis</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            <span className="text-purple-500 font-semibold">+81.716</span> perfis analisados hoje ({currentDay || "..."}
            )
          </p>
        </div>
      </div>
    </section>
  )
}
