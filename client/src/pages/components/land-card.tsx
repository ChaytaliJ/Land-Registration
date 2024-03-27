import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    // CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import land from "../../assets/dimitri-karastelev-ZH4FUYiaczY-unsplash.jpg"


export default function Landcard() {
    return (
        <Card>
            <CardContent>
                <img src={land} alt="land" />
                <p>Not yet verified</p>

            </CardContent>

            <div className="pl-6 pb-6">
                <CardTitle>Size</CardTitle>
                <CardDescription>Address</CardDescription>
                <CardDescription>Price</CardDescription>
            </div>
            <CardFooter>
                <div className="flex flex-row space-x-6">
                    <Button disabled>Make it for sale</Button>
                    <Button >view details</Button></div>


            </CardFooter>
        </Card>
    )
}
