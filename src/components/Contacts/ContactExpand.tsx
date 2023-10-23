import { useContactContext } from "../../context/contactContext"
import {BiPhoneCall} from 'react-icons/bi'
import {AiOutlineMail,AiOutlineDelete} from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import {IoMdArrowRoundBack} from 'react-icons/io'

function ContactExpand() {
    const {state,dispatch} = useContactContext();
    const {name,email,phone,img,id,address} = state.activeContact!;
    return (
        <div className="contact__expand">
            <div className="contact__expand__container">
                <div className="contact__expand__head">
                    <div className="back btn" onClick={()=>dispatch({type:'set-active-contact',payload:null})}><IoMdArrowRoundBack/></div>
                    <div className="contact__expand__head__right">
                        <div className="edit btn" onClick={()=>dispatch({type:'toggle-edit-form'})}><FiEdit2/></div>
                        <div className="delete btn" onClick={()=>dispatch({type:'delete-contact',payload:id})}><AiOutlineDelete/></div>
                    </div>
                </div>
                <div className="contact__expand__title">
                    <div className="contact__expand__title__img">
                        <img src={`./${img}.png`} alt="" />
                    </div>
                    <div className="contact__expand__title__name">
                        {name}
                    </div>
                </div>
                <div className="contact__expand__desc">
                    <div className="contact__expand__desc__item">
                        <div className="contact__expand__desc__item__title">
                            Email
                        </div>
                        <div className="contact__expand__desc__item__value">
                            {email}
                        </div>
                        <div className="mail desc_btn">
                            <a href={`mailto:${email}`}>
                                <AiOutlineMail/>
                            </a>
                        </div>
                    </div>
                    <div className="contact__expand__desc__item">
                        <div className="contact__expand__desc__item__title">
                            Phone
                        </div>
                        <div className="contact__expand__desc__item__value">
                            {phone}
                        </div>
                        <div className="call desc_btn">
                            <a href={`tel:${phone}`}>
                                <BiPhoneCall/>
                            </a>
                        </div>
                    </div>
                    <div className="contact__expand__desc__item">
                        <div className="contact__expand__desc__item__title">
                            Address
                        </div>
                        <div className="contact__expand__desc__item__value">
                            {address?.street} 
                            <br />
                            {address?.suite}
                            <br />
                            {address?.city}
                            <br />
                            {address?.zipcode}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactExpand