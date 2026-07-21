const Modal = ({ open, children, onClose }) => {

    if (!open) return null;

    return (

        <div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            onClick={onClose}
        >

            <div
                className="bg-slate-900 rounded-2xl p-6 min-w-[500px]"
                onClick={(e)=>e.stopPropagation()}
            >

                {children}

            </div>

        </div>

    );

};

export default Modal;