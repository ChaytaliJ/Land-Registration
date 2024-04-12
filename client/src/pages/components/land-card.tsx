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
    const privateKey = localStorage.getItem('key')
    const [loading, setLoading] = useState(true);
    const [Land, setLand] = useState()
    const [verification, setVerification] = useState()
    const contractInstance: any = useContract();
    const getLandData = useCallback(async () => {
        try {

            const landDetails = await contractInstance?.methods?.getLandInfo(landId).call();
            const landVerification = await contractInstance?.methods?.isLandVerified(landId).call();
            const isRequestedToBuy = await contractInstance?.methods?.isRequested(landId).call();
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
                keepforSale: landDetails[10],
                verificationStatus: landVerification,
                isRequested: isRequestedToBuy
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


    async function MakeLandForSaleHandler(id: number) {
        try {
            const makeforsale = await contractInstance?.methods?.makeLandForSale(id).send({ from: `${privateKey}`, gas: '2000000', gasPrice: '5000000000' })
            console.log("land made for sale");
            console.log(makeforsale);
            window.location.reload()
        }
        catch (error) {
            console.log(error);
        }

    }

    async function SendRequestToBuy(seller_id: string, id: number) {
        try {
            const requesttobuy = await contractInstance?.methods?.requestLand(seller_id, id).send({ from: `${privateKey}`, gas: '2000000', gasPrice: '5000000000' })
            console.log(requesttobuy);
            window.location.reload()
        }
        catch (error) {
            console.log(error);
        }

    }

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
                <p className="font-bold text-lg" >{"Id : " + Land?.index}</p>
                <p className="font-bold text-lg" >{"State : " + Land?.state}</p>
                <p className="font-bold text-lg" >{"Price : " + Land?.price + " ETH "}</p>

            </div>
            <div className="border-t w-full border-gray my-3"></div>
            <div className="flex flex-row items-center justify-center pb-4 space-x-10"> {/* Modified line */}
                {islandgallery ? (Land?.isRequested ? (<div>Requested</div>) : (<Button onClick={() => {
                    SendRequestToBuy(Land?.owneraddress, Land?.index)
                }}>Send Request to Buy</Button>)
                ) : (Land?.keepforSale ? (<div>Kept for selling</div>) : (<Button disabled={!Land?.verificationStatus} variant="outline" onClick={() => { MakeLandForSaleHandler(Land?.index) }}>Make for Sale</Button>))}
                <Button variant="outline">View details</Button>
            </div>



        </Card>
    )
}
