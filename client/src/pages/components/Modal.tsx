

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
            <div className="absolute inset-0 bg-gray-700 opacity-20"></div>
            <div className="relative bg-white w-full max-w-md rounded-lg p-8">
                <button
                    className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                    onClick={onClose}
                >
                    <svg
                        className="w-6 h-6 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18.364 5.636a.5.5 0 0 0-.707 0L12 10.293 7.343 5.636a.5.5 0 0 0-.707 0L5.636 6.636a.5.5 0 0 0 0 .707L10.293 12l-4.657 4.657a.5.5 0 0 0 0 .707l1 1a.5.5 0 0 0 .707 0L12 13.707l4.657 4.657a.5.5 0 0 0 .707 0l1-1a.5.5 0 0 0 0-.707L13.707 12l4.657-4.657a.5.5 0 0 0 0-.707l-1-1z"
                        />
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
