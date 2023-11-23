import './navbar.scss';
import {AiOutlinePlus} from 'react-icons/ai';
import {RiContactsBookLine} from 'react-icons/ri'
import { useRef } from 'react';
import { useContactContext } from '../../context/contactContext';


function Navbar() {
  const {dispatch} = useContactContext();
  const inputRef = useRef<HTMLInputElement>(null);

  // handle search 
  // filter contacts based on search
  // use reducer to update state
  const handleSearch = ()=>{
    const searchString = (inputRef.current?.value||'').toLocaleLowerCase();
    console.log(searchString)
    dispatch({type:'filter-contacts',payload:searchString.toLowerCase()})
  }
  return (
    <div className="navbar">
      <div className="navbar__left">
        <RiContactsBookLine/>
        Contacts</div>
      <div className="navbar__search">
        <input type="text" className="search__bar" onChange={handleSearch} ref={inputRef} placeholder='Search contact by name, email or phone number'/>
      </div>
      <div className="navbar__right">
        <button className="add-contact" onClick={()=>dispatch({type:'toggle-add-form'})}>
          <AiOutlinePlus/>
          Add Contact
        </button>
      </div>
    </div>
  )
}

export default Navbar