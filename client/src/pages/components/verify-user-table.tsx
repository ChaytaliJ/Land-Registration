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

const users = [
    {
        user: "1",
        address: "JSDFJ982789343803294809OI34II32",
        name: "xyz",
        adhaar: "dfdadas34II32",
        pan: "qed3324234addaadf",
    },
    {
        user: "1",
        address: "JSDFJ982789343803294809OI34II32",
        name: "xyz",
        adhaar: "dfdadas34II32",
        pan: "qed3324234addaadf",
    },
    {
        user: "1",
        address: "JSDFJ982789343803294809OI34II32",
        name: "xyz",
        adhaar: "dfdadas34II32",
        pan: "qed3324234addaadf",
    },
    {
        user: "1",
        address: "JSDFJ982789343803294809OI34II32",
        name: "xyz",
        adhaar: "dfdadas34II32",
        pan: "qed3324234addaadf",
    },
    {
        user: "1",
        address: "JSDFJ982789343803294809OI34II32",
        name: "xyz",
        adhaar: "dfdadas34II32",
        pan: "qed3324234addaadf",
    },
]


export default function VerifyUserTable() {
    return (
        <div>   <Table>
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
                {users.map((user) => (
                    <TableRow key={user.user}>
                        <TableCell className="font-medium">{user.user}</TableCell>
                        <TableCell className="font-medium">{user.address}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="font-medium">{user.adhaar}</TableCell>
                        <TableCell className="font-medium">{user.pan}</TableCell>
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
