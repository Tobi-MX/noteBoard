import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { ArrowLeftIcon, DeleteIcon, Trash2Icon } from "lucide-react"
import { toast } from "react-hot-toast"

import api from "../lib/axios"
import RateLimitedUI from "../components/RateLimitedUI"


const NoteDetailPage = () => {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const [isRateLimited, setIsRateLimited] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const noteDetails = async () => {
      setLoading(true)
      try {
        const res = await api.get(`/notes/${id}`)
        setTitle(res.data.title)
        setContent(res.data.content)
        setIsRateLimited(false)

      } catch (error) {
        console.log("Error fetching notes")
        if (error.response.status === 429) {
          setIsRateLimited(true)
        } else {
          toast.error("Failed to create note")
        }

      } finally {
        setLoading(false)
      }
    }

    noteDetails();
  }, [id])

  const handleSave = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      await api.put(`/notes/${id}`, {
        title,
        content,
      })
      toast.success("Note updated successully")
      navigate("/")

    } catch (error) {
      console.log("Error updating note")
      if (error.status === 429) {
        toast.error("Slow down! note is being updated too fast", {
          duration: 4000,
          icon: "💀",
        })
      } else {
        toast.error("Failed to update note")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleNoteDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note")) return
    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully")

    } catch (error) {
      toast.error("Failed to delete note")
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      {isRateLimited && <RateLimitedUI />}

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between">
            <Link to={"/"} className="btn btn-ghost mb-6">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>

            <Link to={"/"} onClick={handleNoteDelete} className="btn btn-ghost mb-6 text-error border-solid border-red-500">
              <Trash2Icon className="size-5" />
              Delete Note
            </Link>
          </div>

          <div className="card bg-base-100 p-10">
            <form onSubmit={handleSave}>
              <div className="form-control mb4 pb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className="form-control mb4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-36"
                  value={content}
                  onChange={(e) => setContent(e.target.value)} />
              </div>

              <div className="card-actions justify-end pt-4">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
