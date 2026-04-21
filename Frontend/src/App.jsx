import NotesPage from './Pages/NotesPage.jsx';
import NotesProvider from './context/NoteContext.jsx';
function App() {
  return ( 
    <div key='app'>
      <NotesProvider>
        <NotesPage/>
      </NotesProvider>
    </div>
  );
}

export default App;