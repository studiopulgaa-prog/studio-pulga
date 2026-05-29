"use client"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const imgs = [
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&q=80",
  "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80",
]

const shuffle = (arr: string[]) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function ShuffleGrid() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [squares, setSquares] = useState(shuffle(imgs))
  useEffect(() => {
    const run = () => { setSquares(shuffle(imgs)); timeoutRef.current = setTimeout(run, 3000) }
    timeoutRef.current = setTimeout(run, 3000)
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full">
      {squares.map((src, i) => (
        <motion.div key={src + i} layout transition={{ duration: 1.5, type: "spring" }} className="rounded-xl overflow-hidden" style={{ background: 'rgba(110,44,20,0.09)' }}>
          <img src={src} alt="" className="w-full h-full object-cover" />
        </motion.div>
      ))}
    </div>
  )
}
