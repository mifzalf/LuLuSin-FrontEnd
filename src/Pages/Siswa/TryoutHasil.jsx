"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle, HelpCircle, BarChart3, BookOpen, Award, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../../api/axiosInstance"

export default function SiswaTryoutHasil() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [tryoutResults, setTryoutResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeoutError, setTimeoutError] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [subjectList, setSubjectList] = useState([])

  useEffect(() => {
    const fetchSubjectList = async () => {
      try {
        const response = await axiosInstance.get('/API/subject/list')
        setSubjectList(response.data)
      } catch (err) {
        console.error('Failed to fetch subject list:', err)
      }
    }
    fetchSubjectList()
  }, [])

  useEffect(() => {
    const fetchTryoutResults = async () => {
      try {
        const response = await axiosInstance.get(`/API/student/tryout/${id}/result`)
        const raw = response.data
        const summary = Array.isArray(raw.summary) ? raw.summary[0] : raw.summary
        let perCategorySubject = []
        
        if (Array.isArray(raw.perCategorySubject)) {
          raw.perCategorySubject.forEach(item => {
            const result = typeof item.result === 'string' ? JSON.parse(item.result) : (item.result || {})
            const subjekArr = Array.isArray(result.subjek) ? result.subjek : (result.subjek ? [result.subjek] : [])
            subjekArr.forEach(sub => {
              const subjectData = subjectList.find(s => {
                const a = ((s.subject_name || '') + '|' + (s.subject_category || '')).trim().toLowerCase();
                const b = ((sub.nama_subjek || '') + '|' + (result.nama_kategori || '')).trim().toLowerCase();
                return a === b;
              });
              
              if (!subjectData) {
                console.warn('ID subject tidak ditemukan untuk:', sub.nama_subjek, '| kategori:', result.nama_kategori)
              }
              
              perCategorySubject.push({
                category_name: result.nama_kategori || '-',
                subject_name: sub.nama_subjek || '-',
                subject_id: subjectData ? subjectData.subject_id : null,
                average_score: sub.nilai_rata_rata || 0,
                total_correct: sub.total_jawaban_benar || 0,
                total_wrong: sub.total_jawaban_salah || 0,
                total_empty: sub.total_jawaban_kosong || 0,
              })
            })
          })
        }
        
        setTryoutResults({ summary, perCategorySubject })
        setLoading(false)
        setTimeoutError(false)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tryout results')
        setLoading(false)
        setTimeoutError(true)
      }
    }

    if (id) {
      fetchTryoutResults()
    }
  }, [id, subjectList])

// ... existing code ...