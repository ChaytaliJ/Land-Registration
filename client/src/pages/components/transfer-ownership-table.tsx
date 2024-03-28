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

const lands = [

    {
        land: "1",
        selleraddress: "JSDFJ982789343803294809OI34II32",
        buyeraddress: "sfsdfFJ982fdsdfsdfsdf94809OI34II32",
        status: "payement done"

    },
    {
        land: "1",
        selleraddress: "JSDFJ982789343803294809OI34II32",
        buyeraddress: "sfsdfFJ982fdsdfsdfsdf94809OI34II32",
        status: "payement done"

    },
    {
        land: "1",
        selleraddress: "JSDFJ982789343803294809OI34II32",
        buyeraddress: "sfsdfFJ982fdsdfsdfsdf94809OI34II32",
        status: "payement done"

    },
    {
        land: "1",
        selleraddress: "JSDFJ982789343803294809OI34II32",
        buyeraddress: "sfsdfFJ982fdsdfsdfsdf94809OI34II32",
        status: "payement done"

    },
    {
        land: "1",
        selleraddress: "JSDFJ982789343803294809OI34II32",
        buyeraddress: "sfsdfFJ982fdsdfsdfsdf94809OI34II32",
        status: "payement done"

    },

]


export default function TransferOwnershipTable() {
    return (
        <div>   <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Sr.No</TableHead>
                    <TableHead className="w-[100px]">Seller Address</TableHead>
                    <TableHead className="w-[100px]">Buyer Address</TableHead>
                    <TableHead className="w-[150px]">Status</TableHead>
                    <TableHead className="w-[150px]">Transfer Ownership</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {lands.map((land) => (
                    <TableRow key={land.land}>
                        <TableCell className="font-medium">{land.land}</TableCell>
                        <TableCell className="font-medium">{land.selleraddress}</TableCell>
                        <TableCell className="font-medium">{land.buyeraddress}</TableCell>
                        <TableCell className="font-medium">{land.status}</TableCell>
                        <TableCell >
                            <Button className="h-8">Transfer</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter>
    <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell className="text-right">$2,500.00</TableCell>
    </TableRow>
</TableFooter> */}
        </Table></div>
    )
}
