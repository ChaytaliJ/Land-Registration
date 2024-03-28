import LandCardContainer from "../components/land-card-container";

export default function UserLandGallery() {
    return (
        <div className="flex h-200 flex-col items-center px-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                Land Gallery
            </h1>

            <LandCardContainer
                //@ts-ignore
                islandgallery={true} />
            <div className="p-10"></div>
        </div>
    )
}
