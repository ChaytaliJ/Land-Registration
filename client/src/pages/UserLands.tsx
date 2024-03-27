import LandCardContainer from "./components/land-card-container";


export default function UserLands() {
    return (
        <div className="flex h-200 flex-col items-center px-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                My Lands
            </h1>
            <LandCardContainer />
            <div className="p-10"></div>
        </div>
    )
}
