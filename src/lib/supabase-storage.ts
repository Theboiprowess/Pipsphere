import { supabase } from './supabase'

export const storage = {
  // Course images
  async uploadCourseImage(file: File, courseId: string) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${courseId}.${fileExt}`
    const filePath = `courses/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('course-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('course-images')
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  async deleteCourseImage(url: string) {
    const filePath = url.split('/').pop()
    if (!filePath) return

    const { error } = await supabase.storage
      .from('course-images')
      .remove([`courses/${filePath}`])

    if (error) throw error
  },

  // Lesson videos
  async uploadLessonVideo(file: File, lessonId: string) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${lessonId}.${fileExt}`
    const filePath = `lessons/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('lesson-videos')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('lesson-videos')
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  async deleteLessonVideo(url: string) {
    const filePath = url.split('/').pop()
    if (!filePath) return

    const { error } = await supabase.storage
      .from('lesson-videos')
      .remove([`lessons/${filePath}`])

    if (error) throw error
  },

  // Lesson resources
  async uploadResource(file: File, lessonId: string) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${lessonId}/${Date.now()}.${fileExt}`
    const filePath = `resources/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('lesson-resources')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('lesson-resources')
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  async deleteResource(url: string) {
    const filePath = url.split('/').pop()
    if (!filePath) return

    const { error } = await supabase.storage
      .from('lesson-resources')
      .remove([`resources/${filePath}`])

    if (error) throw error
  },

  // Trader images
  async uploadTraderImage(file: File, traderId: string) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${traderId}.${fileExt}`
    const filePath = `traders/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('trader-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage
      .from('trader-images')
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  async deleteTraderImage(url: string) {
    const filePath = url.split('/').pop()
    if (!filePath) return

    const { error } = await supabase.storage
      .from('trader-images')
      .remove([`traders/${filePath}`])

    if (error) throw error
  },
}