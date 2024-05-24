import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log('Name field updated:', e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
    console.log('Lastname field updated:', e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log('Email field updated:', e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    console.log('Message field updated:', e.target.value);
  };


  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      
      try {
        await mockContactApi();
        setSending(false);
        onSuccess({name, lastname, message, email});
        console.log('Formulaire envoyé avec succès');
        console.log('Name: ', name);
        console.log('Lastname: ', lastname);
        console.log('email: ', email);
        console.log('message: ', message);
      } catch (err) {
        setSending(false);
        onError(err);
        console.error('Erreur...', err);
      }
    },
    [onSuccess, onError]
    
  );


  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" value={lastname} onChange={handleLastnameChange} />
          <Field placeholder="" label="Prénom" value={name} onChange={handleNameChange} />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" value={email} onChange={handleEmailChange} />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={message}
            onChange={handleMessageChange}
          />
        </div>
      </div>
    </form>
  );
};



Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
