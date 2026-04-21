import NoteCard from '../Components/NoteCard';
import Controls from '../Components/Controls';
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

const NotesPage = () => {
  const {notes}=useContext(NoteContext);
  return (
    <div>
        {notes.map(note=>(
            <NoteCard key={note.$id} note={note}/>
        ))}
        <Controls/>
    </div>
  )
}

export default NotesPage;