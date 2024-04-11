import {
    Card,
    CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import land from "../../assets/dimitri-karastelev-ZH4FUYiaczY-unsplash.jpg"
import useContract from "@/hooks/useContract";
import { useCallback, useEffect, useState } from "react";

//@ts-ignore
export default function Landcard({ islandgallery, landId }) {
    const [loading, setLoading] = useState(true);
    const [Land, setLand] = useState()
    const [verification, setVerification] = useState()
    const contractInstance: any = useContract();
    const getLandData = useCallback(async () => {
        try {

            const landInfo = await contractInstance?.methods?.getLandInfo(landId).call();
            const landVerification = await contractInstance?.methods?.isLandVerified(landId).call();

            setLand(landInfo);
            setVerification(landVerification)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [contractInstance, landId]);

    useEffect(() => {
        getLandData();
    }, [getLandData]);
    return (
        <Card>
            <div className="p-4">
                <img src={land} alt="land" /></div>


            <div className="pl-8">
                <p>{landId}</p>
                {
                    verification ? (<p>verified</p>) : (<p>Not yet verified</p>)
                }

                <CardDescription>Size</CardDescription>
                <CardDescription>Address</CardDescription>
                <CardDescription>Price</CardDescription>
            </div>
            <div className="border-t w-full border-gray my-3"></div>
            <div className="flex flex-row items-center justify-center pb-4 space-x-10"> {/* Modified line */}
                {islandgallery ? (<Button>Send Request to Buy</Button>) : (<Button variant="outline" disabled>Make it for sale</Button>)}
                <Button variant="outline">View details</Button>
            </div>



        </Card>
    )
}
