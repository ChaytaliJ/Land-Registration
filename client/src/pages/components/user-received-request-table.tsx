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

const invoices = [
    {
        invoice: "1",
        landId: "234234",
        BuyersAddress: "JSDFJ982789343803294809OI34II32",
        status: 'pending',
        payement: 'false'
    },
    {
        invoice: "2",
        landId: "234234",
        BuyersAddress: "JSDFJ982789343803294809OI34II32",
        status: 'pending',
        payement: 'false'
    },
    {
        invoice: "3",
        landId: "234234",
        BuyersAddress: "JSDFJ982789343803294809OI34II32",
        status: 'pending',
        payement: 'false'
    },
    {
        invoice: "4",
        landId: "234234",
        BuyersAddress: "JSDFJ982789343803294809OI34II32",
        status: 'pending',
        payement: 'false'
    },
    {
        invoice: "5",
        landId: "234234",
        BuyersAddress: "JSDFJ982789343803294809OI34II32",
        status: 'pending',
        payement: 'false'
    },
]

export default function UserReceivedRequestTable() {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Sr.No</TableHead>
                        <TableHead className="w-[100px]">Land Id</TableHead>
                        <TableHead className="w-[350px]">Buyers Address</TableHead>
                        <TableHead >Status</TableHead>
                        <TableHead>Payement Done ?</TableHead>
                        <TableHead className="text-center">Accept</TableHead>
                        <TableHead className="text-center">Reject</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{invoice.invoice}</TableCell>
                            <TableCell>{invoice.landId}</TableCell>
                            <TableCell>{invoice.BuyersAddress}</TableCell>
                            <TableCell>{invoice.status}</TableCell>
                            <TableCell className="text-center">{invoice.payement}</TableCell>
                            <TableCell className="text-center">
                                <div>
                                    <Button className="h-8">Accept</Button>

                                </div></TableCell>
                            <TableCell className="text-center">
                                <div>
                                    <Button className="h-8">Reject</Button>

                                </div></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
        </div>
    )
}
