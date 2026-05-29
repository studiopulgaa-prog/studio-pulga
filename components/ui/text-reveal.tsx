"use client"
import { FC, ReactNode, useRef } from "react"
import { motion, MotionValue, useScroll, useTransform } from "framer-motion"

interface TextRevealProps { text: string; className?: string }

const TextRevealByWord: FC<TextRevealProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: targetRef })
  const words = text.split(" ")
  return (
    <div ref={targetRef} className={`relative z-0 h-[200vh] ${className}`}>
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center px-8 py-20">
        <p className="flex flex-wrap p-5 text-3xl font-bold md:text-5xl" style={{ color: 'rgba(110,44,20,0.2)', fontFamily: 'League Spartan, sans-serif' }}>
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>
          })}
        </p>
      </div>
    </div>
  )
}

interface WordProps { children: ReactNode; progress: MotionValue<number>; range: [number, number] }

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative mx-1 lg:mx-2">
      <span className="absolute" style={{ color: 'rgba(110,44,20,0.2)' }}>{children}</span>
      <motion.span style={{ opacity, color: '#6E2C14' }}>{children}</motion.span>
    </span>
  )
}

export { TextRevealByWord }
