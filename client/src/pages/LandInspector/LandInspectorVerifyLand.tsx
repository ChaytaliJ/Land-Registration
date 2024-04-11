import useContract from "@/hooks/useContract";
import VerifyLandTable from "../components/verify-land-table";
import { useCallback, useEffect, useState } from "react";


export default function LandInspectorVerifyLand() {

    const [Lands, setLands] = useState([])
    const contractInstance: any = useContract();
    const getlands = useCallback(async () => {
        try {

            const Lands = await contractInstance?.methods?.getAllLandIds().call();
            setLands(Lands)


        } catch (error) {
            console.log(error);

        }
    }, [contractInstance]);

    useEffect(() => {
        getlands();
    }, [getlands]);

    return (
        <div className="flex h-200 flex-col items-center px-4">

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                Verify Land
            </h1>
            <VerifyLandTable Lands={Lands} />
            <div className="p-10"></div>

        </div>
    )
}
