import UserReceivedRequestTable from "../components/user-received-request-table";
import useVerificationStatus from "@/hooks/useVerificationStatus";


export default function UserReceivedRequestPage() {
    const isUserVerified = useVerificationStatus()
    return (
        <div>{
            isUserVerified ? (<div className="flex h-200 flex-col items-center px-4">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                    Received Requests
                </h1>
                <UserReceivedRequestTable />
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
