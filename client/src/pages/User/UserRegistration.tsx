import UserRegistrationForm from "../components/user-registration-form";

function UserRegistration() {
    return (

        <div className="flex items-center flex-col">
            <div >
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                    User Registration
                </h1>

            </div>
            <div className="border-t w-full border-black my-8"></div>

            <UserRegistrationForm />


            <div className="p-10"></div>
        </div>
    );
}

export default UserRegistration;
