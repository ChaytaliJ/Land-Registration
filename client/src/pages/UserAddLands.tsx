import LandRegistrationForm from "./components/land-registration-form";


export default function AddLands() {
    return (

        <div className="flex items-center flex-col">

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl p-6">
                Add Land
            </h1>
            <LandRegistrationForm />

            <div className="p-10"></div>

        </div>
    )
}
