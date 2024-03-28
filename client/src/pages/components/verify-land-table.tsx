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
        owneraddress: "JSDFJ982789343803294809OI34II32",
        area: "pune, Maharashtra",
        price: "50,000",
        pid: "qed3324234addaadf",
        survey: "11",
    },
    {
        land: "1",
        owneraddress: "JSDFJ982789343803294809OI34II32",
        area: "pune, Maharashtra",
        price: "50,000",
        pid: "qed3324234addaadf",
        survey: "12",
    },
]


export default function VerifyLandTable() {
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
                    <TableHead className="w-[150px]">Verify</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {lands.map((land) => (
                    <TableRow key={land.land}>
                        <TableCell className="font-medium">{land.land}</TableCell>
                        <TableCell className="font-medium">{land.owneraddress}</TableCell>
                        <TableCell className="font-medium">{land.area}</TableCell>
                        <TableCell className="font-medium">{land.price}</TableCell>
                        <TableCell className="font-medium">{land.pid}</TableCell>
                        <TableCell className="font-medium">{land.survey}</TableCell>
                        <TableCell className="underline"><a href="/document" >View Document</a></TableCell>
                        <TableCell >
                            <Button className="h-8">Verify</Button>
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
