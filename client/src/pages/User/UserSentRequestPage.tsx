import UserSentRequestTable from "../components/user-sent-request-table";


export default function UserSentRequestPage() {
    return (
        <div className="flex h-200 flex-col items-center px-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                Sent Requests
            </h1>
            <UserSentRequestTable />
            <div className="p-10"></div>
        </div>
    )
}
