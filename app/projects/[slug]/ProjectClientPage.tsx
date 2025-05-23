"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { projects } from "@/data/projects"
import ProjectGallery from "@/components/ProjectGallery"

interface Project {
  slug: string
  title: string
  description: string
  role: string
  timeline: string
  tools: string
  coverImage: string
  content: string
  gallery: string[]
}

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectClientPage({ slug}:{slug:string}) {
  const [project, setProject] = useState<Project | undefined>(undefined)

  
  useEffect(() => {
    const foundProject = projects.find((p) => p.slug === slug)
    setProject(foundProject)
  }, [slug])
  if (!project) {
    return <div className="container mx-auto px-4 py-20 text-center">Project not found</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12 md:py-20"
    >
      <Link
        href="/#portfolio"
        className="inline-flex items-center text-pink-600 mb-8 hover:text-pink-800 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to all projects
      </Link>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl">{project.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-pink-700">Role</h3>
            <p>{project.role}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-pink-700">Timeline</h3>
            <p>{project.timeline}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-pink-700">Tools</h3>
            <p>{project.tools}</p>
          </div>
        </div>

        <div className="mb-12">
          <Image
            src={project.coverImage || "/placeholder.svg"}
            alt={project.title}
            width={1200}
            height={675}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        <div className="prose prose-lg max-w-none mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-700">Project Overview</h2>
          <p>{project.content}</p>
        </div>

        <ProjectGallery images={project.gallery} />
      </motion.div>
    </motion.div>
  )
}
