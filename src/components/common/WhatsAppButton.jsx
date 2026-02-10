import { MessageSquare } from 'lucide-react'

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/447733488929" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 active:scale-95 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare size={28} />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-dark px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
        Chat with us
      </span>
    </a>
  )
}

export default WhatsAppButton
