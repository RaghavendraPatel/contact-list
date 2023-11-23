import { Contact } from '../../types/Types'
import {BiPhoneCall} from 'react-icons/bi'
import {AiOutlineMail,AiOutlineDelete} from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import { useContactContext } from '../../context/contactContext'
type PropsType = {
    contact : Contact
}

const ContactCard = (props:PropsType)=> {
    const {contact} = props;
    const {dispatch} = useContactContext();
    //on click of contact card dispatch action to set active contact
    const handleClick = ():void=>{
        dispatch({type:'set-active-contact',payload:contact})
    }
    //on click of delete button dispatch action to delete contact
    const handleDelete = ():void=>{
        dispatch({type:'delete-contact',payload:contact.id});
    }
    //on click of edit button dispatch action to toggle edit form and set active contact
    const handleEdit = ():void=>{
        dispatch({type:'toggle-edit-form'});
        dispatch({type:'set-active-contact',payload:contact});
    }
    return (
        <div className="contact__card" >
            <div className = "contact__card__container"onClick={handleClick}>
                <div className="contact__card__img">
                    <img src={`./${contact.img}.png`} alt="" />
                </div>
                <div className="contact__card__info">
                    <div className="contact__card__name">{contact.name}</div>
                    <div className="contact__card__email">{contact.email}</div>
                    <div className="contact__card__phone">{contact.phone}</div>
                </div>
            </div>
            <div className="contact__card__buttons">
                <div className="call">
                    <a href={`tel:${contact.phone}`}>
                        <BiPhoneCall/>
                    </a>
                </div>
                <div className="mail">
                    <a href={`mailto:${contact.email}`}>
                        <AiOutlineMail/>
                    </a>
                </div>
                <div className="edit" onClick={handleEdit}>
                    <FiEdit2/>
                </div>
                <div className="delete" onClick={handleDelete}>
                    <AiOutlineDelete/>
                </div>
            </div>
        </div>
    )
}

export default ContactCard