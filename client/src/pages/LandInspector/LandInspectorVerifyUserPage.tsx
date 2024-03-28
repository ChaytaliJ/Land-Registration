import VerifyUserTable from "../components/verify-user-table";


export default function LandInspectorVerifyUserPage() {
    return (
        <div className="flex h-200 flex-col items-center px-4">

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                Verify User
            </h1>
            <VerifyUserTable />
            <div className="p-10"></div>

        </div>
    )
}
