import { PenSquareIcon, Trash2Icon } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { formatDate } from "../lib/utils.js"
import api from "../lib/axios.js"
import toast from "react-hot-toast"

const NoteCard = ({ note, notes, setNotes }) => {

    const handleNoteDelete = async (e) => {
        e.preventDefault()
        if (!window.confirm("Are you sure you want to delete this note")) return

        try {
            await api.delete(`/notes/${note._id}`)
            setNotes(notes.filter(n => n._id !== note._id))
            toast.success("Note deleted successfully")
            
        } catch (error) {
            console.log(error)
            if (error.status === 429) {
                toast.error("Slow down! notes are being deleted too fast", {
                    duration: 4000,
                    icon: "💀",
                })
            } else {
                toast.error("Failed to delete note")
            }
        }
    }
    return (
        <Link to={`/note/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-1">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button className="btn btn-ghost btn-xs text-error" onClick={handleNoteDelete}>
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard
