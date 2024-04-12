import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useContract from "@/hooks/useContract";
import { useCallback, useEffect, useState } from "react";




export default function VerifyLandTable({ Lands }) {
    const privateKey = localStorage.getItem('key')
    const contractInstance: any = useContract();
    const [landsInfo, setlandsInfo] = useState([])

    const getLands = useCallback(async () => {
        try {
            const LandsDetails = [];
            for (let i = 0; i < Lands?.length; i++) {
                const landDetails = await contractInstance?.methods?.getLandInfo(Lands[i]).call();
                const isVerified = await contractInstance?.methods?.isLandVerified(Lands[i]).call();
                LandsDetails.push({
                    index: parseInt(landDetails[0]),
                    area: landDetails[1].toString(),
                    state: landDetails[3],
                    price: parseInt(landDetails[4]),
                    pid: parseInt(landDetails[5]),
                    survey: parseInt(landDetails[6]),
                    document: landDetails[8],
                    image: landDetails[7],
                    owneraddress: landDetails[9],
                    verificationStatus: isVerified
                });
            }

            setlandsInfo(LandsDetails);
            console.log(landsInfo);
        } catch (error) {
            console.log(error);
        }
    }, [contractInstance, Lands])

    useEffect(() => {
        getLands();
    }, [getLands]);


    async function LandVerification(id: number) {
        try {
            const verify = await contractInstance.methods.verifyLand(id).send({ from: `${privateKey}`, gas: '2000000', gasPrice: '5000000000' });
            console.log({ verify });
            window.location.reload()
        }
        catch (error) {
            console.log(error);
            alert('Error occurred while verifying user. Please try again later.');
        }
    }


    return (
        <div>   <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Sr.No</TableHead>
                    <TableHead className="w-[200px]">Owner Address</TableHead>
                    <TableHead className="w-[100px]">Area</TableHead>
                    <TableHead className="w-[100px]">Price</TableHead>

                    <TableHead className="w-[100px]">PID</TableHead>
                    <TableHead className="w-[100px]">Survey No</TableHead>

                    <TableHead className="w-[150px]">Document</TableHead>
                    <TableHead className="w-[150px]">Image</TableHead>

                    <TableHead className="w-[150px]">Verify</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {landsInfo?.map((land) => (
                    <TableRow key={land.index}>
                        <TableCell className="font-medium">{land.index}</TableCell>
                        <TableCell className="font-medium">{land.owneraddress}</TableCell>
                        <TableCell className="font-medium">{land.area}</TableCell>
                        <TableCell className="font-medium">{land.price + " ETH"}</TableCell>
                        <TableCell className="font-medium">{land.pid}</TableCell>
                        <TableCell className="font-medium">{land.survey}</TableCell>
                        <TableCell className="underline"><a href={"https://gateway.lighthouse.storage/ipfs/" + land.document}>View Document</a></TableCell>
                        <TableCell className="underline"><a href={"https://gateway.lighthouse.storage/ipfs/" + land.image}>View Image</a></TableCell>
                        <TableCell >
                            {
                                land.verificationStatus ?
                                    (<Button className="h-8" disabled >Verified</Button>)
                                    : (<Button className="h-8"
                                        onClick={() => LandVerification(land.index)}>Verify</Button>)
                            }

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table></div>
    )
}
