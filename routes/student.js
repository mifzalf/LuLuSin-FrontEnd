router.get("/student/tryout/:idTryout/:idSubject/explanation", verifyToken, authorize(['student']), async (req, res, next) => {
  const { idTryout, idSubject } = req.params
  const idStudent = req.user.id

  try {
    const studentData = await tryoutModel.getStudentById(idStudent)
    if (!studentData) {
      return res.status(404).json({ message: 'Data siswa tidak ditemukan' })
    }
    const subjectExpData = await tryoutModel.getExpSubjectById(idSubject)
    if (!subjectExpData) {
      return res.status(404).json({ message: 'Data subjek tidak ditemukan' })
    }
    const detail = await tryoutModel.getTryoutDetailResult(idTryout, idStudent, idSubject)

    res.status(200).json({ studentData, subjectExpData, detail })
  } catch (error) {
    console.error('EXPLANATION ERROR:', error);
    res.status(500).json({ message: error.message })
  }
}) 