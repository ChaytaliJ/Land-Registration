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
import Modal from "./Modal";
import { BiTransfer } from "react-icons/bi";

export default function TransferOwnershipTable() {
    const privateKey = localStorage.getItem('key')
    const [TransactionInfo, setTransactionInfo] = useState([])
    const contractInstance: any = useContract();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTransfered, setIsTransfered] = useState(false)
    const getTransactions = useCallback(async () => {
        try {

            const transactions = await contractInstance?.methods?.getCompletedTransactions().call()
            console.log(transactions);
            const formattedData = transactions[2].map((_, index: any) => ({
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
            const transfer = await contractInstance?.methods?.LandOwnershipTransfer(land_id, new_owner).send({ from: `${privateKey}`, gas: '2000000', gasPrice: '5000000000' })
            window.location.reload()
            setIsTransfered(true)
            console.log(transfer);
        }
        catch (error) {
            console.log(error);
        }
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div>   <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">land id</TableHead>
                    <TableHead className="w-[100px]">Seller Address</TableHead>
                    <TableHead className="w-[100px]">Buyer Address</TableHead>
                    <TableHead className="w-[150px]">Transfer Ownership</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {TransactionInfo.map((land, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{land.land_id}</TableCell>
                        <TableCell className="font-medium">{land.seller_address}</TableCell>
                        <TableCell className="font-medium">{land.buyers_address}</TableCell>
                        <TableCell >
                            {isTransfered ? (<div>Transfer Done</div>) : (<Button className="h-8" onClick={openModal}>Transfer</Button>)}

                        </TableCell>
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <div className="text-center">
                                <div className="flex  justify-center flex-row space-x-2 mb-2 "> <BiTransfer className="h-8 w-8" /><p className="font-extrabold text-2xl">Ownership Transfer</p></div>
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold">Seller : </h2>
                                    <p className="text-gray-700 font-medium">{land.seller_address}</p>
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold">Buyer :</h2>
                                    <p className="text-gray-700 font-medium">{land.buyers_address}</p>
                                </div>

                                <button onClick={() => {
                                    TransferOwnershipHandler(land.land_id, land.buyers_address);
                                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Transfer
                                </button>
                            </div>
                        </Modal>

                    </TableRow>
                ))}
            </TableBody>

        </Table></div>
    )
}
