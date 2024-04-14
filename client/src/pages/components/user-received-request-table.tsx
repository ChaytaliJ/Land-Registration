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

export default function UserReceivedRequestTable() {
    const privateKey = localStorage.getItem('key')
    const contractInstance: any = useContract();
    const [SentRequestInfo, setSentRequestInfo] = useState([])

    const getReceivedRequest = useCallback(async () => {
        try {
            const ReceivedRequest = await contractInstance?.methods?.getSellerRequestDetails(privateKey).call();
            console.log(ReceivedRequest);
            const formattedData = ReceivedRequest[0].map((_, index: any) => ({
                request_id: parseInt(ReceivedRequest[0][index]),
                address: ReceivedRequest[1][index],
                land_id: parseInt(ReceivedRequest[2][index]),
                approved: ReceivedRequest[3][index],
                rejected: ReceivedRequest[4][index]
            }));
            console.log(formattedData);
            setSentRequestInfo(formattedData);
        } catch (error) {
            console.log(error);
        }
    }, [contractInstance])

    useEffect(() => {
        getReceivedRequest();
    }, [getReceivedRequest]);



    async function RequestApproval(Req_id: number) {
        try {
            const approval = await contractInstance?.methods?.approveRequest(Req_id).send(({ from: `${privateKey}`, gas: '2000000', gasPrice: '5000000000' }))
            console.log(approval);
            window.location.reload()
        }
        catch (error) {
            console.log(error);
        }
    }

    async function RequestRejection(Req_id: number) {
        try {
            const Rejection = await contractInstance?.methods?.rejectRequest(Req_id).send(({ from: `${privateKey}`, gas: '2000000', gasPrice: '5000000000' }))
            console.log(Rejection);
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
                        <TableHead className="w-[100px]">Sr.No</TableHead>
                        <TableHead className="w-[100px]">Land Id</TableHead>
                        <TableHead className="w-[350px]">Buyers Address</TableHead>
                        <TableHead >Status</TableHead>
                        <TableHead className="text-center">Accept</TableHead>
                        <TableHead className="text-center">Reject</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {SentRequestInfo?.map((request) => (
                        <TableRow key={request.request_id}>
                            <TableCell className="font-medium">{request.request_id}</TableCell>
                            <TableCell className="font-medium">{request.land_id}</TableCell>
                            <TableCell className="font-medium">{request.address}</TableCell>
                            <TableCell className="font-medium">    {request.rejected ? (
                                <div>Cancelled</div>
                            ) : request.approved ? (
                                <div>Completed</div>
                            ) : (
                                <div>Pending</div>
                            )}</TableCell>
                            <TableCell className="text-center">
                                <div>
                                    {
                                        request.approved ?
                                            (<Button className="h-8" disabled>Accepted</Button>)
                                            : (<Button className="h-8" onClick={() => {
                                                RequestApproval(request.request_id)
                                            }} disabled={request.rejected}
                                                variant={request.rejected ? "outline" : "default"}
                                            >Accept</Button>)
                                    }


                                </div></TableCell>
                            <TableCell className="text-center">
                                <div>
                                    {
                                        request.rejected ?
                                            (<Button className="h-8" disabled>Rejected</Button>)
                                            : (<Button className="h-8"
                                                onClick={() => {
                                                    RequestRejection(request.request_id)

                                                }} disabled={request.approved}
                                                variant={request.approved ? "outline" : "default"}>Reject</Button>)
                                    }


                                </div></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
