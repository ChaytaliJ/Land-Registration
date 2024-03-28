import TransferOwnershipTable from "../components/transfer-ownership-table";


export default function LandInspectorTransferOwnershipPage() {
    return (
        <div className="flex items-center flex-col">

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                Transfer Ownership
            </h1>
            <TransferOwnershipTable />
            <div className="p-10"></div>

        </div>
    )
}
