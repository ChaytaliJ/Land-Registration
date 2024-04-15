import useContract from "@/hooks/useContract";
import { useCallback, useEffect, useState } from "react";


function OwnershipDetailsPage() {
    // const [Details, setDetails] = useState([])
    const contractInstance: any = useContract();
    const getOwnershipDetails = useCallback(async () => {
        try {

            const ownershipDetails = await contractInstance?.methods?.getOwnershipTransfers().call();
            console.log(ownershipDetails);

        } catch (error) {
            console.log(error);

        }
    }, [contractInstance]);

    useEffect(() => {
        getOwnershipDetails();
    }, [getOwnershipDetails]);

    return (
        <div>
            <div className="flex h-200 flex-col items-center px-4">

                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                    Ownership Details
                </h1>

                <div className="p-10"></div>

            </div>
        </div>
    )
}

export default OwnershipDetailsPage
