import "./modal.css";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ handleClose, show, formData }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
      <AiOutlineClose className="close-btn" onClick={handleClose}/>
        <form className="form-conatianer" onSubmit={formData}>
          <p>Minutes</p>
          <input className="form-input" name="minutes" type="number" min="1" max="60" required/>
          <p className="form-name">Seconds</p>
          <input className="form-input" name="seconds" type="number" min="0" max="60" required/>
          <button className="submit-btn" type="submit" onClick={handleClose}>
            Submit
          </button>
        </form>

      </section>
    </div>
  );
};


export default Modal;
