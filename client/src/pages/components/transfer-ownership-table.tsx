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


export default function TransferOwnershipTable() {
    const privateKey = localStorage.getItem('key')
    const [TransactionInfo, setTransactionInfo] = useState([])
    const contractInstance: any = useContract();
    const getTransactions = useCallback(async () => {
        try {

            const transactions = await contractInstance?.methods?.getCompletedTransactions().call()

            const formattedData = transactions[0].map((_, index: any) => ({
                seller_address: transactions[0][index],
                buyers_address: transactions[1][index],
                land_id: parseInt(transactions[2][index])

            }));
            setTransactionInfo(formattedData);
            console.log(formattedData);

        } catch (error) {
            console.log(error);
        }
    }, [contractInstance])

    useEffect(() => {
        getTransactions();
    }, [getTransactions]);

    async function TransferOwnershipHandler(land_id: number, new_owner: string) {
        try {
            const transfer = await contractInstance.methods.LandOwnershipTransfer(land_id, new_owner).send({ from: `${privateKey}`, gas: '2000000', gasPrice: '5000000000' })
            console.log(transfer);
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div>   <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">land id</TableHead>
                    <TableHead className="w-[100px]">Seller Address</TableHead>
                    <TableHead className="w-[100px]">Buyer Address</TableHead>
                    <TableHead className="w-[150px]">Status</TableHead>
                    <TableHead className="w-[150px]">Transfer Ownership</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {TransactionInfo.map((land) => (
                    <TableRow key={land.land_id}>
                        <TableCell className="font-medium">{land.land_id}</TableCell>
                        <TableCell className="font-medium">{land.seller_address}</TableCell>
                        <TableCell className="font-medium">{land.buyers_address}</TableCell>
                        <TableCell className="font-medium">pending</TableCell>
                        <TableCell >
                            <Button className="h-8" onClick={() => {
                                TransferOwnershipHandler(land.land_id, land.buyers_address);
                            }}>Transfer</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table></div>
    )
}
