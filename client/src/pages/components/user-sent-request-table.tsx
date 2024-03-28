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
        OwnerAddress: "JSDFJ982789343803294809OI34II32",
        Price: "$5000.00",
        status: 'pending'
    },
    {
        invoice: "2",
        landId: "234234",
        OwnerAddress: "JSDFJ982789343803294809OI34II32",
        Price: "$5000.00",
        status: 'pending'
    },
    {
        invoice: "3",
        landId: "234234",
        OwnerAddress: "JSDFJ982789343803294809OI34II32",
        Price: "$5000.00",
        status: 'pending'
    },
    {
        invoice: "4",
        landId: "234234",
        OwnerAddress: "JSDFJ982789343803294809OI34II32",
        Price: "$5000.00",
        status: 'pending'
    },
    {
        invoice: "5",
        landId: "234234",
        OwnerAddress: "JSDFJ982789343803294809OI34II32",
        Price: "$5000.00",
        status: 'pending'
    },
]

export default function UserSentRequestTable() {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Sr.No</TableHead>
                        <TableHead className="w-[100px]">Land Id</TableHead>
                        <TableHead className="w-[350px]">Owner Address</TableHead>
                        <TableHead >Status</TableHead>

                        <TableHead>Price</TableHead>
                        <TableHead>Make Payement</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.invoice}>
                            <TableCell className="font-medium">{invoice.invoice}</TableCell>
                            <TableCell>{invoice.landId}</TableCell>
                            <TableCell>{invoice.OwnerAddress}</TableCell>
                            <TableCell>{invoice.status}</TableCell>
                            <TableCell >{invoice.Price}</TableCell>
                            <TableCell className="text-center" >
                                <div>
                                    <Button className="h-8">Pay</Button>

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
