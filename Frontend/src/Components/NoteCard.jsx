import {useRef,useEffect,useState} from 'react';
import { db } from '../appwrite/databases';
// import Trash from "../icons/Trash";
import DeleteButton from "./DeleteButton";
import Spinner from '../icons/Spinner';
import { setNewOffset, autoGrow, setZIndex, bodyParser } from '../utils'; 
import { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

const NoteCard = ({note}) => { 
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);


  const body =bodyParser(note.body);
  const [position,setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  let mouseStartPosition={x:0,y:0};
  const cardRef=useRef(null);

  useEffect(()=>{
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  },[])

  const textAreaRef=useRef(null);
  
  const { setSelectedNote } = useContext(NoteContext);
  const mouseDown=(e)=>{
    if(e.target.className==="card-header"){      

      setZIndex(cardRef.current);
      
      mouseStartPosition.x=e.clientX;
      mouseStartPosition.y=e.clientY;
      document.addEventListener("mousemove",mouseMove);
      document.addEventListener("mouseup",mouseUp);
      
      setSelectedNote(note);
    }
  }

  const mouseMove=(e)=>{
     //1 - Calculate move direction
    const mouseMoveDir={
      x:mouseStartPosition.x-e.clientX,
      y:mouseStartPosition.y-e.clientY,
    };
    //2 - Update start position for next move.
    mouseStartPosition.x=e.clientX;
    mouseStartPosition.y=e.clientY;

    const newPosition=setNewOffset(cardRef.current,mouseMoveDir);

    //3 - Update card top and left position.

    setPosition(newPosition);
  }

  const mouseUp=(e)=>{
    document.removeEventListener("mousemove",mouseMove);
    document.removeEventListener("mouseup",mouseUp);

    const newPosition=setNewOffset(cardRef.current);
    saveData('position',newPosition);
  }

  const saveData=async(key,value)=>{
    const payload={[key]:JSON.stringify(value)};

    try{
      await db.notes.update(note.$id,payload);
    }catch (error) {
      console.error(error);
    }
    setSaving(false);
  }

  const handleKeyUp=()=>{
    //1 - Initiate "saving" state
    setSaving(true)

    //2 - If we have a timer id, clear it so we can add another two seconds
    if (keyUpTimer.current) {
        clearTimeout(keyUpTimer.current);
    }

    //3 - Set timer to trigger save in 2 seconds
    keyUpTimer.current=setTimeout(() => {
        saveData("body", textAreaRef.current.value);
    }, 2000);
  };

  return(
    <div 
      ref={cardRef}
      className="card" 
      style={{
        backgroundColor: colors.colorBody,
        left:`${position.x}px`,
        top:`${position.y}px`
      }}>
      <div
        onMouseDown={mouseDown} 
        className='card-header' 
        style={{backgroundColor:colors.colorHeader}}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <DeleteButton noteId={note.$id}/>
        </div>

      <div style={{ marginLeft: "auto" }}>
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText}/>
            <span style={{ color: colors.colorText }}>
              Saving...
            </span>
          </div>
        )}
      </div>
      </div>
      <div className="card-body">
        <textarea 
          onKeyUp={handleKeyUp}
          ref={textAreaRef}
          style={{ 
            color: colors.colorText 
          }} 
          defaultValue={body}
          onInput={()=>{autoGrow(textAreaRef)}}
          onFocus={()=>{
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
        >
          
        </textarea>
      </div>
      
    </div>
    
    
)};

export default NoteCard;