import {
    Card,
    CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import land from "../../assets/dimitri-karastelev-ZH4FUYiaczY-unsplash.jpg"

//@ts-ignore
export default function Landcard({ islandgallery }) {
    return (
        <Card>
            <div className="p-4">      <img src={land} alt="land" /></div>


            <div className="pl-8">
                <p>Not yet verified</p>
                <CardDescription>Size</CardDescription>
                <CardDescription>Address</CardDescription>
                <CardDescription>Price</CardDescription>
            </div>
            <div className="border-t w-full border-gray my-3"></div>
            <div className="flex flex-row items-center justify-center pb-4 space-x-10"> {/* Modified line */}
                {islandgallery ? (<Button>Buy</Button>) : (<Button variant="outline" disabled>Make it for sale</Button>)}
                <Button variant="outline">View details</Button>
            </div>



        </Card>
    )
}
