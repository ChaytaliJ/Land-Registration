import VerifyLandTable from "../components/verify-land-table";


export default function LandInspectorVerifyLand() {
    return (
        <div className="flex items-center flex-col">

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                Verify Land
            </h1>
            <VerifyLandTable />
            <div className="p-10"></div>

        </div>
    )
}
