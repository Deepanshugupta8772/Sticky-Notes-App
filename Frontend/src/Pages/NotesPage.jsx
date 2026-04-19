import React from 'react';
import {fakeData as notes} from '../assets/FakeData.js';
import NoteCard from '../Components/NoteCard';

const NotesPage = () => {
  return (
    <div>
        {notes.map(note=>(
            <NoteCard id={note.$id} note={note}/>
        ))}
    </div>
  )
}

export default NotesPage