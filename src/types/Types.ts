
export type Contact = {
    name:string,
    email:string,
    id:number,
    address?:{
        street:string,
        suite:string,
        city:string,
        zipcode:string
    }
    phone:string,
    img?: string
}

export type State = {
    contacts: Contact[],
    activeContact: Contact | null,
    showContactForm: {
        show: boolean,
        formtype: string,
    }
    filteredContacts: Contact[]
}