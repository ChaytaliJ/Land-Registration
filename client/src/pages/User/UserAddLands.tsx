import LandRegistrationForm from "../components/land-registration-form";
import useVerificationStatus from "@/hooks/useVerificationStatus";

export default function UserAddLands() {
    const isUserVerified = useVerificationStatus()
    return (
        <div>
            {
                isUserVerified ? (<div className="flex items-center flex-col">

                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                        Add Land
                    </h1>
                    <LandRegistrationForm />

                    <div className="p-10"></div>

                </div>) : (<div className="flex flex-col justify-center items-center">
                    <div>
                        <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-5xl p-6">
                            You are not verified user
                        </h1></div>
                    <div>
                        <p>you can access this page after land inspector verifies you</p>
                    </div>
                </div>)
            }
        </div>


    )
}
