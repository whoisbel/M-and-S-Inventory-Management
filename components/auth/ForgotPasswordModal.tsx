const ForgotPasswordModal = ({setShowForgotPasswordModal} : {
    setShowForgotPasswordModal: (val : boolean) => void;
}) => {


    const closeModal = () => {
        setShowForgotPasswordModal(false)
    }
    return <div
        className="w-full h-full flex justify-center flex-col items-center fixed bg-main-background/90">

        <div
            className="flex justify-between items-center bg-accent-gray w-[400px] py-3 px-4 rounded-t-lg">
            <div
                className="flex w-full justify-between items-center bg-accent-gray py-3 px-4 rounded-t-lg">
                <p className="text-[20px] font-bold text-letters-color">
                    Forgot Password
                </p>
                <button onClick={closeModal}>X</button>
            </div>
            
        </div>

    </div>
}

export default ForgotPasswordModal