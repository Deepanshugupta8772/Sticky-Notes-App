import {useRef,useEffect,useState} from 'react';
import Trash from "../icons/Trash";
import { setNewOffset, autoGrow, setZIndex } from '../utils'; 
const NoteCard = ({note}) => {  
  const body =JSON.parse(note.body);
  const [position,setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  let mouseStartPosition={x:0,y:0};
  const cardRef=useRef(null);

  useEffect(()=>{
    autoGrow(textAreaRef);
  },[])

  const textAreaRef=useRef(null);
  

  const mouseDown=(e)=>{
    mouseStartPosition.x=e.clientX;
    mouseStartPosition.y=e.clientY;
    document.addEventListener("mousemove",mouseMove);
    document.addEventListener("mouseup",mouseUp);

    setZIndex(cardRef.current);
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
  }

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
        <Trash/>
      </div>
      <div className="card-body">
        <textarea 
          ref={textAreaRef}
          style={{ 
            color: colors.colorText 
          }} 
          defaultValue={body}
          onInput={()=>{autoGrow(textAreaRef)}}
          onFocus={()=>{setZIndex(cardRef.current)}}
        >
          
        </textarea>
      </div>
      
    </div>
    
)};

export default NoteCard;