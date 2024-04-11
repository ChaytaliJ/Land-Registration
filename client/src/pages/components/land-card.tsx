import {
    Card,
    CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import land from "../../assets/dimitri-karastelev-ZH4FUYiaczY-unsplash.jpg"
import useContract from "@/hooks/useContract";
import { useCallback, useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
//@ts-ignore
export default function Landcard({ islandgallery, landId }) {
    const [loading, setLoading] = useState(true);
    const [Land, setLand] = useState()
    const [verification, setVerification] = useState()
    const contractInstance: any = useContract();
    const getLandData = useCallback(async () => {
        try {

            const landDetails = await contractInstance?.methods?.getLandInfo(landId).call();
            const landVerification = await contractInstance?.methods?.isLandVerified(landId).call();
            const details = {
                index: parseInt(landDetails[0]),
                area: landDetails[1].toString(),
                state: landDetails[3],
                price: parseInt(landDetails[4]),
                pid: parseInt(landDetails[5]),
                survey: parseInt(landDetails[6]),
                document: landDetails[3].toString(),
                ipfshash: landDetails[7].toString(),
                owneraddress: landDetails[9],
                verificationStatus: landVerification
            }
            console.log(details);
            setLand(details);
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
                {
                    verification ? (<div className="flex flex-row space-x-2 "><MdVerified className="h-8 w-8" /><p className="font-extrabold text-2xl">Verified</p></div>) : (<div className="flex flex-row space-x-2 "><GoUnverified className="h-8 w-8" /><p className="font-extrabold text-2xl">Not Verified</p></div>)
                }

                {
                    islandgallery && (<p className="py-2 text-sm">{Land?.owneraddress}</p>)
                }

                <p className="font-bold text-lg" >{"State : " + Land?.state}</p>
                <p className="font-bold text-lg" >{"Price : " + Land?.price + " ETH "}</p>

            </div>
            <div className="border-t w-full border-gray my-3"></div>
            <div className="flex flex-row items-center justify-center pb-4 space-x-10"> {/* Modified line */}
                {islandgallery && (<Button>Send Request to Buy</Button>)}
                <Button variant="outline">View details</Button>
            </div>



        </Card>
    )
}
