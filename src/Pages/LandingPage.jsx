import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SparklesIcon, MailIcon } from 'lucide-react'

const glowStyle = `
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px #ffd700, 0 0 10px #ffd700, 0 0 15px #ffd700; }
    50% { box-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700; }
  }
  @-webkit-keyframes glow {
    0%, 100% { box-shadow: 0 0 5px #ffd700, 0 0 10px #ffd700, 0 0 15px #ffd700; }
    50% { box-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700; }
  }
  .glow {
    -webkit-animation: glow 2s ease-in-out infinite;
    animation: glow 2s ease-in-out infinite;
  }
`;

export default function JackpotLandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 py-8 sm:py-12 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: glowStyle }} />
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tm_ohp_39042_Create_a_visually_striking_landing_page_in_lands_0c4a695e-9293-473a-b4f9-6d772ca2fdac_0-Ut19Pv7asf1260iWa1Khk3dmX5hu6M.png"
        alt="Jackpot background"
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        priority
        crossOrigin="anonymous"
      />
      <div className="absolute inset-0 bg-black/30 bg-opacity-30" style={{ backdropFilter: 'blur(4px)' }} aria-hidden="true" />
      
      <header className="text-center mb-8 sm:mb-12 relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-2 sm:mb-4 animate-pulse text-yellow-400">
          Win Big!
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Your Chance to Hit the Jackpot</p>
      </header>

      <main className="text-center mb-8 sm:mb-12 w-full max-w-md relative z-10">
        <div className="bg-black/50 backdrop-blur-md rounded-lg p-4 sm:p-6 shadow-lg border-4 border-yellow-400 mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">
            Collect your Daily Spins for a Chance to Win a $1,000,000 Jackpot!
          </h3>
          <p className="mb-3 sm:mb-4 text-white text-sm sm:text-base">Sign up and start playing now!</p>
          <form className="space-y-3 sm:space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex items-center space-x-2">
              <MailIcon className="text-gray-300 w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white/10 border-white/20 text-white placeholder-gray-300 text-sm sm:text-base"
                required
                aria-label="Email address"
              />
            </div>
            <Button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 sm:py-3 rounded-full text-lg sm:text-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              Get Your Free Spins!
            </Button>
          </form>
        </div>

        <div className="bg-yellow-400 text-black rounded-lg p-6 sm:p-8 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 border-4 border-yellow-600 glow" style={{
          WebkitTransform: 'rotate(3deg)',
          WebkitTransition: '-webkit-transform 0.3s',
        }}>
          <SparklesIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-yellow-600" aria-hidden="true" />
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-1 sm:mb-2">$1,000,000</h2>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold">Jackpot Prize!</p>
        </div>
      </main>

      <section className="text-center mb-8 sm:mb-12 relative z-10 w-full max-w-md">
        <div className="bg-purple-900/80 rounded-lg p-4 sm:p-6 border-2 border-purple-500">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">How to Win:</h3>
          <ol className="list-decimal list-inside text-left mx-auto text-white/90 text-sm sm:text-base">
            <li className="mb-1 sm:mb-2">Sign up with your email</li>
            <li className="mb-1 sm:mb-2">Collect your daily free spins</li>
            <li className="mb-1 sm:mb-2">Spin the reels on our exciting slot machines</li>
            <li className="mb-1 sm:mb-2">Match the winning symbols</li>
            <li>Celebrate your massive $1,000,000 win!</li>
          </ol>
        </div>
      </section>
    </div>
  )
}

