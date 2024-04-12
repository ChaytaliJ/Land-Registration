import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useContract from "@/hooks/useContract";
import { useCallback, useEffect, useState } from "react";



export default function VerifyUserTable({ Users }) {
    const privateKey = localStorage.getItem('key')
    const contractInstance: any = useContract();
    const [usersInfo, setUsersInfo] = useState([])

    const getUsers = useCallback(async () => {
        try {
            const usersDetails = [];

            for (let i = 0; i < Users?.length; i++) {
                const UserDetails = await contractInstance?.methods?.getBuyerDetails(Users[i]).call();
                const isVerified = await contractInstance?.methods?.isVerified(Users[i]).call();

                usersDetails.push({
                    index: i + 1,
                    address: Users[i],
                    name: UserDetails[0],
                    panNumber: UserDetails[2],
                    adharNumber: UserDetails[6],
                    document: UserDetails[3],
                    verificationStatus: isVerified
                });
            }

            setUsersInfo(usersDetails);
        } catch (error) {
            console.log(error);
        }
    }, [contractInstance, Users])

    useEffect(() => {
        getUsers();
    }, [getUsers]);


    async function UserVerification(address: string) {
        try {
            const verify = await contractInstance.methods.verifyUser(address).send({ from: `${privateKey}`, gas: '2000000', gasPrice: '5000000000' });
            console.log({ verify });
            window.location.reload()
            // console.log(verify);
        }
        catch (error) {
            console.log(error);
            alert('Error occurred while verifying user. Please try again later.');
        }
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Sr.No</TableHead>
                        <TableHead className="w-[200px]">Address</TableHead>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead className="w-[100px]">Adhaar No</TableHead>
                        <TableHead className="w-[100px]">Pan Card No</TableHead>
                        <TableHead className="w-[150px]">Document</TableHead>
                        <TableHead className="w-[150px]">Verify</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {usersInfo.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{user.index}</TableCell>
                            <TableCell className="font-medium">{user.address}</TableCell>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell className="font-medium">{user.adharNumber}</TableCell>
                            <TableCell className="font-medium">{user.panNumber}</TableCell>
                            <TableCell className="underline"><a href={"https://gateway.lighthouse.storage/ipfs/" + user.document}>View Document</a></TableCell>
                            <TableCell>
                                {
                                    user.verificationStatus ?
                                        (<Button className="h-8" disabled >Verified</Button>)
                                        : (<Button className="h-8"
                                            onClick={() => UserVerification(user.address)}>Verify</Button>)
                                }

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    );
}
