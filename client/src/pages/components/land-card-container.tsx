
import LandCard from "./land-card";
//@ts-ignore
export default function LandCardContainer({ islandgallery }) {
    return (
        <div className="grid grid-cols-4 gap-4">
            <LandCard islandgallery={islandgallery} />
            <LandCard islandgallery={islandgallery} />
            <LandCard islandgallery={islandgallery} />
            <LandCard islandgallery={islandgallery} />
            <LandCard islandgallery={islandgallery} />
        </div>

    );
}
