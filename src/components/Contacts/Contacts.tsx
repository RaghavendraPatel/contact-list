import { useContactContext } from "../../context/contactContext"
import { Contact } from "../../types/Types";
import ContactForm from "./ContactForm";
import ContactExpand from "./ContactExpand";
import ContactCard from "./ContactCard";
import './contact.scss'

const Contacts = () =>{
  
  const {state} = useContactContext();
  return (
    <div className="Contacts">
      {state.showContactForm.show && <ContactForm/>}
      {state.activeContact && <ContactExpand/>}
      {state.filteredContacts.length === 0 && <div className="no-contacts">No contacts found</div>}
      {state.filteredContacts.map((contact:Contact,idx) =>
          <ContactCard contact = {contact} key={idx}/>
      )}
    </div>
  )
}

export default Contacts