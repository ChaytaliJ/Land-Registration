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
import { MdPayment } from "react-icons/md";
import Web3 from "web3";

export default function UserSentRequestTable() {
    const privateKey = localStorage.getItem('key')
    const contractInstance: any = useContract();
    const [SentRequestInfo, setSentRequestInfo] = useState([])
    const [landprice, setlandPrice] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getSentRequests = useCallback(async () => {
        try {

            const Price: number[] = []
            const sentRequests = await contractInstance?.methods?.getBuyerRequestDetails(privateKey).call();
            const PaidArray: boolean[] = []


            const Lands = sentRequests[2]
            for (let i = 0; i < Lands?.length; i++) {
                const landDetails = await contractInstance?.methods?.getLandInfo(parseInt(Lands[i])).call();
                const isPayment = await contractInstance?.methods?.isPaid(parseInt(Lands[i])).call()
                Price.push(parseInt(landDetails[4]))
                PaidArray.push(isPayment)
            }

            const formattedData = sentRequests[0].map((_, index: any) => ({
                request_id: parseInt(sentRequests[0][index]),
                address: sentRequests[1][index],
                land_id: parseInt(sentRequests[2][index]),
                approved: sentRequests[3][index],
                rejected: sentRequests[4][index],
                price: Price[index],
                isPaid: PaidArray[index]
            }));

            setSentRequestInfo(formattedData);
            setlandPrice(Price);



        } catch (error) {
            console.log(error);
        }
    }, [contractInstance])

    useEffect(() => {
        getSentRequests();
    }, [getSentRequests]);



    async function PaymentHandler(payable_receiver: string, land_id: number, price: number) {
        try {
            const amount = price + 0.00123
            const amountInWei = Web3.utils.toWei(amount.toString(), 'ether');
            console.log(amountInWei);
            const pay = await contractInstance?.methods?.payment(payable_receiver, land_id, price).send({ from: `${privateKey}`, value: amountInWei, gas: 2100000 })

            console.log(pay);
            window.location.reload()
        }
        catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Request Id</TableHead>
                        <TableHead className="w-[100px]">Land Id</TableHead>
                        <TableHead className="w-[350px]">Owner Address</TableHead>
                        <TableHead >Status</TableHead>

                        <TableHead>Price</TableHead>
                        <TableHead>Make Payement</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {SentRequestInfo.map((request) => (
                        <TableRow key={request.request_id}>
                            <TableCell className="font-medium">{request.request_id}</TableCell>
                            <TableCell className="font-medium">{request.land_id}</TableCell>
                            <TableCell className="font-medium">{request.address}</TableCell>
                            <TableCell className="font-medium">{request.approved ? (request.rejected ? (<div>Rejected</div>) : (<div>Approved</div>)) : (request.rejected ? (<div>Rejected</div>) : (<div>Pending</div>))}</TableCell>
                            <TableCell className="font-medium" >{request.price + " ETH"}</TableCell>
                            <TableCell className="text-center" >
                                <div>
                                    {
                                        request.isPaid ? (<div>Payment Done</div>) : (<Button className="h-8" disabled={request.rejected || !request.approved} onClick={openModal}>Pay</Button>)
                                    }


                                </div></TableCell>
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <div className="text-center">
                                    <div className="flex  justify-center flex-row space-x-2 mb-2 "><MdPayment className="h-8 w-8" /><p className="font-extrabold text-2xl">Payment</p></div>
                                    <div className="mb-4">
                                        <h2 className="text-lg font-bold">From:</h2>
                                        <p className="text-gray-700 font-medium">{privateKey}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h2 className="text-lg font-bold">To:</h2>
                                        <p className="text-gray-700 font-medium">{request.address}</p>
                                    </div>
                                    <div className="mb-4">
                                        <h2 className="text-lg font-bold">Amount:</h2>
                                        <p className="text-gray-700 font-medium">{request.price} ETH</p>
                                    </div>
                                    <button onClick={() => {
                                        PaymentHandler(request.address, request.land_id, request.price)
                                    }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Buy Land
                                    </button>
                                </div>
                            </Modal>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}
